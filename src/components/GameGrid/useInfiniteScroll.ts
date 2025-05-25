
import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  hasMoreGames: boolean;
  isLoading: boolean;
  initialLoading: boolean;
  loadNextBatch: (isInitial?: boolean) => void;
}

const useInfiniteScroll = ({
  hasMoreGames,
  isLoading,
  initialLoading,
  loadNextBatch
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

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

  return loadingRef;
};

export default useInfiniteScroll;
