
import React, { useState, useEffect } from 'react';
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GameCarouselProps {
  games: Game[];
  title: string;
}

const GameCarousel: React.FC<GameCarouselProps> = ({ games, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [games.length]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };
  
  if (games.length === 0) return null;
  
  const currentGame = games[currentIndex];
  
  return (
    <div className="relative w-full mb-8">
      <div className="bg-ggrave-darkgray mb-2 p-2 border-l-4 border-ggrave-red flex items-center">
        <h2 className="font-pixel text-white text-sm md:text-base">{title}</h2>
      </div>
      
      <div className="relative h-[300px] md:h-[400px] overflow-hidden group">
        {/* Background banner image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${currentGame.banner || currentGame.thumbnail})`,
            filter: 'brightness(0.5) blur(5px)',
            transform: 'scale(1.1)'
          }}
        />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col md:flex-row p-4 md:p-6 z-10">
          <div className="md:w-1/2 flex items-center justify-center">
            <img 
              src={currentGame.thumbnail}
              alt={currentGame.title}
              className="w-full md:max-w-md h-auto object-cover border-4 border-ggrave-darkgray shadow-2xl"
            />
          </div>
          
          <div className="md:w-1/2 flex flex-col justify-center mt-4 md:mt-0 md:pl-8">
            <h3 className="font-pixel text-xl md:text-2xl text-white mb-2">{currentGame.title}</h3>
            <p className="text-sm text-gray-300 mb-4">by {currentGame.developer}</p>
            
            <p className="text-sm md:text-base text-gray-200 mb-6 line-clamp-3">
              {currentGame.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {currentGame.genre.slice(0, 4).map((genre) => (
                <span 
                  key={genre} 
                  className="px-2 py-1 bg-black bg-opacity-50 text-xs text-white border border-ggrave-red rounded-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-sm text-gray-300">
                {currentGame.price === 'Free' ? 'Free' : `$${currentGame.price}`}
              </span>
              <span className="text-xs px-2 py-1 bg-ggrave-red text-white rounded-sm">
                {currentGame.releaseStatus}
              </span>
            </div>
            
            <Link 
              to={`/games/${currentGame.id}`}
              className="pixel-button max-w-xs text-center"
            >
              Dig Up
            </Link>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={goToNext}
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-ggrave-red' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCarousel;
