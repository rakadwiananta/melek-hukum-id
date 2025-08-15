/**
 * Utility functions for handling article images from Supabase
 * Provides consistent fallback and error handling across components
 */

import { supabase } from './supabase'
import { useState } from 'react'

export interface ImageConfig {
  src?: string
  fallback?: string
  category?: string
}

// Fallback images berdasarkan kategori
export const FALLBACK_IMAGES = {
  'anti-korupsi': '/illustrations/blog-kejaksaan.jpeg',
  'regulasi': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'solusi': '/timbangkan.jpg',
  'kamus-hukum': '/timbangkan.jpg',
  'hukum-pidana': '/timbangkan.jpg',
  'hukum-perdata': '/timbangkan.jpg',
  'hukum-tata-negara': '/timbangkan.jpg',
  'default': '/timbangkan.jpg'
}

/**
 * Mendapatkan URL gambar yang valid dengan fallback
 */
export function getValidImageUrl(config: ImageConfig): string {
  const { src, category, fallback } = config
  
  // Jika tidak ada src, gunakan fallback berdasarkan kategori
  if (!src?.trim()) {
    return getCategoryFallback(category) || fallback || FALLBACK_IMAGES.default
  }

  const cleanSrc = src.trim()
  
  // Jika gambar dari path lama atau invalid, gunakan fallback
  if (cleanSrc.includes('/images/articles/') || cleanSrc === '/timbangkan.jpg') {
    return getCategoryFallback(category) || fallback || FALLBACK_IMAGES.default
  }

  // Jika URL absolut (Supabase storage), return as is
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    return cleanSrc
  }

  // Jika path relatif, pastikan dimulai dengan /
  if (cleanSrc.startsWith('/')) {
    return cleanSrc
  }

  return `/${cleanSrc}`
}

/**
 * Mendapatkan fallback image berdasarkan kategori
 */
function getCategoryFallback(category?: string): string {
  if (!category) return FALLBACK_IMAGES.default
  return FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.default
}

/**
 * Mengecek apakah gambar dapat diakses
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Hook untuk menangani loading dan error state gambar
 */
export function useImageState(initialSrc: string) {
  const [src, setSrc] = useState(initialSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    // Set fallback image on error
    setSrc(FALLBACK_IMAGES.default)
  }

  return {
    src,
    isLoading,
    hasError,
    handleLoad,
    handleError
  }
}

/**
 * Mendapatkan URL gambar dari Supabase Storage
 */
export function getSupabaseImageUrl(path: string, bucket: string = 'articles'): string | null {
  if (!supabase) return null
  
  try {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  } catch (error) {
    console.error('Error getting Supabase image URL:', error)
    return null
  }
}

/**
 * Mengupload gambar ke Supabase Storage
 */
export async function uploadImageToSupabase(
  file: File, 
  path: string, 
  bucket: string = 'articles'
): Promise<string | null> {
  if (!supabase) return null

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    return getSupabaseImageUrl(data.path, bucket)
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

/**
 * Preload gambar untuk performa yang lebih baik
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(urls: string[]): Promise<void> {
  const promises = urls.map(url => preloadImage(url))
  try {
    await Promise.allSettled(promises)
  } catch (error) {
    console.warn('Some images failed to preload:', error)
  }
}