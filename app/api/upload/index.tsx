import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabaseClient';
import multer from 'multer';
import nc from 'next-connect';

// Configure multer storage
// In this example, we're storing files in memory. You can also configure it to save to disk.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Only allow POST method
apiRoute.use(upload.single('file'));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  // The file is accessible through req.file, and other form fields are in req.body
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { buffer, originalname, mimetype } = req.file;
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`uploads/${Date.now()}-${originalname}`, buffer, {
      contentType: mimetype,
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'File uploaded successfully', path: data.path });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
