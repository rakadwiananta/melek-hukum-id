import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/app/components/analytics/GoogleAnalytics'
import { Toaster } from '@/app/components/ui/Toaster'
import { ToastProvider } from '@/app/components/ui/use-toast'
import FontLoader from '@/app/components/performance/FontLoader'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true
})

// Google AdSense Configuration
const ADSENSE_CLIENT_ID = 'ca-pub-9240032692197811'
const GOOGLE_VERIFICATION = 'googlecdb930fb42e17478'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://wacanahukum.com'),
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
    url: 'https://wacanahukum.com',
    siteName: 'Melek Hukum ID',
    title: 'Melek Hukum ID - Platform Edukasi Hukum Indonesia',
    description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia',
    images: [{
      url: 'https://wacanahukum.com/og-image.jpg',
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
    images: ['https://wacanahukum.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://wacanahukum.com',
    types: {
      'application/rss+xml': 'https://wacanahukum.com/feed.xml',
    },
  },
  verification: {
    google: GOOGLE_VERIFICATION,
  },
  other: {
    'google-adsense-account': ADSENSE_CLIENT_ID
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
        {/* DNS prefetch for critical resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <GoogleAnalytics />
        {/* Meta tags akan di-inject otomatis dari metadata */}

        {/* Cache Control Meta Tags */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* Force refresh on mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Mixed Content Protection */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* HTTPS Security */}
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <FontLoader>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </FontLoader>
        
        {/* Service Worker Registration */}
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                      
                      // Check for updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available
                            if (confirm('Update tersedia! Klik OK untuk memperbarui.')) {
                              newWorker.postMessage({ type: 'SKIP_WAITING' });
                              window.location.reload();
                            }
                          }
                        });
                      });
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Force refresh function for mobile
              function forceRefresh() {
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (let name of names) {
                      caches.delete(name);
                    }
                  });
                }
                window.location.reload(true);
              }
              
              // Add force refresh to window object
              window.forceRefresh = forceRefresh;
              
              // Clear cache on domain change
              const currentDomain = window.location.hostname;
              const storedDomain = localStorage.getItem('site_domain');
              
              if (storedDomain && storedDomain !== currentDomain) {
                // Domain changed, clear all cache
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (let name of names) {
                      caches.delete(name);
                    }
                  });
                }
                localStorage.clear();
                sessionStorage.clear();
                localStorage.setItem('site_domain', currentDomain);
                window.location.reload();
              } else if (!storedDomain) {
                localStorage.setItem('site_domain', currentDomain);
              }
              
              // Force HTTPS redirect
              if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
                window.location.href = window.location.href.replace('http:', 'https:');
              }
            `,
          }}
        />
        
        {/* Cache Busting Script */}
        <Script
          id="cache-bust"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Add timestamp to prevent caching
              const timestamp = Date.now();
              const links = document.querySelectorAll('link[rel="stylesheet"]');
              links.forEach(link => {
                if (link.href.includes('_next/static')) {
                  link.href = link.href + '?v=' + timestamp;
                }
              });
              
              // Force reload on mobile if needed
              if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                // Check if page was loaded from cache
                window.addEventListener('pageshow', function(event) {
                  if (event.persisted) {
                    // Page was loaded from cache, force refresh
                    window.location.reload();
                  }
                });
              }
              
              // Mixed content protection
              if (window.location.protocol === 'https:') {
                const images = document.querySelectorAll('img[src^="http:"]');
                images.forEach(img => {
                  img.src = img.src.replace('http:', 'https:');
                });
                
                const links = document.querySelectorAll('a[href^="http:"]');
                links.forEach(link => {
                  link.href = link.href.replace('http:', 'https:');
                });
                
                const scripts = document.querySelectorAll('script[src^="http:"]');
                scripts.forEach(script => {
                  script.src = script.src.replace('http:', 'https:');
                });
              }
            `,
          }}
        />
        
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
