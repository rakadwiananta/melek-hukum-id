/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  
  // Aggressive performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Optimized image configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Turbopack configuration (stable in Next.js 15+)
  turbopack: {
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
  },
  
  // Compiler optimizations for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },
  
  // Aggressive bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Target modern browsers only
    if (!dev && !isServer) {
      config.target = ['web', 'es2022']
    }
    
    // Aggressive tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
      // More aggressive code splitting
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          default: false,
          vendors: false,
          // React framework
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 50,
            enforce: true,
            reuseExistingChunk: true,
          },
          // Framer Motion (heavy library)
          framerMotion: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },
          // Lucide React (icons)
          lucide: {
            name: 'lucide',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
          },
          // Common libraries
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
            maxSize: 80000,
            reuseExistingChunk: true,
          },
          // Large libraries
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            chunks: 'all',
            priority: 10,
            minSize: 10000,
            maxSize: 60000,
            reuseExistingChunk: true,
          },
        },
      },
    }
    
    // Aggressive module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      path: false,
      os: false,
      stream: false,
      util: false,
    }
    
    // Remove unused modules
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.concatenateModules = true
      
      // Ignore source maps in production for smaller bundles
      config.devtool = false
    }
    
    return config
  },
  
  // Remove heavy transpilation
  transpilePackages: [],
  
  // Server optimizations
  serverExternalPackages: ['@supabase/supabase-js'],
  
  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
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
            value: 'origin-when-cross-origin'
          }
        ],
      },
      // Aggressive static assets caching
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Images caching
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ],
      },
    ];
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig; 