
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface MediaUploadFieldsProps {
  form: UseFormReturn<any>;
  validateAndPreviewFile: (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'thumbnail' | 'galleryImages') => void;
  fileErrors: { thumbnail?: string; galleryImages?: string[] };
}

const MediaUploadFields: React.FC<MediaUploadFieldsProps> = ({ 
  form, validateAndPreviewFile, fileErrors 
}) => {
  return (
    <>
      {/* Thumbnail */}
      <FormField
        control={form.control}
        name="thumbnail"
        rules={{ required: "Game thumbnail is required" }}
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-thumbnail">Main Thumbnail</FormLabel>
            <FormControl>
              <Input 
                id="game-thumbnail"
                name="game-thumbnail"
                type="file" 
                className="bg-gray-800 border-gray-700 text-white"
                accept="image/jpeg,image/png,image/webp" 
                onChange={(e) => validateAndPreviewFile(e, 'thumbnail')}
                {...fieldProps} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Upload a main cover image for your game (recommended: 1280x720px). JPG format preferred. Max size: 5MB.
            </FormDescription>
            {fileErrors.thumbnail && (
              <p className="text-sm font-medium text-destructive mt-1">{fileErrors.thumbnail}</p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Gallery Images */}
      <FormField
        control={form.control}
        name="galleryImages"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-gallery">Gallery Images</FormLabel>
            <FormControl>
              <Input 
                id="game-gallery"
                name="game-gallery"
                type="file" 
                className="bg-gray-800 border-gray-700 text-white"
                accept="image/jpeg,image/png,image/webp" 
                multiple
                onChange={(e) => validateAndPreviewFile(e, 'galleryImages')}
                {...fieldProps} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              Upload up to 5 additional screenshots or artwork. JPG format preferred. Max size: 5MB per image.
            </FormDescription>
            {fileErrors.galleryImages && fileErrors.galleryImages.map((error, i) => (
              <p key={i} className="text-sm font-medium text-destructive mt-1">{error}</p>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Trailer URL */}
      <FormField
        control={form.control}
        name="trailerUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white" htmlFor="game-trailer">Trailer Link</FormLabel>
            <FormControl>
              <Input 
                id="game-trailer"
                placeholder="https://www.youtube.com/watch?v=..." 
                className="bg-gray-800 border-gray-700 text-white"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-gray-400">
              YouTube or Vimeo link to your game trailer (preferred over uploading video files).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MediaUploadFields;
