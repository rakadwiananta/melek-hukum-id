'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getValidImageUrl, FALLBACK_IMAGES, validateImageUrl } from '@/app/lib/image-utils'
import { cn } from '@/app/lib/utils'
import { imageRenderTracker } from '@/app/components/debug/ImageRenderMonitor'
import { imageAutoFixer } from '@/app/lib/image-auto-fix'

interface RobustArticleImageProps {
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
  index?: number
}

export default function RobustArticleImage({
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
  skeletonClassName,
  index
}: RobustArticleImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [fallbackLevel, setFallbackLevel] = useState(0)
  const [isValidated, setIsValidated] = useState(false)
  
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Multiple fallback sources
  const getFallbackSources = (): string[] => {
    const sources = []
    
    // Level 0: Original source
    if (src?.trim()) {
      const validSrc = getValidImageUrl({ src, category })
      sources.push(validSrc)
    }
    
    // Level 1: Category-specific fallback
    if (category && FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES]) {
      sources.push(FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES])
    }
    
    // Level 2: Default fallback
    sources.push(FALLBACK_IMAGES.default)
    
    // Level 3: Alternative fallbacks
    sources.push('/illustrations/blog-kejaksaan.jpeg')
    sources.push('/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg')
    
    // Level 4: Data URL fallback (always works)
    sources.push(generateDataUrlFallback())
    
    return sources.filter((src, index, self) => self.indexOf(src) === index) // Remove duplicates
  }

  const generateDataUrlFallback = (): string => {
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#92400e;stop-opacity:0.6" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#grad)" />
        <text x="200" y="140" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">
          Melek Hukum ID
        </text>
        <text x="200" y="170" text-anchor="middle" fill="white" font-family="Arial" font-size="12">
          ${category || 'Artikel Hukum'}
        </text>
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  // Validate and set image source with auto-fixing
  const validateAndSetSource = async (sources: string[], level: number = 0) => {
    if (level >= sources.length) {
      // All manual sources failed, try auto-fixer as last resort
      try {
        const fixResult = await imageAutoFixer.fixImage(src || '', category)
        setCurrentSrc(fixResult.fixedSrc)
        setFallbackLevel(fixResult.fallbackLevel)
        setHasError(!fixResult.success)
        setIsValidated(true)
        setIsLoading(false)
        return
      } catch (error) {
        // Auto-fixer also failed, use manual data URL
        setCurrentSrc(generateDataUrlFallback())
        setHasError(true)
        setIsLoading(false)
        return
      }
    }

    const source = sources[level]
    
    try {
      // For data URLs, skip validation
      if (source.startsWith('data:')) {
        setCurrentSrc(source)
        setFallbackLevel(level)
        setIsValidated(true)
        return
      }

      // For regular URLs, validate first
      const isValid = await validateImageUrl(source)
      
      if (isValid) {
        setCurrentSrc(source)
        setFallbackLevel(level)
        setIsValidated(true)
      } else {
        // Try next fallback
        setTimeout(() => {
          validateAndSetSource(sources, level + 1)
        }, 100) // Small delay between attempts
      }
    } catch (error) {
      // Try next fallback on error
      setTimeout(() => {
        validateAndSetSource(sources, level + 1)
      }, 100)
    }
  }

  // Initialize image source
  useEffect(() => {
    const sources = getFallbackSources()
    validateAndSetSource(sources, 0)
    
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current)
      }
    }
  }, [src, category])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    
    // Track successful load
    imageRenderTracker.trackImageLoad(
      currentSrc, 
      category || 'unknown', 
      fallbackLevel
    )
    
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    
    // Track error
    imageRenderTracker.trackImageError(
      currentSrc || src || 'unknown',
      category || 'unknown',
      'Image failed to load',
      fallbackLevel
    )
    
    // Try next fallback level
    const sources = getFallbackSources()
    const nextLevel = fallbackLevel + 1
    
    if (nextLevel < sources.length) {
      setFallbackLevel(nextLevel)
      
      // Clear any pending retry
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      
      // Retry with next fallback after a delay
      retryTimeoutRef.current = setTimeout(() => {
        validateAndSetSource(sources, nextLevel)
      }, 500)
    } else {
      // All fallbacks failed, use data URL
      setCurrentSrc(generateDataUrlFallback())
      setHasError(true)
    }
    
    onError?.()
  }

  // Enhanced skeleton with shimmer
  const SkeletonComponent = () => (
    <div className={cn(
      'relative overflow-hidden',
      'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
      'animate-pulse',
      fill ? 'absolute inset-0' : '',
      skeletonClassName || className
    )}
    style={!fill ? { width, height } : undefined}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Loading content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-600 border-t-transparent"></div>
          {index !== undefined && (
            <div className="text-xs text-gray-500 font-medium">
              Memuat gambar {index + 1}
            </div>
          )}
        </div>
      </div>
      
      {/* Placeholder icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )

  // Show skeleton while loading or validating
  if ((isLoading || !isValidated) && showSkeleton) {
    return <SkeletonComponent />
  }

  // Error state - should rarely happen with our robust fallbacks
  if (hasError && !currentSrc) {
    return (
      <div className={cn(
        'bg-gradient-to-br from-red-50 to-red-100 border border-red-200',
        'flex items-center justify-center text-red-600',
        fill ? 'absolute inset-0' : '',
        className
      )}
      style={!fill ? { width, height } : undefined}>
        <div className="text-center p-4">
          <div className="relative mb-3">
            <svg className="w-12 h-12 mx-auto opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium">Gambar tidak tersedia</p>
          <p className="text-xs opacity-70 mt-1">Fallback: Level {fallbackLevel}</p>
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
      'transition-all duration-500 ease-out',
      isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
      hasError ? 'opacity-75' : '',
      className
    ),
    ...(sizes && { sizes }),
    ...(fill ? { fill: true } : { width, height })
  }

  return <Image {...imageProps} />
}

// Specialized components for different use cases
export function RobustArticleHeroImage({
  src,
  alt,
  category,
  className,
  priority = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  index
}: Omit<RobustArticleImageProps, 'fill' | 'width' | 'height'> & { index?: number }) {
  return (
    <RobustArticleImage
      src={src}
      alt={alt}
      category={category}
      fill
      className={className}
      priority={priority}
      sizes={sizes}
      loading="eager"
      fetchPriority="high"
      quality={95}
      index={index}
    />
  )
}

export function RobustArticleCardImage({
  src,
  alt,
  category,
  className,
  priority = false,
  index
}: Omit<RobustArticleImageProps, 'fill' | 'width' | 'height'> & { index?: number }) {
  // Auto-priority for first few items
  const shouldPrioritize = priority || (typeof index === 'number' && index < 3)
  
  return (
    <RobustArticleImage
      src={src}
      alt={alt}
      category={category}
      fill
      className={className}
      priority={shouldPrioritize}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={shouldPrioritize ? 90 : 85}
      loading={shouldPrioritize ? 'eager' : 'lazy'}
      fetchPriority={shouldPrioritize ? 'high' : 'auto'}
      index={index}
    />
  )
}