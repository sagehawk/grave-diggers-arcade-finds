import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import GameCarousel from '../components/GameCarousel';
import GameGrid from '../components/GameGrid';
import FilterSidebar from '../components/FilterSidebar';
import FeaturedDeveloper from '../components/FeaturedDeveloper';
import { FilterState, Game, Developer } from '../types';
import { Gamepad, Archive, Flame, Trophy, Link, Clock } from 'lucide-react';

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
  
  // Hot today games
  const hotTodayGames: Game[] = [
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

  // Fresh games
  const freshlyDugGames: Game[] = [
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
  
  // Featured developer
  const featuredDev: Developer = {
    id: 'dev1',
    name: 'RetroStudio Games',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
    bio: 'Indie game studio focused on creating retro-inspired games with modern gameplay mechanics. Founded in 2019 by a group of passionate pixel-art enthusiasts.',
    games: ['1', '13', '14'],
    website: 'https://example.com',
    twitter: 'https://twitter.com/example',
    discord: 'https://discord.gg/example',
  };
  
  // Categories for the genre vault
  const genreCategories = [
    { name: 'Action', icon: <Gamepad size={18} /> },
    { name: 'RPG', icon: <Trophy size={18} /> },
    { name: 'Strategy', icon: <Archive size={18} /> },
    { name: 'Horror', icon: <Clock size={18} /> },
    { name: 'Platformer', icon: <Link size={18} /> },
    { name: 'Puzzle', icon: <Flame size={18} /> },
  ];
  
  return (
    <div className="min-h-screen bg-ggrave-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="relative h-[400px] mb-8 rounded-sm overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550745165-9bc0b252726f)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ggrave-black to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
            <h1 className="font-pixel text-white text-2xl md:text-4xl mb-4 animate-flicker">
              Game Over? <br />
              <span className="text-ggrave-red">Dig Up Your Next Adventure.</span>
            </h1>
            
            <p className="text-gray-300 max-w-md mb-8">
              GamerGrave is the ultimate destination for discovering your next game obsession,
              primarily focusing on the vibrant world of indie titles.
            </p>
            
            <div>
              <button className="pixel-button animate-pixel-pulse">
                Explore Games
              </button>
            </div>
          </div>
        </div>
        
        {/* Featured Carousel */}
        <GameCarousel games={featuredGames} title="FEATURED GAMES" />
        
        {/* Main Content Area with Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Game Grid Area */}
          <div className="md:w-3/4">
            {/* Hot Today */}
            <GameGrid
              games={hotTodayGames}
              title="HOT TODAY"
              viewAllLink="/games?sort=trending&timeFrame=today"
            />
            
            {/* Genre Vault */}
            <div className="mb-8">
              <div className="bg-ggrave-darkgray mb-4 p-2 border-l-4 border-ggrave-red">
                <h2 className="font-pixel text-white text-sm md:text-base">GENRE VAULTS</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {genreCategories.map((category) => (
                  <a
                    key={category.name}
                    href={`/games?genre=${category.name}`}
                    className="bg-ggrave-darkgray border border-gray-800 hover:border-ggrave-red p-4 rounded-sm flex flex-col items-center justify-center transition-colors"
                  >
                    <div className="text-ggrave-red mb-2">
                      {category.icon}
                    </div>
                    <span className="text-white text-sm">{category.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Freshly Dug */}
            <GameGrid
              games={freshlyDugGames}
              title="FRESHLY DUG"
              viewAllLink="/games?sort=newest"
            />
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            <FilterSidebar filter={filter} onFilterChange={setFilter} />
            <FeaturedDeveloper developer={featuredDev} />
          </div>
        </div>
        
        {/* Community Buzz Section */}
        <div className="mt-8">
          <div className="bg-ggrave-darkgray mb-4 p-2 border-l-4 border-ggrave-red">
            <h2 className="font-pixel text-white text-sm md:text-base">COMMUNITY BUZZ</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Community post items would go here */}
            <div className="bg-ggrave-darkgray border border-gray-800 p-4 rounded-sm">
              <h3 className="text-white font-medium text-sm mb-2">Best Indie RPGs of 2023</h3>
              <p className="text-gray-400 text-xs mb-2">
                Discussion thread with 128 comments started by GameFanatic
              </p>
              <a href="/community/topic/123" className="text-ggrave-red text-xs hover:underline">Join Discussion</a>
            </div>
            
            <div className="bg-ggrave-darkgray border border-gray-800 p-4 rounded-sm">
              <h3 className="text-white font-medium text-sm mb-2">Hidden Pixel Art Gems</h3>
              <p className="text-gray-400 text-xs mb-2">
                Review compilation with 95 submissions by PixelPerfect
              </p>
              <a href="/community/topic/456" className="text-ggrave-red text-xs hover:underline">Read Reviews</a>
            </div>
            
            <div className="bg-ggrave-darkgray border border-gray-800 p-4 rounded-sm">
              <h3 className="text-white font-medium text-sm mb-2">Indie Dev AMA: RetroStudio</h3>
              <p className="text-gray-400 text-xs mb-2">
                Live Q&A happening now with Pixel Dungeon Crawler developers
              </p>
              <a href="/community/topic/789" className="text-ggrave-red text-xs hover:underline">Ask Questions</a>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-ggrave-darkgray border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src="https://i.imgur.com/ItKyOPt.jpeg" 
                alt="GamerGrave Logo" 
                className="h-6 mb-2"
              />
              <p className="text-gray-400 text-xs">
                © 2023 GamerGrave. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="/about" className="text-gray-400 hover:text-white text-sm">About</a>
              <a href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</a>
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
