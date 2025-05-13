
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

// Verify the key is available
if (!supabaseKey) {
  console.error("Supabase key is not defined. Ensure VITE_SUPABASE_KEY environment variable is set correctly.");
  throw new Error("Supabase key is not defined. Ensure VITE_SUPABASE_KEY environment variable is set correctly.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
