
import React from 'react';
import { Separator } from '@/components/ui/separator';

export const WelcomeSection: React.FC = () => {
  return (
    <div className="bg-[#181818] border border-gray-800 p-4">
      <h3 className="font-pixel text-white text-sm mb-3 flex items-center">
        <span className="w-2 h-2 bg-ggrave-red mr-2"></span>
        Welcome
      </h3>
      <Separator className="mb-3 bg-gray-700" />
      
      <p className="text-white text-base font-inter">
        Welcome to GamerGrave!<br /><br />
      </p>
      <p className="text-white text-base font-inter">
        Discord:<br />
        <a
          href="https://discord.gg/QJR7JeNxzc" 
          className="text-red-500 hover:text-red-400"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://discord.gg/QJR7JeNxzc
        </a>
      </p>
    </div>
  );
};
