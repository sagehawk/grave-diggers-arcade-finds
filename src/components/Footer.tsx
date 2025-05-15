
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181818] border-t border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="https://i.imgur.com/ItKyOPt.jpeg" 
              alt="GamerGrave Logo" 
              className="h-8 mb-4"
            />
            <p className="text-gray-400 text-xs">
              © 2025 GamerGrave. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
