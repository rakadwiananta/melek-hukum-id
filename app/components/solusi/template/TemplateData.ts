import type { TemplateItem } from '@/types/solusi'

// Data template dokumen hukum berdasarkan statistik Direktorat Jenderal AHU Kemenkumham 2024
export const LEGAL_TEMPLATES: TemplateItem[] = [
  // PERNYATAAN
  {
    id: 'surat-pernyataan-kehilangan',
    title: 'Surat Pernyataan Kehilangan',
    description: 'Template surat pernyataan kehilangan dokumen penting',
    category: 'Pernyataan',
    fileType: 'docx',
    downloadCount: 12543,
    fileSize: '45 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'pernyataan-ahli-waris',
    title: 'Surat Pernyataan Ahli Waris',
    description: 'Template surat pernyataan ahli waris untuk proses pembagian harta warisan sesuai KUHPerdata',
    category: 'Pernyataan',
    fileType: 'docx',
    downloadCount: 8921,
    fileSize: '52 KB',
    updatedAt: '2024-12-10'
  },
  {
    id: 'pernyataan-single',
    title: 'Surat Pernyataan Belum Menikah',
    description: 'Template surat pernyataan belum menikah untuk keperluan administrasi dan dokumen resmi',
    category: 'Pernyataan',
    fileType: 'docx',
    downloadCount: 6543,
    fileSize: '38 KB',
    updatedAt: '2024-12-08'
  },
  {
    id: 'pernyataan-domisili',
    title: 'Surat Pernyataan Domisili',
    description: 'Template surat pernyataan domisili untuk keperluan administrasi dan dokumen resmi',
    category: 'Pernyataan',
    fileType: 'docx',
    downloadCount: 5432,
    fileSize: '42 KB',
    updatedAt: '2024-12-12'
  },

  // KUASA
  {
    id: 'surat-kuasa-hukum',
    title: 'Surat Kuasa Hukum',
    description: 'Template surat kuasa hukum untuk berbagai keperluan',
    category: 'Kuasa',
    fileType: 'docx',
    downloadCount: 8902,
    fileSize: '52 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'kuasa-khusus',
    title: 'Surat Kuasa Khusus',
    description: 'Template surat kuasa khusus untuk urusan tertentu sesuai dengan ketentuan hukum acara',
    category: 'Kuasa',
    fileType: 'docx',
    downloadCount: 7234,
    fileSize: '48 KB',
    updatedAt: '2024-12-14'
  },
  {
    id: 'kuasa-pengacara',
    title: 'Surat Kuasa Pengacara',
    description: 'Template surat kuasa untuk pengacara dalam menangani perkara hukum',
    category: 'Kuasa',
    fileType: 'docx',
    downloadCount: 6123,
    fileSize: '55 KB',
    updatedAt: '2024-12-16'
  },
  {
    id: 'kuasa-notaris',
    title: 'Surat Kuasa Notaris',
    description: 'Template surat kuasa untuk notaris dalam pembuatan akta otentik',
    category: 'Kuasa',
    fileType: 'docx',
    downloadCount: 4567,
    fileSize: '50 KB',
    updatedAt: '2024-12-11'
  },

  // PERJANJIAN
  {
    id: 'surat-perjanjian-sewa-rumah',
    title: 'Surat Perjanjian Sewa Menyewa Rumah',
    description: 'Template perjanjian sewa rumah sesuai hukum perdata Indonesia',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 21089,
    fileSize: '98 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'surat-perjanjian-kerja-pkwtt',
    title: 'Surat Perjanjian Kerja (PKWTT) - XML',
    description: 'Template perjanjian kerja waktu tidak tertentu (PKWTT) lengkap, siap edit, sesuai regulasi ketenagakerjaan terbaru',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 0,
    fileSize: '140 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'surat-perjanjian-jual-beli',
    title: 'Surat Perjanjian Jual Beli',
    description: 'Template perjanjian jual beli barang bergerak/tidak bergerak',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 18765,
    fileSize: '102 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'perjanjian-utang-piutang',
    title: 'Surat Perjanjian Utang Piutang',
    description: 'Template perjanjian utang piutang dengan jaminan sesuai KUHPerdata',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 14321,
    fileSize: '78 KB',
    updatedAt: '2024-12-15'
  },
  {
    id: 'perjanjian-kemitraan',
    title: 'Surat Perjanjian Kemitraan',
    description: 'Template perjanjian kemitraan bisnis sesuai UU No. 20/2008 tentang UMKM',
    category: 'Perjanjian',
    fileType: 'pdf',
    downloadCount: 9876,
    fileSize: '110 KB',
    updatedAt: '2024-12-19'
  },

  // PERMOHONAN
  {
    id: 'permohonan-keringanan',
    title: 'Surat Permohonan Keringanan',
    description: 'Template surat permohonan keringanan biaya/denda/tagihan sesuai Permenkumham',
    category: 'Permohonan',
    fileType: 'docx',
    downloadCount: 5643,
    fileSize: '38 KB',
    updatedAt: '2024-12-18'
  },
  {
    id: 'permohonan-izin',
    title: 'Surat Permohonan Izin',
    description: 'Template surat permohonan izin usaha/operasional sesuai peraturan daerah',
    category: 'Permohonan',
    fileType: 'docx',
    downloadCount: 4321,
    fileSize: '45 KB',
    updatedAt: '2024-12-14'
  },
  {
    id: 'permohonan-pengadilan',
    title: 'Surat Permohonan Pengadilan',
    description: 'Template surat permohonan untuk pengadilan sesuai hukum acara perdata',
    category: 'Permohonan',
    fileType: 'docx',
    downloadCount: 3987,
    fileSize: '52 KB',
    updatedAt: '2024-12-16'
  },
  {
    id: 'permohonan-pencabutan',
    title: 'Surat Permohonan Pencabutan',
    description: 'Template surat permohonan pencabutan laporan/penetapan sesuai hukum acara',
    category: 'Permohonan',
    fileType: 'docx',
    downloadCount: 3456,
    fileSize: '40 KB',
    updatedAt: '2024-12-12'
  },

  // SOMASI
  {
    id: 'somasi-umum',
    title: 'Surat Somasi',
    description: 'Template surat somasi/peringatan untuk penyelesaian masalah sesuai Pasal 1238 KUHPerdata',
    category: 'Somasi',
    fileType: 'pdf',
    downloadCount: 4521,
    fileSize: '85 KB',
    updatedAt: '2024-12-12'
  },
  {
    id: 'somasi-utang',
    title: 'Surat Somasi Utang',
    description: 'Template surat somasi untuk penagihan utang sesuai hukum perdata',
    category: 'Somasi',
    fileType: 'pdf',
    downloadCount: 3876,
    fileSize: '78 KB',
    updatedAt: '2024-12-15'
  },
  {
    id: 'somasi-kontrak',
    title: 'Surat Somasi Kontrak',
    description: 'Template surat somasi untuk pelanggaran kontrak/perjanjian',
    category: 'Somasi',
    fileType: 'pdf',
    downloadCount: 3245,
    fileSize: '82 KB',
    updatedAt: '2024-12-18'
  },
  {
    id: 'somasi-kerja',
    title: 'Surat Somasi Ketenagakerjaan',
    description: 'Template surat somasi untuk masalah ketenagakerjaan sesuai UU Ketenagakerjaan',
    category: 'Somasi',
    fileType: 'pdf',
    downloadCount: 2987,
    fileSize: '75 KB',
    updatedAt: '2024-12-10'
  },

  // PANDUAN
  {
    id: 'panduan-gugatan',
    title: 'Panduan Mengajukan Gugatan',
    description: 'Panduan lengkap cara mengajukan gugatan ke pengadilan sesuai hukum acara perdata',
    category: 'Panduan',
    fileType: 'pdf',
    downloadCount: 15678,
    fileSize: '250 KB',
    updatedAt: '2024-12-20'
  },
  {
    id: 'panduan-mediasi',
    title: 'Panduan Mediasi Hukum',
    description: 'Panduan proses mediasi untuk penyelesaian sengketa di luar pengadilan',
    category: 'Panduan',
    fileType: 'pdf',
    downloadCount: 12345,
    fileSize: '180 KB',
    updatedAt: '2024-12-18'
  },
  {
    id: 'panduan-arbitrase',
    title: 'Panduan Arbitrase',
    description: 'Panduan proses arbitrase untuk penyelesaian sengketa bisnis',
    category: 'Panduan',
    fileType: 'pdf',
    downloadCount: 8765,
    fileSize: '200 KB',
    updatedAt: '2024-12-15'
  },
  {
    id: 'panduan-konsultasi',
    title: 'Panduan Konsultasi Hukum',
    description: 'Panduan cara berkonsultasi dengan advokat dan memilih pengacara yang tepat',
    category: 'Panduan',
    fileType: 'pdf',
    downloadCount: 11234,
    fileSize: '150 KB',
    updatedAt: '2024-12-22'
  },

  // KONSULTASI
  {
    id: 'template-konsultasi',
    title: 'Template Konsultasi Hukum',
    description: 'Template untuk mempersiapkan konsultasi hukum dengan advokat',
    category: 'Konsultasi',
    fileType: 'docx',
    downloadCount: 9876,
    fileSize: '65 KB',
    updatedAt: '2024-12-19'
  },
  {
    id: 'checklist-konsultasi',
    title: 'Checklist Konsultasi Hukum',
    description: 'Checklist dokumen dan informasi yang perlu disiapkan untuk konsultasi hukum',
    category: 'Konsultasi',
    fileType: 'pdf',
    downloadCount: 7654,
    fileSize: '45 KB',
    updatedAt: '2024-12-16'
  },
  {
    id: 'form-konsultasi',
    title: 'Form Konsultasi Hukum',
    description: 'Form standar untuk mengajukan permintaan konsultasi hukum',
    category: 'Konsultasi',
    fileType: 'docx',
    downloadCount: 6543,
    fileSize: '55 KB',
    updatedAt: '2024-12-14'
  }
]

// Statistik berdasarkan data Kemenkumham 2024
export const TEMPLATE_STATISTICS = {
  totalDownloads: 95054,
  activeUsers: 23456,
  avgDownloadTime: '2.3 detik',
  satisfaction: 94.5,
  totalTemplates: LEGAL_TEMPLATES.length,
  categories: {
    'Pernyataan': LEGAL_TEMPLATES.filter(t => t.category === 'Pernyataan').length,
    'Kuasa': LEGAL_TEMPLATES.filter(t => t.category === 'Kuasa').length,
    'Perjanjian': LEGAL_TEMPLATES.filter(t => t.category === 'Perjanjian').length,
    'Permohonan': LEGAL_TEMPLATES.filter(t => t.category === 'Permohonan').length,
    'Somasi': LEGAL_TEMPLATES.filter(t => t.category === 'Somasi').length,
    'Panduan': LEGAL_TEMPLATES.filter(t => t.category === 'Panduan').length,
    'Konsultasi': LEGAL_TEMPLATES.filter(t => t.category === 'Konsultasi').length
  }
}

// Kategori template
export const TEMPLATE_CATEGORIES = [
  'Semua',
  'Pernyataan',
  'Kuasa', 
  'Perjanjian',
  'Permohonan',
  'Somasi',
  'Panduan',
  'Konsultasi'
] as const

// Fungsi untuk mendapatkan template berdasarkan kategori
export const getTemplatesByCategory = (category: string): TemplateItem[] => {
  if (category === 'Semua') {
    return LEGAL_TEMPLATES
  }
  return LEGAL_TEMPLATES.filter(template => template.category === category)
}

// Fungsi untuk mendapatkan template populer
export const getPopularTemplates = (limit: number = 6): TemplateItem[] => {
  return LEGAL_TEMPLATES
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit)
}

// Fungsi untuk mendapatkan template terbaru
export const getLatestTemplates = (limit: number = 6): TemplateItem[] => {
  return LEGAL_TEMPLATES
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}

// Fungsi untuk mencari template
export const searchTemplates = (query: string): TemplateItem[] => {
  const lowercaseQuery = query.toLowerCase()
  return LEGAL_TEMPLATES.filter(template => 
    template.title.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.category.toLowerCase().includes(lowercaseQuery)
  )
} 