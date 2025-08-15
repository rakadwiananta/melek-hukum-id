/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  
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
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add external domains for image optimization
    domains: [
      'i.ibb.co.com',
      'i.ibb.co',
      'imgur.com',
      'i.imgur.com',
      'supabase.co',
      'bicarahukum.my.id'
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
        hostname: 'bicarahukum.my.id',
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
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
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