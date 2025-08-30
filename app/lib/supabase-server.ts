import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

if (!isSupabaseConfigured && process.env.NODE_ENV !== 'production') {
  console.warn('Supabase environment variables are not set. Please check your .env.local file.')
  console.warn('Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create Supabase client for server-side operations (no realtime)
export const supabaseServer = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      realtime: {
        params: {
          eventsPerSecond: 0
        }
      }
    })
  : null

// Create service role client for server-side operations (if needed)
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null