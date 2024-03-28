import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabaseClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Process your image upload
      // For example, get the image buffer from the request body (you need to parse it accordingly)
      const { imageBuffer, fileName } = req.body;

      // Upload the image to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, imageBuffer, {
          contentType: 'image/jpeg', // or the appropriate MIME type
        });

      if (uploadError) throw new Error('Unable to upload image');

      // Respond with the URL or any other relevant information
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;