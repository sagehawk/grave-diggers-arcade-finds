
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilterState } from '../types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface CategoryFiltersProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
  filter?: FilterState;
  onFilterChange?: (filter: FilterState) => void;
}

const categories = [
  "All", "Trending", "New Releases", "Most Played", "Top Rated"
];

const timeframes = [
  { label: "All Time", value: "allTime" },
  { label: "Last 30 Days", value: "month" },
  { label: "Last 7 Days", value: "week" },
  { label: "Today", value: "today" }
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Most Viewed", value: "mostViewed" },
  { label: "Highest Rated", value: "highestRated" },
  { label: "Trending", value: "trending" }
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
                category === "Top Rated" ? "highestRated" : 
                category === "All" ? "newest" : "trending"
      });
    }
  };

  // Determine which category is active
  const getIsActive = (category: string) => {
    if (activeCategory !== undefined) {
      return activeCategory === category;
    } else if (filter) {
      return (category === "All" && !filter.sortBy) ||
             (category === "Trending" && filter.sortBy === "trending") ||
             (category === "New Releases" && filter.sortBy === "newest") ||
             (category === "Most Played" && filter.sortBy === "mostViewed") ||
             (category === "Top Rated" && filter.sortBy === "highestRated");
    }
    return false;
  };

  // Handle timeframe selection
  const handleTimeframeChange = (value: string) => {
    if (filter && onFilterChange) {
      onFilterChange({
        ...filter,
        timeFrame: value as FilterState['timeFrame']
      });
    }
  };

  // Handle sort by change
  const handleSortChange = (value: string) => {
    if (filter && onFilterChange) {
      onFilterChange({
        ...filter,
        sortBy: value as FilterState['sortBy']
      });
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-xl font-bold text-white mb-4 md:mb-0 font-pixel">Categories</h2>
        
        <div className="flex flex-col md:flex-row gap-3">
          {/* Timeframe Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                {filter?.timeFrame ? timeframes.find(t => t.value === filter.timeFrame)?.label || 'All Time' : 'All Time'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              {timeframes.map(timeframe => (
                <DropdownMenuItem 
                  key={timeframe.value} 
                  className="text-white hover:bg-gray-700"
                  onClick={() => handleTimeframeChange(timeframe.value)}
                >
                  {timeframe.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sorting Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                {filter?.sortBy ? sortOptions.find(s => s.value === filter.sortBy)?.label || 'Newest' : 'Newest'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              {sortOptions.map(sort => (
                <DropdownMenuItem 
                  key={sort.value} 
                  className="text-white hover:bg-gray-700"
                  onClick={() => handleSortChange(sort.value)}
                >
                  {sort.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
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
