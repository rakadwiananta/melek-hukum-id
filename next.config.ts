import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pastikan output static untuk Netlify
  output: 'export',
  distDir: 'out',
};

export default nextConfig;
