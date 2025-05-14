
import React from 'react';
import { Mail } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { supabase } from '../../lib/supabase';

interface ForgotPasswordFormProps {
  onSwitchView: (view: 'login') => void;
  setAuthError: (error: string | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSwitchView,
  setAuthError,
  isSubmitting,
  setIsSubmitting
}) => {
  
  const forgotPasswordForm = useForm<{ email: string }>({
    defaultValues: {
      email: ''
    }
  });

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
      
      // We don't show specific success messages for security reasons
      // to avoid revealing whether an email exists in the system
      alert("If an account exists with that email, you'll receive a password reset link shortly.");
      onSwitchView('login');
    } catch (error) {
      setAuthError("Failed to send password reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
            onClick={() => onSwitchView('login')}
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
  );
};

export default ForgotPasswordForm;
