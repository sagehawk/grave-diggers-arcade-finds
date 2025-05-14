
import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useForm } from "react-hook-form";
import { SignUpFormData } from '../../types/auth';
import { useAuth } from '../../context/auth/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  onSuccess: () => void;
  setAuthError: (error: string | null) => void;
  onSwitchView: (view: 'login') => void;
  handleGoogleLogin: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  setAuthError, 
  onSwitchView,
  handleGoogleLogin,
  isSubmitting,
  setIsSubmitting
}) => {
  const { signup } = useAuth();
  const { toast } = useToast();
  
  const registerForm = useForm<SignUpFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

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
          description: "Please check your email to confirm your account before logging in.",
        });
        onSuccess();
      } else {
        setAuthError(error || "Registration failed. Please check your information and try again.");
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
            onClick={() => onSwitchView('login')}
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
  );
};

export default RegisterForm;
