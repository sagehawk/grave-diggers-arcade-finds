import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import LoadingIndicator from './LoadingIndicator';
import { fetchGames } from '../utils/supabase-helpers';
import { useToast } from '@/hooks/use-toast';

interface GameGridProps {
  filter: any; // We'll use the filter state from parent component
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
  const { toast } = useToast();

  // Function to load games from Supabase
  const loadGames = useCallback(async (page: number, isInitial: boolean = false) => {
    if (loading || (allLoaded && !isInitial)) return;
    
    try {
      setLoading(true);
      
      const { games: fetchedGames, total } = await fetchGames(page, filter);
      
      setTotalGames(total);
      
      if (isInitial) {
        setGames(fetchedGames);
      } else {
        setGames(prev => [...prev, ...fetchedGames]);
      }
      
      // Check if we've loaded all games
      if (fetchedGames.length < itemsPerPage || games.length + fetchedGames.length >= total) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }
      
    } catch (error) {
      console.error('Error loading games:', error);
      toast({
        title: "Error loading games",
        description: error instanceof Error ? error.message : "Failed to load games",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      if (isInitial) {
        setInitialLoading(false);
      }
    }
  }, [filter, loading, allLoaded, itemsPerPage, games.length, toast]);

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
        {/* Show sample data loader if available and no search query */}
        {SampleDataLoader && !filter.searchQuery && <SampleDataLoader />}
        
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
