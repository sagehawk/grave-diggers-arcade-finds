
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { insertSampleData } from '../utils/sampleData';
import { useToast } from '@/hooks/use-toast';

const SampleDataLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLoadSampleData = async () => {
    setIsLoading(true);
    try {
      const success = await insertSampleData();
      if (success) {
        toast({
          title: "Sample data loaded!",
          description: "The site has been populated with sample games.",
        });
        // Refresh the page to show new data
        window.location.reload();
      } else {
        toast({
          title: "Error loading sample data",
          description: "Check the console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to load sample data:', error);
      toast({
        title: "Error loading sample data",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg mb-4">
      <p className="text-yellow-800 mb-2">
        <strong>Development Mode:</strong> No games found. Load sample data to populate the site?
      </p>
      <Button 
        onClick={handleLoadSampleData}
        disabled={isLoading}
        className="bg-yellow-600 hover:bg-yellow-700 text-white"
      >
        {isLoading ? "Loading Sample Data..." : "Load Sample Data"}
      </Button>
    </div>
  );
};

export default SampleDataLoader;
