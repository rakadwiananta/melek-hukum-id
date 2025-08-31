import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Script from 'next/script'
import LayoutWrapper from '@/app/components/layout/LayoutWrapper'
import PerformanceWrapper from '@/app/components/performance/PerformanceWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

// Helper function to safely create URL
function getMetadataBase(): URL {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  // If no environment variable is set, use wacanahukum.com
  if (!siteUrl) {
    return new URL('https://wacanahukum.com')
  }
  
  // Validate the URL
  try {
    return new URL(siteUrl)
  } catch (error) {
    console.warn('Invalid NEXT_PUBLIC_SITE_URL:', siteUrl, 'Using wacanahukum.com')
    return new URL('https://wacanahukum.com')
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Wacana Hukum - Portal Hukum Indonesia Terpercaya',
    template: '%s | Wacana Hukum'
  },
  description: 'Portal hukum Indonesia terpercaya dengan artikel, regulasi, dan solusi hukum terkini. Akses informasi hukum yang akurat dan mudah dipahami.',
  keywords: ['hukum indonesia', 'artikel hukum', 'regulasi', 'konsultasi hukum', 'portal hukum'],
  authors: [{ name: 'Tim Wacana Hukum' }],
  creator: 'Wacana Hukum',
  publisher: 'Wacana Hukum',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Wacana Hukum',
    title: 'Wacana Hukum - Portal Hukum Indonesia Terpercaya',
    description: 'Portal hukum Indonesia terpercaya dengan artikel, regulasi, dan solusi hukum terkini',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Wacana Hukum',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wacana Hukum',
    description: 'Portal hukum Indonesia terpercaya',
    creator: '@wacanahukum',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wacanahukum.com'
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WacanaHukum',
          alternateName: ['Wacana Hukum', 'Wacana Hukum Indonesia'],
    url: siteUrl,
  }

  return (
    <LayoutWrapper>
      {/* Inject website schema from within the layout tree (no extra <head> tag) */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {children}
      <PerformanceWrapper />
    </LayoutWrapper>
  )
}
