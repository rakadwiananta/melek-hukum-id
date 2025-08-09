import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { GoogleAnalytics } from '@/app/components/analytics/GoogleAnalytics'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import { Toaster } from '@/app/components/ui/Toaster'
import { ToastProvider } from '@/app/components/ui/use-toast'
import PerformanceMonitor from '@/app/components/PerformanceMonitor'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
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
  
  // If no environment variable is set, use Netlify subdomain
  if (!siteUrl) {
    return new URL('https://melek-hukum-id.netlify.app')
  }
  
  // Validate the URL
  try {
    return new URL(siteUrl)
  } catch (error) {
    console.warn('Invalid NEXT_PUBLIC_SITE_URL:', siteUrl, 'Using Netlify subdomain')
    return new URL('https://melek-hukum-id.netlify.app')
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Melek Hukum ID - Platform Edukasi Hukum Indonesia',
    template: '%s | Melek Hukum ID'
  },
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. Pelajari hukum dengan mudah, praktis, dan gratis.',
  keywords: ['hukum indonesia', 'anti korupsi', 'UU ITE', 'panduan hukum', 'cara melapor korupsi', 'edukasi hukum'],
  authors: [{ name: 'Melek Hukum ID Team' }],
  creator: 'Melek Hukum ID',
  publisher: 'Melek Hukum ID',
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
    siteName: 'Melek Hukum ID',
    title: 'Melek Hukum ID - Platform Edukasi Hukum Indonesia',
    description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Melek Hukum ID',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melek Hukum ID',
    description: 'Platform edukasi hukum dan anti-korupsi',
    creator: '@melekhukumid',
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
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Google AdSense removed - not available in this version */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          <GoogleAnalytics />
          <PerformanceMonitor />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
