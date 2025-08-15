/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  
  // Basic performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Image configuration
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    
    return config
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
  
  // Disable source maps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig; 