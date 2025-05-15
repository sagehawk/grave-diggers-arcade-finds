
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilterState } from '../types';

interface CategoryFiltersProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
  filter?: FilterState;
  onFilterChange?: (filter: FilterState) => void;
}

const categories = [
  "All", "Trending", "New Releases", "Most Played", "Top Rated"
];

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  onSelectCategory, 
  activeCategory,
  filter,
  onFilterChange
}) => {
  // Handle category selection based on which props were provided
  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else if (filter && onFilterChange) {
      // Handle filtering logic with the FilterState if that's what's being used
      onFilterChange({
        ...filter,
        sortBy: category === "Trending" ? "trending" : 
                category === "New Releases" ? "newest" : 
                category === "Most Played" ? "mostViewed" : 
                category === "Top Rated" ? "highestRated" : "trending"
      });
    }
  };

  // Determine which category is active
  const getIsActive = (category: string) => {
    if (activeCategory !== undefined) {
      return activeCategory === category;
    } else if (filter) {
      return (category === "Trending" && filter.sortBy === "trending") ||
             (category === "New Releases" && filter.sortBy === "newest") ||
             (category === "Most Played" && filter.sortBy === "mostViewed") ||
             (category === "Top Rated" && filter.sortBy === "highestRated");
    }
    return false;
  };

  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-bold text-white mb-4 font-pixel">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            variant={getIsActive(category) ? "default" : "outline"}
            className={`
              rounded-md px-4 py-2 
              ${getIsActive(category) 
                ? 'bg-ggrave-red hover:bg-red-700' 
                : 'bg-transparent border border-gray-700 hover:bg-gray-800 text-white'}
              font-pixel
            `}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
