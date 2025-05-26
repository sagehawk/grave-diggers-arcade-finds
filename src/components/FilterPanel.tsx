import React, { useState, useEffect } from 'react';
import { FilterState, Genre, Platform } from '../types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, ChevronDown, ChevronUp, Clock, Filter } from 'lucide-react';
import FilterSectionHeader from './filter/FilterSectionHeader';
import { supabase } from '../lib/supabase';

interface FilterPanelProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filter, onFilterChange, className = '' }) => {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    genres: true,
    platforms: true,
    freeGames: true,
    releaseStatus: true,
  });

  // State for available genres and platforms from the database
  const [availableGenres, setAvailableGenres] = useState<{ name: string; slug: string; count: number }[]>([]);
  const [availablePlatforms, setAvailablePlatforms] = useState<{ name: string; count: number }[]>([]);
  
  useEffect(() => {
    // Fetch genres from Supabase
    const fetchGenres = async () => {
      try {
        const { data, error } = await supabase
          .from('genres')
          .select(`
            name,
            slug,
            game_genres (
              game_id
            )
          `);
          
        if (error) throw error;
        
        // Transform data and count games per genre
        const genresWithCount = data.map(genre => ({
          name: genre.name,
          slug: genre.slug,
          count: genre.game_genres ? genre.game_genres.length : 0
        }));
        
        setAvailableGenres(genresWithCount);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    
    // Get unique platforms from games table
    const fetchPlatforms = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('platform_tags');
          
        if (error) throw error;
        
        // Count occurrences of each platform
        const platformCounts: Record<string, number> = {};
        data.forEach(game => {
          if (game.platform_tags && Array.isArray(game.platform_tags)) {
            game.platform_tags.forEach((platform: string) => {
              platformCounts[platform] = (platformCounts[platform] || 0) + 1;
            });
          }
        });
        
        // Transform to array format
        const platforms = Object.entries(platformCounts).map(([name, count]) => ({
          name,
          count
        }));
        
        setAvailablePlatforms(platforms);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };
    
    fetchGenres();
    fetchPlatforms();
  }, []);

  // Toggle individual section expanded state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle genre selection
  const handleGenreChange = (genre: string, selected: boolean) => {
    let newGenres: Genre[];
    
    if (selected) {
      newGenres = [...filter.genres, genre as Genre];
    } else {
      newGenres = filter.genres.filter(g => g !== genre);
    }
    
    onFilterChange({
      ...filter,
      genres: newGenres
    });
  };

  // Handle platform selection
  const handlePlatformChange = (platform: string, selected: boolean) => {
    let newPlatforms: Platform[];
    
    if (selected) {
      newPlatforms = [...filter.platforms, platform as Platform];
    } else {
      newPlatforms = filter.platforms.filter(p => p !== platform);
    }
    
    onFilterChange({
      ...filter,
      platforms: newPlatforms
    });
  };

  // Handle release status selection
  const handleReleaseStatusChange = (status: string, selected: boolean) => {
    let newReleaseStatus: string[];
    
    if (selected) {
      newReleaseStatus = [...filter.releaseStatus, status];
    } else {
      newReleaseStatus = filter.releaseStatus.filter(s => s !== status);
    }
    
    onFilterChange({
      ...filter,
      releaseStatus: newReleaseStatus
    });
  };

  // Handle sort by change
  const handleSortByChange = (sortBy: FilterState['sortBy']) => {
    onFilterChange({
      ...filter,
      sortBy
    });
  };

  // Handle time frame change
  const handleTimeFrameChange = (timeFrame: FilterState['timeFrame']) => {
    onFilterChange({
      ...filter,
      timeFrame
    });
  };

  // Handle free games filter
  const handleFreeGamesChange = (checked: boolean) => {
    onFilterChange({
      ...filter,
      isFreeOnly: checked
    });
  };

  return (
    <div className={`bg-[#181818] border border-gray-800 p-4 rounded-lg ${className}`}>
      <h3 className="font-pixel text-white text-sm mb-4 flex items-center">
        <Filter size={16} className="mr-2" />
        FILTERS
      </h3>
      
      {/* Genres Section */}
      <div className="mb-4">
        <button 
          className="w-full flex justify-between items-center text-white text-sm mb-2"
          onClick={() => toggleSection('genres')}
        >
          <FilterSectionHeader 
            icon={Filter} 
            title="GENRES" 
            isExpanded={expandedSections.genres} 
          />
        </button>
        
        {expandedSections.genres && (
          <div className="space-y-2 mt-3 ml-1">
            {availableGenres.map((genre) => (
              <div key={genre.slug} className="flex items-center justify-between group">
                <div className="flex items-center">
                  <Checkbox
                    id={`genre-${genre.slug}`}
                    checked={filter.genres.includes(genre.slug as Genre)}
                    onCheckedChange={(checked) => 
                      handleGenreChange(genre.slug, checked === true)
                    }
                    className="border-gray-600 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
                  />
                  <label
                    htmlFor={`genre-${genre.slug}`}
                    className="text-sm ml-2 text-gray-300 group-hover:text-white cursor-pointer"
                  >
                    {genre.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({genre.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Platforms Section */}
      <div className="mb-4">
        <button 
          className="w-full flex justify-between items-center text-white text-sm mb-2"
          onClick={() => toggleSection('platforms')}
        >
          <FilterSectionHeader 
            icon={Filter} 
            title="PLATFORMS" 
            isExpanded={expandedSections.platforms} 
          />
        </button>
        
        {expandedSections.platforms && (
          <div className="space-y-2 mt-3 ml-1">
            {availablePlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between group">
                <div className="flex items-center">
                  <Checkbox
                    id={`platform-${platform.name}`}
                    checked={filter.platforms.includes(platform.name as Platform)}
                    onCheckedChange={(checked) => 
                      handlePlatformChange(platform.name, checked === true)
                    }
                    className="border-gray-600 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
                  />
                  <label
                    htmlFor={`platform-${platform.name}`}
                    className="text-sm ml-2 text-gray-300 group-hover:text-white cursor-pointer"
                  >
                    {platform.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({platform.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Free Games Section */}
      <div className="mb-4">
        <button 
          className="w-full flex justify-between items-center text-white text-sm mb-2"
          onClick={() => toggleSection('freeGames')}
        >
          <FilterSectionHeader 
            icon={Filter} 
            title="FREE GAMES" 
            isExpanded={expandedSections.freeGames} 
          />
        </button>
        
        {expandedSections.freeGames && (
          <div className="mt-3 ml-1">
            <div className="flex items-center group">
              <Checkbox
                id="free-games-only"
                checked={filter.isFreeOnly || false}
                onCheckedChange={(checked) => handleFreeGamesChange(checked === true)}
                className="border-gray-600 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
              />
              <label
                htmlFor="free-games-only"
                className="text-sm ml-2 text-gray-300 group-hover:text-white cursor-pointer"
              >
                Show free games only
              </label>
            </div>
          </div>
        )}
      </div>
      
      {/* Release Status Section */}
      <div className="mb-4">
        <button 
          className="w-full flex justify-between items-center text-white text-sm mb-2"
          onClick={() => toggleSection('releaseStatus')}
        >
          <FilterSectionHeader 
            icon={Filter} 
            title="RELEASE STATUS" 
            isExpanded={expandedSections.releaseStatus} 
          />
        </button>
        
        {expandedSections.releaseStatus && (
          <div className="space-y-2 mt-3 ml-1">
            {[
              { value: 'Released', label: 'Released' },
              { value: 'Early Access', label: 'Early Access' },
              { value: 'Demo Available', label: 'Demo Available' },
              { value: 'In Development', label: 'In Development' },
              { value: 'Concept', label: 'Concept/Idea' }
            ].map((status) => (
              <div key={status.value} className="flex items-center group">
                <Checkbox
                  id={`status-${status.value}`}
                  checked={filter.releaseStatus.includes(status.value)}
                  onCheckedChange={(checked) => 
                    handleReleaseStatusChange(status.value, checked === true)
                  }
                  className="border-gray-600 data-[state=checked]:bg-ggrave-red data-[state=checked]:border-ggrave-red"
                />
                <label
                  htmlFor={`status-${status.value}`}
                  className="text-sm ml-2 text-gray-300 group-hover:text-white cursor-pointer"
                >
                  {status.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear All Filters Button */}
      <button
        className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
        onClick={() => onFilterChange({
          genres: [],
          platforms: [],
          priceRange: [0, 100],
          releaseStatus: [],
          searchQuery: '',
          sortBy: 'trending',
          timeFrame: 'allTime',
          isFreeOnly: false,
        })}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;
