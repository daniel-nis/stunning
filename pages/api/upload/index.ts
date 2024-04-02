// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '@/supabaseClient';
// import multer from 'multer';

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// interface NextApiRequestWithFile extends NextApiRequest {
//   file: Express.Multer.File;
// }

// export default async function handler(
//   req: NextApiRequestWithFile,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     await runUpload(req, res);
//   } else {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   }
// }

// const runMiddleware = (req: NextApiRequestWithFile, res: NextApiResponse, fn: any) => 
//   new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });

//   async function runUpload(req: NextApiRequestWithFile, res: NextApiResponse) {
//     try {
//       // Wrap multer as middleware
//       await runMiddleware(req, res, upload.single('file'));
  
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//       }
  
//       const { buffer, originalname, mimetype } = req.file;
//       // Assuming the website URL is sent as part of the multipart form data along with the file
//       const website_url = req.body.website_url;
  
//       // Perform the file upload
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('images')
//         .upload(`/${Date.now()}-${originalname}`, buffer, {
//           contentType: mimetype,
//         });
  
//       if (uploadError) throw uploadError;
  
//       // Extract the public URL for the uploaded image
//       // Ensure there's no trailing slash in the base path
//       const basePath = "https://qliwrxwpocxqxoayomeb.supabase.co/storage/v1/object/public/images";
//       // Ensure the uploadData.path has a leading slash removed if present, to avoid double slashes when concatenating
//       const imagePath = `${basePath}/${uploadData.path.replace(/^\//, '')}`;
//       console.log(imagePath)
  
//       // Insert the new entry into the image_data table
//       const { data: insertData, error: insertError } = await supabase
//         .from('image_data')
//         .insert([
//           { image_path: imagePath, website_url: website_url },
//         ]);
  
//       if (insertError) throw insertError;
  
//       // Respond with success message
//       res.status(200).json({ message: 'File uploaded and database entry created successfully', path: imagePath });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Failed to upload file or update database. Please check server logs.' });
//     }
//   }

import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { supabase } from "@/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { website_url } = req.body;

  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to the website URL
    await page.goto(website_url, { waitUntil: "networkidle0" });

    // Take a screenshot of the full page
    // const screenshotBuffer = await page.screenshot({
    //     clip: { x: 0, y: 0, width: 1920, height: 1080 },
    // });
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    // Close the browser instance
    await browser.close();

    // Upload the screenshot to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`${Date.now()}.png`, screenshotBuffer, { contentType: "image/png" });

    if (uploadError) {
      throw uploadError;
    }

    // Extract the public URL for the uploaded screenshot
    const basePath = "https://qliwrxwpocxqxoayomeb.supabase.co/storage/v1/object/public/images";
    const imagePath = `${basePath}/${uploadData.path.replace(/^\//, "")}`;

    console.log(imagePath);

    // Insert the new entry into the image_data table
    const { data: insertData, error: insertError } = await supabase
      .from("image_data")
      .insert([{ image_path: imagePath, website_url: website_url }]);

    if (insertError) throw insertError;

    // Return the screenshot URL as the response
    res.status(200).json({ imagePath });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: `Failed to generate screenshot: ${(error as Error).message}` });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};