
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Genre, Platform } from '../types';
import { validateFileSize, optimizeImage, optimizeMultipleImages } from '../utils/imageOptimization';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GameSubmissionForm {
  title: string;
  tagline: string;
  description: string;
  thumbnail: FileList | null;
  galleryImages: FileList | null;
  trailerUrl: string;
  genres: string[];
  customTags: string;
  status: string;
  platforms: string[];
  price: string;
  storeLink: string;
  developerLink: string;
}

// Lists of available genres and platforms
const availableGenres: Genre[] = [
  "Action", "Adventure", "RPG", "Strategy", "Puzzle",
  "Simulation", "Sports", "Racing", "Horror", "Platformer",
  "Shooter", "Fighting", "Casual", "Other"
];

const availablePlatforms: Platform[] = [
  "Windows", "Mac", "Linux", "Browser", 
  "Mobile", "Switch", "PlayStation", "Xbox"
];

const SubmitGame: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<GameSubmissionForm>({
    defaultValues: {
      title: '',
      tagline: '',
      description: '',
      thumbnail: null,
      galleryImages: null,
      trailerUrl: '',
      genres: [],
      customTags: '',
      status: 'In Development',
      platforms: [],
      price: '',
      storeLink: '',
      developerLink: '',
    },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileErrors, setFileErrors] = useState<{ 
    thumbnail?: string; 
    galleryImages?: string[] 
  }>({});

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You need to be logged in to submit a game.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, navigate, toast]);

  // Handle file validation and preview
  const validateAndPreviewFile = (
    e: React.ChangeEvent<HTMLInputElement>, 
    fieldName: 'thumbnail' | 'galleryImages'
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // For thumbnails (single file)
    if (fieldName === 'thumbnail') {
      const file = files[0];
      if (!validateFileSize(file)) {
        setFileErrors(prev => ({
          ...prev,
          thumbnail: `File ${file.name} exceeds the 5MB limit`
        }));
        e.target.value = '';
        return;
      }
      setFileErrors(prev => ({ ...prev, thumbnail: undefined }));
      form.setValue('thumbnail', files);
    } 
    // For gallery (multiple files)
    else {
      const errors: string[] = [];
      
      Array.from(files).forEach(file => {
        if (!validateFileSize(file)) {
          errors.push(`File ${file.name} exceeds the 5MB limit`);
        }
      });
      
      if (errors.length > 0) {
        setFileErrors(prev => ({ ...prev, galleryImages: errors }));
        e.target.value = '';
        return;
      }
      
      setFileErrors(prev => ({ ...prev, galleryImages: undefined }));
      form.setValue('galleryImages', files);
    }
  };

  const onSubmit = async (data: GameSubmissionForm) => {
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "Please sign in again to submit your game.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      toast({
        title: "Processing Images",
        description: "Optimizing images for upload. Please wait...",
      });
      
      // Process thumbnail
      let thumbnailUrl = '';
      if (data.thumbnail && data.thumbnail.length > 0) {
        const optimizedThumbnail = await optimizeImage(data.thumbnail[0], true);
        const thumbnailPath = `game-thumbnails/${user.id}/${Date.now()}-${optimizedThumbnail.name}`;
        
        // Upload to Supabase Storage
        const { data: thumbnailData, error: thumbnailError } = await supabase.storage
          .from('games')
          .upload(thumbnailPath, optimizedThumbnail);
          
        if (thumbnailError) throw new Error(`Thumbnail upload failed: ${thumbnailError.message}`);
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('games')
          .getPublicUrl(thumbnailPath);
          
        thumbnailUrl = publicUrlData.publicUrl;
      }
      
      // Process gallery images
      let galleryUrls: string[] = [];
      if (data.galleryImages && data.galleryImages.length > 0) {
        const optimizedGalleryImages = await optimizeMultipleImages(data.galleryImages, false);
        
        // Upload each gallery image
        const uploadPromises = optimizedGalleryImages.map(async (file, index) => {
          const galleryPath = `game-galleries/${user.id}/${Date.now()}-${index}-${file.name}`;
          
          const { data: galleryData, error: galleryError } = await supabase.storage
            .from('games')
            .upload(galleryPath, file);
            
          if (galleryError) throw new Error(`Gallery image upload failed: ${galleryError.message}`);
          
          const { data: publicUrlData } = supabase.storage
            .from('games')
            .getPublicUrl(galleryPath);
            
          return publicUrlData.publicUrl;
        });
        
        galleryUrls = await Promise.all(uploadPromises);
      }
      
      // Parse custom tags
      const customTags = data.customTags ? 
        data.customTags.split(',').map(tag => tag.trim()) : 
        [];
      
      // Prepare game data for database
      const gameData = {
        title: data.title,
        tagline: data.tagline || null,
        description: data.description,
        thumbnail: thumbnailUrl,
        genre: data.genres,
        platforms: data.platforms,
        price: data.price,
        releaseStatus: data.status,
        views: 0,
        likes: 0,
        comments: 0,
        releaseDate: new Date().toISOString(),
        mediaGallery: galleryUrls.length > 0 ? galleryUrls : null,
        videoUrl: data.trailerUrl || null,
        customTags: customTags.length > 0 ? customTags : null,
        submitter_user_id: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending',
        storeLink: data.storeLink || null,
        developerLink: data.developerLink || null
      };
      
      // Insert game data into Supabase
      const { data: insertedGame, error: insertError } = await supabase
        .from('games')
        .insert(gameData)
        .select();
        
      if (insertError) throw new Error(`Failed to save game data: ${insertError.message}`);
      
      // Show success toast
      toast({
        title: "Game Submitted Successfully!",
        description: "Your game has been submitted for review. You'll be notified once it's approved.",
      });
      
      // Redirect to home page
      navigate('/');
      
    } catch (error) {
      console.error('Error submitting game:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-ggrave-black">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 font-pixel">Unearth New Game</h1>
        
        <div className="bg-gray-900 border border-gray-800 rounded-md p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Game Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Game title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Game Title</FormLabel>
                    <FormControl>
                      <Input 
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
                    <FormLabel className="text-white">Tagline</FormLabel>
                    <FormControl>
                      <Input 
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
                    <FormLabel className="text-white">Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
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
              
              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                rules={{ required: "Game thumbnail is required" }}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel className="text-white">Main Thumbnail</FormLabel>
                    <FormControl>
                      <Input 
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
                    <FormLabel className="text-white">Gallery Images</FormLabel>
                    <FormControl>
                      <Input 
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
                    <FormLabel className="text-white">Trailer Link</FormLabel>
                    <FormControl>
                      <Input 
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
              
              {/* Genres */}
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
                                    checked={field.value?.includes(genre)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, genre])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== genre
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-white">
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
              
              {/* Custom Tags */}
              <FormField
                control={form.control}
                name="customTags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Custom Tags</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="pixel art, difficult, co-op" 
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Comma-separated list of custom tags that describe your game.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Game Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Game Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
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
              
              {/* Platforms */}
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
                                    checked={field.value?.includes(platform)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, platform])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== platform
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-white">
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
              
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
                    <FormControl>
                      <Input 
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
                    <FormLabel className="text-white">Store/Download Link</FormLabel>
                    <FormControl>
                      <Input 
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
                    <FormLabel className="text-white">Developer Website</FormLabel>
                    <FormControl>
                      <Input 
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
              
              {/* Submit buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => navigate('/')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-ggrave-red hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Submit for Review'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubmitGame;
