import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bicarahukum.my.id'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/*.json$',
          '/*?*',
          '/404',
          '/500'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/'
        ]
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/'
        ]
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/'
        ]
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/'
        ]
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: []
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: []
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: []
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: []
      },
      {
        userAgent: 'applebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/'
        ]
      }
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-0.xml`
    ],
    host: BASE_URL,
  }
}
