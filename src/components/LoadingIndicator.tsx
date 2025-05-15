
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <img 
        src="https://i.imgur.com/DeL4OIK.png" 
        alt="Loading..." 
        className="w-12 h-12 animate-spin" 
        style={{ animationDuration: '1s' }}
      />
    </div>
  );
};

export default LoadingIndicator;
