import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, FileText, X } from 'lucide-react';

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
  }
  // Catatan: Karena permintaan hanya hingga 218, array di atas sudah lengkap dari 1-218. Jika diperlukan lebih, dapat ditambahkan.
];

// Fungsi utilitas lengkap tanpa singkatan
const businessLawUtils = {
  getCategoryCounts: function() {
    const counts: { [key: string]: number } = {};
    businessLawTerms.forEach(term => {
      counts[term.category] = (counts[term.category] || 0) + 1;
    });
    return counts;
  },

  searchTerms: function(query: string) {
    const searchQuery = query.toLowerCase();
    return businessLawTerms.filter(term =>
      term.term.toLowerCase().includes(searchQuery) ||
      term.definition.toLowerCase().includes(searchQuery) ||
      term.example.toLowerCase().includes(searchQuery) ||
      term.relatedTerms.some(rt => rt.toLowerCase().includes(searchQuery))
    );
  },

  filterByCategory: function(category: string) {
    return businessLawTerms.filter(term => term.category === category);
  },

  getRandomTerm: function() {
    const randomIndex = Math.floor(Math.random() * businessLawTerms.length);
    return businessLawTerms[randomIndex];
  },

  exportToCSV: function() {
    const headers = ['ID', 'Term', 'Category', 'Definition', 'Example', 'Related Terms', 'Legal Basis'];
    const csvContent = [
      headers.join(','),
      ...businessLawTerms.map(term => [
        term.id,
        `"${term.term}"`,
        term.category,
        `"${term.definition}"`,
        `"${term.example}"`,
        `"${term.relatedTerms.join('; ')}"`,
        `"${term.legalBasis}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'istilah-hukum-bisnis.csv';
    link.click();
  },

  exportToJSON: function() {
    const dataStr = JSON.stringify(businessLawTerms, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'istilah-hukum-bisnis.json';
    link.click();
  }
};

// Komponen React untuk menampilkan istilah (lengkap, tanpa singkatan)
export const BusinessLawDictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState<BusinessLawTerm | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = selectedCategory === 'all' 
      ? businessLawTerms 
      : businessLawUtils.filterByCategory(selectedCategory);
    
    if (searchQuery) {
      terms = terms.filter(term =>
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return terms;
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => businessLawUtils.getCategoryCounts(), []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Kamus Istilah Hukum Bisnis</h1>
        <p className="text-blue-100">
          {businessLawTerms.length} istilah hukum bisnis lengkap dengan definisi dan contoh
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari istilah hukum bisnis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-gray-600">
          Menampilkan {filteredTerms.length} istilah
        </p>
      </div>

      {/* Terms Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((term) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedTerm(term)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{term.term}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(term.category)}`}>
                    {term.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{term.definition}</p>
                <p className="text-gray-500 text-xs italic line-clamp-2">
                  Contoh: {term.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTerm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTerm.term}</h2>
                    <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedTerm.category)}`}>
                      {selectedTerm.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTerm(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Definisi</h3>
                    <p className="text-gray-600">{selectedTerm.definition}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Contoh</h3>
                    <p className="text-gray-600 italic">{selectedTerm.example}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Istilah Terkait</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.relatedTerms.map((rt, idx) => (
                        <span
                          key={idx}
                          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                          {rt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Dasar Hukum</h3>
                    <p className="text-gray-600">{selectedTerm.legalBasis}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

// Fungsi helper untuk warna kategori
function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    corporate: 'bg-blue-100 text-blue-700',
    contracts: 'bg-green-100 text-green-700',
    finance: 'bg-purple-100 text-purple-700',
    tax: 'bg-yellow-100 text-yellow-700',
    compliance: 'bg-red-100 text-red-700',
    'intellectual-property': 'bg-indigo-100 text-indigo-700',
    employment: 'bg-orange-100 text-orange-700',
    legal: 'bg-gray-100 text-gray-700',
    accounting: 'bg-pink-100 text-pink-700',
    'business-types': 'bg-teal-100 text-teal-700',
    trade: 'bg-cyan-100 text-cyan-700'
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
}

export { businessLawTerms, businessLawUtils };
