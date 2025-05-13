
import React from 'react';
import { FilterState, Genre } from '../types';
import { 
  Zap, // Action
  Compass, // Adventure
  Sword, // RPG
  Grid3X3, // Strategy
  Puzzle, // Puzzle
  Monitor, // Simulation
  Gamepad, // Platformer
  Target, // Shooter
  Dumbbell, // Sports
  Car, // Racing
  Ghost, // Horror
  Swords, // Fighting
  Coffee, // Casual
  Stars, // Other
  Heart, // Most Liked
  Download, // Most Downloaded
  Eye, // Most Viewed
  Radio, // Studio Releases
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CategoryFiltersProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ filter, onFilterChange }) => {
  // Category definitions with icons and counts
  const categories: {genre: Genre; icon: React.ElementType; label: string; count: number}[] = [
    { genre: "Action", icon: Zap, label: "Action", count: 9600 },
    { genre: "Adventure", icon: Compass, label: "Adventure", count: 7850 },
    { genre: "RPG", icon: Sword, label: "RPG", count: 5432 },
    { genre: "Strategy", icon: Grid3X3, label: "Strategy", count: 3245 },
    { genre: "Puzzle", icon: Puzzle, label: "Puzzle", count: 2876 },
    { genre: "Simulation", icon: Monitor, label: "Simulation", count: 2431 },
    { genre: "Platformer", icon: Gamepad, label: "Platformer", count: 1987 },
    { genre: "Shooter", icon: Target, label: "Shooter", count: 4532 },
    { genre: "Sports", icon: Dumbbell, label: "Sports", count: 1234 },
    { genre: "Racing", icon: Car, label: "Racing", count: 987 },
    { genre: "Horror", icon: Ghost, label: "Horror", count: 1542 },
    { genre: "Fighting", icon: Swords, label: "Fighting", count: 876 },
    { genre: "Casual", icon: Coffee, label: "Casual", count: 3210 },
    { genre: "Other", icon: Stars, label: "Other", count: 1542 },
  ];

  // Quick filter definitions
  const quickFilters = [
    { id: "mostLiked", icon: Heart, label: "Most Liked" },
    { id: "mostDownloaded", icon: Download, label: "Most Downloaded" },
    { id: "mostViewed", icon: Eye, label: "Most Viewed" },
    { id: "studioReleases", icon: Radio, label: "Studio Releases" },
  ];

  const toggleGenre = (genre: Genre) => {
    const newGenres = filter.genres.includes(genre)
      ? filter.genres.filter((g) => g !== genre)
      : [...filter.genres, genre];
    
    onFilterChange({
      ...filter,
      genres: newGenres,
    });
  };

  const setQuickFilter = (filterId: string) => {
    onFilterChange({
      ...filter,
      sortBy: filterId as FilterState['sortBy'],
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

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 h-full">
      {/* Quick Filters Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-pixel text-white text-sm">Filters</h3>
          {(filter.genres.length > 0 || filter.sortBy !== 'trending') && (
            <button 
              className="text-xs text-ggrave-red hover:underline" 
              onClick={resetFilters}
            >
              Reset All
            </button>
          )}
        </div>
        <Separator className="mb-3 bg-gray-700" />
        
        <div className="grid grid-cols-1 gap-2 mb-4">
          {quickFilters.map((qf) => {
            const isActive = filter.sortBy === qf.id;
            return (
              <Button
                key={qf.id}
                variant="outline"
                className={`w-full justify-start text-left ${
                  isActive 
                    ? 'bg-yellow-700/70 text-yellow-300 border-yellow-600' 
                    : 'bg-[#222222] text-yellow-300 border-gray-700'
                }`}
                onClick={() => setQuickFilter(qf.id)}
              >
                <qf.icon size={16} className="mr-2" />
                {qf.label}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Categories Section */}
      <div>
        <h3 className="font-pixel text-white text-sm mb-3">Categories</h3>
        <Separator className="mb-3 bg-gray-700" />
        
        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = filter.genres.includes(category.genre);
            return (
              <Button
                key={category.genre}
                variant={isActive ? "default" : "secondary"}
                className={`w-full justify-between text-left mb-2 ${
                  isActive ? 'bg-ggrave-red text-white' : 'bg-[#222222] text-gray-300'
                }`}
                onClick={() => toggleGenre(category.genre)}
              >
                <div className="flex items-center">
                  <category.icon size={16} className="mr-2" />
                  {category.label}
                </div>
                <span className="text-xs opacity-80">{formatCount(category.count)}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
