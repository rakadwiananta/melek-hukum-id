# 🤖 AI Article Template System untuk Melek Hukum ID

Sistem template artikel yang dirancang khusus untuk AI agar dapat menghasilkan konten hukum yang konsisten, akurat, dan berkualitas tinggi.

## 📋 Overview

Template ini menyelesaikan masalah:
- ✅ **Pengulangan penomoran** dalam artikel
- ✅ **Inkonsistensi struktur** konten
- ✅ **Kualitas konten** yang bervariasi
- ✅ **Integrasi database** yang mudah

## 🏗️ Struktur Template

### 1. **AIArticleTemplate.ts**
Template utama dengan interface dan guidelines untuk AI:
- `ArticleMetadata` - Metadata artikel (title, category, tags, dll)
- `ArticleSection` - Struktur section dengan subsection
- `ARTICLE_GUIDELINES` - Panduan penulisan untuk AI
- `SUGGESTED_TOPICS` - 30+ topik artikel yang direkomendasikan
- `AI_ARTICLE_PROMPT` - Template prompt untuk AI

### 2. **SupabaseSchema.sql**
Schema database lengkap untuk Supabase:
- `articles` table - Metadata artikel
- `article_sections` table - Section artikel
- `article_subsections` table - Subsection artikel  
- `article_sources` table - Sumber hukum
- `related_articles` table - Artikel terkait
- RLS policies untuk keamanan
- Indexes untuk performance

### 3. **SupabaseIntegration.ts**
Functions untuk CRUD operations:
- `createArticle()` - Simpan artikel ke database
- `getArticleBySlug()` - Ambil artikel berdasarkan slug
- `searchArticles()` - Pencarian artikel
- `validateArticle()` - Validasi data artikel
- Helper functions untuk AI

### 4. **ContentExamples.json**
Contoh artikel lengkap:
- Artikel perceraian di Pengadilan Agama
- Artikel pendirian PT
- Template konten untuk berbagai section
- Panduan penulisan untuk AI

## 🚀 Cara Penggunaan untuk AI

### Step 1: Setup Supabase
```sql
-- Jalankan SupabaseSchema.sql di Supabase SQL Editor
-- Setup environment variables:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 2: Generate Artikel dengan AI
```typescript
import { generateAIPrompt } from './SupabaseIntegration'

// Generate prompt untuk AI
const prompt = generateAIPrompt("Cara Mengurus Perceraian", "hukum-keluarga")

// AI menggunakan prompt ini untuk generate artikel dalam format JSON
```

### Step 3: Validasi dan Simpan
```typescript
import { validateArticle, createArticle } from './SupabaseIntegration'

// Validasi artikel dari AI
const validation = validateArticle(aiGeneratedArticle)

if (validation.valid) {
  // Simpan ke Supabase
  const result = await createArticle(aiGeneratedArticle)
}
```

## 📝 Format Artikel yang Dihasilkan AI

### Struktur Penomoran yang Benar:
```
1. Pendahuluan
2. Dasar Hukum
3. Syarat dan Ketentuan
   3.1 Syarat Substantif
   3.2 Syarat Administratif
4. Prosedur dan Langkah-langkah
   4.1 Persiapan Dokumen
   4.2 Pengajuan Permohonan
   4.3 Proses Sidang
5. Biaya dan Waktu
6. Tips Praktis
7. Kesimpulan
```

### Tidak Ada Lagi:
- ❌ Penomoran ganda (1. 1. atau 2. 2.)
- ❌ Konten yang berulang
- ❌ Struktur yang tidak konsisten
- ❌ Informasi yang tidak akurat

## 🎯 Guidelines untuk AI

### Content Quality:
- **Minimum 1500 kata** per artikel
- **Maximum 3000 kata** per artikel
- **Tone**: Professional tapi mudah dipahami
- **Audience**: Masyarakat umum dengan pengetahuan hukum dasar

### Legal Accuracy:
- ✅ Referensi UU/PP/Permen yang akurat
- ✅ Informasi terkini (2024/2025)
- ✅ Prosedur yang benar
- ✅ Biaya dan waktu yang realistis
- ✅ Disclaimer yang tepat

### SEO Optimization:
- **Primary keyword** di title dan H1
- **Secondary keywords** di H2 dan content
- **Meta description** 150-160 karakter
- **Internal linking** ke artikel/halaman terkait

## 📊 Topik Artikel yang Direkomendasikan

### Hukum Perdata (7 topik):
1. Cara Mengurus Perceraian Gugat di Pengadilan Negeri
2. Panduan Pembagian Harta Waris Menurut KUHPerdata
3. Prosedur Jual Beli Tanah yang Aman dan Sah
4. Hak dan Kewajiban dalam Perjanjian Sewa Menyewa
5. Cara Mengurus Adopsi Anak di Indonesia
6. Panduan Membuat Wasiat yang Sah Secara Hukum
7. Prosedur Pengurusan Hak Tanggungan untuk Kredit Rumah

### Hukum Pidana (6 topik):
1. Hak Tersangka dalam Proses Penyidikan Polisi
2. Cara Menghadapi Pemeriksaan di Kepolisian
3. Panduan Melaporkan Tindak Pidana Penipuan Online
4. Prosedur Pelaporan Kekerasan Dalam Rumah Tangga
5. Hak Korban dalam Proses Peradilan Pidana
6. Cara Mengurus Rehabilitasi Nama Baik

### Hukum Bisnis (6 topik):
1. Panduan Mendirikan CV (Comanditaire Vennootschap)
2. Cara Mengurus Izin Usaha OSS (Online Single Submission)
3. Prosedur Pendirian Yayasan dan Perkumpulan
4. Hak dan Kewajiban Pekerja Menurut UU Ketenagakerjaan
5. Cara Mengatasi Sengketa Kontrak Bisnis
6. Panduan Merger dan Akuisisi Perusahaan

### Hukum Keluarga (6 topik):
1. Prosedur Pernikahan Beda Agama di Indonesia
2. Cara Mengurus Isbat Nikah di Pengadilan Agama
3. Hak Asuh Anak Setelah Perceraian
4. Panduan Nafkah Anak dan Istri Pasca Perceraian
5. Cara Mengurus Pengangkatan Anak (Adopsi)
6. Prosedur Perwalian untuk Anak Yatim

### Panduan Praktis (6 topik):
1. Cara Mengurus BPJS Kesehatan untuk Keluarga
2. Panduan Mengurus Sertifikat Tanah yang Hilang
3. Prosedur Pelaporan Pajak Tahunan untuk UMKM
4. Cara Mengurus Visa dan Paspor untuk Umroh
5. Panduan Pengurusan Akta Kelahiran Anak
6. Cara Mengurus Surat Keterangan Catatan Kepolisian

## 🔧 Integrasi dengan Project

### Import Template:
```typescript
import { FullArticle } from '@/app/components/article/templates/ArticleTemplate'
import { createArticle, getArticleBySlug } from '@/app/components/article/templates/SupabaseIntegration'
```

### Generate Artikel:
```typescript
// AI generates article using the prompt template
const article: FullArticle = aiGeneratedContent

// Validate and save
const validation = validateArticle(article)
if (validation.valid) {
  await createArticle(article)
}
```

### Display Artikel:
```typescript
// Use existing ArticleTemplateComponent
import ArticleTemplateComponent from '@/app/components/article/templates/ArticleTemplate'

export default function ArticlePage({ slug }: { slug: string }) {
  const { data: article } = await getArticleBySlug(slug)
  return <ArticleTemplateComponent article={article} />
}
```

## 📈 Benefits untuk AdSense

### Content Quality:
- **Consistent Structure**: Semua artikel mengikuti format yang sama
- **Professional Layout**: Design yang menarik dan mudah dibaca
- **Accurate Information**: Validasi konten hukum yang ketat
- **SEO Optimized**: Meta tags dan struktur yang SEO-friendly

### User Experience:
- **Easy Navigation**: Table of contents dan section links
- **Interactive Elements**: Share, bookmark, smooth scrolling
- **Mobile Responsive**: Optimal di semua device
- **Fast Loading**: Efficient component structure

### Technical Excellence:
- **Database Driven**: Content management yang scalable
- **Type Safe**: Full TypeScript support
- **Performance**: Optimized queries dan caching
- **Maintainable**: Clean code structure

## 🎯 Next Steps

1. **Setup Supabase**: Jalankan schema SQL
2. **Configure Environment**: Set environment variables
3. **Test Integration**: Buat artikel test menggunakan AI
4. **Deploy**: Push ke production
5. **Monitor**: Track performance dan user engagement

Template ini siap digunakan untuk menghasilkan **ratusan artikel hukum berkualitas tinggi** yang akan meningkatkan authority website dan peluang approval AdSense! 🇮🇩✨