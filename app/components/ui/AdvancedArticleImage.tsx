'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { getValidImageUrl, FALLBACK_IMAGES, preloadImage } from '@/app/lib/image-utils'
import { cn } from '@/app/lib/utils'

interface AdvancedArticleImageProps {
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
  // Advanced props
  lazyLoadOffset?: number
  enablePreload?: boolean
  enableCache?: boolean
  blurDataURL?: string
  placeholder?: 'blur' | 'empty'
  retryDelay?: number
  index?: number
}

// Image cache untuk menyimpan status loading
const imageCache = new Map<string, {
  status: 'loading' | 'loaded' | 'error'
  promise?: Promise<void>
  retryCount: number
}>()

// Intersection Observer untuk lazy loading yang lebih advanced
let intersectionObserver: IntersectionObserver | null = null

function getIntersectionObserver(offset: number = 100) {
  if (typeof window === 'undefined') return null
  
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLElement
            const loadHandler = img.dataset.loadHandler
            if (loadHandler && (window as any)[loadHandler]) {
              (window as any)[loadHandler]()
            }
          }
        })
      },
      {
        rootMargin: `${offset}px`,
        threshold: 0.1
      }
    )
  }
  return intersectionObserver
}

export default function AdvancedArticleImage({
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
  lazyLoadOffset = 100,
  enablePreload = true,
  enableCache = true,
  blurDataURL,
  placeholder = 'blur',
  retryDelay = 1000,
  index
}: AdvancedArticleImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => 
    getValidImageUrl({ src, category })
  )
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [shouldLoad, setShouldLoad] = useState(priority || loading === 'eager')
  const [isInView, setIsInView] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadHandlerRef = useRef<string | null>(null)

  const MAX_RETRIES = 3

  // Generate blur placeholder for better UX
  const generateBlurDataURL = useCallback((fallback: boolean = false) => {
    if (blurDataURL) return blurDataURL
    
    // Generate a simple blur placeholder
    const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null
    if (!canvas) return undefined
    
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    
    // Create gradient based on category
    const colors = {
      'anti-korupsi': ['#DC2626', '#7F1D1D'],
      'regulasi': ['#2563EB', '#1E3A8A'],
      'solusi': ['#059669', '#064E3B'],
      'default': ['#6B7280', '#374151']
    }
    
    const [color1, color2] = colors[category as keyof typeof colors] || colors.default
    const gradient = ctx.createLinearGradient(0, 0, 10, 10)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 10, 10)
    
    return canvas.toDataURL('image/jpeg', 0.1)
  }, [blurDataURL, category])

  // Advanced preloading with cache
  const preloadWithCache = useCallback(async (imageSrc: string) => {
    if (!enableCache || !enablePreload) return
    
    const cached = imageCache.get(imageSrc)
    if (cached?.status === 'loaded') return
    if (cached?.status === 'loading') return cached.promise
    
    const promise = preloadImage(imageSrc)
      .then(() => {
        imageCache.set(imageSrc, { status: 'loaded', retryCount: 0 })
      })
      .catch(() => {
        const current = imageCache.get(imageSrc) || { status: 'error', retryCount: 0 }
        imageCache.set(imageSrc, { 
          ...current, 
          status: 'error', 
          retryCount: current.retryCount + 1 
        })
      })
    
    imageCache.set(imageSrc, { status: 'loading', promise, retryCount: 0 })
    return promise
  }, [enableCache, enablePreload])

  // Smart retry with exponential backoff
  const handleErrorWithRetry = useCallback(() => {
    setIsLoading(false)
    
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
    
    if (retryCount < MAX_RETRIES) {
      const delay = retryDelay * Math.pow(2, retryCount) // Exponential backoff
      
      retryTimeoutRef.current = setTimeout(() => {
        const fallbackSrc = retryCount === 0 
          ? FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.default
          : retryCount === 1
            ? FALLBACK_IMAGES.default
            : '/timbangkan.jpg' // Ultimate fallback
        
        setCurrentSrc(fallbackSrc)
        setRetryCount(prev => prev + 1)
        setIsLoading(true)
        setHasError(false)
        
        // Preload the new source
        preloadWithCache(fallbackSrc)
      }, delay)
      return
    }

    setHasError(true)
    onError?.()
  }, [retryCount, retryDelay, category, onError, preloadWithCache])

  // Advanced intersection observer setup
  useEffect(() => {
    if (priority || loading === 'eager' || shouldLoad) return
    
    const observer = getIntersectionObserver(lazyLoadOffset)
    const container = containerRef.current
    
    if (!observer || !container) return
    
    // Create unique handler function
    const handlerName = `loadImage_${Math.random().toString(36).substr(2, 9)}`
    loadHandlerRef.current = handlerName
    
    ;(window as any)[handlerName] = () => {
      setShouldLoad(true)
      setIsInView(true)
      observer.unobserve(container)
      delete (window as any)[handlerName]
    }
    
    container.dataset.loadHandler = handlerName
    observer.observe(container)
    
    return () => {
      if (container) {
        observer.unobserve(container)
      }
      if (loadHandlerRef.current) {
        delete (window as any)[loadHandlerRef.current]
      }
    }
  }, [priority, loading, shouldLoad, lazyLoadOffset])

  // Update src when props change
  useEffect(() => {
    const newSrc = getValidImageUrl({ src, category })
    if (newSrc !== currentSrc) {
      setCurrentSrc(newSrc)
      setIsLoading(true)
      setHasError(false)
      setRetryCount(0)
      
      // Clear any pending retry
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      
      // Preload new image
      if (shouldLoad && enablePreload) {
        preloadWithCache(newSrc)
      }
    }
  }, [src, category, currentSrc, shouldLoad, enablePreload, preloadWithCache])

  // Preload on mount if priority
  useEffect(() => {
    if ((priority || shouldLoad) && enablePreload) {
      preloadWithCache(currentSrc)
    }
  }, [priority, shouldLoad, enablePreload, currentSrc, preloadWithCache])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
    
    // Update cache
    if (enableCache) {
      imageCache.set(currentSrc, { status: 'loaded', retryCount: 0 })
    }
    
    onLoad?.()
  }, [currentSrc, enableCache, onLoad])

  // Advanced skeleton with shimmer effect
  const SkeletonComponent = () => (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
        'animate-pulse',
        fill ? 'absolute inset-0' : '',
        skeletonClassName || className
      )}
      style={!fill ? { width, height } : undefined}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-600 border-t-transparent"></div>
          {index !== undefined && (
            <div className="text-xs text-gray-500 font-medium">
              Loading {index + 1}
            </div>
          )}
        </div>
      </div>
      
      {/* Content placeholder */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )

  // Enhanced error state
  const ErrorComponent = () => (
    <div 
      className={cn(
        'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200',
        'flex items-center justify-center text-gray-500',
        fill ? 'absolute inset-0' : '',
        className
      )}
      style={!fill ? { width, height } : undefined}
    >
      <div className="text-center p-4">
        <div className="relative mb-3">
          <svg className="w-12 h-12 mx-auto opacity-40" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="text-xs font-medium">Gambar tidak tersedia</p>
        <p className="text-xs opacity-60 mt-1">Coba muat ulang halaman</p>
      </div>
    </div>
  )

  // Show skeleton if not ready to load or still loading
  if ((!shouldLoad || isLoading) && showSkeleton) {
    return <SkeletonComponent />
  }

  // Show error state
  if (hasError) {
    return <ErrorComponent />
  }

  // Don't render image if not ready to load
  if (!shouldLoad) {
    return <SkeletonComponent />
  }

  const imageProps = {
    src: currentSrc,
    alt,
    onLoad: handleLoad,
    onError: handleErrorWithRetry,
    priority,
    quality,
    loading,
    fetchPriority,
    placeholder: placeholder as any,
    blurDataURL: generateBlurDataURL(),
    className: cn(
      'transition-all duration-500 ease-out',
      isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
      className
    ),
    ...(sizes && { sizes }),
    ...(fill ? { fill: true } : { width, height })
  }

  return <Image {...imageProps} />
}

// Enhanced Hero Image with aggressive preloading
export function EnhancedArticleHeroImage({
  src,
  alt,
  category,
  className,
  priority = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  index
}: Omit<AdvancedArticleImageProps, 'fill' | 'width' | 'height'> & { index?: number }) {
  return (
    <AdvancedArticleImage
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
      enablePreload={true}
      enableCache={true}
      lazyLoadOffset={200}
      retryDelay={500}
      index={index}
    />
  )
}

// Enhanced Card Image with smart lazy loading
export function EnhancedArticleCardImage({
  src,
  alt,
  category,
  className,
  priority = false,
  index
}: Omit<AdvancedArticleImageProps, 'fill' | 'width' | 'height'> & { index?: number }) {
  // Auto-priority for first few items
  const shouldPrioritize = priority || (typeof index === 'number' && index < 3)
  
  return (
    <AdvancedArticleImage
      src={src}
      alt={alt}
      category={category}
      fill
      className={className}
      priority={shouldPrioritize}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={shouldPrioritize ? 90 : 80}
      loading={shouldPrioritize ? 'eager' : 'lazy'}
      fetchPriority={shouldPrioritize ? 'high' : 'auto'}
      enablePreload={true}
      enableCache={true}
      lazyLoadOffset={shouldPrioritize ? 300 : 150}
      retryDelay={1000}
      index={index}
    />
  )
}

// Performance monitoring hook
export function useImagePerformance() {
  const [stats, setStats] = useState({
    totalImages: 0,
    loadedImages: 0,
    errorImages: 0,
    cachedImages: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      let total = 0
      let loaded = 0
      let error = 0
      let cached = 0

      imageCache.forEach((value) => {
        total++
        if (value.status === 'loaded') {
          loaded++
          cached++
        } else if (value.status === 'error') {
          error++
        }
      })

      setStats({ totalImages: total, loadedImages: loaded, errorImages: error, cachedImages: cached })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return stats
}