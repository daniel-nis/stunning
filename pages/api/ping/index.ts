import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Perform a simple query to keep the database active
      const { data, error } = await supabase
        .from('image_data')
        .select('id')
        .limit(1);

      if (error) throw error;

      res.status(200).json({ status: 'OK', message: 'Supabase is active' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to ping Supabase' });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
