// Load polyfills before anything else
require('./polyfill')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  
  // Enhanced performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Redirects for domain migration
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'wacanahukum.com',
          },
        ],
        destination: 'https://wacanahukum.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.wacanahukum.com',
          },
        ],
        destination: 'https://wacanahukum.com/:path*',
        permanent: true,
      },
    ]
  },
  
  // Enhanced image configuration for better performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
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
      },

    ],
    // Unoptimized fallback for problematic images
    unoptimized: false,
  },
  
  // Enhanced experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
  },
  
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Enhanced compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Enhanced webpack configuration for performance
  webpack: (config, { dev, isServer }) => {
    // Exclude Supabase from server-side bundling to avoid realtime issues
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('@supabase/realtime-js')
      config.externals.push('@supabase/supabase-js')
    }
    
    // Production optimizations
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            enforce: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            priority: 5,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 20,
          },
        },
      }
      config.devtool = false
      
      // Tree shaking optimizations
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      
      // Module concatenation
      config.optimization.concatenateModules = true
    }
    
    // Module resolution optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
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
    // AdSense related variables
    NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
    NEXT_PUBLIC_ADSENSE_ENABLED: process.env.NEXT_PUBLIC_ADSENSE_ENABLED,
    NEXT_PUBLIC_ADSENSE_SLOT_HEADER: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER,
    NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
    NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    NEXT_PUBLIC_ADSENSE_SLOT_MOBILE: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOBILE,
  },
  
  // Enhanced headers for better caching and performance
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Long cache for public images and static assets
      { source: '/:path*.png', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.jpg', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.jpeg', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.gif', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.webp', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.avif', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.svg', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      // Performance headers for HTML
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
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
      // Cache PWA manifest and app icons aggressively
      {
        source: '/manifest.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Content-Type', value: 'application/manifest+json' }
        ],
      },
      { source: '/android-chrome-192x192.png', headers: [ { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' } ] },
      { source: '/android-chrome-512x512.png', headers: [ { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' } ] },
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
  
  // Performance optimizations
  compress: true,
  
  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      )
      return config
    },
  }),
};

module.exports = nextConfig; 