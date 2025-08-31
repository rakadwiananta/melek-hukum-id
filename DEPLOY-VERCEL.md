# 🚀 Panduan Deploy Next.js di Vercel

## 📋 Prasyarat
- Akun Vercel (gratis)
- Repository GitHub/GitLab/Bitbucket
- Project Next.js yang sudah siap

## 🔧 Langkah-langkah Deploy

### 1. **Persiapkan Repository**
✅ Repository sudah di-push ke GitHub
✅ File `vercel.json` sudah ditambahkan
✅ Environment variables siap

### 2. **Deploy ke Vercel**

#### **Metode 1: Import dari GitHub**
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"New Project"**
4. Pilih repository `melek-hukum-id`
5. Vercel akan otomatis mendeteksi Next.js
6. Klik **"Deploy"**

#### **Metode 2: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Untuk production
vercel --prod
```

### 3. **Konfigurasi Environment Variables**

Di dashboard Vercel, tambahkan environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Analytics & AdSense
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-9240032692197811
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=
NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=
NEXT_PUBLIC_ADSENSE_SLOT_MOBILE=

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Melek Hukum ID
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

# Midtrans Payment
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_SERVER_KEY=your-production-server-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-production-client-key
MIDTRANS_FIXED_PRICE=10000
MIDTRANS_ALLOWED_PAYMENT_TYPES=qris,gopay,bank_transfer
MIDTRANS_DEFAULT_PAYMENT_TYPE=qris
MIDTRANS_FINISH_URL=https://your-domain.vercel.app/payment-success
MIDTRANS_ERROR_URL=https://your-domain.vercel.app/payment-error
```

### 4. **Custom Domain (Opsional)**
1. Di dashboard Vercel, buka project
2. Klik **"Settings"** → **"Domains"**
3. Tambahkan domain Anda
4. Ikuti instruksi untuk setup DNS

## 🔄 Auto Deploy

### **GitHub Integration**
- Setiap push ke `master` akan auto-deploy
- Setiap pull request akan membuat preview deployment
- Branch protection bisa diaktifkan

### **Deploy Hooks**
```bash
# Trigger manual deploy
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_xxx
```

## 📊 Monitoring & Analytics

### **Vercel Analytics**
- Real-time performance monitoring
- Core Web Vitals tracking
- Error tracking

### **Logs**
```bash
# View deployment logs
vercel logs

# View function logs
vercel logs --function=api/example
```

## 🛠️ Troubleshooting

### **Build Errors**
```bash
# Test build locally
npm run build

# Check Vercel build logs
vercel logs --build
```

### **Environment Variables**
- Pastikan semua variables sudah diset di Vercel
- Gunakan prefix `NEXT_PUBLIC_` untuk client-side variables

### **Performance Issues**
- Aktifkan Vercel Analytics
- Optimize images dengan Next.js Image component
- Gunakan caching strategies

## 🔒 Security

### **Headers Security**
Sudah dikonfigurasi di `vercel.json`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### **Environment Variables**
- Jangan commit sensitive data
- Gunakan Vercel's encrypted environment variables

## 📈 Performance Optimization

### **Vercel Features**
- Edge Functions untuk API routes
- Automatic image optimization
- Global CDN
- Automatic HTTPS

### **Next.js Optimizations**
- Static generation (SSG)
- Incremental Static Regeneration (ISR)
- Dynamic imports
- Image optimization

## 🎯 Best Practices

### **Development**
```bash
# Local development
npm run dev

# Preview production build
npm run build && npm run start
```

### **Deployment**
- Test di staging environment
- Use feature flags untuk gradual rollout
- Monitor performance metrics

### **Maintenance**
- Regular dependency updates
- Monitor Vercel usage limits
- Backup environment variables

## 📞 Support

### **Vercel Support**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Status](https://vercel-status.com)

### **Next.js Support**
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)

---

## 🎉 Deployment Checklist

- [ ] Repository di-push ke GitHub ✅
- [ ] Vercel project dibuat ✅
- [ ] Environment variables dikonfigurasi
- [ ] Custom domain diset (opsional)
- [ ] SSL certificate aktif ✅
- [ ] Performance monitoring aktif
- [ ] Error tracking aktif
- [ ] Backup strategy siap

**Status**: 🚀 Ready for Vercel deployment!