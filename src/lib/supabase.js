
import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy Supabase client for development without environment variables
const createDummyClient = () => {
  console.warn('Using dummy Supabase client. Features requiring backend will not work.');
  
  // Return an object that mimics the Supabase client but doesn't make real API calls
  return {
    auth: {
      signInWithPassword: async () => ({ data: null, error: { message: 'Authentication unavailable in demo mode' } }),
      signUp: async () => ({ data: null, error: { message: 'Registration unavailable in demo mode' } }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
        insert: async () => ({ data: null, error: null }),
      }),
      insert: async () => ({ data: null, error: null }),
    }),
  };
};

// Check if the required environment variables are set
const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

// Create the appropriate Supabase client
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient();

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => isConfigured;

// Export a function to get a more user-friendly message about the configuration status
export const getSupabaseConfigStatus = () => {
  if (!supabaseUrl && !supabaseAnonKey) {
    return 'Both Supabase URL and Anonymous Key are missing.';
  } else if (!supabaseUrl) {
    return 'Supabase URL is missing.';
  } else if (!supabaseAnonKey) {
    return 'Supabase Anonymous Key is missing.';
  }
  return 'Supabase is properly configured.';
};
