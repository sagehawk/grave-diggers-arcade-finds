
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FilterState } from '../types';

// Import refactored components
import HeroSection from '../components/home/HeroSection';
import SearchBar from '../components/home/SearchBar';
import MainContent from '../components/home/MainContent';
import SidebarContent from '../components/home/SidebarContent';
import PageFooter from '../components/home/PageFooter';
import { portfolioFeaturedGames } from '../data/portfolioGamesData';

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
  
  // State for search input
  const [searchInput, setSearchInput] = useState('');
  
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
              <HeroSection featuredGames={portfolioFeaturedGames} isLoading={false} />
              
              {/* Search bar and filter button */}
              <SearchBar 
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSearch={handleSearch}
                clearSearch={clearSearch}
                filter={filter}
                onFilterChange={setFilter}
              />
              
              {/* Main content with filters and game grid */}
              <MainContent filter={filter} onFilterChange={setFilter} />
            </div>
            
            {/* Right Column Area (Narrower) - The continuous sidebar */}
            <SidebarContent filter={filter} onFilterChange={setFilter} />
          </div>
        </div>
        
        {/* Footer section */}
        <PageFooter />
      </main>
    </div>
  );
};

export default Index;
