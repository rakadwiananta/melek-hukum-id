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
        ],
        disallow: [
          '/api/',
          '/admin/'
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
