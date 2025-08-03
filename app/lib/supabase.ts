import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables are not set. Please check your .env.local file.')
  console.warn('Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create Supabase client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
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

// Mock data for development when Supabase is not configured
export const mockArticles = [
  {
    id: '1',
    title: 'Panduan Lengkap UU ITE: Hak Digital dan Tanggung Jawab Online',
    slug: 'panduan-lengkap-uu-ite',
    content: 'Artikel lengkap tentang UU ITE...',
    excerpt: 'Pelajari hak dan tanggung jawab Anda di dunia digital dengan panduan lengkap UU ITE.',
    category: 'regulasi',
    featured_image: '/illustrations/blog-kejaksaan.jpeg',
    author: 'Tim Melek Hukum',
    published_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    view_count: 1250,
    like_count: 45,
    comment_count: 12
  },
  {
    id: '2',
    title: 'Cara Melapor Korupsi: Langkah Demi Langkah',
    slug: 'cara-melapor-korupsi',
    content: 'Artikel lengkap tentang cara melapor korupsi...',
    excerpt: 'Panduan praktis untuk melapor tindak pidana korupsi dengan aman dan efektif.',
    category: 'anti-korupsi',
    featured_image: '/illustrations/ff9187df1f3478d519d6f64d9eb337e3_1.jpg',
    author: 'Advokat Senior',
    published_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    view_count: 2100,
    like_count: 78,
    comment_count: 23
  },
  {
    id: '3',
    title: 'Kamus Hukum: Istilah Penting yang Perlu Diketahui',
    slug: 'kamus-hukum-istilah-penting',
    content: 'Artikel lengkap tentang istilah hukum...',
    excerpt: 'Kumpulan istilah hukum penting yang sering digunakan dalam praktik hukum di Indonesia.',
    category: 'kamus-hukum',
    featured_image: '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
    author: 'Dosen Hukum',
    published_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z',
    view_count: 890,
    like_count: 32,
    comment_count: 8
  },
  {
    id: '4',
    title: 'Solusi Hukum: Menyelesaikan Sengketa Tanah',
    slug: 'solusi-hukum-sengketa-tanah',
    content: 'Artikel lengkap tentang sengketa tanah...',
    excerpt: 'Solusi praktis untuk menyelesaikan berbagai jenis sengketa tanah di Indonesia.',
    category: 'solusi',
    featured_image: '/illustrations/blog-kejaksaan.jpeg',
    author: 'Tim Melek Hukum',
    published_at: '2024-01-01T16:45:00Z',
    updated_at: '2024-01-01T16:45:00Z',
    view_count: 1560,
    like_count: 56,
    comment_count: 15
  }
]

// Database schema
export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: 'kamus-hukum' | 'solusi' | 'regulasi' | 'anti-korupsi'
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
}
