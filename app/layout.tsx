import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/app/components/analytics/GoogleAnalytics'
import { Toaster } from '@/app/components/ui/Toaster'
import { ToastProvider } from '@/app/components/ui/use-toast'
import Script from 'next/script' // PENTING: Import Script dari next/script

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

// Konfigurasi AdSense dan Verification
const ADSENSE_CLIENT_ID = 'ca-pub-9240032692197811'
const GOOGLE_VERIFICATION = 'googlecdb930fb42e17478' // Verification code dari file HTML Anda

export const metadata: Metadata = {
  title: 'Wacana Hukum', // Sesuaikan dengan domain wacanahukum.com
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
  verification: {
    google: GOOGLE_VERIFICATION, // PENTING: Tambahkan verification
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
    'google-adsense-account': ADSENSE_CLIENT_ID // Meta tag AdSense
  }
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
        {/* Tambahkan meta tag verification manual */}
        <meta name="google-site-verification" content="googlecdb930fb42e17478" />
        <meta name="google-adsense-account" content="ca-pub-9240032692197811" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
        
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9240032692197811"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
