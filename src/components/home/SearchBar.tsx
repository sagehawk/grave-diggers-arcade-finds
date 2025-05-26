
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
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

export const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
  clearSearch,
  filter,
  onFilterChange
}) => {
  return (
    <div className="mt-8 mb-4">
      <form onSubmit={handleSearch} className="flex gap-2">
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
    </div>
  );
};

export default SearchBar;
