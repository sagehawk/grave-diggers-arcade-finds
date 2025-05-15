
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GameDetailsFieldsProps {
  form: UseFormReturn<any>;
}

const GameDetailsFields: React.FC<GameDetailsFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Game Status */}
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-status">Game Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger id="game-status" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select game status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Released">Completed</SelectItem>
                <SelectItem value="In Development">In Development</SelectItem>
                <SelectItem value="Demo Available">Demo Available</SelectItem>
                <SelectItem value="Concept">Open [Idea/Request]</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription className="text-gray-400">
              The current development status of your game.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Price */}
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-price">Price</FormLabel>
            <FormControl>
              <Input 
                id="game-price"
                placeholder="Free, $9.99, TBD" 
                className="bg-gray-800 border-gray-700 text-white"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              The price of your game, or "Free" if it's available for free.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Store Link */}
      <FormField
        control={form.control}
        name="storeLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-store-link">Store/Download Link</FormLabel>
            <FormControl>
              <Input 
                id="game-store-link"
                placeholder="https://store.steampowered.com/..." 
                className="bg-gray-800 border-gray-700 text-white"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Link to purchase or download your game.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Developer Link */}
      <FormField
        control={form.control}
        name="developerLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-dev-link">Developer Website</FormLabel>
            <FormControl>
              <Input 
                id="game-dev-link"
                placeholder="https://yourstudio.com" 
                className="bg-gray-800 border-gray-700 text-white"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Link to your developer website or profile (optional).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default GameDetailsFields;
