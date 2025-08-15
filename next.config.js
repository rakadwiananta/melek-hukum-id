/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  
  // Performance optimizations
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
  
  // Netlify-compatible optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    optimizeCss: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },
  
  // Server optimizations for Netlify
  serverExternalPackages: [
    '@supabase/supabase-js',
    'midtrans-client',
  ],
  
  // Optimized bundle configuration for Netlify
  webpack: (config, { dev, isServer }) => {
    // Target modern browsers
    if (!dev && !isServer) {
      config.target = ['web', 'es2020'] // Less aggressive for Netlify compatibility
    }
    
    // Optimized tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
      // Netlify-friendly code splitting
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 80000, // Larger chunks for better Netlify compatibility
        minChunks: 1,
        maxAsyncRequests: 25,
        maxInitialRequests: 25,
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
          
          // Next.js internals
          nextInternals: {
            name: 'next-internals',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]next[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 60000,
          },
          
          // Icons and UI libraries
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](lucide-react|framer-motion)[\\/]/,
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Utilities
          utils: {
            name: 'utils',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|zod)[\\/]/,
            priority: 30,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Commons
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
            maxSize: 50000,
            reuseExistingChunk: true,
          },
          
          // Vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
            minSize: 15000,
            maxSize: 40000,
            reuseExistingChunk: true,
          },
        },
      },
    }
    
    // Module resolution
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
    
    // Production optimizations
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.concatenateModules = true
      config.devtool = false
    }
    
    return config
  },
  
  // Performance headers
  async headers() {
    return [
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
            value: 'origin-when-cross-origin'
          }
        ],
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