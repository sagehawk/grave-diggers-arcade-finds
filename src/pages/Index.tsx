
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import GameCarousel from '../components/GameCarousel';
import GameGrid from '../components/GameGrid';
import CategoryFilters from '../components/CategoryFilters';
import CommunityBuzzSection from '../components/CommunityBuzzSection';
import FilterSidebar from '../components/FilterSidebar';
import { FilterState, Game } from '../types';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Flame, Star, ArrowUp, Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const Index: React.FC = () => {
  // Sample data for demonstration
  const [filter, setFilter] = useState<FilterState>({
    genres: [],
    platforms: [],
    priceRange: [0, 100],
    releaseStatus: [],
    searchQuery: '',
    sortBy: 'trending',
    timeFrame: 'allTime',
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState("ripe");
  
  // Sample featured games data
  const featuredGames: Game[] = [
    {
      id: '1',
      title: 'Pixel Dungeon Crawler',
      developer: 'RetroStudio Games',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      description: 'Dive into this exciting retro-inspired dungeon crawler with procedurally generated levels, challenging boss fights and hundreds of unique items to discover.',
      genre: ['RPG', 'Roguelike', 'Pixel Art'],
      platforms: ['Windows', 'Mac', 'Linux'],
      price: 9.99,
      releaseStatus: 'Released',
      views: 12500,
      likes: 1840,
      comments: 342,
      releaseDate: '2023-05-15',
    },
    {
      id: '2',
      title: 'Neon Drift Racer',
      developer: 'SpeedForce Interactive',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      description: 'Race through neon-lit cyberpunk cities in this high-octane arcade racing game featuring an original synthwave soundtrack and intuitive drift mechanics.',
      genre: ['Racing', 'Arcade', 'Cyberpunk'],
      platforms: ['Windows', 'PlayStation', 'Xbox'],
      price: 19.99,
      releaseStatus: 'Early Access',
      views: 8720,
      likes: 1320,
      comments: 215,
      releaseDate: '2023-08-22',
    },
    {
      id: '3',
      title: 'Starbound Explorers',
      developer: 'Cosmic Whale Games',
      thumbnail: 'https://images.unsplash.com/photo-1518218119019-7a0b341f6e4e',
      banner: 'https://images.unsplash.com/photo-1518218119019-7a0b341f6e4e',
      description: 'Embark on an epic space adventure across procedurally generated galaxies. Build your ship, recruit a crew, and discover the mysteries of the universe.',
      genre: ['Adventure', 'Simulation', 'Sci-Fi'],
      platforms: ['Windows', 'Mac'],
      price: 'Free',
      releaseStatus: 'Demo Available',
      views: 15600,
      likes: 2100,
      comments: 489,
      releaseDate: '2023-03-10',
    }
  ];

  // Tabs content data
  const ripeGames: Game[] = [
    {
      id: '4',
      title: 'Forest Guardian',
      developer: 'Nature Interactive',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      description: 'Protect the mystical forest as an ancient spirit guardian. Use your powers to defeat corrupted creatures and restore balance to nature.',
      genre: ['Action', 'Adventure'],
      platforms: ['Windows', 'Mac', 'Switch'],
      price: 14.99,
      releaseStatus: 'Released',
      views: 5300,
      likes: 980,
      comments: 152,
      releaseDate: '2023-07-12',
    },
    {
      id: '5',
      title: 'Cyber Blade',
      developer: 'Neon Samurai Studios',
      thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f',
      description: 'A fast-paced action platformer with precise sword combat mechanics set in a dystopian future.',
      genre: ['Action', 'Platformer'],
      platforms: ['Windows', 'PlayStation'],
      price: 12.99,
      releaseStatus: 'Released',
      views: 7100,
      likes: 1250,
      comments: 203,
      releaseDate: '2023-06-28',
    },
    {
      id: '6',
      title: 'Puzzle Dimension',
      developer: 'Mind Benders',
      thumbnail: 'https://images.unsplash.com/photo-1489850846882-35ef10a4b480',
      description: 'Bend your mind with challenging 4D puzzles that will test your spatial awareness and logical thinking.',
      genre: ['Puzzle', 'Strategy'],
      platforms: ['Windows', 'Mac', 'Linux', 'Mobile'],
      price: 'Free',
      releaseStatus: 'Released',
      views: 8900,
      likes: 1670,
      comments: 315,
      releaseDate: '2023-04-05',
    },
    {
      id: '7',
      title: 'Ghost Hunter',
      developer: 'Paranormal Games',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
      description: 'A tense horror game where you hunt ghosts and other supernatural entities using specialized equipment.',
      genre: ['Horror', 'Adventure'],
      platforms: ['Windows', 'Xbox'],
      price: 19.99,
      releaseStatus: 'Early Access',
      views: 4200,
      likes: 890,
      comments: 145,
      releaseDate: '2023-09-13',
    },
    {
      id: '8',
      title: 'Pixel Farm',
      developer: 'Harvest Moon Studios',
      thumbnail: 'https://images.unsplash.com/photo-1506457592540-b872c7c1d615',
      description: 'Build and manage your own pixel art farm. Plant crops, raise animals, and become part of a friendly community.',
      genre: ['Simulation', 'Casual'],
      platforms: ['Windows', 'Mac', 'Mobile', 'Switch'],
      price: 9.99,
      releaseStatus: 'Released',
      views: 6500,
      likes: 1420,
      comments: 267,
      releaseDate: '2023-02-20',
    }
  ];

  const newGames: Game[] = [
    {
      id: '9',
      title: 'Space Trader',
      developer: 'Galaxy Games',
      thumbnail: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b',
      description: 'Trade goods across the galaxy, upgrade your ship, and become the richest merchant in space.',
      genre: ['Strategy', 'Simulation'],
      platforms: ['Windows', 'Mac'],
      price: 15.99,
      releaseStatus: 'Released',
      views: 1200,
      likes: 340,
      comments: 78,
      releaseDate: '2023-10-05',
    },
    {
      id: '10',
      title: 'Medieval Kingdom',
      developer: 'History Interactive',
      thumbnail: 'https://images.unsplash.com/photo-1519987856251-95bffaac638c',
      description: 'Rule your own medieval kingdom. Make tough decisions, wage wars, and leave your mark on history.',
      genre: ['Strategy', 'Simulation'],
      platforms: ['Windows', 'Mac', 'Linux'],
      price: 24.99,
      releaseStatus: 'Released',
      views: 980,
      likes: 210,
      comments: 45,
      releaseDate: '2023-10-12',
    },
    {
      id: '11',
      title: 'Ninja Warrior',
      developer: 'Shadow Games',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
      description: 'Master the way of the ninja in this challenging action platformer with precise controls.',
      genre: ['Action', 'Platformer'],
      platforms: ['Windows', 'PlayStation', 'Xbox', 'Switch'],
      price: 19.99,
      releaseStatus: 'In Development',
      views: 750,
      likes: 180,
      comments: 32,
      releaseDate: '2023-11-20',
    },
    {
      id: '12',
      title: 'Dungeon Keeper',
      developer: 'Dark Magic Studios',
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8',
      description: 'Build and defend your dungeon against heroes trying to steal your treasure.',
      genre: ['Strategy', 'Simulation'],
      platforms: ['Windows'],
      price: 12.99,
      releaseStatus: 'Early Access',
      views: 630,
      likes: 140,
      comments: 28,
      releaseDate: '2023-10-30',
    }
  ];
  
  const updatedGames: Game[] = [
    {
      id: '13',
      title: 'Galactic Explorer',
      developer: 'Star Games',
      thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5',
      description: 'Explore the vast galaxy and discover new planets.',
      genre: ['Adventure', 'Sci-Fi'],
      platforms: ['Windows'],
      price: 19.99,
      releaseStatus: 'Updated',
      views: 3500,
      likes: 720,
      comments: 135,
      releaseDate: '2023-09-20',
    },
    {
      id: '14',
      title: 'Zombie Outbreak',
      developer: 'Horror Studios',
      thumbnail: 'https://images.unsplash.com/photo-1559582930-bb01987cf4dd',
      description: 'Survive in a world infested with zombies.',
      genre: ['Horror', 'Survival'],
      platforms: ['Windows', 'PlayStation'],
      price: 24.99,
      releaseStatus: 'Updated',
      views: 4200,
      likes: 850,
      comments: 192,
      releaseDate: '2023-08-15',
    }
  ];
  
  // Get the right games based on active tab
  const getTabGames = () => {
    switch (activeTab) {
      case "ripe": return ripeGames;
      case "new": return newGames;
      case "updated": return updatedGames;
      default: return ripeGames;
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
              <GameCarousel games={featuredGames} title="FEATURED GAMES" />
              
              {/* Middle: Tabs section - Full width with filter button for mobile */}
              <div className="flex items-center justify-between mb-6 mt-8">
                <Tabs 
                  defaultValue="ripe" 
                  className="flex-1"
                  onValueChange={(value) => setActiveTab(value)}
                >
                  <TabsList className="bg-[#181818] border border-gray-700">
                    <TabsTrigger 
                      value="ripe" 
                      className="data-[state=active]:bg-ggrave-red data-[state=active]:text-white flex items-center gap-1 transition-colors"
                    >
                      <Flame size={16} /> Ripe
                    </TabsTrigger>
                    <TabsTrigger 
                      value="new" 
                      className="data-[state=active]:bg-ggrave-red data-[state=active]:text-white flex items-center gap-1 transition-colors"
                    >
                      <Star size={16} /> New
                    </TabsTrigger>
                    <TabsTrigger 
                      value="updated" 
                      className="data-[state=active]:bg-ggrave-red data-[state=active]:text-white flex items-center gap-1 transition-colors"
                    >
                      <ArrowUp size={16} /> Updated
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="ml-2 md:hidden bg-[#181818] border-gray-700 hover:bg-[#222222] transition-colors"
                    >
                      <Filter size={16} className="mr-1" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0 bg-ggrave-black border-gray-800">
                    <div className="p-4 flex justify-between items-center border-b border-gray-800">
                      <h3 className="font-pixel text-white text-sm">Filters</h3>
                      <SheetClose asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-800 transition-colors">
                          <X className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </div>
                    <div className="p-4 overflow-y-auto h-full">
                      {/* Welcome Section */}
                      <div className="bg-[#181818] border border-gray-800 p-4 mb-4">
                        <h1 className="font-pixel text-white text-xl md:text-2xl animate-flicker">
                          Welcome to GamerGrave
                        </h1>
                        
                        {/* Discord Link */}
                        <div className="mt-4">
                          <p className="text-white font-pixel mb-2">Discord:</p>
                          <a 
                            href="https://discord.gg/ASJyTrZ" 
                            className="inline-block"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Button variant="default" className="bg-ggrave-red hover:bg-red-700 transition-colors">
                              Join our server
                            </Button>
                          </a>
                        </div>
                      </div>
                      
                      {/* Filter Sidebar */}
                      <FilterSidebar filter={filter} onFilterChange={setFilter} />
                      
                      {/* Category Filters */}
                      <div className="mt-4">
                        <CategoryFilters filter={filter} onFilterChange={setFilter} />
                      </div>
                      
                      {/* Community Buzz Section for mobile */}
                      <div className="mt-6 md:hidden">
                        <CommunityBuzzSection />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Bottom: Game Grid */}
              <GameGrid 
                games={getTabGames()} 
                title={activeTab.toUpperCase()} 
                viewAllLink={`/games/${activeTab}`}
              />
            </div>
            
            {/* Right Column Area (Narrower) - The continuous sidebar */}
            <div className="w-full md:w-1/3 space-y-6 hidden md:block">
              {/* Welcome text block */}
              <div className="bg-[#181818] border border-gray-800 p-5 hover:border-gray-700 transition-all">
                <h1 className="font-pixel text-white text-xl md:text-2xl animate-flicker">
                  Welcome to GamerGrave
                </h1>
                
                {/* Discord Link */}
                <div className="mt-5">
                  <p className="text-white font-pixel mb-3">Discord:</p>
                  <a 
                    href="https://discord.gg/ASJyTrZ" 
                    className="inline-block"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button 
                      variant="default" 
                      className="bg-ggrave-red hover:bg-red-700 transition-colors focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50"
                    >
                      Join our server
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Category Filters */}
              <div className="hover:border-gray-700 transition-all">
                <CategoryFilters filter={filter} onFilterChange={setFilter} />
              </div>
              
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
                  © 2023 GamerGrave. All rights reserved.
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
