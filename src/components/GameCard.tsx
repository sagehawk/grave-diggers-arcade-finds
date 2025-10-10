
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Eye, ThumbsUp, MessageSquare } from 'lucide-react';

interface GameCardProps {
  game: Game;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({ game, className }) => {
  const handleClick = () => {
    // Portfolio version - no database calls
    console.log(`Viewing game: ${game.name}`);
  };

  return (
    <Link 
      to={`/games/${game.id}`} 
      className={cn("block group", className)}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-md border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-ggrave-red">
        <div className="relative">
          <AspectRatio ratio={16/9} className="w-full h-auto">
            <img 
              src={game.background_image || 'https://placehold.co/600x400/222/333?text=No+Image'} 
              alt={game.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/222/333?text=No+Image';
              }}
            />
          </AspectRatio>
          
          {/* Game Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {game.platforms.slice(0, 3).map((platform, index) => (
                <span 
                  key={index}
                  className="bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-white text-xs"
                >
                  {platform.platform.name}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className="bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-white text-xs">
                  +{game.platforms.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Game Stats */}
          <div className="absolute top-2 right-2 flex gap-2">
            <div className="bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-white text-xs flex items-center">
              <Eye size={12} className="mr-1" />
              {game.added?.toLocaleString() || '0'}
            </div>
            <div className="bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-white text-xs flex items-center">
              <ThumbsUp size={12} className="mr-1" />
              {game.ratings_count?.toLocaleString() || '0'}
            </div>
            <div className="bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-white text-xs flex items-center">
              <MessageSquare size={12} className="mr-1" />
              {game.reviews_count?.toLocaleString() || '0'}
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-white truncate">{game.name}</h3>
          
          <div className="mt-1 flex items-center justify-between">
            {/* Status Badge */}
            <span className={`inline-block px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-300'
            `}>
              {new Date(game.released).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
