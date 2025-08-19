import { useState, useEffect } from 'react'

export default function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQueryList.matches)

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Add listener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener)
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(listener)
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener)
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(listener)
      }
    }
  }, [])

  return prefersReducedMotion
}