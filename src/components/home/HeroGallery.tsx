
import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../../types';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '../ui/carousel';
import { AspectRatio } from '../ui/aspect-ratio';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroGalleryProps {
  featuredGames: Game[];
  isLoading: boolean;
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ featuredGames, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const MAX_THUMBNAILS = 4;

  // Function to reset and start the timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
    }, 5000);
  };

  // Start timer on component mount
  useEffect(() => {
    if (featuredGames.length > 0) {
      resetTimer();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [featuredGames.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  // Thumbnail navigation
  const scrollThumbnailsLeft = () => {
    setThumbnailStart(prev => Math.max(0, prev - 1));
  };
  
  const scrollThumbnailsRight = () => {
    setThumbnailStart(prev => Math.min(Math.max(0, featuredGames.length - MAX_THUMBNAILS), prev + 1));
  };

  if (isLoading) {
    return (
      <div className="h-48 md:h-80 bg-gray-900 rounded-lg animate-pulse mb-6" />
    );
  }

  if (featuredGames.length === 0) return null;

  const currentGame = featuredGames[currentIndex];

  return (
    <div className="mb-6">
      {/* Main Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <AspectRatio ratio={16/9} className="h-48 md:h-80">
                <div 
                  className="w-full h-full rounded-lg bg-cover bg-center relative overflow-hidden group cursor-pointer"
                  style={{ backgroundImage: `url(${currentGame.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h2 className="text-white text-xl md:text-3xl font-bold mb-2">
                      {currentGame.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                      {currentGame.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentGame.genre && currentGame.genre.slice(0, 3).map((genre) => (
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
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Mini Gallery - Thumbnail Navigation */}
      <div className="flex bg-gray-900 relative rounded-b-lg border-x border-b border-gray-800 mt-2">
        {/* Thumbnail scroll arrows */}
        {thumbnailStart > 0 && (
          <button 
            onClick={scrollThumbnailsLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-2 z-10 rounded-r transition-all"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        
        {thumbnailStart + MAX_THUMBNAILS < featuredGames.length && (
          <button 
            onClick={scrollThumbnailsRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-2 z-10 rounded-l transition-all"
          >
            <ChevronRight size={18} />
          </button>
        )}
        
        {/* Thumbnails */}
        <div className="flex flex-grow overflow-hidden">
          {featuredGames.slice(thumbnailStart, thumbnailStart + MAX_THUMBNAILS).map((game, idx) => {
            const actualIndex = thumbnailStart + idx;
            const isActive = actualIndex === currentIndex;
            
            return (
              <button
                key={game.id}
                onClick={() => goToSlide(actualIndex)}
                className={`flex-1 h-20 relative transition-all duration-300 ${isActive ? 'ring-2 ring-red-600' : 'hover:opacity-100'}`}
              >
                <img 
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay for inactive thumbnails */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/50 hover:bg-black/20 transition-all duration-300"></div>
                )}
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-red-600/10"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;
