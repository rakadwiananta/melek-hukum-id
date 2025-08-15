/**
 * Utility functions for handling article images from Supabase
 * Provides consistent fallback and error handling across components
 */

import { supabase } from './supabase'

// Optimized image utilities for better performance
export const FALLBACK_IMAGES = {
  default: '/illustrations/National_emblem_of_Indonesia_Garuda_Pancasila.svg.webp',
  'Hukum Pidana': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'Hukum Perdata': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'Hukum Tata Negara': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'Hukum Administrasi': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'Hukum Dagang': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'Hukum Adat': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
}

interface ImageUrlOptions {
  src?: string
  category?: string
  width?: number
  height?: number
}

// Get Supabase public URL for images
export function getSupabaseImageUrl(path: string): string {
  if (!path || !supabase) {
    console.warn('No path or supabase client available:', { path, hasSupabase: !!supabase })
    return FALLBACK_IMAGES.default
  }

  try {
    // Handle already complete URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
      console.log('Using complete URL:', path)
      return path
    }

    // Handle Supabase storage paths
    if (path.includes('.') && !path.startsWith('/')) {
      // This looks like a Supabase storage file
      const { data } = supabase.storage
        .from('article-images')
        .getPublicUrl(path)
      
      console.log('Generated Supabase URL:', { path, publicUrl: data.publicUrl })
      return data.publicUrl
    }

    // Handle local paths
    if (path.startsWith('/')) {
      console.log('Using local path:', path)
      return path
    }

    console.warn('Unknown path format:', path)
    return FALLBACK_IMAGES.default
  } catch (error) {
    console.error('Failed to get Supabase image URL:', error)
    return FALLBACK_IMAGES.default
  }
}

export function getValidImageUrl({ src, category, width = 800, height = 600 }: ImageUrlOptions): string {
  console.log('getValidImageUrl called with:', { src, category })
  
  // If no source provided, use category fallback
  if (!src?.trim()) {
    console.log('No src provided, using fallback for category:', category)
    return category && FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] 
      ? FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES]
      : FALLBACK_IMAGES.default
  }

  const trimmedSrc = src.trim()
  console.log('Processing image src:', trimmedSrc)
  
  // Handle data URLs
  if (trimmedSrc.startsWith('data:')) {
    console.log('Using data URL')
    return trimmedSrc
  }
  
  // Handle absolute URLs
  if (trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://')) {
    console.log('Using absolute URL')
    return trimmedSrc
  }
  
  // Handle Supabase storage paths - this is the key fix
  if (trimmedSrc.includes('.') && !trimmedSrc.startsWith('/')) {
    console.log('Detected Supabase storage path, processing...')
    return getSupabaseImageUrl(trimmedSrc)
  }
  
  // Handle relative URLs - ensure they start with /
  if (!trimmedSrc.startsWith('/')) {
    console.log('Converting to absolute path:', `/${trimmedSrc}`)
    return `/${trimmedSrc}`
  }
  
  console.log('Using trimmed src as-is:', trimmedSrc)
  return trimmedSrc
}

export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    // Skip validation for data URLs and fallback images
    if (url.startsWith('data:') || Object.values(FALLBACK_IMAGES).includes(url)) {
      return true
    }

    // Use a lightweight HEAD request to check if image exists
    const response = await fetch(url, { 
      method: 'HEAD',
      cache: 'force-cache',
      // Add timeout to avoid hanging requests
      signal: AbortSignal.timeout(3000)
    })
    
    return response.ok && (response.headers.get('content-type')?.startsWith('image/') || false)
  } catch (error) {
    console.warn('Image validation failed:', url, error)
    return false
  }
}

// Generate optimized placeholder
export function generatePlaceholder(width: number = 400, height: number = 300, text: string = 'Melek Hukum ID'): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dc2626;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="system-ui" font-size="18" font-weight="600">
        ${text}
      </text>
      <text x="50%" y="60%" text-anchor="middle" fill="white" font-family="system-ui" font-size="14" opacity="0.8">
        Artikel Hukum Indonesia
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// Optimize image loading with Next.js Image component
export function getOptimizedImageProps(src?: string, alt: string = '', width?: number, height?: number) {
  const optimizedSrc = getValidImageUrl({ src, width, height })
  
  return {
    src: optimizedSrc,
    alt,
    width: width || 800,
    height: height || 600,
    quality: 75,
    placeholder: 'blur' as const,
    blurDataURL: generatePlaceholder(width, height, alt.slice(0, 20)),
    sizes: width && width < 400 
      ? '(max-width: 640px) 100vw, 400px'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  }
}

// Image preloader for critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Lazy load images with Intersection Observer
export function createImageObserver(callback: (entry: IntersectionObserverEntry) => void) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback)
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  )
}