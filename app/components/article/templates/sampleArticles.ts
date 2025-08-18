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
      title: 'Pengertian dan Dasar Hukum Perceraian',
      type: 'paragraph',
      content: 'Perceraian adalah putusnya ikatan perkawinan antara suami dan istri dengan putusan pengadilan, disertai dengan alasan-alasan tertentu yang diatur dalam undang-undang.\n\nDasar hukum perceraian di Indonesia diatur dalam UU No. 1 Tahun 1974 tentang Perkawinan, PP No. 9 Tahun 1975, dan Kompilasi Hukum Islam (KHI) untuk perkawinan Islam.'
    },
    {
      id: 'jenis-perceraian',
      title: 'Jenis-Jenis Perceraian di Indonesia',
      type: 'numbered-list',
      content: 'Cerai Talak - Perceraian yang diajukan oleh suami terhadap istri di Pengadilan Agama\nCerai Gugat - Perceraian yang diajukan oleh istri terhadap suami di Pengadilan Agama\nCerai Gugat Pengadilan Negeri - Perceraian untuk pasangan non-Muslim di Pengadilan Negeri\nCerai Khuluk - Perceraian atas permintaan istri dengan memberikan tebusan kepada suami'
    },
    {
      id: 'syarat-perceraian',
      title: 'Syarat dan Alasan Perceraian',
      type: 'paragraph',
      content: 'Perceraian hanya dapat dilakukan di depan sidang pengadilan setelah pengadilan berusaha mendamaikan kedua belah pihak.',
      subsections: [
        {
          id: 'alasan-perceraian',
          title: 'Alasan-Alasan Perceraian yang Sah',
          type: 'numbered-list',
          content: 'Salah satu pihak berbuat zina atau menjadi pemabuk, pemadat, penjudi yang sukar disembuhkan\nSalah satu pihak meninggalkan pihak lain selama 2 tahun berturut-turut tanpa izin dan tanpa alasan yang sah\nSalah satu pihak mendapat hukuman penjara 5 tahun atau hukuman yang lebih berat setelah perkawinan berlangsung\nSalah satu pihak melakukan kekejaman atau penganiayaan berat yang membahayakan pihak lain\nSalah satu pihak mendapat cacat badan atau penyakit dengan akibat tidak dapat menjalankan kewajibannya sebagai suami/istri\nAntara suami dan istri terus-menerus terjadi perselisihan dan pertengkaran yang tidak ada harapan akan hidup rukun lagi'
        },
        {
          id: 'syarat-administratif',
          title: 'Syarat Administratif',
          type: 'list',
          content: 'Fotokopi KTP suami dan istri\nFotokopi Kartu Keluarga\nAsli dan fotokopi Buku Nikah/Akta Nikah\nFotokopi Akta Kelahiran anak (jika ada)\nSurat keterangan penghasilan (jika diperlukan)\nSurat kuasa (jika menggunakan kuasa hukum)'
        }
      ]
    },
    {
      id: 'prosedur-perceraian',
      title: 'Prosedur Mengajukan Perceraian',
      type: 'numbered-list',
      content: 'Persiapan dokumen yang diperlukan sesuai checklist\nPendaftaran gugatan di pengadilan yang berwenang\nPembayaran biaya perkara sesuai tarif pengadilan\nPemanggilan para pihak untuk sidang pertama\nProses mediasi wajib oleh mediator pengadilan\nPersidangan jika mediasi gagal\nPembacaan putusan oleh majelis hakim\nPelaksanaan putusan jika sudah berkekuatan hukum tetap'
    },
    {
      id: 'biaya-perceraian',
      title: 'Estimasi Biaya Perceraian',
      type: 'info',
      content: 'Biaya perceraian bervariasi tergantung pengadilan dan kompleksitas kasus. Untuk Pengadilan Agama: Rp 150.000 - Rp 500.000. Untuk Pengadilan Negeri: Rp 200.000 - Rp 1.000.000. Belum termasuk biaya kuasa hukum jika menggunakan advokat.'
    },
    {
      id: 'tips-praktis',
      title: 'Tips Praktis dalam Proses Perceraian',
      type: 'warning',
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
      title: 'Pengertian dan Karakteristik PT',
      type: 'paragraph',
      content: 'Perseroan Terbatas (PT) adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham.\n\nPT memiliki karakteristik utama: tanggung jawab terbatas, modal terbagi dalam saham, dan memiliki organ perseroan (RUPS, Direksi, Komisaris).'
    },
    {
      id: 'syarat-pendirian',
      title: 'Syarat Pendirian PT',
      type: 'paragraph',
      content: 'Untuk mendirikan PT, terdapat syarat substantif dan administratif yang harus dipenuhi.',
      subsections: [
        {
          id: 'syarat-substantif',
          title: 'Syarat Substantif',
          type: 'numbered-list',
          content: 'Minimal 2 (dua) orang pendiri\nModal dasar minimal Rp 50.000.000 (lima puluh juta rupiah)\nModal disetor minimal 25% dari modal dasar\nKegiatan usaha tidak bertentangan dengan hukum, ketertiban umum, dan kesusilaan\nNama perseroan tidak sama atau mirip dengan PT lain yang sudah ada'
        },
        {
          id: 'syarat-administratif',
          title: 'Dokumen yang Diperlukan',
          type: 'list',
          content: 'Fotokopi KTP para pendiri\nFotokopi NPWP para pendiri\nSurat keterangan domisili perusahaan\nSurat pernyataan tidak pernah dihukum (SKCK)\nPas foto pendiri ukuran 3x4\nSurat kuasa (jika menggunakan jasa notaris)'
        }
      ]
    },
    {
      id: 'langkah-pendirian',
      title: 'Langkah-Langkah Pendirian PT',
      type: 'numbered-list',
      content: 'Reservasi nama perseroan di Sistem AHU Online\nPenyusunan Anggaran Dasar oleh Notaris\nPenandatanganan Akta Pendirian\nPemasukan modal disetor ke rekening escrow\nPengajuan pengesahan ke Kemenkumham\nPendaftaran di OSS (Online Single Submission)\nPembuatan NPWP Badan dan izin usaha\nPembukaan rekening bank atas nama PT'
    },
    {
      id: 'biaya-pendirian',
      title: 'Estimasi Biaya Pendirian PT',
      type: 'info',
      content: 'Total biaya pendirian PT berkisar Rp 7-15 juta, termasuk: Biaya notaris (Rp 3-8 juta), PNBP Kemenkumham (Rp 1.000.000), Biaya konsultan/jasa (Rp 2-5 juta), Modal disetor minimal (Rp 12.500.000). Biaya dapat bervariasi tergantung kompleksitas dan lokasi.'
    },
    {
      id: 'setelah-pendirian',
      title: 'Kewajiban Setelah PT Didirikan',
      type: 'warning',
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