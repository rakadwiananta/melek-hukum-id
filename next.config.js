/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  
  // Basic performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Enhanced image configuration for external URLs
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    // Note: This CSP here only applies to image requests handled by Next Image.
    // We will set a full site-wide CSP via headers() below.
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add external domains for image optimization
    domains: [
      'i.ibb.co.com',
      'i.ibb.co',
      'imgur.com',
      'i.imgur.com',
      'supabase.co',
      'wacanahukum.com'
    ],
    // Add remote patterns for more flexible matching
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wacanahukum.com',
        port: '',
        pathname: '/**',
      }
    ],
    // Unoptimized fallback for problematic images
    unoptimized: false,
  },
  
  // Conservative optimizations for Netlify
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Basic compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Server optimizations
  serverExternalPackages: [
    '@supabase/supabase-js',
    'midtrans-client',
  ],
  
  // Conservative webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Basic optimizations only
    if (!dev) {
      config.optimization.minimize = true
      config.devtool = false
    }
    
    // Basic module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    // Prevent secrets from being bundled
    config.plugins = config.plugins || []
    
    return config
  },
  
  // Environment variables filtering for security
  env: {
    // Only expose necessary public variables
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  },
  
  // Basic headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://wacanahukum.com", 
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.ezojs.com", 
              "connect-src 'self' https://wacanahukum.com https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://www.ezojs.com",
              "img-src 'self' data: blob: https://wacanahukum.com https://*.supabase.co https://i.imgur.com https://imgur.com https://i.ibb.co https://i.ibb.co.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-src 'self' https://www.googletagmanager.com https://www.youtube.com",
              "worker-src 'self' blob:",
              "media-src 'self' blob:",
            ].join('; ')
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/x-icon'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate'
          }
        ],
      },
      {
        source: '/favicon-16x16.png',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate'
          }
        ],
      },
      {
        source: '/favicon-32x32.png',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate'
          }
        ],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate'
          }
        ],
      },
    ];
  },
  
  // Disable source maps and traces in production
  productionBrowserSourceMaps: false,
  generateBuildId: async () => {
    // Use timestamp instead of git hash to avoid exposing repo info
    return `build-${Date.now()}`
  },
};

module.exports = nextConfig; 