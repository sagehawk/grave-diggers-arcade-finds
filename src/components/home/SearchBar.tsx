
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import FilterPanel from '../FilterPanel';
import CommunityBuzzSection from '../CommunityBuzzSection';
import { FilterState } from '../../types';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  clearSearch: () => void;
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

const timeframes = [
  { label: "All Time", value: "allTime" },
  { label: "Last 30 Days", value: "month" },
  { label: "Last 7 Days", value: "week" },
  { label: "Today", value: "today" }
];

const sortOptions = [
  { label: "Trending", value: "trending" },
  { label: "Newest", value: "newest" },
  { label: "Most Viewed", value: "mostViewed" },
  { label: "Highest Rated", value: "highestRated" },
  { label: "Most Liked", value: "mostLiked" }
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
  clearSearch,
  filter,
  onFilterChange
}) => {
  const handleTimeframeChange = (value: string) => {
    onFilterChange({
      ...filter,
      timeFrame: value as FilterState['timeFrame']
    });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({
      ...filter,
      sortBy: value as FilterState['sortBy']
    });
  };

  return (
    <div className="mt-8 mb-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Input 
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-10 py-2 bg-ggrave-darkgray border-gray-700 text-white"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchInput && (
            <button 
              type="button"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              onClick={clearSearch}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button type="submit" variant="default">
          Search
        </Button>
        
        {/* Mobile filter button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline"
              size="icon"
              className="md:hidden bg-[#181818] border-gray-700 hover:bg-[#222222] transition-colors"
            >
              <Filter size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0 bg-ggrave-black border-gray-800">
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
              <h3 className="text-white text-sm font-medium">Filters</h3>
              <SheetClose asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-800 transition-colors">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              {/* Filter Panel for mobile */}
              <FilterPanel filter={filter} onFilterChange={onFilterChange} />
              
              {/* Community Buzz Section for mobile */}
              <div className="mt-6 md:hidden">
                <CommunityBuzzSection />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </form>

      {/* Prominent Filter Dropdowns - Made smaller */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        {/* Sort By Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 justify-between text-xs"
            >
              <span className="flex items-center">
                <span className="text-gray-400 mr-1">Sort:</span>
                {sortOptions.find(s => s.value === filter.sortBy)?.label || 'Trending'}
              </span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 z-50">
            {sortOptions.map(sort => (
              <DropdownMenuItem 
                key={sort.value} 
                className="text-white hover:bg-gray-700 cursor-pointer text-xs"
                onClick={() => handleSortChange(sort.value)}
              >
                {sort.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Time Period Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 justify-between text-xs"
            >
              <span className="flex items-center">
                <span className="text-gray-400 mr-1">Time:</span>
                {timeframes.find(t => t.value === filter.timeFrame)?.label || 'All Time'}
              </span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 z-50">
            {timeframes.map(timeframe => (
              <DropdownMenuItem 
                key={timeframe.value} 
                className="text-white hover:bg-gray-700 cursor-pointer text-xs"
                onClick={() => handleTimeframeChange(timeframe.value)}
              >
                {timeframe.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchBar;
