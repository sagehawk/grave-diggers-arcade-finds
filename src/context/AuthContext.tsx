
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';
import { supabase } from '../lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: { bio?: string }) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateUserProfile: async () => false,
  changePassword: async () => false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkSession = async () => {
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
    };

    checkSession();
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
      // Create a user in Supabase (for demonstration - typically you'd use Supabase Auth)
      const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      
      // For now, we're just using a mock user
      const mockUser: User = {
        id: newUserId,
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

  // Update user profile
  const updateUserProfile = async (data: { bio?: string }): Promise<boolean> => {
    if (!user) return false;

    try {
      // In a real implementation, you would update the user profile in Supabase
      // For now, we'll just update the user in localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive"
      });
      
      return false;
    }
  };

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // In a real implementation, you would verify the current password and update it in Supabase
      // For now, we'll just show a success message
      
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Password change failed:', error);
      
      toast({
        title: "Password change failed",
        description: "Failed to change your password. Please try again.",
        variant: "destructive"
      });
      
      return false;
    }
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
        updateUserProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
