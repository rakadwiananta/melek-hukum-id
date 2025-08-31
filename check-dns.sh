#!/bin/bash

echo "=== DNS Check untuk wacanahukum.com ==="
echo ""

echo "1. Memeriksa A Record:"
dig wacanahukum.com A +short
echo ""

echo "2. Memeriksa CNAME Record:"
dig wacanahukum.com CNAME +short
echo ""

echo "3. Memeriksa NS Records:"
dig wacanahukum.com NS +short
echo ""

echo "4. Memeriksa MX Records:"
dig wacanahukum.com MX +short
echo ""

echo "5. Memeriksa TXT Records:"
dig wacanahukum.com TXT +short
echo ""

echo "6. Memeriksa dengan Google DNS (8.8.8.8):"
dig @8.8.8.8 wacanahukum.com A +short
echo ""

echo "7. Memeriksa dengan Cloudflare DNS (1.1.1.1):"
dig @1.1.1.1 wacanahukum.com A +short
echo ""

echo "8. Traceroute ke domain:"
traceroute wacanahukum.com 2>/dev/null || echo "Traceroute tidak tersedia"
echo ""

echo "=== Selesai ==="