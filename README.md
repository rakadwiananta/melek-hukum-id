# Melek Hukum ID

Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. Pelajari hukum dengan mudah, praktis, dan gratis.

## 🎯 Tentang Project

Melek Hukum ID adalah platform edukasi hukum yang bertujuan untuk:
- **Mengedukasi masyarakat** tentang hukum Indonesia
- **Memberikan solusi praktis** untuk masalah hukum sehari-hari
- **Mengajarkan anti-korupsi** dan cara melapor korupsi
- **Menyediakan kamus hukum** yang mudah dipahami
- **Membuat regulasi** yang mudah diakses

## 🚀 Fitur Utama

### 📚 Kamus Hukum
- Penjelasan istilah hukum dalam bahasa yang mudah dipahami
- Kategori hukum yang terorganisir
- Pencarian cepat dan akurat

### 💡 Solusi Hukum
- Template dokumen hukum
- Panduan langkah demi langkah
- Solusi untuk masalah hukum umum

### 📋 Regulasi
- Database peraturan perundang-undangan
- Penjelasan regulasi terkini
- Update regulasi terbaru

### 🛡️ Anti Korupsi
- Edukasi tentang korupsi
- Cara melapor korupsi
- Kuis pengetahuan anti-korupsi

### 🛠️ Tools Interaktif
- **Kalkulator Denda**: Menghitung denda berdasarkan pelanggaran
- **Kuis Korupsi**: Test pengetahuan anti-korupsi
- **Template Dokumen**: Dokumen hukum siap pakai

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **Database**: Supabase 2.53.0
- **Analytics**: Google Analytics
- **Ads**: Google AdSense
- **Animations**: Framer Motion 12.23.12
- **Performance**: Core Web Vitals monitoring
- **UI Components**: Lucide React 0.535.0
- **Utilities**: clsx, tailwind-merge, zod

## 📁 Struktur Project

```
melek-hukum-id/
├── app/
│   ├── (main)/
│   │   ├── layout.tsx          # Layout utama
│   │   ├── page.tsx            # Halaman beranda
│   │   ├── kamus-hukum/        # Kamus hukum
│   │   ├── solusi/             # Solusi hukum
│   │   ├── regulasi/           # Regulasi
│   │   ├── anti-korupsi/       # Anti korupsi
│   │   ├── artikel/            # Artikel hukum
│   │   └── tools/              # Tools interaktif
│   │       ├── kalkulator-denda/
│   │       └── kuis-korupsi/
│   ├── api/                    # API routes
│   │   ├── newsletter/
│   │   └── search/
│   ├── components/
│   │   ├── ui/                 # UI components
│   │   ├── layout/             # Layout components
│   │   ├── home/               # Home page components
│   │   ├── article/            # Article components
│   │   ├── solusi/             # Solusi components
│   │   ├── tools/              # Tools components
│   │   ├── ads/                # Advertisement components
│   │   ├── analytics/          # Analytics components
│   │   └── seo/                # SEO components
│   └── lib/                    # Utility functions
│       └── supabase/
├── public/                     # Static assets
├── styles/                     # Global styles
└── types/                      # TypeScript types
```

## Setup Environment Variables

1. Copy file `env.example` ke `.env.local`:
```bash
cp env.example .env.local
```

2. Edit file `.env.local` dan isi dengan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

3. Dapatkan kredensial dari dashboard Supabase:
   - Buka project Supabase Anda
   - Pergi ke Settings > API
   - Copy URL dan anon key
   - Untuk service role key, gunakan untuk operasi server-side

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/your-username/melek-hukum-id.git
cd melek-hukum-id
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Isi file `.env.local` dengan:
```env
NEXT_PUBLIC_SITE_URL=https://melekhukum.id
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your-adsense-client-id
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## 📜 Scripts

```bash
# Development
npm run dev          # Start development server dengan Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Komponen Utama

### Layout Components
- `Header` - Navigation header dengan mobile menu
- `Footer` - Footer dengan links dan social media
- `MobileNav` - Mobile navigation
- `DesktopNav` - Desktop navigation
- `SpectacularNav` - Navigation dengan efek spectacular

### UI Components
- `PageHeader` - Header halaman dengan breadcrumb
- `CategoryNav` - Navigation kategori
- `ArticleGrid` - Grid artikel
- `SearchBar` - Pencarian
- `Toaster` - Toast notifications
- `NewsletterForm` - Form newsletter
- `SpectacularCard` - Card dengan efek spectacular
- `SpectacularLoader` - Loading dengan efek spectacular

### Home Components
- `HeroSection` - Hero section beranda
- `FeaturedArticles` - Artikel unggulan
- `CategoryGrid` - Grid kategori
- `Newsletter` - Newsletter section
- `SpectacularHero` - Hero dengan efek spectacular

### Tools Components
- `QuizQuestion` - Komponen pertanyaan kuis
- `QuizResult` - Hasil kuis

### Article Components
- `ArticleContent` - Konten artikel
- `ShareModal` - Modal berbagi artikel

### Solusi Components
- `SolutionCards` - Card solusi hukum
- `TemplateSection` - Section template dokumen

### Kamus Components
- `TermsList` - Daftar istilah hukum

## 🔧 Konfigurasi

### Tailwind CSS 3.4.17
Project menggunakan Tailwind CSS dengan konfigurasi custom untuk:
- Color scheme yang konsisten (primary: red, secondary: blue)
- Typography yang optimal dengan @tailwindcss/typography
- Responsive design dengan breakpoints custom
- Custom animations (float, gradient, morph, glow)
- Background patterns

### TypeScript
- Strict mode enabled
- Path mapping untuk import yang mudah (`@/*`)
- Type definitions untuk semua komponen
- Module resolution: bundler

### Performance
- Core Web Vitals monitoring
- Image optimization
- Code splitting
- Lazy loading
- Turbopack untuk development yang lebih cepat

## 📊 Analytics & SEO

### Google Analytics
- Page view tracking
- Event tracking
- Conversion tracking
- Performance monitoring

### SEO
- Meta tags optimization
- Open Graph tags
- Twitter Cards
- Structured data
- Sitemap generation

### AdSense
- Header banner ads
- In-content ads
- Mobile ads
- Responsive ads

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables
4. Deploy otomatis

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Contact

- **Website**: [melekhukum.id](https://melekhukum.id)
- **Email**: info@melekhukum.id
- **Twitter**: [@melekhukumid](https://twitter.com/melekhukumid)

## 🙏 Acknowledgments

- Next.js team untuk framework yang luar biasa
- Tailwind CSS untuk styling yang efisien
- Supabase untuk backend yang powerful
- Google untuk analytics dan ads
- Komunitas open source Indonesia

---

**Made with ❤️ for Indonesia**