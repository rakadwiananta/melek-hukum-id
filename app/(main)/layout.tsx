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
import Script from 'next/script'

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
    default: 'Melek Hukum - Platform Edukasi Hukum Indonesia',
    template: '%s | Melek Hukum'
  },
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. Pelajari hukum dengan mudah, praktis, dan gratis.',
  keywords: ['hukum indonesia', 'anti korupsi', 'UU ITE', 'panduan hukum', 'cara melapor korupsi', 'edukasi hukum'],
  authors: [{ name: 'Melek Hukum Team' }],
  creator: 'Melek Hukum',
  publisher: 'Melek Hukum',
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
    siteName: 'Melek Hukum',
    title: 'Melek Hukum - Platform Edukasi Hukum Indonesia',
    description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Melek Hukum',
    }],
  },
  applicationName: 'Melek Hukum',
  appleWebApp: {
    title: 'Melek Hukum',
    capable: true,
    statusBarStyle: 'default'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melek Hukum',
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
        <Script id="org-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Melek Hukum',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://melek-hukum-id.netlify.app',
              logo: (process.env.NEXT_PUBLIC_SITE_URL || 'https://melek-hukum-id.netlify.app') + '/timbangkan.jpg'
            })
          }}
        />
        <Script id="website-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Melek Hukum',
              alternateName: ['Melek Hukum ID', 'MelekHukum'],
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://melek-hukum-id.netlify.app',
              inLanguage: 'id-ID',
              potentialAction: {
                '@type': 'SearchAction',
                target: (process.env.NEXT_PUBLIC_SITE_URL || 'https://melek-hukum-id.netlify.app') + '/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
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
