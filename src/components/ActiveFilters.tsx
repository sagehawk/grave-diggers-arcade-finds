
import React from 'react';
import { FilterState, Genre, Platform } from '../types';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  className?: string;
  sortOptions?: { label: string; value: string; }[];
  timeFrameOptions?: { label: string; value: string; }[];
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ 
  filter, 
  onFilterChange, 
  className = '',
  sortOptions = [],
  timeFrameOptions = [] 
}) => {
  // Default options if not provided
  const defaultSortOptions = [
    { label: 'Trending', value: 'trending' },
    { label: 'Most Popular', value: 'mostViewed' },
    { label: 'Top Rated', value: 'highestRated' },
    { label: 'Recently Added', value: 'newest' }
  ];

  const defaultTimeFrameOptions = [
    { label: 'All Time', value: 'allTime' },
    { label: 'Past 24 Hours', value: 'today' },
    { label: 'Past Week', value: 'week' },
    { label: 'Past Month', value: 'month' },
    { label: 'Past 3 Months', value: 'quarter' },
    { label: 'Past Year', value: 'year' }
  ];

  const actualSortOptions = sortOptions.length > 0 ? sortOptions : defaultSortOptions;
  const actualTimeFrameOptions = timeFrameOptions.length > 0 ? timeFrameOptions : defaultTimeFrameOptions;

  // Function to remove a genre
  const removeGenre = (genre: Genre) => {
    onFilterChange({
      ...filter,
      genres: filter.genres.filter(g => g !== genre)
    });
  };

  // Function to remove a platform
  const removePlatform = (platform: Platform) => {
    onFilterChange({
      ...filter,
      platforms: filter.platforms.filter(p => p !== platform)
    });
  };

  // Function to remove a release status
  const removeReleaseStatus = (status: string) => {
    onFilterChange({
      ...filter,
      releaseStatus: filter.releaseStatus.filter(s => s !== status)
    });
  };

  // Function to toggle free games filter
  const toggleFreeGames = () => {
    onFilterChange({
      ...filter,
      isFreeOnly: !filter.isFreeOnly
    });
  };

  // Function to reset search query
  const resetSearch = () => {
    onFilterChange({
      ...filter,
      searchQuery: ''
    });
  };

  // Check if any filters are applied
  const hasActiveFilters = 
    filter.genres.length > 0 || 
    filter.platforms.length > 0 || 
    filter.releaseStatus.length > 0 || 
    filter.searchQuery.trim() !== '' ||
    filter.isFreeOnly;

  // If no filters are applied, return null
  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Search query pill */}
      {filter.searchQuery.trim() !== '' && (
        <div className="flex items-center bg-ggrave-darkgray rounded-full px-3 py-1 text-sm text-white">
          <span className="mr-1">Search:</span>
          <span className="font-medium">{filter.searchQuery}</span>
          <button 
            onClick={resetSearch}
            className="ml-2 text-gray-400 hover:text-ggrave-red"
            aria-label="Remove search filter"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Free Games pill */}
      {filter.isFreeOnly && (
        <div className="flex items-center bg-ggrave-darkgray rounded-full px-3 py-1 text-sm text-white">
          <span className="font-medium">Free Games Only</span>
          <button 
            onClick={toggleFreeGames}
            className="ml-2 text-gray-400 hover:text-ggrave-red"
            aria-label="Remove free games filter"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Genre pills */}
      {filter.genres.map(genre => (
        <div key={`genre-${genre}`} className="flex items-center bg-ggrave-darkgray rounded-full px-3 py-1 text-sm text-white">
          <span className="mr-1">Genre:</span>
          <span className="font-medium">{genre}</span>
          <button 
            onClick={() => removeGenre(genre)}
            className="ml-2 text-gray-400 hover:text-ggrave-red"
            aria-label={`Remove ${genre} filter`}
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {/* Platform pills */}
      {filter.platforms.map(platform => (
        <div key={`platform-${platform}`} className="flex items-center bg-ggrave-darkgray rounded-full px-3 py-1 text-sm text-white">
          <span className="mr-1">Platform:</span>
          <span className="font-medium">{platform}</span>
          <button 
            onClick={() => removePlatform(platform)}
            className="ml-2 text-gray-400 hover:text-ggrave-red"
            aria-label={`Remove ${platform} filter`}
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {/* Release status pills */}
      {filter.releaseStatus.map(status => (
        <div key={`status-${status}`} className="flex items-center bg-ggrave-darkgray rounded-full px-3 py-1 text-sm text-white">
          <span className="mr-1">Status:</span>
          <span className="font-medium">{status}</span>
          <button 
            onClick={() => removeReleaseStatus(status)}
            className="ml-2 text-gray-400 hover:text-ggrave-red"
            aria-label={`Remove ${status} filter`}
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {/* Clear all button */}
      {hasActiveFilters && (
        <button 
          onClick={() => onFilterChange({
            ...filter,
            genres: [],
            platforms: [],
            priceRange: [0, 100],
            releaseStatus: [],
            searchQuery: '',
            isFreeOnly: false
          })}
          className="text-ggrave-red hover:underline text-sm px-2"
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
