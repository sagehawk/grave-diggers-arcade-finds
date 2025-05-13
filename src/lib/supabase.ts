
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// For development, use a fallback URL and key if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Declare the supabase client variable that will be exported
let supabase: ReturnType<typeof createClient<Database>>;

// Check if supabase credentials are available
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env.local file.');
  
  // For safety, we'll create a dummy client that will show clear errors
  // This prevents the app from crashing immediately, but will show proper errors
  const dummyClient = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: new Error('Supabase not configured') }),
      getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') }),
          order: () => ({
            limit: async () => ({ data: [], error: new Error('Supabase not configured') })
          })
        }),
        order: () => ({
          limit: async () => ({ data: [], error: new Error('Supabase not configured') })
        })
      }),
      insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
      update: async () => ({ data: null, error: new Error('Supabase not configured') }),
      delete: async () => ({ data: null, error: new Error('Supabase not configured') })
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: async () => ({ data: null, error: new Error('Supabase not configured') })
      })
    },
    // Add any specific methods that might be used elsewhere in the application
    rpc: async () => ({ data: null, error: new Error('Supabase not configured') })
  };

  // @ts-ignore - TypeScript will complain but this is a temporary solution
  supabase = dummyClient;
} else {
  // If we have valid credentials, create the real client
  supabase = createClient<Database>(supabaseUrl, supabaseKey);
}

// Export the supabase client (either real or dummy) as a single top-level export
export { supabase };
