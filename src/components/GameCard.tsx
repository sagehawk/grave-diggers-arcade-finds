
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Heart, MessageSquare, Eye } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-ggrave-darkgray border border-gray-800 hover:border-ggrave-red transition-all duration-300 rounded-sm overflow-hidden shadow-md">
      <Link to={`/games/${game.id}`} className="block">
        <div className="relative group">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {game.releaseStatus === 'In Development' && (
            <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[9px] px-1 py-0.5 rounded-sm">
              In Development
            </span>
          )}
        </div>
        
        <div className="p-2">
          <h3 className="font-pixel text-xs text-white mb-1 truncate">{game.title}</h3>
          
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
            <div className="flex items-center gap-1">
              {game.platforms.slice(0, 1).map((platform) => (
                <span key={platform} className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded-sm text-[9px]">
                  {platform.substring(0, 1)}
                </span>
              ))}
            </div>
            <span className="text-[9px]">{new Date(game.releaseDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
      
      <div className="bg-black bg-opacity-50 text-[10px] border-t border-gray-800 p-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Heart size={10} className="text-ggrave-red mr-0.5" />
            <span className="text-gray-400">{game.likes}</span>
          </div>
          <div className="flex items-center">
            <Eye size={10} className="text-gray-400 mr-0.5" />
            <span className="text-gray-400">{Math.floor(game.views / 1000)}k</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={10} className="text-gray-400 mr-0.5" />
            <span className="text-gray-400">{game.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
