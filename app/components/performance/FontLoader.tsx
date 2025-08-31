'use client'

import { useEffect, useState } from 'react'

interface FontLoaderProps {
  children: React.ReactNode
}

export default function FontLoader({ children }: FontLoaderProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [fontsError, setFontsError] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Check if Font Loading API is supported
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready
          setFontsLoaded(true)
        } else {
          // Fallback for browsers without Font Loading API
          setTimeout(() => {
            setFontsLoaded(true)
          }, 2000)
        }
      } catch (error) {
        console.warn('Font loading error:', error)
        setFontsError(true)
        setFontsLoaded(true) // Continue anyway
      }
    }

    loadFonts()
  }, [])

  useEffect(() => {
    // Update document classes based on font loading state
    if (fontsLoaded) {
      document.documentElement.classList.add('fonts-loaded')
      document.documentElement.classList.remove('fonts-loading')
    } else {
      document.documentElement.classList.add('fonts-loading')
      document.documentElement.classList.remove('fonts-loaded')
    }

    if (fontsError) {
      document.documentElement.classList.add('fonts-error')
    }
  }, [fontsLoaded, fontsError])

  return (
    <div className={`font-loader ${fontsLoaded ? 'fonts-loaded' : 'fonts-loading'}`}>
      {children}
    </div>
  )
}