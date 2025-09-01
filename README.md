# 🏛️ Melek Hukum ID

Platform edukasi hukum digital yang membantu masyarakat Indonesia memahami hukum dengan mudah dan praktis.

## 🚀 Quick Deploy

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rakadwiananta/wacana-hukum)

1. Klik tombol di atas atau kunjungi [vercel.com](https://vercel.com)
2. Import repository dari GitHub
3. Konfigurasi environment variables
4. Deploy!

### Manual Setup
```bash
# Clone repository
git clone https://github.com/rakadwiananta/wacana-hukum.git
cd wacana-hukum

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Fitur Utama

- 📚 **Kamus Hukum Digital** - Penjelasan istilah hukum dalam bahasa yang mudah dipahami
- 📖 **Artikel Hukum** - Artikel informatif tentang berbagai topik hukum
- 📝 **Template Dokumen** - Template surat dan dokumen hukum yang bisa didownload
- 🧮 **Kalkulator Denda** - Menghitung denda pelanggaran lalu lintas
- ❓ **Kuis Anti-Korupsi** - Edukasi anti-korupsi interaktif
- 💳 **Integrasi Pembayaran** - Pembayaran via Midtrans
- 📊 **Analytics Dashboard** - Monitoring performa website

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Payment**: Midtrans
- **Analytics**: Google Analytics
- **Deployment**: Vercel

## 📁 Project Structure

```
wacana-hukum/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main layout pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
├── types/                 # TypeScript types
└── content/               # Content files
```

## 🔧 Environment Variables

Buat file `.env.local` dengan variabel berikut:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Midtrans
MIDTRANS_SERVER_KEY=your-server-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_IS_PRODUCTION=false
```

## 🚀 Deployment

### Vercel (Recommended)
- ✅ Auto-deploy dari GitHub
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Edge Functions

Lihat [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) untuk panduan lengkap.

### Skyes ID Hosting
- ✅ Shared hosting support
- ✅ Custom domain
- ✅ SSL certificate

Lihat [DEPLOY-SKYES.md](./DEPLOY-SKYES.md) untuk panduan lengkap.

## 📊 Performance

- ⚡ **Lighthouse Score**: 90+
- 📱 **Mobile Optimized**
- 🔍 **SEO Optimized**
- 🚀 **Fast Loading**

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- **Website**: [wacanahukum.com](https://wacanahukum.com)
- **Email**: info@wacanahukum.com
- **GitHub**: [@wacanahukum](https://github.com/wacanahukum)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

---

**Made with ❤️ for Indonesia**