
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  loginWithGoogle: async () => {},
  signup: async () => ({ success: false }),
  logout: () => {},
  updateUserProfile: async () => false,
  changePassword: async () => false,
});
