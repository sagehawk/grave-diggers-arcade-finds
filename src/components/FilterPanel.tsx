import React, { useState } from 'react';
import { FilterState, Genre, Platform } from '../types';
import { 
  Filter, ChevronDown, ChevronUp, X, 
  SortAsc, Clock
} from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

// Extract reusable components to reduce file size
import FilterSectionHeader from './filter/FilterSectionHeader';

interface FilterPanelProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filter, 
  onFilterChange,
  className = '' 
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sort: true,
    timeFrame: true,
    genres: true,
    platforms: true,
    price: true,
    releaseStatus: true,
    tags: false,
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const updateGenre = (genre: Genre, checked: boolean) => {
    const newGenres = checked 
      ? [...filter.genres, genre]
      : filter.genres.filter((g) => g !== genre);
    
    onFilterChange({
      ...filter,
      genres: newGenres,
    });
  };
  
  const updatePlatform = (platform: Platform, checked: boolean) => {
    const newPlatforms = checked
      ? [...filter.platforms, platform]
      : filter.platforms.filter((p) => p !== platform);
    
    onFilterChange({
      ...filter,
      platforms: newPlatforms,
    });
  };
  
  const updateReleaseStatus = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filter.releaseStatus, status]
      : filter.releaseStatus.filter((s) => s !== status);
    
    onFilterChange({
      ...filter,
      releaseStatus: newStatuses,
    });
  };

  const updateSortBy = (value: string) => {
    onFilterChange({
      ...filter,
      sortBy: value as FilterState['sortBy']
    });
  };

  const updateTimeFrame = (value: string) => {
    onFilterChange({
      ...filter,
      timeFrame: value as FilterState['timeFrame']
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      genres: [],
      platforms: [],
      priceRange: [0, 100],
      releaseStatus: [],
      searchQuery: '',
      sortBy: 'trending',
      timeFrame: 'allTime'
    });
    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default values",
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

  const sortOptions = [
    { label: 'Relevance', value: 'relevance', showSearch: true },
    { label: 'Trending', value: 'trending', showTimeFrame: true },
    { label: 'Most Popular', value: 'mostViewed', showTimeFrame: true },
    { label: 'Top Rated', value: 'highestRated', showTimeFrame: true },
    { label: 'Newest Releases', value: 'releaseDate' },
    { label: 'Recently Added', value: 'newest' },
    { label: 'Price: Low to High', value: 'priceAsc' },
    { label: 'Price: High to Low', value: 'priceDesc' },
    { label: 'Name: A-Z', value: 'nameAsc' },
    { label: 'Name: Z-A', value: 'nameDesc' }
  ];

  const timeFrameOptions = [
    { label: 'All Time', value: 'allTime' },
    { label: 'Past 24 Hours', value: 'today' },
    { label: 'Past Week', value: 'week' },
    { label: 'Past Month', value: 'month' },
    { label: 'Past 3 Months', value: 'quarter' },
    { label: 'Past Year', value: 'year' }
  ];

  // Find the current sort option
  const currentSortOption = sortOptions.find(option => option.value === filter.sortBy) || sortOptions[0];
  
  // Check if timeframe should be shown based on the current sort
  const showTimeFrame = currentSortOption.showTimeFrame;

  // Find the current timeframe option
  const currentTimeFrameOption = timeFrameOptions.find(option => option.value === filter.timeFrame) || timeFrameOptions[0];
  
  return (
    <div className={`bg-ggrave-darkgray w-full rounded-sm border border-gray-800 ${className}`}>
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-pixel text-white text-sm flex items-center">
          <Filter size={16} className="mr-2" />
          Filters
        </h3>
        
        <button 
          className="text-xs text-ggrave-red hover:underline" 
          onClick={clearAllFilters}
        >
          Reset All
        </button>
      </div>
      
      {/* Sort By */}
      <Collapsible
        open={expandedSections.sort}
        onOpenChange={() => toggleSection('sort')}
        className="border-b border-gray-800"
      >
        <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-black">
          <h4 className="text-white text-sm font-medium flex items-center">
            <SortAsc size={16} className="mr-2" />
            Sort By
          </h4>
          {expandedSections.sort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0 space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="w-full bg-ggrave-black text-white text-sm border border-gray-700 justify-between"
              >
                {currentSortOption.label}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-ggrave-black border-gray-700">
              <DropdownMenuRadioGroup 
                value={filter.sortBy} 
                onValueChange={updateSortBy}
              >
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem 
                    key={option.value} 
                    value={option.value}
                    className="text-white hover:bg-gray-800 hover:text-ggrave-red cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Time Period - Only show if applicable to the selected sort */}
      {showTimeFrame && (
        <Collapsible
          open={expandedSections.timeFrame}
          onOpenChange={() => toggleSection('timeFrame')}
          className="border-b border-gray-800"
        >
          <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-black">
            <h4 className="text-white text-sm font-medium flex items-center">
              <Clock size={16} className="mr-2" />
              Time Period
            </h4>
            {expandedSections.timeFrame ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="p-4 pt-0 space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline"
                  className="w-full bg-ggrave-black text-white text-sm border border-gray-700 justify-between"
                >
                  {currentTimeFrameOption.label}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-ggrave-black border-gray-700">
                <DropdownMenuRadioGroup 
                  value={filter.timeFrame} 
                  onValueChange={updateTimeFrame}
                >
                  {timeFrameOptions.map((option) => (
                    <DropdownMenuRadioItem 
                      key={option.value} 
                      value={option.value}
                      className="text-white hover:bg-gray-800 hover:text-ggrave-red cursor-pointer"
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Genres */}
      <Collapsible
        open={expandedSections.genres}
        onOpenChange={() => toggleSection('genres')}
        className="border-b border-gray-800"
      >
        <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-black">
          <h4 className="text-white text-sm font-medium">Genres</h4>
          {expandedSections.genres ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center space-x-2 text-sm text-gray-300">
                <Checkbox 
                  id={`genre-${genre}`}
                  checked={filter.genres.includes(genre)}
                  onCheckedChange={(checked) => updateGenre(genre, checked === true)}
                  className="border-gray-700 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
                />
                <span className={filter.genres.includes(genre) ? "text-ggrave-red" : ""}>
                  {genre}
                </span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Platforms */}
      <Collapsible
        open={expandedSections.platforms}
        onOpenChange={() => toggleSection('platforms')}
        className="border-b border-gray-800"
      >
        <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-black">
          <h4 className="text-white text-sm font-medium">Platforms</h4>
          {expandedSections.platforms ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center space-x-2 text-sm text-gray-300">
                <Checkbox 
                  id={`platform-${platform}`}
                  checked={filter.platforms.includes(platform)}
                  onCheckedChange={(checked) => updatePlatform(platform, checked === true)}
                  className="border-gray-700 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
                />
                <span className={filter.platforms.includes(platform) ? "text-ggrave-red" : ""}>
                  {platform}
                </span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Price */}
      <Collapsible
        open={expandedSections.price}
        onOpenChange={() => toggleSection('price')}
        className="border-b border-gray-800"
      >
        <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-black">
          <h4 className="text-white text-sm font-medium">Price</h4>
          {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0 space-y-4">
          <RadioGroup 
            defaultValue="all"
            value={filter.priceRange[0] === 0 && filter.priceRange[1] === 100 ? "all" : 
                  filter.priceRange[0] === 0 && filter.priceRange[1] === 0 ? "free" : "paid"}
            onValueChange={(value) => {
              if (value === "all") {
                onFilterChange({
                  ...filter,
                  priceRange: [0, 100]
                });
              } else if (value === "free") {
                onFilterChange({
                  ...filter,
                  priceRange: [0, 0]
                });
              } else {
                onFilterChange({
                  ...filter,
                  priceRange: [0.01, 100]
                });
              }
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="price-all" className="border-gray-700 text-ggrave-red" />
              <label htmlFor="price-all" className="text-sm text-gray-300">All Prices</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="price-free" className="border-gray-700 text-ggrave-red" />
              <label htmlFor="price-free" className="text-sm text-gray-300">Free Only</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="price-paid" className="border-gray-700 text-ggrave-red" />
              <label htmlFor="price-paid" className="text-sm text-gray-300">Paid Only</label>
            </div>
          </RadioGroup>
          
          {/* Price range slider (only show if "Paid" is selected) */}
          {filter.priceRange[0] > 0 && (
            <div className="mt-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Price Range: ${filter.priceRange[0]} - ${filter.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={filter.priceRange[1]}
                onChange={(e) => onFilterChange({
                  ...filter,
                  priceRange: [0.01, parseInt(e.target.value)]
                })}
                className="w-full accent-ggrave-red"
              />
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      
      {/* Release Status */}
      <Collapsible
        open={expandedSections.releaseStatus}
        onOpenChange={() => toggleSection('releaseStatus')}
        className="border-b border-gray-800"
      >
        <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-black">
          <h4 className="text-white text-sm font-medium">Release Status</h4>
          {expandedSections.releaseStatus ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0 space-y-2">
          {releaseStatuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox 
                id={`status-${status}`}
                checked={filter.releaseStatus.includes(status)}
                onCheckedChange={(checked) => updateReleaseStatus(status, checked === true)}
                className="border-gray-700 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
              />
              <label 
                htmlFor={`status-${status}`}
                className={`text-sm ${filter.releaseStatus.includes(status) ? "text-ggrave-red" : "text-gray-300"}`}
              >
                {status}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterPanel;
