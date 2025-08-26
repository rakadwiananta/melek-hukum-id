import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import PerformanceWrapper from '@/app/components/performance/PerformanceWrapper'

// Optimized font loading with better performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: {
    template: '%s | Melek Hukum ID',
    default: 'Melek Hukum ID - Portal Hukum Indonesia Terpercaya'
  },
  description: 'Portal hukum Indonesia terpercaya dengan artikel, regulasi, dan solusi hukum terkini. Akses informasi hukum yang akurat dan mudah dipahami.',
  keywords: 'hukum indonesia, artikel hukum, regulasi, konsultasi hukum, portal hukum',
  authors: [{ name: 'Tim Melek Hukum' }],
  creator: 'Melek Hukum ID',
  publisher: 'Melek Hukum ID',
  metadataBase: new URL('https://bicarahukum.my.id'),
  
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://bicarahukum.my.id',
    siteName: 'Melek Hukum ID',
    title: 'Melek Hukum ID - Portal Hukum Indonesia',
    description: 'Portal hukum Indonesia terpercaya dengan informasi hukum terkini',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Melek Hukum ID'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Melek Hukum ID - Portal Hukum Indonesia',
    description: 'Portal hukum Indonesia terpercaya dengan informasi hukum terkini',
    images: ['/twitter-image.jpg']
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
  
  verification: {
    google: 'your-google-verification-code',
  },
  
  other: {
    'ezoic-site-verification': 'iliv3haIMKkkic7sEAz8wOdIaLB9pT',
    'msvalidate.01': '137F17AF7BD19D00FC8E11CACAF733FF',
    'yandex-verification': 'bff52e920f382b21',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://bicarahukum.my.id" />
        <link rel="preconnect" href="https://supabase.co" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//www.ezojs.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Favicon with better loading */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="color-scheme" content="light" />
        
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Performance hints */}
        <link rel="preload" href="/timbangkan.jpg" as="image" />
        
        {/* Ezoic Standalone Scripts - non-blocking with better loading */}
        <Script id="ezoic-sa" src="//www.ezojs.com/ezoic/sa.min.js" strategy="lazyOnload" />
        <Script id="ezoic-sa-init" strategy="lazyOnload">{`
          window.ezstandalone = window.ezstandalone || {};
          ezstandalone.cmd = ezstandalone.cmd || [];
        `}</Script>
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div id="root">
          {children}
        </div>
        
        {/* Ezoic Global Ads Script - optimized loading */}
        <Script id="ezoic-showads" strategy="lazyOnload">{`
          (function() {
            function initEzoicAds() {
              if (window.ezstandalone && window.ezstandalone.cmd) {
                window.ezstandalone.cmd.push(function () {
                  try {
                    window.ezstandalone.showAds();
                  } catch (error) {
                    console.log('Ezoic global showAds error:', error);
                  }
                });
              } else {
                setTimeout(initEzoicAds, 100);
              }
            }
            // Delay loading to improve initial page load
            setTimeout(initEzoicAds, 2000);
          })();
        `}</Script>
        
        {/* Performance monitoring */}
        <PerformanceWrapper />
      </body>
    </html>
  )
} 