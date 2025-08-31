# Troubleshooting DNS untuk wacanahukum.com

## Masalah yang Ditemukan
Error: `DNS_PROBE_FINISHED_NXDOMAIN`
Domain: `wacanahukum.com` tidak dapat diakses

## Analisis Masalah
Berdasarkan error yang muncul, masalah utamanya adalah:
1. **DNS tidak dapat menemukan domain** - Domain `wacanahukum.com` tidak memiliki A record yang valid
2. **Domain mungkin belum dikonfigurasi** dengan benar di provider domain
3. **DNS propagation** mungkin belum selesai jika baru saja dikonfigurasi

## Solusi yang Direkomendasikan

### 1. Periksa DNS Records di Provider Domain

#### Jika menggunakan cPanel/Shared Hosting:
1. Login ke cPanel
2. Buka "Zone Editor" atau "DNS Zone Editor"
3. Periksa apakah ada A record untuk `wacanahukum.com`
4. Pastikan A record mengarah ke IP server yang benar

#### Jika menggunakan Netlify:
1. Login ke Netlify Dashboard
2. Pilih project website
3. Buka tab "Domain management"
4. Periksa apakah domain `wacanahukum.com` sudah terdaftar
5. Pastikan DNS records sudah dikonfigurasi dengan benar

### 2. Konfigurasi DNS Records yang Benar

#### Untuk Netlify:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: wacanahukum.com
```

#### Untuk cPanel/Shared Hosting:
```
Type: A
Name: @
Value: [IP_SERVER_ANDA]

Type: CNAME
Name: www
Value: wacanahukum.com
```

### 3. Periksa Nameserver

Pastikan nameserver mengarah ke provider yang benar:

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

### 4. Langkah-langkah Verifikasi

#### A. Periksa DNS Propagation
Gunakan tools online:
- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://mxtoolbox.com/

#### B. Test dari Lokasi Berbeda
```bash
# Test dengan Google DNS
nslookup wacanahukum.com 8.8.8.8

# Test dengan Cloudflare DNS
nslookup wacanahukum.com 1.1.1.1
```

#### C. Periksa dengan Browser
1. Buka browser dalam mode incognito
2. Akses https://wacanahukum.com
3. Periksa apakah masih muncul error DNS

### 5. Troubleshooting Lanjutan

#### Jika masih bermasalah:

1. **Clear DNS Cache**:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemctl restart systemd-resolved
   ```

2. **Periksa Firewall/Proxy**:
   - Pastikan tidak ada firewall yang memblokir akses
   - Periksa pengaturan proxy browser

3. **Kontak Provider**:
   - Hubungi provider domain untuk memastikan domain aktif
   - Periksa apakah ada masalah dengan billing/registrasi

### 6. Konfigurasi Website

Website sudah dikonfigurasi dengan benar untuk:
- ✅ Netlify deployment
- ✅ cPanel deployment
- ✅ Domain `wacanahukum.com` sudah dikonfigurasi di semua file

### 7. Checklist Verifikasi

- [ ] Domain sudah terdaftar dan aktif
- [ ] DNS records sudah dikonfigurasi dengan benar
- [ ] Nameserver mengarah ke provider yang benar
- [ ] Website sudah di-deploy ke hosting
- [ ] DNS propagation sudah selesai (bisa memakan waktu 24-48 jam)

### 8. Kontak Support

Jika masalah masih berlanjut:
1. **Provider Domain**: Hubungi provider domain Anda
2. **Provider Hosting**: Hubungi Netlify atau hosting provider
3. **Developer**: Hubungi tim development untuk bantuan teknis

## Status Saat Ini
- ❌ Domain tidak dapat diakses
- ✅ Website sudah dikonfigurasi dengan benar
- ⚠️ Perlu periksa DNS records di provider domain