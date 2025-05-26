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

  // Auto-scroll thumbnails to keep current item visible
  useEffect(() => {
    // If current index is outside visible range, adjust thumbnail start
    if (currentIndex < thumbnailStart) {
      setThumbnailStart(currentIndex);
    } else if (currentIndex >= thumbnailStart + MAX_THUMBNAILS) {
      setThumbnailStart(Math.max(0, currentIndex - MAX_THUMBNAILS + 1));
    }
  }, [currentIndex]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
    resetTimer();
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
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
      <div className="relative h-[300px] overflow-hidden group rounded-lg border border-gray-800">
        {/* Full-sized background image */}
        <Link to={`/games/${currentGame.id}`} className="block w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${currentGame.banner || currentGame.thumbnail})` }}
          />
          
          {/* Reduced gradient overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Top label - Best of today/week/month/allTime */}
          <div className="absolute top-4 left-4 bg-ggrave-red/90 text-white text-sm font-bold px-3 py-1.5 z-10 rounded backdrop-blur-sm">
            {timeFrameLabels[timeFrame]}
          </div>
          
          {/* Developer avatar in top right */}
          <div className="absolute top-4 right-4 z-10">
            <Link to={`/developer/${currentGame.developer}`} className="block">
              <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white/80 overflow-hidden shadow-lg hover:scale-110 transition-transform">
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-sm font-bold">
                  {currentGame.developer.substring(0, 2).toUpperCase()}
                </div>
              </div>
            </Link>
          </div>
          
          {/* Game title on bottom left with improved styling */}
          <div className="absolute bottom-16 left-0 max-w-2xl z-10">
            <div className="bg-black/70 backdrop-blur-sm p-4 rounded-r-lg border-l-4 border-ggrave-red">
              <h2 className="text-white font-bold text-xl md:text-2xl mb-1">{currentGame.title}</h2>
              <h3 className="text-gray-300 text-sm font-medium">{currentGame.developer}</h3>
            </div>
          </div>
          
          {/* Engagement stats with improved styling */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg z-10 border border-gray-700">
            <div className="flex items-center">
              <Heart size={16} className="text-red-500 mr-1.5" />
              <span className="text-white text-sm font-medium">{currentGame.likes}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="text-blue-400 mr-1.5" />
              <span className="text-white text-sm font-medium">{currentGame.views}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="text-green-400 mr-1.5" />
              <span className="text-white text-sm font-medium">{currentGame.comments}</span>
            </div>
          </div>
        </Link>
        
        {/* Navigation arrows with improved styling */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border border-gray-600 hover:border-gray-400"
          onClick={(e) => { e.preventDefault(); goToPrevious(); }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border border-gray-600 hover:border-gray-400"
          onClick={(e) => { e.preventDefault(); goToNext(); }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Thumbnail navigation - made slightly thinner */}
      <div className="flex bg-ggrave-darkgray relative rounded-b-lg border-x border-b border-gray-800">
        {/* Thumbnail scroll arrows */}
        {thumbnailStart > 0 && (
          <button 
            onClick={scrollThumbnailsLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-1.5 z-10 rounded-r transition-all"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        
        {thumbnailStart + MAX_THUMBNAILS < games.length && (
          <button 
            onClick={scrollThumbnailsRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-1.5 z-10 rounded-l transition-all"
          >
            <ChevronRight size={16} />
          </button>
        )}
        
        {/* Thumbnails - slightly thinner */}
        <div className="flex flex-grow overflow-hidden">
          {games.slice(thumbnailStart, thumbnailStart + MAX_THUMBNAILS).map((game, idx) => {
            const actualIndex = thumbnailStart + idx;
            const isActive = actualIndex === currentIndex;
            
            return (
              <button
                key={game.id}
                onClick={() => goToSlide(actualIndex)}
                className={`flex-1 h-12 md:h-16 lg:h-20 relative transition-all duration-300 ${isActive ? 'ring-2 ring-ggrave-red' : 'hover:opacity-100'}`}
              >
                <img 
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay for inactive thumbnails - much darker */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/80 hover:bg-black/60 transition-all duration-300"></div>
                )}
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-ggrave-red/10"></div>
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
