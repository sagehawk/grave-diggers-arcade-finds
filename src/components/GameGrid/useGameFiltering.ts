
import { useMemo } from 'react';
import { Game } from '../../types';

const useGameFiltering = (filter: any, games: Game[]): Game[] => {
  return useMemo(() => {
    console.log('Filtering games with filter:', filter);
    
    let filtered = [...games].filter(game => !!game.background_image);

    filtered = filtered.filter(game => {
      const adultKeywords = ['adult', 'hentai'];
      const gameName = game.name.toLowerCase();
      const gameDescription = (game.description_raw || '').toLowerCase();
      const gameGenres = game.genres ? game.genres.map(g => g.name.toLowerCase()) : [];

      if (adultKeywords.some(keyword => gameName.includes(keyword))) return false;
      if (adultKeywords.some(keyword => gameDescription.includes(keyword))) return false;
      if (gameGenres.some(genre => adultKeywords.some(keyword => genre.includes(keyword)))) return false;

      return true;
    });
    
    // Apply search filter
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(query) ||
        (game.developers && game.developers.some(dev => dev.name.toLowerCase().includes(query))) ||
        (game.description_raw && game.description_raw.toLowerCase().includes(query)) ||
        (game.genres && game.genres.some(g => g.name.toLowerCase().includes(query)))
      );
    }
    
    // Apply genre filter
    if (filter.genres && filter.genres.length > 0) {
      filtered = filtered.filter(game =>
        game.genres && game.genres.some(gameGenre =>
          filter.genres.some((filterGenre: any) => filterGenre.id === gameGenre.id)
        )
      );
    }
    
    // Apply platform filter
    if (filter.platforms && filter.platforms.length > 0) {
      filtered = filtered.filter(game =>
        game.platforms && game.platforms.some(gamePlatform =>
          filter.platforms.some((filterPlatform: any) => filterPlatform.id === gamePlatform.platform.id)
        )
      );
    }
    
    // Sort games
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'trending':
          filtered.sort((a, b) => b.added - a.added);
          break;
        case 'mostLiked':
          filtered.sort((a, b) => b.ratings_count - a.ratings_count);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.released).getTime() - new Date(b.released).getTime());
          break;
        case 'alphabetical':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }
    
    console.log('Filtered games count:', filtered.length);
    return filtered;
  }, [filter, games]);
};

export default useGameFiltering;
