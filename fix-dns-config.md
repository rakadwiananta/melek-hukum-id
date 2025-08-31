# Panduan Memperbaiki DNS untuk wacanahukum.com

## Masalah Saat Ini
- ❌ Domain `wacanahukum.com` tidak dapat diakses
- ❌ Error: `DNS_PROBE_FINISHED_NXDOMAIN`
- ✅ Website sudah dikonfigurasi dengan benar

## Langkah-langkah Perbaikan

### 1. Periksa Status Domain

#### A. Cek Registrasi Domain
1. Buka https://whois.com/
2. Cari domain `wacanahukum.com`
3. Pastikan domain masih aktif dan tidak expired

#### B. Cek DNS Records Online
Gunakan tools berikut:
- https://www.whatsmydns.net/ - Cari `wacanahukum.com`
- https://dnschecker.org/ - Cari `wacanahukum.com`
- https://mxtoolbox.com/DNSLookup.aspx - Cari `wacanahukum.com`

### 2. Konfigurasi DNS Records

#### Jika menggunakan Netlify:

1. **Login ke Netlify Dashboard**
2. **Pilih project website**
3. **Buka tab "Domain management"**
4. **Tambahkan custom domain:**
   - Domain: `wacanahukum.com`
   - Subdomain: `www.wacanahukum.com`

5. **Set DNS Records di provider domain:**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: wacanahukum.com
   ```

#### Jika menggunakan cPanel/Shared Hosting:

1. **Login ke cPanel**
2. **Buka "Zone Editor"**
3. **Tambahkan records:**
   ```
   Type: A
   Name: @
   Value: [IP_SERVER_ANDA]
   
   Type: CNAME
   Name: www
   Value: wacanahukum.com
   ```

### 3. Set Nameserver

#### Untuk Netlify:
```
ns1.netlify.com
ns2.netlify.com
ns3.netlify.com
```

#### Untuk cPanel:
```
ns1.yourhostingprovider.com
ns2.yourhostingprovider.com
```

### 4. Deploy Website

#### Deploy ke Netlify:
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login ke Netlify
netlify login

# 3. Build website
npm run build

# 4. Deploy
netlify deploy --prod --dir=.next
```

#### Deploy ke cPanel:
```bash
# 1. Upload files ke public_html/
# 2. Install dependencies
npm install

# 3. Build website
npm run build

# 4. Set environment variables
cp env.example .env.local
# Edit .env.local dengan nilai yang benar
```

### 5. Set Environment Variables

Buat file `.env.local` dengan konfigurasi berikut:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://qjqjqjqjqjqjqjqjqj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcWpxanFqcWpxanFqcWpxanFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NzQ0MDAsImV4cCI6MjA1MTA1MDQwMH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-D5EH0QKDSF

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://wacanahukum.com
NEXT_PUBLIC_SITE_NAME=Wacana Hukum
NEXT_PUBLIC_BASE_URL=https://wacanahukum.com

# AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-9240032692197811
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT=0987654321
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=1122334455
NEXT_PUBLIC_ADSENSE_SLOT_MOBILE=5566778899

# Midtrans
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=Mid-client-1234567890abcdef
```

### 6. Verifikasi Deployment

#### A. Test Website
1. Buka browser incognito
2. Akses https://wacanahukum.com
3. Periksa apakah website sudah berjalan

#### B. Test DNS Propagation
1. Tunggu 24-48 jam untuk DNS propagation
2. Gunakan tools online untuk cek status

#### C. Test Performance
```bash
# Build dan test lokal
npm run build
npm run start

# Test di browser: http://localhost:3000
```

### 7. Troubleshooting

#### Jika masih bermasalah:

1. **Clear DNS Cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemctl restart systemd-resolved
   ```

2. **Periksa Firewall:**
   - Pastikan port 80 dan 443 tidak diblokir
   - Periksa pengaturan proxy

3. **Kontak Support:**
   - Provider domain
   - Provider hosting
   - Tim development

### 8. Monitoring

#### Set up monitoring:
1. **Uptime monitoring** - Gunakan UptimeRobot atau Pingdom
2. **Performance monitoring** - Google PageSpeed Insights
3. **SEO monitoring** - Google Search Console

### 9. Backup Plan

Jika domain bermasalah, siapkan:
1. **Subdomain alternatif** - misal: `wacanahukum.netlify.app`
2. **Domain backup** - misal: `wacanahukum.id`
3. **Documentation** - simpan semua konfigurasi

## Status Checklist

- [ ] Domain terdaftar dan aktif
- [ ] DNS records dikonfigurasi
- [ ] Nameserver diset dengan benar
- [ ] Website di-deploy
- [ ] Environment variables diset
- [ ] SSL certificate aktif
- [ ] Website dapat diakses
- [ ] Performance optimal
- [ ] Monitoring aktif

## Kontak Darurat

Jika website down:
1. **Provider Domain**: [Kontak provider domain Anda]
2. **Provider Hosting**: [Kontak Netlify/cPanel provider]
3. **Developer**: [Kontak tim development]