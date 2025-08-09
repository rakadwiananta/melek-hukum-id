'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '',
  style = {}
}: AdUnitProps) {
  const pathname = usePathname()
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    try {
      if (!isLoaded.current && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isLoaded.current = true
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [pathname])

  // Don't render ads in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={cn('ad-placeholder bg-gray-100 rounded-lg p-4 text-center text-gray-500', className)}>
        <p className="text-sm">Ad Placeholder</p>
        <p className="text-xs">Slot: {slot}</p>
      </div>
    )
  }

  return (
    <div className={cn('ad-wrapper', className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
