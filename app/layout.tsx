import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
  weight: ['400', '500', '600', '700'], // Only load necessary weights
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
    <html lang="id" className={inter.variable}>
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
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            .bg-white { background-color: #ffffff; }
            .text-gray-900 { color: #111827; }
            .min-h-screen { min-height: 100vh; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-1 { flex: 1 1 0%; }
            .relative { position: relative; }
            .overflow-hidden { overflow: hidden; }
            .container { width: 100%; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .max-w-7xl { max-width: 80rem; }
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .gap-12 { gap: 3rem; }
            .items-center { align-items: center; }
            .w-full { width: 100%; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .font-bold { font-weight: 700; }
            .text-gray-900 { color: #111827; }
            .mb-6 { margin-bottom: 1.5rem; }
            .leading-\\[1\\.1\\] { line-height: 1.1; }
            .block { display: block; }
            .text-transparent { color: transparent; }
            .bg-clip-text { background-clip: text; }
            .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
            .from-red-600 { --tw-gradient-from: #dc2626; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(220, 38, 38, 0)); }
            .to-rose-600 { --tw-gradient-to: #e11d48; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .text-gray-700 { color: #374151; }
            .mt-2 { margin-top: 0.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-gray-600 { color: #4b5563; }
            .mb-8 { margin-bottom: 2rem; }
            .leading-relaxed { line-height: 1.625; }
            .max-w-xl { max-width: 36rem; }
            .flex-col { flex-direction: column; }
            .sm\\:flex-row { flex-direction: row; }
            .gap-4 { gap: 1rem; }
            .mb-12 { margin-bottom: 3rem; }
            .inline-flex { display: inline-flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .bg-gray-900 { background-color: #111827; }
            .text-white { color: #ffffff; }
            .rounded-xl { border-radius: 0.75rem; }
            .font-semibold { font-weight: 600; }
            .overflow-hidden { overflow: hidden; }
            .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            .duration-300 { transition-duration: 300ms; }
            .hover\\:bg-gray-800:hover { background-color: #1f2937; }
            .relative { position: relative; }
            .z-10 { z-index: 10; }
            .w-5 { width: 1.25rem; }
            .h-5 { height: 1.25rem; }
            .ml-2 { margin-left: 0.5rem; }
            .transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            .group:hover .group-hover\\:translate-x-1 { transform: translateX(0.25rem); }
            .border-2 { border-width: 2px; }
            .border-gray-200 { border-color: #e5e7eb; }
            .hover\\:border-gray-300:hover { border-color: #d1d5db; }
            .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            .mr-2 { margin-right: 0.5rem; }
            .text-red-600 { color: #dc2626; }
            .grid { display: grid; }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .gap-8 { gap: 2rem; }
            .text-center { text-align: center; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .lg\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .mb-1 { margin-bottom: 0.25rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            @media (min-width: 640px) {
              .sm\\:text-5xl { font-size: 3rem; line-height: 1; }
              .sm\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
              .sm\\:flex-row { flex-direction: row; }
            }
            @media (min-width: 1024px) {
              .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .lg\\:gap-20 { gap: 5rem; }
              .lg\\:text-6xl { font-size: 3.75rem; line-height: 1; }
              .lg\\:text-5xl { font-size: 3rem; line-height: 1; }
              .lg\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            }
            @media (min-width: 1280px) {
              .xl\\:text-7xl { font-size: 4.5rem; line-height: 1; }
              .xl\\:text-6xl { font-size: 3.75rem; line-height: 1; }
            }
          `
        }} />
        
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
            setTimeout(initEzoicAds, 3000);
          })();
        `}</Script>
        
        {/* Performance monitoring */}
        <PerformanceWrapper />
      </body>
    </html>
  )
} 