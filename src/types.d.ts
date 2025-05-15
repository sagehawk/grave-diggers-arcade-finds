
// Extend Game type with userHasLiked
import { Game } from './types';

declare module './types' {
  interface Game {
    userHasLiked?: boolean;
  }
}
