
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoFieldsProps {
  form: UseFormReturn<any>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Game Title */}
      <FormField
        control={form.control}
        name="title"
        rules={{ required: "Game title is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-title">Game Title</FormLabel>
            <FormControl>
              <Input 
                id="game-title"
                placeholder="Enter your game title" 
                className="bg-gray-800 border-gray-700 text-white"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              The main title of your game that will be displayed to users.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Tagline */}
      <FormField
        control={form.control}
        name="tagline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-tagline">Tagline</FormLabel>
            <FormControl>
              <Input 
                id="game-tagline"
                placeholder="A short catchy slogan for your game" 
                className="bg-gray-800 border-gray-700 text-white"
                maxLength={150}
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              A brief description or slogan (max 150 characters).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        rules={{ required: "Game description is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-description">Full Description</FormLabel>
            <FormControl>
              <Textarea 
                id="game-description"
                placeholder="Describe your game in detail..." 
                className="min-h-[150px] bg-gray-800 border-gray-700 text-white"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              A detailed description of your game, including features, storyline, etc.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;
