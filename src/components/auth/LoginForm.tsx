
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useForm } from "react-hook-form";
import { SignInFormData } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface LoginFormProps {
  onSuccess: () => void;
  setAuthError: (error: string | null) => void;
  onSwitchView: (view: 'register' | 'forgotPassword') => void;
  handleGoogleLogin: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  setAuthError, 
  onSwitchView,
  handleGoogleLogin,
  isSubmitting,
  setIsSubmitting
}) => {
  const { login } = useAuth();
  
  const loginForm = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onLoginSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      const { success, error } = await login(data.email, data.password);
      
      if (success) {
        onSuccess();
      } else {
        setAuthError(error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
            onClick={() => onSwitchView('forgotPassword')}
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
            onClick={() => onSwitchView('register')}
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
  );
};

export default LoginForm;
