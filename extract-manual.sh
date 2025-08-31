#!/bin/bash

# Script untuk extract dan setup manual
echo "🔧 Extracting build files..."

# Extract file
tar -xzf build-production.tar.gz

# Buat folder jika belum ada
mkdir -p public

# List semua file untuk debugging
echo "📁 Files after extraction:"
ls -la

echo "✅ Extraction completed!"
echo "📋 Check if .next folder exists:"
ls -la .next/
