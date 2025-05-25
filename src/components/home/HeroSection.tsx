
import React from 'react';
import { Game } from '../../types';
import HeroGallery from './HeroGallery';

interface HeroSectionProps {
  featuredGames: Game[];
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredGames, isLoading }) => {
  return (
    <section className="mb-8">
      <HeroGallery featuredGames={featuredGames} isLoading={isLoading} />
    </section>
  );
};

export default HeroSection;
