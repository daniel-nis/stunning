import React from 'react';
import { useAuth } from '@/utils/useAuth';

export const SignOutButton = () => {
  const { signOut, user } = useAuth();

  if (!user) {
    return null; // Don't render the button if the user is not authenticated
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={signOut}
    >
      Sign Out
    </button>
  );
};