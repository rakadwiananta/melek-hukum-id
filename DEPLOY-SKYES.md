# 🚀 Panduan Deploy Next.js di Skyes ID Hosting

## 📋 Prasyarat
- Akun hosting Skyes ID
- Domain yang sudah terdaftar
- Node.js versi 18+ di server
- Akses SSH atau File Manager

## 🔧 Langkah-langkah Deploy

### 1. **Persiapkan File Deploy**
```bash
# Jalankan script deploy
./deploy-skyes.sh
```

### 2. **Upload ke Server**
- Buka File Manager di cPanel Skyes ID
- Navigasi ke `/home/bicarahu/public_html/`
- Upload semua file dari folder `deploy/`

### 3. **Install Dependencies**
```bash
# Via SSH atau Terminal cPanel
cd /home/bicarahu/public_html/
npm install --production
```

### 4. **Konfigurasi Environment**
Edit file `.env.production` dengan nilai yang sebenarnya:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Midtrans (Production)
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_SERVER_KEY=your-production-server-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-production-client-key
```

### 5. **Konfigurasi Domain & SSL**
- Di cPanel, buka "Domains"
- Tambahkan domain Anda
- Aktifkan SSL certificate
- Set document root ke `/public_html`

### 6. **Start Application**
```bash
# Via SSH
cd /home/bicarahu/public_html/
npm run start

# Atau gunakan PM2 untuk production
npm install -g pm2
pm2 start npm --name "melek-hukum" -- start
pm2 save
pm2 startup
```

## 🔄 Auto Deploy dengan Git

### Setup Git Hook
1. Buat repository di GitHub/GitLab
2. Di cPanel, buka "Git Version Control"
3. Clone repository Anda
4. Set up auto-deploy hook

### Update .cpanel.yml
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/bicarahu/public_html/
    - /bin/cp -R .next $DEPLOYPATH
    - /bin/cp -R public $DEPLOYPATH
    - /bin/cp -R package.json $DEPLOYPATH
    - /bin/cp -R package-lock.json $DEPLOYPATH
    - /bin/cp -R next.config.js $DEPLOYPATH
    - /bin/cp -R .env.production $DEPLOYPATH
    - /bin/cp -R .htaccess $DEPLOYPATH
    - cd $DEPLOYPATH && npm install --production
    - cd $DEPLOYPATH && pm2 restart melek-hukum
```

## 🛠️ Troubleshooting

### Error: "next: command not found"
```bash
# Install dependencies
npm install --production
```

### Error: "Port already in use"
```bash
# Kill existing process
pkill -f "next start"
# Atau gunakan port berbeda
PORT=3001 npm run start
```

### Error: "Module not found"
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install --production
```

### Performance Issues
```bash
# Enable gzip compression di .htaccess
# Aktifkan caching
# Gunakan CDN untuk static assets
```

## 📊 Monitoring

### PM2 Commands
```bash
# Status aplikasi
pm2 status

# Logs
pm2 logs melek-hukum

# Restart
pm2 restart melek-hukum

# Monitor resources
pm2 monit
```

### Performance Monitoring
- Gunakan Google Analytics
- Monitor Core Web Vitals
- Check server resources di cPanel

## 🔒 Security Checklist

- [ ] SSL certificate aktif
- [ ] Environment variables aman
- [ ] Headers security di .htaccess
- [ ] Rate limiting aktif
- [ ] Backup otomatis
- [ ] Firewall aktif

## 📞 Support

Jika mengalami masalah:
1. Cek error logs di cPanel
2. Hubungi support Skyes ID
3. Cek dokumentasi Next.js
4. Review konfigurasi environment

---

**Catatan**: Pastikan semua environment variables sudah dikonfigurasi dengan benar sebelum deploy ke production.