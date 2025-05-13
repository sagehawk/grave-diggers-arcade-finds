
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Heart, MessageSquare, Eye } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-ggrave-darkgray border border-gray-800 hover:border-ggrave-red transition-all duration-300 rounded-sm overflow-hidden shadow-lg">
      <Link to={`/games/${game.id}`} className="block">
        <div className="relative group">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-3 py-1 flex justify-between text-xs">
            <span className="text-white font-medium">{game.price === 'Free' ? 'Free' : `$${game.price}`}</span>
            <div className="flex items-center space-x-2">
              <span className="bg-ggrave-red text-white px-1 rounded-sm uppercase text-[10px]">
                {game.releaseStatus}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-pixel text-sm text-white mb-1 truncate">{game.title}</h3>
          <p className="text-xs text-gray-400 mb-2">by {game.developer}</p>
          
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <div className="flex items-center space-x-1">
              {game.platforms.slice(0, 3).map((platform) => (
                <span key={platform} className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded-sm text-[10px]">
                  {platform.substring(0, 3)}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded-sm text-[10px]">
                  +{game.platforms.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="bg-black bg-opacity-50 text-xs border-t border-gray-800 p-2 flex justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Eye size={12} className="text-gray-400 mr-1" />
            <span className="text-gray-400">{game.views}</span>
          </div>
          <div className="flex items-center">
            <Heart size={12} className="text-ggrave-red mr-1" />
            <span className="text-gray-400">{game.likes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={12} className="text-gray-400 mr-1" />
            <span className="text-gray-400">{game.comments}</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-500">
          {new Date(game.releaseDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
