
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
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ filter, onFilterChange }) => {
  // Category definitions with icons
  const categories: {genre: Genre; icon: React.ElementType; label: string}[] = [
    { genre: "Action", icon: Zap, label: "Action" },
    { genre: "Adventure", icon: Compass, label: "Adventure" },
    { genre: "RPG", icon: Sword, label: "RPG" },
    { genre: "Strategy", icon: Grid3X3, label: "Strategy" },
    { genre: "Puzzle", icon: Puzzle, label: "Puzzle" },
    { genre: "Simulation", icon: Monitor, label: "Simulation" },
    { genre: "Platformer", icon: Gamepad, label: "Platformer" },
    { genre: "Shooter", icon: Target, label: "Shooter" },
    { genre: "Sports", icon: Dumbbell, label: "Sports" },
    { genre: "Racing", icon: Car, label: "Racing" },
    { genre: "Horror", icon: Ghost, label: "Horror" },
    { genre: "Fighting", icon: Swords, label: "Fighting" },
    { genre: "Casual", icon: Coffee, label: "Casual" },
    { genre: "Other", icon: Stars, label: "Other" },
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
    <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pixel text-white text-sm">Categories</h3>
        {filter.genres.length > 0 && (
          <button 
            className="text-xs text-ggrave-red hover:underline" 
            onClick={resetFilters}
          >
            Reset All
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => {
          const isActive = filter.genres.includes(category.genre);
          return (
            <Button
              key={category.genre}
              variant={isActive ? "default" : "secondary"}
              className={`w-full justify-start text-left mb-2 ${isActive ? 'bg-ggrave-red text-white' : 'bg-[#222222] text-gray-300'}`}
              onClick={() => toggleGenre(category.genre)}
            >
              <category.icon size={16} className="mr-2" />
              {category.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;
