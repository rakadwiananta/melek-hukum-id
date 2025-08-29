'use client'

import React, { useEffect, useState } from 'react'
import { HelpCircle, Users, Globe, BookOpen, ChevronDown, Search, Filter, Star, Shield, Scale, Gavel, FileText, Award, Building, UserCheck, Heart, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FAQ Page dengan desain Nusantara dan 50 FAQ komprehensif
 */

/* -------------------- Helper: World Bank hook -------------------- */
function useWorldBankIndonesiaStats() {
  const [internetPercent, setInternetPercent] = useState<number | null>(null)
  const [internetYear, setInternetYear] = useState<number | null>(null)
  const [population, setPopulation] = useState<number | null>(null)
  const [populationYear, setPopulationYear] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchIndicator(countryCode: string, indicator: string): Promise<any> {
      const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&per_page=500`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json
    }

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const internetData = await fetchIndicator('IDN', 'IT.NET.USER.ZS')
        const popData = await fetchIndicator('IDN', 'SP.POP.TOTL')

        if (!mounted) return

        const internetArray = Array.isArray(internetData) && Array.isArray(internetData[1]) ? internetData[1] : []
        const popArray = Array.isArray(popData) && Array.isArray(popData[1]) ? popData[1] : []

        const internetEntry = internetArray.find((e: any) => e && e.value !== null)
        const popEntry = popArray.find((e: any) => e && e.value !== null)

        if (internetEntry) {
          setInternetPercent(Math.round(internetEntry.value * 10) / 10)
          setInternetYear(internetEntry.date)
        }

        if (popEntry) {
          setPopulation(Math.round(popEntry.value))
          setPopulationYear(popEntry.date)
        }
      } catch (err) {
        console.error('World Bank API error:', err)
        if (mounted) {
          setError('Failed to load statistics')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  return { internetPercent, internetYear, population, populationYear, loading, error }
}

// Komponen Background dengan Pattern Batik
function NusantaraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Batik Pattern SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="batik-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Kawung Pattern */}
            <circle cx="30" cy="30" r="20" fill="none" stroke="#8B4513" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="90" cy="30" r="20" fill="none" stroke="#D2691E" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="30" cy="90" r="20" fill="none" stroke="#CD853F" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="90" cy="90" r="20" fill="none" stroke="#A0522D" strokeWidth="1.5" opacity="0.4"/>
            
            {/* Center ornament */}
            <circle cx="60" cy="60" r="8" fill="#8B4513" opacity="0.2"/>
            <rect x="55" y="20" width="10" height="80" fill="#D2691E" opacity="0.1" transform="rotate(45 60 60)"/>
            <rect x="55" y="20" width="10" height="80" fill="#CD853F" opacity="0.1" transform="rotate(-45 60 60)"/>
          </pattern>
          
          {/* Gradient untuk overlay */}
          <linearGradient id="nusantara-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" stopOpacity="0.05"/>
            <stop offset="50%" stopColor="#D2691E" stopOpacity="0.03"/>
            <stop offset="100%" stopColor="#CD853F" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-pattern)" />
        <rect width="100%" height="100%" fill="url(#nusantara-gradient)" />
      </svg>
      
      {/* Ornamen Tambahan */}
      <div className="absolute top-10 left-10 animate-pulse">
        <Scale className="h-12 w-12 md:h-16 md:w-16 text-yellow-700 opacity-15" />
      </div>
      <div className="absolute top-20 right-10 md:right-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <Shield className="h-10 w-10 md:h-12 md:w-12 text-red-800 opacity-15" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-pulse" style={{ animationDelay: '2s' }}>
        <Gavel className="h-11 w-11 md:h-14 md:w-14 text-yellow-800 opacity-15" />
      </div>
      <div className="absolute bottom-10 right-1/3 animate-pulse" style={{ animationDelay: '3s' }}>
        <FileText className="h-10 w-10 md:h-13 md:w-13 text-orange-800 opacity-15" />
      </div>
    </div>
  )
}

// Komponen Statistik dengan Desain Nusantara
function StatisticsSection() {
  const { internetPercent, internetYear, population, populationYear, loading, error } = useWorldBankIndonesiaStats()

  const stats = [
    {
      icon: Users,
      label: 'Populasi Indonesia',
      value: loading ? 'Memuat...' : error ? '280M' : population ? `${Math.round(population / 1000000)}M` : '280M',
      subtitle: populationYear ? `Data ${populationYear}` : 'World Bank',
      color: 'from-red-600 to-red-700',
      bgPattern: 'bg-red-50'
    },
    {
      icon: Globe,
      label: 'Pengguna Internet',
      value: loading ? 'Memuat...' : error ? '77.8%' : internetPercent ? `${internetPercent}%` : '77.8%',
      subtitle: internetYear ? `Data ${internetYear}` : 'World Bank',
      color: 'from-green-600 to-green-700',
      bgPattern: 'bg-green-50'
    },
    {
      icon: BookOpen,
      label: 'FAQ Tersedia',
      value: '50+',
      subtitle: 'Pertanyaan Terjawab',
      color: 'from-yellow-600 to-amber-600',
      bgPattern: 'bg-yellow-50'
    },
    {
      icon: Scale,
      label: 'Kategori Hukum',
      value: '30+',
      subtitle: 'Bidang Hukum',
      color: 'from-indigo-600 to-blue-600',
      bgPattern: 'bg-blue-50'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bgPattern} rounded-2xl shadow-md hover:shadow-xl p-4 md:p-6 text-center transition-all duration-300 border border-gray-100`}
        >
          <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
            <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-xs md:text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
          <div className="text-xs text-gray-500">{stat.subtitle}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Data 50 FAQ Komprehensif
const faqCategories = [
  {
    name: "Umum",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    faqs: [
      {
        question: "Apa itu Kamus Hukum Indonesia?",
        answer: "Kamus Hukum Indonesia adalah platform digital yang menyediakan kumpulan istilah-istilah hukum yang berlaku di Indonesia, disusun secara sistematis dan alfabetis. Platform ini dirancang untuk membantu masyarakat umum, mahasiswa hukum, praktisi hukum, dan siapa saja yang membutuhkan pemahaman tentang terminologi hukum dengan penjelasan yang mudah dipahami dalam bahasa Indonesia."
      },
      {
        question: "Siapa saja yang dapat menggunakan Kamus Hukum ini?",
        answer: "Kamus Hukum ini dapat digunakan oleh semua kalangan, mulai dari masyarakat umum yang ingin memahami istilah hukum, mahasiswa fakultas hukum, dosen, advokat, notaris, hakim, jaksa, polisi, konsultan hukum, hingga peneliti dan akademisi. Platform ini dirancang user-friendly untuk berbagai tingkat pemahaman hukum."
      },
      {
        question: "Apakah penggunaan Kamus Hukum ini gratis?",
        answer: "Ya, penggunaan dasar Kamus Hukum ini sepenuhnya gratis. Anda dapat mengakses ribuan istilah hukum, definisi, dan penjelasan tanpa biaya. Kami berkomitmen untuk memberikan akses pendidikan hukum kepada seluruh masyarakat Indonesia sebagai bentuk kontribusi dalam meningkatkan literasi hukum nasional."
      },
      {
        question: "Bagaimana cara mencari istilah hukum tertentu?",
        answer: "Anda dapat menggunakan fitur pencarian di halaman utama dengan mengetikkan kata kunci istilah yang dicari. Sistem akan menampilkan hasil yang relevan secara otomatis. Anda juga bisa menggunakan filter kategori seperti hukum pidana, perdata, tata negara, atau browse secara alfabetis untuk menemukan istilah yang diinginkan."
      },
      {
        question: "Apakah tersedia dalam bahasa daerah?",
        answer: "Saat ini Kamus Hukum utamanya tersedia dalam Bahasa Indonesia. Namun, untuk istilah-istilah hukum adat dari berbagai daerah di Nusantara, kami menyediakan penjelasan khusus beserta konteks budaya dan terjemahan dalam bahasa daerah yang relevan seperti Jawa, Sunda, Minang, Batak, dan lainnya."
      }
    ]
  },
  {
    name: "Konten & Sumber",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-50",
    faqs: [
      {
        question: "Dari mana sumber definisi dalam Kamus Hukum ini?",
        answer: "Definisi dalam Kamus Hukum ini bersumber dari berbagai referensi terpercaya seperti Kitab Undang-Undang Hukum Pidana (KUHP), KUHPerdata, Undang-Undang yang berlaku, Peraturan Pemerintah, Peraturan Mahkamah Agung, literatur hukum dari pakar hukum Indonesia, kamus hukum resmi yang diterbitkan pemerintah, serta yurisprudensi Mahkamah Agung dan Mahkamah Konstitusi."
      },
      {
        question: "Seberapa akurat informasi dalam kamus ini?",
        answer: "Informasi dalam kamus ini sangat akurat karena melalui proses verifikasi berlapis. Setiap definisi direview oleh tim ahli hukum yang berpengalaman, cross-check dengan sumber hukum primer, dan diperbarui sesuai perkembangan hukum terkini. Namun, untuk keperluan litigasi formal, selalu disarankan merujuk langsung ke sumber hukum primer."
      },
      {
        question: "Apakah kamus ini mencakup hukum adat?",
        answer: "Ya, kamus ini mencakup istilah-istilah hukum adat dari berbagai daerah di Indonesia. Kami mengakui pentingnya hukum adat dalam sistem hukum Indonesia dan menyediakan penjelasan komprehensif tentang konsep-konsep hukum adat seperti awig-awig di Bali, sasi di Maluku, pantun adat Minangkabau, dan berbagai sistem hukum adat lainnya."
      },
      {
        question: "Bagaimana dengan istilah hukum dalam bahasa asing?",
        answer: "Kamus ini menyediakan istilah hukum dalam bahasa asing (Latin, Inggris, Belanda) yang umum digunakan dalam praktik hukum Indonesia. Setiap istilah asing dilengkapi dengan terjemahan, pelafalan, etimologi, dan contoh penggunaan dalam konteks hukum Indonesia."
      },
      {
        question: "Apakah tersedia contoh kasus untuk setiap istilah?",
        answer: "Untuk istilah-istilah penting, kami menyediakan contoh kasus nyata dari putusan pengadilan Indonesia, ilustrasi penerapan dalam kehidupan sehari-hari, dan skenario hipotetis untuk memudahkan pemahaman. Contoh kasus dipilih dari yurisprudensi yang telah berkekuatan hukum tetap."
      }
    ]
  },
  {
    name: "Fitur & Layanan",
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    faqs: [
      {
        question: "Fitur apa saja yang tersedia dalam Kamus Hukum?",
        answer: "Kamus Hukum menyediakan berbagai fitur: pencarian cepat dengan auto-complete, filter berdasarkan kategori hukum, bookmark istilah favorit, riwayat pencarian, mode offline untuk istilah yang sudah diunduh, audio pronunciation untuk istilah asing, visualisasi hubungan antar istilah, kalkulator denda/bunga, template dokumen hukum sederhana, dan forum diskusi komunitas."
      },
      {
        question: "Apakah ada aplikasi mobile?",
        answer: "Ya, Kamus Hukum tersedia dalam versi mobile yang dapat diakses melalui browser smartphone Anda. Website kami fully responsive dan mobile-friendly. Aplikasi native untuk Android dan iOS sedang dalam pengembangan dan akan segera tersedia di Play Store dan App Store."
      },
      {
        question: "Bisakah saya menyimpan istilah favorit?",
        answer: "Tentu saja! Dengan membuat akun gratis, Anda dapat menyimpan istilah favorit, membuat catatan pribadi pada setiap istilah, mengatur istilah dalam folder khusus, dan mengaksesnya kapan saja dari perangkat mana pun. Fitur sinkronisasi cloud memastikan data Anda aman dan selalu terupdate."
      },
      {
        question: "Apakah tersedia mode offline?",
        answer: "Ya, kami menyediakan fitur download untuk penggunaan offline. Anda dapat mengunduh paket istilah berdasarkan kategori atau keseluruhan database untuk diakses tanpa koneksi internet. Update konten akan dilakukan otomatis saat Anda terhubung kembali ke internet."
      },
      {
        question: "Bagaimana dengan fitur terjemahan?",
        answer: "Kamus Hukum menyediakan terjemahan istilah hukum Indonesia ke bahasa Inggris dan sebaliknya. Ini sangat membantu untuk dokumen hukum internasional, kontrak dengan pihak asing, atau studi komparatif hukum. Terjemahan dilakukan oleh ahli hukum yang menguasai kedua bahasa."
      }
    ]
  },
  {
    name: "Hukum Pidana",
    icon: Gavel,
    color: "text-red-600",
    bgColor: "bg-red-50",
    faqs: [
      {
        question: "Apa perbedaan antara tindak pidana dan pelanggaran?",
        answer: "Tindak pidana (kejahatan) adalah perbuatan yang dilarang oleh undang-undang pidana dengan ancaman pidana yang lebih berat, biasanya diatur dalam Buku II KUHP. Pelanggaran adalah perbuatan yang lebih ringan, diatur dalam Buku III KUHP dengan ancaman pidana yang lebih ringan. Perbedaan utama terletak pada bobot perbuatan, ancaman pidana, dan proses hukumnya."
      },
      {
        question: "Apa yang dimaksud dengan asas legalitas dalam hukum pidana?",
        answer: "Asas legalitas (nullum delictum nulla poena sine praevia lege poenali) berarti tidak ada perbuatan yang dapat dipidana kecuali berdasarkan ketentuan perundang-undangan pidana yang telah ada sebelumnya. Asas ini tercantum dalam Pasal 1 ayat (1) KUHP dan merupakan perlindungan fundamental bagi warga negara dari kesewenang-wenangan penguasa."
      },
      {
        question: "Bagaimana sistem pemidanaan di Indonesia?",
        answer: "Sistem pemidanaan Indonesia mengenal pidana pokok (mati, penjara, kurungan, denda, tutupan) dan pidana tambahan (pencabutan hak tertentu, perampasan barang tertentu, pengumuman putusan hakim). RKUHP yang baru menambahkan pidana kerja sosial dan pembinaan sebagai alternatif. Hakim memiliki diskresi dalam menentukan pidana dengan mempertimbangkan hal-hal yang memberatkan dan meringankan."
      },
      {
        question: "Apa itu restorative justice?",
        answer: "Restorative justice adalah pendekatan penyelesaian perkara pidana dengan melibatkan pelaku, korban, keluarga, dan masyarakat untuk mencari solusi pemulihan, bukan pembalasan. Di Indonesia, konsep ini diterapkan dalam sistem peradilan pidana anak, diversi, dan mulai dikembangkan untuk tindak pidana ringan tertentu dengan fokus pada pemulihan kerugian korban dan reintegrasi pelaku."
      },
      {
        question: "Bagaimana proses penahanan dalam hukum pidana?",
        answer: "Penahanan dapat dilakukan oleh penyidik (20 hari + perpanjangan 40 hari), penuntut umum (20 hari + perpanjangan 30 hari), dan hakim (30 hari + perpanjangan 60/90 hari). Syarat penahanan: tindak pidana diancam 5 tahun atau lebih, atau tindak pidana tertentu, serta ada kekhawatiran tersangka melarikan diri, merusak barang bukti, atau mengulangi tindak pidana."
      }
    ]
  },
  {
    name: "Hukum Perdata",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    faqs: [
      {
        question: "Apa perbedaan hukum perdata dan hukum pidana?",
        answer: "Hukum perdata mengatur hubungan antar individu/badan hukum dalam masyarakat (kontrak, kepemilikan, keluarga), dengan sanksi berupa ganti rugi atau pemenuhan prestasi. Hukum pidana mengatur perbuatan yang dilarang negara dengan sanksi pidana. Dalam perdata, inisiatif dari pihak yang dirugikan; dalam pidana, negara yang menuntut melalui jaksa penuntut umum."
      },
      {
        question: "Bagaimana syarat sahnya perjanjian menurut KUHPerdata?",
        answer: "Menurut Pasal 1320 KUHPerdata, syarat sah perjanjian ada empat: (1) Sepakat mereka yang mengikatkan diri - tidak ada paksaan, kekhilafan, atau penipuan; (2) Kecakapan untuk membuat perikatan - dewasa dan tidak di bawah pengampuan; (3) Suatu hal tertentu - objek perjanjian jelas; (4) Suatu sebab yang halal - tidak bertentangan dengan undang-undang, kesusilaan, dan ketertiban umum."
      },
      {
        question: "Apa yang dimaksud dengan wanprestasi?",
        answer: "Wanprestasi adalah tidak dipenuhinya prestasi atau kewajiban sebagaimana mestinya yang dibebankan oleh kontrak. Bentuk wanprestasi: tidak melakukan prestasi sama sekali, melakukan prestasi tapi terlambat, melakukan prestasi tapi tidak sempurna, atau melakukan yang dilarang dalam kontrak. Akibat hukumnya: ganti rugi, pembatalan kontrak, peralihan risiko, dan kemungkinan membayar biaya perkara."
      },
      {
        question: "Bagaimana pembagian harta dalam perceraian?",
        answer: "Harta bersama (gono-gini) yang diperoleh selama perkawinan dibagi sama rata 50:50, kecuali diperjanjikan lain dalam perjanjian kawin. Harta bawaan masing-masing tetap menjadi milik pribadi. Untuk perkawinan Islam, berlaku Kompilasi Hukum Islam. Hutang bersama juga dibagi proporsional. Pengadilan dapat menyimpangi pembagian ini dengan pertimbangan khusus demi keadilan."
      },
      {
        question: "Apa saja jenis-jenis hak kebendaan?",
        answer: "Hak kebendaan meliputi: hak milik (eigendom) - hak terkuat dan terpenuh; hak guna bangunan - membangun di atas tanah orang lain; hak guna usaha - mengusahakan tanah negara; hak pakai - menggunakan/memungut hasil; hak sewa; hak tanggungan - jaminan atas tanah; gadai; fidusia; dan hak retensi. Masing-masing memiliki karakteristik dan perlindungan hukum berbeda."
      }
    ]
  },
  {
    name: "Hukum Tata Negara",
    icon: Building,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    faqs: [
      {
        question: "Apa saja sumber hukum tata negara Indonesia?",
        answer: "Sumber hukum tata negara Indonesia meliputi: UUD 1945 sebagai hukum dasar tertulis; Pancasila sebagai sumber dari segala sumber hukum; Ketetapan MPR yang masih berlaku; Undang-Undang/Perpu; Peraturan Pemerintah; Peraturan Presiden; Peraturan Daerah; konvensi ketatanegaraan; yurisprudensi Mahkamah Konstitusi; doktrin ahli hukum tata negara; dan hukum internasional yang telah diratifikasi."
      },
      {
        question: "Bagaimana hierarki peraturan perundang-undangan di Indonesia?",
        answer: "Berdasarkan UU No. 12/2011 jo. UU No. 15/2019, hierarkinya: (1) UUD 1945; (2) Tap MPR; (3) UU/Perpu; (4) Peraturan Pemerintah; (5) Peraturan Presiden; (6) Perda Provinsi; (7) Perda Kabupaten/Kota. Asas lex superior derogat legi inferiori berlaku, dimana peraturan yang lebih tinggi mengesampingkan yang lebih rendah jika bertentangan."
      },
      {
        question: "Apa kewenangan Mahkamah Konstitusi?",
        answer: "MK berwenang: menguji UU terhadap UUD 1945; memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan UUD; memutus pembubaran partai politik; memutus perselisihan hasil pemilu dan pilkada; memberikan putusan atas pendapat DPR mengenai dugaan pelanggaran Presiden/Wapres. MK juga wajib memberi putusan atas pendapat DPR untuk impeachment."
      },
      {
        question: "Bagaimana sistem pemerintahan Indonesia?",
        answer: "Indonesia menganut sistem presidensial dengan ciri: Presiden sebagai kepala negara dan kepala pemerintahan; Presiden dipilih langsung oleh rakyat; Presiden tidak bertanggung jawab kepada parlemen; Presiden tidak dapat membubarkan parlemen; ada pemisahan kekuasaan yang jelas antara eksekutif, legislatif, dan yudikatif dengan sistem checks and balances."
      },
      {
        question: "Apa yang dimaksud dengan judicial review?",
        answer: "Judicial review adalah kewenangan lembaga yudikatif untuk menguji peraturan perundang-undangan. Di Indonesia: MK menguji UU terhadap UUD 1945 (constitutional review); MA menguji peraturan di bawah UU terhadap UU (legislative review). Tujuannya memastikan hierarki dan harmonisasi peraturan serta melindungi hak konstitusional warga negara."
      }
    ]
  },
  {
    name: "Hukum Bisnis",
    icon: Briefcase,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    faqs: [
      {
        question: "Apa saja jenis badan usaha di Indonesia?",
        answer: "Jenis badan usaha di Indonesia: Perseroan Terbatas (PT) - PT Tertutup dan PT Terbuka/Tbk; Perseroan Komanditer (CV); Firma (Fa); Koperasi; Yayasan (nirlaba); Persero dan Perum (BUMN); Badan Usaha Milik Daerah (BUMD); dan Usaha Perorangan. Sejak 2021, ada juga PT Perorangan untuk UMKM dengan modal di bawah 5 miliar rupiah."
      },
      {
        question: "Bagaimana prosedur pendirian PT?",
        answer: "Prosedur pendirian PT: (1) Pemesanan nama PT melalui AHU Online; (2) Pembuatan akta pendirian oleh notaris minimal 2 pendiri; (3) Pengesahan Kemenkumham untuk status badan hukum; (4) Pembuatan NPWP dan SKT; (5) NIB melalui OSS; (6) Pendaftaran BPJS Ketenagakerjaan dan Kesehatan. Modal dasar minimal 50 juta, modal disetor minimal 25% atau 12,5 juta."
      },
      {
        question: "Apa yang dimaksud dengan merger dan akuisisi?",
        answer: "Merger adalah penggabungan dua atau lebih perusahaan menjadi satu entitas baru atau ke salah satu perusahaan yang ada. Akuisisi adalah pengambilalihan kepemilikan saham mayoritas suatu perusahaan oleh perusahaan lain. Keduanya diatur dalam UU PT dan harus memperhatikan UU Persaingan Usaha, dengan kewajiban notifikasi ke KPPU jika memenuhi threshold tertentu."
      },
      {
        question: "Bagaimana perlindungan hukum bagi pemegang saham minoritas?",
        answer: "Perlindungan pemegang saham minoritas meliputi: hak appraisal (minta dibeli sahamnya dengan harga wajar); hak gugat derivatif atas nama perseroan; hak minta pemeriksaan perseroan; hak preemptive dalam penambahan modal; hak mendapat perlakuan sama (equal treatment); hak informasi material; dan perlindungan dalam transaksi benturan kepentingan atau afiliasi."
      },
      {
        question: "Apa saja aspek hukum dalam e-commerce?",
        answer: "Aspek hukum e-commerce meliputi: UU ITE untuk transaksi elektronik; UU Perlindungan Konsumen untuk hak konsumen online; UU Perlindungan Data Pribadi; pajak e-commerce (PPN, PPh); hak kekayaan intelektual untuk konten digital; kontrak elektronik dan tanda tangan digital; penyelesaian sengketa online (ODR); dan kewajiban perizinan untuk marketplace/platform."
      }
    ]
  },
  {
    name: "Hukum Keluarga",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    faqs: [
      {
        question: "Apa syarat sah perkawinan di Indonesia?",
        answer: "Syarat perkawinan menurut UU No. 1/1974 jo. UU No. 16/2019: persetujuan kedua calon mempelai; usia minimal 19 tahun untuk pria dan wanita; izin orangtua jika belum 21 tahun; tidak ada larangan perkawinan; untuk muslim harus memenuhi syarat rukun nikah; dicatatkan di KUA (muslim) atau Kantor Catatan Sipil (non-muslim). Perkawinan sah jika dilakukan menurut hukum agama dan dicatatkan."
      },
      {
        question: "Bagaimana prosedur perceraian di Indonesia?",
        answer: "Perceraian harus melalui pengadilan. Untuk muslim di Pengadilan Agama, non-muslim di Pengadilan Negeri. Prosedur: pengajuan gugatan/permohonan; mediasi wajib; pemeriksaan sidang; putusan; dan akta cerai. Alasan perceraian yang diakui: perzinaan, meninggalkan tempat tinggal 2 tahun berturut-turut, hukuman penjara 5 tahun atau lebih, kekejaman, cacat yang menghalangi kewajiban, perselisihan terus-menerus."
      },
      {
        question: "Apa hak dan kewajiban anak dalam keluarga?",
        answer: "Hak anak: mendapat nama dan kewarganegaraan; pemeliharaan dan pendidikan; perlindungan; nafkah dari orangtua; warisan; tidak didiskriminasi. Kewajiban anak: menghormati orangtua; mentaati perintah yang baik; memelihara orangtua di hari tua jika mampu. Anak di bawah 18 tahun atau belum menikah berada di bawah kekuasaan orangtua."
      },
      {
        question: "Bagaimana pembagian warisan menurut hukum di Indonesia?",
        answer: "Indonesia mengenal 3 sistem waris: (1) Hukum waris Islam - faraidh dengan bagian tertentu untuk ahli waris; (2) Hukum waris perdata/BW - ab intestato (tanpa wasiat) dan testamentair (dengan wasiat), anak dan pasangan sebagai ahli waris utama; (3) Hukum waris adat - bervariasi, ada patrilineal, matrilineal, atau bilateral. Pilihan hukum tergantung agama dan kesepakatan keluarga."
      },
      {
        question: "Apa yang dimaksud dengan harta gono-gini?",
        answer: "Harta gono-gini atau harta bersama adalah harta yang diperoleh selama masa perkawinan, baik dari usaha suami, istri, atau keduanya. Tidak termasuk harta bawaan, warisan, atau hibah pribadi. Saat perceraian, harta gono-gini dibagi sama rata 50:50, kecuali ada perjanjian kawin atau pertimbangan khusus pengadilan. Konsep ini berlaku universal untuk semua perkawinan di Indonesia."
      }
    ]
  },
  {
    name: "Hukum Pertanahan",
    icon: Building,
    color: "text-brown-600",
    bgColor: "bg-yellow-50",
    faqs: [
      {
        question: "Apa saja jenis hak atas tanah di Indonesia?",
        answer: "Jenis hak atas tanah: Hak Milik (HM) - terkuat, turun-temurun, hanya WNI; Hak Guna Usaha (HGU) - mengusahakan tanah negara, maksimal 35+25+35 tahun; Hak Guna Bangunan (HGB) - mendirikan bangunan, maksimal 30+20+30 tahun; Hak Pakai - menggunakan/memungut hasil; Hak Pengelolaan (HPL) - BUMN/BUMD/instansi; Hak Milik Satuan Rumah Susun; Hak Tanggungan; dan Wakaf."
      },
      {
        question: "Bagaimana proses pendaftaran tanah pertama kali?",
        answer: "Pendaftaran tanah pertama kali melalui: (1) Pendaftaran sistematik - massal oleh pemerintah (PTSL/Prona); atau (2) Pendaftaran sporadik - individual. Prosedur: pengukuran bidang tanah; penelitian riwayat tanah; pembuktian hak (girik, letter C, akta jual beli); pengumuman 60 hari; penerbitan sertipikat. Dokumen yang dibutuhkan tergantung alas hak dan status tanah."
      },
      {
        question: "Apa yang dimaksud dengan tanah ulayat?",
        answer: "Tanah ulayat adalah tanah yang berada dalam wilayah masyarakat hukum adat dan merupakan lebensraum para warganya. Dikuasai berdasarkan hukum adat dengan hak ulayat. Ciri: tidak dapat dialihkan ke pihak luar tanpa izin komunitas; ada hubungan religio-magis; penguasaan komunal. Diakui dalam UUPA dengan syarat masih eksis dan tidak bertentangan dengan kepentingan nasional."
      },
      {
        question: "Bagaimana proses peralihan hak atas tanah?",
        answer: "Peralihan hak tanah bisa melalui: (1) Jual beli - akta PPAT, bayar pajak (BPHTB & PPh), balik nama; (2) Hibah - akta PPAT/notaris untuk keluarga; (3) Waris - surat keterangan waris, akta pembagian waris; (4) Lelang - risalah lelang; (5) Tukar menukar; (6) Pemasukan modal perusahaan. Semua harus didaftarkan ke BPN untuk balik nama sertipikat."
      },
      {
        question: "Apa saja yang termasuk dalam pembebasan lahan untuk kepentingan umum?",
        answer: "Pengadaan tanah untuk kepentingan umum meliputi: pertahanan keamanan; jalan umum; waduk/bendungan; pelabuhan/bandara; stasiun/terminal; fasilitas pendidikan/kesehatan pemerintah; pasar tradisional; makam umum; RTH; dan infrastruktur publik lainnya. Prosesnya melalui konsultasi publik, penetapan lokasi, penilaian ganti rugi oleh penilai independen, musyawarah, dan pemberian ganti rugi yang adil."
      }
    ]
  },
  {
    name: "Hukum Teknologi",
    icon: Globe,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    faqs: [
      {
        question: "Apa saja yang diatur dalam UU ITE?",
        answer: "UU ITE mengatur: transaksi elektronik dan tanda tangan digital; perlindungan data pribadi dalam sistem elektronik; domain name dan hak kekayaan intelektual elektronik; perbuatan yang dilarang (hacking, pencemaran nama baik online, penyebaran konten ilegal, penipuan online); yurisdiksi dan penegakan hukum siber; alat bukti elektronik; peran pemerintah dan masyarakat. UU ini telah direvisi untuk menyeimbangkan keamanan siber dengan kebebasan berekspresi."
      },
      {
        question: "Bagaimana kekuatan hukum dokumen elektronik?",
        answer: "Dokumen elektronik memiliki kekuatan hukum yang sah sebagai alat bukti selama: menggunakan sistem elektronik yang andal dan aman; dapat diakses, ditampilkan, dijamin keutuhannya; dapat dipertanggungjawabkan; menggunakan tanda tangan elektronik tersertifikasi untuk dokumen tertentu. Tidak berlaku untuk surat yang menurut UU harus dalam bentuk tertulis (akta notaris, surat berharga, dokumen pertanahan tertentu)."
      },
      {
        question: "Apa yang dimaksud dengan perlindungan data pribadi?",
        answer: "Perlindungan data pribadi adalah perlindungan terhadap data perseorangan yang teridentifikasi. UU PDP mengatur: jenis data pribadi (umum dan spesifik); hak subjek data (akses, koreksi, penghapusan); kewajiban pengendali dan prosesor data; transfer data lintas negara; sanksi administratif dan pidana. Setiap pemrosesan data harus berdasarkan consent, kontrak, kewajiban hukum, kepentingan vital, tugas publik, atau kepentingan sah."
      },
      {
        question: "Bagaimana pertanggungjawaban platform digital?",
        answer: "Platform digital memiliki kewajiban: moderasi konten sesuai ketentuan; take down konten ilegal dalam 24 jam setelah notifikasi; menyediakan mekanisme pelaporan; melindungi data pengguna; membayar pajak; terdaftar sebagai PSE di Kominfo. Pertanggungjawaban mengikuti prinsip safe harbor - tidak bertanggung jawab atas konten user generated selama melakukan moderasi dengan itikad baik."
      },
      {
        question: "Apa saja kejahatan siber yang diatur dalam hukum Indonesia?",
        answer: "Kejahatan siber meliputi: illegal access (hacking); illegal interception (penyadapan ilegal); data interference (merusak data); system interference (merusak sistem); misuse of devices; pencurian identitas; phishing dan penipuan online; penyebaran malware; cyber terrorism; pencemaran nama baik online; penyebaran hoax; pornografi online; perjudian online; dan pelanggaran hak cipta digital. Ancaman pidana bervariasi hingga 12 tahun penjara."
      }
    ]
  }
]

// Flatten semua FAQ untuk pencarian
const allFaqs = faqCategories.flatMap(category => 
  category.faqs.map(faq => ({ ...faq, category: category.name, icon: category.icon, color: category.color }))
)

// Komponen FAQ Item
function FAQItem({ faq, index, isActive, onToggle }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-4 md:px-6 py-4 md:py-5 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset group"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
              {faq.question}
            </h3>
            {faq.category && (
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {faq.category}
              </span>
            )}
          </div>
          <ChevronDown 
            className={`flex-shrink-0 h-5 w-5 text-amber-600 transition-transform duration-300 ${
              isActive ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
              <div className="prose prose-sm md:prose-base max-w-none">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Komponen Tab Kategori
function CategoryTabs({ categories, activeCategory, onCategoryChange }: any) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
          activeCategory === 'all'
            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        Semua FAQ
      </button>
      {categories.map((category: any) => {
        const Icon = category.icon
        return (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1 md:gap-2 ${
              activeCategory === category.name
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Icon className="h-3 w-3 md:h-4 md:w-4" />
            <span>{category.name}</span>
          </button>
        )
      })}
    </div>
  )
}

// Main FAQ Page Component
export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [displayedFaqs, setDisplayedFaqs] = useState(allFaqs)

  // Filter FAQ berdasarkan kategori dan pencarian
  useEffect(() => {
    let filtered = allFaqs

    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setDisplayedFaqs(filtered)
    setActiveIndex(null)
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Section dengan Pattern Nusantara */}
      <div className="relative bg-gradient-to-br from-red-800 via-orange-700 to-yellow-700 text-white py-12 md:py-20 lg:py-24 overflow-hidden">
        <NusantaraBackground />
        
        {/* Ornamen Tambahan */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M100,10 L130,70 L190,70 L145,110 L165,170 L100,130 L35,170 L55,110 L10,70 L70,70 Z" 
                  fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              Pusat Bantuan Kamus Hukum
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 drop-shadow">
              Temukan jawaban untuk pertanyaan Anda tentang hukum Indonesia
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl text-gray-900 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300 text-sm md:text-base"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Statistics */}
        <StatisticsSection />

        {/* Category Tabs */}
        <CategoryTabs 
          categories={faqCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* FAQ List */}
        <div className="space-y-3 md:space-y-4">
          {displayedFaqs.length > 0 ? (
            displayedFaqs.map((faq, index) => (
              <FAQItem
                key={`${faq.category}-${index}`}
                faq={faq}
                index={index}
                isActive={activeIndex === index}
                onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada FAQ yang ditemukan</p>
              <p className="text-gray-400 mt-2">Coba gunakan kata kunci yang berbeda</p>
            </motion.div>
          )}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 text-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 md:p-8 border border-amber-200"
        >
          <Shield className="h-12 w-12 text-amber-700 mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Butuh Bantuan Lebih Lanjut?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Jika Anda tidak menemukan jawaban yang dicari, tim kami siap membantu. 
            Silakan hubungi kami melalui halaman kontak atau forum diskusi komunitas.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
