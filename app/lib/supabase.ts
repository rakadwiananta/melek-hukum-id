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

// Create Supabase client - only on client side
// Create Supabase client - only on client side
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (typeof window === 'undefined') return null
  
  if (!supabaseInstance && isSupabaseConfigured) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  }
  
  return supabaseInstance
}

export const supabase = getSupabase()

// Create service role client for server-side operations (if needed)
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  featured_image: string
  author: string
  published_at: string
  updated_at: string
  seo_title?: string
  seo_description?: string
  keywords?: string[]
  view_count?: number
  like_count?: number
  comment_count?: number
  // curation flags
  is_featured?: boolean
  is_editor_pick?: boolean
  featured_rank?: number | null
  editor_pick_rank?: number | null
  featured_at?: string | null
  editor_pick_at?: string | null
  // latest curation
  is_latest?: boolean
  latest_rank?: number | null
  latest_at?: string | null
}
