import React, { useState, useEffect, ReactNode } from 'react';
import { User } from '../../types/auth';
import { useToast } from '@/hooks/use-toast';
import { AuthContext } from './AuthContext';
import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  signIn,
  signUp,
  signOut,
  updatePassword,
  AuthSession,
  signInWithRedirect,
  AuthUser
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadUserAndSession = async () => {
    try {
      const currentSession = await fetchAuthSession();
      if (currentSession.tokens) {
        setSession(currentSession);
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        setUser({
          id: currentUser.userId,
          username: attributes.preferred_username || attributes.nickname || attributes.email?.split('@')[0] || currentUser.username,
          email: attributes.email || '',
          createdAt: new Date(), // We don't have direct access to creation date via simple fetch
        });
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (err) {
      console.log('No active session found.');
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserAndSession();

    // Listen to Amplify Auth Hub events (e.g. successful Google redirect login)
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          loadUserAndSession();
          break;
        case 'signedOut':
          setUser(null);
          setSession(null);
          break;
        case 'signInWithRedirect':
          loadUserAndSession();
          break;
        case 'tokenRefresh':
          loadUserAndSession();
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password
      });

      if (isSignedIn) {
        await loadUserAndSession();
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return { success: true };
      }

      return { success: false, error: 'Additional verification required: ' + nextStep.signInStep };
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

  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error('Google login failed:', error);
      toast({
        title: "Google login failed",
        description: error instanceof Error ? error.message : "An error occurred during Google login",
        variant: "destructive",
      });
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            preferred_username: username
          }
        }
      });

      if (!isSignUpComplete) {
        toast({
          title: "Check your email",
          description: "Please check your email to verify your account before logging in.",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "You have been fully registered.",
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Signup failed:', error);
      let errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut();
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

  const updateUserProfile = async (data: { bio?: string }): Promise<boolean> => {
    // AWS Cognito requires mapping bio to custom attributes if we want it. 
    // We'll leave it returning true to fake success until a full AWS DynamoDB profile system is implemented.
    toast({
      title: "Profile updated",
      description: "Note: Bio update is simulated in AWS mode until DynamoDB profiles are wired up.",
    });
    if (user) {
      setUser({ ...user, bio: data.bio });
    }
    return true;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      await updatePassword({ oldPassword: currentPassword, newPassword });
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
