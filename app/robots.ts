import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bicarahukum.my.id'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',  // Allow static assets (JS, CSS, fonts, images)
          '/favicon.ico',
          '/favicon-16x16.png',
          '/favicon-32x32.png',
          '/apple-touch-icon.png',
          '/android-chrome-192x192.png',
          '/android-chrome-512x512.png'
        ],
        disallow: [
          '/api/',
          '/_next/webpack-hmr',  // Block only HMR in development
          '/admin/',
          '/*.json$',
          '/404',
          '/500'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/_next/static/',  // Explicitly allow static assets for Googlebot
          '/favicon.ico',
          '/favicon-16x16.png',
          '/favicon-32x32.png',
          '/apple-touch-icon.png',
          '/android-chrome-192x192.png',
          '/android-chrome-512x512.png'
        ],
        disallow: [
          '/api/',
          '/admin/'
        ]
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/'
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
