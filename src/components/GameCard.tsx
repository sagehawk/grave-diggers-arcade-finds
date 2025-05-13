
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Heart, MessageSquare, Eye } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-[#181818] border border-gray-800 hover:border-ggrave-red transition-all duration-300 rounded-sm overflow-hidden shadow-md group">
      <Link to={`/games/${game.id}`} className="block">
        <div className="relative">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {game.releaseStatus === 'In Development' && (
            <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[9px] px-1 py-0.5 rounded-sm">
              In Development
            </span>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-pixel text-[14px] text-white mb-1 truncate">{game.title}</h3>
          
          <div className="flex justify-between items-center text-[11px] text-gray-400 mt-1">
            <div className="flex items-center gap-1">
              {game.platforms.slice(0, 1).map((platform) => (
                <span key={platform} className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-sm text-[10px]">
                  {platform.substring(0, 1)}
                </span>
              ))}
            </div>
            <span className="text-[10px]">{new Date(game.releaseDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
      
      <div className="bg-black bg-opacity-50 text-[10px] border-t border-gray-800 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-3 opacity-70 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center">
            <Heart size={12} className="text-ggrave-red mr-1" />
            <span className="text-gray-400">{game.likes}</span>
          </div>
          <div className="flex items-center">
            <Eye size={12} className="text-gray-400 mr-1" />
            <span className="text-gray-400">{Math.floor(game.views / 1000)}k</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={12} className="text-gray-400 mr-1" />
            <span className="text-gray-400">{game.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
