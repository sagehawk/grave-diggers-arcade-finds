
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { User } from '../../types/auth';

export async function handleSessionChange(session: Session): Promise<User | null> {
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
      email: session.user.email || '',
      username: profile?.username || session.user.email?.split('@')[0] || 'User',
      createdAt: profile?.created_at ? new Date(profile.created_at) : new Date(),
      avatarUrl: profile?.avatar_url || undefined,
      bio: profile?.bio || undefined
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Still return basic user info from session
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email || '',
        username: session.user.email?.split('@')[0] || 'User',
        createdAt: new Date(),
      };
    }
    return null;
  }
}
