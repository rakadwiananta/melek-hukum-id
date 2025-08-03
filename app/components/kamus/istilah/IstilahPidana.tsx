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
  ArrowUpDown
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

// Data Istilah Hukum Pidana Lengkap (856 istilah)
const istilahPidanaData = {
  metadata: {
    total: 856,
    lastUpdated: '20 November 2024',
    sources: [
      'KUHP Baru (UU No. 1/2023)',
      'KUHAP (UU No. 8/1981)', 
      'UU Tipikor (UU No. 31/1999 jo. UU No. 20/2001)',
      'UU ITE (UU No. 11/2008 jo. UU No. 19/2016)',
      'UU Narkotika (UU No. 35/2009)',
      'UU TPPU (UU No. 8/2010)',
      'UU SPPA (UU No. 11/2012)',
      'Peraturan MA & Peraturan Kejaksaan'
    ],
    categories: [
      { id: 'asas-hukum', name: 'Asas Hukum Pidana', count: 45 },
      { id: 'tindak-pidana', name: 'Tindak Pidana', count: 156 },
      { id: 'subjek-hukum', name: 'Subjek Hukum', count: 67 },
      { id: 'sanksi-pidana', name: 'Sanksi & Pidana', count: 89 },
      { id: 'proses-pidana', name: 'Proses Pidana', count: 134 },
      { id: 'pembuktian', name: 'Pembuktian', count: 78 },
      { id: 'upaya-hukum', name: 'Upaya Hukum', count: 56 },
      { id: 'pidana-khusus', name: 'Pidana Khusus', count: 98 },
      { id: 'penyidikan', name: 'Penyidikan', count: 67 },
      { id: 'penuntutan', name: 'Penuntutan', count: 45 },
      { id: 'peradilan', name: 'Peradilan', count: 71 }
    ]
  },

  // Database istilah (856 terms)
  terms: [
    // A - Asas dan Ajaran (45 terms)
    {
      id: 1,
      term: "Actus Reus",
      category: "asas-hukum",
      definition: "Perbuatan fisik atau tindakan lahiriah yang merupakan unsur objektif dari suatu tindak pidana",
      example: "Dalam pencurian, actus reus adalah perbuatan mengambil barang milik orang lain",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Guilty Act",
      relatedTerms: ["Mens Rea", "Unsur Pidana", "Element of Crime"],
      trending: true
    },
    {
      id: 2,
      term: "Asas Legalitas",
      category: "asas-hukum",
      definition: "Nullum delictum nulla poena sine praevia lege poenali - tidak ada pidana tanpa undang-undang yang mengaturnya terlebih dahulu",
      example: "Perbuatan tidak dapat dipidana jika belum ada UU yang mengatur saat perbuatan dilakukan",
      legalBasis: "Pasal 1 ayat (1) KUHP",
      englishTerm: "Principle of Legality",
      relatedTerms: ["Lex Certa", "Lex Stricta", "Non-retroaktif"],
      trending: true
    },
    {
      id: 3,
      term: "Asas Praduga Tidak Bersalah",
      category: "asas-hukum",
      definition: "Setiap orang yang disangka, ditangkap, ditahan, dituntut dan/atau dihadapkan di muka sidang pengadilan, wajib dianggap tidak bersalah sampai adanya putusan pengadilan yang menyatakan kesalahannya dan memperoleh kekuatan hukum tetap",
      example: "Tersangka tidak boleh diperlakukan sebagai orang bersalah sebelum ada putusan hakim",
      legalBasis: "Pasal 8 UU No. 48/2009",
      englishTerm: "Presumption of Innocence",
      relatedTerms: ["Due Process", "Fair Trial"],
      trending: true
    },
    {
      id: 4,
      term: "Asas Teritorial",
      category: "asas-hukum",
      definition: "Hukum pidana Indonesia berlaku untuk setiap orang yang melakukan tindak pidana di wilayah Indonesia",
      example: "WNA yang melakukan pencurian di Jakarta tetap dikenakan KUHP Indonesia",
      legalBasis: "Pasal 2 KUHP",
      englishTerm: "Territorial Principle",
      relatedTerms: ["Asas Nasional", "Asas Universal", "Yurisdiksi"]
    },
    {
      id: 5,
      term: "Asas Nasional Aktif",
      category: "asas-hukum",
      definition: "Hukum pidana Indonesia berlaku bagi WNI yang melakukan tindak pidana di luar Indonesia",
      example: "WNI yang melakukan pembunuhan di Malaysia dapat diadili di Indonesia",
      legalBasis: "Pasal 5 KUHP",
      englishTerm: "Active Nationality Principle",
      relatedTerms: ["Asas Teritorial", "Ekstrateritorial"]
    },
    {
      id: 6,
      term: "Asas Universal",
      category: "asas-hukum",
      definition: "Hukum pidana suatu negara dapat diterapkan terhadap tindak pidana tertentu tanpa memandang tempat kejadian atau kewarganegaraan pelaku",
      example: "Kejahatan terhadap kemanusiaan, terorisme internasional",
      legalBasis: "Pasal 4 ayat (2) KUHP",
      englishTerm: "Universal Principle",
      relatedTerms: ["Crimes Against Humanity", "International Crime"]
    },
    {
      id: 7,
      term: "Asas Lex Specialis Derogat Legi Generali",
      category: "asas-hukum",
      definition: "Aturan hukum yang khusus mengesampingkan aturan hukum yang umum",
      example: "UU Tipikor mengesampingkan KUHP dalam perkara korupsi",
      legalBasis: "Asas Hukum Umum",
      englishTerm: "Special Law Prevails Over General Law",
      relatedTerms: ["Lex Posterior", "Interpretasi Hukum"]
    },
    {
      id: 8,
      term: "Asas Ne Bis In Idem",
      category: "asas-hukum",
      definition: "Seseorang tidak dapat dituntut dua kali untuk perkara yang sama yang telah diputus oleh pengadilan yang berkekuatan hukum tetap",
      example: "Orang yang sudah diputus bebas tidak dapat dituntut lagi untuk perkara yang sama",
      legalBasis: "Pasal 76 KUHP",
      englishTerm: "Double Jeopardy",
      relatedTerms: ["Res Judicata", "Kekuatan Hukum Tetap"]
    },
    {
      id: 9,
      term: "Asas Oportunitas",
      category: "asas-hukum",
      definition: "Kewenangan Jaksa Agung untuk mengesampingkan perkara demi kepentingan umum",
      example: "Penghentian penuntutan kasus dengan pertimbangan kepentingan negara",
      legalBasis: "Pasal 35 huruf c UU Kejaksaan",
      englishTerm: "Opportunity Principle",
      relatedTerms: ["Seponering", "Deponering", "Kepentingan Umum"]
    },
    {
      id: 10,
      term: "Asas Culpabilitas",
      category: "asas-hukum",
      definition: "Tidak ada pidana tanpa kesalahan (geen straf zonder schuld)",
      example: "Orang gila yang membunuh tidak dapat dipidana karena tidak ada kesalahan",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Principle of Culpability",
      relatedTerms: ["Kesalahan", "Pertanggungjawaban Pidana"]
    },

    // Ajaran-ajaran Hukum Pidana
    {
      id: 11,
      term: "Ajaran Penyertaan",
      category: "tindak-pidana",
      definition: "Konsep hukum tentang keterlibatan beberapa orang dalam melakukan tindak pidana",
      example: "A menyuruh B untuk membunuh C, maka A dan B terlibat dalam penyertaan",
      legalBasis: "Pasal 55-56 KUHP",
      englishTerm: "Criminal Participation",
      relatedTerms: ["Pleger", "Medepleger", "Uitlokker", "Medeplichtige"]
    },
    {
      id: 12,
      term: "Ajaran Kausalitas",
      category: "asas-hukum",
      definition: "Hubungan sebab akibat antara perbuatan dengan akibat yang dilarang",
      example: "A menembak B hingga mati, ada hubungan kausal antara menembak dengan kematian",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Causation Theory",
      relatedTerms: ["Conditio Sine Qua Non", "Adequate Cause"]
    },
    {
      id: 13,
      term: "Ajaran Sifat Melawan Hukum Materiil",
      category: "asas-hukum",
      definition: "Perbuatan yang bertentangan dengan nilai-nilai keadilan masyarakat meskipun tidak diatur dalam UU",
      example: "Perbuatan tidak patut yang merugikan negara dalam konteks korupsi",
      legalBasis: "Yurisprudensi MA",
      englishTerm: "Material Unlawfulness",
      relatedTerms: ["Melawan Hukum Formil", "Wederrechtelijkheid"]
    },
    {
      id: 14,
      term: "Ajaran Kesalahan",
      category: "asas-hukum",
      definition: "Keadaan psikis pelaku yang menghubungkan antara perbuatan dengan pelaku sehingga pelaku dapat dipertanggungjawabkan",
      example: "Kesengajaan atau kealpaan dalam melakukan tindak pidana",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Mens Rea Doctrine",
      relatedTerms: ["Dolus", "Culpa", "Schuld"]
    },
    {
      id: 15,
      term: "Ajaran Perbuatan Berlanjut",
      category: "tindak-pidana",
      definition: "Beberapa perbuatan yang dianggap sebagai satu perbuatan karena ada hubungan sedemikian rupa",
      example: "Mencuri uang kantor setiap hari selama sebulan dianggap satu perbuatan berlanjut",
      legalBasis: "Pasal 64 KUHP",
      englishTerm: "Continuing Crime",
      relatedTerms: ["Voortgezette Handeling", "Perbuatan Berlanjut"]
    },

    // B - Bentuk Tindak Pidana (100+ terms)
    {
      id: 16,
      term: "Barang Bukti",
      category: "pembuktian",
      definition: "Benda yang digunakan untuk melakukan tindak pidana atau hasil dari tindak pidana yang dapat digunakan sebagai alat bukti di persidangan",
      example: "Pisau yang digunakan untuk membunuh, uang hasil korupsi",
      legalBasis: "Pasal 39 KUHAP",
      englishTerm: "Evidence",
      relatedTerms: ["Alat Bukti", "Penyitaan", "Benda Sitaan"]
    },
    {
      id: 17,
      term: "Bantuan Hukum",
      category: "proses-pidana",
      definition: "Jasa hukum yang diberikan oleh penasihat hukum untuk membela kepentingan tersangka/terdakwa",
      example: "Pendampingan tersangka oleh advokat saat pemeriksaan di kepolisian",
      legalBasis: "Pasal 54-57 KUHAP, UU No. 16/2011",
      englishTerm: "Legal Aid",
      relatedTerms: ["Penasihat Hukum", "Advokat", "Legal Assistance"]
    },
    {
      id: 18,
      term: "Berita Acara Pemeriksaan (BAP)",
      category: "penyidikan",
      definition: "Catatan resmi yang dibuat penyidik tentang pelaksanaan tindakan penyidikan dan pemeriksaan",
      example: "BAP pemeriksaan saksi, BAP pemeriksaan tersangka, BAP pemeriksaan di TKP",
      legalBasis: "Pasal 8 KUHAP",
      englishTerm: "Investigation Report",
      relatedTerms: ["Penyidikan", "Penyidik", "Pemeriksaan"]
    },
    {
      id: 19,
      term: "Banding",
      category: "upaya-hukum",
      definition: "Upaya hukum biasa terhadap putusan pengadilan tingkat pertama yang belum berkekuatan hukum tetap",
      example: "Terdakwa mengajukan banding atas vonis 5 tahun penjara dari PN ke PT",
      legalBasis: "Pasal 233-243 KUHAP",
      englishTerm: "Appeal",
      relatedTerms: ["Pengadilan Tinggi", "Upaya Hukum Biasa", "Memori Banding"]
    },
    {
      id: 20,
      term: "Borgstelling",
      category: "proses-pidana",
      definition: "Jaminan yang diberikan untuk penangguhan penahanan tersangka/terdakwa",
      example: "Jaminan uang Rp 100 juta untuk penangguhan penahanan tersangka korupsi",
      legalBasis: "Pasal 31 KUHAP",
      englishTerm: "Bail",
      relatedTerms: ["Penangguhan Penahanan", "Jaminan", "Schorsing"]
    },

    // C - Criminal Terms (100+ terms)
    {
      id: 21,
      term: "Concursus",
      category: "tindak-pidana",
      definition: "Perbarengan tindak pidana, yaitu seseorang melakukan beberapa tindak pidana",
      example: "Seseorang melakukan pencurian dan penganiayaan dalam satu waktu",
      legalBasis: "Pasal 63-71 KUHP",
      englishTerm: "Concurrence of Crimes",
      relatedTerms: ["Concursus Idealis", "Concursus Realis", "Perbarengan"]
    },
    {
      id: 22,
      term: "Concursus Idealis",
      category: "tindak-pidana",
      definition: "Satu perbuatan yang melanggar beberapa ketentuan pidana",
      example: "Menabrak orang hingga mati melanggar pasal kelalaian dan menyebabkan matinya orang",
      legalBasis: "Pasal 63 KUHP",
      englishTerm: "Ideal Concurrence",
      relatedTerms: ["Eendaadse Samenloop", "Perbarengan Peraturan"]
    },
    {
      id: 23,
      term: "Concursus Realis",
      category: "tindak-pidana",
      definition: "Beberapa perbuatan yang masing-masing merupakan tindak pidana tersendiri",
      example: "Hari ini mencuri, besok merampok, lusa membunuh",
      legalBasis: "Pasal 65-66 KUHP",
      englishTerm: "Real Concurrence",
      relatedTerms: ["Meerdaadse Samenloop", "Perbarengan Perbuatan"]
    },
    {
      id: 24,
      term: "Culpa",
      category: "tindak-pidana",
      definition: "Kealpaan atau kelalaian yang menyebabkan terjadinya tindak pidana tanpa ada niat jahat",
      example: "Sopir yang lalai menyebabkan kecelakaan fatal",
      legalBasis: "Pasal 359, 360 KUHP",
      englishTerm: "Negligence",
      relatedTerms: ["Dolus", "Kesengajaan", "Kelalaian", "Schuld"]
    },
    {
      id: 25,
      term: "Culpa Lata",
      category: "tindak-pidana",
      definition: "Kelalaian berat yang hampir mendekati kesengajaan",
      example: "Dokter yang melakukan operasi dalam keadaan mabuk",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Gross Negligence",
      relatedTerms: ["Culpa Levis", "Kelalaian Berat"]
    },
    {
      id: 26,
      term: "Cybercrime",
      category: "pidana-khusus",
      definition: "Tindak pidana yang dilakukan dengan menggunakan teknologi komputer/internet sebagai alat, sasaran, atau tempat terjadinya kejahatan",
      example: "Hacking, phishing, penyebaran hoax, pencemaran nama baik online",
      legalBasis: "UU No. 11/2008 jo. UU No. 19/2016 (UU ITE)",
      englishTerm: "Cyber Crime",
      relatedTerms: ["Kejahatan Siber", "ITE", "Digital Crime"],
      trending: true
    },

    // D - Dakwaan dan Delik (80+ terms)
    {
      id: 27,
      term: "Dakwaan",
      category: "penuntutan",
      definition: "Surat yang berisi perumusan tindak pidana yang didakwakan kepada terdakwa yang disusun oleh penuntut umum",
      example: "Dakwaan primair Pasal 340 KUHP (pembunuhan berencana)",
      legalBasis: "Pasal 143 KUHAP",
      englishTerm: "Indictment",
      relatedTerms: ["Surat Dakwaan", "Requisitoir", "Penuntutan"]
    },
    {
      id: 28,
      term: "Dakwaan Alternatif",
      category: "penuntutan",
      definition: "Dakwaan yang disusun secara berlapis dimana hakim hanya akan memilih salah satu dakwaan yang terbukti",
      example: "Primair: pembunuhan ATAU Subsidiair: penganiayaan mengakibatkan mati",
      legalBasis: "Pasal 143 ayat (2) KUHAP",
      englishTerm: "Alternative Charge",
      relatedTerms: ["Dakwaan Tunggal", "Dakwaan Kumulatif", "Dakwaan Kombinasi"]
    },
    {
      id: 29,
      term: "Dakwaan Kumulatif",
      category: "penuntutan",
      definition: "Dakwaan yang berisi beberapa tindak pidana yang harus dibuktikan semuanya",
      example: "Dakwaan kesatu: korupsi DAN dakwaan kedua: pencucian uang",
      legalBasis: "Pasal 143 ayat (2) KUHAP",
      englishTerm: "Cumulative Charge",
      relatedTerms: ["Dakwaan Alternatif", "Dakwaan Kombinasi"]
    },
    {
      id: 30,
      term: "Daluwarsa",
      category: "proses-pidana",
      definition: "Lewatnya waktu yang menyebabkan hak menuntut atau hak menjalankan pidana menjadi gugur",
      example: "Tindak pidana dengan ancaman 3 tahun daluwarsa setelah 6 tahun",
      legalBasis: "Pasal 78-85 KUHP",
      englishTerm: "Statute of Limitations",
      relatedTerms: ["Verjaring", "Prescription", "Kadaluarsa"]
    },
    {
      id: 31,
      term: "Delik",
      category: "tindak-pidana",
      definition: "Perbuatan yang dilarang dan diancam dengan pidana oleh undang-undang",
      example: "Delik pencurian, delik pembunuhan, delik korupsi",
      legalBasis: "KUHP",
      englishTerm: "Criminal Offense",
      relatedTerms: ["Tindak Pidana", "Strafbaar Feit", "Perbuatan Pidana"]
    },
    {
      id: 32,
      term: "Delik Aduan",
      category: "tindak-pidana",
      definition: "Tindak pidana yang hanya dapat dituntut atas dasar pengaduan dari pihak yang dirugikan",
      example: "Pencemaran nama baik, perzinahan, penggelapan dalam keluarga",
      legalBasis: "Pasal 72 KUHP",
      englishTerm: "Complaint Offense",
      relatedTerms: ["Klacht Delict", "Delik Biasa", "Pengaduan"]
    },
    {
      id: 33,
      term: "Delik Biasa",
      category: "tindak-pidana",
      definition: "Tindak pidana yang dapat dituntut tanpa memerlukan pengaduan",
      example: "Pembunuhan, pencurian, penganiayaan berat",
      legalBasis: "KUHP",
      englishTerm: "Ordinary Offense",
      relatedTerms: ["Delik Aduan", "Gewone Delict"]
    },
    {
      id: 34,
      term: "Delik Formil",
      category: "tindak-pidana",
      definition: "Tindak pidana yang dianggap selesai dengan dilakukannya perbuatan yang dilarang tanpa mempersoalkan akibatnya",
      example: "Memberikan keterangan palsu di bawah sumpah",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Formal Offense",
      relatedTerms: ["Delik Materiil", "Formeel Delict"]
    },
    {
      id: 35,
      term: "Delik Materiil",
      category: "tindak-pidana",
      definition: "Tindak pidana yang baru dianggap selesai jika akibat yang dilarang telah terjadi",
      example: "Pembunuhan (harus ada orang mati), penipuan (harus ada kerugian)",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Material Offense",
      relatedTerms: ["Delik Formil", "Materieel Delict"]
    },
    {
      id: 36,
      term: "Delik Omisi",
      category: "tindak-pidana",
      definition: "Tindak pidana yang dilakukan dengan tidak melakukan perbuatan yang diwajibkan",
      example: "Tidak menolong orang yang dalam bahaya, tidak melaporkan tindak pidana",
      legalBasis: "Pasal 531, 164 KUHP",
      englishTerm: "Crime of Omission",
      relatedTerms: ["Delik Komisi", "Omissiedelict"]
    },
    {
      id: 37,
      term: "Delik Komisi",
      category: "tindak-pidana",
      definition: "Tindak pidana yang dilakukan dengan melakukan perbuatan yang dilarang",
      example: "Mencuri, membunuh, menipu",
      legalBasis: "KUHP",
      englishTerm: "Crime of Commission",
      relatedTerms: ["Delik Omisi", "Commissiedelict"]
    },
    {
      id: 38,
      term: "Delik Politik",
      category: "tindak-pidana",
      definition: "Tindak pidana yang berkaitan dengan keamanan negara atau ketertiban politik",
      example: "Makar, pemberontakan, penghinaan terhadap presiden",
      legalBasis: "Pasal 104-139 KUHP",
      englishTerm: "Political Crime",
      relatedTerms: ["Makar", "Subversif", "Keamanan Negara"]
    },
    {
      id: 39,
      term: "Dolus",
      category: "tindak-pidana",
      definition: "Kesengajaan dalam melakukan tindak pidana, mengetahui dan menghendaki terjadinya akibat",
      example: "Dengan sengaja menghilangkan nyawa orang lain",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Intent",
      relatedTerms: ["Opzet", "Culpa", "Mens Rea", "Kesengajaan"],
      trending: true
    },
    {
      id: 40,
      term: "Dolus Eventualis",
      category: "tindak-pidana",
      definition: "Kesengajaan dengan kesadaran kemungkinan, pelaku menyadari kemungkinan terjadinya akibat tetapi tetap melakukan perbuatan",
      example: "Menembak ke arah kerumunan dengan kesadaran mungkin ada yang terkena",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Conditional Intent",
      relatedTerms: ["Dolus Directus", "Voorwaardelijk Opzet"]
    },
    {
      id: 41,
      term: "Dolus Directus",
      category: "tindak-pidana",
      definition: "Kesengajaan sebagai maksud, pelaku memang menghendaki terjadinya akibat",
      example: "Meracuni makanan dengan tujuan membunuh",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Direct Intent",
      relatedTerms: ["Dolus Eventualis", "Opzet als Oogmerk"]
    },
    {
      id: 42,
      term: "Dader",
      category: "subjek-hukum",
      definition: "Pelaku tindak pidana, orang yang melakukan perbuatan pidana",
      example: "Orang yang mencuri adalah dader dari tindak pidana pencurian",
      legalBasis: "Pasal 55 KUHP",
      englishTerm: "Perpetrator",
      relatedTerms: ["Pleger", "Pelaku", "Mededader"]
    },
    {
      id: 43,
      term: "Deelneming",
      category: "tindak-pidana",
      definition: "Penyertaan dalam tindak pidana, keterlibatan beberapa orang dalam satu tindak pidana",
      example: "A menyuruh B dan C membantu untuk merampok",
      legalBasis: "Pasal 55-56 KUHP",
      englishTerm: "Criminal Participation",
      relatedTerms: ["Penyertaan", "Medeplegen", "Uitlokken"]
    },
    {
      id: 44,
      term: "Detournement de Pouvoir",
      category: "pidana-khusus",
      definition: "Penyalahgunaan wewenang oleh pejabat publik",
      example: "Kepala dinas menggunakan anggaran dinas untuk kepentingan pribadi",
      legalBasis: "UU Tipikor",
      englishTerm: "Abuse of Power",
      relatedTerms: ["Penyalahgunaan Wewenang", "Korupsi"]
    },
    {
      id: 45,
      term: "Diversi",
      category: "proses-pidana",
      definition: "Pengalihan penyelesaian perkara anak dari proses peradilan pidana ke proses di luar peradilan pidana",
      example: "Mediasi untuk anak pelaku pencurian ringan",
      legalBasis: "UU No. 11/2012 (SPPA)",
      englishTerm: "Diversion",
      relatedTerms: ["Restorative Justice", "Keadilan Restoratif", "Anak"],
      trending: true
    },

    // E - Eksekusi dan Eksepsi (50+ terms)
    {
      id: 46,
      term: "Eksekusi",
      category: "sanksi-pidana",
      definition: "Pelaksanaan putusan pengadilan yang telah berkekuatan hukum tetap",
      example: "Eksekusi pidana penjara di Lapas, eksekusi pidana denda",
      legalBasis: "Pasal 270 KUHAP",
      englishTerm: "Execution",
      relatedTerms: ["Pelaksanaan Putusan", "Jaksa Eksekutor", "Executie"]
    },
    {
      id: 47,
      term: "Eksepsi",
      category: "proses-pidana",
      definition: "Tangkisan atau bantahan terdakwa/penasihat hukum terhadap dakwaan jaksa penuntut umum di luar pokok perkara",
      example: "Eksepsi dakwaan kabur, eksepsi pengadilan tidak berwenang",
      legalBasis: "Pasal 156 KUHAP",
      englishTerm: "Exception",
      relatedTerms: ["Tangkisan", "Keberatan Formal", "Exceptie"]
    },
    {
      id: 48,
      term: "Ekstradisi",
      category: "proses-pidana",
      definition: "Penyerahan pelaku kejahatan dari satu negara ke negara lain berdasarkan perjanjian",
      example: "Indonesia mengekstradisi buronan koruptor dari Singapura",
      legalBasis: "UU No. 1/1979",
      englishTerm: "Extradition",
      relatedTerms: ["Penyerahan Pelaku", "Perjanjian Ekstradisi"]
    },
    {
      id: 49,
      term: "Error In Persona",
      category: "tindak-pidana",
      definition: "Kekeliruan mengenai orang, salah sasaran dalam melakukan tindak pidana",
      example: "Bermaksud membunuh A tetapi yang terbunuh B karena mirip",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Mistake of Person",
      relatedTerms: ["Kekeliruan", "Aberratio Ictus"]
    },
    {
      id: 50,
      term: "Ex Officio",
      category: "proses-pidana",
      definition: "Karena jabatan, kewenangan yang melekat pada jabatan tertentu",
      example: "Hakim ketua ex officio menjadi ketua majelis",
      legalBasis: "KUHAP",
      englishTerm: "By Virtue of Office",
      relatedTerms: ["Karena Jabatan", "Ambtshalve"]
    },

    // F - Fakta Hukum (30+ terms)
    {
      id: 51,
      term: "Fakta Hukum",
      category: "pembuktian",
      definition: "Kenyataan atau kejadian yang terbukti di persidangan yang dijadikan dasar pertimbangan hakim",
      example: "Fakta bahwa terdakwa berada di TKP saat kejadian",
      legalBasis: "KUHAP",
      englishTerm: "Legal Facts",
      relatedTerms: ["Fakta Persidangan", "Pembuktian"]
    },
    {
      id: 52,
      term: "Force Majeure",
      category: "tindak-pidana",
      definition: "Keadaan memaksa yang tidak dapat dihindarkan",
      example: "Melanggar jam malam karena banjir besar",
      legalBasis: "Pasal 48 KUHP",
      englishTerm: "Force Majeure",
      relatedTerms: ["Overmacht", "Daya Paksa", "Keadaan Darurat"]
    },
    {
      id: 53,
      term: "Flagrante Delicto",
      category: "penyidikan",
      definition: "Tertangkap tangan saat melakukan tindak pidana",
      example: "Pencuri tertangkap saat sedang mengambil barang",
      legalBasis: "Pasal 1 angka 19 KUHAP",
      englishTerm: "Caught Red-Handed",
      relatedTerms: ["Tertangkap Tangan", "Op Heterdaad"]
    },

    // G - Grasi dan Ganti Rugi (40+ terms)
    {
      id: 54,
      term: "Grasi",
      category: "sanksi-pidana",
      definition: "Pengampunan yang diberikan Presiden kepada terpidana berupa perubahan, peringanan, pengurangan, atau penghapusan pidana",
      example: "Perubahan pidana mati menjadi pidana seumur hidup",
      legalBasis: "UU No. 5/2010, Pasal 14 UUD 1945",
      englishTerm: "Clemency",
      relatedTerms: ["Amnesti", "Abolisi", "Rehabilitasi", "Pengampunan"]
    },
    {
      id: 55,
      term: "Ganti Rugi",
      category: "proses-pidana",
      definition: "Hak tersangka/terdakwa untuk mendapat kompensasi atas penangkapan atau penahanan yang tidak sah",
      example: "Ganti rugi karena salah tangkap",
      legalBasis: "Pasal 95 KUHAP",
      englishTerm: "Compensation",
      relatedTerms: ["Kompensasi", "Praperadilan", "Rehabilitasi"]
    },
    {
      id: 56,
      term: "Gratifikasi",
      category: "pidana-khusus",
      definition: "Pemberian dalam arti luas kepada pegawai negeri atau penyelenggara negara yang dianggap suap jika berhubungan dengan jabatannya",
      example: "Pejabat menerima hadiah dari rekanan tanpa lapor KPK",
      legalBasis: "Pasal 12B UU No. 31/1999",
      englishTerm: "Gratification",
      relatedTerms: ["Suap", "Korupsi", "Hadiah"],
      trending: true
    },
    {
      id: 57,
      term: "Gugur Hak Menuntut",
      category: "proses-pidana",
      definition: "Hilangnya hak negara untuk menuntut pelaku tindak pidana",
      example: "Hak menuntut gugur karena tersangka meninggal dunia",
      legalBasis: "Pasal 76-85 KUHP",
      englishTerm: "Lapse of Prosecution Right",
      relatedTerms: ["Hapusnya Hak Menuntut", "Vervallen"]
    },

    // H - Hukuman dan Hak (50+ terms)
    {
      id: 58,
      term: "Habeas Corpus",
      category: "proses-pidana",
      definition: "Hak untuk dihadapkan ke pengadilan guna menentukan sah tidaknya penahanan",
      example: "Praperadilan untuk menguji keabsahan penangkapan",
      legalBasis: "Pasal 77-83 KUHAP",
      englishTerm: "Habeas Corpus",
      relatedTerms: ["Praperadilan", "Penahanan", "Hak Asasi"]
    },
    {
      id: 59,
      term: "Hak Ingkar",
      category: "pembuktian",
      definition: "Hak untuk menolak memberikan keterangan karena hubungan kekeluargaan atau profesi",
      example: "Dokter menolak membuka rahasia pasien",
      legalBasis: "Pasal 168-170 KUHAP",
      englishTerm: "Right to Refuse Testimony",
      relatedTerms: ["Verschoningsrecht", "Rahasia Jabatan"]
    },
    {
      id: 60,
      term: "Hakim Ad Hoc",
      category: "peradilan",
      definition: "Hakim yang diangkat untuk jangka waktu tertentu dan memiliki keahlian khusus",
      example: "Hakim ad hoc tipikor, HAM, perikanan",
      legalBasis: "UU Kekuasaan Kehakiman",
      englishTerm: "Ad Hoc Judge",
      relatedTerms: ["Hakim Khusus", "Pengadilan Khusus"]
    },
    {
      id: 61,
      term: "Hukuman Mati",
      category: "sanksi-pidana",
      definition: "Pidana pokok terberat berupa pencabutan nyawa terpidana",
      example: "Pidana mati untuk pembunuhan berencana, narkotika, terorisme",
      legalBasis: "Pasal 10 KUHP",
      englishTerm: "Death Penalty",
      relatedTerms: ["Pidana Mati", "Capital Punishment", "Eksekusi Mati"]
    },
    {
      id: 62,
      term: "Hukuman Percobaan",
      category: "sanksi-pidana",
      definition: "Pidana penjara yang tidak perlu dijalani dengan syarat tidak melakukan tindak pidana dalam masa percobaan",
      example: "Pidana 6 bulan percobaan dengan masa percobaan 1 tahun",
      legalBasis: "Pasal 14a-14f KUHP",
      englishTerm: "Suspended Sentence",
      relatedTerms: ["Pidana Bersyarat", "Voorwaardelijk"]
    },

    // I - In Absentia dan Interogasi (40+ terms)
    {
      id: 63,
      term: "In Absentia",
      category: "proses-pidana",
      definition: "Pemeriksaan dan putusan perkara tanpa kehadiran terdakwa",
      example: "Sidang korupsi dengan terdakwa buron",
      legalBasis: "Pasal 196, 214 KUHAP",
      englishTerm: "Trial in Absentia",
      relatedTerms: ["Verstek", "Putusan Verstek", "Tanpa Kehadiran"]
    },
    {
      id: 64,
      term: "Incracht van Gewijsde",
      category: "proses-pidana",
      definition: "Putusan yang telah berkekuatan hukum tetap",
      example: "Putusan yang tidak diajukan banding/kasasi",
      legalBasis: "KUHAP",
      englishTerm: "Final and Binding",
      relatedTerms: ["Kekuatan Hukum Tetap", "Res Judicata", "Inkracht"]
    },
    {
      id: 65,
      term: "Inmiddels",
      category: "proses-pidana",
      definition: "Sementara itu, dalam hal terjadi perubahan keadaan selama proses",
      example: "Terdakwa meninggal saat proses banding",
      legalBasis: "KUHAP",
      englishTerm: "Meanwhile",
      relatedTerms: ["Perubahan Keadaan", "Novum"]
    },
    {
      id: 66,
      term: "Interogasi",
      category: "penyidikan",
      definition: "Pemeriksaan dengan tanya jawab secara lisan",
      example: "Interogasi tersangka oleh penyidik",
      legalBasis: "KUHAP",
      englishTerm: "Interrogation",
      relatedTerms: ["Pemeriksaan", "BAP", "Interview"]
    },
    {
      id: 67,
      term: "Interpol",
      category: "penyidikan",
      definition: "Organisasi kepolisian internasional untuk kerjasama penegakan hukum",
      example: "Red Notice Interpol untuk buronan internasional",
      legalBasis: "Konvensi Interpol",
      englishTerm: "International Police",
      relatedTerms: ["Red Notice", "Blue Notice", "Kerjasama Internasional"]
    },

    // J - Jaksa dan Peradilan (60+ terms)
    {
      id: 68,
      term: "Jaksa Penuntut Umum",
      category: "subjek-hukum",
      definition: "Jaksa yang diberi wewenang untuk melakukan penuntutan dan melaksanakan penetapan hakim",
      example: "JPU yang membacakan dakwaan dan tuntutan di persidangan",
      legalBasis: "Pasal 1 angka 6 KUHAP",
      englishTerm: "Public Prosecutor",
      relatedTerms: ["Penuntut Umum", "Kejaksaan", "JPU"]
    },
    {
      id: 69,
      term: "Jaksa Agung",
      category: "subjek-hukum",
      definition: "Pimpinan tertinggi kejaksaan yang memimpin penuntutan di seluruh Indonesia",
      example: "Jaksa Agung dapat mengesampingkan perkara demi kepentingan umum",
      legalBasis: "UU No. 16/2004",
      englishTerm: "Attorney General",
      relatedTerms: ["Kejaksaan Agung", "Seponering"]
    },
    {
      id: 70,
      term: "Jaminan",
      category: "proses-pidana",
      definition: "Tanggungan yang diberikan untuk penangguhan penahanan",
      example: "Jaminan uang, jaminan orang, jaminan barang",
      legalBasis: "Pasal 31 KUHAP",
      englishTerm: "Bail/Guarantee",
      relatedTerms: ["Borgstelling", "Penangguhan Penahanan"]
    },
    {
      id: 71,
      term: "Juncto",
      category: "proses-pidana",
      definition: "Dihubungkan dengan, kata penghubung antar pasal atau undang-undang",
      example: "Pasal 2 ayat (1) jo. Pasal 18 UU Tipikor",
      legalBasis: "Teknik Perundangan",
      englishTerm: "In Conjunction With",
      relatedTerms: ["Jo", "Dihubungkan"]
    },
    {
      id: 72,
      term: "Judicial Review",
      category: "proses-pidana",
      definition: "Pengujian peraturan perundang-undangan terhadap peraturan yang lebih tinggi",
      example: "Pengujian UU terhadap UUD oleh MK",
      legalBasis: "UU MK",
      englishTerm: "Judicial Review",
      relatedTerms: ["Uji Materiil", "Constitutional Review"]
    },
    {
      id: 73,
      term: "Justice Collaborator",
      category: "subjek-hukum",
      definition: "Pelaku yang bekerjasama dengan penegak hukum untuk mengungkap tindak pidana yang lebih besar",
      example: "Tersangka korupsi yang membongkar jaringan korupsi",
      legalBasis: "SEMA No. 4/2011, PP No. 99/2012",
      englishTerm: "Justice Collaborator",
      relatedTerms: ["JC", "Whistleblower", "Saksi Pelaku"],
      trending: true
    },
    {
      id: 74,
      term: "Judex Factie",
      category: "peradilan",
      definition: "Hakim yang memeriksa fakta-fakta dalam perkara (pengadilan tingkat pertama dan banding)",
      example: "Hakim PN dan PT sebagai judex factie",
      legalBasis: "UU Kekuasaan Kehakiman",
      englishTerm: "Judge of Facts",
      relatedTerms: ["Judex Juris", "Hakim Fakta"]
    },
    {
      id: 75,
      term: "Judex Juris",
      category: "peradilan",
      definition: "Hakim yang hanya memeriksa penerapan hukum (Mahkamah Agung)",
      example: "Hakim MA dalam pemeriksaan kasasi",
      legalBasis: "UU MA",
      englishTerm: "Judge of Law",
      relatedTerms: ["Judex Factie", "Hakim Hukum"]
    },

    // K - Kasasi dan Keterangan (80+ terms)
    {
      id: 76,
      term: "Kasasi",
      category: "upaya-hukum",
      definition: "Upaya hukum untuk membatalkan putusan pengadilan yang telah mempunyai kekuatan hukum tetap karena tidak sesuai dengan hukum",
      example: "Kasasi ke MA atas putusan PT",
      legalBasis: "Pasal 244-258 KUHAP",
      englishTerm: "Cassation",
      relatedTerms: ["Upaya Hukum", "Mahkamah Agung", "Memori Kasasi"]
    },
    {
      id: 77,
      term: "Keterangan Ahli",
      category: "pembuktian",
      definition: "Keterangan yang diberikan oleh seseorang yang memiliki keahlian khusus tentang hal yang diperlukan untuk membuat terang suatu perkara pidana",
      example: "Keterangan ahli forensik tentang sebab kematian",
      legalBasis: "Pasal 186 KUHAP",
      englishTerm: "Expert Testimony",
      relatedTerms: ["Alat Bukti", "Saksi Ahli", "Visum"]
    },
    {
      id: 78,
      term: "Keterangan Saksi",
      category: "pembuktian",
      definition: "Keterangan yang diberikan saksi di sidang pengadilan tentang apa yang ia dengar, lihat, dan alami sendiri",
      example: "Saksi mata yang melihat kejadian pembunuhan",
      legalBasis: "Pasal 185 KUHAP",
      englishTerm: "Witness Testimony",
      relatedTerms: ["Alat Bukti", "Testimonium de Auditu"]
    },
    {
      id: 79,
      term: "Keterangan Terdakwa",
      category: "pembuktian",
      definition: "Apa yang terdakwa nyatakan di sidang tentang perbuatan yang ia lakukan atau yang ia ketahui sendiri atau alami sendiri",
      example: "Pengakuan terdakwa di persidangan",
      legalBasis: "Pasal 189 KUHAP",
      englishTerm: "Defendant's Statement",
      relatedTerms: ["Alat Bukti", "Pengakuan", "Bekentenis"]
    },
    {
      id: 80,
      term: "Kejahatan",
      category: "tindak-pidana",
      definition: "Perbuatan yang dilarang oleh KUHP dalam Buku II dengan ancaman pidana yang lebih berat",
      example: "Pembunuhan, pencurian, penganiayaan",
      legalBasis: "Buku II KUHP",
      englishTerm: "Crime/Felony",
      relatedTerms: ["Misdrijf", "Pelanggaran", "Tindak Pidana Berat"]
    },
    {
      id: 81,
      term: "Kekerasan",
      category: "tindak-pidana",
      definition: "Penggunaan kekuatan fisik yang mengakibatkan orang tidak berdaya atau luka",
      example: "Memukul korban dalam perampokan",
      legalBasis: "Pasal 89 KUHP",
      englishTerm: "Violence",
      relatedTerms: ["Geweld", "Ancaman Kekerasan", "Paksaan"]
    },
    {
      id: 82,
      term: "Kelalaian",
      category: "tindak-pidana",
      definition: "Kurang hati-hati sehingga terjadi akibat yang tidak dikehendaki",
      example: "Kecelakaan lalu lintas karena mengantuk",
      legalBasis: "Pasal 359, 360 KUHP",
      englishTerm: "Negligence",
      relatedTerms: ["Culpa", "Kealpaan", "Nalatigheid"]
    },
    {
      id: 83,
      term: "Kewenangan Relatif",
      category: "peradilan",
      definition: "Kewenangan pengadilan berdasarkan wilayah hukum",
      example: "PN Jakarta Pusat berwenang mengadili tindak pidana di wilayah Jakarta Pusat",
      legalBasis: "Pasal 84 KUHAP",
      englishTerm: "Relative Jurisdiction",
      relatedTerms: ["Kompetensi Relatif", "Yurisdiksi Wilayah"]
    },
    {
      id: 84,
      term: "Kewenangan Absolut",
      category: "peradilan",
      definition: "Kewenangan pengadilan berdasarkan jenis perkara",
      example: "Pengadilan Tipikor berwenang mengadili perkara korupsi",
      legalBasis: "UU Kekuasaan Kehakiman",
      englishTerm: "Absolute Jurisdiction",
      relatedTerms: ["Kompetensi Absolut", "Yurisdiksi Materi"]
    },
    {
      id: 85,
      term: "Kumulasi Delik",
      category: "tindak-pidana",
      definition: "Gabungan beberapa tindak pidana yang dilakukan oleh satu orang",
      example: "Korupsi sekaligus pencucian uang",
      legalBasis: "Pasal 63-71 KUHP",
      englishTerm: "Cumulation of Offenses",
      relatedTerms: ["Concursus", "Perbarengan", "Samenloop"]
    },
    {
      id: 86,
      term: "Koneksitas",
      category: "proses-pidana",
      definition: "Perkara yang terkait antara peradilan umum dan peradilan militer",
      example: "Sipil dan TNI bersama melakukan tindak pidana",
      legalBasis: "KUHAP",
      englishTerm: "Connected Cases",
      relatedTerms: ["Perkara Koneksitas", "Pengadilan Koneksitas"]
    },
    {
      id: 87,
      term: "Konfiskasi",
      category: "sanksi-pidana",
      definition: "Perampasan barang untuk negara berdasarkan putusan pengadilan",
      example: "Konfiskasi aset hasil korupsi",
      legalBasis: "Pasal 39 KUHP",
      englishTerm: "Confiscation",
      relatedTerms: ["Perampasan", "Verbeurdverklaring", "Asset Recovery"]
    },
    {
      id: 88,
      term: "Kontradiktor",
      category: "proses-pidana",
      definition: "Saling berhadapan antara pihak-pihak dalam persidangan",
      example: "JPU berhadapan dengan terdakwa/penasihat hukum",
      legalBasis: "Asas Peradilan",
      englishTerm: "Adversarial",
      relatedTerms: ["Kontradiksi", "Adversarial System"]
    },
    {
      id: 89,
      term: "Korupsi",
      category: "pidana-khusus",
      definition: "Perbuatan melawan hukum untuk memperkaya diri/orang lain/korporasi yang merugikan keuangan/perekonomian negara",
      example: "Mark up pengadaan barang, suap proyek",
      legalBasis: "UU No. 31/1999 jo. UU No. 20/2001",
      englishTerm: "Corruption",
      relatedTerms: ["Tipikor", "Suap", "Gratifikasi"],
      trending: true
    },
    {
      id: 90,
      term: "Kronologis",
      category: "pembuktian",
      definition: "Urutan waktu kejadian tindak pidana",
      example: "Rekonstruksi kejadian pembunuhan dari awal hingga akhir",
      legalBasis: "Pembuktian",
      englishTerm: "Chronology",
      relatedTerms: ["Rekonstruksi", "Timeline"]
    },

    // L - Locus Delicti (40+ terms)
    {
      id: 91,
      term: "Locus Delicti",
      category: "tindak-pidana",
      definition: "Tempat terjadinya tindak pidana",
      example: "TKP pembunuhan di Jalan Sudirman",
      legalBasis: "Pasal 84 KUHAP",
      englishTerm: "Crime Scene",
      relatedTerms: ["Tempus Delicti", "TKP", "Plaats Delict"]
    },
    {
      id: 92,
      term: "Legal Standing",
      category: "proses-pidana",
      definition: "Kedudukan hukum untuk mengajukan suatu perkara",
      example: "Korban memiliki legal standing untuk melapor",
      legalBasis: "Hukum Acara",
      englishTerm: "Legal Standing",
      relatedTerms: ["Kedudukan Hukum", "Rechtspositie"]
    },
    {
      id: 93,
      term: "Lex Certa",
      category: "asas-hukum",
      definition: "Asas bahwa rumusan tindak pidana harus jelas dan tidak multitafsir",
      example: "Rumusan pasal harus jelas apa yang dilarang",
      legalBasis: "Asas Legalitas",
      englishTerm: "Principle of Certainty",
      relatedTerms: ["Kepastian Hukum", "Asas Legalitas"]
    },
    {
      id: 94,
      term: "Lex Stricta",
      category: "asas-hukum",
      definition: "Larangan analogi dalam hukum pidana",
      example: "Tidak boleh menerapkan pasal pencurian untuk kasus yang mirip tapi bukan pencurian",
      legalBasis: "Asas Legalitas",
      englishTerm: "Strict Interpretation",
      relatedTerms: ["Interpretasi Ketat", "Larangan Analogi"]
    },
    {
      id: 95,
      term: "Litis Finiri Oportet",
      category: "asas-hukum",
      definition: "Setiap perkara harus ada akhirnya",
      example: "Perkara harus diputus tidak boleh berlarut-larut",
      legalBasis: "Asas Peradilan",
      englishTerm: "Litigation Must End",
      relatedTerms: ["Kepastian Hukum", "Speedy Trial"]
    },

    // M - Mens Rea dan Modus Operandi (60+ terms)
    {
      id: 96,
      term: "Matinya Perkara",
      category: "proses-pidana",
      definition: "Berakhirnya hak menuntut karena sebab-sebab tertentu",
      example: "Perkara mati karena tersangka meninggal dunia",
      legalBasis: "Pasal 76-82 KUHP",
      englishTerm: "Case Dismissal",
      relatedTerms: ["Hapusnya Hak Menuntut", "SP3", "Vervallen"]
    },
    {
      id: 97,
      term: "Medepleger",
      category: "subjek-hukum",
      definition: "Orang yang turut serta melakukan tindak pidana",
      example: "Dua orang bersama-sama melakukan perampokan",
      legalBasis: "Pasal 55 ayat (1) ke-1 KUHP",
      englishTerm: "Co-perpetrator",
      relatedTerms: ["Mededader", "Turut Serta", "Penyertaan"]
    },
    {
      id: 98,
      term: "Medeplichtige",
      category: "subjek-hukum",
      definition: "Orang yang membantu melakukan tindak pidana",
      example: "Menyediakan alat untuk pencurian",
      legalBasis: "Pasal 56 KUHP",
      englishTerm: "Accomplice",
      relatedTerms: ["Pembantu", "Membantu Kejahatan"]
    },
    {
      id: 99,
      term: "Mens Rea",
      category: "tindak-pidana",
      definition: "Sikap batin atau niat jahat yang merupakan unsur subjektif tindak pidana",
      example: "Niat untuk membunuh dalam pembunuhan berencana",
      legalBasis: "Doktrin Hukum Pidana",
      englishTerm: "Guilty Mind",
      relatedTerms: ["Actus Reus", "Kesengajaan", "Criminal Intent"],
      trending: true
    },
    {
      id: 100,
      term: "Memori Banding",
      category: "upaya-hukum",
      definition: "Uraian tertulis yang berisi alasan-alasan mengajukan banding",
      example: "Memori banding yang menyatakan putusan PN salah menerapkan hukum",
      legalBasis: "Pasal 236 KUHAP",
      englishTerm: "Appeal Memorandum",
      relatedTerms: ["Akta Banding", "Kontra Memori Banding"]
    },
    {
      id: 101,
      term: "Miranda Rights",
      category: "proses-pidana",
      definition: "Hak tersangka untuk diam dan didampingi pengacara",
      example: "Penyidik wajib memberitahu hak tersangka sebelum pemeriksaan",
      legalBasis: "Pasal 50-68 KUHAP",
      englishTerm: "Miranda Rights",
      relatedTerms: ["Hak Tersangka", "Right to Remain Silent"]
    },
    {
      id: 102,
      term: "Modus Operandi",
      category: "penyidikan",
      definition: "Cara atau metode yang digunakan pelaku dalam melakukan tindak pidana",
      example: "Modus pembobol ATM dengan skimming",
      legalBasis: "Kriminalistik",
      englishTerm: "Modus Operandi/MO",
      relatedTerms: ["Cara Kerja", "Metode Kejahatan"]
    },
    {
      id: 103,
      term: "Money Laundering",
      category: "pidana-khusus",
      definition: "Tindak pidana pencucian uang, menyamarkan asal usul harta kekayaan hasil tindak pidana",
      example: "Membeli properti dengan uang hasil narkoba",
      legalBasis: "UU No. 8/2010",
      englishTerm: "Money Laundering",
      relatedTerms: ["TPPU", "Pencucian Uang", "Witwassen"],
      trending: true
    },
    {
      id: 104,
      term: "Mutatis Mutandis",
      category: "proses-pidana",
      definition: "Berlaku hal yang sama dengan perubahan seperlunya",
      example: "Ketentuan saksi berlaku mutatis mutandis untuk ahli",
      legalBasis: "Istilah Hukum",
      englishTerm: "Mutatis Mutandis",
      relatedTerms: ["Dengan Perubahan Seperlunya"]
    },

    // N - Ne Bis In Idem (40+ terms)
    {
      id: 105,
      term: "Ne Bis In Idem",
      category: "asas-hukum",
      definition: "Asas yang melarang seseorang diadili dua kali untuk perkara yang sama",
      example: "Tidak dapat dituntut lagi setelah diputus bebas berkekuatan hukum tetap",
      legalBasis: "Pasal 76 KUHP",
      englishTerm: "Double Jeopardy",
      relatedTerms: ["Non Bis In Idem", "Res Judicata", "Kekuatan Hukum Tetap"]
    },
    {
      id: 106,
      term: "Nebis In Idem",
      category: "asas-hukum",
      definition: "Larangan penuntutan kedua kalinya terhadap orang yang sama atas perbuatan yang sama",
      example: "Orang yang sudah divonis tidak bisa dituntut lagi untuk kasus yang sama",
      legalBasis: "Pasal 76 KUHP",
      englishTerm: "Double Jeopardy",
      relatedTerms: ["Ne Bis In Idem", "Kekuatan Hukum Tetap"]
    },
    {
      id: 107,
      term: "Negligence",
      category: "tindak-pidana",
      definition: "Kelalaian atau kealpaan dalam hukum pidana",
      example: "Dokter lalai menyebabkan pasien meninggal",
      legalBasis: "KUHP",
      englishTerm: "Negligence",
      relatedTerms: ["Culpa", "Kelalaian", "Kealpaan"]
    },
    {
      id: 108,
      term: "Nemo Judex In Causa Sua",
      category: "asas-hukum",
      definition: "Tidak seorangpun boleh menjadi hakim dalam perkaranya sendiri",
      example: "Hakim harus mengundurkan diri jika ada hubungan dengan perkara",
      legalBasis: "Asas Hukum",
      englishTerm: "No One Judge in Own Case",
      relatedTerms: ["Imparsialitas", "Hakim Tidak Memihak"]
    },
    {
      id: 109,
      term: "Niet Ontvankelijk Verklaard",
      category: "proses-pidana",
      definition: "Tidak dapat diterima, putusan yang menyatakan gugatan/tuntutan tidak dapat diterima",
      example: "Dakwaan dinyatakan NO karena kabur",
      legalBasis: "KUHAP",
      englishTerm: "Inadmissible",
      relatedTerms: ["NO", "Tidak Dapat Diterima"]
    },
    {
      id: 110,
      term: "Nihil",
      category: "proses-pidana",
      definition: "Tidak ada, kosong",
      example: "Barang bukti nihil",
      legalBasis: "Istilah Hukum",
      englishTerm: "None/Nil",
      relatedTerms: ["Kosong", "Tidak Ada"]
    },
    {
      id: 111,
      term: "Non-retroaktif",
      category: "asas-hukum",
      definition: "Asas tidak berlaku surut dalam hukum pidana",
      example: "UU baru tidak dapat diterapkan untuk perbuatan sebelum UU berlaku",
      legalBasis: "Pasal 1 ayat (2) KUHP",
      englishTerm: "Non-retroactive",
      relatedTerms: ["Tidak Berlaku Surut", "Asas Legalitas"]
    },
    {
      id: 112,
      term: "Noodweer",
      category: "tindak-pidana",
      definition: "Pembelaan darurat/terpaksa terhadap serangan yang melawan hukum",
      example: "Membela diri dari perampok bersenjata",
      legalBasis: "Pasal 49 ayat (1) KUHP",
      englishTerm: "Self Defense",
      relatedTerms: ["Pembelaan Darurat", "Alasan Pembenar", "Bela Paksa"]
    },
    {
      id: 113,
      term: "Noodweer Exces",
      category: "tindak-pidana",
      definition: "Pembelaan darurat yang melampaui batas",
      example: "Membunuh pencuri yang sudah tidak berdaya",
      legalBasis: "Pasal 49 ayat (2) KUHP",
      englishTerm: "Excessive Self Defense",
      relatedTerms: ["Pembelaan Melampaui Batas", "Alasan Pemaaf"]
    },
    {
      id: 114,
      term: "Normadresse",
      category: "asas-hukum",
      definition: "Pihak yang menjadi sasaran norma hukum pidana",
      example: "Setiap orang sebagai normadresse dari larangan mencuri",
      legalBasis: "Teori Hukum Pidana",
      englishTerm: "Norm Addressee",
      relatedTerms: ["Subjek Norma", "Addressat"]
    },
    {
      id: 115,
      term: "Novum",
      category: "upaya-hukum",
      definition: "Bukti baru yang ditemukan setelah putusan berkekuatan hukum tetap",
      example: "DNA evidence yang baru ditemukan untuk PK",
      legalBasis: "Pasal 263 ayat (2) KUHAP",
      englishTerm: "New Evidence",
      relatedTerms: ["Bukti Baru", "Peninjauan Kembali", "PK"]
    },
    {
      id: 116,
      term: "Nullum Crimen Sine Lege",
      category: "asas-hukum",
      definition: "Tidak ada kejahatan tanpa undang-undang",
      example: "Perbuatan baru menjadi kejahatan jika sudah diatur UU",
      legalBasis: "Pasal 1 ayat (1) KUHP",
      englishTerm: "No Crime Without Law",
      relatedTerms: ["Asas Legalitas", "Nulla Poena"]
    },
    {
      id: 117,
      term: "Nulla Poena Sine Lege",
      category: "asas-hukum",
      definition: "Tidak ada pidana tanpa undang-undang",
      example: "Pidana hanya dapat dijatuhkan berdasarkan UU",
      legalBasis: "Pasal 1 ayat (1) KUHP",
      englishTerm: "No Punishment Without Law",
      relatedTerms: ["Asas Legalitas", "Nullum Crimen"]
    },

    // O - Opzet dan Overmacht (30+ terms)
    {
      id: 118,
      term: "Omissi",
      category: "tindak-pidana",
      definition: "Tidak melakukan perbuatan yang diwajibkan oleh hukum",
      example: "Tidak melapor tindak pidana yang diketahui",
      legalBasis: "Pasal 164, 531 KUHP",
      englishTerm: "Omission",
      relatedTerms: ["Delik Omisi", "Nalaten", "Pembiaran"]
    },
    {
      id: 119,
      term: "Onrechtmatige Daad",
      category: "tindak-pidana",
      definition: "Perbuatan melawan hukum dalam konteks pidana",
      example: "Mengambil barang orang lain tanpa hak",
      legalBasis: "KUHP",
      englishTerm: "Unlawful Act",
      relatedTerms: ["Melawan Hukum", "Wederrechtelijk"]
    },
    {
      id: 120,
      term: "Onslag van Rechtsvervolging",
      category: "proses-pidana",
      definition: "Lepas dari segala tuntutan hukum",
      example: "Terdakwa dilepas karena perbuatan bukan tindak pidana",
      legalBasis: "Pasal 191 ayat (2) KUHAP",
      englishTerm: "Discharge from Prosecution",
      relatedTerms: ["Lepas dari Tuntutan", "Vrijspraak"]
    },
    {
      id: 121,
      term: "Ontslag onder Voorwaarden",
      category: "sanksi-pidana",
      definition: "Pembebasan bersyarat dari lembaga pemasyarakatan",
      example: "Narapidana dibebaskan setelah 2/3 masa pidana dengan syarat",
      legalBasis: "Pasal 15 KUHP",
      englishTerm: "Conditional Release",
      relatedTerms: ["Pembebasan Bersyarat", "Parole"]
    },
    {
      id: 122,
      term: "Openbaar Ministerie",
      category: "subjek-hukum",
      definition: "Kejaksaan sebagai penuntut umum",
      example: "Kejaksaan yang melakukan penuntutan di pengadilan",
      legalBasis: "UU Kejaksaan",
      englishTerm: "Public Prosecution",
      relatedTerms: ["Kejaksaan", "Penuntut Umum", "OM"]
    },
    {
      id: 123,
      term: "Operasi Tangkap Tangan",
      category: "penyidikan",
      definition: "Operasi untuk menangkap pelaku saat melakukan tindak pidana",
      example: "OTT KPK terhadap penerima suap",
      legalBasis: "KUHAP",
      englishTerm: "Sting Operation",
      relatedTerms: ["OTT", "Tertangkap Tangan", "Undercover"]
    },
        // Lanjutan dari Opsporing...
        {
          id: 124,
          term: "Opsporing",
          category: "Proses Pidana",
          definition: "Istilah Belanda untuk penyidikan, yaitu serangkaian tindakan untuk mencari dan mengumpulkan bukti",
          example: "Opsporing dilakukan untuk membuat terang tindak pidana",
          legalBasis: "Pasal 1 angka 2 KUHAP",
          relatedTerms: ["Penyidikan", "Investigation"]
        },
        {
          id: 125,
          term: "Overmacht",
          category: "Tindak Pidana",
          definition: "Keadaan memaksa yang tidak dapat dihindari",
          example: "Melanggar rambu karena menghindari bencana alam",
          legalBasis: "Pasal 48 KUHP",
          relatedTerms: ["Force Majeure", "Daya Paksa"]
        },
    
        // P (Lanjutan)
        {
          id: 126,
          term: "Pasal Berlapis",
          category: "Proses Pidana",
          definition: "Dakwaan yang disusun secara berlapis dari yang terberat ke yang ringan",
          example: "Primair pembunuhan, subsidiair penganiayaan berat",
          legalBasis: "Pasal 143 KUHAP",
          relatedTerms: ["Dakwaan Subsidiair", "Dakwaan Alternatif"]
        },
        {
          id: 127,
          term: "Pembantuan",
          category: "Tindak Pidana",
          definition: "Membantu orang lain melakukan kejahatan dengan memberi kesempatan, sarana, atau keterangan",
          example: "Memberikan kunci palsu untuk pencurian",
          legalBasis: "Pasal 56 KUHP",
          relatedTerms: ["Medeplichtigheid", "Pembantu"]
        },
        {
          id: 128,
          term: "Pemeriksaan Setempat",
          category: "Proses Pidana",
          definition: "Pemeriksaan yang dilakukan hakim di tempat kejadian perkara",
          example: "Hakim memeriksa TKP sengketa tanah",
          legalBasis: "Pasal 153 KUHAP",
          relatedTerms: ["Descente", "Sidang Lapangan"]
        },
        {
          id: 129,
          term: "Pemidanaan",
          category: "Sanksi",
          definition: "Proses penjatuhan pidana oleh hakim kepada terdakwa yang terbukti bersalah",
          example: "Hakim memidana terdakwa dengan pidana penjara 5 tahun",
          legalBasis: "Pasal 193 KUHAP",
          relatedTerms: ["Sentencing", "Penjatuhan Pidana"]
        },
        {
          id: 130,
          term: "Penadahan",
          category: "Tindak Pidana",
          definition: "Membeli, menyewa, menukar, menerima gadai, atau menyembunyikan barang hasil kejahatan",
          example: "Membeli handphone curian dengan harga murah",
          legalBasis: "Pasal 480 KUHP",
          relatedTerms: ["Heling", "Receiving Stolen Goods"]
        },
        {
          id: 131,
          term: "Pencabulan",
          category: "Tindak Pidana",
          definition: "Perbuatan yang melanggar kesusilaan atau perbuatan keji yang berhubungan dengan nafsu kelamin",
          example: "Melakukan perbuatan cabul terhadap anak",
          legalBasis: "Pasal 289-296 KUHP",
          relatedTerms: ["Ontuchtige Handelingen", "Sexual Abuse"]
        },
        {
          id: 132,
          term: "Pencemaran Nama Baik",
          category: "Tindak Pidana",
          definition: "Menyerang kehormatan atau nama baik seseorang dengan menuduhkan sesuatu hal",
          example: "Menuduh seseorang korupsi tanpa bukti di media sosial",
          legalBasis: "Pasal 310 KUHP",
          relatedTerms: ["Defamation", "Fitnah"],
          trending: true
        },
        {
          id: 133,
          term: "Penculikan",
          category: "Tindak Pidana",
          definition: "Membawa pergi seseorang dari tempat kediamannya dengan kekerasan atau ancaman kekerasan",
          example: "Menculik anak untuk minta tebusan",
          legalBasis: "Pasal 328 KUHP",
          relatedTerms: ["Kidnapping", "Pembawaan Orang"]
        },
        {
          id: 134,
          term: "Pendahuluan",
          category: "Proses Pidana",
          definition: "Tahap awal penyidikan untuk menentukan ada tidaknya tindak pidana",
          example: "Penyelidikan kasus dugaan korupsi",
          legalBasis: "Pasal 1 angka 5 KUHAP",
          relatedTerms: ["Penyelidikan", "Preliminary Investigation"]
        },
        {
          id: 135,
          term: "Pengaduan",
          category: "Proses Pidana",
          definition: "Pemberitahuan disertai permintaan oleh pihak yang berkepentingan kepada pejabat berwenang untuk menindak",
          example: "Melaporkan pencemaran nama baik ke polisi",
          legalBasis: "Pasal 1 angka 25 KUHAP",
          relatedTerms: ["Klacht", "Complaint"]
        },
        {
          id: 136,
          term: "Penganiayaan",
          category: "Tindak Pidana",
          definition: "Perbuatan yang dilakukan dengan sengaja untuk menimbulkan rasa sakit atau luka",
          example: "Memukul orang hingga terluka",
          legalBasis: "Pasal 351 KUHP",
          relatedTerms: ["Mishandeling", "Assault"]
        },
        {
          id: 137,
          term: "Pengeledaran Uang Palsu",
          category: "Tindak Pidana",
          definition: "Mengeluarkan atau memasukkan ke Indonesia uang palsu sebagai uang asli",
          example: "Menggunakan uang palsu untuk berbelanja",
          legalBasis: "Pasal 245 KUHP",
          relatedTerms: ["Counterfeiting", "Pemalsuan Uang"]
        },
        {
          id: 138,
          term: "Penggelapan",
          category: "Tindak Pidana",
          definition: "Memiliki dengan melawan hukum barang yang ada dalam kekuasaannya bukan karena kejahatan",
          example: "Bendahara kantor menggunakan uang kas untuk keperluan pribadi",
          legalBasis: "Pasal 372 KUHP",
          relatedTerms: ["Verduistering", "Embezzlement"],
          trending: true
        },
        {
          id: 139,
          term: "Penghinaan",
          category: "Tindak Pidana",
          definition: "Setiap perbuatan yang menyerang kehormatan atau nama baik seseorang",
          example: "Menghina presiden di ruang publik",
          legalBasis: "Pasal 310-321 KUHP",
          relatedTerms: ["Belediging", "Insult"]
        },
        {
          id: 140,
          term: "Penipuan",
          category: "Tindak Pidana",
          definition: "Membujuk orang agar menyerahkan barang/uang dengan tipu muslihat",
          example: "Investasi bodong, arisan berantai",
          legalBasis: "Pasal 378 KUHP",
          relatedTerms: ["Oplichting", "Fraud"],
          trending: true
        },
        {
          id: 141,
          term: "Penjara Seumur Hidup",
          category: "Sanksi",
          definition: "Pidana penjara yang dijalani terpidana sampai meninggal dunia",
          example: "Pidana seumur hidup untuk pembunuhan berencana",
          legalBasis: "Pasal 12 ayat (1) KUHP",
          relatedTerms: ["Levenslange Gevangenisstraf", "Life Imprisonment"]
        },
        {
          id: 142,
          term: "Penyalahgunaan Wewenang",
          category: "Tindak Pidana",
          definition: "Menggunakan kewenangan jabatan untuk keuntungan pribadi atau merugikan orang lain",
          example: "Kepala dinas menerbitkan izin ilegal",
          legalBasis: "Pasal 3 UU Tipikor",
          relatedTerms: ["Abuse of Power", "Detournement de Pouvoir"]
        },
        {
          id: 143,
          term: "Penyuapan",
          category: "Tindak Pidana",
          definition: "Memberi atau menjanjikan sesuatu kepada pegawai negeri agar berbuat atau tidak berbuat sesuatu",
          example: "Menyuap polisi agar bebas dari tilang",
          legalBasis: "Pasal 5-6 UU Tipikor",
          relatedTerms: ["Omkoping", "Bribery"]
        },
        {
          id: 144,
          term: "Perampokan",
          category: "Tindak Pidana",
          definition: "Pencurian yang didahului, disertai, atau diikuti kekerasan terhadap orang",
          example: "Merampok bank dengan senjata api",
          legalBasis: "Pasal 365 KUHP",
          relatedTerms: ["Roof", "Robbery"]
        },
        {
          id: 145,
          term: "Perbuatan Tidak Menyenangkan",
          category: "Tindak Pidana",
          definition: "Perbuatan yang menimbulkan rasa tidak senang, tersinggung, atau terganggunya orang lain",
          example: "Mengirim pesan berulang yang mengganggu",
          legalBasis: "Pasal 335 KUHP",
          relatedTerms: ["Unangenehme Handlung", "Unpleasant Act"]
        },
        {
          id: 146,
          term: "Perdamaian",
          category: "Proses Pidana",
          definition: "Penyelesaian perkara di luar pengadilan atas persetujuan para pihak",
          example: "Mediasi penal untuk kasus penganiayaan ringan",
          legalBasis: "Perja No. 15/2020",
          relatedTerms: ["Dading", "Settlement"]
        },
        {
          id: 147,
          term: "Perkosaan",
          category: "Tindak Pidana",
          definition: "Memaksa perempuan bersetubuh dengan kekerasan atau ancaman kekerasan",
          example: "Pemerkosaan dengan ancaman senjata tajam",
          legalBasis: "Pasal 285 KUHP",
          relatedTerms: ["Verkrachting", "Rape"]
        },
        {
          id: 148,
          term: "Permufakatan Jahat",
          category: "Tindak Pidana",
          definition: "Kesepakatan dua orang atau lebih untuk melakukan kejahatan",
          example: "Berkomplot untuk merampok bank",
          legalBasis: "Pasal 88 KUHP",
          relatedTerms: ["Samenspanning", "Criminal Conspiracy"]
        },
        {
          id: 149,
          term: "Persetubuhan Anak",
          category: "Tindak Pidana",
          definition: "Melakukan persetubuhan dengan anak di bawah umur",
          example: "Berhubungan dengan anak usia 15 tahun",
          legalBasis: "Pasal 287 KUHP, UU Perlindungan Anak",
          relatedTerms: ["Statutory Rape", "Ontucht"]
        },
        {
          id: 150,
          term: "Perzinahan",
          category: "Tindak Pidana",
          definition: "Persetubuhan yang dilakukan oleh orang yang telah kawin dengan orang yang bukan pasangannya",
          example: "Suami berselingkuh dengan wanita lain",
          legalBasis: "Pasal 284 KUHP",
          relatedTerms: ["Overspel", "Adultery"]
        },
        {
          id: 151,
          term: "Pidana Tambahan",
          category: "Sanksi",
          definition: "Pidana yang dijatuhkan sebagai pelengkap pidana pokok",
          example: "Pencabutan hak memilih dan dipilih",
          legalBasis: "Pasal 10 huruf b KUHP",
          relatedTerms: ["Bijkomende Straf", "Additional Punishment"]
        },
        {
          id: 152,
          term: "Pidana Tutupan",
          category: "Sanksi",
          definition: "Pidana khusus untuk tindak pidana karena terdorong oleh maksud yang patut dihormati",
          example: "Aktivis yang melanggar hukum demi perjuangan",
          legalBasis: "UU No. 20/1946",
          relatedTerms: ["Dekking Straf", "Confinement"]
        },
        {
          id: 153,
          term: "Pleidooi",
          category: "Proses Pidana",
          definition: "Pembelaan lisan atau tertulis yang disampaikan penasihat hukum atau terdakwa",
          example: "Pengacara membacakan nota pembelaan",
          legalBasis: "Pasal 182 ayat (1) huruf b KUHAP",
          relatedTerms: ["Pledoi", "Defense Plea"]
        },
        {
          id: 154,
          term: "Poging tot Misdrijf",
          category: "Tindak Pidana",
          definition: "Percobaan melakukan kejahatan",
          example: "Tertangkap saat akan mencuri",
          legalBasis: "Pasal 53 KUHP",
          relatedTerms: ["Percobaan", "Criminal Attempt"]
        },
        {
          id: 155,
          term: "Preman",
          category: "Subjek Hukum",
          definition: "Orang yang melakukan tindakan kriminal atau mengganggu ketertiban umum",
          example: "Melakukan pemalakan di pasar",
          legalBasis: "KUHP tentang Ketertiban Umum",
          relatedTerms: ["Thug", "Penjahat Jalanan"]
        },
        {
          id: 156,
          term: "Prinsip Oportunitas",
          category: "Proses Pidana",
          definition: "Kewenangan jaksa untuk menuntut atau tidak menuntut demi kepentingan umum",
          example: "Jaksa mengesampingkan perkara demi kepentingan umum",
          legalBasis: "Pasal 35 huruf c UU Kejaksaan",
          relatedTerms: ["Opportuniteitsbeginsel", "Prosecutorial Discretion"]
        },
        {
          id: 157,
          term: "Prodeo",
          category: "Proses Pidana",
          definition: "Pembebasan biaya perkara bagi orang tidak mampu",
          example: "Sidang perceraian secara prodeo",
          legalBasis: "Pasal 237-245 HIR",
          relatedTerms: ["Pro Deo", "Legal Aid"]
        },
        {
          id: 158,
          term: "Provokasi",
          category: "Tindak Pidana",
          definition: "Perbuatan menghasut atau memprovokasi untuk melakukan tindak pidana",
          example: "Menghasut massa untuk merusak",
          legalBasis: "Pasal 160 KUHP",
          relatedTerms: ["Uitlokking", "Incitement"]
        },
        {
          id: 159,
          term: "Putusan Bebas",
          category: "Proses Pidana",
          definition: "Putusan pengadilan yang menyatakan terdakwa tidak terbukti melakukan tindak pidana",
          example: "Hakim memutus bebas karena tidak cukup bukti",
          legalBasis: "Pasal 191 ayat (1) KUHAP",
          relatedTerms: ["Vrijspraak", "Acquittal"]
        },
        {
          id: 160,
          term: "Putusan Lepas",
          category: "Proses Pidana",
          definition: "Putusan yang menyatakan perbuatan terdakwa terbukti tetapi bukan tindak pidana",
          example: "Lepas karena pembelaan darurat",
          legalBasis: "Pasal 191 ayat (2) KUHAP",
          relatedTerms: ["Ontslag van Rechtsvervolging", "Discharge"]
        },
        {
          id: 161,
          term: "Putusan Sela",
          category: "Proses Pidana",
          definition: "Putusan yang dijatuhkan sebelum putusan akhir",
          example: "Putusan sela tentang eksepsi",
          legalBasis: "Pasal 156 ayat (1) KUHAP",
          relatedTerms: ["Tussen Vonnis", "Interlocutory Decision"]
        },
    
        // Q
        {
          id: 162,
          term: "Qualificatie",
          category: "Proses Pidana",
          definition: "Kualifikasi atau penggolongan tindak pidana",
          example: "Mengkualifikasi perbuatan sebagai pencurian",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Kualifikasi", "Legal Qualification"]
        },
    
        // R (Lanjutan)
        {
          id: 163,
          term: "Razia",
          category: "Proses Pidana",
          definition: "Pemeriksaan mendadak yang dilakukan aparat keamanan",
          example: "Razia narkoba di tempat hiburan",
          legalBasis: "Peraturan Kapolri",
          relatedTerms: ["Raid", "Sweeping"]
        },
        {
          id: 164,
          term: "Rechter Commissaris",
          category: "Subjek Hukum",
          definition: "Hakim komisaris yang mengawasi penyidikan (konsep dalam RUU KUHAP)",
          example: "Hakim yang mengawasi proses penyidikan",
          legalBasis: "RUU KUHAP",
          relatedTerms: ["Hakim Pemeriksa Pendahuluan", "Investigating Judge"]
        },
        {
          id: 165,
          term: "Rechtsdwaling",
          category: "Tindak Pidana",
          definition: "Kekeliruan tentang hukum",
          example: "Tidak tahu perbuatannya dilarang",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Error Iuris", "Mistake of Law"]
        },
        {
          id: 166,
          term: "Recidive Khusus",
          category: "Subjek Hukum",
          definition: "Pengulangan tindak pidana sejenis dalam waktu tertentu",
          example: "Mencuri lagi dalam 5 tahun setelah bebas",
          legalBasis: "Pasal 486-488 KUHP",
          relatedTerms: ["Special Recidivism", "Pengulangan Khusus"]
        },
        {
          id: 167,
          term: "Rehabilitasi Narkotika",
          category: "Sanksi",
          definition: "Proses pemulihan pecandu narkotika melalui perawatan medis dan sosial",
          example: "Rehabilitasi di pusat rehabilitasi BNN",
          legalBasis: "UU No. 35/2009",
          relatedTerms: ["Drug Rehabilitation", "Pemulihan"]
        },
        {
          id: 168,
          term: "Rekayasa Kasus",
          category: "Proses Pidana",
          definition: "Membuat-buat kasus pidana terhadap seseorang",
          example: "Menjebak seseorang dengan barang bukti palsu",
          legalBasis: "Pasal 35 UU HAM",
          relatedTerms: ["Framing", "False Case"]
        },
        {
          id: 169,
          term: "Restitusi",
          category: "Sanksi",
          definition: "Ganti kerugian yang diberikan kepada korban atau keluarganya",
          example: "Pelaku membayar biaya pengobatan korban",
          legalBasis: "UU No. 13/2006",
          relatedTerms: ["Restitution", "Ganti Rugi Korban"]
        },
        {
          id: 170,
          term: "Residivis Umum",
          category: "Subjek Hukum",
          definition: "Orang yang mengulangi tindak pidana apapun setelah menjalani pidana",
          example: "Setelah bebas dari pencurian, melakukan penipuan",
          legalBasis: "Pasal 486 KUHP",
          relatedTerms: ["General Recidivist", "Pengulangan Umum"]
        },
        {
          id: 171,
          term: "Rutan",
          category: "Proses Pidana",
          definition: "Rumah Tahanan Negara, tempat tersangka/terdakwa ditahan selama proses peradilan",
          example: "Ditahan di Rutan Cipinang",
          legalBasis: "UU Pemasyarakatan",
          relatedTerms: ["Detention Center", "Rumah Tahanan"]
        },
    
        // S (Lanjutan)
        {
          id: 172,
          term: "Saksi A De Charge",
          category: "Pembuktian",
          definition: "Saksi yang meringankan atau menguntungkan terdakwa",
          example: "Saksi alibi yang menyatakan terdakwa tidak di TKP",
          legalBasis: "Pasal 160 ayat (1) huruf c KUHAP",
          relatedTerms: ["Defense Witness", "Saksi Meringankan"]
        },
        {
          id: 173,
          term: "Saksi Verbalisan",
          category: "Pembuktian",
          definition: "Penyidik yang membuat berita acara dan bersaksi tentang isi berita acara",
          example: "Polisi yang membuat BAP bersaksi di pengadilan",
          legalBasis: "Yurisprudensi",
          relatedTerms: ["Police Witness", "Saksi Penyidik"]
        },
        {
          id: 174,
          term: "Sanksi Administratif",
          category: "Sanksi",
          definition: "Hukuman yang bersifat administratif akibat pelanggaran administrasi",
          example: "Pencabutan izin usaha",
          legalBasis: "UU Administrasi Pemerintahan",
          relatedTerms: ["Administrative Sanction", "Hukuman Administratif"]
        },
        {
          id: 175,
          term: "Sengketa Kompetensi",
          category: "Proses Pidana",
          definition: "Perselisihan kewenangan mengadili antara pengadilan",
          example: "Sengketa antara pengadilan militer dan umum",
          legalBasis: "Pasal 85 KUHAP",
          relatedTerms: ["Competence Dispute", "Kompetensi"]
        },
        {
          id: 176,
          term: "Seponering",
          category: "Proses Pidana",
          definition: "Pengesampingan perkara oleh jaksa demi kepentingan umum",
          example: "Jaksa Agung menyampingkan kasus politik",
          legalBasis: "Pasal 35 huruf c UU Kejaksaan",
          relatedTerms: ["Deponering", "Case Dismissal"]
        },
        {
          id: 177,
          term: "SITA",
          category: "Pembuktian",
          definition: "Surat Izin Tindakan Atas barang bukti",
          example: "SITA untuk menyita mobil hasil kejahatan",
          legalBasis: "Pasal 38 KUHAP",
          relatedTerms: ["Seizure Warrant", "Surat Penyitaan"]
        },
        {
          id: 178,
          term: "Sodomi",
          category: "Tindak Pidana",
          definition: "Perbuatan cabul sesama jenis kelamin",
          example: "Perbuatan seksual terhadap sesama jenis",
          legalBasis: "Pasal 292 KUHP",
          relatedTerms: ["Sodomie", "Same-sex Abuse"]
        },
        {
          id: 179,
          term: "SP3",
          category: "Proses Pidana",
          definition: "Surat Perintah Penghentian Penyidikan",
          example: "Penyidik menghentikan kasus karena tidak cukup bukti",
          legalBasis: "Pasal 109 ayat (2) KUHAP",
          relatedTerms: ["Investigation Termination", "Penghentian Penyidikan"]
        },
        {
          id: 180,
          term: "SPDP",
          category: "Proses Pidana",
          definition: "Surat Pemberitahuan Dimulainya Penyidikan",
          example: "Penyidik memberitahu JPU mulai penyidikan korupsi",
          legalBasis: "Pasal 109 ayat (1) KUHAP",
          relatedTerms: ["Investigation Notice", "Pemberitahuan Penyidikan"]
        },
        {
          id: 181,
          term: "Splitsing",
          category: "Proses Pidana",
          definition: "Pemisahan berkas perkara untuk beberapa tersangka",
          example: "Memisah berkas A dan B dalam kasus korupsi",
          legalBasis: "Pasal 142 KUHAP",
          relatedTerms: ["Case Splitting", "Pemisahan Perkara"]
        },
        {
          id: 182,
          term: "Strafmaat",
          category: "Sanksi",
          definition: "Ukuran atau berat ringannya pidana",
          example: "Hakim menentukan strafmaat 5 tahun penjara",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Sentencing", "Ukuran Pidana"]
        },
        {
          id: 183,
          term: "Strafuitsluitingsgronden",
          category: "Tindak Pidana",
          definition: "Alasan penghapus pidana",
          example: "Pembelaan darurat, perintah jabatan",
          legalBasis: "Pasal 44-51 KUHP",
          relatedTerms: ["Criminal Defenses", "Alasan Penghapus"]
        },
        {
          id: 184,
          term: "Subsidiaritas",
          category: "Proses Pidana",
          definition: "Prinsip dakwaan berlapis dari yang berat ke ringan",
          example: "Primair pembunuhan, subsidiair penganiayaan",
          legalBasis: "Pasal 143 KUHAP",
          relatedTerms: ["Subsidiarity", "Dakwaan Berlapis"]
        },
        {
          id: 185,
          term: "Sumpah Palsu",
          category: "Tindak Pidana",
          definition: "Memberikan keterangan palsu di bawah sumpah",
          example: "Saksi berbohong di pengadilan",
          legalBasis: "Pasal 242 KUHP",
          relatedTerms: ["Meineed", "Perjury"]
        },
        {
          id: 186,
          term: "Surat Jalan",
          category: "Proses Pidana",
          definition: "Dokumen yang menyertai pengangkutan barang bukti",
          example: "Surat jalan untuk membawa barang sitaan",
          legalBasis: "Peraturan Kepolisian",
          relatedTerms: ["Transport Document", "Travel Document"]
        },
    
        // T (Lanjutan)
        {
          id: 187,
          term: "Tahanan Kota",
          category: "Proses Pidana",
          definition: "Penahanan dengan kewajiban melapor dan tidak meninggalkan kota",
          example: "Wajib lapor setiap hari Senin",
          legalBasis: "Pasal 22 ayat (1) KUHAP",
          relatedTerms: ["City Arrest", "Tahanan Luar"]
        },
        {
          id: 188,
          term: "Tahanan Rumah",
          category: "Proses Pidana",
          definition: "Penahanan di rumah dengan pengawasan",
          example: "Tidak boleh keluar rumah selama proses",
          legalBasis: "Pasal 22 ayat (1) KUHAP",
          relatedTerms: ["House Arrest", "Home Detention"]
        },
        {
          id: 189,
          term: "Tangkap Tangan",
          category: "Proses Pidana",
          definition: "Tertangkap pada saat sedang melakukan tindak pidana",
          example: "Tertangkap sedang mencuri di toko",
          legalBasis: "Pasal 1 angka 19 KUHAP",
          relatedTerms: ["Caught Red-handed", "Heterdaad"]
        },
        {
          id: 190,
          term: "Tatbestandsmäßigkeit",
          category: "Tindak Pidana",
          definition: "Perbuatan yang memenuhi rumusan delik",
          example: "Memenuhi unsur Pasal 362 KUHP",
          legalBasis: "Doktrin Hukum Pidana Jerman",
          relatedTerms: ["Elements of Crime", "Unsur Delik"]
        },
        {
          id: 191,
          term: "Tempus Delicti",
          category: "Tindak Pidana",
          definition: "Waktu terjadinya tindak pidana",
          example: "Pembunuhan terjadi pukul 02.00 WIB",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Time of Crime", "Waktu Kejadian"]
        },
        {
          id: 192,
          term: "Terorisme",
          category: "Tindak Pidana",
          definition: "Penggunaan kekerasan untuk menimbulkan ketakutan demi tujuan politik/ideologi",
          example: "Pengeboman untuk mengancam pemerintah",
          legalBasis: "UU No. 5/2018",
          relatedTerms: ["Terrorism", "Tindak Pidana Terorisme"],
          trending: true
        },
        {
          id: 193,
          term: "Tindak Pidana Adat",
          category: "Tindak Pidana",
          definition: "Perbuatan yang melanggar hukum adat dan diakui sebagai tindak pidana",
          example: "Delik adat Lokika Sanggraha di Bali",
          legalBasis: "Pasal 5 ayat (3) UU Drt No. 1/1951",
          relatedTerms: ["Customary Crime", "Delik Adat"]
        },
        {
          id: 194,
          term: "Tindak Pidana Ekonomi",
          category: "Tindak Pidana",
          definition: "Tindak pidana di bidang ekonomi yang merugikan perekonomian negara",
          example: "Penimbunan barang pokok",
          legalBasis: "UU No. 7/1955",
          relatedTerms: ["Economic Crime", "Delik Ekonomi"]
        },
        {
          id: 195,
          term: "Tindak Pidana Formil",
          category: "Tindak Pidana",
          definition: "Delik yang dianggap selesai dengan dilakukannya perbuatan",
          example: "Memberikan kesaksian palsu",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Formal Crime", "Delik Formal"]
        },
        {
          id: 196,
          term: "Tindak Pidana Khusus",
          category: "Tindak Pidana",
          definition: "Tindak pidana yang diatur di luar KUHP dengan prosedur khusus",
          example: "Korupsi, narkotika, terorisme",
          legalBasis: "UU Pidana Khusus",
          relatedTerms: ["Special Crime", "Lex Specialis"]
        },
        {
          id: 197,
          term: "Tindak Pidana Materiil",
          category: "Tindak Pidana",
          definition: "Delik yang baru dianggap selesai jika akibat telah terjadi",
          example: "Pembunuhan (korban harus meninggal)",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Material Crime", "Delik Material"]
        },
        {
          id: 198,
          term: "Tindak Pidana Ringan",
          category: "Tindak Pidana",
          definition: "Tindak pidana dengan ancaman pidana penjara paling lama 3 bulan atau denda",
          example: "Pencurian ringan nilai di bawah Rp 2,5 juta",
          legalBasis: "Perma No. 2/2012",
          relatedTerms: ["Petty Crime", "Tipiring"]
        },
        {
          id: 199,
          term: "TPPU",
          category: "Tindak Pidana",
          definition: "Tindak Pidana Pencucian Uang",
          example: "Menyamarkan uang hasil korupsi",
          legalBasis: "UU No. 8/2010",
          relatedTerms: ["Money Laundering", "Pencucian Uang"],
          trending: true
        },
        {
          id: 200,
          term: "TPUL",
          category: "Proses Pidana",
          definition: "Tim Pengawal dan Pengaman Pemerintahan dan Pembangunan Daerah",
          example: "TP4D mengawal proyek pemerintah",
          legalBasis: "Peraturan Jaksa Agung",
          relatedTerms: ["TP4D", "Pengawalan Proyek"]
        },
        {
          id: 201,
          term: "Trafficking",
          category: "Tindak Pidana",
          definition: "Perdagangan orang untuk eksploitasi",
          example: "Menjual orang untuk prostitusi",
          legalBasis: "UU No. 21/2007",
          relatedTerms: ["Human Trafficking", "Perdagangan Orang"]
        },
        {
          id: 202,
          term: "Turut Serta",
          category: "Tindak Pidana",
          definition: "Ikut melakukan tindak pidana bersama orang lain",
          example: "Bersama-sama melakukan perampokan",
          legalBasis: "Pasal 55 KUHP",
          relatedTerms: ["Participation", "Penyertaan"]
        },
    
        // U (Lanjutan)
        {
          id: 203,
          term: "Ultimum Remedium",
          category: "Proses Pidana",
          definition: "Hukum pidana sebagai upaya terakhir",
          example: "Pidana lingkungan setelah sanksi administratif",
          legalBasis: "Asas Hukum Pidana",
          relatedTerms: ["Last Resort", "Upaya Terakhir"]
        },
        {
          id: 204,
          term: "Unsur Subjektif",
          category: "Tindak Pidana",
          definition: "Unsur yang melekat pada diri pelaku (niat, kesengajaan)",
          example: "Niat jahat dalam pembunuhan berencana",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Subjective Element", "Mens Rea"]
        },
        {
          id: 205,
          term: "Unsur Objektif",
          category: "Tindak Pidana",
          definition: "Unsur yang berada di luar diri pelaku (perbuatan, akibat)",
          example: "Perbuatan mengambil dalam pencurian",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Objective Element", "Actus Reus"]
        },
        {
          id: 206,
          term: "Upaya Paksa",
          category: "Proses Pidana",
          definition: "Tindakan hukum yang dapat dipaksakan pelaksanaannya",
          example: "Penangkapan, penahanan, penyitaan",
          legalBasis: "Pasal 1 KUHAP",
          relatedTerms: ["Dwangmiddelen", "Coercive Measures"]
        },
    
        // V (Lanjutan)
        {
          id: 207,
          term: "Valsheid in Geschrifte",
          category: "Tindak Pidana",
          definition: "Pemalsuan surat/dokumen",
          example: "Memalsukan ijazah atau KTP",
          legalBasis: "Pasal 263 KUHP",
          relatedTerms: ["Pemalsuan Surat", "Document Forgery"]
        },
        {
          id: 208,
          term: "Vandalisme",
          category: "Tindak Pidana",
          definition: "Pengrusakan barang milik orang lain/umum",
          example: "Mencoret-coret tembok fasilitas umum",
          legalBasis: "Pasal 406 KUHP",
          relatedTerms: ["Vandalism", "Pengrusakan"]
        },
        {
          id: 209,
          term: "Verjaring",
          category: "Proses Pidana",
          definition: "Daluwarsa atau lewat waktu",
          example: "Hak menuntut gugur karena lewat waktu",
          legalBasis: "Pasal 78-85 KUHP",
          relatedTerms: ["Daluwarsa", "Prescription"]
        },
        {
          id: 210,
          term: "Vernietiging",
          category: "Tindak Pidana",
          definition: "Penghancuran atau pemusnahan barang",
          example: "Menghancurkan barang bukti",
          legalBasis: "Pasal 406 KUHP",
          relatedTerms: ["Destruction", "Pemusnahan"]
        },
        {
          id: 211,
          term: "Verstek Acte",
          category: "Proses Pidana",
          definition: "Berita acara ketidakhadiran terdakwa",
          example: "BA terdakwa tidak hadir tanpa alasan sah",
          legalBasis: "Pasal 196 KUHAP",
          relatedTerms: ["Default Proceedings", "Acara Verstek"]
        },
        {
          id: 212,
          term: "Verzet",
          category: "Proses Pidana",
          definition: "Perlawanan terhadap putusan verstek",
          example: "Terdakwa melawan putusan yang dijatuhkan tanpa kehadirannya",
          legalBasis: "Pasal 214 KUHAP",
          relatedTerms: ["Opposition", "Perlawanan"]
        },
        {
          id: 213,
          term: "Viktimologi",
          category: "Tindak Pidana",
          definition: "Ilmu tentang korban kejahatan",
          example: "Studi tentang pola korban kejahatan",
          legalBasis: "Ilmu Kriminologi",
          relatedTerms: ["Victimology", "Ilmu Korban"]
        },
        {
          id: 214,
          term: "Visum et Repertum Psikiatri",
          category: "Pembuktian",
          definition: "Hasil pemeriksaan kejiwaan untuk kepentingan peradilan",
          example: "VeR psikiatri untuk terdakwa yang diduga gila",
          legalBasis: "Pasal 44 KUHP",
          relatedTerms: ["Psychiatric Report", "Visum Kejiwaan"]
        },
        {
          id: 215,
          term: "Voeging",
          category: "Proses Pidana",
          definition: "Penggabungan perkara",
          example: "Menggabungkan beberapa kasus pencurian",
          legalBasis: "Pasal 141 KUHAP",
          relatedTerms: ["Joinder", "Penggabungan"]
        },
        {
          id: 216,
          term: "Volunter",
          category: "Tindak Pidana",
          definition: "Kehendak bebas dalam melakukan tindak pidana",
          example: "Melakukan pencurian atas kemauan sendiri",
          legalBasis: "Doktrin Hukum Pidana",
          relatedTerms: ["Voluntary", "Sukarela"]
        },
        {
          id: 217,
          term: "Voorarrest",
          category: "Proses Pidana",
          definition: "Penahanan sementara sebelum putusan",
          example: "Ditahan selama proses penyidikan",
          legalBasis: "Pasal 20-31 KUHAP",
          relatedTerms: ["Pre-trial Detention", "Penahanan Sementara"]
        },
        {
          id: 218,
          term: "Voorlopige Hechtenis",
          category: "Proses Pidana",
          definition: "Penahanan untuk sementara waktu",
          example: "Penahanan 20 hari dalam penyidikan",
          legalBasis: "Pasal 24 KUHAP",
          relatedTerms: ["Temporary Detention", "Penahanan Sementara"]
        },
        {
          id: 219,
          term: "Voorwaardelijke Veroordeling",
          category: "Sanksi",
          definition: "Pidana bersyarat",
          example: "Pidana dengan masa percobaan",
          legalBasis: "Pasal 14a KUHP",
          relatedTerms: ["Conditional Sentence", "Pidana Percobaan"]
        },
        {
          id: 220,
          term: "Vrije Bewijsleer",
          category: "Pembuktian",
          definition: "Teori pembuktian bebas",
          example: "Hakim bebas menilai alat bukti",
          legalBasis: "Pasal 183 KUHAP",
          relatedTerms: ["Free Proof Theory", "Pembuktian Bebas"]
        },
    
        // W (Lanjutan)
        {
          id: 221,
          term: "Wanprestasi",
          category: "Perdata/Pidana",
          definition: "Kelalaian memenuhi kewajiban yang dapat berakibat pidana",
          example: "Penggelapan uang titipan",
          legalBasis: "Pasal 372 KUHP jika ada unsur pidana",
          relatedTerms: ["Default", "Cidera Janji"]
        },
        {
          id: 222,
          term: "Warrant",
          category: "Proses Pidana",
          definition: "Surat perintah dari pejabat berwenang",
          example: "Surat perintah penangkapan",
          legalBasis: "KUHAP",
          relatedTerms: ["Surat Perintah", "Waran"]
        },
        {
          id: 223,
          term: "Wederrechtelijk",
          category: "Tindak Pidana",
          definition: "Melawan hukum",
          example: "Mengambil barang tanpa hak",
          legalBasis: "Unsur delik dalam KUHP",
          relatedTerms: ["Unlawful", "Melawan Hukum"]
        },
        {
          id: 224,
          term: "Wet",
          category: "Proses Pidana",
          definition: "Undang-undang",
          example: "Wetboek van Strafrecht (KUHP)",
          legalBasis: "Terminologi Hukum",
          relatedTerms: ["Law", "Undang-undang"]
        },
        {
          id: 225,
          term: "Wetboek van Strafrecht",
          category: "Tindak Pidana",
          definition: "Kitab Undang-undang Hukum Pidana warisan Belanda",
          example: "WvS berlaku sejak 1915",
          legalBasis: "KUHP Lama",
          relatedTerms: ["Criminal Code", "KUHP"]
        },
        {
          id: 226,
          term: "Whistleblower",
          category: "Subjek Hukum",
          definition: "Pelapor tindak pidana dari dalam organisasi",
          example: "Pegawai melaporkan korupsi atasannya",
          legalBasis: "UU No. 13/2006",
          relatedTerms: ["Pelapor", "Pengungkap Fakta"],
          trending: true
        },
        {
          id: 227,
          term: "White Collar Crime",
          category: "Tindak Pidana",
          definition: "Kejahatan kerah putih yang dilakukan kalangan profesional",
          example: "Manipulasi laporan keuangan perusahaan",
          legalBasis: "UU Pidana Khusus",
          relatedTerms: ["Kejahatan Kerah Putih", "Economic Crime"]
        },
        {
          id: 228,
          term: "Wiretapping",
          category: "Tindak Pidana",
          definition: "Penyadapan komunikasi secara ilegal",
          example: "Menyadap telepon tanpa izin",
          legalBasis: "UU ITE, UU Telekomunikasi",
          relatedTerms: ["Penyadapan", "Intersepsi"]
        },
    
        // Y (Lanjutan)
        {
          id: 229,
          term: "Yudex Factie",
          category: "Subjek Hukum",
          definition: "Hakim yang memeriksa fakta dalam persidangan",
          example: "Hakim tingkat pertama dan banding",
          legalBasis: "UU Kekuasaan Kehakiman",
          relatedTerms: ["Judge of Fact", "Hakim Fakta"]
        },
        {
          id: 230,
          term: "Yudisial",
          category: "Proses Pidana",
          definition: "Berkaitan dengan kekuasaan kehakiman",
          example: "Proses yudisial di pengadilan",
          legalBasis: "UU Kekuasaan Kehakiman",
          relatedTerms: ["Judicial", "Peradilan"]
        },
        {
          id: 231,
          term: "Yuridis",
          category: "Proses Pidana",
          definition: "Menurut hukum atau berdasarkan hukum",
          example: "Analisis yuridis kasus korupsi",
          legalBasis: "Terminologi Hukum",
          relatedTerms: ["Juridical", "Legal"]
        },
        {
          id: 232,
          term: "Yurisdiksi",
          category: "Proses Pidana",
          definition: "Kewenangan hukum untuk mengadili",
          example: "Yurisdiksi pengadilan negeri",
          legalBasis: "Pasal 84 KUHAP",
          relatedTerms: ["Jurisdiction", "Kewenangan Mengadili"]
        },
        {
          id: 233,
          term: "Yurisprudensi Tetap",
          category: "Proses Pidana",
          definition: "Putusan pengadilan yang sudah menjadi pedoman tetap",
          example: "Yurisprudensi MA tentang pencurian listrik",
          legalBasis: "UU Kekuasaan Kehakiman",
          relatedTerms: ["Settled Case Law", "Putusan Tetap"]
        },
    
        // Z
        {
          id: 234,
          term: "Zaken",
          category: "Proses Pidana",
          definition: "Perkara atau kasus",
          example: "Strafzaken (perkara pidana)",
          legalBasis: "Terminologi Hukum Belanda",
          relatedTerms: ["Case", "Perkara"]
        },
        {
          id: 235,
          term: "Zedelijk",
          category: "Tindak Pidana",
          definition: "Berkaitan dengan kesusilaan",
          example: "Zedelijkheidsmisdrijf (kejahatan kesusilaan)",
          legalBasis: "Bab XIV KUHP",
          relatedTerms: ["Moral", "Kesusilaan"]
        },
        {
          id: 236,
          term: "Zelfmoord",
          category: "Tindak Pidana",
          definition: "Bunuh diri (bukan tindak pidana, tapi membantu bunuh diri adalah pidana)",
          example: "Membantu orang bunuh diri",
          legalBasis: "Pasal 344 KUHP",
          relatedTerms: ["Suicide", "Bunuh Diri"]
        },
        {
          id: 237,
          term: "Zina",
          category: "Tindak Pidana",
          definition: "Persetubuhan di luar perkawinan yang sah",
          example: "Perzinahan antara orang yang sudah menikah",
          legalBasis: "Pasal 284 KUHP",
          relatedTerms: ["Adultery", "Perzinahan"]
        },
        {
          id: 238,
          term: "Zona Ekonomi Eksklusif",
          category: "Tindak Pidana",
          definition: "Wilayah laut untuk yurisdiksi pidana tertentu",
          example: "Illegal fishing di ZEE Indonesia",
          legalBasis: "UU No. 5/1983",
          relatedTerms: ["EEZ", "ZEE"]
        },
        {
          id: 239,
          term: "Zona Yurisdiksi",
          category: "Proses Pidana",
          definition: "Wilayah kewenangan penegakan hukum",
          example: "Zona yurisdiksi Polda Metro Jaya",
          legalBasis: "UU Kepolisian",
          relatedTerms: ["Jurisdiction Zone", "Wilayah Hukum"]
        },
        {
          id: 240,
          term: "Zonder Dwang",
          category: "Proses Pidana",
          definition: "Tanpa paksaan",
          example: "Pengakuan zonder dwang (tanpa paksaan)",
          legalBasis: "Asas Hukum Pidana",
          relatedTerms: ["Without Coercion", "Tanpa Paksa"]
        },
        {
    id: 241,
    term: "Aborsi Provocatus",
    category: "tindak-pidana",
    definition: "Pengguguran kandungan dengan sengaja yang melawan hukum",
    example: "Menggugurkan kandungan tanpa indikasi medis",
    legalBasis: "Pasal 346-349 KUHP",
    englishTerm: "Illegal Abortion",
    relatedTerms: ["Abortus", "Pengguguran Kandungan"],
    trending: true
  },
  {
    id: 242,
    term: "Abuse of Process",
    category: "proses-pidana",
    definition: "Penyalahgunaan proses hukum untuk tujuan yang tidak sah",
    example: "Menggunakan laporan pidana untuk menekan dalam sengketa perdata",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Abuse of Process",
    relatedTerms: ["Penyalahgunaan Proses", "Mala Fide"]
  },
  {
    id: 243,
    term: "Accessoir",
    category: "sanksi-pidana",
    definition: "Pidana tambahan yang mengikuti pidana pokok",
    example: "Pencabutan hak tertentu sebagai pidana tambahan",
    legalBasis: "Pasal 10 huruf b KUHP",
    englishTerm: "Accessory Punishment",
    relatedTerms: ["Pidana Tambahan", "Bijkomende Straf"]
  },
  {
    id: 244,
    term: "Acte van Beschuldiging",
    category: "penuntutan",
    definition: "Surat dakwaan dalam istilah Belanda",
    example: "Dakwaan yang dibuat oleh Jaksa Penuntut Umum",
    legalBasis: "Pasal 143 KUHAP",
    englishTerm: "Indictment",
    relatedTerms: ["Surat Dakwaan", "Dakwaan"]
  },
  {
    id: 245,
    term: "Ad Informandum",
    category: "proses-pidana",
    definition: "Untuk diketahui atau dipertimbangkan hakim tanpa didakwakan",
    example: "Tindak pidana lain untuk pertimbangan pemberatan",
    legalBasis: "Praktik Peradilan",
    englishTerm: "For Information",
    relatedTerms: ["Pertimbangan Hakim", "Pemberatan"]
  },
  {
    id: 246,
    term: "Administratieve Rechtspraak",
    category: "proses-pidana",
    definition: "Peradilan administrasi yang dapat berkaitan dengan pidana",
    example: "Pelanggaran administratif yang berubah menjadi pidana",
    legalBasis: "UU Administrasi",
    englishTerm: "Administrative Justice",
    relatedTerms: ["Peradilan Administrasi", "Sanksi Administratif"]
  },
  {
    id: 247,
    term: "Advocaat Generaal",
    category: "subjek-hukum",
    definition: "Jaksa Agung Muda pada Kejaksaan Agung",
    example: "JAM Pidana Umum, JAM Pidana Khusus",
    legalBasis: "UU Kejaksaan",
    englishTerm: "Deputy Attorney General",
    relatedTerms: ["Jaksa Agung Muda", "Kejaksaan"]
  },
  {
    id: 248,
    term: "Afpersing",
    category: "tindak-pidana",
    definition: "Pemerasan dengan ancaman kekerasan",
    example: "Memeras dengan ancaman akan membunuh",
    legalBasis: "Pasal 368 KUHP",
    englishTerm: "Extortion",
    relatedTerms: ["Pemerasan", "Pengancaman"]
  },
  {
    id: 249,
    term: "Aggravated Assault",
    category: "tindak-pidana",
    definition: "Penganiayaan berat atau dengan pemberatan",
    example: "Penganiayaan menggunakan senjata",
    legalBasis: "Pasal 353-355 KUHP",
    englishTerm: "Aggravated Assault",
    relatedTerms: ["Penganiayaan Berat", "Mishandeling"]
  },
  {
    id: 250,
    term: "Aiding and Abetting",
    category: "tindak-pidana",
    definition: "Membantu dan mendukung pelaku tindak pidana",
    example: "Memberikan informasi untuk melancarkan kejahatan",
    legalBasis: "Pasal 56 KUHP",
    englishTerm: "Aiding and Abetting",
    relatedTerms: ["Pembantuan", "Medeplichtigheid"]
  },
  {
    id: 251,
    term: "Alasan Pembenar",
    category: "asas-hukum",
    definition: "Alasan yang menghilangkan sifat melawan hukum perbuatan",
    example: "Pembelaan darurat, melaksanakan perintah jabatan",
    legalBasis: "Pasal 49-51 KUHP",
    englishTerm: "Justification",
    relatedTerms: ["Rechtvaardigingsgrond", "Alasan Penghapus"]
  },
  {
    id: 252,
    term: "Alasan Pemaaf",
    category: "asas-hukum",
    definition: "Alasan yang menghapuskan kesalahan pelaku",
    example: "Tidak mampu bertanggung jawab karena jiwa cacat",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Excuse",
    relatedTerms: ["Schulduitsluitingsgrond", "Alasan Penghapus"]
  },
  {
    id: 253,
    term: "Alat Bukti Elektronik",
    category: "pembuktian",
    definition: "Informasi atau dokumen elektronik sebagai alat bukti",
    example: "Email, chat, rekaman CCTV digital",
    legalBasis: "UU ITE Pasal 5",
    englishTerm: "Electronic Evidence",
    relatedTerms: ["Digital Evidence", "Bukti Digital"],
    trending: true
  },
  {
    id: 254,
    term: "Algemene Bepalingen",
    category: "asas-hukum",
    definition: "Ketentuan umum dalam KUHP",
    example: "Buku I KUHP tentang aturan umum",
    legalBasis: "Buku I KUHP",
    englishTerm: "General Provisions",
    relatedTerms: ["Ketentuan Umum", "Aturan Umum"]
  },
  {
    id: 255,
    term: "Ambtelijke Corruptie",
    category: "pidana-khusus",
    definition: "Korupsi yang dilakukan pejabat",
    example: "Pejabat menerima suap untuk proyek",
    legalBasis: "UU Tipikor",
    englishTerm: "Official Corruption",
    relatedTerms: ["Korupsi Jabatan", "Penyalahgunaan Jabatan"]
  },
  {
    id: 256,
    term: "Ambtsdelict",
    category: "tindak-pidana",
    definition: "Tindak pidana jabatan yang hanya bisa dilakukan pejabat",
    example: "Penggelapan dalam jabatan",
    legalBasis: "Pasal 415 KUHP",
    englishTerm: "Official Crime",
    relatedTerms: ["Delik Jabatan", "Kejahatan Jabatan"]
  },
  {
    id: 257,
    term: "Ambtseed",
    category: "proses-pidana",
    definition: "Sumpah jabatan yang berkaitan dengan kewajiban hukum",
    example: "Sumpah hakim, jaksa, polisi",
    legalBasis: "UU Jabatan",
    englishTerm: "Official Oath",
    relatedTerms: ["Sumpah Jabatan", "Oath of Office"]
  },
  {
    id: 258,
    term: "Amicus Curiae",
    category: "proses-pidana",
    definition: "Pihak yang memberikan pendapat hukum tanpa menjadi pihak",
    example: "Ahli hukum memberi pendapat dalam kasus konstitusi",
    legalBasis: "Praktik Peradilan",
    englishTerm: "Friend of the Court",
    relatedTerms: ["Sahabat Pengadilan", "Pendapat Ahli"]
  },
  {
    id: 259,
    term: "Amnesti Pajak",
    category: "pidana-khusus",
    definition: "Pengampunan pajak yang dapat menghapus ancaman pidana",
    example: "Tax amnesty menghapus ancaman pidana pajak",
    legalBasis: "UU Tax Amnesty",
    englishTerm: "Tax Amnesty",
    relatedTerms: ["Pengampunan Pajak", "Abolisi Pajak"]
  },
  {
    id: 260,
    term: "Ancaman Pidana Minimum Khusus",
    category: "sanksi-pidana",
    definition: "Ancaman pidana paling rendah yang ditentukan UU",
    example: "Minimum 4 tahun untuk korupsi",
    legalBasis: "UU Pidana Khusus",
    englishTerm: "Mandatory Minimum",
    relatedTerms: ["Pidana Minimum", "Strafminimum"]
  },
  {
    id: 261,
    term: "Animus",
    category: "tindak-pidana",
    definition: "Niat atau kehendak dalam melakukan tindak pidana",
    example: "Animus nocendi (niat untuk merugikan)",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Criminal Intent",
    relatedTerms: ["Niat Jahat", "Mens Rea", "Opzet"]
  },
  {
    id: 262,
    term: "Antecedentenregister",
    category: "proses-pidana",
    definition: "Daftar riwayat kejahatan seseorang",
    example: "Catatan kepolisian tentang tindak pidana sebelumnya",
    legalBasis: "Administrasi Kepolisian",
    englishTerm: "Criminal Record",
    relatedTerms: ["Catatan Kriminal", "SKCK"]
  },
  {
    id: 263,
    term: "Anti Money Laundering",
    category: "pidana-khusus",
    definition: "Upaya pencegahan dan pemberantasan pencucian uang",
    example: "Program AML di perbankan",
    legalBasis: "UU No. 8/2010",
    englishTerm: "Anti Money Laundering",
    relatedTerms: ["Anti Pencucian Uang", "AML"],
    trending: true
  },
  {
    id: 264,
    term: "Aparatur Penegak Hukum",
    category: "subjek-hukum",
    definition: "Pejabat yang berwenang menegakkan hukum pidana",
    example: "Polisi, Jaksa, Hakim, Advokat",
    legalBasis: "UU Penegakan Hukum",
    englishTerm: "Law Enforcement",
    relatedTerms: ["Penegak Hukum", "APH"]
  },
  {
    id: 265,
    term: "Appellatio",
    category: "upaya-hukum",
    definition: "Permohonan banding dalam istilah Latin",
    example: "Mengajukan appellatio ke pengadilan tinggi",
    legalBasis: "Pasal 233 KUHAP",
    englishTerm: "Appeal",
    relatedTerms: ["Banding", "Hoger Beroep"]
  },
  {
    id: 266,
    term: "Arbiter",
    category: "proses-pidana",
    definition: "Penengah dalam penyelesaian sengketa yang dapat berdampak pidana",
    example: "Arbitrase yang mengungkap tindak pidana",
    legalBasis: "UU Arbitrase",
    englishTerm: "Arbiter",
    relatedTerms: ["Wasit", "Penengah"]
  },
  {
    id: 267,
    term: "Arrest",
    category: "proses-pidana",
    definition: "Penangkapan atau penahanan dalam istilah Belanda",
    example: "Arrest preventif (penahanan pencegahan)",
    legalBasis: "Pasal 20 KUHAP",
    englishTerm: "Arrest",
    relatedTerms: ["Penangkapan", "Penahanan"]
  },
  {
    id: 268,
    term: "Arson",
    category: "tindak-pidana",
    definition: "Pembakaran dengan sengaja yang membahayakan",
    example: "Membakar gedung untuk klaim asuransi",
    legalBasis: "Pasal 187 KUHP",
    englishTerm: "Arson",
    relatedTerms: ["Pembakaran", "Brandstichting"]
  },
  {
    id: 269,
    term: "Asas Akusator",
    category: "asas-hukum",
    definition: "Asas yang memisahkan fungsi penuntut dan hakim",
    example: "Jaksa menuntut, hakim memutus",
    legalBasis: "KUHAP",
    englishTerm: "Accusatorial Principle",
    relatedTerms: ["Sistem Akusator", "Adversarial System"]
  },
  {
    id: 270,
    term: "Asas Cepat, Sederhana, dan Biaya Ringan",
    category: "asas-hukum",
    definition: "Prinsip penyelenggaraan peradilan yang efisien",
    example: "Sidang tipiring diselesaikan dalam sehari",
    legalBasis: "Pasal 2 ayat (4) UU Kekuasaan Kehakiman",
    englishTerm: "Speedy Trial Principle",
    relatedTerms: ["Contante Justitie", "Peradilan Cepat"]
  },
  {
    id: 271,
    term: "Asas Dominus Litis",
    category: "asas-hukum",
    definition: "Jaksa sebagai pengendali perkara dalam penuntutan",
    example: "Jaksa berwenang menghentikan atau melanjutkan penuntutan",
    legalBasis: "KUHAP",
    englishTerm: "Master of Prosecution",
    relatedTerms: ["Penguasa Perkara", "Dominus Litis"]
  },
  {
    id: 272,
    term: "Asas Equality Before the Law",
    category: "asas-hukum",
    definition: "Persamaan di hadapan hukum tanpa diskriminasi",
    example: "Pejabat dan rakyat biasa diperlakukan sama",
    legalBasis: "Pasal 27 UUD 1945",
    englishTerm: "Equality Before the Law",
    relatedTerms: ["Persamaan Hukum", "Non-diskriminasi"]
  },
  {
    id: 273,
    term: "Asas In Dubio Pro Reo",
    category: "asas-hukum",
    definition: "Dalam keraguan harus menguntungkan terdakwa",
    example: "Bukti tidak meyakinkan, terdakwa dibebaskan",
    legalBasis: "Asas Hukum Pidana",
    englishTerm: "Benefit of Doubt",
    relatedTerms: ["Keraguan Menguntungkan Terdakwa", "Presumption of Innocence"]
  },
  {
    id: 274,
    term: "Asas Lex Posterior Derogat Legi Priori",
    category: "asas-hukum",
    definition: "Hukum yang baru mengesampingkan hukum yang lama",
    example: "KUHP baru menggantikan KUHP lama",
    legalBasis: "Asas Hukum",
    englishTerm: "Later Law Prevails",
    relatedTerms: ["Hukum Baru Mengesampingkan", "Lex Posterior"]
  },
  {
    id: 275,
    term: "Asas Lex Superior Derogat Legi Inferiori",
    category: "asas-hukum",
    definition: "Peraturan yang lebih tinggi mengesampingkan yang lebih rendah",
    example: "UU mengesampingkan Peraturan Pemerintah",
    legalBasis: "Hierarki Perundangan",
    englishTerm: "Higher Law Prevails",
    relatedTerms: ["Hierarki Hukum", "Lex Superior"]
  },
  {
    id: 276,
    term: "Asas Nemo Plus Iuris",
    category: "asas-hukum",
    definition: "Tidak dapat memberikan hak lebih dari yang dimiliki",
    example: "Pencuri tidak dapat mengalihkan hak milik sah",
    legalBasis: "Asas Hukum",
    englishTerm: "Nemo Plus Iuris",
    relatedTerms: ["Nemo Dat", "Pemberian Hak"]
  },
  {
    id: 277,
    term: "Asas Non-self Incrimination",
    category: "asas-hukum",
    definition: "Hak untuk tidak menjerat diri sendiri",
    example: "Tersangka berhak diam dalam pemeriksaan",
    legalBasis: "Pasal 66 KUHAP",
    englishTerm: "Right Against Self-Incrimination",
    relatedTerms: ["Hak Untuk Diam", "Miranda Rights"]
  },
  {
    id: 278,
    term: "Asas Pacta Sunt Servanda",
    category: "asas-hukum",
    definition: "Perjanjian mengikat dan harus ditaati",
    example: "Perjanjian ekstradisi harus dilaksanakan",
    legalBasis: "Hukum Internasional",
    englishTerm: "Agreements Must Be Kept",
    relatedTerms: ["Perjanjian Mengikat", "Treaty Obligation"]
  },
  {
    id: 279,
    term: "Asas Retroaktif Terbatas",
    category: "asas-hukum",
    definition: "Berlaku surut hanya untuk hal yang menguntungkan terdakwa",
    example: "Pengurangan ancaman pidana berlaku surut",
    legalBasis: "Pasal 1 ayat (2) KUHP",
    englishTerm: "Limited Retroactivity",
    relatedTerms: ["Berlaku Surut Terbatas", "Lex Mitior"]
  },
  {
    id: 280,
    term: "Asas Similia Similibus",
    category: "asas-hukum",
    definition: "Kasus yang sama harus diperlakukan sama",
    example: "Putusan serupa untuk kasus serupa",
    legalBasis: "Asas Keadilan",
    englishTerm: "Like Cases Alike",
    relatedTerms: ["Kesamaan Perlakuan", "Precedent"]
  },
  {
    id: 281,
    term: "Asas Unus Testis Nullus Testis",
    category: "pembuktian",
    definition: "Satu saksi bukan saksi",
    example: "Diperlukan minimal dua alat bukti",
    legalBasis: "Pasal 185 ayat (2) KUHAP",
    englishTerm: "One Witness No Witness",
    relatedTerms: ["Satu Saksi Bukan Saksi", "Minimum Pembuktian"]
  },
  {
    id: 282,
    term: "Aset Recovery",
    category: "pidana-khusus",
    definition: "Pemulihan aset hasil tindak pidana",
    example: "Mengembalikan uang hasil korupsi ke negara",
    legalBasis: "UU Tipikor, UU TPPU",
    englishTerm: "Asset Recovery",
    relatedTerms: ["Pemulihan Aset", "Stolen Asset Recovery"],
    trending: true
  },
  {
    id: 283,
    term: "Asimilasi",
    category: "sanksi-pidana",
    definition: "Proses pembinaan narapidana di luar Lapas",
    example: "Narapidana bekerja di luar Lapas",
    legalBasis: "PP Pembinaan Narapidana",
    englishTerm: "Assimilation",
    relatedTerms: ["Pembinaan Luar", "Integrasi"]
  },
  {
    id: 284,
    term: "Assistance to Witnesses",
    category: "proses-pidana",
    definition: "Bantuan dan perlindungan kepada saksi",
    example: "Program perlindungan saksi oleh LPSK",
    legalBasis: "UU No. 13/2006",
    englishTerm: "Witness Assistance",
    relatedTerms: ["Bantuan Saksi", "Perlindungan Saksi"]
  },
  {
    id: 285,
    term: "Attempt",
    category: "tindak-pidana",
    definition: "Percobaan melakukan tindak pidana",
    example: "Tertangkap saat akan melakukan pembunuhan",
    legalBasis: "Pasal 53 KUHP",
    englishTerm: "Criminal Attempt",
    relatedTerms: ["Percobaan", "Poging"]
  },
  {
    id: 286,
    term: "Audi et Alteram Partem",
    category: "asas-hukum",
    definition: "Dengarkan juga pihak lain",
    example: "Hakim harus mendengar pembelaan terdakwa",
    legalBasis: "Asas Peradilan",
    englishTerm: "Hear the Other Side",
    relatedTerms: ["Hak Untuk Didengar", "Fair Hearing"]
  },
  {
    id: 287,
    term: "Authentieke Akte",
    category: "pembuktian",
    definition: "Akta otentik sebagai alat bukti",
    example: "Akta notaris dalam pembuktian pemalsuan",
    legalBasis: "Pasal 187 KUHAP",
    englishTerm: "Authentic Deed",
    relatedTerms: ["Akta Otentik", "Bukti Tertulis"]
  },
  {
    id: 288,
    term: "Auto da Fe",
    category: "proses-pidana",
    definition: "Pelaksanaan putusan pidana mati (istilah historis)",
    example: "Eksekusi pidana mati",
    legalBasis: "Pasal 11 KUHP",
    englishTerm: "Act of Faith",
    relatedTerms: ["Eksekusi Mati", "Capital Punishment"]
  },
  {
    id: 289,
    term: "Automatisme",
    category: "tindak-pidana",
    definition: "Perbuatan tanpa kesadaran yang dapat menghapus kesalahan",
    example: "Membunuh dalam keadaan tidur berjalan",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Automatism",
    relatedTerms: ["Ketidaksadaran", "Unconscious Act"]
  },
  {
    id: 290,
    term: "Autopsi Forensik",
    category: "pembuktian",
    definition: "Pemeriksaan mayat untuk kepentingan peradilan",
    example: "Autopsi untuk menentukan sebab kematian",
    legalBasis: "Pasal 133 KUHAP",
    englishTerm: "Forensic Autopsy",
    relatedTerms: ["Bedah Mayat", "Post Mortem"]
  },

  // B - Lanjutan (291-340)
  {
    id: 291,
    term: "Bail Bond",
    category: "proses-pidana",
    definition: "Jaminan uang untuk pembebasan sementara",
    example: "Jaminan 500 juta untuk penangguhan penahanan",
    legalBasis: "Pasal 31 KUHAP",
    englishTerm: "Bail Bond",
    relatedTerms: ["Uang Jaminan", "Borgsom"]
  },
  {
    id: 292,
    term: "Barang Rampasan",
    category: "sanksi-pidana",
    definition: "Barang yang dirampas untuk negara sebagai pidana tambahan",
    example: "Mobil hasil kejahatan dirampas negara",
    legalBasis: "Pasal 39 KUHP",
    englishTerm: "Forfeited Goods",
    relatedTerms: ["Perampasan", "Konfiskasi"]
  },
  {
    id: 293,
    term: "Barang Temuan",
    category: "pembuktian",
    definition: "Barang yang ditemukan dan diduga hasil/alat tindak pidana",
    example: "Senjata api ditemukan di semak-semak",
    legalBasis: "KUHAP",
    englishTerm: "Found Objects",
    relatedTerms: ["Benda Temuan", "Discovery"]
  },
  {
    id: 294,
    term: "Battery",
    category: "tindak-pidana",
    definition: "Kekerasan fisik terhadap orang lain",
    example: "Memukul atau mendorong seseorang",
    legalBasis: "Pasal 351 KUHP",
    englishTerm: "Battery",
    relatedTerms: ["Kekerasan Fisik", "Penganiayaan"]
  },
  {
    id: 295,
    term: "Bedrog",
    category: "tindak-pidana",
    definition: "Penipuan atau tipu muslihat",
    example: "Menipu dengan identitas palsu",
    legalBasis: "Pasal 378 KUHP",
    englishTerm: "Fraud",
    relatedTerms: ["Penipuan", "Tipu Muslihat"]
  },
  {
    id: 296,
    term: "Bekendmaking",
    category: "proses-pidana",
    definition: "Pengumuman atau pemberitahuan resmi",
    example: "Pengumuman putusan pengadilan",
    legalBasis: "KUHAP",
    englishTerm: "Public Announcement",
    relatedTerms: ["Pengumuman", "Notifikasi"]
  },
  {
    id: 297,
    term: "Belediging van het Staatshoofd",
    category: "tindak-pidana",
    definition: "Penghinaan terhadap kepala negara",
    example: "Menghina presiden di ruang publik",
    legalBasis: "Pasal 134-136 KUHP (dicabut MK)",
    englishTerm: "Lese Majeste",
    relatedTerms: ["Penghinaan Presiden", "Makar"]
  },
  {
    id: 298,
    term: "Bench Warrant",
    category: "proses-pidana",
    definition: "Surat perintah dari pengadilan",
    example: "Perintah menghadirkan terdakwa yang mangkir",
    legalBasis: "KUHAP",
    englishTerm: "Bench Warrant",
    relatedTerms: ["Surat Perintah Pengadilan", "Penetapan"]
  },
  {
    id: 299,
    term: "Beneficial Owner",
    category: "pidana-khusus",
    definition: "Pemilik manfaat sebenarnya dalam tindak pidana ekonomi",
    example: "Pemilik sebenarnya perusahaan pencucian uang",
    legalBasis: "UU TPPU",
    englishTerm: "Beneficial Owner",
    relatedTerms: ["Pemilik Manfaat", "UBO"],
    trending: true
  },
  {
    id: 300,
    term: "Benoeming",
    category: "proses-pidana",
    definition: "Penunjukan atau pengangkatan",
    example: "Penunjukan hakim ad hoc",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Appointment",
    relatedTerms: ["Penunjukan", "Pengangkatan"]
  },
  {
    id: 301,
    term: "Beperkte Voorwaarden",
    category: "sanksi-pidana",
    definition: "Syarat-syarat terbatas dalam pidana bersyarat",
    example: "Larangan keluar kota selama masa percobaan",
    legalBasis: "Pasal 14c KUHP",
    englishTerm: "Limited Conditions",
    relatedTerms: ["Syarat Khusus", "Pembatasan"]
  },
  {
    id: 302,
    term: "Beraat",
    category: "sanksi-pidana",
    definition: "Pernyataan bersalah",
    example: "Terdakwa dinyatakan bersalah melakukan pembunuhan",
    legalBasis: "Pasal 193 KUHAP",
    englishTerm: "Conviction",
    relatedTerms: ["Terbukti Bersalah", "Veroordeling"]
  },
  {
    id: 303,
    term: "Berisping",
    category: "sanksi-pidana",
    definition: "Teguran sebagai bentuk pidana ringan",
    example: "Hakim memberi teguran untuk pelanggaran ringan",
    legalBasis: "RUU KUHP",
    englishTerm: "Reprimand",
    relatedTerms: ["Teguran", "Peringatan"]
  },
  {
    id: 304,
    term: "Beroep in Cassatie",
    category: "upaya-hukum",
    definition: "Permohonan kasasi",
    example: "Mengajukan kasasi ke Mahkamah Agung",
    legalBasis: "Pasal 244 KUHAP",
    englishTerm: "Cassation Appeal",
    relatedTerms: ["Kasasi", "Pourvoi en Cassation"]
  },
  {
    id: 305,
    term: "Bescherming",
    category: "proses-pidana",
    definition: "Perlindungan dalam konteks hukum pidana",
    example: "Perlindungan saksi dan korban",
    legalBasis: "UU No. 13/2006",
    englishTerm: "Protection",
    relatedTerms: ["Perlindungan", "Witness Protection"]
  },
  {
    id: 306,
    term: "Beschikking",
    category: "proses-pidana",
    definition: "Penetapan atau ketetapan",
    example: "Penetapan hakim tentang penahanan",
    legalBasis: "KUHAP",
    englishTerm: "Order/Decree",
    relatedTerms: ["Penetapan", "Ketetapan"]
  },
  {
    id: 307,
    term: "Beslissing",
    category: "proses-pidana",
    definition: "Keputusan atau putusan",
    example: "Putusan hakim dalam perkara pidana",
    legalBasis: "KUHAP",
    englishTerm: "Decision",
    relatedTerms: ["Putusan", "Keputusan"]
  },
  {
    id: 308,
    term: "Bestuursrechtspraak",
    category: "proses-pidana",
    definition: "Peradilan administrasi yang dapat terkait pidana",
    example: "Sengketa izin yang berujung pidana",
    legalBasis: "UU Peradilan TUN",
    englishTerm: "Administrative Justice",
    relatedTerms: ["Peradilan Administrasi", "PTUN"]
  },
  {
    id: 309,
    term: "Bewaring",
    category: "proses-pidana",
    definition: "Penyimpanan barang bukti",
    example: "Penyimpanan narkoba di rupbasan",
    legalBasis: "Pasal 44 KUHAP",
    englishTerm: "Custody",
    relatedTerms: ["Penyimpanan", "Penitipan"]
  },
  {
    id: 310,
    term: "Bewijs",
    category: "pembuktian",
    definition: "Bukti atau pembuktian",
    example: "Bukti DNA dalam kasus pembunuhan",
    legalBasis: "Pasal 183 KUHAP",
    englishTerm: "Evidence/Proof",
    relatedTerms: ["Bukti", "Alat Bukti"]
  },
  {
    id: 311,
    term: "Bewijslast",
    category: "pembuktian",
    definition: "Beban pembuktian",
    example: "Jaksa memikul beban pembuktian kesalahan",
    legalBasis: "Pasal 66 KUHAP",
    englishTerm: "Burden of Proof",
    relatedTerms: ["Beban Bukti", "Onus Probandi"]
  },
  {
    id: 312,
    term: "Bewijsmiddelen",
    category: "pembuktian",
    definition: "Alat-alat bukti yang sah",
    example: "Lima alat bukti dalam KUHAP",
    legalBasis: "Pasal 184 KUHAP",
    englishTerm: "Means of Evidence",
    relatedTerms: ["Alat Bukti", "Evidence"]
  },
  {
    id: 313,
    term: "Bewijsrecht",
    category: "pembuktian",
    definition: "Hukum pembuktian",
    example: "Aturan tentang cara membuktikan",
    legalBasis: "KUHAP Bab XVI",
    englishTerm: "Law of Evidence",
    relatedTerms: ["Hukum Pembuktian", "Evidence Law"]
  },
  {
    id: 314,
    term: "Bewijstheorie",
    category: "pembuktian",
    definition: "Teori pembuktian dalam hukum pidana",
    example: "Teori pembuktian negatif menurut UU",
    legalBasis: "Pasal 183 KUHAP",
    englishTerm: "Theory of Evidence",
    relatedTerms: ["Teori Pembuktian", "Conviction Theory"]
  },
  {
    id: 315,
    term: "Beyond Reasonable Doubt",
    category: "pembuktian",
    definition: "Tanpa keraguan yang beralasan",
    example: "Hakim yakin tanpa keraguan terdakwa bersalah",
    legalBasis: "Pasal 183 KUHAP",
    englishTerm: "Beyond Reasonable Doubt",
    relatedTerms: ["Keyakinan Hakim", "Tanpa Keraguan"]
  },
  {
    id: 316,
    term: "Bigami",
    category: "tindak-pidana",
    definition: "Menikah lagi padahal masih terikat perkawinan",
    example: "Menikah kedua tanpa izin pengadilan",
    legalBasis: "Pasal 279 KUHP",
    englishTerm: "Bigamy",
    relatedTerms: ["Poligami Ilegal", "Perkawinan Ganda"]
  },
  {
    id: 317,
    term: "Bijkomende Straf",
    category: "sanksi-pidana",
    definition: "Pidana tambahan",
    example: "Pencabutan hak pilih, pengumuman putusan",
    legalBasis: "Pasal 10 huruf b KUHP",
    englishTerm: "Additional Punishment",
    relatedTerms: ["Pidana Tambahan", "Accessory Penalty"]
  },
  {
    id: 318,
    term: "Bijzondere Delicten",
    category: "tindak-pidana",
    definition: "Delik-delik khusus di luar KUHP",
    example: "Tindak pidana korupsi, narkotika",
    legalBasis: "UU Pidana Khusus",
    englishTerm: "Special Crimes",
    relatedTerms: ["Delik Khusus", "Tindak Pidana Khusus"]
  },
  {
    id: 319,
    term: "Bijzondere Voorwaarden",
    category: "sanksi-pidana",
    definition: "Syarat-syarat khusus dalam pidana bersyarat",
    example: "Wajib lapor, ganti rugi korban",
    legalBasis: "Pasal 14c KUHP",
    englishTerm: "Special Conditions",
    relatedTerms: ["Syarat Khusus", "Persyaratan"]
  },
  {
    id: 320,
    term: "Black Market",
    category: "tindak-pidana",
    definition: "Pasar gelap untuk barang ilegal",
    example: "Perdagangan senjata ilegal",
    legalBasis: "UU Darurat No. 12/1951",
    englishTerm: "Black Market",
    relatedTerms: ["Pasar Gelap", "Perdagangan Ilegal"]
  },
  {
    id: 321,
    term: "Blackmail",
    category: "tindak-pidana",
    definition: "Pemerasan dengan ancaman membuka rahasia",
    example: "Ancam buka aib untuk minta uang",
    legalBasis: "Pasal 369 KUHP",
    englishTerm: "Blackmail",
    relatedTerms: ["Pemerasan", "Chantage"]
  },
  {
    id: 322,
    term: "Blanket Amnesty",
    category: "sanksi-pidana",
    definition: "Amnesti umum untuk kelompok pelaku",
    example: "Amnesti untuk tahanan politik",
    legalBasis: "UU Amnesti",
    englishTerm: "Blanket Amnesty",
    relatedTerms: ["Amnesti Umum", "Pengampunan Massal"]
  },
  {
    id: 323,
    term: "Blasphemy",
    category: "tindak-pidana",
    definition: "Penodaan agama",
    example: "Menghina ajaran agama di ruang publik",
    legalBasis: "Pasal 156a KUHP",
    englishTerm: "Blasphemy",
    relatedTerms: ["Penodaan Agama", "Penistaan Agama"]
  },
  {
    id: 324,
    term: "Blood Money",
    category: "sanksi-pidana",
    definition: "Uang pengganti hukuman dalam hukum adat",
    example: "Diyat dalam hukum pidana Islam",
    legalBasis: "Hukum Adat/Pidana Islam",
    englishTerm: "Blood Money",
    relatedTerms: ["Diyat", "Uang Darah"]
  },
  {
    id: 325,
    term: "Blue Collar Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang dilakukan kelas pekerja",
    example: "Pencurian oleh buruh pabrik",
    legalBasis: "KUHP",
    englishTerm: "Blue Collar Crime",
    relatedTerms: ["Kejahatan Konvensional", "Street Crime"]
  },
  {
    id: 326,
    term: "Boedelscheiding",
    category: "proses-pidana",
    definition: "Pemisahan harta dalam konteks pidana",
    example: "Pemisahan aset hasil kejahatan",
    legalBasis: "UU TPPU",
    englishTerm: "Asset Separation",
    relatedTerms: ["Pemisahan Harta", "Asset Segregation"]
  },
  {
    id: 327,
    term: "Boete",
    category: "sanksi-pidana",
    definition: "Denda atau pidana denda",
    example: "Denda 50 juta untuk pencemaran lingkungan",
    legalBasis: "Pasal 10 KUHP",
    englishTerm: "Fine",
    relatedTerms: ["Denda", "Pidana Denda"]
  },
  {
    id: 328,
    term: "Bona Fide",
    category: "asas-hukum",
    definition: "Itikad baik dalam konteks pidana",
    example: "Pembeli barang curian dengan itikad baik",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Good Faith",
    relatedTerms: ["Itikad Baik", "Te Goeder Trouw"]
  },
  {
    id: 329,
    term: "Bona Vacantia",
    category: "sanksi-pidana",
    definition: "Harta tak bertuan hasil kejahatan",
    example: "Aset kejahatan yang tidak diketahui pemiliknya",
    legalBasis: "UU TPPU",
    englishTerm: "Ownerless Property",
    relatedTerms: ["Harta Tak Bertuan", "Unclaimed Asset"]
  },
  {
    id: 330,
    term: "Bootlegging",
    category: "tindak-pidana",
    definition: "Produksi atau penjualan barang ilegal",
    example: "Produksi minuman keras ilegal",
    legalBasis: "UU Cukai",
    englishTerm: "Bootlegging",
    relatedTerms: ["Produksi Ilegal", "Penyelundupan"]
  },
  {
    id: 331,
    term: "Borgstelling",
    category: "proses-pidana",
    definition: "Jaminan untuk penangguhan penahanan",
    example: "Jaminan uang atau orang",
    legalBasis: "Pasal 31 KUHAP",
    englishTerm: "Bail",
    relatedTerms: ["Jaminan", "Penangguhan"]
  },
  {
    id: 332,
    term: "Brandstichting",
    category: "tindak-pidana",
    definition: "Pembakaran dengan sengaja",
    example: "Membakar hutan untuk membuka lahan",
    legalBasis: "Pasal 187 KUHP",
    englishTerm: "Arson",
    relatedTerms: ["Pembakaran", "Kebakaran Sengaja"]
  },
  {
    id: 333,
    term: "Breach of Trust",
    category: "tindak-pidana",
    definition: "Pelanggaran kepercayaan",
    example: "Pengacara menggelapkan uang klien",
    legalBasis: "Pasal 372 KUHP",
    englishTerm: "Breach of Trust",
    relatedTerms: ["Pengkhianatan", "Penyalahgunaan Kepercayaan"]
  },
  {
    id: 334,
    term: "Breaking and Entering",
    category: "tindak-pidana",
    definition: "Merusak dan memasuki tempat untuk mencuri",
    example: "Merusak pintu untuk masuk mencuri",
    legalBasis: "Pasal 363 KUHP",
    englishTerm: "Breaking and Entering",
    relatedTerms: ["Pencurian dengan Pemberatan", "Inbraak"]
  },
  {
    id: 335,
    term: "Bribery",
    category: "pidana-khusus",
    definition: "Penyuapan atau pemberian suap",
    example: "Menyuap pejabat untuk memenangkan tender",
    legalBasis: "UU Tipikor",
    englishTerm: "Bribery",
    relatedTerms: ["Suap", "Omkoping"],
    trending: true
  },
  {
    id: 336,
    term: "Brief van Rechten",
    category: "proses-pidana",
    definition: "Surat yang berisi hak-hak tersangka",
    example: "Pemberitahuan hak untuk didampingi pengacara",
    legalBasis: "Pasal 50-68 KUHAP",
    englishTerm: "Letter of Rights",
    relatedTerms: ["Surat Hak", "Miranda Rights"]
  },
  {
    id: 337,
    term: "Buiten Vervolging Stelling",
    category: "proses-pidana",
    definition: "Penghentian penuntutan",
    example: "Penuntutan dihentikan karena tersangka meninggal",
    legalBasis: "Pasal 77 KUHP",
    englishTerm: "Discontinuation of Prosecution",
    relatedTerms: ["Penghentian Penuntutan", "SP3"]
  },
  {
    id: 338,
    term: "Burden of Going Forward",
    category: "pembuktian",
    definition: "Beban untuk mengajukan bukti awal",
    example: "Jaksa harus mengajukan bukti prima facie",
    legalBasis: "Teori Pembuktian",
    englishTerm: "Burden of Production",
    relatedTerms: ["Beban Mengajukan Bukti", "Prima Facie"]
  },
  {
    id: 339,
    term: "Burglary",
    category: "tindak-pidana",
    definition: "Pencurian dengan memasuki bangunan",
    example: "Masuk rumah malam hari untuk mencuri",
    legalBasis: "Pasal 363 KUHP",
    englishTerm: "Burglary",
    relatedTerms: ["Pencurian dengan Pemberatan", "Maling"]
  },
  {
    id: 340,
    term: "Business Crime",
    category: "pidana-khusus",
    definition: "Kejahatan di bidang bisnis",
    example: "Manipulasi saham, insider trading",
    legalBasis: "UU Pasar Modal",
    englishTerm: "Business Crime",
    relatedTerms: ["Kejahatan Bisnis", "Corporate Crime"]
  },

  // C - Lanjutan (341-390)
  {
    id: 341,
    term: "Cabul",
    category: "tindak-pidana",
    definition: "Perbuatan yang melanggar kesusilaan seksual",
    example: "Melakukan perbuatan cabul terhadap anak",
    legalBasis: "Pasal 289-296 KUHP",
    englishTerm: "Indecent Act",
    relatedTerms: ["Pencabulan", "Perbuatan Asusila"]
  },
  {
    id: 342,
    term: "Capacity to Stand Trial",
    category: "proses-pidana",
    definition: "Kemampuan untuk menjalani persidangan",
    example: "Terdakwa mampu memahami persidangan",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Fitness to Stand Trial",
    relatedTerms: ["Kemampuan Bersidang", "Competency"]
  },
  {
    id: 343,
    term: "Capital Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang diancam pidana mati",
    example: "Pembunuhan berencana, terorisme",
    legalBasis: "Pasal 340 KUHP",
    englishTerm: "Capital Crime",
    relatedTerms: ["Kejahatan Berat", "Death Penalty Crime"]
  },
  {
    id: 344,
    term: "Carnal Knowledge",
    category: "tindak-pidana",
    definition: "Persetubuhan dalam konteks pidana",
    example: "Persetubuhan dengan anak di bawah umur",
    legalBasis: "Pasal 287 KUHP",
    englishTerm: "Carnal Knowledge",
    relatedTerms: ["Persetubuhan", "Sexual Intercourse"]
  },
  {
    id: 345,
    term: "Case Law",
    category: "proses-pidana",
    definition: "Hukum yang terbentuk dari putusan pengadilan",
    example: "Yurisprudensi MA tentang unsur melawan hukum",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Case Law",
    relatedTerms: ["Yurisprudensi", "Putusan Pengadilan"]
  },
  {
    id: 346,
    term: "Cassatie in het Belang der Wet",
    category: "upaya-hukum",
    definition: "Kasasi demi kepentingan hukum",
    example: "Jaksa Agung mengajukan kasasi untuk kepastian hukum",
    legalBasis: "Pasal 259 KUHAP",
    englishTerm: "Cassation in Interest of Law",
    relatedTerms: ["Kasasi Demi Hukum", "Legal Interest"]
  },
  {
    id: 347,
    term: "Causal Connection",
    category: "tindak-pidana",
    definition: "Hubungan sebab akibat dalam tindak pidana",
    example: "Hubungan antara penusukan dengan kematian",
    legalBasis: "Teori Kausalitas",
    englishTerm: "Causation",
    relatedTerms: ["Kausalitas", "Hubungan Sebab Akibat"]
  },
  {
    id: 348,
    term: "Cautio Criminalis",
    category: "proses-pidana",
    definition: "Peringatan tentang hak tersangka",
    example: "Peringatan hak untuk diam",
    legalBasis: "Pasal 52 KUHAP",
    englishTerm: "Criminal Warning",
    relatedTerms: ["Peringatan Hak", "Miranda Warning"]
  },
  {
    id: 349,
    term: "Celerity of Justice",
    category: "asas-hukum",
    definition: "Kecepatan dalam proses peradilan",
    example: "Sidang cepat untuk tindak pidana ringan",
    legalBasis: "Asas Peradilan Cepat",
    englishTerm: "Swift Justice",
    relatedTerms: ["Peradilan Cepat", "Speedy Trial"]
  },
  {
    id: 350,
    term: "Certiorari",
    category: "upaya-hukum",
    definition: "Perintah pengadilan tinggi untuk memeriksa perkara",
    example: "MA memeriksa perkara dari pengadilan bawah",
    legalBasis: "UU MA",
    englishTerm: "Writ of Certiorari",
    relatedTerms: ["Peninjauan", "Review"]
  },
  {
    id: 351,
    term: "Chain of Custody",
    category: "pembuktian",
    definition: "Rantai penyimpanan barang bukti",
    example: "Dokumentasi perpindahan barang bukti narkoba",
    legalBasis: "SOP Penyidikan",
    englishTerm: "Chain of Custody",
    relatedTerms: ["Rantai Bukti", "Lacak Balak"]
  },
  {
    id: 352,
    term: "Chamber Counsel",
    category: "proses-pidana",
    definition: "Musyawarah majelis hakim",
    example: "Rapat permusyawaratan majelis hakim",
    legalBasis: "Pasal 182 ayat (3) KUHAP",
    englishTerm: "Judicial Deliberation",
    relatedTerms: ["Musyawarah Hakim", "Raadkamer"]
  },
  {
    id: 353,
    term: "Character Evidence",
    category: "pembuktian",
    definition: "Bukti tentang karakter atau kepribadian",
    example: "Kesaksian tentang sifat baik terdakwa",
    legalBasis: "Pembuktian",
    englishTerm: "Character Evidence",
    relatedTerms: ["Bukti Karakter", "Testimonium de Auditu"]
  },
  {
    id: 354,
    term: "Charge Bargaining",
    category: "proses-pidana",
    definition: "Negosiasi dakwaan antara jaksa dan terdakwa",
    example: "Dakwaan diturunkan dengan pengakuan bersalah",
    legalBasis: "Praktik Peradilan",
    englishTerm: "Charge Bargaining",
    relatedTerms: ["Plea Bargain", "Negosiasi Dakwaan"]
  },
  {
    id: 355,
    term: "Chilling Effect",
    category: "asas-hukum",
    definition: "Efek menakutkan dari ancaman pidana",
    example: "UU ITE menimbulkan ketakutan berpendapat",
    legalBasis: "Teori Hukum",
    englishTerm: "Chilling Effect",
    relatedTerms: ["Efek Jera", "Deterrence"]
  },
  {
    id: 356,
    term: "Chronische Delicten",
    category: "tindak-pidana",
    definition: "Delik yang berlangsung terus-menerus",
    example: "Penculikan yang berlangsung berhari-hari",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Continuing Crime",
    relatedTerms: ["Delik Berlanjut", "Voortdurende Delicten"]
  },
  {
    id: 357,
    term: "Circumstantial Evidence",
    category: "pembuktian",
    definition: "Bukti tidak langsung atau bukti petunjuk",
    example: "Sidik jari di TKP sebagai petunjuk",
    legalBasis: "Pasal 188 KUHAP",
    englishTerm: "Circumstantial Evidence",
    relatedTerms: ["Bukti Petunjuk", "Indirect Evidence"]
  },
  {
    id: 358,
    term: "Civil Death",
    category: "sanksi-pidana",
    definition: "Hilangnya hak-hak keperdataan akibat pidana",
    example: "Pencabutan hak pilih dan dipilih",
    legalBasis: "Pasal 35 KUHP",
    englishTerm: "Civil Death",
    relatedTerms: ["Mati Perdata", "Pencabutan Hak"]
  },
  {
    id: 359,
    term: "Clandestine",
    category: "tindak-pidana",
    definition: "Dilakukan secara sembunyi-sembunyi",
    example: "Perdagangan narkoba secara sembunyi",
    legalBasis: "UU Narkotika",
    englishTerm: "Clandestine",
    relatedTerms: ["Sembunyi-sembunyi", "Gelap"]
  },
  {
    id: 360,
    term: "Clear and Present Danger",
    category: "asas-hukum",
    definition: "Bahaya yang jelas dan nyata",
    example: "Hasutan yang menimbulkan bahaya langsung",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Clear and Present Danger",
    relatedTerms: ["Bahaya Nyata", "Imminent Danger"]
  },
  {
    id: 361,
    term: "Clemency",
    category: "sanksi-pidana",
    definition: "Pengampunan atau keringanan hukuman",
    example: "Presiden memberi grasi kepada terpidana",
    legalBasis: "UU Grasi",
    englishTerm: "Clemency",
    relatedTerms: ["Grasi", "Pengampunan"]
  },
  {
    id: 362,
    term: "Coercion",
    category: "tindak-pidana",
    definition: "Pemaksaan atau paksaan",
    example: "Memaksa saksi memberikan keterangan palsu",
    legalBasis: "Pasal 89 KUHP",
    englishTerm: "Coercion",
    relatedTerms: ["Paksaan", "Dwang"]
  },
  {
    id: 363,
    term: "Collateral Attack",
    category: "upaya-hukum",
    definition: "Serangan tidak langsung terhadap putusan",
    example: "Menggugat putusan pidana melalui perdata",
    legalBasis: "Hukum Acara",
    englishTerm: "Collateral Attack",
    relatedTerms: ["Serangan Tidak Langsung", "Indirect Challenge"]
  },
  {
    id: 364,
    term: "Collusion",
    category: "tindak-pidana",
    definition: "Persekongkolan untuk melakukan kejahatan",
    example: "Kolusi dalam tender proyek pemerintah",
    legalBasis: "UU Tipikor",
    englishTerm: "Collusion",
    relatedTerms: ["Kolusi", "Persekongkolan"]
  },
  {
    id: 365,
    term: "Comity",
    category: "proses-pidana",
    definition: "Saling menghormati antar yurisdiksi",
    example: "Pengakuan putusan pengadilan negara lain",
    legalBasis: "Hukum Internasional",
    englishTerm: "Comity",
    relatedTerms: ["Courtoisie", "Mutual Recognition"]
  },
  {
    id: 366,
    term: "Command Responsibility",
    category: "subjek-hukum",
    definition: "Tanggung jawab komando atas tindakan bawahan",
    example: "Komandan bertanggung jawab atas kejahatan perang bawahan",
    legalBasis: "Hukum Humaniter",
    englishTerm: "Command Responsibility",
    relatedTerms: ["Tanggung Jawab Komando", "Superior Responsibility"]
  },
  {
    id: 367,
    term: "Committal",
    category: "proses-pidana",
    definition: "Penyerahan ke tahanan atau rumah sakit jiwa",
    example: "Terdakwa gila dikirim ke RSJ",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Committal",
    relatedTerms: ["Penyerahan", "Institutionalisasi"]
  },
  {
    id: 368,
    term: "Common Design",
    category: "tindak-pidana",
    definition: "Rencana bersama dalam melakukan kejahatan",
    example: "Merencanakan bersama untuk merampok bank",
    legalBasis: "Pasal 88 KUHP",
    englishTerm: "Common Design",
    relatedTerms: ["Rencana Bersama", "Joint Criminal Enterprise"]
  },
  {
    id: 369,
    term: "Commutation",
    category: "sanksi-pidana",
    definition: "Pengurangan atau perubahan hukuman",
    example: "Pidana mati diubah menjadi seumur hidup",
    legalBasis: "UU Grasi",
    englishTerm: "Commutation",
    relatedTerms: ["Komutasi", "Pengurangan Pidana"]
  },
  {
    id: 370,
    term: "Competence",
    category: "proses-pidana",
    definition: "Kewenangan atau kompetensi mengadili",
    example: "Kompetensi pengadilan tipikor",
    legalBasis: "Pasal 84 KUHAP",
    englishTerm: "Jurisdiction",
    relatedTerms: ["Kompetensi", "Kewenangan"]
  },
  {
    id: 371,
    term: "Complicity",
    category: "tindak-pidana",
    definition: "Keterlibatan dalam kejahatan orang lain",
    example: "Terlibat membantu pencurian",
    legalBasis: "Pasal 55-56 KUHP",
    englishTerm: "Complicity",
    relatedTerms: ["Penyertaan", "Keterlibatan"]
  },
  {
    id: 372,
    term: "Compounding",
    category: "proses-pidana",
    definition: "Penyelesaian perkara dengan kompensasi",
    example: "Pencurian diselesaikan dengan ganti rugi",
    legalBasis: "Restorative Justice",
    englishTerm: "Compounding",
    relatedTerms: ["Penyelesaian Damai", "Kompensasi"]
  },
  {
    id: 373,
    term: "Compulsory Process",
    category: "proses-pidana",
    definition: "Proses paksa untuk menghadirkan saksi",
    example: "Menghadirkan saksi dengan paksa",
    legalBasis: "Pasal 159 KUHAP",
    englishTerm: "Compulsory Process",
    relatedTerms: ["Proses Paksa", "Subpoena"]
  },
  {
    id: 374,
    term: "Concealment",
    category: "tindak-pidana",
    definition: "Penyembunyian barang hasil kejahatan",
    example: "Menyembunyikan barang curian",
    legalBasis: "Pasal 480 KUHP",
    englishTerm: "Concealment",
    relatedTerms: ["Penyembunyian", "Penadahan"]
  },
  {
    id: 375,
    term: "Concurrent Sentences",
    category: "sanksi-pidana",
    definition: "Pidana yang dijalani bersamaan",
    example: "Dua pidana 5 tahun dijalani bersamaan",
    legalBasis: "Pasal 65 KUHP",
    englishTerm: "Concurrent Sentences",
    relatedTerms: ["Pidana Bersamaan", "Samenloop"]
  },
  {
    id: 376,
    term: "Conditional Discharge",
    category: "sanksi-pidana",
    definition: "Pembebasan bersyarat dari tuntutan",
    example: "Dibebaskan dengan syarat tidak mengulangi",
    legalBasis: "Pasal 14a KUHP",
    englishTerm: "Conditional Discharge",
    relatedTerms: ["Pembebasan Bersyarat", "Voorwaardelijk"]
  },
  {
    id: 377,
    term: "Conduct Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang fokus pada perbuatan",
    example: "Mengemudi dalam keadaan mabuk",
    legalBasis: "UU Lalu Lintas",
    englishTerm: "Conduct Crime",
    relatedTerms: ["Delik Perbuatan", "Gedragsdelict"]
  },
  {
    id: 378,
    term: "Confession",
    category: "pembuktian",
    definition: "Pengakuan melakukan tindak pidana",
    example: "Terdakwa mengaku melakukan pembunuhan",
    legalBasis: "Pasal 189 KUHAP",
    englishTerm: "Confession",
    relatedTerms: ["Pengakuan", "Bekentenis"]
  },
  {
    id: 379,
    term: "Confidential Information",
    category: "pembuktian",
    definition: "Informasi rahasia dalam penyidikan",
    example: "Identitas informan rahasia",
    legalBasis: "UU Kepolisian",
    englishTerm: "Confidential Information",
    relatedTerms: ["Informasi Rahasia", "Classified"]
  },
  {
    id: 380,
    term: "Confinement",
    category: "sanksi-pidana",
    definition: "Pengekangan atau penahanan",
    example: "Dikurung dalam sel isolasi",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Confinement",
    relatedTerms: ["Pengekangan", "Kurungan"]
  },
  {
    id: 381,
    term: "Confrontation",
    category: "pembuktian",
    definition: "Konfrontasi antara saksi dengan terdakwa",
    example: "Saksi berhadapan langsung dengan terdakwa",
    legalBasis: "Pasal 160 KUHAP",
    englishTerm: "Confrontation",
    relatedTerms: ["Konfrontasi", "Saling Hadap"]
  },
  {
    id: 382,
    term: "Connivance",
    category: "tindak-pidana",
    definition: "Pembiaran terhadap kejahatan",
    example: "Pejabat membiarkan korupsi terjadi",
    legalBasis: "UU Tipikor",
    englishTerm: "Connivance",
    relatedTerms: ["Pembiaran", "Toleransi Kejahatan"]
  },
  {
    id: 383,
    term: "Consecutive Sentences",
    category: "sanksi-pidana",
    definition: "Pidana yang dijalani berturut-turut",
    example: "5 tahun lalu 3 tahun berturut-turut",
    legalBasis: "Pasal 66 KUHP",
    englishTerm: "Consecutive Sentences",
    relatedTerms: ["Pidana Berturut", "Kumulatif"]
  },
  {
    id: 384,
    term: "Consent Decree",
    category: "proses-pidana",
    definition: "Kesepakatan yang ditetapkan pengadilan",
    example: "Kesepakatan plea bargain disahkan hakim",
    legalBasis: "Praktik Peradilan",
    englishTerm: "Consent Decree",
    relatedTerms: ["Penetapan Kesepakatan", "Agreed Order"]
  },
  {
    id: 385,
    term: "Conspiracy",
    category: "tindak-pidana",
    definition: "Persekongkolan untuk melakukan kejahatan",
    example: "Konspirasi melakukan terorisme",
    legalBasis: "Pasal 88, 110 KUHP",
    englishTerm: "Conspiracy",
    relatedTerms: ["Konspirasi", "Permufakatan Jahat"]
  },
  {
    id: 386,
    term: "Constructive",
    category: "asas-hukum",
    definition: "Dianggap ada berdasarkan hukum",
    example: "Constructive possession narkoba",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Constructive",
    relatedTerms: ["Dianggap", "Fiksi Hukum"]
  },
  {
    id: 387,
    term: "Contempt of Court",
    category: "tindak-pidana",
    definition: "Penghinaan terhadap pengadilan",
    example: "Mengganggu jalannya persidangan",
    legalBasis: "Pasal 217-224 KUHP",
    englishTerm: "Contempt of Court",
    relatedTerms: ["Penghinaan Pengadilan", "Minachting"]
  },
  {
    id: 388,
    term: "Contraband",
    category: "pembuktian",
    definition: "Barang terlarang atau selundupan",
    example: "Narkoba, senjata ilegal",
    legalBasis: "UU Kepabeanan",
    englishTerm: "Contraband",
    relatedTerms: ["Barang Terlarang", "Selundupan"]
  },
  {
    id: 389,
    term: "Contributory Negligence",
    category: "tindak-pidana",
    definition: "Kelalaian yang turut menyebabkan",
    example: "Korban ikut lalai sehingga terjadi kecelakaan",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Contributory Negligence",
    relatedTerms: ["Turut Lalai", "Kontribusi Kelalaian"]
  },
  {
    id: 390,
    term: "Conversion",
    category: "tindak-pidana",
    definition: "Penggelapan atau penyalahgunaan barang",
    example: "Menggunakan uang titipan untuk keperluan pribadi",
    legalBasis: "Pasal 372 KUHP",
    englishTerm: "Conversion",
    relatedTerms: ["Penggelapan", "Penyalahgunaan"]
  },

  // D - Lanjutan (391-440)
  {
    id: 391,
    term: "Deceit",
    category: "tindak-pidana",
    definition: "Tipu daya atau kebohongan",
    example: "Menipu dengan dokumen palsu",
    legalBasis: "Pasal 378 KUHP",
    englishTerm: "Deceit",
    relatedTerms: ["Tipu Daya", "Bedrog"]
  },
  {
    id: 392,
    term: "Decriminalization",
    category: "asas-hukum",
    definition: "Penghapusan sifat pidana dari suatu perbuatan",
    example: "Dekriminalisasi penggunaan ganja medis",
    legalBasis: "Kebijakan Hukum Pidana",
    englishTerm: "Decriminalization",
    relatedTerms: ["Dekriminalisasi", "Depenalisasi"]
  },
  {
    id: 393,
    term: "Defamation",
    category: "tindak-pidana",
    definition: "Pencemaran nama baik",
    example: "Menyebarkan berita bohong yang merusak reputasi",
    legalBasis: "Pasal 310-311 KUHP",
    englishTerm: "Defamation",
    relatedTerms: ["Pencemaran Nama Baik", "Fitnah"]
  },
  {
    id: 394,
    term: "Default Judgment",
    category: "proses-pidana",
    definition: "Putusan tanpa kehadiran terdakwa",
    example: "Putusan verstek karena terdakwa mangkir",
    legalBasis: "Pasal 196 KUHAP",
    englishTerm: "Default Judgment",
    relatedTerms: ["Putusan Verstek", "In Absentia"]
  },
  {
    id: 395,
    term: "Defeasance",
    category: "proses-pidana",
    definition: "Pembatalan atau penghapusan",
    example: "Pembatalan tuntutan karena daluwarsa",
    legalBasis: "Pasal 78 KUHP",
    englishTerm: "Defeasance",
    relatedTerms: ["Pembatalan", "Penghapusan"]
  },
  {
    id: 396,
    term: "Defendant",
    category: "subjek-hukum",
    definition: "Terdakwa dalam perkara pidana",
    example: "Orang yang didakwa melakukan pembunuhan",
    legalBasis: "Pasal 1 angka 15 KUHAP",
    englishTerm: "Defendant",
    relatedTerms: ["Terdakwa", "Beklaagde"]
  },
  {
    id: 397,
    term: "Defense of Property",
    category: "asas-hukum",
    definition: "Pembelaan untuk melindungi harta benda",
    example: "Memukul pencuri yang masuk rumah",
    legalBasis: "Pasal 49 KUHP",
    englishTerm: "Defense of Property",
    relatedTerms: ["Pembelaan Harta", "Noodweer"]
  },
  {
    id: 398,
    term: "Deferred Prosecution",
    category: "proses-pidana",
    definition: "Penundaan penuntutan dengan syarat",
    example: "Penuntutan ditunda jika mengikuti rehabilitasi",
    legalBasis: "Restorative Justice",
    englishTerm: "Deferred Prosecution",
    relatedTerms: ["Penundaan Penuntutan", "Diversi"]
  },
  {
    id: 399,
    term: "Deliberate",
    category: "tindak-pidana",
    definition: "Dengan sengaja atau direncanakan",
    example: "Pembunuhan yang deliberate (berencana)",
    legalBasis: "Pasal 340 KUHP",
    englishTerm: "Deliberate",
    relatedTerms: ["Sengaja", "Berencana", "Voorbedachte Raad"]
  },
  {
    id: 400,
    term: "Delictum Commissionis",
    category: "tindak-pidana",
    definition: "Delik yang dilakukan dengan perbuatan aktif",
    example: "Mencuri, membunuh, menipu",
    legalBasis: "Teori Hukum Pidana",
    englishTerm: "Crime of Commission",
    relatedTerms: ["Delik Komisi", "Active Crime"]
  },
  {
    id: 401,
    term: "Delictum Omissionis",
    category: "tindak-pidana",
    definition: "Delik yang dilakukan dengan tidak berbuat",
    example: "Tidak menolong orang dalam bahaya",
    legalBasis: "Pasal 531 KUHP",
    englishTerm: "Crime of Omission",
    relatedTerms: ["Delik Omisi", "Pembiaran"]
  },
  {
    id: 402,
    term: "Delictum Proprium",
    category: "tindak-pidana",
    definition: "Delik yang hanya dapat dilakukan orang tertentu",
    example: "Korupsi oleh pegawai negeri",
    legalBasis: "UU Tipikor",
    englishTerm: "Status Crime",
    relatedTerms: ["Delik Khusus", "Ambtsmisdrijf"]
  },
  {
    id: 403,
    term: "Delinquency",
    category: "tindak-pidana",
    definition: "Kenakalan atau kejahatan anak",
    example: "Pencurian oleh anak di bawah umur",
    legalBasis: "UU SPPA",
    englishTerm: "Juvenile Delinquency",
    relatedTerms: ["Kenakalan Anak", "Juvenile Crime"]
  },
  {
    id: 404,
    term: "Demurrer",
    category: "proses-pidana",
    definition: "Keberatan hukum terhadap dakwaan",
    example: "Keberatan bahwa dakwaan tidak memuat delik",
    legalBasis: "Pasal 156 KUHAP",
    englishTerm: "Demurrer",
    relatedTerms: ["Eksepsi", "Keberatan Hukum"]
  },
  {
    id: 405,
    term: "Denunciation",
    category: "proses-pidana",
    definition: "Pengaduan atau pelaporan kejahatan",
    example: "Melaporkan tindak pidana ke polisi",
    legalBasis: "Pasal 108 KUHAP",
    englishTerm: "Denunciation",
    relatedTerms: ["Pelaporan", "Pengaduan"]
  },
  {
    id: 406,
    term: "Deportation",
    category: "sanksi-pidana",
    definition: "Pengusiran warga negara asing",
    example: "WNA pelaku kejahatan dideportasi",
    legalBasis: "UU Keimigrasian",
    englishTerm: "Deportation",
    relatedTerms: ["Pengusiran", "Pemulangan"]
  },
  {
    id: 407,
    term: "Deposition",
    category: "pembuktian",
    definition: "Kesaksian di bawah sumpah di luar sidang",
    example: "Kesaksian tertulis saksi yang sakit",
    legalBasis: "Pasal 162 KUHAP",
    englishTerm: "Deposition",
    relatedTerms: ["Kesaksian Tertulis", "Beëdigde Verklaring"]
  },
  {
    id: 408,
    term: "Derivative Evidence",
    category: "pembuktian",
    definition: "Bukti turunan dari bukti yang tidak sah",
    example: "Bukti dari penggeledahan ilegal",
    legalBasis: "Doktrin Buah Pohon Beracun",
    englishTerm: "Fruit of Poisonous Tree",
    relatedTerms: ["Bukti Turunan", "Bukti Tidak Sah"]
  },
  {
    id: 409,
    term: "Desistance",
    category: "tindak-pidana",
    definition: "Pengunduran diri dari percobaan kejahatan",
    example: "Membatalkan niat mencuri",
    legalBasis: "Pasal 53 ayat (2) KUHP",
    englishTerm: "Voluntary Desistance",
    relatedTerms: ["Mengundurkan Diri", "Vrijwillige Terugtred"]
  },
  {
    id: 410,
    term: "Detainer",
    category: "proses-pidana",
    definition: "Perintah penahanan lanjutan",
    example: "Penahanan untuk perkara lain setelah bebas",
    legalBasis: "KUHAP",
    englishTerm: "Detainer",
    relatedTerms: ["Penahanan Lanjutan", "Hold Order"]
  },
  {
    id: 411,
    term: "Detention",
    category: "proses-pidana",
    definition: "Penahanan atau pengekangan kebebasan",
    example: "Penahanan selama 20 hari dalam penyidikan",
    legalBasis: "Pasal 20-31 KUHAP",
    englishTerm: "Detention",
    relatedTerms: ["Penahanan", "Voorlopige Hechtenis"]
  },
  {
    id: 412,
    term: "Deterrence",
    category: "asas-hukum",
    definition: "Pencegahan kejahatan melalui ancaman pidana",
    example: "Pidana berat untuk mencegah korupsi",
    legalBasis: "Teori Pemidanaan",
    englishTerm: "Deterrence",
    relatedTerms: ["Prevensi", "Pencegahan"]
  },
  {
    id: 413,
    term: "Deviant Behavior",
    category: "tindak-pidana",
    definition: "Perilaku menyimpang yang dapat menjadi kejahatan",
    example: "Perilaku antisosial yang berkembang jadi kriminal",
    legalBasis: "Kriminologi",
    englishTerm: "Deviant Behavior",
    relatedTerms: ["Perilaku Menyimpang", "Deviasi"]
  },
  {
    id: 414,
    term: "Dictum",
    category: "proses-pidana",
    definition: "Amar putusan pengadilan",
    example: "Menyatakan terdakwa bersalah dan menjatuhkan pidana",
    legalBasis: "Pasal 193-197 KUHAP",
    englishTerm: "Verdict",
    relatedTerms: ["Amar Putusan", "Vonnis"]
  },
  {
    id: 415,
    term: "Digital Forensics",
    category: "pembuktian",
    definition: "Pemeriksaan bukti digital untuk kepentingan hukum",
    example: "Analisis hard disk untuk bukti kejahatan siber",
    legalBasis: "UU ITE",
    englishTerm: "Digital Forensics",
    relatedTerms: ["Forensik Digital", "Computer Forensics"],
    trending: true
  },
  {
    id: 416,
    term: "Dilatory",
    category: "proses-pidana",
    definition: "Taktik untuk menunda proses peradilan",
    example: "Mengajukan eksepsi berulang untuk menunda",
    legalBasis: "Penyalahgunaan Hak",
    englishTerm: "Dilatory Tactics",
    relatedTerms: ["Penundaan", "Mengulur Waktu"]
  },
  {
    id: 417,
    term: "Diminished Capacity",
    category: "asas-hukum",
    definition: "Kemampuan bertanggung jawab yang berkurang",
    example: "Gangguan jiwa yang mengurangi kesalahan",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Diminished Capacity",
    relatedTerms: ["Tanggung Jawab Berkurang", "Verminderde Toerekeningsvatbaarheid"]
  },
  {
    id: 418,
    term: "Direct Evidence",
    category: "pembuktian",
    definition: "Bukti langsung tanpa perlu penafsiran",
    example: "Saksi mata yang melihat pembunuhan",
    legalBasis: "Pasal 185 KUHAP",
    englishTerm: "Direct Evidence",
    relatedTerms: ["Bukti Langsung", "Rechtstreeks Bewijs"]
  },
  {
    id: 419,
    term: "Discharge",
    category: "proses-pidana",
    definition: "Pembebasan dari tuntutan atau tahanan",
    example: "Dibebaskan karena tidak cukup bukti",
    legalBasis: "Pasal 191 KUHAP",
    englishTerm: "Discharge",
    relatedTerms: ["Pembebasan", "Ontslag"]
  },
  {
    id: 420,
    term: "Discovery",
    category: "pembuktian",
    definition: "Pengungkapan bukti sebelum persidangan",
    example: "Jaksa mengungkapkan bukti kepada pembela",
    legalBasis: "Hak Terdakwa",
    englishTerm: "Discovery",
    relatedTerms: ["Pengungkapan Bukti", "Disclosure"]
  },
  {
    id: 421,
    term: "Discretion",
    category: "proses-pidana",
    definition: "Kewenangan untuk memutuskan",
    example: "Diskresi jaksa untuk menuntut atau tidak",
    legalBasis: "Asas Oportunitas",
    englishTerm: "Discretion",
    relatedTerms: ["Diskresi", "Kebijaksanaan"]
  },
  {
    id: 422,
    term: "Dismissal",
    category: "proses-pidana",
    definition: "Penghentian atau pembatalan perkara",
    example: "Perkara dihentikan karena nebis in idem",
    legalBasis: "Pasal 76 KUHP",
    englishTerm: "Dismissal",
    relatedTerms: ["Penghentian", "Pembatalan"]
  },
  {
    id: 423,
    term: "Disorderly Conduct",
    category: "tindak-pidana",
    definition: "Perbuatan yang mengganggu ketertiban umum",
    example: "Membuat keributan di tempat umum",
    legalBasis: "Pasal 510 KUHP",
    englishTerm: "Disorderly Conduct",
    relatedTerms: ["Gangguan Ketertiban", "Openbare Orde"]
  },
  {
    id: 424,
    term: "Dissenting Opinion",
    category: "proses-pidana",
    definition: "Pendapat berbeda dari hakim minoritas",
    example: "Hakim anggota berbeda pendapat dengan ketua",
    legalBasis: "Pasal 182 ayat (6) KUHAP",
    englishTerm: "Dissenting Opinion",
    relatedTerms: ["Pendapat Berbeda", "Minority Opinion"]
  },
  {
    id: 425,
    term: "Diversion",
    category: "proses-pidana",
    definition: "Pengalihan dari proses pidana formal",
    example: "Kasus anak dialihkan ke mediasi",
    legalBasis: "UU SPPA",
    englishTerm: "Diversion",
    relatedTerms: ["Diversi", "Pengalihan"]
  },
  {
    id: 426,
    term: "DNA Evidence",
    category: "pembuktian",
    definition: "Bukti berdasarkan tes DNA",
    example: "DNA sperma untuk kasus perkosaan",
    legalBasis: "Alat Bukti Petunjuk",
    englishTerm: "DNA Evidence",
    relatedTerms: ["Bukti DNA", "Genetic Evidence"]
  },
  {
    id: 427,
    term: "Docket",
    category: "proses-pidana",
    definition: "Daftar perkara yang akan disidangkan",
    example: "Jadwal sidang pengadilan",
    legalBasis: "Administrasi Pengadilan",
    englishTerm: "Court Docket",
    relatedTerms: ["Rol Perkara", "Register"]
  },
  {
    id: 428,
    term: "Documentary Evidence",
    category: "pembuktian",
    definition: "Bukti berupa dokumen tertulis",
    example: "Kontrak palsu dalam kasus penipuan",
    legalBasis: "Pasal 187 KUHAP",
    englishTerm: "Documentary Evidence",
    relatedTerms: ["Bukti Dokumen", "Schriftelijk Bewijs"]
  },
  {
    id: 429,
    term: "Dolus Alternativus",
    category: "tindak-pidana",
    definition: "Kesengajaan terhadap salah satu dari beberapa kemungkinan",
    example: "Meracun makanan tidak peduli siapa yang makan",
    legalBasis: "Teori Kesengajaan",
    englishTerm: "Alternative Intent",
    relatedTerms: ["Kesengajaan Alternatif", "Alternatief Opzet"]
  },
  {
    id: 430,
    term: "Dolus Generalis",
    category: "tindak-pidana",
    definition: "Kesengajaan umum terhadap akibat apapun",
    example: "Melempar bom ke kerumunan",
    legalBasis: "Teori Kesengajaan",
    englishTerm: "General Intent",
    relatedTerms: ["Kesengajaan Umum", "Algemeen Opzet"]
  },
  {
    id: 431,
    term: "Dolus Indeterminatus",
    category: "tindak-pidana",
    definition: "Kesengajaan yang tidak ditujukan pada objek tertentu",
    example: "Menembak ke arah kerumunan tanpa target spesifik",
    legalBasis: "Teori Kesengajaan",
    englishTerm: "Indeterminate Intent",
    relatedTerms: ["Kesengajaan Tidak Tertentu", "Onbepaald Opzet"]
  },
  {
    id: 432,
    term: "Dolus Premeditatus",
    category: "tindak-pidana",
    definition: "Kesengajaan dengan rencana terlebih dahulu",
    example: "Merencanakan pembunuhan berhari-hari",
    legalBasis: "Pasal 340 KUHP",
    englishTerm: "Premeditated Intent",
    relatedTerms: ["Berencana", "Voorbedachte Rade"]
  },
  {
    id: 433,
    term: "Domestic Violence",
    category: "tindak-pidana",
    definition: "Kekerasan dalam rumah tangga",
    example: "Suami memukul istri",
    legalBasis: "UU PKDRT No. 23/2004",
    englishTerm: "Domestic Violence",
    relatedTerms: ["KDRT", "Kekerasan Rumah Tangga"]
  },
  {
    id: 434,
    term: "Double Criminality",
    category: "proses-pidana",
    definition: "Perbuatan yang merupakan kejahatan di dua negara",
    example: "Syarat ekstradisi harus kejahatan di kedua negara",
    legalBasis: "UU Ekstradisi",
    englishTerm: "Dual Criminality",
    relatedTerms: ["Kriminalitas Ganda", "Dubbele Strafbaarheid"]
  },
  {
    id: 435,
    term: "Droit de Suite",
    category: "pembuktian",
    definition: "Hak mengikuti barang bukti kemanapun berada",
    example: "Menyita barang curian di tangan pembeli",
    legalBasis: "Hukum Perdata/Pidana",
    englishTerm: "Right to Follow",
    relatedTerms: ["Hak Kebendaan", "Zaaksgevolg"]
  },
  {
    id: 436,
    term: "Drug Courier",
    category: "subjek-hukum",
    definition: "Kurir atau pembawa narkoba",
    example: "Kurir narkoba internasional",
    legalBasis: "UU Narkotika",
    englishTerm: "Drug Mule",
    relatedTerms: ["Kurir Narkoba", "Drug Mule"]
  },
  {
    id: 437,
    term: "Due Process",
    category: "asas-hukum",
    definition: "Proses hukum yang adil dan benar",
    example: "Hak untuk didampingi pengacara",
    legalBasis: "KUHAP",
    englishTerm: "Due Process",
    relatedTerms: ["Proses Hukum Yang Adil", "Fair Trial"]
  },
  {
    id: 438,
    term: "Duress",
    category: "asas-hukum",
    definition: "Paksaan yang menghilangkan kesalahan",
    example: "Dipaksa melakukan kejahatan dengan ancaman mati",
    legalBasis: "Pasal 48 KUHP",
    englishTerm: "Duress",
    relatedTerms: ["Paksaan", "Dwang"]
  },
  {
    id: 439,
    term: "Dying Declaration",
    category: "pembuktian",
    definition: "Pernyataan menjelang ajal",
    example: "Korban menyebut pembunuhnya sebelum meninggal",
    legalBasis: "Alat Bukti Petunjuk",
    englishTerm: "Dying Declaration",
    relatedTerms: ["Pernyataan Sekarat", "Sterfbedverklaring"]
  },
  {
    id: 440,
    term: "Dysfunction",
    category: "asas-hukum",
    definition: "Ketidakmampuan menjalankan fungsi normal",
    example: "Disfungsi mental yang mempengaruhi kesalahan",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Dysfunction",
    relatedTerms: ["Gangguan Fungsi", "Disfungsi"]
  },

  // E - Lanjutan (441-480)
  {
    id: 441,
    term: "Ecclesiastical Crime",
    category: "tindak-pidana",
    definition: "Kejahatan terhadap agama atau lembaga keagamaan",
    example: "Mencuri harta benda tempat ibadah",
    legalBasis: "Pasal 156a KUHP",
    englishTerm: "Religious Crime",
    relatedTerms: ["Kejahatan Agama", "Godslastering"]
  },
  {
    id: 442,
    term: "Economic Crime",
    category: "pidana-khusus",
    definition: "Kejahatan di bidang ekonomi",
    example: "Manipulasi pasar, kartel ilegal",
    legalBasis: "UU No. 7/1955",
    englishTerm: "Economic Crime",
    relatedTerms: ["Tindak Pidana Ekonomi", "White Collar Crime"]
  },
  {
    id: 443,
    term: "Eendaadse Samenloop",
    category: "tindak-pidana",
    definition: "Perbarengan peraturan (satu perbuatan melanggar beberapa pasal)",
    example: "Menabrak mati melanggar kelalaian dan lalu lintas",
    legalBasis: "Pasal 63 KUHP",
    englishTerm: "Ideal Concurrence",
    relatedTerms: ["Concursus Idealis", "Perbarengan Peraturan"]
  },
  {
    id: 444,
    term: "Eigenrichting",
    category: "tindak-pidana",
    definition: "Main hakim sendiri",
    example: "Massa membakar maling",
    legalBasis: "Pasal 170 KUHP",
    englishTerm: "Vigilante Justice",
    relatedTerms: ["Main Hakim Sendiri", "Lynch Law"]
  },
  {
    id: 445,
    term: "Electronic Surveillance",
    category: "penyidikan",
    definition: "Pengawasan elektronik dalam penyidikan",
    example: "Penyadapan telepon tersangka korupsi",
    legalBasis: "UU KPK, UU ITE",
    englishTerm: "Electronic Surveillance",
    relatedTerms: ["Penyadapan", "Intersepsi"]
  },
  {
    id: 446,
    term: "Embezzlement",
    category: "tindak-pidana",
    definition: "Penggelapan oleh orang yang dipercaya",
    example: "Bendahara menggelapkan uang organisasi",
    legalBasis: "Pasal 372, 415 KUHP",
    englishTerm: "Embezzlement",
    relatedTerms: ["Penggelapan", "Verduistering"]
  },
  {
    id: 447,
    term: "Emergency Defense",
    category: "asas-hukum",
    definition: "Pembelaan dalam keadaan darurat",
    example: "Membela diri dari serangan mendadak",
    legalBasis: "Pasal 49 KUHP",
    englishTerm: "Emergency Defense",
    relatedTerms: ["Pembelaan Darurat", "Noodweer"]
  },
  {
    id: 448,
    term: "En Flagrant Délit",
    category: "penyidikan",
    definition: "Tertangkap tangan (istilah Perancis)",
    example: "Tertangkap sedang mencuri",
    legalBasis: "Pasal 1 angka 19 KUHAP",
    englishTerm: "In Flagrante Delicto",
    relatedTerms: ["Tertangkap Tangan", "Red-Handed"]
  },
  {
    id: 449,
    term: "Entrapment",
    category: "penyidikan",
    definition: "Jebakan yang dilakukan aparat",
    example: "Polisi menyamar jadi pembeli narkoba",
    legalBasis: "Teknik Penyidikan",
    englishTerm: "Entrapment",
    relatedTerms: ["Jebakan", "Undercover Operation"]
  },
  // Lanjutan dari id 449...
  {
    id: 450,
    term: "Eksaminasi",
    category: "proses-pidana",
    definition: "Pemeriksaan ulang terhadap putusan pengadilan oleh masyarakat atau lembaga independen",
    example: "ICW melakukan eksaminasi putusan kasus korupsi",
    legalBasis: "Hak Masyarakat",
    englishTerm: "Public Examination",
    relatedTerms: ["Pemeriksaan Publik", "Kontrol Sosial"]
  },
  {
    id: 451,
    term: "Ekstradisi Sederhana",
    category: "proses-pidana",
    definition: "Penyerahan pelaku kejahatan berdasarkan asas resiprositas tanpa perjanjian ekstradisi",
    example: "Penyerahan buronan antara negara ASEAN",
    legalBasis: "UU No. 1/1979",
    englishTerm: "Simplified Extradition",
    relatedTerms: ["Ekstradisi", "Penyerahan Sederhana"]
  },
  {
    id: 452,
    term: "Embargo",
    category: "pidana-khusus",
    definition: "Larangan perdagangan sebagai sanksi pidana ekonomi",
    example: "Embargo senjata ke negara konflik",
    legalBasis: "UU Pidana Ekonomi",
    englishTerm: "Embargo",
    relatedTerms: ["Sanksi Ekonomi", "Blokade"]
  },
  {
    id: 453,
    term: "Emergency Call",
    category: "penyidikan",
    definition: "Panggilan darurat untuk laporan tindak pidana",
    example: "Call center 110 untuk laporan kejahatan",
    legalBasis: "Peraturan Kapolri",
    englishTerm: "Emergency Call",
    relatedTerms: ["Panggilan Darurat", "Hotline"]
  },
  {
    id: 454,
    term: "Emolumen",
    category: "pidana-khusus",
    definition: "Keuntungan tambahan di luar gaji yang dapat menjadi gratifikasi ilegal",
    example: "Pejabat menerima fasilitas mewah dari rekanan",
    legalBasis: "UU Tipikor",
    englishTerm: "Emolument",
    relatedTerms: ["Gratifikasi", "Keuntungan Jabatan"]
  },
  {
    id: 455,
    term: "Enforcement",
    category: "proses-pidana",
    definition: "Penegakan hukum pidana",
    example: "Law enforcement terhadap kejahatan narkoba",
    legalBasis: "KUHAP",
    englishTerm: "Enforcement",
    relatedTerms: ["Penegakan Hukum", "Implementasi"]
  },
  {
    id: 456,
    term: "Entrapment Defense",
    category: "pembuktian",
    definition: "Pembelaan bahwa terdakwa dijebak untuk melakukan kejahatan",
    example: "Terdakwa mengklaim dijebak polisi untuk membeli narkoba",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Entrapment Defense",
    relatedTerms: ["Pembelaan Jebakan", "Provokasi Aparat"]
  },
  {
    id: 457,
    term: "Error Facti",
    category: "tindak-pidana",
    definition: "Kekeliruan tentang fakta yang menghilangkan kesengajaan",
    example: "Mengambil tas orang lain karena mengira milik sendiri",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Mistake of Fact",
    relatedTerms: ["Kekeliruan Fakta", "Kekhilafan"]
  },
  {
    id: 458,
    term: "Eskalasi Pidana",
    category: "sanksi-pidana",
    definition: "Peningkatan ancaman pidana karena keadaan tertentu",
    example: "Pidana diperberat karena korban anak",
    legalBasis: "KUHP",
    englishTerm: "Penalty Escalation",
    relatedTerms: ["Pemberatan Pidana", "Peningkatan Sanksi"]
  },
  {
    id: 459,
    term: "Evasion",
    category: "tindak-pidana",
    definition: "Penghindaran kewajiban hukum secara melawan hukum",
    example: "Tax evasion atau penghindaran pajak ilegal",
    legalBasis: "UU Perpajakan",
    englishTerm: "Evasion",
    relatedTerms: ["Penghindaran", "Penggelapan Pajak"]
  },
  {
    id: 460,
    term: "Evidence Based",
    category: "pembuktian",
    definition: "Berdasarkan bukti yang dapat diverifikasi",
    example: "Penuntutan evidence based dengan bukti forensik",
    legalBasis: "KUHAP",
    englishTerm: "Evidence Based",
    relatedTerms: ["Berbasis Bukti", "Pembuktian Ilmiah"]
  },
  {
    id: 461,
    term: "Ex Aequo et Bono",
    category: "peradilan",
    definition: "Putusan berdasarkan keadilan dan kepatutan",
    example: "Hakim memutus berdasarkan rasa keadilan masyarakat",
    legalBasis: "Asas Peradilan",
    englishTerm: "Ex Aequo et Bono",
    relatedTerms: ["Keadilan", "Kepatutan"]
  },
  {
    id: 462,
    term: "Ex Gratia",
    category: "sanksi-pidana",
    definition: "Pemberian tanpa kewajiban hukum, atas dasar kemurahan",
    example: "Kompensasi ex gratia untuk korban salah tangkap",
    legalBasis: "Kebijakan Pemerintah",
    englishTerm: "Ex Gratia",
    relatedTerms: ["Kemurahan", "Tanpa Kewajiban"]
  },
  {
    id: 463,
    term: "Ex Nunc",
    category: "proses-pidana",
    definition: "Berlaku mulai saat ini ke depan",
    example: "Putusan pembatalan berlaku ex nunc",
    legalBasis: "Asas Hukum",
    englishTerm: "From Now On",
    relatedTerms: ["Mulai Sekarang", "Prospektif"]
  },
  {
    id: 464,
    term: "Ex Post Facto",
    category: "asas-hukum",
    definition: "Hukum yang berlaku surut, dilarang dalam pidana",
    example: "Larangan menerapkan UU baru untuk perbuatan lama",
    legalBasis: "Pasal 1 KUHP",
    englishTerm: "Ex Post Facto",
    relatedTerms: ["Retroaktif", "Berlaku Surut"]
  },
  {
    id: 465,
    term: "Ex Tunc",
    category: "proses-pidana",
    definition: "Berlaku surut sejak awal",
    example: "Pembatalan putusan berlaku ex tunc",
    legalBasis: "Asas Hukum",
    englishTerm: "From the Beginning",
    relatedTerms: ["Sejak Awal", "Retroaktif"]
  },
  {
    id: 466,
    term: "Exceptio Plurium",
    category: "proses-pidana",
    definition: "Eksepsi tentang surat dakwaan yang memuat lebih dari satu perbuatan",
    example: "Eksepsi dakwaan kumulatif yang tidak jelas",
    legalBasis: "KUHAP",
    englishTerm: "Multiple Charges Exception",
    relatedTerms: ["Eksepsi Dakwaan", "Keberatan Formal"]
  },
  {
    id: 467,
    term: "Exceptio Temporis",
    category: "proses-pidana",
    definition: "Eksepsi berdasarkan waktu atau daluwarsa",
    example: "Eksepsi karena perkara sudah daluwarsa",
    legalBasis: "Pasal 78 KUHP",
    englishTerm: "Time Exception",
    relatedTerms: ["Eksepsi Waktu", "Daluwarsa"]
  },
  {
    id: 468,
    term: "Exclusionary Rule",
    category: "pembuktian",
    definition: "Aturan yang mengecualikan bukti yang diperoleh secara tidak sah",
    example: "Bukti dari penyadapan ilegal tidak dapat digunakan",
    legalBasis: "Doktrin Pembuktian",
    englishTerm: "Exclusionary Rule",
    relatedTerms: ["Pengecualian Bukti", "Bukti Tidak Sah"]
  },
  {
    id: 469,
    term: "Exculpatory Evidence",
    category: "pembuktian",
    definition: "Bukti yang meringankan atau membebaskan terdakwa",
    example: "CCTV yang menunjukkan terdakwa tidak di TKP",
    legalBasis: "KUHAP",
    englishTerm: "Exculpatory Evidence",
    relatedTerms: ["Bukti Meringankan", "A Decharge"]
  },
  {
    id: 470,
    term: "Exhaustion Principle",
    category: "upaya-hukum",
    definition: "Prinsip menghabiskan upaya hukum biasa sebelum luar biasa",
    example: "Harus banding dulu sebelum kasasi",
    legalBasis: "KUHAP",
    englishTerm: "Exhaustion Principle",
    relatedTerms: ["Prinsip Exhaustif", "Upaya Hukum Bertahap"]
  },
  {
    id: 471,
    term: "Expedited Trial",
    category: "proses-pidana",
    definition: "Persidangan cepat untuk perkara tertentu",
    example: "Sidang cepat untuk tindak pidana ringan",
    legalBasis: "Perma No. 2/2012",
    englishTerm: "Expedited Trial",
    relatedTerms: ["Persidangan Cepat", "Acara Singkat"]
  },
  {
    id: 472,
    term: "Expert Opinion",
    category: "pembuktian",
    definition: "Pendapat ahli sebagai alat bukti",
    example: "Pendapat ahli forensik tentang sebab kematian",
    legalBasis: "Pasal 186 KUHAP",
    englishTerm: "Expert Opinion",
    relatedTerms: ["Keterangan Ahli", "Pendapat Pakar"]
  },
  {
    id: 473,
    term: "Explicit Consent",
    category: "tindak-pidana",
    definition: "Persetujuan yang dinyatakan secara tegas",
    example: "Persetujuan tertulis untuk tindakan medis",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Explicit Consent",
    relatedTerms: ["Persetujuan Tegas", "Consent"]
  },
  {
    id: 474,
    term: "Eksplorasi Bukti",
    category: "pembuktian",
    definition: "Pencarian dan pengumpulan bukti secara mendalam",
    example: "Eksplorasi bukti digital dalam kasus cyber",
    legalBasis: "KUHAP",
    englishTerm: "Evidence Exploration",
    relatedTerms: ["Pencarian Bukti", "Investigasi"]
  },
  {
    id: 475,
    term: "Eksploitasi Anak",
    category: "tindak-pidana",
    definition: "Pemanfaatan anak untuk keuntungan ekonomi atau seksual",
    example: "Mempekerjakan anak di bawah umur",
    legalBasis: "UU Perlindungan Anak",
    englishTerm: "Child Exploitation",
    relatedTerms: ["Pemanfaatan Anak", "Child Abuse"],
    trending: true
  },
  {
    id: 476,
    term: "Eksploitasi Seksual",
    category: "tindak-pidana",
    definition: "Pemanfaatan seseorang untuk tujuan seksual dengan cara melawan hukum",
    example: "Prostitusi paksa, pornografi anak",
    legalBasis: "UU TPKS, UU Perlindungan Anak",
    englishTerm: "Sexual Exploitation",
    relatedTerms: ["Pelecehan Seksual", "Kekerasan Seksual"]
  },
  {
    id: 477,
    term: "Ekstremisme",
    category: "tindak-pidana",
    definition: "Paham atau tindakan yang menggunakan cara-cara kekerasan untuk mencapai tujuan",
    example: "Kelompok ekstremis melakukan teror",
    legalBasis: "UU Terorisme",
    englishTerm: "Extremism",
    relatedTerms: ["Radikalisme", "Terorisme"]
  },
  {
    id: 478,
    term: "Electronic Evidence",
    category: "pembuktian",
    definition: "Bukti elektronik dalam perkara pidana",
    example: "Email, chat, data komputer sebagai bukti",
    legalBasis: "UU ITE",
    englishTerm: "Electronic Evidence",
    relatedTerms: ["Bukti Digital", "Cyber Evidence"]
  },
  {
    id: 479,
    term: "Embezzlement",
    category: "tindak-pidana",
    definition: "Penggelapan dalam jabatan",
    example: "Bendahara menggelapkan uang kas",
    legalBasis: "Pasal 415 KUHP",
    englishTerm: "Embezzlement",
    relatedTerms: ["Penggelapan Jabatan", "Korupsi"]
  },
  {
    id: 480,
    term: "Emergency Detention",
    category: "proses-pidana",
    definition: "Penahanan darurat untuk mencegah pelarian atau perusakan bukti",
    example: "Penahanan segera setelah OTT",
    legalBasis: "KUHAP",
    englishTerm: "Emergency Detention",
    relatedTerms: ["Penahanan Darurat", "Urgent Detention"]
  },
  {
    id: 481,
    term: "Empowerment",
    category: "sanksi-pidana",
    definition: "Pemberdayaan narapidana melalui program rehabilitasi",
    example: "Program keterampilan untuk warga binaan",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Empowerment",
    relatedTerms: ["Pemberdayaan", "Rehabilitasi"]
  },
  {
    id: 482,
    term: "En Banc",
    category: "peradilan",
    definition: "Sidang dengan seluruh hakim pengadilan",
    example: "Sidang pleno Mahkamah Konstitusi",
    legalBasis: "UU MK",
    englishTerm: "En Banc",
    relatedTerms: ["Sidang Pleno", "Full Court"]
  },
  {
    id: 483,
    term: "Endangerment",
    category: "tindak-pidana",
    definition: "Membahayakan keselamatan orang lain",
    example: "Mengemudi ugal-ugalan membahayakan pengguna jalan",
    legalBasis: "KUHP",
    englishTerm: "Endangerment",
    relatedTerms: ["Membahayakan", "Ancaman Bahaya"]
  },
  {
    id: 484,
    term: "Enhanced Penalty",
    category: "sanksi-pidana",
    definition: "Pidana yang diperberat karena keadaan tertentu",
    example: "Pemberatan untuk residivis",
    legalBasis: "Pasal 486-488 KUHP",
    englishTerm: "Enhanced Penalty",
    relatedTerms: ["Pidana Diperberat", "Pemberatan"]
  },
  {
    id: 485,
    term: "Entitlement",
    category: "subjek-hukum",
    definition: "Hak yang melekat pada subjek hukum",
    example: "Hak tersangka untuk didampingi pengacara",
    legalBasis: "KUHAP",
    englishTerm: "Entitlement",
    relatedTerms: ["Hak", "Kewenangan"]
  },
  {
    id: 486,
    term: "Environmental Crime",
    category: "pidana-khusus",
    definition: "Tindak pidana lingkungan hidup",
    example: "Pembuangan limbah B3 ilegal",
    legalBasis: "UU No. 32/2009",
    englishTerm: "Environmental Crime",
    relatedTerms: ["Pidana Lingkungan", "Ecocide"]
  },
  {
    id: 487,
    term: "Equality Before the Law",
    category: "asas-hukum",
    definition: "Persamaan di hadapan hukum",
    example: "Pejabat dan rakyat biasa sama di mata hukum",
    legalBasis: "Pasal 27 UUD 1945",
    englishTerm: "Equality Before the Law",
    relatedTerms: ["Persamaan Hukum", "Non-diskriminasi"]
  },
  {
    id: 488,
    term: "Equitable Defense",
    category: "pembuktian",
    definition: "Pembelaan berdasarkan keadilan dan kepatutan",
    example: "Pembelaan karena motif mulia",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Equitable Defense",
    relatedTerms: ["Pembelaan Adil", "Kepatutan"]
  },
  {
    id: 489,
    term: "Erga Omnes",
    category: "asas-hukum",
    definition: "Berlaku terhadap semua orang",
    example: "Putusan MK berlaku erga omnes",
    legalBasis: "UU MK",
    englishTerm: "Erga Omnes",
    relatedTerms: ["Berlaku Umum", "Universal"]
  },
  {
    id: 490,
    term: "Error in Objecto",
    category: "tindak-pidana",
    definition: "Kekeliruan mengenai objek tindak pidana",
    example: "Mencuri barang yang ternyata milik sendiri",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Error in Object",
    relatedTerms: ["Kekeliruan Objek", "Mistake"]
  },
  {
    id: 491,
    term: "Espionage",
    category: "tindak-pidana",
    definition: "Mata-mata atau spionase terhadap negara",
    example: "Mencuri rahasia negara untuk negara asing",
    legalBasis: "Pasal 113-114 KUHP",
    englishTerm: "Espionage",
    relatedTerms: ["Mata-mata", "Spionase"]
  },
  {
    id: 492,
    term: "Essential Elements",
    category: "tindak-pidana",
    definition: "Unsur-unsur pokok tindak pidana",
    example: "Unsur melawan hukum dalam pencurian",
    legalBasis: "KUHP",
    englishTerm: "Essential Elements",
    relatedTerms: ["Unsur Pokok", "Bestanddelen"]
  },
  {
    id: 493,
    term: "Estoppel",
    category: "proses-pidana",
    definition: "Larangan mengingkari pernyataan atau tindakan sendiri",
    example: "Tidak dapat menarik pengakuan yang sudah diberikan",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Estoppel",
    relatedTerms: ["Larangan Ingkar", "Konsistensi"]
  },
  {
    id: 494,
    term: "Euthanasia",
    category: "tindak-pidana",
    definition: "Mengakhiri hidup seseorang atas permintaannya karena penderitaan",
    example: "Dokter melakukan suntik mati atas permintaan pasien",
    legalBasis: "Pasal 344 KUHP",
    englishTerm: "Euthanasia",
    relatedTerms: ["Mercy Killing", "Pembunuhan Kasihan"]
  },
  {
    id: 495,
    term: "Evidentiary Hearing",
    category: "proses-pidana",
    definition: "Sidang pemeriksaan bukti",
    example: "Sidang khusus untuk memeriksa bukti baru",
    legalBasis: "KUHAP",
    englishTerm: "Evidentiary Hearing",
    relatedTerms: ["Sidang Pembuktian", "Pemeriksaan Bukti"]
  },
  {
    id: 496,
    term: "Evidentiary Privilege",
    category: "pembuktian",
    definition: "Hak untuk tidak memberikan bukti tertentu",
    example: "Hak dokter tidak membuka rahasia pasien",
    legalBasis: "Pasal 170 KUHAP",
    englishTerm: "Evidentiary Privilege",
    relatedTerms: ["Hak Istimewa", "Rahasia Jabatan"]
  },
  {
    id: 497,
    term: "Ex Delicto",
    category: "proses-pidana",
    definition: "Timbul dari tindak pidana",
    example: "Gugatan perdata ex delicto dari tindak pidana",
    legalBasis: "Pasal 98 KUHAP",
    englishTerm: "Ex Delicto",
    relatedTerms: ["Dari Delik", "Akibat Pidana"]
  },
  {
    id: 498,
    term: "Ex Improviso",
    category: "proses-pidana",
    definition: "Secara mendadak atau tidak terduga",
    example: "Saksi memberikan keterangan baru ex improviso",
    legalBasis: "KUHAP",
    englishTerm: "Ex Improviso",
    relatedTerms: ["Mendadak", "Tiba-tiba"]
  },
  {
    id: 499,
    term: "Ex Lege",
    category: "asas-hukum",
    definition: "Berdasarkan hukum atau demi hukum",
    example: "Kewenangan yang timbul ex lege",
    legalBasis: "Asas Hukum",
    englishTerm: "By Law",
    relatedTerms: ["Demi Hukum", "Berdasar UU"]
  },
  {
    id: 500,
    term: "Ex Parte",
    category: "proses-pidana",
    definition: "Dilakukan oleh atau untuk satu pihak saja",
    example: "Permohonan ex parte untuk penahanan",
    legalBasis: "KUHAP",
    englishTerm: "Ex Parte",
    relatedTerms: ["Sepihak", "Satu Pihak"]
  },

  // F - Lanjutan (501-550)
  {
    id: 501,
    term: "Fabricated Evidence",
    category: "pembuktian",
    definition: "Bukti yang dibuat-buat atau dipalsukan",
    example: "Membuat alibi palsu dengan saksi bohong",
    legalBasis: "Pasal 242 KUHP",
    englishTerm: "Fabricated Evidence",
    relatedTerms: ["Bukti Palsu", "Rekayasa Bukti"]
  },
  {
    id: 502,
    term: "Facilitation Payment",
    category: "pidana-khusus",
    definition: "Pembayaran untuk mempercepat layanan yang menjadi hak",
    example: "Uang pelicin untuk mempercepat pembuatan SIM",
    legalBasis: "UU Tipikor",
    englishTerm: "Facilitation Payment",
    relatedTerms: ["Uang Pelicin", "Suap Kecil"]
  },
  {
    id: 503,
    term: "Fact Finding",
    category: "penyidikan",
    definition: "Pencarian fakta dalam investigasi",
    example: "Tim fact finding kasus pelanggaran HAM",
    legalBasis: "UU HAM",
    englishTerm: "Fact Finding",
    relatedTerms: ["Pencarian Fakta", "Investigasi"]
  },
  {
    id: 504,
    term: "Failure to Appear",
    category: "proses-pidana",
    definition: "Tidak hadir dalam persidangan tanpa alasan sah",
    example: "Terdakwa tidak hadir setelah dipanggil sah",
    legalBasis: "Pasal 154, 196 KUHAP",
    englishTerm: "Failure to Appear",
    relatedTerms: ["Tidak Hadir", "Mangkir"]
  },
  {
    id: 505,
    term: "Fair Trial",
    category: "proses-pidana",
    definition: "Peradilan yang adil dan tidak memihak",
    example: "Hak terdakwa atas fair trial",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Fair Trial",
    relatedTerms: ["Peradilan Adil", "Due Process"]
  },
  {
    id: 506,
    term: "False Accusation",
    category: "tindak-pidana",
    definition: "Tuduhan palsu terhadap seseorang",
    example: "Menuduh orang mencuri padahal tidak",
    legalBasis: "Pasal 311 KUHP",
    englishTerm: "False Accusation",
    relatedTerms: ["Tuduhan Palsu", "Fitnah"]
  },
  {
    id: 507,
    term: "False Imprisonment",
    category: "tindak-pidana",
    definition: "Perampasan kemerdekaan secara melawan hukum",
    example: "Mengurung orang tanpa dasar hukum",
    legalBasis: "Pasal 333 KUHP",
    englishTerm: "False Imprisonment",
    relatedTerms: ["Perampasan Kemerdekaan", "Pengurungan Ilegal"]
  },
  {
    id: 508,
    term: "False Pretenses",
    category: "tindak-pidana",
    definition: "Penipuan dengan berpura-pura memiliki sesuatu",
    example: "Menjual tanah yang bukan miliknya",
    legalBasis: "Pasal 378 KUHP",
    englishTerm: "False Pretenses",
    relatedTerms: ["Kepura-puraan", "Penipuan"]
  },
  {
    id: 509,
    term: "Family Court",
    category: "peradilan",
    definition: "Pengadilan khusus untuk perkara keluarga termasuk anak",
    example: "Sidang anak di pengadilan keluarga",
    legalBasis: "UU SPPA",
    englishTerm: "Family Court",
    relatedTerms: ["Pengadilan Keluarga", "Juvenile Court"]
  },
  {
    id: 510,
    term: "Fatwa Hukum",
    category: "asas-hukum",
    definition: "Pendapat hukum dari ahli yang dapat menjadi pertimbangan",
    example: "Fatwa MUI tentang tindak pidana tertentu",
    legalBasis: "Sumber Hukum",
    englishTerm: "Legal Opinion",
    relatedTerms: ["Pendapat Hukum", "Legal Fatwa"]
  },
  {
    id: 511,
    term: "Federal Crime",
    category: "tindak-pidana",
    definition: "Kejahatan tingkat federal/nasional",
    example: "Terorisme sebagai kejahatan federal",
    legalBasis: "UU Terorisme",
    englishTerm: "Federal Crime",
    relatedTerms: ["Kejahatan Nasional", "Pidana Federal"]
  },
  {
    id: 512,
    term: "Felony Murder",
    category: "tindak-pidana",
    definition: "Pembunuhan yang terjadi saat melakukan kejahatan lain",
    example: "Korban meninggal saat perampokan",
    legalBasis: "Pasal 365 ayat (4) KUHP",
    englishTerm: "Felony Murder",
    relatedTerms: ["Pembunuhan Penyertaan", "Murder"]
  },
  {
    id: 513,
    term: "Fencing",
    category: "tindak-pidana",
    definition: "Penadahan atau menerima barang curian",
    example: "Membeli HP yang diketahui hasil curian",
    legalBasis: "Pasal 480 KUHP",
    englishTerm: "Fencing",
    relatedTerms: ["Penadahan", "Heling"]
  },
  {
    id: 514,
    term: "Fiduciary Duty",
    category: "pidana-khusus",
    definition: "Kewajiban kepercayaan dalam jabatan",
    example: "Direktur melanggar fiduciary duty",
    legalBasis: "UU PT",
    englishTerm: "Fiduciary Duty",
    relatedTerms: ["Kewajiban Fidusia", "Amanah Jabatan"]
  },
  {
    id: 515,
    term: "Field Investigation",
    category: "penyidikan",
    definition: "Penyelidikan di lapangan/TKP",
    example: "Olah TKP oleh tim forensik",
    legalBasis: "KUHAP",
    englishTerm: "Field Investigation",
    relatedTerms: ["Investigasi Lapangan", "Olah TKP"]
  },
  {
    id: 516,
    term: "Final Judgment",
    category: "proses-pidana",
    definition: "Putusan akhir yang berkekuatan hukum tetap",
    example: "Putusan kasasi yang tidak ada upaya hukum lagi",
    legalBasis: "KUHAP",
    englishTerm: "Final Judgment",
    relatedTerms: ["Putusan Akhir", "Inkracht"]
  },
  {
    id: 517,
    term: "Financial Crime",
    category: "pidana-khusus",
    definition: "Kejahatan di bidang keuangan",
    example: "Penggelapan dana nasabah bank",
    legalBasis: "UU Perbankan",
    englishTerm: "Financial Crime",
    relatedTerms: ["Kejahatan Keuangan", "White Collar Crime"]
  },
  {
    id: 518,
    term: "Fingerprint Evidence",
    category: "pembuktian",
    definition: "Bukti sidik jari dalam pembuktian",
    example: "Sidik jari pelaku di senjata",
    legalBasis: "KUHAP",
    englishTerm: "Fingerprint Evidence",
    relatedTerms: ["Bukti Sidik Jari", "Daktiloskopi"]
  },
  {
    id: 519,
    term: "Firearm Offense",
    category: "tindak-pidana",
    definition: "Tindak pidana terkait senjata api",
    example: "Memiliki senjata api ilegal",
    legalBasis: "UU Darurat No. 12/1951",
    englishTerm: "Firearm Offense",
    relatedTerms: ["Pidana Senjata Api", "Illegal Weapon"]
  },
  {
    id: 520,
    term: "First Information Report",
    category: "penyidikan",
    definition: "Laporan informasi pertama tentang tindak pidana",
    example: "FIR dari saksi mata kejadian",
    legalBasis: "KUHAP",
    englishTerm: "First Information Report",
    relatedTerms: ["Laporan Pertama", "FIR"]
  },
  {
    id: 521,
    term: "First Offender",
    category: "subjek-hukum",
    definition: "Pelaku yang baru pertama kali melakukan tindak pidana",
    example: "Keringanan untuk first offender",
    legalBasis: "KUHP",
    englishTerm: "First Offender",
    relatedTerms: ["Pelaku Pertama", "Non-Residivis"]
  },
  {
    id: 522,
    term: "Fishing Expedition",
    category: "penyidikan",
    definition: "Pencarian bukti tanpa dasar yang jelas",
    example: "Penyidikan tanpa bukti permulaan yang cukup",
    legalBasis: "KUHAP",
    englishTerm: "Fishing Expedition",
    relatedTerms: ["Pencarian Membabi Buta", "Investigasi Spekulatif"]
  },
  {
    id: 523,
    term: "Flagrant Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang sangat jelas dan mencolok",
    example: "Korupsi terang-terangan tanpa malu",
    legalBasis: "KUHP",
    englishTerm: "Flagrant Crime",
    relatedTerms: ["Kejahatan Mencolok", "Blatant Crime"]
  },
  {
    id: 524,
    term: "Flight Risk",
    category: "proses-pidana",
    definition: "Risiko melarikan diri dari proses hukum",
    example: "Penahanan karena tersangka flight risk",
    legalBasis: "Pasal 21 KUHAP",
    englishTerm: "Flight Risk",
    relatedTerms: ["Risiko Kabur", "Potensi Melarikan Diri"]
  },
  {
    id: 525,
    term: "Floating Charge",
    category: "pidana-khusus",
    definition: "Jaminan mengambang dalam tindak pidana ekonomi",
    example: "Jaminan atas aset perusahaan yang berubah",
    legalBasis: "UU Jaminan Fidusia",
    englishTerm: "Floating Charge",
    relatedTerms: ["Jaminan Mengambang", "Security Interest"]
  },
  {
    id: 526,
    term: "Forensic Accounting",
    category: "pembuktian",
    definition: "Akuntansi forensik untuk mengungkap kejahatan keuangan",
    example: "Audit forensik kasus korupsi APBD",
    legalBasis: "UU Tipikor",
    englishTerm: "Forensic Accounting",
    relatedTerms: ["Akuntansi Forensik", "Audit Investigatif"]
  },
  {
    id: 527,
    term: "Forensic Evidence",
    category: "pembuktian",
    definition: "Bukti yang diperoleh melalui metode forensik",
    example: "DNA, sidik jari, balistik",
    legalBasis: "KUHAP",
    englishTerm: "Forensic Evidence",
    relatedTerms: ["Bukti Forensik", "Scientific Evidence"]
  },
  {
    id: 528,
    term: "Forensic Pathology",
    category: "pembuktian",
    definition: "Patologi forensik untuk menentukan sebab kematian",
    example: "Autopsi korban pembunuhan",
    legalBasis: "KUHAP",
    englishTerm: "Forensic Pathology",
    relatedTerms: ["Patologi Forensik", "Ilmu Kedokteran Forensik"]
  },
  {
    id: 529,
    term: "Forfeiture",
    category: "sanksi-pidana",
    definition: "Perampasan aset hasil kejahatan",
    example: "Forfeiture aset koruptor",
    legalBasis: "UU Tipikor",
    englishTerm: "Forfeiture",
    relatedTerms: ["Perampasan", "Asset Forfeiture"]
  },
  {
    id: 530,
    term: "Forgery",
    category: "tindak-pidana",
    definition: "Pemalsuan dokumen atau tanda tangan",
    example: "Memalsukan tanda tangan di cek",
    legalBasis: "Pasal 263 KUHP",
    englishTerm: "Forgery",
    relatedTerms: ["Pemalsuan", "Falsification"]
  },
  {
    id: 531,
    term: "Forum Shopping",
    category: "proses-pidana",
    definition: "Mencari pengadilan yang menguntungkan",
    example: "Memilih yurisdiksi dengan hukuman ringan",
    legalBasis: "Asas Hukum",
    englishTerm: "Forum Shopping",
    relatedTerms: ["Pilih Pengadilan", "Jurisdiction Shopping"]
  },
  {
    id: 532,
    term: "Foul Play",
    category: "tindak-pidana",
    definition: "Perbuatan jahat atau kecurangan",
    example: "Dugaan foul play dalam kematian mendadak",
    legalBasis: "Istilah Kriminalistik",
    englishTerm: "Foul Play",
    relatedTerms: ["Perbuatan Jahat", "Kecurangan"]
  },
  {
    id: 533,
    term: "Fraudulent Misrepresentation",
    category: "tindak-pidana",
    definition: "Memberikan informasi palsu untuk menipu",
    example: "Menyatakan barang asli padahal palsu",
    legalBasis: "Pasal 378 KUHP",
    englishTerm: "Fraudulent Misrepresentation",
    relatedTerms: ["Penipuan", "Keterangan Palsu"]
  },
  {
    id: 534,
    term: "Freedom of Information",
    category: "asas-hukum",
    definition: "Kebebasan memperoleh informasi publik",
    example: "Meminta data kasus korupsi ke KPK",
    legalBasis: "UU KIP",
    englishTerm: "Freedom of Information",
    relatedTerms: ["Kebebasan Informasi", "Transparansi"]
  },
  {
    id: 535,
    term: "Freezing Order",
    category: "proses-pidana",
    definition: "Perintah pembekuan aset",
    example: "Pembekuan rekening tersangka korupsi",
    legalBasis: "UU Tipikor, UU TPPU",
    englishTerm: "Freezing Order",
    relatedTerms: ["Pemblokiran", "Asset Freeze"]
  },
  {
    id: 536,
    term: "Fresh Pursuit",
    category: "penyidikan",
    definition: "Pengejaran langsung terhadap pelaku",
    example: "Polisi mengejar pelaku dari TKP",
    legalBasis: "KUHAP",
    englishTerm: "Fresh Pursuit",
    relatedTerms: ["Pengejaran Langsung", "Hot Pursuit"]
  },
  {
    id: 537,
    term: "Frivolous Claim",
    category: "proses-pidana",
    definition: "Tuntutan atau klaim yang tidak berdasar",
    example: "Laporan pidana yang dibuat-buat",
    legalBasis: "Pasal 220 KUHP",
    englishTerm: "Frivolous Claim",
    relatedTerms: ["Klaim Tidak Berdasar", "Laporan Palsu"]
  },
  {
    id: 538,
    term: "Fruit of the Poisonous Tree",
    category: "pembuktian",
    definition: "Bukti yang diperoleh dari bukti ilegal",
    example: "Bukti dari penyadapan ilegal tidak sah",
    legalBasis: "Doktrin Pembuktian",
    englishTerm: "Fruit of the Poisonous Tree",
    relatedTerms: ["Bukti Turunan Ilegal", "Exclusionary Rule"]
  },
  {
    id: 539,
    term: "Fugitive",
    category: "subjek-hukum",
    definition: "Buronan atau orang yang melarikan diri dari hukum",
    example: "DPO yang kabur ke luar negeri",
    legalBasis: "KUHAP",
    englishTerm: "Fugitive",
    relatedTerms: ["Buronan", "Pelarian"]
  },
  {
    id: 540,
    term: "Full Disclosure",
    category: "proses-pidana",
    definition: "Pengungkapan penuh semua fakta",
    example: "Justice collaborator harus full disclosure",
    legalBasis: "SEMA No. 4/2011",
    englishTerm: "Full Disclosure",
    relatedTerms: ["Pengungkapan Penuh", "Transparansi Total"]
  },
  {
    id: 541,
    term: "Fundamental Error",
    category: "upaya-hukum",
    definition: "Kesalahan mendasar dalam putusan",
    example: "Kesalahan penerapan hukum yang fatal",
    legalBasis: "KUHAP",
    englishTerm: "Fundamental Error",
    relatedTerms: ["Kesalahan Fundamental", "Error Mendasar"]
  },
  {
    id: 542,
    term: "Fungible Goods",
    category: "pembuktian",
    definition: "Barang yang dapat diganti dengan sejenis",
    example: "Uang atau beras sebagai barang bukti",
    legalBasis: "KUHAP",
    englishTerm: "Fungible Goods",
    relatedTerms: ["Barang Pengganti", "Substitutable"]
  },
  {
    id: 543,
    term: "Further Proceedings",
    category: "proses-pidana",
    definition: "Proses lanjutan dalam perkara",
    example: "Sidang lanjutan setelah eksepsi",
    legalBasis: "KUHAP",
    englishTerm: "Further Proceedings",
    relatedTerms: ["Proses Lanjutan", "Kelanjutan Perkara"]
  },
  {
    id: 544,
    term: "Fusion Center",
    category: "penyidikan",
    definition: "Pusat koordinasi informasi penegakan hukum",
    example: "Fusion center antarlembaga penegak hukum",
    legalBasis: "Peraturan Kapolri",
    englishTerm: "Fusion Center",
    relatedTerms: ["Pusat Koordinasi", "Info Center"]
  },
  {
    id: 545,
    term: "Future Dangerousness",
    category: "sanksi-pidana",
    definition: "Potensi bahaya di masa depan dari pelaku",
    example: "Pertimbangan bahaya residivis",
    legalBasis: "KUHP",
    englishTerm: "Future Dangerousness",
    relatedTerms: ["Bahaya Masa Depan", "Potensi Residivis"]
  },
  {
    id: 546,
    term: "Gag Order",
    category: "proses-pidana",
    definition: "Perintah untuk tidak membicarakan kasus",
    example: "Larangan berbicara ke media selama sidang",
    legalBasis: "Kode Etik Profesi",
    englishTerm: "Gag Order",
    relatedTerms: ["Larangan Publikasi", "Pembatasan Informasi"]
  },
  {
    id: 547,
    term: "Gang Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang dilakukan geng atau kelompok",
    example: "Tawuran antar geng motor",
    legalBasis: "KUHP",
    englishTerm: "Gang Crime",
    relatedTerms: ["Kejahatan Geng", "Organized Crime"]
  },
  {
    id: 548,
    term: "General Deterrence",
    category: "sanksi-pidana",
    definition: "Efek pencegahan umum dari pidana",
    example: "Hukuman berat untuk mencegah orang lain",
    legalBasis: "Teori Pemidanaan",
    englishTerm: "General Deterrence",
    relatedTerms: ["Prevensi Umum", "Pencegahan Umum"]
  },
  {
    id: 549,
    term: "General Intent",
    category: "tindak-pidana",
    definition: "Kesengajaan umum tanpa tujuan khusus",
    example: "Sengaja memukul tanpa niat membunuh",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "General Intent",
    relatedTerms: ["Kesengajaan Umum", "Dolus Generalis"]
  },
  {
    id: 550,
    term: "General Warrant",
    category: "penyidikan",
    definition: "Surat perintah yang terlalu luas",
    example: "Perintah penggeledahan tanpa spesifikasi",
    legalBasis: "KUHAP",
    englishTerm: "General Warrant",
    relatedTerms: ["Surat Perintah Umum", "Blanket Warrant"]
  },

  // G - Lanjutan (551-600)
  {
    id: 551,
    term: "Geneva Convention",
    category: "pidana-khusus",
    definition: "Konvensi internasional tentang kejahatan perang",
    example: "Pelanggaran terhadap tawanan perang",
    legalBasis: "Konvensi Jenewa",
    englishTerm: "Geneva Convention",
    relatedTerms: ["Konvensi Jenewa", "Hukum Perang"]
  },
  {
    id: 552,
    term: "Genocide",
    category: "pidana-khusus",
    definition: "Pemusnahan sistematis terhadap suatu kelompok",
    example: "Pembantaian etnis tertentu",
    legalBasis: "UU No. 26/2000 (Pengadilan HAM)",
    englishTerm: "Genocide",
    relatedTerms: ["Genosida", "Pemusnahan Massal"]
  },
  {
    id: 553,
    term: "Geographic Jurisdiction",
    category: "peradilan",
    definition: "Yurisdiksi berdasarkan wilayah",
    example: "Kewenangan PN Jakarta Pusat",
    legalBasis: "Pasal 84 KUHAP",
    englishTerm: "Geographic Jurisdiction",
    relatedTerms: ["Yurisdiksi Wilayah", "Kompetensi Relatif"]
  },
  {
    id: 554,
    term: "Good Behavior",
    category: "sanksi-pidana",
    definition: "Kelakuan baik selama menjalani pidana",
    example: "Remisi karena berkelakuan baik",
    legalBasis: "PP No. 32/1999",
    englishTerm: "Good Behavior",
    relatedTerms: ["Kelakuan Baik", "Good Conduct"]
  },
  {
    id: 555,
    term: "Good Faith Exception",
    category: "pembuktian",
    definition: "Pengecualian untuk tindakan dengan itikad baik",
    example: "Polisi salah alamat tapi dengan itikad baik",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Good Faith Exception",
    relatedTerms: ["Itikad Baik", "Bona Fide"]
  },
  {
    id: 556,
    term: "Good Samaritan Law",
    category: "asas-hukum",
    definition: "Perlindungan bagi penolong dengan itikad baik",
    example: "Dokter menolong kecelakaan tanpa tanggung jawab pidana",
    legalBasis: "Prinsip Hukum",
    englishTerm: "Good Samaritan Law",
    relatedTerms: ["Hukum Penolong", "Perlindungan Penolong"]
  },
  {
    id: 557,
    term: "Good Time Credit",
    category: "sanksi-pidana",
    definition: "Pengurangan masa pidana karena kelakuan baik",
    example: "Pengurangan 1/3 masa tahanan",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Good Time Credit",
    relatedTerms: ["Remisi", "Pengurangan Pidana"]
  },
  {
    id: 558,
    term: "Government Witness",
    category: "pembuktian",
    definition: "Saksi dari pihak pemerintah/penuntut",
    example: "Saksi ahli dari BNN dalam kasus narkoba",
    legalBasis: "KUHAP",
    englishTerm: "Government Witness",
    relatedTerms: ["Saksi Penuntut", "Prosecution Witness"]
  },
  {
    id: 559,
    term: "Grading of Offenses",
    category: "tindak-pidana",
    definition: "Penggolongan tindak pidana berdasarkan berat ringannya",
    example: "Pencurian biasa vs pencurian dengan pemberatan",
    legalBasis: "KUHP",
    englishTerm: "Grading of Offenses",
    relatedTerms: ["Klasifikasi Delik", "Penggolongan Pidana"]
  },
  {
    id: 560,
    term: "Graft",
    category: "pidana-khusus",
    definition: "Korupsi kecil-kecilan oleh pejabat",
    example: "Pungutan liar di kantor pemerintah",
    legalBasis: "UU Tipikor",
    englishTerm: "Graft",
    relatedTerms: ["Korupsi Kecil", "Pungutan Liar"]
  },
  {
    id: 561,
    term: "Grand Corruption",
    category: "pidana-khusus",
    definition: "Korupsi besar yang melibatkan pejabat tinggi",
    example: "Korupsi proyek infrastruktur miliaran",
    legalBasis: "UU Tipikor",
    englishTerm: "Grand Corruption",
    relatedTerms: ["Korupsi Besar", "Mega Korupsi"]
  },
  {
    id: 562,
    term: "Grand Jury",
    category: "proses-pidana",
    definition: "Dewan juri untuk menentukan cukup bukti menuntut",
    example: "Grand jury system di Amerika",
    legalBasis: "Sistem Common Law",
    englishTerm: "Grand Jury",
    relatedTerms: ["Juri Agung", "Preliminary Jury"]
  },
  {
    id: 563,
    term: "Grand Larceny",
    category: "tindak-pidana",
    definition: "Pencurian dengan nilai besar",
    example: "Mencuri barang bernilai miliaran",
    legalBasis: "KUHP",
    englishTerm: "Grand Larceny",
    relatedTerms: ["Pencurian Besar", "Major Theft"]
  },
  {
    id: 564,
    term: "Grave Breach",
    category: "pidana-khusus",
    definition: "Pelanggaran berat hukum humaniter",
    example: "Penyiksaan tawanan perang",
    legalBasis: "Konvensi Jenewa",
    englishTerm: "Grave Breach",
    relatedTerms: ["Pelanggaran Berat", "War Crime"]
  },
  {
    id: 565,
    term: "Grievous Hurt",
    category: "tindak-pidana",
    definition: "Penganiayaan yang menyebabkan luka berat",
    example: "Memukul hingga patah tulang",
    legalBasis: "Pasal 354 KUHP",
    englishTerm: "Grievous Hurt",
    relatedTerms: ["Penganiayaan Berat", "Luka Berat"]
  },
  {
    id: 566,
    term: "Grooming",
    category: "tindak-pidana",
    definition: "Membangun hubungan dengan anak untuk eksploitasi seksual",
    example: "Pedofil mendekati anak lewat media sosial",
    legalBasis: "UU Perlindungan Anak",
    englishTerm: "Grooming",
    relatedTerms: ["Pendekatan Seksual", "Child Grooming"],
    trending: true
  },
  {
    id: 567,
    term: "Gross Negligence Manslaughter",
    category: "tindak-pidana",
    definition: "Pembunuhan karena kelalaian berat",
    example: "Dokter mabuk menyebabkan pasien meninggal",
    legalBasis: "Pasal 359 jo. 361 KUHP",
    englishTerm: "Gross Negligence Manslaughter",
    relatedTerms: ["Pembunuhan Karena Kelalaian Berat", "Culpa Lata"]
  },
  {
    id: 568,
    term: "Ground for Arrest",
    category: "penyidikan",
    definition: "Dasar hukum untuk melakukan penangkapan",
    example: "Bukti permulaan yang cukup",
    legalBasis: "Pasal 17 KUHAP",
    englishTerm: "Ground for Arrest",
    relatedTerms: ["Dasar Penangkapan", "Alasan Tangkap"]
  },
  {
    id: 569,
    term: "Group Defamation",
    category: "tindak-pidana",
    definition: "Pencemaran nama baik terhadap kelompok",
    example: "Menghina suku atau agama tertentu",
    legalBasis: "Pasal 156, 157 KUHP",
    englishTerm: "Group Defamation",
    relatedTerms: ["Penghinaan Kelompok", "Hate Speech"]
  },
  {
    id: 570,
    term: "Guarantee of Appearance",
    category: "proses-pidana",
    definition: "Jaminan untuk hadir dalam persidangan",
    example: "Surat jaminan dari instansi",
    legalBasis: "Pasal 31 KUHAP",
    englishTerm: "Guarantee of Appearance",
    relatedTerms: ["Jaminan Hadir", "Surety"]
  },
  {
    id: 571,
    term: "Guardian Ad Litem",
    category: "subjek-hukum",
    definition: "Wali yang ditunjuk pengadilan untuk anak",
    example: "Pendamping anak korban dalam sidang",
    legalBasis: "UU SPPA",
    englishTerm: "Guardian Ad Litem",
    relatedTerms: ["Wali Sidang", "Pendamping Anak"]
  },
  {
    id: 572,
    term: "Guilt Beyond Reasonable Doubt",
    category: "pembuktian",
    definition: "Kesalahan tanpa keraguan yang wajar",
    example: "Standar pembuktian dalam pidana",
    legalBasis: "Pasal 183 KUHAP",
    englishTerm: "Beyond Reasonable Doubt",
    relatedTerms: ["Tanpa Keraguan", "Keyakinan Hakim"]
  },
  {
    id: 573,
    term: "Guilty But Mentally Ill",
    category: "subjek-hukum",
    definition: "Bersalah tapi sakit jiwa",
    example: "Dipidana tapi mendapat perawatan kejiwaan",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Guilty But Mentally Ill",
    relatedTerms: ["Bersalah Terganggu Jiwa", "GBMI"]
  },
  {
    id: 574,
    term: "Guilty Mind",
    category: "tindak-pidana",
    definition: "Niat jahat atau kesalahan batin",
    example: "Mens rea dalam pembunuhan berencana",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Guilty Mind",
    relatedTerms: ["Mens Rea", "Niat Jahat"]
  },
  {
    id: 575,
    term: "Guilty Plea",
    category: "proses-pidana",
    definition: "Pengakuan bersalah di pengadilan",
    example: "Terdakwa mengaku bersalah di awal sidang",
    legalBasis: "KUHAP",
    englishTerm: "Guilty Plea",
    relatedTerms: ["Pengakuan Bersalah", "Plea Guilty"]
  },
  {
    id: 576,
    term: "Gun Control",
    category: "pidana-khusus",
    definition: "Pengendalian kepemilikan senjata api",
    example: "Perizinan ketat senjata api",
    legalBasis: "UU Darurat No. 12/1951",
    englishTerm: "Gun Control",
    relatedTerms: ["Kontrol Senjata", "Firearm Regulation"]
  },
  {
    id: 577,
    term: "Habeas Data",
    category: "proses-pidana",
    definition: "Hak untuk mengakses dan mengoreksi data pribadi",
    example: "Meminta data pribadi dari kepolisian",
    legalBasis: "UU ITE, UU PDP",
    englishTerm: "Habeas Data",
    relatedTerms: ["Hak Data", "Data Protection"]
  },
  {
    id: 578,
    term: "Habitual Criminal",
    category: "subjek-hukum",
    definition: "Penjahat kambuhan atau kebiasaan",
    example: "Pencuri yang sudah berkali-kali dipidana",
    legalBasis: "Pasal 486-488 KUHP",
    englishTerm: "Habitual Criminal",
    relatedTerms: ["Penjahat Kambuhan", "Residivis"]
  },
  {
    id: 579,
    term: "Halfway House",
    category: "sanksi-pidana",
    definition: "Tempat transisi sebelum bebas penuh",
    example: "Rumah singgah untuk mantan napi",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Halfway House",
    relatedTerms: ["Rumah Transisi", "Reintegrasi"]
  },
  {
    id: 580,
    term: "Handcuffing",
    category: "penyidikan",
    definition: "Pemborgolan atau pemasangan borgol",
    example: "Memborgol tersangka saat penangkapan",
    legalBasis: "SOP Kepolisian",
    englishTerm: "Handcuffing",
    relatedTerms: ["Pemborgolan", "Restraint"]
  },
  {
    id: 581,
    term: "Harassment",
    category: "tindak-pidana",
    definition: "Pelecehan atau gangguan berulang",
    example: "Pelecehan seksual di tempat kerja",
    legalBasis: "Pasal 335 KUHP, UU TPKS",
    englishTerm: "Harassment",
    relatedTerms: ["Pelecehan", "Gangguan"]
  },
  {
    id: 582,
    term: "Hard Evidence",
    category: "pembuktian",
    definition: "Bukti fisik yang kuat",
    example: "Senjata pembunuhan dengan sidik jari",
    legalBasis: "KUHAP",
    englishTerm: "Hard Evidence",
    relatedTerms: ["Bukti Kuat", "Physical Evidence"]
  },
  {
    id: 583,
    term: "Harm Principle",
    category: "asas-hukum",
    definition: "Prinsip bahwa hukum pidana hanya untuk perbuatan yang merugikan",
    example: "Kriminalisasi hanya untuk yang merugikan orang lain",
    legalBasis: "Teori Hukum Pidana",
    englishTerm: "Harm Principle",
    relatedTerms: ["Prinsip Kerugian", "Mill's Principle"]
  },
  {
    id: 584,
    term: "Harmless Error",
    category: "upaya-hukum",
    definition: "Kesalahan yang tidak mempengaruhi putusan",
    example: "Salah tulis nama yang tidak substansial",
    legalBasis: "KUHAP",
    englishTerm: "Harmless Error",
    relatedTerms: ["Kesalahan Tidak Fatal", "Non-Prejudicial Error"]
  },
  {
    id: 585,
    term: "Hate Crime",
    category: "tindak-pidana",
    definition: "Kejahatan berbasis kebencian SARA",
    example: "Menyerang orang karena agamanya",
    legalBasis: "Pasal 156, 157 KUHP",
    englishTerm: "Hate Crime",
    relatedTerms: ["Kejahatan Kebencian", "Bias Crime"],
    trending: true
  },
  {
    id: 586,
    term: "Hazardous Waste Crime",
    category: "pidana-khusus",
    definition: "Kejahatan limbah berbahaya",
    example: "Membuang limbah B3 ke sungai",
    legalBasis: "UU No. 32/2009",
    englishTerm: "Hazardous Waste Crime",
    relatedTerms: ["Pidana Limbah B3", "Environmental Crime"]
  },
  {
    id: 587,
    term: "Hearing",
    category: "proses-pidana",
    definition: "Sidang atau pemeriksaan di pengadilan",
    example: "Sidang pemeriksaan saksi",
    legalBasis: "KUHAP",
    englishTerm: "Hearing",
    relatedTerms: ["Sidang", "Pemeriksaan"]
  },
  {
    id: 588,
    term: "Hearsay Evidence",
    category: "pembuktian",
    definition: "Kesaksian yang didengar dari orang lain",
    example: "Saksi yang hanya dengar dari tetangga",
    legalBasis: "Pasal 185 KUHAP",
    englishTerm: "Hearsay Evidence",
    relatedTerms: ["Testimonium de Auditu", "Kesaksian Tidak Langsung"]
  },
  {
    id: 589,
    term: "Heat of Passion",
    category: "tindak-pidana",
    definition: "Dalam keadaan emosi yang memuncak",
    example: "Membunuh saat menemukan istri selingkuh",
    legalBasis: "Pasal 338 KUHP",
    englishTerm: "Heat of Passion",
    relatedTerms: ["Emosi Memuncak", "Crime of Passion"]
  },
  {
    id: 590,
    term: "Heinous Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang sangat keji",
    example: "Mutilasi, pembunuhan sadis",
    legalBasis: "KUHP",
    englishTerm: "Heinous Crime",
    relatedTerms: ["Kejahatan Keji", "Atrocious Crime"]
  },
  {
    id: 591,
    term: "Heist",
    category: "tindak-pidana",
    definition: "Perampokan besar yang terencana",
    example: "Perampokan bank dengan persiapan matang",
    legalBasis: "Pasal 365 KUHP",
    englishTerm: "Heist",
    relatedTerms: ["Perampokan Besar", "Major Robbery"]
  },
  {
    id: 592,
    term: "Heroin Trafficking",
    category: "pidana-khusus",
    definition: "Perdagangan gelap heroin",
    example: "Menyelundupkan heroin dari luar negeri",
    legalBasis: "UU No. 35/2009",
    englishTerm: "Heroin Trafficking",
    relatedTerms: ["Peredaran Heroin", "Drug Trafficking"]
  },
  {
    id: 593,
    term: "High Court",
    category: "peradilan",
    definition: "Pengadilan tinggi atau banding",
    example: "Pengadilan Tinggi DKI Jakarta",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "High Court",
    relatedTerms: ["Pengadilan Tinggi", "Appellate Court"]
  },
  {
    id: 594,
    term: "High Treason",
    category: "tindak-pidana",
    definition: "Pengkhianatan besar terhadap negara",
    example: "Makar untuk menggulingkan pemerintah",
    legalBasis: "Pasal 104 KUHP",
    englishTerm: "High Treason",
    relatedTerms: ["Makar", "Pengkhianatan Negara"]
  },
  {
    id: 595,
    term: "Highway Robbery",
    category: "tindak-pidana",
    definition: "Perampokan di jalan raya",
    example: "Merampok truk di jalan tol",
    legalBasis: "Pasal 365 KUHP",
    englishTerm: "Highway Robbery",
    relatedTerms: ["Perampokan Jalanan", "Begal"]
  },
  {
    id: 596,
    term: "Hijacking",
    category: "tindak-pidana",
    definition: "Pembajakan kendaraan atau pesawat",
    example: "Membajak pesawat terbang",
    legalBasis: "UU Penerbangan",
    englishTerm: "Hijacking",
    relatedTerms: ["Pembajakan", "Air Piracy"]
  },
  {
    id: 597,
    term: "Hit and Run",
    category: "tindak-pidana",
    definition: "Tabrak lari dalam kecelakaan",
    example: "Menabrak pejalan kaki lalu kabur",
    legalBasis: "Pasal 312 UU No. 22/2009",
    englishTerm: "Hit and Run",
    relatedTerms: ["Tabrak Lari", "Kecelakaan Lari"]
  },
  {
    id: 598,
    term: "Hoax",
    category: "tindak-pidana",
    definition: "Berita bohong yang disebarkan",
    example: "Menyebar hoax tentang penculikan anak",
    legalBasis: "Pasal 28 ayat (1) UU ITE",
    englishTerm: "Hoax",
    relatedTerms: ["Berita Bohong", "Fake News"],
    trending: true
  },
  {
    id: 599,
    term: "Holding Cell",
    category: "proses-pidana",
    definition: "Sel tahanan sementara",
    example: "Ruang tahanan di kantor polisi",
    legalBasis: "KUHAP",
    englishTerm: "Holding Cell",
    relatedTerms: ["Sel Sementara", "Temporary Detention"]
  },
  {
    id: 600,
    term: "Home Confinement",
    category: "sanksi-pidana",
    definition: "Tahanan rumah sebagai bentuk penahanan",
    example: "Ditahan di rumah dengan pengawasan",
    legalBasis: "Pasal 22 KUHAP",
    englishTerm: "Home Confinement",
    relatedTerms: ["Tahanan Rumah", "House Arrest"]
  },

  // H-I Lanjutan (601-650)
  {
    id: 601,
    term: "Home Invasion",
    category: "tindak-pidana",
    definition: "Masuk ke rumah orang secara paksa untuk kejahatan",
    example: "Merampok dengan masuk paksa ke rumah",
    legalBasis: "Pasal 365 KUHP",
    englishTerm: "Home Invasion",
    relatedTerms: ["Perampokan Rumah", "Burglary"]
  },
  {
    id: 602,
    term: "Homicide",
    category: "tindak-pidana",
    definition: "Pembunuhan dalam berbagai bentuk",
    example: "Homicide mencakup murder dan manslaughter",
    legalBasis: "Bab XIX KUHP",
    englishTerm: "Homicide",
    relatedTerms: ["Pembunuhan", "Penghilangan Nyawa"]
  },
  {
    id: 603,
    term: "Honor Killing",
    category: "tindak-pidana",
    definition: "Pembunuhan atas nama kehormatan keluarga",
    example: "Membunuh anak perempuan karena dianggap mencoreng nama baik",
    legalBasis: "Pasal 338-340 KUHP",
    englishTerm: "Honor Killing",
    relatedTerms: ["Pembunuhan Kehormatan", "Crime of Honor"]
  },
  {
    id: 604,
    term: "Horizontal Review",
    category: "upaya-hukum",
    definition: "Peninjauan kembali secara horizontal",
    example: "Review antar pengadilan setingkat",
    legalBasis: "KUHAP",
    englishTerm: "Horizontal Review",
    relatedTerms: ["Review Horizontal", "Peer Review"]
  },
  {
    id: 605,
    term: "Hostile Witness",
    category: "pembuktian",
    definition: "Saksi yang bermusuhan atau tidak kooperatif",
    example: "Saksi yang tiba-tiba berubah keterangan",
    legalBasis: "KUHAP",
    englishTerm: "Hostile Witness",
    relatedTerms: ["Saksi Bermusuhan", "Uncooperative Witness"]
  },
  {
    id: 606,
    term: "Hot Pursuit Doctrine",
    category: "penyidikan",
    definition: "Doktrin pengejaran segera pelaku kejahatan",
    example: "Polisi mengejar pelaku sampai lintas wilayah",
    legalBasis: "KUHAP",
    englishTerm: "Hot Pursuit Doctrine",
    relatedTerms: ["Pengejaran Panas", "Fresh Pursuit"]
  },
  {
    id: 607,
    term: "House Search",
    category: "penyidikan",
    definition: "Penggeledahan rumah dengan surat perintah",
    example: "Menggeledah rumah tersangka narkoba",
    legalBasis: "Pasal 33 KUHAP",
    englishTerm: "House Search",
    relatedTerms: ["Penggeledahan Rumah", "Search Warrant"]
  },
  {
    id: 608,
    term: "Human Rights Violation",
    category: "pidana-khusus",
    definition: "Pelanggaran hak asasi manusia",
    example: "Penyiksaan tahanan oleh aparat",
    legalBasis: "UU No. 26/2000, UU No. 39/1999",
    englishTerm: "Human Rights Violation",
    relatedTerms: ["Pelanggaran HAM", "HAM"]
  },
  {
    id: 609,
    term: "Human Smuggling",
    category: "pidana-khusus",
    definition: "Penyelundupan manusia",
    example: "Menyelundupkan TKI ilegal",
    legalBasis: "UU Imigrasi",
    englishTerm: "Human Smuggling",
    relatedTerms: ["Penyelundupan Manusia", "People Smuggling"]
  },
  {
    id: 610,
    term: "Hung Jury",
    category: "peradilan",
    definition: "Juri yang tidak dapat mencapai kesepakatan",
    example: "Juri terpecah 6-6 dalam kasus",
    legalBasis: "Sistem Juri",
    englishTerm: "Hung Jury",
    relatedTerms: ["Juri Buntu", "Deadlocked Jury"]
  },
  {
    id: 611,
    term: "Hybrid Court",
    category: "peradilan",
    definition: "Pengadilan campuran nasional-internasional",
    example: "Pengadilan khusus kejahatan internasional",
    legalBasis: "Perjanjian Internasional",
    englishTerm: "Hybrid Court",
    relatedTerms: ["Pengadilan Hibrida", "Mixed Court"]
  },
  {
    id: 612,
    term: "Hypnosis Evidence",
    category: "pembuktian",
    definition: "Keterangan yang diperoleh melalui hipnosis",
    example: "Saksi dihipnosis untuk mengingat kejadian",
    legalBasis: "Kontroversi Hukum",
    englishTerm: "Hypnosis Evidence",
    relatedTerms: ["Bukti Hipnosis", "Hypnotic Testimony"]
  },
  {
    id: 613,
    term: "Hypothesis Testing",
    category: "pembuktian",
    definition: "Pengujian hipotesis dalam investigasi",
    example: "Menguji teori tentang modus operandi",
    legalBasis: "Metode Investigasi",
    englishTerm: "Hypothesis Testing",
    relatedTerms: ["Uji Hipotesis", "Theory Testing"]
  },
  {
    id: 614,
    term: "Identity Fraud",
    category: "tindak-pidana",
    definition: "Pemalsuan atau pencurian identitas",
    example: "Menggunakan KTP orang lain untuk kredit",
    legalBasis: "Pasal 263 KUHP, UU ITE",
    englishTerm: "Identity Fraud",
    relatedTerms: ["Pemalsuan Identitas", "Identity Theft"]
  },
  {
    id: 615,
    term: "Illegal Arrest",
    category: "proses-pidana",
    definition: "Penangkapan yang tidak sah",
    example: "Menangkap tanpa surat perintah atau dasar",
    legalBasis: "Pasal 18-19 KUHAP",
    englishTerm: "Illegal Arrest",
    relatedTerms: ["Penangkapan Ilegal", "Unlawful Arrest"]
  },
  {
    id: 616,
    term: "Illegal Detention",
    category: "proses-pidana",
    definition: "Penahanan yang melawan hukum",
    example: "Menahan melebihi batas waktu",
    legalBasis: "Pasal 24-29 KUHAP",
    englishTerm: "Illegal Detention",
    relatedTerms: ["Penahanan Ilegal", "Unlawful Detention"]
  },
  {
    id: 617,
    term: "Illegal Entry",
    category: "tindak-pidana",
    definition: "Masuk secara ilegal ke wilayah/tempat",
    example: "Masuk Indonesia tanpa dokumen sah",
    legalBasis: "UU Imigrasi",
    englishTerm: "Illegal Entry",
    relatedTerms: ["Masuk Ilegal", "Unlawful Entry"]
  },
  {
    id: 618,
    term: "Illegal Fishing",
    category: "pidana-khusus",
    definition: "Penangkapan ikan secara ilegal",
    example: "Kapal asing menangkap ikan di ZEE Indonesia",
    legalBasis: "UU No. 45/2009",
    englishTerm: "Illegal Fishing",
    relatedTerms: ["Pencurian Ikan", "IUU Fishing"]
  },
  {
    id: 619,
    term: "Illegal Logging",
    category: "pidana-khusus",
    definition: "Penebangan kayu secara ilegal",
    example: "Menebang pohon di hutan lindung",
    legalBasis: "UU No. 18/2013",
    englishTerm: "Illegal Logging",
    relatedTerms: ["Pembalakan Liar", "Pencurian Kayu"]
  },
  {
    id: 620,
    term: "Illegal Mining",
    category: "pidana-khusus",
    definition: "Penambangan tanpa izin",
    example: "Tambang emas ilegal",
    legalBasis: "UU No. 4/2009",
    englishTerm: "Illegal Mining",
    relatedTerms: ["Penambangan Liar", "PETI"]
  },
  {
    id: 621,
    term: "Illegal Possession",
    category: "tindak-pidana",
    definition: "Kepemilikan barang terlarang",
    example: "Memiliki senjata api tanpa izin",
    legalBasis: "UU Darurat No. 12/1951",
    englishTerm: "Illegal Possession",
    relatedTerms: ["Kepemilikan Ilegal", "Unlawful Possession"]
  },
  {
    id: 622,
    term: "Illegal Search",
    category: "penyidikan",
    definition: "Penggeledahan tanpa prosedur hukum",
    example: "Menggeledah tanpa surat perintah",
    legalBasis: "Pasal 33 KUHAP",
    englishTerm: "Illegal Search",
    relatedTerms: ["Penggeledahan Ilegal", "Unlawful Search"]
  },
  {
    id: 623,
    term: "Illegal Surveillance",
    category: "tindak-pidana",
    definition: "Pengawasan atau penyadapan ilegal",
    example: "Menyadap telepon tanpa izin pengadilan",
    legalBasis: "UU ITE, UU Telekomunikasi",
    englishTerm: "Illegal Surveillance",
    relatedTerms: ["Penyadapan Ilegal", "Unlawful Wiretapping"]
  },
  {
    id: 624,
    term: "Illegal Trade",
    category: "pidana-khusus",
    definition: "Perdagangan barang terlarang",
    example: "Perdagangan satwa dilindungi",
    legalBasis: "UU Konservasi",
    englishTerm: "Illegal Trade",
    relatedTerms: ["Perdagangan Ilegal", "Black Market"]
  },
  {
    id: 625,
    term: "Illegitimate Child",
    category: "subjek-hukum",
    definition: "Anak luar nikah dalam konteks pidana",
    example: "Status anak dalam kasus penelantaran",
    legalBasis: "UU Perlindungan Anak",
    englishTerm: "Illegitimate Child",
    relatedTerms: ["Anak Luar Nikah", "Child Born Out of Wedlock"]
  },
  {
    id: 626,
    term: "Illicit Enrichment",
    category: "pidana-khusus",
    definition: "Kekayaan tidak wajar pejabat publik",
    example: "Pejabat kaya mendadak tanpa sumber jelas",
    legalBasis: "UU Tipikor",
    englishTerm: "Illicit Enrichment",
    relatedTerms: ["Kekayaan Tidak Wajar", "Unexplained Wealth"]
  },
  {
    id: 627,
    term: "Immediate Danger",
    category: "tindak-pidana",
    definition: "Bahaya yang mengancam segera",
    example: "Ancaman langsung terhadap nyawa",
    legalBasis: "Pasal 49 KUHP",
    englishTerm: "Immediate Danger",
    relatedTerms: ["Bahaya Langsung", "Imminent Threat"]
  },
  {
    id: 628,
    term: "Imminent Lawless Action",
    category: "tindak-pidana",
    definition: "Tindakan melawan hukum yang akan segera terjadi",
    example: "Hasutan yang langsung memicu kerusuhan",
    legalBasis: "Pasal 160 KUHP",
    englishTerm: "Imminent Lawless Action",
    relatedTerms: ["Tindakan Ilegal Segera", "Clear and Present Danger"]
  },
  {
    id: 629,
    term: "Immoral Act",
    category: "tindak-pidana",
    definition: "Perbuatan asusila atau tidak bermoral",
    example: "Perbuatan cabul di tempat umum",
    legalBasis: "Pasal 281-303 KUHP",
    englishTerm: "Immoral Act",
    relatedTerms: ["Perbuatan Asusila", "Indecent Act"]
  },
  {
    id: 630,
    term: "Immunity",
    category: "subjek-hukum",
    definition: "Kekebalan dari tuntutan pidana",
    example: "Kekebalan diplomatik",
    legalBasis: "Konvensi Wina, UU",
    englishTerm: "Immunity",
    relatedTerms: ["Kekebalan", "Imunitas"]
  },
  {
    id: 631,
    term: "Impaired Driving",
    category: "tindak-pidana",
    definition: "Mengemudi dalam keadaan terganggu",
    example: "Mengemudi dalam pengaruh alkohol",
    legalBasis: "UU No. 22/2009",
    englishTerm: "Impaired Driving",
    relatedTerms: ["Mengemudi Mabuk", "DUI"]
  },
  {
    id: 632,
    term: "Impartial Jury",
    category: "peradilan",
    definition: "Juri yang tidak memihak",
    example: "Juri yang objektif dalam memutus",
    legalBasis: "Asas Peradilan",
    englishTerm: "Impartial Jury",
    relatedTerms: ["Juri Netral", "Fair Jury"]
  },
  {
    id: 633,
    term: "Impeachment",
    category: "pembuktian",
    definition: "Meragukan kredibilitas saksi",
    example: "Mempertanyakan kejujuran saksi",
    legalBasis: "KUHAP",
    englishTerm: "Impeachment",
    relatedTerms: ["Diskreditasi Saksi", "Witness Impeachment"]
  },
  {
    id: 634,
    term: "Imperfect Self-Defense",
    category: "tindak-pidana",
    definition: "Pembelaan diri yang tidak sempurna",
    example: "Membela diri tapi berlebihan",
    legalBasis: "Pasal 49 ayat (2) KUHP",
    englishTerm: "Imperfect Self-Defense",
    relatedTerms: ["Pembelaan Tidak Sempurna", "Excessive Defense"]
  },
  {
    id: 635,
    term: "Impersonation",
    category: "tindak-pidana",
    definition: "Penyamaran atau menyamar sebagai orang lain",
    example: "Menyamar sebagai polisi",
    legalBasis: "Pasal 508 KUHP",
    englishTerm: "Impersonation",
    relatedTerms: ["Penyamaran", "False Personation"]
  },
  {
    id: 636,
    term: "Implied Consent",
    category: "pembuktian",
    definition: "Persetujuan yang tersirat",
    example: "Tindakan yang menunjukkan persetujuan",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Implied Consent",
    relatedTerms: ["Persetujuan Tersirat", "Tacit Consent"]
  },
  {
    id: 637,
    term: "Implied Malice",
    category: "tindak-pidana",
    definition: "Niat jahat yang tersirat dari perbuatan",
    example: "Menembak ke kerumunan menunjukkan niat jahat",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Implied Malice",
    relatedTerms: ["Niat Jahat Tersirat", "Constructive Malice"]
  },
  {
    id: 638,
    term: "Impossibility Defense",
    category: "pembuktian",
    definition: "Pembelaan karena ketidakmungkinan",
    example: "Mencuri dari brankas kosong",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Impossibility Defense",
    relatedTerms: ["Pembelaan Impossibilitas", "Ketidakmungkinan"]
  },
  {
    id: 639,
    term: "Imprisonment",
    category: "sanksi-pidana",
    definition: "Pidana penjara atau perampasan kemerdekaan",
    example: "Dipidana 5 tahun penjara",
    legalBasis: "Pasal 10 KUHP",
    englishTerm: "Imprisonment",
    relatedTerms: ["Pidana Penjara", "Incarceration"]
  },
  {
    id: 640,
    term: "Improper Conduct",
    category: "tindak-pidana",
    definition: "Perilaku tidak patut yang dapat dipidana",
    example: "Perilaku tidak patut pejabat publik",
    legalBasis: "KUHP, UU ASN",
    englishTerm: "Improper Conduct",
    relatedTerms: ["Perilaku Tidak Patut", "Misconduct"]
  },
  {
    id: 641,
    term: "Imputed Intent",
    category: "tindak-pidana",
    definition: "Niat yang dianggap ada berdasarkan perbuatan",
    example: "Niat membunuh dari perbuatan menembak",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Imputed Intent",
    relatedTerms: ["Niat Terduga", "Presumed Intent"]
  },
  {
    id: 642,
    term: "In Camera",
    category: "proses-pidana",
    definition: "Sidang tertutup untuk umum",
    example: "Sidang kasus kesusilaan anak",
    legalBasis: "Pasal 153 ayat (3) KUHAP",
    englishTerm: "In Camera",
    relatedTerms: ["Sidang Tertutup", "Closed Session"]
  },
  {
    id: 643,
    term: "In Custody",
    category: "proses-pidana",
    definition: "Dalam tahanan atau penahanan",
    example: "Tersangka in custody di Rutan",
    legalBasis: "KUHAP",
    englishTerm: "In Custody",
    relatedTerms: ["Dalam Tahanan", "Detained"]
  },
  {
    id: 644,
    term: "In Dubio Pro Reo",
    category: "asas-hukum",
    definition: "Keraguan harus menguntungkan terdakwa",
    example: "Jika ragu, putuskan yang menguntungkan terdakwa",
    legalBasis: "Asas Hukum Pidana",
    englishTerm: "In Dubio Pro Reo",
    relatedTerms: ["Keraguan Menguntungkan Terdakwa", "Benefit of Doubt"]
  },
  {
    id: 645,
    term: "In Flagrante Delicto",
    category: "penyidikan",
    definition: "Tertangkap tangan melakukan kejahatan",
    example: "Tertangkap saat sedang mencuri",
    legalBasis: "Pasal 1 angka 19 KUHAP",
    englishTerm: "In Flagrante Delicto",
    relatedTerms: ["Tertangkap Tangan", "Red-Handed"]
  },
  {
    id: 646,
    term: "In Limine",
    category: "proses-pidana",
    definition: "Pada awal persidangan",
    example: "Eksepsi diajukan in limine",
    legalBasis: "KUHAP",
    englishTerm: "In Limine",
    relatedTerms: ["Di Awal", "Preliminary"]
  },
  {
    id: 647,
    term: "In Personam",
    category: "proses-pidana",
    definition: "Terhadap orang tertentu",
    example: "Tuntutan in personam terhadap terdakwa",
    legalBasis: "Asas Hukum",
    englishTerm: "In Personam",
    relatedTerms: ["Terhadap Orang", "Personal"]
  },
  {
    id: 648,
    term: "In Rem",
    category: "proses-pidana",
    definition: "Terhadap benda atau harta",
    example: "Perampasan in rem terhadap aset kejahatan",
    legalBasis: "UU TPPU",
    englishTerm: "In Rem",
    relatedTerms: ["Terhadap Benda", "Asset-Based"]
  },
  {
    id: 649,
    term: "Incapacitation",
    category: "sanksi-pidana",
    definition: "Melumpuhkan kemampuan melakukan kejahatan",
    example: "Penjara untuk mencegah kejahatan lanjutan",
    legalBasis: "Teori Pemidanaan",
    englishTerm: "Incapacitation",
    relatedTerms: ["Pelumpuhan", "Neutralization"]
  },
  {
    id: 650,
    term: "Incarceration",
    category: "sanksi-pidana",
    definition: "Penahanan atau pemenjaraan",
    example: "Masa incarceration di Lapas",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Incarceration",
    relatedTerms: ["Pemenjaraan", "Imprisonment"]
  },

  // I-J (651-700)
  {
    id: 651,
    term: "Incest",
    category: "tindak-pidana",
    definition: "Hubungan seksual dengan keluarga sedarah",
    example: "Hubungan seksual ayah dengan anak kandung",
    legalBasis: "Pasal 294 KUHP",
    englishTerm: "Incest",
    relatedTerms: ["Inses", "Sumbang"]
  },
  {
    id: 652,
    term: "Inchoate Crime",
    category: "tindak-pidana",
    definition: "Kejahatan yang belum selesai atau percobaan",
    example: "Percobaan pembunuhan yang gagal",
    legalBasis: "Pasal 53 KUHP",
    englishTerm: "Inchoate Crime",
    relatedTerms: ["Delik Percobaan", "Incomplete Crime"]
  },
  {
    id: 653,
    term: "Incident Report",
    category: "penyidikan",
    definition: "Laporan kejadian tindak pidana",
    example: "Laporan polisi tentang kecelakaan",
    legalBasis: "SOP Kepolisian",
    englishTerm: "Incident Report",
    relatedTerms: ["Laporan Kejadian", "Police Report"]
  },
  {
    id: 654,
    term: "Incitement",
    category: "tindak-pidana",
    definition: "Menghasut untuk melakukan kejahatan",
    example: "Menghasut massa untuk merusak",
    legalBasis: "Pasal 160 KUHP",
    englishTerm: "Incitement",
    relatedTerms: ["Hasutan", "Provokasi"]
  },
  {
    id: 655,
    term: "Incompetent to Stand Trial",
    category: "subjek-hukum",
    definition: "Tidak mampu mengikuti persidangan",
    example: "Terdakwa gila tidak dapat diadili",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Incompetent to Stand Trial",
    relatedTerms: ["Tidak Mampu Sidang", "Unfit to Plead"]
  },
  {
    id: 656,
    term: "Inconsistent Statement",
    category: "pembuktian",
    definition: "Keterangan yang tidak konsisten",
    example: "Saksi berubah keterangan",
    legalBasis: "KUHAP",
    englishTerm: "Inconsistent Statement",
    relatedTerms: ["Keterangan Kontradiktif", "Contradictory Testimony"]
  },
  {
    id: 657,
    term: "Inculpatory Evidence",
    category: "pembuktian",
    definition: "Bukti yang memberatkan terdakwa",
    example: "Sidik jari terdakwa di TKP",
    legalBasis: "KUHAP",
    englishTerm: "Inculpatory Evidence",
    relatedTerms: ["Bukti Memberatkan", "A Charge"]
  },
  {
    id: 658,
    term: "Indecent Assault",
    category: "tindak-pidana",
    definition: "Penyerangan yang bersifat cabul",
    example: "Meraba-raba korban di tempat umum",
    legalBasis: "Pasal 289-296 KUHP",
    englishTerm: "Indecent Assault",
    relatedTerms: ["Pelecehan Seksual", "Sexual Assault"]
  },
  {
    id: 659,
    term: "Indecent Exposure",
    category: "tindak-pidana",
    definition: "Memperlihatkan bagian tubuh tidak senonoh",
    example: "Telanjang di tempat umum",
    legalBasis: "Pasal 281 KUHP",
    englishTerm: "Indecent Exposure",
    relatedTerms: ["Perbuatan Tidak Senonoh", "Public Indecency"]
  },
  {
    id: 660,
    term: "Independent Witness",
    category: "pembuktian",
    definition: "Saksi yang tidak memiliki kepentingan",
    example: "Saksi dari masyarakat yang kebetulan melihat",
    legalBasis: "KUHAP",
    englishTerm: "Independent Witness",
    relatedTerms: ["Saksi Independen", "Neutral Witness"]
  },
  {
    id: 661,
    term: "Indeterminate Sentence",
    category: "sanksi-pidana",
    definition: "Pidana dengan jangka waktu tidak pasti",
    example: "Pidana 5-10 tahun tergantung perilaku",
    legalBasis: "KUHP",
    englishTerm: "Indeterminate Sentence",
    relatedTerms: ["Pidana Tidak Tentu", "Flexible Sentence"]
  },
  {
    id: 662,
    term: "Index Crime",
    category: "tindak-pidana",
    definition: "Kejahatan serius yang masuk statistik",
    example: "Pembunuhan, pemerkosaan, perampokan",
    legalBasis: "Statistik Kriminal",
    englishTerm: "Index Crime",
    relatedTerms: ["Kejahatan Indeks", "Major Crime"]
  },
  {
    id: 663,
    term: "Indicia",
    category: "pembuktian",
    definition: "Tanda-tanda atau petunjuk kejahatan",
    example: "Indikasi kepemilikan narkoba",
    legalBasis: "KUHAP",
    englishTerm: "Indicia",
    relatedTerms: ["Indikasi", "Signs"]
  },
  {
    id: 664,
    term: "Indirect Evidence",
    category: "pembuktian",
    definition: "Bukti tidak langsung atau circumstantial",
    example: "Bukti keberadaan di dekat TKP",
    legalBasis: "Pasal 188 KUHAP",
    englishTerm: "Indirect Evidence",
    relatedTerms: ["Bukti Tidak Langsung", "Circumstantial Evidence"]
  },
  {
    id: 665,
    term: "Individual Deterrence",
    category: "sanksi-pidana",
    definition: "Efek jera untuk pelaku sendiri",
    example: "Pidana berat agar pelaku tidak mengulangi",
    legalBasis: "Teori Pemidanaan",
    englishTerm: "Individual Deterrence",
    relatedTerms: ["Prevensi Khusus", "Specific Deterrence"]
  },
  {
    id: 666,
    term: "Inducement",
    category: "tindak-pidana",
    definition: "Bujukan atau dorongan untuk melakukan kejahatan",
    example: "Membujuk orang untuk menjual narkoba",
    legalBasis: "Pasal 55 KUHP",
    englishTerm: "Inducement",
    relatedTerms: ["Bujukan", "Ajakan"]
  },
  {
    id: 667,
    term: "Industrial Espionage",
    category: "pidana-khusus",
    definition: "Spionase atau mata-mata industri",
    example: "Mencuri rahasia dagang perusahaan",
    legalBasis: "UU Rahasia Dagang",
    englishTerm: "Industrial Espionage",
    relatedTerms: ["Spionase Industri", "Corporate Espionage"]
  },
  {
    id: 668,
    term: "Ineffective Assistance",
    category: "proses-pidana",
    definition: "Bantuan hukum yang tidak efektif",
    example: "Pengacara tidak kompeten membela",
    legalBasis: "Hak atas Bantuan Hukum",
    englishTerm: "Ineffective Assistance",
    relatedTerms: ["Bantuan Tidak Efektif", "Incompetent Counsel"]
  },
  {
    id: 669,
    term: "Infanticide",
    category: "tindak-pidana",
    definition: "Pembunuhan bayi oleh ibunya",
    example: "Ibu membunuh bayi yang baru dilahirkan",
    legalBasis: "Pasal 341-343 KUHP",
    englishTerm: "Infanticide",
    relatedTerms: ["Pembunuhan Bayi", "Child Murder"]
  },
  {
    id: 670,
    term: "Inference",
    category: "pembuktian",
    definition: "Kesimpulan logis dari fakta",
    example: "Menyimpulkan niat dari perbuatan",
    legalBasis: "Pasal 188 KUHAP",
    englishTerm: "Inference",
    relatedTerms: ["Kesimpulan", "Petunjuk"]
  },
  {
    id: 671,
    term: "Inflammatory Speech",
    category: "tindak-pidana",
    definition: "Pidato yang menghasut kebencian",
    example: "Pidato SARA yang memicu konflik",
    legalBasis: "Pasal 156, 157 KUHP",
    englishTerm: "Inflammatory Speech",
    relatedTerms: ["Pidato Hasutan", "Hate Speech"]
  },
  {
    id: 672,
    term: "Informant",
    category: "penyidikan",
    definition: "Pemberi informasi kepada penegak hukum",
    example: "Informan polisi dalam kasus narkoba",
    legalBasis: "KUHAP",
    englishTerm: "Informant",
    relatedTerms: ["Informan", "Sumber"]
  },
  {
    id: 673,
    term: "Information Laying",
    category: "proses-pidana",
    definition: "Penyampaian informasi awal kejahatan",
    example: "Laporan awal ke polisi",
    legalBasis: "KUHAP",
    englishTerm: "Information Laying",
    relatedTerms: ["Pelaporan Awal", "Initial Report"]
  },
  {
    id: 674,
    term: "Informed Consent",
    category: "pembuktian",
    definition: "Persetujuan berdasarkan informasi lengkap",
    example: "Persetujuan tindakan medis dengan penjelasan",
    legalBasis: "UU Kesehatan",
    englishTerm: "Informed Consent",
    relatedTerms: ["Persetujuan Terinformasi", "Consent"]
  },
  {
    id: 675,
    term: "Infraction",
    category: "tindak-pidana",
    definition: "Pelanggaran ringan",
    example: "Pelanggaran lalu lintas ringan",
    legalBasis: "KUHP",
    englishTerm: "Infraction",
    relatedTerms: ["Pelanggaran Ringan", "Minor Offense"]
  },
  {
    id: 676,
    term: "Inherent Jurisdiction",
    category: "peradilan",
    definition: "Yurisdiksi yang melekat pada pengadilan",
    example: "Kewenangan inheren MA",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Inherent Jurisdiction",
    relatedTerms: ["Yurisdiksi Inheren", "Original Jurisdiction"]
  },
  {
    id: 677,
    term: "Initial Appearance",
    category: "proses-pidana",
    definition: "Hadirnya tersangka pertama kali di pengadilan",
    example: "Sidang pertama pembacaan dakwaan",
    legalBasis: "KUHAP",
    englishTerm: "Initial Appearance",
    relatedTerms: ["Sidang Pertama", "First Appearance"]
  },
  {
    id: 678,
    term: "Injunction",
    category: "proses-pidana",
    definition: "Perintah pengadilan untuk melakukan/tidak melakukan",
    example: "Perintah menghentikan kegiatan ilegal",
    legalBasis: "HIR/RBg",
    englishTerm: "Injunction",
    relatedTerms: ["Perintah Pengadilan", "Court Order"]
  },
  {
    id: 679,
    term: "Inmate",
    category: "subjek-hukum",
    definition: "Narapidana atau tahanan",
    example: "Warga binaan di Lapas",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Inmate",
    relatedTerms: ["Narapidana", "Warga Binaan"]
  },
  {
    id: 680,
    term: "Innocent Until Proven Guilty",
    category: "asas-hukum",
    definition: "Praduga tak bersalah sampai terbukti",
    example: "Tersangka harus diperlakukan sebagai tidak bersalah",
    legalBasis: "Pasal 8 UU No. 48/2009",
    englishTerm: "Presumption of Innocence",
    relatedTerms: ["Praduga Tak Bersalah", "Asas Praduga"]
  },
  {
    id: 681,
    term: "Inquest",
    category: "penyidikan",
    definition: "Pemeriksaan resmi atas kematian mencurigakan",
    example: "Pemeriksaan kematian tidak wajar",
    legalBasis: "KUHAP",
    englishTerm: "Inquest",
    relatedTerms: ["Pemeriksaan Kematian", "Death Investigation"]
  },
  {
    id: 682,
    term: "Inquisitorial System",
    category: "proses-pidana",
    definition: "Sistem peradilan dengan hakim aktif mencari fakta",
    example: "Hakim aktif memeriksa saksi",
    legalBasis: "Sistem Hukum",
    englishTerm: "Inquisitorial System",
    relatedTerms: ["Sistem Inkuisitorial", "Civil Law System"]
  },
  {
    id: 683,
    term: "Insanity Defense",
    category: "pembuktian",
    definition: "Pembelaan karena gangguan jiwa yang menyebabkan terdakwa tidak dapat mempertanggungjawabkan perbuatannya",
    example: "Tidak dipidana karena terbukti menderita skizofrenia saat melakukan pembunuhan",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Insanity Defense",
    relatedTerms: ["Gangguan Jiwa", "Tidak Mampu Bertanggung Jawab", "Mental Disorder"],
    trending: true
  },
  {
    id: 684,
    term: "Intimidasi",
    category: "tindak-pidana",
    definition: "Perbuatan mengancam atau menakut-nakuti orang lain untuk memaksakan kehendak",
    example: "Mengancam saksi agar tidak bersaksi di pengadilan",
    legalBasis: "Pasal 335 KUHP",
    englishTerm: "Intimidation",
    relatedTerms: ["Ancaman", "Paksaan", "Coercion"]
  },
  {
    id: 685,
    term: "Investigasi",
    category: "penyidikan",
    definition: "Proses penyelidikan dan penyidikan untuk mengungkap suatu tindak pidana",
    example: "Investigasi kasus pembunuhan berantai",
    legalBasis: "KUHAP",
    englishTerm: "Investigation",
    relatedTerms: ["Penyidikan", "Penyelidikan", "Opsporing"]
  },
  {
    id: 686,
    term: "Irelevan",
    category: "pembuktian",
    definition: "Tidak berhubungan atau tidak penting dengan pokok perkara",
    example: "Pertanyaan JPU dinyatakan irelevan oleh hakim",
    legalBasis: "Hukum Pembuktian",
    englishTerm: "Irrelevant",
    relatedTerms: ["Tidak Relevan", "Immaterial"]
  },
  {
    id: 687,
    term: "Isolasi Sel",
    category: "sanksi-pidana",
    definition: "Penempatan narapidana di sel terpisah sebagai hukuman tambahan",
    example: "Isolasi sel untuk narapidana yang melanggar peraturan lapas",
    legalBasis: "PP Pemasyarakatan",
    englishTerm: "Solitary Confinement",
    relatedTerms: ["Sel Isolasi", "Hukuman Disiplin"]
  },
  {
    id: 688,
    term: "Istbat",
    category: "pembuktian",
    definition: "Penetapan atau pembuktian suatu fakta hukum",
    example: "Istbat nikah untuk menetapkan perkawinan yang sah",
    legalBasis: "Hukum Acara",
    englishTerm: "Legal Determination",
    relatedTerms: ["Penetapan", "Pembuktian"]
  },
  {
    id: 689,
    term: "Jabatan",
    category: "subjek-hukum",
    definition: "Kedudukan yang menimbulkan hak dan kewajiban tertentu dalam hukum pidana",
    example: "Penyalahgunaan jabatan oleh pejabat negara",
    legalBasis: "Pasal 52 KUHP",
    englishTerm: "Official Position",
    relatedTerms: ["Kedudukan", "Wewenang", "Authority"]
  },
  {
    id: 690,
    term: "Jaminan Fidusia",
    category: "proses-pidana",
    definition: "Jaminan atas benda bergerak yang tetap dikuasai pemberi jaminan",
    example: "Kendaraan sebagai jaminan fidusia untuk penangguhan penahanan",
    legalBasis: "UU Jaminan Fidusia",
    englishTerm: "Fiduciary Security",
    relatedTerms: ["Jaminan", "Agunan", "Collateral"]
  },
  {
    id: 691,
    term: "Jangka Waktu",
    category: "proses-pidana",
    definition: "Periode waktu yang ditentukan untuk suatu proses hukum",
    example: "Jangka waktu penahanan dalam penyidikan maksimal 20 hari",
    legalBasis: "KUHAP",
    englishTerm: "Time Period",
    relatedTerms: ["Tenggang Waktu", "Batas Waktu", "Deadline"]
  },
  {
    id: 692,
    term: "Jarimah",
    category: "pidana-khusus",
    definition: "Istilah dalam hukum Islam untuk tindak pidana",
    example: "Jarimah qishas untuk pembunuhan sengaja",
    legalBasis: "Qanun Aceh",
    englishTerm: "Islamic Criminal Offense",
    relatedTerms: ["Jinayah", "Hudud", "Ta'zir"]
  },
  {
    id: 693,
    term: "Jasa Hukum",
    category: "proses-pidana",
    definition: "Pelayanan yang diberikan oleh profesi hukum",
    example: "Jasa hukum advokat dalam pembelaan terdakwa",
    legalBasis: "UU Advokat",
    englishTerm: "Legal Services",
    relatedTerms: ["Bantuan Hukum", "Legal Aid", "Konsultasi Hukum"]
  },
  {
    id: 694,
    term: "Jerat Hukum",
    category: "proses-pidana",
    definition: "Ketentuan hukum yang dapat dikenakan pada suatu perbuatan",
    example: "Jerat hukum Pasal 372 KUHP untuk kasus penggelapan",
    legalBasis: "KUHP",
    englishTerm: "Legal Trap",
    relatedTerms: ["Ancaman Pidana", "Pasal yang Dikenakan"]
  },
  {
    id: 695,
    term: "Jiwa Raganya",
    category: "tindak-pidana",
    definition: "Unsur mental dan fisik dalam pertanggungjawaban pidana",
    example: "Pemeriksaan jiwa raga terdakwa untuk menentukan kemampuan bertanggung jawab",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Mind and Body",
    relatedTerms: ["Mental dan Fisik", "Mens Rea dan Actus Reus"]
  },
  {
    id: 696,
    term: "Joint Investigation",
    category: "penyidikan",
    definition: "Penyidikan bersama yang dilakukan beberapa instansi penegak hukum",
    example: "Joint investigation KPK, Polri, dan Kejaksaan",
    legalBasis: "MoU Antar Lembaga",
    englishTerm: "Joint Investigation",
    relatedTerms: ["Penyidikan Bersama", "Tim Gabungan"]
  },
  {
    id: 697,
    term: "Judicial Corruption",
    category: "pidana-khusus",
    definition: "Korupsi yang melibatkan aparat peradilan",
    example: "Suap hakim untuk mempengaruhi putusan",
    legalBasis: "UU Tipikor",
    englishTerm: "Judicial Corruption",
    relatedTerms: ["Mafia Peradilan", "Korupsi Yudisial"]
  },
  {
    id: 698,
    term: "Judi Online",
    category: "pidana-khusus",
    definition: "Perjudian yang dilakukan melalui media internet",
    example: "Situs judi bola online ilegal",
    legalBasis: "Pasal 303 KUHP jo. UU ITE",
    englishTerm: "Online Gambling",
    relatedTerms: ["Perjudian Daring", "Cyber Gambling"],
    trending: true
  },
  {
    id: 699,
    term: "Juncto Pasal",
    category: "proses-pidana",
    definition: "Penggabungan pasal dalam dakwaan",
    example: "Pasal 2 ayat (1) jo. Pasal 18 UU Tipikor",
    legalBasis: "Teknik Perundangan",
    englishTerm: "Article Junction",
    relatedTerms: ["Jo.", "Dihubungkan dengan"]
  },
  {
    id: 700,
    term: "Juri",
    category: "peradilan",
    definition: "Warga negara yang dipilih untuk menentukan bersalah tidaknya terdakwa (tidak berlaku di Indonesia)",
    example: "Sistem juri di pengadilan Amerika Serikat",
    legalBasis: "Sistem Common Law",
    englishTerm: "Jury",
    relatedTerms: ["Dewan Juri", "Jury Trial"]
  },
  {
    id: 701,
    term: "Jurisdiksi Ekstrateritorial",
    category: "asas-hukum",
    definition: "Kewenangan hukum suatu negara di luar wilayahnya",
    example: "Indonesia menuntut WNI yang melakukan kejahatan di luar negeri",
    legalBasis: "Pasal 5-9 KUHP",
    englishTerm: "Extraterritorial Jurisdiction",
    relatedTerms: ["Yurisdiksi Luar Wilayah", "Asas Nasional"]
  },
  {
    id: 702,
    term: "Juru Sita",
    category: "subjek-hukum",
    definition: "Petugas pengadilan yang melaksanakan penyitaan",
    example: "Juru sita menyita aset terpidana korupsi",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Bailiff",
    relatedTerms: ["Jurusita", "Court Officer"]
  },
  {
    id: 703,
    term: "Jus Cogens",
    category: "asas-hukum",
    definition: "Norma hukum internasional yang tidak dapat dikesampingkan",
    example: "Larangan genosida sebagai jus cogens",
    legalBasis: "Hukum Internasional",
    englishTerm: "Peremptory Norm",
    relatedTerms: ["Norma Memaksa", "Hukum Internasional"]
  },
  {
    id: 704,
    term: "Jus Puniendi",
    category: "asas-hukum",
    definition: "Hak negara untuk menghukum",
    example: "Negara menggunakan jus puniendi untuk menjatuhkan pidana",
    legalBasis: "Teori Hukum Pidana",
    englishTerm: "Right to Punish",
    relatedTerms: ["Hak Menghukum", "Ius Puniendi"]
  },
  {
    id: 705,
    term: "Justice for All",
    category: "asas-hukum",
    definition: "Keadilan untuk semua tanpa diskriminasi",
    example: "Prinsip equality before the law",
    legalBasis: "UUD 1945",
    englishTerm: "Justice for All",
    relatedTerms: ["Keadilan untuk Semua", "Non-diskriminasi"]
  },
  {
    id: 706,
    term: "Juvenile Delinquency",
    category: "pidana-khusus",
    definition: "Kenakalan remaja yang termasuk tindak pidana",
    example: "Remaja terlibat tawuran yang menyebabkan kematian",
    legalBasis: "UU SPPA",
    englishTerm: "Juvenile Delinquency",
    relatedTerms: ["Kenakalan Remaja", "Anak Berhadapan dengan Hukum"]
  },
  {
    id: 707,
    term: "Kaidah Hukum",
    category: "asas-hukum",
    definition: "Aturan atau norma yang mengikat dalam hukum",
    example: "Kaidah hukum tentang larangan membunuh",
    legalBasis: "Teori Hukum",
    englishTerm: "Legal Norm",
    relatedTerms: ["Norma Hukum", "Aturan Hukum"]
  },
  {
    id: 708,
    term: "Kaki Tangan",
    category: "subjek-hukum",
    definition: "Orang yang membantu pelaku utama dalam tindak pidana",
    example: "Kaki tangan bandar narkoba",
    legalBasis: "Pasal 56 KUHP",
    englishTerm: "Accomplice",
    relatedTerms: ["Pembantu", "Medeplichtige"]
  },
  {
    id: 709,
    term: "Kamar",
    category: "peradilan",
    definition: "Bagian di Mahkamah Agung yang menangani perkara tertentu",
    example: "Kamar Pidana MA menangani kasasi pidana",
    legalBasis: "UU MA",
    englishTerm: "Chamber",
    relatedTerms: ["Chamber", "Divisi"]
  },
  {
    id: 710,
    term: "Kampanye Hitam",
    category: "tindak-pidana",
    definition: "Menyebarkan informasi fitnah dalam konteks politik",
    example: "Kampanye hitam menjelang pemilu",
    legalBasis: "UU Pemilu",
    englishTerm: "Black Campaign",
    relatedTerms: ["Fitnah Politik", "Negative Campaigning"]
  },
  {
    id: 711,
    term: "Kandang Terdakwa",
    category: "peradilan",
    definition: "Tempat khusus terdakwa selama persidangan",
    example: "Terdakwa duduk di kandang terdakwa saat sidang",
    legalBasis: "Tata Tertib Persidangan",
    englishTerm: "Defendant's Dock",
    relatedTerms: ["Tempat Terdakwa", "Dock"]
  },
  {
    id: 712,
    term: "Kantor Hukum",
    category: "subjek-hukum",
    definition: "Tempat advokat menjalankan profesinya",
    example: "Law firm yang menangani kasus pidana",
    legalBasis: "UU Advokat",
    englishTerm: "Law Office",
    relatedTerms: ["Law Firm", "Firma Hukum"]
  },
  {
    id: 713,
    term: "Kapasitas Hukum",
    category: "subjek-hukum",
    definition: "Kemampuan untuk melakukan perbuatan hukum",
    example: "Anak di bawah umur tidak memiliki kapasitas hukum penuh",
    legalBasis: "KUHPerdata",
    englishTerm: "Legal Capacity",
    relatedTerms: ["Kecakapan Hukum", "Legal Competence"]
  },
  {
    id: 714,
    term: "Karantina",
    category: "sanksi-pidana",
    definition: "Pembatasan gerak untuk kepentingan kesehatan/keamanan",
    example: "Karantina bagi narapidana dengan penyakit menular",
    legalBasis: "UU Kekarantinaan",
    englishTerm: "Quarantine",
    relatedTerms: ["Isolasi", "Pembatasan"]
  },
  {
    id: 715,
    term: "Karcis Perkara",
    category: "proses-pidana",
    definition: "Tanda terima pendaftaran perkara di pengadilan",
    example: "Karcis perkara sebagai bukti pendaftaran banding",
    legalBasis: "Peraturan MA",
    englishTerm: "Case Receipt",
    relatedTerms: ["Tanda Terima", "Registrasi Perkara"]
  },
  {
    id: 716,
    term: "Kartel Narkoba",
    category: "pidana-khusus",
    definition: "Organisasi kejahatan terorganisir di bidang narkotika",
    example: "Kartel narkoba internasional",
    legalBasis: "UU Narkotika",
    englishTerm: "Drug Cartel",
    relatedTerms: ["Sindikat Narkoba", "Organized Crime"],
    trending: true
  },
  {
    id: 717,
    term: "Kasus Dingin",
    category: "penyidikan",
    definition: "Kasus yang penyidikannya terhenti karena kendala tertentu",
    example: "Cold case pembunuhan yang belum terungkap selama 10 tahun",
    legalBasis: "Praktik Penyidikan",
    englishTerm: "Cold Case",
    relatedTerms: ["Cold Case", "Kasus Lama"]
  },
  {
    id: 718,
    term: "Kasus Prioritas",
    category: "proses-pidana",
    definition: "Perkara yang didahulukan penanganannya",
    example: "Kasus terorisme sebagai prioritas",
    legalBasis: "Kebijakan Penegakan Hukum",
    englishTerm: "Priority Case",
    relatedTerms: ["Perkara Prioritas", "High Priority"]
  },
  {
    id: 719,
    term: "Kategorisasi Pidana",
    category: "sanksi-pidana",
    definition: "Pengelompokan jenis-jenis pidana",
    example: "Pidana pokok dan pidana tambahan",
    legalBasis: "Pasal 10 KUHP",
    englishTerm: "Criminal Categorization",
    relatedTerms: ["Jenis Pidana", "Klasifikasi Pidana"]
  },
  {
    id: 720,
    term: "Kausalitas Adequate",
    category: "asas-hukum",
    definition: "Teori sebab akibat yang memadai dalam hukum pidana",
    example: "Hubungan kausal antara menembak dan kematian",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Adequate Causation",
    relatedTerms: ["Adequate Veroorzaking", "Sebab Memadai"]
  },
  {
    id: 721,
    term: "Kawalan",
    category: "proses-pidana",
    definition: "Pengawalan tahanan atau terpidana",
    example: "Kawalan ketat untuk tahanan high risk",
    legalBasis: "Peraturan Pemasyarakatan",
    englishTerm: "Escort",
    relatedTerms: ["Pengawalan", "Security Escort"]
  },
  {
    id: 722,
    term: "Kebiri Kimia",
    category: "sanksi-pidana",
    definition: "Tindakan medis untuk menekan libido pelaku kejahatan seksual",
    example: "Kebiri kimia untuk pedofil",
    legalBasis: "Perppu No. 1/2016",
    englishTerm: "Chemical Castration",
    relatedTerms: ["Kastrasi Kimia", "Medical Treatment"]
  },
  {
    id: 723,
    term: "Kecelakaan Lalu Lintas",
    category: "tindak-pidana",
    definition: "Peristiwa di jalan yang melibatkan kendaraan dengan akibat kerugian",
    example: "Kecelakaan fatal akibat mengemudi ugal-ugalan",
    legalBasis: "UU Lalu Lintas",
    englishTerm: "Traffic Accident",
    relatedTerms: ["Laka Lantas", "Road Accident"]
  },
  {
    id: 724,
    term: "Kecurangan Akademik",
    category: "tindak-pidana",
    definition: "Perbuatan curang dalam bidang pendidikan",
    example: "Jual beli ijazah palsu",
    legalBasis: "UU Sisdiknas",
    englishTerm: "Academic Fraud",
    relatedTerms: ["Plagiarisme", "Ijazah Palsu"]
  },
  {
    id: 725,
    term: "Kedokteran Forensik",
    category: "pembuktian",
    definition: "Ilmu kedokteran untuk kepentingan peradilan",
    example: "Autopsi untuk menentukan sebab kematian",
    legalBasis: "KUHAP",
    englishTerm: "Forensic Medicine",
    relatedTerms: ["Ilmu Forensik", "Medical Jurisprudence"]
  },
  {
    id: 726,
    term: "Kegiatan Intelijen",
    category: "penyidikan",
    definition: "Aktivitas pengumpulan informasi untuk kepentingan penegakan hukum",
    example: "Intelijen dalam pengungkapan terorisme",
    legalBasis: "UU Intelijen",
    englishTerm: "Intelligence Activity",
    relatedTerms: ["Intelligence", "Penyelidikan"]
  },
  {
    id: 727,
    term: "Kehormatan Profesi",
    category: "subjek-hukum",
    definition: "Martabat yang melekat pada suatu profesi",
    example: "Pelanggaran kode etik advokat",
    legalBasis: "Kode Etik Profesi",
    englishTerm: "Professional Honor",
    relatedTerms: ["Etika Profesi", "Professional Ethics"]
  },
  {
    id: 728,
    term: "Kejahatan Berat",
    category: "tindak-pidana",
    definition: "Tindak pidana dengan ancaman pidana di atas 5 tahun",
    example: "Pembunuhan, korupsi, narkotika",
    legalBasis: "KUHP",
    englishTerm: "Serious Crime",
    relatedTerms: ["Felony", "Tindak Pidana Berat"]
  },
  {
    id: 729,
    term: "Kejahatan Ekonomi",
    category: "pidana-khusus",
    definition: "Tindak pidana yang merugikan perekonomian",
    example: "Manipulasi pasar, insider trading",
    legalBasis: "UU Tindak Pidana Ekonomi",
    englishTerm: "Economic Crime",
    relatedTerms: ["White Collar Crime", "Financial Crime"]
  },
  {
    id: 730,
    term: "Kejahatan Kemanusiaan",
    category: "pidana-khusus",
    definition: "Serangan sistematis terhadap penduduk sipil",
    example: "Pembunuhan massal, perbudakan, apartheid",
    legalBasis: "UU No. 26/2000",
    englishTerm: "Crimes Against Humanity",
    relatedTerms: ["Genosida", "War Crimes"]
  },
  {
    id: 731,
    term: "Kejahatan Lingkungan",
    category: "pidana-khusus",
    definition: "Tindak pidana yang merusak lingkungan hidup",
    example: "Pembuangan limbah B3 ilegal",
    legalBasis: "UU Lingkungan Hidup",
    englishTerm: "Environmental Crime",
    relatedTerms: ["Ecocide", "Green Crime"]
  },
  {
    id: 732,
    term: "Kejahatan Mayantara",
    category: "pidana-khusus",
    definition: "Kejahatan di dunia maya/siber",
    example: "Hacking, phishing, cyberbullying",
    legalBasis: "UU ITE",
    englishTerm: "Cybercrime",
    relatedTerms: ["Kejahatan Siber", "Digital Crime"],
    trending: true
  },
  {
    id: 733,
    term: "Kejahatan Terorganisir",
    category: "tindak-pidana",
    definition: "Kejahatan yang dilakukan secara terstruktur oleh kelompok",
    example: "Mafia narkoba, sindikat perdagangan manusia",
    legalBasis: "KUHP",
    englishTerm: "Organized Crime",
    relatedTerms: ["Sindikat", "Criminal Organization"]
  },
  {
    id: 734,
    term: "Kejaksaan Tinggi",
    category: "subjek-hukum",
    definition: "Kejaksaan di tingkat provinsi",
    example: "Kejati DKI Jakarta",
    legalBasis: "UU Kejaksaan",
    englishTerm: "High Prosecution Office",
    relatedTerms: ["Kejati", "Provincial Prosecution"]
  },
  {
    id: 735,
    term: "Kekebalan Diplomatik",
    category: "subjek-hukum",
    definition: "Imunitas yang dimiliki diplomat dari yurisdiksi pidana",
    example: "Diplomat tidak dapat dituntut pidana di negara penerima",
    legalBasis: "Konvensi Wina 1961",
    englishTerm: "Diplomatic Immunity",
    relatedTerms: ["Imunitas", "Diplomatic Protection"]
  },
  {
    id: 736,
    term: "Kekebalan Hukum",
    category: "subjek-hukum",
    definition: "Perlindungan dari tuntutan hukum untuk pejabat tertentu",
    example: "Kekebalan presiden selama menjabat",
    legalBasis: "UUD 1945",
    englishTerm: "Legal Immunity",
    relatedTerms: ["Imunitas", "Immunity"]
  },
  {
    id: 737,
    term: "Kekerasan Seksual",
    category: "tindak-pidana",
    definition: "Setiap perbuatan bernuansa seksual yang dilakukan dengan kekerasan/ancaman",
    example: "Pelecehan seksual, pemerkosaan",
    legalBasis: "UU TPKS",
    englishTerm: "Sexual Violence",
    relatedTerms: ["Sexual Assault", "Kekerasan Berbasis Gender"],
    trending: true
  },
  {
    id: 738,
    term: "Kekuatan Alat Bukti",
    category: "pembuktian",
    definition: "Nilai pembuktian dari suatu alat bukti",
    example: "Keterangan saksi memiliki kekuatan pembuktian",
    legalBasis: "Pasal 183 KUHAP",
    englishTerm: "Evidentiary Value",
    relatedTerms: ["Nilai Bukti", "Bewijskracht"]
  },
  {
    id: 739,
    term: "Kelalaian Berat",
    category: "tindak-pidana",
    definition: "Kealpaan yang sangat tidak hati-hati",
    example: "Dokter operasi dalam keadaan mabuk",
    legalBasis: "KUHP",
    englishTerm: "Gross Negligence",
    relatedTerms: ["Culpa Lata", "Kelalaian Besar"]
  },
  {
    id: 740,
    term: "Kelayakan Bukti",
    category: "pembuktian",
    definition: "Syarat bukti untuk dapat diterima di pengadilan",
    example: "Bukti harus relevan dan diperoleh secara sah",
    legalBasis: "KUHAP",
    englishTerm: "Admissibility of Evidence",
    relatedTerms: ["Admissible Evidence", "Bukti yang Sah"]
  },
  {
    id: 741,
    term: "Kelebihan Kewenangan",
    category: "tindak-pidana",
    definition: "Tindakan melebihi batas kewenangan yang diberikan",
    example: "Polisi melakukan penangkapan tanpa surat perintah",
    legalBasis: "KUHAP",
    englishTerm: "Excess of Authority",
    relatedTerms: ["Ultra Vires", "Abuse of Power"]
  },
  {
    id: 742,
    term: "Keluarga Narapidana",
    category: "subjek-hukum",
    definition: "Anggota keluarga dari orang yang menjalani pidana penjara",
    example: "Hak kunjungan keluarga narapidana",
    legalBasis: "PP Pemasyarakatan",
    englishTerm: "Prisoner's Family",
    relatedTerms: ["Family Visit", "Kunjungan Keluarga"]
  },
  {
    id: 743,
    term: "Kematian Mendadak",
    category: "penyidikan",
    definition: "Kematian yang terjadi tiba-tiba dan mencurigakan",
    example: "Autopsi untuk kematian mendadak",
    legalBasis: "KUHAP",
    englishTerm: "Sudden Death",
    relatedTerms: ["Unnatural Death", "Kematian Tidak Wajar"]
  },
  {
    id: 744,
    term: "Kemerdekaan Hakim",
    category: "peradilan",
    definition: "Kebebasan hakim dalam memutus perkara tanpa intervensi",
    example: "Hakim memutus berdasarkan hati nurani",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Judicial Independence",
    relatedTerms: ["Independensi Hakim", "Impartial Judge"]
  },
  {
    id: 745,
    term: "Kemitraan Penegakan Hukum",
    category: "proses-pidana",
    definition: "Kerjasama antar lembaga penegak hukum",
    example: "MoU antara KPK, Polri, dan Kejaksaan",
    legalBasis: "Peraturan Bersama",
    englishTerm: "Law Enforcement Partnership",
    relatedTerms: ["Sinergi", "Koordinasi"]
  },
  {
    id: 746,
    term: "Kemufakatan",
    category: "tindak-pidana",
    definition: "Kesepakatan untuk melakukan tindak pidana",
    example: "Komplotan perampok berencana",
    legalBasis: "Pasal 88 KUHP",
    englishTerm: "Conspiracy",
    relatedTerms: ["Permufakatan Jahat", "Criminal Agreement"]
  },
  {
    id: 747,
    term: "Kendali Mutu",
    category: "proses-pidana",
    definition: "Pengawasan kualitas proses penegakan hukum",
    example: "Supervisi penyidikan oleh penyidik senior",
    legalBasis: "SOP Kepolisian",
    englishTerm: "Quality Control",
    relatedTerms: ["Pengawasan", "Supervision"]
  },
  {
    id: 748,
    term: "Kendaraan Bermotor",
    category: "tindak-pidana",
    definition: "Objek dalam tindak pidana lalu lintas",
    example: "Pencurian kendaraan bermotor",
    legalBasis: "Pasal 363 KUHP",
    englishTerm: "Motor Vehicle",
    relatedTerms: ["Curanmor", "Vehicle Theft"]
  },
  {
    id: 749,
    term: "Kentrung",
    category: "proses-pidana",
    definition: "Alat untuk memukul tahanan (sudah dilarang)",
    example: "Pelanggaran HAM menggunakan kentrung",
    legalBasis: "UU HAM",
    englishTerm: "Baton",
    relatedTerms: ["Pentungan", "Torture Device"]
  },
  {
    id: 750,
    term: "Kepailitan Pidana",
    category: "pidana-khusus",
    definition: "Tindak pidana terkait kepailitan yang curang",
    example: "Menyembunyikan aset saat pailit",
    legalBasis: "Pasal 396-398 KUHP",
    englishTerm: "Criminal Bankruptcy",
    relatedTerms: ["Fraudulent Bankruptcy", "Kepailitan Curang"]
  },
  {
    id: 751,
    term: "Kepala Rutan",
    category: "subjek-hukum",
    definition: "Pimpinan rumah tahanan negara",
    example: "Kepala Rutan bertanggung jawab atas keamanan tahanan",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Detention Center Head",
    relatedTerms: ["Karutan", "Warden"]
  },
  {
    id: 752,
    term: "Kepemilikan Ilegal",
    category: "tindak-pidana",
    definition: "Memiliki sesuatu tanpa hak yang sah",
    example: "Kepemilikan senjata api ilegal",
    legalBasis: "UU Darurat No. 12/1951",
    englishTerm: "Illegal Possession",
    relatedTerms: ["Unlawful Possession", "Memiliki Tanpa Hak"]
  },
  {
    id: 753,
    term: "Kepentingan Hukum",
    category: "proses-pidana",
    definition: "Nilai atau objek yang dilindungi hukum pidana",
    example: "Nyawa sebagai kepentingan hukum dalam pembunuhan",
    legalBasis: "Teori Hukum Pidana",
    englishTerm: "Legal Interest",
    relatedTerms: ["Rechtsgoed", "Protected Interest"]
  },
  {
    id: 754,
    term: "Kepentingan Nasional",
    category: "asas-hukum",
    definition: "Kepentingan negara yang harus dilindungi",
    example: "Kejahatan terhadap keamanan negara",
    legalBasis: "KUHP Buku II Bab I",
    englishTerm: "National Interest",
    relatedTerms: ["State Interest", "Kepentingan Negara"]
  },
  {
    id: 755,
    term: "Kepribadian Ganda",
    category: "pembuktian",
    definition: "Gangguan jiwa dengan beberapa kepribadian",
    example: "Pembelaan insanity karena multiple personality disorder",
    legalBasis: "Pasal 44 KUHP",
    englishTerm: "Multiple Personality",
    relatedTerms: ["Dissociative Identity Disorder", "Split Personality"]
  },
  {
    id: 756,
    term: "Keputusan Bebas",
    category: "proses-pidana",
    definition: "Putusan yang menyatakan terdakwa tidak bersalah",
    example: "Bebas murni karena tidak terbukti",
    legalBasis: "Pasal 191 ayat (1) KUHAP",
    englishTerm: "Acquittal",
    relatedTerms: ["Vrijspraak", "Not Guilty"]
  },
  {
    id: 757,
    term: "Keputusan Sela",
    category: "proses-pidana",
    definition: "Putusan antara sebelum putusan akhir",
    example: "Putusan sela tentang kewenangan mengadili",
    legalBasis: "Pasal 156 KUHAP",
    englishTerm: "Interlocutory Decision",
    relatedTerms: ["Putusan Antara", "Tussen Vonnis"]
  },
  {
    id: 758,
    term: "Kerahasiaan Bank",
    category: "pidana-khusus",
    definition: "Kewajiban bank merahasiakan data nasabah",
    example: "Pembukaan rahasia bank untuk kasus korupsi",
    legalBasis: "UU Perbankan",
    englishTerm: "Bank Secrecy",
    relatedTerms: ["Banking Confidentiality", "Rahasia Bank"]
  },
  {
    id: 759,
    term: "Kerahasiaan Medis",
    category: "pembuktian",
    definition: "Kewajiban dokter merahasiakan kondisi pasien",
    example: "Dokter menolak bersaksi tentang pasien",
    legalBasis: "Pasal 170 KUHAP",
    englishTerm: "Medical Confidentiality",
    relatedTerms: ["Doctor-Patient Privilege", "Rahasia Kedokteran"]
  },
  {
    id: 760,
    term: "Kerahasiaan Negara",
    category: "pidana-khusus",
    definition: "Informasi yang dirahasiakan untuk kepentingan negara",
    example: "Membocorkan dokumen rahasia negara",
    legalBasis: "UU Rahasia Negara",
    englishTerm: "State Secret",
    relatedTerms: ["Classified Information", "Rahasia Negara"]
  },
  {
    id: 761,
    term: "Kerangka Dakwaan",
    category: "penuntutan",
    definition: "Struktur penyusunan surat dakwaan",
    example: "Dakwaan disusun secara cermat, jelas, dan lengkap",
    legalBasis: "Pasal 143 KUHAP",
    englishTerm: "Indictment Framework",
    relatedTerms: ["Struktur Dakwaan", "Charge Structure"]
  },
  {
    id: 762,
    term: "Kerapatan Penahanan",
    category: "proses-pidana",
    definition: "Rapat untuk menentukan perpanjangan penahanan",
    example: "Rapat gelar perkara untuk perpanjangan penahanan",
    legalBasis: "Peraturan Kapolri",
    englishTerm: "Detention Review Meeting",
    relatedTerms: ["Gelar Perkara", "Case Conference"]
  },
  {
    id: 763,
    term: "Keributan",
    category: "tindak-pidana",
    definition: "Perbuatan yang mengganggu ketertiban umum",
    example: "Membuat keributan di tempat umum",
    legalBasis: "Pasal 503 KUHP",
    englishTerm: "Disturbance",
    relatedTerms: ["Public Disorder", "Gangguan Ketertiban"]
  },
  {
    id: 764,
    term: "Kerja Bakti",
    category: "sanksi-pidana",
    definition: "Pidana kerja sosial sebagai alternatif penjara",
    example: "Kerja bakti 40 jam untuk tindak pidana ringan",
    legalBasis: "RUU KUHP",
    englishTerm: "Community Service",
    relatedTerms: ["Pidana Kerja Sosial", "Social Work"]
  },
  {
    id: 765,
    term: "Kerja Paksa",
    category: "pidana-khusus",
    definition: "Memaksa orang bekerja tanpa upah yang layak",
    example: "Perbudakan modern di perkebunan",
    legalBasis: "UU TPPO",
    englishTerm: "Forced Labor",
    relatedTerms: ["Perbudakan", "Eksploitasi"]
  },
  {
    id: 766,
    term: "Kerjasama Bilateral",
    category: "proses-pidana",
    definition: "Kerjasama penegakan hukum antara dua negara",
    example: "MLA Indonesia-Singapura untuk kasus korupsi",
    legalBasis: "Perjanjian Bilateral",
    englishTerm: "Bilateral Cooperation",
    relatedTerms: ["MLA", "Mutual Legal Assistance"]
  },
  {
    id: 767,
    term: "Kerjasama Regional",
    category: "proses-pidana",
    definition: "Kerjasama penegakan hukum tingkat regional",
    example: "ASEAN cooperation against transnational crime",
    legalBasis: "ASEAN Treaty",
    englishTerm: "Regional Cooperation",
    relatedTerms: ["ASEAN", "Regional Partnership"]
  },
  {
    id: 768,
    term: "Kerugian Immateriil",
    category: "sanksi-pidana",
    definition: "Kerugian non-fisik akibat tindak pidana",
    example: "Trauma psikologis korban kekerasan",
    legalBasis: "UU Perlindungan Saksi",
    englishTerm: "Immaterial Damage",
    relatedTerms: ["Non-pecuniary Loss", "Kerugian Moril"]
  },
  {
    id: 769,
    term: "Kerugian Keuangan Negara",
    category: "pidana-khusus",
    definition: "Berkurangnya kekayaan negara akibat tindak pidana",
    example: "Kerugian negara Rp 10 miliar dari korupsi",
    legalBasis: "UU Tipikor",
    englishTerm: "State Financial Loss",
    relatedTerms: ["State Loss", "Kerugian Negara"]
  },
  {
    id: 770,
    term: "Kerugian Materiil",
    category: "sanksi-pidana",
    definition: "Kerugian yang dapat dinilai dengan uang",
    example: "Biaya pengobatan korban penganiayaan",
    legalBasis: "KUHP",
    englishTerm: "Material Damage",
    relatedTerms: ["Pecuniary Loss", "Financial Loss"]
  },
  {
    id: 771,
    term: "Kesadaran Hukum",
    category: "asas-hukum",
    definition: "Pemahaman dan ketaatan masyarakat terhadap hukum",
    example: "Kesadaran untuk tidak melakukan kejahatan",
    legalBasis: "Teori Hukum",
    englishTerm: "Legal Awareness",
    relatedTerms: ["Legal Consciousness", "Rechtsbewustzijn"]
  },
  {
    id: 772,
    term: "Kesaksian Alibi",
    category: "pembuktian",
    definition: "Keterangan bahwa terdakwa berada di tempat lain saat kejadian",
    example: "Saksi menyatakan terdakwa ada di Jakarta saat pembunuhan di Bandung",
    legalBasis: "KUHAP",
    englishTerm: "Alibi Testimony",
    relatedTerms: ["Alibi", "Elsewhere Defense"]
  },
  {
    id: 773,
    term: "Kesaksian Bohong",
    category: "tindak-pidana",
    definition: "Memberikan keterangan palsu di bawah sumpah",
    example: "Saksi berbohong untuk melindungi terdakwa",
    legalBasis: "Pasal 242 KUHP",
    englishTerm: "False Testimony",
    relatedTerms: ["Perjury", "Sumpah Palsu"]
  },
  {
    id: 774,
    term: "Kesaksian De Auditu",
    category: "pembuktian",
    definition: "Kesaksian berdasarkan apa yang didengar dari orang lain",
    example: "Saksi berkata 'saya dengar dari tetangga bahwa...'",
    legalBasis: "Pasal 185 ayat (7) KUHAP",
    englishTerm: "Hearsay Evidence",
    relatedTerms: ["Testimonium de Auditu", "Indirect Testimony"]
  },
  {
    id: 775,
    term: "Kesalahan Identitas",
    category: "pembuktian",
    definition: "Kekeliruan mengenali pelaku tindak pidana",
    example: "Korban salah menunjuk tersangka",
    legalBasis: "KUHAP",
    englishTerm: "Mistaken Identity",
    relatedTerms: ["False Identification", "Salah Orang"]
  },
  {
    id: 776,
    term: "Kesalahan Prosedur",
    category: "proses-pidana",
    definition: "Pelanggaran tata cara yang ditentukan hukum acara",
    example: "Penangkapan tanpa surat perintah",
    legalBasis: "KUHAP",
    englishTerm: "Procedural Error",
    relatedTerms: ["Cacat Prosedur", "Procedural Defect"]
  },
  {
    id: 777,
    term: "Kesalahan Yuridis",
    category: "proses-pidana",
    definition: "Kesalahan dalam penerapan hukum",
    example: "Salah menerapkan pasal dalam dakwaan",
    legalBasis: "KUHAP",
    englishTerm: "Legal Error",
    relatedTerms: ["Error in Law", "Kesalahan Hukum"]
  },
  {
    id: 778,
    term: "Kesatuan Tindak",
    category: "tindak-pidana",
    definition: "Beberapa perbuatan yang dianggap satu kesatuan",
    example: "Memalsukan beberapa dokumen dalam satu rangkaian",
    legalBasis: "Pasal 64 KUHP",
    englishTerm: "Unity of Act",
    relatedTerms: ["Perbuatan Berlanjut", "Continued Act"]
  },
  {
    id: 779,
    term: "Keseimbangan Kepentingan",
    category: "asas-hukum",
    definition: "Pertimbangan antara kepentingan individu dan masyarakat",
    example: "Mempertimbangkan hak tersangka dan kepentingan umum",
    legalBasis: "Asas Hukum Pidana",
    englishTerm: "Balance of Interests",
    relatedTerms: ["Proportionalitas", "Keseimbangan"]
  },
  {
    id: 780,
    term: "Kesempatan Membela Diri",
    category: "proses-pidana",
    definition: "Hak terdakwa untuk membela diri di persidangan",
    example: "Terdakwa diberi kesempatan mengajukan pembelaan",
    legalBasis: "Pasal 182 KUHAP",
    englishTerm: "Right to Defense",
    relatedTerms: ["Hak Pembelaan", "Defense Opportunity"]
  },
  {
    id: 781,
    term: "Kesengajaan Bersyarat",
    category: "tindak-pidana",
    definition: "Menyadari kemungkinan terjadinya akibat tetapi tetap melakukan",
    example: "Menembak ke kerumunan dengan kemungkinan mengenai orang",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Conditional Intent",
    relatedTerms: ["Dolus Eventualis", "Voorwaardelijk Opzet"]
  },
  {
    id: 782,
    term: "Kesengajaan Langsung",
    category: "tindak-pidana",
    definition: "Niat langsung untuk menimbulkan akibat tertentu",
    example: "Sengaja menembak untuk membunuh",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Direct Intent",
    relatedTerms: ["Dolus Directus", "Opzet als Oogmerk"]
  },
  {
    id: 783,
    term: "Kesepakatan Jahat",
    category: "tindak-pidana",
    definition: "Persetujuan untuk melakukan kejahatan",
    example: "Sepakat untuk melakukan perampokan",
    legalBasis: "Pasal 88 KUHP",
    englishTerm: "Criminal Agreement",
    relatedTerms: ["Permufakatan Jahat", "Conspiracy"]
  },
  {
    id: 784,
    term: "Kesesatan",
    category: "tindak-pidana",
    definition: "Kekeliruan yang menyebabkan hilangnya kesengajaan",
    example: "Salah mengira barang milik sendiri",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Error",
    relatedTerms: ["Dwaling", "Mistake"]
  },
  {
    id: 785,
    term: "Kesusilaan Umum",
    category: "tindak-pidana",
    definition: "Norma kesopanan yang berlaku di masyarakat",
    example: "Tindakan asusila di tempat umum",
    legalBasis: "Bab XIV KUHP",
    englishTerm: "Public Morality",
    relatedTerms: ["Zedelijkheid", "Public Decency"]
  },
  {
    id: 786,
    term: "Ketentuan Pidana",
    category: "asas-hukum",
    definition: "Pasal yang memuat ancaman pidana",
    example: "Ketentuan pidana dalam UU khusus",
    legalBasis: "Teknik Perundangan",
    englishTerm: "Penal Provisions",
    relatedTerms: ["Strafbepaling", "Criminal Provisions"]
  },
  {
    id: 787,
    term: "Keterangan Palsu",
    category: "tindak-pidana",
    definition: "Memberikan informasi yang tidak benar kepada pejabat",
    example: "Memberikan identitas palsu saat ditangkap",
    legalBasis: "Pasal 242 KUHP",
    englishTerm: "False Statement",
    relatedTerms: ["False Information", "Keterangan Bohong"]
  },
  {
    id: 788,
    term: "Keterangan Tambahan",
    category: "pembuktian",
    definition: "Informasi pelengkap dalam persidangan",
    example: "Saksi memberikan keterangan tambahan tentang TKP",
    legalBasis: "KUHAP",
    englishTerm: "Additional Statement",
    relatedTerms: ["Supplementary Evidence", "Keterangan Pelengkap"]
  },
  {
    id: 789,
    term: "Keterangan Tertulis",
    category: "pembuktian",
    definition: "Keterangan yang diberikan dalam bentuk tulisan",
    example: "Keterangan ahli secara tertulis",
    legalBasis: "KUHAP",
    englishTerm: "Written Statement",
    relatedTerms: ["Written Testimony", "Keterangan Tulisan"]
  },
  {
    id: 790,
    term: "Keterlambatan Proses",
    category: "proses-pidana",
    definition: "Proses hukum yang melewati batas waktu",
    example: "Penyidikan melebihi batas waktu penahanan",
    legalBasis: "KUHAP",
    englishTerm: "Procedural Delay",
    relatedTerms: ["Undue Delay", "Keterlambatan"]
  },
  {
    id: 791,
    term: "Keterlibatan Anak",
    category: "pidana-khusus",
    definition: "Melibatkan anak dalam tindak pidana",
    example: "Menggunakan anak untuk mengedarkan narkoba",
    legalBasis: "UU Perlindungan Anak",
    englishTerm: "Child Involvement",
    relatedTerms: ["Eksploitasi Anak", "Child Exploitation"]
  },
  {
    id: 792,
    term: "Ketidakhadiran Terdakwa",
    category: "proses-pidana",
    definition: "Terdakwa tidak hadir dalam persidangan",
    example: "Sidang dilanjutkan tanpa kehadiran terdakwa",
    legalBasis: "Pasal 196 KUHAP",
    englishTerm: "Defendant's Absence",
    relatedTerms: ["In Absentia", "Verstek"]
  },
  {
    id: 793,
    term: "Ketidakmampuan Mutlak",
    category: "tindak-pidana",
    definition: "Tidak mungkin menyelesaikan tindak pidana",
    example: "Mencoba membunuh orang yang sudah mati",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Absolute Impossibility",
    relatedTerms: ["Ondeugdelijke Poging", "Impossible Attempt"]
  },
  {
    id: 794,
    term: "Ketidakpatutan",
    category: "tindak-pidana",
    definition: "Perbuatan yang bertentangan dengan kepatutan sosial",
    example: "Perbuatan tidak patut pejabat publik",
    legalBasis: "Yurisprudensi",
    englishTerm: "Impropriety",
    relatedTerms: ["Onbehoorlijk", "Inappropriate Act"]
  },
  {
    id: 795,
    term: "Ketua Majelis",
    category: "peradilan",
    definition: "Hakim yang memimpin persidangan",
    example: "Ketua majelis memimpin jalannya sidang",
    legalBasis: "KUHAP",
    englishTerm: "Presiding Judge",
    relatedTerms: ["Chief Judge", "Ketua Sidang"]
  },
  {
    id: 796,
    term: "Kewajiban Lapor",
    category: "sanksi-pidana",
    definition: "Kewajiban melapor sebagai syarat pembebasan bersyarat",
    example: "Wajib lapor setiap minggu ke kejaksaan",
    legalBasis: "PP Pembebasan Bersyarat",
    englishTerm: "Reporting Obligation",
    relatedTerms: ["Mandatory Reporting", "Wajib Lapor"]
  },
  {
    id: 797,
    term: "Kewajiban Merahasiakan",
    category: "pembuktian",
    definition: "Kewajiban profesi tertentu untuk tidak membuka rahasia",
    example: "Kewajiban dokter merahasiakan penyakit pasien",
    legalBasis: "Pasal 170 KUHAP",
    englishTerm: "Duty of Confidentiality",
    relatedTerms: ["Professional Secrecy", "Rahasia Jabatan"]
  },
  {
    id: 798,
    term: "Kewenangan Diskresioner",
    category: "proses-pidana",
    definition: "Kewenangan untuk memutuskan berdasarkan pertimbangan",
    example: "Diskresi kepolisian dalam perkara ringan",
    legalBasis: "UU Kepolisian",
    englishTerm: "Discretionary Power",
    relatedTerms: ["Diskresi", "Discretion"]
  },
  {
    id: 799,
    term: "Kewenangan Penuh",
    category: "proses-pidana",
    definition: "Wewenang lengkap untuk menangani suatu perkara",
    example: "KPK memiliki kewenangan penuh dalam kasus korupsi",
    legalBasis: "UU KPK",
    englishTerm: "Full Authority",
    relatedTerms: ["Plenary Power", "Complete Authority"]
  },
  {
    id: 800,
    term: "Kewenangan Terbatas",
    category: "proses-pidana",
    definition: "Wewenang yang dibatasi ruang lingkupnya",
    example: "Penyidik pegawai negeri sipil tertentu",
    legalBasis: "KUHAP",
    englishTerm: "Limited Authority",
    relatedTerms: ["Restricted Power", "Kewenangan Khusus"]
  },
  {
    id: 801,
    term: "Khalayak Ramai",
    category: "tindak-pidana",
    definition: "Orang banyak atau masyarakat umum",
    example: "Penghasutan di muka khalayak ramai",
    legalBasis: "Pasal 160 KUHP",
    englishTerm: "General Public",
    relatedTerms: ["Public", "Umum"]
  },
  {
    id: 802,
    term: "Khilaf",
    category: "tindak-pidana",
    definition: "Kekeliruan atau kesalahan yang tidak disengaja",
    example: "Khilaf mengambil barang orang lain",
    legalBasis: "Doktrin Hukum Pidana",
    englishTerm: "Mistake",
    relatedTerms: ["Error", "Kekeliruan"]
  },
  {
    id: 803,
    term: "Khusus Dewasa",
    category: "subjek-hukum",
    definition: "Klasifikasi narapidana berdasarkan usia",
    example: "Lapas khusus dewasa untuk usia di atas 18 tahun",
    legalBasis: "UU Pemasyarakatan",
    englishTerm: "Adult Only",
    relatedTerms: ["Adult Prison", "Lapas Dewasa"]
  },
  {
    id: 804,
    term: "Klaim Asuransi",
    category: "tindak-pidana",
    definition: "Tuntutan ganti rugi yang dapat menjadi tindak pidana jika curang",
    example: "Klaim asuransi palsu untuk kecelakaan yang direkayasa",
    legalBasis: "Pasal 381 KUHP",
    englishTerm: "Insurance Claim",
    relatedTerms: ["Insurance Fraud", "Penipuan Asuransi"]
  },
  {
    id: 805,
    term: "Klasifikasi Narapidana",
    category: "sanksi-pidana",
    definition: "Pengelompokan narapidana berdasarkan kriteria tertentu",
    example: "Klasifikasi berdasarkan tingkat keamanan",
    legalBasis: "PP Pemasyarakatan",
    englishTerm: "Prisoner Classification",
    relatedTerms: ["Inmate Classification", "Penggolongan Napi"]
  },
  {
    id: 806,
    term: "Klausula Escape",
    category: "proses-pidana",
    definition: "Ketentuan yang memungkinkan pengecualian",
    example: "Klausula force majeure dalam kontrak",
    legalBasis: "Hukum Kontrak",
    englishTerm: "Escape Clause",
    relatedTerms: ["Exception Clause", "Pengecualian"]
  },
  {
    id: 807,
    term: "Kleptokrasi",
    category: "pidana-khusus",
    definition: "Pemerintahan yang dikuasai oleh pencuri/koruptor",
    example: "Rezim yang sistematis melakukan korupsi",
    legalBasis: "Doktrin Politik Hukum",
    englishTerm: "Kleptocracy",
    relatedTerms: ["Corrupt Regime", "Pemerintahan Korup"]
  },
  {
    id: 808,
    term: "Kode Etik Hakim",
    category: "peradilan",
    definition: "Pedoman perilaku bagi hakim",
    example: "Larangan menerima hadiah bagi hakim",
    legalBasis: "Kode Etik dan Pedoman Perilaku Hakim",
    englishTerm: "Judicial Code of Conduct",
    relatedTerms: ["Ethics Code", "Etika Hakim"]
  },
  {
    id: 809,
    term: "Kode Etik Kepolisian",
    category: "penyidikan",
    definition: "Pedoman perilaku bagi anggota kepolisian",
    example: "Larangan menyalahgunakan wewenang",
    legalBasis: "Peraturan Kapolri",
    englishTerm: "Police Code of Ethics",
    relatedTerms: ["Police Ethics", "Etika Polri"]
  },
  {
    id: 810,
    term: "Kode Inisial",
    category: "proses-pidana",
    definition: "Kode nama untuk melindungi identitas",
    example: "Saksi X dalam kasus sensitif",
    legalBasis: "UU Perlindungan Saksi",
    englishTerm: "Initial Code",
    relatedTerms: ["Code Name", "Nama Samaran"]
  },
  {
    id: 811,
    term: "Koersi",
    category: "proses-pidana",
    definition: "Paksaan atau tekanan dalam proses hukum",
    example: "Pengakuan yang diperoleh dengan paksaan",
    legalBasis: "KUHAP",
    englishTerm: "Coercion",
    relatedTerms: ["Dwang", "Paksaan"]
  },
  {
    id: 812,
    term: "Kohabitasi",
    category: "tindak-pidana",
    definition: "Hidup bersama tanpa ikatan perkawinan yang sah",
    example: "Kohabitasi yang melanggar norma agama",
    legalBasis: "Hukum Adat/Agama",
    englishTerm: "Cohabitation",
    relatedTerms: ["Kumpul Kebo", "Living Together"]
  },
  {
    id: 813,
    term: "Kolaborasi Penegakan",
    category: "proses-pidana",
    definition: "Kerjasama antar lembaga penegak hukum",
    example: "Kolaborasi KPK-Polri-Kejaksaan",
    legalBasis: "MoU Antar Lembaga",
    englishTerm: "Law Enforcement Collaboration",
    relatedTerms: ["Sinergi", "Kerjasama"]
  },
  {
    id: 814,
    term: "Kolektif",
    category: "tindak-pidana",
    definition: "Dilakukan bersama-sama oleh beberapa orang",
    example: "Tanggung jawab kolektif dalam kerusuhan",
    legalBasis: "KUHP",
    englishTerm: "Collective",
    relatedTerms: ["Bersama-sama", "Group Crime"]
  },
  {
    id: 815,
    term: "Kolusi",
    category: "pidana-khusus",
    definition: "Kerjasama rahasia untuk tujuan tidak sah",
    example: "Kolusi dalam tender proyek pemerintah",
    legalBasis: "UU Tipikor",
    englishTerm: "Collusion",
    relatedTerms: ["Persekongkolan", "Secret Agreement"]
  },
  {
    id: 816,
    term: "Komandan Lapangan",
    category: "subjek-hukum",
    definition: "Pimpinan operasi penegakan hukum di lapangan",
    example: "Komandan operasi penangkapan teroris",
    legalBasis: "SOP Kepolisian",
    englishTerm: "Field Commander",
    relatedTerms: ["Danlap", "Operation Commander"]
  },
  {
    id: 817,
    term: "Kombinasi Dakwaan",
    category: "penuntutan",
    definition: "Gabungan dakwaan kumulatif dan alternatif",
    example: "Dakwaan kesatu kumulatif, kedua alternatif",
    legalBasis: "Pasal 143 KUHAP",
    englishTerm: "Combined Charges",
    relatedTerms: ["Dakwaan Gabungan", "Mixed Indictment"]
  },
  {
    id: 818,
    term: "Komisi Kepolisian",
    category: "subjek-hukum",
    definition: "Lembaga pengawas eksternal kepolisian",
    example: "Kompolnas mengawasi kinerja Polri",
    legalBasis: "UU Kepolisian",
    englishTerm: "Police Commission",
    relatedTerms: ["Kompolnas", "Police Oversight"]
  },
  {
    id: 819,
    term: "Komisi Kejaksaan",
    category: "subjek-hukum",
    definition: "Lembaga pengawas eksternal kejaksaan",
    example: "Komisi Kejaksaan memeriksa pelanggaran jaksa",
    legalBasis: "UU Kejaksaan",
    englishTerm: "Prosecution Commission",
    relatedTerms: ["Komjak", "Prosecution Oversight"]
  },
  {
    id: 820,
    term: "Komisi Pemberantasan Korupsi",
    category: "subjek-hukum",
    definition: "Lembaga negara independen antikorupsi",
    example: "KPK menangani kasus korupsi besar",
    legalBasis: "UU KPK",
    englishTerm: "Corruption Eradication Commission",
    relatedTerms: ["KPK", "Anti-corruption Agency"],
    trending: true
  },
  {
    id: 821,
    term: "Komisi Yudisial",
    category: "subjek-hukum",
    definition: "Lembaga negara yang mengawasi perilaku hakim",
    example: "KY memeriksa dugaan pelanggaran etik hakim",
    legalBasis: "UU Komisi Yudisial",
    englishTerm: "Judicial Commission",
    relatedTerms: ["KY", "Judicial Oversight"]
  },
  {
    id: 822,
    term: "Komitmen Kehadiran",
    category: "proses-pidana",
    definition: "Jaminan untuk hadir dalam persidangan",
    example: "Surat pernyataan tidak akan melarikan diri",
    legalBasis: "KUHAP",
    englishTerm: "Appearance Bond",
    relatedTerms: ["Jaminan Hadir", "Attendance Guarantee"]
  },
  {
    id: 823,
    term: "Komparisi",
    category: "proses-pidana",
    definition: "Perbandingan untuk kepentingan pembuktian",
    example: "Komparisi tulisan tangan dalam pemalsuan",
    legalBasis: "Ilmu Forensik",
    englishTerm: "Comparison",
    relatedTerms: ["Perbandingan", "Comparative Analysis"]
  },
  {
    id: 824,
    term: "Kompensasi Korban",
    category: "sanksi-pidana",
    definition: "Ganti rugi yang diberikan kepada korban kejahatan",
    example: "Kompensasi untuk korban kekerasan",
    legalBasis: "UU Perlindungan Saksi dan Korban",
    englishTerm: "Victim Compensation",
    relatedTerms: ["Ganti Rugi", "Restitusi"]
  },
  {
    id: 825,
    term: "Kompetensi Mengadili",
    category: "peradilan",
    definition: "Kewenangan pengadilan untuk memeriksa perkara",
    example: "Kompetensi PN untuk perkara pidana umum",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Jurisdiction to Try",
    relatedTerms: ["Kewenangan Mengadili", "Yurisdiksi"]
  },
  {
    id: 826,
    term: "Komplain",
    category: "proses-pidana",
    definition: "Pengaduan atas proses hukum yang dianggap salah",
    example: "Komplain atas penangkapan yang tidak sah",
    legalBasis: "KUHAP",
    englishTerm: "Complaint",
    relatedTerms: ["Pengaduan", "Keberatan"]
  },
  {
    id: 827,
    term: "Kompleksitas Perkara",
    category: "proses-pidana",
    definition: "Tingkat kerumitan suatu kasus",
    example: "Kasus korupsi dengan banyak tersangka",
    legalBasis: "Praktik Peradilan",
    englishTerm: "Case Complexity",
    relatedTerms: ["Kerumitan Kasus", "Complex Case"]
  },
  {
    id: 828,
    term: "Komplotan",
    category: "tindak-pidana",
    definition: "Kelompok yang bersekongkol melakukan kejahatan",
    example: "Komplotan perampok bank",
    legalBasis: "KUHP",
    englishTerm: "Gang",
    relatedTerms: ["Sindikat", "Criminal Gang"]
  },
  {
    id: 829,
    term: "Komunikasi Rahasia",
    category: "pembuktian",
    definition: "Komunikasi yang dilindungi kerahasiaannya",
    example: "Komunikasi pengacara-klien",
    legalBasis: "UU Advokat",
    englishTerm: "Privileged Communication",
    relatedTerms: ["Attorney-Client Privilege", "Rahasia Profesi"]
  },
  {
    id: 830,
    term: "Kondisi Darurat",
    category: "tindak-pidana",
    definition: "Keadaan yang memaksa melakukan tindakan tertentu",
    example: "Melanggar aturan karena menyelamatkan nyawa",
    legalBasis: "Pasal 48 KUHP",
    englishTerm: "Emergency Condition",
    relatedTerms: ["Keadaan Darurat", "Noodtoestand"]
  },
  {
    id: 831,
    term: "Konfesi",
    category: "pembuktian",
    definition: "Pengakuan melakukan tindak pidana",
    example: "Terdakwa mengaku melakukan pembunuhan",
    legalBasis: "Pasal 189 KUHAP",
    englishTerm: "Confession",
    relatedTerms: ["Pengakuan", "Bekentenis"]
  },
  {
    id: 832,
    term: "Konfirmasi Dakwaan",
    category: "penuntutan",
    definition: "Pemastian isi dakwaan kepada terdakwa",
    example: "Hakim menanyakan apakah terdakwa mengerti dakwaan",
    legalBasis: "KUHAP",
    englishTerm: "Charge Confirmation",
    relatedTerms: ["Pembacaan Dakwaan", "Charge Reading"]
  },
  {
    id: 833,
    term: "Konflik Hukum",
    category: "asas-hukum",
    definition: "Pertentangan antara norma hukum",
    example: "Konflik antara UU lama dan baru",
    legalBasis: "Teori Hukum",
    englishTerm: "Legal Conflict",
    relatedTerms: ["Conflict of Laws", "Pertentangan Hukum"]
  },
  {
    id: 834,
    term: "Konflik Kepentingan",
    category: "pidana-khusus",
    definition: "Pertentangan antara kepentingan pribadi dan publik",
    example: "Pejabat memberi proyek ke perusahaan keluarga",
    legalBasis: "UU Tipikor",
    englishTerm: "Conflict of Interest",
    relatedTerms: ["Benturan Kepentingan", "COI"]
  },
  {
    id: 835,
    term: "Konflik Yurisdiksi",
    category: "proses-pidana",
    definition: "Perselisihan kewenangan antar pengadilan",
    example: "Sengketa kewenangan antara PN dan Pengadilan Militer",
    legalBasis: "KUHAP",
    englishTerm: "Jurisdictional Conflict",
    relatedTerms: ["Sengketa Kewenangan", "Kompetensi"]
  },
  {
    id: 836,
    term: "Konfrontasi",
    category: "pembuktian",
    definition: "Pertemuan langsung antara saksi dan terdakwa",
    example: "Konfrontasi untuk memastikan identitas pelaku",
    legalBasis: "KUHAP",
    englishTerm: "Confrontation",
    relatedTerms: ["Face to Face", "Konfrontir"]
  },
  {
    id: 837,
    term: "Kongkalikong",
    category: "tindak-pidana",
    definition: "Persekongkolan untuk tujuan jahat",
    example: "Kongkalikong dalam tender proyek",
    legalBasis: "UU Tipikor",
    englishTerm: "Collusion",
    relatedTerms: ["Kolusi", "Persekongkolan"]
  },
  {
    id: 838,
    term: "Konklusi",
    category: "proses-pidana",
    definition: "Kesimpulan dalam pemeriksaan perkara",
    example: "Konklusi JPU dalam tuntutan",
    legalBasis: "KUHAP",
    englishTerm: "Conclusion",
    relatedTerms: ["Kesimpulan", "Closing Statement"]
  },
  {
    id: 839,
    term: "Konsekuensi Hukum",
    category: "asas-hukum",
    definition: "Akibat yang timbul dari perbuatan hukum",
    example: "Konsekuensi pidana dari perbuatan melawan hukum",
    legalBasis: "Teori Hukum",
    englishTerm: "Legal Consequences",
    relatedTerms: ["Akibat Hukum", "Legal Effect"]
  },
  {
    id: 840,
    term: "Konseling Hukum",
    category: "proses-pidana",
    definition: "Pemberian nasihat hukum",
    example: "Konseling hukum untuk tersangka",
    legalBasis: "UU Advokat",
    englishTerm: "Legal Counseling",
    relatedTerms: ["Konsultasi Hukum", "Legal Advice"]
  },
  {
    id: 841,
    term: "Konsep Keadilan",
    category: "asas-hukum",
    definition: "Pandangan tentang apa yang adil dalam hukum",
    example: "Keadilan retributif vs restoratif",
    legalBasis: "Filsafat Hukum",
    englishTerm: "Concept of Justice",
    relatedTerms: ["Theory of Justice", "Teori Keadilan"]
  },
  {
    id: 842,
    term: "Konsentrasi Penanganan",
    category: "proses-pidana",
    definition: "Pemusatan penanganan perkara tertentu",
    example: "Konsentrasi penanganan kasus narkoba",
    legalBasis: "Kebijakan Penegakan Hukum",
    englishTerm: "Concentrated Handling",
    relatedTerms: ["Focused Prosecution", "Prioritas"]
  },
  {
    id: 843,
    term: "Konsiderasi Hakim",
    category: "peradilan",
    definition: "Pertimbangan hakim dalam memutus perkara",
    example: "Pertimbangan hukum dan fakta dalam putusan",
    legalBasis: "Pasal 197 KUHAP",
    englishTerm: "Judicial Consideration",
    relatedTerms: ["Legal Reasoning", "Pertimbangan Hukum"]
  },
  {
    id: 844,
    term: "Konsiliasi",
    category: "proses-pidana",
    definition: "Upaya perdamaian dalam perkara pidana",
    example: "Konsiliasi dalam kasus kekerasan ringan",
    legalBasis: "Restorative Justice",
    englishTerm: "Conciliation",
    relatedTerms: ["Perdamaian", "Mediasi"]
  },
  {
    id: 845,
    term: "Konsolidasi Perkara",
    category: "proses-pidana",
    definition: "Penggabungan beberapa perkara menjadi satu",
    example: "Konsolidasi kasus korupsi yang berkaitan",
    legalBasis: "KUHAP",
    englishTerm: "Case Consolidation",
    relatedTerms: ["Penggabungan Perkara", "Voeging"]
  },
  {
    id: 846,
    term: "Konspirasi",
    category: "tindak-pidana",
    definition: "Persekongkolan untuk melakukan kejahatan",
    example: "Konspirasi pembunuhan berencana",
    legalBasis: "Pasal 88 KUHP",
    englishTerm: "Conspiracy",
    relatedTerms: ["Permufakatan Jahat", "Criminal Plot"]
  },
  {
    id: 847,
    term: "Konstanta Kriminal",
    category: "asas-hukum",
    definition: "Faktor tetap dalam terjadinya kejahatan",
    example: "Kesempatan sebagai konstanta kejahatan",
    legalBasis: "Kriminologi",
    englishTerm: "Criminal Constant",
    relatedTerms: ["Crime Factor", "Faktor Kriminal"]
  },
  {
    id: 848,
    term: "Konstatasi",
    category: "pembuktian",
    definition: "Penetapan fakta dalam persidangan",
    example: "Konstatasi bahwa terdakwa berada di TKP",
    legalBasis: "KUHAP",
    englishTerm: "Fact Finding",
    relatedTerms: ["Penetapan Fakta", "Factual Determination"]
  },
  {
    id: 849,
    term: "Konstitusionalitas",
    category: "asas-hukum",
    definition: "Kesesuaian dengan konstitusi",
    example: "Konstitusionalitas hukuman mati",
    legalBasis: "UUD 1945",
    englishTerm: "Constitutionality",
    relatedTerms: ["Constitutional", "Konstitusional"]
  },
  {
    id: 850,
    term: "Konstruksi Hukum",
    category: "proses-pidana",
    definition: "Penafsiran dan penerapan hukum",
    example: "Konstruksi hukum dalam dakwaan JPU",
    legalBasis: "Teori Hukum",
    englishTerm: "Legal Construction",
    relatedTerms: ["Legal Interpretation", "Penafsiran Hukum"]
  },
  {
    id: 851,
    term: "Konsul Jenderal",
    category: "subjek-hukum",
    definition: "Perwakilan negara yang memiliki kekebalan terbatas",
    example: "Konjen dapat membantu WNI yang terlibat kasus pidana",
    legalBasis: "Konvensi Wina 1963",
    englishTerm: "Consul General",
    relatedTerms: ["Konsulat", "Consular Protection"]
  },
  {
    id: 852,
    term: "Konsultasi Hukum",
    category: "proses-pidana",
    definition: "Pemberian nasihat hukum oleh ahli",
    example: "Konsultasi dengan advokat sebelum diperiksa",
    legalBasis: "UU Advokat",
    englishTerm: "Legal Consultation",
    relatedTerms: ["Legal Advice", "Nasihat Hukum"]
  },
  {
    id: 853,
    term: "Kontaminasi Bukti",
    category: "pembuktian",
    definition: "Tercemarnya barang bukti sehingga tidak valid",
    example: "Bukti DNA terkontaminasi di TKP",
    legalBasis: "Ilmu Forensik",
    englishTerm: "Evidence Contamination",
    relatedTerms: ["Contaminated Evidence", "Bukti Tercemar"]
  },
  {
    id: 854,
    term: "Konteks Kejahatan",
    category: "tindak-pidana",
    definition: "Situasi dan kondisi terjadinya tindak pidana",
    example: "Konteks sosial dalam kerusuhan massa",
    legalBasis: "Kriminologi",
    englishTerm: "Crime Context",
    relatedTerms: ["Criminal Context", "Situasi Kejahatan"]
  },
  {
    id: 855,
    term: "Kontinuitas Penanganan",
    category: "proses-pidana",
    definition: "Kesinambungan dalam proses penegakan hukum",
    example: "Kontinuitas dari penyidikan hingga eksekusi",
    legalBasis: "KUHAP",
    englishTerm: "Continuity of Handling",
    relatedTerms: ["Continuous Process", "Kesinambungan"]
  },
  {
    id: 856,
    term: "Kontra Intelijen",
    category: "penyidikan",
    definition: "Kegiatan melawan operasi intelijen musuh/kriminal",
    example: "Kontra intelijen terhadap jaringan teroris",
    legalBasis: "UU Intelijen",
    englishTerm: "Counter Intelligence",
    relatedTerms: ["Counter-espionage", "Anti-intelijen"]
  }
],

// Additional helper functions
getTermsByLetter: (letter: string) => {
  return istilahPidanaData.terms.filter(term => 
    term.term.toUpperCase().startsWith(letter.toUpperCase())
  )
},

getRandomTerm: () => {
  const randomIndex = Math.floor(Math.random() * istilahPidanaData.terms.length)
  return istilahPidanaData.terms[randomIndex]
},

getTotalByCategory: () => {
  const categoryCount: { [key: string]: number } = {}
  istilahPidanaData.terms.forEach(term => {
    categoryCount[term.category] = (categoryCount[term.category] || 0) + 1
  })
  return categoryCount
},

searchTerms: (query: string) => {
  const searchQuery = query.toLowerCase()
  return istilahPidanaData.terms.filter(term => 
    term.term.toLowerCase().includes(searchQuery) ||
    term.definition.toLowerCase().includes(searchQuery) ||
    term.englishTerm?.toLowerCase().includes(searchQuery) ||
    term.relatedTerms?.some(rt => rt.toLowerCase().includes(searchQuery))
  )
},

getTermsByCategory: (category: string) => {
  if (category === 'all') return istilahPidanaData.terms
  return istilahPidanaData.terms.filter(term => term.category === category)
},

getTrendingTerms: () => {
  return istilahPidanaData.terms.filter(term => term.trending === true)
}
}

// Export the complete data
export { istilahPidanaData }
export default istilahPidanaData


 

    
   
