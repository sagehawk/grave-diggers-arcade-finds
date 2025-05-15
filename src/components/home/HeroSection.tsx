
import React from 'react';
import GameCarousel from '../GameCarousel';
import { Game } from '../../types';
import LoadingIndicator from '../LoadingIndicator';

interface HeroSectionProps {
  featuredGames: Game[];
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredGames, isLoading }) => {
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="aspect-[16/6] bg-gray-900 animate-pulse rounded-lg">
          <LoadingIndicator />
        </div>
      ) : (
        <GameCarousel games={featuredGames} title="FEATURED GAMES" />
      )}
    </div>
  );
};

export default HeroSection;
