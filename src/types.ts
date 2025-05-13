
// Game data structure
export interface Game {
  id: string;
  title: string;
  developer: string;
  thumbnail: string;
  banner?: string;
  description: string;
  genre: string[];
  platforms: string[];
  price: number | "Free";
  releaseStatus: "Released" | "Early Access" | "Demo Available" | "In Development" | "Concept" | "Updated";
  views: number;
  likes: number;
  comments: number;
  releaseDate: string;
}

// Developer data structure
export interface Developer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  games: string[]; // IDs of games
  website?: string;
  twitter?: string;
  discord?: string;
}

// Genre categories
export type Genre = 
  "Action" | 
  "Adventure" | 
  "RPG" | 
  "Strategy" | 
  "Puzzle" | 
  "Simulation" | 
  "Sports" | 
  "Racing" | 
  "Horror" | 
  "Platformer" | 
  "Shooter" | 
  "Fighting" | 
  "Casual" | 
  "Other";

// Platform types
export type Platform = "Windows" | "Mac" | "Linux" | "Browser" | "Mobile" | "Switch" | "PlayStation" | "Xbox";

// Filter state for game listings
export interface FilterState {
  genres: Genre[];
  platforms: Platform[];
  priceRange: [number, number];
  releaseStatus: string[];
  searchQuery: string;
  sortBy: 'trending' | 'mostViewed' | 'mostLiked' | 'highestRated' | 'newest' | 'releaseDate' | 'priceAsc' | 'priceDesc';
  timeFrame: 'today' | 'week' | 'month' | 'quarter' | 'allTime';
}
