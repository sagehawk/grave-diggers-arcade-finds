
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GameCarousel from '../components/GameCarousel';
import GameGrid from '../components/GameGrid';
import CommunityBuzzSection from '../components/CommunityBuzzSection';
import FilterPanel from '../components/FilterPanel';
import ActiveFilters from '../components/ActiveFilters';
import { FilterState, Game } from '../types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fetchGames } from '../utils/supabase-helpers';

// Import smaller components
import { GameSearch } from '../components/GameSearch';
import { MobileFilterButton } from '../components/MobileFilterButton';
import { WelcomeSection } from '../components/WelcomeSection';
import { Footer } from '../components/Footer';

const Index: React.FC = () => {
  const [filter, setFilter] = useState<FilterState>({
    genres: [],
    platforms: [],
    priceRange: [0, 100],
    releaseStatus: [],
    searchQuery: '',
    sortBy: 'trending',
    timeFrame: 'allTime',
  });

  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search input
  const [searchInput, setSearchInput] = useState('');
  const { toast } = useToast();
  
  // Load featured games on component mount
  useEffect(() => {
    const loadFeaturedGames = async () => {
      try {
        setIsLoading(true);
        // Get featured games (most liked)
        const { games } = await fetchGames(1, { 
          sortBy: 'mostLiked',
          timeFrame: 'allTime',
        });
        
        setFeaturedGames(games.slice(0, 5)); // Take top 5 for carousel
      } catch (error) {
        console.error('Error loading featured games:', error);
        toast({
          title: "Error",
          description: "Failed to load featured games",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeaturedGames();
  }, [toast]);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({
      ...filter,
      searchQuery: searchInput
    });
  };

  // Handle search input clearing
  const clearSearch = () => {
    setSearchInput('');
    if (filter.searchQuery) {
      setFilter({
        ...filter,
        searchQuery: ''
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Main layout with two primary columns */}
        <div className="flex flex-col space-y-6">
          {/* Two-column layout for desktop: Left column (wider) and Right column (narrower) */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column Area (Wider) */}
            <div className="w-full md:w-2/3">
              {/* Top: Hero Gallery */}
              {isLoading ? (
                <div className="aspect-[16/6] bg-gray-900 animate-pulse rounded-lg"></div>
              ) : (
                <GameCarousel games={featuredGames} title="FEATURED GAMES" />
              )}
              
              {/* Search bar and filter button */}
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
                        <FilterPanel filter={filter} onFilterChange={setFilter} />
                        
                        {/* Community Buzz Section for mobile */}
                        <div className="mt-6 md:hidden">
                          <CommunityBuzzSection />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </form>
              </div>
              
              {/* Active Filters */}
              <ActiveFilters 
                filter={filter} 
                onFilterChange={setFilter} 
                className="mb-4" 
              />
              
              {/* Game Grid Title with result count */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-pixel text-white text-lg">
                  {filter.searchQuery ? 'SEARCH RESULTS' : 'GAMES'}
                </h2>
              </div>
              
              {/* Game Grid - now uses filter prop directly */}
              <GameGrid 
                filter={filter}
                title="" 
                viewAllLink={`/games/all`}
              />
            </div>
            
            {/* Right Column Area (Narrower) - The continuous sidebar */}
            <div className="w-full md:w-1/3 space-y-6 hidden md:block">
              {/* Welcome Section */}
              <div className="bg-[#181818] border border-gray-800 p-4">
                <h3 className="font-pixel text-white text-sm mb-3">Welcome</h3>
                <Separator className="mb-3 bg-gray-700" />
                
                <p className="text-white text-base">
                  Welcome to GamerGrave!<br /><br />
                </p>
                <p className="text-white text-base">
                  Discord:<br />
                  <a
                    href="https://discord.gg/QJR7JeNxzc" 
                    className="text-red-500 hover:text-red-400"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://discord.gg/QJR7JeNxzc
                  </a>
                </p>
              </div>
              
              {/* Filter Panel */}
              <FilterPanel filter={filter} onFilterChange={setFilter} />
              
              {/* Community Buzz Section */}
              <CommunityBuzzSection />
            </div>
          </div>
        </div>
        
        {/* Footer section */}
        <footer className="bg-[#181818] border-t border-gray-800 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <img 
                  src="https://i.imgur.com/ItKyOPt.jpeg" 
                  alt="GamerGrave Logo" 
                  className="h-8 mb-4"
                />
                <p className="text-gray-400 text-xs">
                  © 2025 GamerGrave. All rights reserved.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</a>
                <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
                <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
