
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface GameCardProps {
  game: Game;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({ game, className }) => {
  return (
    <Link to={`/games/${game.id}`} className={cn("block group", className)}>
      <div className="relative overflow-hidden rounded-md border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-ggrave-red">
        <div className="relative">
          <AspectRatio ratio={16/9} className="w-full h-auto">
            <img 
              src={game.thumbnail || 'https://placehold.co/600x400/222/333?text=No+Image'} 
              alt={game.title}
              className="w-full h-full object-cover"
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
                  {platform}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className="bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-white text-xs">
                  +{game.platforms.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-white truncate">{game.title}</h3>
          
          <div className="mt-1 flex items-center justify-between">
            {/* Status Badge */}
            <span className={`inline-block px-2 py-0.5 rounded text-xs ${
              game.releaseStatus === 'Released' ? 'bg-green-900 text-green-300' :
              game.releaseStatus === 'In Development' ? 'bg-blue-900 text-blue-300' :
              game.releaseStatus === 'Demo Available' ? 'bg-purple-900 text-purple-300' :
              'bg-gray-800 text-gray-300'
            }`}>
              {game.releaseStatus || 'Unknown'}
            </span>
            
            {/* Price */}
            <span className="text-sm text-gray-400">
              {game.price || 'Free'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
