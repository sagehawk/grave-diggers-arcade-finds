
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, MessageSquare, Download, Calendar, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioGames } from '../data/portfolioGamesData';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the game from portfolio data
  const game = portfolioGames.find(g => g.id === id);
  
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
            src={game.banner || game.thumbnail} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>
        
        {/* Game title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{game.title}</h1>
            <p className="text-xl text-gray-300 mb-4">by {game.developer}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                {game.views?.toLocaleString()} views
              </div>
              <div className="flex items-center">
                <Heart size={16} className="mr-1" />
                {game.likes?.toLocaleString()} likes
              </div>
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                {game.comments?.toLocaleString()} comments
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {new Date(game.releaseDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Under Construction Notice */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Construction Banner */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-8 mb-8 text-center">
            <Construction size={64} className="mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold mb-2 text-yellow-100">Site Under Construction</h2>
            <p className="text-gray-300 mb-4">
              This gaming platform is currently being developed as a portfolio showcase. 
              Individual game pages are not yet fully implemented.
            </p>
            <p className="text-sm text-gray-400">
              This demonstrates my frontend development skills with React, TypeScript, and modern web technologies.
            </p>
          </div>

          {/* Game Preview Info */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Game Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Game Information</h3>
              <div className="bg-[#181818] border border-gray-800 rounded-lg p-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Description</label>
                  <p className="text-gray-200">{game.description}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {game.genre.map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-[#222222] rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Platforms</label>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform, index) => (
                      <span key={index} className="px-3 py-1 bg-[#222222] rounded-full text-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Price</label>
                  <p className="text-green-400 font-semibold">
                    {typeof game.price === 'string' ? game.price : `$${game.price}`}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Release Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    game.releaseStatus === 'Released' ? 'bg-green-900/30 text-green-300 border border-green-700' :
                    game.releaseStatus === 'Early Access' ? 'bg-blue-900/30 text-blue-300 border border-blue-700' :
                    'bg-gray-900/30 text-gray-300 border border-gray-700'
                  }`}>
                    {game.releaseStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Stats */}
            <div>
              <h3 className="text-xl font-bold mb-4">Actions</h3>
              <div className="bg-[#181818] border border-gray-800 rounded-lg p-6 space-y-4">
                <Button className="w-full" disabled>
                  <Download size={16} className="mr-2" />
                  Download Game (Demo)
                </Button>
                
                <Button variant="secondary" className="w-full" disabled>
                  <Heart size={16} className="mr-2" />
                  Add to Wishlist (Demo)
                </Button>
                
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-semibold mb-3">Game Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Views:</span>
                      <span>{game.views?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Likes:</span>
                      <span>{game.likes?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Comments:</span>
                      <span>{game.comments?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Release Date:</span>
                      <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Technology Stack Info */}
              <div className="mt-6 bg-[#181818] border border-gray-800 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Portfolio Tech Stack</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>• React 18 with TypeScript</p>
                  <p>• Vite for build tooling</p>
                  <p>• Tailwind CSS for styling</p>
                  <p>• Shadcn/ui components</p>
                  <p>• React Router for navigation</p>
                  <p>• Responsive design principles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
