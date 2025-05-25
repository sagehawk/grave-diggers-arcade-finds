
import { useMemo } from 'react';
import { Game } from '../../types';

const useGameFiltering = (filter: any, games: Game[]): Game[] => {
  return useMemo(() => {
    console.log('Filtering games with filter:', filter);
    
    let filtered = [...games];
    
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
  }, [filter.searchQuery, filter.genres, filter.platforms, filter.priceRange, filter.releaseStatus, filter.sortBy, games]);
};

export default useGameFiltering;
