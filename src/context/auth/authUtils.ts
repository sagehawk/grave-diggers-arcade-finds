
import { Session } from '@supabase/supabase-js';
import { User } from '../../types/auth';
import { supabase } from '../../lib/supabase';

export const handleSessionChange = async (session: Session): Promise<User> => {
  try {
    const userId = session.user.id;
    
    // Get user profile from public profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      throw profileError;
    }
    
    return {
      id: userId,
      username: profile.username || session.user.email?.split('@')[0] || 'User',
      email: session.user.email || '',
      createdAt: profile.created_at ? new Date(profile.created_at) : new Date(),
      avatarUrl: profile.avatar_url || undefined,
      bio: profile.bio || undefined
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Still set basic user info from session
    return {
      id: session.user.id,
      email: session.user.email || '',
      username: session.user.email?.split('@')[0] || 'User',
      createdAt: new Date(),
    };
  }
};
