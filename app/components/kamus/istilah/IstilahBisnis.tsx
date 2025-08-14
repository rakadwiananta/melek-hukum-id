import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Search, Download, FileText, X, 
  Briefcase, Building, ScrollText, DollarSign,
  Shield, Lightbulb, Users, Scale, BookOpen,
  TrendingUp, Filter, ChevronDown, ChevronUp,
  Eye, Star, Bookmark, Share2, Globe,
  BarChart3, Activity, Sparkles, Hash
} from 'lucide-react';

// Tipe data untuk istilah hukum bisnis
interface BusinessLawTerm {
  id: number;
  term: string;
  category: string;
  definition: string;
  example: string;
  relatedTerms: string[];
  legalBasis: string;
}

// Array lengkap istilah hukum bisnis dari ID 1 hingga 218
const businessLawTerms: BusinessLawTerm[] = [
  {
    id: 1,
    term: "Acquisition",
    category: "corporate",
    definition: "Proses pengambilalihan kendali perusahaan oleh perusahaan lain melalui pembelian saham atau aset",
    example: "Akuisisi perusahaan startup oleh perusahaan teknologi besar",
    relatedTerms: ["Takeover", "Merger", "Buyout"],
    legalBasis: "UU Perseroan Terbatas Pasal 122-129"
  },
  {
    id: 2,
    term: "Act of God",
    category: "contracts",
    definition: "Kejadian tak terduga di luar kendali manusia yang membebaskan tanggung jawab kontrak",
    example: "Gempa bumi yang merusak pabrik dan menghalangi pemenuhan kontrak",
    relatedTerms: ["Force Majeure", "Keadaan Kahar"],
    legalBasis: "KUH Perdata Pasal 1244-1245"
  },
  {
    id: 3,
    term: "Ad Hoc",
    category: "legal",
    definition: "Untuk tujuan khusus atau sementara",
    example: "Panitia ad hoc untuk investigasi kasus",
    relatedTerms: ["Sementara", "Temporary"],
    legalBasis: "Praktik Hukum"
  },
  {
    id: 4,
    term: "Addendum",
    category: "contracts",
    definition: "Tambahan atau lampiran pada kontrak yang memodifikasi ketentuan asli",
    example: "Addendum untuk perpanjangan masa kontrak",
    relatedTerms: ["Amendment", "Tambahan Kontrak"],
    legalBasis: "KUH Perdata Pasal 1320"
  },
  {
    id: 5,
    term: "Administrative Law",
    category: "legal",
    definition: "Hukum yang mengatur kegiatan administrasi negara",
    example: "Pengajuan izin usaha melalui OSS",
    relatedTerms: ["Hukum Administrasi", "Hukum Tata Usaha Negara"],
    legalBasis: "UU Administrasi Pemerintahan"
  },
  {
    id: 6,
    term: "ADR",
    category: "legal",
    definition: "Alternative Dispute Resolution: Cara penyelesaian sengketa di luar pengadilan",
    example: "Mediasi sengketa bisnis",
    relatedTerms: ["Mediasi", "Arbitrase", "Konsiliasi"],
    legalBasis: "UU No. 30 Tahun 1999 tentang Arbitrase dan APS"
  },
  {
    id: 7,
    term: "Affidavit",
    category: "legal",
    definition: "Pernyataan tertulis yang dikuatkan dengan sumpah",
    example: "Affidavit untuk bukti di pengadilan",
    relatedTerms: ["Pernyataan Bersumpah", "Sworn Statement"],
    legalBasis: "Hukum Acara Perdata"
  },
  {
    id: 8,
    term: "Agency Agreement",
    category: "contracts",
    definition: "Perjanjian keagenan di mana agen bertindak atas nama principal",
    example: "Agen penjualan produk merek tertentu",
    relatedTerms: ["Keagenan", "Distribution Agreement"],
    legalBasis: "KUH Perdata Pasal 1792-1819"
  },
  {
    id: 9,
    term: "Agreement",
    category: "contracts",
    definition: "Kesepakatan antara dua pihak atau lebih yang mengikat secara hukum",
    example: "Perjanjian jual beli barang",
    relatedTerms: ["Kontrak", "Contract"],
    legalBasis: "KUH Perdata Pasal 1313"
  },
  {
    id: 10,
    term: "Aktiva Lancar",
    category: "accounting",
    definition: "Aset perusahaan yang dapat dikonversi menjadi kas dalam waktu kurang dari satu tahun",
    example: "Kas, piutang, dan persediaan barang",
    relatedTerms: ["Current Assets", "Aset Lancar"],
    legalBasis: "PSAK"
  },
  {
    id: 11,
    term: "Aktiva Tetap",
    category: "accounting",
    definition: "Aset jangka panjang yang digunakan dalam operasional bisnis",
    example: "Tanah, bangunan, dan mesin produksi",
    relatedTerms: ["Fixed Assets", "Aset Tetap"],
    legalBasis: "PSAK"
  },
  {
    id: 12,
    term: "Akte Pendirian",
    category: "corporate",
    definition: "Dokumen resmi pendirian perusahaan",
    example: "Akte notaris pendirian PT",
    relatedTerms: ["Deed of Establishment", "Articles of Incorporation"],
    legalBasis: "UU PT Pasal 7"
  },
  {
    id: 13,
    term: "Akuisisi",
    category: "corporate",
    definition: "Pengambilalihan perusahaan oleh perusahaan lain",
    example: "Akuisisi saham mayoritas perusahaan target",
    relatedTerms: ["Acquisition", "Takeover"],
    legalBasis: "UU PT Pasal 122-129"
  },
  {
    id: 14,
    term: "Alat Bukti",
    category: "legal",
    definition: "Sesuatu yang digunakan untuk membuktikan kebenaran perkara",
    example: "Dokumen kontrak sebagai alat bukti",
    relatedTerms: ["Evidence", "Bukti Hukum"],
    legalBasis: "Hukum Acara"
  },
  {
    id: 15,
    term: "Alokasi Anggaran",
    category: "finance",
    definition: "Penetapan anggaran untuk kegiatan tertentu",
    example: "Alokasi dana untuk proyek infrastruktur",
    relatedTerms: ["Budget Allocation", "Alokasi Dana"],
    legalBasis: "UU Keuangan Negara"
  },
  {
    id: 16,
    term: "Amandemen Kontrak",
    category: "contracts",
    definition: "Perubahan ketentuan kontrak yang disetujui kedua belah pihak",
    example: "Amandemen harga dalam kontrak karena inflasi",
    relatedTerms: ["Contract Amendment", "Perubahan Kontrak"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 17,
    term: "Ambang Batas",
    category: "corporate",
    definition: "Batas minimal untuk tindakan tertentu",
    example: "Ambang batas kepemilikan saham asing",
    relatedTerms: ["Threshold", "Batas Minimal"],
    legalBasis: "UU Penanaman Modal"
  },
  {
    id: 18,
    term: "Amonia",
    category: "accounting",
    definition: "Pembagian aset perusahaan saat likuidasi",
    example: "Pembagian sisa aset setelah pembayaran utang",
    relatedTerms: ["Liquidation Distribution", "Pembagian Aset"],
    legalBasis: "UU Kepailitan"
  },
  {
    id: 19,
    term: "Amortisasi",
    category: "accounting",
    definition: "Penyusutan nilai aset tak berwujud secara bertahap",
    example: "Amortisasi hak paten selama masa berlaku",
    relatedTerms: ["Amortization", "Penyusutan"],
    legalBasis: "PSAK"
  },
  {
    id: 20,
    term: "Analisis Kredit",
    category: "finance",
    definition: "Penilaian kemampuan peminjam untuk mengembalikan pinjaman",
    example: "Analisis 5C kredit usaha",
    relatedTerms: ["Credit Analysis", "Penilaian Kredit"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 21,
    term: "Andil",
    category: "corporate",
    definition: "Bagian kepemilikan dalam perusahaan komanditer",
    example: "Andil sekutu dalam CV",
    relatedTerms: ["Share", "Bagian Kepemilikan"],
    legalBasis: "KUHD"
  },
  {
    id: 22,
    term: "Anggaran Dasar",
    category: "corporate",
    definition: "Dokumen konstitusi perusahaan yang mengatur struktur dan operasi",
    example: "Anggaran dasar PT yang tercantum dalam akte pendirian",
    relatedTerms: ["Articles of Association", "Statuta"],
    legalBasis: "UU PT Pasal 8"
  },
  {
    id: 23,
    term: "Anggaran Rumah Tangga",
    category: "corporate",
    definition: "Aturan internal perusahaan yang melengkapi anggaran dasar",
    example: "ART yang mengatur tata tertib RUPS",
    relatedTerms: ["Bylaws", "House Rules"],
    legalBasis: "UU PT"
  },
  {
    id: 24,
    term: "Anggota Dewan Komisaris",
    category: "corporate",
    definition: "Orang yang mengawasi pengurusan perusahaan oleh direksi",
    example: "Komisaris independen di perusahaan terbuka",
    relatedTerms: ["Board Member", "Komisaris"],
    legalBasis: "UU PT Pasal 114"
  },
  {
    id: 25,
    term: "Anggota Direksi",
    category: "corporate",
    definition: "Orang yang mengelola perusahaan sehari-hari",
    example: "Direktur utama PT",
    relatedTerms: ["Executive Director", "Direktur"],
    legalBasis: "UU PT Pasal 92"
  },
  {
    id: 26,
    term: "Annual Report",
    category: "corporate",
    definition: "Laporan tahunan perusahaan",
    example: "Laporan keuangan tahunan perusahaan terbuka",
    relatedTerms: ["Laporan Tahunan", "Financial Report"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 27,
    term: "Anti Dumping",
    category: "trade",
    definition: "Tindakan melawan praktik dumping dalam perdagangan internasional",
    example: " Bea masuk anti dumping produk impor",
    relatedTerms: ["Dumping", "Trade Protection"],
    legalBasis: "UU Anti Dumping"
  },
  {
    id: 28,
    term: "Anti Monopoli",
    category: "compliance",
    definition: "Hukum yang melarang praktik monopoli dan persaingan tidak sehat",
    example: "Penggabungan usaha yang diawasi KPPU",
    relatedTerms: ["Antitrust", "Competition Law"],
    legalBasis: "UU No. 5/1999"
  },
  {
    id: 29,
    term: "Antitrust",
    category: "compliance",
    definition: "Hukum persaingan usaha",
    example: "Pengawasan kartel oleh KPPU",
    relatedTerms: ["Anti Monopoli", "Competition Law"],
    legalBasis: "UU Persaingan Usaha"
  },
  {
    id: 30,
    term: "Aparatur Sipil Negara",
    category: "employment",
    definition: "Pegawai negara yang bekerja di instansi pemerintahan",
    example: "PNS di kementerian keuangan",
    relatedTerms: ["ASN", "Civil Servant"],
    legalBasis: "UU No. 5/2014"
  },
  {
    id: 31,
    term: "Arbitrase",
    category: "legal",
    definition: "Penyelesaian sengketa oleh arbiter di luar pengadilan",
    example: "Arbitrase sengketa kontrak bisnis",
    relatedTerms: ["Arbitration", "APS"],
    legalBasis: "UU No. 30/1999"
  },
  {
    id: 32,
    term: "Artikel",
    category: "contracts",
    definition: "Pasal dalam kontrak atau perjanjian",
    example: "Artikel 5 kontrak mengatur pembayaran",
    relatedTerms: ["Clause", "Pasal"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 33,
    term: "Asset Management",
    category: "finance",
    definition: "Pengelolaan aset perusahaan untuk nilai optimal",
    example: "Pengelolaan portofolio investasi",
    relatedTerms: ["Manajemen Aset", "Wealth Management"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 34,
    term: "Audit",
    category: "accounting",
    definition: "Pemeriksaan laporan keuangan oleh auditor independen",
    example: "Audit tahunan oleh KAP",
    relatedTerms: ["Auditing", "Pemeriksaan Keuangan"],
    legalBasis: "Standar Audit"
  },
  {
    id: 35,
    term: "Audit Internal",
    category: "accounting",
    definition: "Pemeriksaan oleh unit internal perusahaan",
    example: "Audit internal untuk pengendalian risiko",
    relatedTerms: ["Internal Audit", "Pemeriksaan Internal"],
    legalBasis: "Praktik Akuntansi"
  },
  {
    id: 36,
    term: "Ayat",
    category: "legal",
    definition: "Sub-pasal dalam undang-undang",
    example: "Pasal 1 ayat (1) UUD 1945",
    relatedTerms: ["Sub-article", "Sub-pasal"],
    legalBasis: "Teknik Perundangan"
  },
  {
    id: 37,
    term: "Badan Hukum",
    category: "corporate",
    definition: "Entitas yang diakui sebagai subjek hukum",
    example: "PT dan CV sebagai badan hukum",
    relatedTerms: ["Legal Entity", "Perseroan"],
    legalBasis: "KUH Perdata Pasal 1653"
  },
  {
    id: 38,
    term: "Badan Usaha",
    category: "business-types",
    definition: "Entitas yang melakukan kegiatan usaha",
    example: "BUMN, BUMD, swasta",
    relatedTerms: ["Enterprise", "Business Entity"],
    legalBasis: "UU PT"
  },
  {
    id: 39,
    term: "Bailout",
    category: "finance",
    definition: "Bantuan keuangan untuk perusahaan bermasalah",
    example: "Bailout bank selama krisis",
    relatedTerms: ["Bantuan Dana", "Financial Rescue"],
    legalBasis: "UU Keuangan Negara"
  },
  {
    id: 40,
    term: "Balance Sheet",
    category: "accounting",
    definition: "Laporan neraca keuangan perusahaan",
    example: "Neraca menunjukkan aset dan liabilitas",
    relatedTerms: ["Neraca", "Financial Position"],
    legalBasis: "PSAK"
  },
  {
    id: 41,
    term: "Bank Guarantee",
    category: "finance",
    definition: "Jaminan bank atas kewajiban nasabah",
    example: "Bank garansi untuk tender proyek",
    relatedTerms: ["Jaminan Bank", "Bid Bond"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 42,
    term: "Bankruptcy",
    category: "legal",
    definition: "Proses hukum untuk perusahaan pailit",
    example: "Pengajuan pailit ke pengadilan niaga",
    relatedTerms: ["Kepailitan", "Insolvency"],
    legalBasis: "UU No. 37/2004"
  },
  {
    id: 43,
    term: "Commitment Fee",
    category: "finance",
    definition: "Biaya komitmen untuk fasilitas kredit yang belum digunakan",
    example: "Commitment fee pinjaman sindikasi",
    relatedTerms: ["Biaya Komitmen", "Standby Fee"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 44,
    term: "Banjir Impor",
    category: "trade",
    definition: "Masuknya barang impor secara besar-besaran",
    example: "Banjir impor tekstil dari China",
    relatedTerms: ["Import Flood", "Dumping"],
    legalBasis: "UU Perdagangan"
  },
  {
    id: 45,
    term: "Barter",
    category: "trade",
    definition: "Pertukaran barang dengan barang tanpa uang",
    example: "Barter minyak dengan pesawat",
    relatedTerms: ["Barter Trade", "Counter Trade"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 46,
    term: "Batas Waktu",
    category: "contracts",
    definition: "Jangka waktu penyelesaian kewajiban",
    example: "Batas waktu pembayaran dalam kontrak",
    relatedTerms: ["Deadline", "Term"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 47,
    term: "Beku Saham",
    category: "finance",
    definition: "Saham yang tidak dapat diperdagangkan sementara",
    example: "Freeze saham karena corporate action",
    relatedTerms: ["Freeze Stock", "Saham Beku"],
    legalBasis: "Peraturan BEI"
  },
  {
    id: 48,
    term: "Bench Marking",
    category: "compliance",
    definition: "Perbandingan dengan standar terbaik",
    example: "Benchmarking praktik anti korupsi",
    relatedTerms: ["Benchmarking", "Standar Perbandingan"],
    legalBasis: "Manajemen"
  },
  {
    id: 49,
    term: "Beneficial Owner",
    category: "corporate",
    definition: "Pemilik manfaat akhir dari perusahaan",
    example: "Pemilik saham melalui nominee",
    relatedTerms: ["BO", "Pemilik Manfaat"],
    legalBasis: "Perpres BO"
  },
  {
    id: 50,
    term: "Berkekuatan Hukum Tetap",
    category: "legal",
    definition: "Putusan yang tidak dapat digugat lagi",
    example: "Putusan inkracht van geweisde",
    relatedTerms: ["Inkracht", "Final Decision"],
    legalBasis: "Hukum Acara"
  },
  {
    id: 51,
    term: "Bersih dan Sehat",
    category: "compliance",
    definition: "Prinsip tata kelola perusahaan baik",
    example: "Pemerintahan yang bersih dan sehat",
    relatedTerms: ["Clean Governance", "Good Governance"],
    legalBasis: "UU Administrasi Pemerintahan"
  },
  {
    id: 52,
    term: "Bilateral Agreement",
    category: "trade",
    definition: "Perjanjian antara dua negara",
    example: "Bilateral trade agreement Indonesia-Jepang",
    relatedTerms: ["Perjanjian Bilateral", "Two-party Agreement"],
    legalBasis: "UU Perjanjian Internasional"
  },
  {
    id: 53,
    term: "Bill of Lading",
    category: "trade",
    definition: "Dokumen pengangkutan barang melalui laut",
    example: "B/L untuk ekspor impor",
    relatedTerms: ["Konosemen", "Shipping Document"],
    legalBasis: "KUHD"
  },
  {
    id: 54,
    term: "Biometric Authentication",
    category: "compliance",
    definition: "Verifikasi identitas menggunakan ciri biologis",
    example: "Sidik jari untuk transaksi keuangan",
    relatedTerms: ["Autentikasi Biometrik", "Fingerprint"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 55,
    term: "Blacklist",
    category: "compliance",
    definition: "Daftar pihak yang dilarang bertransaksi",
    example: "Blacklist debitur macet",
    relatedTerms: ["Daftar Hitam", "Prohibited List"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 56,
    term: "Board of Commissioners",
    category: "corporate",
    definition: "Dewan yang mengawasi jalannya perusahaan",
    example: "Dewan Komisaris PT",
    relatedTerms: ["Dewan Komisaris", "Supervisory Board"],
    legalBasis: "UU PT Pasal 108"
  },
  {
    id: 57,
    term: "Board of Directors",
    category: "corporate",
    definition: "Pengurus eksekutif perusahaan",
    example: "Direksi PT",
    relatedTerms: ["Direksi", "Executive Board"],
    legalBasis: "UU PT Pasal 92"
  },
  {
    id: 58,
    term: "Bond",
    category: "finance",
    definition: "Surat utang jangka menengah panjang",
    example: "Obligasi korporasi",
    relatedTerms: ["Obligasi", "Debt Security"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 59,
    term: "Bonus Demografi",
    category: "business-types",
    definition: "Keuntungan dari populasi usia produktif yang besar",
    example: "Indonesia memanfaatkan bonus demografi 2030",
    relatedTerms: ["Demographic Dividend", "Keuntungan Demografi"],
    legalBasis: "RPJPN"
  },
  {
    id: 60,
    term: "Branch Office",
    category: "business-types",
    definition: "Cabang perusahaan di lokasi lain",
    example: "Kantor cabang bank asing",
    relatedTerms: ["Kantor Cabang", "Branch"],
    legalBasis: "UU Penanaman Modal"
  },
  {
    id: 61,
    term: "Breach of Contract",
    category: "contracts",
    definition: "Pelanggaran ketentuan kontrak",
    example: "Keterlambatan pengiriman barang",
    relatedTerms: ["Wanprestasi", "Contract Violation"],
    legalBasis: "KUH Perdata Pasal 1243"
  },
  {
    id: 62,
    term: "Bribery",
    category: "compliance",
    definition: "Suap untuk mempengaruhi tindakan",
    example: "Pemberian suap kepada pejabat",
    relatedTerms: ["Suap", "Graft"],
    legalBasis: "UU Tipikor Pasal 5"
  },
  {
    id: 63,
    term: "Business Judgment Rule",
    category: "corporate",
    definition: "Perlindungan direktur dari tanggung jawab atas keputusan bisnis",
    example: "Direksi tidak bertanggung jawab atas kerugian jika keputusan diambil dengan itikad baik",
    relatedTerms: ["BJR", "Perlindungan Direksi"],
    legalBasis: "UU PT Pasal 97 ayat (5)"
  },
  {
    id: 64,
    term: "Business License",
    category: "compliance",
    definition: "Izin usaha yang diperlukan untuk menjalankan bisnis",
    example: "SIUP untuk perusahaan perdagangan",
    relatedTerms: ["Izin Usaha", "Business Permit"],
    legalBasis: "UU Penanaman Modal"
  },
  {
    id: 65,
    term: "Business Plan",
    category: "business-types",
    definition: "Rencana bisnis untuk perusahaan",
    example: "Business plan startup untuk investor",
    relatedTerms: ["Rencana Bisnis", "Business Proposal"],
    legalBasis: "Praktik Bisnis"
  },
  {
    id: 66,
    term: "Buyback",
    category: "finance",
    definition: "Pembelian kembali saham oleh perusahaan",
    example: "Share buyback untuk stabilisasi harga saham",
    relatedTerms: ["Share Repurchase", "Pembelian Kembali Saham"],
    legalBasis: "UU PT Pasal 37"
  },
  {
    id: 67,
    term: "Capital Gain",
    category: "tax",
    definition: "Keuntungan dari penjualan aset",
    example: "Keuntungan penjualan saham",
    relatedTerms: ["Keuntungan Modal", "Gain"],
    legalBasis: "UU PPh"
  },
  {
    id: 68,
    term: "Capital Market",
    category: "finance",
    definition: "Pasar untuk perdagangan instrumen keuangan jangka panjang",
    example: "Bursa Efek Indonesia",
    relatedTerms: ["Pasar Modal", "Stock Market"],
    legalBasis: "UU No. 8/1995"
  },
  {
    id: 69,
    term: "Cartel",
    category: "compliance",
    definition: "Kesepakatan antarperusahaan untuk mengontrol harga",
    example: "Kartel minyak OPEC",
    relatedTerms: ["Kartel", "Price Fixing"],
    legalBasis: "UU No. 5/1999 Pasal 11"
  },
  {
    id: 70,
    term: "Cash Flow",
    category: "accounting",
    definition: "Aliran masuk dan keluar kas perusahaan",
    example: "Laporan arus kas tahunan",
    relatedTerms: ["Arus Kas", "Cashflow"],
    legalBasis: "PSAK"
  },
  {
    id: 71,
    term: "CEO",
    category: "corporate",
    definition: "Chief Executive Officer: Eksekutif tertinggi perusahaan",
    example: "CEO mengelola operasional perusahaan",
    relatedTerms: ["Direktur Utama", "Top Executive"],
    legalBasis: "UU PT"
  },
  {
    id: 72,
    term: "Cessio Debitum",
    category: "finance",
    definition: "Pengalihan piutang kepada pihak ketiga",
    example: "Cessio piutang bank",
    relatedTerms: ["Pengalihan Piutang", "Assignment of Debt"],
    legalBasis: "KUH Perdata Pasal 613"
  },
  {
    id: 73,
    term: "Change of Control",
    category: "corporate",
    definition: "Perubahan pengendalian perusahaan",
    example: "Clause change of control dalam kontrak",
    relatedTerms: ["Perubahan Kendali", "Control Change"],
    legalBasis: "UU PT"
  },
  {
    id: 74,
    term: "Charter",
    category: "corporate",
    definition: "Dokumen pendirian perusahaan atau organisasi",
    example: "Company charter",
    relatedTerms: ["Piagam", "Articles of Incorporation"],
    legalBasis: "UU PT"
  },
  {
    id: 75,
    term: "Check and Balance",
    category: "compliance",
    definition: "Mekanisme pengawasan internal perusahaan",
    example: "Pemisahan tugas untuk pencegahan fraud",
    relatedTerms: ["Pengawasan Internal", "Internal Control"],
    legalBasis: "Manajemen Risiko"
  },
  {
    id: 76,
    term: "Claim",
    category: "legal",
    definition: "Tuntutan hak atas sesuatu",
    example: "Claim ganti rugi kerusakan barang",
    relatedTerms: ["Tuntutan", "Demand"],
    legalBasis: "Hukum Acara"
  },
  {
    id: 77,
    term: "Clause",
    category: "contracts",
    definition: "Ketentuan dalam kontrak",
    example: "Force majeure clause",
    relatedTerms: ["Klausul", "Provision"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 78,
    term: "Clearing",
    category: "finance",
    definition: "Penyelesaian transaksi keuangan",
    example: "Clearing cek antar bank",
    relatedTerms: ["Penyelesaian", "Settlement"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 79,
    term: "Co-ownership",
    category: "corporate",
    definition: "Kepemilikan bersama atas aset",
    example: "Co-ownership properti bisnis",
    relatedTerms: ["Kepemilikan Bersama", "Joint Ownership"],
    legalBasis: "KUH Perdata Pasal 577"
  },
  {
    id: 80,
    term: "Collateral",
    category: "finance",
    definition: "Aset yang dijaminkan untuk pinjaman",
    example: "Tanah sebagai collateral kredit",
    relatedTerms: ["Agunan", "Jaminan"],
    legalBasis: "UU Jaminan"
  },
  {
    id: 81,
    term: "Commercial Paper",
    category: "finance",
    definition: "Surat berharga jangka pendek",
    example: "CP untuk pembiayaan jangka pendek",
    relatedTerms: ["Surat Utang", "Short Term Debt"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 82,
    term: "Commodity",
    category: "trade",
    definition: "Barang dasar yang diperdagangkan",
    example: "Komoditas minyak sawit Indonesia",
    relatedTerms: ["Komoditas", "Basic Goods"],
    legalBasis: "UU Perdagangan"
  },
  {
    id: 83,
    term: "Common Law",
    category: "legal",
    definition: "Sistem hukum berdasarkan preseden",
    example: "Pengaruh common law dalam arbitrase internasional",
    relatedTerms: ["Hukum Kasus", "Case Law"],
    legalBasis: "Perbandingan Hukum"
  },
  {
    id: 84,
    term: "Company Law",
    category: "corporate",
    definition: "Hukum yang mengatur perusahaan",
    example: "UU PT sebagai company law Indonesia",
    relatedTerms: ["Hukum Perusahaan", "Corporate Law"],
    legalBasis: "UU No. 40/2007"
  },
  {
    id: 85,
    term: "Competition Law",
    category: "compliance",
    definition: "Hukum persaingan usaha",
    example: "Penggabungan usaha diatur competition law",
    relatedTerms: ["Hukum Persaingan", "Antitrust Law"],
    legalBasis: "UU No. 5/1999"
  },
  {
    id: 86,
    term: "Compliance",
    category: "compliance",
    definition: "Kepatuhan terhadap peraturan",
    example: "Departemen compliance perusahaan",
    relatedTerms: ["Kepatuhan", "Regulatory Compliance"],
    legalBasis: "Governance"
  },
  {
    id: 87,
    term: "Confidentiality Agreement",
    category: "contracts",
    definition: "Perjanjian kerahasiaan informasi",
    example: "NDA dalam kerjasama bisnis",
    relatedTerms: ["NDA", "Non-disclosure Agreement"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 88,
    term: "Conflict of Interest",
    category: "compliance",
    definition: "Benturan kepentingan",
    example: "Direksi memiliki saham di pesaing",
    relatedTerms: ["Benturan Kepentingan", "COI"],
    legalBasis: "UU PT Pasal 98"
  },
  {
    id: 89,
    term: "Conglomerate",
    category: "business-types",
    definition: "Grup perusahaan dengan berbagai bidang usaha",
    example: "Konglomerasi bisnis Indonesia",
    relatedTerms: ["Konglomerasi", "Business Group"],
    legalBasis: "UU Persaingan Usaha"
  },
  {
    id: 90,
    term: "Consignment",
    category: "trade",
    definition: "Penitipan barang untuk dijual",
    example: "Consignment barang impor",
    relatedTerms: ["Konsinyasi", "Consignment Sale"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 91,
    term: "Consolidation",
    category: "accounting",
    definition: "Penggabungan laporan keuangan grup perusahaan",
    example: "Laporan keuangan konsolidasi",
    relatedTerms: ["Konsolidasi", "Combined Financials"],
    legalBasis: "PSAK 4"
  },
  {
    id: 92,
    term: "Constitution of Company",
    category: "corporate",
    definition: "Anggaran dasar perusahaan",
    example: "Konstitusi PT mengatur hak pemegang saham",
    relatedTerms: ["Company Constitution", "Anggaran Dasar"],
    legalBasis: "UU PT"
  },
  {
    id: 93,
    term: "Consumer Protection",
    category: "compliance",
    definition: "Perlindungan konsumen dari praktik bisnis tidak adil",
    example: "Pengembalian barang cacat",
    relatedTerms: ["Perlindungan Konsumen", "Consumer Rights"],
    legalBasis: "UU No. 8/1999"
  },
  {
    id: 94,
    term: "Contingent Liability",
    category: "accounting",
    definition: "Kewajiban potensial yang tergantung kondisi masa depan",
    example: "Jaminan bank sebagai contingent liability",
    relatedTerms: ["Kewajiban Kontinjensi", "Potential Liability"],
    legalBasis: "PSAK"
  },
  {
    id: 95,
    term: "Contract Manufacturing",
    category: "contracts",
    definition: "Perjanjian produksi barang oleh pihak ketiga",
    example: "Produksi OEM untuk merek tertentu",
    relatedTerms: ["Makloon", "OEM Contract"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 96,
    term: "Contractor",
    category: "contracts",
    definition: "Pihak yang melakukan pekerjaan berdasarkan kontrak",
    example: "Kontraktor pembangunan gedung",
    relatedTerms: ["Kontraktor", "Pemborong"],
    legalBasis: "UU Jasa Konstruksi"
  },
  {
    id: 97,
    term: "Convertible Bond",
    category: "finance",
    definition: "Obligasi yang dapat dikonversi menjadi saham",
    example: "Convertible bond startup",
    relatedTerms: ["Obligasi Konversi", "Convertible Debt"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 98,
    term: "Copyright",
    category: "intellectual-property",
    definition: "Hak cipta atas karya seni dan sastra",
    example: "Copyright buku dan musik",
    relatedTerms: ["Hak Cipta", "Intellectual Property"],
    legalBasis: "UU No. 28/2014"
  },
  {
    id: 99,
    term: "Corporate Action",
    category: "corporate",
    definition: "Tindakan perusahaan yang mempengaruhi pemegang saham",
    example: "Dividen, stock split",
    relatedTerms: ["Aksi Korporasi", "Company Action"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 100,
    term: "Corporate Governance",
    category: "compliance",
    definition: "Sistem pengelolaan dan pengawasan perusahaan",
    example: "Implementasi GCG di BUMN",
    relatedTerms: ["Tata Kelola Perusahaan", "GCG"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 101,
    term: "Corporate Social Responsibility",
    category: "compliance",
    definition: "Tanggung jawab sosial perusahaan",
    example: "CSR untuk lingkungan dan masyarakat",
    relatedTerms: ["CSR", "TJSL"],
    legalBasis: "UU PT Pasal 74"
  },
  {
    id: 102,
    term: "Counter Trade",
    category: "trade",
    definition: "Perdagangan timbal balik",
    example: "Counter purchase minyak dengan barang",
    relatedTerms: ["Pertukaran Dagang", "Barter Trade"],
    legalBasis: "Peraturan Menteri Perdagangan"
  },
  {
    id: 103,
    term: "Credit Rating",
    category: "finance",
    definition: "Penilaian kelayakan kredit",
    example: "Rating kredit perusahaan oleh Pefindo",
    relatedTerms: ["Pemeringkatan Kredit", "Credit Score"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 104,
    term: "Credit Union",
    category: "finance",
    definition: "Koperasi simpan pinjam",
    example: "Credit union karyawan perusahaan",
    relatedTerms: ["Koperasi Kredit", "Savings Cooperative"],
    legalBasis: "UU Koperasi"
  },
  {
    id: 105,
    term: "Creditor",
    category: "finance",
    definition: "Pemberi pinjaman atau pihak yang mempunyai piutang",
    example: "Bank sebagai creditor utama",
    relatedTerms: ["Kreditor", "Lender"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 106,
    term: "Cross Default",
    category: "contracts",
    definition: "Pelanggaran satu kontrak memicu pelanggaran kontrak lain",
    example: "Cross default clause dalam perjanjian pinjaman",
    relatedTerms: ["Wanprestasi Silang", "Default Trigger"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 107,
    term: "Currency",
    category: "finance",
    definition: "Mata uang",
    example: "Rupiah sebagai currency Indonesia",
    relatedTerms: ["Mata Uang", "Money"],
    legalBasis: "UU Mata Uang"
  },
  {
    id: 108,
    term: "Current Ratio",
    category: "accounting",
    definition: "Rasio aset lancar terhadap kewajiban lancar",
    example: "Current ratio 2:1 menunjukkan likuiditas baik",
    relatedTerms: ["Rasio Lancar", "Liquidity Ratio"],
    legalBasis: "PSAK"
  },
  {
    id: 109,
    term: "Custodian Bank",
    category: "finance",
    definition: "Bank penyimpan aset investasi",
    example: "Custodian untuk reksadana",
    relatedTerms: ["Bank Kustodian", "Custody Bank"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 110,
    term: "Customs Duty",
    category: "tax",
    definition: "Bea masuk barang impor",
    example: "Bea masuk 10% untuk barang elektronik",
    relatedTerms: ["Bea Masuk", "Tariff"],
    legalBasis: "UU Kepabeanan"
  },
  {
    id: 111,
    term: "CV",
    category: "business-types",
    definition: "Commanditaire Vennootschap: Perusahaan komanditer",
    example: "CV dengan sekutu aktif dan pasif",
    relatedTerms: ["Persekutuan Komanditer", "Limited Partnership"],
    legalBasis: "KUHD Pasal 19-21"
  },
  {
    id: 112,
    term: "Daftar Hitam",
    category: "compliance",
    definition: "List perusahaan/perorangan yang diblacklist",
    example: "Daftar hitam kontraktor bermasalah",
    relatedTerms: ["Blacklist", "Prohibited List"],
    legalBasis: "Peraturan Pengadaan"
  },
  {
    id: 113,
    term: "Daftar Pemegang Saham",
    category: "corporate",
    definition: "Daftar pemilik saham perusahaan",
    example: "DPS untuk RUPS",
    relatedTerms: ["Shareholder List", "DPS"],
    legalBasis: "UU PT"
  },
  {
    id: 114,
    term: "Daftar Urut Tetap",
    category: "corporate",
    definition: "Daftar calon tetap dalam pemilu",
    example: "DUT untuk calon legislatif",
    relatedTerms: ["Fixed Candidate List", "DUT"],
    legalBasis: "UU Pemilu"
  },
  {
    id: 115,
    term: "Damage",
    category: "legal",
    definition: "Kerugian material atau immaterial",
    example: "Ganti rugi damage dalam kontrak",
    relatedTerms: ["Kerugian", "Compensation"],
    legalBasis: "KUH Perdata Pasal 1246"
  },
  {
    id: 116,
    term: "De Facto",
    category: "legal",
    definition: "Berdasarkan fakta yang ada",
    example: "Direktur de facto tanpa pengangkatan resmi",
    relatedTerms: ["De Jure", "Secara Fakta"],
    legalBasis: "Teori Hukum"
  },
  {
    id: 117,
    term: "De Jure",
    category: "legal",
    definition: "Berdasarkan hukum yang berlaku",
    example: "Pemerintahan de jure yang legitimate",
    relatedTerms: ["De Facto", "Secara Hukum"],
    legalBasis: "Teori Hukum"
  },
  {
    id: 118,
    term: "Debit",
    category: "accounting",
    definition: "Catatan masuk dalam akuntansi",
    example: "Debit kas meningkatkan aset",
    relatedTerms: ["Debit Entry", "Catatan Debit"],
    legalBasis: "PSAK"
  },
  {
    id: 119,
    term: "Debitor",
    category: "finance",
    definition: "Pihak yang berutang",
    example: "Nasabah kredit sebagai debitor",
    relatedTerms: ["Peminjam", "Borrower"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 120,
    term: "Deed",
    category: "legal",
    definition: "Dokumen hukum resmi",
    example: "Deed of sale tanah",
    relatedTerms: ["Akte", "Legal Document"],
    legalBasis: "UU Jabatan Notaris"
  },
  {
    id: 121,
    term: "Default",
    category: "finance",
    definition: "Ketidakmampuan memenuhi kewajiban",
    example: "Default pembayaran pinjaman",
    relatedTerms: ["Wanprestasi", "Non-payment"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 122,
    term: "Deferred Tax",
    category: "tax",
    definition: "Pajak tangguhan karena perbedaan waktu",
    example: "Deferred tax asset dari kerugian",
    relatedTerms: ["Pajak Tangguhan", "Temporary Difference"],
    legalBasis: "PSAK 46"
  },
  {
    id: 123,
    term: "Definisi",
    category: "legal",
    definition: "Pengertian istilah dalam undang-undang",
    example: "Definisi perusahaan dalam UU PT",
    relatedTerms: ["Definition", "Pengertian"],
    legalBasis: "Teknik Perundangan"
  },
  {
    id: 124,
    term: "Deglobalization",
    category: "trade",
    definition: "Proses mengurangi ketergantungan global",
    example: "Deglobalisasi pasca pandemi",
    relatedTerms: ["Deglobalisasi", "Localization"],
    legalBasis: "Kebijakan Perdagangan"
  },
  {
    id: 125,
    term: "Delegation of Authority",
    category: "corporate",
    definition: "Pelimpahan wewenang dari atasan ke bawahan",
    example: "Delegasi direksi ke manajer",
    relatedTerms: ["Pelimpahan Wewenang", "Authorization"],
    legalBasis: "Manajemen Perusahaan"
  },
  {
    id: 126,
    term: "Delisting",
    category: "finance",
    definition: "Penghapusan saham dari bursa efek",
    example: "Delisting saham perusahaan pailit",
    relatedTerms: ["Penghapusan Pencatatan", "Delisting"],
    legalBasis: "Peraturan BEI"
  },
  {
    id: 127,
    term: "Demand Letter",
    category: "legal",
    definition: "Surat tuntutan pembayaran",
    example: "Somasi kepada debitor moro",
    relatedTerms: ["Somasi", "Notice of Demand"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 128,
    term: "Demerger",
    category: "corporate",
    definition: "Pemisahan perusahaan menjadi entitas baru",
    example: "Demerger divisi bisnis",
    relatedTerms: ["Pemisahan", "Spin-off"],
    legalBasis: "UU PT"
  },
  {
    id: 129,
    term: "Demokrasi Ekonomi",
    category: "business-types",
    definition: "Sistem ekonomi yang demokratis",
    example: "Pemerataan ekonomi berdasarkan UUD",
    relatedTerms: ["Economic Democracy", "Demokrasi Ekonomi"],
    legalBasis: "Pasal 33 UUD 1945"
  },
  {
    id: 130,
    term: "Demurrage",
    category: "trade",
    definition: "Denda keterlambatan bongkar muat",
    example: "Demurrage kontainer di pelabuhan",
    relatedTerms: ["Denda Penundaan", "Detention Fee"],
    legalBasis: "KUHD"
  },
  {
    id: 131,
    term: "Deponering",
    category: "legal",
    definition: "Penghentian penuntutan oleh jaksa",
    example: "Deponering kasus korupsi",
    relatedTerms: ["Penghentian Penuntutan", "Dismissal"],
    legalBasis: "KUHAP"
  },
  {
    id: 132,
    term: "Depreciation",
    category: "accounting",
    definition: "Penyusutan nilai aset tetap",
    example: "Depresiasi mesin pabrik",
    relatedTerms: ["Depresiasi", "Amortisasi Aset Tetap"],
    legalBasis: "PSAK"
  },
  {
    id: 133,
    term: "Derivative",
    category: "finance",
    definition: "Instrumen keuangan derivatif dari aset lain",
    example: "Kontrak futures komoditas",
    relatedTerms: ["Derivatif", "Financial Derivative"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 134,
    term: "Desk Collection",
    category: "finance",
    definition: "Penagihan piutang melalui telepon",
    example: "Desk collection untuk kredit macet",
    relatedTerms: ["Penagihan Meja", "Phone Collection"],
    legalBasis: "Praktik Perbankan"
  },
  {
    id: 135,
    term: "Deutsche Mark",
    category: "finance",
    definition: "Mata uang Jerman sebelum Euro",
    example: "DM sebagai mata uang stabil",
    relatedTerms: ["DM", "German Mark"],
    legalBasis: "Sejarah Keuangan"
  },
  {
    id: 136,
    term: "Deviasi",
    category: "contracts",
    definition: "Penyimpangan dari rute pengiriman",
    example: "Deviasi kapal karena badai",
    relatedTerms: ["Deviation", "Penyimpangan Rute"],
    legalBasis: "KUHD"
  },
  {
    id: 137,
    term: "Devisa",
    category: "finance",
    definition: "Valuta asing yang dapat diterima BI",
    example: "Devisa ekspor Indonesia",
    relatedTerms: ["Foreign Exchange", "Valas"],
    legalBasis: "UU Devisa"
  },
  {
    id: 138,
    term: "Dilusi Saham",
    category: "finance",
    definition: "Pengurangan persentase kepemilikan karena emisi saham baru",
    example: "Dilusi setelah rights issue",
    relatedTerms: ["Share Dilution", "Pengenceran Saham"],
    legalBasis: "UU PT"
  },
  {
    id: 139,
    term: "Direksi",
    category: "corporate",
    definition: "Organ perusahaan yang mengelola operasional",
    example: "Direksi bertanggung jawab kepada RUPS",
    relatedTerms: ["Board of Directors", "Pengurus"],
    legalBasis: "UU PT Pasal 92"
  },
  {
    id: 140,
    term: "Direct Investment",
    category: "finance",
    definition: "Investasi langsung ke perusahaan",
    example: "FDI ke pabrik baru",
    relatedTerms: ["Penanaman Modal Langsung", "FDI"],
    legalBasis: "UU Penanaman Modal"
  },
  {
    id: 141,
    term: "Director Liability",
    category: "corporate",
    definition: "Tanggung jawab direksi atas kerugian perusahaan",
    example: "Tanggung jawab pribadi jika lalai",
    relatedTerms: ["Tanggung Jawab Direksi", "Fiduciary Duty"],
    legalBasis: "UU PT Pasal 97"
  },
  {
    id: 142,
    term: "Disclaimer",
    category: "legal",
    definition: "Pernyataan penolakan tanggung jawab",
    example: "Disclaimer dalam kontrak",
    relatedTerms: ["Penolakan", "Waiver"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 143,
    term: "Disclosure",
    category: "compliance",
    definition: "Pengungkapan informasi",
    example: "Disclosure konflik kepentingan",
    relatedTerms: ["Pengungkapan", "Transparency"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 144,
    term: "Discount",
    category: "finance",
    definition: "Potongan harga",
    example: "Discount penjualan volume besar",
    relatedTerms: ["Potongan", "Rabat"],
    legalBasis: "Praktik Dagang"
  },
  {
    id: 145,
    term: "Dishonor",
    category: "finance",
    definition: "Penolakan pembayaran wesel/cek",
    example: "Dishonor cek karena dana tidak cukup",
    relatedTerms: ["Penolakan Pembayaran", "Non-payment"],
    legalBasis: "KUHD"
  },
  {
    id: 146,
    term: "Dispute Resolution",
    category: "legal",
    definition: "Penyelesaian sengketa",
    example: "Clause dispute resolution dalam kontrak",
    relatedTerms: ["Penyelesaian Sengketa", "Litigasi"],
    legalBasis: "Hukum Acara"
  },
  {
    id: 147,
    term: "Dissolution",
    category: "corporate",
    definition: "Pembubaran perusahaan",
    example: "Dissolution PT melalui RUPS",
    relatedTerms: ["Pembubaran", "Liquidation"],
    legalBasis: "UU PT Pasal 142"
  },
  {
    id: 148,
    term: "Distributor",
    category: "trade",
    definition: "Pihak yang mendistribusikan barang",
    example: "Distributor resmi merek internasional",
    relatedTerms: ["Distributor", "Agen Distribusi"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 149,
    term: "Dividend",
    category: "finance",
    definition: "Pembagian laba kepada pemegang saham",
    example: "Dividen tunai per saham",
    relatedTerms: ["Dividen", "Profit Sharing"],
    legalBasis: "UU PT Pasal 70"
  },
  {
    id: 150,
    term: "Dokumen Perusahaan",
    category: "corporate",
    definition: "Dokumen resmi perusahaan",
    example: "Akta pendirian dan TDP",
    relatedTerms: ["Company Documents", "Dokumen Perseroan"],
    legalBasis: "UU PT"
  },
  {
    id: 151,
    term: "Domisili Hukum",
    category: "legal",
    definition: "Tempat kedudukan hukum",
    example: "Domisili perusahaan di alamat kantor",
    relatedTerms: ["Legal Domicile", "Tempat Kedudukan"],
    legalBasis: "KUH Perdata Pasal 17"
  },
  {
    id: 152,
    term: "DPRD",
    category: "compliance",
    definition: "Dewan Perwakilan Rakyat Daerah",
    example: "Persetujuan DPRD untuk anggaran daerah",
    relatedTerms: ["Dewan Daerah", "Local Parliament"],
    legalBasis: "UU Pemda"
  },
  {
    id: 153,
    term: "Due Diligence",
    category: "legal",
    definition: "Pemeriksaan teliti sebelum transaksi",
    example: "Due diligence akuisisi perusahaan",
    relatedTerms: ["Uji Tuntas", "Due Diligence Review"],
    legalBasis: "Praktik Hukum"
  },
  {
    id: 154,
    term: "Dumping",
    category: "trade",
    definition: "Penjualan barang di bawah harga pasar",
    example: "Dumping produk China di Indonesia",
    relatedTerms: ["Predatory Pricing", "Penjualan Dumping"],
    legalBasis: "UU Anti Dumping"
  },
  {
    id: 155,
    term: "Duta Besar",
    category: "legal",
    definition: "Perwakilan tertinggi negara di luar negeri",
    example: "Dubes Indonesia di AS",
    relatedTerms: ["Ambassador", "Perwakilan Diplomatik"],
    legalBasis: "UU Hubungan Luar Negeri"
  },
  {
    id: 156,
    term: "E-Commerce",
    category: "trade",
    definition: "Perdagangan elektronik melalui internet",
    example: "Platform e-commerce seperti Tokopedia",
    relatedTerms: ["Perdagangan Elektronik", "Online Trade"],
    legalBasis: "UU ITE"
  },
  {
    id: 157,
    term: "E-Money",
    category: "finance",
    definition: "Uang elektronik",
    example: "Gopay dan OVO sebagai e-money",
    relatedTerms: ["Uang Elektronik", "Digital Money"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 158,
    term: "Early Retirement",
    category: "employment",
    definition: "Pensiun dini karyawan",
    example: "Program early retirement perusahaan",
    relatedTerms: ["Pensiun Dini", "Voluntary Retirement"],
    legalBasis: "UU Ketenagakerjaan"
  },
  {
    id: 159,
    term: "Earmarking",
    category: "finance",
    definition: "Pengalokasian dana untuk tujuan spesifik",
    example: "Earmarking pajak untuk pendidikan",
    relatedTerms: ["Alokasi Khusus", "Designated Funds"],
    legalBasis: "UU Keuangan Negara"
  },
  {
    id: 160,
    term: "Ebitda",
    category: "accounting",
    definition: "Pendapatan sebelum bunga, pajak, depresiasi, amortisasi",
    example: "EBITDA perusahaan mencapai Rp 1 triliun",
    relatedTerms: ["EBITDA", "Operating Profit"],
    legalBasis: "Standar Akuntansi"
  },
  {
    id: 161,
    term: "Economic Value Added",
    category: "accounting",
    definition: "Nilai tambah ekonomi perusahaan",
    example: "Perhitungan EVA untuk kinerja perusahaan",
    relatedTerms: ["EVA", "Nilai Tambah Ekonomi"],
    legalBasis: "Manajemen Keuangan"
  },
  {
    id: 162,
    term: "Efek",
    category: "finance",
    definition: "Surat berharga yang diperdagangkan di pasar modal",
    example: "Saham dan obligasi sebagai efek",
    relatedTerms: ["Securities", "Instrumen Keuangan"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 163,
    term: "Efficiency",
    category: "business-types",
    definition: "Penggunaan sumber daya secara optimal",
    example: "Efficiency operasional perusahaan",
    relatedTerms: ["Efisiensi", "Optimalisasi"],
    legalBasis: "Manajemen"
  },
  {
    id: 164,
    term: "EFT",
    category: "finance",
    definition: "Electronic Funds Transfer",
    example: "Transfer dana antar bank secara elektronik",
    relatedTerms: ["Transfer Elektronik", "EFT"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 165,
    term: "Egm",
    category: "corporate",
    definition: "Extraordinary General Meeting of Shareholders",
    example: "RUPSLB untuk akuisisi",
    relatedTerms: ["RUPSLB", "Extraordinary Meeting"],
    legalBasis: "UU PT Pasal 78"
  },
  {
    id: 166,
    term: "Employee Stock Ownership Plan",
    category: "employment",
    definition: "Program kepemilikan saham karyawan",
    example: "ESOP untuk retensi karyawan",
    relatedTerms: ["ESOP", "Saham Karyawan"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 167,
    term: "Endorsement",
    category: "finance",
    definition: "Pengalihan wesel dengan tanda tangan",
    example: "Endorsement cek ke pihak ketiga",
    relatedTerms: ["Pengalihan", "Transfer"],
    legalBasis: "KUHD"
  },
  {
    id: 168,
    term: "Enterprise Resource Planning",
    category: "business-types",
    definition: "Sistem terintegrasi pengelolaan sumber daya perusahaan",
    example: "ERP SAP untuk perusahaan besar",
    relatedTerms: ["ERP", "Sistem Manajemen"],
    legalBasis: "Praktik Bisnis"
  },
  {
    id: 169,
    term: "Entity",
    category: "corporate",
    definition: "Badan usaha atau organisasi",
    example: "Business entity seperti PT",
    relatedTerms: ["Entitas", "Badan Usaha"],
    legalBasis: "UU PT"
  },
  {
    id: 170,
    term: "Equity",
    category: "accounting",
    definition: "Modal pemilik perusahaan",
    example: "Ekuitas setelah dikurangi liabilitas",
    relatedTerms: ["Ekuitas", "Owner's Equity"],
    legalBasis: "PSAK"
  },
  {
    id: 171,
    term: "Esg",
    category: "compliance",
    definition: "Environmental, Social, Governance",
    example: "Investasi ESG berkelanjutan",
    relatedTerms: ["ESG", "Sustainable Investing"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 172,
    term: "Ethical Code",
    category: "compliance",
    definition: "Kode etik perusahaan",
    example: "Ethical code anti korupsi",
    relatedTerms: ["Kode Etik", "Code of Conduct"],
    legalBasis: "Corporate Governance"
  },
  {
    id: 173,
    term: "Ex Gratia",
    category: "legal",
    definition: "Pembayaran sukarela tanpa kewajiban hukum",
    example: "Ex gratia compensation untuk korban",
    relatedTerms: ["Pembayaran Sukarela", "Voluntary Payment"],
    legalBasis: "Praktik Hukum"
  },
  {
    id: 174,
    term: "Ex Officio",
    category: "legal",
    definition: "Berdasarkan jabatan",
    example: "Direktur ex officio sebagai komisaris",
    relatedTerms: ["Berdasarkan Jabatan", "By Virtue of Office"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 175,
    term: "Exchange Rate",
    category: "finance",
    definition: "Nilai tukar mata uang",
    example: "Kurs USD to IDR",
    relatedTerms: ["Kurs", "Rate"],
    legalBasis: "UU Mata Uang"
  },
  {
    id: 176,
    term: "Exclusive Agreement",
    category: "contracts",
    definition: "Perjanjian eksklusif dengan satu pihak",
    example: "Exclusive distribution agreement",
    relatedTerms: ["Perjanjian Eksklusif", "Sole Agreement"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 177,
    term: "Executive Summary",
    category: "corporate",
    definition: "Ringkasan eksekutif dokumen",
    example: "Executive summary business plan",
    relatedTerms: ["Ringkasan Eksekutif", "Summary"],
    legalBasis: "Praktik Bisnis"
  },
  {
    id: 178,
    term: "Exim Bank",
    category: "finance",
    definition: "Bank ekspor impor",
    example: "Exim Bank Indonesia",
    relatedTerms: ["Export-Import Bank", "Bank Ekspor"],
    legalBasis: "UU Perbankan"
  },
  {
    id: 179,
    term: "Export",
    category: "trade",
    definition: "Penjualan barang ke luar negeri",
    example: "Ekspor kelapa sawit Indonesia",
    relatedTerms: ["Ekspor", "Foreign Sales"],
    legalBasis: "UU Perdagangan"
  },
  {
    id: 180,
    term: "Factoring",
    category: "finance",
    definition: "Penjualan piutang untuk mendapatkan kas",
    example: "Factoring piutang dagang",
    relatedTerms: ["Anjak Piutang", "Invoice Financing"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 181,
    term: "Fair Trade",
    category: "trade",
    definition: "Perdagangan adil yang memperhatikan kesejahteraan produsen",
    example: "Produk fair trade kopi Indonesia",
    relatedTerms: ["Perdagangan Adil", "Ethical Trade"],
    legalBasis: "Prinsip Perdagangan Internasional"
  },
  {
    id: 182,
    term: "Fasilitas Kredit",
    category: "finance",
    definition: "Pinjaman dari bank untuk usaha",
    example: "Kredit modal kerja",
    relatedTerms: ["Credit Facility", "Pinjaman Bank"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 183,
    term: "Feasibility Study",
    category: "business-types",
    definition: "Studi kelayakan proyek",
    example: "FS untuk investasi baru",
    relatedTerms: ["Studi Kelayakan", "FS"],
    legalBasis: "Praktik Bisnis"
  },
  {
    id: 184,
    term: "Fiduciary Duty",
    category: "corporate",
    definition: "Kewajiban fidusia direksi/komisaris",
    example: "Duty of care dan loyalty",
    relatedTerms: ["Kewajiban Fidusia", "Trust Duty"],
    legalBasis: "UU PT Pasal 97 dan 114"
  },
  {
    id: 185,
    term: "Financial Statement",
    category: "accounting",
    definition: "Laporan keuangan perusahaan",
    example: "Neraca, laba rugi, arus kas",
    relatedTerms: ["Laporan Keuangan", "Financial Report"],
    legalBasis: "PSAK"
  },
  {
    id: 186,
    term: "Fintech",
    category: "finance",
    definition: "Teknologi keuangan inovatif",
    example: "Fintech lending P2P",
    relatedTerms: ["Financial Technology", "Teknologi Keuangan"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 187,
    term: "Firma",
    category: "business-types",
    definition: "Persekutuan firma untuk usaha",
    example: "Firma pengacara",
    relatedTerms: ["Persekutuan Firma", "General Partnership"],
    legalBasis: "KUHD Pasal 16-18"
  },
  {
    id: 188,
    term: "Fiscal Policy",
    category: "tax",
    definition: "Kebijakan pemerintah melalui pajak dan anggaran",
    example: "Stimulus fiskal saat pandemi",
    relatedTerms: ["Kebijakan Fiskal", "Tax Policy"],
    legalBasis: "UU Keuangan Negara"
  },
  {
    id: 189,
    term: "Fixed Assets",
    category: "accounting",
    definition: "Aset tetap perusahaan",
    example: "Tanah dan gedung kantor",
    relatedTerms: ["Aset Tetap", "Tangible Assets"],
    legalBasis: "PSAK"
  },
  {
    id: 190,
    term: "Force Majeure",
    category: "contracts",
    definition: "Keadaan memaksa yang membebaskan kewajiban",
    example: "Force majeure karena pandemi COVID-19",
    relatedTerms: ["Keadaan Kahar", "Act of God"],
    legalBasis: "KUH Perdata Pasal 1244"
  },
  {
    id: 191,
    term: "Foreign Investment",
    category: "finance",
    definition: "Investasi asing di Indonesia",
    example: "PMA di sektor manufaktur",
    relatedTerms: ["Penanaman Modal Asing", "PMA"],
    legalBasis: "UU No. 25/2007"
  },
  {
    id: 192,
    term: "Forensic Audit",
    category: "accounting",
    definition: "Audit investigasi untuk kasus pidana",
    example: "Forensic audit kasus korupsi",
    relatedTerms: ["Audit Forensik", "Investigative Audit"],
    legalBasis: "Standar Audit"
  },
  {
    id: 193,
    term: "Franchise",
    category: "contracts",
    definition: "Lisensi penggunaan merek dan sistem bisnis",
    example: "Franchise restoran cepat saji",
    relatedTerms: ["Waralaba", "Franchising"],
    legalBasis: "PP No. 42/2007"
  },
  {
    id: 194,
    term: "Free Trade Agreement",
    category: "trade",
    definition: "Perjanjian perdagangan bebas antarnegara",
    example: "AFTA ASEAN",
    relatedTerms: ["FTA", "Perdagangan Bebas"],
    legalBasis: "UU Ratifikasi"
  },
  {
    id: 195,
    term: "Fungsi Bisnis",
    category: "business-types",
    definition: "Aktivitas utama bisnis",
    example: "Fungsi produksi, pemasaran, keuangan",
    relatedTerms: ["Business Function", "Fungsi Usaha"],
    legalBasis: "Manajemen Bisnis"
  },
  {
    id: 196,
    term: "Futures Contract",
    category: "finance",
    definition: "Kontrak jual beli komoditas masa depan",
    example: "Futures minyak mentah",
    relatedTerms: ["Kontrak Berjangka", "Futures"],
    legalBasis: "UU Perdagangan Berjangka"
  },
  {
    id: 197,
    term: "Gaji",
    category: "employment",
    definition: "Upah karyawan secara periodik",
    example: "Gaji bulanan pegawai",
    relatedTerms: ["Salary", "Upah"],
    legalBasis: "UU Ketenagakerjaan Pasal 88"
  },
  {
    id: 198,
    term: "General Meeting of Shareholders",
    category: "corporate",
    definition: "Rapat umum pemegang saham",
    example: "RUPS tahunan untuk laporan direksi",
    relatedTerms: ["RUPS", "GMS"],
    legalBasis: "UU PT Pasal 78"
  },
  {
    id: 199,
    term: "Going Concern",
    category: "accounting",
    definition: "Asumsi perusahaan akan terus beroperasi",
    example: "Audit going concern perusahaan",
    relatedTerms: ["Kelangsungan Usaha", "Continuity"],
    legalBasis: "PSAK"
  },
  {
    id: 200,
    term: "Good Faith",
    category: "contracts",
    definition: "Itikad baik dalam transaksi",
    example: "Negosiasi kontrak dengan good faith",
    relatedTerms: ["Itikad Baik", "Bona Fide"],
    legalBasis: "KUH Perdata Pasal 1338"
  },
  {
    id: 201,
    term: "Goodwill",
    category: "accounting",
    definition: "Nilai lebih akuisisi di atas aset neto",
    example: "Goodwill dalam merger perusahaan",
    relatedTerms: ["Nilai Lebih", "Intangible Asset"],
    legalBasis: "PSAK"
  },
  {
    id: 202,
    term: "Governance",
    category: "compliance",
    definition: "Tata kelola organisasi",
    example: "Corporate governance PT",
    relatedTerms: ["Tata Kelola", "Management"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 203,
    term: "Government Guarantee",
    category: "finance",
    definition: "Jaminan pemerintah atas kewajiban",
    example: "Guarantee untuk pinjaman infrastruktur",
    relatedTerms: ["Jaminan Pemerintah", "State Guarantee"],
    legalBasis: "UU Keuangan Negara"
  },
  {
    id: 204,
    term: "Gratis",
    category: "contracts",
    definition: "Tanpa bayaran atau hadiah",
    example: "Kontrak gratis untuk promosi",
    relatedTerms: ["Gratuitous", "Tanpa Biaya"],
    legalBasis: "KUH Perdata Pasal 1655"
  },
  {
    id: 205,
    term: "Gross Domestic Product",
    category: "business-types",
    definition: "Nilai produksi barang/jasa dalam negeri",
    example: "GDP Indonesia 2023",
    relatedTerms: ["PDB", "Produk Domestik Bruto"],
    legalBasis: "Statistik Nasional"
  },
  {
    id: 206,
    term: "Guarantee",
    category: "finance",
    definition: "Jaminan atas kewajiban",
    example: "Corporate guarantee untuk pinjaman anak perusahaan",
    relatedTerms: ["Jaminan", "Surety"],
    legalBasis: "KUH Perdata Pasal 1820"
  },
  {
    id: 207,
    term: "Hak Prioritas",
    category: "corporate",
    definition: "Hak pemegang saham untuk beli saham baru",
    example: "Preemptive rights dalam emisi saham",
    relatedTerms: ["Preemptive Right", "HMETD"],
    legalBasis: "UU PT Pasal 43"
  },
  {
    id: 208,
    term: "Hak Suara",
    category: "corporate",
    definition: "Hak memilih dalam RUPS",
    example: "Satu saham satu suara",
    relatedTerms: ["Voting Right", "Hak Voting"],
    legalBasis: "UU PT Pasal 84"
  },
  {
    id: 209,
    term: "Hak Veto",
    category: "corporate",
    definition: "Hak menolak keputusan",
    example: "Veto pemegang saham mayoritas",
    relatedTerms: ["Veto Right", "Hak Menolak"],
    legalBasis: "Anggaran Dasar PT"
  },
  {
    id: 210,
    term: "Hedging",
    category: "finance",
    definition: "Lindung nilai risiko keuangan",
    example: "Hedging valas untuk impor",
    relatedTerms: ["Lindung Nilai", "Risk Management"],
    legalBasis: "Peraturan BI"
  },
  {
    id: 211,
    term: "Hostile Takeover",
    category: "corporate",
    definition: "Akuisisi tanpa persetujuan manajemen",
    example: "Pengambilalihan melalui tender offer",
    relatedTerms: ["Pengambilalihan Paksa", "Unfriendly Takeover"],
    legalBasis: "UU PT"
  },
  {
    id: 212,
    term: "Human Resources",
    category: "employment",
    definition: "Manajemen sumber daya manusia",
    example: "Departemen HR perusahaan",
    relatedTerms: ["SDM", "HRM"],
    legalBasis: "UU Ketenagakerjaan"
  },
  {
    id: 213,
    term: "Hutang Lancar",
    category: "accounting",
    definition: "Kewajiban jatuh tempo kurang dari satu tahun",
    example: "Utang dagang dan pinjaman jangka pendek",
    relatedTerms: ["Current Liabilities", "Kewajiban Lancar"],
    legalBasis: "PSAK"
  },
  {
    id: 214,
    term: "Imbal Jasa",
    category: "employment",
    definition: "Bayaran atas jasa yang diberikan",
    example: "Imbal jasa konsultan",
    relatedTerms: ["Fee", "Remuneration"],
    legalBasis: "UU Ketenagakerjaan"
  },
  {
    id: 215,
    term: "Import",
    category: "trade",
    definition: "Pemasukan barang dari luar negeri",
    example: "Impor mesin industri",
    relatedTerms: ["Impor", "Inbound Trade"],
    legalBasis: "UU Perdagangan"
  },
  {
    id: 216,
    term: "Income Statement",
    category: "accounting",
    definition: "Laporan laba rugi perusahaan",
    example: "Laporan penghasilan dan biaya",
    relatedTerms: ["Laporan Laba Rugi", "Profit Loss Statement"],
    legalBasis: "PSAK"
  },
  {
    id: 217,
    term: "Incorporation",
    category: "corporate",
    definition: "Proses pendirian badan hukum",
    example: "Incorporation PT baru",
    relatedTerms: ["Pendirian Perusahaan", "Formation"],
    legalBasis: "UU PT Pasal 7"
  },
  {
    id: 218,
    term: "Indemnity",
    category: "contracts",
    definition: "Ganti rugi atas kerugian",
    example: "Indemnity clause dalam kontrak",
    relatedTerms: ["Ganti Rugi", "Compensation"],
    legalBasis: "KUH Perdata Pasal 1365"
  },
  {
    id: 219,
    term: "Repurchase Agreement",
    category: "finance",
    definition: "Perjanjian jual beli surat berharga dengan janji beli kembali",
    example: "Bank melakukan repo untuk mendapat likuiditas jangka pendek",
    relatedTerms: ["Repo", "Securities Lending"],
    legalBasis: "Peraturan Bank Indonesia"
  },
  {
    id: 220,
    term: "Return on Investment",
    category: "finance",
    definition: "Tingkat pengembalian investasi",
    example: "ROI proyek mencapai 25% per tahun",
    relatedTerms: ["ROI", "Investment Return"],
    legalBasis: "Standar Akuntansi"
  },
  {
    id: 221,
    term: "Revenue Recognition",
    category: "accounting",
    definition: "Pengakuan pendapatan sesuai standar akuntansi",
    example: "Mengakui pendapatan saat barang dikirim ke pembeli",
    relatedTerms: ["Pengakuan Pendapatan", "Income Recognition"],
    legalBasis: "PSAK 72"
  },
  {
    id: 222,
    term: "Revenue Sharing",
    category: "contracts",
    definition: "Pembagian pendapatan antara pihak-pihak",
    example: "Bagi hasil 60-40 antara principal dan agen",
    relatedTerms: ["Bagi Hasil", "Profit Sharing"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 223,
    term: "Revolving Credit",
    category: "finance",
    definition: "Fasilitas kredit yang dapat digunakan berulang",
    example: "Kredit modal kerja revolving Rp 10 miliar",
    relatedTerms: ["Kredit Bergulir", "Line of Credit"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 224,
    term: "Rights Issue",
    category: "corporate",
    definition: "Penawaran saham baru kepada pemegang saham existing",
    example: "HMETD untuk menambah modal perusahaan",
    relatedTerms: ["HMETD", "Penawaran Umum Terbatas"],
    legalBasis: "Peraturan OJK tentang HMETD"
  },
  {
    id: 225,
    term: "Risk Management",
    category: "compliance",
    definition: "Pengelolaan risiko dalam bisnis",
    example: "Implementasi manajemen risiko terintegrasi",
    relatedTerms: ["Manajemen Risiko", "Risk Control"],
    legalBasis: "Peraturan OJK tentang Manajemen Risiko"
  },
  {
    id: 226,
    term: "Royalty Agreement",
    category: "intellectual-property",
    definition: "Perjanjian pembayaran royalti atas penggunaan HKI",
    example: "Royalti 5% dari penjualan untuk penggunaan merek",
    relatedTerms: ["Perjanjian Royalti", "License Fee"],
    legalBasis: "UU Hak Cipta"
  },
  {
    id: 227,
    term: "Sale and Leaseback",
    category: "contracts",
    definition: "Jual aset kemudian sewa kembali dari pembeli",
    example: "Jual gedung kantor lalu sewa kembali untuk operasional",
    relatedTerms: ["Jual Sewa Balik", "Leaseback"],
    legalBasis: "PSAK 73"
  },
  {
    id: 228,
    term: "Sales Agreement",
    category: "contracts",
    definition: "Perjanjian jual beli barang atau jasa",
    example: "Kontrak penjualan produk dengan distributor",
    relatedTerms: ["Perjanjian Jual Beli", "Purchase Agreement"],
    legalBasis: "KUHPerdata Pasal 1457"
  },
  {
    id: 229,
    term: "Secured Transaction",
    category: "finance",
    definition: "Transaksi yang dijamin dengan agunan",
    example: "Kredit dengan jaminan sertifikat tanah",
    relatedTerms: ["Transaksi Terjamin", "Collateralized"],
    legalBasis: "UU Jaminan Fidusia"
  },
  {
    id: 230,
    term: "Securities",
    category: "finance",
    definition: "Surat berharga yang dapat diperdagangkan",
    example: "Saham, obligasi, dan sukuk",
    relatedTerms: ["Efek", "Surat Berharga"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 231,
    term: "Service Agreement",
    category: "contracts",
    definition: "Perjanjian penyediaan jasa",
    example: "Kontrak jasa konsultan manajemen",
    relatedTerms: ["Perjanjian Jasa", "Service Contract"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 232,
    term: "Settlement",
    category: "legal",
    definition: "Penyelesaian sengketa di luar pengadilan",
    example: "Penyelesaian sengketa melalui mediasi",
    relatedTerms: ["Penyelesaian", "Dispute Resolution"],
    legalBasis: "UU Arbitrase dan APS"
  },
  {
    id: 233,
    term: "Share Purchase Agreement",
    category: "corporate",
    definition: "Perjanjian jual beli saham perusahaan",
    example: "SPA untuk akuisisi 51% saham target",
    relatedTerms: ["SPA", "Perjanjian Jual Beli Saham"],
    legalBasis: "UU PT dan OJK"
  },
  {
    id: 234,
    term: "Shareholders Agreement",
    category: "corporate",
    definition: "Perjanjian antar pemegang saham",
    example: "SHA mengatur hak dan kewajiban pemegang saham",
    relatedTerms: ["SHA", "Perjanjian Pemegang Saham"],
    legalBasis: "UU PT"
  },
  {
    id: 235,
    term: "Shell Company",
    category: "corporate",
    definition: "Perusahaan tanpa operasi bisnis aktif",
    example: "Perusahaan cangkang untuk tujuan akuisisi",
    relatedTerms: ["Perusahaan Kosong", "Paper Company"],
    legalBasis: "UU PT"
  },
  {
    id: 236,
    term: "Short Selling",
    category: "finance",
    definition: "Menjual efek yang dipinjam dengan harapan harga turun",
    example: "Short selling saham untuk mendapat keuntungan dari penurunan harga",
    relatedTerms: ["Jual Kosong", "Securities Borrowing"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 237,
    term: "Silent Partner",
    category: "corporate",
    definition: "Sekutu komanditer yang tidak aktif mengelola",
    example: "Investor pasif dalam CV",
    relatedTerms: ["Sekutu Pasif", "Limited Partner"],
    legalBasis: "KUHD"
  },
  {
    id: 238,
    term: "Small Medium Enterprise",
    category: "business-types",
    definition: "Usaha kecil dan menengah",
    example: "UKM dengan omzet di bawah Rp 50 miliar",
    relatedTerms: ["UKM", "UMKM"],
    legalBasis: "UU UMKM"
  },
  {
    id: 239,
    term: "Special Purpose Vehicle",
    category: "corporate",
    definition: "Entitas khusus untuk tujuan tertentu",
    example: "SPV untuk proyek infrastruktur",
    relatedTerms: ["SPV", "Entitas Bertujuan Khusus"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 240,
    term: "Spin-off",
    category: "corporate",
    definition: "Pemisahan unit bisnis menjadi perusahaan terpisah",
    example: "Spin-off divisi teknologi menjadi anak perusahaan",
    relatedTerms: ["Pemisahan Usaha", "Demerger"],
    legalBasis: "UU PT"
  },
  {
    id: 241,
    term: "Standby Letter of Credit",
    category: "finance",
    definition: "L/C yang berfungsi sebagai jaminan",
    example: "SBLC untuk jaminan pelaksanaan kontrak",
    relatedTerms: ["SBLC", "Performance Guarantee"],
    legalBasis: "UCP 600"
  },
  {
    id: 242,
    term: "Stock Option",
    category: "corporate",
    definition: "Hak untuk membeli saham pada harga tertentu",
    example: "ESOP untuk karyawan kunci",
    relatedTerms: ["Opsi Saham", "ESOP"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 243,
    term: "Strategic Alliance",
    category: "contracts",
    definition: "Aliansi strategis antar perusahaan",
    example: "Kerjasama strategis untuk pengembangan produk baru",
    relatedTerms: ["Aliansi Strategis", "Partnership"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 244,
    term: "Subordinated Loan",
    category: "finance",
    definition: "Pinjaman yang pembayarannya di bawah kreditur lain",
    example: "Pinjaman subordinasi dari pemegang saham",
    relatedTerms: ["Pinjaman Subordinasi", "Junior Debt"],
    legalBasis: "UU Kepailitan"
  },
  {
    id: 245,
    term: "Subscription Agreement",
    category: "corporate",
    definition: "Perjanjian pemesanan saham atau obligasi",
    example: "Subscription untuk penerbitan saham baru",
    relatedTerms: ["Perjanjian Pemesanan", "Share Subscription"],
    legalBasis: "UU PT"
  },
  {
    id: 246,
    term: "Subsidiary Company",
    category: "corporate",
    definition: "Anak perusahaan yang dikuasai induk",
    example: "Anak perusahaan dengan kepemilikan 70%",
    relatedTerms: ["Anak Perusahaan", "Controlled Company"],
    legalBasis: "UU PT"
  },
  {
    id: 247,
    term: "Sukuk",
    category: "finance",
    definition: "Obligasi syariah berdasarkan aset",
    example: "Penerbitan sukuk ijarah untuk pembiayaan infrastruktur",
    relatedTerms: ["Obligasi Syariah", "Islamic Bond"],
    legalBasis: "UU Surat Berharga Syariah Negara"
  },
  {
    id: 248,
    term: "Supply Agreement",
    category: "contracts",
    definition: "Perjanjian pasokan barang jangka panjang",
    example: "Kontrak supply bahan baku selama 5 tahun",
    relatedTerms: ["Perjanjian Pasokan", "Procurement Contract"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 249,
    term: "Swap Agreement",
    category: "finance",
    definition: "Perjanjian tukar menukar pembayaran",
    example: "Interest rate swap untuk lindung nilai",
    relatedTerms: ["Perjanjian Swap", "Derivative"],
    legalBasis: "Peraturan Bank Indonesia"
  },
  {
    id: 250,
    term: "Syndicated Loan",
    category: "finance",
    definition: "Pinjaman yang diberikan oleh beberapa bank",
    example: "Kredit sindikasi Rp 1 triliun dari 5 bank",
    relatedTerms: ["Kredit Sindikasi", "Loan Syndication"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 251,
    term: "Tag Along Rights",
    category: "corporate",
    definition: "Hak pemegang saham minoritas ikut menjual",
    example: "Minoritas berhak ikut jual jika mayoritas menjual",
    relatedTerms: ["Hak Ikut Jual", "Co-sale Rights"],
    legalBasis: "Perjanjian Pemegang Saham"
  },
  {
    id: 252,
    term: "Take or Pay",
    category: "contracts",
    definition: "Kewajiban bayar meski tidak ambil barang",
    example: "Kontrak gas dengan klausul take or pay",
    relatedTerms: ["Ambil atau Bayar", "Minimum Purchase"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 253,
    term: "Takeover",
    category: "corporate",
    definition: "Pengambilalihan kendali perusahaan",
    example: "Hostile takeover melalui tender offer",
    relatedTerms: ["Akuisisi", "Pengambilalihan"],
    legalBasis: "Peraturan OJK tentang Akuisisi"
  },
  {
    id: 254,
    term: "Tax Haven",
    category: "tax",
    definition: "Negara dengan pajak rendah atau nol",
    example: "Perusahaan di negara tax haven untuk optimasi pajak",
    relatedTerms: ["Surga Pajak", "Low Tax Jurisdiction"],
    legalBasis: "UU Pajak Penghasilan"
  },
  {
    id: 255,
    term: "Tax Planning",
    category: "tax",
    definition: "Perencanaan pajak untuk efisiensi",
    example: "Strukturisasi transaksi untuk optimasi pajak legal",
    relatedTerms: ["Perencanaan Pajak", "Tax Optimization"],
    legalBasis: "UU KUP"
  },
  {
    id: 256,
    term: "Tax Treaty",
    category: "tax",
    definition: "Perjanjian penghindaran pajak berganda",
    example: "P3B Indonesia-Singapura",
    relatedTerms: ["P3B", "Double Tax Agreement"],
    legalBasis: "UU Pajak Internasional"
  },
  {
    id: 257,
    term: "Technology Transfer",
    category: "intellectual-property",
    definition: "Pengalihan teknologi antar pihak",
    example: "Transfer teknologi dari perusahaan asing",
    relatedTerms: ["Alih Teknologi", "Tech Transfer"],
    legalBasis: "UU Alih Teknologi"
  },
  {
    id: 258,
    term: "Tender Offer",
    category: "corporate",
    definition: "Penawaran beli saham langsung ke pemegang saham",
    example: "Tender offer untuk akuisisi perusahaan publik",
    relatedTerms: ["Penawaran Tender", "Public Offer"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 259,
    term: "Term Loan",
    category: "finance",
    definition: "Pinjaman dengan jangka waktu tetap",
    example: "Term loan 5 tahun untuk ekspansi pabrik",
    relatedTerms: ["Pinjaman Berjangka", "Fixed Term Loan"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 260,
    term: "Term Sheet",
    category: "contracts",
    definition: "Ringkasan syarat dan ketentuan kesepakatan",
    example: "Term sheet investasi Series A",
    relatedTerms: ["Lembar Kesepakatan", "MOU"],
    legalBasis: "Praktik Bisnis"
  },
  {
    id: 261,
    term: "Termination Clause",
    category: "contracts",
    definition: "Klausul pengakhiran kontrak",
    example: "Terminasi karena wanprestasi atau force majeure",
    relatedTerms: ["Klausul Pengakhiran", "Exit Clause"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 262,
    term: "Third Party Guarantee",
    category: "finance",
    definition: "Jaminan dari pihak ketiga",
    example: "Corporate guarantee dari perusahaan induk",
    relatedTerms: ["Jaminan Pihak Ketiga", "Borgtocht"],
    legalBasis: "KUHPerdata Pasal 1820"
  },
  {
    id: 263,
    term: "Time Charter",
    category: "contracts",
    definition: "Sewa kapal untuk jangka waktu tertentu",
    example: "Time charter kapal tanker selama 2 tahun",
    relatedTerms: ["Sewa Waktu", "Charter Party"],
    legalBasis: "KUHD"
  },
  {
    id: 264,
    term: "Title Transfer",
    category: "legal",
    definition: "Pemindahan hak kepemilikan",
    example: "Transfer kepemilikan tanah melalui AJB",
    relatedTerms: ["Balik Nama", "Ownership Transfer"],
    legalBasis: "UU Pertanahan"
  },
  {
    id: 265,
    term: "Trade Finance",
    category: "finance",
    definition: "Pembiayaan perdagangan internasional",
    example: "L/C untuk impor bahan baku",
    relatedTerms: ["Pembiayaan Perdagangan", "Export Finance"],
    legalBasis: "UCP 600"
  },
  {
    id: 266,
    term: "Trade Secret",
    category: "intellectual-property",
    definition: "Informasi rahasia yang bernilai ekonomi",
    example: "Formula rahasia produk makanan",
    relatedTerms: ["Rahasia Dagang", "Confidential Information"],
    legalBasis: "UU Rahasia Dagang"
  },
  {
    id: 267,
    term: "Trading Halt",
    category: "finance",
    definition: "Penghentian sementara perdagangan saham",
    example: "Suspensi saham karena corporate action",
    relatedTerms: ["Suspensi", "Trading Suspension"],
    legalBasis: "Peraturan BEI"
  },
  {
    id: 268,
    term: "Transfer Pricing",
    category: "tax",
    definition: "Penetapan harga transfer antar perusahaan afiliasi",
    example: "Harga transfer sesuai arm's length principle",
    relatedTerms: ["Harga Transfer", "TP"],
    legalBasis: "PMK Transfer Pricing"
  },
  {
    id: 269,
    term: "Treasury Shares",
    category: "corporate",
    definition: "Saham yang dibeli kembali perusahaan",
    example: "Buyback saham untuk treasury",
    relatedTerms: ["Saham Treasuri", "Share Buyback"],
    legalBasis: "UU PT dan Peraturan OJK"
  },
  {
    id: 270,
    term: "Trust Agreement",
    category: "finance",
    definition: "Perjanjian kepercayaan pengelolaan aset",
    example: "Trust untuk pengelolaan dana pensiun",
    relatedTerms: ["Perjanjian Trust", "Fiduciary Agreement"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 271,
    term: "Trust Receipt",
    category: "finance",
    definition: "Dokumen kepercayaan dalam pembiayaan impor",
    example: "TR untuk penguasaan barang impor sebelum pelunasan",
    relatedTerms: ["Tanda Terima Trust", "TR"],
    legalBasis: "Peraturan Bank Indonesia"
  },
  {
    id: 272,
    term: "Turnkey Contract",
    category: "contracts",
    definition: "Kontrak proyek siap pakai",
    example: "Kontrak EPC untuk pembangunan pabrik",
    relatedTerms: ["Kontrak Siap Pakai", "EPC Contract"],
    legalBasis: "FIDIC"
  },
  {
    id: 273,
    term: "Umbrella Agreement",
    category: "contracts",
    definition: "Perjanjian induk untuk beberapa transaksi",
    example: "Master agreement untuk serangkaian kontrak",
    relatedTerms: ["Perjanjian Payung", "Master Agreement"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 274,
    term: "Underwriting",
    category: "finance",
    definition: "Penjaminan emisi efek atau asuransi",
    example: "Underwriting IPO oleh sekuritas",
    relatedTerms: ["Penjaminan Emisi", "Securities Underwriting"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 275,
    term: "Unfair Competition",
    category: "compliance",
    definition: "Persaingan usaha tidak sehat",
    example: "Predatory pricing untuk mematikan pesaing",
    relatedTerms: ["Persaingan Curang", "Anti-competitive"],
    legalBasis: "UU Antimonopoli"
  },
  {
    id: 276,
    term: "Upstream-Downstream",
    category: "business-types",
    definition: "Hulu dan hilir dalam rantai bisnis",
    example: "Integrasi vertikal dari hulu ke hilir",
    relatedTerms: ["Hulu-Hilir", "Vertical Integration"],
    legalBasis: "UU Migas"
  },
  {
    id: 277,
    term: "Valuation",
    category: "finance",
    definition: "Penilaian nilai perusahaan atau aset",
    example: "Valuasi perusahaan untuk M&A",
    relatedTerms: ["Penilaian", "Appraisal"],
    legalBasis: "Standar Penilaian Indonesia"
  },
  {
    id: 278,
    term: "Vendor Financing",
    category: "finance",
    definition: "Pembiayaan yang diberikan supplier",
    example: "Supplier memberikan kredit 60 hari",
    relatedTerms: ["Pembiayaan Vendor", "Supplier Credit"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 279,
    term: "Venture Capital",
    category: "finance",
    definition: "Modal ventura untuk startup",
    example: "VC funding untuk perusahaan teknologi",
    relatedTerms: ["Modal Ventura", "VC"],
    legalBasis: "Peraturan OJK tentang Modal Ventura"
  },
  {
    id: 280,
    term: "Vertical Integration",
    category: "corporate",
    definition: "Integrasi usaha dalam satu rantai nilai",
    example: "Perusahaan menguasai dari produksi hingga distribusi",
    relatedTerms: ["Integrasi Vertikal", "Supply Chain Integration"],
    legalBasis: "UU Antimonopoli"
  },
  {
    id: 281,
    term: "Vesting Period",
    category: "corporate",
    definition: "Periode sebelum hak dapat dieksekusi",
    example: "ESOP dengan vesting 3 tahun",
    relatedTerms: ["Masa Tunggu", "Lock-up Period"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 282,
    term: "Voluntary Disclosure",
    category: "compliance",
    definition: "Pengungkapan sukarela informasi perusahaan",
    example: "Laporan keberlanjutan sebagai voluntary disclosure",
    relatedTerms: ["Keterbukaan Sukarela", "Optional Disclosure"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 283,
    term: "Voting Rights",
    category: "corporate",
    definition: "Hak suara dalam RUPS",
    example: "Satu saham satu suara dalam RUPS",
    relatedTerms: ["Hak Suara", "Shareholder Voting"],
    legalBasis: "UU PT"
  },
  {
    id: 284,
    term: "Waiver",
    category: "legal",
    definition: "Pengabaian hak atau ketentuan",
    example: "Waiver covenant ratio utang",
    relatedTerms: ["Pengabaian Hak", "Exemption"],
    legalBasis: "KUHPerdata"
  },
  {
    id: 285,
    term: "Warehouse Receipt",
    category: "finance",
    definition: "Resi gudang sebagai dokumen kepemilikan",
    example: "Resi gudang untuk pembiayaan komoditas",
    relatedTerms: ["Resi Gudang", "Storage Receipt"],
    legalBasis: "UU Sistem Resi Gudang"
  },
  {
    id: 286,
    term: "Warrant",
    category: "finance",
    definition: "Hak beli saham pada harga dan waktu tertentu",
    example: "Waran sebagai pemanis obligasi",
    relatedTerms: ["Waran", "Stock Warrant"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 287,
    term: "Warranty",
    category: "contracts",
    definition: "Jaminan atas kondisi barang/jasa",
    example: "Garansi produk selama 1 tahun",
    relatedTerms: ["Garansi", "Guarantee"],
    legalBasis: "UU Perlindungan Konsumen"
  },
  {
    id: 288,
    term: "Whitewash Resolution",
    category: "corporate",
    definition: "Persetujuan RUPS untuk transaksi tertentu",
    example: "Whitewash untuk mandatory tender offer",
    relatedTerms: ["Resolusi Pemutihan", "Waiver Resolution"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 289,
    term: "Wholly Owned Subsidiary",
    category: "corporate",
    definition: "Anak perusahaan dengan kepemilikan 100%",
    example: "Anak perusahaan yang sepenuhnya dimiliki",
    relatedTerms: ["Anak Perusahaan Penuh", "100% Subsidiary"],
    legalBasis: "UU PT"
  },
  {
    id: 290,
    term: "Winding Up",
    category: "corporate",
    definition: "Proses pembubaran perusahaan",
    example: "Likuidasi dan pembagian aset perusahaan",
    relatedTerms: ["Pembubaran", "Liquidation"],
    legalBasis: "UU PT"
  },
  {
    id: 291,
    term: "Working Capital",
    category: "finance",
    definition: "Modal kerja untuk operasional",
    example: "Kredit modal kerja untuk membiayai produksi",
    relatedTerms: ["Modal Kerja", "Operating Capital"],
    legalBasis: "Standar Akuntansi"
  },
  {
    id: 292,
    term: "Write-off",
    category: "accounting",
    definition: "Penghapusan nilai aset atau piutang",
    example: "Write-off piutang tak tertagih",
    relatedTerms: ["Penghapusan", "Bad Debt"],
    legalBasis: "PSAK"
  },
  {
    id: 293,
    term: "Yield",
    category: "finance",
    definition: "Tingkat pengembalian investasi",
    example: "Yield obligasi 8% per tahun",
    relatedTerms: ["Imbal Hasil", "Return"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 294,
    term: "Zero Coupon Bond",
    category: "finance",
    definition: "Obligasi tanpa bunga periodik",
    example: "Obligasi dijual diskon, dibayar penuh saat jatuh tempo",
    relatedTerms: ["Obligasi Tanpa Kupon", "Discount Bond"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 295,
    term: "Zone Agreement",
    category: "contracts",
    definition: "Perjanjian wilayah distribusi eksklusif",
    example: "Hak distribusi eksklusif untuk wilayah tertentu",
    relatedTerms: ["Perjanjian Wilayah", "Territory Agreement"],
    legalBasis: "UU Antimonopoli"
  }
  ];
  
  // Fungsi utilitas
  const businessLawUtils = {
    // Kategorisasi istilah
    getCategoryCounts: function() {
      const counts: { [key: string]: number } = {};
      businessLawTerms.forEach(term => {
        counts[term.category] = (counts[term.category] || 0) + 1;
      });
      return counts;
    },
  
    // Pencarian istilah
    searchTerms: function(query: string) {
      const searchQuery = query.toLowerCase();
      return businessLawTerms.filter(term =>
        term.term.toLowerCase().includes(searchQuery) ||
        term.definition.toLowerCase().includes(searchQuery) ||
        term.example?.toLowerCase().includes(searchQuery) ||
        term.relatedTerms?.some(rt => rt.toLowerCase().includes(searchQuery))
      );
    },
  
    // Filter berdasarkan kategori
    filterByCategory: function(category: string) {
      return businessLawTerms.filter(term => term.category === category);
    },
  
    // Mendapatkan istilah acak
    getRandomTerm: function() {
      const randomIndex = Math.floor(Math.random() * businessLawTerms.length);
      return businessLawTerms[randomIndex];
    },
  
    // Export ke CSV
    exportToCSV: function() {
      const headers = ['ID', 'Term', 'Category', 'Definition', 'Example', 'Related Terms', 'Legal Basis'];
      const csvContent = [
        headers.join(','),
        ...businessLawTerms.map(term => [
          term.id,
          `"${term.term}"`,
          term.category,
          `"${term.definition}"`,
          `"${term.example || ''}"`,
          `"${term.relatedTerms?.join('; ') || ''}"`,
          `"${term.legalBasis || ''}"`,
        ].join(','))
      ].join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'istilah-hukum-bisnis.csv';
      link.click();
    },
  
    // Export ke JSON
    exportToJSON: function() {
      const dataStr = JSON.stringify(businessLawTerms, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'istilah-hukum-bisnis.json';
      link.click();
    }
  };
  
  // Batik Pattern Component untuk tema Nusantara
  const BatikPatternBisnis = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute inset-0 w-full h-full opacity-5 pointer-events-none ${className}`}>
      <defs>
        <pattern id="batik-bisnis" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect x="10" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="70" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="10" y="70" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="70" y="70" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="90" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="30" cy="90" r="12" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="90" cy="90" r="12" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <path d="M30,30 L90,90 M90,30 L30,90" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik-bisnis)" />
    </svg>
  );

  // 3D Card Component dengan efek hover
  const Card3D = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ 
          delay, 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ scale: 1.02, translateY: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative ${className}`}
      >
        <motion.div
          animate={isHovered ? { rotateY: 5, rotateX: -5 } : { rotateY: 0, rotateX: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };

  // Component React untuk menampilkan istilah dengan tema Nusantara
  export const BusinessLawDictionary: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'alphabetical' | 'category'>('alphabetical');
    const [bookmarkedTerms, setBookmarkedTerms] = useState<number[]>([]);
    const [showStats, setShowStats] = useState(true);
    const [expandedTerms, setExpandedTerms] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    
    const { scrollY } = useScroll();
    const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);
    const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

    // Load bookmarks from localStorage
    useEffect(() => {
      const saved = localStorage.getItem('bookmarkedBusinessTerms');
      if (saved) {
        try {
          setBookmarkedTerms(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading bookmarks:', e);
        }
      }
    }, []);

    const toggleBookmark = (id: number) => {
      const newBookmarks = bookmarkedTerms.includes(id)
        ? bookmarkedTerms.filter(i => i !== id)
        : [...bookmarkedTerms, id];
      
      setBookmarkedTerms(newBookmarks);
      localStorage.setItem('bookmarkedBusinessTerms', JSON.stringify(newBookmarks));
    };

    const toggleExpanded = (id: number) => {
      setExpandedTerms(prev => 
        prev.includes(id) 
          ? prev.filter(termId => termId !== id)
          : [...prev, id]
      );
    };
  
    const filteredTerms = useMemo(() => {
      let terms = selectedCategory === 'all' 
        ? businessLawTerms 
        : businessLawUtils.filterByCategory(selectedCategory);
      
      if (searchQuery) {
        terms = terms.filter(term =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.example?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sorting
      if (sortBy === 'category') {
        terms.sort((a, b) => a.category.localeCompare(b.category));
      } else {
        terms.sort((a, b) => a.term.localeCompare(b.term));
      }
      
      return terms;
    }, [searchQuery, selectedCategory, sortBy]);

    // Pagination logic
    const totalPages = Math.ceil(filteredTerms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTerms = filteredTerms.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page when filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery, selectedCategory]);
  
    const categoryCounts = useMemo(() => businessLawUtils.getCategoryCounts(), []);

    // Category icons mapping
    const categoryIcons: { [key: string]: any } = {
      'corporate': Building,
      'contracts': ScrollText,
      'finance': DollarSign,
      'tax': BarChart3,
      'compliance': Shield,
      'intellectual-property': Lightbulb,
      'employment': Users,
      'legal': Scale,
      'accounting': BookOpen,
      'business-types': Briefcase,
      'trade': Globe
    };

    // Statistics
    const statistics = useMemo(() => ({
      total: businessLawTerms.length,
      categories: Object.keys(categoryCounts).length,
      withExamples: businessLawTerms.filter(t => t.example).length,
      avgRelatedTerms: Math.round(businessLawTerms.reduce((acc, t) => acc + (t.relatedTerms?.length || 0), 0) / businessLawTerms.length)
    }), [categoryCounts]);
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
        <BatikPatternBisnis className="text-emerald-900" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-emerald-200 rounded-full blur-3xl opacity-30"
          />
        </div>

        {/* Enhanced Header with 3D effect */}
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-blue-600 text-white relative overflow-hidden"
        >
          <BatikPatternBisnis className="text-white opacity-10" />
          
          <div className="relative z-10 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
                >
                  <Briefcase className="h-10 w-10 sm:h-12 sm:w-12" />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h1 
                    className="text-3xl sm:text-5xl font-bold mb-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Kamus Istilah Hukum Bisnis
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-emerald-100"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {businessLawTerms.length} istilah hukum bisnis lengkap dengan definisi, contoh, dan dasar hukum
                  </motion.p>
                </div>

                {/* Live Stats Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
                >
                  <Activity className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-medium">Database Lengkap</span>
                </motion.div>
              </motion.div>

              {/* Quick Stats Bar */}
              {showStats && (
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                    <Hash className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-300 mb-1" />
                    <div className="text-xl sm:text-2xl font-bold">{statistics.total}</div>
                    <div className="text-xs sm:text-sm text-emerald-100">Total Istilah</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300 mb-1" />
                    <div className="text-xl sm:text-2xl font-bold">{statistics.categories}</div>
                    <div className="text-xs sm:text-sm text-emerald-100">Kategori</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 mb-1" />
                    <div className="text-xl sm:text-2xl font-bold">{statistics.withExamples}</div>
                    <div className="text-xs sm:text-sm text-emerald-100">Dengan Contoh</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-purple-300 mb-1" />
                    <div className="text-xl sm:text-2xl font-bold">{statistics.avgRelatedTerms}</div>
                    <div className="text-xs sm:text-sm text-emerald-100">Rata-rata Relasi</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
  
        {/* Enhanced Search and Filter Controls */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg border-b border-emerald-100">
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <div className="flex-1 min-w-[280px]">
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari istilah hukum bisnis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              </div>

              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 w-4 h-4 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer hover:bg-white transition-all"
                >
                  <option value="all">Semua Kategori ({businessLawTerms.length})</option>
                  <option value="corporate">Corporate ({categoryCounts.corporate || 0})</option>
                  <option value="contracts">Contracts ({categoryCounts.contracts || 0})</option>
                  <option value="finance">Finance ({categoryCounts.finance || 0})</option>
                  <option value="tax">Tax ({categoryCounts.tax || 0})</option>
                  <option value="compliance">Compliance ({categoryCounts.compliance || 0})</option>
                  <option value="intellectual-property">IP ({categoryCounts['intellectual-property'] || 0})</option>
                  <option value="employment">Employment ({categoryCounts.employment || 0})</option>
                  <option value="legal">Legal ({categoryCounts.legal || 0})</option>
                  <option value="accounting">Accounting ({categoryCounts.accounting || 0})</option>
                  <option value="business-types">Business Types ({categoryCounts['business-types'] || 0})</option>
                  <option value="trade">Trade ({categoryCounts.trade || 0})</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 w-4 h-4 pointer-events-none" />
              </motion.div>

              {/* Sort Options */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-2"
              >
                <button
                  onClick={() => setSortBy(sortBy === 'alphabetical' ? 'category' : 'alphabetical')}
                  className="px-4 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl hover:bg-white transition-all flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">
                    {sortBy === 'alphabetical' ? 'A-Z' : 'Kategori'}
                  </span>
                </button>
                
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="px-4 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl hover:bg-white transition-all"
                >
                  {viewMode === 'grid' ? '☰' : '⊞'}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
  
        {/* Results Count and View Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.p 
              className="text-gray-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Menampilkan <span className="text-emerald-600 font-bold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTerms.length)}</span> dari <span className="text-emerald-600 font-bold">{filteredTerms.length}</span> istilah
            </motion.p>
          </div>
        </div>
  
        {/* Enhanced Terms Grid with 3D Cards and Inline Expand */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          <div className="space-y-4">
            {paginatedTerms.map((term, index) => {
              const Icon = categoryIcons[term.category] || Briefcase;
              const isBookmarked = bookmarkedTerms.includes(term.id);
              const isExpanded = expandedTerms.includes(term.id);
              
              return (
                <Card3D key={term.id} delay={Math.min(index * 0.02, 0.3)}>
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-emerald-100 overflow-hidden"
                    layout
                  >
                    {/* Card Header - Clickable */}
                    <div 
                      className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 border-b border-emerald-100 cursor-pointer hover:from-emerald-100 hover:to-blue-100 transition-all"
                      onClick={() => toggleExpanded(term.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors">
                              {term.term}
                            </h3>
                            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${getCategoryColor(term.category)}`}>
                              {term.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {/* Bookmark button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(term.id);
                            }}
                            className="p-1.5 hover:bg-white rounded-lg transition-all"
                          >
                            <Bookmark 
                              className={`h-4 w-4 ${isBookmarked ? 'fill-emerald-500 text-emerald-500' : 'text-gray-400'}`}
                            />
                          </button>
                          
                          {/* Expand button */}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Body - Always visible */}
                    <div className="p-4">
                      <p className="text-gray-700 text-sm mb-3">
                        {term.definition}
                      </p>
                    </div>

                    {/* Expanded Content - Inline */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-4">
                            {/* Example */}
                            {term.example && (
                              <div className="bg-emerald-50 rounded-lg p-3">
                                <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4" />
                                  Contoh:
                                </h4>
                                <p className="text-emerald-700 text-sm italic">
                                  {term.example}
                                </p>
                              </div>
                            )}
                            
                            {/* Legal Basis */}
                            {term.legalBasis && (
                              <div className="bg-blue-50 rounded-lg p-3">
                                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                  <Scale className="h-4 w-4" />
                                  Dasar Hukum:
                                </h4>
                                <p className="text-blue-700 text-sm">
                                  {term.legalBasis}
                                </p>
                              </div>
                            )}
                            
                            {/* Related Terms */}
                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                              <div className="bg-purple-50 rounded-lg p-3">
                                <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  Istilah Terkait:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {term.relatedTerms.map((rt, idx) => (
                                    <span
                                      key={idx}
                                      className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200 hover:bg-purple-200 transition-colors cursor-pointer"
                                    >
                                      {rt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  ID: {term.id}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(`${term.term}: ${term.definition}`);
                                }}
                                className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
                              >
                                <Share2 className="h-3 w-3" />
                                Salin
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Card3D>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-emerald-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
              >
                ← Sebelumnya
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-emerald-200 hover:bg-emerald-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-emerald-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
              >
                Selanjutnya →
              </button>
            </motion.div>
          )}
        </div>
  
        
  
        {/* Export Buttons */}
        <div className="fixed bottom-6 right-6 flex gap-2">
          <button
            onClick={() => businessLawUtils.exportToJSON()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={() => businessLawUtils.exportToCSV()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>
    );
  };
  
  // Helper function untuk warna kategori
  function getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'corporate': 'bg-blue-100 text-blue-700',
      'contracts': 'bg-green-100 text-green-700',
      'finance': 'bg-purple-100 text-purple-700',
      'tax': 'bg-yellow-100 text-yellow-700',
      'compliance': 'bg-red-100 text-red-700',
      'intellectual-property': 'bg-indigo-100 text-indigo-700',
      'employment': 'bg-orange-100 text-orange-700',
      'legal': 'bg-gray-100 text-gray-700',
      'accounting': 'bg-pink-100 text-pink-700',
      'business-types': 'bg-teal-100 text-teal-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  }
  
  export { businessLawTerms, businessLawUtils };
  