import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'HEAD' || req.method === 'GET') {
    try {
      // Perform a simple query to keep the database active
      const { data, error } = await supabase
        .from('image_data')
        .select('id')
        .limit(1);

      if (error) throw error;

      if (req.method === 'HEAD') {
        // For HEAD requests, we only send headers
        res.status(200).end();
      } else {
        // For GET requests, we send a JSON response
        res.status(200).json({ status: 'OK', message: 'Supabase is active' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (req.method === 'HEAD') {
        res.status(500).end();
      } else {
        res.status(500).json({ error: 'Failed to ping Supabase' });
      }
    }
  } else {
    if (req.method === 'HEAD') {
      res.status(405).end();
    } else {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
  }
}
