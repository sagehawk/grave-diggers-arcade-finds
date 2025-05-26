
import React from 'react';
import CategoryFilters from '../CategoryFilters';
import GameGrid from '../GameGrid';
import FilterPanel from '../FilterPanel';
import { FilterState } from '../../types';

interface MainContentProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

const MainContent: React.FC<MainContentProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left side - Main content */}
      <div className="flex-1">
        {/* Category filters */}
        <CategoryFilters 
          filter={filter} 
          onFilterChange={onFilterChange}
        />
        
        {/* Game grid */}
        <GameGrid 
          filter={filter}
          title="Featured Games"
          itemsPerPage={12}
        />
      </div>
      
      {/* Right side - Desktop filters (hidden on mobile) */}
      <div className="hidden md:block md:w-80">
        <div className="sticky top-6">
          <FilterPanel filter={filter} onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
