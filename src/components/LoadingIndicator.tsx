
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="w-12 h-12 flex justify-center items-center">
        <img 
          src="https://i.imgur.com/DeL4OIK.png" 
          alt="Loading..." 
          className="w-10 h-10 animate-[wiggle_1s_ease-in-out_infinite]" 
        />
      </div>
    </div>
  );
};

export default LoadingIndicator;
