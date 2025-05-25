
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import LoadingIndicator from './LoadingIndicator';
import { portfolioGames } from '../data/portfolioGamesData';

interface GameGridProps {
  filter: any;
  title: string;
  viewAllLink?: string;
  className?: string;
  itemsPerPage?: number;
  SampleDataLoader?: React.ComponentType;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  filter, 
  title, 
  viewAllLink, 
  className = '',
  itemsPerPage = 12,
  SampleDataLoader
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);
  const [totalGames, setTotalGames] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Function to filter and paginate portfolio games
  const loadGames = useCallback(async (page: number, isInitial: boolean = false) => {
    if (loading || (allLoaded && !isInitial)) return;
    
    try {
      setLoading(true);
      
      // Filter games based on search and filters
      let filteredGames = [...portfolioGames];
      
      // Apply search filter
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        filteredGames = filteredGames.filter(game => 
          game.title.toLowerCase().includes(query) ||
          game.developer.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.genre.some(g => g.toLowerCase().includes(query))
        );
      }
      
      // Apply genre filter
      if (filter.genres && filter.genres.length > 0) {
        filteredGames = filteredGames.filter(game =>
          filter.genres.some((filterGenre: string) =>
            game.genre.some(gameGenre => gameGenre.toLowerCase().includes(filterGenre.toLowerCase()))
          )
        );
      }
      
      // Apply platform filter
      if (filter.platforms && filter.platforms.length > 0) {
        filteredGames = filteredGames.filter(game =>
          filter.platforms.some((filterPlatform: string) =>
            game.platforms.some(gamePlatform => gamePlatform.toLowerCase().includes(filterPlatform.toLowerCase()))
          )
        );
      }
      
      // Apply price filter
      if (filter.priceRange) {
        filteredGames = filteredGames.filter(game => {
          const gamePrice = typeof game.price === 'string' ? 0 : game.price;
          return gamePrice >= filter.priceRange[0] && gamePrice <= filter.priceRange[1];
        });
      }
      
      // Apply release status filter
      if (filter.releaseStatus && filter.releaseStatus.length > 0) {
        filteredGames = filteredGames.filter(game =>
          filter.releaseStatus.includes(game.releaseStatus)
        );
      }
      
      // Sort games
      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'trending':
            filteredGames.sort((a, b) => b.views - a.views);
            break;
          case 'mostLiked':
            filteredGames.sort((a, b) => b.likes - a.likes);
            break;
          case 'newest':
            filteredGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            break;
          case 'oldest':
            filteredGames.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
            break;
          case 'alphabetical':
            filteredGames.sort((a, b) => a.title.localeCompare(b.title));
            break;
        }
      }
      
      setTotalGames(filteredGames.length);
      
      // Paginate
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedGames = filteredGames.slice(startIndex, endIndex);
      
      if (isInitial) {
        setGames(paginatedGames);
      } else {
        setGames(prev => [...prev, ...paginatedGames]);
      }
      
      // Check if we've loaded all games
      if (paginatedGames.length < itemsPerPage || endIndex >= filteredGames.length) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }
      
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
      if (isInitial) {
        setInitialLoading(false);
      }
    }
  }, [filter, loading, allLoaded, itemsPerPage]);

  // Load more games when scrolling
  const loadMoreGames = useCallback(() => {
    if (!loading && !allLoaded) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadGames(nextPage);
    }
  }, [currentPage, loading, allLoaded, loadGames]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (!loadingRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !allLoaded) {
          loadMoreGames();
        }
      },
      { threshold: 0.1 }
    );
    
    observerRef.current.observe(loadingRef.current);
    
    return () => {
      if (observerRef.current && loadingRef.current) {
        observerRef.current.unobserve(loadingRef.current);
      }
    };
  }, [loadMoreGames, loading, allLoaded]);

  // Initial load and reload when filters change
  useEffect(() => {
    setGames([]);
    setCurrentPage(1);
    setAllLoaded(false);
    setInitialLoading(true);
    loadGames(1, true);
  }, [filter, loadGames]);

  if (initialLoading) {
    return (
      <div className={`mb-6 ${className}`}>
        <div className="flex justify-center py-10">
          <LoadingIndicator />
        </div>
      </div>
    );
  }
  
  if (games.length === 0 && !loading) {
    return (
      <div className={`mb-6 ${className}`}>
        <div className="bg-gray-900 rounded-md p-8 text-center">
          <h3 className="text-gray-400 text-lg">No games found for the current filters</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`mb-6 ${className}`}>
      {/* Grid of game cards with aspect ratio adjusted for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {/* Loading indicator */}
      {!allLoaded && (
        <div ref={loadingRef} className="pt-4">
          {loading && <LoadingIndicator />}
        </div>
      )}
      
      {allLoaded && viewAllLink && (
        <div className="flex justify-center mt-6">
          <a 
            href={viewAllLink} 
            className="text-ggrave-red hover:underline text-xs font-medium"
          >
            View All
          </a>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
