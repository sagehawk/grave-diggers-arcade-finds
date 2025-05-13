
import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/auth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface ProfileSettingsProps {
  user: User;
}

interface ProfileFormData {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  bio: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { updateUserProfile, changePassword } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<ProfileFormData>({
    defaultValues: {
      username: user.username,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      bio: user.bio || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Update profile if bio has changed
      if (data.bio !== user.bio) {
        // Use Supabase directly to update bio
        const { error } = await supabase
          .from('users')
          .update({ bio: data.bio })
          .eq('id', user.id);
          
        if (error) throw new Error(`Failed to update profile: ${error.message}`);
        
        // Also update via auth context (which should update local state)
        await updateUserProfile({ bio: data.bio });
        
        toast({
          title: "Profile updated",
          description: "Your bio has been updated successfully.",
        });
      }
      
      // Change password if new password is provided
      if (data.currentPassword && data.newPassword) {
        if (data.newPassword !== data.confirmNewPassword) {
          form.setError('confirmNewPassword', {
            type: 'manual',
            message: 'Passwords do not match',
          });
          return;
        }
        
        const success = await changePassword(data.currentPassword, data.newPassword);
        
        if (success) {
          toast({
            title: "Password updated",
            description: "Your password has been changed successfully.",
          });
          
          // Clear password fields
          form.setValue('currentPassword', '');
          form.setValue('newPassword', '');
          form.setValue('confirmNewPassword', '');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white"
                    disabled 
                  />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Username cannot be changed. Contact support for assistance.
                </FormDescription>
              </FormItem>
            )}
          />
          
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white"
                    disabled 
                  />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Email cannot be changed. Contact support for assistance.
                </FormDescription>
              </FormItem>
            )}
          />
          
          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white resize-none min-h-[100px]" 
                    placeholder="Tell the community about yourself..." 
                  />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Your bio will be visible on your public profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border-t border-gray-800 my-8 pt-8">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Current Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      className="bg-gray-800 border-gray-700 text-white" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* New Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">New Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        className="bg-gray-800 border-gray-700 text-white" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Confirm New Password */}
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        className="bg-gray-800 border-gray-700 text-white" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-ggrave-red hover:bg-red-700"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;
