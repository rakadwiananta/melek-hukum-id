import React from 'react'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Artikel Hukum Indonesia - Melek Hukum ID | Portal Hukum Terpercaya',
  description: 'Portal artikel hukum Indonesia terlengkap. Temukan informasi hukum pidana, perdata, tata negara, dan hukum adat dengan analisis mendalam dari pakar hukum terkemuka.',
  keywords: 'hukum indonesia, artikel hukum, hukum pidana, hukum perdata, mahkamah agung, peraturan perundangan, konsultasi hukum',
  authors: [{ name: 'Tim Melek Hukum' }],
  creator: 'Melek Hukum',
  publisher: 'Melek Hukum',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Artikel Hukum Indonesia - Melek Hukum',
    description: 'Portal artikel hukum Indonesia terlengkap dengan analisis mendalam dari pakar hukum.',
    url: 'https://bicarahukum.my.id/artikel',
    siteName: 'Melek Hukum',
    images: [
      {
        url: 'https://bicarahukum.my.id/images/og-artikel.jpg',
        width: 1200,
        height: 630,
        alt: 'Melek Hukum - Portal Hukum Indonesia',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Hukum Indonesia - Melek Hukum',
    description: 'Portal artikel hukum Indonesia terlengkap dengan analisis mendalam.',
    creator: '@melekhukumid',
    images: ['https://bicarahukum.my.id/images/twitter-artikel.jpg'],
  },
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data untuk SEO */}
      <Script
        id="artikel-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Artikel Hukum Indonesia',
            description: 'Kumpulan artikel hukum Indonesia terlengkap',
                         url: 'https://bicarahukum.my.id/artikel',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Melek Hukum',
              url: 'https://bicarahukum.my.id',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Beranda',
                  item: 'https://melekhukum.id',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Artikel',
                  item: 'https://melekhukum.id/artikel',
                },
              ],
            },
          }),
        }}
      />
      
      {/* Mobile Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8B4513" />
      <meta name="msapplication-TileColor" content="#8B4513" />
      <meta name="theme-color" content="#8B4513" />
      
      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Melek Hukum" />
      
      <div className="min-h-screen relative">
        {/* Batik Pattern Background */}
        <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="batik-bg" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <g fill="none" stroke="#8B4513" strokeWidth="0.5">
                  <circle cx="100" cy="100" r="80" />
                  <circle cx="100" cy="100" r="60" />
                  <circle cx="100" cy="100" r="40" />
                  <path d="M100,20 Q180,100 100,180 Q20,100 100,20" />
                  <path d="M20,100 Q100,20 180,100 Q100,180 20,100" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#batik-bg)" />
          </svg>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  )
}
