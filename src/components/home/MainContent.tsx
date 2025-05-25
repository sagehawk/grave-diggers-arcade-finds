
import React from 'react';
import { FilterState } from '../../types';
import ActiveFilters from '../ActiveFilters';
import GameGrid from '../GameGrid';
import SampleDataLoader from '../SampleDataLoader';

interface MainContentProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ filter, onFilterChange }) => {
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
          {filter.searchQuery ? 'SEARCH RESULTS' : 'GAMES'}
        </h2>
      </div>
      
      {/* Game Grid - uses filter prop directly */}
      <GameGrid 
        filter={filter}
        title="" 
        viewAllLink={`/games/all`}
        SampleDataLoader={SampleDataLoader}
      />
    </div>
  );
};

export default MainContent;
