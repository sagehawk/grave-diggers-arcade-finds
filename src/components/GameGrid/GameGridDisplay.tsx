
import React from 'react';
import { Game } from '../../types';
import GameCard from '../GameCard';
import LoadingIndicator from '../LoadingIndicator';

interface GameGridDisplayProps {
  displayedGames: Game[];
  isLoading: boolean;
  initialLoading: boolean;
  hasMoreGames: boolean;
  itemsPerPage: number;
  className: string;
  loadingRef: React.RefObject<HTMLDivElement>;
}

const GameGridDisplay: React.FC<GameGridDisplayProps> = ({
  displayedGames,
  isLoading,
  initialLoading,
  hasMoreGames,
  itemsPerPage,
  className,
  loadingRef
}) => {
  if (initialLoading) {
    return (
      <div className={`mb-6 ${className}`}>
        <div className="flex justify-center py-10">
          <LoadingIndicator />
        </div>
      </div>
    );
  }
  
  if (displayedGames.length === 0 && !isLoading && !initialLoading) {
    return (
      <div className={`mb-6 ${className}`}>
        <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-800">
          <h3 className="text-gray-400 text-lg font-medium">No games found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`mb-6 ${className}`}>
      {/* Grid of game cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displayedGames.map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            className="animate-fade-in"
            style={{
              animationDelay: `${(index % itemsPerPage) * 100}ms`
            }}
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
      
      {/* Loading indicator and infinite scroll trigger */}
      {hasMoreGames && (
        <div ref={loadingRef} className="pt-8 flex justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <LoadingIndicator />
              <p className="text-gray-400 text-sm">Loading more games...</p>
            </div>
          ) : (
            <div className="h-8 w-full flex items-center justify-center text-gray-500 text-sm">
              Scroll down for more games...
            </div>
          )}
        </div>
      )}
      
      {!hasMoreGames && displayedGames.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="text-gray-500 text-sm">
            Showing all {displayedGames.length} games
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGridDisplay;
