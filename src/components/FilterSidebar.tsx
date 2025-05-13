
import React, { useState } from 'react';
import { FilterState, Genre, Platform } from '../types';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filter, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sort: true,
    genres: true,
    platforms: true,
    price: false,
    releaseStatus: false,
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
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
  
  const updateReleaseStatus = (status: string) => {
    const newStatuses = filter.releaseStatus.includes(status)
      ? filter.releaseStatus.filter((s) => s !== status)
      : [...filter.releaseStatus, status];
    
    onFilterChange({
      ...filter,
      releaseStatus: newStatuses,
    });
  };
  
  // Available options
  const genres: Genre[] = [
    "Action", "Adventure", "RPG", "Strategy", 
    "Puzzle", "Simulation", "Sports", "Racing", 
    "Horror", "Platformer", "Shooter", "Fighting", 
    "Casual", "Other"
  ];
  
  const platforms: Platform[] = [
    "Windows", "Mac", "Linux", "Browser", 
    "Mobile", "Switch", "PlayStation", "Xbox"
  ];
  
  const releaseStatuses = [
    "Released", "Early Access", "Demo Available", 
    "In Development", "Concept"
  ];
  
  return (
    <div className="bg-ggrave-darkgray w-full rounded-sm border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-pixel text-white text-sm flex items-center">
          <Filter size={16} className="mr-2" />
          Filters
        </h3>
        
        <button 
          className="text-xs text-ggrave-red hover:underline" 
          onClick={() => onFilterChange({
            genres: [],
            platforms: [],
            priceRange: [0, 100],
            releaseStatus: [],
            searchQuery: '',
            sortBy: 'trending',
            timeFrame: 'allTime'
          })}
        >
          Reset All
        </button>
      </div>
      
      {/* Sort By */}
      <div className="border-b border-gray-800">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-black"
          onClick={() => toggleSection('sort')}
        >
          <h4 className="text-white text-sm font-medium">Sort By</h4>
          {expandedSections.sort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {expandedSections.sort && (
          <div className="p-4 pt-0 space-y-2">
            <div className="flex items-center">
              <select 
                className="w-full bg-ggrave-black text-white text-sm border border-gray-700 rounded-sm p-2"
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
            </div>
            
            {(filter.sortBy === 'trending' || filter.sortBy === 'mostViewed' || filter.sortBy === 'mostLiked') && (
              <div className="flex items-center mt-2">
                <select 
                  className="w-full bg-ggrave-black text-white text-sm border border-gray-700 rounded-sm p-2"
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
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Genres */}
      <div className="border-b border-gray-800">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-black"
          onClick={() => toggleSection('genres')}
        >
          <h4 className="text-white text-sm font-medium">Genres</h4>
          {expandedSections.genres ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {expandedSections.genres && (
          <div className="p-4 pt-0 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center space-x-2 text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    checked={filter.genres.includes(genre)}
                    onChange={() => updateGenre(genre)}
                    className="rounded border-gray-700 text-ggrave-red focus:ring-ggrave-red"
                  />
                  <span className={filter.genres.includes(genre) ? "text-ggrave-red" : ""}>
                    {genre}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Platforms */}
      <div className="border-b border-gray-800">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-black"
          onClick={() => toggleSection('platforms')}
        >
          <h4 className="text-white text-sm font-medium">Platforms</h4>
          {expandedSections.platforms ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {expandedSections.platforms && (
          <div className="p-4 pt-0 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => (
                <label key={platform} className="flex items-center space-x-2 text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    checked={filter.platforms.includes(platform)}
                    onChange={() => updatePlatform(platform)}
                    className="rounded border-gray-700 text-ggrave-red focus:ring-ggrave-red"
                  />
                  <span className={filter.platforms.includes(platform) ? "text-ggrave-red" : ""}>
                    {platform}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Price */}
      <div className="border-b border-gray-800">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-black"
          onClick={() => toggleSection('price')}
        >
          <h4 className="text-white text-sm font-medium">Price</h4>
          {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {expandedSections.price && (
          <div className="p-4 pt-0 space-y-4">
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input 
                type="checkbox" 
                checked={filter.priceRange[0] === 0 && filter.priceRange[1] === 0}
                onChange={() => onFilterChange({
                  ...filter,
                  priceRange: filter.priceRange[0] === 0 && filter.priceRange[1] === 0 
                    ? [0, 100] 
                    : [0, 0]
                })}
                className="rounded border-gray-700 text-ggrave-red focus:ring-ggrave-red"
              />
              <span>Free Only</span>
            </label>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Range: ${filter.priceRange[0]} - ${filter.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filter.priceRange[1]}
                onChange={(e) => onFilterChange({
                  ...filter,
                  priceRange: [filter.priceRange[0], parseInt(e.target.value)]
                })}
                className="w-full accent-ggrave-red"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Release Status */}
      <div className="border-b border-gray-800">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-black"
          onClick={() => toggleSection('releaseStatus')}
        >
          <h4 className="text-white text-sm font-medium">Release Status</h4>
          {expandedSections.releaseStatus ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {expandedSections.releaseStatus && (
          <div className="p-4 pt-0 space-y-2">
            {releaseStatuses.map((status) => (
              <label key={status} className="flex items-center space-x-2 text-sm text-gray-300">
                <input 
                  type="checkbox" 
                  checked={filter.releaseStatus.includes(status)}
                  onChange={() => updateReleaseStatus(status)}
                  className="rounded border-gray-700 text-ggrave-red focus:ring-ggrave-red"
                />
                <span className={filter.releaseStatus.includes(status) ? "text-ggrave-red" : ""}>
                  {status}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
