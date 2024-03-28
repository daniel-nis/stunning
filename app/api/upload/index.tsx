import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Parse the request body, e.g., using `formidable` or `multiparty` (you will need to install these)
    // Extract the file data from the request

    // Then upload to Supabase Storage
    const { data, error } = await supabase.storage.from('your-bucket-name').upload('path/to/file', fileData);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Respond with the URL or confirmation
    res.status(200).json({ file: data.Key });
  } else {
    // Handle any other HTTP methods as needed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
