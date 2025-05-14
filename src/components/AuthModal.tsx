
import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { SignInFormData, SignUpFormData } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const { login, signup, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  
  const loginForm = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const registerForm = useForm<SignUpFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const forgotPasswordForm = useForm<{ email: string }>({
    defaultValues: {
      email: ''
    }
  });

  const onLoginSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      const { success, error } = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Success!",
          description: "You've been logged in.",
        });
        onClose();
      } else {
        setAuthError(error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      await loginWithGoogle();
      // The page will redirect to Google, so no need for success handling here
    } catch (error) {
      setAuthError("Google login failed. Please try again.");
    }
  };

  const onRegisterSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    if (data.password !== data.confirmPassword) {
      setAuthError("Passwords don't match");
      setIsSubmitting(false);
      return;
    }

    if (data.password.length < 6) {
      setAuthError("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const { success, error } = await signup(data.username, data.email, data.password);
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        onClose();
      } else {
        setAuthError(error || "Registration failed. Please check your information and try again.");
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onForgotPasswordSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "If an account exists with that email, you'll receive a password reset link shortly.",
      });
      setView('login');
    } catch (error) {
      setAuthError("Failed to send password reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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

        {/* Login View */}
        {view === 'login' && (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email or Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="your.email@example.com"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm">
                <button 
                  type="button"
                  className="text-ggrave-red hover:underline"
                  onClick={() => setView('forgotPassword')}
                >
                  Forgot password?
                </button>
              </div>
              
              {/* Social Login Options */}
              <div className="my-4">
                <div className="flex items-center">
                  <div className="flex-grow h-px bg-gray-700"></div>
                  <span className="px-3 text-sm text-gray-500">or continue with</span>
                  <div className="flex-grow h-px bg-gray-700"></div>
                </div>
                <div className="mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path 
                        fill="currentColor" 
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => setView('register')}
                >
                  Need an account?
                </Button>
                <Button 
                  type="submit" 
                  className="bg-ggrave-red hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {/* Register View */}
        {view === 'register' && (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Choose a username"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="your.email@example.com"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Choose a strong password"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Repeat your password"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Social Login Options */}
              <div className="my-4">
                <div className="flex items-center">
                  <div className="flex-grow h-px bg-gray-700"></div>
                  <span className="px-3 text-sm text-gray-500">or continue with</span>
                  <div className="flex-grow h-px bg-gray-700"></div>
                </div>
                <div className="mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path 
                        fill="currentColor" 
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => setView('login')}
                >
                  Already have an account?
                </Button>
                <Button 
                  type="submit" 
                  className="bg-ggrave-red hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {/* Forgot Password View */}
        {view === 'forgotPassword' && (
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="your.email@example.com"
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => setView('login')}
                >
                  Back to login
                </Button>
                <Button 
                  type="submit" 
                  className="bg-ggrave-red hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
