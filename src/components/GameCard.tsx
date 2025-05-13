
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Heart, MessageSquare, Eye } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Function to calculate relative time from date
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    const diffWeeks = Math.round(diffDays / 7);
    const diffMonths = Math.round(diffDays / 30);
    const diffYears = Math.round(diffDays / 365);

    if (diffMins < 60) return { text: `${diffMins}m`, color: 'text-ggrave-red' };
    if (diffHours <= 3) return { text: `${diffHours}h`, color: 'text-yellow-500' };
    if (diffHours < 24) return { text: `${diffHours}h`, color: '' };
    if (diffDays < 7) return { text: `${diffDays}d`, color: '' };
    if (diffWeeks < 4) return { text: `${diffWeeks}w`, color: '' };
    if (diffMonths < 12) return { text: `${diffMonths}mo`, color: '' };
    return { text: `${diffYears}y`, color: '' };
  };

  // Get relative time with color
  const relativeTime = getRelativeTime(game.releaseDate);

  // Map platform to abbreviations
  const getPlatformAbbreviation = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'windows': return 'Win';
      case 'mac': return 'Mac';
      case 'linux': return 'Lin';
      case 'steam': return 'Steam';
      case 'switch': return 'Switch';
      case 'playstation': return 'PS5';
      case 'xbox': return 'Xbox';
      case 'ios': return 'iOS';
      case 'android': return 'Android';
      case 'browser': return 'Web';
      case 'mobile': return 'Mobile';
      default: return platform;
    }
  };

  return (
    <Link to={`/games/${game.id}`} className="block w-full">
      <div className="w-full">
        {/* Thumbnail with 16:9 aspect ratio */}
        <div className="relative w-full pb-[56.25%] overflow-hidden">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {game.releaseStatus === 'In Development' && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-sm">
              In Development
            </span>
          )}
        </div>
        
        {/* Game information */}
        <div className="py-2">
          {/* Title */}
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-white truncate pr-2">{game.title}</h3>
          </div>
          
          {/* Status tag and platform tags */}
          <div className="flex justify-between items-center mt-1">
            {game.releaseStatus && (
              <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-sm">
                {game.releaseStatus}
              </span>
            )}
            
            {/* Platform tags */}
            <div className="flex flex-wrap gap-1 justify-end">
              {game.platforms.slice(0, 3).map((platform, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded-sm"
                >
                  {getPlatformAbbreviation(platform)}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className="text-xs text-gray-400">+{game.platforms.length - 3}</span>
              )}
            </div>
          </div>
          
          {/* Relative time and stats */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center">
                <Heart size={14} className="text-ggrave-red mr-1" />
                <span className="text-gray-300">{game.likes}</span>
              </div>
              <div className="flex items-center">
                <Eye size={14} className="text-gray-300 mr-1" />
                <span className="text-gray-300">{Math.floor(game.views / 1000)}k</span>
              </div>
              <div className="flex items-center">
                <MessageSquare size={14} className="text-gray-300 mr-1" />
                <span className="text-gray-300">{game.comments}</span>
              </div>
            </div>
            <span className={`text-xs ${relativeTime.color}`}>{relativeTime.text}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
