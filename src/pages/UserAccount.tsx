
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import UserSubmissions from '../components/UserSubmissions';
import ProfileSettings from '../components/ProfileSettings';
import ProfileHeader from '../components/UserProfile/ProfileHeader';
import UserBio from '../components/UserProfile/UserBio';
import { Loader2 } from 'lucide-react';
import LoadingIndicator from '../components/LoadingIndicator';

const UserAccount: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user, isAuthenticated } = useAuth();
  const [profileUser, setProfileUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // If username is 'me' and user is authenticated, redirect to their username
      if (username === 'me') {
        if (isAuthenticated && user) {
          navigate(`/account/${user.username}`, { replace: true });
          return;
        } else {
          // If not authenticated, redirect to login
          toast({
            title: "Authentication required",
            description: "Please log in to view your profile",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
      }
      
      // Check if this is the user's own profile
      if (isAuthenticated && user && user.username === username) {
        setIsOwnProfile(true);
        setProfileUser(user);
        setIsLoading(false);
        return;
      }
      
      // If not own profile, fetch user data from Supabase
      try {
        setIsOwnProfile(false);
        
        // Get user by username from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('username', username)
          .single();
          
        if (profileError) {
          console.error('Error fetching user data:', profileError);
          throw new Error('User not found');
        }
        
        setProfileUser({
          id: profileData.id,
          username: profileData.username,
          createdAt: new Date(profileData.createdAt),
          bio: profileData.bio,
          avatarUrl: profileData.avatarUrl
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setProfileUser(null);
        toast({
          title: "User not found",
          description: "The requested user profile could not be found.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username, user, isAuthenticated, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ggrave-black text-white">
        <Navbar />
        <div className="max-w-[1440px] mx-auto px-4 py-8 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-ggrave-black text-white">
        <Navbar />
        <div className="max-w-[1440px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-500 text-center">User not found</h1>
          <p className="text-center mt-4">
            The user you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ggrave-black text-white">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Profile Header/Banner */}
        <ProfileHeader profileUser={profileUser} />
        
        {/* Tabs Navigation */}
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="w-full bg-gray-800 mb-6">
            <TabsTrigger
              value="submissions"
              className="flex-1 data-[state=active]:bg-ggrave-red"
            >
              {isOwnProfile ? 'My Submissions' : 'Submissions'}
            </TabsTrigger>
            
            {isOwnProfile ? (
              <TabsTrigger
                value="settings"
                className="flex-1 data-[state=active]:bg-ggrave-red"
              >
                Profile Settings
              </TabsTrigger>
            ) : (
              <TabsTrigger
                value="profile"
                className="flex-1 data-[state=active]:bg-ggrave-red"
              >
                Profile
              </TabsTrigger>
            )}
            
            {/* Future tabs as placeholders */}
            {isOwnProfile && (
              <TabsTrigger
                value="favorites"
                className="flex-1 data-[state=active]:bg-ggrave-red"
                disabled
              >
                My Favorites
              </TabsTrigger>
            )}
            
            <TabsTrigger
              value="reviews"
              className="flex-1 data-[state=active]:bg-ggrave-red"
              disabled
            >
              {isOwnProfile ? 'My Reviews' : 'Reviews'}
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Contents */}
          <TabsContent value="submissions" className="mt-0">
            <UserSubmissions userId={profileUser.id} isOwnProfile={isOwnProfile} />
          </TabsContent>
          
          {isOwnProfile ? (
            <TabsContent value="settings" className="mt-0">
              <ProfileSettings user={profileUser} />
            </TabsContent>
          ) : (
            <TabsContent value="profile" className="mt-0">
              <UserBio username={profileUser.username} bio={profileUser.bio} />
            </TabsContent>
          )}
          
          {/* Placeholder content for future tabs */}
          <TabsContent value="favorites" className="mt-0">
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-center text-gray-400">Favorites feature coming soon!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-center text-gray-400">Reviews feature coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAccount;
