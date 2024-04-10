import { useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        router.push('/');
      } else {
        router.push('/');
      }
    };

    handleRedirect();
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Callback;