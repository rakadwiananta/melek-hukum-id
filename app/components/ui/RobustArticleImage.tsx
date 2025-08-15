'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getValidImageUrl, getSupabaseImageUrl, FALLBACK_IMAGES, validateImageUrl } from '@/app/lib/image-utils'
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
  loading = 'eager',
  fetchPriority = 'high',
  onLoad,
  onError,
  showSkeleton = false,
  skeletonClassName,
  index
}: RobustArticleImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>('')
  const [hasError, setHasError] = useState(false)
  const [fallbackLevel, setFallbackLevel] = useState(0)
  
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Multiple fallback sources with better handling
  const getFallbackSources = (): string[] => {
    const sources = []
    
    console.log('Getting fallback sources for:', { src, category })
    
    // Level 0: Try original source with proper processing (only if valid)
    if (src && typeof src === 'string' && src.trim()) {
      const processedSrc = getValidImageUrl({ src, category })
      console.log('Processed original src:', { original: src, processed: processedSrc })
      
      // Only add if it's not empty and not just a slash
      if (processedSrc && processedSrc !== '/' && processedSrc.trim()) {
        sources.push(processedSrc)
      }
    }
    
    // Level 1: Category-specific fallback
    if (category && FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES]) {
      sources.push(FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES])
    }
    
    // Level 2: Default fallback
    sources.push(FALLBACK_IMAGES.default)
    
    // Level 3: Alternative fallbacks
    sources.push('/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg')
    
    // Level 4: Data URL fallback (always works)
    sources.push(generateDataUrlFallback())
    
    const uniqueSources = sources.filter((src, index, self) => 
      src && src.trim() && self.indexOf(src) === index
    )
    console.log('Generated fallback sources:', uniqueSources)
    
    return uniqueSources
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

  // Initialize source immediately
  useEffect(() => {
    const sources = getFallbackSources()
    if (sources.length > 0) {
      console.log('Setting initial src:', sources[0])
      setCurrentSrc(sources[0])
      setFallbackLevel(0)
      setHasError(false)
    } else {
      // If no valid sources, use data URL immediately
      console.warn('No valid sources found, using data URL')
      setCurrentSrc(generateDataUrlFallback())
      setHasError(true)
    }
    
    // Track render
    imageRenderTracker.trackImageLoad(src || '', category || '', 0)

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [src, category])

  const handleLoad = () => {
    console.log('Image loaded successfully:', currentSrc)
    setHasError(false)
    onLoad?.()
    
    // Track successful load
    imageRenderTracker.trackImageLoad(currentSrc, category || '', fallbackLevel)
  }

  const handleError = () => {
    console.error('Image failed to load:', currentSrc)
    
    // Try next fallback level immediately
    const sources = getFallbackSources()
    const nextLevel = fallbackLevel + 1
    
    console.log('Trying fallback level:', nextLevel, 'of', sources.length)
    
    if (nextLevel < sources.length) {
      setFallbackLevel(nextLevel)
      setCurrentSrc(sources[nextLevel])
      console.log('Switching to fallback:', sources[nextLevel])
    } else {
      // All fallbacks failed, use data URL
      const dataUrl = generateDataUrlFallback()
      setCurrentSrc(dataUrl)
      setHasError(true)
      console.error('All fallbacks failed, using data URL')
    }
    
    onError?.()
  }

  // Don't render anything if no valid source
  if (!currentSrc || currentSrc.trim() === '') {
    console.warn('No valid currentSrc, rendering placeholder')
    return (
      <div className={cn(
        'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300',
        'flex items-center justify-center text-gray-500',
        fill ? 'absolute inset-0' : '',
        className
      )}
      style={!fill ? { width, height } : undefined}>
        <div className="text-center p-4">
          <div className="relative mb-3">
            <svg className="w-12 h-12 mx-auto opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs font-medium">Gambar tidak tersedia</p>
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
    sizes: sizes || (fill ? '100vw' : undefined),
    className: cn(className, 'transition-opacity duration-200'),
    ...(fill ? { fill: true } : { width, height })
  }

  console.log('Rendering image with props:', { src: currentSrc, alt, priority, loading })

  return <Image {...imageProps} />
}

// Export variants for different use cases
export function RobustArticleCardImage(props: RobustArticleImageProps) {
  return (
    <RobustArticleImage
      {...props}
      priority={props.priority ?? (typeof props.index === 'number' ? props.index < 6 : false)}
      loading="eager"
      fetchPriority="high"
      showSkeleton={false}
    />
  )
}

export function RobustArticleHeroImage(props: RobustArticleImageProps) {
  return (
    <RobustArticleImage
      {...props}
      priority={true}
      loading="eager"
      fetchPriority="high"
      quality={90}
      showSkeleton={false}
    />
  )
}

export function RobustArticleThumbImage(props: RobustArticleImageProps) {
  return (
    <RobustArticleImage
      {...props}
      quality={80}
      loading="eager"
      fetchPriority="high"
      showSkeleton={false}
    />
  )
}