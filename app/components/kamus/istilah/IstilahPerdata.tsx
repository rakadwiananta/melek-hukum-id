'use client'

import * as React from 'react'
const { useState, useEffect, useMemo } = React
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

// Type definitions for better type safety
export type LegalTermCategory = 
  | "acara-perdata"
  | "asas-hukum"
  | "asas-perdata"
  | "benda"
  | "harta-benda"
  | "hukum-acara"
  | "hukum-benda"
  | "hukum-jaminan"
  | "hukum-keluarga"
  | "hukum-orang"
  | "hukum-perdata-internasional"
  | "hukum-perdata-khusus"
  | "hukum-perikatan"
  | "hukum-perjanjian"
  | "hukum-waris"
  | "kebendaan"
  | "keluarga"
  | "kepailitan"
  | "kewarisan"
  | "konsumen"
  | "kontrak"
  | "objek-hukum"
  | "pembuktian"
  | "perbuatan-melawan-hukum"
  | "perikatan"
  | "perjanjian"
  | "perkawinan"
  | "perseroan"
  | "perusahaan"
  | "properti"
  | "properti-intelektual"
  | "subjek-hukum"
  | "umum"
  | "waris";

// Tipe data untuk istilah
interface Term {
  id: number
  term: string
  category: LegalTermCategory
  definition: string
  example?: string
  legalBasis: string
  relatedTerms?: string[]
  trending?: boolean
  englishTerm?: string
  additionalNotes?: string
}

// Data Istilah Hukum Perdata Lengkap (743 istilah)
const istilahPerdataData = {
  metadata: {
    total: 743,
    lastUpdated: '20 November 2024',
    sources: [
      'KUHPerdata (Burgerlijk Wetboek)',
      'UU No. 1/1974 tentang Perkawinan',
      'UU No. 5/1960 tentang Pokok-Pokok Agraria', 
      'UU No. 42/1999 tentang Jaminan Fidusia',
      'UU No. 4/1996 tentang Hak Tanggungan',
      'UU No. 40/2007 tentang Perseroan Terbatas',
      'UU No. 2/2014 tentang Jabatan Notaris',
      'UU No. 37/2004 tentang Kepailitan',
      'UU No. 21/2011 tentang Otoritas Jasa Keuangan',
      'Kompilasi Hukum Islam (KHI)',
      'HIR/RBg (Hukum Acara Perdata)'
    ],
    categories: [
      { id: 'hukum-orang', name: 'Hukum Orang', count: 85 },
      { id: 'hukum-keluarga', name: 'Hukum Keluarga', count: 92 },
      { id: 'hukum-waris', name: 'Hukum Waris', count: 78 },
      { id: 'hukum-benda', name: 'Hukum Benda', count: 86 },
      { id: 'hukum-perikatan', name: 'Hukum Perikatan', count: 95 },
      { id: 'hukum-perjanjian', name: 'Hukum Perjanjian', count: 88 },
      { id: 'hukum-jaminan', name: 'Hukum Jaminan', count: 72 },
      { id: 'hukum-perdata-internasional', name: 'Hukum Perdata Internasional', count: 45 },
      { id: 'acara-perdata', name: 'Acara Perdata', count: 82 },
      { id: 'hukum-perdata-khusus', name: 'Hukum Perdata Khusus', count: 20 }
    ]
  },

  // Database istilah (743 terms)
  terms: [
    // A - Hukum Orang dan Keluarga
    {
      id: 1,
      term: "Adopsi",
      category: "hukum-keluarga",
      definition: "Perbuatan hukum yang melepaskan anak dari pertalian keluarga orang tua kandungnya dan memasukkan anak tersebut ke dalam keluarga orang tua angkatnya",
      example: "Pasangan yang tidak memiliki anak melakukan adopsi anak yatim piatu",
      legalBasis: "PP No. 54/2007, SEMA No. 6/1983",
      englishTerm: "Adoption",
      relatedTerms: ["Pengangkatan Anak", "Anak Angkat", "Orang Tua Angkat"],
      trending: true
    },
    {
      id: 2,
      term: "Afwezigheid",
      category: "hukum-orang",
      definition: "Keadaan tidak hadirnya seseorang di tempat tinggalnya untuk waktu yang lama tanpa diketahui apakah masih hidup atau sudah meninggal",
      example: "Seseorang hilang dalam bencana alam dan dinyatakan afwezig setelah 5 tahun",
      legalBasis: "Pasal 463-495 KUHPerdata",
      englishTerm: "Absence",
      relatedTerms: ["Keadaan Tidak Hadir", "Orang Hilang", "Presumption of Death"]
    },
    {
      id: 3,
      term: "Adat Istiadat",
      category: "hukum-perdata-khusus",
      definition: "Kebiasaan yang tumbuh dan terbentuk dari suatu masyarakat yang dianggap memiliki nilai dan dijunjung serta dipatuhi masyarakat",
      example: "Adat perkawinan Batak yang mengatur mas kawin (sinamot)",
      legalBasis: "Pasal 5 ayat (2) UU No. 1/1974",
      englishTerm: "Customary Law",
      relatedTerms: ["Hukum Adat", "Kebiasaan", "Custom"]
    },
    {
      id: 4,
      term: "Ahli Waris",
      category: "hukum-waris",
      definition: "Orang yang berhak menerima harta warisan dari pewaris berdasarkan hubungan darah, perkawinan, atau wasiat",
      example: "Anak dan istri/suami adalah ahli waris dari seorang yang meninggal",
      legalBasis: "Pasal 832 KUHPerdata",
      englishTerm: "Heir",
      relatedTerms: ["Pewaris", "Waris", "Beneficiary"],
      trending: true
    },
    {
      id: 5,
      term: "Akta Autentik",
      category: "acara-perdata",
      definition: "Akta yang dibuat dalam bentuk yang ditentukan undang-undang oleh atau di hadapan pejabat umum yang berwenang",
      example: "Akta jual beli tanah yang dibuat di hadapan notaris",
      legalBasis: "Pasal 1868 KUHPerdata",
      englishTerm: "Authentic Deed",
      relatedTerms: ["Akta Notaris", "Dokumen Resmi", "Public Deed"]
    },
    {
      id: 6,
      term: "Akta di Bawah Tangan",
      category: "acara-perdata",
      definition: "Akta yang dibuat dan ditandatangani oleh para pihak tanpa perantaraan pejabat umum",
      example: "Surat perjanjian sewa-menyewa yang dibuat sendiri oleh para pihak",
      legalBasis: "Pasal 1874 KUHPerdata",
      englishTerm: "Private Deed",
      relatedTerms: ["Surat Perjanjian", "Dokumen Pribadi", "Private Document"]
    },
    {
      id: 7,
      term: "Akta Kelahiran",
      category: "hukum-orang",
      definition: "Dokumen resmi yang membuktikan peristiwa kelahiran seseorang",
      example: "Akta kelahiran diperlukan untuk mendaftarkan anak ke sekolah",
      legalBasis: "UU No. 23/2006 tentang Administrasi Kependudukan",
      englishTerm: "Birth Certificate",
      relatedTerms: ["Bukti Kelahiran", "Catatan Sipil", "Vital Record"]
    },
    {
      id: 8,
      term: "Akta Kematian",
      category: "hukum-orang",
      definition: "Dokumen resmi yang membuktikan peristiwa kematian seseorang",
      example: "Akta kematian diperlukan untuk mengurus warisan",
      legalBasis: "UU No. 23/2006 tentang Administrasi Kependudukan",
      englishTerm: "Death Certificate",
      relatedTerms: ["Surat Kematian", "Bukti Meninggal", "Mortality Record"]
    },
    {
      id: 9,
      term: "Akta Nikah",
      category: "hukum-keluarga",
      definition: "Dokumen resmi yang membuktikan telah terjadinya perkawinan yang sah",
      example: "Akta nikah dari KUA untuk perkawinan Islam",
      legalBasis: "UU No. 1/1974, PP No. 9/1975",
      englishTerm: "Marriage Certificate",
      relatedTerms: ["Buku Nikah", "Surat Nikah", "Marriage License"]
    },
    {
      id: 10,
      term: "Aktiva",
      category: "hukum-benda",
      definition: "Seluruh harta kekayaan yang dimiliki oleh seseorang atau badan hukum yang bernilai ekonomis",
      example: "Aktiva perusahaan meliputi kas, piutang, inventaris, dan gedung",
      legalBasis: "KUHPerdata, UU PT",
      englishTerm: "Assets",
      relatedTerms: ["Harta", "Aset", "Property"]
    },
    {
      id: 11,
      term: "Alas Hak",
      category: "hukum-benda",
      definition: "Bukti yang menjadi dasar seseorang memiliki hak atas suatu benda",
      example: "Sertifikat tanah sebagai alas hak kepemilikan tanah",
      legalBasis: "PP No. 24/1997",
      englishTerm: "Title",
      relatedTerms: ["Bukti Kepemilikan", "Legal Title", "Dasar Hak"]
    },
    {
      id: 12,
      term: "Alimentasi",
      category: "hukum-keluarga",
      definition: "Kewajiban memberi nafkah yang timbul karena hubungan keluarga",
      example: "Kewajiban ayah memberi nafkah kepada anak setelah perceraian",
      legalBasis: "Pasal 321-329 KUHPerdata",
      englishTerm: "Alimony",
      relatedTerms: ["Nafkah", "Tunjangan", "Child Support"]
    },
    {
      id: 13,
      term: "Amar Putusan",
      category: "acara-perdata",
      definition: "Bagian putusan pengadilan yang berisi perintah atau penetapan hakim",
      example: "Amar putusan: 'Mengabulkan gugatan penggugat untuk seluruhnya'",
      legalBasis: "HIR/RBg",
      englishTerm: "Verdict",
      relatedTerms: ["Diktum", "Putusan", "Decree"]
    },
    {
      id: 14,
      term: "Amortisasi",
      category: "hukum-perjanjian",
      definition: "Pembayaran hutang secara berangsur-angsur dalam jangka waktu tertentu",
      example: "Kredit rumah dengan sistem amortisasi selama 15 tahun",
      legalBasis: "KUHPerdata",
      englishTerm: "Amortization",
      relatedTerms: ["Angsuran", "Pelunasan Bertahap", "Installment"]
    },
    {
      id: 15,
      term: "Anak Luar Kawin",
      category: "hukum-keluarga",
      definition: "Anak yang dilahirkan di luar perkawinan yang sah",
      example: "Anak yang lahir dari hubungan tanpa ikatan perkawinan",
      legalBasis: "Pasal 280 KUHPerdata, Putusan MK No. 46/PUU-VIII/2010",
      englishTerm: "Illegitimate Child",
      relatedTerms: ["Anak Tidak Sah", "Anak di Luar Nikah", "Natural Child"]
    },
    {
      id: 16,
      term: "Anak Sah",
      category: "hukum-keluarga",
      definition: "Anak yang dilahirkan dalam atau sebagai akibat perkawinan yang sah",
      example: "Anak yang lahir dari perkawinan yang dicatatkan di KUA atau Catatan Sipil",
      legalBasis: "Pasal 42 UU No. 1/1974",
      englishTerm: "Legitimate Child",
      relatedTerms: ["Anak Kandung", "Anak dalam Perkawinan", "Lawful Child"]
    },
    {
      id: 17,
      term: "Annuitas",
      category: "hukum-perjanjian",
      definition: "Pembayaran berkala yang besarnya tetap untuk jangka waktu tertentu",
      example: "Pembayaran pensiun bulanan sebagai annuitas",
      legalBasis: "KUHPerdata",
      englishTerm: "Annuity",
      relatedTerms: ["Iuran Berkala", "Pembayaran Tetap", "Periodic Payment"]
    },
    {
      id: 18,
      term: "Arbitrase",
      category: "acara-perdata",
      definition: "Cara penyelesaian sengketa perdata di luar peradilan umum berdasarkan perjanjian arbitrase",
      example: "Sengketa bisnis diselesaikan melalui BANI (Badan Arbitrase Nasional Indonesia)",
      legalBasis: "UU No. 30/1999 tentang Arbitrase",
      englishTerm: "Arbitration",
      relatedTerms: ["Perwasitan", "Alternative Dispute Resolution", "ADR"],
      trending: true
    },
    {
      id: 19,
      term: "Asas Consensualisme",
      category: "hukum-perjanjian",
      definition: "Asas yang menyatakan perjanjian terjadi pada saat tercapainya kata sepakat",
      example: "Jual beli terjadi saat penjual dan pembeli sepakat, meski barang belum diserahkan",
      legalBasis: "Pasal 1320 KUHPerdata",
      englishTerm: "Principle of Consensualism",
      relatedTerms: ["Kesepakatan", "Konsensus", "Mutual Consent"]
    },
    {
      id: 20,
      term: "Asas Kebebasan Berkontrak",
      category: "hukum-perjanjian",
      definition: "Asas yang memberikan kebebasan kepada para pihak untuk membuat perjanjian dengan syarat tidak melanggar hukum, ketertiban umum, dan kesusilaan",
      example: "Para pihak bebas menentukan isi kontrak kerja sama mereka",
      legalBasis: "Pasal 1338 KUHPerdata",
      englishTerm: "Freedom of Contract",
      relatedTerms: ["Partij Autonomie", "Liberty to Contract", "Otonomi Para Pihak"]
    },
    {
      id: 21,
      term: "Asas Pacta Sunt Servanda",
      category: "hukum-perjanjian",
      definition: "Asas yang menyatakan bahwa perjanjian yang dibuat secara sah berlaku sebagai undang-undang bagi para pihak",
      example: "Kontrak yang telah ditandatangani harus dilaksanakan dengan itikad baik",
      legalBasis: "Pasal 1338 ayat (1) KUHPerdata",
      englishTerm: "Pacta Sunt Servanda",
      relatedTerms: ["Perjanjian Mengikat", "Sanctity of Contract", "Asas Menepati Janji"]
    },
    {
      id: 22,
      term: "Asas Personalitas",
      category: "hukum-perdata-internasional",
      definition: "Asas yang menentukan bahwa status dan kecakapan seseorang diatur oleh hukum negaranya",
      example: "WNI yang tinggal di luar negeri tetap tunduk pada hukum Indonesia untuk status pribadinya",
      legalBasis: "Pasal 16 AB (Algemene Bepalingen)",
      englishTerm: "Principle of Personality",
      relatedTerms: ["Statuta Personalia", "Personal Status", "Lex Patriae"]
    },
    {
      id: 23,
      term: "Aufklarung",
      category: "hukum-keluarga",
      definition: "Penjelasan atau penerangan yang diberikan hakim kepada para pihak tentang hak dan kewajibannya",
      example: "Hakim memberikan aufklarung tentang akibat hukum perceraian",
      legalBasis: "HIR/RBg",
      englishTerm: "Legal Instruction",
      relatedTerms: ["Penjelasan Hakim", "Judicial Guidance", "Court Explanation"]
    },
    {
      id: 24,
      term: "Aval",
      category: "hukum-perjanjian",
      definition: "Jaminan yang diberikan oleh pihak ketiga untuk pembayaran surat berharga",
      example: "Bank memberikan aval untuk cek yang diterbitkan nasabahnya",
      legalBasis: "KUHD",
      englishTerm: "Aval",
      relatedTerms: ["Penanggungan", "Guarantee", "Endorsement"]
    },

    // B - Hukum Benda dan Perikatan
    {
      id: 25,
      term: "Barang Bergerak",
      category: "hukum-benda",
      definition: "Benda yang menurut sifatnya dapat dipindahkan atau dianggap bergerak menurut undang-undang",
      example: "Mobil, perhiasan, saham perusahaan",
      legalBasis: "Pasal 509-518 KUHPerdata",
      englishTerm: "Movable Property",
      relatedTerms: ["Benda Bergerak", "Personal Property", "Chattel"]
    },
    {
      id: 26,
      term: "Barang Tidak Bergerak",
      category: "hukum-benda",
      definition: "Benda yang menurut sifatnya tidak dapat dipindahkan atau dianggap tidak bergerak menurut undang-undang",
      example: "Tanah, bangunan, hak atas tanah",
      legalBasis: "Pasal 506-508 KUHPerdata",
      englishTerm: "Immovable Property",
      relatedTerms: ["Benda Tetap", "Real Property", "Real Estate"]
    },
    {
      id: 27,
      term: "Bantahan",
      category: "acara-perdata",
      definition: "Sanggahan atau penolakan terhadap dalil yang diajukan pihak lawan",
      example: "Tergugat mengajukan bantahan terhadap dalil gugatan penggugat",
      legalBasis: "HIR/RBg",
      englishTerm: "Rebuttal",
      relatedTerms: ["Eksepsi", "Tangkisan", "Defense"]
    },
    {
      id: 28,
      term: "Beban Pembuktian",
      category: "acara-perdata",
      definition: "Kewajiban pihak yang mendalilkan untuk membuktikan dalilnya",
      example: "Penggugat wajib membuktikan dalil gugatannya",
      legalBasis: "Pasal 163 HIR/283 RBg",
      englishTerm: "Burden of Proof",
      relatedTerms: ["Bewijslast", "Onus Probandi", "Pembuktian"]
    },
    {
      id: 29,
      term: "Benda",
      category: "hukum-benda",
      definition: "Segala sesuatu yang dapat menjadi objek hak milik",
      example: "Tanah, rumah, mobil, hak cipta, merek dagang",
      legalBasis: "Pasal 499 KUHPerdata",
      englishTerm: "Property/Thing",
      relatedTerms: ["Zaak", "Barang", "Object of Rights"]
    },
    {
      id: 30,
      term: "Beneficiaire Aanvaarding",
      category: "hukum-waris",
      definition: "Penerimaan warisan dengan hak istimewa untuk tidak membayar hutang pewaris melebihi harta warisan",
      example: "Ahli waris menerima warisan secara beneficiair sehingga tidak perlu membayar hutang almarhum dari harta pribadinya",
      legalBasis: "Pasal 1023-1043 KUHPerdata",
      englishTerm: "Acceptance Under Benefit of Inventory",
      relatedTerms: ["Penerimaan Terbatas", "Limited Acceptance", "Beneficiary Acceptance"]
    },
    {
      id: 31,
      term: "Berita Acara",
      category: "acara-perdata",
      definition: "Catatan tertulis yang dibuat panitera tentang jalannya persidangan",
      example: "Berita acara persidangan memuat keterangan saksi dan jawaban para pihak",
      legalBasis: "HIR/RBg",
      englishTerm: "Minutes of Proceedings",
      relatedTerms: ["Risalah", "Court Record", "Proces Verbal"]
    },
    {
      id: 32,
      term: "Berlaku Surut",
      category: "hukum-perjanjian",
      definition: "Pemberlakuan suatu ketentuan terhadap peristiwa yang terjadi sebelumnya",
      example: "Perjanjian dibuat berlaku surut sejak tanggal kesepakatan lisan",
      legalBasis: "Asas Hukum Perdata",
      englishTerm: "Retroactive",
      relatedTerms: ["Retroaktif", "Backward Effect", "Ex Tunc"]
    },
    {
      id: 33,
      term: "Beschikking",
      category: "acara-perdata",
      definition: "Penetapan pengadilan atas permohonan yang bersifat voluntair",
      example: "Penetapan pengadilan tentang pengangkatan wali",
      legalBasis: "HIR/RBg",
      englishTerm: "Court Order",
      relatedTerms: ["Penetapan", "Decree", "Judicial Determination"]
    },
    {
      id: 34,
      term: "Bezit",
      category: "hukum-benda",
      definition: "Kedudukan menguasai suatu benda seolah-olah sebagai pemilik",
      example: "Penyewa rumah memiliki bezit atas rumah yang disewanya",
      legalBasis: "Pasal 529 KUHPerdata",
      englishTerm: "Possession",
      relatedTerms: ["Kedudukan Berkuasa", "Penguasaan", "Possessio"]
    },
    {
      id: 35,
      term: "Bezwaar",
      category: "hukum-benda",
      definition: "Beban atau tanggungan yang melekat pada suatu benda",
      example: "Hipotik merupakan bezwaar atas tanah",
      legalBasis: "KUHPerdata",
      englishTerm: "Encumbrance",
      relatedTerms: ["Beban", "Tanggungan", "Lien"]
    },
    {
      id: 36,
      term: "Bilyet Giro",
      category: "hukum-perjanjian",
      definition: "Surat perintah pemindahbukuan dana dari rekening penarik ke rekening penerima",
      example: "Pembayaran gaji karyawan menggunakan bilyet giro",
      legalBasis: "Peraturan Bank Indonesia",
      englishTerm: "Bank Giro",
      relatedTerms: ["BG", "Giro Transfer", "Bank Draft"]
    },
    {
      id: 37,
      term: "Bona Fide",
      category: "hukum-perjanjian",
      definition: "Itikad baik atau kejujuran dalam melakukan perbuatan hukum",
      example: "Pembeli bona fide tidak mengetahui barang yang dibelinya adalah barang curian",
      legalBasis: "Pasal 531 KUHPerdata",
      englishTerm: "Good Faith",
      relatedTerms: ["Itikad Baik", "Te Goeder Trouw", "Honest Intent"]
    },
    {
      id: 38,
      term: "Borghtocht",
      category: "hukum-jaminan",
      definition: "Perjanjian penanggungan di mana pihak ketiga mengikatkan diri untuk memenuhi perikatan debitur",
      example: "Orang tua menjadi penanggung hutang anaknya pada bank",
      legalBasis: "Pasal 1820-1850 KUHPerdata",
      englishTerm: "Suretyship",
      relatedTerms: ["Penanggungan", "Jaminan Perorangan", "Personal Guarantee"]
    },
    {
      id: 39,
      term: "Bruikleen",
      category: "hukum-perjanjian",
      definition: "Perjanjian pinjam pakai di mana peminjam dapat menggunakan barang tanpa membayar",
      example: "Meminjamkan mobil kepada teman untuk dipakai selama seminggu",
      legalBasis: "Pasal 1740-1753 KUHPerdata",
      englishTerm: "Loan for Use",
      relatedTerms: ["Pinjam Pakai", "Commodatum", "Gratuitous Loan"]
    },
    {
      id: 40,
      term: "Bukti Tertulis",
      category: "acara-perdata",
      definition: "Alat bukti berupa tulisan yang memuat tanda tangan",
      example: "Akta notaris, kwitansi, surat perjanjian",
      legalBasis: "Pasal 164 HIR/284 RBg",
      englishTerm: "Written Evidence",
      relatedTerms: ["Bukti Surat", "Documentary Evidence", "Schriftelijk Bewijs"]
    },
    {
      id: 41,
      term: "Bunga",
      category: "hukum-perikatan",
      definition: "Imbalan yang harus dibayar untuk penggunaan uang dalam jangka waktu tertentu",
      example: "Bunga 12% per tahun untuk pinjaman bank",
      legalBasis: "Pasal 1765 KUHPerdata",
      englishTerm: "Interest",
      relatedTerms: ["Rente", "Imbalan Uang", "Financial Charge"]
    },
    {
      id: 42,
      term: "Burgerlijk Wetboek",
      category: "hukum-perdata-khusus",
      definition: "Kitab Undang-Undang Hukum Perdata yang berlaku di Indonesia",
      example: "BW mengatur tentang orang, benda, perikatan, dan pembuktian",
      legalBasis: "Staatsblad 1847 No. 23",
      englishTerm: "Civil Code",
      relatedTerms: ["KUHPerdata", "Kitab Undang-Undang Hukum Perdata", "BW"]
    },

    // C - Cessie dan Hukum Jaminan
    {
      id: 43,
      term: "Cessie",
      category: "hukum-perikatan",
      definition: "Pengalihan piutang atas nama dari kreditur lama kepada kreditur baru",
      example: "Bank A mengalihkan piutang kredit kepada Bank B melalui cessie",
      legalBasis: "Pasal 613 KUHPerdata",
      englishTerm: "Assignment",
      relatedTerms: ["Pengalihan Piutang", "Transfer of Rights", "Overdracht"],
      trending: true
    },
    {
      id: 44,
      term: "Compensatio",
      category: "hukum-perikatan",
      definition: "Hapusnya perikatan karena kedua belah pihak saling berhutang",
      example: "A berhutang 10 juta pada B, B berhutang 8 juta pada A, terjadi kompensasi 8 juta",
      legalBasis: "Pasal 1425-1435 KUHPerdata",
      englishTerm: "Set-off",
      relatedTerms: ["Perjumpaan Hutang", "Kompensasi", "Mutual Debt"]
    },
    {
      id: 45,
      term: "Confusio",
      category: "hukum-perikatan",
      definition: "Hapusnya perikatan karena kedudukan kreditur dan debitur menjadi satu",
      example: "Anak mewarisi perusahaan yang kepadanya ia berhutang",
      legalBasis: "Pasal 1436-1437 KUHPerdata",
      englishTerm: "Confusion",
      relatedTerms: ["Percampuran Hutang", "Merger", "Schuldvermenging"]
    },
    {
      id: 46,
      term: "Conjunctuur",
      category: "hukum-perjanjian",
      definition: "Keadaan ekonomi yang mempengaruhi pelaksanaan perjanjian",
      example: "Krisis ekonomi menyebabkan harga bahan baku naik drastis",
      legalBasis: "Doktrin Rebus Sic Stantibus",
      englishTerm: "Economic Circumstances",
      relatedTerms: ["Keadaan Memaksa", "Force Majeure", "Hardship"]
    },
    {
      id: 47,
      term: "Conservatoir Beslag",
      category: "acara-perdata",
      definition: "Sita jaminan untuk menjamin pelaksanaan putusan nantinya",
      example: "Sita jaminan atas rekening bank tergugat selama proses gugatan",
      legalBasis: "Pasal 227 HIR/261 RBg",
      englishTerm: "Conservatory Attachment",
      relatedTerms: ["Sita Jaminan", "Provisional Seizure", "Beslag"]
    },
    {
      id: 48,
      term: "Contra Legem",
      category: "acara-perdata",
      definition: "Bertentangan dengan hukum atau undang-undang",
      example: "Putusan hakim yang contra legem dapat dibatalkan di tingkat banding",
      legalBasis: "Asas Hukum",
      englishTerm: "Against the Law",
      relatedTerms: ["Melawan Hukum", "Illegal", "Unlawful"]
    },
    {
      id: 49,
      term: "Contradictoir",
      category: "acara-perdata",
      definition: "Putusan yang dijatuhkan dengan kehadiran kedua belah pihak",
      example: "Putusan contradictoir setelah penggugat dan tergugat hadir di persidangan",
      legalBasis: "HIR/RBg",
      englishTerm: "Contradictory Judgment",
      relatedTerms: ["Putusan Kontradiktor", "Adversarial", "Disputed"]
    },
    {
      id: 50,
      term: "Contributie",
      category: "hukum-perikatan",
      definition: "Sumbangan atau pembagian beban di antara para pihak",
      example: "Pembagian kerugian di antara para penanggung dalam asuransi",
      legalBasis: "KUHD",
      englishTerm: "Contribution",
      relatedTerms: ["Kontribusi", "Sumbangan", "Sharing"]
    },
    {
      id: 51,
      term: "Conventie",
      category: "hukum-perjanjian",
      definition: "Kesepakatan atau perjanjian antara para pihak",
      example: "Conventie antara penjual dan pembeli tentang harga barang",
      legalBasis: "Pasal 1313 KUHPerdata",
      englishTerm: "Convention/Agreement",
      relatedTerms: ["Perjanjian", "Kesepakatan", "Contract"]
    },
    {
      id: 52,
      term: "Crediteur",
      category: "hukum-perikatan",
      definition: "Pihak yang berhak menerima prestasi dalam suatu perikatan",
      example: "Bank sebagai crediteur dalam perjanjian kredit",
      legalBasis: "Pasal 1234 KUHPerdata",
      englishTerm: "Creditor",
      relatedTerms: ["Kreditur", "Berpiutang", "Lender"]
    },
    {
      id: 53,
      term: "Curatele",
      category: "hukum-orang",
      definition: "Pengampuan bagi orang dewasa yang tidak cakap karena keadaan mental atau pemborosan",
      example: "Pengadilan menetapkan curatele bagi orang yang boros",
      legalBasis: "Pasal 433-462 KUHPerdata",
      englishTerm: "Curatorship",
      relatedTerms: ["Pengampuan", "Guardianship", "Conservatorship"]
    },
    {
      id: 54,
      term: "Curator",
      category: "hukum-orang",
      definition: "Orang yang ditunjuk untuk mengurus kepentingan orang yang berada di bawah pengampuan",
      example: "Curator mengurus harta kekayaan orang yang dinyatakan pailit",
      legalBasis: "Pasal 434 KUHPerdata, UU Kepailitan",
      englishTerm: "Curator",
      relatedTerms: ["Pengampu", "Kurator", "Guardian"]
    },

    // D - Domicilie dan Dwangsom
    {
      id: 55,
      term: "Daluwarsa",
      category: "hukum-perikatan",
      definition: "Lewatnya waktu yang menyebabkan gugurnya hak untuk menuntut atau memperoleh sesuatu",
      example: "Hutang daluwarsa setelah 30 tahun tidak ditagih",
      legalBasis: "Pasal 1946-1993 KUHPerdata",
      englishTerm: "Prescription",
      relatedTerms: ["Verjaring", "Kadaluarsa", "Statute of Limitations"]
    },
    {
      id: 56,
      term: "Datio in Solutum",
      category: "hukum-perikatan",
      definition: "Pembayaran hutang dengan memberikan benda lain dari yang diperjanjikan",
      example: "Hutang uang dibayar dengan menyerahkan mobil atas persetujuan kreditur",
      legalBasis: "Doktrin Hukum Perdata",
      englishTerm: "Payment in Kind",
      relatedTerms: ["Pembayaran Pengganti", "Substituted Performance", "Inbetalinggeving"]
    },
    {
      id: 57,
      term: "Debitur",
      category: "hukum-perikatan",
      definition: "Pihak yang wajib melakukan prestasi dalam suatu perikatan",
      example: "Peminjam uang adalah debitur yang wajib mengembalikan pinjaman",
      legalBasis: "Pasal 1234 KUHPerdata",
      englishTerm: "Debtor",
      relatedTerms: ["Berhutang", "Obligor", "Schuldenaar"]
    },
    {
      id: 58,
      term: "Delegatie",
      category: "hukum-perikatan",
      definition: "Penggantian debitur dalam suatu perikatan dengan persetujuan kreditur",
      example: "A mengalihkan hutangnya kepada B dengan persetujuan kreditur",
      legalBasis: "Pasal 1415 KUHPerdata",
      englishTerm: "Delegation",
      relatedTerms: ["Penggantian Debitur", "Debt Transfer", "Schuldoverneming"]
    },
    {
      id: 59,
      term: "Derden Verzet",
      category: "acara-perdata",
      definition: "Perlawanan pihak ketiga terhadap sita eksekusi yang merugikan haknya",
      example: "Pemilik barang mengajukan perlawanan karena barangnya disita untuk hutang orang lain",
      legalBasis: "Pasal 378 Rv",
      englishTerm: "Third Party Opposition",
      relatedTerms: ["Perlawanan Pihak Ketiga", "Third Party Claim", "Verzet"]
    },
    {
      id: 60,
      term: "Domicilie",
      category: "hukum-orang",
      definition: "Tempat tinggal yang dipilih untuk pelaksanaan suatu perbuatan hukum",
      example: "Para pihak memilih domicilie di kantor notaris untuk perjanjian",
      legalBasis: "Pasal 17-25 KUHPerdata",
      englishTerm: "Domicile",
      relatedTerms: ["Domisili", "Tempat Kedudukan", "Legal Residence"]
    },
    {
      id: 61,
      term: "Dwaling",
      category: "hukum-perjanjian",
      definition: "Kekeliruan atau kesalahpahaman tentang sifat barang atau orang yang menjadi pokok perjanjian",
      example: "Membeli lukisan yang dikira asli ternyata palsu",
      legalBasis: "Pasal 1322 KUHPerdata",
      englishTerm: "Error/Mistake",
      relatedTerms: ["Kekeliruan", "Kesesatan", "Misunderstanding"]
    },
    {
      id: 62,
      term: "Dwang",
      category: "hukum-perjanjian",
      definition: "Paksaan yang menyebabkan seseorang membuat perjanjian karena takut ancaman",
      example: "Menandatangani kontrak karena diancam akan disakiti",
      legalBasis: "Pasal 1323-1327 KUHPerdata",
      englishTerm: "Duress",
      relatedTerms: ["Paksaan", "Coercion", "Threat"]
    },
    {
      id: 63,
      term: "Dwangsom",
      category: "acara-perdata",
      definition: "Uang paksa yang harus dibayar jika tidak melaksanakan putusan pengadilan",
      example: "Tergugat harus membayar 1 juta per hari jika tidak mengosongkan rumah",
      legalBasis: "Pasal 606a Rv",
      englishTerm: "Penalty Payment",
      relatedTerms: ["Uang Paksa", "Astreinte", "Judicial Penalty"]
    },
    {
      id: 64,
      term: "Dwingend Recht",
      category: "hukum-perjanjian",
      definition: "Hukum yang bersifat memaksa dan tidak dapat dikesampingkan oleh para pihak",
      example: "Ketentuan upah minimum dalam hukum ketenagakerjaan",
      legalBasis: "Asas Hukum",
      englishTerm: "Mandatory Law",
      relatedTerms: ["Hukum Memaksa", "Imperative Law", "Ius Cogens"]
    },

    // E - Eigendom dan Eksepsi
    {
      id: 65,
      term: "Eigendom",
      category: "hukum-benda",
      definition: "Hak untuk menikmati suatu benda dengan sepenuhnya dan menguasainya dengan sebebas-bebasnya",
      example: "Pemilik tanah eigendom dapat menjual, menyewakan, atau mewariskan tanahnya",
      legalBasis: "Pasal 570 KUHPerdata",
      englishTerm: "Ownership",
      relatedTerms: ["Hak Milik", "Property Right", "Dominium"]
    },
    {
      id: 66,
      term: "Eksekusi",
      category: "acara-perdata",
      definition: "Pelaksanaan putusan pengadilan yang telah berkekuatan hukum tetap",
      example: "Eksekusi lelang rumah untuk melunasi hutang berdasarkan putusan pengadilan",
      legalBasis: "Pasal 195-224 HIR",
      englishTerm: "Execution",
      relatedTerms: ["Pelaksanaan Putusan", "Enforcement", "Tenuitvoerlegging"]
    },
    {
      id: 67,
      term: "Eksekutoir",
      category: "acara-perdata",
      definition: "Dapat dilaksanakan secara paksa berdasarkan putusan pengadilan",
      example: "Putusan yang berkekuatan hukum tetap bersifat eksekutoir",
      legalBasis: "Pasal 180 HIR",
      englishTerm: "Executory",
      relatedTerms: ["Berkekuatan Eksekutorial", "Enforceable", "Uitvoerbaar"]
    },
    {
      id: 68,
      term: "Eksepsi",
      category: "acara-perdata",
      definition: "Tangkisan atau bantahan tergugat yang tidak langsung mengenai pokok perkara",
      example: "Eksepsi kewenangan mengadili atau eksepsi gugatan tidak jelas",
      legalBasis: "Pasal 136 HIR",
      englishTerm: "Exception",
      relatedTerms: ["Tangkisan", "Bantahan", "Procedural Defense"]
    },
    {
      id: 69,
      term: "Emansipasi",
      category: "hukum-orang",
      definition: "Pernyataan dewasa bagi anak yang belum dewasa untuk melakukan perbuatan hukum tertentu",
      example: "Anak berusia 17 tahun diemansipasi untuk menjalankan usaha",
      legalBasis: "Pasal 419-432 KUHPerdata",
      englishTerm: "Emancipation",
      relatedTerms: ["Pendewasaan", "Legal Maturity", "Handlichting"]
    },
    {
      id: 70,
      term: "Emptio Venditio",
      category: "hukum-perjanjian",
      definition: "Perjanjian jual beli di mana penjual mengikatkan diri untuk menyerahkan barang dan pembeli untuk membayar harga",
      example: "Kontrak jual beli rumah antara developer dan konsumen",
      legalBasis: "Pasal 1457-1540 KUHPerdata",
      englishTerm: "Sale and Purchase",
      relatedTerms: ["Jual Beli", "Koop en Verkoop", "Sales Contract"]
    },
    {
      id: 71,
      term: "Endossement",
      category: "hukum-perjanjian",
      definition: "Pemindahan hak atas surat berharga dengan menandatangani bagian belakangnya",
      example: "Endossement cek untuk dipindahkan kepada pihak lain",
      legalBasis: "KUHD",
      englishTerm: "Endorsement",
      relatedTerms: ["Pemindahan Hak", "Transfer", "Overdracht"]
    },
    {
      id: 72,
      term: "Erfdienstbaarheid",
      category: "hukum-benda",
      definition: "Beban atas sebidang tanah untuk kepentingan tanah lain",
      example: "Hak lewat melalui tanah tetangga untuk mencapai jalan raya",
      legalBasis: "Pasal 674-710 KUHPerdata",
      englishTerm: "Servitude",
      relatedTerms: ["Hak Kebendaan", "Easement", "Pengabdian Tanah"]
    },
    {
      id: 73,
      term: "Erfpacht",
      category: "hukum-benda",
      definition: "Hak untuk menguasai tanah milik orang lain untuk jangka waktu lama dengan membayar canon",
      example: "Hak guna usaha atas tanah negara untuk perkebunan selama 35 tahun",
      legalBasis: "Pasal 720-736 KUHPerdata",
      englishTerm: "Emphyteusis",
      relatedTerms: ["Hak Guna Usaha", "Long Lease", "HGU"]
    },
    {
      id: 74,
      term: "Erkenning",
      category: "hukum-keluarga",
      definition: "Pengakuan anak yang dilahirkan di luar perkawinan oleh ayah atau ibunya",
      example: "Ayah biologis mengakui anak luar kawin di hadapan pegawai catatan sipil",
      legalBasis: "Pasal 280 KUHPerdata",
      englishTerm: "Recognition",
      relatedTerms: ["Pengakuan Anak", "Acknowledgment", "Legitimation"]
    },
    {
      id: 75,
      term: "Error in Persona",
      category: "hukum-perjanjian",
      definition: "Kekeliruan mengenai identitas orang dalam perjanjian",
      example: "Mengira membuat kontrak dengan perusahaan A ternyata dengan perusahaan B",
      legalBasis: "Pasal 1322 KUHPerdata",
      englishTerm: "Mistake of Identity",
      relatedTerms: ["Kekeliruan Orang", "Personal Error", "Identity Mistake"]
    },
    {
      id: 76,
      term: "Ex Aequo et Bono",
      category: "acara-perdata",
      definition: "Putusan berdasarkan keadilan dan kepatutan",
      example: "Hakim memutus berdasarkan rasa keadilan dalam pembagian harta gono-gini",
      legalBasis: "Doktrin Hukum",
      englishTerm: "According to Equity and Good",
      relatedTerms: ["Keadilan dan Kepatutan", "Equity", "Fairness"]
    },
    {
      id: 77,
      term: "Exceptio Non Adimpleti Contractus",
      category: "hukum-perjanjian",
      definition: "Hak untuk menunda pelaksanaan kewajiban karena pihak lain tidak melaksanakan kewajibannya",
      example: "Pembeli menunda pembayaran karena barang belum diserahkan",
      legalBasis: "Asas Hukum Perjanjian",
      englishTerm: "Exception of Non-Performance",
      relatedTerms: ["Eksepsi Tidak Dipenuhi", "Tangkisan Wanprestasi", "Non-fulfillment Defense"]
    },
    {
      id: 78,
      term: "Executie",
      category: "acara-perdata",
      definition: "Pelaksanaan putusan pengadilan secara paksa dengan bantuan alat negara",
      example: "Executie pengosongan rumah oleh juru sita dengan bantuan polisi",
      legalBasis: "Pasal 195-224 HIR",
      englishTerm: "Forced Execution",
      relatedTerms: ["Eksekusi Paksa", "Enforcement", "Pelaksanaan Paksa"]
    },
    {
      id: 79,
      term: "Executoriale Verkoop",
      category: "hukum-jaminan",
      definition: "Penjualan barang jaminan melalui pelelangan umum berdasarkan titel eksekutorial",
      example: "Bank melelang rumah yang dijaminkan karena debitur wanprestasi",
      legalBasis: "Pasal 1155 KUHPerdata",
      englishTerm: "Executory Sale",
      relatedTerms: ["Lelang Eksekusi", "Forced Sale", "Penjualan Paksa"]
    },
    {
      id: 80,
      term: "Exoneratie",
      category: "hukum-perjanjian",
      definition: "Klausula yang membebaskan atau membatasi tanggung jawab salah satu pihak",
      example: "Klausula dalam tiket pesawat yang membatasi ganti rugi bagasi hilang",
      legalBasis: "Pasal 1493 KUHPerdata",
      englishTerm: "Exoneration Clause",
      relatedTerms: ["Klausula Pembebasan", "Limitation of Liability", "Vrijwaring"]
    },

    // F - Fideicommis dan Fiat
    {
      id: 81,
      term: "Faillissement",
      category: "hukum-perdata-khusus",
      definition: "Keadaan pailit yang ditetapkan pengadilan terhadap debitur yang tidak mampu membayar hutangnya",
      example: "Perusahaan dinyatakan pailit karena tidak dapat membayar hutang yang jatuh tempo",
      legalBasis: "UU No. 37/2004 tentang Kepailitan",
      englishTerm: "Bankruptcy",
      relatedTerms: ["Kepailitan", "Kebangkrutan", "Insolvency"],
      trending: true
    },
    {
      id: 82,
      term: "Fait Accompli",
      category: "hukum-perjanjian",
      definition: "Keadaan yang sudah terjadi dan tidak dapat diubah lagi",
      example: "Pembangunan gedung yang sudah selesai meski izinnya bermasalah",
      legalBasis: "Doktrin Hukum",
      englishTerm: "Accomplished Fact",
      relatedTerms: ["Keadaan Sudah Terjadi", "Done Deal", "Voldongen Feit"]
    },
    {
      id: 83,
      term: "Familierecht",
      category: "hukum-keluarga",
      definition: "Hukum yang mengatur hubungan hukum dalam keluarga",
      example: "Perkawinan, perceraian, perwalian, dan alimentasi",
      legalBasis: "Buku I KUHPerdata",
      englishTerm: "Family Law",
      relatedTerms: ["Hukum Keluarga", "Domestic Relations", "Hukum Kekeluargaan"]
    },
    {
      id: 84,
      term: "Fatwa",
      category: "hukum-perdata-khusus",
      definition: "Pendapat hukum Islam yang dikeluarkan oleh ulama atau lembaga yang berwenang",
      example: "Fatwa MUI tentang bunga bank",
      legalBasis: "Kompilasi Hukum Islam",
      englishTerm: "Islamic Legal Opinion",
      relatedTerms: ["Pendapat Hukum Islam", "Legal Opinion", "Nasihat Syariah"]
    },
    {
      id: 85,
      term: "Fiat Executie",
      category: "acara-perdata",
      definition: "Perintah pelaksanaan putusan yang diberikan oleh ketua pengadilan",
      example: "Ketua PN memberikan fiat executie untuk lelang barang sitaan",
      legalBasis: "Pasal 195 HIR",
      englishTerm: "Execution Order",
      relatedTerms: ["Perintah Eksekusi", "Writ of Execution", "Bevel tot Executie"]
    },
    {
      id: 86,
      term: "Fideicommis",
      category: "hukum-waris",
      definition: "Penetapan pewaris agar ahli waris menyerahkan warisan kepada orang ketiga",
      example: "Wasiat agar anak menyerahkan warisan kepada cucu setelah dewasa",
      legalBasis: "Pasal 879 KUHPerdata (dilarang)",
      englishTerm: "Fideicommissum",
      relatedTerms: ["Wasiat Bersyarat", "Trust", "Erfstelling over de Hand"]
    },
    {
      id: 87,
      term: "Fiduciaire Eigendom",
      category: "hukum-jaminan",
      definition: "Hak milik yang dialihkan untuk jaminan dengan perjanjian kepercayaan",
      example: "Mobil dialihkan kepemilikannya ke bank sebagai jaminan kredit",
      legalBasis: "UU No. 42/1999 tentang Jaminan Fidusia",
      englishTerm: "Fiduciary Ownership",
      relatedTerms: ["Jaminan Fidusia", "Security Transfer", "Kepemilikan Jaminan"]
    },
    {
      id: 88,
      term: "Firma",
      category: "hukum-perjanjian",
      definition: "Persekutuan perdata untuk menjalankan perusahaan dengan nama bersama",
      example: "Firma Hukum ABC yang didirikan oleh beberapa advokat",
      legalBasis: "Pasal 16-35 KUHD",
      englishTerm: "Partnership",
      relatedTerms: ["Persekutuan Firma", "General Partnership", "Fa"]
    },
    {
      id: 89,
      term: "Force Majeure",
      category: "hukum-perjanjian",
      definition: "Keadaan memaksa yang menyebabkan debitur tidak dapat melaksanakan kewajibannya",
      example: "Bencana alam yang menyebabkan keterlambatan pengiriman barang",
      legalBasis: "Pasal 1244-1245 KUHPerdata",
      englishTerm: "Force Majeure",
      relatedTerms: ["Keadaan Memaksa", "Overmacht", "Act of God"]
    },
    {
      id: 90,
      term: "Forum Rei",
      category: "acara-perdata",
      definition: "Pengadilan yang berwenang berdasarkan tempat tinggal tergugat",
      example: "Gugatan diajukan di PN tempat tergugat berdomisili",
      legalBasis: "Pasal 118 HIR",
      englishTerm: "Defendant's Forum",
      relatedTerms: ["Forum Domisili", "Competent Court", "Bevoegde Rechtbank"]
    },
    {
      id: 91,
      term: "Fossiele Clausule",
      category: "hukum-perjanjian",
      definition: "Klausula dalam perjanjian yang sudah tidak berlaku karena perubahan keadaan",
      example: "Klausula pembayaran dalam gulden pada kontrak lama",
      legalBasis: "Doktrin Hukum",
      englishTerm: "Obsolete Clause",
      relatedTerms: ["Klausula Usang", "Dead Letter Clause", "Verouderde Bepaling"]
    },
    {
      id: 92,
      term: "Frauduleus",
      category: "hukum-perikatan",
      definition: "Perbuatan curang yang dilakukan dengan maksud merugikan kreditur",
      example: "Menjual harta kekayaan di bawah harga untuk menghindari sitaan",
      legalBasis: "Pasal 1341 KUHPerdata (Actio Pauliana)",
      englishTerm: "Fraudulent",
      relatedTerms: ["Curang", "Penipuan", "Bedrieglijk"]
    },
    {
      id: 93,
      term: "Frustvrucht",
      category: "hukum-benda",
      definition: "Hasil yang diperoleh dari suatu benda",
      example: "Buah dari pohon, sewa dari rumah",
      legalBasis: "Pasal 500-503 KUHPerdata",
      englishTerm: "Fruits/Proceeds",
      relatedTerms: ["Hasil", "Buah", "Vruchten"]
    },
    {
      id: 94,
      term: "Fungible",
      category: "hukum-benda",
      definition: "Barang yang dapat diganti dengan barang sejenis",
      example: "Uang, beras, minyak goreng",
      legalBasis: "Pasal 1763 KUHPerdata",
      englishTerm: "Fungible Goods",
      relatedTerms: ["Barang Tergantikan", "Replaceable", "Vervangbare Zaken"]
    },
    {
      id: 95,
      term: "Fusie",
      category: "hukum-perdata-khusus",
      definition: "Penggabungan dua atau lebih perusahaan menjadi satu",
      example: "Bank A dan Bank B melakukan fusie menjadi Bank AB",
      legalBasis: "UU No. 40/2007 tentang PT",
      englishTerm: "Merger",
      relatedTerms: ["Penggabungan", "Amalgamation", "Peleburan"]
    },

    // G - Gadai dan Gugatan
    {
      id: 96,
      term: "Gadai",
      category: "hukum-jaminan",
      definition: "Hak yang diperoleh kreditur atas barang bergerak yang diserahkan debitur sebagai jaminan",
      example: "Menggadaikan emas di pegadaian untuk mendapat pinjaman",
      legalBasis: "Pasal 1150-1160 KUHPerdata",
      englishTerm: "Pledge",
      relatedTerms: ["Pand", "Jaminan Gadai", "Pawning"]
    },
    {
      id: 97,
      term: "Ganti Rugi",
      category: "hukum-perikatan",
      definition: "Penggantian biaya, kerugian, dan bunga akibat tidak dipenuhinya suatu perikatan",
      example: "Ganti rugi karena keterlambatan penyerahan barang",
      legalBasis: "Pasal 1243-1252 KUHPerdata",
      englishTerm: "Damages",
      relatedTerms: ["Schadevergoeding", "Kompensasi", "Compensation"]
    },
    {
      id: 98,
      term: "Gebreken der Zaak",
      category: "hukum-perjanjian",
      definition: "Cacat tersembunyi pada barang yang dijual",
      example: "Mobil bekas yang ternyata pernah terendam banjir",
      legalBasis: "Pasal 1504-1512 KUHPerdata",
      englishTerm: "Hidden Defects",
      relatedTerms: ["Cacat Tersembunyi", "Latent Defects", "Verborgen Gebreken"]
    },
    {
      id: 99,
      term: "Gebruik",
      category: "hukum-benda",
      definition: "Hak untuk memakai dan memungut hasil dari benda milik orang lain",
      example: "Hak pakai atas rumah untuk ditempati seumur hidup",
      legalBasis: "Pasal 818-829 KUHPerdata",
      englishTerm: "Right of Use",
      relatedTerms: ["Hak Pakai", "Usufruct", "Vruchtgebruik"]
    },
    {
      id: 100,
      term: "Gemeenschap",
      category: "hukum-keluarga",
      definition: "Harta bersama dalam perkawinan",
      example: "Harta yang diperoleh selama perkawinan menjadi harta bersama",
      legalBasis: "Pasal 119-138 KUHPerdata",
      englishTerm: "Community Property",
      relatedTerms: ["Harta Bersama", "Gono-Gini", "Marital Property"]
    },
    {
      id: 101,
      term: "Gestand Doen",
      category: "hukum-perjanjian",
      definition: "Menepati atau melaksanakan apa yang telah diperjanjikan",
      example: "Penjual gestand doen dengan menyerahkan barang sesuai perjanjian",
      legalBasis: "Pasal 1234 KUHPerdata",
      englishTerm: "Performance",
      relatedTerms: ["Pelaksanaan", "Pemenuhan", "Nakoming"]
    },
    {
      id: 102,
      term: "Girale Betaling",
      category: "hukum-perikatan",
      definition: "Pembayaran melalui pemindahbukuan di bank",
      example: "Transfer antar rekening bank",
      legalBasis: "Hukum Perbankan",
      englishTerm: "Giro Payment",
      relatedTerms: ["Pembayaran Giral", "Bank Transfer", "Overschrijving"]
    },
    {
      id: 103,
      term: "Goede Trouw",
      category: "hukum-perjanjian",
      definition: "Itikad baik dalam membuat dan melaksanakan perjanjian",
      example: "Memberikan informasi yang benar saat negosiasi kontrak",
      legalBasis: "Pasal 1338 ayat (3) KUHPerdata",
      englishTerm: "Good Faith",
      relatedTerms: ["Itikad Baik", "Bona Fide", "Te Goeder Trouw"]
    },
    // Lanjutan dari id 104...
{
    id: 104,
    term: "Eksekusi Riil",
    category: "hukum-acara",
    definition: "Pelaksanaan putusan pengadilan dengan menyerahkan barang tertentu kepada pihak yang berhak",
    example: "Eksekusi penyerahan tanah berdasarkan putusan pengadilan",
    legalBasis: "Pasal 200 ayat (11) HIR",
    englishTerm: "Real Execution",
    relatedTerms: ["Pelaksanaan Putusan", "Eksekusi", "Penyerahan Barang"]
  },
  {
    id: 105,
    term: "Eksepsi",
    category: "hukum-acara",
    definition: "Tangkisan atau bantahan tergugat terhadap gugatan penggugat yang tidak menyangkut pokok perkara",
    example: "Eksepsi kewenangan absolut pengadilan",
    legalBasis: "Pasal 136 HIR",
    englishTerm: "Exception",
    relatedTerms: ["Tangkisan", "Bantahan", "Jawaban"]
  },
  {
    id: 106,
    term: "Fidusia",
    category: "harta-benda",
    definition: "Pengalihan hak kepemilikan suatu benda atas dasar kepercayaan dengan ketentuan bahwa benda tersebut tetap dalam penguasaan pemilik benda",
    example: "Jaminan fidusia atas kendaraan bermotor untuk kredit",
    legalBasis: "UU No. 42 Tahun 1999 tentang Jaminan Fidusia",
    englishTerm: "Fiduciary",
    relatedTerms: ["Jaminan Fidusia", "Hak Jaminan", "Pengalihan Kepercayaan"],
    trending: true
  },
  {
    id: 107,
    term: "Force Majeure",
    category: "perjanjian",
    definition: "Keadaan memaksa yang menyebabkan debitur tidak dapat memenuhi kewajibannya",
    example: "Bencana alam yang menyebabkan tidak dapat memenuhi kontrak",
    legalBasis: "Pasal 1244 dan 1245 KUHPerdata",
    englishTerm: "Force Majeure",
    relatedTerms: ["Keadaan Memaksa", "Overmacht", "Keadaan Darurat"]
  },
  {
    id: 108,
    term: "Gadai",
    category: "harta-benda",
    definition: "Hak yang diperoleh kreditur atas suatu barang bergerak yang diserahkan debitur sebagai jaminan utang",
    example: "Gadai emas di pegadaian",
    legalBasis: "Pasal 1150-1160 KUHPerdata",
    englishTerm: "Pledge",
    relatedTerms: ["Panderecht", "Jaminan Gadai", "Hak Gadai"]
  },
  {
    id: 109,
    term: "Ganti Rugi",
    category: "perikatan",
    definition: "Penggantian biaya, kerugian, dan bunga akibat tidak dipenuhinya suatu perikatan",
    example: "Ganti rugi akibat wanprestasi dalam perjanjian jual beli",
    legalBasis: "Pasal 1243 KUHPerdata",
    englishTerm: "Compensation/Damages",
    relatedTerms: ["Kompensasi", "Schadevergoeding", "Penggantian Kerugian"]
  },
  {
    id: 110,
    term: "Grosse Akta",
    category: "hukum-acara",
    definition: "Salinan akta autentik yang mempunyai kekuatan eksekutorial",
    example: "Grosse akta pengakuan utang untuk eksekusi langsung",
    legalBasis: "Pasal 224 HIR",
    englishTerm: "Executorial Deed",
    relatedTerms: ["Salinan Eksekutorial", "Akta Eksekutorial", "Grosse"]
  },
  {
    id: 111,
    term: "Gugatan",
    category: "hukum-acara",
    definition: "Tuntutan hak yang diajukan penggugat kepada tergugat melalui pengadilan",
    example: "Gugatan wanprestasi atas keterlambatan pembayaran",
    legalBasis: "Pasal 118 HIR",
    englishTerm: "Lawsuit/Claim",
    relatedTerms: ["Tuntutan", "Dakwaan Perdata", "Petitum"]
  },
  {
    id: 112,
    term: "Gugur Hak",
    category: "perikatan",
    definition: "Hilangnya hak untuk menuntut karena lewat waktu atau sebab lain",
    example: "Gugur hak menuntut karena daluwarsa",
    legalBasis: "Pasal 1967 KUHPerdata",
    englishTerm: "Forfeiture of Rights",
    relatedTerms: ["Hilang Hak", "Rechtsverwerking", "Daluwarsa"]
  },
  {
    id: 113,
    term: "Hak Absolut",
    category: "asas-hukum",
    definition: "Hak yang dapat dipertahankan terhadap siapapun",
    example: "Hak milik yang dapat dipertahankan terhadap semua orang",
    legalBasis: "Pasal 570 KUHPerdata",
    englishTerm: "Absolute Right",
    relatedTerms: ["Hak Mutlak", "Zakelijk Recht", "Hak Kebendaan"]
  },
  {
    id: 114,
    term: "Hak Cipta",
    category: "harta-benda",
    definition: "Hak eksklusif pencipta atas hasil ciptaannya",
    example: "Hak cipta atas karya musik, buku, atau software",
    legalBasis: "UU No. 28 Tahun 2014 tentang Hak Cipta",
    englishTerm: "Copyright",
    relatedTerms: ["Kekayaan Intelektual", "HAKI", "Ciptaan"],
    trending: true
  },
  {
    id: 115,
    term: "Hak Guna Bangunan",
    category: "harta-benda",
    definition: "Hak untuk mendirikan dan mempunyai bangunan di atas tanah yang bukan miliknya sendiri",
    example: "HGB di atas tanah negara selama 30 tahun",
    legalBasis: "Pasal 35-40 UUPA",
    englishTerm: "Right to Build",
    relatedTerms: ["HGB", "Hak Atas Tanah", "Opstalrecht"]
  },
  {
    id: 116,
    term: "Hak Guna Usaha",
    category: "harta-benda",
    definition: "Hak untuk mengusahakan tanah yang dikuasai langsung oleh negara untuk perusahaan pertanian, perikanan, atau peternakan",
    example: "HGU untuk perkebunan kelapa sawit selama 35 tahun",
    legalBasis: "Pasal 28-34 UUPA",
    englishTerm: "Right to Cultivate",
    relatedTerms: ["HGU", "Erfpacht", "Hak Usaha"]
  },
  {
    id: 117,
    term: "Hak Ingkar",
    category: "hukum-acara",
    definition: "Hak untuk menolak memberikan kesaksian karena hubungan keluarga atau jabatan",
    example: "Dokter menolak bersaksi tentang pasiennya",
    legalBasis: "Pasal 146 HIR",
    englishTerm: "Right to Refuse Testimony",
    relatedTerms: ["Verschoningsrecht", "Hak Menolak", "Privilege"]
  },
  {
    id: 118,
    term: "Hak Istimewa",
    category: "perikatan",
    definition: "Hak yang oleh undang-undang diberikan kepada kreditur tertentu untuk didahulukan pembayarannya",
    example: "Hak istimewa upah buruh dalam kepailitan",
    legalBasis: "Pasal 1134-1149 KUHPerdata",
    englishTerm: "Privilege/Priority Right",
    relatedTerms: ["Privilege", "Hak Preferensi", "Voorrecht"]
  },
  {
    id: 119,
    term: "Hak Kebendaan",
    category: "harta-benda",
    definition: "Hak mutlak atas suatu benda yang memberikan kekuasaan langsung atas benda tersebut",
    example: "Hak milik, hak gadai, hak tanggungan",
    legalBasis: "Buku II KUHPerdata",
    englishTerm: "Property Right",
    relatedTerms: ["Zakelijk Recht", "Hak Absolut", "Real Right"]
  },
  {
    id: 120,
    term: "Hak Kreditur",
    category: "perikatan",
    definition: "Hak pihak yang berhak menerima prestasi dalam suatu perikatan",
    example: "Hak bank untuk menerima pembayaran kredit",
    legalBasis: "Pasal 1234 KUHPerdata",
    englishTerm: "Creditor's Right",
    relatedTerms: ["Hak Berpiutang", "Schuldeiser", "Piutang"]
  },
  {
    id: 121,
    term: "Hak Milik",
    category: "harta-benda",
    definition: "Hak turun-temurun, terkuat dan terpenuh yang dapat dipunyai orang atas tanah",
    example: "Sertifikat hak milik atas tanah dan bangunan",
    legalBasis: "Pasal 20 UUPA",
    englishTerm: "Right of Ownership",
    relatedTerms: ["Eigendom", "Kepemilikan", "Dominium"]
  },
  {
    id: 122,
    term: "Hak Pakai",
    category: "harta-benda",
    definition: "Hak untuk menggunakan dan/atau memungut hasil dari tanah yang dikuasai langsung oleh negara atau tanah milik orang lain",
    example: "Hak pakai atas tanah untuk kedutaan asing",
    legalBasis: "Pasal 41-43 UUPA",
    englishTerm: "Right of Use",
    relatedTerms: ["Gebruiksrecht", "Hak Menggunakan", "Usufruct"]
  },
  {
    id: 123,
    term: "Hak Paten",
    category: "harta-benda",
    definition: "Hak eksklusif yang diberikan negara kepada inventor atas hasil invensinya",
    example: "Paten untuk teknologi atau obat baru",
    legalBasis: "UU No. 13 Tahun 2016 tentang Paten",
    englishTerm: "Patent Right",
    relatedTerms: ["Patent", "Hak Kekayaan Intelektual", "Invensi"]
  },
  {
    id: 124,
    term: "Hak Perorangan",
    category: "perikatan",
    definition: "Hak yang hanya dapat dipertahankan terhadap orang tertentu",
    example: "Hak menagih utang kepada debitur tertentu",
    legalBasis: "Pasal 1233 KUHPerdata",
    englishTerm: "Personal Right",
    relatedTerms: ["Persoonlijk Recht", "Hak Relatif", "Obligatoir"]
  },
  {
    id: 125,
    term: "Hak Retensi",
    category: "perikatan",
    definition: "Hak untuk menahan barang milik orang lain sampai piutang yang berkaitan dengan barang tersebut dibayar",
    example: "Bengkel menahan mobil sampai biaya reparasi dibayar",
    legalBasis: "Pasal 1616 KUHPerdata",
    englishTerm: "Right of Retention",
    relatedTerms: ["Retentierecht", "Hak Tahan", "Lien"]
  },
  {
    id: 126,
    term: "Hak Sewa",
    category: "perjanjian",
    definition: "Hak untuk memakai barang orang lain dengan membayar harga sewa",
    example: "Hak sewa rumah atau apartemen",
    legalBasis: "Pasal 1548 KUHPerdata",
    englishTerm: "Lease Right",
    relatedTerms: ["Huurrecht", "Sewa-Menyewa", "Tenancy"]
  },
  {
    id: 127,
    term: "Hak Tanggungan",
    category: "harta-benda",
    definition: "Hak jaminan yang dibebankan pada hak atas tanah untuk pelunasan utang tertentu",
    example: "Hak tanggungan atas tanah untuk jaminan kredit bank",
    legalBasis: "UU No. 4 Tahun 1996 tentang Hak Tanggungan",
    englishTerm: "Mortgage Right",
    relatedTerms: ["Hypotheek", "Hipotek", "Jaminan Tanah"],
    trending: true
  },
  {
    id: 128,
    term: "Hak Waris",
    category: "kewarisan",
    definition: "Hak untuk menerima harta peninggalan dari pewaris yang meninggal dunia",
    example: "Hak anak untuk mewarisi harta orang tuanya",
    legalBasis: "Pasal 830 KUHPerdata",
    englishTerm: "Inheritance Right",
    relatedTerms: ["Erfrecht", "Hak Mewarisi", "Successie"]
  },
  {
    id: 129,
    term: "Hapusnya Perikatan",
    category: "perikatan",
    definition: "Berakhirnya hubungan hukum antara kreditur dan debitur",
    example: "Perikatan hapus karena pembayaran lunas",
    legalBasis: "Pasal 1381 KUHPerdata",
    englishTerm: "Extinction of Obligation",
    relatedTerms: ["Tenietgaan", "Berakhirnya Perikatan", "Discharge"]
  },
  {
    id: 130,
    term: "Harta Bersama",
    category: "perkawinan",
    definition: "Harta benda yang diperoleh selama perkawinan",
    example: "Rumah yang dibeli setelah menikah menjadi harta bersama",
    legalBasis: "Pasal 35 UU No. 1 Tahun 1974",
    englishTerm: "Marital Property",
    relatedTerms: ["Harta Gono-Gini", "Gemeenschap", "Community Property"]
  },
  {
    id: 131,
    term: "Harta Bawaan",
    category: "perkawinan",
    definition: "Harta benda yang dibawa masing-masing suami atau istri ke dalam perkawinan",
    example: "Warisan yang diterima sebelum menikah",
    legalBasis: "Pasal 35 ayat (2) UU No. 1 Tahun 1974",
    englishTerm: "Separate Property",
    relatedTerms: ["Harta Pribadi", "Eigen Goed", "Pre-marital Asset"]
  },
  {
    id: 132,
    term: "Harta Peninggalan",
    category: "kewarisan",
    definition: "Seluruh harta benda dan utang pewaris yang ditinggalkan setelah meninggal dunia",
    example: "Rumah, mobil, dan utang yang ditinggalkan almarhum",
    legalBasis: "Pasal 833 KUHPerdata",
    englishTerm: "Estate",
    relatedTerms: ["Boedel", "Warisan", "Nalatenschap"]
  },
  {
    id: 133,
    term: "Hibah",
    category: "perjanjian",
    definition: "Pemberian dari seseorang kepada orang lain secara cuma-cuma dan tidak dapat ditarik kembali",
    example: "Orang tua menghibahkan rumah kepada anaknya",
    legalBasis: "Pasal 1666 KUHPerdata",
    englishTerm: "Gift/Donation",
    relatedTerms: ["Schenking", "Pemberian", "Hadiah"]
  },
  {
    id: 134,
    term: "Hibah Wasiat",
    category: "kewarisan",
    definition: "Pemberian yang dilakukan melalui wasiat dan berlaku setelah pemberi meninggal",
    example: "Wasiat untuk memberikan sebagian harta kepada yayasan",
    legalBasis: "Pasal 957 KUHPerdata",
    englishTerm: "Testamentary Gift",
    relatedTerms: ["Legaat", "Wasiat", "Bequest"]
  },
  {
    id: 135,
    term: "Hilang Hak Milik",
    category: "harta-benda",
    definition: "Berakhirnya hak milik karena sebab-sebab tertentu",
    example: "Hak milik hilang karena pencabutan hak untuk kepentingan umum",
    legalBasis: "Pasal 27 UUPA",
    englishTerm: "Loss of Ownership",
    relatedTerms: ["Verlies Eigendom", "Hapusnya Hak", "Forfeiture"]
  },
  {
    id: 136,
    term: "Hipotik",
    category: "harta-benda",
    definition: "Hak tanggungan atas kapal laut yang berukuran tertentu",
    example: "Hipotik kapal untuk jaminan kredit perbankan",
    legalBasis: "Pasal 314 KUHD",
    englishTerm: "Ship Mortgage",
    relatedTerms: ["Scheepshypotheek", "Hipotek Kapal", "Maritime Lien"]
  },
  {
    id: 137,
    term: "Hukum Adat",
    category: "asas-hukum",
    definition: "Hukum yang hidup dan berkembang dalam masyarakat adat Indonesia",
    example: "Hukum adat Batak tentang warisan",
    legalBasis: "Pasal 18B ayat (2) UUD 1945",
    englishTerm: "Customary Law",
    relatedTerms: ["Adatrecht", "Hukum Kebiasaan", "Traditional Law"]
  },
  {
    id: 138,
    term: "Hukum Antar Golongan",
    category: "asas-hukum",
    definition: "Hukum yang mengatur hubungan antara orang-orang yang tunduk pada sistem hukum yang berbeda",
    example: "Perkawinan antara WNI yang beragama berbeda",
    legalBasis: "Staatsblad 1848 No. 158",
    englishTerm: "Intergroup Law",
    relatedTerms: ["Intergentiel Recht", "Hukum Antargolongan", "Conflict of Laws"]
  },
  {
    id: 139,
    term: "Hukum Perdata Internasional",
    category: "asas-hukum",
    definition: "Hukum yang mengatur hubungan perdata yang mengandung unsur asing",
    example: "Perceraian WNI dengan WNA di Indonesia",
    legalBasis: "Pasal 16-18 AB",
    englishTerm: "Private International Law",
    relatedTerms: ["IPR", "Internationaal Privaatrecht", "Conflict of Laws"]
  },
  {
    id: 140,
    term: "Hukum Waris Adat",
    category: "kewarisan",
    definition: "Aturan adat yang mengatur peralihan harta dari generasi ke generasi",
    example: "Sistem waris patrilineal di Batak",
    legalBasis: "Hukum Adat",
    englishTerm: "Customary Inheritance Law",
    relatedTerms: ["Adat Erfrecht", "Waris Adat", "Traditional Inheritance"]
  },
  {
    id: 141,
    term: "Hukum Waris Islam",
    category: "kewarisan",
    definition: "Hukum waris berdasarkan syariat Islam",
    example: "Pembagian waris dengan sistem faraidh",
    legalBasis: "Kompilasi Hukum Islam",
    englishTerm: "Islamic Inheritance Law",
    relatedTerms: ["Faraidh", "Waris Islam", "Mawaris"]
  },
  {
    id: 142,
    term: "Hutang Piutang",
    category: "perikatan",
    definition: "Hubungan hukum antara kreditur dan debitur berdasarkan perjanjian pinjam meminjam",
    example: "Perjanjian kredit bank dengan nasabah",
    legalBasis: "Pasal 1754 KUHPerdata",
    englishTerm: "Debt and Credit",
    relatedTerms: ["Schuld", "Utang", "Loan"]
  },
  {
    id: 143,
    term: "Identitas Palsu",
    category: "subjek-hukum",
    definition: "Penggunaan identitas yang tidak sesuai dengan keadaan sebenarnya",
    example: "Menggunakan KTP palsu dalam transaksi",
    legalBasis: "Pasal 1328 KUHPerdata",
    englishTerm: "False Identity",
    relatedTerms: ["Valse Identiteit", "Pemalsuan Identitas", "Fraud"]
  },
  {
    id: 144,
    term: "Iktikad Baik",
    category: "asas-hukum",
    definition: "Kejujuran dan kepatutan dalam melakukan perbuatan hukum",
    example: "Pembeli yang tidak mengetahui barang yang dibeli adalah curian",
    legalBasis: "Pasal 1338 ayat (3) KUHPerdata",
    englishTerm: "Good Faith",
    relatedTerms: ["Goede Trouw", "Bona Fide", "Itikad Baik"]
  },
  {
    id: 145,
    term: "Iktikad Buruk",
    category: "asas-hukum",
    definition: "Niat tidak baik atau mengetahui adanya cacat dalam perbuatan hukum",
    example: "Membeli barang yang diketahui hasil curian",
    legalBasis: "Pasal 532 KUHPerdata",
    englishTerm: "Bad Faith",
    relatedTerms: ["Kwade Trouw", "Mala Fide", "Niat Buruk"]
  },
  {
    id: 146,
    term: "Imunitas",
    category: "subjek-hukum",
    definition: "Kekebalan dari tuntutan hukum yang dimiliki subjek hukum tertentu",
    example: "Imunitas diplomatik untuk duta besar",
    legalBasis: "Konvensi Wina 1961",
    englishTerm: "Immunity",
    relatedTerms: ["Kekebalan", "Immuniteit", "Diplomatic Immunity"]
  },
  {
    id: 147,
    term: "Ingkar Janji",
    category: "perikatan",
    definition: "Tidak memenuhi kewajiban sebagaimana diperjanjikan",
    example: "Tidak membayar angsuran kredit tepat waktu",
    legalBasis: "Pasal 1238 KUHPerdata",
    englishTerm: "Breach of Contract",
    relatedTerms: ["Wanprestasi", "Contractbreuk", "Default"]
  },
  {
    id: 148,
    term: "Insolvensi",
    category: "perikatan",
    definition: "Keadaan tidak mampu membayar utang-utang yang telah jatuh tempo",
    example: "Perusahaan yang tidak mampu membayar utang kepada kreditur",
    legalBasis: "UU No. 37 Tahun 2004 tentang Kepailitan",
    englishTerm: "Insolvency",
    relatedTerms: ["Kepailitan", "Insolventie", "Bankruptcy"]
  },
  {
    id: 149,
    term: "Intervensi",
    category: "hukum-acara",
    definition: "Ikut serta pihak ketiga dalam suatu perkara perdata yang sedang berjalan",
    example: "Pihak ketiga yang merasa memiliki hak atas objek sengketa",
    legalBasis: "Pasal 279 Rv",
    englishTerm: "Intervention",
    relatedTerms: ["Tussenkomst", "Ikut Campur", "Third Party Intervention"]
  },
  {
    id: 150,
    term: "Isbat Nikah",
    category: "perkawinan",
    definition: "Penetapan sahnya perkawinan oleh Pengadilan Agama",
    example: "Isbat nikah untuk perkawinan yang tidak tercatat",
    legalBasis: "Pasal 7 Kompilasi Hukum Islam",
    englishTerm: "Marriage Validation",
    relatedTerms: ["Pengesahan Nikah", "Penetapan Nikah", "Marriage Confirmation"]
  },
  {
    id: 151,
    term: "Jaminan",
    category: "perikatan",
    definition: "Sesuatu yang diberikan kepada kreditur untuk meyakinkan bahwa debitur akan memenuhi kewajibannya",
    example: "Sertifikat tanah sebagai jaminan kredit",
    legalBasis: "Pasal 1131 KUHPerdata",
    englishTerm: "Security/Collateral",
    relatedTerms: ["Zekerheid", "Agunan", "Tanggungan"]
  },
  {
    id: 152,
    term: "Jaminan Fidusia",
    category: "harta-benda",
    definition: "Hak jaminan atas benda bergerak yang tetap dalam penguasaan pemberi fidusia",
    example: "Jaminan fidusia kendaraan bermotor untuk kredit",
    legalBasis: "UU No. 42 Tahun 1999",
    englishTerm: "Fiduciary Security",
    relatedTerms: ["Fiduciaire Eigendom", "FEO", "Jaminan Kepercayaan"]
  },
  {
    id: 153,
    term: "Jaminan Perorangan",
    category: "perikatan",
    definition: "Jaminan yang diberikan oleh pihak ketiga untuk menjamin utang debitur",
    example: "Personal guarantee direktur untuk utang perusahaan",
    legalBasis: "Pasal 1820 KUHPerdata",
    englishTerm: "Personal Guarantee",
    relatedTerms: ["Borgtocht", "Penanggungan", "Surety"]
  },
  {
    id: 154,
    term: "Jual Beli",
    category: "perjanjian",
    definition: "Perjanjian dimana penjual menyerahkan hak milik atas barang dan pembeli membayar harga",
    example: "Jual beli rumah dengan akta notaris",
    legalBasis: "Pasal 1457 KUHPerdata",
    englishTerm: "Sale and Purchase",
    relatedTerms: ["Koop en Verkoop", "Sale", "Pemindahan Hak"]
  },
  {
    id: 155,
    term: "Jual Beli Bersyarat",
    category: "perjanjian",
    definition: "Jual beli yang digantungkan pada syarat tertentu",
    example: "Jual beli tanah dengan syarat pembeli mendapat KPR",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Conditional Sale",
    relatedTerms: ["Voorwaardelijke Koop", "Conditional Contract", "Syarat Tangguh"]
  },
  {
    id: 156,
    term: "Kadaluwarsa",
    category: "perikatan",
    definition: "Lewat waktu yang menyebabkan hapusnya hak untuk menuntut",
    example: "Utang yang tidak ditagih selama 30 tahun menjadi kadaluwarsa",
    legalBasis: "Pasal 1946 KUHPerdata",
    englishTerm: "Statute of Limitations",
    relatedTerms: ["Verjaring", "Daluwarsa", "Prescription"]
  },
  {
    id: 157,
    term: "Kawin Campur",
    category: "perkawinan",
    definition: "Perkawinan antara dua orang yang tunduk pada hukum yang berlainan",
    example: "Perkawinan WNI dengan WNA",
    legalBasis: "Pasal 57 UU No. 1 Tahun 1974",
    englishTerm: "Mixed Marriage",
    relatedTerms: ["Gemengd Huwelijk", "Perkawinan Campuran", "International Marriage"]
  },
  {
    id: 158,
    term: "Kawin Kontrak",
    category: "perkawinan",
    definition: "Perkawinan yang dilakukan untuk jangka waktu tertentu",
    example: "Nikah mut'ah dalam tradisi tertentu",
    legalBasis: "Tidak diakui dalam hukum Indonesia",
    englishTerm: "Contract Marriage",
    relatedTerms: ["Nikah Kontrak", "Temporary Marriage", "Mut'ah"]
  },
  {
    id: 159,
    term: "Kebatalan",
    category: "perjanjian",
    definition: "Tidak sahnya suatu perbuatan hukum karena tidak memenuhi syarat",
    example: "Kebatalan perjanjian karena dibuat oleh anak di bawah umur",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Nullity",
    relatedTerms: ["Nietigheid", "Batal", "Void"]
  },
  {
    id: 160,
    term: "Kebatalan Mutlak",
    category: "perjanjian",
    definition: "Kebatalan yang terjadi demi hukum tanpa perlu pembatalan",
    example: "Perjanjian yang bertentangan dengan ketertiban umum",
    legalBasis: "Pasal 1335 KUHPerdata",
    englishTerm: "Absolute Nullity",
    relatedTerms: ["Nietigheid van Rechtswege", "Batal Demi Hukum", "Void ab initio"]
  },
  {
    id: 161,
    term: "Kebatalan Relatif",
    category: "perjanjian",
    definition: "Kebatalan yang harus dimintakan pembatalannya",
    example: "Perjanjian yang dibuat karena paksaan",
    legalBasis: "Pasal 1449 KUHPerdata",
    englishTerm: "Relative Nullity",
    relatedTerms: ["Vernietigbaarheid", "Dapat Dibatalkan", "Voidable"]
  },
  {
    id: 162,
    term: "Kecakapan Hukum",
    category: "subjek-hukum",
    definition: "Kemampuan untuk melakukan perbuatan hukum yang sah",
    example: "Orang dewasa yang sehat akal memiliki kecakapan penuh",
    legalBasis: "Pasal 1329 KUHPerdata",
    englishTerm: "Legal Capacity",
    relatedTerms: ["Handelingsbekwaamheid", "Kewenangan Hukum", "Competence"]
  },
  {
    id: 163,
    term: "Kedudukan Hukum",
    category: "subjek-hukum",
    definition: "Status seseorang atau badan hukum dalam sistem hukum",
    example: "Kedudukan sebagai ahli waris yang sah",
    legalBasis: "KUHPerdata",
    englishTerm: "Legal Status",
    relatedTerms: ["Rechtspositie", "Status Hukum", "Legal Standing"]
  },
  {
    id: 164,
    term: "Kekeliruan",
    category: "perjanjian",
    definition: "Kesalahpahaman mengenai hakikat barang atau orang yang menjadi pokok perjanjian",
    example: "Membeli lukisan palsu yang dikira asli",
    legalBasis: "Pasal 1322 KUHPerdata",
    englishTerm: "Mistake/Error",
    relatedTerms: ["Dwaling", "Kesalahan", "Misunderstanding"]
  },
  {
    id: 165,
    term: "Kelalaian",
    category: "perikatan",
    definition: "Tidak melakukan sesuatu yang seharusnya dilakukan menurut kepatutan",
    example: "Dokter lalai dalam melakukan operasi",
    legalBasis: "Pasal 1366 KUHPerdata",
    englishTerm: "Negligence",
    relatedTerms: ["Nalatigheid", "Culpa", "Kesalahan"]
  },
  {
    id: 166,
    term: "Kematian Perdata",
    category: "subjek-hukum",
    definition: "Hilangnya status sebagai subjek hukum meskipun masih hidup",
    example: "Biksu/biksuni yang melepas duniawi (historis)",
    legalBasis: "Tidak berlaku lagi di Indonesia",
    englishTerm: "Civil Death",
    relatedTerms: ["Burgerlijke Dood", "Mati Perdata", "Legal Death"]
  },
  {
    id: 167,
    term: "Kemudharatan",
    category: "perkawinan",
    definition: "Kerugian atau bahaya yang dapat menjadi alasan perceraian",
    example: "Kekerasan dalam rumah tangga",
    legalBasis: "Pasal 19 PP No. 9 Tahun 1975",
    englishTerm: "Harm/Detriment",
    relatedTerms: ["Madharat", "Kerugian", "Prejudice"]
  },
  {
    id: 168,
    term: "Kepailitan",
    category: "perikatan",
    definition: "Keadaan debitur yang dinyatakan pailit berdasarkan putusan pengadilan",
    example: "Perusahaan dinyatakan pailit karena tidak mampu membayar utang",
    legalBasis: "UU No. 37 Tahun 2004",
    englishTerm: "Bankruptcy",
    relatedTerms: ["Faillissement", "Bangkrut", "Insolvency"],
    trending: true
  },
  {
    id: 169,
    term: "Kepemilikan Bersama",
    category: "harta-benda",
    definition: "Hak milik yang dimiliki oleh dua orang atau lebih secara bersama-sama",
    example: "Tanah warisan yang belum dibagi",
    legalBasis: "Pasal 1623 KUHPerdata",
    englishTerm: "Co-ownership",
    relatedTerms: ["Mede-eigendom", "Milik Bersama", "Joint Ownership"]
  },
  {
    id: 170,
    term: "Keputusan",
    category: "hukum-acara",
    definition: "Pernyataan hakim yang dituangkan dalam bentuk tertulis dan diucapkan dalam sidang terbuka",
    example: "Putusan pengadilan tentang pembagian harta gono-gini",
    legalBasis: "Pasal 178 HIR",
    englishTerm: "Judgment/Decision",
    relatedTerms: ["Vonnis", "Putusan", "Verdict"]
  },
  {
    id: 171,
    term: "Kerugian",
    category: "perikatan",
    definition: "Berkurangnya harta kekayaan pihak yang dirugikan akibat perbuatan melawan hukum",
    example: "Kerugian materiil dan immateriil akibat kecelakaan",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Damages/Loss",
    relatedTerms: ["Schade", "Ganti Rugi", "Prejudice"]
  },
  {
    id: 172,
    term: "Kerugian Immateriil",
    category: "perikatan",
    definition: "Kerugian yang tidak dapat dinilai dengan uang",
    example: "Trauma psikologis akibat kecelakaan",
    legalBasis: "Pasal 1370-1372 KUHPerdata",
    englishTerm: "Non-material Damages",
    relatedTerms: ["Immateriele Schade", "Kerugian Moril", "Moral Damages"]
  },
  {
    id: 173,
    term: "Kerugian Materiil",
    category: "perikatan",
    definition: "Kerugian yang dapat dinilai dengan uang",
    example: "Biaya pengobatan dan hilangnya penghasilan",
    legalBasis: "Pasal 1246 KUHPerdata",
    englishTerm: "Material Damages",
    relatedTerms: ["Materiele Schade", "Kerugian Nyata", "Pecuniary Loss"]
  },
  {
    id: 174,
    term: "Kesepakatan",
    category: "perjanjian",
    definition: "Persesuaian kehendak antara para pihak tentang hal-hal pokok dalam perjanjian",
    example: "Kesepakatan harga dalam jual beli",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Agreement/Consensus",
    relatedTerms: ["Toestemming", "Konsensus", "Mutual Consent"]
  },
  {
    id: 175,
    term: "Ketentuan Paksa",
    category: "asas-hukum",
    definition: "Ketentuan hukum yang tidak dapat dikesampingkan oleh para pihak",
    example: "Ketentuan tentang upah minimum",
    legalBasis: "Pasal 1339 KUHPerdata",
    englishTerm: "Mandatory Provision",
    relatedTerms: ["Dwingend Recht", "Hukum Memaksa", "Imperative Law"]
  },
  {
    id: 176,
    term: "Ketentuan Pelengkap",
    category: "asas-hukum",
    definition: "Ketentuan hukum yang berlaku jika para pihak tidak mengatur lain",
    example: "Ketentuan tentang tempat penyerahan barang",
    legalBasis: "KUHPerdata",
    englishTerm: "Supplementary Provision",
    relatedTerms: ["Aanvullend Recht", "Hukum Mengatur", "Default Rules"]
  },
  {
    id: 177,
    term: "Kewajiban",
    category: "perikatan",
    definition: "Keharusan untuk melakukan atau tidak melakukan sesuatu",
    example: "Kewajiban membayar harga dalam jual beli",
    legalBasis: "Pasal 1234 KUHPerdata",
    englishTerm: "Obligation/Duty",
    relatedTerms: ["Verbintenis", "Prestasi", "Liability"]
  },
  {
    id: 178,
    term: "Kewajiban Alamiah",
    category: "perikatan",
    definition: "Kewajiban moral yang tidak dapat dipaksakan secara hukum",
    example: "Utang yang telah kadaluwarsa tetapi tetap dibayar",
    legalBasis: "Pasal 1359 KUHPerdata",
    englishTerm: "Natural Obligation",
    relatedTerms: ["Natuurlijke Verbintenis", "Kewajiban Moral", "Moral Duty"]
  },
  {
    id: 179,
    term: "Kewajiban Bersyarat",
    category: "perikatan",
    definition: "Kewajiban yang digantungkan pada suatu peristiwa yang belum tentu terjadi",
    example: "Kewajiban membayar bonus jika target tercapai",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Conditional Obligation",
    relatedTerms: ["Voorwaardelijke Verbintenis", "Syarat Tangguh", "Contingent Duty"]
  },
  {
    id: 180,
    term: "Kewajiban Solidair",
    category: "perikatan",
    definition: "Kewajiban yang harus dipikul bersama oleh beberapa debitur",
    example: "Beberapa orang bersama-sama menjamin satu utang",
    legalBasis: "Pasal 1278 KUHPerdata",
    englishTerm: "Joint and Several Liability",
    relatedTerms: ["Hoofdelijke Verbintenis", "Tanggung Renteng", "Solidary Obligation"]
  },
  {
    id: 181,
    term: "Khuluk",
    category: "perkawinan",
    definition: "Perceraian atas kehendak istri dengan memberikan tebusan kepada suami",
    example: "Istri menebus talaknya dengan mengembalikan mahar",
    legalBasis: "Pasal 124 Kompilasi Hukum Islam",
    englishTerm: "Khula",
    relatedTerms: ["Cerai Tebus", "Tebus Talak", "Redemptive Divorce"]
  },
  {
    id: 182,
    term: "Klausula Baku",
    category: "perjanjian",
    definition: "Aturan atau ketentuan yang telah dipersiapkan dan ditetapkan terlebih dahulu secara sepihak",
    example: "Syarat dan ketentuan dalam kontrak asuransi",
    legalBasis: "UU No. 8 Tahun 1999 tentang Perlindungan Konsumen",
    englishTerm: "Standard Clause",
    relatedTerms: ["Standaardbeding", "Kontrak Standar", "Boilerplate"]
  },
  {
    id: 183,
    term: "Klausula Eksonerasi",
    category: "perjanjian",
    definition: "Klausula yang membatasi atau menghapuskan tanggung jawab salah satu pihak",
    example: "Klausula 'risiko ditanggung penumpang' di tempat parkir",
    legalBasis: "Pasal 18 UU Perlindungan Konsumen",
    englishTerm: "Exoneration Clause",
    relatedTerms: ["Vrijwaringsclausule", "Pembebasan Tanggung Jawab", "Exemption Clause"]
  },
  {
    id: 184,
    term: "Komparisi",
    category: "hukum-acara",
    definition: "Kehadiran para pihak di muka hakim",
    example: "Komparisi pihak-pihak dalam sidang perceraian",
    legalBasis: "Pasal 124 HIR",
    englishTerm: "Appearance",
    relatedTerms: ["Comparitie", "Kehadiran", "Court Appearance"]
  },
  {
    id: 185,
    term: "Kompensasi",
    category: "perikatan",
    definition: "Hapusnya perikatan karena kedua belah pihak saling berhutang",
    example: "A berhutang pada B Rp 10 juta, B berhutang pada A Rp 8 juta, sisa Rp 2 juta",
    legalBasis: "Pasal 1425 KUHPerdata",
    englishTerm: "Compensation/Set-off",
    relatedTerms: ["Schuldvergelijking", "Perjumpaan Utang", "Offset"]
  },
  {
    id: 186,
    term: "Koneksitas",
    category: "hukum-acara",
    definition: "Hubungan antara beberapa perkara",
    example: "Perkara perceraian dengan pembagian harta bersama",
    legalBasis: "Pasal 132 HIR",
    englishTerm: "Connection/Related Cases",
    relatedTerms: ["Samenhang", "Keterkaitan", "Connexity"]
  },
  {
    id: 187,
    term: "Konfirmasi",
    category: "perjanjian",
    definition: "Penguatan atau pengesahan suatu perbuatan hukum",
    example: "Konfirmasi kontrak yang dibuat oleh wakil",
    legalBasis: "Pasal 1451 KUHPerdata",
    englishTerm: "Confirmation/Ratification",
    relatedTerms: ["Bekrachtiging", "Pengesahan", "Ratifikasi"]
  },
  {
    id: 188,
    term: "Konservatori",
    category: "hukum-acara",
    definition: "Tindakan untuk menjaga hak atau barang agar tidak hilang atau rusak",
    example: "Sita jaminan untuk menjamin pelaksanaan putusan",
    legalBasis: "Pasal 227 HIR",
    englishTerm: "Conservative Measure",
    relatedTerms: ["Conservatoir", "Tindakan Pengamanan", "Preservation"]
  },
  {
    id: 189,
    term: "Konsinyasi",
    category: "perikatan",
    definition: "Penawaran pembayaran tunai diikuti dengan penyimpanan di pengadilan",
    example: "Debitur menyimpan uang sewa di pengadilan karena kreditur menolak",
    legalBasis: "Pasal 1404 KUHPerdata",
    englishTerm: "Consignment",
    relatedTerms: ["Consignatie", "Penawaran Pembayaran", "Deposit in Court"]
  },
  {
    id: 190,
    term: "Kontrak",
    category: "perjanjian",
    definition: "Perjanjian tertulis antara dua pihak atau lebih yang menimbulkan hak dan kewajiban",
    example: "Kontrak kerja antara perusahaan dan karyawan",
    legalBasis: "Pasal 1313 KUHPerdata",
    englishTerm: "Contract",
    relatedTerms: ["Overeenkomst", "Perjanjian", "Agreement"]
  },
  {
    id: 191,
    term: "Kontrak Elektronik",
    category: "perjanjian",
    definition: "Perjanjian yang dibuat melalui sistem elektronik",
    example: "Perjanjian jual beli online melalui e-commerce",
    legalBasis: "UU No. 11 Tahun 2008 tentang ITE",
    englishTerm: "Electronic Contract",
    relatedTerms: ["E-contract", "Digital Agreement", "Online Contract"],
    trending: true
  },
  {
    id: 192,
    term: "Kontrak Innominaat",
    category: "perjanjian",
    definition: "Perjanjian yang tidak diatur secara khusus dalam undang-undang",
    example: "Perjanjian franchise, leasing",
    legalBasis: "Pasal 1319 KUHPerdata",
    englishTerm: "Innominate Contract",
    relatedTerms: ["Onbenoemde Overeenkomst", "Perjanjian Tidak Bernama", "Unnamed Contract"]
  },
  {
    id: 193,
    term: "Kontrak Nominaat",
    category: "perjanjian",
    definition: "Perjanjian yang diatur dan diberi nama khusus dalam undang-undang",
    example: "Jual beli, sewa menyewa, pinjam meminjam",
    legalBasis: "Buku III KUHPerdata",
    englishTerm: "Nominate Contract",
    relatedTerms: ["Benoemde Overeenkomst", "Perjanjian Bernama", "Named Contract"]
  },
  {
    id: 194,
    term: "Kontraprestasi",
    category: "perjanjian",
    definition: "Prestasi timbal balik dari pihak lain dalam perjanjian",
    example: "Pembayaran harga sebagai kontraprestasi penyerahan barang",
    legalBasis: "Pasal 1234 KUHPerdata",
    englishTerm: "Counter-performance",
    relatedTerms: ["Tegenprestatie", "Prestasi Timbal Balik", "Reciprocal Obligation"]
  },
  {
    id: 195,
    term: "Konversi",
    category: "harta-benda",
    definition: "Perubahan hak atas tanah dari hak lama menjadi hak baru",
    example: "Konversi hak eigendom menjadi hak milik",
    legalBasis: "Ketentuan Konversi UUPA",
    englishTerm: "Conversion",
    relatedTerms: ["Conversie", "Perubahan Hak", "Right Conversion"]
  },
  {
    id: 196,
    term: "Kreditur",
    category: "perikatan",
    definition: "Pihak yang berhak menerima prestasi dari debitur",
    example: "Bank sebagai kreditur dalam perjanjian kredit",
    legalBasis: "Pasal 1234 KUHPerdata",
    englishTerm: "Creditor",
    relatedTerms: ["Schuldeiser", "Berpiutang", "Lender"]
  },
  {
    id: 197,
    term: "Kreditur Konkuren",
    category: "perikatan",
    definition: "Kreditur yang tidak mempunyai hak istimewa, gadai, atau hipotik",
    example: "Supplier yang menjual barang tanpa jaminan khusus",
    legalBasis: "Pasal 1132 KUHPerdata",
    englishTerm: "Concurrent Creditor",
    relatedTerms: ["Concurrent Schuldeiser", "Kreditur Biasa", "Unsecured Creditor"]
  },
  {
    id: 198,
    term: "Kreditur Preferen",
    category: "perikatan",
    definition: "Kreditur yang mempunyai hak untuk didahulukan pembayarannya",
    example: "Pemegang hak tanggungan dalam kepailitan",
    legalBasis: "Pasal 1133 KUHPerdata",
    englishTerm: "Preferred Creditor",
    relatedTerms: ["Preferente Schuldeiser", "Kreditur Istimewa", "Secured Creditor"]
  },
  {
    id: 199,
    term: "Kreditur Separatis",
    category: "perikatan",
    definition: "Kreditur pemegang hak jaminan kebendaan yang dapat mengeksekusi sendiri",
    example: "Bank pemegang hak tanggungan dapat lelang tanpa melalui kurator",
    legalBasis: "UU Kepailitan",
    englishTerm: "Separatist Creditor",
    relatedTerms: ["Separatist", "Kreditur Terpisah", "Secured Creditor with Separation Rights"]
  },
  {
    id: 200,
    term: "Kuasa",
    category: "perjanjian",
    definition: "Pemberian wewenang kepada orang lain untuk melakukan perbuatan hukum atas nama pemberi kuasa",
    example: "Kuasa untuk menjual tanah",
    legalBasis: "Pasal 1792 KUHPerdata",
    englishTerm: "Power of Attorney",
    relatedTerms: ["Volmacht", "Surat Kuasa", "Authorization"]
  },
  {
    id: 201,
    term: "Kuasa Insidentil",
    category: "hukum-acara",
    definition: "Kuasa yang diberikan hanya untuk melakukan tindakan hukum tertentu",
    example: "Kuasa khusus untuk menghadiri satu kali sidang",
    legalBasis: "Pasal 123 HIR",
    englishTerm: "Special Power of Attorney",
    relatedTerms: ["Bijzondere Volmacht", "Kuasa Khusus", "Limited Authorization"]
  },
  {
    id: 202,
    term: "Kuasa Mutlak",
    category: "perjanjian",
    definition: "Kuasa yang tidak dapat ditarik kembali",
    example: "Kuasa menjual yang merupakan bagian dari jaminan utang",
    legalBasis: "Pasal 1813 KUHPerdata",
    englishTerm: "Irrevocable Power of Attorney",
    relatedTerms: ["Onherroepelijke Volmacht", "Kuasa Tidak Dapat Dicabut", "Absolute Authorization"]
  },
  {
    id: 203,
    term: "Kuasi Kontrak",
    category: "perikatan",
    definition: "Perikatan yang timbul dari perbuatan manusia yang halal tanpa perjanjian",
    example: "Zaakwaarneming (pengurusan kepentingan orang lain tanpa kuasa)",
    legalBasis: "Pasal 1352 KUHPerdata",
    englishTerm: "Quasi-Contract",
    relatedTerms: ["Quasi-Overeenkomst", "Perjanjian Semu", "Implied Contract"]
  },
  {
    id: 204,
    term: "Kuitansi",
    category: "perikatan",
    definition: "Tanda bukti pembayaran yang dikeluarkan oleh penerima",
    example: "Kuitansi pembayaran uang muka rumah",
    legalBasis: "Pasal 1394 KUHPerdata",
    englishTerm: "Receipt",
    relatedTerms: ["Kwitantie", "Bukti Pembayaran", "Payment Receipt"]
  },
  {
    id: 205,
    term: "Kumulasi",
    category: "hukum-acara",
    definition: "Penggabungan beberapa tuntutan dalam satu gugatan",
    example: "Gugatan cerai sekaligus pembagian harta dan hak asuh anak",
    legalBasis: "Pasal 127 Rv",
    englishTerm: "Cumulation",
    relatedTerms: ["Cumulatie", "Penggabungan", "Joinder"]
  },
  {
    id: 206,
    term: "Kurator",
    category: "subjek-hukum",
    definition: "Orang yang ditunjuk pengadilan untuk mengurus harta pailit atau orang yang tidak cakap",
    example: "Kurator dalam kepailitan PT",
    legalBasis: "UU Kepailitan",
    englishTerm: "Curator/Trustee",
    relatedTerms: ["Curator", "Pengurus", "Bankruptcy Trustee"]
  },
  {
    id: 207,
    term: "Lembaga Jaminan",
    category: "harta-benda",
    definition: "Pranata hukum yang menjamin pelunasan utang",
    example: "Gadai, fidusia, hak tanggungan, hipotik",
    legalBasis: "KUHPerdata dan UU terkait",
    englishTerm: "Security Institution",
    relatedTerms: ["Zekerheidsrecht", "Hak Jaminan", "Collateral System"]
  },
  {
    id: 208,
    term: "Levering",
    category: "harta-benda",
    definition: "Penyerahan hak milik dari penjual kepada pembeli",
    example: "Penyerahan hak atas tanah melalui akta PPAT",
    legalBasis: "Pasal 612 KUHPerdata",
    englishTerm: "Delivery/Transfer",
    relatedTerms: ["Penyerahan", "Overdracht", "Transfer of Title"]
  },
  {
    id: 209,
    term: "Lewat Waktu",
    category: "perikatan",
    definition: "Berakhirnya hak atau kewajiban karena lewatnya jangka waktu tertentu",
    example: "Hak menagih yang lewat waktu 30 tahun",
    legalBasis: "Pasal 1946 KUHPerdata",
    englishTerm: "Lapse of Time",
    relatedTerms: ["Verjaring", "Daluwarsa", "Prescription"]
  },
  {
    id: 210,
    term: "Likuidasi",
    category: "perikatan",
    definition: "Pemberesan harta kekayaan badan hukum yang bubar",
    example: "Likuidasi PT yang pailit",
    legalBasis: "UU PT dan UU Kepailitan",
    englishTerm: "Liquidation",
    relatedTerms: ["Liquidatie", "Pembubaran", "Winding Up"]
  },
  {
    id: 211,
    term: "Mahar",
    category: "perkawinan",
    definition: "Pemberian wajib dari calon suami kepada calon istri dalam perkawinan Islam",
    example: "Mahar berupa uang tunai Rp 10 juta",
    legalBasis: "Pasal 30 Kompilasi Hukum Islam",
    englishTerm: "Dower/Mahr",
    relatedTerms: ["Maskawin", "Bridal Gift", "Sadaq"]
  },
  {
    id: 212,
    term: "Makelar",
    category: "perjanjian",
    definition: "Perantara yang menghubungkan penjual dan pembeli untuk membuat perjanjian",
    example: "Makelar properti yang mempertemukan penjual dan pembeli rumah",
    legalBasis: "Pasal 62 KUHD",
    englishTerm: "Broker",
    relatedTerms: ["Makelaar", "Perantara", "Intermediary"]
  },
  {
    id: 213,
    term: "Mandat",
    category: "perjanjian",
    definition: "Perintah atau kuasa untuk melakukan sesuatu atas nama pemberi mandat",
    example: "Mandat untuk mewakili dalam rapat umum pemegang saham",
    legalBasis: "Pasal 1792 KUHPerdata",
    englishTerm: "Mandate",
    relatedTerms: ["Lastgeving", "Pemberian Kuasa", "Agency"]
  },
  {
    id: 214,
    term: "Mediasi",
    category: "hukum-acara",
    definition: "Penyelesaian sengketa melalui perundingan dengan bantuan mediator",
    example: "Mediasi perceraian sebelum sidang pengadilan",
    legalBasis: "PERMA No. 1 Tahun 2016",
    englishTerm: "Mediation",
    relatedTerms: ["Mediatie", "Perdamaian", "Alternative Dispute Resolution"],
    trending: true
  },
  {
    id: 215,
    term: "Melawan Hukum",
    category: "perikatan",
    definition: "Bertentangan dengan hukum, hak orang lain, kesusilaan, atau kepatutan",
    example: "Membangun di tanah orang lain tanpa izin",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Unlawful/Illegal",
    relatedTerms: ["Onrechtmatig", "Wederrechtelijk", "Tort"]
  },
  {
    id: 216,
    term: "Memori Banding",
    category: "hukum-acara",
    definition: "Uraian alasan-alasan mengajukan banding",
    example: "Memori banding yang menyatakan putusan tingkat pertama salah",
    legalBasis: "Pasal 199 RBg",
    englishTerm: "Appeal Memorandum",
    relatedTerms: ["Memorie van Grieven", "Alasan Banding", "Grounds of Appeal"]
  },
  {
    id: 217,
    term: "Memori Kasasi",
    category: "hukum-acara",
    definition: "Uraian alasan-alasan mengajukan kasasi",
    example: "Memori kasasi tentang kesalahan penerapan hukum",
    legalBasis: "UU MA",
    englishTerm: "Cassation Memorandum",
    relatedTerms: ["Cassatiemiddelen", "Alasan Kasasi", "Cassation Grounds"]
  },
  {
    id: 218,
    term: "Memperkaya Diri",
    category: "perikatan",
    definition: "Bertambahnya kekayaan seseorang tanpa hak",
    example: "Menerima pembayaran ganda untuk satu utang",
    legalBasis: "Pasal 1359 KUHPerdata",
    englishTerm: "Unjust Enrichment",
    relatedTerms: ["Ongerechtvaardigde Verrijking", "Pengayaan Tidak Sah", "Enrichment"]
  },
  {
    id: 219,
    term: "Merger",
    category: "perjanjian",
    definition: "Penggabungan dua perusahaan atau lebih menjadi satu",
    example: "Merger dua bank menjadi satu entitas baru",
    legalBasis: "UU PT",
    englishTerm: "Merger",
    relatedTerms: ["Fusie", "Penggabungan", "Amalgamation"]
  },
  {
    id: 220,
    term: "Milik Negara",
    category: "harta-benda",
    definition: "Benda yang dikuasai atau dimiliki oleh negara",
    example: "Tanah negara, jalan raya, gedung pemerintah",
    legalBasis: "UU No. 1 Tahun 2004",
    englishTerm: "State Property",
    relatedTerms: ["Staatseigendom", "Aset Negara", "Public Property"]
  },
  {
    id: 221,
    term: "Mora",
    category: "perikatan",
    definition: "Kelalaian atau keterlambatan dalam memenuhi kewajiban",
    example: "Terlambat membayar angsuran kredit",
    legalBasis: "Pasal 1237 KUHPerdata",
    englishTerm: "Default/Delay",
    relatedTerms: ["Verzuim", "Kelalaian", "Breach"]
  },
  {
    id: 222,
    term: "Mubarak",
    category: "perkawinan",
    definition: "Perkawinan yang dibolehkan menurut hukum Islam",
    example: "Perkawinan yang memenuhi rukun dan syarat",
    legalBasis: "Kompilasi Hukum Islam",
    englishTerm: "Lawful Marriage",
    relatedTerms: ["Nikah Sah", "Valid Marriage", "Halal"]
  },
  {
    id: 223,
    term: "Musyawarah",
    category: "asas-hukum",
    definition: "Perundingan untuk mencapai kesepakatan",
    example: "Musyawarah keluarga dalam pembagian warisan",
    legalBasis: "Hukum Adat",
    englishTerm: "Deliberation",
    relatedTerms: ["Overleg", "Perundingan", "Consultation"]
  },
  {
    id: 224,
    term: "Nafkah",
    category: "perkawinan",
    definition: "Kewajiban suami memberikan kebutuhan hidup kepada istri dan anak",
    example: "Nafkah bulanan untuk istri dan anak setelah perceraian",
    legalBasis: "Pasal 80 Kompilasi Hukum Islam",
    englishTerm: "Maintenance/Alimony",
    relatedTerms: ["Alimentatie", "Tunjangan", "Support"]
  },
  {
    id: 225,
    term: "Nama Domain",
    category: "harta-benda",
    definition: "Alamat unik di internet yang merupakan hak kekayaan intelektual",
    example: "www.perusahaan.com sebagai aset perusahaan",
    legalBasis: "UU ITE",
    englishTerm: "Domain Name",
    relatedTerms: ["Domeinnaam", "Alamat Web", "URL"],
    trending: true
  },
  {
    id: 226,
    term: "Natuurlijke Verbintenis",
    category: "perikatan",
    definition: "Perikatan alamiah yang tidak dapat dipaksakan tetapi jika dipenuhi tidak dapat diminta kembali",
    example: "Membayar utang yang sudah daluwarsa",
    legalBasis: "Pasal 1359 KUHPerdata",
    englishTerm: "Natural Obligation",
    relatedTerms: ["Kewajiban Alamiah", "Moral Obligation", "Perikatan Moral"]
  },
  {
    id: 227,
    term: "Nebis in Idem",
    category: "hukum-acara",
    definition: "Asas tidak boleh diadili dua kali untuk perkara yang sama",
    example: "Gugatan yang sudah diputus tidak boleh diajukan lagi",
    legalBasis: "Pasal 1917 KUHPerdata",
    englishTerm: "Res Judicata",
    relatedTerms: ["Ne Bis in Idem", "Kekuatan Hukum Tetap", "Final Judgment"]
  },
  {
    id: 228,
    term: "Negligence",
    category: "perikatan",
    definition: "Kelalaian yang menyebabkan kerugian pada orang lain",
    example: "Dokter lalai menyebabkan pasien cacat",
    legalBasis: "Pasal 1366 KUHPerdata",
    englishTerm: "Negligence",
    relatedTerms: ["Nalatigheid", "Kelalaian", "Culpa"]
  },
  {
    id: 229,
    term: "Negosiasi",
    category: "perjanjian",
    definition: "Proses tawar menawar untuk mencapai kesepakatan",
    example: "Negosiasi harga dalam jual beli tanah",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Negotiation",
    relatedTerms: ["Onderhandeling", "Perundingan", "Bargaining"]
  },
  {
    id: 230,
    term: "Nikah Bawah Tangan",
    category: "perkawinan",
    definition: "Perkawinan yang sah secara agama tetapi tidak dicatatkan",
    example: "Nikah siri yang tidak dicatatkan di KUA",
    legalBasis: "UU Perkawinan",
    englishTerm: "Unregistered Marriage",
    relatedTerms: ["Nikah Siri", "Kawin Tidak Tercatat", "Religious Marriage"]
  },
  {
    id: 231,
    term: "Nikah Fasid",
    category: "perkawinan",
    definition: "Perkawinan yang rusak karena tidak memenuhi syarat",
    example: "Nikah tanpa wali yang sah",
    legalBasis: "Kompilasi Hukum Islam",
    englishTerm: "Defective Marriage",
    relatedTerms: ["Nikah Rusak", "Invalid Marriage", "Fasakh"]
  },
  {
    id: 233,
    term: "Nisbah",
    category: "perjanjian",
    definition: "Perbandingan atau rasio pembagian hasil",
    example: "Nisbah bagi hasil 60:40 dalam mudharabah",
    legalBasis: "Fatwa DSN-MUI",
    englishTerm: "Ratio/Proportion",
    relatedTerms: ["Bagi Hasil", "Profit Sharing", "Revenue Share"]
  },
  {
    id: 234,
    term: "Nominee",
    category: "subjek-hukum",
    definition: "Pihak yang dipinjam namanya untuk kepentingan pihak lain",
    example: "WNI sebagai nominee untuk kepemilikan tanah oleh WNA",
    legalBasis: "Dilarang dalam UUPA",
    englishTerm: "Nominee",
    relatedTerms: ["Pinjam Nama", "Stroman", "Dummy"]
  },
  {
    id: 235,
    term: "Non-Disclosure Agreement",
    category: "perjanjian",
    definition: "Perjanjian kerahasiaan antara para pihak",
    example: "NDA antara perusahaan dan konsultan",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Non-Disclosure Agreement",
    relatedTerms: ["Perjanjian Kerahasiaan", "NDA", "Confidentiality Agreement"]
  },
  {
    id: 236,
    term: "Notaris",
    category: "subjek-hukum",
    definition: "Pejabat umum yang berwenang membuat akta autentik",
    example: "Notaris membuat akta jual beli tanah",
    legalBasis: "UU No. 2 Tahun 2014 tentang Jabatan Notaris",
    englishTerm: "Notary Public",
    relatedTerms: ["Notaris", "Pejabat Pembuat Akta", "Public Notary"]
  },
  {
    id: 237,
    term: "Novasi",
    category: "perikatan",
    definition: "Pembaruan utang dengan mengganti perikatan lama dengan yang baru",
    example: "Mengubah utang uang menjadi utang barang",
    legalBasis: "Pasal 1413 KUHPerdata",
    englishTerm: "Novation",
    relatedTerms: ["Schuldvernieuwing", "Pembaruan Utang", "Debt Renewal"]
  },
  {
    id: 238,
    term: "Nul en Onwaarde",
    category: "perjanjian",
    definition: "Batal demi hukum",
    example: "Perjanjian jual beli narkoba batal demi hukum",
    legalBasis: "Pasal 1335 KUHPerdata",
    englishTerm: "Null and Void",
    relatedTerms: ["Batal Demi Hukum", "Nietig", "Void ab initio"]
  },
  {
    id: 239,
    term: "Objek Hukum",
    category: "objek-hukum",
    definition: "Segala sesuatu yang dapat menjadi objek dari suatu hubungan hukum",
    example: "Tanah, bangunan, hak cipta",
    legalBasis: "Pasal 499 KUHPerdata",
    englishTerm: "Object of Law",
    relatedTerms: ["Rechtsobject", "Benda", "Legal Object"]
  },
  {
    id: 240,
    term: "Objek Perjanjian",
    category: "perjanjian",
    definition: "Hal tertentu yang diperjanjikan para pihak",
    example: "Rumah dalam perjanjian jual beli rumah",
    legalBasis: "Pasal 1332 KUHPerdata",
    englishTerm: "Object of Contract",
    relatedTerms: ["Voorwerp", "Pokok Perjanjian", "Subject Matter"]
  },
  {
    id: 241,
    term: "Obligasi",
    category: "perikatan",
    definition: "Surat utang jangka panjang yang dapat diperjualbelikan",
    example: "Obligasi negara atau obligasi korporasi",
    legalBasis: "UU Pasar Modal",
    englishTerm: "Bond",
    relatedTerms: ["Obligatie", "Surat Utang", "Debenture"]
  },
  {
    id: 242,
    term: "Obligatoir",
    category: "perikatan",
    definition: "Bersifat menimbulkan perikatan antara para pihak",
    example: "Perjanjian jual beli bersifat obligatoir",
    legalBasis: "Pasal 1458 KUHPerdata",
    englishTerm: "Obligatory",
    relatedTerms: ["Verbintenisrechtelijk", "Bersifat Perikatan", "Creating Obligation"]
  },
  {
    id: 243,
    term: "Oknum",
    category: "subjek-hukum",
    definition: "Orang yang bertindak atas nama pribadi bukan mewakili institusi",
    example: "Oknum polisi yang memeras",
    legalBasis: "Istilah Umum",
    englishTerm: "Rogue Individual",
    relatedTerms: ["Individu", "Perorangan", "Bad Actor"]
  },
  {
    id: 244,
    term: "Onrechtmatige Daad",
    category: "perikatan",
    definition: "Perbuatan melawan hukum yang menimbulkan kerugian",
    example: "Pencemaran nama baik di media sosial",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Tort/Unlawful Act",
    relatedTerms: ["Perbuatan Melawan Hukum", "PMH", "Wrongful Act"]
  },
  {
    id: 245,
    term: "Onverschuldigde Betaling",
    category: "perikatan",
    definition: "Pembayaran yang tidak berdasar",
    example: "Membayar utang yang tidak ada",
    legalBasis: "Pasal 1359 KUHPerdata",
    englishTerm: "Undue Payment",
    relatedTerms: ["Pembayaran Tidak Berdasar", "Keliru Bayar", "Payment by Mistake"]
  },
  {
    id: 246,
    term: "Openbaar",
    category: "asas-hukum",
    definition: "Terbuka untuk umum",
    example: "Sidang pengadilan yang terbuka untuk umum",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Public/Open",
    relatedTerms: ["Terbuka", "Publik", "Open Court"]
  },
  {
    id: 247,
    term: "Openbare Orde",
    category: "asas-hukum",
    definition: "Ketertiban umum",
    example: "Perjanjian tidak boleh bertentangan dengan ketertiban umum",
    legalBasis: "Pasal 1337 KUHPerdata",
    englishTerm: "Public Order",
    relatedTerms: ["Ketertiban Umum", "Public Policy", "Ordre Public"]
  },
  {
    id: 248,
    term: "Opsi",
    category: "perjanjian",
    definition: "Hak untuk memilih melakukan atau tidak melakukan sesuatu",
    example: "Opsi untuk membeli saham pada harga tertentu",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Option",
    relatedTerms: ["Optie", "Pilihan", "Choice"]
  },
  {
    id: 249,
    term: "Orang Asing",
    category: "subjek-hukum",
    definition: "Orang yang bukan warga negara Indonesia",
    example: "WNA yang tinggal di Indonesia",
    legalBasis: "UU Kewarganegaraan",
    englishTerm: "Foreign Person/Alien",
    relatedTerms: ["Vreemdeling", "WNA", "Foreigner"]
  },
  {
    id: 250,
    term: "Orang Hilang",
    category: "subjek-hukum",
    definition: "Orang yang tidak diketahui keberadaannya dalam waktu tertentu",
    example: "Orang hilang akibat bencana alam",
    legalBasis: "Pasal 463-495 KUHPerdata",
    englishTerm: "Missing Person",
    relatedTerms: ["Vermiste", "Orang Tidak Diketahui", "Disappeared Person"]
  },
  {
    id: 251,
    term: "Orang Tua Angkat",
    category: "perkawinan",
    definition: "Orang yang secara hukum menjadi orang tua dari anak angkat melalui proses pengangkatan anak yang sah",
    example: "Pasangan suami istri yang mengangkat anak yatim menjadi orang tua angkat",
    legalBasis: "PP No. 54 Tahun 2007",
    englishTerm: "Adoptive Parents",
    relatedTerms: ["Adopsi", "Pengangkatan Anak", "Anak Angkat"]
  },
  {
    id: 252,
    term: "Pembatalan Perkawinan",
    category: "perkawinan",
    definition: "Tindakan hukum untuk membatalkan perkawinan yang telah dilangsungkan karena tidak memenuhi syarat sahnya perkawinan",
    example: "Pembatalan perkawinan karena pemalsuan identitas",
    legalBasis: "Pasal 22-28 UU No. 1/1974",
    englishTerm: "Marriage Annulment",
    relatedTerms: ["Nullification", "Batal Nikah"]
  },
  {
    id: 253,
    term: "Perceraian",
    category: "perkawinan",
    definition: "Putusnya perkawinan yang sah karena alasan-alasan yang diatur dalam undang-undang",
    example: "Perceraian karena perselingkuhan yang dilakukan salah satu pihak",
    legalBasis: "Pasal 38-41 UU No. 1/1974",
    englishTerm: "Divorce",
    relatedTerms: ["Cerai", "Putusnya Perkawinan"]
  },
  {
    id: 254,
    term: "Harta Gono-Gini",
    category: "perkawinan",
    definition: "Harta benda yang diperoleh selama perkawinan menjadi harta bersama suami istri",
    example: "Rumah yang dibeli setelah menikah menjadi harta gono-gini",
    legalBasis: "Pasal 35 UU No. 1/1974",
    englishTerm: "Marital Property",
    relatedTerms: ["Harta Bersama", "Community Property"]
  },
  {
    id: 255,
    term: "Perjanjian Pranikah",
    category: "perkawinan",
    definition: "Perjanjian yang dibuat calon suami istri sebelum perkawinan mengenai pemisahan harta",
    example: "Perjanjian pranikah yang mengatur pemisahan harta kekayaan",
    legalBasis: "Pasal 29 UU No. 1/1974",
    englishTerm: "Prenuptial Agreement",
    relatedTerms: ["Prenup", "Perjanjian Kawin"]
  },
  {
    id: 256,
    term: "Isbat Nikah",
    category: "perkawinan",
    definition: "Penetapan tentang sahnya perkawinan yang telah dilangsungkan menurut agama Islam",
    example: "Isbat nikah untuk perkawinan yang tidak tercatat",
    legalBasis: "KHI Pasal 7",
    englishTerm: "Marriage Validation",
    relatedTerms: ["Pengesahan Nikah", "Itsbat"]
  },
  {
    id: 257,
    term: "Wali Nikah",
    category: "perkawinan",
    definition: "Orang yang berhak menikahkan seorang perempuan dalam perkawinan Islam",
    example: "Ayah kandung sebagai wali nikah putrinya",
    legalBasis: "KHI Pasal 19-23",
    englishTerm: "Marriage Guardian",
    relatedTerms: ["Wali", "Guardian"]
  },
  {
    id: 258,
    term: "Mahar",
    category: "perkawinan",
    definition: "Pemberian wajib dari calon suami kepada calon istri dalam perkawinan Islam",
    example: "Mahar berupa uang tunai sejumlah tertentu",
    legalBasis: "KHI Pasal 30-38",
    englishTerm: "Dowry",
    relatedTerms: ["Mas Kawin", "Mahr"]
  },
  {
    id: 259,
    term: "Talak",
    category: "perkawinan",
    definition: "Ikrar suami di hadapan sidang Pengadilan Agama yang menjadi salah satu sebab putusnya perkawinan",
    example: "Suami mengucapkan ikrar talak di depan hakim",
    legalBasis: "KHI Pasal 117",
    englishTerm: "Islamic Divorce",
    relatedTerms: ["Cerai Talak", "Repudiation"]
  },
  {
    id: 260,
    term: "Khuluk",
    category: "perkawinan",
    definition: "Perceraian atas permintaan istri dengan memberikan tebusan kepada suami",
    example: "Istri mengajukan khuluk dengan mengembalikan mahar",
    legalBasis: "KHI Pasal 124",
    englishTerm: "Khula",
    relatedTerms: ["Cerai Gugat", "Cerai Tebus"]
  },
  {
    id: 261,
    term: "Rujuk",
    category: "perkawinan",
    definition: "Kembalinya suami kepada istri dalam masa iddah setelah talak raj'i",
    example: "Suami merujuk istri sebelum masa iddah berakhir",
    legalBasis: "KHI Pasal 163-169",
    englishTerm: "Reconciliation",
    relatedTerms: ["Ruju'", "Kembali"]
  },
  {
    id: 262,
    term: "Iddah",
    category: "perkawinan",
    definition: "Masa tunggu bagi wanita yang bercerai atau ditinggal mati suami sebelum menikah lagi",
    example: "Iddah 3 bulan bagi wanita yang dicerai",
    legalBasis: "KHI Pasal 153",
    englishTerm: "Waiting Period",
    relatedTerms: ["Masa Tunggu", "Iddah Period"]
  },
  {
    id: 263,
    term: "Mut'ah",
    category: "perkawinan",
    definition: "Pemberian bekas suami kepada istri yang diceraikan",
    example: "Suami memberikan mut'ah berupa uang kepada bekas istri",
    legalBasis: "KHI Pasal 158-160",
    englishTerm: "Consolatory Gift",
    relatedTerms: ["Pemberian Perceraian", "Mut'ah Payment"]
  },
  {
    id: 264,
    term: "Nusyuz",
    category: "perkawinan",
    definition: "Sikap tidak patuh salah satu pihak terhadap kewajibannya dalam perkawinan",
    example: "Istri meninggalkan rumah tanpa izin suami",
    legalBasis: "KHI Pasal 84",
    englishTerm: "Marital Disobedience",
    relatedTerms: ["Durhaka", "Pembangkangan"]
  },
  {
    id: 265,
    term: "Li'an",
    category: "perkawinan",
    definition: "Sumpah suami yang menuduh istri berzina tanpa dapat mengajukan 4 saksi",
    example: "Suami melakukan li'an karena meragukan anak yang dikandung istri",
    legalBasis: "KHI Pasal 125-128",
    englishTerm: "Oath of Condemnation",
    relatedTerms: ["Sumpah Li'an", "Tuduhan Zina"]
  },
  {
    id: 266,
    term: "Poligami",
    category: "perkawinan",
    definition: "Perkawinan seorang suami dengan lebih dari seorang istri",
    example: "Suami menikah lagi dengan izin pengadilan dan istri pertama",
    legalBasis: "Pasal 3-5 UU No. 1/1974",
    englishTerm: "Polygamy",
    relatedTerms: ["Beristri Lebih Dari Satu", "Poligini"]
  },
  {
    id: 267,
    term: "Syarat Perkawinan",
    category: "perkawinan",
    definition: "Ketentuan yang harus dipenuhi untuk sahnya suatu perkawinan",
    example: "Syarat usia minimal dan persetujuan kedua calon mempelai",
    legalBasis: "Pasal 6-12 UU No. 1/1974",
    englishTerm: "Marriage Requirements",
    relatedTerms: ["Rukun Nikah", "Persyaratan Nikah"]
  },
  {
    id: 268,
    term: "Pencatatan Perkawinan",
    category: "perkawinan",
    definition: "Pendaftaran perkawinan pada instansi yang berwenang",
    example: "Pencatatan nikah di KUA untuk muslim",
    legalBasis: "Pasal 2 ayat (2) UU No. 1/1974",
    englishTerm: "Marriage Registration",
    relatedTerms: ["Registrasi Nikah", "Pendaftaran Perkawinan"]
  },
  {
    id: 269,
    term: "Dispensasi Kawin",
    category: "perkawinan",
    definition: "Pemberian izin kawin bagi yang belum mencapai umur minimum perkawinan",
    example: "Pengadilan memberikan dispensasi kawin karena keadaan mendesak",
    legalBasis: "Pasal 7 ayat (2) UU No. 16/2019",
    englishTerm: "Marriage Dispensation",
    relatedTerms: ["Dispensasi Nikah", "Izin Kawin"]
  },
  {
    id: 270,
    term: "Larangan Perkawinan",
    category: "perkawinan",
    definition: "Halangan untuk melangsungkan perkawinan menurut hukum",
    example: "Larangan menikah dengan saudara kandung",
    legalBasis: "Pasal 8-9 UU No. 1/1974",
    englishTerm: "Marriage Prohibition",
    relatedTerms: ["Halangan Perkawinan", "Impediment"]
  },
  {
    id: 271,
    term: "Akad Nikah",
    category: "perkawinan",
    definition: "Perjanjian perkawinan antara calon suami dan wali calon istri",
    example: "Ijab kabul dalam akad nikah",
    legalBasis: "KHI Pasal 27-29",
    englishTerm: "Marriage Contract",
    relatedTerms: ["Ijab Kabul", "Nikah Contract"]
  },
  {
    id: 272,
    term: "Walimah",
    category: "perkawinan",
    definition: "Pesta perkawinan yang diselenggarakan setelah akad nikah",
    example: "Walimatul 'ursy sebagai pengumuman perkawinan",
    legalBasis: "KHI Pasal 2",
    englishTerm: "Wedding Reception",
    relatedTerms: ["Resepsi Pernikahan", "Pesta Nikah"]
  },
  {
    id: 273,
    term: "Nafkah",
    category: "perkawinan",
    definition: "Kewajiban suami memberikan kebutuhan hidup kepada istri dan anak",
    example: "Nafkah lahir berupa makanan, pakaian, dan tempat tinggal",
    legalBasis: "Pasal 34 UU No. 1/1974",
    englishTerm: "Maintenance",
    relatedTerms: ["Alimentasi", "Support"]
  },
  {
    id: 274,
    term: "Hadhanah",
    category: "perkawinan",
    definition: "Pemeliharaan anak yang belum mumayyiz atau belum dewasa",
    example: "Hak hadhanah jatuh kepada ibu setelah perceraian",
    legalBasis: "KHI Pasal 105",
    englishTerm: "Child Custody",
    relatedTerms: ["Hak Asuh", "Pemeliharaan Anak"]
  },
  {
    id: 275,
    term: "Waris Islam",
    category: "waris",
    definition: "Hukum yang mengatur pemindahan hak pemilikan harta peninggalan pewaris muslim",
    example: "Pembagian warisan dengan sistem faraidh",
    legalBasis: "KHI Buku II",
    englishTerm: "Islamic Inheritance",
    relatedTerms: ["Faraidh", "Mawaris"]
  },
  {
    id: 276,
    term: "Ahli Waris",
    category: "waris",
    definition: "Orang yang berhak menerima harta peninggalan dari pewaris yang meninggal",
    example: "Anak dan istri sebagai ahli waris",
    legalBasis: "Pasal 852 KUHPerdata",
    englishTerm: "Heir",
    relatedTerms: ["Pewaris", "Beneficiary"]
  },
  {
    id: 277,
    term: "Wasiat",
    category: "waris",
    definition: "Pesan terakhir pewaris mengenai pembagian hartanya setelah meninggal",
    example: "Wasiat untuk memberikan 1/3 harta kepada yayasan",
    legalBasis: "Pasal 875 KUHPerdata",
    englishTerm: "Will/Testament",
    relatedTerms: ["Testamen", "Surat Wasiat"]
  },
  {
    id: 278,
    term: "Legitieme Portie",
    category: "waris",
    definition: "Bagian mutlak warisan yang harus diterima ahli waris tertentu",
    example: "Anak mendapat bagian mutlak yang tidak dapat dikurangi wasiat",
    legalBasis: "Pasal 913 KUHPerdata",
    englishTerm: "Forced Heirship",
    relatedTerms: ["Bagian Mutlak", "Warisan Wajib"]
  },
  {
    id: 279,
    term: "Hibah",
    category: "waris",
    definition: "Pemberian harta dari seseorang kepada orang lain saat masih hidup",
    example: "Orang tua menghibahkan rumah kepada anaknya",
    legalBasis: "Pasal 1666 KUHPerdata",
    englishTerm: "Gift/Grant",
    relatedTerms: ["Pemberian", "Hadiah"]
  },
  {
    id: 280,
    term: "Waris Ab Intestato",
    category: "waris",
    definition: "Pewarisan berdasarkan undang-undang tanpa wasiat",
    example: "Pembagian warisan menurut ketentuan undang-undang",
    legalBasis: "Pasal 832 KUHPerdata",
    englishTerm: "Intestate Succession",
    relatedTerms: ["Warisan Tanpa Wasiat", "Statutory Heir"]
  },
  {
    id: 281,
    term: "Waris Testamentair",
    category: "waris",
    definition: "Pewarisan berdasarkan wasiat yang dibuat pewaris",
    example: "Pembagian harta sesuai surat wasiat",
    legalBasis: "Pasal 874 KUHPerdata",
    englishTerm: "Testamentary Succession",
    relatedTerms: ["Warisan Wasiat", "Willed Inheritance"]
  },
  {
    id: 282,
    term: "Boedel",
    category: "waris",
    definition: "Seluruh harta kekayaan pewaris yang menjadi warisan",
    example: "Boedel meliputi aktiva dan pasiva pewaris",
    legalBasis: "Pasal 833 KUHPerdata",
    englishTerm: "Estate",
    relatedTerms: ["Harta Warisan", "Deceased Estate"]
  },
  {
    id: 283,
    term: "Beneficiaire Aanvaarding",
    category: "waris",
    definition: "Penerimaan warisan dengan syarat tidak menanggung hutang melebihi aktiva",
    example: "Ahli waris menerima warisan secara beneficiair",
    legalBasis: "Pasal 1023 KUHPerdata",
    englishTerm: "Benefit of Inventory",
    relatedTerms: ["Penerimaan Terbatas", "Limited Acceptance"]
  },
  {
    id: 284,
    term: "Preterisie",
    category: "waris",
    definition: "Kelalaian menyebut ahli waris dalam wasiat",
    example: "Anak yang tidak disebut dalam wasiat tetap mendapat bagian",
    legalBasis: "Pasal 920 KUHPerdata",
    englishTerm: "Preterition",
    relatedTerms: ["Kelalaian Wasiat", "Omission"]
  },
  {
    id: 285,
    term: "Substitusi",
    category: "waris",
    definition: "Penggantian ahli waris yang meninggal lebih dulu dari pewaris",
    example: "Cucu menggantikan kedudukan orang tua yang meninggal",
    legalBasis: "Pasal 841-848 KUHPerdata",
    englishTerm: "Substitution",
    relatedTerms: ["Penggantian Ahli Waris", "Plaatsvervulling"]
  },
  {
    id: 286,
    term: "Onwaardig",
    category: "waris",
    definition: "Tidak patut menjadi ahli waris karena perbuatan tertentu",
    example: "Pembunuh pewaris dinyatakan tidak patut mewaris",
    legalBasis: "Pasal 838 KUHPerdata",
    englishTerm: "Unworthy Heir",
    relatedTerms: ["Tidak Patut Mewaris", "Disinheritance"]
  },
  {
    id: 287,
    term: "Saisine",
    category: "waris",
    definition: "Peralihan hak milik atas warisan secara otomatis saat pewaris meninggal",
    example: "Harta warisan langsung beralih kepada ahli waris",
    legalBasis: "Pasal 833 KUHPerdata",
    englishTerm: "Seisin",
    relatedTerms: ["Peralihan Otomatis", "Automatic Transfer"]
  },
  {
    id: 288,
    term: "Warisan Yayasan",
    category: "waris",
    definition: "Harta yang diwasiatkan untuk kepentingan yayasan",
    example: "Pewaris mewariskan tanah untuk yayasan pendidikan",
    legalBasis: "UU No. 16/2001",
    englishTerm: "Foundation Bequest",
    relatedTerms: ["Wakaf", "Charitable Trust"]
  },
  {
    id: 289,
    term: "Fidei Commis",
    category: "waris",
    definition: "Wasiat bersyarat yang pelaksanaannya dipercayakan kepada orang lain",
    example: "Wasiat untuk cucu melalui anak dengan syarat tertentu",
    legalBasis: "Pasal 935 KUHPerdata",
    englishTerm: "Trust",
    relatedTerms: ["Wasiat Bersyarat", "Conditional Will"]
  },
  {
    id: 290,
    term: "Erfstelling",
    category: "waris",
    definition: "Penetapan seseorang sebagai ahli waris dalam wasiat",
    example: "Pewaris menetapkan keponakan sebagai ahli waris",
    legalBasis: "Pasal 954 KUHPerdata",
    englishTerm: "Testamentary Heir",
    relatedTerms: ["Penetapan Waris", "Heir Designation"]
  },
  {
    id: 291,
    term: "Legaat",
    category: "waris",
    definition: "Pemberian barang tertentu kepada seseorang dalam wasiat",
    example: "Wasiat memberikan mobil kepada sahabat",
    legalBasis: "Pasal 957 KUHPerdata",
    englishTerm: "Legacy",
    relatedTerms: ["Hibah Wasiat", "Bequest"]
  },
  {
    id: 292,
    term: "Codicil",
    category: "waris",
    definition: "Tambahan atau perubahan pada wasiat yang sudah ada",
    example: "Menambah penerima wasiat melalui codicil",
    legalBasis: "Pasal 930 KUHPerdata",
    englishTerm: "Codicil",
    relatedTerms: ["Tambahan Wasiat", "Wasiat Tambahan"]
  },
  {
    id: 293,
    term: "Eksekutor Testamentair",
    category: "waris",
    definition: "Orang yang ditunjuk untuk melaksanakan wasiat",
    example: "Notaris ditunjuk sebagai eksekutor wasiat",
    legalBasis: "Pasal 1003 KUHPerdata",
    englishTerm: "Executor",
    relatedTerms: ["Pelaksana Wasiat", "Estate Executor"]
  },
  {
    id: 294,
    term: "Makruh",
    category: "waris",
    definition: "Tindakan yang tidak disukai dalam pembagian warisan Islam",
    example: "Menunda pembagian warisan tanpa alasan",
    legalBasis: "KHI",
    englishTerm: "Disapproved Act",
    relatedTerms: ["Tidak Disukai", "Discouraged"]
  },
  {
    id: 295,
    term: "Takharruj",
    category: "waris",
    definition: "Pengunduran diri ahli waris dari hak warisnya",
    example: "Anak melepaskan hak waris untuk saudaranya",
    legalBasis: "KHI Pasal 183",
    englishTerm: "Renunciation",
    relatedTerms: ["Pelepasan Waris", "Waiver"]
  },
  {
    id: 296,
    term: "Radd",
    category: "waris",
    definition: "Pengembalian sisa harta waris kepada ahli waris tertentu",
    example: "Sisa warisan dikembalikan kepada anak perempuan",
    legalBasis: "KHI",
    englishTerm: "Return of Residue",
    relatedTerms: ["Pengembalian Sisa", "Residuary"]
  },
  {
    id: 298,
    term: "Mumayyiz",
    category: "perkawinan",
    definition: "Anak yang sudah dapat membedakan baik dan buruk",
    example: "Anak mumayyiz dapat memilih ikut ayah atau ibu",
    legalBasis: "KHI Pasal 105",
    englishTerm: "Discerning Child",
    relatedTerms: ["Tamyiz", "Age of Discernment"]
  },
  {
    id: 299,
    term: "Syiqaq",
    category: "perkawinan",
    definition: "Perselisihan suami istri yang tidak dapat didamaikan",
    example: "Syiqaq menjadi alasan perceraian",
    legalBasis: "KHI Pasal 76",
    englishTerm: "Marital Discord",
    relatedTerms: ["Perselisihan", "Dispute"]
  },
  {
    id: 300,
    term: "Fasakh",
    category: "perkawinan",
    definition: "Pembatalan perkawinan oleh Pengadilan Agama",
    example: "Fasakh karena suami murtad",
    legalBasis: "KHI Pasal 71",
    englishTerm: "Annulment",
    relatedTerms: ["Pembatalan Nikah", "Dissolution"]
  },
  {
    id: 301,
    term: "Perjanjian Jual Beli",
    category: "perjanjian",
    definition: "Perjanjian dimana penjual menyerahkan barang dan pembeli membayar harga",
    example: "Jual beli rumah dengan akta notaris",
    legalBasis: "Pasal 1457 KUHPerdata",
    englishTerm: "Sale and Purchase Agreement",
    relatedTerms: ["Kontrak Jual Beli", "SPA"]
  },
  {
    id: 302,
    term: "Perjanjian Sewa Menyewa",
    category: "perjanjian",
    definition: "Perjanjian untuk memakai suatu barang dengan membayar sewa",
    example: "Sewa rumah selama 2 tahun",
    legalBasis: "Pasal 1548 KUHPerdata",
    englishTerm: "Lease Agreement",
    relatedTerms: ["Kontrak Sewa", "Rental Agreement"]
  },
  {
    id: 303,
    term: "Perjanjian Kerja",
    category: "perjanjian",
    definition: "Perjanjian antara pekerja dan pemberi kerja yang memuat syarat kerja",
    example: "Kontrak kerja karyawan tetap",
    legalBasis: "UU No. 13/2003",
    englishTerm: "Employment Contract",
    relatedTerms: ["Kontrak Kerja", "PKWT"]
  },
  {
    id: 304,
    term: "Perjanjian Kredit",
    category: "perjanjian",
    definition: "Perjanjian pemberian kredit antara bank dan debitur",
    example: "Kredit pemilikan rumah (KPR)",
    legalBasis: "UU Perbankan",
    englishTerm: "Credit Agreement",
    relatedTerms: ["Akad Kredit", "Loan Agreement"]
  },
  {
    id: 305,
    term: "Perjanjian Kerjasama",
    category: "perjanjian",
    definition: "Perjanjian antara dua pihak atau lebih untuk bekerjasama",
    example: "MoU kerjasama bisnis",
    legalBasis: "Pasal 1313 KUHPerdata",
    englishTerm: "Cooperation Agreement",
    relatedTerms: ["MoU", "Joint Agreement"]
  },
  {
    id: 306,
    term: "Perjanjian Lisensi",
    category: "perjanjian",
    definition: "Perjanjian pemberian izin penggunaan hak kekayaan intelektual",
    example: "Lisensi penggunaan merek dagang",
    legalBasis: "UU Merek",
    englishTerm: "License Agreement",
    relatedTerms: ["Kontrak Lisensi", "Licensing"]
  },
  {
    id: 307,
    term: "Perjanjian Franchise",
    category: "perjanjian",
    definition: "Perjanjian waralaba antara franchisor dan franchisee",
    example: "Franchise restoran cepat saji",
    legalBasis: "PP No. 42/2007",
    englishTerm: "Franchise Agreement",
    relatedTerms: ["Waralaba", "Franchising"]
  },
  {
    id: 308,
    term: "Perjanjian Konsinyasi",
    category: "perjanjian",
    definition: "Perjanjian penitipan barang untuk dijual",
    example: "Konsinyasi produk ke toko retail",
    legalBasis: "Pasal 1313 KUHPerdata",
    englishTerm: "Consignment Agreement",
    relatedTerms: ["Titip Jual", "Consignment"]
  },
  {
    id: 309,
    term: "Perjanjian Baku",
    category: "perjanjian",
    definition: "Perjanjian yang klausulanya telah ditetapkan sepihak",
    example: "Syarat dan ketentuan aplikasi online",
    legalBasis: "UU Perlindungan Konsumen",
    englishTerm: "Standard Contract",
    relatedTerms: ["Kontrak Standar", "Adhesion Contract"]
  },
  {
    id: 310,
    term: "Perjanjian Innominaat",
    category: "perjanjian",
    definition: "Perjanjian yang tidak diatur khusus dalam undang-undang",
    example: "Perjanjian sponsorship",
    legalBasis: "Pasal 1319 KUHPerdata",
    englishTerm: "Innominate Contract",
    relatedTerms: ["Kontrak Tidak Bernama", "Unnamed Contract"]
  },
  {
    id: 311,
    term: "Perjanjian Nominaat",
    category: "perjanjian",
    definition: "Perjanjian yang diatur khusus dalam undang-undang",
    example: "Jual beli, sewa menyewa, hibah",
    legalBasis: "Buku III KUHPerdata",
    englishTerm: "Nominate Contract",
    relatedTerms: ["Kontrak Bernama", "Named Contract"]
  },
  {
    id: 312,
    term: "Perjanjian Sepihak",
    category: "perjanjian",
    definition: "Perjanjian yang hanya menimbulkan kewajiban pada satu pihak",
    example: "Perjanjian hibah murni",
    legalBasis: "Pasal 1313 KUHPerdata",
    englishTerm: "Unilateral Contract",
    relatedTerms: ["Kontrak Unilateral", "One-sided Contract"]
  },
  {
    id: 313,
    term: "Perjanjian Timbal Balik",
    category: "perjanjian",
    definition: "Perjanjian yang menimbulkan kewajiban pada kedua belah pihak",
    example: "Jual beli dengan kewajiban serah terima",
    legalBasis: "Pasal 1313 KUHPerdata",
    englishTerm: "Bilateral Contract",
    relatedTerms: ["Kontrak Bilateral", "Reciprocal Contract"]
  },
  {
    id: 314,
    term: "Perjanjian Konsensual",
    category: "perjanjian",
    definition: "Perjanjian yang terjadi karena kesepakatan",
    example: "Jual beli yang sah sejak ada kata sepakat",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Consensual Contract",
    relatedTerms: ["Kontrak Konsensual", "Agreement"]
  },
  {
    id: 315,
    term: "Perjanjian Riil",
    category: "perjanjian",
    definition: "Perjanjian yang memerlukan penyerahan barang",
    example: "Perjanjian pinjam pakai",
    legalBasis: "Pasal 1740 KUHPerdata",
    englishTerm: "Real Contract",
    relatedTerms: ["Kontrak Riil", "Delivery Contract"]
  },
  {
    id: 316,
    term: "Perjanjian Formil",
    category: "perjanjian",
    definition: "Perjanjian yang memerlukan bentuk tertentu",
    example: "Perjanjian perdamaian harus tertulis",
    legalBasis: "Pasal 1851 KUHPerdata",
    englishTerm: "Formal Contract",
    relatedTerms: ["Kontrak Formal", "Written Contract"]
  },
  {
    id: 317,
    term: "Klausula Baku",
    category: "perjanjian",
    definition: "Aturan atau ketentuan yang telah dipersiapkan dan ditetapkan terlebih dahulu",
    example: "Terms and conditions pada website",
    legalBasis: "UU No. 8/1999",
    englishTerm: "Standard Clause",
    relatedTerms: ["Standard Terms", "Boilerplate"]
  },
  {
    id: 318,
    term: "Klausula Eksonerasi",
    category: "perjanjian",
    definition: "Klausula yang mengecualikan atau membatasi tanggung jawab",
    example: "Pengecualian tanggung jawab atas kerusakan",
    legalBasis: "Pasal 18 UU No. 8/1999",
    englishTerm: "Exoneration Clause",
    relatedTerms: ["Exemption Clause", "Limitation Clause"]
  },
  {
    id: 319,
    term: "Klausula Penalti",
    category: "perjanjian",
    definition: "Klausula yang menetapkan ganti rugi bila terjadi wanprestasi",
    example: "Denda keterlambatan pembayaran",
    legalBasis: "Pasal 1304 KUHPerdata",
    englishTerm: "Penalty Clause",
    relatedTerms: ["Denda", "Liquidated Damages"]
  },
  {
    id: 320,
    term: "Force Majeure",
    category: "perjanjian",
    definition: "Keadaan memaksa yang menghalangi pelaksanaan perjanjian",
    example: "Bencana alam yang menghambat pengiriman",
    legalBasis: "Pasal 1244-1245 KUHPerdata",
    englishTerm: "Force Majeure",
    relatedTerms: ["Keadaan Kahar", "Overmacht"]
  },
  {
    id: 321,
    term: "Hardship",
    category: "perjanjian",
    definition: "Kesulitan pelaksanaan perjanjian karena perubahan keadaan",
    example: "Krisis ekonomi yang mengubah nilai kontrak",
    legalBasis: "UNIDROIT Principles",
    englishTerm: "Hardship",
    relatedTerms: ["Kesulitan", "Changed Circumstances"]
  },
  {
    id: 322,
    term: "Rebus Sic Stantibus",
    category: "perjanjian",
    definition: "Asas bahwa perjanjian berlaku selama keadaan tetap sama",
    example: "Perubahan fundamental mengubah kewajiban kontrak",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Rebus Sic Stantibus",
    relatedTerms: ["Clausula Rebus", "Things Standing Thus"]
  },
  {
    id: 323,
    term: "Pactum de Contrahendo",
    category: "perjanjian",
    definition: "Perjanjian untuk membuat perjanjian",
    example: "MoU yang akan ditindaklanjuti dengan kontrak",
    legalBasis: "Pasal 1313 KUHPerdata",
    englishTerm: "Agreement to Agree",
    relatedTerms: ["Pra-kontrak", "Preliminary Agreement"]
  },
  {
    id: 324,
    term: "Syarat Batal",
    category: "perjanjian",
    definition: "Syarat yang bila terpenuhi membatalkan perjanjian",
    example: "Perjanjian batal jika izin tidak keluar",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Resolutive Condition",
    relatedTerms: ["Condition Subsequent", "Ontbindende Voorwaarde"]
  },
  {
    id: 325,
    term: "Syarat Tangguh",
    category: "perjanjian",
    definition: "Syarat yang menangguhkan berlakunya perjanjian",
    example: "Kontrak berlaku setelah DP dibayar",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Suspensive Condition",
    relatedTerms: ["Condition Precedent", "Opschortende Voorwaarde"]
  },
  {
    id: 326,
    term: "Prestasi",
    category: "perikatan",
    definition: "Kewajiban yang harus dipenuhi dalam perikatan",
    example: "Menyerahkan barang sesuai kontrak",
    legalBasis: "Pasal 1234 KUHPerdata",
    englishTerm: "Performance",
    relatedTerms: ["Kewajiban", "Obligation"]
  },
  {
    id: 327,
    term: "Wanprestasi",
    category: "perikatan",
    definition: "Tidak memenuhi kewajiban dalam perjanjian",
    example: "Terlambat menyerahkan barang",
    legalBasis: "Pasal 1243 KUHPerdata",
    englishTerm: "Default/Breach",
    relatedTerms: ["Cidera Janji", "Non-performance"]
  },
  {
    id: 328,
    term: "Somasi",
    category: "perikatan",
    definition: "Teguran atau peringatan kepada debitur yang lalai",
    example: "Somasi tertulis untuk membayar hutang",
    legalBasis: "Pasal 1238 KUHPerdata",
    englishTerm: "Notice of Default",
    relatedTerms: ["Ingebrekestelling", "Demand Letter"]
  },
  {
    id: 329,
    term: "Mora Debitoris",
    category: "perikatan",
    definition: "Kelalaian debitur dalam memenuhi kewajiban",
    example: "Debitur terlambat membayar angsuran",
    legalBasis: "Pasal 1237 KUHPerdata",
    englishTerm: "Debtor's Default",
    relatedTerms: ["Kelalaian Debitur", "Debtor in Delay"]
  },
  {
    id: 330,
    term: "Mora Creditoris",
    category: "perikatan",
    definition: "Kelalaian kreditur dalam menerima prestasi",
    example: "Kreditur menolak menerima pembayaran",
    legalBasis: "Pasal 1237 KUHPerdata",
    englishTerm: "Creditor's Default",
    relatedTerms: ["Kelalaian Kreditur", "Creditor in Delay"]
  },
  {
    id: 331,
    term: "Exceptio Non Adimpleti Contractus",
    category: "perikatan",
    definition: "Hak menahan prestasi karena pihak lain belum berprestasi",
    example: "Menahan pembayaran karena barang belum diterima",
    legalBasis: "Asas Hukum",
    englishTerm: "Exception of Non-performance",
    relatedTerms: ["Eksepsi Tidak Dipenuhi", "Tangkisan"]
  },
  {
    id: 332,
    term: "Subrogasi",
    category: "perikatan",
    definition: "Penggantian kedudukan kreditur oleh pihak ketiga yang membayar",
    example: "Asuransi menggantikan posisi kreditur setelah membayar klaim",
    legalBasis: "Pasal 1400 KUHPerdata",
    englishTerm: "Subrogation",
    relatedTerms: ["Penggantian Hak", "Substitution"]
  },
  {
    id: 333,
    term: "Novasi",
    category: "perikatan",
    definition: "Pembaruan hutang dengan mengganti perikatan lama",
    example: "Mengubah hutang uang menjadi kewajiban menyerahkan barang",
    legalBasis: "Pasal 1413 KUHPerdata",
    englishTerm: "Novation",
    relatedTerms: ["Pembaruan Hutang", "Debt Renewal"]
  },
  {
    id: 334,
    term: "Kompensasi",
    category: "perikatan",
    definition: "Perjumpaan hutang piutang yang saling hapus",
    example: "A berhutang pada B, B berhutang pada A",
    legalBasis: "Pasal 1425 KUHPerdata",
    englishTerm: "Set-off",
    relatedTerms: ["Perjumpaan Hutang", "Compensation"]
  },
  {
    id: 335,
    term: "Konfusie",
    category: "perikatan",
    definition: "Percampuran kedudukan kreditur dan debitur dalam satu orang",
    example: "Ahli waris mewarisi perusahaan yang berhutang padanya",
    legalBasis: "Pasal 1436 KUHPerdata",
    englishTerm: "Confusion",
    relatedTerms: ["Percampuran", "Merger"]
  },
  {
    id: 336,
    term: "Remisi",
    category: "perikatan",
    definition: "Pembebasan hutang oleh kreditur",
    example: "Bank membebaskan sisa hutang debitur",
    legalBasis: "Pasal 1438 KUHPerdata",
    englishTerm: "Remission",
    relatedTerms: ["Pembebasan Hutang", "Debt Forgiveness"]
  },
  {
    id: 337,
    term: "Cessie",
    category: "perikatan",
    definition: "Pengalihan piutang atas nama kepada pihak lain",
    example: "Bank menjual piutang kredit macet",
    legalBasis: "Pasal 613 KUHPerdata",
    englishTerm: "Assignment",
    relatedTerms: ["Pengalihan Piutang", "Debt Assignment"]
  },
  {
    id: 338,
    term: "Delegasi",
    category: "perikatan",
    definition: "Pengalihan hutang kepada pihak ketiga",
    example: "Perusahaan A mengalihkan hutangnya ke perusahaan B",
    legalBasis: "Pasal 1417 KUHPerdata",
    englishTerm: "Delegation",
    relatedTerms: ["Pengalihan Hutang", "Debt Transfer"]
  },
  {
    id: 339,
    term: "Perikatan Alamiah",
    category: "perikatan",
    definition: "Perikatan yang tidak dapat dipaksakan di pengadilan",
    example: "Hutang yang telah kedaluwarsa",
    legalBasis: "Pasal 1359 KUHPerdata",
    englishTerm: "Natural Obligation",
    relatedTerms: ["Natuurlijke Verbintenis", "Moral Obligation"]
  },
  {
    id: 340,
    term: "Perikatan Bersyarat",
    category: "perikatan",
    definition: "Perikatan yang bergantung pada peristiwa yang belum tentu terjadi",
    example: "Membayar bonus jika target tercapai",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Conditional Obligation",
    relatedTerms: ["Voorwaardelijke Verbintenis", "Contingent"]
  },
  {
    id: 341,
    term: "Perikatan Solidair",
    category: "perikatan",
    definition: "Perikatan dengan beberapa kreditur atau debitur yang dapat menuntut/dituntut untuk seluruhnya",
    example: "Hutang bersama suami istri",
    legalBasis: "Pasal 1278 KUHPerdata",
    englishTerm: "Joint and Several Obligation",
    relatedTerms: ["Tanggung Renteng", "Solidary"]
  },
  {
    id: 342,
    term: "Perikatan Alternatif",
    category: "perikatan",
    definition: "Perikatan dengan beberapa prestasi dimana debitur cukup melakukan salah satu",
    example: "Membayar uang atau menyerahkan mobil",
    legalBasis: "Pasal 1272 KUHPerdata",
    englishTerm: "Alternative Obligation",
    relatedTerms: ["Alternatieve Verbintenis", "Choice"]
  },
  {
    id: 343,
    term: "Perikatan Fakultatif",
    category: "perikatan",
    definition: "Perikatan dengan satu prestasi pokok yang dapat diganti",
    example: "Menyerahkan mobil A, boleh diganti mobil B",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Facultative Obligation",
    relatedTerms: ["Facultatieve Verbintenis", "Optional"]
  },
  {
    id: 344,
    term: "Perikatan Generik",
    category: "perikatan",
    definition: "Perikatan untuk menyerahkan barang yang ditentukan jenisnya",
    example: "Menyerahkan 100 kg beras",
    legalBasis: "Pasal 1296 KUHPerdata",
    englishTerm: "Generic Obligation",
    relatedTerms: ["Genus Obligation", "General Goods"]
  },
  {
    id: 345,
    term: "Perikatan Spesifik",
    category: "perikatan",
    definition: "Perikatan untuk menyerahkan barang tertentu",
    example: "Menjual rumah di Jl. Sudirman No. 10",
    legalBasis: "Pasal 1296 KUHPerdata",
    englishTerm: "Specific Obligation",
    relatedTerms: ["Species Obligation", "Specific Goods"]
  },
  {
    id: 346,
    term: "Hak Retensi",
    category: "perikatan",
    definition: "Hak menahan barang sampai piutang dilunasi",
    example: "Bengkel menahan mobil sampai biaya reparasi dibayar",
    legalBasis: "Pasal 1159 KUHPerdata",
    englishTerm: "Right of Retention",
    relatedTerms: ["Retentierecht", "Lien"]
  },
  {
    id: 347,
    term: "Actio Pauliana",
    category: "perikatan",
    definition: "Gugatan pembatalan perbuatan hukum debitur yang merugikan kreditur",
    example: "Membatalkan penjualan aset debitur di bawah harga",
    legalBasis: "Pasal 1341 KUHPerdata",
    englishTerm: "Paulian Action",
    relatedTerms: ["Gugatan Pauliana", "Fraudulent Conveyance"]
  },
  {
    id: 348,
    term: "Dwang Som",
    category: "perikatan",
    definition: "Uang paksa yang harus dibayar bila tidak memenuhi putusan",
    example: "Denda harian jika tidak menyerahkan barang",
    legalBasis: "Pasal 606a Rv",
    englishTerm: "Penalty Payment",
    relatedTerms: ["Uang Paksa", "Astreinte"]
  },
  {
    id: 349,
    term: "Recht van Reclame",
    category: "perikatan",
    definition: "Hak penjual untuk menarik kembali barang yang belum dibayar",
    example: "Supplier menarik barang dari pembeli yang pailit",
    legalBasis: "Pasal 1145 KUHPerdata",
    englishTerm: "Right of Reclaim",
    relatedTerms: ["Hak Reklame", "Unpaid Seller's Right"]
  },
  {
    id: 350,
    term: "Zaakwaarneming",
    category: "perikatan",
    definition: "Pengurusan kepentingan orang lain tanpa kuasa",
    example: "Tetangga memperbaiki pagar rumah kosong",
    legalBasis: "Pasal 1354 KUHPerdata",
    englishTerm: "Negotiorum Gestio",
    relatedTerms: ["Pengurusan Kepentingan", "Voluntary Agency"]
  },
  {
    id: 351,
    term: "Onrechtmatige Daad",
    category: "perikatan",
    definition: "Perbuatan melawan hukum yang menimbulkan kerugian",
    example: "Pencemaran nama baik di media sosial",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Tort/Unlawful Act",
    relatedTerms: ["Perbuatan Melawan Hukum", "PMH"]
  },
  {
    id: 352,
    term: "Onverschuldigde Betaling",
    category: "perikatan",
    definition: "Pembayaran yang tidak ada dasarnya",
    example: "Membayar hutang yang sudah lunas",
    legalBasis: "Pasal 1359 KUHPerdata",
    englishTerm: "Undue Payment",
    relatedTerms: ["Pembayaran Tidak Terutang", "Unjust Enrichment"]
  },
  {
    id: 353,
    term: "Risiko",
    category: "perikatan",
    definition: "Kemungkinan kerugian karena peristiwa di luar kesalahan para pihak",
    example: "Risiko kehilangan barang dalam pengiriman",
    legalBasis: "Pasal 1460 KUHPerdata",
    englishTerm: "Risk",
    relatedTerms: ["Resiko", "Risk of Loss"]
  },
  {
    id: 354,
    term: "Eigen Schuld",
    category: "perikatan",
    definition: "Kesalahan sendiri yang menyebabkan kerugian",
    example: "Kecelakaan karena melanggar rambu",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Contributory Negligence",
    relatedTerms: ["Kesalahan Sendiri", "Own Fault"]
  },
  {
    id: 355,
    term: "Benda Bergerak",
    category: "kebendaan",
    definition: "Benda yang dapat dipindahkan atau berpindah sendiri",
    example: "Mobil, perhiasan, hewan ternak",
    legalBasis: "Pasal 509 KUHPerdata",
    englishTerm: "Movable Property",
    relatedTerms: ["Roerende Goederen", "Chattel"]
  },
  {
    id: 356,
    term: "Benda Tidak Bergerak",
    category: "kebendaan",
    definition: "Benda yang tidak dapat dipindahkan",
    example: "Tanah, bangunan, pohon yang masih tertanam",
    legalBasis: "Pasal 506 KUHPerdata",
    englishTerm: "Immovable Property",
    relatedTerms: ["Onroerende Goederen", "Real Estate"]
  },
  {
    id: 357,
    term: "Benda Berwujud",
    category: "kebendaan",
    definition: "Benda yang dapat dilihat dan diraba",
    example: "Rumah, mobil, buku",
    legalBasis: "Pasal 503 KUHPerdata",
    englishTerm: "Tangible Property",
    relatedTerms: ["Lichamelijke Zaken", "Corporeal"]
  },
  {
    id: 358,
    term: "Benda Tidak Berwujud",
    category: "kebendaan",
    definition: "Benda berupa hak yang tidak dapat dilihat",
    example: "Hak cipta, merek, paten",
    legalBasis: "Pasal 503 KUHPerdata",
    englishTerm: "Intangible Property",
    relatedTerms: ["Onlichamelijke Zaken", "Incorporeal"]
  },
  {
    id: 359,
    term: "Benda Habis Pakai",
    category: "kebendaan",
    definition: "Benda yang habis karena dipakai",
    example: "Makanan, bahan bakar, uang",
    legalBasis: "Pasal 505 KUHPerdata",
    englishTerm: "Consumable Goods",
    relatedTerms: ["Verbruikbare Goederen", "Fungible"]
  },
  {
    id: 360,
    term: "Benda Tidak Habis Pakai",
    category: "kebendaan",
    definition: "Benda yang tidak habis walaupun dipakai",
    example: "Rumah, tanah, kendaraan",
    legalBasis: "Pasal 505 KUHPerdata",
    englishTerm: "Non-consumable Goods",
    relatedTerms: ["Niet-verbruikbare Goederen", "Durable"]
  },
  {
    id: 361,
    term: "Hak Kebendaan",
    category: "kebendaan",
    definition: "Hak mutlak atas suatu benda",
    example: "Hak milik, hak guna bangunan",
    legalBasis: "Pasal 528 KUHPerdata",
    englishTerm: "Property Rights",
    relatedTerms: ["Zakelijke Rechten", "Real Rights"]
  },
  {
    id: 363,
    term: "Bezit",
    category: "kebendaan",
    definition: "Kedudukan menguasai suatu benda",
    example: "Menguasai rumah secara fisik",
    legalBasis: "Pasal 529 KUHPerdata",
    englishTerm: "Possession",
    relatedTerms: ["Kedudukan Berkuasa", "Penguasaan"]
  },
  {
    id: 364,
    term: "Bezit te Goeder Trouw",
    category: "kebendaan",
    definition: "Penguasaan dengan itikad baik",
    example: "Membeli barang tanpa tahu barang curian",
    legalBasis: "Pasal 531 KUHPerdata",
    englishTerm: "Good Faith Possession",
    relatedTerms: ["Bezit Jujur", "Bona Fide Possession"]
  },
  {
    id: 365,
    term: "Bezit te Kwader Trouw",
    category: "kebendaan",
    definition: "Penguasaan dengan itikad buruk",
    example: "Menguasai tanah yang diketahui milik orang lain",
    legalBasis: "Pasal 532 KUHPerdata",
    englishTerm: "Bad Faith Possession",
    relatedTerms: ["Bezit Tidak Jujur", "Mala Fide Possession"]
  },
  {
    id: 366,
    term: "Hak Pakai",
    category: "kebendaan",
    definition: "Hak untuk memakai dan memungut hasil benda milik orang lain",
    example: "Hak pakai atas rumah dinas",
    legalBasis: "Pasal 818 KUHPerdata",
    englishTerm: "Right of Use",
    relatedTerms: ["Gebruik", "Usufruct"]
  },
  {
    id: 367,
    term: "Hak Mendiami",
    category: "kebendaan",
    definition: "Hak untuk mendiami rumah milik orang lain",
    example: "Janda mendapat hak mendiami rumah almarhum suami",
    legalBasis: "Pasal 818 KUHPerdata",
    englishTerm: "Right of Habitation",
    relatedTerms: ["Bewoning", "Dwelling Right"]
  },
  {
    id: 368,
    term: "Servituut",
    category: "kebendaan",
    definition: "Beban atas pekarangan untuk kepentingan pekarangan lain",
    example: "Hak jalan melalui tanah tetangga",
    legalBasis: "Pasal 674 KUHPerdata",
    englishTerm: "Servitude",
    relatedTerms: ["Pengabdian Pekarangan", "Easement"]
  },
  {
    id: 369,
    term: "Erfpacht",
    category: "kebendaan",
    definition: "Hak untuk menikmati sepenuhnya tanah milik orang lain",
    example: "Hak guna usaha atas tanah negara",
    legalBasis: "Pasal 720 KUHPerdata",
    englishTerm: "Emphyteusis",
    relatedTerms: ["Hak Guna Usaha", "Long Lease"]
  },
  {
    id: 370,
    term: "Opstal",
    category: "kebendaan",
    definition: "Hak kebendaan untuk memiliki bangunan di atas tanah orang lain",
    example: "Hak memiliki gedung di atas tanah sewa",
    legalBasis: "Pasal 711 KUHPerdata",
    englishTerm: "Building Rights",
    relatedTerms: ["Hak Guna Bangunan", "Superficies"]
  },
  {
    id: 371,
    term: "Eigendom Voorbehouden",
    category: "kebendaan",
    definition: "Penyerahan hak milik dengan syarat",
    example: "Hak milik beralih setelah pembayaran lunas",
    legalBasis: "Pasal 1513 KUHPerdata",
    englishTerm: "Retention of Title",
    relatedTerms: ["Penyerahan Bersyarat", "Conditional Transfer"]
  },
  {
    id: 372,
    term: "Levering",
    category: "kebendaan",
    definition: "Penyerahan untuk mengalihkan hak milik",
    example: "Penyerahan kunci rumah kepada pembeli",
    legalBasis: "Pasal 612 KUHPerdata",
    englishTerm: "Delivery",
    relatedTerms: ["Penyerahan", "Transfer"]
  },
  {
    id: 373,
    term: "Traditio",
    category: "kebendaan",
    definition: "Penyerahan nyata benda bergerak",
    example: "Menyerahkan mobil secara fisik",
    legalBasis: "Pasal 612 KUHPerdata",
    englishTerm: "Physical Delivery",
    relatedTerms: ["Penyerahan Nyata", "Actual Transfer"]
  },
  {
    id: 374,
    term: "Constitutum Possessorium",
    category: "kebendaan",
    definition: "Penyerahan dengan tetap menguasai bendanya",
    example: "Menjual mobil tapi masih menyewa",
    legalBasis: "Yurisprudensi",
    englishTerm: "Constructive Delivery",
    relatedTerms: ["Penyerahan Yuridis", "Legal Transfer"]
  },
  {
    id: 375,
    term: "Traditio Brevi Manu",
    category: "kebendaan",
    definition: "Penyerahan kepada yang sudah menguasai",
    example: "Penyewa membeli barang yang disewa",
    legalBasis: "Yurisprudensi",
    englishTerm: "Short Hand Delivery",
    relatedTerms: ["Penyerahan Singkat", "Brief Transfer"]
  },
  {
    id: 376,
    term: "Acquisitieve Verjaring",
    category: "kebendaan",
    definition: "Memperoleh hak milik karena daluwarsa",
    example: "Menguasai tanah 20 tahun dengan itikad baik",
    legalBasis: "Pasal 1963 KUHPerdata",
    englishTerm: "Acquisitive Prescription",
    relatedTerms: ["Daluwarsa Memperoleh", "Usucaption"]
  },
  {
    id: 377,
    term: "Extinctieve Verjaring",
    category: "kebendaan",
    definition: "Hapusnya hak menuntut karena daluwarsa",
    example: "Tidak dapat menuntut hutang setelah 30 tahun",
    legalBasis: "Pasal 1967 KUHPerdata",
    englishTerm: "Extinctive Prescription",
    relatedTerms: ["Daluwarsa Menggugat", "Limitation"]
  },
  {
    id: 378,
    term: "Natrekking",
    category: "kebendaan",
    definition: "Menjadi satu dengan benda pokok",
    example: "Bangunan menjadi satu dengan tanah",
    legalBasis: "Pasal 600 KUHPerdata",
    englishTerm: "Accession",
    relatedTerms: ["Perlekatan", "Attachment"]
  },
  {
    id: 379,
    term: "Zaakvervanging",
    category: "kebendaan",
    definition: "Penggantian benda dalam jaminan",
    example: "Asuransi mengganti mobil yang hilang",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Substitution",
    relatedTerms: ["Penggantian Benda", "Replacement"]
  },
  {
    id: 380,
    term: "Voorrecht",
    category: "kebendaan",
    definition: "Hak untuk didahulukan dalam pelunasan",
    example: "Upah buruh didahulukan dari kreditur lain",
    legalBasis: "Pasal 1134 KUHPerdata",
    englishTerm: "Privilege",
    relatedTerms: ["Hak Istimewa", "Preference"]
  },
  {
    id: 381,
    term: "Pand",
    category: "kebendaan",
    definition: "Hak jaminan atas benda bergerak",
    example: "Gadai emas di pegadaian",
    legalBasis: "Pasal 1150 KUHPerdata",
    englishTerm: "Pledge",
    relatedTerms: ["Gadai", "Pawn"]
  },
  {
    id: 382,
    term: "Hypotheek",
    category: "kebendaan",
    definition: "Hak jaminan atas benda tidak bergerak",
    example: "Hipotek kapal laut",
    legalBasis: "Pasal 1162 KUHPerdata",
    englishTerm: "Mortgage",
    relatedTerms: ["Hipotek", "Hypothec"]
  },
  {
    id: 383,
    term: "Fidusia",
    category: "kebendaan",
    definition: "Pengalihan hak milik atas dasar kepercayaan untuk jaminan",
    example: "Fidusia kendaraan bermotor",
    legalBasis: "UU No. 42/1999",
    englishTerm: "Fiduciary Security",
    relatedTerms: ["Jaminan Fidusia", "Trust Security"]
  },
  {
    id: 384,
    term: "Hak Tanggungan",
    category: "kebendaan",
    definition: "Hak jaminan atas tanah",
    example: "Hak tanggungan untuk kredit bank",
    legalBasis: "UU No. 4/1996",
    englishTerm: "Land Security Right",
    relatedTerms: ["Mortgage", "Land Charge"]
  },
  {
    id: 385,
    term: "Resi Gudang",
    category: "kebendaan",
    definition: "Dokumen bukti kepemilikan barang yang disimpan di gudang",
    example: "Resi gudang komoditas pertanian",
    legalBasis: "UU No. 9/2006",
    englishTerm: "Warehouse Receipt",
    relatedTerms: ["Tanda Gudang", "Storage Receipt"]
  },
  {
    id: 386,
    term: "Jaminan Kebendaan",
    category: "kebendaan",
    definition: "Jaminan yang memberikan hak kebendaan",
    example: "Gadai, fidusia, hak tanggungan",
    legalBasis: "KUHPerdata",
    englishTerm: "Real Security",
    relatedTerms: ["Zakelijke Zekerheid", "Property Security"]
  },
  {
    id: 387,
    term: "Jaminan Perorangan",
    category: "kebendaan",
    definition: "Jaminan berupa kesanggupan pihak ketiga",
    example: "Personal guarantee direktur",
    legalBasis: "Pasal 1820 KUHPerdata",
    englishTerm: "Personal Guarantee",
    relatedTerms: ["Borgtocht", "Surety"]
  },
  {
    id: 388,
    term: "Hak Sewa",
    category: "kebendaan",
    definition: "Hak untuk memakai benda milik orang lain dengan membayar",
    example: "Hak sewa ruko selama 5 tahun",
    legalBasis: "Pasal 1548 KUHPerdata",
    englishTerm: "Lease Right",
    relatedTerms: ["Huur", "Tenancy"]
  },
  {
    id: 389,
    term: "Hak Membeli Kembali",
    category: "kebendaan",
    definition: "Hak penjual untuk membeli kembali barang yang dijual",
    example: "Jual beli dengan hak beli kembali dalam 2 tahun",
    legalBasis: "Pasal 1519 KUHPerdata",
    englishTerm: "Right of Repurchase",
    relatedTerms: ["Wederinkoop", "Buy-back Right"]
  },
  {
    id: 390,
    term: "Beslag",
    category: "kebendaan",
    definition: "Penyitaan untuk menjamin pelaksanaan putusan",
    example: "Sita jaminan atas rumah debitur",
    legalBasis: "Pasal 227 HIR",
    englishTerm: "Attachment",
    relatedTerms: ["Sita", "Seizure"]
  },
  {
    id: 391,
    term: "Conservatoir Beslag",
    category: "kebendaan",
    definition: "Sita jaminan untuk mengamankan harta",
    example: "Sita jaminan sebelum putusan",
    legalBasis: "Pasal 227 HIR",
    englishTerm: "Conservatory Attachment",
    relatedTerms: ["Sita Jaminan", "Provisional Seizure"]
  },
  {
    id: 392,
    term: "Executoir Beslag",
    category: "kebendaan",
    definition: "Sita eksekusi untuk melaksanakan putusan",
    example: "Sita eksekusi setelah putusan berkekuatan tetap",
    legalBasis: "Pasal 195 HIR",
    englishTerm: "Executory Attachment",
    relatedTerms: ["Sita Eksekusi", "Execution"]
  },
  {
    id: 393,
    term: "Revindicatie",
    category: "kebendaan",
    definition: "Gugatan untuk menuntut kembali hak milik",
    example: "Pemilik menuntut barangnya dari pihak ketiga",
    legalBasis: "Pasal 574 KUHPerdata",
    englishTerm: "Revendication",
    relatedTerms: ["Gugatan Revindicatie", "Recovery Action"]
  },
  {
    id: 394,
    term: "Publisitas",
    category: "kebendaan",
    definition: "Asas keterbukaan dalam hak kebendaan",
    example: "Pendaftaran hak tanggungan di kantor pertanahan",
    legalBasis: "Asas Hukum",
    englishTerm: "Publicity",
    relatedTerms: ["Asas Publisitas", "Openness"]
  },
  {
    id: 395,
    term: "Droit de Suite",
    category: "kebendaan",
    definition: "Hak mengikuti benda di tangan siapapun",
    example: "Hak tanggungan tetap melekat walau tanah dijual",
    legalBasis: "Asas Hukum Kebendaan",
    englishTerm: "Right to Follow",
    relatedTerms: ["Zaaksgevolg", "Following Right"]
  },
  {
    id: 396,
    term: "Droit de Preference",
    category: "kebendaan",
    definition: "Hak untuk didahulukan",
    example: "Pemegang hak tanggungan didahulukan",
    legalBasis: "Pasal 1133 KUHPerdata",
    englishTerm: "Right of Preference",
    relatedTerms: ["Hak Mendahului", "Priority Right"]
  },
  {
    id: 397,
    term: "Abandonnement",
    category: "kebendaan",
    definition: "Pelepasan hak milik",
    example: "Pemilik melepaskan hak atas tanah terlantar",
    legalBasis: "Pasal 584 KUHPerdata",
    englishTerm: "Abandonment",
    relatedTerms: ["Pelepasan Hak", "Dereliction"]
  },
  {
    id: 398,
    term: "Occupatie",
    category: "kebendaan",
    definition: "Penguasaan benda yang tidak ada pemiliknya",
    example: "Mengambil ikan di laut bebas",
    legalBasis: "Pasal 584 KUHPerdata",
    englishTerm: "Occupation",
    relatedTerms: ["Pendudukan", "Appropriation"]
  },
  {
    id: 399,
    term: "Specificatie",
    category: "kebendaan",
    definition: "Pembentukan benda baru dari bahan milik orang lain",
    example: "Membuat meja dari kayu orang lain",
    legalBasis: "Pasal 606 KUHPerdata",
    englishTerm: "Specification",
    relatedTerms: ["Pembentukan Benda", "Creation"]
  },
  {
    id: 400,
    term: "Vermenging",
    category: "kebendaan",
    definition: "Percampuran benda yang tidak dapat dipisahkan",
    example: "Percampuran beras dari beberapa pemilik",
    legalBasis: "Pasal 607 KUHPerdata",
    englishTerm: "Commingling",
    relatedTerms: ["Percampuran", "Mixing"]
  },
  {
    id: 401,
    term: "Kepailitan",
    category: "kepailitan",
    definition: "Keadaan debitur yang berhenti membayar utang-utangnya",
    example: "Perusahaan dinyatakan pailit oleh pengadilan",
    legalBasis: "UU No. 37/2004",
    englishTerm: "Bankruptcy",
    relatedTerms: ["Pailit", "Insolvensi"]
  },
  {
    id: 402,
    term: "PKPU",
    category: "kepailitan",
    definition: "Penundaan Kewajiban Pembayaran Utang",
    example: "Perusahaan mengajukan PKPU untuk restrukturisasi",
    legalBasis: "UU No. 37/2004",
    englishTerm: "Suspension of Payment",
    relatedTerms: ["Moratorium", "Stay of Payment"]
  },
  {
    id: 403,
    term: "Kurator",
    category: "kepailitan",
    definition: "Orang yang mengurus harta pailit",
    example: "Kurator menjual aset debitur pailit",
    legalBasis: "Pasal 1 angka 5 UU No. 37/2004",
    englishTerm: "Curator/Trustee",
    relatedTerms: ["Pengurus", "Bankruptcy Trustee"]
  },
  {
    id: 404,
    term: "Pengurus PKPU",
    category: "kepailitan",
    definition: "Orang yang mengurus harta debitur selama PKPU",
    example: "Pengurus membantu restrukturisasi utang",
    legalBasis: "Pasal 225 UU No. 37/2004",
    englishTerm: "Administrator",
    relatedTerms: ["Administrator", "PKPU Manager"]
  },
  {
    id: 405,
    term: "Hakim Pengawas",
    category: "kepailitan",
    definition: "Hakim yang mengawasi pengurusan kepailitan",
    example: "Hakim pengawas memberi izin penjualan aset",
    legalBasis: "Pasal 15 UU No. 37/2004",
    englishTerm: "Supervisory Judge",
    relatedTerms: ["Rechter Commissaris", "Supervising Judge"]
  },
  {
    id: 406,
    term: "Boedel Pailit",
    category: "kepailitan",
    definition: "Harta kekayaan debitur pailit",
    example: "Seluruh aset masuk dalam boedel pailit",
    legalBasis: "Pasal 21 UU No. 37/2004",
    englishTerm: "Bankruptcy Estate",
    relatedTerms: ["Harta Pailit", "Estate"]
  },
  {
    id: 407,
    term: "Actio Pauliana Kepailitan",
    category: "kepailitan",
    definition: "Pembatalan perbuatan hukum debitur yang merugikan kreditur",
    example: "Membatalkan penjualan aset sebelum pailit",
    legalBasis: "Pasal 41 UU No. 37/2004",
    englishTerm: "Fraudulent Conveyance",
    relatedTerms: ["Pauliana", "Claw-back"]
  },
  {
    id: 408,
    term: "Renvoi",
    category: "kepailitan",
    definition: "Pemeriksaan lebih lanjut untuk membuktikan kepailitan",
    example: "Hakim memerintahkan renvoi untuk cek utang",
    legalBasis: "Pasal 8 UU No. 37/2004",
    englishTerm: "Further Examination",
    relatedTerms: ["Pemeriksaan Lanjutan", "Verification"]
  },
  {
    id: 409,
    term: "Homologasi",
    category: "kepailitan",
    definition: "Pengesahan perdamaian dalam kepailitan",
    example: "Pengadilan mengesahkan proposal perdamaian",
    legalBasis: "Pasal 158 UU No. 37/2004",
    englishTerm: "Homologation",
    relatedTerms: ["Pengesahan Perdamaian", "Court Approval"]
  },
  {
    id: 410,
    term: "Novum Kepailitan",
    category: "kepailitan",
    definition: "Alat bukti baru dalam kepailitan",
    example: "Bukti pembayaran yang baru ditemukan",
    legalBasis: "Pasal 13 UU No. 37/2004",
    englishTerm: "New Evidence",
    relatedTerms: ["Bukti Baru", "Fresh Evidence"]
  },
  {
    id: 411,
    term: "Kreditur Separatis",
    category: "kepailitan",
    definition: "Kreditur yang memegang hak jaminan kebendaan",
    example: "Bank pemegang hak tanggungan",
    legalBasis: "Pasal 55 UU No. 37/2004",
    englishTerm: "Secured Creditor",
    relatedTerms: ["Kreditur Terjamin", "Secured Lender"]
  },
  {
    id: 412,
    term: "Kreditur Preferen",
    category: "kepailitan",
    definition: "Kreditur yang memiliki hak istimewa",
    example: "Negara untuk pajak terutang",
    legalBasis: "Pasal 1134 KUHPerdata",
    englishTerm: "Preferred Creditor",
    relatedTerms: ["Kreditur Istimewa", "Priority Creditor"]
  },
  {
    id: 413,
    term: "Kreditur Konkuren",
    category: "kepailitan",
    definition: "Kreditur yang tidak memiliki jaminan atau hak istimewa",
    example: "Supplier tanpa jaminan",
    legalBasis: "Pasal 1131 KUHPerdata",
    englishTerm: "Unsecured Creditor",
    relatedTerms: ["Kreditur Biasa", "General Creditor"]
  },
  {
    id: 414,
    term: "Stay Order",
    category: "kepailitan",
    definition: "Penangguhan eksekusi jaminan selama kepailitan",
    example: "Bank tidak boleh eksekusi selama 90 hari",
    legalBasis: "Pasal 56 UU No. 37/2004",
    englishTerm: "Stay Order",
    relatedTerms: ["Penangguhan Eksekusi", "Moratorium"]
  },
  {
    id: 415,
    term: "Insolvensi",
    category: "kepailitan",
    definition: "Keadaan tidak mampu membayar utang",
    example: "Utang melebihi aset perusahaan",
    legalBasis: "Pasal 57 UU No. 37/2004",
    englishTerm: "Insolvency",
    relatedTerms: ["Ketidakmampuan Bayar", "Unable to Pay"]
  },
  {
    id: 416,
    term: "Rehabilitasi",
    category: "kepailitan",
    definition: "Pemulihan nama baik debitur setelah kepailitan berakhir",
    example: "Debitur yang telah menyelesaikan kewajibannya mendapat rehabilitasi",
    legalBasis: "Pasal 215 UU No. 37/2004",
    englishTerm: "Rehabilitation",
    relatedTerms: ["Pemulihan Nama Baik", "Kepailitan"]
  },
  {
    id: 417,
    term: "Rekapitulasi Utang",
    category: "kepailitan",
    definition: "Daftar rinci seluruh utang debitur dalam kepailitan",
    example: "Kurator menyusun rekapitulasi utang untuk rapat kreditor",
    legalBasis: "UU No. 37/2004",
    englishTerm: "Debt Recapitulation",
    relatedTerms: ["Daftar Utang", "Verifikasi"]
  },
  {
    id: 418,
    term: "Reklame",
    category: "benda",
    definition: "Hak untuk menuntut kembali barang milik dari pihak yang menguasai tanpa hak",
    example: "Pemilik melakukan reklame atas mobilnya yang dicuri",
    legalBasis: "Pasal 1977 KUHPerdata",
    englishTerm: "Reclamation",
    relatedTerms: ["Revindicatie", "Tuntutan Balik"]
  },
  {
    id: 419,
    term: "Rekonsiliasi",
    category: "keluarga",
    definition: "Rujuk atau perdamaian kembali antara suami istri",
    example: "Pasangan membatalkan gugatan cerai karena rekonsiliasi",
    legalBasis: "UU Perkawinan",
    englishTerm: "Reconciliation",
    relatedTerms: ["Rujuk", "Perdamaian"]
  },
  {
    id: 420,
    term: "Relaas",
    category: "acara-perdata",
    definition: "Berita acara pemberitahuan atau pemanggilan sidang",
    example: "Juru sita membuat relaas pemanggilan kepada tergugat",
    legalBasis: "HIR/RBg",
    englishTerm: "Court Notice",
    relatedTerms: ["Berita Acara", "Panggilan Sidang"]
  },
  {
    id: 421,
    term: "Remisi",
    category: "perikatan",
    definition: "Pembebasan hutang oleh kreditor kepada debitor",
    example: "Bank memberikan remisi untuk hutang UMKM terdampak bencana",
    legalBasis: "Pasal 1438 KUHPerdata",
    englishTerm: "Remission",
    relatedTerms: ["Pembebasan Hutang", "Kwijtschelding"]
  },
  {
    id: 422,
    term: "Renvooi",
    category: "waris",
    definition: "Penunjukan kembali pada hukum negara asal dalam hukum perdata internasional",
    example: "Kasus waris WNA di Indonesia menggunakan prinsip renvooi",
    legalBasis: "Hukum Perdata Internasional",
    englishTerm: "Renvoi",
    relatedTerms: ["Penunjukan Balik", "HPI"]
  },
  {
    id: 423,
    term: "Rente",
    category: "perikatan",
    definition: "Bunga yang harus dibayar atas pinjaman uang",
    example: "Rente 12% per tahun untuk pinjaman usaha",
    legalBasis: "Pasal 1765 KUHPerdata",
    englishTerm: "Interest",
    relatedTerms: ["Bunga", "Interest Rate"]
  },
  {
    id: 424,
    term: "Renvoi",
    category: "acara-perdata",
    definition: "Pengembalian perkara ke pengadilan yang lebih rendah",
    example: "MA me-renvoi perkara ke Pengadilan Tinggi untuk pemeriksaan ulang",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Remand",
    relatedTerms: ["Pengembalian Perkara", "Remand"]
  },
  {
    id: 425,
    term: "Replik",
    category: "acara-perdata",
    definition: "Tanggapan penggugat atas jawaban tergugat",
    example: "Penggugat menyampaikan replik untuk membantah eksepsi tergugat",
    legalBasis: "HIR/RBg",
    englishTerm: "Reply",
    relatedTerms: ["Tanggapan", "Rejoinder"]
  },
  {
    id: 426,
    term: "Repudiasi",
    category: "waris",
    definition: "Penolakan untuk menerima warisan",
    example: "Ahli waris menolak warisan karena lebih banyak hutang",
    legalBasis: "Pasal 1057 KUHPerdata",
    englishTerm: "Repudiation",
    relatedTerms: ["Penolakan Warisan", "Verwerping"]
  },
  {
    id: 428,
    term: "Res Judicata",
    category: "acara-perdata",
    definition: "Putusan yang telah berkekuatan hukum tetap",
    example: "Gugatan ditolak karena telah ada res judicata",
    legalBasis: "Pasal 1917 KUHPerdata",
    englishTerm: "Res Judicata",
    relatedTerms: ["Kekuatan Hukum Tetap", "Gezag van Gewijsde"]
  },
  {
    id: 429,
    term: "Res Nullius",
    category: "benda",
    definition: "Benda yang tidak ada pemiliknya",
    example: "Ikan di laut bebas adalah res nullius",
    legalBasis: "Doktrin Hukum Perdata",
    englishTerm: "Ownerless Property",
    relatedTerms: ["Benda Tak Bertuan", "Barang Kosong"]
  },
  {
    id: 430,
    term: "Rescission",
    category: "kontrak",
    definition: "Pembatalan kontrak karena cacat kehendak atau wanprestasi",
    example: "Pembeli meminta rescission karena barang cacat tersembunyi",
    legalBasis: "Pasal 1449 KUHPerdata",
    englishTerm: "Rescission",
    relatedTerms: ["Pembatalan", "Ontbinding"]
  },
  {
    id: 431,
    term: "Residual Clause",
    category: "kontrak",
    definition: "Klausula yang mengatur hal-hal yang tidak diatur secara khusus",
    example: "Residual clause mengatur sisa pembagian keuntungan",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Residual Clause",
    relatedTerms: ["Klausula Sisa", "Catch-all Clause"]
  },
  {
    id: 432,
    term: "Restitusi In Integrum",
    category: "perikatan",
    definition: "Pengembalian pada keadaan semula",
    example: "Hakim memerintahkan restitusi in integrum dalam pembatalan kontrak",
    legalBasis: "Asas Hukum Perdata",
    englishTerm: "Restitution in Full",
    relatedTerms: ["Pemulihan Keadaan", "Pengembalian Penuh"]
  },
  {
    id: 433,
    term: "Retensi",
    category: "benda",
    definition: "Hak untuk menahan barang milik orang lain sampai piutang dilunasi",
    example: "Bengkel melakukan retensi mobil sampai biaya reparasi dibayar",
    legalBasis: "Pasal 1812 KUHPerdata",
    englishTerm: "Right of Retention",
    relatedTerms: ["Hak Retensi", "Retentierecht"]
  },
  {
    id: 434,
    term: "Retroaktif",
    category: "asas-perdata",
    definition: "Berlaku surut ke belakang",
    example: "Putusan perceraian berlaku retroaktif sejak gugatan didaftarkan",
    legalBasis: "Asas Hukum",
    englishTerm: "Retroactive",
    relatedTerms: ["Berlaku Surut", "Terugwerkende Kracht"],
    trending: true
  },
  {
    id: 435,
    term: "Revalidasi",
    category: "kontrak",
    definition: "Pengesahan kembali perjanjian yang cacat",
    example: "Revalidasi kontrak setelah mendapat persetujuan istri",
    legalBasis: "KUHPerdata",
    englishTerm: "Revalidation",
    relatedTerms: ["Pengesahan Ulang", "Validasi"]
  },
  {
    id: 436,
    term: "Revendicatie",
    category: "benda",
    definition: "Gugatan pemilik untuk menuntut kembali barangnya",
    example: "Pemilik tanah melakukan revendicatie terhadap penyerobot",
    legalBasis: "Pasal 574 KUHPerdata",
    englishTerm: "Revendication",
    relatedTerms: ["Gugat Balik", "Tuntutan Milik"]
  },
  {
    id: 437,
    term: "Revindicatie",
    category: "benda",
    definition: "Hak pemilik untuk menuntut kembali bendanya dari siapapun yang menguasai",
    example: "Pemilik mobil curian dapat melakukan revindicatie",
    legalBasis: "Pasal 584 KUHPerdata",
    englishTerm: "Revendication",
    relatedTerms: ["Tuntutan Balik", "Hak Milik"]
  },
  {
    id: 438,
    term: "Revolving",
    category: "perikatan",
    definition: "Fasilitas kredit yang dapat digunakan berulang",
    example: "Kredit revolving untuk modal kerja perusahaan",
    legalBasis: "Perjanjian Kredit",
    englishTerm: "Revolving Credit",
    relatedTerms: ["Kredit Bergulir", "Fasilitas Berulang"]
  },
  {
    id: 439,
    term: "Riba",
    category: "perikatan",
    definition: "Bunga yang berlebihan atau bunga berganda",
    example: "Pinjaman dengan bunga 10% per bulan dianggap riba",
    legalBasis: "Pasal 1767 KUHPerdata",
    englishTerm: "Usury",
    relatedTerms: ["Lintah Darat", "Bunga Berlebihan"]
  },
  {
    id: 440,
    term: "Rider",
    category: "kontrak",
    definition: "Tambahan atau lampiran pada perjanjian pokok",
    example: "Rider asuransi untuk perlindungan penyakit kritis",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Rider",
    relatedTerms: ["Tambahan", "Addendum"]
  },
  {
    id: 441,
    term: "Right of First Refusal",
    category: "kontrak",
    definition: "Hak untuk membeli terlebih dahulu sebelum ditawarkan ke pihak lain",
    example: "Pemegang saham lama memiliki right of first refusal",
    legalBasis: "Perjanjian Para Pihak",
    englishTerm: "Right of First Refusal",
    relatedTerms: ["Hak Menawar Pertama", "ROFR"]
  },
  {
    id: 442,
    term: "Risalah Lelang",
    category: "benda",
    definition: "Berita acara pelaksanaan lelang yang dibuat pejabat lelang",
    example: "Risalah lelang sebagai akta otentik pemindahan hak",
    legalBasis: "Peraturan Lelang",
    englishTerm: "Auction Minutes",
    relatedTerms: ["Berita Acara Lelang", "Minuta Lelang"]
  },
  {
    id: 443,
    term: "Risk Sharing",
    category: "kontrak",
    definition: "Pembagian risiko antara para pihak dalam kontrak",
    example: "Risk sharing 60:40 dalam joint venture",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Risk Sharing",
    relatedTerms: ["Bagi Risiko", "Pembagian Risiko"]
  },
  {
    id: 444,
    term: "Roya",
    category: "benda",
    definition: "Pencoretan pembebanan hak tanggungan atau hipotik",
    example: "Roya hak tanggungan setelah kredit lunas",
    legalBasis: "UU No. 4/1996",
    englishTerm: "Discharge",
    relatedTerms: ["Pencoretan", "Pembebasan"]
  },
  {
    id: 445,
    term: "Rujuk",
    category: "keluarga",
    definition: "Kembalinya suami kepada istri dalam masa iddah",
    example: "Suami merujuk istri sebelum masa iddah berakhir",
    legalBasis: "UU Perkawinan, KHI",
    englishTerm: "Reconciliation",
    relatedTerms: ["Rekonsiliasi", "Ruju'"]
  },
  {
    id: 446,
    term: "Rukun Kontrak",
    category: "kontrak",
    definition: "Unsur-unsur yang harus ada agar kontrak sah",
    example: "Kesepakatan, kecakapan, hal tertentu, dan causa halal",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Contract Elements",
    relatedTerms: ["Syarat Sah", "Unsur Perjanjian"]
  },
  {
    id: 447,
    term: "Rumah Susun",
    category: "benda",
    definition: "Bangunan bertingkat yang terbagi atas bagian-bagian dengan hak milik terpisah",
    example: "Apartemen adalah bentuk rumah susun",
    legalBasis: "UU No. 20/2011",
    englishTerm: "Condominium",
    relatedTerms: ["Apartemen", "Strata Title"]
  },
  {
    id: 448,
    term: "Saisie Conservatoir",
    category: "acara-perdata",
    definition: "Sita jaminan untuk menjamin pelaksanaan putusan",
    example: "Sita jaminan atas rekening bank tergugat",
    legalBasis: "Pasal 227 HIR",
    englishTerm: "Conservatory Attachment",
    relatedTerms: ["Sita Jaminan", "CB"]
  },
  {
    id: 449,
    term: "Saisie Executorial",
    category: "acara-perdata",
    definition: "Sita eksekusi untuk melaksanakan putusan pengadilan",
    example: "Sita eksekusi rumah untuk membayar hutang",
    legalBasis: "Pasal 197 HIR",
    englishTerm: "Executory Attachment",
    relatedTerms: ["Sita Eksekusi", "Uitvoerend Beslag"]
  },
  {
    id: 450,
    term: "Saisie Marital",
    category: "keluarga",
    definition: "Sita atas harta bersama dalam perkara perceraian",
    example: "Istri meminta sita marital atas rumah bersama",
    legalBasis: "UU Perkawinan",
    englishTerm: "Marital Attachment",
    relatedTerms: ["Sita Harta Bersama", "Pembekuan Aset"]
  },
  {
    id: 451,
    term: "Saisie Revindicatoir",
    category: "benda",
    definition: "Sita untuk mendapatkan kembali barang milik",
    example: "Pemilik meminta sita atas barangnya yang dikuasai orang lain",
    legalBasis: "HIR/RBg",
    englishTerm: "Revindicatory Attachment",
    relatedTerms: ["Sita Pemilikan", "Revindicatie Beslag"]
  },
  {
    id: 452,
    term: "Saksi Instrumentair",
    category: "acara-perdata",
    definition: "Saksi yang hadir saat pembuatan akta",
    example: "Dua saksi instrumentair dalam pembuatan akta notaris",
    legalBasis: "UU Jabatan Notaris",
    englishTerm: "Instrumental Witness",
    relatedTerms: ["Saksi Akta", "Getuige"]
  },
  {
    id: 453,
    term: "Salah Sangka",
    category: "kontrak",
    definition: "Kekeliruan mengenai hal pokok yang menyebabkan kontrak dapat dibatalkan",
    example: "Membeli reproduksi lukisan yang disangka asli",
    legalBasis: "Pasal 1322 KUHPerdata",
    englishTerm: "Mistake",
    relatedTerms: ["Dwaling", "Kekeliruan"]
  },
  {
    id: 454,
    term: "Saham Prioritas",
    category: "perseroan",
    definition: "Saham dengan hak-hak istimewa dibanding saham biasa",
    example: "Saham preferen dengan dividen tetap 8% per tahun",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Preferred Stock",
    relatedTerms: ["Saham Preferen", "Priority Shares"]
  },
  {
    id: 455,
    term: "Saksi De Auditu",
    category: "acara-perdata",
    definition: "Saksi yang mengetahui dari orang lain, bukan pengalaman sendiri",
    example: "Saksi yang mendengar dari tetangga tentang kejadian",
    legalBasis: "HIR/RBg",
    englishTerm: "Hearsay Witness",
    relatedTerms: ["Testimonium de Auditu", "Saksi Tidak Langsung"]
  },
  {
    id: 456,
    term: "Salvage",
    category: "perikatan",
    definition: "Upah untuk pertolongan kapal atau muatan dalam bahaya",
    example: "Klaim salvage untuk menyelamatkan kapal kandas",
    legalBasis: "KUHD",
    englishTerm: "Salvage",
    relatedTerms: ["Pertolongan Laut", "Berging"]
  },
  {
    id: 457,
    term: "Saneering",
    category: "kepailitan",
    definition: "Penyehatan keuangan perusahaan yang mengalami kesulitan",
    example: "Restrukturisasi hutang sebagai bagian saneering",
    legalBasis: "UU Kepailitan",
    englishTerm: "Financial Restructuring",
    relatedTerms: ["Penyehatan", "Restrukturisasi"]
  },
  {
    id: 458,
    term: "Sanksi Perdata",
    category: "perikatan",
    definition: "Akibat hukum perdata atas pelanggaran kewajiban",
    example: "Ganti rugi sebagai sanksi wanprestasi",
    legalBasis: "KUHPerdata",
    englishTerm: "Civil Sanction",
    relatedTerms: ["Hukuman Perdata", "Civil Penalty"]
  },
  {
    id: 459,
    term: "Satu Atap",
    category: "perseroan",
    definition: "Pelayanan terpadu untuk pendirian perseroan",
    example: "Pengurusan PT melalui sistem OSS",
    legalBasis: "PP tentang OSS",
    englishTerm: "One Stop Service",
    relatedTerms: ["OSS", "Pelayanan Terpadu"]
  },
  {
    id: 460,
    term: "Schorsing",
    category: "acara-perdata",
    definition: "Penundaan atau penangguhan pelaksanaan putusan",
    example: "Schorsing eksekusi karena ada perlawanan",
    legalBasis: "HIR/RBg",
    englishTerm: "Suspension",
    relatedTerms: ["Penundaan", "Penangguhan"]
  },
  {
    id: 461,
    term: "Segel",
    category: "acara-perdata",
    definition: "Tanda pengamanan yang dipasang pengadilan",
    example: "Penyegelan aset dalam sita jaminan",
    legalBasis: "HIR/RBg",
    englishTerm: "Seal",
    relatedTerms: ["Penyegelan", "Verzegeling"]
  },
  {
    id: 462,
    term: "Segregasi Aset",
    category: "kepailitan",
    definition: "Pemisahan aset debitur dari aset pihak lain",
    example: "Segregasi aset nasabah dari aset bank",
    legalBasis: "UU Kepailitan",
    englishTerm: "Asset Segregation",
    relatedTerms: ["Pemisahan Aset", "Asset Separation"]
  },
  {
    id: 463,
    term: "Sengketa Konsumen",
    category: "konsumen",
    definition: "Perselisihan antara pelaku usaha dengan konsumen",
    example: "Sengketa karena produk cacat ke BPSK",
    legalBasis: "UU No. 8/1999",
    englishTerm: "Consumer Dispute",
    relatedTerms: ["BPSK", "Perlindungan Konsumen"]
  },
  {
    id: 464,
    term: "Sengketa Waris",
    category: "waris",
    definition: "Perselisihan mengenai pembagian harta warisan",
    example: "Gugatan pembagian waris antara ahli waris",
    legalBasis: "KUHPerdata Buku II",
    englishTerm: "Inheritance Dispute",
    relatedTerms: ["Perselisihan Waris", "Warisan"]
  },
  {
    id: 465,
    term: "Separatis",
    category: "kepailitan",
    definition: "Kreditor pemegang jaminan kebendaan",
    example: "Bank sebagai kreditor separatis pemegang hak tanggungan",
    legalBasis: "UU No. 37/2004",
    englishTerm: "Secured Creditor",
    relatedTerms: ["Kreditor Istimewa", "Secured"]
  },
  {
    id: 466,
    term: "Seponering Perdata",
    category: "acara-perdata",
    definition: "Penghentian perkara perdata karena alasan tertentu",
    example: "Seponering karena penggugat mencabut gugatan",
    legalBasis: "HIR/RBg",
    englishTerm: "Case Dismissal",
    relatedTerms: ["Penghentian Perkara", "Pencabutan"]
  },
  {
    id: 467,
    term: "Sertifikat Elektronik",
    category: "kontrak",
    definition: "Sertifikat yang bersifat elektronik untuk tanda tangan digital",
    example: "Sertifikat elektronik untuk kontrak online",
    legalBasis: "UU ITE",
    englishTerm: "Electronic Certificate",
    relatedTerms: ["Digital Certificate", "E-Certificate"]
  },
  {
    id: 468,
    term: "Sertifikat Fidusia",
    category: "benda",
    definition: "Bukti pendaftaran jaminan fidusia",
    example: "Sertifikat fidusia atas kendaraan bermotor",
    legalBasis: "UU No. 42/1999",
    englishTerm: "Fiduciary Certificate",
    relatedTerms: ["Bukti Fidusia", "Jaminan Fidusia"]
  },
  {
    id: 469,
    term: "Sertifikat Hak Tanggungan",
    category: "benda",
    definition: "Tanda bukti adanya hak tanggungan",
    example: "SHT sebagai jaminan kredit bank",
    legalBasis: "UU No. 4/1996",
    englishTerm: "Mortgage Certificate",
    relatedTerms: ["SHT", "Bukti Hak Tanggungan"]
  },
  {
    id: 470,
    term: "Servitude",
    category: "benda",
    definition: "Beban atas tanah untuk kepentingan tanah lain",
    example: "Hak lewat melalui tanah tetangga",
    legalBasis: "Pasal 674 KUHPerdata",
    englishTerm: "Servitude",
    relatedTerms: ["Pengabdian Pekarangan", "Erfdienstbaarheid"]
  },
  {
    id: 471,
    term: "Set Off",
    category: "perikatan",
    definition: "Perjumpaan hutang atau kompensasi",
    example: "Set off piutang dan hutang antara dua pihak",
    legalBasis: "Pasal 1425 KUHPerdata",
    englishTerm: "Set Off",
    relatedTerms: ["Kompensasi", "Perjumpaan"]
  },
  {
    id: 472,
    term: "Sharing Economy",
    category: "kontrak",
    definition: "Model ekonomi berbagi sumber daya",
    example: "Platform ride sharing atau home sharing",
    legalBasis: "Perkembangan Hukum",
    englishTerm: "Sharing Economy",
    relatedTerms: ["Ekonomi Berbagi", "Gig Economy"],
    trending: true
  },
  {
    id: 473,
    term: "Shell Company",
    category: "perseroan",
    definition: "Perusahaan yang hanya ada di atas kertas tanpa operasi nyata",
    example: "Shell company untuk tujuan penghindaran pajak",
    legalBasis: "UU PT",
    englishTerm: "Shell Company",
    relatedTerms: ["Perusahaan Cangkang", "Paper Company"]
  },
  {
    id: 474,
    term: "Shio",
    category: "keluarga",
    definition: "Perhitungan zodiak Tionghoa yang kadang dipertimbangkan dalam perkawinan adat",
    example: "Pertimbangan kecocokan shio dalam adat Tionghoa",
    legalBasis: "Hukum Adat",
    englishTerm: "Chinese Zodiac",
    relatedTerms: ["Zodiak Cina", "Adat Tionghoa"]
  },
  {
    id: 475,
    term: "Sidang Insidentil",
    category: "acara-perdata",
    definition: "Sidang untuk memeriksa hal-hal di luar pokok perkara",
    example: "Sidang insidentil untuk eksepsi kompetensi",
    legalBasis: "HIR/RBg",
    englishTerm: "Incidental Hearing",
    relatedTerms: ["Sidang Antara", "Interlocutory"]
  },
  {
    id: 476,
    term: "Sighat",
    category: "keluarga",
    definition: "Ijab kabul dalam perkawinan Islam",
    example: "Sighat taklik talak dibacakan setelah akad nikah",
    legalBasis: "KHI",
    englishTerm: "Marriage Vow",
    relatedTerms: ["Ijab Kabul", "Akad Nikah"]
  },
  {
    id: 477,
    term: "Silent Partner",
    category: "perseroan",
    definition: "Mitra/pemegang saham yang tidak aktif dalam pengelolaan",
    example: "Investor pasif sebagai silent partner",
    legalBasis: "UU PT",
    englishTerm: "Silent Partner",
    relatedTerms: ["Sleeping Partner", "Mitra Pasif"]
  },
  {
    id: 478,
    term: "Simplified Procedure",
    category: "acara-perdata",
    definition: "Prosedur sederhana untuk gugatan tertentu",
    example: "Gugatan sederhana maksimal Rp 500 juta",
    legalBasis: "Perma No. 2/2015",
    englishTerm: "Small Claims Court",
    relatedTerms: ["Gugatan Sederhana", "Acara Cepat"]
  },
  {
    id: 479,
    term: "Simultaneous Closing",
    category: "kontrak",
    definition: "Penutupan transaksi yang dilakukan bersamaan",
    example: "Closing pembelian dan pembiayaan properti bersamaan",
    legalBasis: "Praktik Bisnis",
    englishTerm: "Simultaneous Closing",
    relatedTerms: ["Penutupan Serentak", "Closing Bersamaan"]
  },
  {
    id: 480,
    term: "Single Presence Policy",
    category: "perseroan",
    definition: "Kebijakan kepemilikan tunggal bank",
    example: "Satu pemegang saham pengendali hanya boleh memiliki satu bank",
    legalBasis: "Peraturan OJK",
    englishTerm: "Single Presence Policy",
    relatedTerms: ["SPP", "Kepemilikan Tunggal"]
  },
  {
    id: 481,
    term: "Sinkronisasi",
    category: "acara-perdata",
    definition: "Penyelarasan antara berbagai peraturan atau putusan",
    example: "Sinkronisasi putusan dengan peraturan terbaru",
    legalBasis: "Asas Hukum",
    englishTerm: "Synchronization",
    relatedTerms: ["Harmonisasi", "Penyelarasan"]
  },
  {
    id: 482,
    term: "Sipil",
    category: "asas-perdata",
    definition: "Berkaitan dengan hak dan kewajiban perdata warga",
    example: "Perkara sipil berbeda dengan perkara pidana",
    legalBasis: "KUHPerdata",
    englishTerm: "Civil",
    relatedTerms: ["Perdata", "Private Law"]
  },
  {
    id: 483,
    term: "Sistem Nilai Tukar",
    category: "kontrak",
    definition: "Mekanisme penentuan nilai dalam transaksi",
    example: "Kontrak dengan klausul penyesuaian nilai tukar",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Exchange Rate System",
    relatedTerms: ["Kurs", "Nilai Tukar"]
  },
  {
    id: 484,
    term: "Sitaan",
    category: "acara-perdata",
    definition: "Barang yang disita berdasarkan penetapan pengadilan",
    example: "Mobil menjadi barang sitaan dalam sita jaminan",
    legalBasis: "HIR/RBg",
    englishTerm: "Seized Property",
    relatedTerms: ["Barang Sita", "Beslag"]
  },
  {
    id: 485,
    term: "Skip Person",
    category: "waris",
    definition: "Ahli waris yang melewati satu generasi",
    example: "Cucu menerima warisan langsung dari kakek",
    legalBasis: "KUHPerdata",
    englishTerm: "Skip Person",
    relatedTerms: ["Pewaris Lompat", "Generasi Lompat"]
  },
  {
    id: 486,
    term: "Smart Contract",
    category: "kontrak",
    definition: "Kontrak digital yang dieksekusi otomatis",
    example: "Smart contract blockchain untuk jual beli crypto",
    legalBasis: "Perkembangan Hukum",
    englishTerm: "Smart Contract",
    relatedTerms: ["Kontrak Pintar", "Blockchain Contract"],
    trending: true
  },
  {
    id: 487,
    term: "Social Force",
    category: "asas-perdata",
    definition: "Kekuatan sosial yang mempengaruhi berlakunya hukum",
    example: "Tekanan masyarakat untuk penegakan kontrak",
    legalBasis: "Sosiologi Hukum",
    englishTerm: "Social Force",
    relatedTerms: ["Kekuatan Sosial", "Tekanan Masyarakat"]
  },
  {
    id: 488,
    term: "Soft Law",
    category: "asas-perdata",
    definition: "Aturan yang tidak mengikat secara hukum tapi diikuti",
    example: "Code of conduct perusahaan",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Soft Law",
    relatedTerms: ["Hukum Lunak", "Non-binding Rules"]
  },
  {
    id: 489,
    term: "Solemnitas",
    category: "kontrak",
    definition: "Formalitas yang harus dipenuhi untuk sahnya perbuatan hukum",
    example: "Akta notaris untuk jual beli tanah",
    legalBasis: "KUHPerdata",
    englishTerm: "Solemnity",
    relatedTerms: ["Formalitas", "Syarat Bentuk"]
  },
  {
    id: 490,
    term: "Solidaritas",
    category: "perikatan",
    definition: "Tanggung jawab bersama secara tanggung renteng",
    example: "Debitur solidaritas dapat ditagih seluruh hutang",
    legalBasis: "Pasal 1278 KUHPerdata",
    englishTerm: "Joint and Several",
    relatedTerms: ["Tanggung Renteng", "Hoofdelijk"]
  },
  {
    id: 492,
    term: "Somasi",
    category: "perikatan",
    definition: "Teguran atau peringatan kepada debitur yang lalai",
    example: "Somasi I, II, III sebelum gugatan wanprestasi",
    legalBasis: "Pasal 1238 KUHPerdata",
    englishTerm: "Default Notice",
    relatedTerms: ["Teguran", "Ingebrekestelling"]
  },
  {
    id: 493,
    term: "Soulte",
    category: "kontrak",
    definition: "Pembayaran tambahan dalam tukar menukar",
    example: "Tukar guling tanah dengan soulte Rp 100 juta",
    legalBasis: "Pasal 1541 KUHPerdata",
    englishTerm: "Boot",
    relatedTerms: ["Uang Tambahan", "Pembayaran Selisih"]
  },
  {
    id: 494,
    term: "Special Power of Attorney",
    category: "kontrak",
    definition: "Surat kuasa khusus untuk tindakan tertentu",
    example: "SPOA untuk menjual properti",
    legalBasis: "Pasal 1796 KUHPerdata",
    englishTerm: "Special Power of Attorney",
    relatedTerms: ["Kuasa Khusus", "SPOA"]
  },
  {
    id: 495,
    term: "Specific Performance",
    category: "perikatan",
    definition: "Pelaksanaan prestasi secara nyata sesuai perjanjian",
    example: "Hakim memerintahkan penyerahan tanah yang dijanjikan",
    legalBasis: "Asas Hukum Kontrak",
    englishTerm: "Specific Performance",
    relatedTerms: ["Eksekusi Riil", "Pemenuhan Prestasi"]
  },
  {
    id: 496,
    term: "Spekulatif",
    category: "kontrak",
    definition: "Perjanjian untung-untungan",
    example: "Kontrak derivatif yang bersifat spekulatif",
    legalBasis: "Pasal 1774 KUHPerdata",
    englishTerm: "Speculative",
    relatedTerms: ["Untung-untungan", "Kansovereenkomst"]
  },
  {
    id: 497,
    term: "Spin Off",
    category: "perseroan",
    definition: "Pemisahan unit usaha menjadi perusahaan terpisah",
    example: "Spin off divisi teknologi menjadi anak perusahaan",
    legalBasis: "UU PT",
    englishTerm: "Spin Off",
    relatedTerms: ["Pemisahan Usaha", "Pemekaran"]
  },
  {
    id: 498,
    term: "Split",
    category: "perseroan",
    definition: "Pemecahan nilai nominal saham",
    example: "Stock split 1:2 dari Rp 1000 menjadi Rp 500",
    legalBasis: "UU Pasar Modal",
    englishTerm: "Stock Split",
    relatedTerms: ["Pemecahan Saham", "Stock Split"]
  },
  {
    id: 499,
    term: "Spoliation",
    category: "acara-perdata",
    definition: "Perampasan atau pengambilan paksa barang",
    example: "Gugatan spoliation untuk mendapat kembali barang",
    legalBasis: "Yurisprudensi",
    englishTerm: "Spoliation",
    relatedTerms: ["Perampasan", "Pengambilan Paksa"]
  },
  {
    id: 500,
    term: "Sponsor",
    category: "kontrak",
    definition: "Pihak yang memberikan dukungan dana dengan imbalan promosi",
    example: "Sponsorship untuk event dengan hak promosi",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Sponsor",
    relatedTerms: ["Penyandang Dana", "Sponsorship"]
  },
  {
    id: 501,
    term: "Stakeholder",
    category: "perseroan",
    definition: "Pihak yang berkepentingan dengan perusahaan",
    example: "Pemegang saham, karyawan, kreditor sebagai stakeholder",
    legalBasis: "UU PT",
    englishTerm: "Stakeholder",
    relatedTerms: ["Pemangku Kepentingan", "Pihak Terkait"]
  },
  {
    id: 502,
    term: "Stand Still Agreement",
    category: "kepailitan",
    definition: "Perjanjian penundaan tindakan hukum",
    example: "Kreditor sepakat menunda eksekusi selama restrukturisasi",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Stand Still Agreement",
    relatedTerms: ["Moratorium", "Penundaan"]
  },
  {
    id: 503,
    term: "Standing to Sue",
    category: "acara-perdata",
    definition: "Kedudukan hukum untuk mengajukan gugatan",
    example: "Pemegang saham minoritas punya standing untuk derivative suit",
    legalBasis: "HIR/RBg",
    englishTerm: "Standing to Sue",
    relatedTerms: ["Legal Standing", "Kedudukan Hukum"]
  },
  {
    id: 504,
    term: "Stare Decisis",
    category: "asas-perdata",
    definition: "Asas mengikuti putusan terdahulu yang serupa",
    example: "Hakim mengikuti yurisprudensi MA",
    legalBasis: "Asas Hukum",
    englishTerm: "Stare Decisis",
    relatedTerms: ["Preseden", "Yurisprudensi"]
  },
  {
    id: 505,
    term: "Status Quo",
    category: "acara-perdata",
    definition: "Keadaan tetap sebagaimana adanya",
    example: "Penetapan status quo selama proses sita",
    legalBasis: "HIR/RBg",
    englishTerm: "Status Quo",
    relatedTerms: ["Keadaan Semula", "Existing State"]
  },
  {
    id: 506,
    term: "Statute of Limitation",
    category: "perikatan",
    definition: "Batas waktu untuk mengajukan tuntutan",
    example: "Daluwarsa 30 tahun untuk hak milik",
    legalBasis: "Pasal 1967 KUHPerdata",
    englishTerm: "Statute of Limitation",
    relatedTerms: ["Daluwarsa", "Verjaring"]
  },
  {
    id: 507,
    term: "Stay of Execution",
    category: "kepailitan",
    definition: "Penundaan pelaksanaan putusan atau eksekusi",
    example: "Stay of execution selama PKPU",
    legalBasis: "UU Kepailitan",
    englishTerm: "Stay of Execution",
    relatedTerms: ["Penundaan Eksekusi", "Suspension"]
  },
  {
    id: 508,
    term: "Stelsel Negatif",
    category: "benda",
    definition: "Sistem pendaftaran tanah yang tidak menjamin kebenaran data",
    example: "Indonesia menganut stelsel negatif bertendensi positif",
    legalBasis: "PP No. 24/1997",
    englishTerm: "Negative System",
    relatedTerms: ["Sistem Negatif", "Pendaftaran Tanah"]
  },
  {
    id: 509,
    term: "Stelsel Positif",
    category: "benda",
    definition: "Sistem pendaftaran yang menjamin kebenaran data",
    example: "Sistem Torrens di Australia",
    legalBasis: "Perbandingan Hukum",
    englishTerm: "Positive System",
    relatedTerms: ["Sistem Positif", "Torrens System"]
  },
  {
    id: 510,
    term: "Stipulasi",
    category: "kontrak",
    definition: "Janji atau syarat dalam perjanjian",
    example: "Stipulasi untuk kepentingan pihak ketiga",
    legalBasis: "Pasal 1317 KUHPerdata",
    englishTerm: "Stipulation",
    relatedTerms: ["Syarat", "Ketentuan"]
  },
  {
    id: 511,
    term: "Stock Option",
    category: "perseroan",
    definition: "Hak untuk membeli saham pada harga tertentu",
    example: "ESOP untuk karyawan perusahaan",
    legalBasis: "UU PT",
    englishTerm: "Stock Option",
    relatedTerms: ["Opsi Saham", "ESOP"]
  },
  {
    id: 512,
    term: "Strict Liability",
    category: "perikatan",
    definition: "Tanggung jawab mutlak tanpa perlu membuktikan kesalahan",
    example: "Produsen bertanggung jawab atas produk cacat",
    legalBasis: "UU Perlindungan Konsumen",
    englishTerm: "Strict Liability",
    relatedTerms: ["Tanggung Jawab Mutlak", "Absolute Liability"],
    trending: true
  },
  {
    id: 513,
    term: "Striking Out",
    category: "acara-perdata",
    definition: "Pencoretan perkara dari register",
    example: "Striking out karena penggugat tidak hadir berturut-turut",
    legalBasis: "HIR/RBg",
    englishTerm: "Striking Out",
    relatedTerms: ["Pencoretan", "Coret Perkara"]
  },
  {
    id: 514,
    term: "Struktur Modal",
    category: "perseroan",
    definition: "Komposisi pendanaan perusahaan",
    example: "Struktur modal 60% ekuitas, 40% hutang",
    legalBasis: "UU PT",
    englishTerm: "Capital Structure",
    relatedTerms: ["Komposisi Modal", "Financing Mix"]
  },
  {
    id: 515,
    term: "Sub Judice",
    category: "acara-perdata",
    definition: "Masih dalam proses peradilan",
    example: "Kasus masih sub judice, belum boleh dikomentari",
    legalBasis: "Asas Hukum",
    englishTerm: "Sub Judice",
    relatedTerms: ["Dalam Proses", "Under Consideration"]
  },
  {
    id: 516,
    term: "Subkontraktor",
    category: "kontrak",
    definition: "Pihak ketiga yang melaksanakan sebagian pekerjaan kontraktor",
    example: "Subkon untuk pekerjaan MEP dalam proyek konstruksi",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Subcontractor",
    relatedTerms: ["Sub Pemborong", "Pelaksana Kedua"]
  },
  {
    id: 517,
    term: "Subordinasi",
    category: "kepailitan",
    definition: "Perjanjian penundaan pembayaran kreditor tertentu",
    example: "Pemegang saham subordinasi piutangnya",
    legalBasis: "UU Kepailitan",
    englishTerm: "Subordination",
    relatedTerms: ["Penundaan", "Loan Subordination"]
  },
  {
    id: 518,
    term: "Subpoena",
    category: "acara-perdata",
    definition: "Panggilan paksa untuk hadir sebagai saksi",
    example: "Subpoena untuk saksi yang enggan hadir",
    legalBasis: "HIR/RBg",
    englishTerm: "Subpoena",
    relatedTerms: ["Panggilan Paksa", "Dwangbevel"]
  },
  {
    id: 519,
    term: "Subrogasi",
    category: "perikatan",
    definition: "Penggantian kedudukan kreditor oleh pihak ketiga yang membayar",
    example: "Asuransi subrogasi setelah bayar klaim",
    legalBasis: "Pasal 1400 KUHPerdata",
    englishTerm: "Subrogation",
    relatedTerms: ["Penggantian Hak", "Subrogatie"]
  },
  {
    id: 520,
    term: "Subsidiair",
    category: "acara-perdata",
    definition: "Kedudukan pengganti atau cadangan",
    example: "Tuntutan subsidiair jika primair tidak terbukti",
    legalBasis: "HIR/RBg",
    englishTerm: "Subsidiary",
    relatedTerms: ["Pengganti", "Cadangan"]
  },
  {
    id: 521,
    term: "Substantial Performance",
    category: "kontrak",
    definition: "Pelaksanaan kontrak yang hampir sempurna",
    example: "Pembangunan 95% selesai dianggap substantial",
    legalBasis: "Doktrin Common Law",
    englishTerm: "Substantial Performance",
    relatedTerms: ["Pelaksanaan Substansial", "Hampir Sempurna"]
  },
  {
    id: 522,
    term: "Substitusi Fideikomis",
    category: "waris",
    definition: "Penunjukan ahli waris pengganti",
    example: "Jika A meninggal, B menjadi ahli waris pengganti",
    legalBasis: "Pasal 935 KUHPerdata",
    englishTerm: "Fideicommissary Substitution",
    relatedTerms: ["Penggantian Waris", "Erfstelling over de hand"]
  },
  {
    id: 523,
    term: "Succession Planning",
    category: "perseroan",
    definition: "Perencanaan pergantian kepemimpinan perusahaan",
    example: "Menyiapkan calon direktur pengganti",
    legalBasis: "Good Corporate Governance",
    englishTerm: "Succession Planning",
    relatedTerms: ["Rencana Suksesi", "Kaderisasi"]
  },
  {
    id: 524,
    term: "Sufficient Cause",
    category: "keluarga",
    definition: "Alasan yang cukup untuk perceraian",
    example: "Perzinahan sebagai sufficient cause",
    legalBasis: "UU Perkawinan",
    englishTerm: "Sufficient Cause",
    relatedTerms: ["Alasan Cukup", "Alasan Perceraian"]
  },
  {
    id: 525,
    term: "Sui Generis",
    category: "asas-perdata",
    definition: "Bersifat unik atau khas tersendiri",
    example: "HKI bersifat sui generis",
    legalBasis: "Doktrin Hukum",
    englishTerm: "Sui Generis",
    relatedTerms: ["Khas", "Unik"]
  },
  {
    id: 526,
    term: "Suing for Peace",
    category: "acara-perdata",
    definition: "Mengajukan perdamaian dalam perkara",
    example: "Tergugat menawarkan perdamaian saat mediasi",
    legalBasis: "Perma Mediasi",
    englishTerm: "Suing for Peace",
    relatedTerms: ["Mohon Damai", "Settlement Offer"]
  },
  {
    id: 527,
    term: "Suit",
    category: "acara-perdata",
    definition: "Gugatan atau tuntutan perdata",
    example: "Civil suit untuk ganti rugi",
    legalBasis: "HIR/RBg",
    englishTerm: "Lawsuit",
    relatedTerms: ["Gugatan", "Legal Action"]
  },
  {
    id: 528,
    term: "Summary Judgment",
    category: "acara-perdata",
    definition: "Putusan tanpa pemeriksaan lengkap",
    example: "Summary judgment untuk kasus sederhana",
    legalBasis: "Perma Gugatan Sederhana",
    englishTerm: "Summary Judgment",
    relatedTerms: ["Putusan Singkat", "Putusan Sederhana"]
  },
  {
    id: 529,
    term: "Summons",
    category: "acara-perdata",
    definition: "Panggilan resmi untuk hadir di pengadilan",
    example: "Summons untuk tergugat hadir sidang pertama",
    legalBasis: "HIR/RBg",
    englishTerm: "Summons",
    relatedTerms: ["Panggilan", "Dagvaarding"]
  },
  {
    id: 530,
    term: "Sunset Clause",
    category: "kontrak",
    definition: "Klausul yang membatasi berlakunya ketentuan",
    example: "Sunset clause 5 tahun untuk non-compete",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Sunset Clause",
    relatedTerms: ["Klausul Berakhir", "Batas Waktu"]
  },
  {
    id: 531,
    term: "Super Priority",
    category: "kepailitan",
    definition: "Hak didahulukan di atas kreditor lain",
    example: "Upah buruh punya super priority",
    legalBasis: "UU Kepailitan",
    englishTerm: "Super Priority",
    relatedTerms: ["Hak Istimewa", "Prioritas Utama"]
  },
  {
    id: 532,
    term: "Superficies",
    category: "benda",
    definition: "Hak untuk memiliki bangunan di atas tanah orang lain",
    example: "Hak guna bangunan sebagai superficies",
    legalBasis: "KUHPerdata",
    englishTerm: "Superficies",
    relatedTerms: ["Opstal", "Hak Numpang"]
  },
  {
    id: 533,
    term: "Supersedeas",
    category: "acara-perdata",
    definition: "Perintah penundaan eksekusi putusan",
    example: "Supersedeas bond untuk tunda eksekusi",
    legalBasis: "HIR/RBg",
    englishTerm: "Supersedeas",
    relatedTerms: ["Penundaan", "Stay Order"]
  },
  {
    id: 534,
    term: "Supplementary Agreement",
    category: "kontrak",
    definition: "Perjanjian tambahan yang melengkapi perjanjian pokok",
    example: "Addendum kontrak kerja sama",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Supplementary Agreement",
    relatedTerms: ["Perjanjian Tambahan", "Addendum"]
  },
  {
    id: 535,
    term: "Support Creditor",
    category: "kepailitan",
    definition: "Kreditor yang mendukung rencana perdamaian",
    example: "75% support creditor setuju PKPU",
    legalBasis: "UU Kepailitan",
    englishTerm: "Supporting Creditor",
    relatedTerms: ["Kreditor Pendukung", "Voting Creditor"]
  },
  {
    id: 536,
    term: "Surcharge",
    category: "kontrak",
    definition: "Biaya tambahan di luar harga pokok",
    example: "Fuel surcharge untuk pengiriman",
    legalBasis: "Perjanjian",
    englishTerm: "Surcharge",
    relatedTerms: ["Biaya Tambahan", "Extra Charge"]
  },
  {
    id: 537,
    term: "Surety",
    category: "perikatan",
    definition: "Penjamin atau jaminan perorangan",
    example: "Personal guarantee direktur untuk kredit PT",
    legalBasis: "Pasal 1820 KUHPerdata",
    englishTerm: "Surety",
    relatedTerms: ["Penjamin", "Borgtocht"]
  },
  {
    id: 538,
    term: "Surrender",
    category: "kontrak",
    definition: "Penyerahan kembali hak atau barang",
    example: "Surrender polis asuransi jiwa",
    legalBasis: "Perjanjian",
    englishTerm: "Surrender",
    relatedTerms: ["Penyerahan", "Pengembalian"]
  },
  {
    id: 539,
    term: "Survival Clause",
    category: "kontrak",
    definition: "Klausul yang tetap berlaku setelah kontrak berakhir",
    example: "Kerahasiaan tetap berlaku 5 tahun pasca kontrak",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Survival Clause",
    relatedTerms: ["Klausul Bertahan", "Post-Contract"]
  },
  {
    id: 540,
    term: "Suspect Transaction",
    category: "kepailitan",
    definition: "Transaksi mencurigakan sebelum kepailitan",
    example: "Transfer aset 3 bulan sebelum pailit",
    legalBasis: "UU Kepailitan",
    englishTerm: "Suspect Transaction",
    relatedTerms: ["Transaksi Mencurigakan", "Fraudulent Transfer"]
  },
  {
    id: 541,
    term: "Suspension of Payment",
    category: "kepailitan",
    definition: "Penundaan kewajiban pembayaran utang (PKPU)",
    example: "PKPU sementara 45 hari",
    legalBasis: "UU No. 37/2004",
    englishTerm: "Suspension of Payment",
    relatedTerms: ["PKPU", "Uitstel van Betaling"]
  },
  {
    id: 542,
    term: "Swap",
    category: "kontrak",
    definition: "Pertukaran arus kas atau aset",
    example: "Interest rate swap untuk lindung nilai",
    legalBasis: "Perjanjian Derivatif",
    englishTerm: "Swap",
    relatedTerms: ["Tukar", "Pertukaran"]
  },
  {
    id: 543,
    term: "Sweetheart Deal",
    category: "kontrak",
    definition: "Transaksi yang sangat menguntungkan satu pihak",
    example: "Penjualan aset di bawah harga pasar ke pihak terafiliasi",
    legalBasis: "Prinsip Arm's Length",
    englishTerm: "Sweetheart Deal",
    relatedTerms: ["Transaksi Istimewa", "Unfair Deal"]
  },
  {
    id: 544,
    term: "Syndicated Loan",
    category: "perikatan",
    definition: "Pinjaman yang diberikan oleh beberapa kreditor bersama",
    example: "Kredit sindikasi untuk proyek infrastruktur",
    legalBasis: "Perjanjian Kredit",
    englishTerm: "Syndicated Loan",
    relatedTerms: ["Kredit Sindikasi", "Pinjaman Bersama"]
  },
  {
    id: 545,
    term: "Syarat Batal",
    category: "kontrak",
    definition: "Kondisi yang jika terjadi membatalkan perjanjian",
    example: "Jual beli batal jika tidak mendapat IMB",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Resolutive Condition",
    relatedTerms: ["Ontbindende Voorwaarde", "Condition Subsequent"]
  },
  {
    id: 546,
    term: "Syarat Tangguh",
    category: "kontrak",
    definition: "Kondisi yang menangguhkan berlakunya perjanjian",
    example: "Kontrak berlaku setelah dapat izin",
    legalBasis: "Pasal 1253 KUHPerdata",
    englishTerm: "Suspensive Condition",
    relatedTerms: ["Opschortende Voorwaarde", "Condition Precedent"]
  },
  {
    id: 547,
    term: "Syirkah",
    category: "perseroan",
    definition: "Perkongsian atau persekutuan dalam hukum Islam",
    example: "Syirkah mudharabah untuk usaha bersama",
    legalBasis: "Prinsip Syariah",
    englishTerm: "Partnership",
    relatedTerms: ["Musyarakah", "Kemitraan"]
  },
  {
    id: 548,
    term: "Taaruf",
    category: "keluarga",
    definition: "Perkenalan dalam proses menuju pernikahan Islam",
    example: "Taaruf dengan pendampingan wali",
    legalBasis: "Hukum Islam",
    englishTerm: "Islamic Courtship",
    relatedTerms: ["Perkenalan", "Khitbah"]
  },
  {
    id: 549,
    term: "Taflis",
    category: "kepailitan",
    definition: "Keadaan tidak mampu membayar utang dalam hukum Islam",
    example: "Hakim menetapkan status taflis debitur",
    legalBasis: "Hukum Islam",
    englishTerm: "Islamic Bankruptcy",
    relatedTerms: ["Pailit", "Muflis"]
  },
  {
    id: 550,
    term: "Tagihan",
    category: "perikatan",
    definition: "Hak untuk menuntut pembayaran",
    example: "Tagihan listrik bulanan",
    legalBasis: "KUHPerdata",
    englishTerm: "Claim",
    relatedTerms: ["Piutang", "Vordering"]
  },
  {
    id: 551,
    term: "Takaful",
    category: "kontrak",
    definition: "Asuransi berdasarkan prinsip syariah",
    example: "Takaful jiwa dengan sistem tolong menolong",
    legalBasis: "Peraturan OJK Syariah",
    englishTerm: "Islamic Insurance",
    relatedTerms: ["Asuransi Syariah", "Ta'min"]
  },
  {
    id: 552,
    term: "Take or Pay",
    category: "kontrak",
    definition: "Kewajiban bayar meski tidak mengambil barang/jasa",
    example: "Kontrak gas take or pay minimum 80%",
    legalBasis: "Perjanjian Jual Beli",
    englishTerm: "Take or Pay",
    relatedTerms: ["Ambil atau Bayar", "Minimum Purchase"]
  },
  {
    id: 553,
    term: "Take Over",
    category: "perseroan",
    definition: "Pengambilalihan kepemilikan atau kontrol perusahaan",
    example: "Hostile take over dengan tender offer",
    legalBasis: "UU PT, UU Pasar Modal",
    englishTerm: "Take Over",
    relatedTerms: ["Akuisisi", "Pengambilalihan"]
  },
  {
    id: 554,
    term: "Takeover Bid",
    category: "perseroan",
    definition: "Penawaran untuk mengambil alih perusahaan",
    example: "Tender offer untuk beli 51% saham",
    legalBasis: "UU Pasar Modal",
    englishTerm: "Takeover Bid",
    relatedTerms: ["Penawaran Tender", "Acquisition Offer"]
  },
  {
    id: 556,
    term: "Taklik Talak",
    category: "keluarga",
    definition: "Ikrar talak bersyarat yang diucapkan suami",
    example: "Taklik talak jika suami tidak memberi nafkah 6 bulan",
    legalBasis: "KHI",
    englishTerm: "Conditional Divorce",
    relatedTerms: ["Talak Bersyarat", "Ikrar Talak"]
  },
  {
    id: 557,
    term: "Talak",
    category: "keluarga",
    definition: "Perceraian yang dijatuhkan suami dalam Islam",
    example: "Talak satu raj'i di depan pengadilan agama",
    legalBasis: "UU Perkawinan, KHI",
    englishTerm: "Islamic Divorce",
    relatedTerms: ["Cerai Talak", "Perceraian Islam"]
  },
  {
    id: 558,
    term: "Tanah Adat",
    category: "benda",
    definition: "Tanah yang tunduk pada hukum adat",
    example: "Tanah ulayat masyarakat adat",
    legalBasis: "UUPA",
    englishTerm: "Customary Land",
    relatedTerms: ["Tanah Ulayat", "Hak Ulayat"]
  },
  {
    id: 559,
    term: "Tanah Negara",
    category: "benda",
    definition: "Tanah yang dikuasai langsung oleh negara",
    example: "Tanah negara untuk proyek pemerintah",
    legalBasis: "UUPA",
    englishTerm: "State Land",
    relatedTerms: ["Tanah Pemerintah", "Government Land"]
  },
  {
    id: 560,
    term: "Tanah Wakaf",
    category: "benda",
    definition: "Tanah yang diwakafkan untuk kepentingan agama/sosial",
    example: "Tanah wakaf untuk masjid",
    legalBasis: "UU Wakaf",
    englishTerm: "Waqf Land",
    relatedTerms: ["Wakaf", "Religious Endowment"]
  },
  {
    id: 561,
    term: "Tandem",
    category: "kontrak",
    definition: "Kerjasama dua pihak yang saling melengkapi",
    example: "Tandem kontraktor-konsultan dalam proyek",
    legalBasis: "Asas Kebebasan Berkontrak",
    englishTerm: "Tandem",
    relatedTerms: ["Kerjasama", "Partnership"]
  },
  {
    id: 562,
    term: "Tanggung Gugat",
    category: "perikatan",
    definition: "Kewajiban hukum untuk bertanggung jawab",
    example: "Tanggung gugat produsen atas produk cacat",
    legalBasis: "KUHPerdata",
    englishTerm: "Liability",
    relatedTerms: ["Liability", "Aansprakelijkheid"]
  },
  {
    id: 563,
    term: "Tanggung Jawab Terbatas",
    category: "perseroan",
    definition: "Tanggung jawab sebatas modal yang disetor",
    example: "Pemegang saham PT tanggung jawab terbatas",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Limited Liability",
    relatedTerms: ["Limited Liability", "Beperkte Aansprakelijkheid"]
  },
  {
    id: 564,
    term: "Tanggung Renteng",
    category: "perikatan",
    definition: "Tanggung jawab bersama untuk seluruh kewajiban",
    example: "Para debitur tanggung renteng atas hutang",
    legalBasis: "Pasal 1278 KUHPerdata",
    englishTerm: "Joint and Several Liability",
    relatedTerms: ["Solidaritas", "Hoofdelijk"]
  },
  {
    id: 565,
    term: "Tanggungan",
    category: "benda",
    definition: "Hak jaminan atas tanah untuk pelunasan utang",
    example: "Hak tanggungan untuk kredit bank",
    legalBasis: "UU No. 4/1996",
    englishTerm: "Mortgage",
    relatedTerms: ["Hak Tanggungan", "Hipotik"]
  },
  {
    id: 566,
    term: "Tantième",
    category: "perseroan",
    definition: "Bagian keuntungan untuk komisaris/direksi",
    example: "Tantième 5% dari laba bersih",
    legalBasis: "UU PT",
    englishTerm: "Director's Fee",
    relatedTerms: ["Bonus Direksi", "Profit Sharing"]
  },
  {
    id: 567,
    term: "Taper Relief",
    category: "kontrak",
    definition: "Pengurangan bertahap kewajiban atau beban",
    example: "Taper relief untuk exit fee yang menurun tiap tahun",
    legalBasis: "Perjanjian",
    englishTerm: "Taper Relief",
    relatedTerms: ["Pengurangan Bertahap", "Gradual Reduction"]
  },
  {
    id: 568,
    term: "Tax Haven",
    category: "perseroan",
    definition: "Negara dengan pajak rendah untuk tujuan bisnis",
    example: "Mendirikan holding company di tax haven",
    legalBasis: "Hukum Pajak Internasional",
    englishTerm: "Tax Haven",
    relatedTerms: ["Surga Pajak", "Low Tax Jurisdiction"]
  },
  {
    id: 569,
    term: "Tax Treaty",
    category: "kontrak",
    definition: "Perjanjian perpajakan antar negara",
    example: "P3B Indonesia-Singapura untuk hindari pajak ganda",
    legalBasis: "Perjanjian Internasional",
    englishTerm: "Tax Treaty",
    relatedTerms: ["P3B", "Perjanjian Pajak"]
  },
  {
    id: 570,
    term: "Tegur",
    category: "acara-perdata",
    definition: "Peringatan resmi untuk memenuhi kewajiban",
    example: "Surat teguran sebelum somasi",
    legalBasis: "KUHPerdata",
    englishTerm: "Warning",
    relatedTerms: ["Teguran", "Aanmaning"]
  },
  {
    id: 571,
    term: "Tekad Bebas",
    category: "kontrak",
    definition: "Kehendak yang tidak dipengaruhi paksaan/tekanan",
    example: "Kontrak batal jika tidak ada tekad bebas",
    legalBasis: "Pasal 1321 KUHPerdata",
    englishTerm: "Free Will",
    relatedTerms: ["Kehendak Bebas", "Vrije Wil"]
  },
  {
    id: 572,
    term: "Temporer",
    category: "kontrak",
    definition: "Bersifat sementara atau tidak tetap",
    example: "Injunction temporer selama proses",
    legalBasis: "HIR/RBg",
    englishTerm: "Temporary",
    relatedTerms: ["Sementara", "Provisional"]
  },
  {
    id: 573,
    term: "Tenancy",
    category: "benda",
    definition: "Hak sewa atau penyewaan properti",
    example: "Tenancy agreement untuk sewa ruko",
    legalBasis: "KUHPerdata",
    englishTerm: "Tenancy",
    relatedTerms: ["Penyewaan", "Sewa Menyewa"]
  },
  {
    id: 574,
    term: "Tender",
    category: "kontrak",
    definition: "Penawaran umum untuk pengadaan barang/jasa",
    example: "Tender terbuka proyek pemerintah",
    legalBasis: "Perpres Pengadaan",
    englishTerm: "Tender",
    relatedTerms: ["Lelang", "Pelelangan"]
  },
  {
    id: 575,
    term: "Tender Offer",
    category: "perseroan",
    definition: "Penawaran pembelian saham langsung ke pemegang saham",
    example: "Mandatory tender offer setelah akuisisi 80%",
    legalBasis: "UU Pasar Modal",
    englishTerm: "Tender Offer",
    relatedTerms: ["Penawaran Tender", "Public Offer"]
  },
  {
    id: 576,
    term: "Tenens",
    category: "benda",
    definition: "Pemegang atau yang menguasai benda",
    example: "Penyewa sebagai tenens properti",
    legalBasis: "KUHPerdata",
    englishTerm: "Holder",
    relatedTerms: ["Pemegang", "Houder"]
  },
  {
    id: 577,
    term: "Tenure",
    category: "benda",
    definition: "Masa atau hak penguasaan tanah",
    example: "Land tenure system di Indonesia",
    legalBasis: "UUPA",
    englishTerm: "Tenure",
    relatedTerms: ["Penguasaan", "Masa Hak"]
  },
  {
    id: 578,
    term: "Tercemar",
    category: "keluarga",
    definition: "Kehilangan hak waris karena perbuatan tercela",
    example: "Tidak patut mewaris karena membunuh pewaris",
    legalBasis: "Pasal 838 KUHPerdata",
    englishTerm: "Unworthy",
    relatedTerms: ["Onwaardig", "Tidak Patut"]
  },
  {
    id: 579,
    term: "Term Sheet",
    category: "kontrak",
    definition: "Dokumen yang memuat syarat-syarat pokok transaksi",
    example: "Term sheet investasi venture capital",
    legalBasis: "Praktik Bisnis",
    englishTerm: "Term Sheet",
    relatedTerms: ["Lembar Persyaratan", "MoU"]
  },
  {
    id: 580,
    term: "Termijn",
    category: "kontrak",
    definition: "Jangka waktu atau termin pembayaran",
    example: "Pembayaran dalam 3 termijn",
    legalBasis: "Perjanjian",
    englishTerm: "Term",
    relatedTerms: ["Termin", "Tahap Bayar"]
  },
  {
    id: 581,
    term: "Territorial",
    category: "kontrak",
    definition: "Berkaitan dengan wilayah berlakunya",
    example: "Lisensi territorial untuk Indonesia saja",
    legalBasis: "Perjanjian Lisensi",
    englishTerm: "Territorial",
    relatedTerms: ["Kewilayahan", "Geographic Scope"]
  },
  {
    id: 582,
    term: "Tertanggung",
    category: "kontrak",
    definition: "Pihak yang diasuransikan",
    example: "Tertanggung dalam polis asuransi jiwa",
    legalBasis: "KUHD",
    englishTerm: "Insured",
    relatedTerms: ["Insured", "Verzekerde"]
  },
  {
    id: 583,
    term: "Testament",
    category: "waris",
    definition: "Surat wasiat yang berisi kehendak terakhir",
    example: "Testament dibuat di hadapan notaris",
    legalBasis: "Pasal 875 KUHPerdata",
    englishTerm: "Testament",
    relatedTerms: ["Wasiat", "Surat Wasiat"]
  },
  {
    id: 584,
    term: "Testimonium",
    category: "acara-perdata",
    definition: "Kesaksian atau keterangan saksi",
    example: "Testimonium de auditu dari saksi",
    legalBasis: "HIR/RBg",
    englishTerm: "Testimony",
    relatedTerms: ["Kesaksian", "Keterangan"]
  },
  {
    id: 585,
    term: "Third Party",
    category: "kontrak",
    definition: "Pihak ketiga di luar para pihak dalam kontrak yang dapat memiliki kepentingan atau terkena dampak dari perjanjian",
    example: "Third party beneficiary dalam asuransi jiwa yang menerima manfaat polis",
    legalBasis: "Pasal 1317 KUHPerdata",
    englishTerm: "Third Party",
    relatedTerms: ["Pihak Ketiga", "Derde", "Beneficiary"]
  },
  {
    id: 586,
    term: "Time Bar",
    category: "perikatan",
    definition: "Pembatasan waktu untuk mengajukan tuntutan atau gugatan berdasarkan daluwarsa",
    example: "Gugatan hutang piutang yang sudah melewati batas waktu 30 tahun",
    legalBasis: "Pasal 1946-1993 KUHPerdata",
    englishTerm: "Time Bar",
    relatedTerms: ["Daluwarsa", "Verjaring", "Prescription"]
  },
  {
    id: 587,
    term: "Title Deed",
    category: "properti",
    definition: "Dokumen yang membuktikan kepemilikan atas tanah atau properti",
    example: "Sertifikat Hak Milik sebagai title deed atas tanah",
    legalBasis: "UU No. 5/1960 (UUPA)",
    englishTerm: "Title Deed",
    relatedTerms: ["Sertifikat", "Bukti Kepemilikan", "Eigendomsrecht"]
  },
  {
    id: 588,
    term: "Torts",
    category: "perbuatan-melawan-hukum",
    definition: "Perbuatan melawan hukum dalam hukum perdata yang menimbulkan kerugian",
    example: "Kelalaian yang menyebabkan kecelakaan dan kerugian pada orang lain",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Torts",
    relatedTerms: ["Onrechtmatige Daad", "PMH", "Delict"]
  },
  {
    id: 589,
    term: "Trade Secret",
    category: "properti-intelektual",
    definition: "Informasi rahasia bisnis yang memiliki nilai ekonomi dan dijaga kerahasiaannya",
    example: "Formula rahasia minuman Coca-Cola",
    legalBasis: "UU No. 30/2000",
    englishTerm: "Trade Secret",
    relatedTerms: ["Rahasia Dagang", "Bedrijfsgeheim", "Confidential Information"]
  },
  {
    id: 590,
    term: "Trademark",
    category: "properti-intelektual",
    definition: "Tanda yang dapat ditampilkan secara grafis untuk membedakan barang/jasa",
    example: "Logo Nike sebagai trademark untuk produk olahraga",
    legalBasis: "UU No. 20/2016",
    englishTerm: "Trademark",
    relatedTerms: ["Merek", "Merk", "Brand"],
    trending: true
  },
  {
    id: 591,
    term: "Transfer of Risk",
    category: "kontrak",
    definition: "Perpindahan risiko dari penjual kepada pembeli dalam jual beli",
    example: "Risiko kerusakan barang berpindah saat barang diserahkan",
    legalBasis: "Pasal 1460 KUHPerdata",
    englishTerm: "Transfer of Risk",
    relatedTerms: ["Peralihan Risiko", "Risk Allocation", "Risico-overgang"]
  },
  {
    id: 592,
    term: "Transferable",
    category: "benda",
    definition: "Sifat benda atau hak yang dapat dialihkan kepada pihak lain",
    example: "Saham bearer yang dapat dipindahtangankan dengan mudah",
    legalBasis: "Pasal 511, 613 KUHPerdata",
    englishTerm: "Transferable",
    relatedTerms: ["Dapat Dialihkan", "Overdraagbaar", "Negotiable"]
  },
  {
    id: 593,
    term: "Transaksi Afiliasi",
    category: "perusahaan",
    definition: "Transaksi antara perusahaan dengan pihak terafiliasi yang memiliki hubungan khusus",
    example: "Penjualan aset antara induk dan anak perusahaan",
    legalBasis: "UU No. 40/2007, Peraturan OJK",
    englishTerm: "Affiliated Transaction",
    relatedTerms: ["Related Party Transaction", "Transaksi Hubungan Istimewa"]
  },
  {
    id: 594,
    term: "Transparansi",
    category: "perusahaan",
    definition: "Keterbukaan informasi yang wajib diungkapkan oleh perusahaan publik",
    example: "Laporan keuangan tahunan yang dipublikasikan",
    legalBasis: "UU No. 8/1995 (Pasar Modal)",
    englishTerm: "Transparency",
    relatedTerms: ["Keterbukaan", "Disclosure", "Openbaarheid"]
  },
  {
    id: 595,
    term: "Treasury Stock",
    category: "perusahaan",
    definition: "Saham yang dibeli kembali oleh perusahaan penerbitnya",
    example: "PT ABC membeli kembali 10% sahamnya dari pasar",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Treasury Stock",
    relatedTerms: ["Saham Treasuri", "Buy Back", "Eigen Aandelen"]
  },
  {
    id: 596,
    term: "Trespass",
    category: "perbuatan-melawan-hukum",
    definition: "Pelanggaran atau gangguan terhadap hak kepemilikan orang lain",
    example: "Memasuki tanah orang lain tanpa izin",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Trespass",
    relatedTerms: ["Pelanggaran Hak", "Inbreuk", "Gangguan"]
  },
  {
    id: 597,
    term: "Trust",
    category: "perikatan",
    definition: "Hubungan fidusia dimana trustee mengelola aset untuk beneficiary",
    example: "Dana pensiun yang dikelola oleh trustee",
    legalBasis: "Prinsip Common Law (tidak diatur KUHPerdata)",
    englishTerm: "Trust",
    relatedTerms: ["Fidusia", "Kepercayaan", "Bewind"]
  },
  {
    id: 598,
    term: "Trustee",
    category: "perikatan",
    definition: "Pihak yang dipercaya mengelola aset untuk kepentingan pihak lain",
    example: "Bank sebagai trustee dalam penerbitan obligasi",
    legalBasis: "Peraturan OJK",
    englishTerm: "Trustee",
    relatedTerms: ["Wali Amanat", "Bewindvoerder", "Fiduciary"]
  },
  {
    id: 599,
    term: "Turut Campur",
    category: "kontrak",
    definition: "Keterlibatan pihak ketiga dalam pelaksanaan kontrak tanpa hak",
    example: "Orang tua yang ikut campur dalam kontrak kerja anaknya yang sudah dewasa",
    legalBasis: "Pasal 1340 KUHPerdata",
    englishTerm: "Interference",
    relatedTerms: ["Intervensi", "Tussenkomst", "Third Party Interference"]
  },
  {
    id: 600,
    term: "Tutela",
    category: "keluarga",
    definition: "Perwalian atas anak yang belum dewasa yang tidak berada di bawah kekuasaan orang tua",
    example: "Kakek ditunjuk sebagai wali setelah kedua orang tua meninggal",
    legalBasis: "Pasal 345-418 KUHPerdata",
    englishTerm: "Guardianship",
    relatedTerms: ["Perwalian", "Voogdij", "Wali"]
  },
  {
    id: 601,
    term: "Two-Tier Board",
    category: "perusahaan",
    definition: "Sistem dua tingkat dalam organ perseroan dengan Direksi dan Dewan Komisaris terpisah",
    example: "PT di Indonesia menggunakan two-tier board system",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Two-Tier Board",
    relatedTerms: ["Dewan Dua Tingkat", "Dual Board", "Sistem Kontinental"]
  },
  {
    id: 602,
    term: "Ultra Vires",
    category: "perusahaan",
    definition: "Tindakan di luar kewenangan atau melampaui maksud dan tujuan perusahaan",
    example: "Perusahaan makanan yang tiba-tiba berbisnis properti tanpa perubahan anggaran dasar",
    legalBasis: "Pasal 2, 18 UU No. 40/2007",
    englishTerm: "Ultra Vires",
    relatedTerms: ["Melampaui Kewenangan", "Beyond Powers", "Buiten Bevoegdheid"]
  },
  {
    id: 603,
    term: "Unascertained Goods",
    category: "kontrak",
    definition: "Barang yang belum dapat ditentukan secara spesifik pada saat kontrak",
    example: "Pembelian 100 ton beras dari gudang yang berisi 1000 ton",
    legalBasis: "Pasal 1333 KUHPerdata",
    englishTerm: "Unascertained Goods",
    relatedTerms: ["Barang Tidak Tertentu", "Generic Goods", "Onbepaalde Goederen"]
  },
  {
    id: 604,
    term: "Unconscionable",
    category: "kontrak",
    definition: "Kontrak atau klausul yang sangat tidak adil dan bertentangan dengan hati nurani",
    example: "Bunga pinjaman 50% per bulan yang sangat memberatkan",
    legalBasis: "Pasal 1320, 1337 KUHPerdata",
    englishTerm: "Unconscionable",
    relatedTerms: ["Tidak Patut", "Unfair", "Onredelijk"]
  },
  {
    id: 605,
    term: "Undang-Undang Pokok Agraria",
    category: "properti",
    definition: "Undang-undang yang mengatur dasar-dasar hukum agraria di Indonesia",
    example: "UUPA mengatur tentang hak-hak atas tanah",
    legalBasis: "UU No. 5/1960",
    englishTerm: "Basic Agrarian Law",
    relatedTerms: ["UUPA", "Hukum Agraria", "Land Law"]
  },
  {
    id: 606,
    term: "Under Seal",
    category: "kontrak",
    definition: "Dokumen resmi yang dibuat dengan meterai atau cap resmi",
    example: "Akta notaris yang dibuat dengan cap dan meterai",
    legalBasis: "UU No. 2/2014 (Jabatan Notaris)",
    englishTerm: "Under Seal",
    relatedTerms: ["Bermeterai", "Sealed Document", "Gezegeld"]
  },
  {
    id: 607,
    term: "Underwriter",
    category: "perusahaan",
    definition: "Penjamin emisi dalam penawaran umum efek",
    example: "Bank investasi sebagai underwriter IPO",
    legalBasis: "UU No. 8/1995",
    englishTerm: "Underwriter",
    relatedTerms: ["Penjamin Emisi", "Emissie Garantie", "Penjamin"]
  },
  {
    id: 608,
    term: "Undisclosed Principal",
    category: "kontrak",
    definition: "Pemberi kuasa yang identitasnya tidak diungkapkan dalam transaksi",
    example: "Agen yang bertindak tanpa mengungkapkan nama kliennya",
    legalBasis: "Pasal 1792-1819 KUHPerdata",
    englishTerm: "Undisclosed Principal",
    relatedTerms: ["Pemberi Kuasa Tersembunyi", "Verborgen Lastgever", "Hidden Principal"]
  },
  {
    id: 609,
    term: "Undue Influence",
    category: "kontrak",
    definition: "Pengaruh yang tidak patut yang menyebabkan seseorang membuat kontrak",
    example: "Dokter yang mempengaruhi pasien lanjut usia untuk membuat wasiat untuknya",
    legalBasis: "Pasal 1321, 1323 KUHPerdata",
    englishTerm: "Undue Influence",
    relatedTerms: ["Penyalahgunaan Keadaan", "Misbruik van Omstandigheden", "Pengaruh Tidak Patut"]
  },
  {
    id: 610,
    term: "Unfair Competition",
    category: "perbuatan-melawan-hukum",
    definition: "Persaingan usaha yang tidak sehat dan melanggar etika bisnis",
    example: "Menyebarkan informasi palsu tentang produk pesaing",
    legalBasis: "UU No. 5/1999",
    englishTerm: "Unfair Competition",
    relatedTerms: ["Persaingan Tidak Sehat", "Oneerlijke Mededinging", "Anti-competitive"]
  },
  {
    id: 611,
    term: "Unilateral",
    category: "kontrak",
    definition: "Tindakan atau pernyataan sepihak tanpa persetujuan pihak lain",
    example: "Pembatalan kontrak secara sepihak tanpa alasan yang sah",
    legalBasis: "Pasal 1266, 1338 KUHPerdata",
    englishTerm: "Unilateral",
    relatedTerms: ["Sepihak", "Eenzijdig", "One-sided"]
  },
  {
    id: 612,
    term: "Unjust Enrichment",
    category: "perikatan",
    definition: "Memperoleh keuntungan tanpa dasar hukum yang merugikan pihak lain",
    example: "Menerima pembayaran ganda untuk satu tagihan",
    legalBasis: "Pasal 1352-1369 KUHPerdata",
    englishTerm: "Unjust Enrichment",
    relatedTerms: ["Onverschuldigde Betaling", "Pembayaran Tidak Terutang", "Ongerechtvaardigde Verrijking"]
  },
  {
    id: 613,
    term: "Unlimited Liability",
    category: "perusahaan",
    definition: "Tanggung jawab tidak terbatas atas utang perusahaan",
    example: "Sekutu dalam CV bertanggung jawab dengan harta pribadinya",
    legalBasis: "Pasal 18 KUHD",
    englishTerm: "Unlimited Liability",
    relatedTerms: ["Tanggung Jawab Tidak Terbatas", "Onbeperkte Aansprakelijkheid", "Personal Liability"]
  },
  {
    id: 614,
    term: "Unpaid Seller",
    category: "kontrak",
    definition: "Penjual yang belum menerima pembayaran penuh atas barang yang dijual",
    example: "Penjual yang menahan barang karena pembeli belum bayar",
    legalBasis: "Pasal 1478, 1481 KUHPerdata",
    englishTerm: "Unpaid Seller",
    relatedTerms: ["Penjual Belum Dibayar", "Onbetaalde Verkoper", "Hak Retensi"]
  },
  {
    id: 615,
    term: "Unreasonable",
    category: "kontrak",
    definition: "Tidak masuk akal atau melampaui batas kewajaran",
    example: "Ganti rugi 1 miliar untuk keterlambatan 1 hari",
    legalBasis: "Pasal 1337 KUHPerdata",
    englishTerm: "Unreasonable",
    relatedTerms: ["Tidak Wajar", "Onredelijk", "Excessive"]
  },
  {
    id: 616,
    term: "Unsecured Creditor",
    category: "perikatan",
    definition: "Kreditur yang tidak memiliki jaminan khusus atas piutangnya",
    example: "Supplier yang memberikan kredit tanpa jaminan",
    legalBasis: "Pasal 1131-1132 KUHPerdata",
    englishTerm: "Unsecured Creditor",
    relatedTerms: ["Kreditur Konkuren", "Concurrent Creditor", "Ongedekte Schuldeiser"]
  },
  {
    id: 617,
    term: "Usaha Patungan",
    category: "perusahaan",
    definition: "Kerjasama usaha antara dua pihak atau lebih dengan modal bersama",
    example: "Joint venture antara perusahaan lokal dan asing",
    legalBasis: "UU No. 25/2007 (Penanaman Modal)",
    englishTerm: "Joint Venture",
    relatedTerms: ["Joint Venture", "Ventura Bersama", "Gezamenlijke Onderneming"]
  },
  {
    id: 618,
    term: "Usufruct",
    category: "benda",
    definition: "Hak untuk menikmati dan menggunakan benda milik orang lain",
    example: "Hak pakai atas rumah milik orang tua",
    legalBasis: "Pasal 756-806 KUHPerdata",
    englishTerm: "Usufruct",
    relatedTerms: ["Hak Pakai Hasil", "Vruchtgebruik", "Hak Numpang Karang"]
  },
  {
    id: 620,
    term: "Utang Piutang",
    category: "perikatan",
    definition: "Hubungan hukum dimana satu pihak berhak menagih dan pihak lain wajib membayar",
    example: "Pinjaman uang antara individu dengan perjanjian tertulis",
    legalBasis: "Pasal 1754-1769 KUHPerdata",
    englishTerm: "Debt Obligation",
    relatedTerms: ["Schuld en Vordering", "Creditor-Debtor", "Kreditur-Debitur"]
  },
  {
    id: 621,
    term: "Utility Model",
    category: "properti-intelektual",
    definition: "Paten sederhana untuk invensi baru yang memiliki kegunaan praktis",
    example: "Alat pembuka kaleng dengan desain baru yang lebih praktis",
    legalBasis: "UU No. 13/2016",
    englishTerm: "Utility Model",
    relatedTerms: ["Paten Sederhana", "Klein Patent", "Simple Patent"]
  },
  {
    id: 622,
    term: "Valid",
    category: "kontrak",
    definition: "Sah menurut hukum dan memenuhi semua syarat yang ditentukan",
    example: "Kontrak yang memenuhi syarat sahnya perjanjian Pasal 1320 KUHPerdata",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Valid",
    relatedTerms: ["Sah", "Geldig", "Legal"]
  },
  {
    id: 623,
    term: "Valuable Consideration",
    category: "kontrak",
    definition: "Imbalan yang bernilai sebagai dasar kesepakatan dalam kontrak",
    example: "Pembayaran uang sebagai imbalan atas penyerahan barang",
    legalBasis: "Pasal 1320, 1454 KUHPerdata",
    englishTerm: "Valuable Consideration",
    relatedTerms: ["Prestasi", "Tegenprestatie", "Imbalan"]
  },
  {
    id: 624,
    term: "Valuation",
    category: "properti",
    definition: "Penilaian untuk menentukan nilai suatu aset atau properti",
    example: "Penilaian tanah dan bangunan oleh penilai independen",
    legalBasis: "Peraturan Menteri Keuangan",
    englishTerm: "Valuation",
    relatedTerms: ["Penilaian", "Waardering", "Appraisal"]
  },
  {
    id: 625,
    term: "Vendor",
    category: "kontrak",
    definition: "Penjual dalam transaksi jual beli",
    example: "Vendor yang menyediakan barang untuk perusahaan",
    legalBasis: "Pasal 1457 KUHPerdata",
    englishTerm: "Vendor",
    relatedTerms: ["Penjual", "Verkoper", "Seller"]
  },
  {
    id: 626,
    term: "Venture Capital",
    category: "perusahaan",
    definition: "Modal ventura untuk investasi pada perusahaan rintisan",
    example: "VC yang berinvestasi pada startup teknologi",
    legalBasis: "Peraturan OJK",
    englishTerm: "Venture Capital",
    relatedTerms: ["Modal Ventura", "Risicokapitaal", "Risk Capital"]
  },
  {
    id: 627,
    term: "Verba Solemnia",
    category: "kontrak",
    definition: "Kata-kata atau bentuk khusus yang harus digunakan dalam dokumen hukum",
    example: "Kalimat baku dalam akta notaris",
    legalBasis: "UU No. 2/2014",
    englishTerm: "Solemn Words",
    relatedTerms: ["Kata Khidmat", "Plechtige Woorden", "Formal Language"]
  },
  {
    id: 628,
    term: "Verbal Agreement",
    category: "kontrak",
    definition: "Perjanjian yang dibuat secara lisan tanpa dokumen tertulis",
    example: "Kesepakatan jual beli sederhana di pasar",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Verbal Agreement",
    relatedTerms: ["Perjanjian Lisan", "Mondelinge Overeenkomst", "Oral Contract"]
  },
  {
    id: 629,
    term: "Vested Interest",
    category: "properti",
    definition: "Kepentingan atau hak yang sudah pasti dan tidak dapat dicabut",
    example: "Hak waris yang sudah pasti setelah pewaris meninggal",
    legalBasis: "Pasal 833 KUHPerdata",
    englishTerm: "Vested Interest",
    relatedTerms: ["Hak Pasti", "Gevestigd Belang", "Fixed Right"]
  },
  {
    id: 630,
    term: "Vesting Period",
    category: "perusahaan",
    definition: "Periode waktu sebelum hak opsi saham dapat dieksekusi",
    example: "ESOP dengan vesting period 3 tahun",
    legalBasis: "Peraturan OJK",
    englishTerm: "Vesting Period",
    relatedTerms: ["Masa Tunggu", "Wachtperiode", "Lock-up Period"]
  },
  {
    id: 631,
    term: "Vicarious Liability",
    category: "perbuatan-melawan-hukum",
    definition: "Tanggung jawab atas perbuatan orang lain yang berada di bawah pengawasan",
    example: "Majikan bertanggung jawab atas kesalahan karyawan",
    legalBasis: "Pasal 1367 KUHPerdata",
    englishTerm: "Vicarious Liability",
    relatedTerms: ["Tanggung Jawab Pengganti", "Plaatsvervangende Aansprakelijkheid", "Respondeat Superior"]
  },
  {
    id: 632,
    term: "Vis Major",
    category: "kontrak",
    definition: "Keadaan memaksa di luar kendali manusia yang membebaskan dari kewajiban",
    example: "Bencana alam yang menghambat pelaksanaan kontrak",
    legalBasis: "Pasal 1244-1245 KUHPerdata",
    englishTerm: "Force Majeure",
    relatedTerms: ["Keadaan Memaksa", "Overmacht", "Act of God"]
  },
  {
    id: 633,
    term: "Void",
    category: "kontrak",
    definition: "Batal demi hukum atau tidak sah sejak awal",
    example: "Kontrak dengan objek terlarang adalah void",
    legalBasis: "Pasal 1335, 1337 KUHPerdata",
    englishTerm: "Void",
    relatedTerms: ["Batal Demi Hukum", "Nietig", "Null"]
  },
  {
    id: 634,
    term: "Voidable",
    category: "kontrak",
    definition: "Dapat dibatalkan atas permintaan pihak tertentu",
    example: "Kontrak yang dibuat oleh anak di bawah umur",
    legalBasis: "Pasal 1330, 1446 KUHPerdata",
    englishTerm: "Voidable",
    relatedTerms: ["Dapat Dibatalkan", "Vernietigbaar", "Annullable"]
  },
  {
    id: 635,
    term: "Voluntary Liquidation",
    category: "perusahaan",
    definition: "Pembubaran perusahaan atas kehendak sendiri",
    example: "RUPS memutuskan untuk membubarkan PT",
    legalBasis: "Pasal 142 UU No. 40/2007",
    englishTerm: "Voluntary Liquidation",
    relatedTerms: ["Likuidasi Sukarela", "Vrijwillige Liquidatie", "Self-Dissolution"]
  },
  {
    id: 636,
    term: "Voting Rights",
    category: "perusahaan",
    definition: "Hak suara pemegang saham dalam RUPS",
    example: "Satu saham memberikan satu hak suara",
    legalBasis: "Pasal 84 UU No. 40/2007",
    englishTerm: "Voting Rights",
    relatedTerms: ["Hak Suara", "Stemrecht", "Suffrage"]
  },
  {
    id: 637,
    term: "Voucher",
    category: "kontrak",
    definition: "Dokumen yang memberikan hak untuk mendapatkan barang atau jasa",
    example: "Voucher belanja senilai Rp 100.000",
    legalBasis: "Prinsip Umum Hukum Kontrak",
    englishTerm: "Voucher",
    relatedTerms: ["Kupon", "Bon", "Coupon"]
  },
  {
    id: 638,
    term: "Vrij Bewijs",
    category: "pembuktian",
    definition: "Pembuktian bebas yang tidak terikat pada alat bukti tertentu",
    example: "Hakim bebas menilai bukti dalam perkara perdata",
    legalBasis: "HIR/RBg",
    englishTerm: "Free Evidence",
    relatedTerms: ["Pembuktian Bebas", "Free Proof", "Bukti Bebas"]
  },
  {
    id: 639,
    term: "Wajib Daftar Perusahaan",
    category: "perusahaan",
    definition: "Kewajiban mendaftarkan perusahaan dalam daftar perusahaan",
    example: "PT wajib mendaftar dalam TDP",
    legalBasis: "UU No. 3/1982",
    englishTerm: "Company Registration Obligation",
    relatedTerms: ["TDP", "Bedrijfsregister", "Company Registry"]
  },
  {
    id: 640,
    term: "Wajib Lapor",
    category: "perusahaan",
    definition: "Kewajiban melaporkan kegiatan atau perubahan perusahaan",
    example: "Wajib lapor perubahan direksi ke Kemenkumham",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Reporting Obligation",
    relatedTerms: ["Kewajiban Pelaporan", "Rapportageplicht", "Mandatory Reporting"]
  },
  {
    id: 641,
    term: "Wakaf",
    category: "properti",
    definition: "Perbuatan hukum memisahkan harta untuk kepentingan ibadah/sosial",
    example: "Wakaf tanah untuk pembangunan masjid",
    legalBasis: "UU No. 41/2004",
    englishTerm: "Waqf",
    relatedTerms: ["Endowment", "Religious Endowment", "Perwakafan"]
  },
  {
    id: 642,
    term: "Wakil",
    category: "kontrak",
    definition: "Orang yang bertindak untuk dan atas nama orang lain",
    example: "Lawyer bertindak sebagai wakil klien di pengadilan",
    legalBasis: "Pasal 1792-1819 KUHPerdata",
    englishTerm: "Representative",
    relatedTerms: ["Kuasa", "Vertegenwoordiger", "Agent"]
  },
  {
    id: 643,
    term: "Wali",
    category: "keluarga",
    definition: "Orang yang menurut hukum diberikan kewenangan mengurus anak di bawah umur",
    example: "Paman ditunjuk sebagai wali setelah orang tua meninggal",
    legalBasis: "Pasal 345-418 KUHPerdata",
    englishTerm: "Guardian",
    relatedTerms: ["Voogd", "Perwalian", "Tutor"]
  },
  {
    id: 644,
    term: "Wanprestasi",
    category: "kontrak",
    definition: "Tidak memenuhi kewajiban dalam perjanjian",
    example: "Tidak membayar cicilan sesuai jadwal yang diperjanjikan",
    legalBasis: "Pasal 1238-1252 KUHPerdata",
    englishTerm: "Default",
    relatedTerms: ["Cidera Janji", "Breach of Contract", "Contractbreuk"],
    trending: true
  },
  {
    id: 645,
    term: "Warisan",
    category: "waris",
    definition: "Harta peninggalan pewaris yang beralih kepada ahli waris",
    example: "Rumah dan tanah yang ditinggalkan almarhum",
    legalBasis: "Pasal 830-1130 KUHPerdata",
    englishTerm: "Inheritance",
    relatedTerms: ["Harta Warisan", "Erfenis", "Estate"]
  },
  {
    id: 646,
    term: "Warrant",
    category: "perusahaan",
    definition: "Efek yang memberi hak untuk membeli saham pada harga tertentu",
    example: "Warrant dengan strike price Rp 1.000 per saham",
    legalBasis: "UU No. 8/1995",
    englishTerm: "Warrant",
    relatedTerms: ["Waran", "Optie", "Stock Warrant"]
  },
  {
    id: 647,
    term: "Warranty",
    category: "kontrak",
    definition: "Jaminan dari penjual tentang kondisi barang yang dijual",
    example: "Garansi elektronik selama 1 tahun",
    legalBasis: "Pasal 1474, 1504-1512 KUHPerdata",
    englishTerm: "Warranty",
    relatedTerms: ["Garansi", "Garantie", "Jaminan"]
  },
  {
    id: 648,
    term: "Wasiat",
    category: "waris",
    definition: "Pernyataan kehendak tentang pembagian harta setelah meninggal",
    example: "Wasiat yang dibuat di hadapan notaris",
    legalBasis: "Pasal 875-1005 KUHPerdata",
    englishTerm: "Will",
    relatedTerms: ["Testament", "Surat Wasiat", "Testamen"]
  },
  {
    id: 649,
    term: "Waiver",
    category: "kontrak",
    definition: "Pelepasan hak atau tuntutan secara sukarela",
    example: "Waiver atas hak untuk menuntut ganti rugi",
    legalBasis: "Prinsip Umum Hukum Kontrak",
    englishTerm: "Waiver",
    relatedTerms: ["Pelepasan Hak", "Afstand", "Renunciation"]
  },
  {
    id: 650,
    term: "Wederkerig",
    category: "kontrak",
    definition: "Timbal balik atau saling memberikan prestasi",
    example: "Kontrak jual beli bersifat wederkerig",
    legalBasis: "Pasal 1457 KUHPerdata",
    englishTerm: "Reciprocal",
    relatedTerms: ["Timbal Balik", "Mutual", "Bilateral"]
  },
  {
    id: 651,
    term: "Wet",
    category: "umum",
    definition: "Undang-undang dalam bahasa Belanda",
    example: "Burgerlijk Wetboek (BW) atau KUHPerdata",
    legalBasis: "Istilah Hukum",
    englishTerm: "Law",
    relatedTerms: ["Undang-Undang", "Statute", "Act"]
  },
  {
    id: 652,
    term: "Wettelijke Rente",
    category: "perikatan",
    definition: "Bunga yang ditetapkan undang-undang",
    example: "Bunga 6% per tahun untuk keterlambatan pembayaran",
    legalBasis: "Pasal 1250 KUHPerdata",
    englishTerm: "Legal Interest",
    relatedTerms: ["Bunga Wajib", "Statutory Interest", "Bunga Undang-Undang"]
  },
  {
    id: 653,
    term: "Whitewash",
    category: "perusahaan",
    definition: "Prosedur untuk mendapatkan persetujuan pemegang saham atas transaksi tertentu",
    example: "Whitewash untuk transaksi dengan pihak terafiliasi",
    legalBasis: "Peraturan OJK",
    englishTerm: "Whitewash",
    relatedTerms: ["Pemutihan", "Shareholder Approval", "Persetujuan RUPS"]
  },
  {
    id: 654,
    term: "Winding Up",
    category: "perusahaan",
    definition: "Proses pemberesan perusahaan yang dibubarkan",
    example: "Likuidator melakukan winding up PT yang pailit",
    legalBasis: "Pasal 142-152 UU No. 40/2007",
    englishTerm: "Winding Up",
    relatedTerms: ["Pemberesan", "Likuidasi", "Liquidatie"]
  },
  {
    id: 655,
    term: "With Prejudice",
    category: "kontrak",
    definition: "Komunikasi yang dapat digunakan sebagai bukti di pengadilan",
    example: "Surat somasi yang dikirim with prejudice",
    legalBasis: "Hukum Pembuktian",
    englishTerm: "With Prejudice",
    relatedTerms: ["Dapat Dijadikan Bukti", "Met Voorbehoud", "On Record"]
  },
  {
    id: 656,
    term: "Without Prejudice",
    category: "kontrak",
    definition: "Komunikasi yang tidak dapat digunakan sebagai bukti di pengadilan",
    example: "Negosiasi penyelesaian sengketa without prejudice",
    legalBasis: "Hukum Pembuktian",
    englishTerm: "Without Prejudice",
    relatedTerms: ["Tanpa Prasangka", "Zonder Voorbehoud", "Off Record"]
  },
  {
    id: 657,
    term: "Without Recourse",
    category: "kontrak",
    definition: "Tanpa hak regres atau tanggung jawab lebih lanjut",
    example: "Endorsemen cek without recourse",
    legalBasis: "KUHD",
    englishTerm: "Without Recourse",
    relatedTerms: ["Tanpa Regres", "Zonder Verhaal", "Non-Recourse"]
  },
  {
    id: 658,
    term: "Work for Hire",
    category: "properti-intelektual",
    definition: "Karya yang dibuat dalam hubungan kerja menjadi milik pemberi kerja",
    example: "Desain yang dibuat karyawan menjadi milik perusahaan",
    legalBasis: "UU No. 28/2014",
    englishTerm: "Work for Hire",
    relatedTerms: ["Karya Pesanan", "Werk in Opdracht", "Commissioned Work"]
  },
  {
    id: 659,
    term: "Working Capital",
    category: "perusahaan",
    definition: "Modal kerja untuk operasional perusahaan sehari-hari",
    example: "Pinjaman untuk working capital perusahaan dagang",
    legalBasis: "Praktik Bisnis",
    englishTerm: "Working Capital",
    relatedTerms: ["Modal Kerja", "Bedrijfskapitaal", "Operating Capital"]
  },
  {
    id: 660,
    term: "Wrap Around Mortgage",
    category: "properti",
    definition: "Hipotek yang mencakup hipotek yang sudah ada sebelumnya",
    example: "Hipotek kedua yang melingkupi hipotek pertama",
    legalBasis: "UU No. 4/1996 (Hak Tanggungan)",
    englishTerm: "Wrap Around Mortgage",
    relatedTerms: ["Hipotek Menyeluruh", "All-Inclusive Mortgage", "Omvattende Hypotheek"]
  },
  {
    id: 661,
    term: "Written Consent",
    category: "kontrak",
    definition: "Persetujuan yang diberikan dalam bentuk tertulis",
    example: "Persetujuan tertulis suami/istri untuk menjual harta bersama",
    legalBasis: "Pasal 36 UU No. 1/1974",
    englishTerm: "Written Consent",
    relatedTerms: ["Persetujuan Tertulis", "Schriftelijke Toestemming", "Izin Tertulis"]
  },
  {
    id: 662,
    term: "Wrongful Act",
    category: "perbuatan-melawan-hukum",
    definition: "Perbuatan melawan hukum yang menimbulkan kerugian",
    example: "Pencemaran lingkungan yang merugikan warga",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Wrongful Act",
    relatedTerms: ["Perbuatan Melawan Hukum", "Onrechtmatige Daad", "Tort"]
  },
  {
    id: 663,
    term: "Wrongful Death",
    category: "perbuatan-melawan-hukum",
    definition: "Kematian yang disebabkan perbuatan melawan hukum orang lain",
    example: "Kematian akibat kelalaian dokter",
    legalBasis: "Pasal 1365, 1370 KUHPerdata",
    englishTerm: "Wrongful Death",
    relatedTerms: ["Kematian Tidak Wajar", "Onrechtmatige Dood", "Fatal Tort"]
  },
  {
    id: 664,
    term: "Wrongful Dismissal",
    category: "kontrak",
    definition: "Pemutusan hubungan kerja yang tidak sah",
    example: "PHK tanpa alasan yang dibenarkan undang-undang",
    legalBasis: "UU No. 13/2003",
    englishTerm: "Wrongful Dismissal",
    relatedTerms: ["PHK Tidak Sah", "Onrechtmatig Ontslag", "Unfair Dismissal"]
  },
  {
    id: 665,
    term: "Yield",
    category: "perusahaan",
    definition: "Hasil atau imbal hasil dari investasi",
    example: "Yield obligasi 8% per tahun",
    legalBasis: "Praktik Pasar Modal",
    englishTerm: "Yield",
    relatedTerms: ["Imbal Hasil", "Rendement", "Return"]
  },
  {
    id: 666,
    term: "Yuridis",
    category: "umum",
    definition: "Berkaitan dengan hukum atau menurut hukum",
    example: "Analisis yuridis terhadap kontrak",
    legalBasis: "Istilah Hukum",
    englishTerm: "Juridical",
    relatedTerms: ["Legal", "Rechtelijk", "Hukum"]
  },
  {
    id: 667,
    term: "Yurisdiksi",
    category: "umum",
    definition: "Kewenangan untuk mengadili atau membuat hukum",
    example: "Yurisdiksi pengadilan negeri dalam perkara perdata",
    legalBasis: "HIR/RBg",
    englishTerm: "Jurisdiction",
    relatedTerms: ["Kewenangan", "Rechtsmacht", "Kompetensi"]
  },
  {
    id: 668,
    term: "Yurisprudensi",
    category: "umum",
    definition: "Putusan pengadilan yang menjadi sumber hukum",
    example: "Yurisprudensi MA tentang perbuatan melawan hukum",
    legalBasis: "UU Kekuasaan Kehakiman",
    englishTerm: "Jurisprudence",
    relatedTerms: ["Case Law", "Rechtspraak", "Putusan Tetap"]
  },
  {
    id: 669,
    term: "Zaak",
    category: "benda",
    definition: "Benda dalam pengertian hukum Belanda",
    example: "Zaak meliputi benda berwujud dan tidak berwujud",
    legalBasis: "Pasal 499 KUHPerdata",
    englishTerm: "Thing",
    relatedTerms: ["Benda", "Object", "Kebendaan"]
  },
  {
    id: 670,
    term: "Zaakwaarneming",
    category: "perikatan",
    definition: "Pengurusan kepentingan orang lain tanpa perintah",
    example: "Merawat rumah tetangga yang sedang bepergian",
    legalBasis: "Pasal 1354-1357 KUHPerdata",
    englishTerm: "Negotiorum Gestio",
    relatedTerms: ["Pengurusan Tanpa Perintah", "Voluntary Agency", "Gestie"]
  },
  {
    id: 671,
    term: "Zakelijk Recht",
    category: "benda",
    definition: "Hak kebendaan yang dapat dipertahankan terhadap setiap orang",
    example: "Hak milik, hak guna bangunan, hak tanggungan",
    legalBasis: "Buku II KUHPerdata",
    englishTerm: "Property Right",
    relatedTerms: ["Hak Kebendaan", "Real Right", "In Rem"]
  },
  {
    id: 672,
    term: "Zekerheid",
    category: "perikatan",
    definition: "Jaminan untuk pelunasan utang",
    example: "Fidusia sebagai zekerheid atas pinjaman",
    legalBasis: "Pasal 1131 KUHPerdata",
    englishTerm: "Security",
    relatedTerms: ["Jaminan", "Collateral", "Agunan"]
  },
  {
    id: 673,
    term: "Zelfstandig",
    category: "umum",
    definition: "Berdiri sendiri atau independen",
    example: "PT sebagai badan hukum zelfstandig",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Independent",
    relatedTerms: ["Mandiri", "Autonomous", "Otonom"]
  },
  {
    id: 674,
    term: "Zendings Brief",
    category: "kontrak",
    definition: "Surat pengantar pengiriman barang",
    example: "Dokumen pengiriman dalam perdagangan",
    legalBasis: "KUHD",
    englishTerm: "Consignment Note",
    relatedTerms: ["Surat Jalan", "Delivery Note", "Vrachtbrief"]
  },
  {
    id: 675,
    term: "Zero Coupon Bond",
    category: "perusahaan",
    definition: "Obligasi tanpa kupon bunga yang dijual dengan diskon",
    example: "Obligasi dijual Rp 800.000 dengan nilai jatuh tempo Rp 1.000.000",
    legalBasis: "Peraturan OJK",
    englishTerm: "Zero Coupon Bond",
    relatedTerms: ["Obligasi Tanpa Bunga", "Discount Bond", "Nulcoupon"]
  },
  {
    id: 676,
    term: "Zitting",
    category: "umum",
    definition: "Sidang atau persidangan pengadilan",
    example: "Zitting untuk pemeriksaan saksi",
    legalBasis: "HIR/RBg",
    englishTerm: "Session",
    relatedTerms: ["Sidang", "Hearing", "Persidangan"]
  },
  {
    id: 677,
    term: "Zona Ekonomi Eksklusif",
    category: "properti",
    definition: "Wilayah laut dengan hak ekonomi khusus negara pantai",
    example: "Hak eksplorasi di ZEE Indonesia",
    legalBasis: "UU No. 5/1983",
    englishTerm: "Exclusive Economic Zone",
    relatedTerms: ["ZEE", "EEZ", "Wilayah Ekonomi"]
  },
  {
    id: 678,
    term: "Zona Industri",
    category: "properti",
    definition: "Kawasan yang diperuntukkan bagi kegiatan industri",
    example: "Pembangunan pabrik di zona industri",
    legalBasis: "UU Penataan Ruang",
    englishTerm: "Industrial Zone",
    relatedTerms: ["Kawasan Industri", "Industrial Estate", "Industriegebied"]
  },
  {
    id: 679,
    term: "Zoning",
    category: "properti",
    definition: "Pembagian wilayah berdasarkan peruntukan",
    example: "Zoning untuk perumahan, komersial, dan industri",
    legalBasis: "UU No. 26/2007",
    englishTerm: "Zoning",
    relatedTerms: ["Peruntukan", "Tata Ruang", "Bestemmingsplan"]
  },
  {
    id: 680,
    term: "Zorgplicht",
    category: "perbuatan-melawan-hukum",
    definition: "Kewajiban kehati-hatian dalam bertindak",
    example: "Duty of care dokter terhadap pasien",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Duty of Care",
    relatedTerms: ["Kewajiban Kehati-hatian", "Zorgvuldigheid", "Prudent"]
  },
  {
    id: 681,
    term: "Zuivering",
    category: "waris",
    definition: "Pembersihan harta warisan dari hutang sebelum dibagi",
    example: "Melunasi hutang pewaris sebelum membagi warisan",
    legalBasis: "Pasal 1100-1130 KUHPerdata",
    englishTerm: "Estate Settlement",
    relatedTerms: ["Pemberesan Warisan", "Boedelafwikkeling", "Liquidation"]
  },
  {
    id: 684,
    term: "Abandonment",
    category: "properti",
    definition: "Pelepasan hak milik secara sukarela tanpa mengalihkan kepada orang lain",
    example: "Pemilik tanah meninggalkan tanahnya selama bertahun-tahun tanpa diurus",
    legalBasis: "Pasal 584 KUHPerdata",
    englishTerm: "Abandonment",
    relatedTerms: ["Pelepasan Hak", "Derelinquering", "Penelantaran"]
  },
  {
    id: 685,
    term: "Abatement",
    category: "kontrak",
    definition: "Pengurangan atau pemotongan harga karena cacat atau ketidaksesuaian",
    example: "Pengurangan harga rumah karena ada kerusakan yang tidak disebutkan",
    legalBasis: "Pasal 1504 KUHPerdata",
    englishTerm: "Abatement",
    relatedTerms: ["Pengurangan Harga", "Prijsvermindering", "Price Reduction"]
  },
  {
    id: 686,
    term: "Abirato",
    category: "waris",
    definition: "Bagian warisan yang hilang atau berkurang karena hutang pewaris",
    example: "Warisan berkurang setelah melunasi hutang almarhum",
    legalBasis: "Pasal 1100 KUHPerdata",
    englishTerm: "Estate Deduction",
    relatedTerms: ["Pengurangan Warisan", "Boedelaftrek", "Inheritance Reduction"]
  },
  {
    id: 687,
    term: "Absolute Title",
    category: "properti",
    definition: "Hak milik yang sempurna dan tidak dapat diganggu gugat",
    example: "Sertifikat hak milik yang sudah berusia lebih dari 20 tahun",
    legalBasis: "PP No. 24/1997",
    englishTerm: "Absolute Title",
    relatedTerms: ["Hak Mutlak", "Volstrekt Eigendom", "Perfect Title"]
  },
  {
    id: 688,
    term: "Abstraksi",
    category: "kontrak",
    definition: "Pemisahan antara perjanjian obligatoir dengan perjanjian kebendaan",
    example: "Perjanjian jual beli terpisah dari penyerahan hak milik",
    legalBasis: "Sistem Hukum Perdata",
    englishTerm: "Abstraction",
    relatedTerms: ["Pemisahan", "Abstractie", "Separation Principle"]
  },
  {
    id: 689,
    term: "Abuse of Circumstances",
    category: "kontrak",
    definition: "Penyalahgunaan keadaan yang menyebabkan kontrak dapat dibatalkan",
    example: "Memanfaatkan keadaan darurat untuk membuat kontrak yang sangat merugikan",
    legalBasis: "Yurisprudensi",
    englishTerm: "Abuse of Circumstances",
    relatedTerms: ["Penyalahgunaan Keadaan", "Misbruik van Omstandigheden", "Undue Influence"],
    trending: true
  },
  {
    id: 690,
    term: "Accelerated Depreciation",
    category: "properti",
    definition: "Penyusutan dipercepat atas aset tetap",
    example: "Penyusutan mesin pabrik dengan metode saldo menurun",
    legalBasis: "Peraturan Perpajakan",
    englishTerm: "Accelerated Depreciation",
    relatedTerms: ["Penyusutan Dipercepat", "Versnelde Afschrijving", "Rapid Amortization"]
  },
  {
    id: 691,
    term: "Acceleration Clause",
    category: "kontrak",
    definition: "Klausul yang mempercepat jatuh tempo seluruh kewajiban",
    example: "Seluruh hutang jatuh tempo jika debitur wanprestasi",
    legalBasis: "Prinsip Kebebasan Berkontrak",
    englishTerm: "Acceleration Clause",
    relatedTerms: ["Klausul Akselerasi", "Vervroegingsclausule", "Due on Default"]
  },
  {
    id: 692,
    term: "Accessio",
    category: "benda",
    definition: "Cara memperoleh hak milik karena perlekatan atau pertambahan",
    example: "Tanah bertambah karena endapan sungai",
    legalBasis: "Pasal 588-604 KUHPerdata",
    englishTerm: "Accession",
    relatedTerms: ["Perlekatan", "Natrekking", "Pertambahan"]
  },
  {
    id: 693,
    term: "Accessoir Agreement",
    category: "kontrak",
    definition: "Perjanjian tambahan yang mengikuti perjanjian pokok",
    example: "Perjanjian jaminan sebagai accessoir dari perjanjian kredit",
    legalBasis: "Pasal 1821 KUHPerdata",
    englishTerm: "Accessory Agreement",
    relatedTerms: ["Perjanjian Tambahan", "Bijkomende Overeenkomst", "Ancillary Contract"]
  },
  {
    id: 694,
    term: "Accidental Damage",
    category: "perbuatan-melawan-hukum",
    definition: "Kerusakan yang terjadi karena kecelakaan tanpa kesengajaan",
    example: "Mobil tergelincir karena hujan dan menabrak pagar rumah",
    legalBasis: "Pasal 1365-1366 KUHPerdata",
    englishTerm: "Accidental Damage",
    relatedTerms: ["Kerusakan Tidak Sengaja", "Onopzettelijke Schade", "Unintentional Loss"]
  },
  {
    id: 695,
    term: "Accommodation Party",
    category: "kontrak",
    definition: "Pihak yang menandatangani surat berharga untuk membantu pihak lain",
    example: "Menandatangani wesel untuk membantu teman mendapat kredit",
    legalBasis: "KUHD",
    englishTerm: "Accommodation Party",
    relatedTerms: ["Penolong", "Accommodant", "Surety"]
  },
  {
    id: 696,
    term: "Accord and Satisfaction",
    category: "perikatan",
    definition: "Kesepakatan baru yang menggantikan kewajiban lama",
    example: "Mengganti hutang uang dengan penyerahan barang",
    legalBasis: "Pasal 1381 KUHPerdata",
    englishTerm: "Accord and Satisfaction",
    relatedTerms: ["Novasi", "Schuldvernieuwing", "Debt Substitution"]
  },
  {
    id: 697,
    term: "Accrual Basis",
    category: "perusahaan",
    definition: "Pencatatan transaksi pada saat terjadinya, bukan saat kas diterima",
    example: "Mencatat penjualan saat penyerahan barang meski belum dibayar",
    legalBasis: "Standar Akuntansi",
    englishTerm: "Accrual Basis",
    relatedTerms: ["Basis Akrual", "Toerekeningsbeginsel", "Accrual Accounting"]
  },
  {
    id: 698,
    term: "Accumulated Profits",
    category: "perusahaan",
    definition: "Laba yang ditahan dan tidak dibagikan sebagai dividen",
    example: "Laba ditahan untuk ekspansi usaha",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Retained Earnings",
    relatedTerms: ["Laba Ditahan", "Ingehouden Winst", "Reserves"]
  },
  {
    id: 699,
    term: "Acknowledgment of Debt",
    category: "perikatan",
    definition: "Pengakuan hutang yang dapat memperbaharui daluwarsa",
    example: "Surat pernyataan mengakui masih berhutang",
    legalBasis: "Pasal 1967 KUHPerdata",
    englishTerm: "Acknowledgment of Debt",
    relatedTerms: ["Pengakuan Hutang", "Schulderkenning", "Debt Recognition"]
  },
  {
    id: 700,
    term: "Acquiescence",
    category: "properti",
    definition: "Persetujuan diam-diam melalui sikap tidak keberatan",
    example: "Membiarkan tetangga menggunakan jalan di tanah milik selama bertahun-tahun",
    legalBasis: "Yurisprudensi",
    englishTerm: "Acquiescence",
    relatedTerms: ["Persetujuan Diam", "Stilzwijgende Toestemming", "Implied Consent"]
  },
  {
    id: 701,
    term: "Acquisition Cost",
    category: "properti",
    definition: "Biaya perolehan aset termasuk harga beli dan biaya-biaya lain",
    example: "Harga tanah ditambah biaya notaris dan pajak",
    legalBasis: "Prinsip Akuntansi",
    englishTerm: "Acquisition Cost",
    relatedTerms: ["Biaya Perolehan", "Aanschaffingskosten", "Purchase Price"]
  },
  {
    id: 702,
    term: "Act of God",
    category: "kontrak",
    definition: "Peristiwa alam yang tidak dapat dihindari sebagai force majeure",
    example: "Gempa bumi yang menghancurkan gudang",
    legalBasis: "Pasal 1244-1245 KUHPerdata",
    englishTerm: "Act of God",
    relatedTerms: ["Kehendak Tuhan", "Overmacht", "Force Majeure"]
  },
  {
    id: 703,
    term: "Actionable",
    category: "perbuatan-melawan-hukum",
    definition: "Perbuatan yang dapat dituntut secara hukum",
    example: "Pencemaran nama baik yang dapat digugat ganti rugi",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Actionable",
    relatedTerms: ["Dapat Dituntut", "Vervolgbaar", "Legally Enforceable"]
  },
  {
    id: 704,
    term: "Active Trust",
    category: "perikatan",
    definition: "Trust dimana trustee memiliki kewajiban aktif mengelola",
    example: "Trust untuk mengelola investasi bagi anak di bawah umur",
    legalBasis: "Prinsip Trust",
    englishTerm: "Active Trust",
    relatedTerms: ["Trust Aktif", "Actief Bewind", "Management Trust"]
  },
  {
    id: 705,
    term: "Actual Loss",
    category: "perbuatan-melawan-hukum",
    definition: "Kerugian nyata yang dapat dibuktikan dan dihitung",
    example: "Biaya perbaikan mobil akibat tabrakan",
    legalBasis: "Pasal 1365 KUHPerdata",
    englishTerm: "Actual Loss",
    relatedTerms: ["Kerugian Nyata", "Werkelijke Schade", "Real Damage"]
  },
  {
    id: 706,
    term: "Ad Hoc",
    category: "umum",
    definition: "Dibentuk untuk tujuan khusus dan sementara",
    example: "Komite ad hoc untuk menangani masalah tertentu",
    legalBasis: "Istilah Hukum",
    englishTerm: "Ad Hoc",
    relatedTerms: ["Khusus", "Tijdelijk", "Temporary"]
  },
  {
    id: 707,
    term: "Ad Infinitum",
    category: "kontrak",
    definition: "Tanpa batas waktu atau selamanya",
    example: "Hak cipta yang berlaku ad infinitum",
    legalBasis: "Istilah Hukum",
    englishTerm: "Ad Infinitum",
    relatedTerms: ["Selamanya", "Voor Altijd", "Forever"]
  },
  {
    id: 708,
    term: "Ad Interim",
    category: "perusahaan",
    definition: "Sementara atau untuk sementara waktu",
    example: "Direktur ad interim selama mencari pengganti tetap",
    legalBasis: "Praktik Korporasi",
    englishTerm: "Ad Interim",
    relatedTerms: ["Sementara", "Tijdelijk", "Acting"]
  },
  {
    id: 709,
    term: "Ad Valorem",
    category: "properti",
    definition: "Berdasarkan nilai, biasanya untuk perhitungan pajak",
    example: "Bea meterai ad valorem 0,1% dari nilai transaksi",
    legalBasis: "UU Perpajakan",
    englishTerm: "Ad Valorem",
    relatedTerms: ["Berdasar Nilai", "Naar Waarde", "Value-Based"]
  },
  {
    id: 710,
    term: "Addendum",
    category: "kontrak",
    definition: "Tambahan atau lampiran pada kontrak yang sudah ada",
    example: "Addendum kontrak untuk perubahan spesifikasi",
    legalBasis: "Prinsip Kebebasan Berkontrak",
    englishTerm: "Addendum",
    relatedTerms: ["Tambahan", "Bijlage", "Amendment"]
  },
  {
    id: 711,
    term: "Adequate Consideration",
    category: "kontrak",
    definition: "Imbalan yang cukup dan wajar dalam kontrak",
    example: "Harga pasar wajar untuk jual beli tanah",
    legalBasis: "Pasal 1320 KUHPerdata",
    englishTerm: "Adequate Consideration",
    relatedTerms: ["Imbalan Wajar", "Redelijke Tegenprestatie", "Fair Value"]
  },
  {
    id: 712,
    term: "Adhesion Contract",
    category: "kontrak",
    definition: "Kontrak baku yang tidak dapat dinegosiasikan",
    example: "Polis asuransi standard yang tidak bisa diubah",
    legalBasis: "UU No. 8/1999",
    englishTerm: "Adhesion Contract",
    relatedTerms: ["Kontrak Baku", "Standaardcontract", "Standard Form Contract"],
    trending: true
  },
  {
    id: 713,
    term: "Adjacent Property",
    category: "properti",
    definition: "Properti yang berbatasan langsung",
    example: "Tanah tetangga yang berbatasan dengan tanah milik",
    legalBasis: "Pasal 625-672 KUHPerdata",
    englishTerm: "Adjacent Property",
    relatedTerms: ["Properti Bersebelahan", "Aangrenzend Eigendom", "Neighboring Land"]
  },
  {
    id: 714,
    term: "Adjudication",
    category: "umum",
    definition: "Proses pengambilan keputusan oleh pengadilan",
    example: "Adjudikasi sengketa kontrak di pengadilan",
    legalBasis: "HIR/RBg",
    englishTerm: "Adjudication",
    relatedTerms: ["Pemutusan", "Beslechting", "Judicial Decision"]
  },
  {
    id: 715,
    term: "Adjustment",
    category: "kontrak",
    definition: "Penyesuaian nilai atau kondisi dalam kontrak",
    example: "Penyesuaian harga karena inflasi",
    legalBasis: "Prinsip Rebus Sic Stantibus",
    englishTerm: "Adjustment",
    relatedTerms: ["Penyesuaian", "Aanpassing", "Modification"]
  },
  {
    id: 716,
    term: "Administrative Act",
    category: "umum",
    definition: "Tindakan hukum oleh organ administrasi",
    example: "Penerbitan izin usaha oleh pemerintah",
    legalBasis: "UU Administrasi Pemerintahan",
    englishTerm: "Administrative Act",
    relatedTerms: ["Tindakan Administrasi", "Bestuursdaad", "Government Action"]
  },
  {
    id: 717,
    term: "Adoption",
    category: "keluarga",
    definition: "Pengangkatan anak secara hukum",
    example: "Adopsi anak melalui penetapan pengadilan",
    legalBasis: "PP No. 54/2007",
    englishTerm: "Adoption",
    relatedTerms: ["Adopsi", "Adoptie", "Pengangkatan Anak"]
  },
  {
    id: 718,
    term: "Advance Payment",
    category: "kontrak",
    definition: "Pembayaran di muka sebelum penyerahan barang/jasa",
    example: "DP 30% untuk pembelian rumah",
    legalBasis: "Prinsip Kontrak",
    englishTerm: "Advance Payment",
    relatedTerms: ["Uang Muka", "Voorschot", "Down Payment"]
  },
  {
    id: 719,
    term: "Adverse Claim",
    category: "properti",
    definition: "Tuntutan yang bertentangan dengan kepemilikan",
    example: "Klaim kepemilikan tanah oleh pihak ketiga",
    legalBasis: "Pasal 1977 KUHPerdata",
    englishTerm: "Adverse Claim",
    relatedTerms: ["Klaim Berlawanan", "Tegenspraak", "Conflicting Claim"]
  },
  {
    id: 720,
    term: "Adverse Possession",
    category: "properti",
    definition: "Perolehan hak milik melalui penguasaan terus menerus",
    example: "Menguasai tanah selama 20 tahun dengan itikad baik",
    legalBasis: "Pasal 1963 KUHPerdata",
    englishTerm: "Adverse Possession",
    relatedTerms: ["Acquisitive Prescription", "Verkrijgende Verjaring", "Usucapio"]
  },
  {
    id: 721,
    term: "Advisory Opinion",
    category: "umum",
    definition: "Pendapat hukum yang bersifat nasihat",
    example: "Legal opinion dari konsultan hukum",
    legalBasis: "Praktik Hukum",
    englishTerm: "Advisory Opinion",
    relatedTerms: ["Pendapat Hukum", "Rechtsadvies", "Legal Opinion"]
  },
  {
    id: 722,
    term: "Affidavit",
    category: "pembuktian",
    definition: "Pernyataan tertulis di bawah sumpah",
    example: "Surat pernyataan dibuat di hadapan notaris",
    legalBasis: "HIR/RBg",
    englishTerm: "Affidavit",
    relatedTerms: ["Surat Pernyataan", "Beëdigde Verklaring", "Sworn Statement"]
  },
  {
    id: 723,
    term: "Affiliated Company",
    category: "perusahaan",
    definition: "Perusahaan yang memiliki hubungan kepemilikan atau pengendalian",
    example: "Anak perusahaan dan perusahaan induk",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Affiliated Company",
    relatedTerms: ["Perusahaan Afiliasi", "Verbonden Onderneming", "Related Company"]
  },
  {
    id: 724,
    term: "Affirmative Covenant",
    category: "kontrak",
    definition: "Janji untuk melakukan sesuatu dalam kontrak",
    example: "Kewajiban memelihara properti yang disewa",
    legalBasis: "Prinsip Kontrak",
    englishTerm: "Affirmative Covenant",
    relatedTerms: ["Janji Positif", "Positieve Verbintenis", "Positive Obligation"]
  },
  {
    id: 725,
    term: "After-Acquired Property",
    category: "properti",
    definition: "Harta yang diperoleh setelah waktu tertentu",
    example: "Harta yang diperoleh setelah perkawinan",
    legalBasis: "Pasal 35 UU No. 1/1974",
    englishTerm: "After-Acquired Property",
    relatedTerms: ["Harta Perolehan", "Later Verkregen Goed", "Subsequently Acquired"]
  },
  {
    id: 726,
    term: "Agency by Estoppel",
    category: "kontrak",
    definition: "Keagenan yang timbul karena tindakan yang menimbulkan kepercayaan",
    example: "Bertindak seolah-olah sebagai agen sehingga pihak ketiga percaya",
    legalBasis: "Yurisprudensi",
    englishTerm: "Agency by Estoppel",
    relatedTerms: ["Keagenan Semu", "Schijnvolmacht", "Apparent Authority"]
  },
  {
    id: 727,
    term: "Agency by Necessity",
    category: "kontrak",
    definition: "Keagenan yang timbul karena keadaan darurat",
    example: "Kapten kapal menjual muatan untuk biaya perbaikan darurat",
    legalBasis: "KUHD",
    englishTerm: "Agency by Necessity",
    relatedTerms: ["Keagenan Darurat", "Noodvolmacht", "Emergency Authority"]
  },
  {
    id: 728,
    term: "Aggregate Amount",
    category: "perikatan",
    definition: "Jumlah keseluruhan atau total",
    example: "Total hutang termasuk pokok dan bunga",
    legalBasis: "Prinsip Hitung-hitungan",
    englishTerm: "Aggregate Amount",
    relatedTerms: ["Jumlah Total", "Totaalbedrag", "Total Sum"]
  },
  {
    id: 729,
    term: "Agreed Value",
    category: "kontrak",
    definition: "Nilai yang disepakati oleh para pihak",
    example: "Nilai pertanggungan yang disepakati dalam polis",
    legalBasis: "Prinsip Kesepakatan",
    englishTerm: "Agreed Value",
    relatedTerms: ["Nilai Kesepakatan", "Overeengekomen Waarde", "Stipulated Value"]
  },
  {
    id: 730,
    term: "Agreement to Agree",
    category: "kontrak",
    definition: "Kesepakatan untuk membuat kesepakatan di masa depan",
    example: "MoU untuk negosiasi kontrak definitif",
    legalBasis: "Pasal 1338 KUHPerdata",
    englishTerm: "Agreement to Agree",
    relatedTerms: ["Pra-Kontrak", "Voorovereenkomst", "Preliminary Agreement"]
  },
  {
    id: 731,
    term: "Aleatory Contract",
    category: "kontrak",
    definition: "Kontrak yang prestasinya tergantung pada peristiwa tidak pasti",
    example: "Kontrak asuransi atau perjudian yang sah",
    legalBasis: "Pasal 1774 KUHPerdata",
    englishTerm: "Aleatory Contract",
    relatedTerms: ["Kontrak Untung-untungan", "Kansovereenkomst", "Contract of Chance"]
  },
  {
    id: 732,
    term: "Alienation",
    category: "properti",
    definition: "Pemindahan hak milik kepada pihak lain",
    example: "Penjualan atau hibah tanah",
    legalBasis: "Pasal 584 KUHPerdata",
    englishTerm: "Alienation",
    relatedTerms: ["Pengalihan", "Vervreemding", "Transfer"]
  },
  {
    id: 733,
    term: "Alimony",
    category: "keluarga",
    definition: "Tunjangan nafkah setelah perceraian",
    example: "Kewajiban suami memberi nafkah kepada mantan istri",
    legalBasis: "Pasal 41 UU No. 1/1974",
    englishTerm: "Alimony",
    relatedTerms: ["Nafkah", "Alimentatie", "Maintenance"]
  },
  {
    id: 734,
    term: "All Risk Insurance",
    category: "kontrak",
    definition: "Asuransi yang menanggung segala risiko kecuali yang dikecualikan",
    example: "Asuransi kendaraan all risk",
    legalBasis: "Polis Asuransi",
    englishTerm: "All Risk Insurance",
    relatedTerms: ["Asuransi Segala Risiko", "Alle Risico Verzekering", "Comprehensive Coverage"]
  },
  {
    id: 735,
    term: "Allonge",
    category: "kontrak",
    definition: "Lembaran tambahan yang dilekatkan pada surat berharga",
    example: "Lembaran tambahan untuk endosemen pada wesel",
    legalBasis: "KUHD",
    englishTerm: "Allonge",
    relatedTerms: ["Lembaran Tambahan", "Aanhangsel", "Attachment"]
  },
  {
    id: 736,
    term: "Allotment",
    category: "perusahaan",
    definition: "Penjatahan saham dalam penawaran umum",
    example: "Allotment saham IPO kepada investor",
    legalBasis: "UU Pasar Modal",
    englishTerm: "Allotment",
    relatedTerms: ["Penjatahan", "Toewijzing", "Share Allocation"]
  },
  {
    id: 737,
    term: "Alluvion",
    category: "properti",
    definition: "Tanah yang terbentuk dari endapan sungai atau laut",
    example: "Tanah baru dari endapan lumpur di tepi sungai",
    legalBasis: "Pasal 596-597 KUHPerdata",
    englishTerm: "Alluvion",
    relatedTerms: ["Tanah Timbul", "Aanslibbing", "Accretion"]
  },
  {
    id: 738,
    term: "Alteration",
    category: "kontrak",
    definition: "Perubahan pada dokumen yang dapat mempengaruhi keabsahan",
    example: "Perubahan jumlah pada cek tanpa persetujuan",
    legalBasis: "KUHD",
    englishTerm: "Alteration",
    relatedTerms: ["Perubahan", "Wijziging", "Modification"]
  },
  {
    id: 739,
    term: "Alternative Dispute Resolution",
    category: "umum",
    definition: "Penyelesaian sengketa di luar pengadilan",
    example: "Mediasi atau arbitrase untuk sengketa bisnis",
    legalBasis: "UU No. 30/1999",
    englishTerm: "Alternative Dispute Resolution",
    relatedTerms: ["ADR", "Alternatieve Geschilbeslechting", "Penyelesaian Alternatif"]
  },
  {
    id: 740,
    term: "Amalgamation",
    category: "perusahaan",
    definition: "Penggabungan dua atau lebih perusahaan menjadi satu",
    example: "Merger bank-bank menjadi satu entitas baru",
    legalBasis: "UU No. 40/2007",
    englishTerm: "Amalgamation",
    relatedTerms: ["Penggabungan", "Samensmelting", "Merger"]
  },
  {
    id: 741,
    term: "Amending Agreement",
    category: "kontrak",
    definition: "Perjanjian yang mengubah perjanjian sebelumnya",
    example: "Addendum untuk mengubah syarat pembayaran",
    legalBasis: "Pasal 1338 KUHPerdata",
    englishTerm: "Amending Agreement",
    relatedTerms: ["Perjanjian Perubahan", "Wijzigingsovereenkomst", "Amendment"]
  },
  {
    id: 742,
    term: "Amicable Settlement",
    category: "umum",
    definition: "Penyelesaian sengketa secara damai",
    example: "Mediasi untuk menyelesaikan sengketa tanpa ke pengadilan",
    legalBasis: "UU No. 30/1999",
    englishTerm: "Amicable Settlement",
    relatedTerms: ["Penyelesaian Damai", "Minnelijke Schikking", "Peaceful Resolution"]
  },
  {
    id: 743,
    term: "Amortization",
    category: "perikatan",
    definition: "Pelunasan hutang secara bertahap atau penyusutan nilai",
    example: "Pembayaran cicilan KPR selama 15 tahun",
    legalBasis: "Praktik Keuangan",
    englishTerm: "Amortization",
    relatedTerms: ["Amortisasi", "Aflossing", "Gradual Payment"]
  }
  ]
}

export interface LegalTerm {
  id: number;
  term: string;
  category: LegalTermCategory;
  definition: string;
  example: string;
  legalBasis: string;
  englishTerm: string;
  relatedTerms: string[];
  trending?: boolean;
}

// Export the terms array with proper typing
export const legalTerms: LegalTerm[] = istilahPerdataData.terms as LegalTerm[];

// Utility functions for searching and filtering
export const searchLegalTerms = (searchTerm: string): LegalTerm[] => {
  const lowercaseSearch = searchTerm.toLowerCase();
  return istilahPerdataData.terms.filter(term => 
    term.term.toLowerCase().includes(lowercaseSearch) ||
    term.definition.toLowerCase().includes(lowercaseSearch) ||
    term.englishTerm.toLowerCase().includes(lowercaseSearch) ||
    term.relatedTerms.some(related => related.toLowerCase().includes(lowercaseSearch))
  ) as LegalTerm[];
};

export const getLegalTermsByCategory = (category: LegalTermCategory): LegalTerm[] => {
  return istilahPerdataData.terms.filter(term => term.category === category) as LegalTerm[];
};

export const getTrendingLegalTerms = (): LegalTerm[] => {
  return istilahPerdataData.terms.filter(term => term.trending === true) as LegalTerm[];
};

export const getLegalTermById = (id: number): LegalTerm | undefined => {
  return istilahPerdataData.terms.find(term => term.id === id) as LegalTerm | undefined;
};

export const getRandomLegalTerm = (): LegalTerm => {
  const randomIndex = Math.floor(Math.random() * istilahPerdataData.terms.length);
  return istilahPerdataData.terms[randomIndex] as LegalTerm;
};

// Category counts for statistics
export const getCategoryCounts = (): Record<LegalTermCategory, number> => {
  const counts: Record<string, number> = {};
  istilahPerdataData.terms.forEach(term => {
    counts[term.category] = (counts[term.category] || 0) + 1;
  });
  return counts as Record<LegalTermCategory, number>;
};

// Get all unique legal bases
export const getAllLegalBases = (): string[] => {
  const bases = new Set<string>();
  istilahPerdataData.terms.forEach(term => {
    bases.add(term.legalBasis);
  });
  return Array.from(bases).sort();
};

// Get related terms for a specific term
export const getRelatedTermsFor = (termId: number): LegalTerm[] => {
  const term = getLegalTermById(termId);
  if (!term) return [];
  
  return istilahPerdataData.terms.filter(t => 
    t.id !== termId && (
      term.relatedTerms.includes(t.term) ||
      term.relatedTerms.includes(t.englishTerm) ||
      t.relatedTerms.includes(term.term) ||
      t.relatedTerms.includes(term.englishTerm)
    )
  ) as LegalTerm[];
};

// Export metadata
export const legalTermsMetadata = {
  totalTerms: istilahPerdataData.terms.length,
  categories: Array.from(new Set(istilahPerdataData.terms.map(term => term.category))),
  lastUpdated: new Date().toISOString(),
  version: "1.0.0",
  source: "KUHPerdata dan Peraturan Perundang-undangan Indonesia"
};

// Default export
export default istilahPerdataData.terms;
