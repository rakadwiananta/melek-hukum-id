# Troubleshooting Website wacanahukum.com

## 🚨 Masalah Saat Ini
Website `wacanahukum.com` tidak dapat diakses dengan error:
```
DNS_PROBE_FINISHED_NXDOMAIN
This site can't be reached
```

## 📋 Evaluasi Lengkap

### ✅ Yang Sudah Benar
1. **Website Configuration**: Semua file konfigurasi sudah benar
2. **Next.js Setup**: Project Next.js sudah dikonfigurasi dengan baik
3. **Netlify Config**: File `netlify.toml` sudah ada dan benar
4. **cPanel Config**: File `.cpanel.yml` sudah ada
5. **Domain Config**: Domain `wacanahukum.com` sudah dikonfigurasi di semua file

### ❌ Yang Perlu Diperbaiki
1. **DNS Records**: Domain tidak memiliki A record yang valid
2. **Domain Registration**: Perlu memastikan domain masih aktif
3. **Deployment**: Website mungkin belum di-deploy ke hosting

## 🔧 Solusi Langkah demi Langkah

### Langkah 1: Periksa Status Domain
```bash
# Jalankan script untuk cek status
./check-deployment.sh
```

### Langkah 2: Build Website
```bash
# Jalankan script build dan test
./build-and-test.sh
```

### Langkah 3: Deploy Website

#### Opsi A: Deploy ke Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

#### Opsi B: Deploy ke cPanel
1. Upload semua file ke `public_html/`
2. Jalankan di server:
   ```bash
   npm install
   npm run build
   ```

### Langkah 4: Konfigurasi DNS

#### Untuk Netlify:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: wacanahukum.com
```

#### Untuk cPanel:
```
Type: A
Name: @
Value: [IP_SERVER_ANDA]

Type: CNAME
Name: www
Value: wacanahukum.com
```

### Langkah 5: Set Nameserver

#### Netlify Nameservers:
```
ns1.netlify.com
ns2.netlify.com
ns3.netlify.com
```

## 📁 File yang Dibuat

1. **`DNS_TROUBLESHOOTING.md`** - Panduan troubleshooting DNS
2. **`fix-dns-config.md`** - Langkah-langkah perbaikan DNS
3. **`check-dns.sh`** - Script untuk cek DNS records
4. **`check-deployment.sh`** - Script untuk cek status deployment
5. **`build-and-test.sh`** - Script untuk build dan test website
6. **`.env.local`** - Environment variables

## 🛠️ Tools yang Digunakan

### Online DNS Checkers:
- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://mxtoolbox.com/

### Performance Monitoring:
- https://pagespeed.web.dev/
- https://search.google.com/search-console
- https://analytics.google.com/

## 📞 Kontak Support

### Provider Domain
- Cek status domain di provider domain Anda
- Pastikan domain tidak expired
- Periksa DNS records

### Provider Hosting
- **Netlify**: https://app.netlify.com/support
- **cPanel**: Hubungi provider hosting Anda

### Developer
- Hubungi tim development untuk bantuan teknis

## ⏰ Timeline Perbaikan

1. **Immediate (0-2 jam)**: Periksa status domain dan DNS
2. **Short term (2-24 jam)**: Deploy website dan konfigurasi DNS
3. **Medium term (24-48 jam)**: Tunggu DNS propagation
4. **Long term (48+ jam)**: Monitoring dan optimasi

## 🔍 Checklist Verifikasi

- [ ] Domain terdaftar dan aktif
- [ ] DNS records dikonfigurasi dengan benar
- [ ] Nameserver diset ke provider yang benar
- [ ] Website di-deploy ke hosting
- [ ] Environment variables diset
- [ ] SSL certificate aktif
- [ ] Website dapat diakses dari browser
- [ ] Performance optimal
- [ ] Monitoring aktif

## 🚀 Langkah Selanjutnya

1. **Jalankan script build**: `./build-and-test.sh`
2. **Deploy website** ke Netlify atau cPanel
3. **Konfigurasi DNS** di provider domain
4. **Tunggu propagation** (24-48 jam)
5. **Monitor performance** dan uptime

## 📊 Status Monitoring

Setelah website berjalan, setup monitoring:
- **Uptime**: UptimeRobot atau Pingdom
- **Performance**: Google PageSpeed Insights
- **SEO**: Google Search Console
- **Analytics**: Google Analytics

---

**Catatan**: Jika masalah masih berlanjut setelah mengikuti semua langkah di atas, hubungi provider domain atau hosting untuk bantuan lebih lanjut.