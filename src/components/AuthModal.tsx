
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '../lib/supabase';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import ForgotPasswordForm from './auth/ForgotPasswordForm';
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register' | 'forgotPassword';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  defaultView = 'login' 
}) => {
  const [view, setView] = useState<'login' | 'register' | 'forgotPassword'>(defaultView);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleGoogleLogin = async () => {
    setAuthError(null);
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
      
      setAuthError(error instanceof Error ? error.message : "An error occurred during Google login");
    }
  };

  const handleModalClose = () => {
    onClose();
    // Reset form state when modal closes
    setTimeout(() => {
      setAuthError(null);
      setIsSubmitting(false);
    }, 300); // Small delay to allow closing animation
  };

  const handleSuccess = () => {
    toast({
      title: "Success!",
      description: view === 'login' ? 
        "You've been logged in." : 
        "Your account has been created. Please check your email for confirmation instructions.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="sm:max-w-[425px] bg-ggrave-black border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="font-pixel text-ggrave-red">
            {view === 'login' ? 'Log In' : view === 'register' ? 'Sign Up' : 'Reset Password'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {view === 'login' ? 'Enter your credentials to access your account.' : 
             view === 'register' ? 'Create a new account to join the community.' : 
             'Enter your email to receive a password reset link.'}
          </DialogDescription>
        </DialogHeader>

        {/* Error Display */}
        {authError && (
          <Alert variant="destructive" className="bg-red-950 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {/* Form Views */}
        {view === 'login' && (
          <LoginForm 
            onSuccess={handleSuccess}
            setAuthError={setAuthError}
            onSwitchView={setView}
            handleGoogleLogin={handleGoogleLogin}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        )}

        {view === 'register' && (
          <RegisterForm 
            onSuccess={handleSuccess}
            setAuthError={setAuthError}
            onSwitchView={setView}
            handleGoogleLogin={handleGoogleLogin}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        )}

        {view === 'forgotPassword' && (
          <ForgotPasswordForm 
            onSwitchView={setView}
            setAuthError={setAuthError}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
