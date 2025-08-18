// AI Article Template System for Supabase Integration
// This template can be used by AI to generate consistent, high-quality legal articles

export interface ArticleMetadata {
  id: string
  title: string
  subtitle?: string
  slug: string
  category: 'hukum-perdata' | 'hukum-pidana' | 'hukum-bisnis' | 'hukum-keluarga' | 'hukum-tata-negara' | 'anti-korupsi' | 'panduan-praktis'
  subcategory?: string
  tags: string[]
  author: string
  publishedAt: string
  updatedAt?: string
  readTime: string // e.g., "10 menit"
  difficulty: 'pemula' | 'menengah' | 'lanjutan'
  summary: string
  metaDescription: string
  keywords: string[]
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  viewCount?: number
  likeCount?: number
  shareCount?: number
}

export interface ArticleSection {
  id: string
  order: number
  title: string
  content: string
  contentType: 'paragraph' | 'numbered-list' | 'bullet-list' | 'quote' | 'warning' | 'info' | 'success' | 'code' | 'table'
  subsections?: ArticleSubsection[]
}

export interface ArticleSubsection {
  id: string
  order: number
  title: string
  content: string
  contentType: 'paragraph' | 'numbered-list' | 'bullet-list' | 'quote' | 'warning' | 'info' | 'success'
}

export interface ArticleSource {
  id: string
  title: string
  type: 'undang-undang' | 'peraturan-pemerintah' | 'peraturan-menteri' | 'putusan-pengadilan' | 'jurnal' | 'buku' | 'website'
  url?: string
  year?: number
  description?: string
}

export interface RelatedArticle {
  id: string
  title: string
  slug: string
  category: string
  readTime: string
}

export interface FullArticle {
  metadata: ArticleMetadata
  sections: ArticleSection[]
  sources: ArticleSource[]
  relatedArticles?: RelatedArticle[]
  disclaimer?: string
  callToAction?: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

// Template Generator Functions for AI

export const generateArticleStructure = (topic: string, category: string): Partial<FullArticle> => {
  const baseStructure: Partial<FullArticle> = {
    metadata: {
      id: generateId(),
      title: '', // AI should fill this
      slug: generateSlug(topic),
      category: category as any,
      tags: [],
      author: 'Tim Ahli Hukum Melek Hukum ID',
      publishedAt: new Date().toISOString(),
      readTime: '10 menit',
      difficulty: 'pemula',
      summary: '',
      metaDescription: '',
      keywords: [],
      featured: false,
      status: 'draft'
    },
    sections: [
      {
        id: 'pendahuluan',
        order: 1,
        title: 'Pendahuluan',
        content: '',
        contentType: 'paragraph'
      },
      {
        id: 'dasar-hukum',
        order: 2,
        title: 'Dasar Hukum',
        content: '',
        contentType: 'numbered-list'
      },
      {
        id: 'prosedur',
        order: 3,
        title: 'Prosedur dan Langkah-Langkah',
        content: '',
        contentType: 'numbered-list',
        subsections: []
      },
      {
        id: 'tips-praktis',
        order: 4,
        title: 'Tips Praktis',
        content: '',
        contentType: 'bullet-list'
      },
      {
        id: 'kesimpulan',
        order: 5,
        title: 'Kesimpulan',
        content: '',
        contentType: 'paragraph'
      }
    ],
    sources: [],
    disclaimer: 'Artikel ini bersifat informatif dan edukatif. Untuk kasus spesifik, disarankan berkonsultasi dengan ahli hukum yang kompeten. Informasi dapat berubah sesuai perkembangan regulasi terbaru.'
  }

  return baseStructure
}

// Helper Functions
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Content Guidelines for AI
export const ARTICLE_GUIDELINES = {
  structure: {
    title: {
      maxLength: 80,
      shouldInclude: ['actionable words', 'year 2024/2025', 'specific topic'],
      examples: [
        'Panduan Lengkap Mengurus Perceraian di Indonesia 2024',
        'Cara Mendirikan PT: Syarat, Biaya, dan Prosedur Terbaru',
        'Hak dan Kewajiban Suami Istri dalam Perkawinan Islam'
      ]
    },
    summary: {
      maxLength: 200,
      shouldInclude: ['main topic', 'key benefits', 'target audience'],
      format: 'Panduan [topic] untuk [audience], termasuk [key points] berdasarkan [legal basis]'
    },
    sections: {
      minSections: 4,
      maxSections: 8,
      recommendedOrder: [
        'Pendahuluan/Pengertian',
        'Dasar Hukum',
        'Syarat dan Ketentuan',
        'Prosedur/Langkah-langkah',
        'Biaya dan Waktu',
        'Tips Praktis',
        'FAQ/Pertanyaan Umum',
        'Kesimpulan'
      ]
    },
    content: {
      minWordsPerSection: 150,
      maxWordsPerSection: 500,
      tone: 'formal but accessible',
      language: 'Indonesian (Bahasa Indonesia)',
      includeExamples: true,
      includeStatistics: true
    }
  },
  
  legal_accuracy: {
    mustInclude: [
      'Specific law references (UU No. X Tahun YYYY)',
      'Current regulations (2024/2025)',
      'Accurate procedures',
      'Realistic costs and timeframes',
      'Proper disclaimers'
    ],
    mustAvoid: [
      'Outdated information',
      'Misleading claims',
      'Legal advice (only provide information)',
      'Guaranteed outcomes',
      'Free legal services claims'
    ]
  },

  seo_optimization: {
    keywords: {
      primary: 1, // Main keyword in title and H1
      secondary: 3, // Related keywords throughout content
      longTail: 5 // Specific phrases in subsections
    },
    structure: {
      h1: 1, // Article title
      h2: '4-8', // Main sections
      h3: '0-12', // Subsections
      wordCount: '1500-3000',
      readability: 'Grade 8-10 (accessible to general public)'
    }
  }
}

// Sample Topics for AI to Generate
export const SUGGESTED_TOPICS = {
  'hukum-perdata': [
    'Cara Mengurus Perceraian Gugat di Pengadilan Negeri',
    'Panduan Pembagian Harta Waris Menurut KUHPerdata',
    'Prosedur Jual Beli Tanah yang Aman dan Sah',
    'Hak dan Kewajiban dalam Perjanjian Sewa Menyewa',
    'Cara Mengurus Adopsi Anak di Indonesia',
    'Panduan Membuat Wasiat yang Sah Secara Hukum',
    'Prosedur Pengurusan Hak Tanggungan untuk Kredit Rumah'
  ],
  'hukum-pidana': [
    'Hak Tersangka dalam Proses Penyidikan Polisi',
    'Cara Menghadapi Pemeriksaan di Kepolisian',
    'Panduan Melaporkan Tindak Pidana Penipuan Online',
    'Prosedur Pelaporan Kekerasan Dalam Rumah Tangga',
    'Hak Korban dalam Proses Peradilan Pidana',
    'Cara Mengurus Rehabilitasi Nama Baik'
  ],
  'hukum-bisnis': [
    'Panduan Mendirikan CV (Comanditaire Vennootschap)',
    'Cara Mengurus Izin Usaha OSS (Online Single Submission)',
    'Prosedur Pendirian Yayasan dan Perkumpulan',
    'Hak dan Kewajiban Pekerja Menurut UU Ketenagakerjaan',
    'Cara Mengatasi Sengketa Kontrak Bisnis',
    'Panduan Merger dan Akuisisi Perusahaan'
  ],
  'hukum-keluarga': [
    'Prosedur Pernikahan Beda Agama di Indonesia',
    'Cara Mengurus Isbat Nikah di Pengadilan Agama',
    'Hak Asuh Anak Setelah Perceraian',
    'Panduan Nafkah Anak dan Istri Pasca Perceraian',
    'Cara Mengurus Pengangkatan Anak (Adopsi)',
    'Prosedur Perwalian untuk Anak Yatim'
  ],
  'panduan-praktis': [
    'Cara Mengurus BPJS Kesehatan untuk Keluarga',
    'Panduan Mengurus Sertifikat Tanah yang Hilang',
    'Prosedur Pelaporan Pajak Tahunan untuk UMKM',
    'Cara Mengurus Visa dan Paspor untuk Umroh',
    'Panduan Pengurusan Akta Kelahiran Anak',
    'Cara Mengurus Surat Keterangan Catatan Kepolisian'
  ]
}

// AI Prompt Template
export const AI_ARTICLE_PROMPT = `
Buat artikel hukum Indonesia dengan struktur berikut:

METADATA:
- Title: [Judul yang menarik dan SEO-friendly, max 80 karakter]
- Category: [Pilih dari: hukum-perdata, hukum-pidana, hukum-bisnis, hukum-keluarga, hukum-tata-negara, anti-korupsi, panduan-praktis]
- Tags: [5-8 tag relevan]
- Summary: [Ringkasan 150-200 kata]
- ReadTime: [Estimasi waktu baca]
- Difficulty: [pemula/menengah/lanjutan]

SECTIONS (gunakan struktur ini):
1. Pendahuluan
   - Definisi dan konteks
   - Mengapa topik ini penting
   - Apa yang akan dipelajari pembaca

2. Dasar Hukum
   - UU/Peraturan yang relevan
   - Pasal-pasal penting
   - Perubahan regulasi terbaru

3. Syarat dan Ketentuan
   - Persyaratan yang harus dipenuhi
   - Dokumen yang diperlukan
   - Kriteria kelayakan

4. Prosedur dan Langkah-langkah
   - Step-by-step yang detail
   - Timeline yang realistis
   - Tips untuk setiap langkah

5. Biaya dan Waktu
   - Breakdown biaya yang akurat
   - Estimasi waktu proses
   - Faktor yang mempengaruhi

6. Tips Praktis
   - Best practices
   - Hal yang harus dihindari
   - Solusi masalah umum

7. FAQ (opsional)
   - 5-8 pertanyaan umum
   - Jawaban yang komprehensif

8. Kesimpulan
   - Ringkasan poin utama
   - Call to action yang relevan

GUIDELINES:
- Gunakan bahasa Indonesia yang formal tapi mudah dipahami
- Sertakan contoh konkret dan relevan
- Berikan informasi yang akurat dan terkini (2024/2025)
- Hindari memberikan nasihat hukum langsung
- Selalu sertakan disclaimer
- Gunakan data dan statistik jika tersedia
- Minimum 1500 kata, maksimum 3000 kata

SOURCES:
- Minimal 3 sumber hukum yang valid
- Preferensi: UU, PP, Permen, Putusan MA, data resmi
- Format: "UU No. X Tahun YYYY tentang [Judul]"

DISCLAIMER:
"Artikel ini bersifat informatif dan edukatif. Untuk kasus spesifik, disarankan berkonsultasi dengan ahli hukum yang kompeten. Informasi dapat berubah sesuai perkembangan regulasi terbaru."
`

export default AI_ARTICLE_PROMPT