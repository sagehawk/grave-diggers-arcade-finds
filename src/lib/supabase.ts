
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Using Vite's environment variable system
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xliqdqaerqaezbngpzdd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Verify the key is available
if (!supabaseKey) {
  console.error("Supabase key is not defined. Ensure VITE_SUPABASE_KEY environment variable is set correctly.");
  throw new Error("VITE_SUPABASE_KEY is not defined. Please check your environment variables.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
