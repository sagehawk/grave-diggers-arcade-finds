
import React from 'react';
import { Game } from '../../types';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '../ui/carousel';
import { AspectRatio } from '../ui/aspect-ratio';

interface HeroGalleryProps {
  featuredGames: Game[];
  isLoading: boolean;
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ featuredGames, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-48 md:h-80 bg-gray-900 rounded-lg animate-pulse mb-6" />
    );
  }

  return (
    <div className="mb-6">
      <Carousel className="w-full">
        <CarouselContent>
          {featuredGames.map((game) => (
            <CarouselItem key={game.id}>
              <AspectRatio ratio={16/9} className="h-48 md:h-80">
                <div 
                  className="w-full h-full rounded-lg bg-cover bg-center relative overflow-hidden group cursor-pointer"
                  style={{ backgroundImage: `url(${game.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h2 className="text-white text-xl md:text-3xl font-bold mb-2">
                      {game.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                      {game.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {game.genre && game.genre.slice(0, 3).map((genre) => (
                        <span 
                          key={genre}
                          className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default HeroGallery;
