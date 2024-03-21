import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkConnection() {
    const { data, error } = await supabase.from('image_data').select('*')
  
    if (error) {
      console.error('Error connecting to Supabase:', error)
    } else {
      console.log('Connected to Supabase successfully!')
      console.log('Data:', data)
    }
  }
  
  checkConnection()