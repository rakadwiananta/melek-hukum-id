# 🤖 Contoh Prompt untuk AI Article Generation

## Prompt Template Utama

```
Anda adalah ahli hukum Indonesia yang akan membuat artikel edukasi hukum. 
Buat artikel dengan topik: "[TOPIK]"
Kategori: [KATEGORI]

REQUIREMENTS:
1. Gunakan bahasa Indonesia formal tapi mudah dipahami
2. Berikan informasi yang akurat berdasarkan hukum Indonesia terkini (2024/2025)
3. Sertakan contoh konkret dan relevan
4. Hindari memberikan nasihat hukum langsung (hanya informasi)
5. Minimum 1500 kata, maksimum 3000 kata
6. Struktur harus mengikuti format JSON yang diberikan

FORMAT OUTPUT: JSON sesuai struktur FullArticle

STRUKTUR WAJIB:
- Pendahuluan (definisi, konteks, manfaat membaca)
- Dasar Hukum (UU/PP/Permen yang relevan)
- Syarat dan Ketentuan (persyaratan yang harus dipenuhi)
- Prosedur/Langkah-langkah (step-by-step detail)
- Biaya dan Waktu (estimasi realistis)
- Tips Praktis (best practices, hindari masalah)
- Kesimpulan (ringkasan, call to action)

SUMBER HUKUM WAJIB:
- Minimal 3 sumber hukum yang valid
- Preferensi: UU, PP, Permen, data resmi pemerintah
- Format: "UU No. X Tahun YYYY tentang [Judul]"

DISCLAIMER WAJIB:
"Artikel ini bersifat informatif dan edukatif. Untuk kasus spesifik, disarankan berkonsultasi dengan ahli hukum yang kompeten. Informasi dapat berubah sesuai perkembangan regulasi terbaru."
```

## Contoh Prompt Spesifik

### 1. Hukum Perdata - Perceraian

```
Buat artikel tentang "Panduan Lengkap Mengurus Perceraian di Pengadilan Agama 2024"

FOCUS:
- Prosedur cerai gugat dan cerai talak
- Syarat dan dokumen yang diperlukan
- Estimasi biaya dan waktu proses
- Alasan-alasan perceraian yang sah menurut hukum
- Tips praktis untuk mempercepat proses

DASAR HUKUM:
- UU No. 1 Tahun 1974 tentang Perkawinan
- PP No. 9 Tahun 1975
- Kompilasi Hukum Islam (KHI)
- Peraturan Mahkamah Agung tentang Mediasi

TARGET AUDIENCE: Pasangan yang sedang mempertimbangkan perceraian

TONE: Empati tapi tetap objektif dan informatif
```

### 2. Hukum Bisnis - Pendirian PT

```
Buat artikel tentang "Cara Mendirikan PT (Perseroan Terbatas): Panduan Lengkap 2024"

FOCUS:
- Syarat modal minimal dan persyaratan pendiri
- Prosedur pendirian melalui notaris
- Biaya pendirian yang detail
- Kewajiban setelah PT berdiri
- Perbedaan PT dengan CV dan firma

DASAR HUKUM:
- UU No. 40 Tahun 2007 tentang Perseroan Terbatas
- Peraturan Menteri Hukum dan HAM terkait
- Regulasi OSS (Online Single Submission)

TARGET AUDIENCE: Entrepreneur yang ingin mendirikan PT

INCLUDE:
- Flowchart prosedur pendirian
- Checklist dokumen yang diperlukan
- Estimasi timeline dan biaya
- Tips memilih nama PT yang baik
```

### 3. Hukum Pidana - Hak Tersangka

```
Buat artikel tentang "Hak Tersangka dalam Proses Penyidikan: Panduan Lengkap 2024"

FOCUS:
- Hak-hak tersangka berdasarkan KUHAP
- Prosedur penangkapan dan penahanan
- Hak didampingi pengacara
- Cara menghadapi pemeriksaan polisi
- Kapan boleh menolak pemeriksaan

DASAR HUKUM:
- KUHAP (UU No. 8 Tahun 1981)
- UU No. 18 Tahun 2003 tentang Advokat
- Peraturan Kapolri terkait

TARGET AUDIENCE: Masyarakat umum yang ingin memahami hak-haknya

TONE: Memberikan rasa aman dan kepercayaan diri
```

### 4. Panduan Praktis - Dokumen Hilang

```
Buat artikel tentang "Cara Mengurus Dokumen Hilang: KTP, SIM, STNK, Paspor 2024"

FOCUS:
- Prosedur pelaporan ke polisi
- Pengurusan dokumen pengganti di instansi terkait
- Biaya dan waktu proses untuk setiap dokumen
- Tips mencegah kehilangan dokumen
- Layanan online yang tersedia

INCLUDE DATA:
- Statistik dokumen hilang 2024
- Biaya resmi terbaru
- Timeline proses yang realistis
- Lokasi layanan di kota besar

TARGET AUDIENCE: Masyarakat yang kehilangan dokumen penting
```

## 📊 Quality Metrics untuk AI

### Content Structure Score:
- ✅ **Title**: Menarik, SEO-friendly, max 80 karakter
- ✅ **Summary**: 150-200 kata, mencakup poin utama
- ✅ **Sections**: 5-8 section dengan hierarki yang jelas
- ✅ **Word Count**: 1500-3000 kata total
- ✅ **Sources**: Minimal 3 sumber hukum yang valid

### SEO Score:
- ✅ **Primary Keyword**: 1-2% density
- ✅ **Meta Description**: 150-160 karakter
- ✅ **Headings**: Proper H1, H2, H3 structure
- ✅ **Keywords**: 5-8 relevant keywords
- ✅ **Internal Links**: Link ke halaman terkait

### Legal Accuracy Score:
- ✅ **Current Laws**: Menggunakan regulasi terbaru
- ✅ **Accurate Procedures**: Prosedur yang benar dan terkini
- ✅ **Realistic Costs**: Biaya yang sesuai dengan tarif resmi
- ✅ **Proper Disclaimer**: Disclaimer hukum yang tepat
- ✅ **No Legal Advice**: Hanya memberikan informasi, bukan nasihat

## 🔄 Workflow Integration

### 1. AI Content Generation:
```
Input: Topic + Category + Guidelines
↓
AI Processing: Generate structured content
↓
Output: JSON article following template
```

### 2. Content Validation:
```
AI Output → Validation Function → Error Check → Approval
```

### 3. Database Storage:
```
Validated Article → Supabase Insert → Published Content
```

### 4. Website Display:
```
Supabase Data → ArticleTemplateComponent → Live Website
```

## 🎨 Design Features

### Visual Elements:
- **Indonesian Batik Patterns**: Cultural identity
- **3D Card Effects**: Modern and engaging
- **Smooth Animations**: Professional feel
- **Color Coding**: Different colors for different content types
- **Icons**: Lucide icons for better visual hierarchy

### Interactive Features:
- **Table of Contents**: Auto-generated with smooth scroll
- **Share Functionality**: Native share API + clipboard fallback
- **Bookmark System**: Local storage for user preferences
- **Reading Progress**: Visual progress indicator
- **Related Articles**: Automatic suggestions

## 🚀 Production Ready

Template ini sudah:
- ✅ **Tested**: Build berhasil tanpa error
- ✅ **Responsive**: Mobile-first design
- ✅ **Accessible**: Proper ARIA labels dan keyboard navigation
- ✅ **SEO Optimized**: Meta tags dan structured data
- ✅ **Performance**: Lazy loading dan optimized components
- ✅ **Scalable**: Database-driven content management

**Ready untuk generate ratusan artikel berkualitas tinggi!** 🇮🇩✨