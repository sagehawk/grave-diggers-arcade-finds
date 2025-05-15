
import { types } from './types';

// Extend Game type with userHasLiked
declare module './types' {
  interface Game {
    userHasLiked?: boolean;
  }
}
