
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
  itemsPerPage = 9, // 3 rows × 3 columns = 9 items per batch
  SampleDataLoader
}) => {
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    return filtered;
  }, [filter]);

  // Function to load the next batch of games with dramatic delay
  const loadNextBatch = useCallback((isInitial: boolean = false) => {
    console.log('Loading next batch, current batch:', currentBatch, 'isInitial:', isInitial);
    
    if (isLoading && !isInitial) {
      console.log('Already loading, skipping');
      return;
    }

    setIsLoading(true);

    const delay = isInitial ? 0 : 1500; // 1.5 second delay for dramatic effect
    
    loadingTimeoutRef.current = setTimeout(() => {
      const batchToLoad = isInitial ? 0 : currentBatch + 1;
      const startIndex = batchToLoad * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newGames = filteredGames.slice(startIndex, endIndex);
      
      console.log(`Loading batch ${batchToLoad}: games ${startIndex} to ${endIndex - 1}`);
      console.log('New games:', newGames.length);
      
      if (newGames.length > 0) {
        if (isInitial) {
          setDisplayedGames(newGames);
          setCurrentBatch(0);
        } else {
          setDisplayedGames(prev => [...prev, ...newGames]);
          setCurrentBatch(batchToLoad);
        }
      }
      
      // Check if there are more games to load
      const remainingGames = filteredGames.length - endIndex;
      setHasMoreGames(remainingGames > 0);
      
      console.log('Remaining games:', remainingGames);
      console.log('Has more games:', remainingGames > 0);
      
      setIsLoading(false);
      if (isInitial) {
        setInitialLoading(false);
      }
    }, delay);
  }, [currentBatch, filteredGames, itemsPerPage, isLoading]);

  // Initialize filtered games on component mount and when filter changes
  useEffect(() => {
    console.log('Filter changed, resetting everything');
    
    // Clear any pending timeouts
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    const filtered = filterGames();
    setFilteredGames(filtered);
    setDisplayedGames([]);
    setCurrentBatch(0);
    setIsLoading(false);
    setInitialLoading(true);
    setHasMoreGames(filtered.length > 0);
  }, [filterGames]);

  // Load initial games when filteredGames is set and we're in initial loading state
  useEffect(() => {
    if (filteredGames.length > 0 && initialLoading && displayedGames.length === 0) {
      console.log('Loading initial batch');
      loadNextBatch(true);
    } else if (filteredGames.length === 0 && initialLoading) {
      console.log('No games to load');
      setInitialLoading(false);
      setHasMoreGames(false);
    }
  }, [filteredGames, initialLoading, displayedGames.length, loadNextBatch]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!loadingRef.current || !hasMoreGames || isLoading || initialLoading) {
      return;
    }
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMoreGames && !isLoading && !initialLoading) {
          console.log('Intersection observer triggered - loading next batch');
          loadNextBatch(false);
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
  }, [hasMoreGames, isLoading, initialLoading, loadNextBatch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  if (initialLoading) {
    return (
      <div className={`mb-6 ${className}`}>
        <div className="flex justify-center py-10">
          <LoadingIndicator />
        </div>
      </div>
    );
  }
  
  if (displayedGames.length === 0 && !isLoading && !initialLoading) {
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
        {displayedGames.map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            className="animate-fade-in"
            style={{
              animationDelay: `${(index % itemsPerPage) * 100}ms`
            }}
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
      
      {/* Loading indicator and infinite scroll trigger */}
      {hasMoreGames && (
        <div ref={loadingRef} className="pt-8 flex justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <LoadingIndicator />
              <p className="text-gray-400 text-sm">Loading more games...</p>
            </div>
          ) : (
            <div className="h-8 w-full flex items-center justify-center text-gray-500 text-sm">
              Scroll down for more games...
            </div>
          )}
        </div>
      )}
      
      {!hasMoreGames && displayedGames.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="text-gray-500 text-sm">
            Showing all {displayedGames.length} games
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
