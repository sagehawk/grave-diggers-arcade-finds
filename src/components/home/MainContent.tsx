
import React from 'react';
import { FilterState, Game } from '../../types';
import ActiveFilters from '../ActiveFilters';
import GameGrid from '../GameGrid';

interface MainContentProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  games: Game[];
}

export const MainContent: React.FC<MainContentProps> = ({ filter, onFilterChange, games }) => {
  return (
    <div>
      {/* Active Filters */}
      <ActiveFilters 
        filter={filter} 
        onFilterChange={onFilterChange} 
        className="mb-4" 
      />
      
      {/* Game Grid Title with result count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-pixel text-white text-lg">
          {filter.searchQuery ? 'SEARCH RESULTS' : 'FEATURED GAMES'}
        </h2>
      </div>
      
      {/* Game Grid - Portfolio version */}
      <GameGrid 
        filter={filter}
        title="" 
        viewAllLink={`/games/all`}
        games={games}
      />
    </div>
  );
};

export default MainContent;
