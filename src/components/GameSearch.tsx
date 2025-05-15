
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GameSearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  clearSearch: () => void;
}

export const GameSearch: React.FC<GameSearchProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
  clearSearch
}) => {
  return (
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
    </form>
  );
};
