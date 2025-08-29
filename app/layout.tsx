import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/app/components/analytics/GoogleAnalytics'
import { Toaster } from '@/app/components/ui/Toaster'
import { ToastProvider } from '@/app/components/ui/use-toast'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

// Configuration from environment variables
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-9240032692197811'
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'cdb930fb42e17478'
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true'
const isDevelopment = process.env.NODE_ENV === 'development'
const SHOULD_LOAD_ADS = ADSENSE_ENABLED && !isDevelopment

export const metadata: Metadata = {
  title: 'Wacana Hukum',
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
  verification: {
    google: GOOGLE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' }
    ]
  },
  manifest: '/manifest.json',
  other: {
    'google-adsense-account': ADSENSE_CLIENT_ID
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Log untuk debugging
  if (isDevelopment) {
    console.log('AdSense Configuration:', {
      clientId: ADSENSE_CLIENT_ID,
      enabled: ADSENSE_ENABLED,
      shouldLoad: SHOULD_LOAD_ADS,
      environment: process.env.NODE_ENV
    })
  }

  return (
    <html lang="id" className={inter.variable}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
        
        {/* Google AdSense Scripts - Only load in production */}
        {SHOULD_LOAD_ADS && (
          <>
            {/* Main AdSense Script */}
            <Script
              id="google-adsense"
              async
              strategy="lazyOnload"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('AdSense script failed to load:', e)
              }}
              onLoad={() => {
                console.log('AdSense script loaded successfully')
              }}
            />
            
            {/* Auto Ads Initialization */}
            <Script
              id="google-adsense-auto-ads"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "${ADSENSE_CLIENT_ID}",
                    enable_page_level_ads: true
                  });
                `
              }}
            />
          </>
        )}
        
        {/* Development Mode Indicator */}
        {isDevelopment && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded text-sm z-50">
            Development Mode - AdSense Disabled
          </div>
        )}
      </body>
    </html>
  )
}
