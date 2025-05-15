
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const HeroFilter: React.FC = () => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col items-start space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white font-pixel">
          Welcome to GGRave
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          Unearth the best indie horror games from the depths of the gaming community
        </p>
        <div className="relative w-full max-w-xl">
          <Input 
            type="text"
            placeholder="Search games..." 
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default HeroFilter;
