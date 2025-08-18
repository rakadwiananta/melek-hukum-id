'use client'

import { useEffect } from 'react'

interface EzoicAdProps {
  placeholderId: number
  className?: string
}

export default function EzoicAd({ placeholderId, className = '' }: EzoicAdProps) {
  useEffect(() => {
    // Ensure Ezoic script is loaded before showing ads
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds(placeholderId)
      })
    }
  }, [placeholderId])

  return (
    <div 
      id={`ezoic-pub-ad-placeholder-${placeholderId}`}
      className={`ezoic-ad ${className}`}
    />
  )
}

// Global showAds component for general ad display
export function EzoicGlobalAds() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds()
      })
    }
  }, [])

  return null
}

// Type declarations for TypeScript
declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>
      showAds: (placeholderId?: number) => void
    }
  }
}