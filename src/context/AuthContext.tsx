
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock implementation - in a real app, this would call an API
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        username: email.split('@')[0],
        email,
        createdAt: new Date(),
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock implementation - in a real app, this would call an API
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        username,
        email,
        createdAt: new Date(),
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
