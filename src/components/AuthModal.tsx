
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { SignInFormData, SignUpFormData } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";

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
  const { login, signup } = useAuth();
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
    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast({
          title: "Success!",
          description: "You've been logged in.",
        });
        onClose();
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onRegisterSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    try {
      const success = await signup(data.username, data.email, data.password);
      if (success) {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        onClose();
      } else {
        toast({
          title: "Registration failed",
          description: "Please check your information and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onForgotPasswordSubmit = async (data: { email: string }) => {
    // This would typically call an API endpoint to send a password reset email
    toast({
      title: "Password reset email sent",
      description: "If an account exists with that email, you'll receive a password reset link shortly.",
    });
    setView('login');
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

        {/* Login View */}
        {view === 'login' && (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
              <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => setView('register')}
                >
                  Need an account?
                </Button>
                <Button type="submit" className="bg-ggrave-red hover:bg-red-700">
                  Log In
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
                      <Input
                        placeholder="Choose a username"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
                      <Input
                        placeholder="your.email@example.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Choose a strong password"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Repeat your password"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
                  Already have an account?
                </Button>
                <Button type="submit" className="bg-ggrave-red hover:bg-red-700">
                  Create Account
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
                      <Input
                        placeholder="your.email@example.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
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
                <Button type="submit" className="bg-ggrave-red hover:bg-red-700">
                  Send Reset Link
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
