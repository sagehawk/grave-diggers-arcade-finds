
import React from 'react';
import { FilterState, Genre, Platform } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
}

const HeroFilter: React.FC<HeroFilterProps> = ({ filter, onFilterChange }) => {
  // Common genres and platforms for quick filters
  const quickGenres: Genre[] = ["Action", "Adventure", "RPG", "Strategy", "Puzzle"];
  const quickPlatforms: Platform[] = ["Windows", "Mac", "Browser", "Mobile"];
  
  const updateGenre = (genre: Genre) => {
    const newGenres = filter.genres.includes(genre)
      ? filter.genres.filter((g) => g !== genre)
      : [...filter.genres, genre];
    
    onFilterChange({
      ...filter,
      genres: newGenres,
    });
  };
  
  const updatePlatform = (platform: Platform) => {
    const newPlatforms = filter.platforms.includes(platform)
      ? filter.platforms.filter((p) => p !== platform)
      : [...filter.platforms, platform];
    
    onFilterChange({
      ...filter,
      platforms: newPlatforms,
    });
  };
  
  const resetFilters = () => {
    onFilterChange({
      genres: [],
      platforms: [],
      priceRange: [0, 100],
      releaseStatus: [],
      searchQuery: '',
      sortBy: 'trending',
      timeFrame: 'allTime'
    });
  };
  
  return (
    <div className="w-full bg-[#181818] p-4 rounded-sm border border-gray-800">
      {/* Sort options */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-sm font-medium">Sort By</h3>
          <button 
            className="text-xs text-ggrave-red hover:underline" 
            onClick={resetFilters}
          >
            Reset All
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select 
            className="bg-[#111111] text-white text-sm border border-gray-700 rounded-sm p-1.5"
            value={filter.sortBy}
            onChange={(e) => onFilterChange({
              ...filter,
              sortBy: e.target.value as FilterState['sortBy']
            })}
          >
            <option value="trending">Trending</option>
            <option value="mostViewed">Most Viewed</option>
            <option value="mostLiked">Most Liked</option>
            <option value="highestRated">Highest Rated</option>
            <option value="newest">Newest Added</option>
            <option value="releaseDate">Release Date</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          
          {(filter.sortBy === 'trending' || filter.sortBy === 'mostViewed' || filter.sortBy === 'mostLiked') && (
            <select 
              className="bg-[#111111] text-white text-sm border border-gray-700 rounded-sm p-1.5"
              value={filter.timeFrame}
              onChange={(e) => onFilterChange({
                ...filter,
                timeFrame: e.target.value as FilterState['timeFrame']
              })}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="allTime">All Time</option>
            </select>
          )}
        </div>
      </div>
      
      {/* Quick genre filters */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-medium mb-2">Quick Genres</h3>
        <div className="flex flex-wrap gap-1.5">
          {quickGenres.map((genre) => (
            <Button
              key={genre}
              variant={filter.genres.includes(genre) ? "default" : "outline"}
              size="sm"
              className={filter.genres.includes(genre) 
                ? "bg-ggrave-red hover:bg-ggrave-red/90 text-xs py-0.5 h-7" 
                : "bg-[#111111] border-gray-700 text-white hover:bg-gray-800 text-xs py-0.5 h-7"}
              onClick={() => updateGenre(genre)}
            >
              {genre}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="bg-[#111111] border-gray-700 text-white hover:bg-gray-800 text-xs py-0.5 h-7"
          >
            <ChevronDown size={14} className="mr-1" /> More
          </Button>
        </div>
      </div>
      
      {/* Quick platform filters */}
      <div className="mb-2">
        <h3 className="text-white text-sm font-medium mb-2">Platforms</h3>
        <div className="flex flex-wrap gap-1.5">
          {quickPlatforms.map((platform) => (
            <Button
              key={platform}
              variant={filter.platforms.includes(platform) ? "default" : "outline"}
              size="sm"
              className={filter.platforms.includes(platform) 
                ? "bg-ggrave-red hover:bg-ggrave-red/90 text-xs py-0.5 h-7" 
                : "bg-[#111111] border-gray-700 text-white hover:bg-gray-800 text-xs py-0.5 h-7"}
              onClick={() => updatePlatform(platform)}
            >
              {platform}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="bg-[#111111] border-gray-700 text-white hover:bg-gray-800 text-xs py-0.5 h-7"
          >
            <ChevronDown size={14} className="mr-1" /> More
          </Button>
        </div>
      </div>
      
      <div className="mt-3 text-right">
        <Button 
          variant="outline"
          size="sm"
          className="text-xs bg-[#111111] border-gray-700 text-white hover:bg-gray-800"
        >
          Advanced Filters
        </Button>
      </div>
    </div>
  );
};

export default HeroFilter;
