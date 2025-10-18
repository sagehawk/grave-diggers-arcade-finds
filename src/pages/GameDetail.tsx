
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, MessageSquare, Download, Calendar, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGameDetails } from '../services/rawgService';
import { Game } from '../types';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;
      try {
        const gameDetails = await getGameDetails(id);
        setGame(gameDetails);
      } catch (err) {
        setError('Failed to fetch game details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-[#111111] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#111111] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error}</h1>
          <Link to="/" className="text-ggrave-red hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  if (!game) {
    return (
      <div className="bg-[#111111] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <Link to="/" className="text-ggrave-red hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] text-white min-h-screen">
      {/* Header with back button */}
            <div className="container mx-auto px-4 py-6">
              <Link 
                to="/" 
                className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Games
              </Link>
            </div>
      
            {/* Hero Section */}
            <div className="relative">
              <div className="aspect-video w-full max-h-96 overflow-hidden">
                <img 
                  src={game.background_image || game.background_image_additional} 
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
              </div>
              
              {/* Game title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="container mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-2">{game.name}</h1>
                  <p className="text-xl text-gray-300 mb-4">by {game.developers?.map(d => d.name).join(', ')}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      {game.added?.toLocaleString()} views
                    </div>
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1" />
                      {game.ratings_count?.toLocaleString()} likes
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />
                      {game.reviews_count?.toLocaleString()} comments
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(game.released).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: game.description }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Details</h2>
                  <div className="bg-[#181818] border border-gray-800 rounded-lg p-6 space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Genres</label>
                      <div className="flex flex-wrap gap-2">
                        {game.genres?.map((genre, index) => (
                          <span key={index} className="px-3 py-1 bg-[#222222] rounded-full text-sm">
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Platforms</label>
                      <div className="flex flex-wrap gap-2">
                        {game.platforms?.map((platform, index) => (
                          <span key={index} className="px-3 py-1 bg-[#222222] rounded-full text-sm">
                            {platform.platform.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Metacritic</label>
                      <span className="text-lg font-bold text-green-500">{game.metacritic}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Videos */}
            {game.clip && (
              <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-4">Video</h2>
                <div className="aspect-video">
                  <video controls src={game.clip.clip} poster={game.clip.preview} className="w-full h-full rounded-lg" />
                </div>
              </div>
            )}
      
            {/* Where to Buy */}
            {game.stores && game.stores.length > 0 && (
              <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-4">Where to Buy</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {game.stores.map((store, index) => {
                    const url = store.store.name === 'Steam'
                      ? `https://store.steampowered.com/search/?term=${game.name.replace(/ /g, '+')}`
                      : `https://${store.store.domain}`;
                    return (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="bg-[#181818] border border-gray-800 rounded-lg p-4 flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <span className="text-white font-semibold">{store.store.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
  );
};

export default GameDetail;
