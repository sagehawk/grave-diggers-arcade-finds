
import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../types';
import { portfolioGames } from '../data/portfolioGamesData';
import GameGridDisplay from './GameGrid/GameGridDisplay';
import useGameFiltering from './GameGrid/useGameFiltering';
import useInfiniteScroll from './GameGrid/useInfiniteScroll';
import useGameLoading from './GameGrid/useGameLoading';

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
  itemsPerPage = 9,
  SampleDataLoader
}) => {
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom hooks for game filtering and loading logic
  const filteredGames = useGameFiltering(filter, portfolioGames);
  
  const { loadNextBatch } = useGameLoading({
    filteredGames,
    currentBatch,
    itemsPerPage,
    isLoading,
    setIsLoading,
    setDisplayedGames,
    setCurrentBatch,
    setHasMoreGames,
    setInitialLoading,
    loadingTimeoutRef
  });

  const loadingRef = useInfiniteScroll({
    hasMoreGames,
    isLoading,
    initialLoading,
    loadNextBatch
  });

  // Reset everything when filter changes
  useEffect(() => {
    console.log('Filter changed, resetting everything');
    
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    setDisplayedGames([]);
    setCurrentBatch(0);
    setIsLoading(false);
    setInitialLoading(true);
    setHasMoreGames(filteredGames.length > 0);
  }, [filter.searchQuery, filter.genres, filter.platforms, filter.priceRange, filter.releaseStatus, filter.sortBy, filteredGames.length]);

  // Load initial games when component mounts or when filteredGames changes
  useEffect(() => {
    console.log('Effect triggered - filteredGames length:', filteredGames.length, 'initialLoading:', initialLoading, 'displayedGames length:', displayedGames.length);
    
    if (filteredGames.length > 0 && initialLoading) {
      console.log('Loading initial batch');
      loadNextBatch(true);
    } else if (filteredGames.length === 0 && initialLoading) {
      console.log('No games to load');
      setInitialLoading(false);
      setHasMoreGames(false);
    }
  }, [filteredGames, initialLoading, loadNextBatch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <GameGridDisplay
      displayedGames={displayedGames}
      isLoading={isLoading}
      initialLoading={initialLoading}
      hasMoreGames={hasMoreGames}
      itemsPerPage={itemsPerPage}
      className={className}
      loadingRef={loadingRef}
    />
  );
};

export default GameGrid;
