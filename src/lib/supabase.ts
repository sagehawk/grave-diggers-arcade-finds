
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Use the hardcoded values for Lovable's environment
const supabaseUrl = "https://xliqdqaerqaezbnppzdd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsaXFkcWFlcnFhZXpibnBwemRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTc3MjAsImV4cCI6MjA2MjczMzcyMH0.1I02V2oeB-kn4p-YzFHjzTsYJaU3ul_eEP3Phzb1F9I";

// Create the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'gamergrave-auth-token',
  }
});
