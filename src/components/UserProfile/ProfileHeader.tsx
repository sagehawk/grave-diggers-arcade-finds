
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  profileUser: {
    username: string;
    avatarUrl?: string;
    createdAt: Date;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileUser }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20 border-2 border-ggrave-red">
          <AvatarImage src={profileUser.avatarUrl} alt={profileUser.username} />
          <AvatarFallback className="bg-gray-800 text-xl">
            {profileUser.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-3xl font-pixel text-white">{profileUser.username}</h1>
          <p className="text-gray-400">
            Member since {new Date(profileUser.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
