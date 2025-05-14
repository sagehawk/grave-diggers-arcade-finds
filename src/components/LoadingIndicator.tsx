
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ className }) => {
  return (
    <div className={cn("flex justify-center py-6", className)}>
      <div className="relative animate-spin-slow">
        <img 
          src="https://i.imgur.com/DeL4OIK.png" 
          alt="GG Loading" 
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
};

export default LoadingIndicator;
