
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, Search, User, XIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-ggrave-black border-b border-ggrave-darkgray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/ItKyOPt.jpeg" 
                alt="GamerGrave Logo" 
                className="h-10 sm:h-12" // Increased logo size
              />
            </Link>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/games" className="text-white hover:text-ggrave-red font-medium">Games</Link>
            <Link to="/developers" className="text-white hover:text-ggrave-red font-medium">Devs</Link>
            <Link to="/community" className="text-white hover:text-ggrave-red font-medium">Community</Link>
            <Link to="/submit" className="text-white hover:text-ggrave-red font-medium">Submit</Link>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {searchOpen ? (
              <div className="relative md:w-64">
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full bg-ggrave-darkgray text-white px-4 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-ggrave-red"
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setSearchOpen(false)}
                >
                  <XIcon size={18} />
                </button>
              </div>
            ) : (
              <button 
                className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50 rounded" 
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </button>
            )}
            
            {/* Login/Sign Up */}
            <div className="hidden md:block">
              <Button variant="outline" size="sm" className="bg-transparent border border-ggrave-red text-white hover:bg-ggrave-red mr-2 focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50">
                Log In
              </Button>
              <Button size="sm" className="bg-ggrave-red text-white hover:bg-red-700 focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50">
                Sign Up
              </Button>
            </div>
            
            {/* Profile Icon (When logged in) */}
            {/* <div className="hidden md:block">
              <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                <User size={20} />
              </button>
            </div> */}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50 rounded"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XIcon size={24} />
                ) : (
                  <MenuIcon size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ggrave-darkgray">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/games" 
              className="block px-3 py-2 text-white font-medium hover:bg-ggrave-red hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              to="/developers" 
              className="block px-3 py-2 text-white font-medium hover:bg-ggrave-red hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Devs
            </Link>
            <Link 
              to="/community" 
              className="block px-3 py-2 text-white font-medium hover:bg-ggrave-red hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/submit" 
              className="block px-3 py-2 text-white font-medium hover:bg-ggrave-red hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit
            </Link>
            <div className="flex space-x-2 px-3 py-2">
              <Button variant="outline" size="sm" className="bg-transparent border border-ggrave-red text-white hover:bg-ggrave-red focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50">
                Log In
              </Button>
              <Button size="sm" className="bg-ggrave-red text-white hover:bg-red-700 focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
