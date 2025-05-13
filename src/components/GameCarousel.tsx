
import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Eye, MessageSquare } from 'lucide-react';

interface GameCarouselProps {
  games: Game[];
  title: string;
}

const GameCarousel: React.FC<GameCarouselProps> = ({ games, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeFrame, setTimeFrame] = useState<'today' | 'week' | 'month' | 'allTime'>('today');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  
  const MAX_THUMBNAILS = 4;
  
  // Function to reset and start the timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
  };
  
  // Start timer on component mount
  useEffect(() => {
    resetTimer();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [games.length]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
    resetTimer(); // Reset timer on manual navigation
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    resetTimer(); // Reset timer on manual navigation
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer(); // Reset timer on manual navigation
  };
  
  // Thumbnail navigation
  const scrollThumbnailsLeft = () => {
    setThumbnailStart(prev => Math.max(0, prev - 1));
  };
  
  const scrollThumbnailsRight = () => {
    setThumbnailStart(prev => Math.min(Math.max(0, games.length - MAX_THUMBNAILS), prev + 1));
  };
  
  if (games.length === 0) return null;
  
  const currentGame = games[currentIndex];

  const timeFrameLabels = {
    today: 'Best of today',
    week: 'Best of this week',
    month: 'Best of this month',
    allTime: 'Best of all time'
  };
  
  return (
    <div className="relative w-full mb-8">
      {/* Main carousel display */}
      <div className="relative h-[400px] overflow-hidden group">
        {/* Full-sized background image */}
        <Link to={`/games/${currentGame.id}`} className="block w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentGame.banner || currentGame.thumbnail})` }}
          />
          
          {/* Gradient overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Top label - Best of today/week/month/allTime */}
          <div className="absolute top-3 left-3 bg-black/60 text-white text-lg font-bold px-3 py-1 z-10">
            {timeFrameLabels[timeFrame]}
          </div>
          
          {/* Developer avatar in top right */}
          <div className="absolute top-3 right-3 z-10">
            <Link to={`/developer/${currentGame.developer}`} className="block">
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                {/* This would be the developer's avatar - placeholder for now */}
                <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-xs">
                  {currentGame.developer.substring(0, 2).toUpperCase()}
                </div>
              </div>
            </Link>
          </div>
          
          {/* Game title on bottom left with background for visibility */}
          <div className="absolute bottom-16 left-0 max-w-2xl z-10">
            <div className="bg-black/60 p-3">
              <h2 className="text-white font-bold text-xl md:text-2xl">{currentGame.title}</h2>
              <h3 className="text-gray-300 text-sm">{currentGame.developer}</h3>
            </div>
          </div>
          
          {/* Engagement stats (views, likes, comments) */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-3 bg-black/60 p-2 rounded z-10">
            <div className="flex items-center">
              <Heart size={16} className="text-red-500 mr-1" />
              <span className="text-white text-sm">{currentGame.likes}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="text-white mr-1" />
              <span className="text-white text-sm">{Math.floor(currentGame.views / 1000)}k</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="text-white mr-1" />
              <span className="text-white text-sm">{currentGame.comments}</span>
            </div>
          </div>
        </Link>
        
        {/* Navigation arrows - improved positioning and z-index */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={(e) => { e.preventDefault(); goToPrevious(); }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={(e) => { e.preventDefault(); goToNext(); }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Thumbnail navigation - Enhanced version */}
      <div className="flex bg-ggrave-darkgray relative">
        {/* Thumbnail scroll arrows */}
        {thumbnailStart > 0 && (
          <button 
            onClick={scrollThumbnailsLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 text-white p-1 z-10"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        
        {thumbnailStart + MAX_THUMBNAILS < games.length && (
          <button 
            onClick={scrollThumbnailsRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 text-white p-1 z-10"
          >
            <ChevronRight size={18} />
          </button>
        )}
        
        {/* Thumbnails */}
        <div className="flex flex-grow overflow-hidden">
          {games.slice(thumbnailStart, thumbnailStart + MAX_THUMBNAILS).map((game, idx) => {
            const actualIndex = thumbnailStart + idx;
            const isActive = actualIndex === currentIndex;
            
            return (
              <button
                key={game.id}
                onClick={() => goToSlide(actualIndex)}
                className={`flex-1 h-20 relative transition-all ${isActive ? '' : 'hover:opacity-100'}`}
              >
                <img 
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for inactive thumbnails */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/60 hover:bg-black/30 transition-colors"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameCarousel;
