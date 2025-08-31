#!/bin/bash

echo "=== Build dan Test Website wacanahukum.com ==="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan. Silakan install Node.js terlebih dahulu."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "1. Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies berhasil diinstall"
else
    echo "❌ Gagal install dependencies"
    exit 1
fi
echo ""

# Build website
echo "2. Building website..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build berhasil"
    echo "   Build size: $(du -sh .next 2>/dev/null | cut -f1)"
else
    echo "❌ Build gagal"
    exit 1
fi
echo ""

# Check build output
echo "3. Checking build output..."
if [ -d ".next" ]; then
    echo "✅ Build folder .next ditemukan"
    echo "   Pages: $(find .next/server/pages -name "*.js" 2>/dev/null | wc -l) pages"
    echo "   Static: $(find .next/static -type f 2>/dev/null | wc -l) files"
else
    echo "❌ Build folder .next tidak ditemukan"
    exit 1
fi
echo ""

# Type check
echo "4. Running type check..."
npm run type-check
if [ $? -eq 0 ]; then
    echo "✅ Type check passed"
else
    echo "⚠️  Type check failed (non-critical)"
fi
echo ""

# Lint check
echo "5. Running lint check..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ Lint check passed"
else
    echo "⚠️  Lint check failed (non-critical)"
fi
echo ""

# Test local server
echo "6. Testing local server..."
echo "   Starting server on http://localhost:3000"
echo "   Press Ctrl+C to stop server"
echo ""

# Start server in background
npm run start &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Test if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server berjalan di http://localhost:3000"
    echo "   Status: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)"
else
    echo "❌ Server tidak dapat diakses"
fi

# Stop server
kill $SERVER_PID 2>/dev/null

echo ""
echo "=== Build dan Test Selesai ==="
echo ""
echo "Website siap untuk di-deploy!"
echo ""
echo "Langkah selanjutnya:"
echo "1. Deploy ke Netlify: netlify deploy --prod --dir=.next"
echo "2. Atau upload ke cPanel: public_html/"
echo "3. Set DNS records di provider domain"
echo "4. Tunggu DNS propagation (24-48 jam)"
echo ""
echo "Untuk monitoring:"
echo "- https://www.whatsmydns.net/ (DNS propagation)"
echo "- https://pagespeed.web.dev/ (Performance)"
echo "- https://search.google.com/search-console (SEO)"