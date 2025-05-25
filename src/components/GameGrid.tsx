
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
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Function to filter games based on search and filters
  const filterGames = useCallback(() => {
    console.log('Filtering games with filter:', filter);
    
    let filtered = [...portfolioGames];
    
    // Apply search filter
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.developer.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.genre.some(g => g.toLowerCase().includes(query))
      );
    }
    
    // Apply genre filter
    if (filter.genres && filter.genres.length > 0) {
      filtered = filtered.filter(game =>
        filter.genres.some((filterGenre: string) =>
          game.genre.some(gameGenre => gameGenre.toLowerCase().includes(filterGenre.toLowerCase()))
        )
      );
    }
    
    // Apply platform filter
    if (filter.platforms && filter.platforms.length > 0) {
      filtered = filtered.filter(game =>
        filter.platforms.some((filterPlatform: string) =>
          game.platforms.some(gamePlatform => gamePlatform.toLowerCase().includes(filterPlatform.toLowerCase()))
        )
      );
    }
    
    // Apply price filter
    if (filter.priceRange) {
      filtered = filtered.filter(game => {
        const gamePrice = typeof game.price === 'string' ? 0 : game.price;
        return gamePrice >= filter.priceRange[0] && gamePrice <= filter.priceRange[1];
      });
    }
    
    // Apply release status filter
    if (filter.releaseStatus && filter.releaseStatus.length > 0) {
      filtered = filtered.filter(game =>
        filter.releaseStatus.includes(game.releaseStatus)
      );
    }
    
    // Sort games
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'trending':
          filtered.sort((a, b) => b.views - a.views);
          break;
        case 'mostLiked':
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
          break;
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }
    
    console.log('Filtered games count:', filtered.length);
    setFilteredGames(filtered);
    setTotalGames(filtered.length);
    
    return filtered;
  }, [filter]);

  // Function to load games for a specific page
  const loadGames = useCallback((page: number, isInitial: boolean = false) => {
    console.log('loadGames called with page:', page, 'isInitial:', isInitial);
    
    if (loading && !isInitial) {
      console.log('Skipping load: already loading');
      return;
    }
    
    setLoading(true);
    
    try {
      // Use filtered games for pagination
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedGames = filteredGames.slice(startIndex, endIndex);
      
      console.log('Loading games from index', startIndex, 'to', endIndex, '- got', paginatedGames.length, 'games');
      
      if (isInitial) {
        setGames(paginatedGames);
        setCurrentPage(1);
      } else {
        setGames(prev => [...prev, ...paginatedGames]);
        setCurrentPage(page);
      }
      
      // Check if we've loaded all games
      if (paginatedGames.length < itemsPerPage || endIndex >= filteredGames.length) {
        setAllLoaded(true);
        console.log('All games loaded');
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
  }, [filteredGames, itemsPerPage, loading]);

  // Load more games when scrolling
  const loadMoreGames = useCallback(() => {
    if (!loading && !allLoaded && filteredGames.length > 0) {
      const nextPage = currentPage + 1;
      console.log('Loading more games, next page:', nextPage);
      loadGames(nextPage);
    }
  }, [currentPage, loading, allLoaded, filteredGames.length, loadGames]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (!loadingRef.current || allLoaded || filteredGames.length === 0) {
      return;
    }
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          console.log('Intersection observer triggered, loading more games');
          loadMoreGames();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );
    
    observerRef.current.observe(loadingRef.current);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreGames, allLoaded, filteredGames.length]);

  // Filter games when filter changes
  useEffect(() => {
    console.log('Filter changed, filtering games and resetting state');
    const filtered = filterGames();
    setGames([]);
    setCurrentPage(1);
    setAllLoaded(false);
    setInitialLoading(true);
  }, [filter, filterGames]);

  // Load initial games when filtered games change
  useEffect(() => {
    if (filteredGames.length > 0 && games.length === 0) {
      loadGames(1, true);
    } else if (filteredGames.length === 0) {
      setInitialLoading(false);
      setAllLoaded(true);
    }
  }, [filteredGames, games.length, loadGames]);

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
        <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-800">
          <h3 className="text-gray-400 text-lg font-medium">No games found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`mb-6 ${className}`}>
      {/* Grid of game cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {games.map((game, index) => (
          <GameCard key={`${game.id}-${index}`} game={game} />
        ))}
      </div>
      
      {/* Loading indicator and infinite scroll trigger */}
      {!allLoaded && (
        <div ref={loadingRef} className="pt-8 flex justify-center">
          {loading ? (
            <LoadingIndicator />
          ) : (
            <div className="h-8 w-full flex items-center justify-center text-gray-500 text-sm">
              Scroll down for more games...
            </div>
          )}
        </div>
      )}
      
      {allLoaded && games.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="text-gray-500 text-sm">
            Showing all {totalGames} games
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
