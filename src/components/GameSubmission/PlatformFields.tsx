
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Platform } from '../../types';

interface PlatformFieldsProps {
  form: UseFormReturn<any>;
  availablePlatforms: Platform[];
}

const PlatformFields: React.FC<PlatformFieldsProps> = ({ form, availablePlatforms }) => {
  return (
    <FormField
      control={form.control}
      name="platforms"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-white">Platforms</FormLabel>
            <FormDescription className="text-gray-400">
              Select all platforms your game is available on.
            </FormDescription>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availablePlatforms.map((platform) => (
              <FormField
                key={platform}
                control={form.control}
                name="platforms"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={platform}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          id={`platform-${platform.toLowerCase()}`}
                          name={`platform-${platform.toLowerCase()}`}
                          checked={field.value?.includes(platform)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, platform])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== platform
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-white" htmlFor={`platform-${platform.toLowerCase()}`}>
                        {platform}
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

export default PlatformFields;
