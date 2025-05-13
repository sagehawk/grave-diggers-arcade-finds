
import React from 'react';
import { Developer } from '../types';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface FeaturedDeveloperProps {
  developer: Developer;
}

const FeaturedDeveloper: React.FC<FeaturedDeveloperProps> = ({ developer }) => {
  return (
    <div className="bg-ggrave-darkgray border border-gray-800 rounded-sm overflow-hidden">
      <div className="bg-ggrave-darkgray mb-0 p-2 border-l-4 border-ggrave-red">
        <h2 className="font-pixel text-white text-sm">Dev Spotlight</h2>
      </div>
      
      <div className="p-4 flex flex-col items-center">
        <img 
          src={developer.avatar} 
          alt={developer.name}
          className="w-20 h-20 rounded-full border-2 border-ggrave-red mb-3"
        />
        
        <h3 className="font-pixel text-white text-base mb-2">{developer.name}</h3>
        
        <p className="text-sm text-gray-300 text-center mb-4">
          {developer.bio}
        </p>
        
        {(developer.twitter || developer.discord || developer.website) && (
          <div className="flex space-x-3 mb-4">
            {developer.website && (
              <a 
                href={developer.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ggrave-red hover:text-white"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {/* More social icons could go here */}
          </div>
        )}
        
        <Link 
          to={`/developers/${developer.id}`}
          className="text-ggrave-red text-sm hover:underline flex items-center"
        >
          View Profile
          <ChevronRight size={14} className="ml-1" />
        </Link>
      </div>
      
      {developer.games.length > 0 && (
        <div className="px-4 pb-4">
          <h4 className="text-white text-sm font-medium mb-2">Games:</h4>
          <div className="space-y-2">
            {/* Normally we would fetch and display actual games here */}
            <div className="text-sm text-gray-300 border-l-2 border-ggrave-red pl-2">
              Sample Game 1
            </div>
            <div className="text-sm text-gray-300 border-l-2 border-gray-700 pl-2">
              Sample Game 2
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Import the missing ChevronRight icon
import { ChevronRight } from 'lucide-react';

export default FeaturedDeveloper;
