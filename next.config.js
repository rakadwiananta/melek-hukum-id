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
  
  // Ultra-aggressive performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'clsx',
      'tailwind-merge'
    ],
    // Enable CSS optimization
    optimizeCss: true,
  },
  
  // Compiler optimizations for modern browsers only
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    styledComponents: false,
    // Remove development-only code
    emotion: false,
  },
  
  // Server optimizations
  serverExternalPackages: [
    '@supabase/supabase-js',
    'midtrans-client',
  ],
  
  // Ultra-aggressive bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Target only modern browsers (ES2022+)
    if (!dev && !isServer) {
      config.target = ['web', 'es2022']
    }
    
    // Ultra-aggressive tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
      providedExports: true,
      innerGraph: true,
      // More aggressive code splitting with smaller chunks
      splitChunks: {
        chunks: 'all',
        minSize: 15000, // Smaller minimum size
        maxSize: 50000, // Much smaller maximum size
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: false,
          vendors: false,
          
          // React core (smallest possible)
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 60,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Scheduler separately
          scheduler: {
            name: 'scheduler',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]scheduler[\\/]/,
            priority: 55,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Framer Motion (split into smaller chunks)
          framerMotion: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 45,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 30000,
          },
          
          // Lucide React (icons)
          lucide: {
            name: 'lucide',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Next.js internals
          nextInternals: {
            name: 'next-internals',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]next[\\/]/,
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 40000,
          },
          
          // Tailwind and CSS utilities
          styles: {
            name: 'styles',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|class-variance-authority)[\\/]/,
            priority: 30,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Common small utilities
          utils: {
            name: 'utils',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](zod|date-fns|lodash)[\\/]/,
            priority: 25,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 25000,
          },
          
          // Application commons (very strict)
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 3, // Must be used in at least 3 places
            priority: 20,
            maxSize: 30000, // Very small commons
            reuseExistingChunk: true,
            test: /[\\/]src[\\/]|[\\/]app[\\/]/,
          },
          
          // Remaining vendor libraries (smallest chunks)
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
            minSize: 10000,
            maxSize: 25000, // Very small vendor chunks
            reuseExistingChunk: true,
          },
        },
      },
    }
    
    // Ultra-aggressive module resolution
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
      buffer: false,
      events: false,
      url: false,
      querystring: false,
    }
    
    // Aggressive optimizations for production
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.concatenateModules = true
      config.optimization.mangleExports = true
      config.optimization.removeAvailableModules = true
      config.optimization.removeEmptyChunks = true
      config.optimization.mergeDuplicateChunks = true
      
      // Remove source maps completely
      config.devtool = false
      
      // Aggressive dead code elimination
      config.optimization.usedExports = 'global'
    }
    
    // Module rules for better tree shaking
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules/,
      sideEffects: false,
    })
    
    return config
  },
  
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
      // Ultra-aggressive static assets caching
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
  
  // Disable source maps completely in production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig; 