'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getValidImageUrl, FALLBACK_IMAGES } from '@/app/lib/image-utils'
import { cn } from '@/app/lib/utils'

interface ArticleImageProps {
  src?: string
  alt: string
  category?: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  onLoad?: () => void
  onError?: () => void
  showSkeleton?: boolean
  skeletonClassName?: string
}

export default function ArticleImage({
  src,
  alt,
  category,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  quality = 85,
  loading = 'lazy',
  fetchPriority = 'auto',
  onLoad,
  onError,
  showSkeleton = true,
  skeletonClassName
}: ArticleImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(
    getValidImageUrl({ src, category })
  )
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 2

  // Update src when props change
  useEffect(() => {
    const newSrc = getValidImageUrl({ src, category })
    if (newSrc !== currentSrc) {
      setCurrentSrc(newSrc)
      setIsLoading(true)
      setHasError(false)
      setRetryCount(0)
    }
  }, [src, category, currentSrc])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    
    if (retryCount < MAX_RETRIES) {
      // Retry dengan fallback yang berbeda
      const fallbackSrc = retryCount === 0 
        ? FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.default
        : FALLBACK_IMAGES.default
      
      setCurrentSrc(fallbackSrc)
      setRetryCount(prev => prev + 1)
      setIsLoading(true)
      return
    }

    setHasError(true)
    onError?.()
  }

  // Loading skeleton
  if (isLoading && showSkeleton) {
    return (
      <div 
        className={cn(
          'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
          fill ? 'absolute inset-0' : '',
          skeletonClassName || className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  // Error state - show minimal placeholder
  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-100 flex items-center justify-center text-gray-400',
          fill ? 'absolute inset-0' : '',
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-center p-4">
          <svg 
            className="w-12 h-12 mx-auto mb-2 opacity-50" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-xs">Gambar tidak tersedia</p>
        </div>
      </div>
    )
  }

  const imageProps = {
    src: currentSrc,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    priority,
    quality,
    loading,
    fetchPriority,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      className
    ),
    ...(sizes && { sizes }),
    ...(fill ? { fill: true } : { width, height })
  }

  return <Image {...imageProps} />
}

// Komponen khusus untuk hero/featured images
export function ArticleHeroImage({
  src,
  alt,
  category,
  className,
  priority = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
}: Omit<ArticleImageProps, 'fill' | 'width' | 'height'>) {
  return (
    <ArticleImage
      src={src}
      alt={alt}
      category={category}
      fill
      className={className}
      priority={priority}
      sizes={sizes}
      loading="eager"
      fetchPriority="high"
      quality={90}
    />
  )
}

// Komponen khusus untuk thumbnail/card images
export function ArticleCardImage({
  src,
  alt,
  category,
  className,
  priority = false
}: Omit<ArticleImageProps, 'fill' | 'width' | 'height'>) {
  return (
    <ArticleImage
      src={src}
      alt={alt}
      category={category}
      fill
      className={className}
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={85}
    />
  )
}