
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import LoadingIndicator from './LoadingIndicator';

interface GameGridProps {
  games: Game[];
  title: string;
  viewAllLink?: string;
  className?: string;
  itemsPerPage?: number;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  games, 
  title, 
  viewAllLink, 
  className = '',
  itemsPerPage = 12
}) => {
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Function to load more games
  const loadMoreGames = useCallback(() => {
    if (loading || allLoaded) return;
    
    setLoading(true);
    
    // Simulate loading delay for demo purposes
    setTimeout(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newGames = games.slice(startIndex, endIndex);
      
      if (newGames.length > 0) {
        setVisibleGames(prev => [...prev, ...newGames]);
        setCurrentPage(prev => prev + 1);
      }
      
      // Check if we've loaded all games
      if (endIndex >= games.length) {
        setAllLoaded(true);
      }
      
      setLoading(false);
    }, 800); // Simulate network delay
  }, [currentPage, games, itemsPerPage, loading, allLoaded]);

  // Set up intersection observer
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

  // Initial load
  useEffect(() => {
    // Reset state when games array changes
    setVisibleGames([]);
    setCurrentPage(1);
    setAllLoaded(false);
    setLoading(true);
    
    // Load initial batch of games
    const initialGames = games.slice(0, itemsPerPage);
    setVisibleGames(initialGames);
    setCurrentPage(2);
    setAllLoaded(initialGames.length >= games.length);
    setLoading(false);
  }, [games, itemsPerPage]);

  if (games.length === 0) return null;
  
  return (
    <div className={`mb-6 ${className}`}>
      {/* Removed the redundant title here */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
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
