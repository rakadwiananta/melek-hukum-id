import { ArticleTemplate } from './ArticleTemplate'

// Sample Article: Cara Mengurus Perceraian
export const perceraianArticle: ArticleTemplate = {
  id: 'cara-mengurus-perceraian-2024',
  title: 'Panduan Lengkap Mengurus Perceraian di Indonesia',
  subtitle: 'Prosedur, Syarat, dan Biaya Perceraian di Pengadilan Agama dan Negeri',
  author: 'Tim Ahli Hukum Melek Hukum ID',
  publishedAt: '2024-12-15',
  readTime: '12 menit',
  category: 'Hukum Keluarga',
  tags: ['perceraian', 'pengadilan agama', 'hukum keluarga', 'prosedur hukum'],
  summary: 'Panduan komprehensif untuk mengurus perceraian di Indonesia, termasuk syarat, prosedur, biaya, dan tips praktis berdasarkan UU Perkawinan dan praktik pengadilan.',
  sections: [
    {
      id: 'pengertian-perceraian',
      order: 1,
      title: 'Pengertian dan Dasar Hukum Perceraian',
      type: 'paragraph',
      contentType: 'paragraph',
      content: 'Perceraian adalah putusnya ikatan perkawinan antara suami dan istri dengan putusan pengadilan, disertai dengan alasan-alasan tertentu yang diatur dalam undang-undang.\n\nDasar hukum perceraian di Indonesia diatur dalam UU No. 1 Tahun 1974 tentang Perkawinan, PP No. 9 Tahun 1975, dan Kompilasi Hukum Islam (KHI) untuk perkawinan Islam.'
    },
    {
      id: 'jenis-perceraian',
      order: 2,
      title: 'Jenis-Jenis Perceraian di Indonesia',
      type: 'numbered-list',
      contentType: 'numbered-list',
      content: 'Cerai Talak - Perceraian yang diajukan oleh suami terhadap istri di Pengadilan Agama\nCerai Gugat - Perceraian yang diajukan oleh istri terhadap suami di Pengadilan Agama\nCerai Gugat Pengadilan Negeri - Perceraian untuk pasangan non-Muslim di Pengadilan Negeri\nCerai Khuluk - Perceraian atas permintaan istri dengan memberikan tebusan kepada suami'
    },
    {
      id: 'prosedur-perceraian',
      order: 3,
      title: 'Prosedur Mengajukan Perceraian',
      type: 'numbered-list',
      contentType: 'numbered-list',
      content: 'Persiapan dokumen yang diperlukan sesuai checklist\nPendaftaran gugatan di pengadilan yang berwenang\nPembayaran biaya perkara sesuai tarif pengadilan\nPemanggilan para pihak untuk sidang pertama\nProses mediasi wajib oleh mediator pengadilan\nPersidangan jika mediasi gagal\nPembacaan putusan oleh majelis hakim\nPelaksanaan putusan jika sudah berkekuatan hukum tetap'
    },
    {
      id: 'biaya-perceraian',
      order: 4,
      title: 'Estimasi Biaya Perceraian',
      type: 'info',
      contentType: 'info',
      content: 'Biaya perceraian bervariasi tergantung pengadilan dan kompleksitas kasus. Untuk Pengadilan Agama: Rp 150.000 - Rp 500.000. Untuk Pengadilan Negeri: Rp 200.000 - Rp 1.000.000. Belum termasuk biaya kuasa hukum jika menggunakan advokat.'
    },
    {
      id: 'tips-praktis',
      order: 5,
      title: 'Tips Praktis dalam Proses Perceraian',
      type: 'warning',
      contentType: 'warning',
      content: 'Simpan semua dokumen asli dengan baik. Hadiri setiap sidang yang telah dijadwalkan. Pertimbangkan mediasi dengan serius untuk kepentingan anak. Konsultasikan dengan ahli hukum jika kasus kompleks. Persiapkan mental dan finansial untuk proses yang mungkin memakan waktu 3-6 bulan.'
    }
  ],
  sources: [
    'UU No. 1 Tahun 1974 tentang Perkawinan',
    'PP No. 9 Tahun 1975 tentang Pelaksanaan UU Perkawinan',
    'Kompilasi Hukum Islam (KHI)',
    'Peraturan Mahkamah Agung No. 1 Tahun 2016 tentang Prosedur Mediasi',
    'Data Statistik Pengadilan Agama 2023'
  ],
  disclaimer: 'Artikel ini bersifat informatif dan edukatif. Untuk kasus spesifik, disarankan berkonsultasi dengan ahli hukum yang kompeten. Informasi dapat berubah sesuai perkembangan regulasi terbaru.'
}

// Sample Article: Mendirikan PT
export const mendirikanPTArticle: ArticleTemplate = {
  id: 'cara-mendirikan-pt-2024',
  title: 'Panduan Mendirikan PT (Perseroan Terbatas) di Indonesia',
  subtitle: 'Langkah-langkah, Syarat, dan Biaya Pendirian PT Sesuai UU No. 40/2007',
  author: 'Dr. Ahmad Santoso, S.H., M.H.',
  publishedAt: '2024-12-10',
  readTime: '15 menit',
  category: 'Hukum Bisnis',
  tags: ['PT', 'perseroan terbatas', 'hukum bisnis', 'pendirian perusahaan'],
  summary: 'Panduan lengkap mendirikan Perseroan Terbatas (PT) di Indonesia, mulai dari persiapan dokumen hingga pengesahan badan hukum.',
  sections: [
    {
      id: 'pengertian-pt',
      order: 1,
      title: 'Pengertian dan Karakteristik PT',
      type: 'paragraph',
      contentType: 'paragraph',
      content: 'Perseroan Terbatas (PT) adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham.\n\nPT memiliki karakteristik utama: tanggung jawab terbatas, modal terbagi dalam saham, dan memiliki organ perseroan (RUPS, Direksi, Komisaris).'
    },
    {
      id: 'syarat-pendirian',
      order: 2,
      title: 'Syarat Pendirian PT',
      type: 'numbered-list',
      contentType: 'numbered-list',
      content: 'Minimal 2 (dua) orang pendiri\nModal dasar minimal Rp 50.000.000 (lima puluh juta rupiah)\nModal disetor minimal 25% dari modal dasar\nKegiatan usaha tidak bertentangan dengan hukum, ketertiban umum, dan kesusilaan\nNama perseroan tidak sama atau mirip dengan PT lain yang sudah ada'
    },
    {
      id: 'langkah-pendirian',
      order: 3,
      title: 'Langkah-Langkah Pendirian PT',
      type: 'numbered-list',
      contentType: 'numbered-list',
      content: 'Reservasi nama perseroan di Sistem AHU Online\nPenyusunan Anggaran Dasar oleh Notaris\nPenandatanganan Akta Pendirian\nPemasukan modal disetor ke rekening escrow\nPengajuan pengesahan ke Kemenkumham\nPendaftaran di OSS (Online Single Submission)\nPembuatan NPWP Badan dan izin usaha\nPembukaan rekening bank atas nama PT'
    },
    {
      id: 'biaya-pendirian',
      order: 4,
      title: 'Estimasi Biaya Pendirian PT',
      type: 'info',
      contentType: 'info',
      content: 'Total biaya pendirian PT berkisar Rp 7-15 juta, termasuk: Biaya notaris (Rp 3-8 juta), PNBP Kemenkumham (Rp 1.000.000), Biaya konsultan/jasa (Rp 2-5 juta), Modal disetor minimal (Rp 12.500.000). Biaya dapat bervariasi tergantung kompleksitas dan lokasi.'
    },
    {
      id: 'setelah-pendirian',
      order: 5,
      title: 'Kewajiban Setelah PT Didirikan',
      type: 'warning',
      contentType: 'warning',
      content: 'Setelah PT berdiri, ada kewajiban rutin yang harus dipenuhi: Laporan tahunan ke Kemenkumham, RUPS tahunan, Laporan keuangan tahunan, Pembayaran pajak tepat waktu, Pemeliharaan izin usaha. Kelalaian dapat mengakibatkan sanksi administratif hingga pembubaran PT.'
    }
  ],
  sources: [
    'UU No. 40 Tahun 2007 tentang Perseroan Terbatas',
    'Peraturan Menteri Hukum dan HAM No. 4 Tahun 2014',
    'PP No. 43 Tahun 2011 tentang Tata Cara Pengajuan dan Pemakaian Nama Perseroan Terbatas',
    'Data Kemenkumham RI 2024'
  ],
  disclaimer: 'Informasi ini bersifat umum dan dapat berubah sesuai regulasi terbaru. Untuk pendirian PT yang spesifik, konsultasikan dengan notaris dan konsultan hukum yang berpengalaman.'
}

// Export all sample articles
export const sampleArticles = {
  perceraian: perceraianArticle,
  mendirikanPT: mendirikanPTArticle
}