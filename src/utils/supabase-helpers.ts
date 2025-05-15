
import { supabase } from '../lib/supabase';
import { Game, Genre, Platform } from '../types';

// User profile functions
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data;
};

export const fetchUserByUsername = async (username: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
    
  if (error) throw error;
  return data;
};

// Game functions
export const fetchGames = async (
  page = 1,
  filters: {
    genres?: string[];
    platforms?: string[];
    releaseStatus?: string[];
    priceRange?: [number, number];
    searchQuery?: string;
    sortBy?: string;
    timeFrame?: string;
    isFreeOnly?: boolean;
  } = {}
) => {
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  
  let query = supabase
    .from('games')
    .select(`
      *,
      game_genres!inner (
        genres (name, slug)
      ),
      game_likes (user_id)
    `, { count: 'exact' })
    .eq('status', 'published');
  
  // Apply filters
  if (filters.searchQuery) {
    query = query.ilike('title', `%${filters.searchQuery}%`);
  }
  
  if (filters.genres && filters.genres.length > 0) {
    query = query.in('game_genres.genres.slug', filters.genres);
  }
  
  if (filters.platforms && filters.platforms.length > 0) {
    // For array overlap with platform_tags
    query = query.overlaps('platform_tags', filters.platforms);
  }
  
  if (filters.releaseStatus && filters.releaseStatus.length > 0) {
    // Assume status is stored directly in games table
    query = query.in('release_status', filters.releaseStatus);
  }
  
  // Filter free games if enabled
  if (filters.isFreeOnly) {
    query = query.eq('is_free', true);
  }
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'trending':
    case 'mostViewed':
      query = query.order('view_count', { ascending: false });
      break;
    case 'mostLiked':
    case 'highestRated':
      query = query.order('like_count', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'releaseDate':
      query = query.order('release_date', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }
  
  // Apply pagination
  query = query.range(startIndex, startIndex + pageSize - 1);
  
  const { data, count, error } = await query;
  
  if (error) throw error;
  
  // Get current user ID for like checking
  const { data: { user } } = await supabase.auth.getUser();
  const currentUserId = user?.id;
  
  // Transform data to match Game type
  const transformedGames: Game[] = data.map((game) => {
    // Create game object with all required properties
    return {
      id: game.id,
      title: game.title,
      developer: game.developer_name || 'Unknown Developer',
      thumbnail: game.thumbnail_url,
      banner: game.banner_url,
      description: game.description,
      genre: game.game_genres?.map((g: any) => g.genres.name as Genre) || [],
      platforms: game.platform_tags || [],
      price: game.is_free ? "Free" : game.price || 0,
      releaseStatus: game.release_status,
      views: game.view_count || 0,
      likes: game.like_count || 0,
      comments: 0, // This would need another query or join
      releaseDate: game.release_date,
      mediaGallery: game.gallery_image_urls,
      videoUrl: game.trailer_url,
      userHasLiked: currentUserId ? game.game_likes?.some((like: any) => like.user_id === currentUserId) : false
    };
  });
  
  return { games: transformedGames, total: count || 0 };
};

export const fetchGameById = async (id: string) => {
  const { data, error } = await supabase
    .from('games')
    .select(`
      *,
      game_genres!inner (
        genres (name, slug)
      ),
      game_likes (user_id)
    `)
    .eq('id', id)
    .single();
    
  if (error) throw error;
  
  // Get current user ID for like checking
  const { data: { user } } = await supabase.auth.getUser();
  const currentUserId = user?.id;
  
  // Transform to match Game type
  const game: Game = {
    id: data.id,
    title: data.title,
    developer: data.developer_name || 'Unknown Developer',
    thumbnail: data.thumbnail_url,
    banner: data.banner_url,
    description: data.description,
    genre: data.game_genres?.map((g: any) => g.genres.name as Genre) || [],
    platforms: data.platform_tags || [],
    price: data.is_free ? "Free" : data.price || 0,
    releaseStatus: data.release_status,
    views: data.view_count || 0,
    likes: data.like_count || 0,
    comments: 0, // This would need another query
    releaseDate: data.release_date,
    mediaGallery: data.gallery_image_urls,
    videoUrl: data.trailer_url,
    userHasLiked: currentUserId ? data.game_likes?.some((like: any) => like.user_id === currentUserId) : false
  };
  
  return game;
};

// Likes functions
export const toggleGameLike = async (gameId: string) => {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to like a game');
  
  const userId = user.id;
  
  // Check if user already liked this game
  const { data: existingLike, error: checkError } = await supabase
    .from('game_likes')
    .select('*')
    .eq('game_id', gameId)
    .eq('user_id', userId)
    .maybeSingle();
    
  if (checkError) throw checkError;
  
  if (existingLike) {
    // Unlike: Remove the like
    const { error: unlikeError } = await supabase
      .from('game_likes')
      .delete()
      .eq('game_id', gameId)
      .eq('user_id', userId);
      
    if (unlikeError) throw unlikeError;
    return false; // Not liked anymore
  } else {
    // Like: Add a new like
    const { error: likeError } = await supabase
      .from('game_likes')
      .insert({ game_id: gameId, user_id: userId });
      
    if (likeError) throw likeError;
    return true; // Liked
  }
};

// Comments functions
export const fetchGameComments = async (gameId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:user_id (username, avatar_url)
    `)
    .eq('game_id', gameId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const addGameComment = async (gameId: string, content: string, parentCommentId?: string) => {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to comment');
  
  const { data, error } = await supabase
    .from('comments')
    .insert({
      game_id: gameId,
      user_id: user.id,
      content,
      parent_comment_id: parentCommentId || null
    })
    .select(`
      *,
      profiles:user_id (username, avatar_url)
    `)
    .single();
    
  if (error) throw error;
  return data;
};

// File upload helpers
export const uploadGameImage = async (file: File, gameId: string, type: 'thumbnail' | 'banner' | 'gallery') => {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to upload images');
  
  const userId = user.id;
  const fileExt = file.name.split('.').pop();
  const fileName = `${type}-${Date.now()}.${fileExt}`;
  const filePath = `games/${gameId}/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('game_media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('game_media')
    .getPublicUrl(filePath);
    
  return publicUrl;
};

export const uploadUserAvatar = async (file: File) => {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to upload an avatar');
  
  const userId = user.id;
  const fileExt = file.name.split('.').pop();
  const fileName = `avatar-${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('user_avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('user_avatars')
    .getPublicUrl(filePath);
    
  return publicUrl;
};

// Create an incrementViewCount function
export const incrementGameView = async (gameId: string) => {
  const { error } = await supabase.rpc('increment_game_view', {
    game_id: gameId
  });
  
  if (error) {
    console.error('Error incrementing view count:', error);
  }
};
