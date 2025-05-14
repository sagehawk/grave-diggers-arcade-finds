
import React from 'react';
import { MessageCircleQuestion, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CommunityPost {
  id: string;
  type: 'Question' | 'Request';
  title: string;
  userName: string;
  userInitials: string;
  commentCount: number;
  isLive?: boolean;
}

interface CommunityBuzzSectionProps {
  className?: string;
}

const CommunityBuzzSection: React.FC<CommunityBuzzSectionProps> = ({ className = '' }) => {
  // Sample community posts data (in a real app, this would come from a database/API)
  const communityPosts: CommunityPost[] = [
    {
      id: '123',
      type: 'Question',
      title: 'Best Indie RPGs of 2023',
      userName: 'RetroStudio',
      userInitials: 'RS',
      commentCount: 128
    },
    {
      id: '456',
      type: 'Question',
      title: 'Hidden Pixel Art Gems',
      userName: 'PixelArtist',
      userInitials: 'PA',
      commentCount: 95
    },
    {
      id: '789',
      type: 'Request',
      title: 'Indie Dev AMA: RetroStudio',
      userName: 'RetroStudio',
      userInitials: 'RS',
      commentCount: 47,
      isLive: true
    },
    {
      id: '101',
      type: 'Request',
      title: 'Need testers for my new game',
      userName: 'GameDev42',
      userInitials: 'GD',
      commentCount: 32
    },
    {
      id: '102',
      type: 'Question',
      title: 'How to implement pixel-perfect collision?',
      userName: 'CodeNerd',
      userInitials: 'CN',
      commentCount: 75
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="bg-[#181818] border-l-4 border-ggrave-red p-2 mb-3">
        <h3 className="text-white text-sm font-medium">COMMUNITY BUZZ</h3>
      </div>
      
      <div className="space-y-3">
        {communityPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-[#181818] border border-gray-800 p-3 rounded-sm hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 flex items-center justify-center text-sm text-white">
                {post.userInitials}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {post.type === 'Question' ? (
                    <MessageCircleQuestion size={16} className="text-blue-400" />
                  ) : (
                    <AlertTriangle size={16} className="text-yellow-400" />
                  )}
                  <span className="text-xs text-gray-400">{post.type}</span>
                </div>
                <h3 className="text-white font-medium text-sm">{post.title}</h3>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-xs">
                By <span className="text-white">{post.userName}</span> with <span className="text-white">{post.commentCount}</span> comments
              </p>
              
              <div className="flex items-center">
                {post.isLive && (
                  <span className="bg-ggrave-red px-1.5 py-0.5 text-[9px] rounded-sm text-white mr-2">
                    LIVE
                  </span>
                )}
                <a 
                  href={`/community/topic/${post.id}`} 
                  className="text-ggrave-red text-xs hover:underline"
                >
                  {post.type === 'Question' ? 'View Discussion' : 'Join In'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBuzzSection;
