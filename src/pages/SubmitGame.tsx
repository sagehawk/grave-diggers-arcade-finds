import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Form, 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { Genre, Platform } from '../types';
import { validateFileSize, optimizeImage, optimizeMultipleImages } from '../utils/imageOptimization';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import LoadingIndicator from '../components/LoadingIndicator';
import BasicInfoFields from '../components/GameSubmission/BasicInfoFields';
import MediaUploadFields from '../components/GameSubmission/MediaUploadFields';
import GenreFields from '../components/GameSubmission/GenreFields';
import GameDetailsFields from '../components/GameSubmission/GameDetailsFields';
import PlatformFields from '../components/GameSubmission/PlatformFields';

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
      
      // Create a public bucket for games without checking if it exists first
      try {
        // Try to create the bucket (will error if exists, but we'll catch that)
        const { error: createError } = await supabase.storage.createBucket('games', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
        
        if (createError && !createError.message.includes('already exists')) {
          console.error("Error creating games bucket:", createError);
        }
      } catch (bucketError) {
        // Bucket likely already exists, we can continue
        console.log("Bucket may already exist:", bucketError);
      }
      
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
              {/* Basic Info Fields */}
              <BasicInfoFields form={form} />
              
              {/* Media Upload Fields */}
              <MediaUploadFields 
                form={form} 
                validateAndPreviewFile={validateAndPreviewFile} 
                fileErrors={fileErrors} 
              />
              
              {/* Genre Fields */}
              <GenreFields form={form} availableGenres={availableGenres} />
              
              {/* Game Status and Platform Fields */}
              <GameDetailsFields form={form} />
              
              {/* Platform Fields */}
              <PlatformFields form={form} availablePlatforms={availablePlatforms} />
              
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
