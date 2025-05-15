
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import FilterPanel from './FilterPanel';
import CommunityBuzzSection from './CommunityBuzzSection';
import { FilterState } from '../types';

interface MobileFilterButtonProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

export const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({ 
  filter, 
  onFilterChange 
}) => {
  return (
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
  );
};
