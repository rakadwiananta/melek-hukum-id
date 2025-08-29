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

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-9240032692197811'

function isValidClientId(clientId: string | undefined): boolean {
  return typeof clientId === 'string' && clientId.startsWith('ca-pub-') && !clientId.includes('XXXX')
}

function isValidSlot(slot: string | undefined): boolean {
  if (!slot) return false
  // rudimentary check to avoid obvious placeholders
  if (['1234567890', '2345678901', '3456789012', '4567890123'].includes(slot)) return false
  return /^\d{9,20}$/.test(slot)
}

export default function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '',
  style = {}
}: AdUnitProps) {
  const pathname = usePathname()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  const clientConfigured = isValidClientId(ADSENSE_CLIENT_ID)
  const slotConfigured = isValidSlot(slot)

  useEffect(() => {
    // Only load ads in production and when properly configured
    if (process.env.NODE_ENV !== 'production') return
    if (!clientConfigured || !slotConfigured) return

    // Alias untuk window agar tidak bermasalah saat typing
    const win: any = typeof window !== 'undefined' ? window : undefined

    let resizeObserver: ResizeObserver | null = null
    let intersectObserver: IntersectionObserver | null = null
    let rafId = 0
    let cancelled = false

    const hasValidWidth = (): boolean => {
      const el = wrapperRef.current || adRef.current
      if (!el) return false
      const rect = el.getBoundingClientRect()
      const style = win?.getComputedStyle ? win.getComputedStyle(el) : { display: 'block', visibility: 'visible' } as any
      const displayNone = style.display === 'none' || style.visibility === 'hidden'
      return !displayNone && rect.width > 0
    }

    const tryLoadAd = () => {
      if (cancelled || isLoaded.current) return
      if (!hasValidWidth()) return
      try {
        win.adsbygoogle = win.adsbygoogle || []
        win.adsbygoogle.push({})
        isLoaded.current = true
      } catch (err) {
        // silently retry via observers
      }
    }

    // Coba sekali setelah frame render
    rafId = win?.requestAnimationFrame ? win.requestAnimationFrame(tryLoadAd) : 0

    // Observe visibility agar hanya load saat terlihat
    if (typeof IntersectionObserver !== 'undefined') {
      intersectObserver = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          tryLoadAd()
        }
      }, { root: null, threshold: 0 })
      if (wrapperRef.current) intersectObserver.observe(wrapperRef.current)
    } else {
      // Fallback: langsung coba load
      tryLoadAd()
    }

    // Observe perubahan ukuran (mis. responsive/hidden lg:block)
    const onResizeFallback = () => tryLoadAd()
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => tryLoadAd())
      if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)
    } else {
      win?.addEventListener?.('resize', onResizeFallback)
    }

    return () => {
      cancelled = true
      if (win?.cancelAnimationFrame) win.cancelAnimationFrame(rafId)
      if (intersectObserver) intersectObserver.disconnect()
      if (resizeObserver) resizeObserver.disconnect()
      else win?.removeEventListener?.('resize', onResizeFallback)
    }
  }, [pathname, clientConfigured, slotConfigured])

  // Don't render ads in development or when misconfigured
  if (process.env.NODE_ENV !== 'production' || !clientConfigured || !slotConfigured) {
    return (
      <div className={cn('ad-placeholder bg-gray-100 rounded-lg p-4 text-center text-gray-500', className)}>
        <p className="text-sm">Ad Placeholder</p>
        {!clientConfigured && <p className="text-xs">Missing/invalid AdSense client</p>}
        {!slotConfigured && <p className="text-xs">Missing/invalid ad slot</p>}
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className={cn('ad-wrapper w-full', className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
