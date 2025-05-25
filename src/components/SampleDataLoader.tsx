
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code } from 'lucide-react';

const SampleDataLoader: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg mb-6">
      <div className="flex items-start gap-4">
        <Code size={32} className="text-blue-400 flex-shrink-0 mt-1" />
        <div className="flex-grow">
          <h3 className="text-blue-100 font-bold text-lg mb-2">
            Frontend Development Portfolio
          </h3>
          <p className="text-gray-300 mb-4">
            This gaming platform showcases modern React development with TypeScript, 
            advanced filtering, responsive design, and component-based architecture. 
            All games data is statically generated for portfolio demonstration.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github size={16} className="mr-2" />
              View Source Code
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-blue-500 text-blue-300 hover:bg-blue-900/30"
              onClick={() => window.open('mailto:your.email@example.com', '_blank')}
            >
              <ExternalLink size={16} className="mr-2" />
              Contact Developer
            </Button>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            <strong>Tech Stack:</strong> React 18, TypeScript, Tailwind CSS, Vite, Shadcn/ui, React Router
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDataLoader;
