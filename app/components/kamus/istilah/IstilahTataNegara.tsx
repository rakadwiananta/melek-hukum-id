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
  Vote,
  Flag,
  Landmark,
  ScrollText
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

// Data Istilah Hukum Tata Negara Lengkap (900 istilah)
const istilahTataNegaraData = {
  metadata: {
    total: 900,
    lastUpdated: '20 November 2024',
    sources: [
      'UUD 1945 dan Amandemen',
      'TAP MPR',
      'UU Pemilu',
      'UU Pemerintahan Daerah',
      'UU Kementerian Negara',
      'UU Keuangan Negara',
      'UU Kekuasaan Kehakiman',
      'UU MD3 (MPR, DPR, DPD, DPRD)',
      'Peraturan Perundang-undangan terkait'
    ],
    categories: [
      { id: 'sistem-pemerintahan', name: 'Sistem Pemerintahan', count: 78, icon: Building2 },
      { id: 'lembaga-negara', name: 'Lembaga Negara', count: 145, icon: Landmark },
      { id: 'hak-konstitusional', name: 'Hak Konstitusional', count: 67, icon: Shield },
      { id: 'proses-legislasi', name: 'Proses Legislasi', count: 89, icon: ScrollText },
      { id: 'pemilu', name: 'Pemilu & Demokrasi', count: 98, icon: Vote },
      { id: 'keuangan-negara', name: 'Keuangan Negara', count: 56, icon: BarChart3 },
      { id: 'hubungan-luar-negeri', name: 'Hubungan Luar Negeri', count: 45, icon: Globe },
      { id: 'pemerintahan-daerah', name: 'Pemerintahan Daerah', count: 78, icon: Building2 },
      { id: 'hukum-konstitusi', name: 'Hukum Konstitusi', count: 89, icon: Scale },
      { id: 'kekuasaan-kehakiman', name: 'Kekuasaan Kehakiman', count: 67, icon: Gavel },
      { id: 'peraturan-perundangan', name: 'Peraturan Perundangan', count: 88, icon: FileText }
    ]
  },

  // Database istilah (524 terms)
  terms: [
    // A - Asas dan Administrasi (1-45)
    {
      id: 1,
      term: "Amandemen",
      category: "perundangan",
      definition: "Perubahan terhadap Undang-Undang Dasar atau konstitusi suatu negara melalui prosedur yang telah ditentukan",
      example: "Indonesia telah melakukan amandemen UUD 1945 sebanyak empat kali (1999-2002)",
      legalBasis: "Pasal 37 UUD NRI 1945",
      englishTerm: "Amendment",
      relatedTerms: ["Perubahan UUD", "Konstitusi", "Reformasi"],
      trending: true
    },
    {
      id: 2,
      term: "Asas Legalitas",
      category: "asas-konstitusi",
      definition: "Prinsip bahwa semua tindakan pemerintah harus berdasarkan peraturan perundang-undangan yang berlaku",
      example: "Pejabat tidak dapat mengambil keputusan tanpa dasar hukum yang jelas",
      legalBasis: "Pasal 1 ayat (3) UUD NRI 1945",
      englishTerm: "Principle of Legality",
      relatedTerms: ["Rule of Law", "Negara Hukum", "Kepastian Hukum"]
    },
    {
      id: 3,
      term: "Asas Kedaulatan Rakyat",
      category: "asas-konstitusi",
      definition: "Prinsip bahwa kekuasaan tertinggi berada di tangan rakyat dan dilaksanakan menurut UUD",
      example: "Pemilihan umum sebagai perwujudan kedaulatan rakyat",
      legalBasis: "Pasal 1 ayat (2) UUD NRI 1945",
      englishTerm: "Popular Sovereignty",
      relatedTerms: ["Demokrasi", "Sovereignty", "Kekuasaan Rakyat"],
      trending: true
    },
    {
      id: 4,
      term: "Asas Negara Kesatuan",
      category: "asas-konstitusi",
      definition: "Prinsip bahwa Indonesia adalah negara kesatuan yang berbentuk republik",
      example: "Tidak ada negara dalam negara di Indonesia",
      legalBasis: "Pasal 1 ayat (1) UUD NRI 1945",
      englishTerm: "Unitary State Principle",
      relatedTerms: ["NKRI", "Unitary", "Kesatuan"]
    },
    {
      id: 5,
      term: "Asas Pembagian Kekuasaan",
      category: "asas-konstitusi",
      definition: "Prinsip pemisahan kekuasaan negara menjadi eksekutif, legislatif, dan yudikatif",
      example: "DPR membuat UU, Presiden melaksanakan, MA mengadili",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Separation of Powers",
      relatedTerms: ["Trias Politica", "Check and Balances", "Pemisahan Kekuasaan"]
    },
    {
      id: 6,
      term: "Asas Demokrasi Pancasila",
      category: "asas-konstitusi",
      definition: "Sistem demokrasi yang berdasarkan nilai-nilai Pancasila dengan musyawarah mufakat",
      example: "Pengambilan keputusan di DPR dengan musyawarah untuk mufakat",
      legalBasis: "Pembukaan UUD NRI 1945",
      englishTerm: "Pancasila Democracy",
      relatedTerms: ["Musyawarah", "Mufakat", "Demokrasi"]
    },
    {
      id: 7,
      term: "Asas Keterbukaan",
      category: "asas-konstitusi",
      definition: "Prinsip transparansi dalam penyelenggaraan negara",
      example: "Sidang DPR terbuka untuk umum kecuali dinyatakan tertutup",
      legalBasis: "UU No. 14/2008 (Keterbukaan Informasi Publik)",
      englishTerm: "Transparency Principle",
      relatedTerms: ["Transparansi", "Akuntabilitas", "Open Government"]
    },
    {
      id: 8,
      term: "Asas Proporsionalitas",
      category: "asas-konstitusi",
      definition: "Prinsip keseimbangan antara hak dan kewajiban dalam penyelenggaraan negara",
      example: "Pembatasan HAM harus proporsional dengan kepentingan umum",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Proportionality Principle",
      relatedTerms: ["Keseimbangan", "Proporsional", "Balance"]
    },
    {
      id: 9,
      term: "Asas Otonomi Daerah",
      category: "asas-konstitusi",
      definition: "Prinsip pemberian kewenangan kepada daerah untuk mengatur urusan pemerintahan sendiri",
      example: "Pemda membuat Perda sesuai kewenangannya",
      legalBasis: "Pasal 18 UUD NRI 1945",
      englishTerm: "Regional Autonomy",
      relatedTerms: ["Desentralisasi", "Otonomi", "Self-Government"]
    },
    {
      id: 10,
      term: "Asas Non-Retroaktif",
      category: "asas-konstitusi",
      definition: "Prinsip bahwa peraturan perundang-undangan tidak berlaku surut",
      example: "UU baru tidak dapat diterapkan untuk perbuatan sebelum UU berlaku",
      legalBasis: "Pasal 28I ayat (1) UUD NRI 1945",
      englishTerm: "Non-Retroactivity",
      relatedTerms: ["Tidak Berlaku Surut", "Prospektif", "Ex Nunc"]
    },
    {
      id: 11,
      term: "Absolut",
      category: "kewenangan",
      definition: "Kekuasaan atau hak prerogatif yang tidak dapat diganggu gugat",
      example: "Hak prerogatif Presiden dalam memberikan grasi",
      legalBasis: "Pasal 14 UUD NRI 1945",
      englishTerm: "Absolute",
      relatedTerms: ["Prerogatif", "Mutlak", "Kewenangan Penuh"]
    },
    {
      id: 12,
      term: "Administrasi Negara",
      category: "sistem-pemerintahan",
      definition: "Keseluruhan aparatur pemerintah yang melaksanakan tugas-tugas negara",
      example: "Kementerian dan lembaga pemerintah non-kementerian",
      legalBasis: "UU No. 39/2008",
      englishTerm: "State Administration",
      relatedTerms: ["Birokrasi", "Aparatur Negara", "Civil Service"]
    },
    {
      id: 13,
      term: "Advokasi",
      category: "ham",
      definition: "Pembelaan atau dukungan terhadap suatu hal, terutama dalam konteks HAM dan keadilan",
      example: "Advokasi untuk perlindungan hak-hak minoritas",
      legalBasis: "UU No. 39/1999 (HAM)",
      englishTerm: "Advocacy",
      relatedTerms: ["Pembelaan", "Dukungan", "Legal Aid"]
    },
    {
      id: 14,
      term: "Afirmasi",
      category: "ham",
      definition: "Tindakan khusus sementara untuk mempercepat kesetaraan substantif",
      example: "Kuota 30% keterwakilan perempuan di parlemen",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Affirmative Action",
      relatedTerms: ["Diskriminasi Positif", "Kuota", "Special Measures"]
    },
    {
      id: 15,
      term: "Aklamasi",
      category: "pemilu",
      definition: "Persetujuan atau pemilihan tanpa pemungutan suara, berdasarkan kesepakatan bulat",
      example: "Pemilihan ketua DPR secara aklamasi",
      legalBasis: "Tata Tertib DPR",
      englishTerm: "Acclamation",
      relatedTerms: ["Mufakat", "Konsensus", "Unanimous"]
    },
    {
      id: 16,
      term: "Akreditasi Partai",
      category: "pemilu",
      definition: "Pengakuan resmi terhadap partai politik untuk ikut pemilu",
      example: "Partai harus lolos verifikasi KPU untuk ikut pemilu",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Party Accreditation",
      relatedTerms: ["Verifikasi", "Pendaftaran Partai", "Electoral Threshold"]
    },
    {
      id: 17,
      term: "Akta Kewarganegaraan",
      category: "kewarganegaraan",
      definition: "Dokumen resmi yang menyatakan status kewarganegaraan seseorang",
      example: "Akta pewarganegaraan bagi WNA yang menjadi WNI",
      legalBasis: "UU No. 12/2006",
      englishTerm: "Citizenship Certificate",
      relatedTerms: ["Naturalisasi", "Pewarganegaraan", "Citizenship"]
    },
    {
      id: 18,
      term: "Akuntabilitas Publik",
      category: "sistem-pemerintahan",
      definition: "Kewajiban pemegang jabatan publik untuk mempertanggungjawabkan kinerjanya",
      example: "LKPJ kepala daerah di akhir tahun anggaran",
      legalBasis: "UU No. 28/1999",
      englishTerm: "Public Accountability",
      relatedTerms: ["Pertanggungjawaban", "Transparansi", "Good Governance"]
    },
    {
      id: 19,
      term: "Alat Kelengkapan Dewan",
      category: "lembaga-negara",
      definition: "Organ internal DPR/DPRD untuk melaksanakan tugas dan wewenangnya",
      example: "Komisi, Badan Kehormatan, Badan Legislasi DPR",
      legalBasis: "UU No. 42/2014",
      englishTerm: "Parliamentary Bodies",
      relatedTerms: ["AKD", "Komisi DPR", "Fraksi"]
    },
    {
      id: 20,
      term: "Ambang Batas Parlemen",
      category: "pemilu",
      definition: "Persentase minimal suara yang harus diperoleh partai untuk mendapat kursi di parlemen",
      example: "Parliamentary threshold 4% suara sah nasional",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Parliamentary Threshold",
      relatedTerms: ["Electoral Threshold", "Ambang Batas", "Threshold"],
      trending: true
    },
    {
      id: 21,
      term: "Amicus Curiae",
      category: "kewenangan",
      definition: "Pihak yang memberikan pendapat hukum kepada pengadilan tanpa menjadi pihak dalam perkara",
      example: "Ahli HTN memberikan pendapat dalam sengketa kewenangan di MK",
      legalBasis: "Peraturan MK",
      englishTerm: "Friend of the Court",
      relatedTerms: ["Sahabat Pengadilan", "Legal Opinion", "Expert Opinion"]
    },
    {
      id: 22,
      term: "Amnesti",
      category: "kewenangan",
      definition: "Pengampunan yang diberikan Presiden kepada sekelompok orang yang telah melakukan tindak pidana politik",
      example: "Amnesti untuk tahanan politik",
      legalBasis: "Pasal 14 ayat (2) UUD NRI 1945",
      englishTerm: "Amnesty",
      relatedTerms: ["Abolisi", "Pengampunan", "Clemency"]
    },
    {
      id: 23,
      term: "Anggaran Pendapatan dan Belanja Negara",
      category: "keuangan-negara",
      definition: "Rencana keuangan tahunan pemerintahan negara yang disetujui DPR",
      example: "APBN 2024 ditetapkan melalui UU",
      legalBasis: "Pasal 23 UUD NRI 1945",
      englishTerm: "State Budget",
      relatedTerms: ["APBN", "Budget", "Keuangan Negara"]
    },
    {
      id: 24,
      term: "Anggota Dewan",
      category: "lembaga-negara",
      definition: "Wakil rakyat yang duduk di lembaga perwakilan (DPR/DPD/DPRD)",
      example: "575 anggota DPR periode 2024-2029",
      legalBasis: "UU No. 42/2014",
      englishTerm: "Member of Parliament",
      relatedTerms: ["Wakil Rakyat", "Legislator", "MP"]
    },
    {
      id: 25,
      term: "Aparatur Sipil Negara",
      category: "sistem-pemerintahan",
      definition: "Pegawai negeri dan pegawai pemerintah dengan perjanjian kerja",
      example: "PNS dan PPPK sebagai ASN",
      legalBasis: "UU No. 5/2014",
      englishTerm: "Civil Servant",
      relatedTerms: ["ASN", "PNS", "Birokrat"]
    },
    {
      id: 26,
      term: "Aspirasi Rakyat",
      category: "sistem-pemerintahan",
      definition: "Harapan dan keinginan rakyat yang disampaikan kepada pemerintah",
      example: "Reses anggota DPR untuk menjaring aspirasi",
      legalBasis: "UU No. 42/2014",
      englishTerm: "People's Aspirations",
      relatedTerms: ["Suara Rakyat", "Public Opinion", "Konstituensi"]
    },
    {
      id: 27,
      term: "Asas Contrarius Actus",
      category: "asas-konstitusi",
      definition: "Pejabat yang berwenang membentuk peraturan juga berwenang mencabutnya",
      example: "Presiden yang mengeluarkan Perppu juga yang mencabutnya",
      legalBasis: "Asas Hukum Tata Negara",
      englishTerm: "Contrarius Actus Principle",
      relatedTerms: ["Pencabutan", "Kewenangan", "Revocation"]
    },
    {
      id: 28,
      term: "Asas Dekonsentrasi",
      category: "pusat-daerah",
      definition: "Pelimpahan wewenang pemerintahan dari pusat kepada gubernur sebagai wakil pemerintah",
      example: "Gubernur melaksanakan urusan pemerintah pusat di daerah",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Deconcentration",
      relatedTerms: ["Pelimpahan", "Desentralisasi", "Delegation"]
    },
    {
      id: 29,
      term: "Asas Desentralisasi",
      category: "pusat-daerah",
      definition: "Penyerahan urusan pemerintahan oleh pemerintah pusat kepada daerah otonom",
      example: "Pemda mengelola pendidikan dan kesehatan",
      legalBasis: "Pasal 18 UUD NRI 1945",
      englishTerm: "Decentralization",
      relatedTerms: ["Otonomi", "Penyerahan Kewenangan", "Regional Autonomy"]
    },
    {
      id: 30,
      term: "Asas Domisili",
      category: "kewarganegaraan",
      definition: "Prinsip penentuan kewarganegaraan berdasarkan tempat kelahiran",
      example: "Anak yang lahir di Indonesia dari orang tua stateless",
      legalBasis: "UU No. 12/2006",
      englishTerm: "Jus Soli",
      relatedTerms: ["Ius Soli", "Kewarganegaraan", "Birthright"]
    },
    {
      id: 31,
      term: "Asas Free and Fair",
      category: "pemilu",
      definition: "Prinsip pemilu yang bebas dan adil tanpa tekanan",
      example: "Pemilu tanpa intimidasi dan kecurangan",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Free and Fair",
      relatedTerms: ["Luber Jurdil", "Pemilu Demokratis", "Electoral Integrity"]
    },
    {
      id: 32,
      term: "Asas Ius Sanguinis",
      category: "kewarganegaraan",
      definition: "Prinsip kewarganegaraan berdasarkan keturunan/darah",
      example: "Anak WNI yang lahir di luar negeri tetap WNI",
      legalBasis: "UU No. 12/2006",
      englishTerm: "Jus Sanguinis",
      relatedTerms: ["Keturunan", "Blood Right", "Descent"]
    },
    {
      id: 33,
      term: "Asas Kebangsaan",
      category: "asas-konstitusi",
      definition: "Prinsip yang mengutamakan persatuan dan kesatuan bangsa",
      example: "Bhinneka Tunggal Ika sebagai semboyan negara",
      legalBasis: "Pembukaan UUD NRI 1945",
      englishTerm: "Nationalism Principle",
      relatedTerms: ["Nasionalisme", "Unity", "Persatuan"]
    },
    {
      id: 34,
      term: "Asas Kerakyatan",
      category: "asas-konstitusi",
      definition: "Prinsip pemerintahan dari, oleh, dan untuk rakyat",
      example: "Pemilihan langsung presiden oleh rakyat",
      legalBasis: "Pasal 1 ayat (2) UUD NRI 1945",
      englishTerm: "Democratic Principle",
      relatedTerms: ["Demokrasi", "People Power", "Populism"]
    },
    {
      id: 35,
      term: "Asas Keutuhan Wilayah",
      category: "wilayah",
      definition: "Prinsip mempertahankan kesatuan wilayah NKRI",
      example: "Larangan separatisme dan disintegrasi",
      legalBasis: "Pasal 25A UUD NRI 1945",
      englishTerm: "Territorial Integrity",
      relatedTerms: ["NKRI Harga Mati", "Integritas Teritorial", "Unity"]
    },
    {
      id: 36,
      term: "Asas Lex Specialis",
      category: "perundangan",
      definition: "Peraturan khusus mengesampingkan peraturan umum",
      example: "UU Pemda mengatur khusus pemerintahan daerah",
      legalBasis: "Asas Perundang-undangan",
      englishTerm: "Lex Specialis",
      relatedTerms: ["Hukum Khusus", "Special Law", "Derogation"]
    },
    {
      id: 37,
      term: "Asas Musyawarah",
      category: "asas-konstitusi",
      definition: "Pengambilan keputusan melalui perundingan untuk mencapai mufakat",
      example: "Rapat paripurna DPR dengan musyawarah",
      legalBasis: "Sila ke-4 Pancasila",
      englishTerm: "Deliberation",
      relatedTerms: ["Konsensus", "Mufakat", "Consultation"]
    },
    {
      id: 38,
      term: "Asas Negara Hukum",
      category: "asas-konstitusi",
      definition: "Indonesia adalah negara yang berdasarkan atas hukum",
      example: "Semua tindakan pemerintah harus berdasar hukum",
      legalBasis: "Pasal 1 ayat (3) UUD NRI 1945",
      englishTerm: "Rule of Law",
      relatedTerms: ["Rechtsstaat", "Supremasi Hukum", "Legal State"]
    },
    {
      id: 39,
      term: "Asas Pembentukan Perundangan",
      category: "perundangan",
      definition: "Prinsip-prinsip dalam membuat peraturan perundang-undangan yang baik",
      example: "Kejelasan tujuan, kewenangan, kesesuaian, kedayagunaan",
      legalBasis: "UU No. 12/2011",
      englishTerm: "Legislative Principles",
      relatedTerms: ["Good Regulation", "Nomokrasi", "Legislative Drafting"]
    },
    {
      id: 40,
      term: "Asas Pengakuan HAM",
      category: "ham",
      definition: "Prinsip bahwa HAM adalah hak dasar yang melekat pada manusia",
      example: "Hak hidup tidak dapat dikurangi dalam keadaan apapun",
      legalBasis: "Pasal 28I UUD NRI 1945",
      englishTerm: "Human Rights Recognition",
      relatedTerms: ["HAM", "Fundamental Rights", "Human Dignity"]
    },
    {
      id: 41,
      term: "Asas Persatuan",
      category: "asas-konstitusi",
      definition: "Prinsip menjaga keutuhan bangsa dan negara Indonesia",
      example: "Menolak segala bentuk separatisme",
      legalBasis: "Pembukaan UUD NRI 1945",
      englishTerm: "Unity Principle",
      relatedTerms: ["Kesatuan", "Integration", "National Unity"]
    },
    {
      id: 42,
      term: "Asas Praduga Sah",
      category: "sistem-pemerintahan",
      definition: "Setiap keputusan pemerintah dianggap sah sampai dibatalkan",
      example: "SK pengangkatan berlaku sampai ada pembatalan",
      legalBasis: "Asas Umum Pemerintahan yang Baik",
      englishTerm: "Presumption of Validity",
      relatedTerms: ["Vermoeden van Rechtmatigheid", "Legal Presumption"]
    },
    {
      id: 43,
      term: "Asas Publisitas",
      category: "perundangan",
      definition: "Peraturan perundang-undangan harus diumumkan agar mengikat",
      example: "UU diundangkan dalam Lembaran Negara",
      legalBasis: "UU No. 12/2011",
      englishTerm: "Publicity Principle",
      relatedTerms: ["Pengundangan", "Promulgation", "Publication"]
    },
    {
      id: 44,
      term: "Asas Tugas Pembantuan",
      category: "pusat-daerah",
      definition: "Penugasan dari pemerintah pusat kepada daerah untuk melaksanakan urusan tertentu",
      example: "Pemda membantu pelaksanaan sensus penduduk",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Co-administration",
      relatedTerms: ["Medebewind", "Assistance Task", "Delegated Function"]
    },
    {
      id: 45,
      term: "Atribusi Kewenangan",
      category: "kewenangan",
      definition: "Pemberian kewenangan kepada organ negara oleh pembentuk UU",
      example: "UUD memberikan kewenangan kepada Presiden",
      legalBasis: "UU No. 30/2014",
      englishTerm: "Attribution of Authority",
      relatedTerms: ["Kewenangan Atribusi", "Original Authority", "Direct Authority"]
    },

    // B - Badan dan Bentuk Negara (46-90)
    {
      id: 46,
      term: "Badan Anggaran",
      category: "lembaga-negara",
      definition: "Alat kelengkapan DPR yang menangani masalah anggaran negara",
      example: "Banggar DPR membahas RAPBN bersama pemerintah",
      legalBasis: "UU No. 42/2014",
      englishTerm: "Budget Committee",
      relatedTerms: ["Banggar", "APBN", "Budget Authority"]
    },
    {
      id: 47,
      term: "Badan Eksekutif",
      category: "lembaga-negara",
      definition: "Lembaga yang melaksanakan undang-undang dan menjalankan pemerintahan",
      example: "Presiden dan Wakil Presiden sebagai pemegang kekuasaan eksekutif",
      legalBasis: "Pasal 4 UUD NRI 1945",
      englishTerm: "Executive Branch",
      relatedTerms: ["Eksekutif", "Pemerintah", "Executive Power"]
    },
    {
      id: 48,
      term: "Badan Kehormatan",
      category: "lembaga-negara",
      definition: "Alat kelengkapan DPR yang menangani etika dan kehormatan anggota",
      example: "BK DPR memeriksa pelanggaran etik anggota dewan",
      legalBasis: "UU No. 42/2014",
      englishTerm: "Ethics Committee",
      relatedTerms: ["BK", "Etika Dewan", "Parliamentary Ethics"]
    },
    {
      id: 49,
      term: "Badan Legislasi",
      category: "lembaga-negara",
      definition: "Alat kelengkapan DPR yang menyusun program legislasi nasional",
      example: "Baleg menyusun Prolegnas tahunan",
      legalBasis: "UU No. 42/2014",
      englishTerm: "Legislation Committee",
      relatedTerms: ["Baleg", "Prolegnas", "Legislative Body"]
    },
    {
      id: 50,
      term: "Badan Pemeriksa Keuangan",
      category: "lembaga-negara",
      definition: "Lembaga negara yang memeriksa pengelolaan dan tanggung jawab keuangan negara",
      example: "BPK memeriksa laporan keuangan kementerian",
      legalBasis: "Pasal 23E UUD NRI 1945",
      englishTerm: "Supreme Audit Board",
      relatedTerms: ["BPK", "Audit Negara", "State Auditor"],
      trending: true
    },
    {
      id: 51,
      term: "Badan Penyelenggara Pemilu",
      category: "pemilu",
      definition: "Lembaga yang menyelenggarakan pemilihan umum",
      example: "KPU, Bawaslu, dan DKPP sebagai penyelenggara pemilu",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Election Management Body",
      relatedTerms: ["KPU", "Bawaslu", "Electoral Commission"]
    },
    {
      id: 52,
      term: "Bank Indonesia",
      category: "lembaga-negara",
      definition: "Bank sentral Republik Indonesia yang independen",
      example: "BI menetapkan kebijakan moneter",
      legalBasis: "Pasal 23D UUD NRI 1945",
      englishTerm: "Central Bank",
      relatedTerms: ["BI", "Bank Sentral", "Monetary Authority"]
    },
    {
      id: 53,
      term: "Bantuan Hukum",
      category: "ham",
      definition: "Jasa hukum yang diberikan secara cuma-cuma kepada masyarakat miskin",
      example: "Bantuan hukum dalam sengketa tanah warga miskin",
      legalBasis: "UU No. 16/2011",
      englishTerm: "Legal Aid",
      relatedTerms: ["Legal Assistance", "Pro Bono", "Access to Justice"]
    },
    {
      id: 54,
      term: "Bawaslu",
      category: "pemilu",
      definition: "Badan Pengawas Pemilihan Umum",
      example: "Bawaslu mengawasi pelaksanaan kampanye pemilu",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Election Supervisory Body",
      relatedTerms: ["Pengawas Pemilu", "Electoral Watchdog", "Election Monitoring"]
    },
    {
      id: 55,
      term: "Bentuk Negara",
      category: "asas-konstitusi",
      definition: "Struktur organisasi kekuasaan suatu negara",
      example: "Indonesia berbentuk negara kesatuan",
      legalBasis: "Pasal 1 ayat (1) UUD NRI 1945",
      englishTerm: "Form of State",
      relatedTerms: ["Kesatuan", "Federal", "Unitary State"]
    },
    {
      id: 56,
      term: "Bentuk Pemerintahan",
      category: "sistem-pemerintahan",
      definition: "Sistem organisasi pemerintahan suatu negara",
      example: "Indonesia berbentuk republik",
      legalBasis: "Pasal 1 ayat (1) UUD NRI 1945",
      englishTerm: "Form of Government",
      relatedTerms: ["Republik", "Monarki", "Republic"]
    },
    {
      id: 57,
      term: "Bhineka Tunggal Ika",
      category: "asas-konstitusi",
      definition: "Semboyan negara yang berarti berbeda-beda tetapi tetap satu",
      example: "Keberagaman suku, agama, ras dalam kesatuan Indonesia",
      legalBasis: "Pasal 36A UUD NRI 1945",
      englishTerm: "Unity in Diversity",
      relatedTerms: ["Persatuan", "Kebhinekaan", "Diversity"]
    },
    {
      id: 58,
      term: "Biaya Pemilu",
      category: "pemilu",
      definition: "Anggaran yang diperlukan untuk penyelenggaraan pemilihan umum",
      example: "APBN mengalokasikan dana untuk pemilu 2024",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Election Budget",
      relatedTerms: ["Anggaran Pemilu", "Electoral Cost", "Campaign Finance"]
    },
    {
      id: 59,
      term: "Bikameral",
      category: "lembaga-negara",
      definition: "Sistem parlemen dua kamar",
      example: "MPR terdiri dari DPR dan DPD",
      legalBasis: "Pasal 2 ayat (1) UUD NRI 1945",
      englishTerm: "Bicameral",
      relatedTerms: ["Dua Kamar", "Two Chambers", "Bikameralisme"]
    },
    {
      id: 60,
      term: "Bill of Rights",
      category: "ham",
      definition: "Dokumen atau bagian konstitusi yang memuat hak-hak dasar warga negara",
      example: "Pasal 28A-28J UUD NRI 1945 tentang HAM",
      legalBasis: "Bab XA UUD NRI 1945",
      englishTerm: "Bill of Rights",
      relatedTerms: ["Piagam Hak", "HAM", "Charter of Rights"]
    },
    {
      id: 61,
      term: "Bipartai",
      category: "pemilu",
      definition: "Sistem politik dengan dua partai dominan",
      example: "Sistem dua partai di Amerika Serikat",
      legalBasis: "Teori Sistem Politik",
      englishTerm: "Two-party System",
      relatedTerms: ["Dua Partai", "Bipartisan", "Duopoly"]
    },
    {
      id: 62,
      term: "Birokrasi",
      category: "sistem-pemerintahan",
      definition: "Sistem administrasi pemerintahan yang dijalankan pegawai negeri",
      example: "Reformasi birokrasi untuk pelayanan publik lebih baik",
      legalBasis: "UU No. 5/2014",
      englishTerm: "Bureaucracy",
      relatedTerms: ["Administrasi", "Civil Service", "Government Administration"]
    },
    {
      id: 63,
      term: "Blok Politik",
      category: "pemilu",
      definition: "Kelompok atau aliansi partai politik dengan tujuan sama",
      example: "Koalisi partai pendukung pemerintah",
      legalBasis: "UU No. 2/2011",
      englishTerm: "Political Bloc",
      relatedTerms: ["Koalisi", "Aliansi", "Political Alliance"]
    },
    {
      id: 64,
      term: "Boikot Pemilu",
      category: "pemilu",
      definition: "Penolakan untuk berpartisipasi dalam pemilihan umum",
      example: "Gerakan golput sebagai bentuk protes politik",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Election Boycott",
      relatedTerms: ["Golput", "Abstention", "Electoral Boycott"]
    },
    {
      id: 65,
      term: "Buku Induk Kependudukan",
      category: "kewarganegaraan",
      definition: "Dokumen yang memuat data penduduk suatu wilayah",
      example: "Database kependudukan di Dukcapil",
      legalBasis: "UU No. 24/2013",
      englishTerm: "Population Registry",
      relatedTerms: ["Registrasi Penduduk", "Civil Registry", "Population Database"]
    },
    {
      id: 66,
      term: "Bursa Calon",
      category: "pemilu",
      definition: "Proses seleksi dan penetapan calon dalam pemilu",
      example: "Bursa calon presiden di konvensi partai",
      legalBasis: "AD/ART Partai Politik",
      englishTerm: "Candidate Selection",
      relatedTerms: ["Seleksi Calon", "Nomination Process", "Candidacy"]
    },
    {
      id: 67,
      term: "Bahasa Negara",
      category: "asas-konstitusi",
      definition: "Bahasa resmi yang digunakan dalam penyelenggaraan negara",
      example: "Bahasa Indonesia sebagai bahasa negara",
      legalBasis: "Pasal 36 UUD NRI 1945",
      englishTerm: "National Language",
      relatedTerms: ["Bahasa Resmi", "Official Language", "Bahasa Indonesia"]
    },
    {
      id: 68,
      term: "Bakal Calon",
      category: "pemilu",
      definition: "Orang yang mendaftarkan diri untuk dicalonkan dalam pemilu",
      example: "Bakal calon presiden mendaftar ke KPU",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Prospective Candidate",
      relatedTerms: ["Bacalon", "Pre-candidate", "Aspirant"]
    },
    {
      id: 69,
      term: "Batas Negara",
      category: "wilayah",
      definition: "Garis pemisah wilayah kedaulatan suatu negara dengan negara lain",
      example: "Perbatasan Indonesia-Malaysia di Kalimantan",
      legalBasis: "Pasal 25A UUD NRI 1945",
      englishTerm: "National Border",
      relatedTerms: ["Perbatasan", "Boundary", "Frontier"]
    },
    {
      id: 70,
      term: "Bela Negara",
      category: "ham",
      definition: "Hak dan kewajiban warga negara untuk mempertahankan negara",
      example: "Program wajib militer atau wamil",
      legalBasis: "Pasal 27 ayat (3) UUD NRI 1945",
      englishTerm: "National Defense",
      relatedTerms: ["Pertahanan Negara", "Defense Duty", "Patriotic Duty"]
    },
    {
      id: 71,
      term: "Bendahara Negara",
      category: "keuangan-negara",
      definition: "Pejabat yang mengelola keuangan negara",
      example: "Bendahara penerima dan bendahara pengeluaran",
      legalBasis: "UU No. 1/2004",
      englishTerm: "State Treasurer",
      relatedTerms: ["Treasurer", "Kas Negara", "Public Treasury"]
    },
    {
      id: 72,
      term: "Berita Negara",
      category: "perundangan",
      definition: "Penerbitan resmi pemerintah untuk mengumumkan peraturan",
      example: "Peraturan Pemerintah diumumkan dalam Berita Negara",
      legalBasis: "UU No. 12/2011",
      englishTerm: "State Gazette",
      relatedTerms: ["Official Gazette", "Government Publication", "BN"]
    },
    {
      id: 73,
      term: "Bicara untuk Rakyat",
      category: "lembaga-negara",
      definition: "Fungsi DPR/DPRD menyuarakan aspirasi rakyat",
      example: "Anggota DPR menyampaikan aspirasi konstituennya",
      legalBasis: "UU No. 42/2014",
      englishTerm: "Speaking for the People",
      relatedTerms: ["Representasi", "Voice of People", "Advocacy"]
    },
    {
      id: 74,
      term: "Bilateral",
      category: "wilayah",
      definition: "Hubungan atau perjanjian antara dua negara",
      example: "Perjanjian ekstradisi Indonesia-Singapura",
      legalBasis: "UU No. 24/2000",
      englishTerm: "Bilateral",
      relatedTerms: ["Dua Pihak", "Two-party Agreement", "Bilateral Treaty"]
    },
    {
      id: 75,
      term: "Biro Hukum",
      category: "sistem-pemerintahan",
      definition: "Unit organisasi yang menangani urusan hukum di instansi pemerintah",
      example: "Biro Hukum Sekretariat Jenderal DPR",
      legalBasis: "Peraturan Organisasi",
      englishTerm: "Legal Bureau",
      relatedTerms: ["Legal Department", "Law Office", "Legal Affairs"]
    },
    {
      id: 76,
      term: "Blangko Kewarganegaraan",
      category: "kewarganegaraan",
      definition: "Formulir resmi untuk urusan kewarganegaraan",
      example: "Formulir permohonan pewarganegaraan",
      legalBasis: "UU No. 12/2006",
      englishTerm: "Citizenship Form",
      relatedTerms: ["Formulir", "Application Form", "Citizenship Document"]
    },
    {
      id: 77,
      term: "Blocking Minority",
      category: "lembaga-negara",
      definition: "Kelompok minoritas yang dapat menghalangi keputusan",
      example: "1/3 anggota MPR dapat menghalangi perubahan UUD",
      legalBasis: "Pasal 37 UUD NRI 1945",
      englishTerm: "Blocking Minority",
      relatedTerms: ["Veto Power", "Minority Veto", "Obstruction"]
    },
    {
      id: 78,
      term: "Blueprint Reformasi",
      category: "sistem-pemerintahan",
      definition: "Rancangan induk perubahan sistem pemerintahan",
      example: "Grand design reformasi birokrasi",
      legalBasis: "Perpres tentang Reformasi Birokrasi",
      englishTerm: "Reform Blueprint",
      relatedTerms: ["Master Plan", "Reform Design", "Roadmap"]
    },
    {
      id: 79,
      term: "Bona Fide",
      category: "kewenangan",
      definition: "Itikad baik dalam menjalankan kewenangan",
      example: "Keputusan pejabat harus berdasar itikad baik",
      legalBasis: "UU No. 30/2014",
      englishTerm: "Good Faith",
      relatedTerms: ["Itikad Baik", "Genuine Intent", "Sincerity"]
    },
    {
      id: 80,
      term: "Bottom-up Planning",
      category: "sistem-pemerintahan",
      definition: "Perencanaan pembangunan dari bawah ke atas",
      example: "Musrenbang dari desa hingga nasional",
      legalBasis: "UU No. 25/2004",
      englishTerm: "Bottom-up Planning",
      relatedTerms: ["Participatory Planning", "Musrenbang", "Grassroots Planning"]
    },
    {
      id: 81,
      term: "Bounded Rationality",
      category: "sistem-pemerintahan",
      definition: "Keterbatasan rasionalitas dalam pengambilan keputusan",
      example: "Kebijakan publik dengan informasi terbatas",
      legalBasis: "Teori Administrasi Publik",
      englishTerm: "Bounded Rationality",
      relatedTerms: ["Limited Rationality", "Decision Constraints", "Cognitive Limits"]
    },
    {
      id: 82,
      term: "Breakthrough",
      category: "sistem-pemerintahan",
      definition: "Terobosan dalam penyelenggaraan pemerintahan",
      example: "Inovasi pelayanan publik digital",
      legalBasis: "Kebijakan Reformasi",
      englishTerm: "Breakthrough",
      relatedTerms: ["Terobosan", "Innovation", "Reform Initiative"]
    },
    {
      id: 83,
      term: "Broad-based Government",
      category: "sistem-pemerintahan",
      definition: "Pemerintahan dengan dukungan politik luas",
      example: "Kabinet koalisi besar",
      legalBasis: "Praktik Ketatanegaraan",
      englishTerm: "Broad-based Government",
      relatedTerms: ["Inclusive Government", "Grand Coalition", "Wide Support"]
    },
    {
      id: 84,
      term: "Budget Ceiling",
      category: "keuangan-negara",
      definition: "Batas maksimal anggaran yang dapat dialokasikan",
      example: "Pagu anggaran kementerian dalam APBN",
      legalBasis: "UU No. 17/2003",
      englishTerm: "Budget Ceiling",
      relatedTerms: ["Pagu Anggaran", "Spending Limit", "Fiscal Cap"]
    },
    {
      id: 85,
      term: "Budget Deficit",
      category: "keuangan-negara",
      definition: "Kondisi pengeluaran negara melebihi penerimaan",
      example: "Defisit APBN maksimal 3% dari PDB",
      legalBasis: "UU No. 17/2003",
      englishTerm: "Budget Deficit",
      relatedTerms: ["Defisit Anggaran", "Fiscal Deficit", "Shortfall"]
    },
    {
      id: 86,
      term: "Budgetary Power",
      category: "kewenangan",
      definition: "Kewenangan dalam pengelolaan anggaran negara",
      example: "DPR menyetujui RAPBN menjadi APBN",
      legalBasis: "Pasal 23 UUD NRI 1945",
      englishTerm: "Budgetary Power",
      relatedTerms: ["Kekuasaan Anggaran", "Fiscal Authority", "Budget Authority"]
    },
    {
      id: 87,
      term: "Buffer Zone",
      category: "wilayah",
      definition: "Zona penyangga antara dua wilayah",
      example: "Zona demiliterisasi di perbatasan",
      legalBasis: "Perjanjian Internasional",
      englishTerm: "Buffer Zone",
      relatedTerms: ["Zona Penyangga", "Neutral Zone", "DMZ"]
    },
    {
      id: 88,
      term: "Built-in Mechanism",
      category: "sistem-pemerintahan",
      definition: "Mekanisme otomatis dalam sistem pemerintahan",
      example: "Check and balances antar lembaga negara",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Built-in Mechanism",
      relatedTerms: ["Automatic System", "Internal Control", "Self-regulating"]
    },
    {
      id: 89,
      term: "Bundling System",
      category: "pemilu",
      definition: "Sistem pemilihan beberapa jabatan sekaligus",
      example: "Pemilu serentak eksekutif dan legislatif",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Bundling System",
      relatedTerms: ["Pemilu Serentak", "Concurrent Election", "Simultaneous Election"]
    },
    {
      id: 90,
      term: "Burden Sharing",
      category: "pusat-daerah",
      definition: "Pembagian beban tanggung jawab antara pemerintah pusat dan daerah",
      example: "Cost sharing dalam program kesehatan",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Burden Sharing",
      relatedTerms: ["Pembagian Beban", "Cost Sharing", "Shared Responsibility"]
    },

    // C - Cabang Kekuasaan dan Checks and Balances (91-135)
    {
      id: 91,
      term: "Cabang Kekuasaan",
      category: "sistem-pemerintahan",
      definition: "Pembagian kekuasaan negara menjadi eksekutif, legislatif, dan yudikatif",
      example: "Presiden (eksekutif), DPR (legislatif), MA (yudikatif)",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Branches of Government",
      relatedTerms: ["Trias Politica", "Separation of Powers", "Three Branches"]
    },
    {
      id: 92,
      term: "Calon Independen",
      category: "pemilu",
      definition: "Calon yang tidak diusung partai politik dalam pemilu",
      example: "Calon independen dalam pilkada",
      legalBasis: "UU No. 10/2016",
      englishTerm: "Independent Candidate",
      relatedTerms: ["Calon Perseorangan", "Non-partisan", "Individual Candidate"]
    },
    {
      id: 93,
      term: "Calon Tunggal",
      category: "pemilu",
      definition: "Hanya ada satu pasangan calon dalam pemilihan",
      example: "Pilkada dengan calon tunggal melawan kotak kosong",
      legalBasis: "Putusan MK No. 100/PUU-XIII/2015",
      englishTerm: "Single Candidate",
      relatedTerms: ["Sole Candidate", "Unopposed", "Kotak Kosong"]
    },
    {
      id: 94,
      term: "Campaign Finance",
      category: "pemilu",
      definition: "Pembiayaan kampanye dalam pemilu",
      example: "Laporan dana kampanye ke KPU",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Campaign Finance",
      relatedTerms: ["Dana Kampanye", "Political Finance", "Electoral Funding"]
    },
    {
      id: 95,
      term: "Caretaker Government",
      category: "sistem-pemerintahan",
      definition: "Pemerintahan sementara yang menjalankan tugas rutin",
      example: "Pemerintah transisi sebelum pelantikan presiden baru",
      legalBasis: "Konvensi Ketatanegaraan",
      englishTerm: "Caretaker Government",
      relatedTerms: ["Pemerintah Sementara", "Interim Government", "Transitional"]
    },
    {
      id: 96,
      term: "Catur Praja",
      category: "pusat-daerah",
      definition: "Empat tingkat pemerintahan daerah dalam sistem lama",
      example: "Provinsi, kabupaten, kecamatan, desa",
      legalBasis: "Sejarah Pemerintahan Daerah",
      englishTerm: "Four-tier Government",
      relatedTerms: ["Tingkat Pemerintahan", "Administrative Levels", "Hierarchy"]
    },
    {
      id: 97,
      term: "Cawapres",
      category: "pemilu",
      definition: "Calon Wakil Presiden",
      example: "Cawapres mendampingi capres dalam pemilu",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Vice Presidential Candidate",
      relatedTerms: ["Running Mate", "VP Candidate", "Calon Wapres"]
    },
    {
      id: 98,
      term: "Centralisme",
      category: "sistem-pemerintahan",
      definition: "Pemusatan kekuasaan pada pemerintah pusat",
      example: "Sistem pemerintahan terpusat era Orde Baru",
      legalBasis: "Sejarah Ketatanegaraan",
      englishTerm: "Centralism",
      relatedTerms: ["Sentralisasi", "Centralization", "Central Control"]
    },
    {
      id: 99,
      term: "Cessie",
      category: "kewarganegaraan",
      definition: "Penyerahan wilayah dari satu negara ke negara lain",
      example: "Timor Timur lepas dari Indonesia tahun 1999",
      legalBasis: "Hukum Internasional",
      englishTerm: "Cession",
      relatedTerms: ["Penyerahan Wilayah", "Territory Transfer", "Territorial Cession"]
    },
    {
      id: 100,
      term: "Charter",
      category: "perundangan",
      definition: "Piagam atau dokumen konstitusional",
      example: "Piagam Jakarta sebagai dokumen historis",
      legalBasis: "Sejarah Konstitusi",
      englishTerm: "Charter",
      relatedTerms: ["Piagam", "Constitutional Document", "Founding Document"]
    },
    {
      id: 101,
      term: "Check and Balances",
      category: "sistem-pemerintahan",
      definition: "Sistem saling mengawasi dan mengimbangi antar lembaga negara",
      example: "DPR mengawasi kinerja pemerintah",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Checks and Balances",
      relatedTerms: ["Pengawasan dan Keseimbangan", "Mutual Control", "Balance of Power"],
      trending: true
    },
    {
      id: 102,
      term: "Chief Executive",
      category: "lembaga-negara",
      definition: "Kepala eksekutif atau kepala pemerintahan",
      example: "Presiden sebagai chief executive Indonesia",
      legalBasis: "Pasal 4 UUD NRI 1945",
      englishTerm: "Chief Executive",
      relatedTerms: ["Kepala Pemerintahan", "Executive Head", "CEO"]
    },
    {
      id: 103,
      term: "Citizen Charter",
      category: "ham",
      definition: "Piagam yang berisi hak dan kewajiban warga dalam pelayanan publik",
      example: "Standar pelayanan publik di instansi pemerintah",
      legalBasis: "UU No. 25/2009",
      englishTerm: "Citizen Charter",
      relatedTerms: ["Piagam Pelayanan", "Service Charter", "Public Service Standards"]
    },
    {
      id: 104,
      term: "Citizenship by Birth",
      category: "kewarganegaraan",
      definition: "Kewarganegaraan yang diperoleh karena kelahiran",
      example: "Anak yang lahir dari orang tua WNI",
      legalBasis: "UU No. 12/2006",
      englishTerm: "Birthright Citizenship",
      relatedTerms: ["Kewarganegaraan Kelahiran", "Jus Soli/Sanguinis", "Natural Born"]
    },
    {
      id: 105,
      term: "Civic Education",
      category: "ham",
      definition: "Pendidikan kewarganegaraan untuk membentuk warga negara yang baik",
      example: "Mata pelajaran Pendidikan Pancasila dan Kewarganegaraan",
      legalBasis: "UU No. 20/2003",
      englishTerm: "Civic Education",
      relatedTerms: ["Pendidikan Kewarganegaraan", "PKn", "Citizenship Education"]
    },
    {
      id: 106,
      term: "Civil Rights",
      category: "ham",
      definition: "Hak-hak sipil warga negara yang dijamin konstitusi",
      example: "Hak untuk memilih dan dipilih",
      legalBasis: "Pasal 27-28 UUD NRI 1945",
      englishTerm: "Civil Rights",
      relatedTerms: ["Hak Sipil", "Kebebasan Sipil", "Civil Liberties"]
    },
    {
      id: 107,
      term: "Civil Society",
      category: "sistem-pemerintahan",
      definition: "Masyarakat madani yang berpartisipasi aktif dalam kehidupan publik",
      example: "LSM dan organisasi masyarakat",
      legalBasis: "UU No. 17/2013",
      englishTerm: "Civil Society",
      relatedTerms: ["Masyarakat Madani", "NGO", "Masyarakat Sipil"]
    },
    {
      id: 108,
      term: "Civil Supremacy",
      category: "asas-konstitusi",
      definition: "Supremasi kekuasaan sipil atas militer",
      example: "TNI di bawah kekuasaan presiden sipil",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Civilian Supremacy",
      relatedTerms: ["Supremasi Sipil", "Civilian Control", "Democratic Control"]
    },
    {
      id: 109,
      term: "Coalition Government",
      category: "sistem-pemerintahan",
      definition: "Pemerintahan yang dibentuk oleh koalisi beberapa partai",
      example: "Kabinet koalisi multi partai",
      legalBasis: "Praktik Ketatanegaraan",
      englishTerm: "Coalition Government",
      relatedTerms: ["Pemerintah Koalisi", "Multi-party Cabinet", "Alliance Government"]
    },
    {
      id: 110,
      term: "Code of Conduct",
      category: "lembaga-negara",
      definition: "Kode etik bagi penyelenggara negara",
      example: "Kode etik anggota DPR",
      legalBasis: "Peraturan DPR",
      englishTerm: "Code of Conduct",
      relatedTerms: ["Kode Etik", "Ethical Standards", "Professional Ethics"]
    },
    {
      id: 111,
      term: "Codification",
      category: "perundangan",
      definition: "Penyusunan peraturan perundang-undangan secara sistematis",
      example: "Kodifikasi hukum tata negara Indonesia",
      legalBasis: "UU No. 12/2011",
      englishTerm: "Codification",
      relatedTerms: ["Kodifikasi", "Legal Compilation", "Systematization"]
    },
    {
      id: 112,
      term: "Collective Rights",
      category: "ham",
      definition: "Hak-hak yang dimiliki kelompok atau komunitas",
      example: "Hak masyarakat adat atas tanah ulayat",
      legalBasis: "UU No. 39/1999",
      englishTerm: "Collective Rights",
      relatedTerms: ["Hak Kolektif", "Group Rights", "Community Rights"]
    },
    {
      id: 113,
      term: "Collegial System",
      category: "sistem-pemerintahan",
      definition: "Sistem pengambilan keputusan secara bersama-sama",
      example: "Keputusan majelis hakim MK",
      legalBasis: "UU No. 24/2003",
      englishTerm: "Collegial System",
      relatedTerms: ["Sistem Kolegial", "Collective Decision", "Board System"]
    },
    {
      id: 114,
      term: "Commander in Chief",
      category: "kewenangan",
      definition: "Panglima tertinggi angkatan bersenjata",
      example: "Presiden sebagai panglima tertinggi TNI",
      legalBasis: "Pasal 10 UUD NRI 1945",
      englishTerm: "Commander in Chief",
      relatedTerms: ["Panglima Tertinggi", "Supreme Commander", "Military Chief"]
    },
    {
      id: 115,
      term: "Commission",
      category: "lembaga-negara",
      definition: "Komisi negara yang dibentuk untuk tugas khusus",
      example: "Komisi Yudisial, Komisi Pemilihan Umum",
      legalBasis: "UUD NRI 1945 dan UU",
      englishTerm: "Commission",
      relatedTerms: ["Komisi Negara", "State Commission", "Independent Body"]
    },
    {
      id: 116,
      term: "Common Law",
      category: "perundangan",
      definition: "Sistem hukum berdasarkan yurisprudensi dan kebiasaan",
      example: "Sistem hukum di negara Anglo-Saxon",
      legalBasis: "Perbandingan Sistem Hukum",
      englishTerm: "Common Law",
      relatedTerms: ["Hukum Kebiasaan", "Case Law", "Judge-made Law"]
    },
    {
      id: 117,
      term: "Comparative Politics",
      category: "sistem-pemerintahan",
      definition: "Studi perbandingan sistem politik berbagai negara",
      example: "Membandingkan sistem presidensial dan parlementer",
      legalBasis: "Ilmu Politik",
      englishTerm: "Comparative Politics",
      relatedTerms: ["Politik Komparatif", "Political Comparison", "Comparative Government"]
    },
    {
      id: 118,
      term: "Competence",
      category: "kewenangan",
      definition: "Kewenangan untuk melakukan tindakan hukum tertentu",
      example: "Kompetensi MK mengadili sengketa pemilu",
      legalBasis: "Pasal 24C UUD NRI 1945",
      englishTerm: "Competence",
      relatedTerms: ["Kompetensi", "Authority", "Jurisdiction"]
    },
    {
      id: 119,
      term: "Concurrent Power",
      category: "kewenangan",
      definition: "Kewenangan yang dimiliki bersama pusat dan daerah",
      example: "Urusan pendidikan dan kesehatan",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Concurrent Power",
      relatedTerms: ["Kewenangan Bersama", "Shared Authority", "Joint Competence"]
    },
    {
      id: 120,
      term: "Confederation",
      category: "sistem-pemerintahan",
      definition: "Persekutuan negara-negara berdaulat untuk tujuan tertentu",
      example: "Uni Eropa sebagai bentuk konfederasi modern",
      legalBasis: "Teori Negara",
      englishTerm: "Confederation",
      relatedTerms: ["Konfederasi", "League of States", "State Union"]
    },
    {
      id: 121,
      term: "Confidence Vote",
      category: "lembaga-negara",
      definition: "Pemungutan suara untuk menyatakan kepercayaan pada pemerintah",
      example: "Mosi kepercayaan terhadap menteri",
      legalBasis: "Sistem Parlementer",
      englishTerm: "Vote of Confidence",
      relatedTerms: ["Mosi Kepercayaan", "Trust Vote", "Parliamentary Confidence"]
    },
    {
      id: 122,
      term: "Consensus Democracy",
      category: "sistem-pemerintahan",
      definition: "Demokrasi yang mengutamakan musyawarah mufakat",
      example: "Pengambilan keputusan di lembaga adat",
      legalBasis: "Pancasila sila ke-4",
      englishTerm: "Consensus Democracy",
      relatedTerms: ["Demokrasi Konsensus", "Deliberative Democracy", "Musyawarah"]
    },
    {
      id: 123,
      term: "Constituent Assembly",
      category: "lembaga-negara",
      definition: "Badan yang dibentuk untuk menyusun konstitusi",
      example: "Konstituante 1956-1959",
      legalBasis: "Sejarah Konstitusi Indonesia",
      englishTerm: "Constituent Assembly",
      relatedTerms: ["Konstituante", "Constitutional Assembly", "Majelis Konstituante"]
    },
    {
      id: 124,
      term: "Constituent Power",
      category: "kewenangan",
      definition: "Kekuasaan untuk membentuk atau mengubah konstitusi",
      example: "MPR berwenang mengubah UUD",
      legalBasis: "Pasal 3 dan 37 UUD NRI 1945",
      englishTerm: "Constituent Power",
      relatedTerms: ["Kekuasaan Konstituante", "Constitutional Power", "Pouvoir Constituant"]
    },
    {
      id: 125,
      term: "Constitution",
      category: "perundangan",
      definition: "Hukum dasar tertulis suatu negara",
      example: "UUD NRI 1945 sebagai konstitusi Indonesia",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Constitution",
      relatedTerms: ["Konstitusi", "Undang-Undang Dasar", "Basic Law"]
    },
    {
      id: 126,
      term: "Constitutional Amendment",
      category: "perundangan",
      definition: "Perubahan terhadap konstitusi atau UUD",
      example: "Amandemen I-IV UUD 1945 (1999-2002)",
      legalBasis: "Pasal 37 UUD NRI 1945",
      englishTerm: "Constitutional Amendment",
      relatedTerms: ["Amandemen UUD", "Perubahan Konstitusi", "Constitutional Reform"]
    },
    {
      id: 127,
      term: "Constitutional Convention",
      category: "asas-konstitusi",
      definition: "Kebiasaan ketatanegaraan yang diterima sebagai aturan tidak tertulis",
      example: "Pidato kenegaraan presiden setiap 16 Agustus",
      legalBasis: "Konvensi Ketatanegaraan",
      englishTerm: "Constitutional Convention",
      relatedTerms: ["Konvensi Konstitusi", "Unwritten Rules", "Constitutional Custom"]
    },
    {
      id: 128,
      term: "Constitutional Court",
      category: "lembaga-negara",
      definition: "Mahkamah Konstitusi sebagai pengawal konstitusi",
      example: "MK menguji UU terhadap UUD",
      legalBasis: "Pasal 24C UUD NRI 1945",
      englishTerm: "Constitutional Court",
      relatedTerms: ["Mahkamah Konstitusi", "MK", "Guardian of Constitution"]
    },
    {
      id: 129,
      term: "Constitutional Crisis",
      category: "sistem-pemerintahan",
      definition: "Krisis ketatanegaraan akibat konflik konstitusional",
      example: "Dekrit Presiden 5 Juli 1959",
      legalBasis: "Sejarah Ketatanegaraan",
      englishTerm: "Constitutional Crisis",
      relatedTerms: ["Krisis Konstitusional", "State Crisis", "Constitutional Deadlock"]
    },
    {
      id: 130,
      term: "Constitutional Democracy",
      category: "sistem-pemerintahan",
      definition: "Demokrasi yang dibatasi oleh konstitusi",
      example: "Kekuasaan presiden dibatasi UUD",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Constitutional Democracy",
      relatedTerms: ["Demokrasi Konstitusional", "Limited Democracy", "Rule of Law Democracy"]
    },
    {
      id: 131,
      term: "Constitutional Interpretation",
      category: "kewenangan",
      definition: "Penafsiran terhadap ketentuan konstitusi",
      example: "MK menafsirkan makna pasal UUD",
      legalBasis: "UU No. 24/2003",
      englishTerm: "Constitutional Interpretation",
      relatedTerms: ["Tafsir Konstitusi", "Judicial Interpretation", "Constitutional Construction"]
    },
    {
      id: 132,
      term: "Constitutional Law",
      category: "perundangan",
      definition: "Hukum yang mengatur organisasi dan kekuasaan negara",
      example: "Hukum tata negara Indonesia",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Constitutional Law",
      relatedTerms: ["Hukum Tata Negara", "HTN", "State Law"]
    },
    {
      id: 133,
      term: "Constitutional Monarchy",
      category: "sistem-pemerintahan",
      definition: "Monarki yang kekuasaannya dibatasi konstitusi",
      example: "Sistem pemerintahan Inggris, Jepang",
      legalBasis: "Perbandingan Sistem Pemerintahan",
      englishTerm: "Constitutional Monarchy",
      relatedTerms: ["Monarki Konstitusional", "Limited Monarchy", "Parliamentary Monarchy"]
    },
    {
      id: 134,
      term: "Constitutional Review",
      category: "kewenangan",
      definition: "Pengujian konstitusionalitas peraturan perundang-undangan",
      example: "Judicial review UU di MK",
      legalBasis: "Pasal 24C UUD NRI 1945",
      englishTerm: "Constitutional Review",
      relatedTerms: ["Uji Konstitusional", "Judicial Review", "Pengujian UU"]
    },
    {
      id: 135,
      term: "Constitutional Rights",
      category: "ham",
      definition: "Hak-hak yang dijamin dalam konstitusi",
      example: "Hak asasi manusia dalam UUD NRI 1945",
      legalBasis: "Pasal 28A-28J UUD NRI 1945",
      englishTerm: "Constitutional Rights",
      relatedTerms: ["Hak Konstitusional", "Fundamental Rights", "Basic Rights"]
    },

    // D - Daerah dan Demokrasi (136-180)
    {
      id: 136,
      term: "Daerah Istimewa",
      category: "pusat-daerah",
      definition: "Daerah yang memiliki keistimewaan dalam penyelenggaraan pemerintahan",
      example: "Daerah Istimewa Yogyakarta dengan sultan sebagai gubernur",
      legalBasis: "Pasal 18B UUD NRI 1945",
      englishTerm: "Special Region",
      relatedTerms: ["Special Autonomy", "Keistimewaan", "DIY"]
    },
    {
      id: 137,
      term: "Daerah Khusus",
      category: "pusat-daerah",
      definition: "Daerah dengan otonomi khusus karena kondisi tertentu",
      example: "DKI Jakarta sebagai ibukota negara",
      legalBasis: "Pasal 18B UUD NRI 1945",
      englishTerm: "Special Territory",
      relatedTerms: ["Otsus", "Special Status", "DKI"]
    },
    {
      id: 138,
      term: "Daerah Otonom",
      category: "pusat-daerah",
      definition: "Kesatuan masyarakat hukum yang memiliki batas wilayah dan berwenang mengatur urusan pemerintahan sendiri",
      example: "Provinsi, kabupaten, dan kota",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Autonomous Region",
      relatedTerms: ["Otonomi Daerah", "Self-governing Region", "Local Autonomy"]
    },
    {
      id: 139,
      term: "Daerah Pemilihan",
      category: "pemilu",
      definition: "Wilayah yang menjadi kesatuan untuk memilih wakil rakyat",
      example: "Dapil DPR RI Jawa Barat I meliputi Kota Bandung dan Cimahi",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Electoral District",
      relatedTerms: ["Dapil", "Constituency", "Electoral Area"]
    },
    {
      id: 140,
      term: "Daftar Pemilih Tetap",
      category: "pemilu",
      definition: "Daftar final warga yang berhak memilih dalam pemilu",
      example: "DPT pemilu 2024 mencapai 204 juta pemilih",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Final Voter List",
      relatedTerms: ["DPT", "Voter Registry", "Electoral Roll"]
    },
    {
      id: 141,
      term: "Dana Alokasi Khusus",
      category: "keuangan-negara",
      definition: "Dana dari APBN untuk daerah guna mendanai kegiatan khusus",
      example: "DAK fisik untuk pembangunan infrastruktur daerah",
      legalBasis: "UU No. 33/2004",
      englishTerm: "Special Allocation Fund",
      relatedTerms: ["DAK", "Earmarked Grant", "Special Purpose Fund"]
    },
    {
      id: 142,
      term: "Dana Alokasi Umum",
      category: "keuangan-negara",
      definition: "Dana dari APBN untuk pemerataan kemampuan keuangan daerah",
      example: "DAU untuk membiayai belanja pegawai daerah",
      legalBasis: "UU No. 33/2004",
      englishTerm: "General Allocation Fund",
      relatedTerms: ["DAU", "Block Grant", "General Purpose Fund"]
    },
    {
      id: 143,
      term: "Dana Bagi Hasil",
      category: "keuangan-negara",
      definition: "Dana yang bersumber dari pendapatan APBN yang dibagikan kepada daerah",
      example: "DBH dari pajak dan sumber daya alam",
      legalBasis: "UU No. 33/2004",
      englishTerm: "Revenue Sharing Fund",
      relatedTerms: ["DBH", "Shared Revenue", "Revenue Distribution"]
    },
    {
      id: 144,
      term: "Dana Desa",
      category: "keuangan-negara",
      definition: "Dana APBN yang diperuntukkan bagi desa",
      example: "Dana desa untuk pembangunan infrastruktur pedesaan",
      legalBasis: "UU No. 6/2014",
      englishTerm: "Village Fund",
      relatedTerms: ["DD", "Rural Development Fund", "Village Budget"]
    },
    {
      id: 145,
      term: "Dana Kampanye",
      category: "pemilu",
      definition: "Sejumlah uang untuk membiayai kegiatan kampanye pemilu",
      example: "Sumbangan dana kampanye dari perorangan maksimal Rp 2,5 miliar",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Campaign Fund",
      relatedTerms: ["Campaign Finance", "Political Donation", "Electoral Fund"]
    },
    {
      id: 146,
      term: "Dana Otonomi Khusus",
      category: "keuangan-negara",
      definition: "Dana khusus untuk daerah dengan status otonomi khusus",
      example: "Dana otsus untuk Papua dan Aceh",
      legalBasis: "UU Otonomi Khusus",
      englishTerm: "Special Autonomy Fund",
      relatedTerms: ["Dana Otsus", "Special Grant", "Autonomy Budget"]
    },
    {
      id: 147,
      term: "Dana Perimbangan",
      category: "keuangan-negara",
      definition: "Dana yang bersumber dari APBN untuk mendanai pelaksanaan desentralisasi",
      example: "DAU, DAK, dan DBH sebagai dana perimbangan",
      legalBasis: "UU No. 33/2004",
      englishTerm: "Balancing Fund",
      relatedTerms: ["Fiscal Balance", "Intergovernmental Transfer", "Transfer Dana"]
    },
    {
      id: 148,
      term: "Darurat Sipil",
      category: "kewenangan",
      definition: "Keadaan darurat tingkat terendah yang dapat ditetapkan presiden",
      example: "Darurat sipil karena bencana alam besar",
      legalBasis: "UU No. 23/1959",
      englishTerm: "Civil Emergency",
      relatedTerms: ["State of Emergency", "Keadaan Darurat", "Emergency Status"]
    },
    {
      id: 149,
      term: "Dasar Negara",
      category: "asas-konstitusi",
      definition: "Fondasi atau landasan filosofis suatu negara",
      example: "Pancasila sebagai dasar negara Indonesia",
      legalBasis: "Pembukaan UUD NRI 1945",
      englishTerm: "State Foundation",
      relatedTerms: ["Pancasila", "National Philosophy", "Grundnorm"]
    },
    {
      id: 150,
      term: "Debat Publik",
      category: "pemilu",
      definition: "Diskusi terbuka antar kandidat dalam pemilu",
      example: "Debat capres-cawapres di televisi nasional",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Public Debate",
      relatedTerms: ["Presidential Debate", "Candidate Debate", "Electoral Debate"]
    },
    {
      id: 151,
      term: "Decentralization",
      category: "pusat-daerah",
      definition: "Penyerahan wewenang pemerintahan dari pusat ke daerah",
      example: "Desentralisasi pendidikan dan kesehatan",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Decentralization",
      relatedTerms: ["Desentralisasi", "Devolution", "Power Transfer"]
    },
    {
      id: 152,
      term: "Declaration",
      category: "ham",
      definition: "Pernyataan resmi tentang prinsip atau kebijakan",
      example: "Deklarasi Universal HAM PBB",
      legalBasis: "Hukum Internasional",
      englishTerm: "Declaration",
      relatedTerms: ["Deklarasi", "Proclamation", "Statement"]
    },
    {
      id: 153,
      term: "Deconcentration",
      category: "pusat-daerah",
      definition: "Pelimpahan wewenang dari pemerintah pusat kepada gubernur",
      example: "Gubernur melaksanakan urusan pemerintah pusat",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Deconcentration",
      relatedTerms: ["Dekonsentrasi", "Administrative Delegation", "Pelimpahan"]
    },
    {
      id: 154,
      term: "Decree",
      category: "perundangan",
      definition: "Keputusan atau penetapan dari pejabat berwenang",
      example: "Dekrit Presiden 5 Juli 1959",
      legalBasis: "Sejarah Ketatanegaraan",
      englishTerm: "Decree",
      relatedTerms: ["Dekrit", "Executive Order", "Maklumat"]
    },
    {
      id: 155,
      term: "Deep State",
      category: "sistem-pemerintahan",
      definition: "Jaringan kekuasaan tersembunyi yang mempengaruhi kebijakan",
      example: "Teori konspirasi tentang kekuatan di balik pemerintahan",
      legalBasis: "Ilmu Politik",
      englishTerm: "Deep State",
      relatedTerms: ["Shadow Government", "Hidden Power", "Negara Bayangan"]
    },
    {
      id: 156,
      term: "Defacto",
      category: "kewenangan",
      definition: "Berdasarkan kenyataan atau praktik, bukan hukum formal",
      example: "Pemimpin de facto yang berkuasa tanpa legitimasi",
      legalBasis: "Teori Hukum",
      englishTerm: "De Facto",
      relatedTerms: ["Faktual", "In Practice", "Kenyataan"]
    },
    {
      id: 157,
      term: "Dejure",
      category: "kewenangan",
      definition: "Berdasarkan hukum atau secara resmi",
      example: "Presiden terpilih secara de jure",
      legalBasis: "Teori Hukum",
      englishTerm: "De Jure",
      relatedTerms: ["Secara Hukum", "Legal", "Formal"]
    },
    {
      id: 158,
      term: "Delegasi",
      category: "kewenangan",
      definition: "Pelimpahan wewenang dari pejabat kepada bawahan",
      example: "Presiden mendelegasikan wewenang kepada menteri",
      legalBasis: "UU No. 30/2014",
      englishTerm: "Delegation",
      relatedTerms: ["Pelimpahan", "Authority Transfer", "Mandate"]
    },
    {
      id: 159,
      term: "Deliberasi",
      category: "sistem-pemerintahan",
      definition: "Musyawarah untuk pengambilan keputusan",
      example: "Deliberasi publik dalam penyusunan kebijakan",
      legalBasis: "Pancasila sila ke-4",
      englishTerm: "Deliberation",
      relatedTerms: ["Musyawarah", "Consultation", "Discussion"]
    },
    {
      id: 160,
      term: "Demiliterisasi",
      category: "sistem-pemerintahan",
      definition: "Pengurangan peran militer dalam pemerintahan",
      example: "Reformasi TNI pasca 1998",
      legalBasis: "TAP MPR tentang TNI/Polri",
      englishTerm: "Demilitarization",
      relatedTerms: ["Civilian Control", "Reformasi Militer", "Supremasi Sipil"]
    },
    {
      id: 161,
      term: "Demokrasi",
      category: "asas-konstitusi",
      definition: "Sistem pemerintahan dari rakyat, oleh rakyat, untuk rakyat",
      example: "Indonesia menganut demokrasi Pancasila",
      legalBasis: "Pasal 1 ayat (2) UUD NRI 1945",
      englishTerm: "Democracy",
      relatedTerms: ["Kedaulatan Rakyat", "People Power", "Democratic System"],
      trending: true
    },
    {
      id: 162,
      term: "Demokrasi Langsung",
      category: "sistem-pemerintahan",
      definition: "Rakyat terlibat langsung dalam pengambilan keputusan",
      example: "Referendum atau pemilihan langsung",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Direct Democracy",
      relatedTerms: ["Partisipasi Langsung", "Referendum", "People's Vote"]
    },
    {
      id: 163,
      term: "Demokrasi Liberal",
      category: "sistem-pemerintahan",
      definition: "Demokrasi yang menekankan kebebasan individu",
      example: "Sistem demokrasi liberal 1950-1959",
      legalBasis: "Sejarah Ketatanegaraan",
      englishTerm: "Liberal Democracy",
      relatedTerms: ["Western Democracy", "Demokrasi Barat", "Free Democracy"]
    },
    {
      id: 164,
      term: "Demokrasi Pancasila",
      category: "sistem-pemerintahan",
      definition: "Demokrasi berdasarkan nilai-nilai Pancasila",
      example: "Musyawarah mufakat dalam pengambilan keputusan",
      legalBasis: "Pancasila dan UUD NRI 1945",
      englishTerm: "Pancasila Democracy",
      relatedTerms: ["Indonesian Democracy", "Guided Democracy", "Musyawarah"]
    },
    {
      id: 165,
      term: "Demokrasi Perwakilan",
      category: "sistem-pemerintahan",
      definition: "Rakyat memilih wakil untuk membuat keputusan",
      example: "Sistem perwakilan melalui DPR/DPRD",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Representative Democracy",
      relatedTerms: ["Indirect Democracy", "Parliamentary Democracy", "Perwakilan"]
    },
    {
      id: 166,
      term: "Demokrasi Prosedural",
      category: "sistem-pemerintahan",
      definition: "Demokrasi yang menekankan prosedur dan mekanisme",
      example: "Pemilu berkala sebagai prosedur demokratis",
      legalBasis: "UU Pemilu",
      englishTerm: "Procedural Democracy",
      relatedTerms: ["Electoral Democracy", "Formal Democracy", "Minimalist Democracy"]
    },
    {
      id: 167,
      term: "Demokrasi Substantif",
      category: "sistem-pemerintahan",
      definition: "Demokrasi yang menekankan nilai dan substansi",
      example: "Keadilan sosial dan kesejahteraan rakyat",
      legalBasis: "Pembukaan UUD NRI 1945",
      englishTerm: "Substantive Democracy",
      relatedTerms: ["Real Democracy", "Social Democracy", "Meaningful Democracy"]
    },
    {
      id: 168,
      term: "Demokratisasi",
      category: "sistem-pemerintahan",
      definition: "Proses perubahan menuju sistem yang lebih demokratis",
      example: "Demokratisasi Indonesia pasca Orde Baru",
      legalBasis: "Reformasi 1998",
      englishTerm: "Democratization",
      relatedTerms: ["Democratic Transition", "Reformasi", "Political Reform"]
    },
    {
      id: 169,
      term: "Denasionalisasi",
      category: "kewarganegaraan",
      definition: "Pencabutan status kewarganegaraan",
      example: "Hilangnya kewarganegaraan karena mengangkat senjata melawan negara",
      legalBasis: "UU No. 12/2006",
      englishTerm: "Denationalization",
      relatedTerms: ["Pencabutan Kewarganegaraan", "Loss of Citizenship", "Statelessness"]
    },
    {
      id: 170,
      term: "Derogasi",
      category: "ham",
      definition: "Pengurangan atau pembatasan HAM dalam keadaan darurat",
      example: "Pembatasan kebebasan bergerak saat pandemi",
      legalBasis: "Pasal 28J UUD NRI 1945",
      englishTerm: "Derogation",
      relatedTerms: ["Pembatasan HAM", "Rights Limitation", "Emergency Powers"]
    },
    {
      id: 171,
      term: "Desa",
      category: "pusat-daerah",
      definition: "Kesatuan masyarakat hukum dengan batas wilayah yang berwenang mengatur urusan pemerintahan",
      example: "Desa adat di Bali dengan sistem pemerintahan tradisional",
      legalBasis: "UU No. 6/2014",
      englishTerm: "Village",
      relatedTerms: ["Rural Government", "Pemerintahan Desa", "Local Community"]
    },
    {
      id: 172,
      term: "Desa Adat",
      category: "pusat-daerah",
      definition: "Kesatuan masyarakat hukum adat yang masih hidup",
      example: "Nagari di Sumatera Barat",
      legalBasis: "Pasal 18B ayat (2) UUD NRI 1945",
      englishTerm: "Customary Village",
      relatedTerms: ["Traditional Village", "Masyarakat Adat", "Indigenous Community"]
    },
    {
      id: 173,
      term: "Desentralisasi Asimetris",
      category: "pusat-daerah",
      definition: "Pemberian otonomi yang berbeda-beda kepada daerah",
      example: "Otonomi khusus Aceh berbeda dengan Papua",
      legalBasis: "UU Otonomi Khusus",
      englishTerm: "Asymmetric Decentralization",
      relatedTerms: ["Differential Autonomy", "Special Autonomy", "Otsus"]
    },
    {
      id: 174,
      term: "Desentralisasi Fiskal",
      category: "keuangan-negara",
      definition: "Penyerahan sumber-sumber keuangan kepada daerah",
      example: "Pajak daerah dan retribusi daerah",
      legalBasis: "UU No. 33/2004",
      englishTerm: "Fiscal Decentralization",
      relatedTerms: ["Financial Autonomy", "Revenue Decentralization", "Keuangan Daerah"]
    },
    {
      id: 175,
      term: "Despotisme",
      category: "sistem-pemerintahan",
      definition: "Pemerintahan absolut tanpa pembatasan hukum",
      example: "Kekuasaan raja absolut di masa lalu",
      legalBasis: "Teori Politik",
      englishTerm: "Despotism",
      relatedTerms: ["Absolutisme", "Tyranny", "Dictatorship"]
    },
    {
      id: 176,
      term: "Dewan Etik",
      category: "lembaga-negara",
      definition: "Badan yang mengawasi etika penyelenggara negara",
      example: "Dewan Etik Penyelenggara Pemilu (DKPP)",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Ethics Council",
      relatedTerms: ["Ethics Committee", "DKPP", "Ethical Oversight"]
    },
    {
      id: 177,
      term: "Dewan Perwakilan Daerah",
      category: "lembaga-negara",
      definition: "Lembaga perwakilan daerah dalam sistem bikameral Indonesia",
      example: "DPD mewakili kepentingan daerah di tingkat nasional",
      legalBasis: "Pasal 22C-22D UUD NRI 1945",
      englishTerm: "Regional Representative Council",
      relatedTerms: ["DPD", "Senate", "Upper House"]
    },
    {
      id: 178,
      term: "Dewan Perwakilan Rakyat",
      category: "lembaga-negara",
      definition: "Lembaga perwakilan rakyat yang memegang kekuasaan legislatif",
      example: "DPR RI membuat undang-undang bersama presiden",
      legalBasis: "Pasal 19-22B UUD NRI 1945",
      englishTerm: "House of Representatives",
      relatedTerms: ["DPR", "Parliament", "Legislature"]
    },
    {
      id: 179,
      term: "Dewan Perwakilan Rakyat Daerah",
      category: "lembaga-negara",
      definition: "Lembaga perwakilan rakyat di tingkat daerah",
      example: "DPRD Provinsi, DPRD Kabupaten/Kota",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Regional House of Representatives",
      relatedTerms: ["DPRD", "Local Parliament", "Regional Legislature"]
    },
    {
      id: 180,
      term: "Dewan Pertimbangan Presiden",
      category: "lembaga-negara",
      definition: "Lembaga yang memberikan nasihat kepada presiden",
      example: "Wantimpres memberikan pertimbangan strategis",
      legalBasis: "UU No. 19/2006",
      englishTerm: "Presidential Advisory Council",
      relatedTerms: ["Wantimpres", "Advisory Board", "Presidential Council"]
    },

    // E - Eksekutif dan Electoral (181-225)
    {
      id: 181,
      term: "Eksekutif",
      category: "lembaga-negara",
      definition: "Cabang kekuasaan yang melaksanakan undang-undang dan menjalankan pemerintahan",
      example: "Presiden dan wakil presiden sebagai kepala eksekutif",
      legalBasis: "Pasal 4 UUD NRI 1945",
      englishTerm: "Executive",
      relatedTerms: ["Executive Branch", "Pemerintah", "Government"]
    },
    {
      id: 182,
      term: "Electoral Threshold",
      category: "pemilu",
      definition: "Ambang batas perolehan suara untuk dapat mengikuti pemilu berikutnya",
      example: "Partai harus meraih minimal 4% suara sah nasional",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Electoral Threshold",
      relatedTerms: ["Ambang Batas Pemilu", "Threshold", "Minimum Vote"]
    },
    {
      id: 183,
      term: "Emergency Powers",
      category: "kewenangan",
      definition: "Kekuasaan khusus presiden dalam keadaan darurat",
      example: "Menetapkan Perppu dalam keadaan kegentingan yang memaksa",
      legalBasis: "Pasal 22 UUD NRI 1945",
      englishTerm: "Emergency Powers",
      relatedTerms: ["Kekuasaan Darurat", "Crisis Authority", "Extraordinary Powers"]
    },
    {
      id: 184,
      term: "Enfranchisement",
      category: "ham",
      definition: "Pemberian hak pilih kepada warga negara",
      example: "Hak pilih universal untuk semua WNI berusia 17 tahun ke atas",
      legalBasis: "UU No. 7/2017",
      englishTerm: "Enfranchisement",
      relatedTerms: ["Hak Pilih", "Voting Rights", "Suffrage"]
    },
    {
      id: 185,
      term: "Equal Protection",
      category: "ham",
      definition: "Perlindungan yang sama di hadapan hukum",
      example: "Semua warga negara mendapat perlakuan sama tanpa diskriminasi",
      legalBasis: "Pasal 27 ayat (1) UUD NRI 1945",
      englishTerm: "Equal Protection",
      relatedTerms: ["Persamaan Hukum", "Non-discrimination", "Equality"]
    },
    {
      id: 186,
      term: "Equality Before the Law",
      category: "asas-konstitusi",
      definition: "Persamaan di hadapan hukum tanpa pandang status",
      example: "Pejabat dan rakyat biasa sama di mata hukum",
      legalBasis: "Pasal 27 ayat (1) UUD NRI 1945",
      englishTerm: "Equality Before the Law",
      relatedTerms: ["Persamaan Hukum", "Legal Equality", "Isonomia"]
    },
    {
      id: 187,
      term: "Erga Omnes",
      category: "kewenangan",
      definition: "Berlaku terhadap semua orang",
      example: "Putusan MK berlaku untuk semua pihak",
      legalBasis: "UU No. 24/2003",
      englishTerm: "Erga Omnes",
      relatedTerms: ["Binding on All", "Universal Effect", "General Application"]
    },
    {
      id: 188,
      term: "Etika Politik",
      category: "sistem-pemerintahan",
      definition: "Norma moral dalam penyelenggaraan politik dan pemerintahan",
      example: "Kode etik anggota DPR dan penyelenggara negara",
      legalBasis: "TAP MPR No. VI/MPR/2001",
      englishTerm: "Political Ethics",
      relatedTerms: ["Political Morality", "Ethical Politics", "Moral Standards"]
    },
    {
      id: 189,
      term: "Executive Agreement",
      category: "kewenangan",
      definition: "Perjanjian internasional yang dibuat presiden tanpa persetujuan DPR",
      example: "MoU kerjasama teknis antar pemerintah",
      legalBasis: "UU No. 24/2000",
      englishTerm: "Executive Agreement",
      relatedTerms: ["Perjanjian Eksekutif", "Presidential Agreement", "Administrative Agreement"]
    },
    {
      id: 190,
      term: "Executive Order",
      category: "perundangan",
      definition: "Perintah eksekutif dari presiden",
      example: "Instruksi Presiden (Inpres) untuk percepatan pembangunan",
      legalBasis: "UU No. 12/2011",
      englishTerm: "Executive Order",
      relatedTerms: ["Perintah Presiden", "Presidential Directive", "Inpres"]
    },
    {
      id: 191,
      term: "Executive Privilege",
      category: "kewenangan",
      definition: "Hak eksekutif untuk merahasiakan informasi tertentu",
      example: "Presiden tidak wajib hadir dalam panggilan DPR",
      legalBasis: "Konvensi Ketatanegaraan",
      englishTerm: "Executive Privilege",
      relatedTerms: ["Hak Prerogatif", "Presidential Immunity", "Executive Immunity"]
    },
    {
      id: 192,
      term: "Executive Review",
      category: "kewenangan",
      definition: "Pengujian peraturan di bawah UU oleh pemerintah",
      example: "Menteri menguji Perda terhadap UU",
      legalBasis: "UU No. 23/2014",
      englishTerm: "Executive Review",
      relatedTerms: ["Pengujian Eksekutif", "Administrative Review", "Government Review"]
    },
    {
      id: 193,
      term: "Exit Poll",
      category: "pemilu",
      definition: "Survei pemilih setelah memberikan suara",
      example: "Exit poll untuk memprediksi hasil pemilu",
      legalBasis: "Kode Etik Lembaga Survei",
      englishTerm: "Exit Poll",
      relatedTerms: ["Quick Count", "Survei Pemilu", "Post-voting Survey"]
    },
    {
      id: 194,
      term: "Ex-officio",
      category: "kewenangan",
      definition: "Karena jabatan atau berdasarkan jabatan",
      example: "Presiden ex-officio sebagai ketua dewan pertahanan",
      legalBasis: "UUD NRI 1945",
      englishTerm: "Ex-officio",
      relatedTerms: ["By Virtue of Office", "Karena Jabatan", "Official Capacity"]
    },
    {
        id: 195,
        term: "Extraordinary Session",
        category: "lembaga-negara",
        definition: "Sidang luar biasa lembaga negara di luar jadwal reguler untuk membahas hal mendesak",
        example: "Sidang Paripurna DPR luar biasa untuk membahas RUU darurat",
        legalBasis: "UU MD3",
        englishTerm: "Extraordinary Session",
        relatedTerms: ["Sidang Istimewa", "Special Session", "Sidang Darurat"]
      },
      {
        id: 196,
        term: "Filibuster",
        category: "proses-legislasi",
        definition: "Taktik memperpanjang debat untuk menunda atau menghalangi pengambilan keputusan",
        example: "Anggota DPR melakukan filibuster dengan pidato panjang",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Filibuster",
        relatedTerms: ["Obstruksi Parlemen", "Penundaan Voting"]
      },
      {
        id: 197,
        term: "Floor Leader",
        category: "lembaga-negara",
        definition: "Pimpinan fraksi di parlemen yang mengkoordinir anggota fraksi",
        example: "Floor leader fraksi memimpin strategi voting",
        legalBasis: "Peraturan DPR",
        englishTerm: "Floor Leader",
        relatedTerms: ["Pimpinan Fraksi", "Ketua Fraksi"]
      },
      {
        id: 198,
        term: "Formateur",
        category: "sistem-pemerintahan",
        definition: "Orang yang ditunjuk membentuk kabinet dalam sistem parlementer",
        example: "PM ditunjuk sebagai formateur kabinet baru",
        legalBasis: "Konvensi Ketatanegaraan",
        englishTerm: "Formateur",
        relatedTerms: ["Pembentuk Kabinet", "Cabinet Former"]
      },
      {
        id: 199,
        term: "Forum Previligiatum",
        category: "kekuasaan-kehakiman",
        definition: "Forum khusus untuk mengadili pejabat negara tertentu",
        example: "MK sebagai forum previligiatum untuk Presiden",
        legalBasis: "UUD 1945",
        englishTerm: "Special Forum",
        relatedTerms: ["Peradilan Khusus", "Forum Khusus"]
      },
      {
        id: 200,
        term: "Fraksi",
        category: "lembaga-negara",
        definition: "Pengelompokan anggota DPR berdasarkan partai politik",
        example: "Fraksi PDIP di DPR RI",
        legalBasis: "UU MD3",
        englishTerm: "Parliamentary Faction",
        relatedTerms: ["Faksi", "Party Faction"]
      },
      {
        id: 201,
        term: "Franking Privilege",
        category: "hak-kewajiban",
        definition: "Hak anggota parlemen mengirim surat tanpa prangko",
        example: "Senator menggunakan franking privilege untuk surat konstituen",
        legalBasis: "Hak Istimewa Parlemen",
        englishTerm: "Franking Privilege",
        relatedTerms: ["Hak Pos", "Postal Privilege"]
      },
      {
        id: 202,
        term: "Free Vote",
        category: "proses-legislasi",
        definition: "Pemungutan suara tanpa terikat instruksi partai",
        example: "Free vote untuk RUU kontroversial",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Free Vote",
        relatedTerms: ["Conscience Vote", "Voting Bebas"]
      },
      {
        id: 203,
        term: "Fungsi Anggaran",
        category: "lembaga-negara",
        definition: "Kewenangan DPR untuk membahas dan menyetujui APBN",
        example: "DPR menjalankan fungsi anggaran saat pembahasan RAPBN",
        legalBasis: "Pasal 20A UUD 1945",
        englishTerm: "Budgetary Function",
        relatedTerms: ["Budget Authority", "Kekuasaan Anggaran"]
      },
      {
        id: 204,
        term: "Fungsi Legislasi",
        category: "lembaga-negara",
        definition: "Kewenangan membentuk undang-undang",
        example: "DPR menjalankan fungsi legislasi dengan membuat UU",
        legalBasis: "Pasal 20 UUD 1945",
        englishTerm: "Legislative Function",
        relatedTerms: ["Lawmaking Power", "Kekuasaan Legislatif"]
      },
      {
        id: 205,
        term: "Fungsi Pengawasan",
        category: "lembaga-negara",
        definition: "Kewenangan DPR mengawasi jalannya pemerintahan",
        example: "DPR mengawasi kinerja menteri",
        legalBasis: "Pasal 20A UUD 1945",
        englishTerm: "Oversight Function",
        relatedTerms: ["Supervisory Power", "Kontrol Parlemen"]
      },
      {
        id: 206,
        term: "Gabungan Fraksi",
        category: "lembaga-negara",
        definition: "Pengelompokan beberapa partai kecil dalam satu fraksi",
        example: "Gabungan fraksi partai-partai kecil di DPR",
        legalBasis: "UU MD3",
        englishTerm: "Combined Faction",
        relatedTerms: ["Fraksi Gabungan", "Coalition Faction"]
      },
      {
        id: 207,
        term: "Garis-garis Besar Haluan Negara",
        category: "kebijakan-negara",
        definition: "Pedoman penyelenggaraan negara (sudah tidak berlaku)",
        example: "GBHN era Orde Baru",
        legalBasis: "TAP MPR (dicabut)",
        englishTerm: "State Policy Guidelines",
        relatedTerms: ["GBHN", "Haluan Negara"]
      },
      {
        id: 208,
        term: "Gerrymandering",
        category: "pemilu",
        definition: "Manipulasi batas daerah pemilihan untuk keuntungan politik",
        example: "Perubahan dapil untuk menguntungkan partai tertentu",
        legalBasis: "UU Pemilu",
        englishTerm: "Gerrymandering",
        relatedTerms: ["Manipulasi Dapil", "Electoral Manipulation"]
      },
      {
        id: 209,
        term: "Golongan Karya",
        category: "partai-politik",
        definition: "Organisasi politik era Orde Baru",
        example: "Golkar sebagai partai dominan era Soeharto",
        legalBasis: "Sejarah Politik",
        englishTerm: "Functional Groups",
        relatedTerms: ["Golkar", "Functional Group"]
      },
      {
        id: 210,
        term: "Good Governance",
        category: "pemerintahan",
        definition: "Tata kelola pemerintahan yang baik",
        example: "Penerapan prinsip transparansi dan akuntabilitas",
        legalBasis: "UU Administrasi Pemerintahan",
        englishTerm: "Good Governance",
        relatedTerms: ["Tata Kelola", "Kepemerintahan Yang Baik"]
      },
      {
        id: 211,
        term: "Gotong Royong",
        category: "asas-konstitusi",
        definition: "Asas kekeluargaan dalam kehidupan berbangsa",
        example: "Semangat gotong royong dalam Pancasila",
        legalBasis: "Pancasila",
        englishTerm: "Mutual Cooperation",
        relatedTerms: ["Kebersamaan", "Mutual Aid"]
      },
      {
        id: 212,
        term: "Government Shutdown",
        category: "sistem-pemerintahan",
        definition: "Penghentian operasi pemerintah karena tidak ada anggaran",
        example: "Shutdown pemerintah AS karena deadlock anggaran",
        legalBasis: "Sistem Anggaran",
        englishTerm: "Government Shutdown",
        relatedTerms: ["Penutupan Pemerintah", "Budget Crisis"]
      },
      {
        id: 213,
        term: "Grand Coalition",
        category: "sistem-pemerintahan",
        definition: "Koalisi besar melibatkan partai-partai utama",
        example: "Koalisi Indonesia Maju",
        legalBasis: "Politik Praktis",
        englishTerm: "Grand Coalition",
        relatedTerms: ["Koalisi Besar", "Mega Coalition"]
      },
      {
        id: 214,
        term: "Grass Root Democracy",
        category: "demokrasi",
        definition: "Demokrasi yang dimulai dari tingkat akar rumput",
        example: "Musyawarah desa sebagai grass root democracy",
        legalBasis: "UU Desa",
        englishTerm: "Grassroots Democracy",
        relatedTerms: ["Demokrasi Akar Rumput", "Bottom-up Democracy"]
      },
      {
        id: 215,
        term: "Grasi",
        category: "kekuasaan-presiden",
        definition: "Pengampunan dari Presiden kepada terpidana",
        example: "Presiden memberi grasi kepada narapidana",
        legalBasis: "Pasal 14 UUD 1945",
        englishTerm: "Clemency",
        relatedTerms: ["Pengampunan", "Presidential Pardon"]
      },
      {
        id: 216,
        term: "Gubernur",
        category: "pemerintahan-daerah",
        definition: "Kepala daerah provinsi",
        example: "Gubernur DKI Jakarta",
        legalBasis: "UU Pemda",
        englishTerm: "Governor",
        relatedTerms: ["Kepala Daerah", "Provincial Head"]
      },
      {
        id: 217,
        term: "Hak Angket",
        category: "lembaga-negara",
        definition: "Hak DPR untuk melakukan penyelidikan",
        example: "Hak angket kasus Century",
        legalBasis: "Pasal 20A UUD 1945",
        englishTerm: "Right of Inquiry",
        relatedTerms: ["Inquiry Right", "Hak Penyelidikan"]
      },
      {
        id: 218,
        term: "Hak Asasi Manusia",
        category: "hak-kewajiban",
        definition: "Hak dasar yang melekat pada manusia",
        example: "Hak untuk hidup, kebebasan berpendapat",
        legalBasis: "Pasal 28 UUD 1945",
        englishTerm: "Human Rights",
        relatedTerms: ["HAM", "Fundamental Rights"]
      },
      {
        id: 219,
        term: "Hak Budget",
        category: "lembaga-negara",
        definition: "Hak DPR untuk menyetujui anggaran negara",
        example: "DPR menggunakan hak budget saat pembahasan APBN",
        legalBasis: "Pasal 23 UUD 1945",
        englishTerm: "Budgetary Right",
        relatedTerms: ["Hak Anggaran", "Budget Authority"]
      },
      {
        id: 220,
        term: "Hak Imunitas",
        category: "lembaga-negara",
        definition: "Kekebalan anggota DPR dari tuntutan hukum atas pendapat",
        example: "Anggota DPR tidak dapat dituntut atas pendapat di rapat",
        legalBasis: "Pasal 224 UU MD3",
        englishTerm: "Parliamentary Immunity",
        relatedTerms: ["Kekebalan Parlemen", "Legislative Immunity"]
      },
      {
        id: 221,
        term: "Hak Inisiatif",
        category: "lembaga-negara",
        definition: "Hak mengajukan rancangan undang-undang",
        example: "DPR mengajukan RUU inisiatif",
        legalBasis: "Pasal 21 UUD 1945",
        englishTerm: "Right of Initiative",
        relatedTerms: ["Legislative Initiative", "Hak Usul"]
      },
      {
        id: 222,
        term: "Hak Interpelasi",
        category: "lembaga-negara",
        definition: "Hak DPR meminta keterangan kepada pemerintah",
        example: "Interpelasi kebijakan pemerintah",
        legalBasis: "Pasal 20A UUD 1945",
        englishTerm: "Right of Interpellation",
        relatedTerms: ["Interpellation Right", "Hak Bertanya"]
      },
      {
        id: 223,
        term: "Hak Menyatakan Pendapat",
        category: "lembaga-negara",
        definition: "Hak DPR untuk menyatakan pendapat terhadap kebijakan pemerintah",
        example: "DPR menyatakan pendapat tentang kinerja menteri",
        legalBasis: "Pasal 20A UUD 1945",
        englishTerm: "Right to Express Opinion",
        relatedTerms: ["Opinion Right", "Hak Pendapat"]
      },
      {
        id: 224,
        term: "Hak Pilih Aktif",
        category: "pemilu",
        definition: "Hak untuk memilih dalam pemilu",
        example: "WNI berusia 17 tahun memiliki hak pilih aktif",
        legalBasis: "UU Pemilu",
        englishTerm: "Right to Vote",
        relatedTerms: ["Voting Right", "Suffrage"]
      },
      {
        id: 225,
        term: "Hak Pilih Pasif",
        category: "pemilu",
        definition: "Hak untuk dipilih dalam pemilu",
        example: "Mencalonkan diri sebagai anggota DPR",
        legalBasis: "UU Pemilu",
        englishTerm: "Right to Be Elected",
        relatedTerms: ["Eligibility", "Hak Dipilih"]
      },
      {
        id: 226,
        term: "Hak Prerogatif",
        category: "kekuasaan-presiden",
        definition: "Hak khusus presiden yang tidak dapat diganggu gugat",
        example: "Pengangkatan menteri adalah hak prerogatif",
        legalBasis: "UUD 1945",
        englishTerm: "Prerogative Right",
        relatedTerms: ["Presidential Prerogative", "Hak Istimewa"]
      },
      {
        id: 227,
        term: "Hak Recall",
        category: "partai-politik",
        definition: "Hak partai politik untuk menarik kembali anggotanya dari DPR",
        example: "Partai melakukan recall terhadap anggota yang melanggar AD/ART",
        legalBasis: "UU MD3",
        englishTerm: "Right of Recall",
        relatedTerms: ["Penarikan Kembali", "PAW"]
      },
      {
        id: 228,
        term: "Hak Uji Materiil",
        category: "kekuasaan-kehakiman",
        definition: "Kewenangan menguji peraturan perundangan terhadap peraturan yang lebih tinggi",
        example: "MA menguji PP terhadap UU",
        legalBasis: "Pasal 24A UUD 1945",
        englishTerm: "Judicial Review",
        relatedTerms: ["Material Review", "Toetsingsrecht"]
      },
      {
        id: 229,
        term: "Haluan Negara",
        category: "kebijakan-negara",
        definition: "Arah dan tujuan penyelenggaraan negara",
        example: "RPJPN sebagai haluan negara jangka panjang",
        legalBasis: "UU SPPN",
        englishTerm: "State Direction",
        relatedTerms: ["National Direction", "Arah Negara"]
      },
      {
        id: 230,
        term: "Hansip",
        category: "pertahanan-keamanan",
        definition: "Pertahanan sipil era Orde Baru",
        example: "Hansip sebagai komponen pertahanan rakyat",
        legalBasis: "Sejarah (sudah dibubarkan)",
        englishTerm: "Civil Defense",
        relatedTerms: ["Pertahanan Sipil", "Linmas"]
      },
      {
        id: 231,
        term: "Hari Jadi",
        category: "pemerintahan-daerah",
        definition: "Hari pembentukan suatu daerah",
        example: "22 Juni sebagai hari jadi Jakarta",
        legalBasis: "Perda",
        englishTerm: "Anniversary",
        relatedTerms: ["Founding Day", "Hari Lahir"]
      },
      {
        id: 232,
        term: "Harmonisasi Peraturan",
        category: "perundang-undangan",
        definition: "Proses menyelaraskan peraturan perundangan",
        example: "Harmonisasi RUU di Kemenkumham",
        legalBasis: "UU Pembentukan Peraturan",
        englishTerm: "Legal Harmonization",
        relatedTerms: ["Sinkronisasi", "Alignment"]
      },
      {
        id: 233,
        term: "Hearing",
        category: "lembaga-negara",
        definition: "Dengar pendapat antara DPR dengan pihak terkait",
        example: "Hearing dengan pakar ekonomi",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Hearing",
        relatedTerms: ["Dengar Pendapat", "RDP"]
      },
      {
        id: 234,
        term: "Hibah Daerah",
        category: "pemerintahan-daerah",
        definition: "Pemberian dari pemerintah daerah tanpa imbalan",
        example: "Hibah untuk organisasi kemasyarakatan",
        legalBasis: "UU Keuangan Daerah",
        englishTerm: "Regional Grant",
        relatedTerms: ["Dana Hibah", "Local Grant"]
      },
      {
        id: 235,
        term: "Hierarki Perundangan",
        category: "perundang-undangan",
        definition: "Tata urutan peraturan perundang-undangan",
        example: "UUD - UU - PP - Perpres - Perda",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Legal Hierarchy",
        relatedTerms: ["Tata Urutan", "Hierarchy of Laws"]
      },
      {
        id: 236,
        term: "House of Representatives",
        category: "lembaga-negara",
        definition: "Dewan Perwakilan Rakyat (istilah Inggris)",
        example: "DPR RI sebagai House of Representatives Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "House of Representatives",
        relatedTerms: ["DPR", "Lower House"]
      },
      {
        id: 237,
        term: "Hubungan Internasional",
        category: "politik-luar-negeri",
        definition: "Hubungan antar negara dalam berbagai bidang",
        example: "Hubungan bilateral Indonesia-Malaysia",
        legalBasis: "UU Hubungan Luar Negeri",
        englishTerm: "International Relations",
        relatedTerms: ["Foreign Relations", "Diplomasi"]
      },
      {
        id: 238,
        term: "Hukum Dasar",
        category: "perundang-undangan",
        definition: "Konstitusi atau undang-undang dasar",
        example: "UUD 1945 sebagai hukum dasar Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Basic Law",
        relatedTerms: ["Konstitusi", "Constitution"]
      },
      {
        id: 239,
        term: "Hukum Tata Negara",
        category: "asas-konstitusi",
        definition: "Cabang ilmu hukum yang mengatur organisasi negara",
        example: "HTN mengatur struktur dan fungsi lembaga negara",
        legalBasis: "Teori Hukum",
        englishTerm: "Constitutional Law",
        relatedTerms: ["HTN", "Staatsrecht"]
      },
      {
        id: 240,
        term: "Hung Parliament",
        category: "sistem-pemerintahan",
        definition: "Parlemen tanpa mayoritas mutlak",
        example: "Tidak ada partai yang meraih mayoritas kursi",
        legalBasis: "Sistem Parlementer",
        englishTerm: "Hung Parliament",
        relatedTerms: ["Parlemen Tergantung", "No Majority"]
      },
      {
        id: 241,
        term: "Ideologi Negara",
        category: "asas-konstitusi",
        definition: "Pandangan hidup atau falsafah negara",
        example: "Pancasila sebagai ideologi negara Indonesia",
        legalBasis: "Pembukaan UUD 1945",
        englishTerm: "State Ideology",
        relatedTerms: ["Pancasila", "National Ideology"]
      },
      {
        id: 242,
        term: "Impeachment",
        category: "sistem-pemerintahan",
        definition: "Proses pemberhentian presiden/wakil presiden",
        example: "Impeachment Presiden karena pelanggaran konstitusi",
        legalBasis: "Pasal 7A-7B UUD 1945",
        englishTerm: "Impeachment",
        relatedTerms: ["Pemakzulan", "Pemberhentian"]
      },
      {
        id: 243,
        term: "Impor Kebijakan",
        category: "kebijakan-negara",
        definition: "Adopsi kebijakan dari negara lain",
        example: "Mengadopsi sistem pemilu dari negara lain",
        legalBasis: "Kebijakan Publik",
        englishTerm: "Policy Import",
        relatedTerms: ["Policy Transfer", "Adopsi Kebijakan"]
      },
      {
        id: 244,
        term: "Independensi Lembaga",
        category: "lembaga-negara",
        definition: "Kemandirian lembaga negara dari intervensi",
        example: "Independensi Bank Indonesia",
        legalBasis: "UU terkait",
        englishTerm: "Institutional Independence",
        relatedTerms: ["Kemandirian", "Autonomy"]
      },
      {
        id: 245,
        term: "Indikator Kinerja",
        category: "pemerintahan",
        definition: "Ukuran keberhasilan penyelenggaraan pemerintahan",
        example: "IKU kementerian dalam SAKIP",
        legalBasis: "Perpres SAKIP",
        englishTerm: "Performance Indicator",
        relatedTerms: ["KPI", "Key Performance Indicator"]
      },
      {
        id: 246,
        term: "Indonesia Raya",
        category: "simbol-negara",
        definition: "Lagu kebangsaan Republik Indonesia",
        example: "Indonesia Raya dinyanyikan pada upacara resmi",
        legalBasis: "UU No. 24/2009",
        englishTerm: "National Anthem",
        relatedTerms: ["Lagu Kebangsaan", "National Song"]
      },
      {
        id: 247,
        term: "Inflasi Legislasi",
        category: "perundang-undangan",
        definition: "Produksi peraturan perundangan yang berlebihan",
        example: "Terlalu banyak UU yang dibuat dalam setahun",
        legalBasis: "Kritik Hukum",
        englishTerm: "Legislative Inflation",
        relatedTerms: ["Hyper-regulation", "Over-legislation"]
      },
      {
        id: 248,
        term: "Inisiatif Rakyat",
        category: "demokrasi",
        definition: "Usulan dari rakyat untuk membuat peraturan",
        example: "Petisi rakyat untuk RUU tertentu",
        legalBasis: "Demokrasi Partisipatif",
        englishTerm: "Popular Initiative",
        relatedTerms: ["Citizens' Initiative", "Inisiatif Warga"]
      },
      {
        id: 249,
        term: "Inkorporasi",
        category: "pemerintahan-daerah",
        definition: "Penggabungan wilayah ke dalam suatu daerah",
        example: "Inkorporasi desa menjadi kelurahan",
        legalBasis: "UU Pemda",
        englishTerm: "Incorporation",
        relatedTerms: ["Penggabungan", "Merger"]
      },
      {
        id: 250,
        term: "Inspektorat Jenderal",
        category: "pemerintahan",
        definition: "Unit pengawasan internal kementerian/lembaga",
        example: "Irjen melakukan audit internal",
        legalBasis: "Perpres Organisasi K/L",
        englishTerm: "Inspectorate General",
        relatedTerms: ["Irjen", "Internal Audit"]
      },
      {
        id: 251,
        term: "Institusi Negara",
        category: "lembaga-negara",
        definition: "Lembaga yang menjalankan fungsi negara",
        example: "DPR, Presiden, MA sebagai institusi negara",
        legalBasis: "UUD 1945",
        englishTerm: "State Institution",
        relatedTerms: ["Lembaga Negara", "State Body"]
      },
      {
        id: 252,
        term: "Instruksi Presiden",
        category: "perundang-undangan",
        definition: "Perintah presiden kepada bawahan untuk melaksanakan kebijakan",
        example: "Inpres tentang percepatan pembangunan",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Presidential Instruction",
        relatedTerms: ["Inpres", "Executive Order"]
      },
      {
        id: 253,
        term: "Integrasi Nasional",
        category: "asas-konstitusi",
        definition: "Penyatuan berbagai kelompok menjadi satu bangsa",
        example: "Bhinneka Tunggal Ika sebagai semboyan integrasi",
        legalBasis: "Pancasila",
        englishTerm: "National Integration",
        relatedTerms: ["Persatuan", "Unity"]
      },
      {
        id: 254,
        term: "Interim Government",
        category: "sistem-pemerintahan",
        definition: "Pemerintahan sementara atau transisi",
        example: "Pemerintah transisi pasca revolusi",
        legalBasis: "Konvensi Ketatanegaraan",
        englishTerm: "Interim Government",
        relatedTerms: ["Pemerintah Sementara", "Transitional Government"]
      },
      {
        id: 255,
        term: "Internal Audit",
        category: "pemerintahan",
        definition: "Pemeriksaan internal dalam organisasi pemerintah",
        example: "APIP melakukan audit internal",
        legalBasis: "PP SPIP",
        englishTerm: "Internal Audit",
        relatedTerms: ["Audit Internal", "Pemeriksaan Internal"]
      },
      {
        id: 256,
        term: "Interpelasi",
        category: "lembaga-negara",
        definition: "Permintaan keterangan DPR kepada pemerintah tentang kebijakan penting",
        example: "DPR mengajukan interpelasi tentang kebijakan subsidi BBM",
        legalBasis: "Pasal 20A UUD 1945",
        englishTerm: "Interpellation",
        relatedTerms: ["Hak Interpelasi", "Parliamentary Question"],
        trending: true
      },
      {
        id: 257,
        term: "Interregnum",
        category: "sistem-pemerintahan",
        definition: "Masa kekosongan kekuasaan atau pemerintahan",
        example: "Periode antara berakhirnya masa jabatan presiden hingga pelantikan presiden baru",
        legalBasis: "Konvensi Ketatanegaraan",
        englishTerm: "Interregnum",
        relatedTerms: ["Kekosongan Kekuasaan", "Power Vacuum"]
      },
      {
        id: 258,
        term: "Investasi Pemerintah",
        category: "pemerintahan",
        definition: "Penanaman modal oleh pemerintah dalam berbagai bentuk",
        example: "Penyertaan modal negara pada BUMN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Government Investment",
        relatedTerms: ["PMN", "State Investment"]
      },
      {
        id: 259,
        term: "Jabatan Fungsional",
        category: "pemerintahan",
        definition: "Jabatan yang berdasarkan keahlian dan keterampilan tertentu",
        example: "Auditor, peneliti, perencana",
        legalBasis: "UU ASN",
        englishTerm: "Functional Position",
        relatedTerms: ["Functional Post", "JF"]
      },
      {
        id: 260,
        term: "Jabatan Politik",
        category: "pemerintahan",
        definition: "Jabatan yang diisi melalui proses politik",
        example: "Menteri, gubernur, bupati",
        legalBasis: "UU ASN",
        englishTerm: "Political Position",
        relatedTerms: ["Political Appointee", "Pejabat Politik"]
      },
      {
        id: 261,
        term: "Jabatan Struktural",
        category: "pemerintahan",
        definition: "Jabatan dalam hierarki organisasi pemerintah",
        example: "Eselon I, II, III, IV",
        legalBasis: "UU ASN",
        englishTerm: "Structural Position",
        relatedTerms: ["Managerial Position", "Eselon"]
      },
      {
        id: 262,
        term: "Jaminan Konstitusional",
        category: "hak-kewajiban",
        definition: "Hak yang dijamin oleh konstitusi",
        example: "Kebebasan beragama dijamin UUD 1945",
        legalBasis: "UUD 1945",
        englishTerm: "Constitutional Guarantee",
        relatedTerms: ["Constitutional Rights", "Hak Konstitusional"]
      },
      {
        id: 263,
        term: "Jaminan Sosial",
        category: "kebijakan-negara",
        definition: "Perlindungan sosial untuk menjamin kebutuhan dasar",
        example: "BPJS Kesehatan dan Ketenagakerjaan",
        legalBasis: "UU SJSN",
        englishTerm: "Social Security",
        relatedTerms: ["Social Protection", "SJSN"]
      },
      {
        id: 264,
        term: "Jangka Menengah",
        category: "kebijakan-negara",
        definition: "Periode perencanaan 5 tahun",
        example: "RPJMN 2020-2024",
        legalBasis: "UU SPPN",
        englishTerm: "Medium Term",
        relatedTerms: ["Five Year Plan", "RPJMN"]
      },
      {
        id: 265,
        term: "Jaring Aspirasi",
        category: "demokrasi",
        definition: "Proses menampung aspirasi masyarakat",
        example: "Reses DPR untuk jaring aspirasi",
        legalBasis: "UU MD3",
        englishTerm: "Aspiration Network",
        relatedTerms: ["Public Input", "Aspirasi Masyarakat"]
      },
      {
        id: 266,
        term: "Jati Diri Bangsa",
        category: "asas-konstitusi",
        definition: "Identitas atau karakter bangsa Indonesia",
        example: "Pancasila sebagai jati diri bangsa",
        legalBasis: "Pancasila",
        englishTerm: "National Identity",
        relatedTerms: ["Identitas Nasional", "National Character"]
      },
      {
        id: 267,
        term: "Judicial Activism",
        category: "kekuasaan-kehakiman",
        definition: "Hakim yang aktif menafsirkan hukum secara progresif",
        example: "MK membatalkan UU yang bertentangan dengan konstitusi",
        legalBasis: "Teori Hukum",
        englishTerm: "Judicial Activism",
        relatedTerms: ["Aktivisme Yudisial", "Progressive Interpretation"]
      },
      {
        id: 268,
        term: "Judicial Restraint",
        category: "kekuasaan-kehakiman",
        definition: "Hakim yang membatasi diri dalam menafsirkan hukum",
        example: "Hakim menghormati kehendak pembuat UU",
        legalBasis: "Teori Hukum",
        englishTerm: "Judicial Restraint",
        relatedTerms: ["Pembatasan Yudisial", "Conservative Interpretation"]
      },
      {
        id: 269,
        term: "Judicial Review",
        category: "kekuasaan-kehakiman",
        definition: "Pengujian peraturan perundangan oleh lembaga peradilan",
        example: "MK menguji UU terhadap UUD 1945",
        legalBasis: "Pasal 24C UUD 1945",
        englishTerm: "Judicial Review",
        relatedTerms: ["Uji Materi", "Constitutional Review"]
      },
      {
        id: 270,
        term: "Junta Militer",
        category: "sistem-pemerintahan",
        definition: "Pemerintahan yang dipimpin kelompok militer",
        example: "Kudeta militer yang membentuk junta",
        legalBasis: "Ilmu Politik",
        englishTerm: "Military Junta",
        relatedTerms: ["Military Government", "Pemerintahan Militer"]
      },
      {
        id: 271,
        term: "Jurisdiksi",
        category: "kekuasaan-kehakiman",
        definition: "Kewenangan mengadili suatu perkara",
        example: "Jurisdiksi MK dalam sengketa pemilu",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Jurisdiction",
        relatedTerms: ["Yurisdiksi", "Kewenangan Mengadili"]
      },
      {
        id: 272,
        term: "Jus Sanguinis",
        category: "kewarganegaraan",
        definition: "Asas kewarganegaraan berdasarkan keturunan",
        example: "Anak WNI otomatis menjadi WNI",
        legalBasis: "UU Kewarganegaraan",
        englishTerm: "Jus Sanguinis",
        relatedTerms: ["Right of Blood", "Asas Keturunan"]
      },
      {
        id: 273,
        term: "Jus Soli",
        category: "kewarganegaraan",
        definition: "Asas kewarganegaraan berdasarkan tempat lahir",
        example: "Lahir di wilayah Indonesia mendapat kewarganegaraan",
        legalBasis: "UU Kewarganegaraan",
        englishTerm: "Jus Soli",
        relatedTerms: ["Right of Soil", "Asas Kelahiran"]
      },
      {
        id: 274,
        term: "Kabinet",
        category: "sistem-pemerintahan",
        definition: "Dewan menteri yang membantu presiden",
        example: "Kabinet Indonesia Maju",
        legalBasis: "Pasal 17 UUD 1945",
        englishTerm: "Cabinet",
        relatedTerms: ["Council of Ministers", "Dewan Menteri"]
      },
      {
        id: 275,
        term: "Kabinet Bayangan",
        category: "sistem-pemerintahan",
        definition: "Tim oposisi yang mengawasi kabinet pemerintah",
        example: "Shadow cabinet di sistem parlementer",
        legalBasis: "Konvensi Parlementer",
        englishTerm: "Shadow Cabinet",
        relatedTerms: ["Opposition Cabinet", "Kabinet Oposisi"]
      },
      {
        id: 276,
        term: "Kabinet Koalisi",
        category: "sistem-pemerintahan",
        definition: "Kabinet yang dibentuk dari beberapa partai politik",
        example: "Koalisi partai pendukung pemerintah",
        legalBasis: "Politik Praktis",
        englishTerm: "Coalition Cabinet",
        relatedTerms: ["Coalition Government", "Pemerintahan Koalisi"]
      },
      {
        id: 277,
        term: "Kabinet Parlementer",
        category: "sistem-pemerintahan",
        definition: "Kabinet yang bertanggung jawab kepada parlemen",
        example: "Kabinet era demokrasi liberal 1950-1959",
        legalBasis: "UUDS 1950",
        englishTerm: "Parliamentary Cabinet",
        relatedTerms: ["Parliamentary Government", "Sistem Parlementer"]
      },
      {
        id: 278,
        term: "Kabinet Presidensial",
        category: "sistem-pemerintahan",
        definition: "Kabinet yang bertanggung jawab kepada presiden",
        example: "Sistem kabinet Indonesia saat ini",
        legalBasis: "UUD 1945",
        englishTerm: "Presidential Cabinet",
        relatedTerms: ["Presidential System", "Sistem Presidensial"]
      },
      {
        id: 279,
        term: "Kabinet Zaken",
        category: "sistem-pemerintahan",
        definition: "Kabinet yang terdiri dari para ahli bukan politisi",
        example: "Kabinet teknokrat",
        legalBasis: "Konvensi Ketatanegaraan",
        englishTerm: "Expert Cabinet",
        relatedTerms: ["Technocratic Cabinet", "Kabinet Ahli"]
      },
      {
        id: 280,
        term: "Kaderisasi",
        category: "partai-politik",
        definition: "Proses pembentukan kader partai atau organisasi",
        example: "Sekolah kader partai politik",
        legalBasis: "UU Parpol",
        englishTerm: "Cadre Formation",
        relatedTerms: ["Cadreization", "Pengkaderan"]
      },
      {
        id: 281,
        term: "Kampanye",
        category: "pemilu",
        definition: "Kegiatan peserta pemilu untuk meyakinkan pemilih",
        example: "Kampanye terbuka calon presiden",
        legalBasis: "UU Pemilu",
        englishTerm: "Campaign",
        relatedTerms: ["Electoral Campaign", "Kampanye Pemilu"]
      },
      {
        id: 282,
        term: "Kampanye Negatif",
        category: "pemilu",
        definition: "Kampanye yang menyerang lawan politik",
        example: "Black campaign saat pemilu",
        legalBasis: "UU Pemilu",
        englishTerm: "Negative Campaign",
        relatedTerms: ["Black Campaign", "Kampanye Hitam"]
      },
      {
        id: 283,
        term: "Kandidat",
        category: "pemilu",
        definition: "Orang yang dicalonkan dalam pemilu",
        example: "Kandidat presiden dan wakil presiden",
        legalBasis: "UU Pemilu",
        englishTerm: "Candidate",
        relatedTerms: ["Calon", "Nominee"]
      },
      {
        id: 284,
        term: "Kartu Suara",
        category: "pemilu",
        definition: "Kertas untuk memberikan suara dalam pemilu",
        example: "Mencoblos kartu suara di TPS",
        legalBasis: "PKPU",
        englishTerm: "Ballot Paper",
        relatedTerms: ["Surat Suara", "Ballot"]
      },
      {
        id: 285,
        term: "Kaukus",
        category: "lembaga-negara",
        definition: "Pertemuan internal partai atau kelompok politik",
        example: "Kaukus fraksi sebelum voting",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Caucus",
        relatedTerms: ["Internal Meeting", "Rapat Internal"]
      },
      {
        id: 286,
        term: "Kawasan Khusus",
        category: "pemerintahan-daerah",
        definition: "Wilayah dengan status atau fungsi khusus",
        example: "Kawasan ekonomi khusus",
        legalBasis: "UU KEK",
        englishTerm: "Special Zone",
        relatedTerms: ["Special Area", "KEK"]
      },
      {
        id: 287,
        term: "Keadaan Bahaya",
        category: "pertahanan-keamanan",
        definition: "Kondisi yang mengancam keselamatan negara",
        example: "Dekrit keadaan bahaya saat krisis",
        legalBasis: "UU Keadaan Bahaya",
        englishTerm: "State of Emergency",
        relatedTerms: ["Emergency State", "Darurat"]
      },
      {
        id: 288,
        term: "Keadaan Darurat",
        category: "pertahanan-keamanan",
        definition: "Situasi luar biasa yang memerlukan tindakan khusus",
        example: "Darurat sipil, darurat militer",
        legalBasis: "Perppu",
        englishTerm: "Emergency",
        relatedTerms: ["State of Emergency", "Krisis"]
      },
      {
        id: 289,
        term: "Keadilan Sosial",
        category: "asas-konstitusi",
        definition: "Sila kelima Pancasila",
        example: "Keadilan sosial bagi seluruh rakyat Indonesia",
        legalBasis: "Pancasila",
        englishTerm: "Social Justice",
        relatedTerms: ["Social Equity", "Keadilan Masyarakat"]
      },
      {
        id: 290,
        term: "Kearifan Lokal",
        category: "pemerintahan-daerah",
        definition: "Nilai-nilai luhur masyarakat setempat",
        example: "Hukum adat sebagai kearifan lokal",
        legalBasis: "UU Desa",
        englishTerm: "Local Wisdom",
        relatedTerms: ["Indigenous Knowledge", "Tradisi Lokal"]
      },
      {
        id: 291,
        term: "Kebijakan Fiskal",
        category: "kebijakan-negara",
        definition: "Kebijakan pemerintah terkait pendapatan dan belanja negara",
        example: "Kebijakan defisit anggaran",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Fiscal Policy",
        relatedTerms: ["Budget Policy", "Kebijakan Anggaran"]
      },
      {
        id: 292,
        term: "Kebijakan Moneter",
        category: "kebijakan-negara",
        definition: "Kebijakan bank sentral mengatur jumlah uang beredar",
        example: "BI menaikkan suku bunga acuan",
        legalBasis: "UU Bank Indonesia",
        englishTerm: "Monetary Policy",
        relatedTerms: ["Money Policy", "Kebijakan Uang"]
      },
      {
        id: 293,
        term: "Kebijakan Publik",
        category: "kebijakan-negara",
        definition: "Keputusan pemerintah untuk mengatasi masalah publik",
        example: "Kebijakan pendidikan gratis",
        legalBasis: "Ilmu Administrasi",
        englishTerm: "Public Policy",
        relatedTerms: ["Government Policy", "Kebijakan Pemerintah"]
      },
      {
        id: 294,
        term: "Kebudayaan Nasional",
        category: "asas-konstitusi",
        definition: "Kebudayaan bangsa Indonesia",
        example: "Bahasa Indonesia sebagai kebudayaan nasional",
        legalBasis: "Pasal 32 UUD 1945",
        englishTerm: "National Culture",
        relatedTerms: ["Indonesian Culture", "Budaya Bangsa"]
      },
      {
        id: 295,
        term: "Kedaulatan",
        category: "asas-konstitusi",
        definition: "Kekuasaan tertinggi dalam suatu negara",
        example: "Kedaulatan berada di tangan rakyat",
        legalBasis: "Pasal 1 ayat (2) UUD 1945",
        englishTerm: "Sovereignty",
        relatedTerms: ["Supreme Power", "Kekuasaan Tertinggi"]
      },
      {
        id: 296,
        term: "Kedaulatan Hukum",
        category: "asas-konstitusi",
        definition: "Supremasi hukum dalam penyelenggaraan negara",
        example: "Indonesia adalah negara hukum",
        legalBasis: "Pasal 1 ayat (3) UUD 1945",
        englishTerm: "Rule of Law",
        relatedTerms: ["Legal Sovereignty", "Supremasi Hukum"]
      },
      {
        id: 297,
        term: "Kedaulatan Rakyat",
        category: "asas-konstitusi",
        definition: "Kekuasaan tertinggi berada di tangan rakyat",
        example: "Pemilu sebagai wujud kedaulatan rakyat",
        legalBasis: "Pasal 1 ayat (2) UUD 1945",
        englishTerm: "Popular Sovereignty",
        relatedTerms: ["People's Sovereignty", "Demokrasi"]
      },
      {
        id: 298,
        term: "Kedudukan Hukum",
        category: "hak-kewajiban",
        definition: "Status seseorang atau badan dalam hukum",
        example: "Kedudukan hukum yang sama di depan hukum",
        legalBasis: "Pasal 27 UUD 1945",
        englishTerm: "Legal Standing",
        relatedTerms: ["Legal Status", "Status Hukum"]
      },
      {
        id: 299,
        term: "Kekayaan Negara",
        category: "pemerintahan",
        definition: "Semua barang yang dimiliki atau dikuasai negara",
        example: "BUMN sebagai kekayaan negara yang dipisahkan",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "State Assets",
        relatedTerms: ["National Wealth", "Aset Negara"]
      },
      {
        id: 300,
        term: "Kekuasaan Eksekutif",
        category: "sistem-pemerintahan",
        definition: "Kekuasaan untuk menjalankan pemerintahan",
        example: "Presiden memegang kekuasaan eksekutif",
        legalBasis: "Pasal 4 UUD 1945",
        englishTerm: "Executive Power",
        relatedTerms: ["Executive Branch", "Cabang Eksekutif"]
      },
      {
        id: 301,
        term: "Kekuasaan Kehakiman",
        category: "kekuasaan-kehakiman",
        definition: "Kekuasaan yang merdeka untuk menyelenggarakan peradilan",
        example: "MA dan MK sebagai pelaku kekuasaan kehakiman",
        legalBasis: "Pasal 24 UUD 1945",
        englishTerm: "Judicial Power",
        relatedTerms: ["Judiciary", "Yudikatif"]
      },
      {
        id: 302,
        term: "Kekuasaan Legislatif",
        category: "lembaga-negara",
        definition: "Kekuasaan membentuk undang-undang",
        example: "DPR memegang kekuasaan legislatif",
        legalBasis: "Pasal 20 UUD 1945",
        englishTerm: "Legislative Power",
        relatedTerms: ["Legislature", "Legislatif"]
      },
      {
        id: 303,
        term: "Kekuasaan Yudikatif",
        category: "kekuasaan-kehakiman",
        definition: "Kekuasaan kehakiman yang merdeka",
        example: "Independensi lembaga peradilan",
        legalBasis: "Pasal 24 UUD 1945",
        englishTerm: "Judicial Branch",
        relatedTerms: ["Judiciary Power", "Kehakiman"]
      },
      {
        id: 304,
        term: "Kelembagaan Negara",
        category: "lembaga-negara",
        definition: "Struktur organisasi penyelenggara negara",
        example: "Reformasi kelembagaan negara",
        legalBasis: "UUD 1945",
        englishTerm: "State Institutions",
        relatedTerms: ["Government Structure", "Struktur Negara"]
      },
      {
        id: 305,
        term: "Kementerian",
        category: "sistem-pemerintahan",
        definition: "Organisasi pemerintah yang menangani urusan tertentu",
        example: "Kementerian Pendidikan dan Kebudayaan",
        legalBasis: "Pasal 17 UUD 1945",
        englishTerm: "Ministry",
        relatedTerms: ["Department", "Departemen"]
      },
      {
        id: 306,
        term: "Kementerian Koordinator",
        category: "sistem-pemerintahan",
        definition: "Kementerian yang mengkoordinasikan beberapa kementerian",
        example: "Kemenko Polhukam",
        legalBasis: "Perpres",
        englishTerm: "Coordinating Ministry",
        relatedTerms: ["Kemenko", "Coordinating Minister"]
      },
      {
        id: 307,
        term: "Kemerdekaan",
        category: "asas-konstitusi",
        definition: "Kebebasan dari penjajahan dan penentuan nasib sendiri",
        example: "17 Agustus 1945 proklamasi kemerdekaan",
        legalBasis: "Pembukaan UUD 1945",
        englishTerm: "Independence",
        relatedTerms: ["Freedom", "Liberty"]
      },
      {
        id: 308,
        term: "Kemerdekaan Berserikat",
        category: "hak-kewajiban",
        definition: "Hak untuk membentuk organisasi",
        example: "Mendirikan serikat pekerja",
        legalBasis: "Pasal 28E UUD 1945",
        englishTerm: "Freedom of Association",
        relatedTerms: ["Association Right", "Hak Berorganisasi"]
      },
      {
        id: 309,
        term: "Kemerdekaan Pers",
        category: "hak-kewajiban",
        definition: "Kebebasan media massa dari sensor",
        example: "Pers bebas memberitakan tanpa tekanan",
        legalBasis: "UU Pers",
        englishTerm: "Press Freedom",
        relatedTerms: ["Media Freedom", "Kebebasan Media"]
      },
      {
        id: 310,
        term: "Kemitraan Strategis",
        category: "politik-luar-negeri",
        definition: "Hubungan kerjasama jangka panjang antar negara",
        example: "Kemitraan strategis Indonesia-China",
        legalBasis: "Politik Luar Negeri",
        englishTerm: "Strategic Partnership",
        relatedTerms: ["Strategic Alliance", "Aliansi Strategis"]
      },
      {
        id: 311,
        term: "Kepala Daerah",
        category: "pemerintahan-daerah",
        definition: "Pimpinan pemerintahan daerah",
        example: "Gubernur, bupati, walikota",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Head",
        relatedTerms: ["Local Leader", "Pemimpin Daerah"]
      },
      {
        id: 312,
        term: "Kepala Negara",
        category: "sistem-pemerintahan",
        definition: "Pimpinan tertinggi suatu negara",
        example: "Presiden sebagai kepala negara Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Head of State",
        relatedTerms: ["State Leader", "Pemimpin Negara"]
      },
      {
        id: 313,
        term: "Kepala Pemerintahan",
        category: "sistem-pemerintahan",
        definition: "Pimpinan eksekutif yang menjalankan pemerintahan",
        example: "Presiden sebagai kepala pemerintahan",
        legalBasis: "Pasal 4 UUD 1945",
        englishTerm: "Head of Government",
        relatedTerms: ["Chief Executive", "Pemimpin Pemerintahan"]
      },
      {
        id: 314,
        term: "Kepemimpinan Nasional",
        category: "sistem-pemerintahan",
        definition: "Pola kepemimpinan dalam konteks kebangsaan",
        example: "Kepemimpinan Pancasila",
        legalBasis: "Pancasila",
        englishTerm: "National Leadership",
        relatedTerms: ["Leadership", "Kepemimpinan"]
      },
      {
        id: 315,
        term: "Kepentingan Umum",
        category: "asas-konstitusi",
        definition: "Kepentingan masyarakat secara keseluruhan",
        example: "Pengadaan tanah untuk kepentingan umum",
        legalBasis: "UU Pengadaan Tanah",
        englishTerm: "Public Interest",
        relatedTerms: ["Common Good", "Kepentingan Publik"]
      },
      {
        id: 316,
        term: "Keputusan Bersama",
        category: "perundang-undangan",
        definition: "Keputusan yang dibuat bersama beberapa lembaga",
        example: "SKB antar menteri",
        legalBasis: "Tata Cara Perundangan",
        englishTerm: "Joint Decision",
        relatedTerms: ["Joint Decree", "SKB"]
      },
      {
        id: 317,
        term: "Keputusan Presiden",
        category: "perundang-undangan",
        definition: "Keputusan yang bersifat penetapan (sudah diganti Perpres)",
        example: "Keppres era sebelum 2004",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Presidential Decree",
        relatedTerms: ["Keppres", "Presidential Decision"]
      },
      {
        id: 318,
        term: "Kerja Sama Daerah",
        category: "pemerintahan-daerah",
        definition: "Kerjasama antar pemerintah daerah",
        example: "Sister city Jakarta-Seoul",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Cooperation",
        relatedTerms: ["Inter-regional Cooperation", "KSD"]
      },
      {
        id: 319,
        term: "Kesatuan Republik Indonesia",
        category: "asas-konstitusi",
        definition: "Bentuk negara Indonesia yang bersatu",
        example: "NKRI harga mati",
        legalBasis: "Pasal 1 ayat (1) UUD 1945",
        englishTerm: "Unitary State of Indonesia",
        relatedTerms: ["NKRI", "Unitary Republic"]
      },
      {
        id: 320,
        term: "Kesejahteraan Umum",
        category: "asas-konstitusi",
        definition: "Tujuan negara untuk mensejahterakan rakyat",
        example: "Program jaminan sosial",
        legalBasis: "Pembukaan UUD 1945",
        englishTerm: "General Welfare",
        relatedTerms: ["Public Welfare", "Kesejahteraan Rakyat"]
      },
      {
        id: 321,
        term: "Ketahanan Nasional",
        category: "pertahanan-keamanan",
        definition: "Kemampuan bangsa menghadapi ancaman",
        example: "Ketahanan ekonomi, politik, sosial",
        legalBasis: "Doktrin Pertahanan",
        englishTerm: "National Resilience",
        relatedTerms: ["National Security", "Tannas"]
      },
      {
        id: 322,
        term: "Ketetapan MPR",
        category: "perundang-undangan",
        definition: "Produk hukum MPR yang bersifat penetapan",
        example: "TAP MPR tentang GBHN (sudah tidak berlaku)",
        legalBasis: "UUD 1945 (sebelum amandemen)",
        englishTerm: "MPR Decree",
        relatedTerms: ["TAP MPR", "MPR Resolution"]
      },
      {
        id: 323,
        term: "Keterbukaan Informasi",
        category: "hak-kewajiban",
        definition: "Transparansi informasi publik",
        example: "Website pemerintah menyediakan data publik",
        legalBasis: "UU KIP",
        englishTerm: "Information Disclosure",
        relatedTerms: ["Transparency", "Transparansi"]
      },
      {
        id: 324,
        term: "Ketua DPR",
        category: "lembaga-negara",
        definition: "Pimpinan tertinggi Dewan Perwakilan Rakyat",
        example: "Ketua DPR memimpin sidang paripurna",
        legalBasis: "UU MD3",
        englishTerm: "Speaker of the House",
        relatedTerms: ["House Speaker", "Pimpinan DPR"]
      },
      {
        id: 325,
        term: "Ketua Mahkamah Agung",
        category: "kekuasaan-kehakiman",
        definition: "Pimpinan tertinggi lembaga peradilan",
        example: "Ketua MA memimpin sidang pleno",
        legalBasis: "UU MA",
        englishTerm: "Chief Justice",
        relatedTerms: ["Supreme Court Chief", "Ketua MA"]
      },
      {
        id: 326,
        term: "Ketua Mahkamah Konstitusi",
        category: "kekuasaan-kehakiman",
        definition: "Pimpinan MK yang dipilih dari dan oleh hakim konstitusi",
        example: "Ketua MK memimpin sidang pengujian UU",
        legalBasis: "UU MK",
        englishTerm: "Constitutional Court Chief",
        relatedTerms: ["Chief Constitutional Justice", "Ketua MK"]
      },
      {
        id: 327,
        term: "Ketua MPR",
        category: "lembaga-negara",
        definition: "Pimpinan Majelis Permusyawaratan Rakyat",
        example: "Ketua MPR memimpin sidang tahunan",
        legalBasis: "UU MD3",
        englishTerm: "MPR Chairman",
        relatedTerms: ["Assembly Speaker", "Pimpinan MPR"]
      },
      {
        id: 328,
        term: "Keuangan Daerah",
        category: "pemerintahan-daerah",
        definition: "Hak dan kewajiban daerah dalam bentuk uang/barang",
        example: "APBD sebagai wujud keuangan daerah",
        legalBasis: "UU Keuangan Daerah",
        englishTerm: "Regional Finance",
        relatedTerms: ["Local Finance", "APBD"]
      },
      {
        id: 329,
        term: "Keuangan Negara",
        category: "pemerintahan",
        definition: "Semua hak dan kewajiban negara yang dapat dinilai dengan uang",
        example: "APBN sebagai rencana keuangan negara",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "State Finance",
        relatedTerms: ["Public Finance", "APBN"]
      },
      {
        id: 330,
        term: "Kewarganegaraan",
        category: "kewarganegaraan",
        definition: "Status sebagai anggota suatu negara",
        example: "WNI dan WNA",
        legalBasis: "UU Kewarganegaraan",
        englishTerm: "Citizenship",
        relatedTerms: ["Nationality", "Status Warga"]
      },
      {
        id: 331,
        term: "Kewarganegaraan Ganda",
        category: "kewarganegaraan",
        definition: "Memiliki kewarganegaraan dua negara",
        example: "Anak dari perkawinan campuran",
        legalBasis: "UU Kewarganegaraan",
        englishTerm: "Dual Citizenship",
        relatedTerms: ["Double Nationality", "Dwi Kewarganegaraan"]
      },
      {
        id: 332,
        term: "Kewenangan Atributif",
        category: "pemerintahan",
        definition: "Kewenangan yang diberikan langsung oleh peraturan",
        example: "Kewenangan presiden dari UUD",
        legalBasis: "UU Administrasi Pemerintahan",
        englishTerm: "Attributive Authority",
        relatedTerms: ["Original Authority", "Kewenangan Asli"]
      },
      {
        id: 333,
        term: "Kewenangan Delegatif",
        category: "pemerintahan",
        definition: "Kewenangan yang dilimpahkan dari pejabat lain",
        example: "Menteri melimpahkan wewenang ke dirjen",
        legalBasis: "UU Administrasi Pemerintahan",
        englishTerm: "Delegated Authority",
        relatedTerms: ["Delegated Power", "Pelimpahan Wewenang"]
      },
      {
        id: 334,
        term: "Kewenangan Mandat",
        category: "pemerintahan",
        definition: "Kewenangan yang diberikan atasan kepada bawahan",
        example: "Direktur memberi mandat kepada manager",
        legalBasis: "UU Administrasi Pemerintahan",
        englishTerm: "Mandated Authority",
        relatedTerms: ["Mandate", "Pemberian Mandat"]
      },
      {
        id: 335,
        term: "Kewenangan Residual",
        category: "pemerintahan-daerah",
        definition: "Kewenangan sisa yang menjadi urusan pemerintah pusat",
        example: "Politik luar negeri, pertahanan, moneter",
        legalBasis: "UU Pemda",
        englishTerm: "Residual Power",
        relatedTerms: ["Remaining Authority", "Sisa Kewenangan"]
      },
      {
        id: 336,
        term: "Kinerja Pemerintah",
        category: "pemerintahan",
        definition: "Hasil kerja pemerintah dalam periode tertentu",
        example: "Evaluasi kinerja 100 hari kabinet",
        legalBasis: "Perpres SAKIP",
        englishTerm: "Government Performance",
        relatedTerms: ["Performance", "Capaian Kinerja"]
      },
      {
        id: 337,
        term: "Koalisi",
        category: "partai-politik",
        definition: "Gabungan beberapa partai untuk tujuan politik",
        example: "Koalisi pemerintahan vs koalisi oposisi",
        legalBasis: "Politik Praktis",
        englishTerm: "Coalition",
        relatedTerms: ["Alliance", "Aliansi"]
      },
      {
        id: 338,
        term: "Koalisi Permanen",
        category: "partai-politik",
        definition: "Koalisi yang bertahan dalam jangka panjang",
        example: "Koalisi partai dalam pemerintahan",
        legalBasis: "Konvensi Politik",
        englishTerm: "Permanent Coalition",
        relatedTerms: ["Stable Coalition", "Koalisi Tetap"]
      },
      {
        id: 339,
        term: "Koalisi Taktis",
        category: "partai-politik",
        definition: "Koalisi sementara untuk tujuan tertentu",
        example: "Koalisi untuk meloloskan RUU tertentu",
        legalBasis: "Politik Praktis",
        englishTerm: "Tactical Coalition",
        relatedTerms: ["Temporary Alliance", "Koalisi Sementara"]
      },
      {
        id: 340,
        term: "Kode Etik",
        category: "lembaga-negara",
        definition: "Pedoman perilaku bagi penyelenggara negara",
        example: "Kode etik DPR, kode etik hakim",
        legalBasis: "Peraturan Internal",
        englishTerm: "Code of Ethics",
        relatedTerms: ["Ethical Code", "Etika"]
      },
      {
        id: 341,
        term: "Kolusi",
        category: "pemerintahan",
        definition: "Kerjasama rahasia untuk tujuan tidak baik",
        example: "Kolusi dalam tender proyek",
        legalBasis: "UU KKN",
        englishTerm: "Collusion",
        relatedTerms: ["Secret Cooperation", "Persekongkolan"]
      },
      {
        id: 342,
        term: "Komisi",
        category: "lembaga-negara",
        definition: "Alat kelengkapan DPR atau lembaga independen",
        example: "Komisi I DPR, KPU, KPK",
        legalBasis: "UU terkait",
        englishTerm: "Commission",
        relatedTerms: ["Committee", "Badan"]
      },
      {
        id: 343,
        term: "Komisi Independen",
        category: "lembaga-negara",
        definition: "Lembaga negara yang bebas dari pengaruh",
        example: "KPK, KPU, Komnas HAM",
        legalBasis: "UU pembentukan",
        englishTerm: "Independent Commission",
        relatedTerms: ["Autonomous Body", "Lembaga Independen"]
      },
      {
        id: 344,
        term: "Komisi Negara",
        category: "lembaga-negara",
        definition: "Lembaga yang dibentuk untuk fungsi tertentu",
        example: "Komisi Yudisial, Komisi Kejaksaan",
        legalBasis: "UUD 1945 dan UU",
        englishTerm: "State Commission",
        relatedTerms: ["National Commission", "Komisi Nasional"]
      },
      {
        id: 345,
        term: "Komisi Pemilihan Umum",
        category: "lembaga-negara",
        definition: "Penyelenggara pemilu yang bersifat tetap",
        example: "KPU menyelenggarakan pemilu 2024",
        legalBasis: "UU Pemilu",
        englishTerm: "Election Commission",
        relatedTerms: ["KPU", "Electoral Commission"]
      },
      {
        id: 346,
        term: "Komitmen Politik",
        category: "politik",
        definition: "Kesepakatan atau janji politik",
        example: "Komitmen koalisi untuk mendukung program",
        legalBasis: "Konvensi Politik",
        englishTerm: "Political Commitment",
        relatedTerms: ["Political Promise", "Janji Politik"]
      },
      {
        id: 347,
        term: "Komnas HAM",
        category: "lembaga-negara",
        definition: "Komisi Nasional Hak Asasi Manusia",
        example: "Komnas HAM menyelidiki pelanggaran HAM",
        legalBasis: "UU HAM",
        englishTerm: "National Human Rights Commission",
        relatedTerms: ["Human Rights Commission", "Komisi HAM"]
      },
      {
        id: 348,
        term: "Kompetensi Absolut",
        category: "kekuasaan-kehakiman",
        definition: "Kewenangan mengadili berdasarkan jenis perkara",
        example: "MK berwenang menguji UU",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Absolute Competence",
        relatedTerms: ["Subject Matter Jurisdiction", "Kewenangan Mutlak"]
      },
      {
        id: 349,
        term: "Kompetensi Relatif",
        category: "kekuasaan-kehakiman",
        definition: "Kewenangan mengadili berdasarkan wilayah",
        example: "Pengadilan Jakarta mengadili perkara di Jakarta",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Relative Competence",
        relatedTerms: ["Territorial Jurisdiction", "Kewenangan Wilayah"]
      },
      {
        id: 350,
        term: "Komponen Bangsa",
        category: "asas-konstitusi",
        definition: "Unsur-unsur pembentuk bangsa Indonesia",
        example: "Suku, agama, ras, golongan",
        legalBasis: "Pancasila",
        englishTerm: "National Components",
        relatedTerms: ["Nation Elements", "Elemen Bangsa"]
      },
      {
        id: 351,
        term: "Konfederasi",
        category: "sistem-pemerintahan",
        definition: "Persekutuan negara-negara berdaulat",
        example: "Uni Eropa sebagai bentuk konfederasi",
        legalBasis: "Ilmu Negara",
        englishTerm: "Confederation",
        relatedTerms: ["Confederacy", "Persekutuan"]
      },
      {
        id: 352,
        term: "Konflik Kepentingan",
        category: "pemerintahan",
        definition: "Pertentangan antara kepentingan pribadi dan publik",
        example: "Pejabat memiliki saham di perusahaan yang diawasi",
        legalBasis: "UU Administrasi Pemerintahan",
        englishTerm: "Conflict of Interest",
        relatedTerms: ["Interest Conflict", "Benturan Kepentingan"]
      },
      {
        id: 353,
        term: "Kongres",
        category: "partai-politik",
        definition: "Pertemuan tertinggi organisasi politik",
        example: "Kongres partai untuk memilih ketua umum",
        legalBasis: "AD/ART Partai",
        englishTerm: "Congress",
        relatedTerms: ["Convention", "Muktamar"]
      },
      {
        id: 354,
        term: "Konservasi",
        category: "kebijakan-negara",
        definition: "Pelestarian sumber daya alam",
        example: "Konservasi hutan lindung",
        legalBasis: "UU Konservasi",
        englishTerm: "Conservation",
        relatedTerms: ["Preservation", "Pelestarian"]
      },
      {
        id: 355,
        term: "Konsolidasi Demokrasi",
        category: "demokrasi",
        definition: "Penguatan sistem demokrasi",
        example: "Reformasi sebagai konsolidasi demokrasi",
        legalBasis: "Teori Politik",
        englishTerm: "Democratic Consolidation",
        relatedTerms: ["Democracy Strengthening", "Penguatan Demokrasi"]
      },
      {
        id: 356,
        term: "Konstituante",
        category: "sistem-pemerintahan",
        definition: "Badan pembuat konstitusi",
        example: "Konstituante 1955-1959",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "Constituent Assembly",
        relatedTerms: ["Constitution Maker", "Pembuat UUD"]
      },
      {
        id: 357,
        term: "Konstitusi",
        category: "perundang-undangan",
        definition: "Hukum dasar tertulis suatu negara",
        example: "UUD 1945 sebagai konstitusi Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Constitution",
        relatedTerms: ["Basic Law", "UUD"]
      },
      {
        id: 358,
        term: "Konstitusi Tertulis",
        category: "perundang-undangan",
        definition: "Konstitusi yang dituangkan dalam dokumen",
        example: "UUD 1945 sebagai konstitusi tertulis",
        legalBasis: "UUD 1945",
        englishTerm: "Written Constitution",
        relatedTerms: ["Codified Constitution", "UUD Tertulis"]
      },
      {
        id: 359,
        term: "Konstitusionalisme",
        category: "asas-konstitusi",
        definition: "Paham pembatasan kekuasaan negara",
        example: "Check and balances antar lembaga negara",
        legalBasis: "Teori Konstitusi",
        englishTerm: "Constitutionalism",
        relatedTerms: ["Constitutional Government", "Pemerintahan Konstitusional"]
      },
      {
        id: 360,
        term: "Konsul",
        category: "politik-luar-negeri",
        definition: "Perwakilan negara untuk urusan non-politik",
        example: "Konsul membantu WNI di luar negeri",
        legalBasis: "Konvensi Wina",
        englishTerm: "Consul",
        relatedTerms: ["Consulate", "Konsulat"]
      },
      {
        id: 361,
        term: "Konsultasi Publik",
        category: "demokrasi",
        definition: "Dialog pemerintah dengan masyarakat",
        example: "Konsultasi publik RUU kontroversial",
        legalBasis: "UU Keterbukaan Informasi",
        englishTerm: "Public Consultation",
        relatedTerms: ["Public Hearing", "Dialog Publik"]
      },
      {
        id: 362,
        term: "Kontrak Politik",
        category: "partai-politik",
        definition: "Perjanjian politik antar pihak",
        example: "Kontrak politik calon dengan pemilih",
        legalBasis: "Etika Politik",
        englishTerm: "Political Contract",
        relatedTerms: ["Political Agreement", "Perjanjian Politik"]
      },
      {
        id: 363,
        term: "Kontrak Sosial",
        category: "asas-konstitusi",
        definition: "Kesepakatan warga dengan negara",
        example: "Konstitusi sebagai kontrak sosial",
        legalBasis: "Teori Negara",
        englishTerm: "Social Contract",
        relatedTerms: ["Social Agreement", "Perjanjian Sosial"]
      },
      {
        id: 364,
        term: "Kontrol Politik",
        category: "lembaga-negara",
        definition: "Pengawasan terhadap jalannya pemerintahan",
        example: "DPR mengontrol kebijakan pemerintah",
        legalBasis: "UUD 1945",
        englishTerm: "Political Control",
        relatedTerms: ["Political Oversight", "Pengawasan Politik"]
      },
      {
        id: 365,
        term: "Kontrol Sosial",
        category: "demokrasi",
        definition: "Pengawasan masyarakat terhadap penyelenggara negara",
        example: "Media massa sebagai kontrol sosial",
        legalBasis: "Demokrasi",
        englishTerm: "Social Control",
        relatedTerms: ["Public Oversight", "Pengawasan Masyarakat"]
      },
      {
        id: 366,
        term: "Konvensi",
        category: "perundang-undangan",
        definition: "Kebiasaan ketatanegaraan yang diterima",
        example: "Pidato kenegaraan presiden",
        legalBasis: "Praktik Ketatanegaraan",
        englishTerm: "Convention",
        relatedTerms: ["Constitutional Convention", "Kebiasaan Ketatanegaraan"]
      },
      {
        id: 367,
        term: "Konvensi Internasional",
        category: "politik-luar-negeri",
        definition: "Perjanjian multilateral antar negara",
        example: "Konvensi Jenewa, Konvensi Wina",
        legalBasis: "Hukum Internasional",
        englishTerm: "International Convention",
        relatedTerms: ["Treaty", "Traktat"]
      },
      {
        id: 368,
        term: "Koordinasi",
        category: "pemerintahan",
        definition: "Pengaturan kerjasama antar lembaga",
        example: "Koordinasi antar kementerian",
        legalBasis: "Tata Kerja Pemerintahan",
        englishTerm: "Coordination",
        relatedTerms: ["Cooperation", "Kerjasama"]
      },
      {
        id: 369,
        term: "Korupsi",
        category: "pemerintahan",
        definition: "Penyalahgunaan kekuasaan untuk keuntungan pribadi",
        example: "Suap, mark up anggaran",
        legalBasis: "UU Tipikor",
        englishTerm: "Corruption",
        relatedTerms: ["Graft", "KKN"]
      },
      {
        id: 370,
        term: "Kotak Suara",
        category: "pemilu",
        definition: "Tempat memasukkan surat suara",
        example: "Kotak suara transparan di TPS",
        legalBasis: "PKPU",
        englishTerm: "Ballot Box",
        relatedTerms: ["Voting Box", "Tempat Suara"]
      },
      {
        id: 371,
        term: "Krisis Konstitusional",
        category: "sistem-pemerintahan",
        definition: "Situasi ketika konstitusi tidak dapat berfungsi normal",
        example: "Konflik antar lembaga negara",
        legalBasis: "Teori Konstitusi",
        englishTerm: "Constitutional Crisis",
        relatedTerms: ["Constitutional Breakdown", "Krisis Ketatanegaraan"]
      },
      {
        id: 372,
        term: "Krisis Politik",
        category: "sistem-pemerintahan",
        definition: "Ketidakstabilan sistem politik",
        example: "Jatuh bangun kabinet era demokrasi liberal",
        legalBasis: "Ilmu Politik",
        englishTerm: "Political Crisis",
        relatedTerms: ["Political Instability", "Instabilitas Politik"]
      },
      {
        id: 373,
        term: "Kuorum",
        category: "lembaga-negara",
        definition: "Jumlah minimum anggota untuk sahnya rapat",
        example: "Kuorum sidang DPR minimal 50% plus satu",
        legalBasis: "Tata Tertib",
        englishTerm: "Quorum",
        relatedTerms: ["Minimum Attendance", "Jumlah Minimal"]
      },
      {
        id: 374,
        term: "Kursus Singkat",
        category: "lembaga-negara",
        definition: "Pelatihan singkat untuk anggota legislatif baru",
        example: "Orientasi anggota DPR periode baru",
        legalBasis: "Program DPR",
        englishTerm: "Short Course",
        relatedTerms: ["Orientation", "Orientasi"]
      },
      {
        id: 375,
        term: "Lame Duck",
        category: "sistem-pemerintahan",
        definition: "Pejabat yang akan segera berakhir masa jabatannya",
        example: "Presiden di akhir masa jabatan kedua",
        legalBasis: "Istilah Politik",
        englishTerm: "Lame Duck",
        relatedTerms: ["Outgoing Official", "Pejabat Akhir Masa"]
      },
      {
        id: 376,
        term: "Landasan Hukum",
        category: "perundang-undangan",
        definition: "Dasar hukum suatu tindakan atau kebijakan",
        example: "UUD 1945 sebagai landasan hukum tertinggi",
        legalBasis: "Hierarki Perundangan",
        englishTerm: "Legal Basis",
        relatedTerms: ["Legal Foundation", "Dasar Hukum"]
      },
      {
        id: 377,
        term: "Laporan Keterangan Pertanggungjawaban",
        category: "lembaga-negara",
        definition: "Laporan pertanggungjawaban pejabat negara",
        example: "LKPJ gubernur ke DPRD",
        legalBasis: "UU Pemda",
        englishTerm: "Accountability Report",
        relatedTerms: ["LKPJ", "Progress Report"]
      },
      {
        id: 378,
        term: "Law Enforcement",
        category: "pemerintahan",
        definition: "Penegakan hukum",
        example: "Penegakan hukum tanpa pandang bulu",
        legalBasis: "Sistem Hukum",
        englishTerm: "Law Enforcement",
        relatedTerms: ["Penegakan Hukum", "Legal Enforcement"]
      },
      {
        id: 379,
        term: "Legal Drafting",
        category: "perundang-undangan",
        definition: "Penyusunan peraturan perundangan",
        example: "Tim legal drafting RUU",
        legalBasis: "UU Pembentukan Peraturan",
        englishTerm: "Legal Drafting",
        relatedTerms: ["Perancangan Peraturan", "Legislative Drafting"]
      },
      {
        id: 380,
        term: "Legal Standing",
        category: "kekuasaan-kehakiman",
        definition: "Kedudukan hukum untuk mengajukan perkara",
        example: "Legal standing pemohon di MK",
        legalBasis: "UU MK",
        englishTerm: "Legal Standing",
        relatedTerms: ["Kedudukan Hukum", "Standing to Sue"]
      },
      {
        id: 381,
        term: "Legislasi",
        category: "lembaga-negara",
        definition: "Proses pembentukan undang-undang",
        example: "Proses legislasi di DPR",
        legalBasis: "UU Pembentukan Peraturan",
        englishTerm: "Legislation",
        relatedTerms: ["Lawmaking", "Pembentukan UU"]
      },
      {
        id: 382,
        term: "Legislative Review",
        category: "lembaga-negara",
        definition: "Peninjauan kembali undang-undang oleh pembuat UU",
        example: "DPR meninjau kembali UU yang sudah usang",
        legalBasis: "Fungsi Legislasi DPR",
        englishTerm: "Legislative Review",
        relatedTerms: ["Law Review", "Peninjauan UU"]
      },
      {
        id: 383,
        term: "Legitimasi",
        category: "sistem-pemerintahan",
        definition: "Pengakuan keabsahan kekuasaan",
        example: "Legitimasi pemerintah dari pemilu",
        legalBasis: "Teori Politik",
        englishTerm: "Legitimacy",
        relatedTerms: ["Legitimation", "Keabsahan"]
      },
      {
        id: 384,
        term: "Lembaga Bantuan Hukum",
        category: "hak-kewajiban",
        definition: "Organisasi pemberi bantuan hukum",
        example: "LBH memberikan bantuan hukum gratis",
        legalBasis: "UU Bantuan Hukum",
        englishTerm: "Legal Aid Institute",
        relatedTerms: ["LBH", "Legal Aid Organization"]
      },
      {
        id: 385,
        term: "Lembaga Eksekutif",
        category: "sistem-pemerintahan",
        definition: "Lembaga pelaksana pemerintahan",
        example: "Presiden dan jajaran menteri",
        legalBasis: "UUD 1945",
        englishTerm: "Executive Branch",
        relatedTerms: ["Executive", "Eksekutif"]
      },
      {
        id: 386,
        term: "Lembaga Legislatif",
        category: "lembaga-negara",
        definition: "Lembaga pembuat undang-undang",
        example: "DPR, DPD, DPRD",
        legalBasis: "UUD 1945",
        englishTerm: "Legislative Branch",
        relatedTerms: ["Legislature", "Legislatif"]
      },
      {
        id: 387,
        term: "Lembaga Negara",
        category: "lembaga-negara",
        definition: "Organisasi yang menjalankan fungsi negara",
        example: "Presiden, DPR, MA, MK, BPK",
        legalBasis: "UUD 1945",
        englishTerm: "State Institution",
        relatedTerms: ["State Organ", "Organ Negara"]
      },
      {
        id: 388,
        term: "Lembaga Negara Independen",
        category: "lembaga-negara",
        definition: "Lembaga negara yang bebas dari pengaruh",
        example: "Bank Indonesia, KPK, KPU",
        legalBasis: "UU Pembentukan",
        englishTerm: "Independent State Agency",
        relatedTerms: ["Independent Body", "Lembaga Independen"]
      },
      {
        id: 389,
        term: "Lembaga Non-Struktural",
        category: "lembaga-negara",
        definition: "Lembaga di luar struktur pemerintahan utama",
        example: "KPK, Komnas HAM, LPSK",
        legalBasis: "UU Pembentukan",
        englishTerm: "Non-Structural Institution",
        relatedTerms: ["LNS", "Auxiliary Body"]
      },
      {
        id: 390,
        term: "Lembaga Pemasyarakatan",
        category: "pemerintahan",
        definition: "Tempat pembinaan narapidana",
        example: "Lapas sebagai bagian sistem pemasyarakatan",
        legalBasis: "UU Pemasyarakatan",
        englishTerm: "Correctional Institution",
        relatedTerms: ["Prison", "Lapas"]
      },
      {
        id: 391,
        term: "Lembaga Swadaya Masyarakat",
        category: "demokrasi",
        definition: "Organisasi non-pemerintah untuk kepentingan masyarakat",
        example: "LSM lingkungan, HAM, anti korupsi",
        legalBasis: "UU Ormas",
        englishTerm: "Non-Governmental Organization",
        relatedTerms: ["NGO", "LSM"]
      },
      {
        id: 392,
        term: "Lembaga Yudikatif",
        category: "kekuasaan-kehakiman",
        definition: "Lembaga pemegang kekuasaan kehakiman",
        example: "MA, MK, KY",
        legalBasis: "Pasal 24 UUD 1945",
        englishTerm: "Judicial Branch",
        relatedTerms: ["Judiciary", "Kehakiman"]
      },
      {
        id: 393,
        term: "Liberal Democracy",
        category: "demokrasi",
        definition: "Demokrasi yang menekankan kebebasan individu",
        example: "Demokrasi liberal era 1950-an",
        legalBasis: "Teori Politik",
        englishTerm: "Liberal Democracy",
        relatedTerms: ["Demokrasi Liberal", "Freedom Democracy"]
      },
      {
        id: 394,
        term: "Liberalisasi Politik",
        category: "sistem-pemerintahan",
        definition: "Pembukaan ruang kebebasan politik",
        example: "Kebebasan pers era reformasi",
        legalBasis: "Reformasi",
        englishTerm: "Political Liberalization",
        relatedTerms: ["Political Opening", "Keterbukaan Politik"]
      },
      {
        id: 395,
        term: "Lingkungan Hidup",
        category: "kebijakan-negara",
        definition: "Kesatuan ruang dengan semua benda dan makhluk hidup",
        example: "Perlindungan dan pengelolaan lingkungan hidup",
        legalBasis: "UU PPLH",
        englishTerm: "Environment",
        relatedTerms: ["Ecosystem", "Ekosistem"]
      },
      {
        id: 396,
        term: "Lobbying",
        category: "proses-legislasi",
        definition: "Upaya mempengaruhi pembuat kebijakan",
        example: "Lobi untuk meloloskan RUU",
        legalBasis: "Praktik Politik",
        englishTerm: "Lobbying",
        relatedTerms: ["Political Lobbying", "Lobi Politik"]
      },
      {
        id: 397,
        term: "Local Government",
        category: "pemerintahan-daerah",
        definition: "Pemerintahan daerah",
        example: "Pemda provinsi, kabupaten, kota",
        legalBasis: "UU Pemda",
        englishTerm: "Local Government",
        relatedTerms: ["Pemerintah Daerah", "Pemda"]
      },
      {
        id: 398,
        term: "Loyalitas Politik",
        category: "partai-politik",
        definition: "Kesetiaan terhadap partai atau pemimpin politik",
        example: "Loyalitas anggota terhadap partai",
        legalBasis: "Etika Politik",
        englishTerm: "Political Loyalty",
        relatedTerms: ["Party Loyalty", "Kesetiaan Politik"]
      },
      {
        id: 399,
        term: "Majelis Permusyawaratan Rakyat",
        category: "lembaga-negara",
        definition: "Lembaga tertinggi negara sebelum amandemen UUD",
        example: "MPR terdiri dari anggota DPR dan DPD",
        legalBasis: "Pasal 2 UUD 1945",
        englishTerm: "People's Consultative Assembly",
        relatedTerms: ["MPR", "Assembly"]
      },
      {
        id: 400,
        term: "Majelis Permusyawaratan Rakyat Sementara",
        category: "lembaga-negara",
        definition: "MPR pada masa demokrasi terpimpin",
        example: "MPRS era Soekarno",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "Provisional People's Consultative Assembly",
        relatedTerms: ["MPRS", "Provisional MPR"]
      },
      {
        id: 401,
        term: "Majority Rule",
        category: "demokrasi",
        definition: "Kekuasaan berdasarkan suara mayoritas",
        example: "Keputusan voting berdasarkan suara terbanyak",
        legalBasis: "Prinsip Demokrasi",
        englishTerm: "Majority Rule",
        relatedTerms: ["Kekuasaan Mayoritas", "Suara Terbanyak"]
      },
      {
        id: 402,
        term: "Makar",
        category: "pertahanan-keamanan",
        definition: "Upaya menggulingkan pemerintah yang sah",
        example: "Percobaan kudeta terhadap pemerintah",
        legalBasis: "KUHP",
        englishTerm: "Treason",
        relatedTerms: ["Pengkhianatan", "Subversi"]
      },
      {
        id: 403,
        term: "Mandate",
        category: "sistem-pemerintahan",
        definition: "Perintah atau kewenangan dari rakyat",
        example: "Mandat rakyat melalui pemilu",
        legalBasis: "Teori Demokrasi",
        englishTerm: "Mandate",
        relatedTerms: ["Amanat", "Authority"]
      },
      {
        id: 404,
        term: "Manifesto Politik",
        category: "partai-politik",
        definition: "Pernyataan terbuka tentang prinsip dan tujuan politik",
        example: "Manifesto partai untuk pemilu",
        legalBasis: "Kampanye Politik",
        englishTerm: "Political Manifesto",
        relatedTerms: ["Platform Politik", "Political Platform"]
      },
      {
        id: 405,
        term: "Masa Bhakti",
        category: "lembaga-negara",
        definition: "Periode tugas atau jabatan",
        example: "Masa bhakti DPR 5 tahun",
        legalBasis: "UUD 1945",
        englishTerm: "Term of Office",
        relatedTerms: ["Masa Jabatan", "Periode"]
      },
      {
        id: 406,
        term: "Masa Jabatan",
        category: "sistem-pemerintahan",
        definition: "Periode waktu menjabat",
        example: "Masa jabatan presiden 5 tahun",
        legalBasis: "UUD 1945",
        englishTerm: "Term",
        relatedTerms: ["Tenure", "Periode Jabatan"]
      },
      {
        id: 407,
        term: "Masa Reses",
        category: "lembaga-negara",
        definition: "Masa libur DPR untuk kunjungan daerah pemilihan",
        example: "Reses DPR untuk serap aspirasi",
        legalBasis: "UU MD3",
        englishTerm: "Recess Period",
        relatedTerms: ["Parliamentary Recess", "Masa Kunjungan"]
      },
      {
        id: 408,
        term: "Masa Sidang",
        category: "lembaga-negara",
        definition: "Periode DPR melakukan persidangan",
        example: "Masa sidang I, II, III, IV dalam setahun",
        legalBasis: "UU MD3",
        englishTerm: "Session Period",
        relatedTerms: ["Parliamentary Session", "Periode Sidang"]
      },
      {
        id: 409,
        term: "Masa Transisi",
        category: "sistem-pemerintahan",
        definition: "Periode peralihan kekuasaan",
        example: "Transisi dari Orde Baru ke Reformasi",
        legalBasis: "Sejarah Politik",
        englishTerm: "Transition Period",
        relatedTerms: ["Transitional Phase", "Peralihan"]
      },
      {
        id: 410,
        term: "Masyarakat Adat",
        category: "hak-kewajiban",
        definition: "Kelompok masyarakat dengan hukum adat",
        example: "Masyarakat adat Papua, Bali",
        legalBasis: "UUD 1945 Pasal 18B",
        englishTerm: "Indigenous Community",
        relatedTerms: ["Adat Community", "Komunitas Adat"]
      },
      {
        id: 411,
        term: "Masyarakat Madani",
        category: "demokrasi",
        definition: "Masyarakat yang beradab dan demokratis",
        example: "Civil society yang kuat dan mandiri",
        legalBasis: "Teori Demokrasi",
        englishTerm: "Civil Society",
        relatedTerms: ["Masyarakat Sipil", "Democratic Society"]
      },
      {
        id: 412,
        term: "Materi Muatan",
        category: "perundang-undangan",
        definition: "Isi yang harus diatur dalam peraturan",
        example: "Materi muatan UUD, UU, PP",
        legalBasis: "UU Pembentukan Peraturan",
        englishTerm: "Content Material",
        relatedTerms: ["Substance", "Substansi"]
      },
      {
        id: 413,
        term: "Mayoritas Absolut",
        category: "lembaga-negara",
        definition: "Lebih dari 50% suara",
        example: "Partai meraih mayoritas absolut di parlemen",
        legalBasis: "Sistem Pemilu",
        englishTerm: "Absolute Majority",
        relatedTerms: ["Simple Majority", "Mayoritas Mutlak"]
      },
      {
        id: 414,
        term: "Mayoritas Kualified",
        category: "lembaga-negara",
        definition: "Mayoritas dengan syarat khusus (2/3, 3/4)",
        example: "Amandemen UUD perlu 2/3 suara MPR",
        legalBasis: "Pasal 37 UUD 1945",
        englishTerm: "Qualified Majority",
        relatedTerms: ["Super Majority", "Mayoritas Khusus"]
      },
      {
        id: 415,
        term: "Mayoritas Relatif",
        category: "lembaga-negara",
        definition: "Suara terbanyak tanpa harus lebih dari 50%",
        example: "Menang dengan suara terbanyak",
        legalBasis: "Sistem Pemilu",
        englishTerm: "Relative Majority",
        relatedTerms: ["Plurality", "Suara Terbanyak"]
      },
      {
        id: 416,
        term: "Mayoritas Sederhana",
        category: "lembaga-negara",
        definition: "Lebih dari setengah yang hadir",
        example: "Keputusan dengan suara mayoritas sederhana",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Simple Majority",
        relatedTerms: ["Voting", "Quorum"]
      },
      {
        id: 417,
        term: "Mandat Rakyat",
        category: "sistem-pemerintahan",
        definition: "Kewenangan yang diberikan rakyat melalui pemilu",
        example: "Presiden menjalankan mandat rakyat",
        legalBasis: "UUD 1945",
        englishTerm: "People's Mandate",
        relatedTerms: ["Kedaulatan Rakyat", "Legitimasi"]
      },
      {
        id: 418,
        term: "Masa Jabatan",
        category: "lembaga-negara",
        definition: "Periode waktu menjabat suatu posisi",
        example: "Masa jabatan presiden 5 tahun",
        legalBasis: "UUD 1945",
        englishTerm: "Term of Office",
        relatedTerms: ["Periode", "Tenure"]
      },
      {
        id: 419,
        term: "Masa Reses",
        category: "lembaga-negara",
        definition: "Masa tidak bersidang DPR",
        example: "DPR memasuki masa reses",
        legalBasis: "UU MD3",
        englishTerm: "Recess Period",
        relatedTerms: ["Libur Sidang", "Break"]
      },
      {
        id: 420,
        term: "Masa Sidang",
        category: "lembaga-negara",
        definition: "Periode DPR menjalankan sidang",
        example: "Masa sidang I tahun 2024",
        legalBasis: "UU MD3",
        englishTerm: "Session Period",
        relatedTerms: ["Persidangan", "Meeting Period"]
      },
      {
        id: 421,
        term: "Masyarakat Adat",
        category: "konstitusi",
        definition: "Kelompok masyarakat dengan sistem hukum adat",
        example: "Pengakuan masyarakat adat dalam konstitusi",
        legalBasis: "Pasal 18B UUD 1945",
        englishTerm: "Indigenous People",
        relatedTerms: ["Hukum Adat", "Customary Law"]
      },
      {
        id: 422,
        term: "Masyarakat Madani",
        category: "sistem-pemerintahan",
        definition: "Masyarakat sipil yang demokratis",
        example: "Peran masyarakat madani dalam demokrasi",
        legalBasis: "Konsep Demokrasi",
        englishTerm: "Civil Society",
        relatedTerms: ["Civil Society", "Demokratis"]
      },
      {
        id: 423,
        term: "Materil",
        category: "perundang-undangan",
        definition: "Berkaitan dengan isi atau substansi",
        example: "Pengujian materil undang-undang",
        legalBasis: "UU MK",
        englishTerm: "Material",
        relatedTerms: ["Substansi", "Content"]
      },
      {
        id: 424,
        term: "Mekanisme Check and Balance",
        category: "sistem-pemerintahan",
        definition: "Sistem saling mengawasi antar lembaga",
        example: "DPR mengawasi kinerja pemerintah",
        legalBasis: "UUD 1945",
        englishTerm: "Check and Balance",
        relatedTerms: ["Pengawasan", "Keseimbangan"]
      },
      {
        id: 425,
        term: "Memorandum",
        category: "lembaga-negara",
        definition: "Peringatan DPR kepada presiden",
        example: "DPR menyampaikan memorandum pertama",
        legalBasis: "UUD 1945 (pra-amandemen)",
        englishTerm: "Memorandum",
        relatedTerms: ["Peringatan", "Warning"]
      },
      {
        id: 426,
        term: "Menteri",
        category: "lembaga-negara",
        definition: "Pembantu presiden yang memimpin kementerian",
        example: "Menteri Keuangan mengurus APBN",
        legalBasis: "Pasal 17 UUD 1945",
        englishTerm: "Minister",
        relatedTerms: ["Kabinet", "Kementerian"]
      },
      {
        id: 427,
        term: "Menteri Koordinator",
        category: "lembaga-negara",
        definition: "Menteri yang mengkoordinasikan beberapa kementerian",
        example: "Menko Polhukam koordinasi bidang politik",
        legalBasis: "Perpres Kementerian",
        englishTerm: "Coordinating Minister",
        relatedTerms: ["Menko", "Koordinasi"]
      },
      {
        id: 428,
        term: "Merdeka",
        category: "konstitusi",
        definition: "Bebas dari penjajahan dan berdaulat",
        example: "Indonesia merdeka 17 Agustus 1945",
        legalBasis: "Pembukaan UUD 1945",
        englishTerm: "Independent",
        relatedTerms: ["Kemerdekaan", "Sovereignty"]
      },
      {
        id: 429,
        term: "Militer",
        category: "lembaga-negara",
        definition: "Angkatan bersenjata negara",
        example: "TNI sebagai kekuatan militer Indonesia",
        legalBasis: "UU TNI",
        englishTerm: "Military",
        relatedTerms: ["TNI", "Angkatan Bersenjata"]
      },
      {
        id: 430,
        term: "Minoritas",
        category: "hak-kewajiban",
        definition: "Kelompok dengan jumlah lebih sedikit",
        example: "Perlindungan hak minoritas",
        legalBasis: "UU HAM",
        englishTerm: "Minority",
        relatedTerms: ["Kelompok Kecil", "Minority Rights"]
      },
      {
        id: 431,
        term: "Misi Negara",
        category: "konstitusi",
        definition: "Tugas yang harus dilaksanakan negara",
        example: "Misi mencerdaskan kehidupan bangsa",
        legalBasis: "Pembukaan UUD 1945",
        englishTerm: "State Mission",
        relatedTerms: ["Tujuan Negara", "National Goals"]
      },
      {
        id: 432,
        term: "Modal Asing",
        category: "sistem-pemerintahan",
        definition: "Investasi dari luar negeri",
        example: "Pengaturan modal asing dalam konstitusi",
        legalBasis: "UU Penanaman Modal",
        englishTerm: "Foreign Investment",
        relatedTerms: ["FDI", "Investasi Asing"]
      },
      {
        id: 433,
        term: "Monarki",
        category: "sistem-pemerintahan",
        definition: "Sistem pemerintahan dengan kepala negara raja/ratu",
        example: "Indonesia bukan negara monarki",
        legalBasis: "Teori Negara",
        englishTerm: "Monarchy",
        relatedTerms: ["Kerajaan", "Kingdom"]
      },
      {
        id: 434,
        term: "Moneter",
        category: "sistem-pemerintahan",
        definition: "Berkaitan dengan mata uang dan perbankan",
        example: "Bank Indonesia mengatur kebijakan moneter",
        legalBasis: "UU Bank Indonesia",
        englishTerm: "Monetary",
        relatedTerms: ["Keuangan", "Currency"]
      },
      {
        id: 435,
        term: "Mosi",
        category: "lembaga-negara",
        definition: "Pendapat atau usulan dalam sidang",
        example: "Mosi tidak percaya terhadap menteri",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Motion",
        relatedTerms: ["Usulan", "Proposal"]
      },
      {
        id: 436,
        term: "Mosi Tidak Percaya",
        category: "lembaga-negara",
        definition: "Pernyataan tidak percaya DPR",
        example: "Mosi tidak percaya kepada pemerintah",
        legalBasis: "UU MD3",
        englishTerm: "Vote of No Confidence",
        relatedTerms: ["No Confidence", "Ketidakpercayaan"]
      },
      {
        id: 437,
        term: "MPR",
        category: "lembaga-negara",
        definition: "Majelis Permusyawaratan Rakyat",
        example: "MPR melantik presiden dan wapres",
        legalBasis: "Pasal 3 UUD 1945",
        englishTerm: "People's Consultative Assembly",
        relatedTerms: ["Majelis", "Assembly"]
      },
      {
        id: 438,
        term: "Multipartai",
        category: "sistem-pemerintahan",
        definition: "Sistem dengan banyak partai politik",
        example: "Indonesia menganut sistem multipartai",
        legalBasis: "UU Parpol",
        englishTerm: "Multi-party System",
        relatedTerms: ["Banyak Partai", "Pluralism"]
      },
      {
        id: 439,
        term: "Musyawarah",
        category: "sistem-pemerintahan",
        definition: "Pembahasan bersama untuk mencapai mufakat",
        example: "Musyawarah dalam pengambilan keputusan",
        legalBasis: "Sila ke-4 Pancasila",
        englishTerm: "Deliberation",
        relatedTerms: ["Mufakat", "Consensus"]
      },
      {
        id: 440,
        term: "Musyawarah Mufakat",
        category: "sistem-pemerintahan",
        definition: "Pengambilan keputusan dengan kesepakatan bersama",
        example: "Keputusan DPR diambil secara musyawarah mufakat",
        legalBasis: "UUD 1945",
        englishTerm: "Consensus",
        relatedTerms: ["Konsensus", "Agreement"]
      },
      {
        id: 441,
        term: "Mutasi",
        category: "lembaga-negara",
        definition: "Perpindahan jabatan atau tugas",
        example: "Mutasi pejabat pemerintahan",
        legalBasis: "UU ASN",
        englishTerm: "Mutation",
        relatedTerms: ["Perpindahan", "Transfer"]
      },
      {
        id: 442,
        term: "Nagara",
        category: "konstitusi",
        definition: "Istilah lain untuk negara",
        example: "Nagara Kesatuan Republik Indonesia",
        legalBasis: "Istilah Konstitusi",
        englishTerm: "State",
        relatedTerms: ["Negara", "Country"]
      },
      {
        id: 443,
        term: "Nasional",
        category: "konstitusi",
        definition: "Berkaitan dengan seluruh bangsa/negara",
        example: "Kepentingan nasional Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "National",
        relatedTerms: ["Kebangsaan", "Nationwide"]
      },
      {
        id: 444,
        term: "Nasionalisasi",
        category: "sistem-pemerintahan",
        definition: "Pengambilalihan aset swasta oleh negara",
        example: "Nasionalisasi perusahaan asing tahun 1950-an",
        legalBasis: "Sejarah Konstitusi",
        englishTerm: "Nationalization",
        relatedTerms: ["Pengambilalihan", "State Takeover"]
      },
      {
        id: 445,
        term: "Nasionalisme",
        category: "konstitusi",
        definition: "Paham cinta tanah air dan bangsa",
        example: "Nasionalisme dalam perjuangan kemerdekaan",
        legalBasis: "Pembukaan UUD 1945",
        englishTerm: "Nationalism",
        relatedTerms: ["Patriotisme", "Kebangsaan"]
      },
      {
        id: 446,
        term: "Negara",
        category: "konstitusi",
        definition: "Organisasi kekuasaan dari suatu bangsa",
        example: "Negara Kesatuan Republik Indonesia",
        legalBasis: "Pasal 1 UUD 1945",
        englishTerm: "State",
        relatedTerms: ["Country", "Nation"]
      },
      {
        id: 447,
        term: "Negara Hukum",
        category: "konstitusi",
        definition: "Negara yang berdasarkan hukum",
        example: "Indonesia adalah negara hukum",
        legalBasis: "Pasal 1 ayat (3) UUD 1945",
        englishTerm: "Rule of Law",
        relatedTerms: ["Rechtsstaat", "Legal State"],
        trending: true
      },
      {
        id: 448,
        term: "Negara Kesatuan",
        category: "konstitusi",
        definition: "Negara dengan pemerintahan tunggal",
        example: "NKRI sebagai negara kesatuan",
        legalBasis: "Pasal 1 ayat (1) UUD 1945",
        englishTerm: "Unitary State",
        relatedTerms: ["Unitary", "NKRI"]
      },
      {
        id: 449,
        term: "Negara Kesejahteraan",
        category: "sistem-pemerintahan",
        definition: "Negara yang menjamin kesejahteraan rakyat",
        example: "Program jaminan sosial negara",
        legalBasis: "Pasal 34 UUD 1945",
        englishTerm: "Welfare State",
        relatedTerms: ["Welfare", "Social State"]
      },
      {
        id: 450,
        term: "Negara Maju",
        category: "sistem-pemerintahan",
        definition: "Negara dengan pembangunan tinggi",
        example: "Indonesia menuju negara maju 2045",
        legalBasis: "Visi Pembangunan",
        englishTerm: "Developed Country",
        relatedTerms: ["Advanced Nation", "First World"]
      },
      {
        id: 451,
        term: "Netralitas",
        category: "lembaga-negara",
        definition: "Sikap tidak memihak",
        example: "Netralitas ASN dalam politik",
        legalBasis: "UU ASN",
        englishTerm: "Neutrality",
        relatedTerms: ["Impartial", "Non-partisan"]
      },
      {
        id: 452,
        term: "NKRI",
        category: "konstitusi",
        definition: "Negara Kesatuan Republik Indonesia",
        example: "NKRI harga mati",
        legalBasis: "UUD 1945",
        englishTerm: "Unitary State of Indonesia",
        relatedTerms: ["Indonesia", "Republic"]
      },
      {
        id: 453,
        term: "Nomenklatur",
        category: "lembaga-negara",
        definition: "Tata nama jabatan atau lembaga",
        example: "Nomenklatur kementerian",
        legalBasis: "Perpres",
        englishTerm: "Nomenclature",
        relatedTerms: ["Penamaan", "Naming System"]
      },
      {
        id: 454,
        term: "Nominasi",
        category: "lembaga-negara",
        definition: "Pencalonan untuk suatu jabatan",
        example: "Nominasi calon hakim agung",
        legalBasis: "UU terkait",
        englishTerm: "Nomination",
        relatedTerms: ["Pencalonan", "Candidacy"]
      },
      {
        id: 455,
        term: "Non-Blok",
        category: "sistem-pemerintahan",
        definition: "Tidak berpihak pada blok manapun",
        example: "Indonesia pendiri Gerakan Non-Blok",
        legalBasis: "Politik Luar Negeri",
        englishTerm: "Non-Aligned",
        relatedTerms: ["Bebas Aktif", "NAM"]
      },
      {
        id: 456,
        term: "Non-Departemen",
        category: "lembaga-negara",
        definition: "Lembaga pemerintah bukan kementerian",
        example: "Lembaga pemerintah non-departemen",
        legalBasis: "Perpres",
        englishTerm: "Non-Departmental",
        relatedTerms: ["LPND", "Non-Ministerial"]
      },
      {
        id: 457,
        term: "Non-Partisan",
        category: "lembaga-negara",
        definition: "Tidak berpihak pada partai politik",
        example: "Presiden harus non-partisan",
        legalBasis: "Etika Politik",
        englishTerm: "Non-Partisan",
        relatedTerms: ["Netral", "Independent"]
      },
      {
        id: 458,
        term: "Norma",
        category: "perundang-undangan",
        definition: "Aturan atau kaidah yang mengikat",
        example: "Norma hukum dalam konstitusi",
        legalBasis: "Teori Hukum",
        englishTerm: "Norm",
        relatedTerms: ["Kaidah", "Rule"]
      },
      {
        id: 459,
        term: "Norma Dasar",
        category: "konstitusi",
        definition: "Aturan fundamental negara",
        example: "Pancasila sebagai norma dasar",
        legalBasis: "Teori Hukum",
        englishTerm: "Basic Norm",
        relatedTerms: ["Grundnorm", "Fundamental Rule"]
      },
      {
        id: 460,
        term: "Notifikasi",
        category: "perundang-undangan",
        definition: "Pemberitahuan resmi",
        example: "Notifikasi penetapan peraturan",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Notification",
        relatedTerms: ["Pemberitahuan", "Notice"]
      },
      {
        id: 461,
        term: "Novasi",
        category: "perundang-undangan",
        definition: "Penggantian perjanjian atau aturan lama",
        example: "Novasi konstitusi melalui amandemen",
        legalBasis: "Teori Hukum",
        englishTerm: "Novation",
        relatedTerms: ["Pembaruan", "Renewal"]
      },
      {
        id: 462,
        term: "Nusantara",
        category: "konstitusi",
        definition: "Wilayah kepulauan Indonesia",
        example: "Wawasan Nusantara",
        legalBasis: "UUD 1945",
        englishTerm: "Archipelago",
        relatedTerms: ["Kepulauan", "Indonesia"]
      },
      {
        id: 463,
        term: "Oath",
        category: "lembaga-negara",
        definition: "Sumpah jabatan",
        example: "Presidential oath",
        legalBasis: "UUD 1945",
        englishTerm: "Oath",
        relatedTerms: ["Sumpah", "Pledge"]
      },
      {
        id: 464,
        term: "Objektif",
        category: "lembaga-negara",
        definition: "Tidak memihak, berdasarkan fakta",
        example: "Penilaian objektif kinerja pemerintah",
        legalBasis: "Prinsip Pemerintahan",
        englishTerm: "Objective",
        relatedTerms: ["Netral", "Impartial"]
      },
      {
        id: 465,
        term: "Obligasi Negara",
        category: "sistem-pemerintahan",
        definition: "Surat utang yang diterbitkan negara",
        example: "Penerbitan obligasi untuk pembangunan",
        legalBasis: "UU Surat Utang Negara",
        englishTerm: "Government Bond",
        relatedTerms: ["Surat Utang", "Treasury Bond"]
      },
      {
        id: 466,
        term: "Observasi",
        category: "lembaga-negara",
        definition: "Pengamatan terhadap proses pemerintahan",
        example: "Observasi pemilu oleh pemantau",
        legalBasis: "UU Pemilu",
        englishTerm: "Observation",
        relatedTerms: ["Pengamatan", "Monitoring"]
      },
      {
        id: 467,
        term: "Oditur",
        category: "lembaga-negara",
        definition: "Penyidik dan penuntut militer",
        example: "Oditur militer menangani kasus TNI",
        legalBasis: "UU Peradilan Militer",
        englishTerm: "Military Prosecutor",
        relatedTerms: ["Jaksa Militer", "JAG"]
      },
      {
        id: 468,
        term: "Oligarki",
        category: "sistem-pemerintahan",
        definition: "Pemerintahan oleh sekelompok kecil",
        example: "Bahaya oligarki dalam demokrasi",
        legalBasis: "Teori Politik",
        englishTerm: "Oligarchy",
        relatedTerms: ["Elite Rule", "Kelompok Kecil"]
      },
      {
        id: 469,
        term: "Ombudsman",
        category: "lembaga-negara",
        definition: "Lembaga pengawas pelayanan publik",
        example: "Ombudsman RI mengawasi birokrasi",
        legalBasis: "UU Ombudsman",
        englishTerm: "Ombudsman",
        relatedTerms: ["Pengawas", "Public Watchdog"]
      },
      {
        id: 470,
        term: "Omnibus Law",
        category: "perundang-undangan",
        definition: "UU yang mengatur banyak hal sekaligus",
        example: "UU Cipta Kerja sebagai omnibus law",
        legalBasis: "UU Cipta Kerja",
        englishTerm: "Omnibus Law",
        relatedTerms: ["UU Sapu Jagat", "Comprehensive Law"],
        trending: true
      },
      {
        id: 471,
        term: "Operasional",
        category: "lembaga-negara",
        definition: "Berkaitan dengan pelaksanaan tugas",
        example: "Anggaran operasional lembaga",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Operational",
        relatedTerms: ["Pelaksanaan", "Implementation"]
      },
      {
        id: 472,
        term: "Opini Publik",
        category: "sistem-pemerintahan",
        definition: "Pendapat masyarakat umum",
        example: "Opini publik tentang kebijakan pemerintah",
        legalBasis: "Demokrasi",
        englishTerm: "Public Opinion",
        relatedTerms: ["Pendapat Umum", "Public View"]
      },
      {
        id: 473,
        term: "Oposisi",
        category: "lembaga-negara",
        definition: "Pihak yang berseberangan dengan pemerintah",
        example: "Partai oposisi di parlemen",
        legalBasis: "Sistem Demokrasi",
        englishTerm: "Opposition",
        relatedTerms: ["Lawan Politik", "Opposing Party"]
      },
      {
        id: 474,
        term: "Optimalisasi",
        category: "sistem-pemerintahan",
        definition: "Upaya memaksimalkan hasil",
        example: "Optimalisasi kinerja pemerintahan",
        legalBasis: "Manajemen Pemerintahan",
        englishTerm: "Optimization",
        relatedTerms: ["Maksimalisasi", "Enhancement"]
      },
      {
        id: 475,
        term: "Orde",
        category: "sistem-pemerintahan",
        definition: "Tatanan atau masa pemerintahan",
        example: "Orde Baru, Orde Reformasi",
        legalBasis: "Sejarah Politik",
        englishTerm: "Order",
        relatedTerms: ["Era", "Regime"]
      },
      {
        id: 476,
        term: "Orde Baru",
        category: "sistem-pemerintahan",
        definition: "Masa pemerintahan Soeharto 1966-1998",
        example: "Sistem pemerintahan Orde Baru",
        legalBasis: "Sejarah Indonesia",
        englishTerm: "New Order",
        relatedTerms: ["Soeharto Era", "Orba"]
      },
      {
        id: 477,
        term: "Orde Lama",
        category: "sistem-pemerintahan",
        definition: "Masa pemerintahan Soekarno 1945-1966",
        example: "Demokrasi Terpimpin era Orde Lama",
        legalBasis: "Sejarah Indonesia",
        englishTerm: "Old Order",
        relatedTerms: ["Soekarno Era", "Orla"]
      },
      {
        id: 478,
        term: "Ordinansi",
        category: "perundang-undangan",
        definition: "Peraturan zaman kolonial",
        example: "Ordinansi yang masih berlaku",
        legalBasis: "Aturan Peralihan",
        englishTerm: "Ordinance",
        relatedTerms: ["Ordonansi", "Colonial Law"]
      },
      {
        id: 479,
        term: "Organ",
        category: "lembaga-negara",
        definition: "Alat kelengkapan lembaga",
        example: "Organ MPR seperti Badan Sosialisasi",
        legalBasis: "Tata Tertib",
        englishTerm: "Organ",
        relatedTerms: ["Alat Kelengkapan", "Body"]
      },
      {
        id: 480,
        term: "Organisasi",
        category: "lembaga-negara",
        definition: "Susunan dan tata kerja lembaga",
        example: "Organisasi pemerintahan daerah",
        legalBasis: "PP Organisasi",
        englishTerm: "Organization",
        relatedTerms: ["Struktur", "Structure"]
      },
      {
        id: 481,
        term: "Organisasi Masyarakat",
        category: "sistem-pemerintahan",
        definition: "Organisasi yang dibentuk masyarakat",
        example: "Ormas keagamaan dan sosial",
        legalBasis: "UU Ormas",
        englishTerm: "Civil Organization",
        relatedTerms: ["Ormas", "CSO"]
      },
      {
        id: 482,
        term: "Organisasi Perangkat Daerah",
        category: "lembaga-negara",
        definition: "Unsur pembantu kepala daerah",
        example: "Dinas dan badan sebagai OPD",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Organization",
        relatedTerms: ["OPD", "SKPD"]
      },
      {
        id: 483,
        term: "Orientasi",
        category: "sistem-pemerintahan",
        definition: "Arah atau tujuan kebijakan",
        example: "Orientasi pembangunan berkelanjutan",
        legalBasis: "RPJPN",
        englishTerm: "Orientation",
        relatedTerms: ["Arah", "Direction"]
      },
      {
        id: 484,
        term: "Original Intent",
        category: "perundang-undangan",
        definition: "Maksud awal pembuat undang-undang",
        example: "Tafsir berdasarkan original intent",
        legalBasis: "Teori Interpretasi",
        englishTerm: "Original Intent",
        relatedTerms: ["Maksud Asli", "Niat Awal"]
      },
      {
        id: 485,
        term: "Ormas",
        category: "sistem-pemerintahan",
        definition: "Organisasi kemasyarakatan",
        example: "NU dan Muhammadiyah sebagai ormas",
        legalBasis: "UU Ormas",
        englishTerm: "Mass Organization",
        relatedTerms: ["Civil Society", "NGO"]
      },
      {
        id: 486,
        term: "Otonomi",
        category: "sistem-pemerintahan",
        definition: "Kewenangan mengatur diri sendiri",
        example: "Otonomi daerah di Indonesia",
        legalBasis: "Pasal 18 UUD 1945",
        englishTerm: "Autonomy",
        relatedTerms: ["Self-governance", "Kemandirian"]
      },
      {
        id: 487,
        term: "Otonomi Daerah",
        category: "sistem-pemerintahan",
        definition: "Hak daerah mengatur urusan sendiri",
        example: "Pelaksanaan otonomi daerah sejak 1999",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Autonomy",
        relatedTerms: ["Desentralisasi", "Local Autonomy"],
        trending: true
      },
      {
        id: 488,
        term: "Otonomi Khusus",
        category: "sistem-pemerintahan",
        definition: "Otonomi dengan kekhususan tertentu",
        example: "Otsus Papua dan Aceh",
        legalBasis: "UU Otsus",
        englishTerm: "Special Autonomy",
        relatedTerms: ["Otsus", "Special Status"]
      },
      {
        id: 489,
        term: "Otoritas",
        category: "lembaga-negara",
        definition: "Kewenangan yang sah",
        example: "Otoritas presiden dalam pemerintahan",
        legalBasis: "UUD 1945",
        englishTerm: "Authority",
        relatedTerms: ["Kewenangan", "Power"]
      },
      {
        id: 490,
        term: "Otoritas Jasa Keuangan",
        category: "lembaga-negara",
        definition: "Lembaga pengawas jasa keuangan",
        example: "OJK mengawasi perbankan",
        legalBasis: "UU OJK",
        englishTerm: "Financial Services Authority",
        relatedTerms: ["OJK", "FSA"]
      },
      {
        id: 491,
        term: "Otoritas Moneter",
        category: "lembaga-negara",
        definition: "Lembaga yang mengatur kebijakan moneter",
        example: "Bank Indonesia sebagai otoritas moneter",
        legalBasis: "UU Bank Indonesia",
        englishTerm: "Monetary Authority",
        relatedTerms: ["Bank Sentral", "Central Bank"]
      },
      {
        id: 492,
        term: "Otoritarianisme",
        category: "sistem-pemerintahan",
        definition: "Sistem pemerintahan otoriter",
        example: "Bahaya otoritarianisme bagi demokrasi",
        legalBasis: "Teori Politik",
        englishTerm: "Authoritarianism",
        relatedTerms: ["Otoriter", "Dictatorship"]
      },
      {
        id: 493,
        term: "Otoriterisme",
        category: "sistem-pemerintahan",
        definition: "Paham pemerintahan otoriter",
        example: "Penolakan terhadap otoriterisme",
        legalBasis: "Teori Politik",
        englishTerm: "Authoritarianism",
        relatedTerms: ["Kediktatoran", "Absolutism"]
      },
      {
        id: 494,
        term: "Output",
        category: "sistem-pemerintahan",
        definition: "Hasil atau keluaran kebijakan",
        example: "Output program pemerintah",
        legalBasis: "Manajemen Publik",
        englishTerm: "Output",
        relatedTerms: ["Hasil", "Result"]
      },
      {
        id: 495,
        term: "Outsourcing",
        category: "sistem-pemerintahan",
        definition: "Alih daya pekerjaan",
        example: "Outsourcing dalam pemerintahan",
        legalBasis: "Peraturan Ketenagakerjaan",
        englishTerm: "Outsourcing",
        relatedTerms: ["Alih Daya", "Kontrak"]
      },
      {
        id: 496,
        term: "Overregulasi",
        category: "perundang-undangan",
        definition: "Pengaturan yang berlebihan",
        example: "Overregulasi menghambat investasi",
        legalBasis: "Kebijakan Regulasi",
        englishTerm: "Overregulation",
        relatedTerms: ["Regulasi Berlebih", "Excessive Rules"]
      },
      {
        id: 497,
        term: "Oversight",
        category: "lembaga-negara",
        definition: "Pengawasan terhadap pemerintah",
        example: "Parliamentary oversight",
        legalBasis: "Fungsi DPR",
        englishTerm: "Oversight",
        relatedTerms: ["Pengawasan", "Supervision"]
      },
      {
        id: 498,
        term: "Pagu Anggaran",
        category: "sistem-pemerintahan",
        definition: "Batas tertinggi anggaran",
        example: "Pagu anggaran kementerian",
        legalBasis: "UU APBN",
        englishTerm: "Budget Ceiling",
        relatedTerms: ["Plafon", "Budget Limit"]
      },
      {
        id: 499,
        term: "Pajak",
        category: "hak-kewajiban",
        definition: "Pungutan wajib untuk negara",
        example: "Pajak penghasilan warga negara",
        legalBasis: "UU Perpajakan",
        englishTerm: "Tax",
        relatedTerms: ["Taxation", "Pungutan"]
      },
      {
        id: 500,
        term: "Pakem",
        category: "perundang-undangan",
        definition: "Pedoman atau standar baku",
        example: "Pakem penyusunan peraturan",
        legalBasis: "Pedoman Teknis",
        englishTerm: "Standard",
        relatedTerms: ["Pedoman", "Guideline"]
      },
      
      // Melanjutkan hingga selesai
      {
        id: 501,
        term: "Paket Kebijakan",
        category: "sistem-pemerintahan",
        definition: "Serangkaian kebijakan terpadu",
        example: "Paket kebijakan ekonomi pemerintah",
        legalBasis: "Kebijakan Pemerintah",
        englishTerm: "Policy Package",
        relatedTerms: ["Policy Bundle", "Kebijakan Terpadu"]
      },
      {
        id: 502,
        term: "Paket Undang-Undang",
        category: "perundang-undangan",
        definition: "Beberapa UU yang saling terkait",
        example: "Paket UU politik tahun 2019",
        legalBasis: "Program Legislasi",
        englishTerm: "Legislative Package",
        relatedTerms: ["UU Package", "Bundled Laws"]
      },
      {
        id: 503,
        term: "Paksaan Pemerintah",
        category: "sistem-pemerintahan",
        definition: "Tindakan paksa oleh pemerintah",
        example: "Eksekusi paksa peraturan",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Government Coercion",
        relatedTerms: ["Dwangsom", "Administrative Force"]
      },
      {
        id: 504,
        term: "Panitera",
        category: "lembaga-negara",
        definition: "Pejabat pengadilan pencatat sidang",
        example: "Panitera MK mencatat putusan",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Court Clerk",
        relatedTerms: ["Registrar", "Griffier"]
      },
      {
        id: 505,
        term: "Panitia Ad Hoc",
        category: "lembaga-negara",
        definition: "Panitia sementara untuk tugas khusus",
        example: "Pansus DPR untuk kasus tertentu",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Ad Hoc Committee",
        relatedTerms: ["Pansus", "Special Committee"]
      },
      {
        id: 506,
        term: "Panitia Anggaran",
        category: "lembaga-negara",
        definition: "Panitia DPR yang menangani APBN",
        example: "Banggar DPR membahas RAPBN",
        legalBasis: "UU MD3",
        englishTerm: "Budget Committee",
        relatedTerms: ["Banggar", "APBN Committee"]
      },
      {
        id: 507,
        term: "Panitia Kerja",
        category: "lembaga-negara",
        definition: "Tim kerja di DPR",
        example: "Panja membahas RUU",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Working Committee",
        relatedTerms: ["Panja", "Working Group"]
      },
      {
        id: 508,
        term: "Panitia Khusus",
        category: "lembaga-negara",
        definition: "Panitia untuk tugas khusus",
        example: "Pansus Angket DPR",
        legalBasis: "UU MD3",
        englishTerm: "Special Committee",
        relatedTerms: ["Pansus", "Ad Hoc Committee"]
      },
      {
        id: 509,
        term: "Panitia Musyawarah",
        category: "lembaga-negara",
        definition: "Panitia koordinasi di DPR",
        example: "Bamus DPR menyusun agenda",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Deliberation Committee",
        relatedTerms: ["Bamus", "Steering Committee"]
      },
      {
        id: 510,
        term: "Pansus",
        category: "lembaga-negara",
        definition: "Panitia khusus DPR",
        example: "Pansus KPK tahun 2019",
        legalBasis: "UU MD3",
        englishTerm: "Special Committee",
        relatedTerms: ["Panitia Khusus", "Special Panel"],
        trending: true
      },
      {
        id: 511,
        term: "Paradigma",
        category: "sistem-pemerintahan",
        definition: "Kerangka berpikir atau model",
        example: "Paradigma baru pelayanan publik",
        legalBasis: "Teori Administrasi",
        englishTerm: "Paradigm",
        relatedTerms: ["Framework", "Model"]
      },
      {
        id: 512,
        term: "Paralegal",
        category: "hak-kewajiban",
        definition: "Pemberi bantuan hukum non-advokat",
        example: "Paralegal membantu masyarakat miskin",
        legalBasis: "UU Bantuan Hukum",
        englishTerm: "Paralegal",
        relatedTerms: ["Legal Aid", "Bantuan Hukum"]
      },
      {
        id: 513,
        term: "Parameter",
        category: "sistem-pemerintahan",
        definition: "Ukuran atau batasan",
        example: "Parameter keberhasilan pemerintah",
        legalBasis: "Sistem Evaluasi",
        englishTerm: "Parameter",
        relatedTerms: ["Ukuran", "Measure"]
      },
      {
        id: 514,
        term: "Pardon",
        category: "lembaga-negara",
        definition: "Pengampunan dari presiden",
        example: "Presidential pardon untuk terpidana",
        legalBasis: "UUD 1945",
        englishTerm: "Pardon",
        relatedTerms: ["Grasi", "Clemency"]
      },
      {
        id: 515,
        term: "Paripurna",
        category: "lembaga-negara",
        definition: "Sidang lengkap DPR/MPR",
        example: "Rapat paripurna DPR",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Plenary Session",
        relatedTerms: ["Pleno", "Full Session"]
      },
      {
        id: 516,
        term: "Paritas",
        category: "sistem-pemerintahan",
        definition: "Kesetaraan atau keseimbangan",
        example: "Paritas gender di parlemen",
        legalBasis: "Prinsip Kesetaraan",
        englishTerm: "Parity",
        relatedTerms: ["Kesetaraan", "Equality"]
      },
      {
        id: 517,
        term: "Parlemen",
        category: "lembaga-negara",
        definition: "Lembaga perwakilan rakyat",
        example: "DPR sebagai parlemen Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Parliament",
        relatedTerms: ["Legislature", "DPR"]
      },
      {
        id: 518,
        term: "Parlementer",
        category: "sistem-pemerintahan",
        definition: "Sistem pemerintahan parlemen",
        example: "Indonesia pernah parlementer 1950-1959",
        legalBasis: "Sejarah Konstitusi",
        englishTerm: "Parliamentary",
        relatedTerms: ["Westminster", "Cabinet System"]
      },
      {
        id: 519,
        term: "Parpol",
        category: "sistem-pemerintahan",
        definition: "Partai politik",
        example: "Parpol peserta pemilu",
        legalBasis: "UU Parpol",
        englishTerm: "Political Party",
        relatedTerms: ["Partai", "Party"]
      },
      {
        id: 520,
        term: "Parsial",
        category: "sistem-pemerintahan",
        definition: "Sebagian atau tidak menyeluruh",
        example: "Reformasi parsial birokrasi",
        legalBasis: "Kebijakan Reformasi",
        englishTerm: "Partial",
        relatedTerms: ["Sebagian", "Incomplete"]
      },
      {
        id: 521,
        term: "Partai Lokal",
        category: "sistem-pemerintahan",
        definition: "Partai politik tingkat daerah",
        example: "Partai lokal di Aceh",
        legalBasis: "UU Pemerintahan Aceh",
        englishTerm: "Local Party",
        relatedTerms: ["Regional Party", "Parlok"]
      },
      {
        id: 522,
        term: "Partai Nasional",
        category: "sistem-pemerintahan",
        definition: "Partai politik tingkat nasional",
        example: "Syarat partai nasional untuk pemilu",
        legalBasis: "UU Parpol",
        englishTerm: "National Party",
        relatedTerms: ["Nationwide Party", "Parnas"]
      },
      {
        id: 523,
        term: "Partai Oposisi",
        category: "sistem-pemerintahan",
        definition: "Partai di luar pemerintahan",
        example: "Peran partai oposisi di DPR",
        legalBasis: "Sistem Demokrasi",
        englishTerm: "Opposition Party",
        relatedTerms: ["Opposing Party", "Non-Government"]
      },
      {
        id: 524,
        term: "Partai Politik",
        category: "sistem-pemerintahan",
        definition: "Organisasi politik peserta pemilu",
        example: "Partai politik berasaskan Pancasila",
        legalBasis: "UU Parpol",
        englishTerm: "Political Party",
        relatedTerms: ["Parpol", "Party"]
      },
      {
        id: 525,
        term: "Partai Tunggal",
        category: "sistem-pemerintahan",
        definition: "Sistem dengan satu partai dominan",
        example: "Era partai tunggal tidak demokratis",
        legalBasis: "Teori Politik",
        englishTerm: "Single Party",
        relatedTerms: ["One Party", "Monopartai"]
      },
      {
        id: 526,
        term: "Partisipasi",
        category: "hak-kewajiban",
        definition: "Keikutsertaan dalam proses politik",
        example: "Partisipasi masyarakat dalam pemilu",
        legalBasis: "UU Pemilu",
        englishTerm: "Participation",
        relatedTerms: ["Keikutsertaan", "Involvement"]
      },
      {
        id: 527,
        term: "Partisipasi Politik",
        category: "hak-kewajiban",
        definition: "Keterlibatan warga dalam politik",
        example: "Hak pilih sebagai partisipasi politik",
        legalBasis: "UUD 1945",
        englishTerm: "Political Participation",
        relatedTerms: ["Political Engagement", "Civic Participation"]
      },
      {
        id: 528,
        term: "Partisan",
        category: "sistem-pemerintahan",
        definition: "Memihak pada partai tertentu",
        example: "Media partisan dalam pemilu",
        legalBasis: "Etika Politik",
        englishTerm: "Partisan",
        relatedTerms: ["Bias", "Party-aligned"]
      },
      {
        id: 529,
        term: "Partnership",
        category: "sistem-pemerintahan",
        definition: "Kemitraan dalam pemerintahan",
        example: "Public-private partnership",
        legalBasis: "Perpres KPBU",
        englishTerm: "Partnership",
        relatedTerms: ["Kemitraan", "Cooperation"]
      },
      {
        id: 530,
        term: "Pasif",
        category: "hak-kewajiban",
        definition: "Hak untuk dipilih",
        example: "Hak pilih pasif dalam pemilu",
        legalBasis: "UU Pemilu",
        englishTerm: "Passive Right",
        relatedTerms: ["Right to be Elected", "Dipilih"]
      },
      {
        id: 531,
        term: "Patriotisme",
        category: "konstitusi",
        definition: "Cinta tanah air",
        example: "Patriotisme dalam bela negara",
        legalBasis: "UUD 1945",
        englishTerm: "Patriotism",
        relatedTerms: ["Nasionalisme", "Love of Country"]
      },
      {
        id: 532,
        term: "Patroli",
        category: "lembaga-negara",
        definition: "Pengawasan berkeliling",
        example: "Patroli keamanan wilayah",
        legalBasis: "UU Kepolisian",
        englishTerm: "Patrol",
        relatedTerms: ["Ronda", "Surveillance"]
      },
      {
        id: 533,
        term: "Paulus",
        category: "konstitusi",
        definition: "Asas hukum dari Romawi",
        example: "Pengaruh hukum Romawi",
        legalBasis: "Sejarah Hukum",
        englishTerm: "Roman Law",
        relatedTerms: ["Hukum Romawi", "Civil Law"]
      },
      {
        id: 534,
        term: "Payung Hukum",
        category: "perundang-undangan",
        definition: "Dasar hukum yang melindungi",
        example: "UU sebagai payung hukum kebijakan",
        legalBasis: "Hierarki Perundangan",
        englishTerm: "Legal Umbrella",
        relatedTerms: ["Legal Basis", "Dasar Hukum"]
      },
      {
        id: 535,
        term: "PBB",
        category: "sistem-pemerintahan",
        definition: "Perserikatan Bangsa-Bangsa",
        example: "Indonesia anggota PBB",
        legalBasis: "Piagam PBB",
        englishTerm: "United Nations",
        relatedTerms: ["UN", "Bangsa-Bangsa"]
      },
      {
        id: 536,
        term: "PDI",
        category: "sistem-pemerintahan",
        definition: "Partai Demokrasi Indonesia",
        example: "PDI era Orde Baru",
        legalBasis: "Sejarah Politik",
        englishTerm: "Indonesian Democratic Party",
        relatedTerms: ["Partai", "Political Party"]
      },
      {
        id: 537,
        term: "PDIP",
        category: "sistem-pemerintahan",
        definition: "Partai Demokrasi Indonesia Perjuangan",
        example: "PDIP partai pemenang pemilu",
        legalBasis: "UU Parpol",
        englishTerm: "Indonesian Democratic Party of Struggle",
        relatedTerms: ["Partai", "Political Party"]
      },
      {
        id: 538,
        term: "Pecah Belah",
        category: "konstitusi",
        definition: "Politik memecah persatuan",
        example: "Politik pecah belah kolonial",
        legalBasis: "Sejarah Indonesia",
        englishTerm: "Divide and Rule",
        relatedTerms: ["Divide et Impera", "Adu Domba"]
      },
      {
        id: 539,
        term: "Pedoman",
        category: "perundang-undangan",
        definition: "Panduan pelaksanaan",
        example: "Pedoman teknis peraturan",
        legalBasis: "Peraturan Pelaksana",
        englishTerm: "Guideline",
        relatedTerms: ["Panduan", "Guide"]
      },
      {
        id: 540,
        term: "Pegawai Negeri",
        category: "lembaga-negara",
        definition: "Pegawai yang bekerja untuk negara",
        example: "PNS dan TNI/Polri",
        legalBasis: "UU ASN",
        englishTerm: "Civil Servant",
        relatedTerms: ["PNS", "Government Employee"]
      },
      {
        id: 541,
        term: "Pejabat",
        category: "lembaga-negara",
        definition: "Orang yang memegang jabatan",
        example: "Pejabat negara dan daerah",
        legalBasis: "UU ASN",
        englishTerm: "Official",
        relatedTerms: ["Functionary", "Officer"]
      },
      {
        id: 542,
        term: "Pejabat Negara",
        category: "lembaga-negara",
        definition: "Pejabat tinggi negara",
        example: "Presiden, menteri, hakim agung",
        legalBasis: "UU Kepegawaian",
        englishTerm: "State Official",
        relatedTerms: ["High Official", "Pejabat Tinggi"]
      },
      {
        id: 543,
        term: "Pejabat Publik",
        category: "lembaga-negara",
        definition: "Pejabat yang melayani publik",
        example: "Bupati sebagai pejabat publik",
        legalBasis: "UU Pelayanan Publik",
        englishTerm: "Public Official",
        relatedTerms: ["Public Servant", "Pelayan Publik"]
      },
      {
        id: 544,
        term: "Pelaksana",
        category: "lembaga-negara",
        definition: "Yang menjalankan tugas",
        example: "Pelaksana tugas presiden",
        legalBasis: "UUD 1945",
        englishTerm: "Executor",
        relatedTerms: ["Implementer", "Acting"]
      },
      {
        id: 545,
        term: "Pelaksana Harian",
        category: "lembaga-negara",
        definition: "Pelaksana tugas sementara",
        example: "Plh bupati",
        legalBasis: "UU Pemda",
        englishTerm: "Acting Daily",
        relatedTerms: ["Daily Executor", "Plh"]
      },
      {
        id: 546,
        term: "Pelaksana Tugas",
        category: "lembaga-negara",
        definition: "Pejabat sementara",
        example: "Plt gubernur",
        legalBasis: "UU Pemda",
        englishTerm: "Acting Officer",
        relatedTerms: ["Plt", "Temporary"]
      },
      {
        id: 547,
        term: "Pelantikan",
        category: "lembaga-negara",
        definition: "Pengambilan sumpah jabatan",
        example: "Pelantikan presiden oleh MPR",
        legalBasis: "UUD 1945",
        englishTerm: "Inauguration",
        relatedTerms: ["Swearing-in", "Installation"]
      },
      {
        id: 548,
        term: "Pelayanan Publik",
        category: "sistem-pemerintahan",
        definition: "Layanan pemerintah untuk masyarakat",
        example: "Pelayanan KTP dan SIM",
        legalBasis: "UU Pelayanan Publik",
        englishTerm: "Public Service",
        relatedTerms: ["Government Service", "Layanan Masyarakat"]
      },
      {
        id: 549,
        term: "Pelimpahan Wewenang",
        category: "lembaga-negara",
        definition: "Penyerahan kewenangan",
        example: "Delegasi dari presiden ke menteri",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Delegation of Authority",
        relatedTerms: ["Delegasi", "Transfer of Power"]
      },
      {
        id: 550,
        term: "Peluang",
        category: "sistem-pemerintahan",
        definition: "Kesempatan dalam politik",
        example: "Peluang koalisi partai",
        legalBasis: "Politik Praktis",
        englishTerm: "Opportunity",
        relatedTerms: ["Kesempatan", "Chance"]
      },
      {
        id: 551,
        term: "Pemajuan",
        category: "hak-kewajiban",
        definition: "Upaya memajukan HAM",
        example: "Pemajuan HAM di Indonesia",
        legalBasis: "UU HAM",
        englishTerm: "Advancement",
        relatedTerms: ["Promotion", "Progress"]
      },
      {
        id: 552,
        term: "Pemakzulan",
        category: "lembaga-negara",
        definition: "Pemberhentian presiden/wapres",
        example: "Proses impeachment presiden",
        legalBasis: "Pasal 7A-7B UUD 1945",
        englishTerm: "Impeachment",
        relatedTerms: ["Pemberhentian", "Removal"]
      },
      {
        id: 553,
        term: "Pemangku Kepentingan",
        category: "sistem-pemerintahan",
        definition: "Pihak yang berkepentingan",
        example: "Stakeholder kebijakan publik",
        legalBasis: "Manajemen Publik",
        englishTerm: "Stakeholder",
        relatedTerms: ["Stakeholder", "Interested Party"]
      },
      {
        id: 554,
        term: "Pemantau",
        category: "sistem-pemerintahan",
        definition: "Pengawas proses demokrasi",
        example: "Pemantau pemilu independen",
        legalBasis: "UU Pemilu",
        englishTerm: "Observer",
        relatedTerms: ["Monitor", "Watcher"]
      },
      {
        id: 555,
        term: "Pemantauan",
        category: "sistem-pemerintahan",
        definition: "Kegiatan mengawasi",
        example: "Pemantauan kinerja pemerintah",
        legalBasis: "Sistem Pengawasan",
        englishTerm: "Monitoring",
        relatedTerms: ["Observation", "Surveillance"]
      },
      {
        id: 556,
        term: "Pemasyarakatan",
        category: "lembaga-negara",
        definition: "Sistem pembinaan narapidana",
        example: "Lembaga pemasyarakatan",
        legalBasis: "UU Pemasyarakatan",
        englishTerm: "Correctional System",
        relatedTerms: ["Lapas", "Prison System"]
      },
      {
        id: 557,
        term: "Pembagian Kekuasaan",
        category: "sistem-pemerintahan",
        definition: "Distribution of power",
        example: "Kekuasaan eksekutif, legislatif, yudikatif",
        legalBasis: "UUD 1945",
        englishTerm: "Division of Power",
        relatedTerms: ["Trias Politica", "Separation"]
      },
      {
        id: 558,
        term: "Pembangunan",
        category: "sistem-pemerintahan",
        definition: "Proses membangun negara",
        example: "Pembangunan nasional berkelanjutan",
        legalBasis: "RPJPN",
        englishTerm: "Development",
        relatedTerms: ["Nation Building", "Progress"]
      },
      {
        id: 559,
        term: "Pembangunan Berkelanjutan",
        category: "sistem-pemerintahan",
        definition: "Pembangunan yang memperhatikan masa depan",
        example: "SDGs Indonesia",
        legalBasis: "RPJMN",
        englishTerm: "Sustainable Development",
        relatedTerms: ["SDGs", "Sustainability"]
      },
      {
        id: 560,
        term: "Pembangunan Nasional",
        category: "sistem-pemerintahan",
        definition: "Pembangunan seluruh aspek bangsa",
        example: "Program pembangunan 5 tahun",
        legalBasis: "UU SPPN",
        englishTerm: "National Development",
        relatedTerms: ["Nation Building", "Development"]
      },
      {
        id: 561,
        term: "Pembantu Presiden",
        category: "lembaga-negara",
        definition: "Pejabat yang membantu presiden",
        example: "Menteri dan staf khusus",
        legalBasis: "UUD 1945",
        englishTerm: "Presidential Assistant",
        relatedTerms: ["Presidential Staff", "Aide"]
      },
      {
        id: 562,
        term: "Pembatalan",
        category: "perundang-undangan",
        definition: "Pencabutan keberlakuan",
        example: "Pembatalan perda oleh Mendagri",
        legalBasis: "UU Pemda",
        englishTerm: "Cancellation",
        relatedTerms: ["Annulment", "Revocation"]
      },
      {
        id: 563,
        term: "Pembatasan",
        category: "hak-kewajiban",
        definition: "Pengurangan hak tertentu",
        example: "Pembatasan HAM dalam keadaan darurat",
        legalBasis: "UU HAM",
        englishTerm: "Limitation",
        relatedTerms: ["Restriction", "Constraint"]
      },
      {
        id: 564,
        term: "Pembauran",
        category: "konstitusi",
        definition: "Asimilasi dalam masyarakat",
        example: "Pembauran etnis di Indonesia",
        legalBasis: "Bhinneka Tunggal Ika",
        englishTerm: "Assimilation",
        relatedTerms: ["Integration", "Asimilasi"]
      },
      {
        id: 565,
        term: "Pembebasan",
        category: "lembaga-negara",
        definition: "Pelepasan dari tugas/hukuman",
        example: "Pembebasan tahanan politik",
        legalBasis: "Keppres",
        englishTerm: "Release",
        relatedTerms: ["Liberation", "Discharge"]
      },
      {
        id: 566,
        term: "Pembela",
        category: "hak-kewajiban",
        definition: "Pihak yang membela",
        example: "Pembela HAM",
        legalBasis: "UU HAM",
        englishTerm: "Defender",
        relatedTerms: ["Advocate", "Protector"]
      },
      {
        id: 567,
        term: "Pembelaan",
        category: "hak-kewajiban",
        definition: "Upaya membela diri",
        example: "Hak pembelaan di pengadilan",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Defense",
        relatedTerms: ["Legal Defense", "Protection"]
      },
      {
        id: 568,
        term: "Pembentukan",
        category: "perundang-undangan",
        definition: "Proses membuat peraturan",
        example: "Pembentukan undang-undang",
        legalBasis: "UU P3",
        englishTerm: "Formation",
        relatedTerms: ["Law Making", "Creation"]
      },
      {
        id: 569,
        term: "Pemberantasan",
        category: "sistem-pemerintahan",
        definition: "Upaya menghilangkan",
        example: "Pemberantasan korupsi",
        legalBasis: "UU KPK",
        englishTerm: "Eradication",
        relatedTerms: ["Elimination", "Combat"]
      },
      {
        id: 570,
        term: "Pemberdayaan",
        category: "sistem-pemerintahan",
        definition: "Upaya meningkatkan kemampuan",
        example: "Pemberdayaan masyarakat desa",
        legalBasis: "UU Desa",
        englishTerm: "Empowerment",
        relatedTerms: ["Capacity Building", "Strengthening"]
      },
      {
        id: 571,
        term: "Pemberhentian",
        category: "lembaga-negara",
        definition: "Pengakhiran masa jabatan",
        example: "Pemberhentian pejabat negara",
        legalBasis: "UU terkait",
        englishTerm: "Dismissal",
        relatedTerms: ["Termination", "Removal"]
      },
      {
        id: 572,
        term: "Pemberhentian Dengan Hormat",
        category: "lembaga-negara",
        definition: "Pemberhentian tanpa sanksi",
        example: "Pensiun PNS",
        legalBasis: "UU ASN",
        englishTerm: "Honorable Discharge",
        relatedTerms: ["Retirement", "Pensiun"]
      },
      {
        id: 573,
        term: "Pemberhentian Tidak Dengan Hormat",
        category: "lembaga-negara",
        definition: "Pemberhentian karena pelanggaran",
        example: "Pemecatan karena korupsi",
        legalBasis: "UU ASN",
        englishTerm: "Dishonorable Discharge",
        relatedTerms: ["Dismissal", "Pemecatan"]
      },
      {
        id: 574,
        term: "Pemberian Grasi",
        category: "lembaga-negara",
        definition: "Pengampunan dari presiden",
        example: "Grasi untuk terpidana mati",
        legalBasis: "Pasal 14 UUD 1945",
        englishTerm: "Granting Clemency",
        relatedTerms: ["Pardon", "Pengampunan"]
      },
      {
        id: 575,
        term: "Pemberitahuan",
        category: "perundang-undangan",
        definition: "Informasi resmi",
        example: "Pemberitahuan peraturan baru",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Notification",
        relatedTerms: ["Notice", "Announcement"]
      },
      {
        id: 576,
        term: "Pemberontakan",
        category: "konstitusi",
        definition: "Tindakan melawan pemerintah sah",
        example: "Pemberontakan G30S/PKI",
        legalBasis: "KUHP",
        englishTerm: "Rebellion",
        relatedTerms: ["Revolt", "Insurrection"]
      },
      {
        id: 577,
        term: "Pembinaan",
        category: "sistem-pemerintahan",
        definition: "Upaya pengembangan",
        example: "Pembinaan aparatur negara",
        legalBasis: "UU ASN",
        englishTerm: "Development",
        relatedTerms: ["Coaching", "Guidance"]
      },
      {
        id: 578,
        term: "Pembiayaan",
        category: "sistem-pemerintahan",
        definition: "Pendanaan kegiatan",
        example: "Pembiayaan APBN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Financing",
        relatedTerms: ["Funding", "Budgeting"]
      },
      {
        id: 579,
        term: "Pembuatan Kebijakan",
        category: "sistem-pemerintahan",
        definition: "Proses membuat kebijakan",
        example: "Policy making pemerintah",
        legalBasis: "Ilmu Administrasi",
        englishTerm: "Policy Making",
        relatedTerms: ["Policy Formation", "Kebijakan"]
      },
      {
        id: 580,
        term: "Pembubaran",
        category: "lembaga-negara",
        definition: "Pengakhiran eksistensi lembaga",
        example: "Pembubaran partai politik",
        legalBasis: "UU Parpol",
        englishTerm: "Dissolution",
        relatedTerms: ["Disbandment", "Termination"]
      },
      {
        id: 581,
        term: "Pembukaan UUD",
        category: "konstitusi",
        definition: "Mukadimah konstitusi",
        example: "Pembukaan UUD 1945",
        legalBasis: "UUD 1945",
        englishTerm: "Preamble",
        relatedTerms: ["Preambule", "Mukadimah"],
        trending: true
      },
      {
        id: 582,
        term: "Pemda",
        category: "lembaga-negara",
        definition: "Pemerintah daerah",
        example: "Pemda provinsi dan kabupaten/kota",
        legalBasis: "UU Pemda",
        englishTerm: "Local Government",
        relatedTerms: ["Regional Government", "Pemerintah Daerah"]
      },
      {
        id: 583,
        term: "Pemegang Kekuasaan",
        category: "lembaga-negara",
        definition: "Yang memiliki kewenangan",
        example: "Presiden pemegang kekuasaan pemerintahan",
        legalBasis: "UUD 1945",
        englishTerm: "Power Holder",
        relatedTerms: ["Authority Holder", "Penguasa"]
      },
      {
        id: 584,
        term: "Pemerataan",
        category: "sistem-pemerintahan",
        definition: "Distribusi yang adil",
        example: "Pemerataan pembangunan",
        legalBasis: "RPJPN",
        englishTerm: "Equalization",
        relatedTerms: ["Distribution", "Equity"]
      },
      {
        id: 585,
        term: "Pemerintah",
        category: "lembaga-negara",
        definition: "Lembaga eksekutif negara",
        example: "Pemerintah pusat dan daerah",
        legalBasis: "UUD 1945",
        englishTerm: "Government",
        relatedTerms: ["Executive", "Administration"]
      },
      {
        id: 586,
        term: "Pemerintah Daerah",
        category: "lembaga-negara",
        definition: "Pemerintah provinsi/kabupaten/kota",
        example: "Gubernur memimpin pemerintah daerah",
        legalBasis: "UU Pemda",
        englishTerm: "Local Government",
        relatedTerms: ["Regional Government", "Pemda"]
      },
      {
        id: 587,
        term: "Pemerintah Pusat",
        category: "lembaga-negara",
        definition: "Pemerintah tingkat nasional",
        example: "Presiden dan menteri",
        legalBasis: "UUD 1945",
        englishTerm: "Central Government",
        relatedTerms: ["National Government", "Federal"]
      },
      {
        id: 588,
        term: "Pemerintahan",
        category: "sistem-pemerintahan",
        definition: "Sistem dan proses memerintah",
        example: "Pemerintahan yang bersih",
        legalBasis: "UUD 1945",
        englishTerm: "Governance",
        relatedTerms: ["Administration", "Governing"]
      },
      {
        id: 589,
        term: "Pemerintahan Daerah",
        category: "sistem-pemerintahan",
        definition: "Penyelenggaraan urusan daerah",
        example: "Otonomi pemerintahan daerah",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Governance",
        relatedTerms: ["Local Governance", "Pemda"]
      },
      {
        id: 590,
        term: "Pemerintahan Darurat",
        category: "sistem-pemerintahan",
        definition: "Pemerintahan dalam keadaan darurat",
        example: "Emergency government",
        legalBasis: "UUD 1945",
        englishTerm: "Emergency Government",
        relatedTerms: ["Crisis Government", "Darurat"]
      },
      {
        id: 591,
        term: "Pemerintahan Sementara",
        category: "sistem-pemerintahan",
        definition: "Pemerintahan transisi",
        example: "Interim government",
        legalBasis: "Konstitusi",
        englishTerm: "Interim Government",
        relatedTerms: ["Transitional", "Temporary"]
      },
      {
        id: 592,
        term: "Pemeriksaan",
        category: "lembaga-negara",
        definition: "Proses audit atau investigasi",
        example: "Pemeriksaan BPK",
        legalBasis: "UU BPK",
        englishTerm: "Examination",
        relatedTerms: ["Audit", "Investigation"]
      },
      {
        id: 593,
        term: "Pemeriksa",
        category: "lembaga-negara",
        definition: "Yang melakukan pemeriksaan",
        example: "BPK sebagai pemeriksa keuangan",
        legalBasis: "UU BPK",
        englishTerm: "Examiner",
        relatedTerms: ["Auditor", "Inspector"]
      },
      {
        id: 594,
        term: "Pemicu",
        category: "sistem-pemerintahan",
        definition: "Penyebab terjadinya sesuatu",
        example: "Pemicu konflik politik",
        legalBasis: "Analisis Politik",
        englishTerm: "Trigger",
        relatedTerms: ["Catalyst", "Cause"]
      },
      {
        id: 595,
        term: "Pemihakan",
        category: "sistem-pemerintahan",
        definition: "Sikap memihak",
        example: "Pemihakan pada rakyat kecil",
        legalBasis: "Kebijakan Publik",
        englishTerm: "Taking Sides",
        relatedTerms: ["Partiality", "Bias"]
      },
      {
        id: 596,
        term: "Pemikiran",
        category: "konstitusi",
        definition: "Gagasan atau ide",
        example: "Pemikiran founding fathers",
        legalBasis: "Sejarah Konstitusi",
        englishTerm: "Thought",
        relatedTerms: ["Ideas", "Thinking"]
      },
      {
        id: 597,
        term: "Pemilih",
        category: "hak-kewajiban",
        definition: "Warga yang berhak memilih",
        example: "Pemilih terdaftar dalam DPT",
        legalBasis: "UU Pemilu",
        englishTerm: "Voter",
        relatedTerms: ["Elector", "Constituent"]
      },
      {
        id: 598,
        term: "Pemilihan",
        category: "sistem-pemerintahan",
        definition: "Proses memilih",
        example: "Pemilihan presiden",
        legalBasis: "UU Pemilu",
        englishTerm: "Election",
        relatedTerms: ["Voting", "Selection"]
      },
      {
        id: 599,
        term: "Pemilihan Kepala Daerah",
        category: "sistem-pemerintahan",
        definition: "Pemilihan gubernur/bupati/walikota",
        example: "Pilkada serentak",
        legalBasis: "UU Pilkada",
        englishTerm: "Regional Election",
        relatedTerms: ["Pilkada", "Local Election"]
      },
      {
        id: 600,
        term: "Pemilihan Langsung",
        category: "sistem-pemerintahan",
        definition: "Pemilihan oleh rakyat langsung",
        example: "Pilpres langsung sejak 2004",
        legalBasis: "UU Pemilu",
        englishTerm: "Direct Election",
        relatedTerms: ["Direct Vote", "Langsung"]
      },
      
      // Melanjutkan sisa istilah hingga selesai
      {
        id: 601,
        term: "Pemilihan Umum",
        category: "sistem-pemerintahan",
        definition: "Mekanisme pergantian kekuasaan",
        example: "Pemilu 5 tahunan",
        legalBasis: "UU Pemilu",
        englishTerm: "General Election",
        relatedTerms: ["Pemilu", "Election"],
        trending: true
      },
      {
        id: 602,
        term: "Pemimpin",
        category: "lembaga-negara",
        definition: "Orang yang memimpin",
        example: "Pemimpin negara dan daerah",
        legalBasis: "UUD 1945",
        englishTerm: "Leader",
        relatedTerms: ["Leadership", "Kepemimpinan"]
      },
      {
        id: 603,
        term: "Pemindahan Ibu Kota",
        category: "sistem-pemerintahan",
        definition: "Relokasi pusat pemerintahan",
        example: "IKN Nusantara",
        legalBasis: "UU IKN",
        englishTerm: "Capital Relocation",
        relatedTerms: ["IKN", "New Capital"],
        trending: true
      },
      {
        id: 604,
        term: "Pemisahan Kekuasaan",
        category: "sistem-pemerintahan",
        definition: "Separation of powers",
        example: "Eksekutif, legislatif, yudikatif terpisah",
        legalBasis: "UUD 1945",
        englishTerm: "Separation of Powers",
        relatedTerms: ["Trias Politica", "Division"]
      },
      {
        id: 605,
        term: "Pemohon",
        category: "lembaga-negara",
        definition: "Pihak yang mengajukan permohonan",
        example: "Pemohon judicial review",
        legalBasis: "UU MK",
        englishTerm: "Petitioner",
        relatedTerms: ["Applicant", "Claimant"]
      },
      {
        id: 606,
        term: "Pemuda",
        category: "konstitusi",
        definition: "Generasi muda bangsa",
        example: "Sumpah Pemuda 1928",
        legalBasis: "UU Kepemudaan",
        englishTerm: "Youth",
        relatedTerms: ["Young Generation", "Generasi Muda"]
      },
      {
        id: 607,
        term: "Pemufakatan",
        category: "sistem-pemerintahan",
        definition: "Kesepakatan bersama",
        example: "Pemufakatan dalam musyawarah",
        legalBasis: "Pancasila",
        englishTerm: "Consensus",
        relatedTerms: ["Agreement", "Mufakat"]
      },
      {
        id: 608,
        term: "Pemulihan",
        category: "sistem-pemerintahan",
        definition: "Upaya mengembalikan kondisi",
        example: "Pemulihan ekonomi nasional",
        legalBasis: "Kebijakan Pemerintah",
        englishTerm: "Recovery",
        relatedTerms: ["Restoration", "Rehabilitation"]
      },
      {
        id: 609,
        term: "Pemungutan Suara",
        category: "sistem-pemerintahan",
        definition: "Proses pemberian suara",
        example: "Pemungutan suara di TPS",
        legalBasis: "UU Pemilu",
        englishTerm: "Voting",
        relatedTerms: ["Balloting", "Pencoblosan"]
      },
      {
        id: 610,
        term: "Pemurnian",
        category: "konstitusi",
        definition: "Mengembalikan ke asli",
        example: "Pemurnian Pancasila",
        legalBasis: "Sejarah Politik",
        englishTerm: "Purification",
        relatedTerms: ["Restoration", "Purify"]
      },
      {
        id: 611,
        term: "Pemutusan Hubungan",
        category: "sistem-pemerintahan",
        definition: "Penghentian relasi",
        example: "Pemutusan hubungan diplomatik",
        legalBasis: "Hukum Internasional",
        englishTerm: "Severance",
        relatedTerms: ["Breaking Relations", "Cut Ties"]
      },
      {
        id: 612,
        term: "Penasehat",
        category: "lembaga-negara",
        definition: "Pemberi nasihat",
        example: "Dewan Pertimbangan Presiden",
        legalBasis: "Perpres",
        englishTerm: "Advisor",
        relatedTerms: ["Consultant", "Counselor"]
      },
      {
        id: 613,
        term: "Penataan",
        category: "sistem-pemerintahan",
        definition: "Pengaturan kembali",
        example: "Penataan organisasi pemerintah",
        legalBasis: "Perpres",
        englishTerm: "Reorganization",
        relatedTerms: ["Restructuring", "Arrangement"]
      },
      {
        id: 614,
        term: "Pencabutan",
        category: "perundang-undangan",
        definition: "Penghapusan keberlakuan",
        example: "Pencabutan peraturan lama",
        legalBasis: "UU P3",
        englishTerm: "Revocation",
        relatedTerms: ["Repeal", "Withdrawal"]
      },
      {
        id: 615,
        term: "Pencalonan",
        category: "sistem-pemerintahan",
        definition: "Proses mengajukan calon",
        example: "Pencalonan presiden",
        legalBasis: "UU Pemilu",
        englishTerm: "Nomination",
        relatedTerms: ["Candidacy", "Nomination Process"]
      },
      {
        id: 616,
        term: "Pencegahan",
        category: "sistem-pemerintahan",
        definition: "Upaya preventif",
        example: "Pencegahan korupsi",
        legalBasis: "UU KPK",
        englishTerm: "Prevention",
        relatedTerms: ["Preventive", "Deterrence"]
      },
      {
        id: 617,
        term: "Pencemaran",
        category: "sistem-pemerintahan",
        definition: "Perusakan lingkungan",
        example: "Pencemaran lingkungan hidup",
        legalBasis: "UU Lingkungan",
        englishTerm: "Pollution",
        relatedTerms: ["Contamination", "Environmental Damage"]
      },
      {
        id: 618,
        term: "Pendaftaran",
        category: "sistem-pemerintahan",
        definition: "Proses registrasi",
        example: "Pendaftaran pemilih",
        legalBasis: "UU Pemilu",
        englishTerm: "Registration",
        relatedTerms: ["Enrollment", "Registrasi"]
      },
      {
        id: 619,
        term: "Pendahulu",
        category: "lembaga-negara",
        definition: "Pejabat sebelumnya",
        example: "Presiden pendahulu",
        legalBasis: "Sejarah",
        englishTerm: "Predecessor",
        relatedTerms: ["Former", "Previous"]
      },
      {
        id: 620,
        term: "Pendanaan",
        category: "sistem-pemerintahan",
        definition: "Penyediaan dana",
        example: "Pendanaan partai politik",
        legalBasis: "UU Parpol",
        englishTerm: "Funding",
        relatedTerms: ["Financing", "Financial Support"]
      },
      {
        id: 621,
        term: "Pendapat",
        category: "lembaga-negara",
        definition: "Pandangan atau opini",
        example: "Pendapat DPR",
        legalBasis: "UU MD3",
        englishTerm: "Opinion",
        relatedTerms: ["View", "Statement"]
      },
      {
        id: 622,
        term: "Pendapatan",
        category: "sistem-pemerintahan",
        definition: "Penerimaan negara/daerah",
        example: "Pendapatan APBN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Revenue",
        relatedTerms: ["Income", "Receipts"]
      },
      {
        id: 623,
        term: "Pendataan",
        category: "sistem-pemerintahan",
        definition: "Proses pengumpulan data",
        example: "Pendataan penduduk",
        legalBasis: "UU Adminduk",
        englishTerm: "Data Collection",
        relatedTerms: ["Census", "Survey"]
      },
      {
        id: 624,
        term: "Pendekatan",
        category: "sistem-pemerintahan",
        definition: "Cara atau metode",
        example: "Pendekatan kesejahteraan",
        legalBasis: "Kebijakan",
        englishTerm: "Approach",
        relatedTerms: ["Method", "Strategy"]
      },
      {
        id: 625,
        term: "Pendelegasian",
        category: "lembaga-negara",
        definition: "Pelimpahan wewenang",
        example: "Delegasi presiden ke menteri",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Delegation",
        relatedTerms: ["Devolution", "Transfer"]
      },
      {
        id: 626,
        term: "Pendemokrasian",
        category: "sistem-pemerintahan",
        definition: "Proses demokratisasi",
        example: "Reformasi 1998",
        legalBasis: "Sejarah Politik",
        englishTerm: "Democratization",
        relatedTerms: ["Democratic Reform", "Reformasi"]
      },
      {
        id: 627,
        term: "Pendidikan",
        category: "hak-kewajiban",
        definition: "Hak dasar warga negara",
        example: "Pendidikan wajib 12 tahun",
        legalBasis: "Pasal 31 UUD 1945",
        englishTerm: "Education",
        relatedTerms: ["Learning", "Schooling"]
      },
      {
        id: 628,
        term: "Pendidikan Politik",
        category: "sistem-pemerintahan",
        definition: "Pembelajaran tentang politik",
        example: "Pendidikan politik oleh parpol",
        legalBasis: "UU Parpol",
        englishTerm: "Political Education",
        relatedTerms: ["Civic Education", "Pendidikan Kewarganegaraan"]
      },
      {
        id: 629,
        term: "Pendirian",
        category: "perundang-undangan",
        definition: "Pembentukan lembaga",
        example: "Pendirian lembaga negara baru",
        legalBasis: "UU terkait",
        englishTerm: "Establishment",
        relatedTerms: ["Foundation", "Formation"]
      },
      {
        id: 630,
        term: "Pendiri Bangsa",
        category: "konstitusi",
        definition: "Founding fathers Indonesia",
        example: "Soekarno, Hatta, dll",
        legalBasis: "Sejarah",
        englishTerm: "Founding Fathers",
        relatedTerms: ["Founders", "Bapak Bangsa"]
      },
      {
        id: 631,
        term: "Pendistribusian",
        category: "sistem-pemerintahan",
        definition: "Penyaluran atau pembagian",
        example: "Distribusi kekuasaan",
        legalBasis: "UUD 1945",
        englishTerm: "Distribution",
        relatedTerms: ["Allocation", "Pembagian"]
      },
      {
        id: 632,
        term: "Pendokumentasian",
        category: "perundang-undangan",
        definition: "Proses dokumentasi",
        example: "Dokumentasi peraturan",
        legalBasis: "UU Kearsipan",
        englishTerm: "Documentation",
        relatedTerms: ["Recording", "Archiving"]
      },
      {
        id: 633,
        term: "Penduduk",
        category: "konstitusi",
        definition: "Orang yang mendiami wilayah",
        example: "Penduduk Indonesia",
        legalBasis: "UU Kependudukan",
        englishTerm: "Population",
        relatedTerms: ["Inhabitants", "Residents"]
      },
      {
        id: 634,
        term: "Penelaahan",
        category: "perundang-undangan",
        definition: "Proses menelaah",
        example: "Penelaahan RUU",
        legalBasis: "Proses Legislasi",
        englishTerm: "Review",
        relatedTerms: ["Examination", "Study"]
      },
      {
        id: 635,
        term: "Penelitian",
        category: "sistem-pemerintahan",
        definition: "Kegiatan riset",
        example: "Penelitian kebijakan publik",
        legalBasis: "UU Sisnas Iptek",
        englishTerm: "Research",
        relatedTerms: ["Study", "Investigation"]
      },
      {
        id: 636,
        term: "Penemuan Hukum",
        category: "perundang-undangan",
        definition: "Proses menemukan hukum",
        example: "Rechtsvinding oleh hakim",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Legal Discovery",
        relatedTerms: ["Rechtsvinding", "Legal Finding"]
      },
      {
        id: 637,
        term: "Penentuan",
        category: "sistem-pemerintahan",
        definition: "Proses menetapkan",
        example: "Penentuan kebijakan",
        legalBasis: "Proses Kebijakan",
        englishTerm: "Determination",
        relatedTerms: ["Decision", "Setting"]
      },
      {
        id: 638,
        term: "Penerimaan",
        category: "sistem-pemerintahan",
        definition: "Pemasukan negara",
        example: "Penerimaan pajak",
        legalBasis: "UU APBN",
        englishTerm: "Revenue",
        relatedTerms: ["Income", "Receipt"]
      },
      {
        id: 639,
        term: "Penerus",
        category: "lembaga-negara",
        definition: "Pengganti atau suksesor",
        example: "Penerus kepemimpinan",
        legalBasis: "Suksesi",
        englishTerm: "Successor",
        relatedTerms: ["Heir", "Next"]
      },
      {
        id: 640,
        term: "Penetapan",
        category: "perundang-undangan",
        definition: "Keputusan yang mengikat",
        example: "Penetapan presiden",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Determination",
        relatedTerms: ["Decree", "Decision"]
      },
      {
        id: 641,
        term: "Penegak Hukum",
        category: "lembaga-negara",
        definition: "Aparat penegakan hukum",
        example: "Polisi, jaksa, hakim",
        legalBasis: "UU terkait",
        englishTerm: "Law Enforcement",
        relatedTerms: ["Legal Officers", "APH"]
      },
      {
        id: 642,
        term: "Penegakan",
        category: "sistem-pemerintahan",
        definition: "Upaya menegakkan",
        example: "Penegakan hukum",
        legalBasis: "UUD 1945",
        englishTerm: "Enforcement",
        relatedTerms: ["Implementation", "Upholding"]
      },
      {
        id: 643,
        term: "Penegasan",
        category: "perundang-undangan",
        definition: "Penguatan atau konfirmasi",
        example: "Penegasan aturan",
        legalBasis: "Teknik Perundangan",
        englishTerm: "Affirmation",
        relatedTerms: ["Confirmation", "Emphasis"]
      },
      {
        id: 644,
        term: "Penempatan",
        category: "lembaga-negara",
        definition: "Proses menempatkan",
        example: "Penempatan pejabat",
        legalBasis: "UU ASN",
        englishTerm: "Placement",
        relatedTerms: ["Assignment", "Positioning"]
      },
      {
        id: 645,
        term: "Penentuan Pendapat",
        category: "lembaga-negara",
        definition: "Proses MPR memutuskan",
        example: "Voting impeachment di MPR",
        legalBasis: "UUD 1945",
        englishTerm: "Opinion Determination",
        relatedTerms: ["Decision Making", "Voting"]
      },
      {
        id: 646,
        term: "Penerapan",
        category: "perundang-undangan",
        definition: "Implementasi aturan",
        example: "Penerapan undang-undang",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Application",
        relatedTerms: ["Implementation", "Enforcement"]
      },
      {
        id: 647,
        term: "Pengabdian",
        category: "hak-kewajiban",
        definition: "Dedikasi untuk negara",
        example: "Pengabdian ASN",
        legalBasis: "UU ASN",
        englishTerm: "Service",
        relatedTerms: ["Dedication", "Devotion"]
      },
      {
        id: 648,
        term: "Pengadaan",
        category: "sistem-pemerintahan",
        definition: "Proses penyediaan",
        example: "Pengadaan barang/jasa pemerintah",
        legalBasis: "Perpres PBJ",
        englishTerm: "Procurement",
        relatedTerms: ["Acquisition", "Purchasing"]
      },
      {
        id: 649,
        term: "Pengadilan",
        category: "lembaga-negara",
        definition: "Lembaga peradilan",
        example: "Pengadilan negeri, tinggi, MA",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Court",
        relatedTerms: ["Judiciary", "Tribunal"]
      },
      {
        id: 650,
        term: "Pengaduan",
        category: "hak-kewajiban",
        definition: "Laporan keluhan",
        example: "Pengaduan ke ombudsman",
        legalBasis: "UU Ombudsman",
        englishTerm: "Complaint",
        relatedTerms: ["Report", "Grievance"]
      },
      {
        id: 651,
        term: "Pengakuan",
        category: "konstitusi",
        definition: "Pernyataan mengakui",
        example: "Pengakuan kedaulatan",
        legalBasis: "Hukum Internasional",
        englishTerm: "Recognition",
        relatedTerms: ["Acknowledgment", "Acceptance"]
      },
      {
        id: 652,
        term: "Pengalihan",
        category: "lembaga-negara",
        definition: "Pemindahan kewenangan",
        example: "Transfer of power",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Transfer",
        relatedTerms: ["Transition", "Handover"]
      },
      {
        id: 653,
        term: "Pengaman",
        category: "lembaga-negara",
        definition: "Yang memberikan keamanan",
        example: "Paspampres",
        legalBasis: "Perpres",
        englishTerm: "Security",
        relatedTerms: ["Guard", "Protection"]
      },
      {
        id: 654,
        term: "Pengamanan",
        category: "sistem-pemerintahan",
        definition: "Upaya mengamankan",
        example: "Pengamanan VVIP",
        legalBasis: "UU Kepolisian",
        englishTerm: "Securing",
        relatedTerms: ["Security Measures", "Protection"]
      },
      {
        id: 655,
        term: "Pengambilan Keputusan",
        category: "sistem-pemerintahan",
        definition: "Proses memutuskan",
        example: "Decision making di DPR",
        legalBasis: "Tata Tertib",
        englishTerm: "Decision Making",
        relatedTerms: ["Decision Process", "Deliberation"]
      },
      {
        id: 656,
        term: "Pengambilan Sumpah",
        category: "lembaga-negara",
        definition: "Pelantikan dengan sumpah",
        example: "Sumpah jabatan presiden",
        legalBasis: "UUD 1945",
        englishTerm: "Oath Taking",
        relatedTerms: ["Swearing In", "Pelantikan"]
      },
      {
        id: 657,
        term: "Pengampunan",
        category: "lembaga-negara",
        definition: "Pemberian maaf presiden",
        example: "Amnesti dan abolisi",
        legalBasis: "Pasal 14 UUD 1945",
        englishTerm: "Pardon",
        relatedTerms: ["Clemency", "Forgiveness"]
      },
      {
        id: 658,
        term: "Penganggaran",
        category: "sistem-pemerintahan",
        definition: "Proses penyusunan anggaran",
        example: "Penganggaran APBN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Budgeting",
        relatedTerms: ["Budget Planning", "Anggaran"]
      },
      {
        id: 659,
        term: "Pengangkatan",
        category: "lembaga-negara",
        definition: "Proses mengangkat pejabat",
        example: "Pengangkatan menteri",
        legalBasis: "UUD 1945",
        englishTerm: "Appointment",
        relatedTerms: ["Installation", "Designation"]
      },
      {
        id: 660,
        term: "Pengarahan",
        category: "sistem-pemerintahan",
        definition: "Pemberian arahan",
        example: "Pengarahan presiden",
        legalBasis: "Administrasi",
        englishTerm: "Direction",
        relatedTerms: ["Guidance", "Briefing"]
      },
      {
        id: 661,
        term: "Pengaruh",
        category: "sistem-pemerintahan",
        definition: "Dampak atau efek",
        example: "Pengaruh kebijakan",
        legalBasis: "Analisis Kebijakan",
        englishTerm: "Influence",
        relatedTerms: ["Impact", "Effect"]
      },
      {
        id: 662,
        term: "Pengaturan",
        category: "perundang-undangan",
        definition: "Proses mengatur",
        example: "Pengaturan dalam UU",
        legalBasis: "UU P3",
        englishTerm: "Regulation",
        relatedTerms: ["Arrangement", "Provision"]
      },
      {
        id: 663,
        term: "Pengawas",
        category: "lembaga-negara",
        definition: "Yang melakukan pengawasan",
        example: "Bawaslu pengawas pemilu",
        legalBasis: "UU Pemilu",
        englishTerm: "Supervisor",
        relatedTerms: ["Overseer", "Monitor"]
      },
      {
        id: 664,
        term: "Pengawasan",
        category: "lembaga-negara",
        definition: "Fungsi kontrol",
        example: "Pengawasan DPR",
        legalBasis: "UUD 1945",
        englishTerm: "Oversight",
        relatedTerms: ["Supervision", "Control"]
      },
      {
        id: 665,
        term: "Pengayom",
        category: "lembaga-negara",
        definition: "Pelindung masyarakat",
        example: "Polisi sebagai pengayom",
        legalBasis: "UU Kepolisian",
        englishTerm: "Protector",
        relatedTerms: ["Guardian", "Pelindung"]
      },
      {
        id: 666,
        term: "Pengayoman",
        category: "sistem-pemerintahan",
        definition: "Perlindungan kepada rakyat",
        example: "Fungsi pengayoman negara",
        legalBasis: "UUD 1945",
        englishTerm: "Protection",
        relatedTerms: ["Guardianship", "Shelter"]
      },
      {
        id: 667,
        term: "Pengecekan",
        category: "sistem-pemerintahan",
        definition: "Proses verifikasi",
        example: "Pengecekan dokumen",
        legalBasis: "SOP",
        englishTerm: "Checking",
        relatedTerms: ["Verification", "Inspection"]
      },
      {
        id: 668,
        term: "Pengelola",
        category: "lembaga-negara",
        definition: "Yang mengelola",
        example: "Pengelola keuangan negara",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Manager",
        relatedTerms: ["Administrator", "Operator"]
      },
      {
        id: 669,
        term: "Pengelolaan",
        category: "sistem-pemerintahan",
        definition: "Proses mengelola",
        example: "Pengelolaan APBN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Management",
        relatedTerms: ["Administration", "Handling"]
      },
      {
        id: 670,
        term: "Pengeluaran",
        category: "sistem-pemerintahan",
        definition: "Belanja negara/daerah",
        example: "Pengeluaran APBN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Expenditure",
        relatedTerms: ["Spending", "Disbursement"]
      },
      {
        id: 671,
        term: "Pengembangan",
        category: "sistem-pemerintahan",
        definition: "Upaya mengembangkan",
        example: "Pengembangan SDM",
        legalBasis: "RPJMN",
        englishTerm: "Development",
        relatedTerms: ["Expansion", "Growth"]
      },
      {
        id: 672,
        term: "Pengemban",
        category: "lembaga-negara",
        definition: "Yang membawa tugas",
        example: "Pengemban amanat rakyat",
        legalBasis: "UUD 1945",
        englishTerm: "Bearer",
        relatedTerms: ["Carrier", "Mandate Holder"]
      },
      {
        id: 673,
        term: "Pengembangan Wilayah",
        category: "sistem-pemerintahan",
        definition: "Pembangunan daerah",
        example: "Pengembangan daerah tertinggal",
        legalBasis: "UU Pembangunan Daerah",
        englishTerm: "Regional Development",
        relatedTerms: ["Area Development", "Pembangunan Daerah"]
      },
      {
        id: 674,
        term: "Pengendalian",
        category: "sistem-pemerintahan",
        definition: "Upaya mengontrol",
        example: "Pengendalian inflasi",
        legalBasis: "UU Bank Indonesia",
        englishTerm: "Control",
        relatedTerms: ["Controlling", "Regulation"]
      },
      {
        id: 675,
        term: "Pengendali",
        category: "lembaga-negara",
        definition: "Yang mengendalikan atau memimpin jalannya pemerintahan",
        example: "Presiden sebagai pengendali pemerintahan negara",
        legalBasis: "UUD 1945",
        englishTerm: "Controller",
        relatedTerms: ["Pemimpin", "Kepala Pemerintahan"]
      },
      {
        id: 676,
        term: "Pengesahan",
        category: "proses-legislasi",
        definition: "Proses memberikan persetujuan resmi terhadap undang-undang atau perjanjian",
        example: "Pengesahan RUU menjadi UU oleh Presiden",
        legalBasis: "Pasal 20 UUD 1945",
        englishTerm: "Ratification",
        relatedTerms: ["Ratifikasi", "Persetujuan"]
      },
      {
        id: 677,
        term: "Pengganti Antar Waktu",
        category: "lembaga-negara",
        definition: "Pengisian jabatan yang kosong di tengah masa jabatan",
        example: "PAW anggota DPR yang meninggal dunia",
        legalBasis: "UU MD3",
        englishTerm: "Interim Replacement",
        relatedTerms: ["PAW", "Pergantian"]
      },
      {
        id: 678,
        term: "Pengujian Undang-Undang",
        category: "hukum-konstitusi",
        definition: "Proses menguji kesesuaian UU dengan UUD",
        example: "Judicial review UU ke Mahkamah Konstitusi",
        legalBasis: "Pasal 24C UUD 1945",
        englishTerm: "Judicial Review",
        relatedTerms: ["Judicial Review", "Uji Materi"]
      },
      {
        id: 679,
        term: "Pengundangan",
        category: "proses-legislasi",
        definition: "Proses pengumuman resmi peraturan perundang-undangan",
        example: "Pengundangan UU dalam Lembaran Negara",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Promulgation",
        relatedTerms: ["Promulgasi", "Publikasi"]
      },
      {
        id: 680,
        term: "Penjabat",
        category: "lembaga-negara",
        definition: "Pejabat sementara yang menjalankan tugas jabatan",
        example: "Penjabat Gubernur sebelum Gubernur definitif",
        legalBasis: "UU Pemda",
        englishTerm: "Acting Official",
        relatedTerms: ["Plt", "Pelaksana Tugas"]
      },
      {
        id: 681,
        term: "Penjelasan UUD",
        category: "hukum-konstitusi",
        definition: "Uraian resmi tentang makna pasal-pasal UUD",
        example: "Penjelasan UUD 1945 (sudah dihapus)",
        legalBasis: "UUD 1945",
        englishTerm: "Constitutional Explanation",
        relatedTerms: ["Tafsir Konstitusi", "Interpretasi"]
      },
      {
        id: 682,
        term: "Pensiun Hakim",
        category: "kekuasaan-kehakiman",
        definition: "Berakhirnya masa jabatan hakim karena usia atau alasan lain",
        example: "Hakim pensiun pada usia 70 tahun",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Judicial Retirement",
        relatedTerms: ["Purna Tugas", "Retirement"]
      },
      {
        id: 683,
        term: "Penyimpangan Konstitusi",
        category: "hukum-konstitusi",
        definition: "Praktik yang menyimpang dari ketentuan konstitusi",
        example: "Dekrit Presiden 5 Juli 1959",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "Constitutional Deviation",
        relatedTerms: ["Pelanggaran Konstitusi", "Unconstitutional"]
      },
      {
        id: 684,
        term: "Penyusunan Program Legislasi",
        category: "proses-legislasi",
        definition: "Perencanaan pembentukan undang-undang",
        example: "Prolegnas tahunan DPR",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Legislative Programming",
        relatedTerms: ["Prolegnas", "Legislative Agenda"]
      },
      {
        id: 685,
        term: "Peradilan Satu Atap",
        category: "kekuasaan-kehakiman",
        definition: "Sistem peradilan di bawah Mahkamah Agung",
        example: "Semua peradilan di bawah MA sejak reformasi",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "One Roof Judiciary",
        relatedTerms: ["Unified Judiciary", "Integrasi Peradilan"]
      },
      {
        id: 686,
        term: "Peradilan Tata Negara",
        category: "kekuasaan-kehakiman",
        definition: "Lembaga yang menyelesaikan sengketa ketatanegaraan",
        example: "MK menangani sengketa kewenangan lembaga negara",
        legalBasis: "UUD 1945",
        englishTerm: "Constitutional Court",
        relatedTerms: ["Mahkamah Konstitusi", "Constitutional Justice"]
      },
      {
        id: 687,
        term: "Peraturan Bersama",
        category: "peraturan-perundangan",
        definition: "Peraturan yang ditetapkan bersama oleh beberapa menteri/lembaga",
        example: "Peraturan Bersama tentang Hari Libur Nasional",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Joint Regulation",
        relatedTerms: ["Joint Decree", "Keputusan Bersama"]
      },
      {
        id: 688,
        term: "Peraturan Daerah",
        category: "peraturan-perundangan",
        definition: "Peraturan yang dibentuk oleh DPRD dengan persetujuan Kepala Daerah",
        example: "Perda DKI Jakarta tentang pengelolaan sampah",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Regulation",
        relatedTerms: ["Perda", "Local Regulation"]
      },
      {
        id: 689,
        term: "Peraturan Desa",
        category: "peraturan-perundangan",
        definition: "Peraturan yang ditetapkan oleh Kepala Desa bersama BPD",
        example: "Perdes tentang pengelolaan dana desa",
        legalBasis: "UU Desa",
        englishTerm: "Village Regulation",
        relatedTerms: ["Perdes", "Village Law"]
      },
      {
        id: 690,
        term: "Peraturan Kebijakan",
        category: "peraturan-perundangan",
        definition: "Peraturan yang bersifat mengatur ke dalam (intern)",
        example: "Surat Edaran Menteri",
        legalBasis: "Doktrin Hukum Administrasi",
        englishTerm: "Policy Regulation",
        relatedTerms: ["Beleidsregel", "Policy Rule"]
      },
      {
        id: 691,
        term: "Peraturan Mahkamah Agung",
        category: "peraturan-perundangan",
        definition: "Peraturan yang dikeluarkan MA untuk mengatur peradilan",
        example: "Perma tentang mediasi di pengadilan",
        legalBasis: "UU MA",
        englishTerm: "Supreme Court Regulation",
        relatedTerms: ["Perma", "Court Regulation"]
      },
      {
        id: 692,
        term: "Peraturan Menteri",
        category: "peraturan-perundangan",
        definition: "Peraturan yang ditetapkan oleh Menteri",
        example: "Permendikbud tentang kurikulum",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Ministerial Regulation",
        relatedTerms: ["Permen", "Minister Decree"]
      },
      {
        id: 693,
        term: "Peraturan Pelaksana",
        category: "peraturan-perundangan",
        definition: "Peraturan untuk melaksanakan peraturan yang lebih tinggi",
        example: "PP sebagai pelaksana UU",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Implementing Regulation",
        relatedTerms: ["Peraturan Pelaksanaan", "Executive Regulation"]
      },
      {
        id: 694,
        term: "Peraturan Pemerintah",
        category: "peraturan-perundangan",
        definition: "Peraturan yang ditetapkan Presiden untuk melaksanakan UU",
        example: "PP tentang ASN",
        legalBasis: "Pasal 5 ayat (2) UUD 1945",
        englishTerm: "Government Regulation",
        relatedTerms: ["PP", "Executive Order"]
      },
      {
        id: 695,
        term: "Peraturan Pemerintah Pengganti UU",
        category: "peraturan-perundangan",
        definition: "Peraturan yang ditetapkan Presiden dalam keadaan mendesak",
        example: "Perppu Ormas tahun 2017",
        legalBasis: "Pasal 22 UUD 1945",
        englishTerm: "Government Regulation in Lieu of Law",
        relatedTerms: ["Perppu", "Emergency Decree"]
      },
      {
        id: 696,
        term: "Peraturan Presiden",
        category: "peraturan-perundangan",
        definition: "Peraturan yang ditetapkan oleh Presiden",
        example: "Perpres tentang pengadaan barang/jasa",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Presidential Regulation",
        relatedTerms: ["Perpres", "Presidential Decree"]
      },
      {
        id: 697,
        term: "Perbantuan",
        category: "lembaga-negara",
        definition: "Penugasan PNS ke lembaga lain sementara",
        example: "Hakim diperbantukan ke Kementerian",
        legalBasis: "UU ASN",
        englishTerm: "Secondment",
        relatedTerms: ["Detasering", "Temporary Assignment"]
      },
      {
        id: 698,
        term: "Perda Syariah",
        category: "peraturan-perundangan",
        definition: "Perda yang mengatur pelaksanaan syariat Islam",
        example: "Qanun di Aceh",
        legalBasis: "UU Otonomi Khusus Aceh",
        englishTerm: "Sharia Regional Regulation",
        relatedTerms: ["Qanun", "Islamic Law"]
      },
      {
        id: 699,
        term: "Perdamaian Desa",
        category: "pemerintahan-desa",
        definition: "Penyelesaian sengketa melalui musyawarah desa",
        example: "Mediasi sengketa tanah oleh kepala desa",
        legalBasis: "UU Desa",
        englishTerm: "Village Reconciliation",
        relatedTerms: ["Mediasi Desa", "Dispute Resolution"]
      },
      {
        id: 700,
        term: "Perencanaan Pembangunan",
        category: "pemerintahan",
        definition: "Proses penyusunan rencana pembangunan nasional/daerah",
        example: "RPJMN dan RPJMD",
        legalBasis: "UU SPPN",
        englishTerm: "Development Planning",
        relatedTerms: ["RPJM", "Development Plan"]
      },
      {
        id: 701,
        term: "Pergantian Presiden",
        category: "lembaga-negara",
        definition: "Proses penggantian Presiden di tengah masa jabatan",
        example: "Wapres menggantikan Presiden yang berhalangan tetap",
        legalBasis: "Pasal 8 UUD 1945",
        englishTerm: "Presidential Succession",
        relatedTerms: ["Suksesi", "Presidential Transition"]
      },
      {
        id: 702,
        term: "Perintah Harian",
        category: "pemerintahan",
        definition: "Pelaksanaan tugas rutin pemerintahan",
        example: "Presiden melaksanakan perintah harian",
        legalBasis: "Praktik Ketatanegaraan",
        englishTerm: "Daily Executive Orders",
        relatedTerms: ["Routine Orders", "Tugas Harian"]
      },
      {
        id: 703,
        term: "Perjalanan Dinas",
        category: "pemerintahan",
        definition: "Perjalanan untuk kepentingan negara/daerah",
        example: "Kunjungan kerja Presiden ke daerah",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Official Travel",
        relatedTerms: ["Kunjungan Kerja", "Official Visit"]
      },
      {
        id: 704,
        term: "Perjanjian Internasional",
        category: "hubungan-luar-negeri",
        definition: "Perjanjian antara Indonesia dengan negara lain atau organisasi internasional",
        example: "Perjanjian ekstradisi dengan Singapura",
        legalBasis: "UU No. 24/2000",
        englishTerm: "International Treaty",
        relatedTerms: ["Treaty", "International Agreement"]
      },
      {
        id: 705,
        term: "Perlindungan WNI",
        category: "hubungan-luar-negeri",
        definition: "Perlindungan negara terhadap warga negara di luar negeri",
        example: "Bantuan konsuler untuk WNI di luar negeri",
        legalBasis: "UUD 1945",
        englishTerm: "Citizen Protection",
        relatedTerms: ["Consular Protection", "Perlindungan Konsuler"]
      },
      {
        id: 706,
        term: "Permohonan Kewarganegaraan",
        category: "kewarganegaraan",
        definition: "Proses pengajuan untuk menjadi WNI",
        example: "Naturalisasi WNA menjadi WNI",
        legalBasis: "UU Kewarganegaraan",
        englishTerm: "Citizenship Application",
        relatedTerms: ["Naturalisasi", "Pewarganegaraan"]
      },
      {
        id: 707,
        term: "Permusyawaratan Rakyat",
        category: "demokrasi",
        definition: "Forum musyawarah untuk mufakat dalam pengambilan keputusan",
        example: "Musyawarah desa untuk menentukan prioritas pembangunan",
        legalBasis: "Pancasila Sila ke-4",
        englishTerm: "People's Deliberation",
        relatedTerms: ["Musyawarah", "Deliberation"]
      },
      {
        id: 708,
        term: "Perpanjangan Masa Jabatan",
        category: "lembaga-negara",
        definition: "Penambahan waktu jabatan melebihi periode normal",
        example: "Perpanjangan masa jabatan dalam keadaan darurat",
        legalBasis: "UUD 1945",
        englishTerm: "Term Extension",
        relatedTerms: ["Extension of Office", "Prolongasi"]
      },
      {
        id: 709,
        term: "Perpu",
        category: "peraturan-perundangan",
        definition: "Peraturan Pemerintah Pengganti Undang-Undang",
        example: "Perppu dikeluarkan dalam kegentingan memaksa",
        legalBasis: "Pasal 22 UUD 1945",
        englishTerm: "Emergency Decree",
        relatedTerms: ["Perppu", "Government Regulation in Lieu"]
      },
      {
        id: 710,
        term: "Persetujuan DPR",
        category: "proses-legislasi",
        definition: "Kesepakatan DPR terhadap usulan pemerintah",
        example: "Persetujuan DPR untuk pengangkatan duta besar",
        legalBasis: "UUD 1945",
        englishTerm: "Parliamentary Approval",
        relatedTerms: ["DPR Consent", "Legislative Approval"]
      },
      {
        id: 711,
        term: "Persetujuan Bersama",
        category: "proses-legislasi",
        definition: "Kesepakatan DPR dan Presiden atas RUU",
        example: "Persetujuan bersama RUU menjadi UU",
        legalBasis: "Pasal 20 UUD 1945",
        englishTerm: "Joint Approval",
        relatedTerms: ["Mutual Agreement", "Konsensus"]
      },
      {
        id: 712,
        term: "Pertanggungjawaban Keuangan",
        category: "keuangan-negara",
        definition: "Laporan pelaksanaan APBN/APBD",
        example: "LKPP sebagai pertanggungjawaban Presiden",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Financial Accountability",
        relatedTerms: ["LKPP", "Financial Report"]
      },
      {
        id: 713,
        term: "Perubahan UUD",
        category: "hukum-konstitusi",
        definition: "Proses mengubah atau mengamandemen UUD",
        example: "Empat kali perubahan UUD 1945 (1999-2002)",
        legalBasis: "Pasal 37 UUD 1945",
        englishTerm: "Constitutional Amendment",
        relatedTerms: ["Amandemen", "Constitutional Change"]
      },
      {
        id: 714,
        term: "Perumusan Kebijakan",
        category: "pemerintahan",
        definition: "Proses penyusunan kebijakan publik",
        example: "Perumusan kebijakan pendidikan gratis",
        legalBasis: "UU Administrasi Pemerintahan",
        englishTerm: "Policy Formulation",
        relatedTerms: ["Policy Making", "Pembuatan Kebijakan"]
      },
      {
        id: 715,
        term: "Perundang-undangan",
        category: "peraturan-perundangan",
        definition: "Peraturan tertulis yang dibentuk oleh lembaga berwenang",
        example: "Hierarki peraturan perundang-undangan",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Legislation",
        relatedTerms: ["Laws and Regulations", "Statutory Law"]
      },
      {
        id: 716,
        term: "Perundingan Bilateral",
        category: "hubungan-luar-negeri",
        definition: "Negosiasi antara dua negara",
        example: "Perundingan perbatasan Indonesia-Malaysia",
        legalBasis: "Konvensi Wina",
        englishTerm: "Bilateral Negotiation",
        relatedTerms: ["Bilateral Talks", "Diplomasi"]
      },
      {
        id: 717,
        term: "Perwalian Daerah",
        category: "pemerintahan-daerah",
        definition: "Perwakilan pemerintah pusat di daerah",
        example: "Gubernur sebagai wakil pemerintah pusat",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Representation",
        relatedTerms: ["Dekonsentrasi", "Central Representative"]
      },
      {
        id: 718,
        term: "Perwakilkan Diplomatik",
        category: "hubungan-luar-negeri",
        definition: "Perwakilan resmi negara di negara lain",
        example: "Kedutaan Besar RI di Washington DC",
        legalBasis: "Konvensi Wina 1961",
        englishTerm: "Diplomatic Mission",
        relatedTerms: ["Embassy", "Kedutaan"]
      },
      {
        id: 719,
        term: "Perwakilan Konsuler",
        category: "hubungan-luar-negeri",
        definition: "Perwakilan negara untuk urusan konsuler",
        example: "Konsulat Jenderal RI di berbagai negara",
        legalBasis: "Konvensi Wina 1963",
        englishTerm: "Consular Post",
        relatedTerms: ["Consulate", "Konsulat"]
      },
      {
        id: 720,
        term: "Perwakilan Proporsional",
        category: "sistem-politik",
        definition: "Sistem pemilihan berdasarkan proporsi suara",
        example: "Pemilu legislatif dengan sistem proporsional",
        legalBasis: "UU Pemilu",
        englishTerm: "Proportional Representation",
        relatedTerms: ["PR System", "Sistem Proporsional"]
      },
      {
        id: 721,
        term: "Perwakilan Rakyat",
        category: "lembaga-negara",
        definition: "Wakil rakyat yang duduk di lembaga legislatif",
        example: "Anggota DPR sebagai wakil rakyat",
        legalBasis: "UUD 1945",
        englishTerm: "People's Representative",
        relatedTerms: ["Representative", "Wakil Rakyat"]
      },
      {
        id: 722,
        term: "Peserta Pemilu",
        category: "pemilu",
        definition: "Partai politik atau perseorangan yang ikut pemilu",
        example: "Parpol peserta Pemilu 2024",
        legalBasis: "UU Pemilu",
        englishTerm: "Election Contestant",
        relatedTerms: ["Electoral Participant", "Kontestan"]
      },
      {
        id: 723,
        term: "Petisi",
        category: "hak-konstitusional",
        definition: "Permohonan tertulis yang diajukan kepada pemerintah",
        example: "Petisi menolak kenaikan BBM",
        legalBasis: "UUD 1945",
        englishTerm: "Petition",
        relatedTerms: ["Permohonan", "Written Request"]
      },
      {
        id: 724,
        term: "Pidato Kenegaraan",
        category: "lembaga-negara",
        definition: "Pidato resmi Presiden di hadapan lembaga negara",
        example: "Pidato kenegaraan 16 Agustus di MPR",
        legalBasis: "UUD 1945",
        englishTerm: "State Address",
        relatedTerms: ["State Speech", "Presidential Address"]
      },
      {
        id: 725,
        term: "Pilkada",
        category: "pemilu",
        definition: "Pemilihan Kepala Daerah secara langsung",
        example: "Pilkada serentak 2024",
        legalBasis: "UU Pilkada",
        englishTerm: "Local Election",
        relatedTerms: ["Regional Election", "Pemilukada"]
      },
      {
        id: 726,
        term: "Pimpinan MPR",
        category: "lembaga-negara",
        definition: "Ketua dan Wakil Ketua MPR",
        example: "Pimpinan MPR dipilih dari dan oleh anggota",
        legalBasis: "UU MD3",
        englishTerm: "MPR Leadership",
        relatedTerms: ["Assembly Leadership", "Ketua MPR"]
      },
      {
        id: 727,
        term: "Pimpinan DPR",
        category: "lembaga-negara",
        definition: "Ketua dan Wakil Ketua DPR",
        example: "Pimpinan DPR terdiri dari 1 Ketua dan 4 Wakil Ketua",
        legalBasis: "UU MD3",
        englishTerm: "DPR Leadership",
        relatedTerms: ["House Leadership", "Ketua DPR"]
      },
      {
        id: 728,
        term: "Pimpinan DPD",
        category: "lembaga-negara",
        definition: "Ketua dan Wakil Ketua DPD",
        example: "Pimpinan DPD dipilih dari dan oleh anggota",
        legalBasis: "UU MD3",
        englishTerm: "DPD Leadership",
        relatedTerms: ["Senate Leadership", "Ketua DPD"]
      },
      {
        id: 729,
        term: "Pleno",
        category: "lembaga-negara",
        definition: "Rapat dengan seluruh anggota hadir",
        example: "Sidang pleno DPR",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Plenary Session",
        relatedTerms: ["Full Session", "Sidang Paripurna"]
      },
      {
        id: 730,
        term: "Pluralisme Hukum",
        category: "sistem-hukum",
        definition: "Keberadaan berbagai sistem hukum dalam satu negara",
        example: "Hukum nasional, adat, dan agama di Indonesia",
        legalBasis: "Praktik Hukum Indonesia",
        englishTerm: "Legal Pluralism",
        relatedTerms: ["Plurality of Law", "Kemajemukan Hukum"]
      },
      {
        id: 731,
        term: "Politik Hukum",
        category: "sistem-hukum",
        definition: "Kebijakan dasar penyelenggaraan negara di bidang hukum",
        example: "Politik hukum reformasi",
        legalBasis: "RPJPN",
        englishTerm: "Legal Policy",
        relatedTerms: ["Law Politics", "Kebijakan Hukum"]
      },
      {
        id: 732,
        term: "Politik Luar Negeri",
        category: "hubungan-luar-negeri",
        definition: "Kebijakan negara dalam hubungan internasional",
        example: "Politik luar negeri bebas aktif",
        legalBasis: "UUD 1945",
        englishTerm: "Foreign Policy",
        relatedTerms: ["International Policy", "Kebijakan LN"]
      },
      {
        id: 733,
        term: "Pokok-Pokok Haluan Negara",
        category: "perencanaan-negara",
        definition: "Garis besar arah pembangunan negara",
        example: "GBHN era Orde Baru",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "State Policy Guidelines",
        relatedTerms: ["GBHN", "National Guidelines"]
      },
      {
        id: 734,
        term: "Portofolio Menteri",
        category: "lembaga-negara",
        definition: "Bidang tugas yang dipimpin menteri",
        example: "Menteri Pendidikan memimpin urusan pendidikan",
        legalBasis: "UU Kementerian Negara",
        englishTerm: "Ministerial Portfolio",
        relatedTerms: ["Ministry", "Kementerian"]
      },
      {
        id: 735,
        term: "Posisi Keuangan Negara",
        category: "keuangan-negara",
        definition: "Keadaan keuangan negara pada waktu tertentu",
        example: "Neraca keuangan negara akhir tahun",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "State Financial Position",
        relatedTerms: ["Financial Statement", "Neraca Negara"]
      },
      {
        id: 736,
        term: "Pos Lintas Batas",
        category: "hubungan-luar-negeri",
        definition: "Tempat resmi keluar masuk antarnegara",
        example: "PLBN Entikong di perbatasan Indonesia-Malaysia",
        legalBasis: "UU Keimigrasian",
        englishTerm: "Border Crossing Post",
        relatedTerms: ["Border Post", "PLBN"]
      },
      {
        id: 737,
        term: "Praperadilan Administratif",
        category: "kekuasaan-kehakiman",
        definition: "Pemeriksaan awal sengketa tata usaha negara",
        example: "Dismissal process di PTUN",
        legalBasis: "UU PTUN",
        englishTerm: "Administrative Pre-trial",
        relatedTerms: ["Dismissal", "Pemeriksaan Pendahuluan"]
      },
      {
        id: 738,
        term: "Praperadilan Konstitusi",
        category: "hukum-konstitusi",
        definition: "Mekanisme pengujian awal konstitusionalitas",
        example: "Constitutional preview di beberapa negara",
        legalBasis: "Perbandingan Hukum",
        englishTerm: "Constitutional Preview",
        relatedTerms: ["A Priori Review", "Pengujian Awal"]
      },
      {
        id: 739,
        term: "Preambul",
        category: "hukum-konstitusi",
        definition: "Pembukaan atau mukadimah konstitusi",
        example: "Pembukaan UUD 1945",
        legalBasis: "UUD 1945",
        englishTerm: "Preamble",
        relatedTerms: ["Pembukaan", "Mukadimah"]
      },
      {
        id: 740,
        term: "Preferensi Politik",
        category: "sistem-politik",
        definition: "Pilihan atau kecenderungan politik seseorang",
        example: "Preferensi pemilih dalam Pemilu",
        legalBasis: "UU Pemilu",
        englishTerm: "Political Preference",
        relatedTerms: ["Political Choice", "Pilihan Politik"]
      },
      {
        id: 741,
        term: "Prerogative Power",
        category: "lembaga-negara",
        definition: "Kekuasaan khusus kepala negara",
        example: "Hak prerogratif Presiden mengangkat menteri",
        legalBasis: "UUD 1945",
        englishTerm: "Prerogative Power",
        relatedTerms: ["Hak Prerogatif", "Executive Privilege"]
      },
      {
        id: 742,
        term: "Presidential Threshold",
        category: "pemilu",
        definition: "Ambang batas pencalonan presiden",
        example: "Syarat 20% kursi DPR atau 25% suara sah",
        legalBasis: "UU Pemilu",
        englishTerm: "Presidential Threshold",
        relatedTerms: ["Ambang Batas Presiden", "Threshold"]
      },
      {
        id: 743,
        term: "Presiden Terpilih",
        category: "lembaga-negara",
        definition: "Calon presiden yang memenangkan pemilu",
        example: "Masa transisi presiden terpilih sebelum pelantikan",
        legalBasis: "UU Pemilu",
        englishTerm: "President-elect",
        relatedTerms: ["Elected President", "Presiden Elekta"]
      },
      {
        id: 744,
        term: "Presidensialisme",
        category: "sistem-pemerintahan",
        definition: "Sistem pemerintahan dengan presiden sebagai kepala negara dan pemerintahan",
        example: "Indonesia menganut sistem presidensial",
        legalBasis: "UUD 1945",
        englishTerm: "Presidentialism",
        relatedTerms: ["Presidential System", "Sistem Presidensial"]
      },
      {
        id: 745,
        term: "Presidium",
        category: "lembaga-negara",
        definition: "Kepemimpinan kolektif suatu lembaga",
        example: "Presidium MPR masa lalu",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "Presidium",
        relatedTerms: ["Collective Leadership", "Pimpinan Kolektif"]
      },
      {
        id: 746,
        term: "Primus Inter Pares",
        category: "lembaga-negara",
        definition: "Yang pertama di antara yang setara",
        example: "Ketua MA di antara hakim agung",
        legalBasis: "Doktrin Hukum",
        englishTerm: "First Among Equals",
        relatedTerms: ["Pertama di Antara Setara", "Leading Equal"]
      },
      {
        id: 747,
        term: "Prinsip Check and Balances",
        category: "sistem-pemerintahan",
        definition: "Prinsip saling mengawasi dan mengimbangi antarlembaga",
        example: "DPR mengawasi pemerintah",
        legalBasis: "UUD 1945",
        englishTerm: "Checks and Balances",
        relatedTerms: ["Pengawasan Berimbang", "Mutual Control"]
      },
      {
        id: 748,
        term: "Prinsip Negara Hukum",
        category: "hukum-konstitusi",
        definition: "Prinsip bahwa negara dijalankan berdasarkan hukum",
        example: "Indonesia adalah negara hukum",
        legalBasis: "Pasal 1 ayat (3) UUD 1945",
        englishTerm: "Rule of Law",
        relatedTerms: ["Rechtstaat", "Negara Hukum"]
      },
      {
        id: 749,
        term: "Prinsip Otonomi",
        category: "pemerintahan-daerah",
        definition: "Prinsip kemandirian daerah dalam mengurus rumah tangganya",
        example: "Otonomi seluas-luasnya",
        legalBasis: "UU Pemda",
        englishTerm: "Autonomy Principle",
        relatedTerms: ["Self-governance", "Kemandirian Daerah"]
      },
      {
        id: 750,
        term: "Prinsip Transparansi",
        category: "pemerintahan",
        definition: "Keterbukaan dalam penyelenggaraan pemerintahan",
        example: "Transparansi anggaran negara",
        legalBasis: "UU KIP",
        englishTerm: "Transparency Principle",
        relatedTerms: ["Openness", "Keterbukaan"]
      },
      {
        id: 751,
        term: "Prioritas Nasional",
        category: "perencanaan-negara",
        definition: "Program utama pembangunan nasional",
        example: "Prioritas nasional dalam RPJMN",
        legalBasis: "UU SPPN",
        englishTerm: "National Priority",
        relatedTerms: ["Priority Program", "Program Prioritas"]
      },
      {
        id: 752,
        term: "Pro Justicia",
        category: "kekuasaan-kehakiman",
        definition: "Demi keadilan berdasarkan Ketuhanan YME",
        example: "Kepala putusan pengadilan",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "For Justice",
        relatedTerms: ["Demi Keadilan", "In the Name of Justice"]
      },
      {
        id: 753,
        term: "Produk Hukum Daerah",
        category: "peraturan-perundangan",
        definition: "Peraturan yang dibuat oleh pemerintah daerah",
        example: "Perda, Perkada, Perdes",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Legal Product",
        relatedTerms: ["Local Regulation", "Peraturan Daerah"]
      },
      {
        id: 754,
        term: "Program Legislasi Daerah",
        category: "proses-legislasi",
        definition: "Perencanaan penyusunan Perda",
        example: "Prolegda tahunan DPRD",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Legislative Program",
        relatedTerms: ["Prolegda", "Local Legislation Program"]
      },
      {
        id: 755,
        term: "Program Legislasi Nasional",
        category: "proses-legislasi",
        definition: "Perencanaan penyusunan UU di tingkat nasional",
        example: "Prolegnas DPR periode 2019-2024",
        legalBasis: "UU No. 12/2011",
        englishTerm: "National Legislative Program",
        relatedTerms: ["Prolegnas", "Legislative Agenda"]
      },
      {
        id: 756,
        term: "Proklamasi",
        category: "hukum-konstitusi",
        definition: "Pernyataan kemerdekaan Indonesia",
        example: "Proklamasi 17 Agustus 1945",
        legalBasis: "Sejarah Konstitusi",
        englishTerm: "Proclamation",
        relatedTerms: ["Declaration", "Pernyataan Kemerdekaan"]
      },
      {
        id: 757,
        term: "Promosi Jabatan",
        category: "kepegawaian",
        definition: "Kenaikan jabatan dalam birokrasi",
        example: "Promosi PNS ke jabatan lebih tinggi",
        legalBasis: "UU ASN",
        englishTerm: "Job Promotion",
        relatedTerms: ["Career Advancement", "Kenaikan Jabatan"]
      },
      {
        id: 758,
        term: "Propenas",
        category: "perencanaan-negara",
        definition: "Program Pembangunan Nasional (istilah lama)",
        example: "Propenas era reformasi",
        legalBasis: "Sejarah Perencanaan",
        englishTerm: "National Development Program",
        relatedTerms: ["RPJMN", "Development Program"]
      },
      {
        id: 759,
        term: "Proses Legislasi",
        category: "proses-legislasi",
        definition: "Tahapan pembentukan undang-undang",
        example: "Dari perencanaan hingga pengundangan",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Legislative Process",
        relatedTerms: ["Law Making Process", "Pembentukan UU"]
      },
      {
        id: 760,
        term: "Protokol Kenegaraan",
        category: "pemerintahan",
        definition: "Tata cara acara kenegaraan",
        example: "Protokol pelantikan presiden",
        legalBasis: "UU Protokol",
        englishTerm: "State Protocol",
        relatedTerms: ["Official Protocol", "Tata Cara Kenegaraan"]
      },
      {
        id: 761,
        term: "Provinsi",
        category: "pemerintahan-daerah",
        definition: "Daerah otonom tingkat I",
        example: "34 provinsi di Indonesia",
        legalBasis: "UU Pemda",
        englishTerm: "Province",
        relatedTerms: ["Provincial Government", "Pemprov"]
      },
      {
        id: 762,
        term: "Pusat Pemerintahan",
        category: "pemerintahan",
        definition: "Lokasi penyelenggaraan pemerintahan negara",
        example: "Jakarta sebagai ibukota negara",
        legalBasis: "UU IKN",
        englishTerm: "Seat of Government",
        relatedTerms: ["Capital City", "Ibukota"]
      },
      {
        id: 763,
        term: "Putusan Final",
        category: "kekuasaan-kehakiman",
        definition: "Putusan yang tidak dapat diubah",
        example: "Putusan MK bersifat final",
        legalBasis: "UU MK",
        englishTerm: "Final Decision",
        relatedTerms: ["Final Verdict", "Putusan Akhir"]
      },
      {
        id: 764,
        term: "Putusan Sela",
        category: "kekuasaan-kehakiman",
        definition: "Putusan yang dijatuhkan sebelum putusan akhir",
        example: "Putusan sela MK tentang pemilu",
        legalBasis: "UU MK",
        englishTerm: "Interlocutory Decision",
        relatedTerms: ["Interim Decision", "Putusan Antara"]
      },
      {
        id: 765,
        term: "Quick Count",
        category: "pemilu",
        definition: "Penghitungan cepat hasil pemilu",
        example: "Quick count lembaga survei",
        legalBasis: "UU Pemilu",
        englishTerm: "Quick Count",
        relatedTerms: ["Hitung Cepat", "Exit Poll"]
      },
      {
        id: 766,
        term: "Quorum",
        category: "lembaga-negara",
        definition: "Jumlah minimum anggota untuk sahnya rapat",
        example: "Quorum sidang DPR minimal 50% anggota",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Quorum",
        relatedTerms: ["Kuorum", "Minimum Attendance"]
      },
      {
        id: 767,
        term: "Rakornas",
        category: "pemerintahan",
        definition: "Rapat Koordinasi Nasional",
        example: "Rakornas kementerian dengan daerah",
        legalBasis: "Praktik Pemerintahan",
        englishTerm: "National Coordination Meeting",
        relatedTerms: ["Koordinasi Nasional", "National Meeting"]
      },
      {
        id: 768,
        term: "Rancangan",
        category: "proses-legislasi",
        definition: "Draft atau konsep peraturan",
        example: "Rancangan Undang-Undang (RUU)",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Draft",
        relatedTerms: ["Bill", "Konsep"]
      },
      {
        id: 769,
        term: "Rangkap Jabatan",
        category: "lembaga-negara",
        definition: "Memegang lebih dari satu jabatan",
        example: "Larangan rangkap jabatan hakim",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Multiple Office Holding",
        relatedTerms: ["Dual Position", "Jabatan Ganda"]
      },
      {
        id: 770,
        term: "Rapat Dengar Pendapat",
        category: "lembaga-negara",
        definition: "Forum DPR mendengar penjelasan pihak lain",
        example: "RDP dengan menteri",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Public Hearing",
        relatedTerms: ["RDP", "Hearing"]
      },
      {
        id: 771,
        term: "Rapat Gabungan",
        category: "lembaga-negara",
        definition: "Rapat bersama beberapa komisi atau lembaga",
        example: "Rapat gabungan komisi DPR",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Joint Meeting",
        relatedTerms: ["Combined Meeting", "Rapat Bersama"]
      },
      {
        id: 772,
        term: "Rapat Kerja",
        category: "lembaga-negara",
        definition: "Forum pembahasan antara DPR dengan pemerintah",
        example: "Raker komisi dengan menteri",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Working Meeting",
        relatedTerms: ["Raker", "Work Session"]
      },
      {
        id: 773,
        term: "Rapat Konsultasi",
        category: "lembaga-negara",
        definition: "Forum konsultasi antar lembaga negara",
        example: "Konsultasi presiden dengan DPR",
        legalBasis: "UUD 1945",
        englishTerm: "Consultation Meeting",
        relatedTerms: ["Consultative Meeting", "Konsultasi"]
      },
      {
        id: 774,
        term: "Rapat Paripurna",
        category: "lembaga-negara",
        definition: "Rapat dengan seluruh anggota lembaga",
        example: "Sidang paripurna DPR",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Plenary Meeting",
        relatedTerms: ["Full Assembly", "Sidang Pleno"]
      },
      {
        id: 775,
        term: "Rapim",
        category: "lembaga-negara",
        definition: "Rapat Pimpinan",
        example: "Rapim DPR membahas agenda sidang",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Leadership Meeting",
        relatedTerms: ["Board Meeting", "Rapat Pimpinan"]
      },
      {
        id: 776,
        term: "Ratifikasi",
        category: "hubungan-luar-negeri",
        definition: "Pengesahan perjanjian internasional",
        example: "Ratifikasi konvensi HAM",
        legalBasis: "UU No. 24/2000",
        englishTerm: "Ratification",
        relatedTerms: ["Pengesahan", "Treaty Ratification"]
      },
      {
        id: 777,
        term: "Real Count",
        category: "pemilu",
        definition: "Penghitungan suara resmi KPU",
        example: "Real count penetapan hasil pemilu",
        legalBasis: "UU Pemilu",
        englishTerm: "Official Count",
        relatedTerms: ["Penghitungan Resmi", "Official Tally"]
      },
      {
        id: 778,
        term: "Realisasi Anggaran",
        category: "keuangan-negara",
        definition: "Pelaksanaan anggaran yang telah ditetapkan",
        example: "Realisasi APBN tahun berjalan",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Budget Realization",
        relatedTerms: ["Budget Execution", "Pelaksanaan Anggaran"]
      },
      {
        id: 779,
        term: "Recall",
        category: "lembaga-negara",
        definition: "Penarikan kembali anggota legislatif oleh partai",
        example: "PAW melalui mekanisme recall",
        legalBasis: "UU MD3",
        englishTerm: "Recall",
        relatedTerms: ["Penarikan Kembali", "PAW"]
      },
      {
        id: 780,
        term: "Recess",
        category: "lembaga-negara",
        definition: "Masa reses atau istirahat sidang",
        example: "Masa reses DPR",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Recess",
        relatedTerms: ["Parliamentary Break", "Masa Reses"]
      },
      {
        id: 781,
        term: "Referendum",
        category: "demokrasi",
        definition: "Pemungutan suara langsung untuk keputusan penting",
        example: "Referendum konstitusi di beberapa negara",
        legalBasis: "UUD 1945 (implisit)",
        englishTerm: "Referendum",
        relatedTerms: ["Jajak Pendapat", "Popular Vote"]
      },
      {
        id: 782,
        term: "Reformasi Birokrasi",
        category: "pemerintahan",
        definition: "Pembaruan sistem birokrasi pemerintahan",
        example: "Program reformasi birokrasi nasional",
        legalBasis: "Perpres RB",
        englishTerm: "Bureaucratic Reform",
        relatedTerms: ["Administrative Reform", "Pembaruan Birokrasi"]
      },
      {
        id: 783,
        term: "Reformasi Hukum",
        category: "sistem-hukum",
        definition: "Pembaruan sistem hukum nasional",
        example: "Reformasi hukum pasca 1998",
        legalBasis: "TAP MPR",
        englishTerm: "Legal Reform",
        relatedTerms: ["Law Reform", "Pembaruan Hukum"]
      },
      {
        id: 784,
        term: "Registrasi Pemilih",
        category: "pemilu",
        definition: "Pendaftaran warga sebagai pemilih",
        example: "Pendaftaran pemilih untuk DPT",
        legalBasis: "UU Pemilu",
        englishTerm: "Voter Registration",
        relatedTerms: ["Pendaftaran Pemilih", "Electoral Roll"]
      },
      {
        id: 785,
        term: "Rehabilitasi Nama Baik",
        category: "hak-konstitusional",
        definition: "Pemulihan nama baik seseorang",
        example: "Rehabilitasi korban pelanggaran HAM",
        legalBasis: "UU HAM",
        englishTerm: "Rehabilitation",
        relatedTerms: ["Pemulihan Nama", "Reputation Restoration"]
      },
      {
        id: 786,
        term: "Rekapitulasi Suara",
        category: "pemilu",
        definition: "Penghitungan ulang dan penjumlahan suara",
        example: "Rekapitulasi tingkat kecamatan",
        legalBasis: "UU Pemilu",
        englishTerm: "Vote Recapitulation",
        relatedTerms: ["Vote Tally", "Penghitungan Ulang"]
      },
      {
        id: 787,
        term: "Rekonsiliasi Nasional",
        category: "politik",
        definition: "Upaya mempersatukan bangsa pasca konflik",
        example: "Rekonsiliasi pasca reformasi",
        legalBasis: "Kebijakan Politik",
        englishTerm: "National Reconciliation",
        relatedTerms: ["Persatuan Nasional", "Unity"]
      },
      {
        id: 788,
        term: "Rekrutmen PNS",
        category: "kepegawaian",
        definition: "Proses penerimaan pegawai negeri sipil",
        example: "Seleksi CPNS nasional",
        legalBasis: "UU ASN",
        englishTerm: "Civil Service Recruitment",
        relatedTerms: ["CPNS Selection", "Penerimaan PNS"]
      },
      {
        id: 789,
        term: "Relasi Pusat-Daerah",
        category: "pemerintahan-daerah",
        definition: "Hubungan antara pemerintah pusat dan daerah",
        example: "Pembagian urusan pemerintahan",
        legalBasis: "UU Pemda",
        englishTerm: "Central-Regional Relations",
        relatedTerms: ["Intergovernmental Relations", "Hubungan Pusat-Daerah"]
      },
      {
        id: 790,
        term: "Remisi",
        category: "kekuasaan-kehakiman",
        definition: "Pengurangan masa pidana",
        example: "Remisi hari kemerdekaan",
        legalBasis: "UU Pemasyarakatan",
        englishTerm: "Remission",
        relatedTerms: ["Sentence Reduction", "Pengurangan Hukuman"]
      },
      {
        id: 791,
        term: "Rencana Kerja Pemerintah",
        category: "perencanaan-negara",
        definition: "Rencana pembangunan tahunan",
        example: "RKP sebagai pedoman penyusunan APBN",
        legalBasis: "UU SPPN",
        englishTerm: "Government Work Plan",
        relatedTerms: ["RKP", "Annual Plan"]
      },
      {
        id: 792,
        term: "Rencana Pembangunan",
        category: "perencanaan-negara",
        definition: "Dokumen perencanaan pembangunan",
        example: "RPJPN, RPJMN, RKP",
        legalBasis: "UU SPPN",
        englishTerm: "Development Plan",
        relatedTerms: ["Planning Document", "Rencana"]
      },
      {
        id: 793,
        term: "Rencana Tata Ruang",
        category: "pemerintahan-daerah",
        definition: "Perencanaan penggunaan ruang wilayah",
        example: "RTRW provinsi dan kabupaten/kota",
        legalBasis: "UU Penataan Ruang",
        englishTerm: "Spatial Plan",
        relatedTerms: ["RTRW", "Land Use Plan"]
      },
      {
        id: 794,
        term: "Reorganisasi",
        category: "pemerintahan",
        definition: "Penataan ulang struktur organisasi",
        example: "Reorganisasi kementerian",
        legalBasis: "Perpres",
        englishTerm: "Reorganization",
        relatedTerms: ["Restructuring", "Penataan Ulang"]
      },
      {
        id: 795,
        term: "Representasi Politik",
        category: "sistem-politik",
        definition: "Keterwakilan dalam sistem politik",
        example: "Representasi perempuan di parlemen",
        legalBasis: "UU Pemilu",
        englishTerm: "Political Representation",
        relatedTerms: ["Political Delegate", "Keterwakilan"]
      },
      {
        id: 796,
        term: "Republik",
        category: "sistem-pemerintahan",
        definition: "Bentuk negara dengan kepala negara dipilih",
        example: "Republik Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Republic",
        relatedTerms: ["Republican State", "Negara Republik"]
      },
      {
        id: 797,
        term: "Reshuffle Kabinet",
        category: "lembaga-negara",
        definition: "Perombakan susunan kabinet",
        example: "Pergantian beberapa menteri",
        legalBasis: "Hak Prerogatif Presiden",
        englishTerm: "Cabinet Reshuffle",
        relatedTerms: ["Cabinet Shake-up", "Perombakan Kabinet"]
      },
      {
        id: 798,
        term: "Residensi",
        category: "pemerintahan-daerah",
        definition: "Wilayah administratif zaman kolonial",
        example: "Bekas karesidenan di Jawa",
        legalBasis: "Sejarah Pemerintahan",
        englishTerm: "Residency",
        relatedTerms: ["Karesidenan", "Administrative Region"]
      },
      {
        id: 799,
        term: "Resolusi",
        category: "lembaga-negara",
        definition: "Keputusan atau pernyataan sikap lembaga",
        example: "Resolusi DPR tentang isu tertentu",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Resolution",
        relatedTerms: ["Parliamentary Resolution", "Keputusan"]
      },
      {
        id: 800,
        term: "Restrukturisasi",
        category: "pemerintahan",
        definition: "Penataan kembali struktur organisasi",
        example: "Restrukturisasi BUMN",
        legalBasis: "UU BUMN",
        englishTerm: "Restructuring",
        relatedTerms: ["Reorganization", "Penataan Kembali"]
      },
      {
        id: 801,
        term: "Revisi Anggaran",
        category: "keuangan-negara",
        definition: "Perubahan anggaran yang telah ditetapkan",
        example: "APBN-P (Perubahan)",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Budget Revision",
        relatedTerms: ["Budget Amendment", "APBN-P"]
      },
      {
        id: 802,
        term: "Revisi Undang-Undang",
        category: "proses-legislasi",
        definition: "Perubahan atau perbaikan undang-undang",
        example: "Revisi UU Pemilu",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Law Revision",
        relatedTerms: ["Law Amendment", "Perubahan UU"]
      },
      {
        id: 803,
        term: "Revolusi Mental",
        category: "kebijakan-nasional",
        definition: "Gerakan perubahan cara berpikir",
        example: "Program revolusi mental pemerintah",
        legalBasis: "Perpres",
        englishTerm: "Mental Revolution",
        relatedTerms: ["Mindset Change", "Perubahan Mental"]
      },
      {
        id: 804,
        term: "Rezim",
        category: "sistem-politik",
        definition: "Sistem pemerintahan pada periode tertentu",
        example: "Rezim Orde Baru",
        legalBasis: "Ilmu Politik",
        englishTerm: "Regime",
        relatedTerms: ["Government System", "Pemerintahan"]
      },
      {
        id: 805,
        term: "Right of Reply",
        category: "hak-konstitusional",
        definition: "Hak jawab atas pemberitaan",
        example: "Hak jawab di media massa",
        legalBasis: "UU Pers",
        englishTerm: "Right of Reply",
        relatedTerms: ["Hak Jawab", "Correction Right"]
      },
      {
        id: 806,
        term: "Rincian Anggaran",
        category: "keuangan-negara",
        definition: "Detail alokasi anggaran",
        example: "RKA-KL kementerian",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Budget Details",
        relatedTerms: ["Budget Breakdown", "Detail APBN"]
      },
      {
        id: 807,
        term: "Risalah Rapat",
        category: "lembaga-negara",
        definition: "Catatan resmi jalannya rapat",
        example: "Risalah sidang DPR",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Meeting Minutes",
        relatedTerms: ["Proceedings", "Notulen"]
      },
      {
        id: 808,
        term: "Rotasi Jabatan",
        category: "kepegawaian",
        definition: "Perpindahan pegawai antarbagian",
        example: "Rotasi pejabat eselon",
        legalBasis: "UU ASN",
        englishTerm: "Job Rotation",
        relatedTerms: ["Position Rotation", "Mutasi"]
      },
      {
        id: 809,
        term: "RPJMD",
        category: "perencanaan-negara",
        definition: "Rencana Pembangunan Jangka Menengah Daerah",
        example: "RPJMD 5 tahunan provinsi",
        legalBasis: "UU SPPN",
        englishTerm: "Regional Medium Term Development Plan",
        relatedTerms: ["Regional Plan", "Rencana Daerah"]
      },
      {
        id: 810,
        term: "RPJMN",
        category: "perencanaan-negara",
        definition: "Rencana Pembangunan Jangka Menengah Nasional",
        example: "RPJMN 2020-2024",
        legalBasis: "UU SPPN",
        englishTerm: "National Medium Term Development Plan",
        relatedTerms: ["5 Year Plan", "Rencana 5 Tahun"]
      },
      {
        id: 811,
        term: "RPJPD",
        category: "perencanaan-negara",
        definition: "Rencana Pembangunan Jangka Panjang Daerah",
        example: "RPJPD 20 tahun",
        legalBasis: "UU SPPN",
        englishTerm: "Regional Long Term Development Plan",
        relatedTerms: ["Long Term Plan", "Rencana Jangka Panjang"]
      },
      {
        id: 812,
        term: "RPJPN",
        category: "perencanaan-negara",
        definition: "Rencana Pembangunan Jangka Panjang Nasional",
        example: "RPJPN 2005-2025",
        legalBasis: "UU No. 17/2007",
        englishTerm: "National Long Term Development Plan",
        relatedTerms: ["20 Year Plan", "Visi Indonesia"]
      },
      {
        id: 813,
        term: "Ruang Fiskal",
        category: "keuangan-negara",
        definition: "Kemampuan keuangan negara untuk kebijakan baru",
        example: "Ruang fiskal untuk stimulus ekonomi",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Fiscal Space",
        relatedTerms: ["Budget Room", "Kapasitas Fiskal"]
      },
      {
        id: 814,
        term: "Rukun Tetangga",
        category: "pemerintahan-desa",
        definition: "Unit terkecil pemerintahan",
        example: "RT sebagai ujung tombak pelayanan",
        legalBasis: "Perda",
        englishTerm: "Neighborhood Unit",
        relatedTerms: ["RT", "Neighborhood Association"]
      },
      {
        id: 815,
        term: "Rukun Warga",
        category: "pemerintahan-desa",
        definition: "Gabungan beberapa RT",
        example: "RW koordinasi antarRT",
        legalBasis: "Perda",
        englishTerm: "Community Unit",
        relatedTerms: ["RW", "Community Association"]
      },
      {
        id: 816,
        term: "Rule Making",
        category: "proses-legislasi",
        definition: "Pembuatan peraturan",
        example: "Proses pembuatan Perda",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Rule Making",
        relatedTerms: ["Regulation Making", "Pembuatan Aturan"]
      },
      {
        id: 817,
        term: "Rumah Dinas",
        category: "pemerintahan",
        definition: "Tempat tinggal pejabat negara",
        example: "Rumah dinas gubernur",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Official Residence",
        relatedTerms: ["State House", "Wisma Negara"]
      },
      {
        id: 818,
        term: "Rumpun Jabatan",
        category: "kepegawaian",
        definition: "Kelompok jabatan sejenis",
        example: "Jabatan fungsional auditor",
        legalBasis: "UU ASN",
        englishTerm: "Job Family",
        relatedTerms: ["Position Group", "Kelompok Jabatan"]
      },
      {
        id: 819,
        term: "Rumusan Masalah",
        category: "proses-legislasi",
        definition: "Identifikasi masalah dalam naskah akademik",
        example: "Rumusan masalah RUU",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Problem Statement",
        relatedTerms: ["Issue Identification", "Identifikasi Masalah"]
      },
      {
        id: 820,
        term: "Runding Ulang",
        category: "hubungan-luar-negeri",
        definition: "Negosiasi kembali perjanjian",
        example: "Renegosiasi perjanjian bilateral",
        legalBasis: "Hukum Internasional",
        englishTerm: "Renegotiation",
        relatedTerms: ["Treaty Renegotiation", "Negosiasi Ulang"]
      },
      {
        id: 821,
        term: "Sabda Pandita Ratu",
        category: "hukum-konstitusi",
        definition: "Ucapan raja adalah hukum (konsep lama)",
        example: "The king can do no wrong",
        legalBasis: "Sejarah Hukum",
        englishTerm: "Royal Prerogative",
        relatedTerms: ["Raja Tidak Bisa Salah", "Absolute Power"]
      },
      {
        id: 822,
        term: "Saksi Ahli",
        category: "kekuasaan-kehakiman",
        definition: "Ahli yang memberikan keterangan di pengadilan",
        example: "Ahli konstitusi di sidang MK",
        legalBasis: "UU MK",
        englishTerm: "Expert Witness",
        relatedTerms: ["Keterangan Ahli", "Expert Testimony"]
      },
      {
        id: 823,
        term: "Salinan Putusan",
        category: "kekuasaan-kehakiman",
        definition: "Copy resmi putusan pengadilan",
        example: "Salinan putusan MK",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Decision Copy",
        relatedTerms: ["Verdict Copy", "Copy Putusan"]
      },
      {
        id: 824,
        term: "Sambutan Kenegaraan",
        category: "pemerintahan",
        definition: "Pidato pejabat dalam acara resmi",
        example: "Sambutan presiden pada upacara",
        legalBasis: "Protokol Kenegaraan",
        englishTerm: "State Address",
        relatedTerms: ["Official Speech", "Pidato Resmi"]
      },
      {
        id: 825,
        term: "Sanggar Kerja",
        category: "lembaga-negara",
        definition: "Tim kerja adhoc legislatif",
        example: "Sanggar kerja penyusunan RUU",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Working Group",
        relatedTerms: ["Task Force", "Tim Kerja"]
      },
      {
        id: 826,
        term: "Sanksi Administratif",
        category: "pemerintahan",
        definition: "Hukuman administratif bagi PNS",
        example: "Teguran tertulis untuk PNS",
        legalBasis: "UU ASN",
        englishTerm: "Administrative Sanction",
        relatedTerms: ["Disciplinary Action", "Hukuman Disiplin"]
      },
      {
        id: 827,
        term: "Sanksi Etik",
        category: "lembaga-negara",
        definition: "Hukuman atas pelanggaran etika",
        example: "Sanksi MKD untuk anggota DPR",
        legalBasis: "Kode Etik DPR",
        englishTerm: "Ethical Sanction",
        relatedTerms: ["Ethics Penalty", "Hukuman Etika"]
      },
      {
        id: 828,
        term: "Sapta Marga",
        category: "pertahanan-keamanan",
        definition: "Tujuh sumpah prajurit TNI",
        example: "Ikrar kesetiaan TNI",
        legalBasis: "Doktrin TNI",
        englishTerm: "Seven Oaths",
        relatedTerms: ["Military Oath", "Sumpah Prajurit"]
      },
      {
        id: 829,
        term: "Sarana Prasarana",
        category: "pemerintahan",
        definition: "Fasilitas pendukung pemerintahan",
        example: "Gedung dan peralatan kantor",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Infrastructure",
        relatedTerms: ["Facilities", "Fasilitas"]
      },
      {
        id: 830,
        term: "Satu Atap",
        category: "kekuasaan-kehakiman",
        definition: "Sistem peradilan terpadu di bawah MA",
        example: "Peradilan satu atap sejak 2004",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "One Roof System",
        relatedTerms: ["Unified Court", "Peradilan Terpadu"]
      },
      {
        id: 831,
        term: "Satuan Kerja",
        category: "pemerintahan",
        definition: "Unit pelaksana teknis pemerintahan",
        example: "Satker kementerian",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Work Unit",
        relatedTerms: ["Satker", "Operating Unit"]
      },
      {
        id: 832,
        term: "Satuan Wilayah",
        category: "pemerintahan-daerah",
        definition: "Unit administratif pemerintahan",
        example: "Provinsi, kabupaten, kota",
        legalBasis: "UU Pemda",
        englishTerm: "Administrative Unit",
        relatedTerms: ["Territorial Unit", "Wilayah Administratif"]
      },
      {
        id: 833,
        term: "Sejarah Konstitusi",
        category: "hukum-konstitusi",
        definition: "Perkembangan konstitusi Indonesia",
        example: "Dari UUD 1945 hingga amandemen",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "Constitutional History",
        relatedTerms: ["History of Constitution", "Perkembangan UUD"]
      },
      {
        id: 834,
        term: "Sekretariat Jenderal",
        category: "lembaga-negara",
        definition: "Unit pendukung administratif lembaga",
        example: "Setjen DPR",
        legalBasis: "Peraturan Organisasi",
        englishTerm: "General Secretariat",
        relatedTerms: ["Setjen", "Administrative Support"]
      },
      {
        id: 835,
        term: "Sekretariat Negara",
        category: "lembaga-negara",
        definition: "Lembaga yang membantu presiden",
        example: "Setneg mengurus administrasi presiden",
        legalBasis: "Perpres",
        englishTerm: "State Secretariat",
        relatedTerms: ["Setneg", "Presidential Secretariat"]
      },
      {
        id: 836,
        term: "Seleksi Hakim",
        category: "kekuasaan-kehakiman",
        definition: "Proses pemilihan calon hakim",
        example: "Seleksi hakim agung oleh KY",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Judicial Selection",
        relatedTerms: ["Judge Selection", "Rekrutmen Hakim"]
      },
      {
        id: 837,
        term: "Sengketa Kewenangan",
        category: "hukum-konstitusi",
        definition: "Perselisihan kewenangan antarlembaga negara",
        example: "Sengketa kewenangan di MK",
        legalBasis: "UU MK",
        englishTerm: "Competence Dispute",
        relatedTerms: ["Authority Conflict", "Konflik Kewenangan"]
      },
      {
        id: 838,
        term: "Sengketa Pemilu",
        category: "pemilu",
        definition: "Perselisihan hasil pemilihan umum",
        example: "Gugatan hasil pemilu ke MK",
        legalBasis: "UU MK",
        englishTerm: "Electoral Dispute",
        relatedTerms: ["Election Dispute", "Perselisihan Pemilu"]
      },
      {
        id: 839,
        term: "Sentral Pemerintahan",
        category: "pemerintahan",
        definition: "Pusat kegiatan pemerintahan",
        example: "Jakarta sebagai sentral pemerintahan",
        legalBasis: "UU Pemerintahan",
        englishTerm: "Government Center",
        relatedTerms: ["Administrative Center", "Pusat Pemerintahan"]
      },
      {
        id: 840,
        term: "Sentralisasi",
        category: "pemerintahan",
        definition: "Pemusatan kekuasaan di pemerintah pusat",
        example: "Sistem sentralistik Orde Baru",
        legalBasis: "Sejarah Pemerintahan",
        englishTerm: "Centralization",
        relatedTerms: ["Central Control", "Pemusatan"]
      },
      {
        id: 841,
        term: "Separation of Powers",
        category: "sistem-pemerintahan",
        definition: "Pemisahan kekuasaan negara",
        example: "Eksekutif, legislatif, yudikatif terpisah",
        legalBasis: "Teori Trias Politica",
        englishTerm: "Separation of Powers",
        relatedTerms: ["Pemisahan Kekuasaan", "Trias Politica"]
      },
      {
        id: 842,
        term: "Serangan Fajar",
        category: "pemilu",
        definition: "Politik uang menjelang hari pemilihan",
        example: "Pembagian uang sebelum pencoblosan",
        legalBasis: "UU Pemilu",
        englishTerm: "Dawn Attack",
        relatedTerms: ["Vote Buying", "Politik Uang"]
      },
      {
        id: 843,
        term: "Serapan Anggaran",
        category: "keuangan-negara",
        definition: "Realisasi penggunaan anggaran",
        example: "Serapan APBN per triwulan",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Budget Absorption",
        relatedTerms: ["Budget Utilization", "Penggunaan Anggaran"]
      },
      {
        id: 844,
        term: "Sertijab",
        category: "pemerintahan",
        definition: "Serah terima jabatan",
        example: "Sertijab menteri",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Handover Ceremony",
        relatedTerms: ["Transfer of Office", "Serah Terima"]
      },
      {
        id: 845,
        term: "Sesepuh Dewan",
        category: "lembaga-negara",
        definition: "Anggota tertua atau berpengalaman",
        example: "Pimpinan sementara sidang pertama",
        legalBasis: "Tata Tertib DPR",
        englishTerm: "Senior Member",
        relatedTerms: ["Elder Statesman", "Anggota Senior"]
      },
      {
        id: 846,
        term: "Sidang Istimewa",
        category: "lembaga-negara",
        definition: "Sidang khusus di luar jadwal regular",
        example: "Sidang istimewa MPR",
        legalBasis: "UU MD3",
        englishTerm: "Special Session",
        relatedTerms: ["Extraordinary Session", "Sidang Khusus"]
      },
      {
        id: 847,
        term: "Sidang Kabinet",
        category: "lembaga-negara",
        definition: "Rapat menteri yang dipimpin presiden",
        example: "Sidang kabinet paripurna",
        legalBasis: "Praktik Pemerintahan",
        englishTerm: "Cabinet Meeting",
        relatedTerms: ["Cabinet Session", "Rapat Kabinet"]
      },
      {
        id: 848,
        term: "Sidang Tahunan",
        category: "lembaga-negara",
        definition: "Sidang MPR setiap tahun",
        example: "Sidang tahunan MPR bulan Agustus",
        legalBasis: "UUD 1945",
        englishTerm: "Annual Session",
        relatedTerms: ["Yearly Meeting", "Sidang Tahun"]
      },
      {
        id: 849,
        term: "Sidang Terbuka",
        category: "kekuasaan-kehakiman",
        definition: "Persidangan yang dapat dihadiri publik",
        example: "Sidang MK terbuka untuk umum",
        legalBasis: "UU Kekuasaan Kehakiman",
        englishTerm: "Open Court",
        relatedTerms: ["Public Hearing", "Sidang Publik"]
      },
      {
        id: 850,
        term: "Silaturahim Politik",
        category: "politik",
        definition: "Pertemuan untuk membangun hubungan politik",
        example: "Safari politik menjelang pemilu",
        legalBasis: "Praktik Politik",
        englishTerm: "Political Networking",
        relatedTerms: ["Political Visit", "Safari Politik"]
      },
      {
        id: 851,
        term: "Simbolisme Negara",
        category: "identitas-nasional",
        definition: "Lambang-lambang kenegaraan",
        example: "Garuda Pancasila, bendera, lagu kebangsaan",
        legalBasis: "UU Lambang Negara",
        englishTerm: "State Symbolism",
        relatedTerms: ["National Symbols", "Lambang Negara"]
      },
      {
        id: 852,
        term: "Simposium",
        category: "proses-legislasi",
        definition: "Pertemuan ilmiah membahas isu hukum",
        example: "Simposium hukum tata negara",
        legalBasis: "Praktik Akademis",
        englishTerm: "Symposium",
        relatedTerms: ["Legal Conference", "Seminar Hukum"]
      },
      {
        id: 853,
        term: "Sinergi Kelembagaan",
        category: "pemerintahan",
        definition: "Kerjasama antarlembaga negara",
        example: "Sinergi DPR-Pemerintah",
        legalBasis: "Good Governance",
        englishTerm: "Institutional Synergy",
        relatedTerms: ["Inter-agency Cooperation", "Kerjasama Lembaga"]
      },
      {
        id: 854,
        term: "Sinkronisasi Peraturan",
        category: "peraturan-perundangan",
        definition: "Penyelarasan antarperaturan",
        example: "Sinkronisasi Perda dengan UU",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Regulation Synchronization",
        relatedTerms: ["Harmonization", "Harmonisasi"]
      },
      {
        id: 855,
        term: "Sipil Supremasi",
        category: "sistem-pemerintahan",
        definition: "Supremasi otoritas sipil atas militer",
        example: "Kontrol sipil atas TNI",
        legalBasis: "UUD 1945",
        englishTerm: "Civilian Supremacy",
        relatedTerms: ["Civil Control", "Supremasi Sipil"]
      },
      {
        id: 856,
        term: "Sistem Bikameral",
        category: "lembaga-negara",
        definition: "Sistem parlemen dua kamar",
        example: "DPR dan DPD dalam sistem Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Bicameral System",
        relatedTerms: ["Two Chamber System", "Dua Kamar"]
      },
      {
        id: 857,
        term: "Sistem Check and Balances",
        category: "sistem-pemerintahan",
        definition: "Mekanisme saling mengawasi antarlembaga",
        example: "DPR mengawasi eksekutif",
        legalBasis: "UUD 1945",
        englishTerm: "Checks and Balances",
        relatedTerms: ["Mutual Control", "Keseimbangan Kekuasaan"]
      },
      {
        id: 858,
        term: "Sistem Distrik",
        category: "pemilu",
        definition: "Sistem pemilu berbasis wilayah",
        example: "Satu daerah pemilihan satu wakil",
        legalBasis: "UU Pemilu",
        englishTerm: "District System",
        relatedTerms: ["Constituency System", "Sistem Wilayah"]
      },
      {
        id: 859,
        term: "Sistem Hukum",
        category: "sistem-hukum",
        definition: "Tatanan hukum yang berlaku di negara",
        example: "Civil law system Indonesia",
        legalBasis: "Teori Hukum",
        englishTerm: "Legal System",
        relatedTerms: ["Law System", "Tatanan Hukum"]
      },
      {
        id: 860,
        term: "Sistem Kepartaian",
        category: "sistem-politik",
        definition: "Tatanan partai politik dalam negara",
        example: "Multipartai di Indonesia",
        legalBasis: "UU Parpol",
        englishTerm: "Party System",
        relatedTerms: ["Political Party System", "Sistem Partai"]
      },
      {
        id: 861,
        term: "Sistem Merit",
        category: "kepegawaian",
        definition: "Sistem kepegawaian berdasarkan kualifikasi",
        example: "Promosi ASN berdasarkan kompetensi",
        legalBasis: "UU ASN",
        englishTerm: "Merit System",
        relatedTerms: ["Performance Based", "Berbasis Kinerja"]
      },
      {
        id: 862,
        term: "Sistem Multipartai",
        category: "sistem-politik",
        definition: "Sistem dengan banyak partai politik",
        example: "Indonesia dengan puluhan parpol",
        legalBasis: "UU Parpol",
        englishTerm: "Multi-party System",
        relatedTerms: ["Multiple Parties", "Banyak Partai"]
      },
      {
        id: 863,
        term: "Sistem Noken",
        category: "pemilu",
        definition: "Sistem pemilu adat di Papua",
        example: "Pemilihan dengan kesepakatan adat",
        legalBasis: "Putusan MK",
        englishTerm: "Noken System",
        relatedTerms: ["Traditional Voting", "Pemilu Adat"]
      },
      {
        id: 864,
        term: "Sistem Parlementer",
        category: "sistem-pemerintahan",
        definition: "Sistem dengan PM sebagai kepala pemerintahan",
        example: "Indonesia 1945-1959",
        legalBasis: "Sejarah Ketatanegaraan",
        englishTerm: "Parliamentary System",
        relatedTerms: ["Westminster System", "Sistem PM"]
      },
      {
        id: 865,
        term: "Sistem Pemilu",
        category: "pemilu",
        definition: "Mekanisme pelaksanaan pemilihan umum",
        example: "Proporsional terbuka di Indonesia",
        legalBasis: "UU Pemilu",
        englishTerm: "Electoral System",
        relatedTerms: ["Voting System", "Mekanisme Pemilu"]
      },
      {
        id: 866,
        term: "Sistem Pemerintahan",
        category: "sistem-pemerintahan",
        definition: "Tatanan penyelenggaraan pemerintahan negara",
        example: "Presidensial di Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Government System",
        relatedTerms: ["System of Government", "Tatanan Pemerintahan"]
      },
      {
        id: 867,
        term: "Sistem Presidensial",
        category: "sistem-pemerintahan",
        definition: "Sistem dengan presiden sebagai kepala negara dan pemerintahan",
        example: "Indonesia pasca amandemen",
        legalBasis: "UUD 1945",
        englishTerm: "Presidential System",
        relatedTerms: ["Presidentialism", "Sistem Presiden"]
      },
      {
        id: 868,
        term: "Sistem Proporsional",
        category: "pemilu",
        definition: "Sistem pemilu berdasarkan proporsi suara",
        example: "Kursi sesuai persentase suara",
        legalBasis: "UU Pemilu",
        englishTerm: "Proportional System",
        relatedTerms: ["PR System", "Sistem Perwakilan"]
      },
      {
        id: 869,
        term: "Sistematika Peraturan",
        category: "peraturan-perundangan",
        definition: "Susunan dan urutan peraturan",
        example: "Bab, bagian, pasal, ayat",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Regulation Structure",
        relatedTerms: ["Legal Framework", "Struktur Peraturan"]
      },
      {
        id: 870,
        term: "Skala Prioritas",
        category: "perencanaan-negara",
        definition: "Urutan kepentingan program",
        example: "Prioritas pembangunan nasional",
        legalBasis: "UU SPPN",
        englishTerm: "Priority Scale",
        relatedTerms: ["Priority Order", "Urutan Prioritas"]
      },
      {
        id: 871,
        term: "SKPD",
        category: "pemerintahan-daerah",
        definition: "Satuan Kerja Perangkat Daerah",
        example: "Dinas sebagai SKPD",
        legalBasis: "UU Pemda",
        englishTerm: "Regional Work Unit",
        relatedTerms: ["Local Government Unit", "Perangkat Daerah"]
      },
      {
        id: 872,
        term: "Sosialisasi Peraturan",
        category: "peraturan-perundangan",
        definition: "Penyebarluasan peraturan ke masyarakat",
        example: "Sosialisasi UU baru",
        legalBasis: "UU No. 12/2011",
        englishTerm: "Regulation Socialization",
        relatedTerms: ["Law Dissemination", "Penyuluhan Hukum"]
      },
      {
        id: 873,
        term: "Sovereignty",
        category: "hukum-konstitusi",
        definition: "Kedaulatan atau kekuasaan tertinggi",
        example: "Kedaulatan rakyat Indonesia",
        legalBasis: "Pasal 1 ayat (2) UUD 1945",
        englishTerm: "Sovereignty",
        relatedTerms: ["Kedaulatan", "Supreme Power"]
      },
      {
        id: 874,
        term: "Standing Order",
        category: "lembaga-negara",
        definition: "Tata tertib tetap lembaga",
        example: "Tata tertib DPR",
        legalBasis: "Peraturan DPR",
        englishTerm: "Standing Order",
        relatedTerms: ["Tatib", "Rules of Procedure"]
      },
      {
        id: 875,
        term: "State Budget",
        category: "keuangan-negara",
        definition: "Anggaran pendapatan dan belanja negara",
        example: "APBN tahunan",
        legalBasis: "UUD 1945",
        englishTerm: "State Budget",
        relatedTerms: ["APBN", "National Budget"]
      },
      {
        id: 876,
        term: "State Capture",
        category: "politik",
        definition: "Penguasaan negara oleh kepentingan tertentu",
        example: "Oligarki menguasai kebijakan",
        legalBasis: "Ilmu Politik",
        englishTerm: "State Capture",
        relatedTerms: ["Penguasaan Negara", "Oligarchy"]
      },
      {
        id: 877,
        term: "State of Emergency",
        category: "pemerintahan",
        definition: "Keadaan darurat negara",
        example: "Darurat bencana nasional",
        legalBasis: "UU Kedaruratan",
        englishTerm: "State of Emergency",
        relatedTerms: ["Keadaan Darurat", "Emergency"]
      },
      {
        id: 878,
        term: "State of Law",
        category: "hukum-konstitusi",
        definition: "Negara berdasarkan hukum",
        example: "Indonesia negara hukum",
        legalBasis: "Pasal 1 ayat (3) UUD 1945",
        englishTerm: "Rule of Law State",
        relatedTerms: ["Rechtsstaat", "Negara Hukum"]
      },
      {
        id: 879,
        term: "Statuta",
        category: "peraturan-perundangan",
        definition: "Peraturan dasar organisasi",
        example: "Statuta universitas negeri",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Statute",
        relatedTerms: ["Charter", "Anggaran Dasar"]
      },
      {
        id: 880,
        term: "Status Hukum",
        category: "sistem-hukum",
        definition: "Kedudukan hukum seseorang/badan",
        example: "Status hukum WNI",
        legalBasis: "UU Kewarganegaraan",
        englishTerm: "Legal Status",
        relatedTerms: ["Juridical Status", "Kedudukan Hukum"]
      },
      {
        id: 881,
        term: "Status Quo",
        category: "politik",
        definition: "Keadaan yang ada saat ini",
        example: "Mempertahankan status quo",
        legalBasis: "Terminologi Politik",
        englishTerm: "Status Quo",
        relatedTerms: ["Current State", "Keadaan Sekarang"]
      },
      {
        id: 882,
        term: "Strategi Nasional",
        category: "perencanaan-negara",
        definition: "Rencana strategis tingkat nasional",
        example: "Stranas pencegahan korupsi",
        legalBasis: "Perpres",
        englishTerm: "National Strategy",
        relatedTerms: ["Strategic Plan", "Rencana Strategis"]
      },
      {
        id: 883,
        term: "Struktur Kekuasaan",
        category: "sistem-pemerintahan",
        definition: "Susunan dan pembagian kekuasaan",
        example: "Trias politica Indonesia",
        legalBasis: "UUD 1945",
        englishTerm: "Power Structure",
        relatedTerms: ["Authority Structure", "Struktur Wewenang"]
      },
      {
        id: 884,
        term: "Struktur Organisasi",
        category: "pemerintahan",
        definition: "Susunan unit kerja dalam lembaga",
        example: "Struktur organisasi kementerian",
        legalBasis: "Peraturan Organisasi",
        englishTerm: "Organizational Structure",
        relatedTerms: ["Org Structure", "Susunan Organisasi"]
      },
      {
        id: 885,
        term: "Studi Kelayakan",
        category: "perencanaan-negara",
        definition: "Kajian kelayakan program/proyek",
        example: "Feasibility study proyek infrastruktur",
        legalBasis: "Peraturan Pemerintah",
        englishTerm: "Feasibility Study",
        relatedTerms: ["Kajian Kelayakan", "FS"]
      },
      {
        id: 886,
        term: "Subjek Hukum",
        category: "sistem-hukum",
        definition: "Pihak yang dapat memiliki hak dan kewajiban",
        example: "Orang dan badan hukum",
        legalBasis: "KUHPerdata",
        englishTerm: "Legal Subject",
        relatedTerms: ["Legal Person", "Rechtspersoon"]
      },
      {
        id: 887,
        term: "Subsidi Negara",
        category: "keuangan-negara",
        definition: "Bantuan keuangan dari negara",
        example: "Subsidi BBM",
        legalBasis: "UU APBN",
        englishTerm: "State Subsidy",
        relatedTerms: ["Government Subsidy", "Bantuan Negara"]
      },
      {
        id: 888,
        term: "Substansi Hukum",
        category: "sistem-hukum",
        definition: "Isi atau materi hukum",
        example: "Norma dalam peraturan",
        legalBasis: "Teori Hukum",
        englishTerm: "Legal Substance",
        relatedTerms: ["Law Content", "Materi Hukum"]
      },
      {
        id: 889,
        term: "Suksesi Kepemimpinan",
        category: "politik",
        definition: "Pergantian pemimpin secara teratur",
        example: "Suksesi presiden melalui pemilu",
        legalBasis: "UUD 1945",
        englishTerm: "Leadership Succession",
        relatedTerms: ["Power Transition", "Pergantian Pemimpin"]
      },
      {
        id: 890,
        term: "Sumpah Jabatan",
        category: "lembaga-negara",
        definition: "Ikrar setia menjalankan jabatan",
        example: "Sumpah presiden saat pelantikan",
        legalBasis: "UUD 1945",
        englishTerm: "Oath of Office",
        relatedTerms: ["Official Oath", "Ikrar Jabatan"]
      },
      {
        id: 891,
        term: "Sumpah Pemilu",
        category: "pemilu",
        definition: "Sumpah penyelenggara pemilu",
        example: "Sumpah anggota KPU",
        legalBasis: "UU Pemilu",
        englishTerm: "Electoral Oath",
        relatedTerms: ["Election Oath", "Sumpah Penyelenggara"]
      },
      {
        id: 892,
        term: "Surat Edaran",
        category: "peraturan-perundangan",
        definition: "Pemberitahuan tertulis pejabat",
        example: "SE Menteri",
        legalBasis: "Peraturan Kebijakan",
        englishTerm: "Circular Letter",
        relatedTerms: ["Circular", "SE"]
      },
      {
        id: 893,
        term: "Surat Keputusan",
        category: "pemerintahan",
        definition: "Penetapan tertulis pejabat",
        example: "SK pengangkatan pejabat",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Decree",
        relatedTerms: ["SK", "Decision Letter"]
      },
      {
        id: 894,
        term: "Surat Mandat",
        category: "lembaga-negara",
        definition: "Surat tugas atau perintah",
        example: "Mandat presiden kepada menteri",
        legalBasis: "Praktik Pemerintahan",
        englishTerm: "Mandate Letter",
        relatedTerms: ["Letter of Authority", "Surat Tugas"]
      },
      {
        id: 895,
        term: "Surat Perintah",
        category: "pemerintahan",
        definition: "Instruksi tertulis pejabat",
        example: "Surat perintah tugas",
        legalBasis: "Hukum Administrasi",
        englishTerm: "Written Order",
        relatedTerms: ["Command Letter", "Instruksi"]
      },
      {
        id: 896,
        term: "Surplus Anggaran",
        category: "keuangan-negara",
        definition: "Kelebihan pendapatan atas belanja",
        example: "Surplus APBN",
        legalBasis: "UU Keuangan Negara",
        englishTerm: "Budget Surplus",
        relatedTerms: ["Fiscal Surplus", "Kelebihan Anggaran"]
      },
      {
        id: 897,
        term: "Survei Politik",
        category: "politik",
        definition: "Penelitian opini publik politik",
        example: "Survei elektabilitas capres",
        legalBasis: "UU Pemilu",
        englishTerm: "Political Survey",
        relatedTerms: ["Opinion Poll", "Jajak Pendapat"]
      },
      {
        id: 898,
        term: "Swasembada",
        category: "kebijakan-nasional",
        definition: "Kemampuan memenuhi kebutuhan sendiri",
        example: "Swasembada pangan",
        legalBasis: "Kebijakan Nasional",
        englishTerm: "Self-sufficiency",
        relatedTerms: ["Self-reliance", "Kemandirian"]
      },
      {
        id: 899,
        term: "Syarat Calon",
        category: "pemilu",
        definition: "Persyaratan untuk dicalonkan",
        example: "Syarat capres minimal 40 tahun",
        legalBasis: "UU Pemilu",
        englishTerm: "Candidate Requirements",
        relatedTerms: ["Eligibility", "Persyaratan"]
      },
      {
        id: 900,
        term: "Syarat Konstitusional",
        category: "hukum-konstitusi",
        definition: "Persyaratan berdasarkan konstitusi",
        example: "Syarat menjadi WNI",
        legalBasis: "UUD 1945",
        englishTerm: "Constitutional Requirements",
        relatedTerms: ["Constitutional Criteria", "Syarat UUD"]
      }
    ],

    // Helper functions
    getTermsByLetter: function(letter: string) {
      return this.terms.filter(term => 
        term.term.toUpperCase().startsWith(letter.toUpperCase())
      )
    },

    getRandomTerm: function() {
      const randomIndex = Math.floor(Math.random() * this.terms.length)
      return this.terms[randomIndex]
    },

    getTotalByCategory: function() {
      const categoryCount: { [key: string]: number } = {}
      this.terms.forEach(term => {
        categoryCount[term.category] = (categoryCount[term.category] || 0) + 1
      })
      return categoryCount
    },

    searchTerms: function(query: string) {
      const searchQuery = query.toLowerCase()
      return this.terms.filter(term => 
        term.term.toLowerCase().includes(searchQuery) ||
        term.definition.toLowerCase().includes(searchQuery) ||
        term.englishTerm?.toLowerCase().includes(searchQuery) ||
        term.relatedTerms?.some(rt => rt.toLowerCase().includes(searchQuery))
      )
    },

    getTermsByCategory: function(category: string) {
      if (category === 'all') return this.terms
      return this.terms.filter(term => term.category === category)
    },

    getTrendingTerms: function() {
      return this.terms.filter(term => term.trending === true)
    },

    // Export functions
    exportToJSON: function() {
      const dataStr = JSON.stringify(this.terms, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = 'istilah-tata-negara.json'
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    },

    exportToCSV: function() {
      const headers = ['ID', 'Istilah', 'Kategori', 'Definisi', 'Contoh', 'Dasar Hukum', 'Istilah Inggris', 'Istilah Terkait']
      
      const csvContent = [
        headers.join(','),
        ...this.terms.map(term => [
          term.id,
          `"${term.term}"`,
          term.category,
          `"${term.definition}"`,
          `"${term.example || ''}"`,
          `"${term.legalBasis}"`,
          `"${term.englishTerm || ''}"`,
          `"${term.relatedTerms?.join('; ') || ''}"`,
        ].join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'istilah-tata-negara.csv'
      link.click()
    },

    // Statistics functions
    getStatistics: function() {
      return {
        totalTerms: this.terms.length,
        completedTerms: this.terms.filter(t => t.definition && t.legalBasis).length,
        termsWithExamples: this.terms.filter(t => t.example).length,
        termsWithEnglish: this.terms.filter(t => t.englishTerm).length,
        trendingTerms: this.terms.filter(t => t.trending).length,
        categoryDistribution: this.getTotalByCategory(),
        alphabeticalDistribution: this.getAlphabeticalDistribution()
      }
    },

    getAlphabeticalDistribution: function() {
      const distribution: { [key: string]: number } = {}
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        distribution[letter] = this.getTermsByLetter(letter).length
      })
      return distribution
    },

    // Validation functions
    validateData: function() {
      const errors: string[] = []
      const warnings: string[] = []
      
      // Check for duplicate IDs
      const ids = this.terms.map(t => t.id)
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
      if (duplicateIds.length > 0) {
        errors.push(`Duplicate IDs found: ${duplicateIds.join(', ')}`)
      }
      
      // Check for missing required fields
      this.terms.forEach(term => {
        if (!term.term) errors.push(`Term missing name at ID ${term.id}`)
        if (!term.definition) warnings.push(`Term missing definition at ID ${term.id}`)
        if (!term.category) errors.push(`Term missing category at ID ${term.id}`)
        if (!term.legalBasis) warnings.push(`Term missing legal basis at ID ${term.id}`)
      })
      
      // Check category validity
      const validCategories = this.metadata.categories.map(c => c.id)
      this.terms.forEach(term => {
        if (!validCategories.includes(term.category)) {
          errors.push(`Invalid category "${term.category}" at ID ${term.id}`)
        }
      })
      
      return { errors, warnings, isValid: errors.length === 0 }
    }
  }

  // Export the complete data
  export { istilahTataNegaraData }
  export default istilahTataNegaraData

  // Export type definitions
  export type { Term }

  // Usage example component
  export const IstilahTataNegaraExplorer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null)
    
    const filteredTerms = useMemo(() => {
      let terms = istilahTataNegaraData.getTermsByCategory(selectedCategory)
      if (searchQuery) {
        terms = terms.filter(term => 
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      return terms
    }, [searchQuery, selectedCategory])

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <h1 className="text-3xl font-bold">Kamus Istilah Hukum Tata Negara Indonesia</h1>
          <p className="mt-2 text-blue-100">
            {istilahTataNegaraData.metadata.total} istilah hukum tata negara
          </p>
        </div>

        {/* Search and Filter */}
        <div className="p-6 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari istilah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">Semua Kategori</option>
                {istilahTataNegaraData.metadata.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Terms List */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid gap-4">
            {filteredTerms.map(term => (
              <div
                key={term.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTerm(term)}
              >
                <h3 className="font-semibold text-lg">{term.term}</h3>
                <p className="text-gray-600 mt-1">{term.definition}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {term.category}
                  </span>
                  {term.trending && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      Trending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            onClick={() => istilahTataNegaraData.exportToJSON()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Export JSON
          </button>
          <button
            onClick={() => istilahTataNegaraData.exportToCSV()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>
    )
  }