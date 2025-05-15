
import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFiltersProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

const categories = [
  "All", "Trending", "New Releases", "Most Played", "Top Rated"
];

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  onSelectCategory, 
  activeCategory 
}) => {
  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-bold text-white mb-4 font-pixel">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className={`
              rounded-md px-4 py-2 
              ${activeCategory === category 
                ? 'bg-ggrave-red hover:bg-red-700' 
                : 'bg-transparent border border-gray-700 hover:bg-gray-800 text-white'}
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
