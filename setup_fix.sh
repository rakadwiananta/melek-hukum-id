#!/bin/bash

# Script untuk memperbaiki masalah "Artikel Tidak Ditemukan"
# Jalankan dengan: chmod +x setup_fix.sh && ./setup_fix.sh

echo "🔧 MEMPERBAIKI MASALAH ARTIKEL TIDAK DITEMUKAN"
echo "============================================="

# 1. Cek apakah .env.local ada
if [ ! -f ".env.local" ]; then
    echo "❌ File .env.local tidak ditemukan!"
    echo "📝 Membuat file .env.local dari template..."
    cp .env.local.template .env.local
    echo "✅ File .env.local dibuat. Silakan isi dengan kredensial Supabase yang benar."
    echo ""
    echo "Buka file .env.local dan ganti:"
    echo "- NEXT_PUBLIC_SUPABASE_URL dengan URL project Supabase Anda"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY dengan anon key dari Supabase"
    echo "- SUPABASE_SERVICE_ROLE_KEY dengan service role key dari Supabase"
    echo ""
    echo "Setelah mengisi .env.local, jalankan script ini lagi."
    exit 1
else
    echo "✅ File .env.local ditemukan"
fi

# 2. Cek apakah Node.js dependencies sudah ter-install
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# 3. Install Supabase CLI jika belum ada
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    npm install -g supabase
fi

# 4. Test koneksi Supabase
echo "🔍 Testing Supabase connection..."
if [ -f "test_supabase_connection.js" ]; then
    node test_supabase_connection.js
else
    echo "❌ Test script tidak ditemukan"
fi

# 5. Buat backup dari file penting
echo "💾 Creating backup..."
mkdir -p backups
cp -r app/lib backups/ 2>/dev/null || true
cp app/\(main\)/artikel/\[slug\]/page.tsx backups/ 2>/dev/null || true

echo ""
echo "🎯 LANGKAH SELANJUTNYA:"
echo "======================"
echo "1. Buka Supabase Dashboard: https://supabase.com/dashboard"
echo "2. Pilih project Anda"
echo "3. Buka SQL Editor"
echo "4. Jalankan script dari file: supabase_setup.sql"
echo "5. Untuk debugging, jalankan queries dari: debug_supabase.sql"
echo "6. Test dengan menjalankan: npm run dev"
echo ""
echo "📖 Baca panduan lengkap di: fix_article_issues.md"
echo ""
echo "🆘 Jika masih bermasalah, cek console browser dan terminal untuk error messages"