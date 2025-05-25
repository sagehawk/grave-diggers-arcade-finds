
import React from 'react';
import { Construction } from 'lucide-react';

interface UnderConstructionProps {
  message?: string;
  className?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ 
  message = "This page is under construction", 
  className = "" 
}) => {
  return (
    <div className={`min-h-screen bg-[#111111] flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Construction size={64} className="text-ggrave-red mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Under Construction</h1>
        <p className="text-gray-400 mb-6">{message}</p>
        <a 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-ggrave-red text-white rounded hover:bg-red-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default UnderConstruction;
