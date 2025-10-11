
export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: any[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: any;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: { platform: Platform }[];
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
  stores: { store: Store }[];
  clip: { clip: string; preview: string; } | null;
  tags: any[];
  esrb_rating: any;
  short_screenshots: any[];
}

export interface Store {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

// Filter state for game listings
export interface FilterState {
  genres: Genre[];
  platforms: Platform[];
  priceRange: [number, number];
  releaseStatus: string[];
  searchQuery: string;
  sortBy: 'relevance' | 'trending' | 'mostViewed' | 'highestRated' | 'releaseDate' | 'newest' | 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' | 'mostLiked';
  timeFrame: 'allTime' | 'today' | 'week' | 'month' | 'quarter' | 'year';
  isFreeOnly?: boolean;
}
