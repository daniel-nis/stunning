import { createContext, useContext } from 'react';
import { AuthUser } from '@/utils/useAuth';

interface AuthContextValue {
  user: AuthUser | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = AuthContext.Provider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }

  return context;
};