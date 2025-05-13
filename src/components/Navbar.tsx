
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, XIcon, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className="bg-ggrave-black border-b border-ggrave-darkgray sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/ItKyOPt.jpeg" 
                alt="GamerGrave Logo" 
                className="h-12 sm:h-14" 
              />
            </Link>
          </div>
          
          {/* Search Bar - Now visible on all screens */}
          <div className="flex-grow mx-4 sm:mx-6 md:mx-8 lg:mx-10 max-w-xl relative">
            <div className={`relative ${searchFocused ? 'ring-2 ring-ggrave-red' : ''}`}>
              <input
                type="text"
                placeholder="Search for games, devs, tags..."
                className="w-full bg-ggrave-darkgray text-white px-4 py-2 rounded-sm border-2 border-white focus:outline-none focus:border-ggrave-red"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Unearth New Game Button */}
            <Button 
              size="sm" 
              className="bg-ggrave-red text-white hover:bg-red-700 hidden sm:flex items-center"
            >
              <Upload size={16} className="mr-1.5" /> Unearth New Game
            </Button>
            
            {/* Login/Sign Up */}
            <div className="hidden sm:block">
              <Button variant="outline" size="sm" className="bg-transparent border border-ggrave-red text-white hover:bg-ggrave-red mr-2 focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50">
                Log In
              </Button>
              <Button size="sm" className="bg-ggrave-red text-white hover:bg-red-700 focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50">
                Sign Up
              </Button>
            </div>
            
            {/* Mobile "Unearth" Button */}
            <Button 
              variant="default" 
              size="icon" 
              className="sm:hidden bg-ggrave-red text-white hover:bg-red-700"
            >
              <Upload size={18} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
