
import { useCallback } from 'react';
import { Game } from '../../types';

interface UseGameLoadingProps {
  filteredGames: Game[];
  currentBatch: number;
  itemsPerPage: number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setDisplayedGames: React.Dispatch<React.SetStateAction<Game[]>>;
  setCurrentBatch: (batch: number) => void;
  setHasMoreGames: (hasMore: boolean) => void;
  setInitialLoading: (loading: boolean) => void;
  loadingTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const useGameLoading = ({
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
}: UseGameLoadingProps) => {
  const loadNextBatch = useCallback((isInitial: boolean = false) => {
    console.log('Loading next batch, current batch:', currentBatch, 'isInitial:', isInitial);
    
    if (isLoading && !isInitial) {
      console.log('Already loading, skipping');
      return;
    }

    setIsLoading(true);

    const delay = isInitial ? 0 : 1100; // 1.1 second delay for dramatic effect
    
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
  }, [currentBatch, filteredGames, itemsPerPage, isLoading, setIsLoading, setDisplayedGames, setCurrentBatch, setHasMoreGames, setInitialLoading, loadingTimeoutRef]);

  return { loadNextBatch };
};

export default useGameLoading;
