import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/app/components/analytics/GoogleAnalytics'
import { Toaster } from '@/app/components/ui/Toaster'
import { ToastProvider } from '@/app/components/ui/use-toast'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

export const metadata: Metadata = {
  title: 'Melek Hukum',
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
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
        {ADSENSE_CLIENT_ID && (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
} 