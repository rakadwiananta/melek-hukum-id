#!/bin/bash

echo "=== Status Deployment Website wacanahukum.com ==="
echo ""

echo "1. Memeriksa status build lokal:"
if [ -d ".next" ]; then
    echo "✅ Build folder .next ditemukan"
    echo "   Size: $(du -sh .next 2>/dev/null | cut -f1)"
else
    echo "❌ Build folder .next tidak ditemukan"
    echo "   Jalankan: npm run build"
fi
echo ""

echo "2. Memeriksa package.json:"
if [ -f "package.json" ]; then
    echo "✅ package.json ditemukan"
    echo "   Name: $(grep '"name"' package.json | cut -d'"' -f4)"
    echo "   Version: $(grep '"version"' package.json | cut -d'"' -f4)"
else
    echo "❌ package.json tidak ditemukan"
fi
echo ""

echo "3. Memeriksa konfigurasi Netlify:"
if [ -f "netlify.toml" ]; then
    echo "✅ netlify.toml ditemukan"
    echo "   Build command: $(grep 'command =' netlify.toml | cut -d'"' -f2)"
    echo "   Publish dir: $(grep 'publish =' netlify.toml | cut -d'"' -f2)"
else
    echo "❌ netlify.toml tidak ditemukan"
fi
echo ""

echo "4. Memeriksa konfigurasi cPanel:"
if [ -f ".cpanel.yml" ]; then
    echo "✅ .cpanel.yml ditemukan"
    echo "   Deploy path: $(grep 'DEPLOYPATH' .cpanel.yml | cut -d'/' -f3-)"
else
    echo "❌ .cpanel.yml tidak ditemukan"
fi
echo ""

echo "5. Memeriksa environment variables:"
if [ -f ".env.local" ]; then
    echo "✅ .env.local ditemukan"
    echo "   Variables: $(grep -c '=' .env.local) variables"
else
    echo "⚠️  .env.local tidak ditemukan (gunakan env.example sebagai template)"
fi
echo ""

echo "6. Memeriksa konfigurasi domain di next.config.js:"
if grep -q "wacanahukum.com" next.config.js; then
    echo "✅ Domain wacanahukum.com dikonfigurasi di next.config.js"
else
    echo "❌ Domain wacanahukum.com tidak ditemukan di next.config.js"
fi
echo ""

echo "7. Memeriksa sitemap:"
if [ -f "sitemap.xml" ]; then
    echo "✅ sitemap.xml ditemukan"
    echo "   Size: $(du -sh sitemap.xml 2>/dev/null | cut -f1)"
    echo "   URLs: $(grep -c '<loc>' sitemap.xml) URLs"
else
    echo "❌ sitemap.xml tidak ditemukan"
fi
echo ""

echo "8. Memeriksa robots.txt:"
if [ -f "public/robots.txt" ]; then
    echo "✅ robots.txt ditemukan"
    echo "   Content:"
    cat public/robots.txt | head -5
else
    echo "❌ robots.txt tidak ditemukan"
fi
echo ""

echo "=== Rekomendasi ==="
echo ""
echo "Jika website tidak dapat diakses:"
echo "1. Periksa DNS records di provider domain"
echo "2. Pastikan website sudah di-deploy ke hosting"
echo "3. Tunggu DNS propagation (24-48 jam)"
echo "4. Hubungi provider domain/hosting jika masih bermasalah"
echo ""
echo "Untuk deploy ke Netlify:"
echo "1. Push ke repository Git"
echo "2. Connect repository ke Netlify"
echo "3. Set environment variables di Netlify dashboard"
echo "4. Deploy otomatis akan berjalan"
echo ""
echo "Untuk deploy ke cPanel:"
echo "1. Upload files ke public_html/"
echo "2. Jalankan: npm install && npm run build"
echo "3. Pastikan .htaccess dikonfigurasi dengan benar"