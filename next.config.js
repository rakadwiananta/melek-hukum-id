/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Konfigurasi untuk Netlify dengan API routes
  serverExternalPackages: ['@supabase/supabase-js'],
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