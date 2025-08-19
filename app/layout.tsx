import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

// Optimized font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
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
  },
    'msvalidate.01': '137F17AF7BD19D00FC8E11CACAF733FF',    'yandex-verification': 'bff52e920f382b21',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="color-scheme" content="light" />
        

        
        {/* Ezoic Standalone Scripts - Must be after consent scripts */}
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `
          }}
        />
        

        
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div id="root">
          {children}
        </div>
        
        {/* Ezoic Global Ads Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Wait for Ezoic to load before calling showAds
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
                setTimeout(initEzoicAds, 1000);
              })();
            `
          }}
        />
      </body>
    </html>
  )
} 