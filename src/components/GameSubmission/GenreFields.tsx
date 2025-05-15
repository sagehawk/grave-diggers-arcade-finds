
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Genre } from '../../types';

interface GenreFieldsProps {
  form: UseFormReturn<any>;
  availableGenres: Genre[];
}

const GenreFields: React.FC<GenreFieldsProps> = ({ form, availableGenres }) => {
  return (
    <FormField
      control={form.control}
      name="genres"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-white">Genres</FormLabel>
            <FormDescription className="text-gray-400">
              Select all genres that apply to your game.
            </FormDescription>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableGenres.map((genre) => (
              <FormField
                key={genre}
                control={form.control}
                name="genres"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={genre}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          id={`genre-${genre.toLowerCase()}`}
                          name={`genre-${genre.toLowerCase()}`}
                          checked={field.value?.includes(genre)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, genre])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== genre
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-white" htmlFor={`genre-${genre.toLowerCase()}`}>
                        {genre}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenreFields;
