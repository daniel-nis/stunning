import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabaseClient';
// import { useRouter } from 'next/router';
import { Session, User, AuthSession, AuthResponse } from '@supabase/supabase-js';

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
//   const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const session = supabase.auth.getSession();
      setLoading(true);

      const user = (await session).data.session?.user

      if (user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUser(userData);
        }
      }

      setLoading(false);
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        getUserData();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    getUserData();

    return () => {
      authListener?.data?.subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing up:', error);
    } else {
      await supabase.from('users').insert([
        {
          id: data.user?.id,
          email: data.user?.email,
          role: 'user',
        },
      ]);
    }

    return { user: data.user, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error);
    }

    return { user: data.user, error };
  };

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
    }

    setUser(null);
  }, []);

//   const signInWithProvider = async (provider: 'google' | 'github') => {
//     const { data, error }: AuthResponse = await supabase.auth.signInWithOAuth({
//       provider,
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       console.error('Error signing in with provider:', error);
//     }

//     return { user: data.user, error };
//   };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    // signInWithProvider,
  };
};