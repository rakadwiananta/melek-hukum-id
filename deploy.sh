#!/bin/bash

# Script untuk deploy otomatis ke shared hosting
echo "🚀 Starting deployment process..."

# 1. Build aplikasi
echo "📦 Building application..."
npm run build

# 2. Buat paket production
echo "📁 Creating production package..."
tar -czf build-production.tar.gz .next package.json server.js public

# 3. Upload via SCP (opsional, jika ada SSH access)
# scp build-production.tar.gz user@your-server:/home/user/wacanahukum/

echo "✅ Build completed! Upload build-production.tar.gz to your hosting."
echo "📋 Next steps:"
echo "   1. Upload build-production.tar.gz via cPanel File Manager"
echo "   2. Extract in your hosting directory (e.g., /home/user/wacanahukum/)"
echo "   3. Setup Node.js app with server.js as startup file"
echo "   4. Add environment variables in cPanel"
