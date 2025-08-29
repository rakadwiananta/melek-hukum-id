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

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
const isDevelopment = process.env.NODE_ENV === 'development'

export const metadata: Metadata = {
  title: 'Wacana Hukum',
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
  verification: {
    google: 'cdb930fb42e17478', // Tambahkan verification code
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
  other: ADSENSE_CLIENT_ID ? {
    'google-adsense-account': ADSENSE_CLIENT_ID
  } : {}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <GoogleAnalytics />
        {/* Google AdSense Meta Tag */}
        {ADSENSE_CLIENT_ID && (
          <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
        
        {/* Google AdSense Scripts */}
        {ADSENSE_CLIENT_ID && !isDevelopment && (
          <>
            {/* AdSense Script */}
            <Script
              id="google-adsense"
              async
              strategy="lazyOnload"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('AdSense script failed to load', e)
              }}
            />
            
            {/* Auto Ads Script */}
            <Script
              id="google-auto-ads"
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
      </body>
    </html>
  )
}
