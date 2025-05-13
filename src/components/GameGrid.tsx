
import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  title: string;
  viewAllLink?: string;
}

const GameGrid: React.FC<GameGridProps> = ({ games, title, viewAllLink }) => {
  if (games.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center bg-ggrave-darkgray mb-3 p-2 border-l-4 border-ggrave-red">
        <h2 className="font-pixel text-white text-xs md:text-sm">{title}</h2>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-ggrave-red hover:underline text-xs font-medium"
          >
            View All
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
