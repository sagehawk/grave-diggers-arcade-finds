
import React, { useState, useEffect } from 'react';
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
        
        {/* Navigation arrows */}
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
      
      {/* Thumbnail navigation */}
      <div className="flex overflow-x-auto gap-2 py-2 mt-1 bg-ggrave-darkgray">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-24 h-16 relative ${
              index === currentIndex ? 'border-2 border-ggrave-red' : 'border border-gray-700'
            }`}
          >
            <img 
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;
