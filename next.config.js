/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Aktifkan optimizer bawaan Next.js untuk LCP lebih baik
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  // R3F: transpile three for Next.js per docs
  transpilePackages: ['three'],
  // Konfigurasi untuk Netlify dengan API routes
  serverExternalPackages: ['@supabase/supabase-js'],
  // Optimisasi import package berat
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/icons/{{member}}',
    },
  },
  // Konfigurasi untuk domain
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          }
        ],
      },
      // Cache agresif untuk aset build Next.js
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache untuk aset publik umum
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  // Konfigurasi untuk subdomain
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 