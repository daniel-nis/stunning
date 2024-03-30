import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabaseClient';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await runUpload(req, res);
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}

const runMiddleware = (req: NextApiRequestWithFile, res: NextApiResponse, fn: any) => 
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

async function runUpload(req: NextApiRequestWithFile, res: NextApiResponse) {
  try {
    // Wrap multer as middleware
    await runMiddleware(req, res, upload.single('file'));

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { buffer, originalname, mimetype } = req.file;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${Date.now()}-${originalname}`, buffer, { contentType: mimetype });

    if (error) throw error;

    res.status(200).json({ message: 'File uploaded successfully', path: data.path });
  } catch (error) {
    console.error('Supabase upload error:', error);
    res.status(500).json({ error: 'Failed to upload file. Please check server logs.' });
  }
}
