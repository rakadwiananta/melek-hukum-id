import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Konfigurasi untuk Netlify dengan API routes
  serverExternalPackages: ['@supabase/supabase-js'],
};

export default nextConfig;
