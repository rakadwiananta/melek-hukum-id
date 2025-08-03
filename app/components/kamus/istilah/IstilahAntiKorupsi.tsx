'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Gavel, 
  Search, 
  BookOpen, 
  AlertTriangle,
  Scale,
  Shield,
  Info,
  ChevronRight,
  Filter,
  Download,
  Share2,
  Clock,
  TrendingUp,
  Hash,
  Globe,
  FileText,
  Users,
  Zap,
  Eye,
  Lock,
  Calendar,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Star,
  Bookmark,
  ArrowUpDown,
  Building2,
  ShieldCheck,
  AlertCircle,
  HandCoins,
  Ban,
  UserX,
  FileWarning,
  Coins,
  Siren,
  UserCheck,
  FileSearch
} from 'lucide-react'

// Tipe data untuk istilah
interface Term {
  id: number
  term: string
  category: string
  definition: string
  example?: string
  legalBasis: string
  relatedTerms?: string[]
  trending?: boolean
  englishTerm?: string
  additionalNotes?: string
}

// Data Istilah Anti Korupsi Lengkap (312 istilah)
const istilahAntiKorupsiData = {
  metadata: {
    total: 312,
    lastUpdated: '20 November 2024',
    sources: [
      'UU No. 31/1999 jo UU No. 20/2001 tentang Pemberantasan Tipikor',
      'UU No. 30/2002 tentang Komisi Pemberantasan Korupsi',
      'UU No. 7/2006 tentang Pengesahan UNCAC',
      'UU No. 8/2010 tentang Pencegahan dan Pemberantasan TPPU',
      'UU No. 13/2006 tentang Perlindungan Saksi dan Korban',
      'UU No. 28/1999 tentang Penyelenggara Negara yang Bersih',
      'Peraturan KPK tentang Gratifikasi',
      'Instruksi Presiden tentang Pencegahan Korupsi',
      'Peraturan Mahkamah Agung tentang Tipikor'
    ],
    categories: [
      { id: 'tindak-pidana', name: 'Tindak Pidana Korupsi', count: 42, icon: Gavel },
      { id: 'lembaga', name: 'Lembaga Anti Korupsi', count: 28, icon: Building2 },
      { id: 'pencegahan', name: 'Pencegahan Korupsi', count: 35, icon: Shield },
      { id: 'penegakan', name: 'Penegakan Hukum', count: 31, icon: Scale },
      { id: 'transparansi', name: 'Transparansi & Akuntabilitas', count: 29, icon: Eye },
      { id: 'pengawasan', name: 'Pengawasan & Pengendalian', count: 26, icon: Search },
      { id: 'gratifikasi', name: 'Gratifikasi & Suap', count: 24, icon: HandCoins },
      { id: 'kerugian-negara', name: 'Kerugian Negara', count: 22, icon: Coins },
      { id: 'pengembalian-aset', name: 'Pengembalian Aset', count: 25, icon: FileWarning },
      { id: 'whistleblowing', name: 'Whistleblowing', count: 23, icon: Siren },
      { id: 'integritas', name: 'Integritas & Etika', count: 27, icon: ShieldCheck }
    ]
  },

  // Database istilah (312 terms)
  terms: [
    // A - Abuse of Power dan Anti Corruption (1-30)
    {
      id: 1,
      term: "Abuse of Power",
      category: "tindak-pidana",
      definition: "Penyalahgunaan kekuasaan atau wewenang yang dimiliki pejabat publik untuk kepentingan pribadi atau kelompok",
      example: "Kepala daerah yang menyalahgunakan wewenangnya untuk memenangkan tender proyek kepada perusahaan keluarga",
      legalBasis: "Pasal 3 UU No. 31/1999 jo UU No. 20/2001",
      englishTerm: "Abuse of Power",
      relatedTerms: ["Penyalahgunaan Wewenang", "Maladministrasi", "Korupsi"],
      trending: true
    },
    {
      id: 2,
      term: "ACCH",
      category: "lembaga",
      definition: "Anti-Corruption Clearing House, portal informasi dan pertukaran data anti korupsi antar negara",
      example: "Indonesia berpartisipasi dalam ACCH untuk berbagi praktik terbaik pencegahan korupsi",
      legalBasis: "Kerjasama Internasional KPK",
      englishTerm: "Anti-Corruption Clearing House",
      relatedTerms: ["Portal Anti Korupsi", "Kerjasama Internasional", "UNCAC"]
    },
    {
      id: 3,
      term: "Accountability",
      category: "transparansi",
      definition: "Kewajiban untuk mempertanggungjawabkan pengelolaan dan penggunaan sumber daya publik",
      example: "Pejabat wajib membuat LHKPN sebagai bentuk akuntabilitas",
      legalBasis: "UU No. 28/1999",
      englishTerm: "Accountability",
      relatedTerms: ["Akuntabilitas", "Pertanggungjawaban", "Transparansi"]
    },
    {
      id: 4,
      term: "Aktor Korupsi",
      category: "tindak-pidana",
      definition: "Pihak-pihak yang terlibat dalam tindak pidana korupsi, baik sebagai pelaku aktif maupun pasif",
      example: "Pemberi suap dan penerima suap sama-sama merupakan aktor korupsi",
      legalBasis: "UU Tipikor",
      englishTerm: "Corruption Actor",
      relatedTerms: ["Pelaku Korupsi", "Koruptor", "Tersangka"]
    },
    {
      id: 5,
      term: "Alat Bukti Elektronik",
      category: "penegakan",
      definition: "Informasi elektronik yang dapat digunakan sebagai alat bukti dalam persidangan tindak pidana korupsi",
      example: "Rekaman percakapan, email, dan transfer elektronik sebagai bukti korupsi",
      legalBasis: "Pasal 26A UU No. 20/2001",
      englishTerm: "Electronic Evidence",
      relatedTerms: ["Digital Evidence", "Bukti Digital", "ITE"]
    },
    {
      id: 6,
      term: "Analisis Risiko Korupsi",
      category: "pencegahan",
      definition: "Proses identifikasi dan evaluasi potensi terjadinya korupsi dalam suatu organisasi atau proses bisnis",
      example: "Melakukan pemetaan risiko korupsi pada proses pengadaan barang/jasa",
      legalBasis: "Perpres No. 55/2012",
      englishTerm: "Corruption Risk Analysis",
      relatedTerms: ["Risk Assessment", "Penilaian Risiko", "Mitigasi"]
    },
    {
      id: 7,
      term: "Anti Bribery Management System",
      category: "pencegahan",
      definition: "Sistem manajemen untuk mencegah dan mendeteksi praktik suap dalam organisasi",
      example: "Penerapan ISO 37001 sebagai standar anti penyuapan",
      legalBasis: "ISO 37001:2016",
      englishTerm: "Anti Bribery Management System",
      relatedTerms: ["ABMS", "ISO 37001", "Sistem Anti Suap"],
      trending: true
    },
    {
      id: 8,
      term: "Anti Corruption Agency",
      category: "lembaga",
      definition: "Lembaga khusus yang dibentuk untuk memberantas korupsi",
      example: "KPK sebagai anti corruption agency di Indonesia",
      legalBasis: "UU No. 30/2002",
      englishTerm: "Anti Corruption Agency",
      relatedTerms: ["ACA", "Lembaga Anti Korupsi", "KPK"]
    },
    {
      id: 9,
      term: "APIP",
      category: "pengawasan",
      definition: "Aparat Pengawasan Intern Pemerintah yang melakukan pengawasan intern pada instansi pemerintah",
      example: "Inspektorat Jenderal, Inspektorat Provinsi, BPKP sebagai APIP",
      legalBasis: "PP No. 60/2008",
      englishTerm: "Government Internal Auditor",
      relatedTerms: ["Pengawas Internal", "Internal Auditor", "Inspektorat"]
    },
    {
      id: 10,
      term: "Area Berisiko Korupsi",
      category: "pencegahan",
      definition: "Bidang atau sektor yang memiliki kerentanan tinggi terhadap praktik korupsi",
      example: "Pengadaan barang/jasa, perizinan, dan perpajakan sebagai area berisiko tinggi",
      legalBasis: "Strategi Nasional Pencegahan Korupsi",
      englishTerm: "Corruption Risk Area",
      relatedTerms: ["High Risk Area", "Zona Rawan", "Vulnerable Sector"]
    },
    {
      id: 11,
      term: "Asset Recovery",
      category: "pengembalian-aset",
      definition: "Upaya pengembalian aset hasil tindak pidana korupsi kepada negara",
      example: "Pengembalian aset korupsi dari luar negeri melalui MLA",
      legalBasis: "UU No. 1/2006 (Ratifikasi UNCAC)",
      englishTerm: "Asset Recovery",
      relatedTerms: ["Pengembalian Aset", "StAR", "Asset Return"]
    },
    {
      id: 12,
      term: "Audit Forensik",
      category: "pengawasan",
      definition: "Pemeriksaan khusus untuk mengungkap fraud dan korupsi dengan teknik investigasi",
      example: "BPK melakukan audit forensik terhadap kasus korupsi e-KTP",
      legalBasis: "Standar Pemeriksaan BPK",
      englishTerm: "Forensic Audit",
      relatedTerms: ["Audit Investigatif", "Pemeriksaan Khusus", "Forensic Accounting"]
    },
    {
      id: 13,
      term: "Aset Negara",
      category: "kerugian-negara",
      definition: "Semua barang yang dibeli atau diperoleh atas beban APBN/APBD atau perolehan lain yang sah",
      example: "Tanah, gedung, kendaraan dinas yang dibeli dengan APBN",
      legalBasis: "UU No. 1/2004",
      englishTerm: "State Asset",
      relatedTerms: ["Barang Milik Negara", "BMN", "Kekayaan Negara"]
    },
    {
      id: 14,
      term: "Aset Tersembunyi",
      category: "pengembalian-aset",
      definition: "Harta kekayaan hasil korupsi yang disembunyikan atau tidak dilaporkan",
      example: "Rekening bank di luar negeri yang tidak dilaporkan dalam LHKPN",
      legalBasis: "UU No. 8/2010",
      englishTerm: "Hidden Asset",
      relatedTerms: ["Concealed Asset", "Harta Tersembunyi", "Offshore Account"]
    },
    {
      id: 15,
      term: "Asas Pembalikan Beban Pembuktian",
      category: "penegakan",
      definition: "Kewajiban terdakwa untuk membuktikan harta kekayaannya bukan hasil korupsi",
      example: "Terdakwa harus membuktikan sumber dana pembelian aset mewahnya",
      legalBasis: "Pasal 37 UU No. 31/1999",
      englishTerm: "Reversal Burden of Proof",
      relatedTerms: ["Pembuktian Terbalik", "Reverse Onus", "Shifting Burden"]
    },
    {
      id: 16,
      term: "Asas Praduga Bersalah",
      category: "penegakan",
      definition: "Prinsip dalam hukum pidana korupsi dimana terdakwa dianggap bersalah sampai terbukti sebaliknya untuk harta yang tidak wajar",
      example: "Penerapan pada kasus gratifikasi yang dianggap suap kecuali dibuktikan sebaliknya",
      legalBasis: "Pasal 12B UU No. 20/2001",
      englishTerm: "Presumption of Guilt",
      relatedTerms: ["Praduga Korupsi", "Presumed Corrupt", "Guilty Until Proven"]
    },
    {
      id: 17,
      term: "Anti Money Laundering",
      category: "pencegahan",
      definition: "Upaya pencegahan dan pemberantasan tindak pidana pencucian uang hasil korupsi",
      example: "Bank wajib menerapkan prinsip Know Your Customer untuk AML",
      legalBasis: "UU No. 8/2010",
      englishTerm: "Anti Money Laundering",
      relatedTerms: ["AML", "Anti Pencucian Uang", "TPPU"]
    },
    {
      id: 18,
      term: "Aparatur Sipil Negara",
      category: "integritas",
      definition: "Pegawai negeri yang wajib menjunjung integritas dan bebas dari korupsi",
      example: "ASN dilarang menerima gratifikasi terkait jabatannya",
      legalBasis: "UU No. 5/2014",
      englishTerm: "Civil Servant",
      relatedTerms: ["ASN", "PNS", "Pegawai Negeri"]
    },
    {
      id: 19,
      term: "Asistensi Hukum Korupsi",
      category: "penegakan",
      definition: "Bantuan hukum dalam penanganan kasus korupsi",
      example: "KPK memberikan asistensi kepada kejaksaan dalam kasus korupsi daerah",
      legalBasis: "UU No. 30/2002",
      englishTerm: "Corruption Legal Assistance",
      relatedTerms: ["Bantuan Hukum", "Legal Aid", "Pendampingan Hukum"]
    },
    {
      id: 20,
      term: "Asosiasi Anti Korupsi",
      category: "lembaga",
      definition: "Organisasi masyarakat yang fokus pada pemberantasan korupsi",
      example: "ICW, TI Indonesia sebagai asosiasi anti korupsi",
      legalBasis: "UU No. 17/2013",
      englishTerm: "Anti-Corruption Association",
      relatedTerms: ["CSO Anti Korupsi", "NGO", "Organisasi Masyarakat"]
    },
    {
      id: 21,
      term: "Audit Compliance",
      category: "pengawasan",
      definition: "Pemeriksaan kepatuhan terhadap peraturan untuk mencegah korupsi",
      example: "Audit kepatuhan pengadaan barang/jasa pemerintah",
      legalBasis: "Standar Audit APIP",
      englishTerm: "Compliance Audit",
      relatedTerms: ["Audit Kepatuhan", "Pemeriksaan Ketaatan", "Compliance Check"]
    },
    {
      id: 22,
      term: "Auditor Anti Korupsi",
      category: "pengawasan",
      definition: "Pemeriksa yang memiliki keahlian khusus mendeteksi korupsi",
      example: "Auditor forensik BPK yang bersertifikat CFE",
      legalBasis: "Standar Kompetensi Auditor",
      englishTerm: "Anti-Corruption Auditor",
      relatedTerms: ["Fraud Auditor", "Pemeriksa Korupsi", "Forensic Auditor"]
    },
    {
      id: 23,
      term: "Azas Oportunitas",
      category: "penegakan",
      definition: "Kewenangan jaksa agung untuk mengesampingkan perkara demi kepentingan umum",
      example: "Penghentian perkara korupsi yang telah mengembalikan kerugian negara",
      legalBasis: "Pasal 35c UU Kejaksaan",
      englishTerm: "Opportunity Principle",
      relatedTerms: ["Deponering", "Seponering", "Prosecutorial Discretion"]
    },
    {
      id: 24,
      term: "Ancaman Pidana Korupsi",
      category: "penegakan",
      definition: "Sanksi pidana yang dapat dijatuhkan kepada pelaku tindak pidana korupsi",
      example: "Pidana penjara minimal 4 tahun untuk korupsi pengadaan",
      legalBasis: "Pasal 2-3 UU Tipikor",
      englishTerm: "Corruption Criminal Sanction",
      relatedTerms: ["Hukuman Korupsi", "Sanksi Pidana", "Criminal Penalty"]
    },
    {
      id: 25,
      term: "Anggaran Negara",
      category: "kerugian-negara",
      definition: "APBN dan APBD yang menjadi objek potensial korupsi",
      example: "Korupsi dalam pelaksanaan proyek APBN",
      legalBasis: "UU No. 17/2003",
      englishTerm: "State Budget",
      relatedTerms: ["APBN", "APBD", "Budget Negara"]
    },
    {
      id: 26,
      term: "Anti Corruption Court",
      category: "lembaga",
      definition: "Pengadilan khusus yang menangani perkara tindak pidana korupsi",
      example: "Pengadilan Tipikor pada Pengadilan Negeri Jakarta Pusat",
      legalBasis: "UU No. 46/2009",
      englishTerm: "Anti Corruption Court",
      relatedTerms: ["Pengadilan Tipikor", "Pengadilan Khusus", "Special Court"]
    },
    {
      id: 27,
      term: "Anti Corruption Education",
      category: "pencegahan",
      definition: "Pendidikan anti korupsi untuk membangun budaya integritas",
      example: "Mata kuliah pendidikan anti korupsi di perguruan tinggi",
      legalBasis: "Permendikbud No. 33/2019",
      englishTerm: "Anti Corruption Education",
      relatedTerms: ["Pendidikan Anti Korupsi", "PAK", "Integrity Education"]
    },
    {
      id: 28,
      term: "Anti Corruption Strategy",
      category: "pencegahan",
      definition: "Strategi nasional pencegahan dan pemberantasan korupsi",
      example: "Stranas PK 2019-2024",
      legalBasis: "Perpres No. 54/2018",
      englishTerm: "Anti Corruption Strategy",
      relatedTerms: ["Stranas PK", "Strategi Anti Korupsi", "National Strategy"]
    },
    {
      id: 29,
      term: "APH Tipikor",
      category: "lembaga",
      definition: "Aparat Penegak Hukum yang menangani tindak pidana korupsi",
      example: "KPK, Kejaksaan, Kepolisian sebagai APH Tipikor",
      legalBasis: "UU Tipikor",
      englishTerm: "Corruption Law Enforcement",
      relatedTerms: ["Penegak Hukum", "Law Enforcement", "Aparat"]
    },
    {
      id: 30,
      term: "Aspek Kerugian Negara",
      category: "kerugian-negara",
      definition: "Unsur kerugian keuangan negara dalam tindak pidana korupsi",
      example: "Perhitungan kerugian negara oleh BPK/BPKP",
      legalBasis: "Pasal 2 dan 3 UU Tipikor",
      englishTerm: "State Loss Aspect",
      relatedTerms: ["Kerugian Keuangan Negara", "Financial Loss", "State Damage"]
    },
    
    // B - Barang Bukti dan Benturan Kepentingan (31-60)
    {
      id: 31,
      term: "Barang Bukti Korupsi",
      category: "penegakan",
      definition: "Benda atau dokumen yang digunakan sebagai alat bukti dalam perkara korupsi",
      example: "Uang suap, dokumen palsu, dan aset hasil korupsi sebagai barang bukti",
      legalBasis: "KUHAP jo UU Tipikor",
      englishTerm: "Corruption Evidence",
      relatedTerms: ["Physical Evidence", "Bukti Fisik", "Exhibits"]
    },
    {
      id: 32,
      term: "Barang Gratifikasi",
      category: "gratifikasi",
      definition: "Pemberian dalam bentuk barang yang diterima pejabat terkait jabatannya",
      example: "Mobil mewah yang diberikan pengusaha kepada pejabat",
      legalBasis: "Pasal 12B UU No. 20/2001",
      englishTerm: "Gratification Goods",
      relatedTerms: ["Hadiah", "Gift", "Pemberian"]
    },
    {
      id: 33,
      term: "Beban Pembuktian Terbalik",
      category: "penegakan",
      definition: "Kewajiban terdakwa membuktikan harta kekayaannya diperoleh secara sah",
      example: "Terdakwa korupsi harus buktikan asal-usul hartanya yang tidak wajar",
      legalBasis: "Pasal 37 UU Tipikor",
      englishTerm: "Reverse Burden of Proof",
      relatedTerms: ["Pembuktian Terbalik", "Reverse Onus", "Burden Shifting"]
    },
    {
      id: 34,
      term: "Beneficial Owner",
      category: "pengembalian-aset",
      definition: "Pemilik manfaat sebenarnya dari aset atau perusahaan",
      example: "Mengungkap beneficial owner di balik perusahaan cangkang",
      legalBasis: "Perpres No. 13/2018",
      englishTerm: "Beneficial Owner",
      relatedTerms: ["Pemilik Manfaat", "Ultimate Owner", "PSP"]
    },
    {
      id: 35,
      term: "Benturan Kepentingan",
      category: "integritas",
      definition: "Situasi dimana kepentingan pribadi berpotensi mempengaruhi pelaksanaan tugas secara tidak objektif",
      example: "Pejabat yang mengatur tender dimana perusahaan keluarganya ikut serta",
      legalBasis: "Permen PAN-RB No. 37/2012",
      englishTerm: "Conflict of Interest",
      relatedTerms: ["COI", "Konflik Kepentingan", "Interest Conflict"],
      trending: true
    },
    {
      id: 36,
      term: "Biaya Administrasi PNBP",
      category: "kerugian-negara",
      definition: "Penerimaan Negara Bukan Pajak yang rawan disalahgunakan",
      example: "Manipulasi PNBP pada pelayanan publik",
      legalBasis: "UU No. 9/2018",
      englishTerm: "Non-Tax State Revenue",
      relatedTerms: ["PNBP", "Non Tax Revenue", "Penerimaan Negara"]
    },
    {
      id: 37,
      term: "Biaya Penanganan Perkara",
      category: "penegakan",
      definition: "Biaya yang dikeluarkan untuk proses hukum kasus korupsi",
      example: "Biaya penyidikan, penuntutan, dan persidangan tipikor",
      legalBasis: "PP No. 50/2010",
      englishTerm: "Case Handling Cost",
      relatedTerms: ["Litigation Cost", "Biaya Perkara", "Legal Cost"]
    },
    {
      id: 38,
      term: "Blacklist Koruptor",
      category: "penegakan",
      definition: "Daftar hitam pelaku korupsi yang dilarang mendapat proyek pemerintah",
      example: "Perusahaan yang terbukti korupsi dimasukkan daftar hitam",
      legalBasis: "Perpres No. 16/2018",
      englishTerm: "Corruption Blacklist",
      relatedTerms: ["Daftar Hitam", "Debarment", "Banned List"]
    },
    {
      id: 39,
      term: "Blokir Rekening",
      category: "pengembalian-aset",
      definition: "Pembekuan rekening bank terduga pelaku korupsi",
      example: "PPATK memblokir rekening tersangka korupsi",
      legalBasis: "UU No. 8/2010",
      englishTerm: "Account Freezing",
      relatedTerms: ["Pembekuan Rekening", "Asset Freezing", "Account Block"]
    },
    {
      id: 40,
      term: "BPKP",
      category: "lembaga",
      definition: "Badan Pengawasan Keuangan dan Pembangunan yang melakukan audit dan penghitungan kerugian negara",
      example: "BPKP menghitung kerugian negara dalam kasus korupsi",
      legalBasis: "Keppres No. 103/2001",
      englishTerm: "Financial and Development Supervisory Board",
      relatedTerms: ["Auditor Pemerintah", "Internal Auditor", "APIP"]
    },
    {
      id: 41,
      term: "Brankas Negara",
      category: "kerugian-negara",
      definition: "Istilah untuk keuangan negara yang harus dilindungi dari korupsi",
      example: "Korupsi menggerogoti brankas negara",
      legalBasis: "UU Keuangan Negara",
      englishTerm: "State Coffer",
      relatedTerms: ["Kas Negara", "Treasury", "Keuangan Negara"]
    },
    {
      id: 42,
      term: "Bribery",
      category: "gratifikasi",
      definition: "Tindakan memberi atau menerima suap",
      example: "Bribery dalam proses perizinan",
      legalBasis: "Pasal 5 UU Tipikor",
      englishTerm: "Bribery",
      relatedTerms: ["Penyuapan", "Suap", "Kickback"]
    },
    {
      id: 43,
      term: "Budaya Anti Korupsi",
      category: "integritas",
      definition: "Nilai dan perilaku yang menolak segala bentuk korupsi",
      example: "Membangun budaya anti korupsi di lingkungan kerja",
      legalBasis: "Stranas PK",
      englishTerm: "Anti-Corruption Culture",
      relatedTerms: ["Integrity Culture", "Budaya Integritas", "Clean Culture"]
    },
    {
      id: 44,
      term: "Budget Mafia",
      category: "tindak-pidana",
      definition: "Sindikat yang memanipulasi anggaran untuk kepentingan pribadi",
      example: "Mafia anggaran di DPR yang mengatur alokasi dana",
      legalBasis: "UU Tipikor",
      englishTerm: "Budget Mafia",
      relatedTerms: ["Mafia Anggaran", "Budget Cartel", "Anggaran Mafia"]
    },
    {
      id: 45,
      term: "Bukti Awal",
      category: "penegakan",
      definition: "Bukti permulaan yang cukup untuk memulai penyidikan korupsi",
      example: "Dua alat bukti sebagai bukti permulaan yang cukup",
      legalBasis: "KUHAP jo UU KPK",
      englishTerm: "Preliminary Evidence",
      relatedTerms: ["Initial Evidence", "Bukti Permulaan", "Prima Facie"]
    },
    {
      id: 46,
      term: "Bukti Digital",
      category: "penegakan",
      definition: "Bukti elektronik dalam kasus korupsi",
      example: "Email, chat, dan transfer elektronik sebagai bukti",
      legalBasis: "UU ITE jo UU Tipikor",
      englishTerm: "Digital Evidence",
      relatedTerms: ["Electronic Evidence", "Bukti Elektronik", "E-Evidence"]
    },
    {
      id: 47,
      term: "Bukti Forensik",
      category: "penegakan",
      definition: "Bukti hasil pemeriksaan forensik dalam kasus korupsi",
      example: "Hasil audit forensik BPK sebagai bukti di pengadilan",
      legalBasis: "Hukum Pembuktian",
      englishTerm: "Forensic Evidence",
      relatedTerms: ["Forensic Proof", "Bukti Ilmiah", "Scientific Evidence"]
    },
    {
      id: 48,
      term: "Bukti Permulaan",
      category: "penegakan",
      definition: "Bukti awal untuk menetapkan seseorang sebagai tersangka",
      example: "Minimal dua alat bukti untuk bukti permulaan",
      legalBasis: "Pasal 44 UU KPK",
      englishTerm: "Preliminary Evidence",
      relatedTerms: ["Initial Proof", "Bukti Awal", "Starting Evidence"]
    },
    {
      id: 49,
      term: "Bukti Tidak Langsung",
      category: "penegakan",
      definition: "Bukti yang memerlukan penalaran untuk membuktikan korupsi",
      example: "Gaya hidup mewah tidak sesuai penghasilan sebagai indikasi",
      legalBasis: "Hukum Pembuktian",
      englishTerm: "Circumstantial Evidence",
      relatedTerms: ["Indirect Evidence", "Bukti Circumstantial", "Petunjuk"]
    },
    {
      id: 50,
      term: "Bundel Perkara",
      category: "penegakan",
      definition: "Berkas lengkap perkara korupsi",
      example: "Bundel perkara korupsi diserahkan ke pengadilan",
      legalBasis: "KUHAP",
      englishTerm: "Case Bundle",
      relatedTerms: ["Case File", "Berkas Perkara", "Dossier"]
    },
    {
      id: 51,
      term: "Burden of Proof",
      category: "penegakan",
      definition: "Beban pembuktian dalam perkara korupsi",
      example: "Shifting burden of proof pada kasus gratifikasi",
      legalBasis: "Pasal 12B dan 37 UU Tipikor",
      englishTerm: "Burden of Proof",
      relatedTerms: ["Beban Pembuktian", "Onus of Proof", "Proof Burden"]
    },
    {
      id: 52,
      term: "Bureaucratic Corruption",
      category: "tindak-pidana",
      definition: "Korupsi yang terjadi dalam birokrasi pemerintahan",
      example: "Pungli dalam pelayanan publik",
      legalBasis: "UU Tipikor",
      englishTerm: "Bureaucratic Corruption",
      relatedTerms: ["Korupsi Birokrasi", "Administrative Corruption", "Korupsi Administratif"]
    },
    {
      id: 53,
      term: "Business Integrity",
      category: "integritas",
      definition: "Integritas dalam menjalankan bisnis tanpa korupsi",
      example: "Perusahaan menerapkan pakta integritas dengan mitra",
      legalBasis: "ISO 37001",
      englishTerm: "Business Integrity",
      relatedTerms: ["Integritas Bisnis", "Corporate Integrity", "Clean Business"]
    },
    {
      id: 54,
      term: "Buy Back Aset",
      category: "pengembalian-aset",
      definition: "Pembelian kembali aset hasil korupsi oleh negara",
      example: "Negara membeli kembali aset yang sudah dijual pihak ketiga",
      legalBasis: "UU Pengembalian Aset",
      englishTerm: "Asset Buy Back",
      relatedTerms: ["Pembelian Kembali", "Repurchase", "Asset Redemption"]
    },
    {
      id: 55,
      term: "Biaya Hidup Wajar",
      category: "integritas",
      definition: "Standar pengeluaran yang sesuai dengan penghasilan resmi",
      example: "Pemeriksaan gaya hidup tidak wajar pejabat",
      legalBasis: "Pemeriksaan LHKPN",
      englishTerm: "Reasonable Living Cost",
      relatedTerms: ["Living Standard", "Standar Hidup", "Lifestyle Check"]
    },
    {
      id: 56,
      term: "Birokrasi Bersih",
      category: "integritas",
      definition: "Birokrasi yang bebas dari korupsi, kolusi, dan nepotisme",
      example: "Program reformasi birokrasi untuk clean government",
      legalBasis: "Perpres No. 81/2010",
      englishTerm: "Clean Bureaucracy",
      relatedTerms: ["Clean Government", "Pemerintahan Bersih", "Good Governance"]
    },
    {
      id: 57,
      term: "Black Money",
      category: "tindak-pidana",
      definition: "Uang hasil korupsi atau kejahatan",
      example: "Pencucian black money melalui investasi properti",
      legalBasis: "UU TPPU",
      englishTerm: "Black Money",
      relatedTerms: ["Uang Haram", "Dirty Money", "Illicit Money"]
    },
    {
      id: 58,
      term: "Blind Trust",
      category: "integritas",
      definition: "Pengelolaan aset pejabat oleh pihak ketiga untuk hindari konflik kepentingan",
      example: "Pejabat menempatkan asetnya dalam blind trust",
      legalBasis: "Best Practice Internasional",
      englishTerm: "Blind Trust",
      relatedTerms: ["Trust Buta", "Asset Management", "Pengelolaan Aset"]
    },
    {
      id: 59,
      term: "Blue Collar Crime",
      category: "tindak-pidana",
      definition: "Korupsi level rendah oleh pegawai bawahan",
      example: "Pungli oleh petugas lapangan",
      legalBasis: "UU Tipikor",
      englishTerm: "Blue Collar Crime",
      relatedTerms: ["Korupsi Kecil", "Petty Corruption", "Street Corruption"]
    },
    {
      id: 60,
      term: "Bonus Proyek",
      category: "gratifikasi",
      definition: "Pemberian ilegal terkait pelaksanaan proyek",
      example: "Fee proyek yang diberikan ke pejabat pemberi proyek",
      legalBasis: "Pasal 12 UU Tipikor",
      englishTerm: "Project Bonus",
      relatedTerms: ["Project Fee", "Kickback", "Komisi Proyek"]
    },
    
    // C - Cekal dan Compliance (61-90)
    {
      id: 61,
      term: "Cekal Koruptor",
      category: "penegakan",
      definition: "Pencegahan dan penangkalan tersangka korupsi untuk keluar negeri",
      example: "Tersangka korupsi dicekal oleh Imigrasi atas permintaan KPK",
      legalBasis: "UU No. 6/2011 tentang Keimigrasian",
      englishTerm: "Travel Ban",
      relatedTerms: ["Pencekalan", "Exit Ban", "Larangan Bepergian"]
    },
    {
      id: 62,
      term: "Cek Kosong",
      category: "tindak-pidana",
      definition: "Janji atau pembayaran fiktif dalam konteks korupsi",
      example: "Memberikan cek kosong sebagai jaminan proyek fiktif",
      legalBasis: "Pasal 378 KUHP jo UU Tipikor",
      englishTerm: "Bounced Check",
      relatedTerms: ["Bad Check", "Cek Bodong", "False Payment"]
    },
    {
      id: 63,
      term: "Celah Hukum Korupsi",
      category: "pencegahan",
      definition: "Kelemahan regulasi yang dapat dimanfaatkan untuk korupsi",
      example: "Celah dalam aturan pengadaan yang memungkinkan mark up",
      legalBasis: "Analisis Peraturan",
      englishTerm: "Legal Loophole",
      relatedTerms: ["Regulatory Gap", "Kelemahan Regulasi", "Loophole"]
    },
    {
      id: 64,
      term: "Centralized Corruption",
      category: "tindak-pidana",
      definition: "Korupsi yang terorganisir dan terpusat pada level atas",
      example: "Korupsi sistemik yang melibatkan pimpinan lembaga",
      legalBasis: "Pola Korupsi",
      englishTerm: "Centralized Corruption",
      relatedTerms: ["Korupsi Terpusat", "Systemic Corruption", "Top-down Corruption"]
    },
    {
      id: 65,
      term: "Ciri-ciri Korupsi",
      category: "tindak-pidana",
      definition: "Karakteristik yang menandakan adanya tindak pidana korupsi",
      example: "Pengadaan tanpa tender, harga tidak wajar, kualitas buruk",
      legalBasis: "Tipologi Korupsi",
      englishTerm: "Corruption Indicators",
      relatedTerms: ["Red Flags", "Indikator Korupsi", "Warning Signs"]
    },
    {
      id: 66,
      term: "Clean and Clear",
      category: "integritas",
      definition: "Status bebas dari tuduhan atau keterlibatan korupsi",
      example: "Calon pejabat harus clean and clear dari kasus hukum",
      legalBasis: "Peraturan Pengangkatan Pejabat",
      englishTerm: "Clean and Clear",
      relatedTerms: ["Bersih", "Clear Record", "Bebas Korupsi"]
    },
    {
      id: 67,
      term: "Clean Government",
      category: "integritas",
      definition: "Pemerintahan yang bersih dari korupsi, kolusi, dan nepotisme",
      example: "Komitmen mewujudkan clean government di semua level",
      legalBasis: "TAP MPR No. XI/1998",
      englishTerm: "Clean Government",
      relatedTerms: ["Pemerintahan Bersih", "Good Governance", "KKN-Free"]
    },
    {
      id: 68,
      term: "Clear Desk Policy",
      category: "pencegahan",
      definition: "Kebijakan meja bersih untuk mencegah kebocoran informasi sensitif",
      example: "Dokumen rahasia tender tidak boleh ditinggal di meja",
      legalBasis: "SOP Keamanan Informasi",
      englishTerm: "Clear Desk Policy",
      relatedTerms: ["Meja Bersih", "Information Security", "Document Control"]
    },
    {
      id: 69,
      term: "Code of Conduct",
      category: "integritas",
      definition: "Kode etik yang mengatur perilaku untuk mencegah korupsi",
      example: "Kode etik pegawai melarang menerima gratifikasi",
      legalBasis: "Peraturan Internal Organisasi",
      englishTerm: "Code of Conduct",
      relatedTerms: ["Kode Etik", "Ethical Code", "Pedoman Perilaku"]
    },
    {
      id: 70,
      term: "Collaborative Corruption",
      category: "tindak-pidana",
      definition: "Korupsi yang dilakukan secara bersama-sama",
      example: "Kongkalikong antara pejabat dan pengusaha dalam tender",
      legalBasis: "Pasal 15 UU Tipikor",
      englishTerm: "Collaborative Corruption",
      relatedTerms: ["Korupsi Berjamaah", "Conspiracy", "Kolusi"]
    },
    {
      id: 71,
      term: "Collusion",
      category: "tindak-pidana",
      definition: "Kerjasama rahasia untuk melakukan kecurangan atau korupsi",
      example: "Kolusi dalam penetapan pemenang tender",
      legalBasis: "UU No. 5/1999",
      englishTerm: "Collusion",
      relatedTerms: ["Kolusi", "Persekongkolan", "Conspiracy"]
    },
    {
      id: 72,
      term: "Command Responsibility",
      category: "penegakan",
      definition: "Tanggung jawab pimpinan atas korupsi bawahannya",
      example: "Menteri bertanggung jawab atas korupsi di kementeriannya",
      legalBasis: "Doktrin Hukum",
      englishTerm: "Command Responsibility",
      relatedTerms: ["Tanggung Jawab Komando", "Superior Responsibility", "Leadership Accountability"]
    },
    {
      id: 73,
      term: "Compliance Audit",
      category: "pengawasan",
      definition: "Audit untuk memastikan kepatuhan terhadap aturan anti korupsi",
      example: "Audit kepatuhan terhadap sistem pengadaan barang/jasa",
      legalBasis: "Standar Audit",
      englishTerm: "Compliance Audit",
      relatedTerms: ["Audit Kepatuhan", "Regulatory Audit", "Pemeriksaan Ketaatan"]
    },
    {
      id: 74,
      term: "Compliance Officer",
      category: "pencegahan",
      definition: "Petugas yang memastikan kepatuhan organisasi terhadap aturan anti korupsi",
      example: "GCG officer di BUMN memastikan compliance anti korupsi",
      legalBasis: "Peraturan OJK/BUMN",
      englishTerm: "Compliance Officer",
      relatedTerms: ["Petugas Kepatuhan", "GCG Officer", "Ethics Officer"]
    },
    {
      id: 75,
      term: "Confiscation",
      category: "pengembalian-aset",
      definition: "Perampasan aset hasil korupsi untuk negara",
      example: "Pengadilan memutuskan confiscation aset koruptor",
      legalBasis: "Pasal 18 UU Tipikor",
      englishTerm: "Confiscation",
      relatedTerms: ["Perampasan", "Asset Forfeiture", "Penyitaan"]
    },
    {
      id: 76,
      term: "Conflict of Interest Declaration",
      category: "integritas",
      definition: "Pernyataan adanya potensi benturan kepentingan",
      example: "Pejabat wajib declare jika ada COI dalam pengambilan keputusan",
      legalBasis: "Permen PAN-RB No. 37/2012",
      englishTerm: "COI Declaration",
      relatedTerms: ["Deklarasi Konflik", "Interest Declaration", "Pernyataan COI"]
    },
    {
      id: 77,
      term: "Conspiracy to Corrupt",
      category: "tindak-pidana",
      definition: "Permufakatan jahat untuk melakukan korupsi",
      example: "Persekongkolan tender antara peserta dan panitia",
      legalBasis: "Pasal 15 UU Tipikor",
      englishTerm: "Conspiracy",
      relatedTerms: ["Permufakatan Jahat", "Konspirasi", "Criminal Conspiracy"]
    },
    {
      id: 78,
      term: "Controlled Delivery",
      category: "penegakan",
      definition: "Teknik penyidikan dengan membiarkan barang bukti berpindah dalam pengawasan",
      example: "Membiarkan uang suap berpindah tangan untuk tangkap basah",
      legalBasis: "Teknik Penyidikan",
      englishTerm: "Controlled Delivery",
      relatedTerms: ["Pengiriman Terkontrol", "Surveillance", "Undercover Operation"]
    },
    {
      id: 79,
      term: "Corporate Corruption",
      category: "tindak-pidana",
      definition: "Korupsi yang dilakukan oleh atau melibatkan korporasi",
      example: "Perusahaan menyuap pejabat untuk mendapat proyek",
      legalBasis: "Pasal 20 UU Tipikor",
      englishTerm: "Corporate Corruption",
      relatedTerms: ["Korupsi Korporasi", "Business Corruption", "Company Fraud"]
    },
    {
      id: 80,
      term: "Corporate Criminal Liability",
      category: "penegakan",
      definition: "Pertanggungjawaban pidana korporasi dalam kasus korupsi",
      example: "Perusahaan dipidana denda karena terlibat korupsi",
      legalBasis: "Pasal 20 UU Tipikor",
      englishTerm: "Corporate Criminal Liability",
      relatedTerms: ["Tanggung Jawab Korporasi", "Company Liability", "Pidana Korporasi"]
    },
    {
      id: 81,
      term: "Corruption Case Management",
      category: "penegakan",
      definition: "Sistem pengelolaan penanganan kasus korupsi",
      example: "CMS KPK untuk monitoring progress kasus",
      legalBasis: "SOP Penegakan Hukum",
      englishTerm: "Case Management System",
      relatedTerms: ["Manajemen Kasus", "CMS", "Case Tracking"]
    },
    {
      id: 82,
      term: "Corruption Court",
      category: "lembaga",
      definition: "Pengadilan khusus tindak pidana korupsi",
      example: "Pengadilan Tipikor di 34 provinsi",
      legalBasis: "UU No. 46/2009",
      englishTerm: "Corruption Court",
      relatedTerms: ["Pengadilan Tipikor", "Special Court", "Anti-Corruption Court"]
    },
    {
      id: 83,
      term: "Corruption Eradication Commission",
      category: "lembaga",
      definition: "Komisi Pemberantasan Korupsi (KPK)",
      example: "KPK sebagai leading sector pemberantasan korupsi",
      legalBasis: "UU No. 30/2002",
      englishTerm: "KPK",
      relatedTerms: ["Anti-Corruption Commission", "Komisi Anti Korupsi", "CEC"]
    },
    {
      id: 84,
      term: "Corruption Impact Assessment",
      category: "pencegahan",
      definition: "Penilaian dampak korupsi terhadap pembangunan",
      example: "Mengukur dampak korupsi terhadap kemiskinan",
      legalBasis: "Metodologi Penelitian",
      englishTerm: "Impact Assessment",
      relatedTerms: ["Penilaian Dampak", "Effect Analysis", "Dampak Korupsi"]
    },
    {
      id: 85,
      term: "Corruption Index",
      category: "pengawasan",
      definition: "Indeks yang mengukur tingkat korupsi",
      example: "Corruption Perception Index dari Transparency International",
      legalBasis: "Standar Internasional",
      englishTerm: "Corruption Index",
      relatedTerms: ["CPI", "Indeks Korupsi", "Corruption Measurement"],
      trending: true
    },
    {
      id: 86,
      term: "Corruption Intelligence",
      category: "pengawasan",
      definition: "Intelijen untuk deteksi dini korupsi",
      example: "Unit intelijen KPK mengumpulkan informasi korupsi",
      legalBasis: "UU KPK",
      englishTerm: "Corruption Intelligence",
      relatedTerms: ["Intel Korupsi", "Early Warning", "Intelligence Gathering"]
    },
    {
      id: 87,
      term: "Corruption Mapping",
      category: "pencegahan",
      definition: "Pemetaan area dan modus korupsi",
      example: "Mapping korupsi di sektor perizinan",
      legalBasis: "Strategi Pencegahan",
      englishTerm: "Corruption Mapping",
      relatedTerms: ["Pemetaan Korupsi", "Risk Mapping", "Vulnerability Assessment"]
    },
    {
      id: 88,
      term: "Corruption Network",
      category: "tindak-pidana",
      definition: "Jaringan pelaku korupsi yang terorganisir",
      example: "Mengungkap jaringan korupsi lintas lembaga",
      legalBasis: "Pola Korupsi",
      englishTerm: "Corruption Network",
      relatedTerms: ["Jaringan Korupsi", "Crime Network", "Sindikasi"]
    },
    {
      id: 89,
      term: "Corruption Perception Index",
      category: "pengawasan",
      definition: "Indeks persepsi korupsi yang mengukur tingkat korupsi negara",
      example: "Indonesia mendapat skor 38 dari 100 di CPI 2023",
      legalBasis: "Transparency International",
      englishTerm: "CPI",
      relatedTerms: ["Indeks Persepsi", "Corruption Index", "TI Index"]
    },
    {
      id: 90,
      term: "Corruption Prevention",
      category: "pencegahan",
      definition: "Upaya sistematis mencegah terjadinya korupsi",
      example: "Sistem e-procurement untuk cegah korupsi pengadaan",
      legalBasis: "Stranas PK",
      englishTerm: "Corruption Prevention",
      relatedTerms: ["Pencegahan Korupsi", "Anti-Corruption", "Preventive Measures"]
    },
    
    // D - Dana dan Delik (91-120)
    {
      id: 91,
      term: "Dana Bantuan Sosial",
      category: "kerugian-negara",
      definition: "Anggaran bantuan sosial yang rawan dikorupsi",
      example: "Korupsi bansos COVID-19 oleh menteri sosial",
      legalBasis: "PP No. 39/2012",
      englishTerm: "Social Assistance Fund",
      relatedTerms: ["Bansos", "Social Aid", "Dana Sosial"]
    },
    {
      id: 92,
      term: "Dana Desa",
      category: "kerugian-negara",
      definition: "Anggaran untuk desa yang rawan penyalahgunaan",
      example: "Korupsi dana desa oleh kepala desa",
      legalBasis: "UU No. 6/2014",
      englishTerm: "Village Fund",
      relatedTerms: ["ADD", "Village Budget", "Dana Desa"]
    },
    {
      id: 93,
      term: "Dana Operasional",
      category: "gratifikasi",
      definition: "Dana tidak resmi yang sering menjadi modus korupsi",
      example: "Dana operasional proyek yang tidak dipertanggungjawabkan",
      legalBasis: "Pola Korupsi",
      englishTerm: "Operational Fund",
      relatedTerms: ["Dana Taktis", "Slush Fund", "Dana Siluman"]
    },
    {
      id: 94,
      term: "Dana Politik",
      category: "tindak-pidana",
      definition: "Sumbangan politik ilegal atau hasil korupsi untuk kepentingan politik",
      example: "Menggunakan hasil korupsi untuk kampanye",
      legalBasis: "UU Pemilu jo UU Tipikor",
      englishTerm: "Political Fund",
      relatedTerms: ["Campaign Fund", "Dana Kampanye", "Political Money"]
    },
    {
      id: 95,
      term: "Daftar Hitam Koruptor",
      category: "penegakan",
      definition: "Database pelaku korupsi yang dilarang ikut pengadaan pemerintah",
      example: "Perusahaan koruptor masuk blacklist LKPP",
      legalBasis: "Perpres No. 16/2018",
      englishTerm: "Corruption Blacklist",
      relatedTerms: ["Blacklist", "Daftar Cekal", "Banned List"]
    },
    {
      id: 96,
      term: "Dakwaan Korupsi",
      category: "penegakan",
      definition: "Tuduhan formal jaksa terhadap terdakwa korupsi",
      example: "Dakwaan primer Pasal 2, subsider Pasal 3 UU Tipikor",
      legalBasis: "KUHAP jo UU Tipikor",
      englishTerm: "Corruption Indictment",
      relatedTerms: ["Surat Dakwaan", "Charges", "Prosecution"]
    },
    {
      id: 97,
      term: "Debitur Nakal",
      category: "kerugian-negara",
      definition: "Pengutang yang tidak membayar kredit bank BUMN dan diduga korupsi",
      example: "Kredit macet BLBI yang merugikan negara",
      legalBasis: "UU Perbankan",
      englishTerm: "Bad Debtor",
      relatedTerms: ["NPL", "Kredit Macet", "Default"]
    },
    {
      id: 98,
      term: "Deklarasi LHKPN",
      category: "transparansi",
      definition: "Pengumuman laporan harta kekayaan penyelenggara negara",
      example: "Pejabat mengumumkan LHKPN ke publik",
      legalBasis: "UU No. 28/1999",
      englishTerm: "Wealth Declaration",
      relatedTerms: ["Asset Declaration", "Laporan Harta", "LHKPN"]
    },
    {
      id: 99,
      term: "Delik Aduan",
      category: "tindak-pidana",
      definition: "Tindak pidana korupsi yang hanya dapat diproses jika ada pengaduan",
      example: "Gratifikasi yang nilainya kurang dari Rp 10 juta",
      legalBasis: "Pasal 12B UU Tipikor",
      englishTerm: "Complaint Offense",
      relatedTerms: ["Aduan", "Complaint Crime", "Delik Laporan"]
    },
    {
      id: 100,
      term: "Delik Jabatan",
      category: "tindak-pidana",
      definition: "Tindak pidana yang dilakukan karena jabatannya",
      example: "Penyalahgunaan wewenang oleh pejabat",
      legalBasis: "KUHP jo UU Tipikor",
      englishTerm: "Official Crime",
      relatedTerms: ["Crime of Office", "Kejahatan Jabatan", "Abuse of Office"]
    },
    {
      id: 101,
      term: "Delik Korupsi",
      category: "tindak-pidana",
      definition: "Perbuatan melawan hukum yang merugikan keuangan negara",
      example: "30 jenis delik korupsi dalam UU Tipikor",
      legalBasis: "UU No. 31/1999 jo UU No. 20/2001",
      englishTerm: "Corruption Offense",
      relatedTerms: ["Tindak Pidana Korupsi", "Tipikor", "Corruption Crime"]
    },
    {
      id: 102,
      term: "Delik Percobaan",
      category: "tindak-pidana",
      definition: "Percobaan melakukan tindak pidana korupsi",
      example: "Percobaan menyuap yang gagal tetap dipidana",
      legalBasis: "Pasal 15 UU Tipikor",
      englishTerm: "Attempted Crime",
      relatedTerms: ["Percobaan", "Attempt", "Poging"]
    },
    {
      id: 103,
      term: "Delik Selesai",
      category: "tindak-pidana",
      definition: "Tindak pidana korupsi yang telah selesai dilakukan",
      example: "Suap yang telah diterima pejabat",
      legalBasis: "UU Tipikor",
      englishTerm: "Completed Offense",
      relatedTerms: ["Completed Crime", "Delik Sempurna", "Voltooid Delict"]
    },
    {
      id: 104,
      term: "Denda Korupsi",
      category: "penegakan",
      definition: "Pidana denda yang dijatuhkan kepada koruptor",
      example: "Denda minimal Rp 50 juta untuk korupsi",
      legalBasis: "Pasal 2-14 UU Tipikor",
      englishTerm: "Corruption Fine",
      relatedTerms: ["Monetary Penalty", "Pidana Denda", "Financial Penalty"]
    },
    {
      id: 105,
      term: "Denunciator",
      category: "whistleblowing",
      definition: "Orang yang melaporkan dugaan korupsi",
      example: "Pegawai yang melaporkan korupsi atasannya",
      legalBasis: "Sistem Pelaporan",
      englishTerm: "Denunciator",
      relatedTerms: ["Pelapor", "Informant", "Tipster"]
    },
    {
      id: 106,
      term: "Deposito Gelap",
      category: "pengembalian-aset",
      definition: "Simpanan hasil korupsi yang disembunyikan",
      example: "Deposito atas nama orang lain untuk sembunyikan aset",
      legalBasis: "UU TPPU",
      englishTerm: "Hidden Deposit",
      relatedTerms: ["Dark Deposit", "Simpanan Gelap", "Concealed Savings"]
    },
    {
      id: 107,
      term: "Deteksi Dini Korupsi",
      category: "pencegahan",
      definition: "Sistem untuk mendeteksi potensi korupsi sejak awal",
      example: "Sistem whistleblowing untuk deteksi dini",
      legalBasis: "Sistem Pencegahan",
      englishTerm: "Early Detection",
      relatedTerms: ["Early Warning", "Deteksi Awal", "Prevention System"]
    },
    {
      id: 108,
      term: "Deteriorasi Moral",
      category: "integritas",
      definition: "Kemerosotan moral yang menyebabkan korupsi",
      example: "Budaya permisif terhadap gratifikasi",
      legalBasis: "Analisis Sosial",
      englishTerm: "Moral Deterioration",
      relatedTerms: ["Moral Decay", "Degradasi Moral", "Ethical Decline"]
    },
    {
      id: 109,
      term: "Direksi BUMN",
      category: "integritas",
      definition: "Pimpinan BUMN yang harus bebas korupsi",
      example: "Direksi BUMN wajib lapor LHKPN",
      legalBasis: "UU No. 19/2003",
      englishTerm: "SOE Directors",
      relatedTerms: ["BUMN Board", "State Directors", "Komisaris"]
    },
    {
      id: 110,
      term: "Diskresi Berlebihan",
      category: "tindak-pidana",
      definition: "Penggunaan kewenangan diskresioner yang melampaui batas",
      example: "Diskresi yang menguntungkan pihak tertentu",
      legalBasis: "UU No. 30/2014",
      englishTerm: "Excessive Discretion",
      relatedTerms: ["Abuse of Discretion", "Penyalahgunaan Diskresi", "Ultra Vires"]
    },
    {
      id: 111,
      term: "Diversi Aset",
      category: "pengembalian-aset",
      definition: "Pengalihan aset hasil korupsi ke pihak lain",
      example: "Transfer aset ke keluarga untuk hindari penyitaan",
      legalBasis: "UU TPPU",
      englishTerm: "Asset Diversion",
      relatedTerms: ["Asset Transfer", "Pengalihan Aset", "Asset Shifting"]
    },
    {
      id: 112,
      term: "Dokumen Palsu",
      category: "tindak-pidana",
      definition: "Pemalsuan dokumen untuk mendukung korupsi",
      example: "Invoice palsu untuk mark up harga",
      legalBasis: "Pasal 263 KUHP jo UU Tipikor",
      englishTerm: "False Document",
      relatedTerms: ["Forged Document", "Pemalsuan", "Fake Papers"]
    },
    {
      id: 113,
      term: "Double Invoicing",
      category: "tindak-pidana",
      definition: "Pembuatan faktur ganda untuk manipulasi pembayaran",
      example: "Invoice ganda untuk pembayaran fiktif",
      legalBasis: "Modus Korupsi",
      englishTerm: "Double Invoicing",
      relatedTerms: ["Faktur Ganda", "Invoice Fraud", "Billing Fraud"]
    },
    {
      id: 114,
      term: "Due Diligence",
      category: "pencegahan",
      definition: "Uji tuntas untuk mencegah kerjasama dengan pihak korup",
      example: "Due diligence calon mitra bisnis pemerintah",
      legalBasis: "Best Practice",
      englishTerm: "Due Diligence",
      relatedTerms: ["Uji Tuntas", "Background Check", "Verification"]
    },
    {
      id: 115,
      term: "Dugaan Korupsi",
      category: "penegakan",
      definition: "Indikasi awal adanya tindak pidana korupsi",
      example: "Laporan dugaan korupsi ke KPK",
      legalBasis: "Sistem Pelaporan",
      englishTerm: "Corruption Allegation",
      relatedTerms: ["Alleged Corruption", "Suspicion", "Praduga"]
    },
    {
      id: 116,
      term: "Dummy Company",
      category: "tindak-pidana",
      definition: "Perusahaan fiktif untuk menyembunyikan korupsi",
      example: "Shell company untuk pencucian uang korupsi",
      legalBasis: "UU TPPU",
      englishTerm: "Shell Company",
      relatedTerms: ["Perusahaan Boneka", "Fake Company", "Paper Company"]
    },
    {
      id: 117,
      term: "Duplikasi Anggaran",
      category: "kerugian-negara",
      definition: "Pengajuan anggaran ganda untuk kegiatan sama",
      example: "Double budgeting untuk proyek yang sama",
      legalBasis: "UU Keuangan Negara",
      englishTerm: "Budget Duplication",
      relatedTerms: ["Double Budgeting", "Anggaran Ganda", "Duplicate Funding"]
    },
    {
      id: 118,
      term: "Dwi Fungsi",
      category: "integritas",
      definition: "Rangkap jabatan yang berpotensi konflik kepentingan",
      example: "Pejabat yang jadi komisaris BUMN",
      legalBasis: "UU ASN",
      englishTerm: "Dual Function",
      relatedTerms: ["Double Role", "Rangkap Jabatan", "Multiple Position"]
    },
    {
      id: 119,
      term: "Dana Aspirasi",
      category: "kerugian-negara",
      definition: "Anggaran untuk konstituen yang rawan disalahgunakan",
      example: "Korupsi dana aspirasi anggota DPR",
      legalBasis: "UU APBN",
      englishTerm: "Constituency Fund",
      relatedTerms: ["Pork Barrel", "Dana Konstituen", "Aspiration Fund"]
    },
    {
      id: 120,
      term: "Debitur Korupsi",
      category: "pengembalian-aset",
      definition: "Terpidana korupsi yang masih punya utang kepada negara",
      example: "Koruptor yang belum bayar uang pengganti",
      legalBasis: "Pasal 18 UU Tipikor",
      englishTerm: "Corruption Debtor",
      relatedTerms: ["Pengutang Negara", "State Debtor", "Obligor"]
    },
    
    // E - E-Corruption dan Ekstradisi (121-150)
    {
      id: 121,
      term: "E-Audit",
      category: "pengawasan",
      definition: "Audit elektronik untuk deteksi korupsi dalam sistem digital",
      example: "Continuous auditing pada sistem keuangan pemerintah",
      legalBasis: "Standar Audit Digital",
      englishTerm: "Electronic Audit",
      relatedTerms: ["Digital Audit", "Audit Elektronik", "Continuous Audit"]
    },
    {
      id: 122,
      term: "E-Budgeting",
      category: "pencegahan",
      definition: "Sistem penganggaran elektronik untuk transparansi dan cegah korupsi",
      example: "Aplikasi e-budgeting DKI Jakarta",
      legalBasis: "Peraturan Daerah",
      englishTerm: "Electronic Budgeting",
      relatedTerms: ["Digital Budget", "Anggaran Digital", "Online Budgeting"]
    },
    {
      id: 123,
      term: "E-Catalog",
      category: "pencegahan",
      definition: "Katalog elektronik untuk standardisasi harga pengadaan",
      example: "E-catalog LKPP untuk cegah mark up",
      legalBasis: "Perpres No. 16/2018",
      englishTerm: "Electronic Catalog",
      relatedTerms: ["Digital Catalog", "Katalog Digital", "Price Reference"]
    },
    {
      id: 124,
      term: "E-Corruption",
      category: "tindak-pidana",
      definition: "Korupsi yang dilakukan melalui sistem elektronik",
      example: "Manipulasi data dalam sistem e-procurement",
      legalBasis: "UU ITE jo UU Tipikor",
      englishTerm: "Cyber Corruption",
      relatedTerms: ["Digital Corruption", "Korupsi Digital", "Online Fraud"]
    },
    {
      id: 125,
      term: "Eksaminasi Publik",
      category: "transparansi",
      definition: "Pemeriksaan publik terhadap putusan kasus korupsi",
      example: "ICW melakukan eksaminasi putusan korupsi",
      legalBasis: "Transparansi Peradilan",
      englishTerm: "Public Examination",
      relatedTerms: ["Public Review", "Uji Publik", "Citizen Audit"]
    },
    {
      id: 126,
      term: "Eksekusi Aset",
      category: "pengembalian-aset",
      definition: "Pelaksanaan penyitaan dan penjualan aset koruptor",
      example: "Lelang aset hasil korupsi oleh kejaksaan",
      legalBasis: "HIR/RBg",
      englishTerm: "Asset Execution",
      relatedTerms: ["Asset Liquidation", "Eksekusi Putusan", "Enforcement"]
    },
    {
      id: 127,
      term: "Eksepsi Korupsi",
      category: "penegakan",
      definition: "Keberatan terdakwa terhadap dakwaan korupsi",
      example: "Eksepsi nebis in idem dalam kasus korupsi",
      legalBasis: "KUHAP",
      englishTerm: "Corruption Exception",
      relatedTerms: ["Legal Exception", "Keberatan Hukum", "Preliminary Objection"]
    },
    {
      id: 128,
      term: "Ekstradisi Koruptor",
      category: "penegakan",
      definition: "Penyerahan pelaku korupsi yang melarikan diri ke luar negeri",
      example: "Ekstradisi koruptor dari Singapura",
      legalBasis: "UU No. 1/1979",
      englishTerm: "Corruption Extradition",
      relatedTerms: ["Extradition", "Penyerahan Pelaku", "International Cooperation"]
    },
    {
      id: 129,
      term: "Electronic Evidence",
      category: "penegakan",
      definition: "Bukti elektronik dalam kasus korupsi",
      example: "Email dan chat sebagai bukti suap",
      legalBasis: "UU ITE",
      englishTerm: "Digital Evidence",
      relatedTerms: ["E-Evidence", "Bukti Digital", "Cyber Evidence"]
    },
    {
      id: 130,
      term: "Embezzlement",
      category: "tindak-pidana",
      definition: "Penggelapan uang atau aset negara",
      example: "Bendahara menggelapkan uang kas negara",
      legalBasis: "Pasal 8 UU Tipikor",
      englishTerm: "Embezzlement",
      relatedTerms: ["Penggelapan", "Misappropriation", "Verduistering"]
    },
    {
      id: 131,
      term: "Emergency Procurement",
      category: "kerugian-negara",
      definition: "Pengadaan darurat yang rawan korupsi",
      example: "Korupsi pengadaan alkes COVID-19",
      legalBasis: "Perpres Pengadaan Darurat",
      englishTerm: "Emergency Procurement",
      relatedTerms: ["Pengadaan Darurat", "Crisis Procurement", "Urgent Purchase"]
    },
    {
      id: 132,
      term: "Enforcement Action",
      category: "penegakan",
      definition: "Tindakan penegakan hukum terhadap korupsi",
      example: "OTT KPK sebagai enforcement action",
      legalBasis: "UU KPK",
      englishTerm: "Enforcement Action",
      relatedTerms: ["Law Enforcement", "Penegakan Hukum", "Legal Action"]
    },
    {
      id: 133,
      term: "Enrichment",
      category: "tindak-pidana",
      definition: "Memperkaya diri melalui korupsi",
      example: "Illicit enrichment pejabat publik",
      legalBasis: "Pasal 2 UU Tipikor",
      englishTerm: "Illicit Enrichment",
      relatedTerms: ["Memperkaya Diri", "Unjust Enrichment", "Illegal Gain"]
    },
    {
      id: 134,
      term: "Entertainment Cost",
      category: "gratifikasi",
      definition: "Biaya hiburan yang menjadi modus gratifikasi",
      example: "Jamuan mewah untuk pejabat",
      legalBasis: "Peraturan Gratifikasi",
      englishTerm: "Entertainment Expense",
      relatedTerms: ["Biaya Representasi", "Hospitality Cost", "Jamuan"]
    },
    {
      id: 135,
      term: "E-Planning",
      category: "pencegahan",
      definition: "Sistem perencanaan elektronik untuk transparansi",
      example: "E-planning untuk usulan kegiatan daerah",
      legalBasis: "Sistem Perencanaan",
      englishTerm: "Electronic Planning",
      relatedTerms: ["Digital Planning", "Perencanaan Digital", "Online Planning"]
    },
    {
      id: 136,
      term: "E-Procurement",
      category: "pencegahan",
      definition: "Sistem pengadaan elektronik untuk mencegah korupsi",
      example: "LPSE untuk tender transparan",
      legalBasis: "Perpres No. 16/2018",
      englishTerm: "Electronic Procurement",
      relatedTerms: ["E-Tendering", "Pengadaan Elektronik", "LPSE"],
      trending: true
    },
    {
      id: 137,
      term: "Etika Publik",
      category: "integritas",
      definition: "Standar moral penyelenggara negara",
      example: "Kode etik ASN anti korupsi",
      legalBasis: "UU ASN",
      englishTerm: "Public Ethics",
      relatedTerms: ["Etika Pejabat", "Moral Standard", "Public Morality"]
    },
    {
      id: 138,
      term: "Etika Pengadaan",
      category: "integritas",
      definition: "Prinsip etis dalam proses pengadaan barang/jasa",
      example: "Pakta integritas dalam tender",
      legalBasis: "Perpres No. 16/2018",
      englishTerm: "Procurement Ethics",
      relatedTerms: ["Ethical Procurement", "Integritas Pengadaan", "Clean Tender"]
    },
    {
      id: 139,
      term: "Evaluasi Risiko",
      category: "pencegahan",
      definition: "Penilaian risiko korupsi dalam organisasi",
      example: "Risk assessment pada proses bisnis BUMN",
      legalBasis: "ISO 31000",
      englishTerm: "Risk Evaluation",
      relatedTerms: ["Risk Assessment", "Penilaian Risiko", "Risk Analysis"]
    },
    {
      id: 140,
      term: "Evidence Management",
      category: "penegakan",
      definition: "Pengelolaan barang bukti kasus korupsi",
      example: "Chain of custody barang bukti korupsi",
      legalBasis: "SOP Penegakan Hukum",
      englishTerm: "Evidence Management",
      relatedTerms: ["Manajemen Bukti", "Chain of Custody", "Bukti Management"]
    },
    {
      id: 141,
      term: "Ex-Gratia Payment",
      category: "gratifikasi",
      definition: "Pembayaran sukarela yang berpotensi gratifikasi",
      example: "Bonus tidak resmi dari kontraktor",
      legalBasis: "Aturan Gratifikasi",
      englishTerm: "Ex-Gratia Payment",
      relatedTerms: ["Voluntary Payment", "Pembayaran Sukarela", "Goodwill Payment"]
    },
    {
      id: 142,
      term: "Excessive Profit",
      category: "kerugian-negara",
      definition: "Keuntungan berlebihan dari proyek pemerintah",
      example: "Mark up yang menghasilkan profit tidak wajar",
      legalBasis: "Analisis Kerugian Negara",
      englishTerm: "Excessive Profit",
      relatedTerms: ["Windfall Profit", "Keuntungan Berlebih", "Abnormal Profit"]
    },
    {
      id: 143,
      term: "Executive Corruption",
      category: "tindak-pidana",
      definition: "Korupsi di lingkungan eksekutif",
      example: "Korupsi di kementerian dan lembaga",
      legalBasis: "UU Tipikor",
      englishTerm: "Executive Corruption",
      relatedTerms: ["Government Corruption", "Korupsi Eksekutif", "Administrative Corruption"]
    },
    {
      id: 144,
      term: "Expert Witness",
      category: "penegakan",
      definition: "Saksi ahli dalam persidangan korupsi",
      example: "Ahli audit forensik sebagai saksi",
      legalBasis: "KUHAP",
      englishTerm: "Expert Witness",
      relatedTerms: ["Saksi Ahli", "Keterangan Ahli", "Expert Testimony"]
    },
    {
      id: 145,
      term: "Exploitation of Office",
      category: "tindak-pidana",
      definition: "Eksploitasi jabatan untuk keuntungan pribadi",
      example: "Menggunakan fasilitas negara untuk bisnis pribadi",
      legalBasis: "Pasal 3 UU Tipikor",
      englishTerm: "Office Exploitation",
      relatedTerms: ["Eksploitasi Jabatan", "Abuse of Position", "Misuse of Office"]
    },
    {
      id: 146,
      term: "External Audit",
      category: "pengawasan",
      definition: "Audit eksternal untuk deteksi korupsi",
      example: "BPK melakukan audit kinerja kementerian",
      legalBasis: "UU BPK",
      englishTerm: "External Audit",
      relatedTerms: ["Audit Eksternal", "Independent Audit", "Outside Audit"]
    },
    {
      id: 147,
      term: "Extortion",
      category: "tindak-pidana",
      definition: "Pemerasan oleh pejabat publik",
      example: "Meminta uang untuk layanan yang seharusnya gratis",
      legalBasis: "Pasal 12 UU Tipikor",
      englishTerm: "Extortion",
      relatedTerms: ["Pemerasan", "Blackmail", "Pemaksaan"]
    },
    {
      id: 148,
      term: "Extra-Budgetary Fund",
      category: "kerugian-negara",
      definition: "Dana di luar anggaran resmi",
      example: "Off-budget fund yang tidak tercatat",
      legalBasis: "UU Keuangan Negara",
      englishTerm: "Off-Budget Fund",
      relatedTerms: ["Dana Luar Anggaran", "Hidden Fund", "Dana Siluman"]
    },
    {
      id: 149,
      term: "Extraordinary Crime",
      category: "tindak-pidana",
      definition: "Korupsi sebagai kejahatan luar biasa",
      example: "Korupsi dikategorikan extraordinary crime",
      legalBasis: "Penjelasan UU KPK",
      englishTerm: "Extraordinary Crime",
      relatedTerms: ["Kejahatan Luar Biasa", "Serious Crime", "Grave Offense"]
    },
    {
      id: 150,
      term: "E-Reporting",
      category: "transparansi",
      definition: "Sistem pelaporan elektronik untuk transparansi",
      example: "e-LHKPN untuk lapor harta pejabat",
      legalBasis: "Sistem KPK",
      englishTerm: "Electronic Reporting",
      relatedTerms: ["Digital Reporting", "Pelaporan Digital", "Online Report"]
    },
    
    // F - Fraud dan Financial (151-180)
    {
      id: 151,
      term: "Facilitation Payment",
      category: "gratifikasi",
      definition: "Pembayaran untuk mempercepat layanan yang seharusnya normal",
      example: "Uang pelicin untuk percepat pengurusan izin",
      legalBasis: "Pasal 12 UU Tipikor",
      englishTerm: "Facilitation Payment",
      relatedTerms: ["Uang Pelicin", "Speed Money", "Grease Payment"]
    },
    {
      id: 152,
      term: "Fake Invoice",
      category: "tindak-pidana",
      definition: "Faktur palsu untuk manipulasi pembayaran",
      example: "Invoice fiktif untuk proyek yang tidak ada",
      legalBasis: "Modus Operandi Korupsi",
      englishTerm: "Fake Invoice",
      relatedTerms: ["Faktur Palsu", "False Invoice", "Fictitious Bill"]
    },
    {
      id: 153,
      term: "False Declaration",
      category: "transparansi",
      definition: "Pernyataan palsu dalam LHKPN atau dokumen resmi",
      example: "Tidak melaporkan aset dalam LHKPN",
      legalBasis: "UU No. 28/1999",
      englishTerm: "False Declaration",
      relatedTerms: ["Pernyataan Palsu", "Misrepresentation", "False Statement"]
    },
    {
      id: 154,
      term: "Fee Proyek",
      category: "gratifikasi",
      definition: "Komisi tidak resmi dari nilai proyek",
      example: "Fee 10% dari nilai kontrak untuk pejabat",
      legalBasis: "Pasal 12 UU Tipikor",
      englishTerm: "Project Fee",
      relatedTerms: ["Komisi Proyek", "Kickback", "Project Commission"]
    },
    {
      id: 155,
      term: "Fiduciary Duty",
      category: "integritas",
      definition: "Kewajiban fidusia pejabat terhadap negara",
      example: "Direksi BUMN wajib utamakan kepentingan perusahaan",
      legalBasis: "UU PT jo UU BUMN",
      englishTerm: "Fiduciary Duty",
      relatedTerms: ["Kewajiban Fidusia", "Trust Duty", "Amanah"]
    },
    {
      id: 156,
      term: "Financial Action Task Force",
      category: "lembaga",
      definition: "Organisasi internasional anti pencucian uang",
      example: "FATF merekomendasikan standar AML/CFT",
      legalBasis: "Standar FATF",
      englishTerm: "FATF",
      relatedTerms: ["Task Force", "Anti Money Laundering", "AML Body"]
    },
    {
      id: 157,
      term: "Financial Audit",
      category: "pengawasan",
      definition: "Audit keuangan untuk deteksi fraud dan korupsi",
      example: "Audit laporan keuangan BUMN oleh KAP",
      legalBasis: "Standar Audit",
      englishTerm: "Financial Audit",
      relatedTerms: ["Audit Keuangan", "Financial Review", "Pemeriksaan Keuangan"]
    },
    {
      id: 158,
      term: "Financial Crime",
      category: "tindak-pidana",
      definition: "Kejahatan di bidang keuangan termasuk korupsi",
      example: "Korupsi perbankan dan pasar modal",
      legalBasis: "UU Sektor Keuangan",
      englishTerm: "Financial Crime",
      relatedTerms: ["Kejahatan Keuangan", "Economic Crime", "White Collar Crime"]
    },
    {
      id: 159,
      term: "Financial Intelligence",
      category: "pengawasan",
      definition: "Intelijen keuangan untuk deteksi korupsi",
      example: "PPATK menganalisis transaksi mencurigakan",
      legalBasis: "UU PPATK",
      englishTerm: "Financial Intelligence",
      relatedTerms: ["Intelijen Keuangan", "FIU", "PPATK"]
    },
    {
      id: 160,
      term: "Financial Misconduct",
      category: "tindak-pidana",
      definition: "Pelanggaran keuangan yang berindikasi korupsi",
      example: "Manipulasi laporan keuangan untuk tutup korupsi",
      legalBasis: "Standar Akuntansi",
      englishTerm: "Financial Misconduct",
      relatedTerms: ["Pelanggaran Keuangan", "Financial Fraud", "Kecurangan Keuangan"]
    },
    {
      id: 161,
      term: "Fit and Proper Test",
      category: "integritas",
      definition: "Uji kelayakan dan kepatutan calon pejabat",
      example: "Uji kelayakan calon direksi BUMN bebas korupsi",
      legalBasis: "Peraturan Menteri BUMN",
      englishTerm: "Fit and Proper Test",
      relatedTerms: ["Uji Kelayakan", "Integrity Test", "Tes Kepatutan"]
    },
    {
      id: 162,
      term: "Fixed Asset",
      category: "kerugian-negara",
      definition: "Aset tetap negara yang rawan dikorupsi",
      example: "Pengalihan aset tetap negara secara ilegal",
      legalBasis: "PP BMN",
      englishTerm: "Fixed Asset",
      relatedTerms: ["Aset Tetap", "Capital Asset", "BMN"]
    },
    {
      id: 163,
      term: "Flag Transaction",
      category: "pengawasan",
      definition: "Transaksi yang terindikasi mencurigakan",
      example: "Transaksi besar mendekati pemilu",
      legalBasis: "Peraturan PPATK",
      englishTerm: "Flagged Transaction",
      relatedTerms: ["Transaksi Mencurigakan", "STR", "Suspicious Activity"]
    },
    {
      id: 164,
      term: "Follow The Money",
      category: "penegakan",
      definition: "Metode investigasi dengan menelusuri aliran dana",
      example: "Melacak aliran dana korupsi ke rekening tersangka",
      legalBasis: "Teknik Investigasi",
      englishTerm: "Follow The Money",
      relatedTerms: ["Telusuri Uang", "Money Trail", "Financial Investigation"]
    },
    {
      id: 165,
      term: "Forensic Accounting",
      category: "pengawasan",
      definition: "Akuntansi forensik untuk ungkap korupsi",
      example: "Akuntan forensik menganalisis bukti keuangan korupsi",
      legalBasis: "Standar Forensik",
      englishTerm: "Forensic Accounting",
      relatedTerms: ["Akuntansi Forensik", "Investigative Accounting", "Fraud Examination"]
    },
    {
      id: 166,
      term: "Forensic Audit",
      category: "pengawasan",
      definition: "Audit khusus untuk mengungkap fraud dan korupsi",
      example: "BPK melakukan audit investigatif kasus e-KTP",
      legalBasis: "Standar Pemeriksaan",
      englishTerm: "Forensic Audit",
      relatedTerms: ["Audit Forensik", "Investigative Audit", "Fraud Audit"]
    },
    {
      id: 167,
      term: "Forfeiture",
      category: "pengembalian-aset",
      definition: "Perampasan aset untuk negara tanpa kompensasi",
      example: "Civil forfeiture aset hasil korupsi",
      legalBasis: "Pasal 18 UU Tipikor",
      englishTerm: "Asset Forfeiture",
      relatedTerms: ["Perampasan Aset", "Confiscation", "Penyitaan"]
    },
    {
      id: 168,
      term: "Fraud",
      category: "tindak-pidana",
      definition: "Kecurangan yang mengakibatkan kerugian negara",
      example: "Fraud dalam pengadaan barang/jasa pemerintah",
      legalBasis: "UU Tipikor",
      englishTerm: "Fraud",
      relatedTerms: ["Kecurangan", "Penipuan", "Deception"]
    },
    {
      id: 169,
      term: "Fraud Diamond",
      category: "pencegahan",
      definition: "Teori empat faktor penyebab fraud: pressure, opportunity, rationalization, capability",
      example: "Analisis fraud diamond pada kasus korupsi",
      legalBasis: "Teori Fraud",
      englishTerm: "Fraud Diamond",
      relatedTerms: ["Diamond Theory", "Teori Fraud", "Fraud Factors"]
    },
    {
      id: 170,
      term: "Fraud Risk Assessment",
      category: "pencegahan",
      definition: "Penilaian risiko kecurangan dalam organisasi",
      example: "FRA pada proses pengadaan barang/jasa",
      legalBasis: "Risk Management",
      englishTerm: "Fraud Risk Assessment",
      relatedTerms: ["Penilaian Risiko Fraud", "FRA", "Risk Analysis"]
    },
    {
      id: 171,
      term: "Fraud Triangle",
      category: "pencegahan",
      definition: "Teori tiga faktor fraud: tekanan, kesempatan, rasionalisasi",
      example: "Analisis fraud triangle kasus korupsi",
      legalBasis: "Teori Cressey",
      englishTerm: "Fraud Triangle",
      relatedTerms: ["Segitiga Fraud", "Cressey Theory", "Triangle Theory"]
    },
    {
      id: 172,
      term: "Free Port",
      category: "kerugian-negara",
      definition: "Pelabuhan bebas yang rawan penyelundupan dan korupsi",
      example: "Korupsi di kawasan perdagangan bebas",
      legalBasis: "UU Kawasan Bebas",
      englishTerm: "Free Port",
      relatedTerms: ["Pelabuhan Bebas", "Free Trade Zone", "FTZ"]
    },
    {
      id: 173,
      term: "Freezing Order",
      category: "pengembalian-aset",
      definition: "Perintah pembekuan aset tersangka korupsi",
      example: "Pemblokiran rekening tersangka korupsi",
      legalBasis: "UU TPPU",
      englishTerm: "Freezing Order",
      relatedTerms: ["Perintah Pembekuan", "Asset Freeze", "Blocking Order"]
    },
    {
      id: 174,
      term: "Front Company",
      category: "tindak-pidana",
      definition: "Perusahaan kedok untuk menyembunyikan korupsi",
      example: "Shell company untuk money laundering",
      legalBasis: "UU TPPU",
      englishTerm: "Front Company",
      relatedTerms: ["Perusahaan Kedok", "Shell Company", "Cover Company"]
    },
    {
      id: 175,
      term: "Fugitive",
      category: "penegakan",
      definition: "Buronan kasus korupsi",
      example: "Koruptor yang kabur ke luar negeri",
      legalBasis: "KUHAP",
      englishTerm: "Fugitive",
      relatedTerms: ["Buronan", "Buron", "Runaway"]
    },
    {
      id: 176,
      term: "Full Disclosure",
      category: "transparansi",
      definition: "Pengungkapan penuh informasi keuangan dan aset",
      example: "Full disclosure dalam LHKPN",
      legalBasis: "Prinsip Transparansi",
      englishTerm: "Full Disclosure",
      relatedTerms: ["Pengungkapan Penuh", "Complete Disclosure", "Transparansi Penuh"]
    },
    {
      id: 177,
      term: "Functional Corruption",
      category: "tindak-pidana",
      definition: "Korupsi yang terjadi dalam pelaksanaan fungsi tertentu",
      example: "Korupsi dalam fungsi perizinan",
      legalBasis: "Analisis Korupsi",
      englishTerm: "Functional Corruption",
      relatedTerms: ["Korupsi Fungsional", "Service Corruption", "Operational Corruption"]
    },
    {
      id: 178,
      term: "Fund Diversion",
      category: "kerugian-negara",
      definition: "Pengalihan dana untuk tujuan yang tidak semestinya",
      example: "Dana bansos dialihkan untuk kampanye",
      legalBasis: "UU Keuangan Negara",
      englishTerm: "Fund Diversion",
      relatedTerms: ["Pengalihan Dana", "Misappropriation", "Fund Misuse"]
    },
    {
      id: 179,
      term: "Fund Tracing",
      category: "penegakan",
      definition: "Penelusuran aliran dana korupsi",
      example: "PPATK menelusuri aliran dana tersangka",
      legalBasis: "UU PPATK",
      englishTerm: "Fund Tracing",
      relatedTerms: ["Pelacakan Dana", "Money Tracing", "Financial Tracking"]
    },
    {
      id: 180,
      term: "Fungsi Koordinasi KPK",
      category: "lembaga",
      definition: "Fungsi KPK mengkoordinasikan pemberantasan korupsi",
      example: "KPK koordinasi dengan kejaksaan dan kepolisian",
      legalBasis: "Pasal 6 UU KPK",
      englishTerm: "Coordination Function",
      relatedTerms: ["Fungsi Koordinasi", "Coordinating Role", "Kordinasi"]
    },
    
    // G - Gratifikasi dan Governance (181-210)
    {
      id: 181,
      term: "Ganti Rugi Korupsi",
      category: "pengembalian-aset",
      definition: "Penggantian kerugian negara oleh koruptor",
      example: "Pembayaran uang pengganti oleh terpidana korupsi",
      legalBasis: "Pasal 18 UU Tipikor",
      englishTerm: "Corruption Compensation",
      relatedTerms: ["Uang Pengganti", "Restitution", "Kerugian Negara"]
    },
    {
      id: 182,
      term: "Ghost Project",
      category: "tindak-pidana",
      definition: "Proyek fiktif yang hanya ada di atas kertas",
      example: "Proyek pembangunan yang tidak pernah dikerjakan",
      legalBasis: "Modus Korupsi",
      englishTerm: "Ghost Project",
      relatedTerms: ["Proyek Fiktif", "Phantom Project", "Fake Project"]
    },
    {
      id: 183,
      term: "Gift Policy",
      category: "integritas",
      definition: "Kebijakan organisasi tentang pemberian hadiah",
      example: "Aturan maksimal nilai hadiah yang boleh diterima",
      legalBasis: "Code of Conduct",
      englishTerm: "Gift Policy",
      relatedTerms: ["Kebijakan Hadiah", "Present Policy", "Gratification Rule"]
    },
    {
      id: 184,
      term: "Good Governance",
      category: "integritas",
      definition: "Tata kelola pemerintahan yang baik dan bersih",
      example: "Penerapan prinsip transparansi, akuntabilitas, partisipasi",
      legalBasis: "UU No. 28/1999",
      englishTerm: "Good Governance",
      relatedTerms: ["Tata Kelola", "Clean Governance", "Pemerintahan Baik"]
    },
    {
      id: 185,
      term: "Governance Risk",
      category: "pencegahan",
      definition: "Risiko akibat lemahnya tata kelola",
      example: "Risiko korupsi karena lemahnya internal control",
      legalBasis: "Risk Management",
      englishTerm: "Governance Risk",
      relatedTerms: ["Risiko Tata Kelola", "Management Risk", "Control Risk"]
    },
    {
      id: 186,
      term: "Government Accountability",
      category: "transparansi",
      definition: "Akuntabilitas pemerintah dalam pengelolaan negara",
      example: "LKPP sebagai bentuk akuntabilitas keuangan",
      legalBasis: "UU Keuangan Negara",
      englishTerm: "Government Accountability",
      relatedTerms: ["Akuntabilitas Pemerintah", "Public Accountability", "Pertanggungjawaban"]
    },
    {
      id: 187,
      term: "Graft",
      category: "tindak-pidana",
      definition: "Korupsi kecil-kecilan oleh pejabat publik",
      example: "Pungli di pelayanan publik",
      legalBasis: "UU Tipikor",
      englishTerm: "Graft",
      relatedTerms: ["Korupsi Kecil", "Petty Corruption", "Pungli"]
    },
    {
      id: 188,
      term: "Grand Corruption",
      category: "tindak-pidana",
      definition: "Korupsi besar yang melibatkan pejabat tinggi",
      example: "Korupsi mega proyek oleh menteri",
      legalBasis: "Tipologi Korupsi",
      englishTerm: "Grand Corruption",
      relatedTerms: ["Korupsi Besar", "High-level Corruption", "Mega Korupsi"]
    },
    {
        id: 189,
        term: "Gratifikasi",
        category: "gratifikasi",
        definition: "Pemberian yang diterima pejabat terkait jabatannya",
        example: "Menerima mobil dari rekanan tanpa lapor",
        legalBasis: "UU No. 31/1999 jo UU No. 20/2001",
        relatedTerms: ["Hadiah", "Pemberian"],
        trending: true
      },
      {
        id: 190,
        term: "Gratifikasi Seksual",
        category: "gratifikasi",
        definition: "Pemberian layanan seksual kepada pejabat",
        example: "Menerima layanan prostitusi dari pengusaha",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Suap Seksual", "Sexual Bribery"]
      },
      {
        id: 191,
        term: "Hadiah Jabatan",
        category: "gratifikasi",
        definition: "Pemberian terkait kedudukan pejabat",
        example: "Menerima mobil saat dilantik",
        legalBasis: "UU No. 31/1999",
        relatedTerms: ["Gift", "Pemberian Jabatan"]
      },
      {
        id: 192,
        term: "Hambatan Penyidikan",
        category: "obstruction",
        definition: "Tindakan menghalangi proses penyidikan",
        example: "Mengintimidasi saksi korupsi",
        legalBasis: "KUHP",
        relatedTerms: ["Obstruction", "Penghalangan"]
      },
      {
        id: 193,
        term: "Harta Gono-Gini Korupsi",
        category: "aset",
        definition: "Harta bersama dari hasil korupsi",
        example: "Rumah dibeli dari uang korupsi suami-istri",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Joint Asset", "Harta Bersama"]
      },
      {
        id: 194,
        term: "Harta Kekayaan Negara",
        category: "kerugian",
        definition: "Aset milik negara yang dikorupsi",
        example: "Tanah negara dijual illegal",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["State Asset", "Aset Negara"]
      },
      {
        id: 195,
        term: "Hasil Korupsi",
        category: "aset",
        definition: "Harta yang diperoleh dari tindak pidana korupsi",
        example: "Rumah mewah dari uang suap",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Proceeds", "Hasil Kejahatan"]
      },
      {
        id: 196,
        term: "High Cost Economy",
        category: "dampak",
        definition: "Ekonomi biaya tinggi akibat korupsi",
        example: "Biaya usaha mahal karena pungli",
        legalBasis: "Analisis Ekonomi",
        relatedTerms: ["Ekonomi Biaya Tinggi", "Inefficiency"]
      },
      {
        id: 197,
        term: "Holding Company Korupsi",
        category: "modus",
        definition: "Perusahaan induk untuk menyembunyikan korupsi",
        example: "Offshore company untuk money laundering",
        legalBasis: "UU TPPU",
        relatedTerms: ["Shell Company", "Perusahaan Cangkang"]
      },
      {
        id: 198,
        term: "Hukuman Mati Koruptor",
        category: "sanksi",
        definition: "Pidana mati untuk korupsi tertentu",
        example: "Korupsi dana bencana saat darurat",
        legalBasis: "Pasal 2 UU Tipikor",
        relatedTerms: ["Death Penalty", "Capital Punishment"]
      },
      {
        id: 199,
        term: "Ijon Politik",
        category: "politik",
        definition: "Memberi uang untuk dukungan politik masa depan",
        example: "Menyuap calon kepala daerah",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Political Investment", "Investasi Politik"]
      },
      {
        id: 200,
        term: "Illegal Logging",
        category: "sda",
        definition: "Pembalakan liar dengan suap",
        example: "Menebang hutan lindung dengan backing aparat",
        legalBasis: "UU Kehutanan",
        relatedTerms: ["Pembalakan Liar", "Forest Crime"]
      },
      {
        id: 201,
        term: "Illegal Mining",
        category: "sda",
        definition: "Pertambangan liar dengan dukungan korup",
        example: "Tambang emas ilegal dilindungi oknum",
        legalBasis: "UU Minerba",
        relatedTerms: ["Pertambangan Liar", "PETI"]
      },
      {
        id: 202,
        term: "Impor Ilegal",
        category: "perdagangan",
        definition: "Impor barang dengan dokumen palsu",
        example: "Impor bawang dengan invoice palsu",
        legalBasis: "UU Kepabeanan",
        relatedTerms: ["Smuggling", "Penyelundupan"]
      },
      {
        id: 203,
        term: "Impunitas Koruptor",
        category: "penegakan",
        definition: "Kebebasan dari hukuman bagi koruptor",
        example: "Koruptor tidak dihukum karena koneksi",
        legalBasis: "Sistem Peradilan",
        relatedTerms: ["Impunity", "Kekebalan"]
      },
      {
        id: 204,
        term: "Indeks Persepsi Korupsi",
        category: "pengukuran",
        definition: "Ukuran tingkat korupsi suatu negara",
        example: "Indonesia peringkat 110 dari 180 negara",
        legalBasis: "Transparency International",
        relatedTerms: ["CPI", "Corruption Index"]
      },
      {
        id: 205,
        term: "Inflasi Proyek",
        category: "modus",
        definition: "Menaikan nilai proyek untuk korupsi",
        example: "Proyek 10 miliar dianggarkan 15 miliar",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Project Inflation", "Penggelembungan"]
      },
      {
        id: 206,
        term: "Informal Payment",
        category: "modus",
        definition: "Pembayaran tidak resmi kepada pejabat",
        example: "Uang rokok untuk mempercepat perizinan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Uang Pelicin", "Facilitation Payment"]
      },
      {
        id: 207,
        term: "Insider Trading Korupsi",
        category: "pasar modal",
        definition: "Perdagangan saham dengan info korupsi",
        example: "Beli saham sebelum proyek dimenangkan dengan suap",
        legalBasis: "UU Pasar Modal",
        relatedTerms: ["Perdagangan Orang Dalam", "Market Manipulation"]
      },
      {
        id: 208,
        term: "Integritas",
        category: "pencegahan",
        definition: "Kejujuran dan konsistensi moral",
        example: "Menolak suap meski terdesak",
        legalBasis: "Kode Etik",
        relatedTerms: ["Integrity", "Kejujuran"]
      },
      {
        id: 209,
        term: "Intermediary",
        category: "pelaku",
        definition: "Perantara dalam transaksi korupsi",
        example: "Calo proyek pemerintah",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Middleman", "Perantara"]
      },
      {
        id: 210,
        term: "Intimidasi Saksi",
        category: "obstruction",
        definition: "Mengancam saksi kasus korupsi",
        example: "Mengancam akan memecat saksi",
        legalBasis: "UU Perlindungan Saksi",
        relatedTerms: ["Witness Intimidation", "Ancaman"]
      },
      {
        id: 211,
        term: "Investasi Bodong Pejabat",
        category: "modus",
        definition: "Investasi palsu melibatkan pejabat",
        example: "Pejabat promosi investasi bodong",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Ponzi Scheme", "Skema Piramida"]
      },
      {
        id: 212,
        term: "Invoice Palsu",
        category: "modus",
        definition: "Faktur fiktif untuk korupsi",
        example: "Invoice pembelian barang yang tidak ada",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fake Invoice", "Faktur Fiktif"]
      },
      {
        id: 213,
        term: "Izin Palsu",
        category: "dokumen",
        definition: "Perizinan illegal dengan suap",
        example: "IMB palsu untuk bangunan illegal",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fake Permit", "Illegal License"]
      },
      {
        id: 214,
        term: "Jabatan Basah",
        category: "istilah",
        definition: "Posisi dengan peluang korupsi besar",
        example: "Kepala dinas perizinan",
        legalBasis: "Istilah Umum",
        relatedTerms: ["Wet Position", "Lucrative Post"]
      },
      {
        id: 215,
        term: "Jaringan Korupsi",
        category: "pelaku",
        definition: "Kelompok terorganisir pelaku korupsi",
        example: "Sindikat mafia tanah",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruption Network", "Mafia"]
      },
      {
        id: 216,
        term: "Jasa Konsultan Fiktif",
        category: "modus",
        definition: "Pembayaran konsultan yang tidak ada",
        example: "Bayar konsultan palsu 10% nilai proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fictitious Consultant", "Ghost Consultant"]
      },
      {
        id: 217,
        term: "Jatah Preman",
        category: "modus",
        definition: "Bagian untuk preman dalam proyek",
        example: "Preman dapat 5% dari proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Protection Money", "Uang Keamanan"]
      },
      {
        id: 218,
        term: "Jual Beli Jabatan",
        category: "jabatan",
        definition: "Transaksi jual beli posisi pemerintahan",
        example: "Bayar 500 juta untuk jadi kepala dinas",
        legalBasis: "UU ASN",
        relatedTerms: ["Position Trading", "Simony"]
      },
      {
        id: 219,
        term: "Jual Beli Kasus",
        category: "peradilan",
        definition: "Transaksi untuk menghentikan kasus hukum",
        example: "Bayar 1 miliar untuk SP3",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Case Trading", "Mafia Peradilan"]
      },
      {
        id: 220,
        term: "Jual Beli Proyek",
        category: "pengadaan",
        definition: "Memperjualbelikan proyek pemerintah",
        example: "Jual proyek yang sudah dimenangkan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Project Trading", "Broker Proyek"]
      },
      {
        id: 221,
        term: "Jual Beli Putusan",
        category: "peradilan",
        definition: "Transaksi untuk mempengaruhi putusan hakim",
        example: "Bayar hakim untuk putusan bebas",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Verdict Trading", "Judicial Corruption"]
      },
      {
        id: 222,
        term: "Justice Collaborator",
        category: "penegakan",
        definition: "Pelaku yang bekerjasama dengan penegak hukum",
        example: "Tersangka yang bersedia jadi saksi",
        legalBasis: "SEMA No. 4/2011",
        relatedTerms: ["JC", "Whistleblower"]
      },
      {
        id: 223,
        term: "Kartel Korupsi",
        category: "pelaku",
        definition: "Kelompok pengendali korupsi sistematis",
        example: "Kartel impor pangan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruption Cartel", "Oligopoly"]
      },
      {
        id: 224,
        term: "Kasus Century",
        category: "kasus",
        definition: "Skandal bailout Bank Century",
        example: "Dugaan korupsi dana talangan 6,7 triliun",
        legalBasis: "Kasus Historis",
        relatedTerms: ["Bank Century", "Bailout"]
      },
      {
        id: 225,
        term: "Kasus E-KTP",
        category: "kasus",
        definition: "Mega korupsi proyek KTP elektronik",
        example: "Kerugian negara 2,3 triliun",
        legalBasis: "Putusan Pengadilan",
        relatedTerms: ["E-ID Corruption", "Mega Korupsi"]
      },
      {
        id: 226,
        term: "Kasus Hambalang",
        category: "kasus",
        definition: "Korupsi proyek pusat olahraga Hambalang",
        example: "Proyek mangkrak dengan kerugian besar",
        legalBasis: "Putusan Pengadilan",
        relatedTerms: ["Hambalang Project", "Sports Complex"]
      },
      {
        id: 227,
        term: "Kasus Simulator SIM",
        category: "kasus",
        definition: "Korupsi pengadaan alat simulator SIM",
        example: "Mark up harga simulator mengemudi",
        legalBasis: "Putusan Pengadilan",
        relatedTerms: ["Driving Simulator", "Procurement Fraud"]
      },
      {
        id: 228,
        term: "Kebijakan Koruptif",
        category: "modus",
        definition: "Kebijakan yang dirancang untuk korupsi",
        example: "Perda yang menguntungkan kroni",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Policy", "Rent-seeking"]
      },
      {
        id: 229,
        term: "Kebocoran Anggaran",
        category: "kerugian",
        definition: "Anggaran yang hilang karena korupsi",
        example: "30% APBN bocor karena korupsi",
        legalBasis: "Audit BPK",
        relatedTerms: ["Budget Leakage", "Fiscal Loss"]
      },
      {
        id: 230,
        term: "Kekayaan Tidak Wajar",
        category: "indikasi",
        definition: "Harta tidak sesuai penghasilan sah",
        example: "PNS punya 10 mobil mewah",
        legalBasis: "UU KPK",
        relatedTerms: ["Illicit Enrichment", "Unexplained Wealth"]
      },
      {
        id: 231,
        term: "Kelompok Kepentingan Korup",
        category: "pelaku",
        definition: "Grup yang mendapat untung dari korupsi",
        example: "Kartel importir dengan backing pejabat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Interest Group", "Corrupt Network"]
      },
      {
        id: 232,
        term: "Kemahalan Harga",
        category: "modus",
        definition: "Penetapan harga di atas wajar",
        example: "Beli masker 100 ribu per buah",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Overpricing", "Price Inflation"]
      },
      {
        id: 233,
        term: "Kepentingan Pribadi",
        category: "motif",
        definition: "Mengutamakan keuntungan personal",
        example: "Tender dimenangkan perusahaan keluarga",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Personal Interest", "Vested Interest"]
      },
      {
        id: 234,
        term: "Kerja Sama Operasi Fiktif",
        category: "modus",
        definition: "KSO palsu untuk markup",
        example: "KSO dengan perusahaan shell",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fake JO", "Fictitious Partnership"]
      },
      {
        id: 235,
        term: "Kerugian Keuangan Negara",
        category: "kerugian",
        definition: "Berkurangnya kekayaan negara akibat korupsi",
        example: "Proyek gagal rugikan negara 100 miliar",
        legalBasis: "UU No. 31/1999",
        relatedTerms: ["State Loss", "Financial Loss"]
      },
      {
        id: 236,
        term: "Kesempatan Korupsi",
        category: "faktor",
        definition: "Peluang untuk melakukan korupsi",
        example: "Sistem pengawasan lemah",
        legalBasis: "Teori Fraud Triangle",
        relatedTerms: ["Opportunity", "Corruption Chance"]
      },
      {
        id: 237,
        term: "Keuangan Gelap",
        category: "modus",
        definition: "Dana tidak tercatat dalam pembukuan",
        example: "Dana taktis tanpa laporan",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Black Budget", "Off-book"]
      },
      {
        id: 238,
        term: "Kewenangan Diskresi",
        category: "faktor",
        definition: "Wewenang yang disalahgunakan",
        example: "Diskresi perizinan untuk kepentingan pribadi",
        legalBasis: "UU Administrasi Pemerintahan",
        relatedTerms: ["Discretionary Power", "Abuse of Discretion"]
      },
      {
        id: 239,
        term: "Kick Back",
        category: "modus",
        definition: "Komisi tidak sah dari nilai kontrak",
        example: "Kontraktor kembalikan 10% ke pejabat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Komisi", "Rebate"]
      },
      {
        id: 240,
        term: "Kleptokrasi",
        category: "sistem",
        definition: "Pemerintahan oleh pencuri/koruptor",
        example: "Rezim yang sistematis korupsi",
        legalBasis: "Ilmu Politik",
        relatedTerms: ["Kleptocracy", "Thievery Rule"]
      },
      {
        id: 241,
        term: "KKN",
        category: "istilah",
        definition: "Korupsi, Kolusi, dan Nepotisme",
        example: "Praktik KKN era Orde Baru",
        legalBasis: "TAP MPR",
        relatedTerms: ["Corruption Collusion Nepotism", "CCN"]
      },
      {
        id: 242,
        term: "Kode Etik Anti Korupsi",
        category: "pencegahan",
        definition: "Aturan perilaku mencegah korupsi",
        example: "Kode etik penyelenggara negara",
        legalBasis: "Peraturan Internal",
        relatedTerms: ["Anti-corruption Code", "Ethics Code"]
      },
      {
        id: 243,
        term: "Kolusi",
        category: "modus",
        definition: "Kerjasama rahasia melawan hukum",
        example: "Kolusi penetapan pemenang tender",
        legalBasis: "UU No. 28/1999",
        relatedTerms: ["Collusion", "Persekongkolan"]
      },
      {
        id: 244,
        term: "Kolusi Tender",
        category: "pengadaan",
        definition: "Persekongkolan dalam proses tender",
        example: "Peserta tender sudah diatur",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Bid Rigging", "Tender Conspiracy"]
      },
      {
        id: 245,
        term: "Komisi Gelap",
        category: "modus",
        definition: "Fee tidak sah dalam transaksi",
        example: "Komisi 20% untuk memuluskan perizinan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Dark Commission", "Illegal Fee"]
      },
      {
        id: 246,
        term: "Komisi Pemberantasan Korupsi",
        category: "lembaga",
        definition: "Lembaga negara antikorupsi",
        example: "KPK tangani kasus korupsi besar",
        legalBasis: "UU No. 30/2002",
        relatedTerms: ["KPK", "Anti-corruption Commission"]
      },
      {
        id: 247,
        term: "Komitmen Anti Korupsi",
        category: "pencegahan",
        definition: "Janji untuk tidak korupsi",
        example: "Pakta integritas pejabat",
        legalBasis: "Peraturan KPK",
        relatedTerms: ["Anti-corruption Commitment", "Integrity Pact"]
      },
      {
        id: 248,
        term: "Komitmen Fee",
        category: "modus",
        definition: "Uang jasa untuk mengurus proyek",
        example: "Fee 5% untuk dapat proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Commitment Fee", "Success Fee"]
      },
      {
        id: 249,
        term: "Kompleksitas Birokrasi",
        category: "faktor",
        definition: "Kerumitan sistem yang memicu korupsi",
        example: "Perizinan berbelit mendorong suap",
        legalBasis: "Analisis Birokrasi",
        relatedTerms: ["Bureaucratic Complexity", "Red Tape"]
      },
      {
        id: 250,
        term: "Konflik Kepentingan",
        category: "etika",
        definition: "Benturan antara tugas dan kepentingan pribadi",
        example: "Pejabat punya saham di perusahaan rekanan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Conflict of Interest", "COI"]
      },
      {
        id: 251,
        term: "Kongkalikong",
        category: "modus",
        definition: "Persekongkolan untuk korupsi",
        example: "Kongkalikong panitia tender",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Conspiracy", "Collusion"]
      },
      {
        id: 252,
        term: "Konsesi Koruptif",
        category: "sda",
        definition: "Izin eksploitasi dengan suap",
        example: "Konsesi tambang dengan suap",
        legalBasis: "UU SDA",
        relatedTerms: ["Corrupt Concession", "Illegal Permit"]
      },
      {
        id: 253,
        term: "Konspirasi Korupsi",
        category: "modus",
        definition: "Permufakatan jahat untuk korupsi",
        example: "Konspirasi markup anggaran",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruption Conspiracy", "Criminal Plot"]
      },
      {
        id: 254,
        term: "Kontrak Karya Koruptif",
        category: "kontrak",
        definition: "Kontrak yang merugikan negara",
        example: "Kontrak karya tambang merugikan",
        legalBasis: "UU Minerba",
        relatedTerms: ["Corrupt Contract", "Bad Deal"]
      },
      {
        id: 255,
        term: "Kontrol Internal",
        category: "pencegahan",
        definition: "Sistem pengawasan dalam organisasi",
        example: "SPI untuk cegah fraud",
        legalBasis: "PP SPIP",
        relatedTerms: ["Internal Control", "SPIP"]
      },
      {
        id: 256,
        term: "Koordinasi Pemberantasan",
        category: "penegakan",
        definition: "Kerjasama antar lembaga antikorupsi",
        example: "Koordinasi KPK-Polri-Kejaksaan",
        legalBasis: "UU KPK",
        relatedTerms: ["Enforcement Coordination", "Joint Operation"]
      },
      {
        id: 257,
        term: "Korupsi Anggaran",
        category: "jenis",
        definition: "Penyalahgunaan anggaran negara/daerah",
        example: "Korupsi dana bansos",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Budget Corruption", "Fiscal Fraud"]
      },
      {
        id: 258,
        term: "Korupsi Berjamaah",
        category: "modus",
        definition: "Korupsi dilakukan bersama-sama",
        example: "Seluruh anggota DPRD korupsi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Collective Corruption", "Group Fraud"]
      },
      {
        id: 259,
        term: "Korupsi Birokrasi",
        category: "jenis",
        definition: "Korupsi dalam administrasi pemerintahan",
        example: "Pungli dalam pelayanan publik",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Bureaucratic Corruption", "Administrative Fraud"]
      },
      {
        id: 260,
        term: "Korupsi Dana Desa",
        category: "kasus",
        definition: "Penyalahgunaan anggaran desa",
        example: "Kades korupsi ADD",
        legalBasis: "UU Desa",
        relatedTerms: ["Village Fund Corruption", "Rural Fraud"]
      },
      {
        id: 261,
        term: "Korupsi Ekstortif",
        category: "jenis",
        definition: "Korupsi dengan paksaan/ancaman",
        example: "Peras pengusaha untuk izin",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Extortive Corruption", "Forced Bribery"]
      },
      {
        id: 262,
        term: "Korupsi Episodik",
        category: "pola",
        definition: "Korupsi yang terjadi sesekali",
        example: "Suap insidental untuk percepat layanan",
        legalBasis: "Tipologi Korupsi",
        relatedTerms: ["Episodic Corruption", "Occasional Fraud"]
      },
      {
        id: 263,
        term: "Korupsi Grand",
        category: "skala",
        definition: "Korupsi besar melibatkan pejabat tinggi",
        example: "Korupsi BLBI triliunan rupiah",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Grand Corruption", "High-level Corruption"]
      },
      {
        id: 264,
        term: "Korupsi Investif",
        category: "jenis",
        definition: "Suap untuk keuntungan masa depan",
        example: "Suap untuk dapat konsesi 20 tahun",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Investment Corruption", "Future Gain"]
      },
      {
        id: 265,
        term: "Korupsi Jaringan",
        category: "pola",
        definition: "Korupsi melibatkan banyak pihak",
        example: "Jaringan korupsi lintas instansi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Network Corruption", "Systemic Fraud"]
      },
      {
        id: 266,
        term: "Korupsi Kecil",
        category: "skala",
        definition: "Korupsi nilai kecil tapi sering",
        example: "Pungli parkir liar",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Petty Corruption", "Small Bribery"]
      },
      {
        id: 267,
        term: "Korupsi Kelembagaan",
        category: "jenis",
        definition: "Korupsi yang melembaga dalam organisasi",
        example: "Budaya suap di instansi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Institutional Corruption", "Systemic Fraud"]
      },
      {
        id: 268,
        term: "Korupsi Kolektif",
        category: "pola",
        definition: "Korupsi dilakukan kelompok",
        example: "Korupsi dana pokir DPRD",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Collective Corruption", "Group Conspiracy"]
      },
      {
        id: 269,
        term: "Korupsi Kronis",
        category: "pola",
        definition: "Korupsi yang sudah mengakar",
        example: "Pungli yang sudah puluhan tahun",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Chronic Corruption", "Endemic Fraud"]
      },
      {
        id: 270,
        term: "Korupsi Legal",
        category: "jenis",
        definition: "Tindakan merugikan tapi tidak melanggar hukum",
        example: "Kebijakan yang menguntungkan kroni",
        legalBasis: "Etika Publik",
        relatedTerms: ["Legal Corruption", "Lawful but Awful"]
      },
      {
        id: 271,
        term: "Korupsi Lisensi",
        category: "jenis",
        definition: "Korupsi dalam pemberian izin",
        example: "Jual beli izin tambang",
        legalBasis: "UU Tipikor",
        relatedTerms: ["License Corruption", "Permit Fraud"]
      },
      {
        id: 272,
        term: "Korupsi Nepotistik",
        category: "jenis",
        definition: "Korupsi dengan unsur nepotisme",
        example: "Proyek untuk perusahaan keluarga",
        legalBasis: "UU No. 28/1999",
        relatedTerms: ["Nepotistic Corruption", "Family Favoritism"]
      },
      {
        id: 273,
        term: "Korupsi Parlamenter",
        category: "jenis",
        definition: "Korupsi di lembaga legislatif",
        example: "Jual beli pasal dalam RUU",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Parliamentary Corruption", "Legislative Fraud"]
      },
      {
        id: 274,
        term: "Korupsi Pasif",
        category: "jenis",
        definition: "Menerima sesuatu karena jabatan",
        example: "Terima hadiah dari rekanan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Passive Corruption", "Passive Bribery"]
      },
      {
        id: 275,
        term: "Korupsi Patronase",
        category: "pola",
        definition: "Korupsi berbasis hubungan patron-klien",
        example: "Bagi-bagi proyek ke pendukung",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Patronage Corruption", "Clientelism"]
      },
      {
        id: 276,
        term: "Korupsi Pemilu",
        category: "politik",
        definition: "Korupsi terkait penyelenggaraan pemilu",
        example: "Korupsi pengadaan logistik pemilu",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Electoral Corruption", "Election Fraud"]
      },
      {
        id: 277,
        term: "Korupsi Pengaruh",
        category: "jenis",
        definition: "Memperjualbelikan pengaruh jabatan",
        example: "Jual pengaruh untuk dapat proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Influence Peddling", "Trading Influence"]
      },
      {
        id: 278,
        term: "Korupsi Pengadaan",
        category: "jenis",
        definition: "Korupsi dalam proses pengadaan barang/jasa",
        example: "Mark up harga pengadaan",
        legalBasis: "Perpres 16/2018",
        relatedTerms: ["Procurement Corruption", "Tender Fraud"]
      },
      {
        id: 279,
        term: "Korupsi Peradilan",
        category: "jenis",
        definition: "Korupsi di lembaga peradilan",
        example: "Suap hakim untuk putusan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Judicial Corruption", "Court Fraud"]
      },
      {
        id: 280,
        term: "Korupsi Perizinan",
        category: "jenis",
        definition: "Korupsi dalam pemberian izin",
        example: "Suap untuk dapat IMB",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Permit Corruption", "License Bribery"]
      },
      {
        id: 281,
        term: "Korupsi Petty",
        category: "skala",
        definition: "Korupsi kecil-kecilan",
        example: "Pungli di loket pelayanan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Petty Corruption", "Small-scale Fraud"]
      },
      {
        id: 282,
        term: "Korupsi Politik",
        category: "jenis",
        definition: "Korupsi untuk kepentingan politik",
        example: "Dana kampanye dari korupsi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Political Corruption", "Electoral Fraud"]
      },
      {
        id: 283,
        term: "Korupsi Preventif",
        category: "pencegahan",
        definition: "Upaya mencegah korupsi",
        example: "Sistem e-procurement",
        legalBasis: "Stranas PK",
        relatedTerms: ["Corruption Prevention", "Anti-corruption"]
      },
      {
        id: 284,
        term: "Korupsi Proyek",
        category: "jenis",
        definition: "Korupsi dalam pelaksanaan proyek",
        example: "Korupsi proyek infrastruktur",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Project Corruption", "Construction Fraud"]
      },
      {
        id: 285,
        term: "Korupsi Represif",
        category: "penegakan",
        definition: "Penindakan terhadap korupsi",
        example: "OTT KPK",
        legalBasis: "UU KPK",
        relatedTerms: ["Corruption Repression", "Law Enforcement"]
      },
      {
        id: 286,
        term: "Korupsi Rutin",
        category: "pola",
        definition: "Korupsi yang terjadi terus-menerus",
        example: "Setoran rutin dari bawahan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Routine Corruption", "Regular Fraud"]
      },
      {
        id: 287,
        term: "Korupsi Sektoral",
        category: "jenis",
        definition: "Korupsi di sektor tertentu",
        example: "Korupsi sektor migas",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Sectoral Corruption", "Industry Fraud"]
      },
      {
        id: 288,
        term: "Korupsi Sistematis",
        category: "pola",
        definition: "Korupsi yang terorganisir rapi",
        example: "Sistem setoran berjenjang",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Systematic Corruption", "Organized Fraud"]
      },
      {
        id: 289,
        term: "Korupsi Sistemik",
        category: "pola",
        definition: "Korupsi yang menjadi bagian sistem",
        example: "Korupsi sudah dianggap normal",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Systemic Corruption", "Endemic Corruption"]
      },
      {
        id: 290,
        term: "Korupsi Spontan",
        category: "pola",
        definition: "Korupsi tanpa perencanaan",
        example: "Minta uang rokok mendadak",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Spontaneous Corruption", "Opportunistic Fraud"]
      },
      {
        id: 291,
        term: "Korupsi Struktural",
        category: "pola",
        definition: "Korupsi karena struktur sistem",
        example: "Gaji rendah memicu pungli",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Structural Corruption", "System-based Fraud"]
      },
      {
        id: 292,
        term: "Korupsi Subsidi",
        category: "jenis",
        definition: "Korupsi dana subsidi",
        example: "Korupsi subsidi pupuk",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Subsidy Corruption", "Subsidy Fraud"]
      },
      {
        id: 293,
        term: "Korupsi Sumber Daya Alam",
        category: "sda",
        definition: "Korupsi eksploitasi SDA",
        example: "Illegal mining dengan backing aparat",
        legalBasis: "UU SDA",
        relatedTerms: ["Natural Resource Corruption", "Resource Theft"]
      },
      {
        id: 294,
        term: "Korupsi Tender",
        category: "pengadaan",
        definition: "Korupsi dalam proses tender",
        example: "Pengaturan pemenang tender",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Tender Corruption", "Bid Rigging"]
      },
      {
        id: 295,
        term: "Korupsi Terorganisir",
        category: "pola",
        definition: "Korupsi dengan organisasi rapi",
        example: "Sindikat korupsi pajak",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Organized Corruption", "Crime Syndicate"]
      },
      {
        id: 296,
        term: "Korupsi Time",
        category: "istilah",
        definition: "Tim yang kompak korupsi",
        example: "Tim sukses yang korupsi dana kampanye",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruption Team", "Fraud Gang"]
      },
      {
        id: 297,
        term: "Korupsi Transaksional",
        category: "jenis",
        definition: "Korupsi berbasis transaksi",
        example: "Bayar untuk dapat layanan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Transactional Corruption", "Quid Pro Quo"]
      },
      {
        id: 298,
        term: "Korupsi Vertikal",
        category: "pola",
        definition: "Korupsi dari atas ke bawah",
        example: "Atasan minta setoran bawahan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Vertical Corruption", "Top-down Fraud"]
      },
      {
        id: 299,
        term: "Koruptor",
        category: "pelaku",
        definition: "Pelaku tindak pidana korupsi",
        example: "Koruptor kelas kakap",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruptor", "Fraud Perpetrator"]
      },
      {
        id: 300,
        term: "Koruptor Kambuhan",
        category: "pelaku",
        definition: "Pelaku korupsi berulang",
        example: "Kembali korupsi setelah bebas",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Repeat Offender", "Recidivist"]
      },
      {
        id: 301,
        term: "Koruptor Kelas Teri",
        category: "pelaku",
        definition: "Pelaku korupsi skala kecil",
        example: "Pungli di tingkat kelurahan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Small Corruptor", "Petty Criminal"]
      },
      {
        id: 302,
        term: "Koruptor Kelas Kakap",
        category: "pelaku",
        definition: "Pelaku korupsi besar/elit",
        example: "Menteri yang korupsi triliunan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Big Fish", "High Profile Corruptor"]
      },
      {
        id: 303,
        term: "Koruptor Intelektual",
        category: "pelaku",
        definition: "Perancang skema korupsi",
        example: "Konsultan yang rancang modus korupsi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Mastermind", "Intellectual Actor"]
      },
      {
        id: 304,
        term: "Koruptor Korporasi",
        category: "pelaku",
        definition: "Perusahaan pelaku korupsi",
        example: "PT yang suap untuk dapat proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corporate Criminal", "Company Fraud"]
      },
      {
        id: 305,
        term: "Kriminalisasi",
        category: "penegakan",
        definition: "Menjadikan tindakan sebagai tindak pidana",
        example: "Kriminalisasi gratifikasi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Criminalization", "Law Making"]
      },
      {
        id: 306,
        term: "Kriminalisasi Kebijakan",
        category: "penegakan",
        definition: "Mempidanakan kebijakan administrasi",
        example: "Diskresi dijadikan korupsi",
        legalBasis: "UU Administrasi Pemerintahan",
        relatedTerms: ["Policy Criminalization", "Administrative Crime"]
      },
      {
        id: 307,
        term: "Kronisme",
        category: "modus",
        definition: "Memberi keuntungan pada kroni",
        example: "Proyek untuk teman dekat",
        legalBasis: "UU No. 28/1999",
        relatedTerms: ["Cronyism", "Favoritism"]
      },
      {
        id: 308,
        term: "Kroni Kapitalisme",
        category: "sistem",
        definition: "Kapitalisme berbasis kedekatan politik",
        example: "Pengusaha dapat monopoli karena dekat penguasa",
        legalBasis: "Ekonomi Politik",
        relatedTerms: ["Crony Capitalism", "Political Economy"]
      },
      {
        id: 309,
        term: "Kuitansi Fiktif",
        category: "dokumen",
        definition: "Bukti pembayaran palsu",
        example: "Kuitansi kosong untuk SPJ",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fake Receipt", "False Document"]
      },
      {
        id: 310,
        term: "Kuitansi Kosong",
        category: "dokumen",
        definition: "Kuitansi tanpa transaksi nyata",
        example: "Kuitansi untuk mark up",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Blank Receipt", "Empty Receipt"]
      },
      {
        id: 311,
        term: "Kultur Korupsi",
        category: "budaya",
        definition: "Budaya yang permisif terhadap korupsi",
        example: "Menganggap suap sebagai hal wajar",
        legalBasis: "Sosiologi Korupsi",
        relatedTerms: ["Corruption Culture", "Corrupt Mindset"]
      },
      {
        id: 312,
        term: "Kuota Proyek",
        category: "modus",
        definition: "Jatah proyek untuk pihak tertentu",
        example: "Anggota dewan dapat jatah proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Project Quota", "Project Share"]
      },
      {
        id: 313,
        term: "Laporan Fiktif",
        category: "dokumen",
        definition: "Laporan kegiatan/keuangan palsu",
        example: "LPJ kegiatan yang tidak ada",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fictitious Report", "False Report"]
      },
      {
        id: 314,
        term: "Laporan Gratifikasi",
        category: "pencegahan",
        definition: "Pelaporan penerimaan gratifikasi",
        example: "Lapor ke KPK dalam 30 hari",
        legalBasis: "UU KPK",
        relatedTerms: ["Gratification Report", "Gift Declaration"]
      },
      {
        id: 315,
        term: "Laporan Harta Kekayaan",
        category: "pencegahan",
        definition: "LHKPN penyelenggara negara",
        example: "Wajib lapor harta setiap tahun",
        legalBasis: "UU KPK",
        relatedTerms: ["Wealth Report", "Asset Declaration"]
      },
      {
        id: 316,
        term: "Larangan Gratifikasi",
        category: "pencegahan",
        definition: "Pelarangan menerima hadiah jabatan",
        example: "PNS dilarang terima hadiah",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Gift Ban", "No-Gift Policy"]
      },
      {
        id: 317,
        term: "Laundering",
        category: "modus",
        definition: "Pencucian uang hasil korupsi",
        example: "Beli properti dari uang korupsi",
        legalBasis: "UU TPPU",
        relatedTerms: ["Money Laundering", "Pencucian Uang"]
      },
      {
        id: 318,
        term: "Layanan Cepat",
        category: "modus",
        definition: "Percepatan layanan dengan uang",
        example: "Bayar untuk dapat SIM cepat",
        legalBasis: "UU Pelayanan Publik",
        relatedTerms: ["Fast Track", "Express Service"]
      },
      {
        id: 319,
        term: "Legal Opinion Shopping",
        category: "modus",
        definition: "Cari pendapat hukum yang menguntungkan",
        example: "Bayar ahli untuk pendapat yang meringankan",
        legalBasis: "Etika Profesi",
        relatedTerms: ["Opinion Shopping", "Expert Shopping"]
      },
      {
        id: 320,
        term: "Lelang Jabatan",
        category: "jabatan",
        definition: "Jual beli jabatan publik",
        example: "Bayar untuk jadi kepala sekolah",
        legalBasis: "UU ASN",
        relatedTerms: ["Position Auction", "Job Sale"]
      },
      {
        id: 321,
        term: "Lembaga Anti Korupsi",
        category: "lembaga",
        definition: "Institusi pemberantasan korupsi",
        example: "KPK, Inspektorat, APIP",
        legalBasis: "UU KPK",
        relatedTerms: ["Anti-corruption Agency", "ACB"]
      },
      {
        id: 322,
        term: "Lembaga Donor",
        category: "pencegahan",
        definition: "Pemberi bantuan program antikorupsi",
        example: "World Bank dukung program antikorupsi",
        legalBasis: "Kerjasama Internasional",
        relatedTerms: ["Donor Agency", "Development Partner"]
      },
      {
        id: 323,
        term: "LHKPN",
        category: "pencegahan",
        definition: "Laporan Harta Kekayaan Penyelenggara Negara",
        example: "Pejabat wajib laporkan harta",
        legalBasis: "UU KPK",
        relatedTerms: ["Wealth Declaration", "Asset Report"]
      },
      {
        id: 324,
        term: "Lisensi Ilegal",
        category: "dokumen",
        definition: "Izin yang diterbitkan melawan hukum",
        example: "Izin tambang di hutan lindung",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Illegal License", "Fake Permit"]
      },
      {
        id: 325,
        term: "Lobi Koruptif",
        category: "modus",
        definition: "Lobi dengan iming-iming keuntungan",
        example: "Lobi DPR untuk loloskan pasal",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Lobbying", "Bribery Lobby"]
      },
      {
        id: 326,
        term: "Lost Generation",
        category: "dampak",
        definition: "Generasi hilang akibat korupsi pendidikan",
        example: "Kualitas SDM rendah karena korupsi",
        legalBasis: "Analisis Sosial",
        relatedTerms: ["Generasi Hilang", "Education Crisis"]
      },
      {
        id: 327,
        term: "Low Trust Society",
        category: "dampak",
        definition: "Masyarakat dengan kepercayaan rendah",
        example: "Tidak percaya pemerintah karena korupsi",
        legalBasis: "Sosiologi",
        relatedTerms: ["Distrust", "Social Capital Loss"]
      },
      {
        id: 328,
        term: "Lubang Anggaran",
        category: "modus",
        definition: "Celah untuk korupsi dalam anggaran",
        example: "Post anggaran tidak jelas",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Budget Loophole", "Fiscal Gap"]
      },
      {
        id: 329,
        term: "Mafia Anggaran",
        category: "pelaku",
        definition: "Kelompok pengendali anggaran korup",
        example: "Mafia anggaran di DPR",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Budget Mafia", "Fiscal Cartel"]
      },
      {
        id: 330,
        term: "Mafia Hukum",
        category: "pelaku",
        definition: "Sindikat dalam sistem peradilan",
        example: "Makelar kasus di pengadilan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Judicial Mafia", "Legal Mafia"]
      },
      {
        id: 331,
        term: "Mafia Migas",
        category: "pelaku",
        definition: "Kartel korupsi minyak dan gas",
        example: "Manipulasi harga BBM",
        legalBasis: "UU Migas",
        relatedTerms: ["Oil Mafia", "Energy Cartel"]
      },
      {
        id: 332,
        term: "Mafia Pajak",
        category: "pelaku",
        definition: "Sindikat korupsi perpajakan",
        example: "Negosiasi nilai pajak",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Tax Mafia", "Fiscal Fraud Ring"]
      },
      {
        id: 333,
        term: "Mafia Pangan",
        category: "pelaku",
        definition: "Kartel korupsi sektor pangan",
        example: "Monopoli impor pangan",
        legalBasis: "UU Pangan",
        relatedTerms: ["Food Mafia", "Food Cartel"]
      },
      {
        id: 334,
        term: "Mafia Peradilan",
        category: "pelaku",
        definition: "Jaringan korupsi di pengadilan",
        example: "Jual beli putusan hakim",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Court Mafia", "Judicial Corruption Ring"]
      },
      {
        id: 335,
        term: "Mafia Proyek",
        category: "pelaku",
        definition: "Sindikat penguasaan proyek",
        example: "Kartel kontraktor BUMN",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Project Mafia", "Construction Cartel"]
      },
      {
        id: 336,
        term: "Mafia Tanah",
        category: "pelaku",
        definition: "Sindikat korupsi pertanahan",
        example: "Sertifikat ganda dan sengketa",
        legalBasis: "UU Pertanahan",
        relatedTerms: ["Land Mafia", "Property Fraud"]
      },
      {
        id: 337,
        term: "Makelar Kasus",
        category: "pelaku",
        definition: "Perantara jual beli perkara",
        example: "Markus di kejaksaan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Case Broker", "Markus"]
      },
      {
        id: 338,
        term: "Makelar Politik",
        category: "pelaku",
        definition: "Broker transaksi politik korup",
        example: "Atur deal proyek dengan fee",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Political Broker", "Power Broker"]
      },
      {
        id: 339,
        term: "Makelar Proyek",
        category: "pelaku",
        definition: "Perantara tender korup",
        example: "Broker yang atur pemenang tender",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Project Broker", "Tender Broker"]
      },
      {
        id: 340,
        term: "Mal-administrasi",
        category: "modus",
        definition: "Penyalahgunaan administrasi",
        example: "Prosedur rumit untuk peras",
        legalBasis: "UU Ombudsman",
        relatedTerms: ["Maladministration", "Bad Governance"]
      },
      {
        id: 341,
        term: "Maling Kelas Teri",
        category: "istilah",
        definition: "Koruptor kecil yang ditangkap",
        example: "Mencuri sandal dipenjara, korupsi milyar bebas",
        legalBasis: "Kritik Sosial",
        relatedTerms: ["Small Thief", "Petty Criminal"]
      },
      {
        id: 342,
        term: "Mandat Korup",
        category: "dokumen",
        definition: "Surat tugas untuk tujuan korupsi",
        example: "SK fiktif untuk perjalanan dinas",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Mandate", "Fake Assignment"]
      },
      {
        id: 343,
        term: "Manipulasi Anggaran",
        category: "modus",
        definition: "Pengubahan anggaran untuk korupsi",
        example: "Ubah alokasi dana tiba-tiba",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Budget Manipulation", "Fiscal Fraud"]
      },
      {
        id: 344,
        term: "Manipulasi Data",
        category: "modus",
        definition: "Pemalsuan data untuk korupsi",
        example: "Data penerima bansos fiktif",
        legalBasis: "UU ITE",
        relatedTerms: ["Data Manipulation", "Information Fraud"]
      },
      {
        id: 345,
        term: "Manipulasi Harga",
        category: "modus",
        definition: "Pengaturan harga untuk untung korup",
        example: "Naikkan HPS untuk mark up",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Price Manipulation", "Price Fixing"]
      },
      {
        id: 346,
        term: "Manipulasi Tender",
        category: "pengadaan",
        definition: "Kecurangan dalam proses tender",
        example: "Atur spesifikasi untuk peserta tertentu",
        legalBasis: "Perpres 16/2018",
        relatedTerms: ["Tender Manipulation", "Bid Rigging"]
      },
      {
        id: 347,
        term: "Mark Down",
        category: "modus",
        definition: "Menurunkan nilai untuk korupsi",
        example: "Jual aset negara murah ke kroni",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Undervaluation", "Asset Stripping"]
      },
      {
        id: 348,
        term: "Mark Up",
        category: "modus",
        definition: "Menaikkan harga di atas wajar",
        example: "Beli komputer harga 3x lipat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Price Inflation", "Overpricing"]
      },
      {
        id: 349,
        term: "Markus",
        category: "pelaku",
        definition: "Makelar kasus",
        example: "Markus yang atur vonis ringan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Case Broker", "Court Mafia"]
      },
      {
        id: 350,
        term: "Masa Tenang Korupsi",
        category: "istilah",
        definition: "Periode aman dari penindakan",
        example: "Jelang pemilu biasanya aman",
        legalBasis: "Analisis Politik",
        relatedTerms: ["Safe Period", "Political Protection"]
      },
      {
        id: 351,
        term: "Matching Fund",
        category: "modus",
        definition: "Dana pendamping untuk korupsi",
        example: "Minta dana pendamping fiktif",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Counterpart Fund", "Co-financing"]
      },
      {
        id: 352,
        term: "Melindungi Koruptor",
        category: "obstruction",
        definition: "Memberi perlindungan pada koruptor",
        example: "Halangi penyidikan KPK",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Protecting Corruptor", "Obstruction"]
      },
      {
        id: 353,
        term: "Memeras",
        category: "modus",
        definition: "Memaksa memberi dengan ancaman",
        example: "Ancam tutup usaha kalau tidak bayar",
        legalBasis: "KUHP",
        relatedTerms: ["Extortion", "Blackmail"]
      },
      {
        id: 354,
        term: "Memperdagangkan Pengaruh",
        category: "modus",
        definition: "Jual pengaruh jabatan",
        example: "Tawarkan bantuan urus proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Trading Influence", "Influence Peddling"]
      },
      {
        id: 355,
        term: "Memperkaya Diri",
        category: "tujuan",
        definition: "Tujuan utama korupsi",
        example: "Korupsi untuk beli rumah mewah",
        legalBasis: "Pasal 2 UU Tipikor",
        relatedTerms: ["Self-enrichment", "Personal Gain"]
      },
      {
        id: 356,
        term: "Mempersulit Layanan",
        category: "modus",
        definition: "Hambat layanan untuk dapat suap",
        example: "Persulit izin supaya bayar",
        legalBasis: "UU Pelayanan Publik",
        relatedTerms: ["Service Obstruction", "Red Tape"]
      },
      {
        id: 357,
        term: "Mencuci Uang",
        category: "modus",
        definition: "Menyamarkan asal uang korupsi",
        example: "Transfer ke luar negeri berkali-kali",
        legalBasis: "UU TPPU",
        relatedTerms: ["Money Laundering", "Laundering"]
      },
      {
        id: 358,
        term: "Menggelapkan",
        category: "modus",
        definition: "Menguasai barang/uang jabatan",
        example: "Uang kas kantor dipakai pribadi",
        legalBasis: "Pasal 8 UU Tipikor",
        relatedTerms: ["Embezzlement", "Misappropriation"]
      },
      {
        id: 359,
        term: "Menghalangi Penyidikan",
        category: "obstruction",
        definition: "Hambat proses hukum korupsi",
        example: "Sembunyikan dokumen penting",
        legalBasis: "KUHP",
        relatedTerms: ["Obstruction of Justice", "Hampering"]
      },
      {
        id: 360,
        term: "Mengurangi Kualitas",
        category: "modus",
        definition: "Turunkan spesifikasi untuk untung",
        example: "Pasang besi 8mm padahal kontrak 12mm",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Quality Reduction", "Specification Fraud"]
      },
      {
        id: 361,
        term: "Menipu Negara",
        category: "modus",
        definition: "Membohongi untuk rugikan negara",
        example: "Klaim fiktif asuransi BPJS",
        legalBasis: "UU Tipikor",
        relatedTerms: ["State Fraud", "Government Deception"]
      },
      {
        id: 362,
        term: "Mental Korup",
        category: "budaya",
        definition: "Pola pikir yang mendukung korupsi",
        example: "Anggap wajar minta uang rokok",
        legalBasis: "Psikologi Korupsi",
        relatedTerms: ["Corrupt Mindset", "Corruption Mentality"]
      },
      {
        id: 363,
        term: "Menyalahgunakan Wewenang",
        category: "modus",
        definition: "Gunakan jabatan untuk untung pribadi",
        example: "Paksa bawahan setor",
        legalBasis: "Pasal 3 UU Tipikor",
        relatedTerms: ["Abuse of Power", "Authority Abuse"]
      },
      {
        id: 364,
        term: "Menyuap",
        category: "tindakan",
        definition: "Memberi sesuatu agar diuntungkan",
        example: "Suap polisi agar bebas tilang",
        legalBasis: "Pasal 5 UU Tipikor",
        relatedTerms: ["Bribing", "Giving Bribe"]
      },
      {
        id: 365,
        term: "Merugikan Keuangan Negara",
        category: "unsur",
        definition: "Unsur kerugian dalam korupsi",
        example: "Proyek gagal rugikan APBN",
        legalBasis: "Pasal 2 UU Tipikor",
        relatedTerms: ["State Financial Loss", "Fiscal Damage"]
      },
      {
        id: 366,
        term: "Merusak Barang Bukti",
        category: "obstruction",
        definition: "Hilangkan bukti korupsi",
        example: "Bakar dokumen keuangan",
        legalBasis: "KUHP",
        relatedTerms: ["Evidence Destruction", "Tampering"]
      },
      {
        id: 367,
        term: "Mindset Anti Korupsi",
        category: "pencegahan",
        definition: "Pola pikir menolak korupsi",
        example: "Budaya malu korupsi",
        legalBasis: "Pendidikan Antikorupsi",
        relatedTerms: ["Anti-corruption Mindset", "Clean Mentality"]
      },
      {
        id: 368,
        term: "Mitra Kerja Korup",
        category: "pelaku",
        definition: "Rekanan yang terlibat korupsi",
        example: "Kontraktor yang biasa suap",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Partner", "Dirty Business"]
      },
      {
        id: 369,
        term: "Modalitas Korupsi",
        category: "faktor",
        definition: "Faktor pendukung korupsi",
        example: "Jabatan strategis untuk korupsi",
        legalBasis: "Analisis Korupsi",
        relatedTerms: ["Corruption Modality", "Enabling Factor"]
      },
      {
        id: 370,
        term: "Modus Baru",
        category: "modus",
        definition: "Cara korupsi yang belum umum",
        example: "Korupsi lewat cryptocurrency",
        legalBasis: "Perkembangan Tipikor",
        relatedTerms: ["New Modus", "Novel Method"]
      },
      {
        id: 371,
        term: "Modus Operandi",
        category: "modus",
        definition: "Cara kerja melakukan korupsi",
        example: "Pecah kontrak untuk hindari audit",
        legalBasis: "UU Tipikor",
        relatedTerms: ["MO", "Method of Operation"]
      },
      {
        id: 372,
        term: "Money Laundering",
        category: "kejahatan-lanjutan",
        definition: "Cuci uang hasil korupsi",
        example: "Beli properti dari uang haram",
        legalBasis: "UU TPPU",
        relatedTerms: ["Pencucian Uang", "TPPU"]
      },
      {
        id: 373,
        term: "Money Politics",
        category: "politik",
        definition: "Politik uang dalam pemilu",
        example: "Bagi-bagi uang untuk dapat suara",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Politik Uang", "Vote Buying"]
      },
      {
        id: 374,
        term: "Monopoli Koruptif",
        category: "ekonomi",
        definition: "Kuasai pasar dengan cara korup",
        example: "Monopoli impor dengan backing",
        legalBasis: "UU Anti Monopoli",
        relatedTerms: ["Corrupt Monopoly", "Market Control"]
      },
      {
        id: 375,
        term: "Moral Hazard",
        category: "risiko",
        definition: "Risiko perilaku korup",
        example: "Bailout bank malah dikorupsi",
        legalBasis: "Teori Ekonomi",
        relatedTerms: ["Risiko Moral", "Behavioral Risk"]
      },
      {
        id: 376,
        term: "Motif Ekonomi",
        category: "motif",
        definition: "Korupsi karena alasan ekonomi",
        example: "Korupsi karena gaji kecil",
        legalBasis: "Kriminologi",
        relatedTerms: ["Economic Motive", "Financial Reason"]
      },
      {
        id: 377,
        term: "Motif Politik",
        category: "motif",
        definition: "Korupsi untuk tujuan politik",
        example: "Korupsi untuk dana kampanye",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Political Motive", "Power Reason"]
      },
      {
        id: 378,
        term: "Mutual Corruption",
        category: "pola",
        definition: "Korupsi saling menguntungkan",
        example: "Win-win corruption",
        legalBasis: "Teori Korupsi",
        relatedTerms: ["Mutual Benefit", "Win-win Fraud"]
      },
      {
        id: 379,
        term: "Nama Samaran",
        category: "modus",
        definition: "Identitas palsu untuk korupsi",
        example: "Rekening atas nama orang lain",
        legalBasis: "UU TPPU",
        relatedTerms: ["Alias", "Fake Identity"]
      },
      {
        id: 380,
        term: "Narapidana Korupsi",
        category: "pelaku",
        definition: "Terpidana kasus korupsi",
        example: "Napi korupsi di Lapas Sukamiskin",
        legalBasis: "UU Pemasyarakatan",
        relatedTerms: ["Corruption Convict", "Prisoner"]
      },
      {
        id: 381,
        term: "Negara Gagal",
        category: "dampak",
        definition: "Negara hancur karena korupsi",
        example: "Failed state akibat korupsi masif",
        legalBasis: "Ilmu Politik",
        relatedTerms: ["Failed State", "State Collapse"]
      },
      {
        id: 382,
        term: "Negosiasi Hukum",
        category: "peradilan",
        definition: "Tawar menawar vonis/dakwaan",
        example: "Nego pasal yang didakwakan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Legal Negotiation", "Plea Bargain"]
      },
      {
        id: 383,
        term: "Nepotisme",
        category: "modus",
        definition: "Mengutamakan keluarga/kerabat",
        example: "Angkat keponakan jadi pejabat",
        legalBasis: "UU No. 28/1999",
        relatedTerms: ["Nepotism", "Favoritism"]
      },
      {
        id: 384,
        term: "Neraca Korupsi",
        category: "pengukuran",
        definition: "Perhitungan untung rugi korupsi",
        example: "Korupsi Rp 1 T, pidana 5 tahun",
        legalBasis: "Analisis Ekonomi",
        relatedTerms: ["Corruption Balance", "Cost-Benefit"]
      },
      {
        id: 385,
        term: "Niat Jahat",
        category: "unsur",
        definition: "Mens rea dalam korupsi",
        example: "Sengaja merugikan negara",
        legalBasis: "Pasal 2 UU Tipikor",
        relatedTerms: ["Criminal Intent", "Mens Rea"]
      },
      {
        id: 386,
        term: "Nilai Kerugian",
        category: "unsur",
        definition: "Besaran kerugian negara",
        example: "Kerugian negara Rp 2,3 triliun",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Loss Value", "Damage Amount"]
      },
      {
        id: 387,
        term: "Non-budgeter",
        category: "anggaran",
        definition: "Kegiatan tanpa anggaran resmi",
        example: "Proyek non-budgeter rawan korupsi",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Off-budget", "Unbudgeted"]
      },
      {
        id: 388,
        term: "Nota Fiktif",
        category: "dokumen",
        definition: "Bukti pembelian palsu",
        example: "Nota kosong untuk LPJ",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fake Invoice", "False Receipt"]
      },
      {
        id: 389,
        term: "Obstruction of Justice",
        category: "obstruction",
        definition: "Halangi proses hukum",
        example: "Intimidasi saksi korupsi",
        legalBasis: "KUHP",
        relatedTerms: ["Halang Peradilan", "Justice Obstruction"]
      },
      {
        id: 390,
        term: "Off Budget",
        category: "anggaran",
        definition: "Di luar anggaran resmi",
        example: "Dana off budget untuk operasi",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Non-budgeter", "Hidden Budget"]
      },
      {
        id: 391,
        term: "Off Shore",
        category: "modus",
        definition: "Simpan uang korupsi di luar negeri",
        example: "Rekening di negara tax haven",
        legalBasis: "UU TPPU",
        relatedTerms: ["Offshore Account", "Tax Haven"]
      },
      {
        id: 392,
        term: "Off The Book",
        category: "akuntansi",
        definition: "Transaksi di luar pembukuan",
        example: "Pembayaran tanpa bukti",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Unrecorded", "Hidden Transaction"]
      },
      {
        id: 393,
        term: "Oknum",
        category: "pelaku",
        definition: "Pelaku individual dalam institusi",
        example: "Oknum polisi minta suap",
        legalBasis: "Terminologi Umum",
        relatedTerms: ["Bad Apple", "Rogue Element"]
      },
      {
        id: 394,
        term: "Oligarki Korup",
        category: "sistem",
        definition: "Kelompok kecil penguasa korup",
        example: "Elite politik bisnis korup",
        legalBasis: "Ilmu Politik",
        relatedTerms: ["Corrupt Oligarchy", "Elite Corruption"]
      },
      {
        id: 395,
        term: "Ombudsman",
        category: "lembaga",
        definition: "Lembaga pengawas pelayanan publik",
        example: "Lapor maladministrasi ke Ombudsman",
        legalBasis: "UU Ombudsman",
        relatedTerms: ["Public Ombudsman", "Service Watchdog"]
      },
      {
        id: 396,
        term: "One Man Show",
        category: "modus",
        definition: "Korupsi dilakukan sendiri",
        example: "Bendahara main sendiri",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Solo Operation", "Individual Fraud"]
      },
      {
        id: 397,
        term: "Operasi Tangkap Tangan",
        category: "penegakan",
        definition: "Penangkapan saat transaksi korupsi",
        example: "OTT KPK tangkap pejabat",
        legalBasis: "UU KPK",
        relatedTerms: ["OTT", "Sting Operation"]
      },
      {
        id: 398,
        term: "Opini Wajar Tanpa Pengecualian",
        category: "audit",
        definition: "Hasil audit terbaik",
        example: "WTP dari BPK",
        legalBasis: "UU Pemeriksaan Keuangan",
        relatedTerms: ["WTP", "Clean Audit Opinion"]
      },
      {
        id: 399,
        term: "Opportunity Cost",
        category: "dampak",
        definition: "Biaya kesempatan akibat korupsi",
        example: "Dana korupsi harusnya untuk sekolah",
        legalBasis: "Ekonomi Publik",
        relatedTerms: ["Biaya Kesempatan", "Lost Opportunity"]
      },
      {
        id: 400,
        term: "Order Fiktif",
        category: "dokumen",
        definition: "Pesanan palsu untuk mark up",
        example: "Purchase order bohongan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fake Order", "False PO"]
      },
      {
        id: 401,
        term: "Organisasi Kejahatan",
        category: "pelaku",
        definition: "Kelompok terorganisir untuk korupsi",
        example: "Sindikat korupsi pajak",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Crime Organization", "Criminal Syndicate"]
      },
      {
        id: 402,
        term: "OTT",
        category: "penegakan",
        definition: "Operasi Tangkap Tangan",
        example: "OTT hakim di hotel",
        legalBasis: "UU KPK",
        relatedTerms: ["Sting Operation", "Tangkap Tangan"]
      },
      {
        id: 403,
        term: "Outsourcing Korupsi",
        category: "modus",
        definition: "Serahkan korupsi ke pihak lain",
        example: "Pakai konsultan untuk terima suap",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruption Outsourcing", "Third Party"]
      },
      {
        id: 404,
        term: "Over Budget",
        category: "anggaran",
        definition: "Melebihi anggaran untuk korupsi",
        example: "Proyek membengkak 300%",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Budget Overrun", "Cost Overrun"]
      },
      {
        id: 405,
        term: "Over Invoice",
        category: "modus",
        definition: "Tagihan melebihi yang sebenarnya",
        example: "Invoice Rp 1 M untuk barang Rp 500 juta",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Invoice Padding", "Inflated Invoice"]
      },
      {
        id: 406,
        term: "Oversight Failure",
        category: "sistem",
        definition: "Kegagalan pengawasan",
        example: "Inspektorat gagal deteksi korupsi",
        legalBasis: "Sistem Pengawasan",
        relatedTerms: ["Supervision Failure", "Control Breakdown"]
      },
      {
        id: 407,
        term: "Padat Karya Fiktif",
        category: "modus",
        definition: "Proyek padat karya bohongan",
        example: "Daftar pekerja fiktif",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fictitious Labor", "Ghost Workers"]
      },
      {
        id: 408,
        term: "Pajak Korup",
        category: "pajak",
        definition: "Manipulasi sistem perpajakan",
        example: "Nego pajak dengan fiskus nakal",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Tax Corruption", "Fiscal Fraud"]
      },
      {
        id: 409,
        term: "Pakta Integritas",
        category: "pencegahan",
        definition: "Perjanjian untuk tidak korupsi",
        example: "Peserta tender tanda tangan pakta",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Integrity Pact", "Anti-corruption Agreement"]
      },
      {
        id: 410,
        term: "Panama Papers",
        category: "kasus",
        definition: "Skandal dokumen offshore global",
        example: "Bocoran data tax haven",
        legalBasis: "Kasus Internasional",
        relatedTerms: ["Offshore Leaks", "Tax Haven Scandal"]
      },
      {
        id: 411,
        term: "Paradise Papers",
        category: "kasus",
        definition: "Bocoran dokumen surga pajak",
        example: "Data offshore leak 2017",
        legalBasis: "Kasus Internasional",
        relatedTerms: ["Tax Haven Papers", "Offshore Documents"]
      },
      {
        id: 412,
        term: "Pasar Gelap",
        category: "ekonomi",
        definition: "Transaksi ilegal dengan korupsi",
        example: "Jual beli BBM subsidi",
        legalBasis: "UU Migas",
        relatedTerms: ["Black Market", "Underground Economy"]
      },
      {
        id: 413,
        term: "Patron-Client",
        category: "pola",
        definition: "Hubungan bapak-anak dalam korupsi",
        example: "Bawahan setor ke atasan",
        legalBasis: "Sosiologi Korupsi",
        relatedTerms: ["Patronage", "Clientelism"]
      },
      {
        id: 414,
        term: "Pay to Play",
        category: "modus",
        definition: "Bayar untuk dapat kesempatan",
        example: "Bayar untuk ikut tender",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Entry Fee", "Access Payment"]
      },
      {
        id: 415,
        term: "Pecah Belah",
        category: "dampak",
        definition: "Korupsi memecah persatuan",
        example: "Konflik karena bagi-bagi proyek",
        legalBasis: "Analisis Sosial",
        relatedTerms: ["Divide", "Social Fragmentation"]
      },
      {
        id: 416,
        term: "Pelanggaran Etik",
        category: "etika",
        definition: "Melanggar kode etik jabatan",
        example: "Terima hadiah dari vendor",
        legalBasis: "Kode Etik",
        relatedTerms: ["Ethics Violation", "Code Breach"]
      },
      {
        id: 417,
        term: "Pelarian Koruptor",
        category: "pelaku",
        definition: "Koruptor yang melarikan diri",
        example: "Kabur ke luar negeri",
        legalBasis: "UU Ekstradisi",
        relatedTerms: ["Fugitive", "Runaway Corruptor"]
      },
      {
        id: 418,
        term: "Pelicin",
        category: "modus",
        definition: "Uang untuk memperlancar urusan",
        example: "Uang pelicin di pelabuhan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Grease Money", "Facilitation Payment"]
      },
      {
        id: 419,
        term: "Pelindung Koruptor",
        category: "pelaku",
        definition: "Pihak yang melindungi koruptor",
        example: "Backing dari pejabat tinggi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Protector", "Guardian"]
      },
      {
        id: 420,
        term: "Peluang Korupsi",
        category: "faktor",
        definition: "Kesempatan untuk korupsi",
        example: "Sistem pengawasan lemah",
        legalBasis: "Teori Fraud",
        relatedTerms: ["Corruption Opportunity", "Chance"]
      },
      {
        id: 421,
        term: "Pemalsuan Dokumen",
        category: "modus",
        definition: "Buat dokumen palsu untuk korupsi",
        example: "SPJ palsu untuk cairkan dana",
        legalBasis: "KUHP",
        relatedTerms: ["Document Forgery", "Falsification"]
      },
      {
        id: 422,
        term: "Pemalsuan Tanda Tangan",
        category: "modus",
        definition: "Tiru tanda tangan untuk korupsi",
        example: "Tanda tangan palsu di cek",
        legalBasis: "KUHP",
        relatedTerms: ["Signature Forgery", "Fake Signature"]
      },
      {
        id: 423,
        term: "Pembayaran Fiktif",
        category: "modus",
        definition: "Bayar untuk yang tidak ada",
        example: "Bayar pegawai hantu",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fictitious Payment", "Ghost Payment"]
      },
      {
        id: 424,
        term: "Pembayaran Ganda",
        category: "modus",
        definition: "Bayar dua kali untuk satu hal",
        example: "Double payment untuk mark up",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Double Payment", "Duplicate Payment"]
      },
      {
        id: 425,
        term: "Pembeli Suara",
        category: "politik",
        definition: "Pihak yang beli suara pemilu",
        example: "Caleg bagi-bagi uang",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Vote Buyer", "Electoral Fraud"]
      },
      {
        id: 426,
        term: "Pemberantasan Korupsi",
        category: "kebijakan",
        definition: "Upaya hapus korupsi",
        example: "Program antikorupsi nasional",
        legalBasis: "Inpres Percepatan",
        relatedTerms: ["Anti-corruption", "Corruption Eradication"]
      },
      {
        id: 427,
        term: "Pemberian Ilegal",
        category: "modus",
        definition: "Hadiah yang melanggar aturan",
        example: "Beri mobil ke pejabat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Illegal Gift", "Unlawful Present"]
      },
      {
        id: 428,
        term: "Pembersihan",
        category: "penegakan",
        definition: "Bersihkan institusi dari koruptor",
        example: "Reshuffle kabinet korup",
        legalBasis: "Kebijakan Pemerintah",
        relatedTerms: ["Cleaning", "Purge"]
      },
      {
        id: 429,
        term: "Pembocor Rahasia",
        category: "pelaku",
        definition: "Pihak yang bocorkan info penting",
        example: "Bocorkan rencana OTT",
        legalBasis: "UU ITE",
        relatedTerms: ["Leaker", "Information Leak"]
      },
      {
        id: 430,
        term: "Pembukuan Ganda",
        category: "akuntansi",
        definition: "Dua pembukuan untuk sembunyikan korupsi",
        example: "Buku resmi dan buku bayangan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Double Bookkeeping", "Dual Books"]
      },
      {
        id: 431,
        term: "Pemburu Rente",
        category: "pelaku",
        definition: "Pihak yang cari untung dari jabatan",
        example: "Broker yang dekat pejabat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Rent Seeker", "Benefit Hunter"]
      },
      {
        id: 432,
        term: "Pemotongan Anggaran",
        category: "modus",
        definition: "Potong dana untuk kantong pribadi",
        example: "Potong 10% dari setiap proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Budget Cut", "Fund Skimming"]
      },
      {
        id: 433,
        term: "Pemufakatan Jahat",
        category: "modus",
        definition: "Konspirasi untuk korupsi",
        example: "Komplotan atur tender",
        legalBasis: "KUHP",
        relatedTerms: ["Criminal Conspiracy", "Evil Plot"]
      },
      {
        id: 434,
        term: "Penampung Korupsi",
        category: "pelaku",
        definition: "Pihak yang tampung hasil korupsi",
        example: "Simpan uang koruptor",
        legalBasis: "UU TPPU",
        relatedTerms: ["Money Holder", "Asset Keeper"]
      },
      {
        id: 435,
        term: "Penarikan Dana Ilegal",
        category: "modus",
        definition: "Ambil dana tanpa prosedur",
        example: "Cairkan APBD tanpa SPM",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Illegal Withdrawal", "Unauthorized Draw"]
      },
      {
        id: 436,
        term: "Pencairan Bodong",
        category: "modus",
        definition: "Cairkan dana dengan dokumen palsu",
        example: "SPJ palsu untuk cairkan dana",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fraudulent Disbursement", "Fake Claim"]
      },
      {
        id: 437,
        term: "Pencatatan Palsu",
        category: "akuntansi",
        definition: "Catat transaksi fiktif",
        example: "Catat pengeluaran bohong",
        legalBasis: "UU Tipikor",
        relatedTerms: ["False Recording", "Fake Entry"]
      },
      {
        id: 438,
        term: "Pencegahan Sistemik",
        category: "pencegahan",
        definition: "Cegah korupsi secara sistem",
        example: "Reformasi birokrasi menyeluruh",
        legalBasis: "Perpres RB",
        relatedTerms: ["Systemic Prevention", "System Reform"]
      },
      {
        id: 439,
        term: "Pencucian Uang",
        category: "kejahatan-lanjutan",
        definition: "Samarkan asal uang korupsi",
        example: "Transfer berlapis untuk hilangkan jejak",
        legalBasis: "UU TPPU",
        relatedTerms: ["Money Laundering", "Asset Cleaning"]
      },
      {
        id: 440,
        term: "Pendanaan Gelap",
        category: "modus",
        definition: "Dana tanpa sumber jelas",
        example: "Dana kampanye gelap",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Dark Money", "Black Fund"]
      },
      {
        id: 441,
        term: "Pendanaan Politik Korup",
        category: "politik",
        definition: "Dana politik dari korupsi",
        example: "Korupsi untuk biaya kampanye",
        legalBasis: "UU Parpol",
        relatedTerms: ["Corrupt Political Funding", "Dirty Money"]
      },
      {
        id: 442,
        term: "Pendekatan Koruptif",
        category: "modus",
        definition: "Dekati pejabat untuk korupsi",
        example: "Lobi dengan iming-iming",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Approach", "Bribery Attempt"]
      },
      {
        id: 443,
        term: "Penegak Hukum Korup",
        category: "pelaku",
        definition: "Aparat penegak hukum yang korupsi",
        example: "Jaksa terima suap",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Law Enforcer", "Dirty Cop"]
      },
      {
        id: 444,
        term: "Penerima Gratifikasi",
        category: "pelaku",
        definition: "Pihak yang terima hadiah jabatan",
        example: "Pejabat terima mobil",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Gratification Receiver", "Gift Taker"]
      },
      {
        id: 445,
        term: "Penerima Suap",
        category: "pelaku",
        definition: "Pihak yang disuap",
        example: "Hakim terima uang",
        legalBasis: "Pasal 12 UU Tipikor",
        relatedTerms: ["Bribe Taker", "Bribee"]
      },
      {
        id: 446,
        term: "Penetapan Tersangka",
        category: "penegakan",
        definition: "Status tersangka korupsi",
        example: "KPK tetapkan menteri tersangka",
        legalBasis: "KUHAP",
        relatedTerms: ["Suspect Status", "Criminal Charge"]
      },
      {
        id: 447,
        term: "Pengadaan Bermasalah",
        category: "pengadaan",
        definition: "Tender dengan indikasi korupsi",
        example: "Pengadaan tanpa tender",
        legalBasis: "Perpres 16/2018",
        relatedTerms: ["Problematic Procurement", "Corrupt Tender"]
      },
      {
        id: 448,
        term: "Pengadaan Darurat Fiktif",
        category: "pengadaan",
        definition: "Alasan darurat palsu untuk penunjukan langsung",
        example: "Klaim darurat padahal tidak",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Fake Emergency", "False Urgency"]
      },
      {
        id: 449,
        term: "Pengadaan Langsung",
        category: "pengadaan",
        definition: "Tanpa tender untuk nilai kecil",
        example: "Pecah kontrak untuk hindari tender",
        legalBasis: "Perpres 16/2018",
        relatedTerms: ["Direct Procurement", "Direct Award"]
      },
      {
        id: 450,
        term: "Pengawasan Melekat",
        category: "pencegahan",
        definition: "Pengawasan oleh atasan langsung",
        example: "Waskat untuk cegah korupsi",
        legalBasis: "PP SPIP",
        relatedTerms: ["Direct Supervision", "Waskat"]
      },
      {
        id: 451,
        term: "Pengelapan",
        category: "modus",
        definition: "Ambil yang bukan haknya",
        example: "Bendahara gelapkan uang kas",
        legalBasis: "Pasal 8 UU Tipikor",
        relatedTerms: ["Embezzlement", "Misappropriation"]
      },
      {
        id: 452,
        term: "Pengemplang Pajak",
        category: "pelaku",
        definition: "Koruptor di bidang perpajakan",
        example: "Manipulasi restitusi pajak",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Tax Evader", "Tax Fraud"]
      },
      {
        id: 453,
        term: "Pengganti Kerugian",
        category: "sanksi",
        definition: "Bayar kembali kerugian negara",
        example: "Uang pengganti Rp 10 miliar",
        legalBasis: "Pasal 18 UU Tipikor",
        relatedTerms: ["Restitution", "Loss Recovery"]
      },
      {
        id: 454,
        term: "Penggelembungan",
        category: "modus",
        definition: "Naikkan nilai di atas wajar",
        example: "Gelembungkan harga 200%",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Inflation", "Price Ballooning"]
      },
      {
        id: 455,
        term: "Penggelapan Pajak",
        category: "pajak",
        definition: "Sembunyikan objek pajak",
        example: "Tidak lapor penghasilan",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Tax Evasion", "Tax Fraud"]
      },
      {
        id: 456,
        term: "Pengguna Anggaran",
        category: "pelaku",
        definition: "Pejabat yang pakai APBN/APBD",
        example: "PA terlibat korupsi",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Budget User", "PA"]
      },
      {
        id: 457,
        term: "Penghalang Penyidikan",
        category: "obstruction",
        definition: "Hambat proses hukum",
        example: "Sembunyikan barang bukti",
        legalBasis: "KUHP",
        relatedTerms: ["Investigation Obstruction", "Hampering"]
      },
      {
        id: 458,
        term: "Penghilangan Barang Bukti",
        category: "obstruction",
        definition: "Musnahkan bukti korupsi",
        example: "Bakar dokumen keuangan",
        legalBasis: "KUHP",
        relatedTerms: ["Evidence Destruction", "Proof Elimination"]
      },
      {
        id: 459,
        term: "Penghukuman Sosial",
        category: "sanksi",
        definition: "Sanksi dari masyarakat",
        example: "Dikucilkan karena korupsi",
        legalBasis: "Norma Sosial",
        relatedTerms: ["Social Punishment", "Public Shame"]
      },
      {
        id: 460,
        term: "Pengkayaan Diri",
        category: "tujuan",
        definition: "Perkaya diri lewat korupsi",
        example: "Korupsi untuk beli aset pribadi",
        legalBasis: "Pasal 2 UU Tipikor",
        relatedTerms: ["Self-enrichment", "Personal Gain"]
      },
      {
        id: 461,
        term: "Pengumpul Dana Gelap",
        category: "pelaku",
        definition: "Pihak yang kumpulkan dana haram",
        example: "Koordinator dana liar",
        legalBasis: "UU TPPU",
        relatedTerms: ["Dark Fund Collector", "Illegal Fundraiser"]
      },
      {
        id: 462,
        term: "Pengusaha Hitam",
        category: "pelaku",
        definition: "Pebisnis yang pakai cara korup",
        example: "Suap untuk dapat proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Black Entrepreneur", "Corrupt Businessman"]
      },
      {
        id: 463,
        term: "Penindakan Korupsi",
        category: "penegakan",
        definition: "Tindak tegas koruptor",
        example: "Tangkap dan tahan koruptor",
        legalBasis: "UU KPK",
        relatedTerms: ["Corruption Enforcement", "Law Enforcement"]
      },
      {
        id: 464,
        term: "Penipu Negara",
        category: "pelaku",
        definition: "Pelaku penipuan terhadap negara",
        example: "Tipu negara lewat klaim palsu",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fraud", "Penipuan"],
        trending: false
      },
      {
        id: 465,
        term: "Pemerasan Jabatan",
        category: "tindakan",
        definition: "Memeras menggunakan kekuasaan jabatan",
        example: "Pejabat memeras pengusaha untuk izin",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Extortion", "Pemerasan"],
        trending: true
      },
      {
        id: 466,
        term: "Penyimpangan Anggaran",
        category: "keuangan",
        definition: "Penggunaan anggaran tidak sesuai peruntukan",
        example: "Dana pendidikan untuk wisata",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Budget Misuse", "Penyalahgunaan"]
      },
      {
        id: 467,
        term: "Perampasan Aset",
        category: "penindakan",
        definition: "Pengambilalihan aset hasil korupsi",
        example: "Sita aset koruptor oleh negara",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Asset Recovery", "Penyitaan"]
      },
      {
        id: 468,
        term: "Permufakatan Jahat",
        category: "tindakan",
        definition: "Kesepakatan untuk melakukan korupsi",
        example: "Kongkalikong dalam tender proyek",
        legalBasis: "KUHP",
        relatedTerms: ["Conspiracy", "Persekongkolan"]
      },
      {
        id: 469,
        term: "Pihak Ketiga",
        category: "pelaku",
        definition: "Orang lain yang terlibat dalam korupsi",
        example: "Broker dalam suap perizinan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Third Party", "Perantara"]
      },
      {
        id: 470,
        term: "Pidana Tambahan",
        category: "hukuman",
        definition: "Hukuman selain pidana pokok",
        example: "Pencabutan hak politik koruptor",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Additional Penalty", "Hukuman Tambahan"]
      },
      {
        id: 471,
        term: "Plea Bargaining",
        category: "hukum",
        definition: "Negosiasi pengakuan bersalah",
        example: "Justice collaborator dapat keringanan",
        legalBasis: "KUHAP",
        relatedTerms: ["Negosiasi Hukuman", "Kesepakatan"]
      },
      {
        id: 472,
        term: "Politik Uang",
        category: "tindakan",
        definition: "Penggunaan uang untuk mempengaruhi politik",
        example: "Beli suara dalam pemilu",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Money Politics", "Vote Buying"],
        trending: true
      },
      {
        id: 473,
        term: "Praperadilan",
        category: "hukum",
        definition: "Pemeriksaan keabsahan penangkapan/penahanan",
        example: "Praperadilan tersangka korupsi",
        legalBasis: "KUHAP",
        relatedTerms: ["Pretrial", "Pemeriksaan Awal"]
      },
      {
        id: 474,
        term: "Predatory State",
        category: "sistem",
        definition: "Negara yang dijalankan untuk kepentingan elit",
        example: "Negara dimanfaatkan untuk korupsi sistemik",
        legalBasis: "Teori Politik",
        relatedTerms: ["Negara Predator", "Kleptokrasi"]
      },
      {
        id: 475,
        term: "Preventif",
        category: "pencegahan",
        definition: "Upaya pencegahan korupsi",
        example: "Sistem e-procurement mencegah kolusi",
        legalBasis: "Perpres 54/2010",
        relatedTerms: ["Prevention", "Pencegahan"]
      },
      {
        id: 476,
        term: "Prinsip Akuntabilitas",
        category: "pencegahan",
        definition: "Pertanggungjawaban penggunaan kewenangan",
        example: "Laporan keuangan transparan",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Accountability", "Tanggung Jawab"]
      },
      {
        id: 477,
        term: "Procurement Fraud",
        category: "tindakan",
        definition: "Kecurangan dalam pengadaan barang/jasa",
        example: "Mark up harga dalam tender",
        legalBasis: "Perpres 16/2018",
        relatedTerms: ["Fraud Pengadaan", "Kecurangan Tender"]
      },
      {
        id: 478,
        term: "Profiling Koruptor",
        category: "analisis",
        definition: "Analisis pola perilaku koruptor",
        example: "Database profil pelaku korupsi",
        legalBasis: "UU KPK",
        relatedTerms: ["Corruption Profiling", "Analisis Pelaku"]
      },
      {
        id: 479,
        term: "Pukat Harimau",
        category: "operasi",
        definition: "Operasi besar-besaran antikorupsi",
        example: "OTT massal pejabat korup",
        legalBasis: "UU KPK",
        relatedTerms: ["Sweeping Operation", "Operasi Besar"]
      },
      {
        id: 480,
        term: "Pungli",
        category: "tindakan",
        definition: "Pungutan liar",
        example: "Pungli di pelayanan publik",
        legalBasis: "Perpres 87/2016",
        relatedTerms: ["Illegal Levy", "Pungutan Liar"],
        trending: true
      },
      {
        id: 481,
        term: "Pusat Pelaporan",
        category: "sistem",
        definition: "Tempat melaporkan dugaan korupsi",
        example: "Call center antikorupsi",
        legalBasis: "UU KPK",
        relatedTerms: ["Reporting Center", "Pengaduan"]
      },
      {
        id: 482,
        term: "Putusan Inkracht",
        category: "hukum",
        definition: "Putusan berkekuatan hukum tetap",
        example: "Vonis korupsi yang final",
        legalBasis: "KUHAP",
        relatedTerms: ["Final Verdict", "Putusan Final"]
      },
      {
        id: 483,
        term: "Quasi Judicial",
        category: "kelembagaan",
        definition: "Kewenangan seperti pengadilan",
        example: "Pengadilan Tipikor",
        legalBasis: "UU Pengadilan Tipikor",
        relatedTerms: ["Semi Yudisial", "Kuasi"]
      },
      {
        id: 484,
        term: "Quid Pro Quo",
        category: "tindakan",
        definition: "Timbal balik dalam korupsi",
        example: "Izin ditukar dengan suap",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Reciprocal", "Timbal Balik"]
      },
      {
        id: 485,
        term: "Rampasan",
        category: "penindakan",
        definition: "Perampasan aset korupsi untuk negara",
        example: "Mobil mewah hasil korupsi dirampas",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Confiscation", "Perampasan"]
      },
      {
        id: 486,
        term: "Rangkap Jabatan",
        category: "konflik",
        definition: "Memegang lebih dari satu jabatan",
        example: "Komisaris BUMN rangkap jabatan",
        legalBasis: "UU BUMN",
        relatedTerms: ["Multiple Positions", "Jabatan Ganda"]
      },
      {
        id: 487,
        term: "Razia Korupsi",
        category: "operasi",
        definition: "Pemeriksaan mendadak dugaan korupsi",
        example: "Razia aset pejabat",
        legalBasis: "UU KPK",
        relatedTerms: ["Corruption Raid", "Pemeriksaan"]
      },
      {
        id: 488,
        term: "Real Count",
        category: "monitoring",
        definition: "Penghitungan nyata kerugian korupsi",
        example: "Audit kerugian negara akurat",
        legalBasis: "UU BPK",
        relatedTerms: ["Actual Count", "Hitung Nyata"]
      },
      {
        id: 489,
        term: "Redenominasi Suap",
        category: "modus",
        definition: "Penyamaran nilai suap",
        example: "Suap dipecah jadi transaksi kecil",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Bribe Splitting", "Pemecahan Suap"]
      },
      {
        id: 490,
        term: "Reformasi Birokrasi",
        category: "pencegahan",
        definition: "Pembenahan sistem pemerintahan",
        example: "Reformasi untuk cegah korupsi",
        legalBasis: "Perpres 81/2010",
        relatedTerms: ["Bureaucratic Reform", "Pembenahan"]
      },
      {
        id: 491,
        term: "Rekayasa Anggaran",
        category: "modus",
        definition: "Manipulasi dokumen anggaran",
        example: "Anggaran fiktif untuk proyek palsu",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Budget Engineering", "Manipulasi"]
      },
      {
        id: 492,
        term: "Rekening Gendut",
        category: "indikator",
        definition: "Rekening dengan saldo tidak wajar",
        example: "PNS dengan rekening miliaran",
        legalBasis: "UU Pencucian Uang",
        relatedTerms: ["Fat Account", "Rekening Mencurigakan"],
        trending: true
      },
      {
        id: 493,
        term: "Remisi Koruptor",
        category: "kontroversi",
        definition: "Pengurangan masa tahanan koruptor",
        example: "Remisi hari raya untuk koruptor",
        legalBasis: "PP Remisi",
        relatedTerms: ["Sentence Reduction", "Pengurangan Hukuman"]
      },
      {
        id: 494,
        term: "Rent Seeking",
        category: "teori",
        definition: "Mencari keuntungan tanpa produktivitas",
        example: "Manipulasi regulasi untuk untung",
        legalBasis: "Teori Ekonomi",
        relatedTerms: ["Pencari Rente", "Economic Rent"]
      },
      {
        id: 495,
        term: "Representasi Palsu",
        category: "modus",
        definition: "Klaim palsu untuk keuntungan",
        example: "Klaim proyek fiktif",
        legalBasis: "KUHP",
        relatedTerms: ["False Representation", "Klaim Bohong"]
      },
      {
        id: 496,
        term: "Residivis Korupsi",
        category: "pelaku",
        definition: "Pengulang tindak pidana korupsi",
        example: "Korupsi berulang setelah bebas",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Repeat Offender", "Pengulang"]
      },
      {
        id: 497,
        term: "Restitusi",
        category: "pemulihan",
        definition: "Ganti rugi kepada negara",
        example: "Koruptor bayar ganti rugi negara",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Restitution", "Ganti Rugi"]
      },
      {
        id: 498,
        term: "Retribusi Liar",
        category: "tindakan",
        definition: "Pungutan tidak resmi",
        example: "Retribusi parkir liar",
        legalBasis: "UU Pemda",
        relatedTerms: ["Illegal Retribution", "Pungutan Ilegal"]
      },
      {
        id: 499,
        term: "Revolving Door",
        category: "sistem",
        definition: "Perpindahan pejabat-swasta berulang",
        example: "Mantan pejabat jadi konsultan proyek",
        legalBasis: "UU ASN",
        relatedTerms: ["Pintu Putar", "Perpindahan Jabatan"]
      },
      {
        id: 500,
        term: "Risk Assessment",
        category: "pencegahan",
        definition: "Penilaian risiko korupsi",
        example: "Analisis risiko sektor rawan",
        legalBasis: "Perpres 54/2018",
        relatedTerms: ["Penilaian Risiko", "Analisis Risiko"]
      },
      
      // Melanjutkan dengan sistematis hingga akhir...
      {
        id: 501,
        term: "Rogatory Letter",
        category: "hukum",
        definition: "Surat permintaan bantuan hukum internasional",
        example: "MLA untuk kejar aset koruptor di luar negeri",
        legalBasis: "UU MLA",
        relatedTerms: ["MLA", "Bantuan Hukum Internasional"]
      },
      {
        id: 502,
        term: "Rumah Aman",
        category: "perlindungan",
        definition: "Tempat perlindungan saksi/whistleblower",
        example: "Safe house untuk pelapor korupsi",
        legalBasis: "UU Perlindungan Saksi",
        relatedTerms: ["Safe House", "Tempat Perlindungan"]
      },
      {
        id: 503,
        term: "Sapu Bersih",
        category: "operasi",
        definition: "Operasi bersih-bersih korupsi total",
        example: "Clean sweep instansi korup",
        legalBasis: "UU KPK",
        relatedTerms: ["Clean Sweep", "Pembersihan Total"]
      },
      {
        id: 504,
        term: "Sektor Rawan",
        category: "analisis",
        definition: "Bidang rentan korupsi",
        example: "Sektor perizinan dan pengadaan",
        legalBasis: "Kajian KPK",
        relatedTerms: ["Vulnerable Sector", "Bidang Rentan"]
      },
      {
        id: 505,
        term: "Selubung Hukum",
        category: "modus",
        definition: "Penggunaan celah hukum untuk korupsi",
        example: "Manipulasi aturan untuk menguntungkan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Legal Loophole", "Celah Hukum"]
      },
      {
        id: 506,
        term: "Sertifikasi Antikorupsi",
        category: "pencegahan",
        definition: "Pengakuan bebas korupsi",
        example: "ISO 37001 Anti-Bribery",
        legalBasis: "Standar Internasional",
        relatedTerms: ["Anti-corruption Certification", "ISO 37001"]
      },
      {
        id: 507,
        term: "Shadow Economy",
        category: "dampak",
        definition: "Ekonomi bawah tanah akibat korupsi",
        example: "Transaksi gelap hindari pajak",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Ekonomi Bayangan", "Underground Economy"]
      },
      {
        id: 508,
        term: "Shell Company",
        category: "modus",
        definition: "Perusahaan cangkang untuk korupsi",
        example: "PT kosong untuk aliran dana korupsi",
        legalBasis: "UU PT",
        relatedTerms: ["Perusahaan Cangkang", "Paper Company"]
      },
      {
        id: 509,
        term: "Sidang Etik",
        category: "penindakan",
        definition: "Pemeriksaan pelanggaran etika",
        example: "Sidang etik pejabat korup",
        legalBasis: "Kode Etik",
        relatedTerms: ["Ethics Trial", "Pemeriksaan Etik"]
      },
      {
        id: 510,
        term: "Silang Sengkarut",
        category: "modus",
        definition: "Kerumitan disengaja untuk korupsi",
        example: "Birokrasi rumit untuk peras",
        legalBasis: "UU Pelayanan Publik",
        relatedTerms: ["Red Tape", "Birokrasi Berbelit"]
      },
      {
        id: 511,
        term: "Simbiosis Koruptif",
        category: "sistem",
        definition: "Hubungan saling menguntungkan dalam korupsi",
        example: "Pengusaha-pejabat saling untung",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Symbiosis", "Mutualisme Korup"]
      },
      {
        id: 512,
        term: "Sindikat Korupsi",
        category: "pelaku",
        definition: "Jaringan terorganisir korupsi",
        example: "Mafia anggaran di kementerian",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corruption Syndicate", "Mafia Korupsi"]
      },
      {
        id: 513,
        term: "Sistem Integritas",
        category: "pencegahan",
        definition: "Mekanisme pencegahan korupsi terpadu",
        example: "Integrity system di institusi",
        legalBasis: "Perpres",
        relatedTerms: ["Integrity System", "Sistem Pencegahan"]
      },
      {
        id: 514,
        term: "Skema Ponzi",
        category: "modus",
        definition: "Penipuan berantai investasi bodong",
        example: "Investasi bodong berkedok koperasi",
        legalBasis: "UU OJK",
        relatedTerms: ["Ponzi Scheme", "Penipuan Berantai"]
      },
      {
        id: 515,
        term: "Smoking Gun",
        category: "bukti",
        definition: "Bukti kuat kejahatan korupsi",
        example: "Rekaman suap sebagai bukti utama",
        legalBasis: "KUHAP",
        relatedTerms: ["Bukti Kuat", "Hard Evidence"]
      },
      {
        id: 516,
        term: "Social Audit",
        category: "pengawasan",
        definition: "Audit oleh masyarakat",
        example: "Warga audit dana desa",
        legalBasis: "UU Desa",
        relatedTerms: ["Audit Sosial", "Pengawasan Masyarakat"]
      },
      {
        id: 517,
        term: "Sogokan",
        category: "tindakan",
        definition: "Pemberian untuk mempengaruhi",
        example: "Sogok petugas untuk lolos pemeriksaan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Bribe", "Suap"]
      },
      {
        id: 518,
        term: "State Capture",
        category: "sistem",
        definition: "Penguasaan negara oleh kepentingan privat",
        example: "Oligarki kuasai kebijakan negara",
        legalBasis: "Teori Politik",
        relatedTerms: ["Penguasaan Negara", "Regulatory Capture"]
      },
      {
        id: 519,
        term: "Struk Bodong",
        category: "modus",
        definition: "Bukti pembayaran palsu",
        example: "Struk palsu untuk klaim perjalanan dinas",
        legalBasis: "KUHP",
        relatedTerms: ["Fake Receipt", "Bukti Palsu"]
      },
      {
        id: 520,
        term: "Suap Aktif",
        category: "tindakan",
        definition: "Memberi suap secara aktif",
        example: "Pengusaha aktif suap pejabat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Active Bribery", "Penyuapan Aktif"]
      },
      {
        id: 521,
        term: "Suap Pasif",
        category: "tindakan",
        definition: "Menerima suap",
        example: "Pejabat terima suap dari pengusaha",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Passive Bribery", "Penerimaan Suap"]
      },
      {
        id: 522,
        term: "Suap Politik",
        category: "tindakan",
        definition: "Suap dalam konteks politik",
        example: "Suap untuk dukungan politik",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Political Bribery", "Politik Uang"]
      },
      {
        id: 523,
        term: "Suap Preventif",
        category: "modus",
        definition: "Suap untuk jaga-jaga",
        example: "Suap rutin agar tidak diganggu",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Preventive Bribe", "Uang Keamanan"]
      },
      {
        id: 524,
        term: "Suap Seksual",
        category: "tindakan",
        definition: "Suap dalam bentuk layanan seksual",
        example: "Gratifikasi seksual untuk proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Sexual Bribery", "Gratifikasi Seksual"]
      },
      {
        id: 525,
        term: "Suap Transaksional",
        category: "tindakan",
        definition: "Suap untuk transaksi tertentu",
        example: "Suap untuk dapat kontrak",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Transactional Bribe", "Suap Bisnis"]
      },
      {
        id: 526,
        term: "Subornasi",
        category: "tindakan",
        definition: "Menyuap saksi untuk bersaksi palsu",
        example: "Suap saksi ubah kesaksian",
        legalBasis: "KUHP",
        relatedTerms: ["Subornation", "Suap Saksi"]
      },
      {
        id: 527,
        term: "Surat Jalan",
        category: "modus",
        definition: "Dokumen untuk melancarkan korupsi",
        example: "Surat jalan palsu untuk penyelundupan",
        legalBasis: "UU Kepabeanan",
        relatedTerms: ["Pass Document", "Dokumen Pelicin"]
      },
      {
        id: 528,
        term: "Surveillance",
        category: "penindakan",
        definition: "Pengawasan terhadap tersangka korupsi",
        example: "Pantau komunikasi tersangka",
        legalBasis: "UU KPK",
        relatedTerms: ["Pengawasan", "Monitoring"]
      },
      {
        id: 529,
        term: "Sweeping",
        category: "operasi",
        definition: "Operasi penyisiran korupsi",
        example: "Sweeping pungli di terminal",
        legalBasis: "Perpres Saber Pungli",
        relatedTerms: ["Penyisiran", "Razia"]
      },
      {
        id: 530,
        term: "Swing Voter",
        category: "politik",
        definition: "Pemilih yang bisa dibeli suaranya",
        example: "Target politik uang saat pemilu",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Pemilih Mengambang", "Floating Voter"]
      },
      {
        id: 531,
        term: "Systematic Corruption",
        category: "sistem",
        definition: "Korupsi yang sudah mengakar dalam sistem",
        example: "Korupsi terstruktur di instansi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Korupsi Sistemik", "Endemic Corruption"]
      },
      {
        id: 532,
        term: "Tahanan Kota",
        category: "hukum",
        definition: "Penahanan di tempat tinggal",
        example: "Koruptor ditahan di rumah",
        legalBasis: "KUHAP",
        relatedTerms: ["House Arrest", "Tahanan Rumah"]
      },
      {
        id: 533,
        term: "Tangkap Tangan",
        category: "penindakan",
        definition: "Penangkapan saat melakukan kejahatan",
        example: "OTT pejabat terima suap",
        legalBasis: "KUHAP",
        relatedTerms: ["Caught Red-handed", "Tertangkap Basah"]
      },
      {
        id: 534,
        term: "Tax Haven",
        category: "modus",
        definition: "Negara suaka pajak untuk sembunyikan uang korupsi",
        example: "Transfer uang korupsi ke Panama",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Surga Pajak", "Offshore"]
      },
      {
        id: 535,
        term: "Tender Arisan",
        category: "modus",
        definition: "Tender yang pesertanya bergantian menang",
        example: "Kontraktor gantian menang tender",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Rotating Tender", "Tender Bergilir"]
      },
      {
        id: 536,
        term: "Tender Titipan",
        category: "modus",
        definition: "Tender yang sudah ditentukan pemenangnya",
        example: "Tender formalitas untuk kroni",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Rigged Tender", "Tender Diatur"]
      },
      {
        id: 537,
        term: "Teror Antikorupsi",
        category: "ancaman",
        definition: "Intimidasi terhadap penegak antikorupsi",
        example: "Ancaman pada penyidik KPK",
        legalBasis: "KUHP",
        relatedTerms: ["Anti-corruption Terror", "Intimidasi"]
      },
      {
        id: 538,
        term: "Tersangka",
        category: "hukum",
        definition: "Orang yang diduga melakukan korupsi",
        example: "Penetapan tersangka korupsi",
        legalBasis: "KUHAP",
        relatedTerms: ["Suspect", "Terduga"]
      },
      {
        id: 539,
        term: "Tindak Lanjut",
        category: "penindakan",
        definition: "Aksi setelah temuan korupsi",
        example: "Follow up temuan BPK",
        legalBasis: "UU BPK",
        relatedTerms: ["Follow Up", "Penindaklanjutan"]
      },
      {
        id: 540,
        term: "Tindak Pidana Korupsi",
        category: "hukum",
        definition: "Perbuatan melawan hukum merugikan negara",
        example: "TPK penggelapan dana APBN",
        legalBasis: "UU 31/1999",
        relatedTerms: ["Tipikor", "Corruption Crime"]
      },
      {
        id: 541,
        term: "Tipiring",
        category: "hukum",
        definition: "Tindak pidana ringan",
        example: "Korupsi di bawah Rp 2,5 juta",
        legalBasis: "MA",
        relatedTerms: ["Minor Offense", "Pidana Ringan"]
      },
      {
        id: 542,
        term: "Titipan Proyek",
        category: "modus",
        definition: "Proyek yang sudah ditentukan pelaksananya",
        example: "Proyek untuk perusahaan kroni",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Project Allocation", "Proyek Pesanan"]
      },
      {
        id: 543,
        term: "Token Economy",
        category: "modus",
        definition: "Ekonomi semu untuk cuci uang",
        example: "Bisnis palsu untuk aliran dana korupsi",
        legalBasis: "UU Pencucian Uang",
        relatedTerms: ["Ekonomi Token", "Fake Economy"]
      },
      {
        id: 544,
        term: "Trade Misinvoicing",
        category: "modus",
        definition: "Manipulasi faktur perdagangan",
        example: "Invoice palsu untuk korupsi pajak",
        legalBasis: "UU Kepabeanan",
        relatedTerms: ["Invoice Palsu", "Faktur Manipulasi"]
      },
      {
        id: 545,
        term: "Trading in Influence",
        category: "tindakan",
        definition: "Memperjualbelikan pengaruh",
        example: "Jual pengaruh untuk proyek",
        legalBasis: "UNCAC",
        relatedTerms: ["Jual Beli Pengaruh", "Influence Peddling"]
      },
      {
        id: 546,
        term: "Transaksi Janggal",
        category: "indikator",
        definition: "Transaksi keuangan mencurigakan",
        example: "Transfer besar tanpa dasar jelas",
        legalBasis: "UU PPATK",
        relatedTerms: ["Suspicious Transaction", "Transaksi Mencurigakan"]
      },
      {
        id: 547,
        term: "Transaksi Terstruktur",
        category: "modus",
        definition: "Pemecahan transaksi untuk hindari deteksi",
        example: "Pecah transfer di bawah Rp 100 juta",
        legalBasis: "UU Pencucian Uang",
        relatedTerms: ["Structured Transaction", "Smurfing"]
      },
      {
        id: 548,
        term: "Transfer Pricing",
        category: "modus",
        definition: "Manipulasi harga transfer untuk korupsi pajak",
        example: "Jual murah ke perusahaan afiliasi di luar negeri",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Harga Transfer", "Price Manipulation"]
      },
      {
        id: 549,
        term: "Transparansi",
        category: "pencegahan",
        definition: "Keterbukaan informasi publik",
        example: "Publikasi anggaran online",
        legalBasis: "UU KIP",
        relatedTerms: ["Transparency", "Keterbukaan"]
      },
      {
        id: 550,
        term: "Travel Allowance Fraud",
        category: "modus",
        definition: "Kecurangan tunjangan perjalanan",
        example: "Klaim perjalanan dinas fiktif",
        legalBasis: "PMK",
        relatedTerms: ["Fraud Perjalanan", "SPPD Fiktif"]
      },
      {
        id: 551,
        term: "Trias Koruptica",
        category: "teori",
        definition: "Tiga pilar korupsi: kekuasaan, kesempatan, niat",
        example: "Analisis faktor penyebab korupsi",
        legalBasis: "Teori Korupsi",
        relatedTerms: ["Corruption Triangle", "Segitiga Korupsi"]
      },
      {
        id: 552,
        term: "Tunjangan Siluman",
        category: "modus",
        definition: "Tunjangan tidak resmi/ganda",
        example: "Double dipping tunjangan",
        legalBasis: "PP Remunerasi",
        relatedTerms: ["Ghost Allowance", "Tunjangan Hantu"]
      },
      {
        id: 553,
        term: "Uang Amanah",
        category: "eufemisme",
        definition: "Istilah halus untuk suap",
        example: "Terima amanah untuk proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Trust Money", "Uang Titipan"]
      },
      {
        id: 554,
        term: "Uang Damai",
        category: "modus",
        definition: "Suap untuk hentikan kasus",
        example: "Bayar untuk SP3",
        legalBasis: "KUHP",
        relatedTerms: ["Peace Money", "Settlement Bribe"]
      },
      {
        id: 555,
        term: "Uang Diam",
        category: "modus",
        definition: "Suap agar tutup mulut",
        example: "Bayar saksi untuk diam",
        legalBasis: "KUHP",
        relatedTerms: ["Hush Money", "Uang Tutup Mulut"]
      },
      {
        id: 556,
        term: "Uang Jasa",
        category: "eufemisme",
        definition: "Istilah untuk fee ilegal",
        example: "Uang jasa urus perizinan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Service Fee", "Komisi Ilegal"]
      },
      {
        id: 557,
        term: "Uang Kaget",
        category: "modus",
        definition: "Dana tak terduga untuk korupsi",
        example: "Anggaran mendadak tanpa perencanaan",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Windfall Fund", "Dana Mendadak"]
      },
      {
        id: 558,
        term: "Uang Keamanan",
        category: "tindakan",
        definition: "Pungutan untuk jaminan keamanan",
        example: "Setoran rutin ke preman/oknum",
        legalBasis: "KUHP",
        relatedTerms: ["Security Money", "Protection Fee"]
      },
      {
        id: 559,
        term: "Uang Kembali",
        category: "modus",
        definition: "Kickback dari nilai kontrak",
        example: "Kembalikan 10% nilai proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Kickback", "Fee Balik"]
      },
      {
        id: 560,
        term: "Uang Ketok",
        category: "tindakan",
        definition: "Suap untuk loloskan keputusan",
        example: "Bayar untuk ketok palu putusan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Decision Money", "Uang Putusan"]
      },
      {
        id: 561,
        term: "Uang Kopi",
        category: "eufemisme",
        definition: "Istilah halus untuk suap kecil",
        example: "Uang kopi untuk percepat layanan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Coffee Money", "Petty Bribe"]
      },
      {
        id: 562,
        term: "Uang Kursi",
        category: "politik",
        definition: "Suap untuk dapat jabatan",
        example: "Bayar untuk jadi caleg",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Seat Money", "Mahar Politik"]
      },
      {
        id: 563,
        term: "Uang Lelah",
        category: "eufemisme",
        definition: "Istilah untuk gratifikasi",
        example: "Uang lelah selesai urus izin",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fatigue Money", "Tip Ilegal"]
      },
      {
        id: 564,
        term: "Uang Meja",
        category: "modus",
        definition: "Pungutan di atas meja",
        example: "Tarif tidak resmi di loket",
        legalBasis: "UU Pelayanan Publik",
        relatedTerms: ["Table Money", "Pungutan Terbuka"]
      },
      {
        id: 565,
        term: "Uang Muka Fiktif",
        category: "modus",
        definition: "Down payment untuk proyek palsu",
        example: "DP proyek yang tak pernah jalan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Fictitious Advance", "DP Palsu"]
      },
      {
        id: 566,
        term: "Uang Pangkal",
        category: "modus",
        definition: "Setoran awal untuk dapat posisi",
        example: "Bayar untuk masuk proyek",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Entry Fee", "Uang Masuk"]
      },
      {
        id: 567,
        term: "Uang Pelumas",
        category: "tindakan",
        definition: "Suap untuk memperlancar urusan",
        example: "Pelumas agar cepat selesai",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Grease Money", "Facilitation Payment"]
      },
      {
        id: 568,
        term: "Uang Pengaruh",
        category: "modus",
        definition: "Bayaran untuk gunakan influence",
        example: "Bayar untuk dapat rekomendasi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Influence Money", "Uang Lobi"]
      },
      {
        id: 569,
        term: "Uang Pengganti",
        category: "hukuman",
        definition: "Ganti rugi kerugian negara",
        example: "Koruptor bayar uang pengganti",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Restitution Money", "Ganti Kerugian"]
      },
      {
        id: 570,
        term: "Uang Persil",
        category: "modus",
        definition: "Fee untuk urus sertifikat tanah",
        example: "Pungutan liar di BPN",
        legalBasis: "PP Pelayanan Pertanahan",
        relatedTerms: ["Land Certificate Fee", "Pungutan Sertifikat"]
      },
      {
        id: 571,
        term: "Uang Rokok",
        category: "eufemisme",
        definition: "Istilah untuk suap kecil",
        example: "Uang rokok untuk satpam",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Cigarette Money", "Tips"]
      },
      {
        id: 572,
        term: "Uang Saku",
        category: "modus",
        definition: "Honor tidak resmi",
        example: "Uang saku rapat fiktif",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Pocket Money", "Honor Siluman"]
      },
      {
        id: 573,
        term: "Uang Semir",
        category: "eufemisme",
        definition: "Suap untuk mempercantik laporan",
        example: "Bayar untuk laporan bagus",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Polish Money", "Uang Poles"]
      },
      {
        id: 574,
        term: "Uang Siluman",
        category: "modus",
        definition: "Dana tidak tercatat",
        example: "Anggaran siluman di APBD",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Ghost Money", "Dana Hantu"]
      },
      {
        id: 575,
        term: "Uang Sokongan",
        category: "politik",
        definition: "Dana kampanye ilegal",
        example: "Sokongan dari pengusaha untuk calon",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Support Money", "Dana Kampanye Gelap"]
      },
      {
        id: 576,
        term: "Uang Tanda Jadi",
        category: "modus",
        definition: "DP untuk jamin dapat proyek",
        example: "Commitment fee untuk tender",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Earnest Money", "Uang Muka"]
      },
      {
        id: 577,
        term: "Uang Terima Kasih",
        category: "eufemisme",
        definition: "Istilah halus untuk kickback",
        example: "Terima kasih setelah proyek selesai",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Thank You Money", "Gratifikasi"]
      },
      {
        id: 578,
        term: "Uang Tutup Mulut",
        category: "modus",
        definition: "Suap agar tidak buka aib",
        example: "Bayar wartawan tutup mulut",
        legalBasis: "KUHP",
        relatedTerms: ["Hush Money", "Uang Bungkam"]
      },
      {
        id: 579,
        term: "Uang Ucapan",
        category: "eufemisme",
        definition: "Gratifikasi berkedok hadiah",
        example: "Uang ucapan lebaran ke pejabat",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Greeting Money", "THR Haram"]
      },
      {
        id: 580,
        term: "Under the Table",
        category: "modus",
        definition: "Transaksi sembunyi-sembunyi",
        example: "Deal di bawah meja",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Bawah Meja", "Hidden Deal"]
      },
      {
        id: 581,
        term: "Undisclosed Income",
        category: "indikator",
        definition: "Penghasilan tidak dilaporkan",
        example: "Income dari korupsi tidak dilaporkan pajak",
        legalBasis: "UU Perpajakan",
        relatedTerms: ["Hidden Income", "Penghasilan Tersembunyi"]
      },
      {
        id: 582,
        term: "Undue Advantage",
        category: "tindakan",
        definition: "Keuntungan tidak semestinya",
        example: "Dapat kontrak karena suap",
        legalBasis: "UNCAC",
        relatedTerms: ["Keuntungan Tidak Wajar", "Improper Benefit"]
      },
      {
        id: 583,
        term: "Unit Khusus",
        category: "kelembagaan",
        definition: "Satuan khusus antikorupsi",
        example: "Satgas antikorupsi di kepolisian",
        legalBasis: "Perpres",
        relatedTerms: ["Special Unit", "Satgas"]
      },
      {
        id: 584,
        term: "Upeti",
        category: "tindakan",
        definition: "Setoran rutin ke atasan",
        example: "Upeti bulanan dari bawahan",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Tribute", "Setoran Wajib"]
      },
      {
        id: 585,
        term: "Urban Corruption",
        category: "fenomena",
        definition: "Korupsi di perkotaan",
        example: "Korupsi perizinan di kota besar",
        legalBasis: "Studi Korupsi",
        relatedTerms: ["Korupsi Perkotaan", "City Corruption"]
      },
      {
        id: 586,
        term: "Urgensi Palsu",
        category: "modus",
        definition: "Alasan mendesak yang dibuat-buat",
        example: "Penunjukan langsung dengan alasan darurat palsu",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["False Urgency", "Darurat Palsu"]
      },
      {
        id: 587,
        term: "Usulan Anggaran Markup",
        category: "modus",
        definition: "Proposal anggaran yang digelembungkan",
        example: "RAB dengan harga tidak wajar",
        legalBasis: "UU Keuangan Negara",
        relatedTerms: ["Inflated Budget", "Anggaran Gelembung"]
      },
      {
        id: 588,
        term: "Validasi Palsu",
        category: "modus",
        definition: "Pengesahan dokumen palsu",
        example: "Validasi laporan fiktif",
        legalBasis: "KUHP",
        relatedTerms: ["False Validation", "Pengesahan Palsu"]
      },
      {
        id: 589,
        term: "Vendor Nakal",
        category: "pelaku",
        definition: "Penyedia barang/jasa yang curang",
        example: "Vendor yang mark up harga",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Rogue Vendor", "Rekanan Curang"]
      },
      {
        id: 590,
        term: "Verifikasi Abal-abal",
        category: "modus",
        definition: "Pemeriksaan yang tidak sungguh-sungguh",
        example: "Verifikasi dokumen tanpa cek fisik",
        legalBasis: "SOP",
        relatedTerms: ["Fake Verification", "Verifikasi Palsu"]
      },
      {
        id: 591,
        term: "Vested Interest",
        category: "konflik",
        definition: "Kepentingan pribadi dalam jabatan",
        example: "Pejabat punya saham di vendor",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Kepentingan Terselubung", "Hidden Interest"]
      },
      {
        id: 592,
        term: "Vetting Process",
        category: "pencegahan",
        definition: "Proses seleksi ketat calon pejabat",
        example: "Vetting calon pimpinan KPK",
        legalBasis: "UU KPK",
        relatedTerms: ["Proses Seleksi", "Penyaringan"]
      },
      {
        id: 593,
        term: "Viktimisasi",
        category: "dampak",
        definition: "Menjadikan rakyat korban korupsi",
        example: "Rakyat jadi korban korupsi dana bantuan",
        legalBasis: "UU Perlindungan Saksi",
        relatedTerms: ["Victimization", "Korbanisasi"]
      },
      {
        id: 594,
        term: "Void Contract",
        category: "hukum",
        definition: "Kontrak batal karena korupsi",
        example: "Kontrak dibatalkan karena ada suap",
        legalBasis: "KUHPerdata",
        relatedTerms: ["Kontrak Batal", "Invalid Contract"]
      },
      {
        id: 595,
        term: "Vote Buying",
        category: "politik",
        definition: "Membeli suara pemilih",
        example: "Bagi-bagi uang saat kampanye",
        legalBasis: "UU Pemilu",
        relatedTerms: ["Beli Suara", "Politik Uang"]
      },
      {
        id: 596,
        term: "Wakil Rakyat Korup",
        category: "pelaku",
        definition: "Anggota legislatif yang korupsi",
        example: "DPRD tersangka korupsi",
        legalBasis: "UU Tipikor",
        relatedTerms: ["Corrupt Representative", "Legislator Korup"]
      },
      {
        id: 597,
        term: "Watchdog",
        category: "pengawasan",
        definition: "Lembaga pengawas antikorupsi",
        example: "ICW sebagai watchdog",
        legalBasis: "UU Ormas",
        relatedTerms: ["Pengawas", "Anjing Penjaga"]
      },
      {
        id: 598,
        term: "Wealth Illicit",
        category: "hasil",
        definition: "Kekayaan dari hasil korupsi",
        example: "Harta tidak wajar pejabat",
        legalBasis: "UU Pencucian Uang",
        relatedTerms: ["Harta Haram", "Illicit Wealth"]
      },
      {
        id: 599,
        term: "Wet Signature",
        category: "modus",
        definition: "Tanda tangan basah untuk dokumen palsu",
        example: "TTD asli di dokumen fiktif",
        legalBasis: "KUHP",
        relatedTerms: ["Tanda Tangan Basah", "Original Signature"]
      },
      {
        id: 600,
        term: "Whistle Blower",
        category: "pelindungan",
        definition: "Pelapor tindak pidana korupsi",
        example: "Pegawai laporkan korupsi atasannya",
        legalBasis: "UU Perlindungan Saksi",
        relatedTerms: ["Pelapor", "Pengungkap"],
        trending: true
      },
      {
        id: 601,
        term: "White Collar Crime",
        category: "kejahatan",
        definition: "Kejahatan kerah putih",
        example: "Korupsi oleh profesional",
        legalBasis: "Kriminologi",
        relatedTerms: ["Kejahatan Kerah Putih", "Elite Crime"]
      },
      {
        id: 602,
        term: "White Elephant",
        category: "proyek",
        definition: "Proyek mahal tapi tidak berguna",
        example: "Gedung megah tapi mangkrak",
        legalBasis: "Audit BPK",
        relatedTerms: ["Gajah Putih", "Proyek Sia-sia"]
      },
      {
        id: 603,
        term: "Wilayah Abu-abu",
        category: "modus",
        definition: "Area tidak jelas aturannya",
        example: "Celah hukum untuk korupsi",
        legalBasis: "Analisis Hukum",
        relatedTerms: ["Grey Area", "Zona Abu-abu"]
      },
      {
        id: 604,
        term: "Window Dressing",
        category: "modus",
        definition: "Mempercantik laporan keuangan",
        example: "Manipulasi laporan akhir tahun",
        legalBasis: "UU PT",
        relatedTerms: ["Poles Laporan", "Beautification"]
      },
      {
        id: 605,
        term: "Wire Transfer",
        category: "modus",
        definition: "Transfer dana hasil korupsi",
        example: "Transfer ke rekening luar negeri",
        legalBasis: "UU Pencucian Uang",
        relatedTerms: ["Transfer Kawat", "Electronic Transfer"]
      },
      {
        id: 606,
        term: "Wiretapping",
        category: "penindakan",
        definition: "Penyadapan komunikasi tersangka",
        example: "Sadap telepon tersangka korupsi",
        legalBasis: "UU KPK",
        relatedTerms: ["Penyadapan", "Phone Tapping"]
      },
      {
        id: 607,
        term: "Witness Protection",
        category: "pelindungan",
        definition: "Perlindungan saksi korupsi",
        example: "Program perlindungan saksi kunci",
        legalBasis: "UU Perlindungan Saksi",
        relatedTerms: ["Perlindungan Saksi", "Saksi Dilindungi"]
      },
      {
        id: 608,
        term: "Work Order Fiktif",
        category: "modus",
        definition: "Perintah kerja palsu",
        example: "SPK untuk pekerjaan tidak ada",
        legalBasis: "Perpres Pengadaan",
        relatedTerms: ["Fake WO", "SPK Palsu"]
      },
      {
        id: 609,
        term: "X-Ray Keuangan",
        category: "audit",
        definition: "Pemeriksaan mendalam keuangan",
        example: "Audit forensik detail",
        legalBasis: "Standar Audit",
        relatedTerms: ["Financial X-Ray", "Deep Audit"]
      },
      {
        id: 610,
        term: "Yayasan Bodong",
        category: "modus",
        definition: "Yayasan palsu untuk korupsi",
        example: "Yayasan untuk cuci uang",
        legalBasis: "UU Yayasan",
        relatedTerms: ["Fake Foundation", "Yayasan Palsu"]
      },
      {
        id: 611,
        term: "Yellow Card",
        category: "peringatan",
        definition: "Peringatan untuk pejabat bermasalah",
        example: "Kartu kuning sebelum dipecat",
        legalBasis: "PP Disiplin PNS",
        relatedTerms: ["Kartu Kuning", "Warning"]
      },
      {
        id: 612,
        term: "Yield Corruption",
        category: "dampak",
        definition: "Hasil atau dampak korupsi",
        example: "Kemiskinan akibat korupsi",
        legalBasis: "Studi Korupsi",
        relatedTerms: ["Corruption Impact", "Dampak Korupsi"]
      },
      {
        id: 613,
        term: "Youth Corruption",
        category: "fenomena",
        definition: "Korupsi di kalangan muda",
        example: "Pungli di organisasi pemuda",
        legalBasis: "Kajian Sosial",
        relatedTerms: ["Korupsi Pemuda", "Young Corruption"]
      },
      {
        id: 614,
        term: "Zero Tolerance",
        category: "kebijakan",
        definition: "Tidak toleran terhadap korupsi",
        example: "Kebijakan zero tolerance di KPK",
        legalBasis: "Kebijakan Antikorupsi",
        relatedTerms: ["Tanpa Toleransi", "Nol Toleransi"]
      },
      {
        id: 615,
        term: "Zona Bebas Korupsi",
        category: "program",
        definition: "Area yang bebas dari korupsi",
        example: "ZBK di instansi pemerintah",
        legalBasis: "Permenpan",
        relatedTerms: ["Corruption Free Zone", "ZBK"]
      },
      {
        id: 616,
        term: "Zona Integritas",
        category: "program",
        definition: "Area penerapan sistem integritas",
        example: "ZI menuju WBK/WBBM",
        legalBasis: "Permenpan 60/2012",
        relatedTerms: ["Integrity Zone", "ZI"],
        trending: true
      },
      {
        id: 617,
        term: "Zona Merah",
        category: "indikator",
        definition: "Daerah rawan korupsi tinggi",
        example: "Provinsi zona merah korupsi",
        legalBasis: "Pemetaan KPK",
        relatedTerms: ["Red Zone", "High Risk Area"]
      },
      {
        id: 618,
        term: "Zonasi Korupsi",
        category: "analisis",
        definition: "Pemetaan wilayah berdasar tingkat korupsi",
        example: "Peta korupsi Indonesia",
        legalBasis: "Riset Antikorupsi",
        relatedTerms: ["Corruption Mapping", "Pemetaan Korupsi"]
      },
      {
        id: 619,
        term: "Zoom Meeting Korupsi",
        category: "modus",
        definition: "Negosiasi korupsi via online",
        example: "Deal suap lewat video call",
        legalBasis: "UU ITE",
        relatedTerms: ["Online Corruption", "Digital Korupsi"]
      },
      {
        id: 620,
        term: "Zakat Korupsi",
        category: "fenomena",
        definition: "Zakat dari uang haram",
        example: "Koruptor bayar zakat untuk cuci dosa",
        legalBasis: "Fatwa MUI",
        relatedTerms: ["Haram Charity", "Sedekah Haram"]
      }
      ],
      
      // Helper functions tetap sama
      getTermsByCategory: function(category: string) {
        if (category === 'semua') return this.terms
        return this.terms.filter(term => term.category === category)
      },
      
      searchTerms: function(query: string) {
        const searchQuery = query.toLowerCase()
        return this.terms.filter(term => 
          term.term.toLowerCase().includes(searchQuery) ||
          term.definition.toLowerCase().includes(searchQuery) ||
          (term.example && term.example.toLowerCase().includes(searchQuery)) ||
          (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(searchQuery)))
        )
      },
      
      getTrendingTerms: function() {
        return this.terms.filter(term => term.trending === true)
      },
      
      getStatistics: function() {
        const categoryCount: { [key: string]: number } = {}
        this.terms.forEach(term => {
          categoryCount[term.category] = (categoryCount[term.category] || 0) + 1
        })
        
        return {
          totalTerms: this.terms.length,
          trendingTerms: this.terms.filter(t => t.trending).length,
          categories: this.metadata.categories.length,
          categoryDistribution: categoryCount,
          termsWithExamples: this.terms.filter(t => t.example).length
        }
      },
      
      exportToJSON: function() {
        const dataStr = JSON.stringify(this.terms, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
        
        const exportFileDefaultName = 'istilah-antikorupsi.json'
        
        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
      },
      
      exportToCSV: function() {
        const headers = ['ID', 'Istilah', 'Kategori', 'Definisi', 'Contoh', 'Dasar Hukum', 'Istilah Terkait', 'Trending']
        
        const csvContent = [
          headers.join(','),
          ...this.terms.map(term => [
            term.id,
            `"${term.term}"`,
            term.category,
            `"${term.definition}"`,
            `"${term.example || ''}"`,
            `"${term.legalBasis}"`,
            `"${term.relatedTerms?.join('; ') || ''}"`,
            term.trending ? 'Ya' : 'Tidak'
          ].join(','))
        ].join('\n')
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'istilah-antikorupsi.csv'
        link.click()
      }
      }
      
      // Export the data
      export { istilahAntiKorupsiData }
      export default istilahAntiKorupsiData
      
      
