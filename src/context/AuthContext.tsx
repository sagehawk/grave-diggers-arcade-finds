
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';
import { supabase } from '../lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserProfile: (data: { bio?: string }) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check if user is already logged in (using Supabase session)
  useEffect(() => {
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession) {
          // Use setTimeout to avoid potential infinite loops
          setTimeout(() => {
            handleSessionChange(currentSession);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );
    
    // Then check the current session
    const checkSession = async () => {
      try {
        // Get session from Supabase
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          setSession(currentSession);
          await handleSessionChange(currentSession);
        }
      } catch (error) {
        console.error('Failed to check auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Helper function to handle session changes
  const handleSessionChange = async (session: Session) => {
    try {
      const userId = session.user.id;
      
      // Get user profile from public profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        throw profileError;
      }
      
      setUser({
        id: userId,
        email: session.user.email || '',
        username: profile?.username || session.user.email?.split('@')[0] || 'User',
        createdAt: profile?.created_at ? new Date(profile.created_at) : new Date(),
        avatarUrl: profile?.avatar_url || undefined,
        bio: profile?.bio || undefined
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Still set basic user info from session
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.email?.split('@')[0] || 'User',
          createdAt: new Date(),
        });
      }
    }
  };

  // Login function using Supabase
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : "Please check your email and password";
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) throw error;
      
      // No need for toast here as the page will redirect to Google
    } catch (error) {
      console.error('Google login failed:', error);
      
      toast({
        title: "Google login failed",
        description: error instanceof Error ? error.message : "An error occurred during Google login",
        variant: "destructive",
      });
    }
  };

  // Signup function using Supabase
  const signup = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          }
        }
      });
      
      if (authError) throw authError;
      
      // Create a profile entry in the public profiles table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            username,
            email,
            created_at: new Date().toISOString(),
          });
          
        if (profileError) {
          console.error('Profile creation failed:', profileError);
          toast({
            title: "Profile setup issue",
            description: "Your account was created but there was an issue setting up your profile.",
            variant: "destructive",
          });
        }
      }
      
      toast({
        title: "Registration successful",
        description: "Welcome to GamerGrave!",
      });
      
      return { success: true };
    } catch (error) {
      console.error('Signup failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Logout function with Supabase
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout failed:', error);
      
      toast({
        title: "Logout failed",
        description: "An error occurred while trying to log out.",
        variant: "destructive",
      });
    }
  };

  // Update user profile
  const updateUserProfile = async (data: { bio?: string }): Promise<boolean> => {
    if (!user) return false;

    try {
      // Update the profile in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          bio: data.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...data } : null);
      
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
    try {
      // First verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });
      
      if (signInError) throw new Error('Current password is incorrect');
      
      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (updateError) throw updateError;
      
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Password change failed:', error);
      
      toast({
        title: "Password change failed",
        description: error instanceof Error ? error.message : "Failed to change your password. Please try again.",
        variant: "destructive"
      });
      
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
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
