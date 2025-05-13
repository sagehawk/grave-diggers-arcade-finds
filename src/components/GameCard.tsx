
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Heart, MessageSquare, Eye } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-[#181818] border border-gray-800 hover:border-ggrave-red transition-all duration-300 rounded-sm overflow-hidden shadow-md group w-full">
      <Link to={`/games/${game.id}`} className="block">
        <div className="relative">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {game.releaseStatus === 'In Development' && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-sm">
              In Development
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-pixel text-base text-white mb-2 truncate">{game.title}</h3>
          
          <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
            <div className="flex items-center gap-1.5">
              {game.platforms.slice(0, 2).map((platform) => (
                <span key={platform} className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-sm text-xs">
                  {platform.substring(0, 3)}
                </span>
              ))}
              {game.platforms.length > 2 && (
                <span className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-sm text-xs">
                  +{game.platforms.length - 2}
                </span>
              )}
            </div>
            <span className="text-xs">{new Date(game.releaseDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
      
      <div className="bg-black bg-opacity-50 text-xs border-t border-gray-800 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 opacity-70 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center">
            <Heart size={16} className="text-ggrave-red mr-1.5" />
            <span className="text-gray-300">{game.likes}</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="text-gray-300 mr-1.5" />
            <span className="text-gray-300">{Math.floor(game.views / 1000)}k</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={16} className="text-gray-300 mr-1.5" />
            <span className="text-gray-300">{game.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
