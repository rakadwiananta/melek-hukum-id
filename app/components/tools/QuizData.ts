export interface QuizQuestion {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  difficulty: 'Mudah' | 'Sedang' | 'Sulit'
  points?: number
  additionalInfo?: string
  legalBasis?: string
}

export interface QuizCategory {
  id: string
  name: string
  description: string
  totalQuestions: number
  level: 'Pemula' | 'Menengah' | 'Lanjutan'
  questions: QuizQuestion[]
}

// 1. DASAR HUKUM ANTIKORUPSI (35 soal - Level Pemula)
const dasarHukumAntikorupsi: QuizQuestion[] = [
  {
    id: 1,
    text: "Undang-Undang yang menjadi dasar utama pemberantasan korupsi di Indonesia adalah?",
    options: [
      "UU No. 31 Tahun 1999 jo. UU No. 20 Tahun 2001",
      "UU No. 30 Tahun 2002",
      "UU No. 28 Tahun 1999",
      "UU No. 5 Tahun 2014"
    ],
    correctAnswer: 0,
    explanation: "UU No. 31 Tahun 1999 jo. UU No. 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi adalah dasar hukum utama anti-korupsi di Indonesia.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "UU No. 31/1999 jo. UU No. 20/2001"
  },
  {
    id: 2,
    text: "KPK (Komisi Pemberantasan Korupsi) dibentuk berdasarkan Undang-Undang nomor?",
    options: [
      "UU No. 30 Tahun 2002",
      "UU No. 19 Tahun 2019",
      "UU No. 31 Tahun 1999",
      "UU No. 28 Tahun 1999"
    ],
    correctAnswer: 0,
    explanation: "KPK dibentuk berdasarkan UU No. 30 Tahun 2002 tentang Komisi Pemberantasan Tindak Pidana Korupsi.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "UU No. 30/2002"
  },
  {
    id: 3,
    text: "Apa yang dimaksud dengan gratifikasi menurut UU Tipikor?",
    options: [
      "Pemberian hadiah kepada keluarga",
      "Pemberian dalam arti luas kepada pegawai negeri atau penyelenggara negara",
      "Bonus kinerja dari atasan",
      "Tunjangan hari raya"
    ],
    correctAnswer: 1,
    explanation: "Gratifikasi adalah pemberian dalam arti luas kepada pegawai negeri atau penyelenggara negara yang diterima baik di dalam maupun di luar negeri.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 4,
    text: "Berapa lama waktu yang diberikan untuk melaporkan gratifikasi kepada KPK?",
    options: [
      "7 hari kerja",
      "14 hari kerja",
      "30 hari kerja",
      "60 hari kerja"
    ],
    correctAnswer: 2,
    explanation: "Penerima gratifikasi wajib melaporkan kepada KPK paling lambat 30 hari kerja sejak tanggal gratifikasi diterima.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12C ayat (1) UU No. 20/2001"
  },
  {
    id: 5,
    text: "Siapa saja yang dapat menjadi subjek hukum tindak pidana korupsi?",
    options: [
      "Hanya pegawai negeri",
      "Hanya penyelenggara negara",
      "Setiap orang termasuk korporasi",
      "Hanya pejabat pemerintah"
    ],
    correctAnswer: 2,
    explanation: "Subjek hukum tindak pidana korupsi adalah 'setiap orang' yang meliputi orang perseorangan atau korporasi.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 1 angka 3 UU No. 31/1999"
  },
  {
    id: 6,
    text: "Apa sanksi pidana minimum untuk tindak pidana korupsi yang merugikan keuangan negara?",
    options: [
      "1 tahun penjara",
      "2 tahun penjara",
      "4 tahun penjara",
      "5 tahun penjara"
    ],
    correctAnswer: 2,
    explanation: "Pidana penjara minimum untuk korupsi yang merugikan keuangan negara adalah 4 tahun.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 2 ayat (1) UU No. 31/1999"
  },
  {
    id: 7,
    text: "Apa yang dimaksud dengan kerugian negara dalam konteks tindak pidana korupsi?",
    options: [
      "Berkurangnya keuangan negara secara riil",
      "Berkurangnya kekayaan negara berupa uang, surat berharga, atau barang",
      "Kehilangan potensi pendapatan negara",
      "Semua benar"
    ],
    correctAnswer: 3,
    explanation: "Kerugian negara mencakup berkurangnya keuangan/kekayaan negara baik secara riil maupun potensial.",
    category: "dasar-hukum",
    difficulty: "Sulit",
    points: 20,
    additionalInfo: "Kerugian negara dapat berupa kerugian riil (nyata) maupun potensial"
  },
  {
    id: 8,
    text: "Dalam UU Tipikor, apa yang dimaksud dengan 'menguntungkan diri sendiri atau orang lain'?",
    options: [
      "Mendapat keuntungan finansial saja",
      "Mendapat keuntungan material dan immaterial",
      "Mendapat jabatan atau kedudukan",
      "Semua bentuk keuntungan baik material maupun non-material"
    ],
    correctAnswer: 3,
    explanation: "Menguntungkan diri sendiri mencakup segala bentuk keuntungan baik material (uang, barang) maupun non-material (jabatan, kemudahan).",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 9,
    text: "Apa prinsip pembuktian terbalik dalam tindak pidana korupsi?",
    options: [
      "Jaksa harus membuktikan kesalahan terdakwa",
      "Terdakwa harus membuktikan ketidakbersalahannya",
      "Terdakwa membuktikan asal-usul harta kekayaannya",
      "Hakim yang membuktikan kesalahan"
    ],
    correctAnswer: 2,
    explanation: "Pembuktian terbalik berarti terdakwa wajib membuktikan bahwa harta kekayaannya bukan hasil korupsi.",
    category: "dasar-hukum",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 37 UU No. 31/1999"
  },
  {
    id: 10,
    text: "Berapa tahun masa daluwarsa penuntutan tindak pidana korupsi?",
    options: [
      "12 tahun",
      "18 tahun",
      "20 tahun",
      "Tidak ada daluwarsa"
    ],
    correctAnswer: 1,
    explanation: "Masa daluwarsa penuntutan tindak pidana korupsi adalah 18 tahun.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 40 UU No. 31/1999"
  },
  {
    id: 11,
    text: "Apa yang dimaksud dengan 'penyelenggara negara' menurut UU No. 28 Tahun 1999?",
    options: [
      "Hanya pejabat eksekutif",
      "Pejabat negara pada lembaga eksekutif, legislatif, dan yudikatif",
      "Hanya pegawai negeri sipil",
      "Hanya menteri dan gubernur"
    ],
    correctAnswer: 1,
    explanation: "Penyelenggara negara mencakup pejabat pada semua lembaga negara: eksekutif, legislatif, dan yudikatif.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 2 UU No. 28/1999"
  },
  {
    id: 12,
    text: "Apa asas yang dianut dalam penyelenggaraan negara yang bersih menurut UU No. 28/1999?",
    options: [
      "Asas kepastian hukum saja",
      "Asas keterbukaan dan akuntabilitas",
      "Asas kepentingan umum, keterbukaan, proporsionalitas, profesionalitas, dan akuntabilitas",
      "Asas efisiensi dan efektivitas"
    ],
    correctAnswer: 2,
    explanation: "UU No. 28/1999 menetapkan 7 asas penyelenggaraan negara yang bersih dan bebas KKN.",
    category: "dasar-hukum",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 3 UU No. 28/1999"
  },
  {
    id: 13,
    text: "Dalam konteks gratifikasi, apa yang dimaksud dengan 'berlaku surut'?",
    options: [
      "Gratifikasi yang diterima sebelum UU berlaku",
      "Gratifikasi yang dilaporkan terlambat",
      "Gratifikasi yang dianggap suap jika tidak dilaporkan",
      "Gratifikasi yang dikembalikan"
    ],
    correctAnswer: 2,
    explanation: "Gratifikasi dianggap pemberian suap jika tidak dilaporkan dalam waktu 30 hari kerja.",
    category: "dasar-hukum",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 12C ayat (2) UU No. 20/2001"
  },
  {
    id: 14,
    text: "Apa yang dimaksud dengan 'korporasi' dalam UU Tipikor?",
    options: [
      "Perusahaan swasta saja",
      "BUMN dan BUMD saja",
      "Kumpulan orang dan/atau kekayaan yang terorganisasi",
      "Perusahaan multinasional"
    ],
    correctAnswer: 2,
    explanation: "Korporasi adalah kumpulan orang dan/atau kekayaan yang terorganisasi baik berbadan hukum maupun tidak.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 1 angka 1 UU No. 31/1999"
  },
  {
    id: 15,
    text: "Siapa yang berwenang melakukan penyidikan tindak pidana korupsi?",
    options: [
      "Hanya KPK",
      "Hanya Kepolisian",
      "Hanya Kejaksaan",
      "Kepolisian, Kejaksaan, dan KPK"
    ],
    correctAnswer: 3,
    explanation: "Penyidikan tipikor dapat dilakukan oleh Kepolisian, Kejaksaan, dan KPK sesuai kewenangannya.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 16,
    text: "Berapa nilai minimal kerugian negara agar KPK dapat menangani kasus korupsi?",
    options: [
      "Rp 500 juta",
      "Rp 1 miliar",
      "Rp 2 miliar",
      "Tidak ada batasan minimal"
    ],
    correctAnswer: 1,
    explanation: "KPK menangani kasus korupsi dengan kerugian negara minimal Rp 1 miliar.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 11 UU No. 30/2002"
  },
  {
    id: 17,
    text: "Apa yang dimaksud dengan 'percobaan' dalam tindak pidana korupsi?",
    options: [
      "Niat melakukan korupsi",
      "Rencana korupsi yang belum dilaksanakan",
      "Pelaksanaan korupsi yang tidak selesai karena hal di luar kehendak",
      "Korupsi dalam jumlah kecil"
    ],
    correctAnswer: 2,
    explanation: "Percobaan adalah pelaksanaan tindak pidana yang tidak selesai bukan karena kehendak pelaku.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 15 UU No. 31/1999"
  },
  {
    id: 18,
    text: "Apa hukuman tambahan yang dapat dijatuhkan kepada terpidana korupsi?",
    options: [
      "Hanya perampasan barang",
      "Hanya pembayaran uang pengganti",
      "Perampasan barang, pembayaran uang pengganti, dan pencabutan hak politik",
      "Hanya denda"
    ],
    correctAnswer: 2,
    explanation: "Pidana tambahan meliputi perampasan barang, pembayaran uang pengganti, dan pencabutan hak-hak tertentu.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 18 UU No. 31/1999"
  },
  {
    id: 19,
    text: "Apa konsekuensi jika terpidana tidak membayar uang pengganti?",
    options: [
      "Dibebaskan dari kewajiban",
      "Diganti dengan pidana penjara",
      "Didenda dua kali lipat",
      "Dicabut hak politiknya"
    ],
    correctAnswer: 1,
    explanation: "Jika terpidana tidak membayar uang pengganti, diganti dengan pidana penjara sesuai ketentuan.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 18 ayat (3) UU No. 31/1999"
  },
  {
    id: 20,
    text: "Apa yang dimaksud dengan 'pembantuan' dalam tindak pidana korupsi?",
    options: [
      "Membantu secara fisik saja",
      "Memberikan kesempatan, sarana, atau keterangan",
      "Menyaksikan korupsi",
      "Melaporkan korupsi"
    ],
    correctAnswer: 1,
    explanation: "Pembantuan adalah memberikan kesempatan, sarana, atau keterangan untuk terjadinya tindak pidana.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 15 jo. Pasal 56 KUHP"
  },
  {
    id: 21,
    text: "Bagaimana status hukum hadiah kepada penyelenggara negara?",
    options: [
      "Selalu diperbolehkan",
      "Dilarang jika berhubungan dengan jabatan",
      "Boleh jika nilainya kecil",
      "Tergantung jenis hadiah"
    ],
    correctAnswer: 1,
    explanation: "Hadiah kepada penyelenggara negara yang berhubungan dengan jabatan termasuk gratifikasi yang dilarang.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 22,
    text: "Apa tujuan pembentukan Pengadilan Tipikor?",
    options: [
      "Mempercepat proses peradilan",
      "Menangani perkara korupsi secara khusus",
      "Mengurangi beban pengadilan umum",
      "Semua benar"
    ],
    correctAnswer: 3,
    explanation: "Pengadilan Tipikor dibentuk untuk menangani perkara korupsi secara khusus, cepat, dan profesional.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "UU No. 46/2009"
  },
  {
    id: 23,
    text: "Siapa yang dapat menjadi pelapor tindak pidana korupsi?",
    options: [
      "Hanya korban langsung",
      "Hanya pegawai negeri",
      "Setiap orang yang mengetahui",
      "Hanya penegak hukum"
    ],
    correctAnswer: 2,
    explanation: "Setiap orang yang mengetahui adanya tindak pidana korupsi berhak dan dapat melaporkan.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 24,
    text: "Apa yang dimaksud dengan 'benturan kepentingan' dalam konteks antikorupsi?",
    options: [
      "Konflik antar pegawai",
      "Situasi dimana kepentingan pribadi berpotensi mempengaruhi pelaksanaan tugas",
      "Persaingan bisnis",
      "Perbedaan pendapat"
    ],
    correctAnswer: 1,
    explanation: "Benturan kepentingan adalah situasi dimana kepentingan pribadi dapat mempengaruhi objektivitas pelaksanaan tugas.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 25,
    text: "Apa kewajiban penyelenggara negara terkait LHKPN?",
    options: [
      "Melaporkan harta kekayaan sebelum menjabat",
      "Melaporkan harta kekayaan selama menjabat",
      "Melaporkan harta kekayaan setelah menjabat",
      "Semua benar"
    ],
    correctAnswer: 3,
    explanation: "Penyelenggara negara wajib melaporkan LHKPN sebelum, selama, dan setelah menjabat.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "UU No. 28/1999"
  },
  {
    id: 26,
    text: "Apa sanksi bagi penyelenggara negara yang tidak melaporkan LHKPN?",
    options: [
      "Teguran lisan",
      "Teguran tertulis hingga pemberhentian",
      "Denda administratif",
      "Tidak ada sanksi"
    ],
    correctAnswer: 1,
    explanation: "Sanksi tidak melaporkan LHKPN mulai dari teguran tertulis hingga pemberhentian dari jabatan.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 27,
    text: "Apa yang dimaksud dengan 'pemerasan' dalam konteks jabatan?",
    options: [
      "Meminta gaji lebih tinggi",
      "Memaksa seseorang memberi sesuatu dengan menyalahgunakan kekuasaan",
      "Meminta cuti",
      "Meminta fasilitas kerja"
    ],
    correctAnswer: 1,
    explanation: "Pemerasan adalah memaksa seseorang memberikan sesuatu dengan menyalahgunakan kekuasaan jabatan.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf e UU No. 31/1999"
  },
  {
    id: 28,
    text: "Apa batas nilai gratifikasi yang wajib dilaporkan?",
    options: [
      "Rp 1 juta",
      "Rp 5 juta",
      "Rp 10 juta",
      "Semua nilai wajib dilaporkan"
    ],
    correctAnswer: 3,
    explanation: "Semua gratifikasi wajib dilaporkan tanpa melihat nilainya untuk transparansi dan akuntabilitas.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 29,
    text: "Apa yang dimaksud dengan 'turut serta' dalam tindak pidana korupsi?",
    options: [
      "Menyaksikan korupsi",
      "Melakukan bersama-sama tindak pidana",
      "Mengetahui adanya korupsi",
      "Melaporkan korupsi"
    ],
    correctAnswer: 1,
    explanation: "Turut serta berarti melakukan tindak pidana bersama-sama dengan pelaku utama.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 15 jo. Pasal 55 KUHP"
  },
  {
    id: 30,
    text: "Bagaimana perlindungan hukum bagi pelapor korupsi?",
    options: [
      "Tidak ada perlindungan",
      "Perlindungan fisik saja",
      "Perlindungan fisik dan hukum",
      "Perlindungan identitas saja"
    ],
    correctAnswer: 2,
    explanation: "Pelapor korupsi mendapat perlindungan fisik dan hukum sesuai peraturan perundangan.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "UU No. 31/2014"
  },
  {
    id: 31,
    text: "Apa peran APIP dalam pencegahan korupsi?",
    options: [
      "Melakukan penindakan korupsi",
      "Melakukan pengawasan internal pemerintah",
      "Menangkap koruptor",
      "Membuat undang-undang"
    ],
    correctAnswer: 1,
    explanation: "APIP berperan melakukan pengawasan internal untuk mencegah terjadinya korupsi di instansi pemerintah.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 32,
    text: "Apa yang dimaksud dengan 'uang pengganti' dalam pidana korupsi?",
    options: [
      "Ganti rugi kepada korban",
      "Pembayaran sejumlah uang yang sama dengan harta hasil korupsi",
      "Denda pidana",
      "Biaya perkara"
    ],
    correctAnswer: 1,
    explanation: "Uang pengganti adalah pembayaran sejumlah uang yang nilainya sama dengan harta hasil korupsi.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 18 ayat (1) huruf b UU No. 31/1999"
  },
  {
    id: 33,
    text: "Kapan seseorang dapat dikenakan pasal penyalahgunaan wewenang?",
    options: [
      "Menggunakan kewenangan untuk tujuan lain",
      "Tidak menggunakan kewenangan",
      "Memberikan kewenangan kepada orang lain",
      "Melaksanakan tugas dengan baik"
    ],
    correctAnswer: 0,
    explanation: "Penyalahgunaan wewenang terjadi ketika kewenangan digunakan untuk tujuan lain dari yang seharusnya.",
    category: "dasar-hukum",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 3 UU No. 31/1999"
  },
  {
    id: 34,
    text: "Apa prinsip 'equality before the law' dalam penegakan hukum korupsi?",
    options: [
      "Hukum hanya untuk rakyat biasa",
      "Pejabat kebal hukum",
      "Semua orang sama di hadapan hukum",
      "Hukum tergantung jabatan"
    ],
    correctAnswer: 2,
    explanation: "Equality before the law berarti semua orang memiliki kedudukan yang sama di hadapan hukum tanpa kecuali.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 35,
    text: "Apa tujuan utama pembentukan sistem anti-korupsi di Indonesia?",
    options: [
      "Menghukum koruptor saja",
      "Mencegah dan memberantas korupsi",
      "Menakut-nakuti pegawai negeri",
      "Mengumpulkan uang negara"
    ],
    correctAnswer: 1,
    explanation: "Sistem anti-korupsi bertujuan untuk mencegah terjadinya korupsi dan memberantas korupsi yang sudah terjadi.",
    category: "dasar-hukum",
    difficulty: "Mudah",
    points: 10
  }
];

// 2. 30 BENTUK KORUPSI (50 soal - Level Pemula)
const bentukKorupsi: QuizQuestion[] = [
  {
    id: 36,
    text: "Memberikan uang kepada petugas untuk mempercepat proses pembuatan SIM termasuk bentuk korupsi apa?",
    options: [
      "Gratifikasi",
      "Suap",
      "Pemerasan",
      "Penggelapan"
    ],
    correctAnswer: 1,
    explanation: "Memberikan uang untuk mempercepat proses yang seharusnya gratis atau sudah ada tarifnya adalah suap.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 5 UU No. 20/2001"
  },
  {
    id: 37,
    text: "Seorang kepala dinas menggunakan mobil dinas untuk mudik lebaran. Ini termasuk bentuk korupsi apa?",
    options: [
      "Penggelapan",
      "Penyalahgunaan wewenang",
      "Gratifikasi",
      "Suap"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan fasilitas negara untuk kepentingan pribadi adalah penyalahgunaan wewenang.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 3 UU No. 31/1999"
  },
  {
    id: 38,
    text: "Bendahara sekolah menggunakan dana BOS untuk keperluan pribadi. Ini termasuk?",
    options: [
      "Penggelapan dalam jabatan",
      "Gratifikasi",
      "Suap",
      "Pemerasan"
    ],
    correctAnswer: 0,
    explanation: "Menggunakan uang yang dipercayakan karena jabatan untuk kepentingan pribadi adalah penggelapan dalam jabatan.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 8 UU No. 31/1999"
  },
  {
    id: 39,
    text: "Kontraktor memberikan komisi 10% kepada panitia tender. Ini termasuk?",
    options: [
      "Gratifikasi yang sah",
      "Suap aktif",
      "Hadiah biasa",
      "Bonus kerja"
    ],
    correctAnswer: 1,
    explanation: "Memberikan sesuatu kepada pejabat agar berbuat sesuatu dalam jabatannya adalah suap aktif.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 5 ayat (1) huruf a UU No. 20/2001"
  },
  {
    id: 40,
    text: "Pegawai pajak menerima uang dari wajib pajak untuk mengurangi nilai pajak. Ini termasuk?",
    options: [
      "Gratifikasi",
      "Suap pasif",
      "Pemerasan",
      "Penggelapan"
    ],
    correctAnswer: 1,
    explanation: "Menerima sesuatu untuk melakukan atau tidak melakukan sesuatu dalam jabatan adalah suap pasif.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 5 ayat (2) UU No. 20/2001"
  },
  {
    id: 41,
    text: "Hakim menerima hadiah dari pihak yang berperkara. Ini termasuk?",
    options: [
      "Gratifikasi biasa",
      "Suap pada hakim",
      "Hadiah profesi",
      "Bonus kinerja"
    ],
    correctAnswer: 1,
    explanation: "Hakim yang menerima sesuatu dari pihak berperkara termasuk suap dengan ancaman lebih berat.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 6 UU No. 20/2001"
  },
  {
    id: 42,
    text: "Pejabat memaksa pengusaha memberikan uang dengan ancaman tidak diberi izin. Ini termasuk?",
    options: [
      "Suap",
      "Gratifikasi",
      "Pemerasan dalam jabatan",
      "Penggelapan"
    ],
    correctAnswer: 2,
    explanation: "Memaksa seseorang memberikan sesuatu dengan menyalahgunakan kekuasaan adalah pemerasan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf e UU No. 31/1999"
  },
  {
    id: 43,
    text: "Pegawai negeri memalsukan tanda tangan untuk mencairkan anggaran fiktif. Ini termasuk?",
    options: [
      "Pemalsuan",
      "Korupsi terkait pemalsuan",
      "Penggelapan",
      "Suap"
    ],
    correctAnswer: 1,
    explanation: "Pemalsuan yang dilakukan pegawai negeri untuk keuntungan termasuk korupsi terkait pemalsuan.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 12 huruf h UU No. 31/1999"
  },
  {
    id: 44,
    text: "Pejabat mengumumkan rahasia negara untuk keuntungan pribadi. Ini termasuk?",
    options: [
      "Pengkhianatan",
      "Korupsi terkait jabatan",
      "Membuka rahasia jabatan",
      "Spionase"
    ],
    correctAnswer: 2,
    explanation: "Membuka rahasia jabatan untuk keuntungan termasuk tindak pidana korupsi.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 12 huruf k UU No. 31/1999"
  },
  {
    id: 45,
    text: "Rekanan memberikan hadiah ulang tahun Rp 50 juta kepada pejabat. Ini termasuk?",
    options: [
      "Hadiah pribadi",
      "Gratifikasi yang harus dilaporkan",
      "Hadiah yang wajar",
      "Bukan korupsi"
    ],
    correctAnswer: 1,
    explanation: "Pemberian dari rekanan kepada pejabat adalah gratifikasi yang wajib dilaporkan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 46,
    text: "Panitia pengadaan mengatur pemenang tender sebelum proses dimulai. Ini termasuk?",
    options: [
      "Efisiensi",
      "Kolusi dalam pengadaan",
      "Strategi bisnis",
      "Manajemen proyek"
    ],
    correctAnswer: 1,
    explanation: "Mengatur pemenang tender adalah bentuk kolusi yang merugikan negara.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 47,
    text: "Kepala desa menggunakan dana desa untuk kampanye politik. Ini termasuk?",
    options: [
      "Hak politik",
      "Penyalahgunaan anggaran",
      "Strategi politik",
      "Kebebasan berpolitik"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan anggaran negara untuk kepentingan politik pribadi adalah penyalahgunaan anggaran.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 2 & 3 UU No. 31/1999"
  },
  {
    id: 48,
    text: "Oknum polisi meminta uang damai dalam kasus tilang. Ini termasuk?",
    options: [
      "Mediasi",
      "Pemerasan",
      "Negosiasi",
      "Diskresi"
    ],
    correctAnswer: 1,
    explanation: "Meminta uang untuk tidak memproses pelanggaran adalah pemerasan dalam jabatan.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 12 huruf e UU No. 31/1999"
  },
  {
    id: 49,
    text: "Pejabat membocorkan soal tes CPNS kepada kerabatnya. Ini termasuk?",
    options: [
      "Membantu keluarga",
      "Korupsi terkait rahasia jabatan",
      "Nepotisme biasa",
      "Hak prerogatif"
    ],
    correctAnswer: 1,
    explanation: "Membocorkan rahasia jabatan untuk menguntungkan orang lain adalah korupsi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf k UU No. 31/1999"
  },
  {
    id: 50,
    text: "Dokter RS pemerintah meminta uang tambahan untuk operasi. Ini termasuk?",
    options: [
      "Fee dokter",
      "Pungli/pemerasan",
      "Insentif medis",
      "Biaya operasional"
    ],
    correctAnswer: 1,
    explanation: "Meminta uang diluar ketentuan untuk layanan yang seharusnya gratis/bersubsidi adalah pungli.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 51,
    text: "Pejabat menerima mobil dari pengusaha setelah memenangkan tender. Ini termasuk?",
    options: [
      "Hadiah syukuran",
      "Gratifikasi/suap",
      "Bonus kerja sama",
      "Apresiasi bisnis"
    ],
    correctAnswer: 1,
    explanation: "Menerima hadiah terkait jabatan, apalagi bernilai besar seperti mobil, adalah gratifikasi yang dilarang.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 52,
    text: "Kepala sekolah menaikkan nilai siswa yang orangtuanya memberi sumbangan. Ini termasuk?",
    options: [
      "Kebijakan sekolah",
      "Suap dalam pendidikan",
      "Motivasi belajar",
      "Reward sistem"
    ],
    correctAnswer: 1,
    explanation: "Memberikan keuntungan (nilai) karena menerima sesuatu adalah bentuk suap.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 53,
    text: "Pejabat menggunakan informasi internal untuk membeli tanah yang akan dibebaskan. Ini termasuk?",
    options: [
      "Investasi cerdas",
      "Insider trading/korupsi informasi",
      "Perencanaan keuangan",
      "Bisnis property"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan informasi jabatan untuk keuntungan pribadi adalah penyalahgunaan wewenang.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 3 UU No. 31/1999"
  },
  {
    id: 54,
    text: "Auditor menerima uang untuk tidak melaporkan temuan. Ini termasuk?",
    options: [
      "Fee konsultasi",
      "Suap untuk tutup mata",
      "Biaya audit",
      "Insentif kerja"
    ],
    correctAnswer: 1,
    explanation: "Menerima sesuatu untuk tidak melakukan tugas jabatan adalah suap pasif.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 11 UU No. 31/1999"
  },
  {
    id: 55,
    text: "Pejabat meminta jatah proyek 20% dari nilai kontrak. Ini termasuk?",
    options: [
      "Bagi hasil",
      "Pemerasan/suap",
      "Kemitraan bisnis",
      "Investasi bersama"
    ],
    correctAnswer: 1,
    explanation: "Meminta bagian dari nilai proyek adalah bentuk pemerasan dan penyalahgunaan wewenang.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 56,
    text: "Pegawai bank pemerintah memanipulasi data nasabah untuk keuntungan pribadi. Ini termasuk?",
    options: [
      "Inovasi perbankan",
      "Korupsi sektor perbankan",
      "Layanan prima",
      "Efisiensi kerja"
    ],
    correctAnswer: 1,
    explanation: "Memanipulasi data untuk keuntungan pribadi adalah bentuk korupsi di sektor perbankan.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 57,
    text: "Pejabat menerima tiket umroh dari rekanan bisnis. Ini termasuk?",
    options: [
      "Hadiah keagamaan",
      "Gratifikasi",
      "Sedekah",
      "Bantuan ibadah"
    ],
    correctAnswer: 1,
    explanation: "Tiket perjalanan termasuk umroh dari rekanan adalah gratifikasi yang wajib dilaporkan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 58,
    text: "Pejabat meminta sponsor untuk acara kantor dari perusahaan yang sedang mengurus izin. Ini termasuk?",
    options: [
      "Kerjasama sponsorship",
      "Konflik kepentingan/gratifikasi",
      "CSR perusahaan",
      "Kemitraan"
    ],
    correctAnswer: 1,
    explanation: "Menerima sponsor dari pihak yang sedang berurusan dengan jabatan adalah konflik kepentingan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 59,
    text: "Anggota DPRD menerima uang untuk meloloskan Raperda. Ini termasuk?",
    options: [
      "Insentif legislasi",
      "Suap dalam legislasi",
      "Tunjangan kinerja",
      "Honor sidang"
    ],
    correctAnswer: 1,
    explanation: "Menerima uang untuk meloloskan peraturan adalah suap dalam proses legislasi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 11 UU No. 31/1999"
  },
  {
    id: 60,
    text: "Pejabat menggunakan APBD untuk membeli saham pribadi. Ini termasuk?",
    options: [
      "Investasi daerah",
      "Penggelapan uang negara",
      "Diversifikasi aset",
      "Pengelolaan keuangan"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan uang negara untuk kepentingan pribadi adalah penggelapan.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 2 UU No. 31/1999"
  },
  {
    id: 61,
    text: "Pejabat menjual aset negara dibawah harga pasar kepada kerabat. Ini termasuk?",
    options: [
      "Privatisasi",
      "Korupsi dan nepotisme",
      "Efisiensi aset",
      "Restrukturisasi"
    ],
    correctAnswer: 1,
    explanation: "Menjual aset negara dibawah harga untuk menguntungkan pihak tertentu adalah korupsi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 2 & 3 UU No. 31/1999"
  },
  {
    id: 62,
    text: "Guru meminta uang untuk menaikkan nilai rapor. Ini termasuk?",
    options: [
      "Les tambahan",
      "Suap pendidikan",
      "Biaya administrasi",
      "Uang buku"
    ],
    correctAnswer: 1,
    explanation: "Meminta uang untuk memberikan nilai yang tidak sesuai adalah suap dalam pendidikan.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 63,
    text: "Pejabat meminjam mobil dinas untuk bisnis rental keluarga. Ini termasuk?",
    options: [
      "Optimalisasi aset",
      "Penyalahgunaan aset negara",
      "Sharing economy",
      "Efisiensi"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan aset negara untuk bisnis pribadi adalah penyalahgunaan wewenang.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 3 UU No. 31/1999"
  },
  {
    id: 64,
    text: "Pejabat menerima saham perusahaan setelah memberikan izin. Ini termasuk?",
    options: [
      "Investasi legal",
      "Gratifikasi terselubung",
      "Kerjasama bisnis",
      "Bagi hasil"
    ],
    correctAnswer: 1,
    explanation: "Menerima saham dari pihak yang berurusan dengan jabatan adalah gratifikasi.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 65,
    text: "Pejabat memaksa bawahan menyetor uang bulanan. Ini termasuk?",
    options: [
      "Iuran kantor",
      "Pemerasan struktural",
      "Dana sosial",
      "Tabungan bersama"
    ],
    correctAnswer: 1,
    explanation: "Memaksa bawahan memberikan uang dengan menyalahgunakan posisi adalah pemerasan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf e UU No. 31/1999"
  },
  {
    id: 66,
    text: "Pejabat menggunakan dana bantuan bencana untuk kampanye. Ini termasuk?",
    options: [
      "Strategi politik",
      "Penggelapan dana kemanusiaan",
      "Public relation",
      "Sosialisasi program"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan dana kemanusiaan untuk kepentingan politik adalah penggelapan yang sangat tidak etis.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 2 & 3 UU No. 31/1999"
  },
  {
    id: 67,
    text: "Jaksa menerima uang untuk meringankan tuntutan. Ini termasuk?",
    options: [
      "Mediasi hukum",
      "Suap dalam penegakan hukum",
      "Restorative justice",
      "Plea bargain"
    ],
    correctAnswer: 1,
    explanation: "Menerima uang untuk meringankan tuntutan adalah suap yang merusak sistem peradilan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf a UU No. 31/1999"
  },
  {
    id: 68,
    text: "Pejabat membuat perjalanan dinas fiktif untuk mendapat uang saku. Ini termasuk?",
    options: [
      "Efisiensi anggaran",
      "Korupsi perjalanan dinas",
      "Saving budget",
      "Cadangan dana"
    ],
    correctAnswer: 1,
    explanation: "Membuat perjalanan dinas fiktif untuk mendapat uang adalah bentuk korupsi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 69,
    text: "Pejabat menerima komisi dari broker asuransi pegawai. Ini termasuk?",
    options: [
      "Fee marketing",
      "Gratifikasi/kickback",
      "Bonus penjualan",
      "Insentif"
    ],
    correctAnswer: 1,
    explanation: "Menerima komisi dari penyedia layanan untuk pegawai adalah gratifikasi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 70,
    text: "Pejabat meminta uang administrasi diluar ketentuan untuk proses perizinan. Ini termasuk?",
    options: [
      "Biaya percepatan",
      "Pungutan liar",
      "Service charge",
      "Handling fee"
    ],
    correctAnswer: 1,
    explanation: "Meminta uang diluar ketentuan resmi adalah pungutan liar.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 71,
    text: "Pejabat menyewakan tanah negara untuk keuntungan pribadi. Ini termasuk?",
    options: [
      "Optimalisasi aset",
      "Penyalahgunaan aset negara",
      "Pendapatan daerah",
      "Kerjasama sewa"
    ],
    correctAnswer: 1,
    explanation: "Menyewakan aset negara untuk keuntungan pribadi adalah penyalahgunaan wewenang.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 3 UU No. 31/1999"
  },
  {
    id: 72,
    text: "Petugas imigrasi mempercepat pembuatan paspor dengan bayaran tambahan. Ini termasuk?",
    options: [
      "Layanan ekspres",
      "Suap pelayanan publik",
      "Fast track service",
      "Priority handling"
    ],
    correctAnswer: 1,
    explanation: "Menerima bayaran untuk mempercepat layanan yang ada prosedurnya adalah suap.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 73,
    text: "Pejabat menggunakan dana CSR perusahaan untuk kepentingan pribadi. Ini termasuk?",
    options: [
      "Pengelolaan CSR",
      "Penyalahgunaan dana",
      "Kemitraan sosial",
      "Program bantuan"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan dana CSR yang seharusnya untuk masyarakat adalah penyalahgunaan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 74,
    text: "Pejabat memasukkan pegawai fiktif dalam daftar gaji. Ini termasuk?",
    options: [
      "Efisiensi SDM",
      "Mark up pegawai/korupsi",
      "Cadangan pegawai",
      "Antisipasi kebutuhan"
    ],
    correctAnswer: 1,
    explanation: "Memasukkan pegawai fiktif untuk mengambil gajinya adalah korupsi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 75,
    text: "Pejabat meminta bagian keuntungan dari koperasi pegawai. Ini termasuk?",
    options: [
      "Bagi hasil koperasi",
      "Pemerasan ekonomi",
      "Dividend sharing",
      "Partisipasi usaha"
    ],
    correctAnswer: 1,
    explanation: "Meminta bagian keuntungan dengan paksaan jabatan adalah pemerasan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf e UU No. 31/1999"
  },
  {
    id: 76,
    text: "Pejabat menjual jabatan kepada calon pegawai. Ini termasuk?",
    options: [
      "Recruitment fee",
      "Jual beli jabatan/korupsi",
      "Biaya seleksi",
      "Dana pembinaan"
    ],
    correctAnswer: 1,
    explanation: "Menjual jabatan adalah bentuk korupsi yang merusak sistem kepegawaian.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 12 huruf f UU No. 31/1999"
  },
  {
    id: 77,
    text: "Pejabat menerima hadiah dari peserta tender sebelum pengumuman. Ini termasuk?",
    options: [
      "Goodwill gesture",
      "Suap tender",
      "Public relation",
      "Kenang-kenangan"
    ],
    correctAnswer: 1,
    explanation: "Menerima apapun dari peserta tender adalah suap yang mempengaruhi objektivitas.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 5 & 12B UU Tipikor"
  },
  {
    id: 78,
    text: "Pejabat menggunakan data rahasia untuk menguntungkan perusahaan keluarga. Ini termasuk?",
    options: [
      "Strategi bisnis",
      "Insider trading/korupsi informasi",
      "Competitive advantage",
      "Market intelligence"
    ],
    correctAnswer: 1,
    explanation: "Menggunakan informasi rahasia jabatan untuk bisnis pribadi adalah korupsi.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 3 UU No. 31/1999"
  },
  {
    id: 79,
    text: "Pejabat menerima fasilitas hotel mewah dari pengusaha. Ini termasuk?",
    options: [
      "Hospitality bisnis",
      "Gratifikasi",
      "Akomodasi kerja",
      "Guest treatment"
    ],
    correctAnswer: 1,
    explanation: "Fasilitas mewah dari pihak yang punya kepentingan adalah gratifikasi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 80,
    text: "Pejabat memalsukan kuitansi untuk memperbesar pengeluaran. Ini termasuk?",
    options: [
      "Administrasi keuangan",
      "Korupsi dengan pemalsuan",
      "Penyesuaian anggaran",
      "Realisasi budget"
    ],
    correctAnswer: 1,
    explanation: "Memalsukan dokumen keuangan untuk keuntungan adalah korupsi dengan pemalsuan.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12 huruf h UU No. 31/1999"
  },
  {
    id: 81,
    text: "Pejabat meminta uang keamanan dari PKL. Ini termasuk?",
    options: [
      "Retribusi resmi",
      "Pemerasan/pungli",
      "Iuran keamanan",
      "Dana kebersihan"
    ],
    correctAnswer: 1,
    explanation: "Meminta uang tanpa dasar hukum dari pedagang adalah pemerasan.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 12 huruf e UU No. 31/1999"
  },
  {
    id: 82,
    text: "Pejabat menerima mobil pinjaman jangka panjang tanpa biaya dari rekanan. Ini termasuk?",
    options: [
      "Pinjam pakai",
      "Gratifikasi terselubung",
      "Kerjasama transport",
      "Efisiensi mobilitas"
    ],
    correctAnswer: 1,
    explanation: "Pinjaman jangka panjang tanpa biaya sama dengan pemberian/gratifikasi.",
    category: "bentuk-korupsi",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 83,
    text: "Pejabat membeli barang kantor dengan harga 3x lipat harga pasar. Ini termasuk?",
    options: [
      "Inflasi harga",
      "Mark up pengadaan/korupsi",
      "Premium quality",
      "Garansi extended"
    ],
    correctAnswer: 1,
    explanation: "Mark up harga dalam pengadaan adalah bentuk korupsi yang merugikan negara.",
    category: "bentuk-korupsi",
    difficulty: "Mudah",
    points: 10,
    legalBasis: "Pasal 2 & 3 UU No. 31/1999"
  },
  {
    id: 84,
    text: "Pejabat menerima voucher belanja dari mall yang sedang mengurus izin. Ini termasuk?",
    options: [
      "Promosi mall",
      "Gratifikasi",
      "Customer reward",
      "Loyalty program"
    ],
    correctAnswer: 1,
    explanation: "Menerima apapun dari pihak yang sedang berurusan dengan jabatan adalah gratifikasi.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 12B UU No. 20/2001"
  },
  {
    id: 85,
    text: "Pejabat mengarahkan bantuan sosial hanya ke daerah basis politiknya. Ini termasuk?",
    options: [
      "Strategi politik",
      "Penyalahgunaan wewenang",
      "Targeting program",
      "Prioritas wilayah"
    ],
    correctAnswer: 1,
    explanation: "Mengarahkan bantuan berdasarkan kepentingan politik adalah penyalahgunaan wewenang.",
    category: "bentuk-korupsi",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Pasal 3 UU No. 31/1999",
    additionalInfo: "Bantuan sosial harus diberikan berdasarkan kriteria objektif, bukan politik"
  }
];

// 3. PENCEGAHAN & PEMBERANTASAN (35 soal - Level Menengah)
const pencegahanPemberantasan: QuizQuestion[] = [
  {
    id: 86,
    text: "Apa tujuan utama pembentukan sistem whistleblowing dalam pencegahan korupsi?",
    options: [
      "Menghukum pegawai",
      "Memberikan saluran pelaporan yang aman",
      "Mengawasi kinerja",
      "Meningkatkan pendapatan"
    ],
    correctAnswer: 1,
    explanation: "Sistem whistleblowing bertujuan memberikan saluran pelaporan yang aman bagi pelapor korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 87,
    text: "Apa yang dimaksud dengan 'integrity pact' dalam pengadaan barang/jasa?",
    options: [
      "Kontrak pengadaan",
      "Pakta integritas anti korupsi",
      "Jaminan tender",
      "Asuransi proyek"
    ],
    correctAnswer: 1,
    explanation: "Integrity pact adalah kesepakatan antara pihak-pihak dalam pengadaan untuk tidak melakukan korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 88,
    text: "Manakah yang BUKAN termasuk strategi pencegahan korupsi?",
    options: [
      "Transparansi anggaran",
      "Rotasi jabatan berkala",
      "Menutup akses informasi",
      "Penguatan sistem pengawasan"
    ],
    correctAnswer: 2,
    explanation: "Menutup akses informasi justru meningkatkan risiko korupsi. Transparansi adalah kunci pencegahan.",
    category: "pencegahan",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 89,
    text: "Apa peran teknologi dalam pencegahan korupsi?",
    options: [
      "Menggantikan pegawai",
      "Meningkatkan transparansi dan akuntabilitas",
      "Mengurangi anggaran",
      "Mempercepat korupsi"
    ],
    correctAnswer: 1,
    explanation: "Teknologi berperan meningkatkan transparansi dan akuntabilitas melalui sistem elektronik.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15,
    additionalInfo: "Contoh: e-procurement, e-budgeting, LHKPN online"
  },
  {
    id: 90,
    text: "Apa yang dimaksud dengan 'conflict of interest' dan bagaimana mencegahnya?",
    options: [
      "Konflik antar pegawai - dimediasi",
      "Benturan kepentingan - dengan disclosure dan recusal",
      "Persaingan bisnis - dengan kompetisi",
      "Perbedaan pendapat - dengan diskusi"
    ],
    correctAnswer: 1,
    explanation: "Conflict of interest adalah benturan kepentingan yang dicegah dengan pengungkapan dan mengundurkan diri dari keputusan.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 91,
    text: "Apa fungsi LHKPN dalam pencegahan korupsi?",
    options: [
      "Mengetahui gaji pegawai",
      "Memantau perubahan kekayaan yang tidak wajar",
      "Menentukan pajak",
      "Memberikan bonus"
    ],
    correctAnswer: 1,
    explanation: "LHKPN berfungsi memantau perubahan kekayaan pejabat untuk mendeteksi indikasi korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "UU No. 28/1999"
  },
  {
    id: 92,
    text: "Bagaimana peran masyarakat dalam pencegahan korupsi?",
    options: [
      "Tidak ada peran",
      "Hanya sebagai korban",
      "Pengawasan sosial dan pelaporan",
      "Hanya membayar pajak"
    ],
    correctAnswer: 2,
    explanation: "Masyarakat berperan aktif dalam pengawasan sosial dan melaporkan dugaan korupsi.",
    category: "pencegahan",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 93,
    text: "Apa yang dimaksud dengan 'revolving door policy' dalam pencegahan korupsi?",
    options: [
      "Pintu kantor yang berputar",
      "Pembatasan pejabat bekerja di sektor swasta terkait",
      "Rotasi ruangan kerja",
      "Sistem absensi"
    ],
    correctAnswer: 1,
    explanation: "Revolving door policy membatasi pejabat untuk langsung bekerja di sektor swasta yang pernah diawasi/diatur.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 94,
    text: "Apa manfaat sistem e-procurement dalam pencegahan korupsi?",
    options: [
      "Mempercepat pengadaan saja",
      "Transparansi dan mengurangi interaksi langsung",
      "Mengurangi pegawai",
      "Meningkatkan harga"
    ],
    correctAnswer: 1,
    explanation: "E-procurement meningkatkan transparansi dan mengurangi interaksi langsung yang rawan korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 95,
    text: "Bagaimana cara efektif mencegah gratifikasi di lingkungan kerja?",
    options: [
      "Melarang semua pemberian",
      "Sistem pelaporan dan batasan nilai yang jelas",
      "Mengizinkan semua hadiah",
      "Tidak perlu diatur"
    ],
    correctAnswer: 1,
    explanation: "Pencegahan gratifikasi efektif dengan sistem pelaporan wajib dan batasan nilai yang jelas.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "Surat Edaran KPK tentang Gratifikasi"
  },
  {
    id: 96,
    text: "Apa yang dimaksud dengan 'due diligence' dalam pencegahan korupsi?",
    options: [
      "Kerja keras",
      "Pemeriksaan mendalam terhadap mitra bisnis",
      "Disiplin kerja",
      "Loyalitas pegawai"
    ],
    correctAnswer: 1,
    explanation: "Due diligence adalah pemeriksaan mendalam terhadap integritas calon mitra bisnis/pegawai.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 97,
    text: "Apa peran internal audit dalam pencegahan korupsi?",
    options: [
      "Menghukum pegawai",
      "Deteksi dini penyimpangan",
      "Menentukan gaji",
      "Membuat peraturan"
    ],
    correctAnswer: 1,
    explanation: "Internal audit berperan mendeteksi dini penyimpangan dan kelemahan sistem yang rawan korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 98,
    text: "Bagaimana mencegah korupsi dalam pelayanan publik?",
    options: [
      "Mengurangi layanan",
      "Standarisasi prosedur dan layanan online",
      "Menaikkan tarif",
      "Membatasi jam layanan"
    ],
    correctAnswer: 1,
    explanation: "Standarisasi prosedur dan layanan online mengurangi diskresi dan interaksi yang rawan korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 99,
    text: "Apa yang dimaksud dengan 'red flags' dalam deteksi korupsi?",
    options: [
      "Bendera merah",
      "Tanda-tanda peringatan adanya korupsi",
      "Larangan masuk",
      "Hari libur nasional"
    ],
    correctAnswer: 1,
    explanation: "Red flags adalah indikator atau tanda peringatan yang menunjukkan kemungkinan terjadinya korupsi.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20,
    additionalInfo: "Contoh red flags: lifestyle melebihi penghasilan, enggan cuti, menghindari audit"
  },
  {
    id: 100,
    text: "Bagaimana strategi 'islands of integrity' dalam reformasi birokrasi?",
    options: [
      "Membangun pulau baru",
      "Menciptakan unit percontohan bebas korupsi",
      "Isolasi pegawai",
      "Wisata pulau"
    ],
    correctAnswer: 1,
    explanation: "Islands of integrity adalah strategi menciptakan unit/area percontohan yang bersih dari korupsi.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 101,
    text: "Apa pentingnya 'tone at the top' dalam pencegahan korupsi?",
    options: [
      "Nada suara pimpinan",
      "Komitmen dan teladan pimpinan",
      "Musik di kantor",
      "Volume speaker"
    ],
    correctAnswer: 1,
    explanation: "Tone at the top adalah komitmen dan teladan dari pimpinan yang sangat penting dalam budaya anti korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 102,
    text: "Bagaimana peran media massa dalam pemberantasan korupsi?",
    options: [
      "Hanya memberitakan",
      "Investigasi dan pengawasan publik",
      "Menghibur masyarakat",
      "Menjual berita"
    ],
    correctAnswer: 1,
    explanation: "Media berperan dalam investigasi, mengungkap kasus, dan mendorong pengawasan publik.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 103,
    text: "Apa yang dimaksud dengan 'asset recovery' dalam pemberantasan korupsi?",
    options: [
      "Pemulihan kesehatan",
      "Pengembalian aset hasil korupsi",
      "Perbaikan gedung",
      "Recovery data"
    ],
    correctAnswer: 1,
    explanation: "Asset recovery adalah upaya mengembalikan aset/harta hasil korupsi kepada negara.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15,
    legalBasis: "UU No. 1/2006 tentang MLA"
  },
  {
    id: 104,
    text: "Bagaimana menerapkan prinsip 'know your customer' untuk mencegah pencucian uang hasil korupsi?",
    options: [
      "Mengenal nama customer",
      "Identifikasi dan verifikasi mendalam",
      "Memberikan diskon",
      "Layanan prima"
    ],
    correctAnswer: 1,
    explanation: "KYC mensyaratkan identifikasi dan verifikasi mendalam untuk mencegah transaksi mencurigakan.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20,
    legalBasis: "UU No. 8/2010 tentang TPPU"
  },
  {
    id: 105,
    text: "Apa peran pendidikan anti-korupsi sejak dini?",
    options: [
      "Menakut-nakuti anak",
      "Membangun karakter integritas",
      "Mengurangi mata pelajaran",
      "Memberatkan siswa"
    ],
    correctAnswer: 1,
    explanation: "Pendidikan anti-korupsi sejak dini membangun karakter dan nilai integritas pada generasi muda.",
    category: "pencegahan",
    difficulty: "Mudah",
    points: 10
  },
  {
    id: 106,
    text: "Bagaimana sistem 'single identity number' membantu pencegahan korupsi?",
    options: [
      "Memudahkan absensi",
      "Integrasi data untuk deteksi anomali",
      "Mengurangi pegawai",
      "Mempercepat promosi"
    ],
    correctAnswer: 1,
    explanation: "Single identity number mengintegrasikan data untuk mendeteksi anomali kekayaan dan transaksi.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 107,
    text: "Apa manfaat 'job rotation' dalam pencegahan korupsi?",
    options: [
      "Menambah pengalaman saja",
      "Memutus jejaring korupsi potensial",
      "Mengurangi gaji",
      "Memperbanyak pegawai"
    ],
    correctAnswer: 1,
    explanation: "Rotasi jabatan memutus jejaring korupsi dan mencegah 'kenyamanan' yang berlebihan di satu posisi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 108,
    text: "Bagaimana 'big data analytics' digunakan dalam deteksi korupsi?",
    options: [
      "Menyimpan data besar",
      "Analisis pola transaksi mencurigakan",
      "Membuat database",
      "Backup data"
    ],
    correctAnswer: 1,
    explanation: "Big data analytics menganalisis pola dan anomali dalam data besar untuk mendeteksi indikasi korupsi.",
    category: "pencegahan",
    difficulty: "Sulit",
    points: 20
  },
  {
    id: 109,
    text: "Apa yang dimaksud dengan 'compliance program' dalam organisasi?",
    options: [
      "Program komputer",
      "Program kepatuhan anti-korupsi",
      "Program kerja tahunan",
      "Program kesejahteraan"
    ],
    correctAnswer: 1,
    explanation: "Compliance program adalah sistem manajemen untuk memastikan kepatuhan terhadap aturan anti-korupsi.",
    category: "pencegahan",
    difficulty: "Sedang",
    points: 15
  },
  {
    id: 110,
    text: 'Seorang pejabat menerima hadiah dari pegawai bawahannya saat hari raya. Bagaimana seharusnya sikap pejabat tersebut?',
    options: [
      'Menerima karena sudah tradisi',
      'Melaporkan ke KPK jika nilainya di atas Rp 1 juta',
      'Menolak dengan halus',
      'Menerima lalu dibagikan ke yang lain'
    ],
    correctAnswer: 2,
    explanation: 'Pejabat sebaiknya menolak hadiah dari bawahan untuk menghindari konflik kepentingan dan potensi gratifikasi.',
    category: 'gratifikasi',
    difficulty: 'Mudah'
  },
  {
    id: 111,
    text: 'Menggunakan dana desa untuk kepentingan kampanye politik termasuk tindakan...',
    options: [
      'Politik yang wajar',
      'Penyalahgunaan anggaran',
      'Strategi kampanye',
      'Efisiensi dana'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan dana desa untuk kampanye politik merupakan penyalahgunaan anggaran dan termasuk tindak pidana korupsi.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 112,
    text: 'Seorang hakim menerima uang dari terdakwa untuk meringankan hukuman. Ini termasuk...',
    options: [
      'Mediasi hukum',
      'Suap dalam peradilan',
      'Bantuan hukum',
      'Negosiasi yang sah'
    ],
    correctAnswer: 1,
    explanation: 'Menerima uang untuk mempengaruhi putusan pengadilan merupakan suap dalam peradilan yang merusak sistem hukum.',
    category: 'suap',
    difficulty: 'Sulit'
  },
  {
    id: 113,
    text: 'Berapa lama waktu yang diberikan untuk melaporkan gratifikasi ke KPK?',
    options: [
      '7 hari kerja',
      '14 hari kerja',
      '30 hari kerja',
      '60 hari kerja'
    ],
    correctAnswer: 2,
    explanation: 'Menurut UU No. 20 Tahun 2001, penerima gratifikasi wajib melaporkan ke KPK dalam waktu 30 hari kerja.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 114,
    text: 'Seorang direktur BUMN menggunakan pesawat perusahaan untuk liburan keluarga. Ini termasuk...',
    options: [
      'Fasilitas jabatan',
      'Penyalahgunaan aset negara',
      'Hak direktur',
      'Efisiensi operasional'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan aset BUMN untuk kepentingan pribadi termasuk penyalahgunaan aset negara.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 115,
    text: 'Minimal berapa nilai gratifikasi yang wajib dilaporkan ke KPK?',
    options: [
      'Rp 500.000',
      'Rp 1.000.000',
      'Rp 10.000.000',
      'Semua nilai wajib dilaporkan'
    ],
    correctAnswer: 3,
    explanation: 'Semua gratifikasi yang diterima oleh penyelenggara negara wajib dilaporkan ke KPK tanpa melihat nilainya.',
    category: 'gratifikasi',
    difficulty: 'Mudah'
  },
  {
    id: 116,
    text: 'Kasus korupsi e-KTP merugikan negara sebesar...',
    options: [
      'Rp 1,2 triliun',
      'Rp 2,3 triliun',
      'Rp 3,4 triliun',
      'Rp 4,5 triliun'
    ],
    correctAnswer: 1,
    explanation: 'Kasus korupsi e-KTP merugikan negara sebesar Rp 2,3 triliun dan melibatkan banyak pejabat tinggi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 117,
    text: 'Seorang polisi meminta uang damai dalam kasus tilang. Ini termasuk...',
    options: [
      'Mediasi tilang',
      'Pungutan liar',
      'Biaya administrasi',
      'Denda resmi'
    ],
    correctAnswer: 1,
    explanation: 'Meminta uang damai dalam tilang termasuk pungutan liar yang merupakan bentuk korupsi.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 118,
    text: 'Apa yang dimaksud dengan whistleblower?',
    options: [
      'Pelaku korupsi',
      'Pengacara koruptor',
      'Pelapor tindak pidana korupsi',
      'Hakim kasus korupsi'
    ],
    correctAnswer: 2,
    explanation: 'Whistleblower adalah orang yang melaporkan dugaan tindak pidana korupsi yang terjadi di dalam organisasi tempatnya bekerja.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 119,
    text: 'Seorang pejabat meminta fee 10% dari nilai proyek. Ini termasuk...',
    options: [
      'Biaya manajemen',
      'Pemerasan dalam jabatan',
      'Komisi yang sah',
      'Biaya operasional'
    ],
    correctAnswer: 1,
    explanation: 'Meminta fee dari nilai proyek dengan menggunakan kekuasaan jabatan termasuk pemerasan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 120,
    text: 'Berapa lama hukuman maksimal untuk tindak pidana korupsi?',
    options: [
      '10 tahun penjara',
      '15 tahun penjara',
      '20 tahun penjara',
      'Seumur hidup'
    ],
    correctAnswer: 3,
    explanation: 'Hukuman maksimal untuk tindak pidana korupsi adalah penjara seumur hidup sesuai UU Tipikor.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 121,
    text: 'Seorang kepala daerah menggunakan APBD untuk membiayai kampanye pilkada. Ini termasuk...',
    options: [
      'Politik anggaran',
      'Penyalahgunaan APBD',
      'Strategi politik',
      'Efisiensi anggaran'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan APBD untuk kampanye politik merupakan penyalahgunaan anggaran daerah.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 122,
    text: 'Apa kepanjangan dari KPK?',
    options: [
      'Komisi Pemberantas Korupsi',
      'Komisi Pencegahan Korupsi',
      'Komisi Pemberantasan Korupsi',
      'Komisi Penindakan Korupsi'
    ],
    correctAnswer: 0,
    explanation: 'KPK adalah singkatan dari Komisi Pemberantasan Korupsi yang dibentuk tahun 2003.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 123,
    text: 'Seorang dokter meminta uang tambahan untuk operasi di RS pemerintah. Ini termasuk...',
    options: [
      'Biaya operasional',
      'Pungutan liar',
      'Insentif dokter',
      'Biaya tak terduga'
    ],
    correctAnswer: 1,
    explanation: 'Meminta uang tambahan di luar tarif resmi RS pemerintah termasuk pungutan liar.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 124,
    text: 'Manakah yang BUKAN termasuk gratifikasi?',
    options: [
      'Hadiah ulang tahun dari rekan kerja senilai Rp 200.000',
      'Tiket pesawat dari rekanan bisnis',
      'Voucher belanja dari vendor',
      'Gaji bulanan dari kantor'
    ],
    correctAnswer: 3,
    explanation: 'Gaji bulanan merupakan hak yang sah, bukan gratifikasi. Gratifikasi adalah pemberian dalam arti luas di luar penghasilan resmi.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 125,
    text: 'Seorang pejabat menandatangani kontrak fiktif untuk menguntungkan perusahaan keluarga. Ini termasuk...',
    options: [
      'Bisnis keluarga',
      'Mark up proyek',
      'Konflik kepentingan',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Tindakan tersebut melibatkan mark up, konflik kepentingan, dan penyalahgunaan wewenang.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 126,
    text: 'Berapa persen maksimal kerugian negara yang bisa ditoleransi dalam proyek?',
    options: [
      '0%',
      '5%',
      '10%',
      '15%'
    ],
    correctAnswer: 0,
    explanation: 'Tidak ada toleransi untuk kerugian negara. Setiap kerugian negara akibat korupsi harus ditindak.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 127,
    text: 'Apa fungsi APIP dalam pencegahan korupsi?',
    options: [
      'Menangkap koruptor',
      'Mengawasi internal pemerintah',
      'Menyidik kasus korupsi',
      'Memvonis koruptor'
    ],
    correctAnswer: 1,
    explanation: 'APIP (Aparat Pengawasan Intern Pemerintah) berfungsi melakukan pengawasan internal di instansi pemerintah.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 128,
    text: 'Seorang guru meminta uang les tambahan untuk meluluskan siswa. Ini termasuk...',
    options: [
      'Biaya les yang wajar',
      'Pemerasan dalam pendidikan',
      'Insentif guru',
      'Biaya tambahan pendidikan'
    ],
    correctAnswer: 1,
    explanation: 'Meminta uang dengan ancaman tidak meluluskan termasuk pemerasan dalam dunia pendidikan.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 129,
    text: 'Kasus korupsi Hambalang merugikan negara sekitar...',
    options: [
      'Rp 243 miliar',
      'Rp 343 miliar',
      'Rp 443 miliar',
      'Rp 543 miliar'
    ],
    correctAnswer: 0,
    explanation: 'Kasus korupsi proyek Hambalang merugikan negara sekitar Rp 243 miliar.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 130,
    text: 'Seorang pejabat mengubah peruntukan dana bantuan sosial. Ini termasuk...',
    options: [
      'Fleksibilitas anggaran',
      'Penyalahgunaan dana',
      'Efisiensi anggaran',
      'Realokasi yang sah'
    ],
    correctAnswer: 1,
    explanation: 'Mengubah peruntukan dana bantuan sosial tanpa prosedur yang benar termasuk penyalahgunaan dana.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 131,
    text: 'Apa yang dimaksud dengan "conflict of interest"?',
    options: [
      'Pertentangan antar pegawai',
      'Benturan kepentingan',
      'Perbedaan pendapat',
      'Persaingan bisnis'
    ],
    correctAnswer: 1,
    explanation: 'Conflict of interest atau benturan kepentingan terjadi ketika kepentingan pribadi bertentangan dengan tugas publik.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 132,
    text: 'Seorang petugas pajak memberikan keringanan pajak tanpa dasar hukum. Ini termasuk...',
    options: [
      'Pelayanan prima',
      'Penyalahgunaan wewenang',
      'Diskresi petugas',
      'Kebijakan pajak'
    ],
    correctAnswer: 1,
    explanation: 'Memberikan keringanan pajak tanpa dasar hukum termasuk penyalahgunaan wewenang.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 133,
    text: 'Berapa jumlah maksimal gratifikasi yang boleh diterima PNS menurut peraturan?',
    options: [
      'Tidak ada batasan',
      'Rp 1 juta per tahun',
      'Rp 500 ribu per kejadian',
      'Tidak boleh menerima sama sekali'
    ],
    correctAnswer: 3,
    explanation: 'PNS tidak diperbolehkan menerima gratifikasi dalam bentuk apapun yang berkaitan dengan jabatannya.',
    category: 'gratifikasi',
    difficulty: 'Mudah'
  },
  {
    id: 134,
    text: 'Apa tujuan utama UU Tipikor?',
    options: [
      'Menghukum koruptor',
      'Memberantas dan mencegah korupsi',
      'Menakuti pejabat',
      'Mengumpulkan denda'
    ],
    correctAnswer: 1,
    explanation: 'UU Tipikor bertujuan untuk memberantas dan mencegah tindak pidana korupsi secara komprehensif.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 135,
    text: 'Seorang anggota DPRD menerima uang untuk meloloskan raperda. Ini termasuk...',
    options: [
      'Lobi politik',
      'Suap legislatif',
      'Dana aspirasi',
      'Biaya politik'
    ],
    correctAnswer: 1,
    explanation: 'Menerima uang untuk meloloskan peraturan daerah termasuk suap dalam proses legislasi.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 136,
    text: 'Manakah yang termasuk modus korupsi pengadaan barang/jasa?',
    options: [
      'Mark up harga',
      'Pengurangan spesifikasi',
      'Pemecahan paket pekerjaan',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Mark up, pengurangan spesifikasi, dan pemecahan paket adalah modus umum korupsi pengadaan.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 137,
    text: 'Seorang pejabat menerima sponsorship untuk acara pribadi dari pengusaha. Ini termasuk...',
    options: [
      'Kerjasama yang baik',
      'Gratifikasi',
      'CSR perusahaan',
      'Bantuan sosial'
    ],
    correctAnswer: 1,
    explanation: 'Sponsorship untuk acara pribadi pejabat dari pihak yang memiliki kepentingan termasuk gratifikasi.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 138,
    text: 'Apa sanksi bagi PNS yang tidak melaporkan gratifikasi?',
    options: [
      'Teguran lisan',
      'Pemotongan gaji',
      'Pidana penjara',
      'Mutasi jabatan'
    ],
    correctAnswer: 2,
    explanation: 'PNS yang tidak melaporkan gratifikasi dapat dikenakan pidana penjara karena dianggap menerima suap.',
    category: 'gratifikasi',
    difficulty: 'Sulit'
  },
  {
    id: 139,
    text: 'Berapa lama masa tahanan maksimal untuk koruptor menurut UU?',
    options: [
      '20 tahun',
      '30 tahun',
      'Seumur hidup',
      'Hukuman mati'
    ],
    correctAnswer: 2,
    explanation: 'Koruptor dapat dijatuhi hukuman maksimal seumur hidup untuk kasus-kasus tertentu.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 140,
    text: 'Seorang kepala sekolah memungut uang gedung melebihi ketentuan. Ini termasuk...',
    options: [
      'Iuran sekolah',
      'Pungutan liar',
      'Dana komite',
      'Sumbangan sukarela'
    ],
    correctAnswer: 1,
    explanation: 'Memungut uang melebihi ketentuan yang ditetapkan termasuk pungutan liar.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 141,
    text: 'Apa yang dimaksud dengan "state capture"?',
    options: [
      'Pengambilalihan negara',
      'Penguasaan kebijakan negara oleh kepentingan tertentu',
      'Kudeta militer',
      'Privatisasi BUMN'
    ],
    correctAnswer: 1,
    explanation: 'State capture adalah kondisi dimana kebijakan negara dikuasai oleh kepentingan kelompok tertentu melalui korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 142,
    text: 'Seorang jaksa menerima uang untuk meringankan tuntutan. Ini termasuk...',
    options: [
      'Negosiasi hukum',
      'Suap dalam penegakan hukum',
      'Mediasi kasus',
      'Plea bargaining'
    ],
    correctAnswer: 1,
    explanation: 'Menerima uang untuk meringankan tuntutan merupakan suap dalam sistem penegakan hukum.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 143,
    text: 'Manakah lembaga yang BUKAN berwenang menangani korupsi?',
    options: [
      'KPK',
      'Kejaksaan',
      'Kepolisian',
      'Ombudsman'
    ],
    correctAnswer: 3,
    explanation: 'Ombudsman berwenang mengawasi pelayanan publik, bukan menangani kasus korupsi secara langsung.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 144,
    text: 'Apa yang dimaksud dengan "illicit enrichment"?',
    options: [
      'Kekayaan tidak wajar',
      'Investasi ilegal',
      'Pencucian uang',
      'Penggelapan pajak'
    ],
    correctAnswer: 0,
    explanation: 'Illicit enrichment adalah peningkatan kekayaan pejabat yang tidak dapat dijelaskan secara sah.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 145,
    text: 'Seorang pejabat menerima fasilitas umrah dari kontraktor. Ini termasuk...',
    options: [
      'Hadiah keagamaan',
      'Gratifikasi',
      'Bantuan ibadah',
      'CSR perusahaan'
    ],
    correctAnswer: 1,
    explanation: 'Fasilitas umrah dari pihak yang memiliki kepentingan bisnis termasuk gratifikasi.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 146,
    text: 'Berapa minimal kerugian negara agar kasus korupsi ditangani KPK?',
    options: [
      'Rp 500 juta',
      'Rp 1 miliar',
      'Rp 5 miliar',
      'Tidak ada batasan'
    ],
    correctAnswer: 1,
    explanation: 'KPK menangani kasus korupsi dengan kerugian negara minimal Rp 1 miliar.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 147,
    text: 'Apa kepanjangan dari LHKPN?',
    options: [
      'Laporan Harta Kekayaan Penyelenggara Negara',
      'Laporan Hasil Kekayaan Pejabat Negara',
      'Laporan Harta Kepemilikan Pejabat Negara',
      'Laporan Hasil Kepemilikan Penyelenggara Negara'
    ],
    correctAnswer: 0,
    explanation: 'LHKPN adalah Laporan Harta Kekayaan Penyelenggara Negara yang wajib dilaporkan secara berkala.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 148,
    text: 'Seorang pejabat menggunakan kendaraan dinas untuk mudik lebaran. Ini termasuk...',
    options: [
      'Hak pejabat',
      'Penyalahgunaan fasilitas negara',
      'Efisiensi transportasi',
      'Kebijakan instansi'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan kendaraan dinas untuk keperluan pribadi seperti mudik termasuk penyalahgunaan fasilitas negara.',
    category: 'penyalahgunaan',
    difficulty: 'Mudah'
  },
  {
    id: 149,
    text: 'Apa yang dimaksud dengan "revolving door" dalam konteks korupsi?',
    options: [
      'Pintu putar kantor',
      'Perpindahan pejabat-swasta yang menciptakan konflik kepentingan',
      'Rotasi jabatan',
      'Sistem kerja shift'
    ],
    correctAnswer: 1,
    explanation: 'Revolving door adalah perpindahan personel antara sektor publik dan swasta yang dapat menciptakan konflik kepentingan.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 150,
    text: 'Seorang auditor menerima uang untuk tidak melaporkan temuan. Ini termasuk...',
    options: [
      'Fee audit',
      'Suap untuk menutup temuan',
      'Insentif auditor',
      'Biaya konsultasi'
    ],
    correctAnswer: 1,
    explanation: 'Menerima uang untuk tidak melaporkan temuan audit merupakan suap yang merusak sistem pengawasan.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 151,
    text: 'Berapa persen maksimal fee manajemen dalam proyek pemerintah?',
    options: [
      'Tidak ada fee manajemen',
      '5%',
      '10%',
      'Tergantung kesepakatan'
    ],
    correctAnswer: 0,
    explanation: 'Tidak ada fee manajemen dalam proyek pemerintah. Semua biaya harus transparan dan akuntabel.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 152,
    text: 'Apa fungsi sistem SPIP dalam pencegahan korupsi?',
    options: [
      'Sistem penggajian',
      'Sistem pengendalian intern pemerintah',
      'Sistem pembelian barang',
      'Sistem pelayanan publik'
    ],
    correctAnswer: 1,
    explanation: 'SPIP (Sistem Pengendalian Intern Pemerintah) berfungsi mencegah korupsi melalui pengendalian internal.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 153,
    text: 'Seorang pejabat meminta jatah proyek 20%. Ini termasuk...',
    options: [
      'Bagi hasil',
      'Pemerasan proyek',
      'Komisi wajar',
      'Fee koordinasi'
    ],
    correctAnswer: 1,
    explanation: 'Meminta jatah proyek menggunakan kekuasaan jabatan termasuk pemerasan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 154,
    text: 'Kasus korupsi Wisma Atlet merugikan negara sekitar...',
    options: [
      'Rp 190 miliar',
      'Rp 290 miliar',
      'Rp 390 miliar',
      'Rp 490 miliar'
    ],
    correctAnswer: 0,
    explanation: 'Kasus korupsi pembangunan Wisma Atlet Jakabaring merugikan negara sekitar Rp 190 miliar.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 155,
    text: 'Apa yang dimaksud dengan "abuse of power"?',
    options: [
      'Penggunaan kekuasaan',
      'Penyalahgunaan wewenang',
      'Pembagian kekuasaan',
      'Pelimpahan wewenang'
    ],
    correctAnswer: 1,
    explanation: 'Abuse of power adalah penyalahgunaan wewenang untuk keuntungan pribadi atau kelompok.',
    category: 'penyalahgunaan',
    difficulty: 'Mudah'
  },
  {
    id: 156,
    text: 'Seorang pejabat menerima mobil dari pengusaha. Bagaimana seharusnya?',
    options: [
      'Menerima sebagai hadiah',
      'Melaporkan ke KPK',
      'Mengembalikan setelah dipakai',
      'Melelang untuk kas negara'
    ],
    correctAnswer: 1,
    explanation: 'Mobil dari pengusaha termasuk gratifikasi yang wajib dilaporkan ke KPK untuk ditentukan statusnya.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 157,
    text: 'Berapa lama waktu daluwarsa untuk kasus korupsi?',
    options: [
      '12 tahun',
      '18 tahun',
      '30 tahun',
      'Tidak ada daluwarsa'
    ],
    correctAnswer: 1,
    explanation: 'Kasus korupsi memiliki waktu daluwarsa 18 tahun sesuai ketentuan hukum pidana.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 158,
    text: 'Apa yang dimaksud dengan "procurement fraud"?',
    options: [
      'Pengadaan barang',
      'Kecurangan dalam pengadaan',
      'Sistem pengadaan',
      'Audit pengadaan'
    ],
    correctAnswer: 1,
    explanation: 'Procurement fraud adalah kecurangan dalam proses pengadaan barang/jasa pemerintah.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 159,
    text: 'Seorang pejabat mengangkat kerabat tanpa melalui seleksi. Ini termasuk...',
    options: [
      'Hak prerogatif',
      'Nepotisme',
      'Promosi jabatan',
      'Mutasi pegawai'
    ],
    correctAnswer: 1,
    explanation: 'Mengangkat kerabat tanpa melalui proses seleksi yang benar termasuk nepotisme.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 160,
    text: 'Manakah yang termasuk tindakan pencegahan korupsi?',
    options: [
      'Transparansi anggaran',
      'E-procurement',
      'Whistleblowing system',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Transparansi, e-procurement, dan whistleblowing system adalah upaya pencegahan korupsi.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 161,
    text: 'Seorang pejabat meminta uang pelicin untuk mempercepat izin. Ini termasuk...',
    options: [
      'Biaya percepatan',
      'Pungutan liar',
      'Fee administrasi',
      'Insentif pegawai'
    ],
    correctAnswer: 1,
    explanation: 'Meminta uang pelicin di luar ketentuan resmi termasuk pungutan liar.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 162,
    text: 'Apa sanksi tambahan yang dapat diberikan kepada koruptor?',
    options: [
      'Denda saja',
      'Pencabutan hak politik',
      'Teguran tertulis',
      'Pemotongan gaji'
    ],
    correctAnswer: 1,
    explanation: 'Koruptor dapat dikenakan sanksi tambahan berupa pencabutan hak politik selain pidana penjara.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 163,
    text: 'Berapa jumlah uang pengganti maksimal yang harus dibayar koruptor?',
    options: [
      'Sesuai kerugian negara',
      '2x kerugian negara',
      '3x kerugian negara',
      'Tidak ada batasan'
    ],
    correctAnswer: 0,
    explanation: 'Koruptor wajib membayar uang pengganti sesuai dengan jumlah kerugian negara yang ditimbulkan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 164,
    text: 'Apa yang dimaksud dengan "kickback"?',
    options: [
      'Tendangan balik',
      'Komisi ilegal dari nilai kontrak',
      'Pengembalian dana',
      'Pembatalan kontrak'
    ],
    correctAnswer: 1,
    explanation: 'Kickback adalah komisi ilegal yang diberikan setelah mendapatkan kontrak/proyek.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 165,
    text: 'Seorang pejabat menggunakan anggaran perjalanan dinas fiktif. Ini termasuk...',
    options: [
      'Efisiensi anggaran',
      'Mark up perjalanan dinas',
      'Kebijakan instansi',
      'Tunjangan pejabat'
    ],
    correctAnswer: 1,
    explanation: 'Membuat perjalanan dinas fiktif untuk mendapatkan uang termasuk mark up dan korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 166,
    text: 'Manakah yang BUKAN termasuk kerugian negara?',
    options: [
      'Hilangnya aset negara',
      'Berkurangnya penerimaan negara',
      'Keuntungan yang seharusnya diterima',
      'Fluktuasi nilai tukar'
    ],
    correctAnswer: 3,
    explanation: 'Fluktuasi nilai tukar adalah risiko ekonomi normal, bukan kerugian negara akibat korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 167,
    text: 'Apa fungsi BPKP dalam pencegahan korupsi?',
    options: [
      'Menangkap koruptor',
      'Pengawasan keuangan dan pembangunan',
      'Membuat undang-undang',
      'Mengadili koruptor'
    ],
    correctAnswer: 1,
    explanation: 'BPKP (Badan Pengawasan Keuangan dan Pembangunan) melakukan pengawasan untuk mencegah korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 168,
    text: 'Seorang pejabat menerima saham perusahaan dari pengusaha. Ini termasuk...',
    options: [
      'Investasi pribadi',
      'Gratifikasi',
      'Kerjasama bisnis',
      'Hadiah yang sah'
    ],
    correctAnswer: 1,
    explanation: 'Menerima saham dari pihak yang memiliki kepentingan termasuk gratifikasi.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 169,
    text: 'Berapa minimal usia untuk dapat dipidana karena korupsi?',
    options: [
      '17 tahun',
      '18 tahun',
      '21 tahun',
      'Tidak ada batasan usia'
    ],
    correctAnswer: 1,
    explanation: 'Seseorang dapat dipidana karena korupsi jika telah berusia 18 tahun atau sudah menikah.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 170,
    text: 'Apa yang dimaksud dengan "money laundering"?',
    options: [
      'Mencuci uang',
      'Pencucian uang hasil korupsi',
      'Transfer uang',
      'Investasi uang'
    ],
    correctAnswer: 1,
    explanation: 'Money laundering adalah proses menyamarkan uang hasil kejahatan termasuk korupsi agar terlihat sah.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 171,
    text: 'Seorang kepala daerah menggunakan dana CSR untuk kampanye. Ini termasuk...',
    options: [
      'Strategi kampanye',
      'Penyalahgunaan dana CSR',
      'Kerjasama politik',
      'Inovasi kampanye'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan dana CSR untuk kepentingan politik pribadi termasuk penyalahgunaan dana.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 172,
    text: 'Manakah yang termasuk red flag (tanda bahaya) korupsi?',
    options: [
      'Gaya hidup melebihi penghasilan',
      'Menghindari audit',
      'Dokumen yang hilang',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Gaya hidup mewah, menghindari audit, dan dokumen hilang adalah tanda-tanda adanya korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 173,
    text: 'Berapa lama seseorang dilarang menjadi pejabat setelah terbukti korupsi?',
    options: [
      '5 tahun',
      '10 tahun',
      'Seumur hidup',
      'Tergantung putusan hakim'
    ],
    correctAnswer: 3,
    explanation: 'Larangan menjadi pejabat setelah korupsi tergantung putusan hakim, bisa sementara atau seumur hidup.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 174,
    text: 'Apa yang dimaksud dengan "integrity pact"?',
    options: [
      'Sumpah jabatan',
      'Pakta integritas dalam pengadaan',
      'Perjanjian kerja',
      'Kontrak politik'
    ],
    correctAnswer: 1,
    explanation: 'Integrity pact adalah kesepakatan untuk tidak melakukan korupsi dalam proses pengadaan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 175,
    text: 'Seorang pejabat meminta sponsor untuk acara kantor dari vendor. Apakah diperbolehkan?',
    options: [
      'Boleh jika untuk kepentingan kantor',
      'Tidak boleh sama sekali',
      'Boleh dengan persetujuan atasan',
      'Boleh jika transparan'
    ],
    correctAnswer: 1,
    explanation: 'Meminta sponsor dari vendor yang memiliki hubungan bisnis tidak diperbolehkan untuk menghindari konflik kepentingan.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 176,
    text: 'Kasus korupsi BLBI merugikan negara sekitar...',
    options: [
      'Rp 138 triliun',
      'Rp 238 triliun',
      'Rp 338 triliun',
      'Rp 438 triliun'
    ],
    correctAnswer: 0,
    explanation: 'Kasus korupsi BLBI (Bantuan Likuiditas Bank Indonesia) merugikan negara sekitar Rp 138 triliun.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 177,
    text: 'Apa yang dimaksud dengan "rent seeking behavior"?',
    options: [
      'Mencari rumah sewa',
      'Mencari keuntungan tanpa produktivitas',
      'Bisnis properti',
      'Investasi sewa'
    ],
    correctAnswer: 1,
    explanation: 'Rent seeking adalah perilaku mencari keuntungan ekonomi tanpa memberikan kontribusi produktif.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 178,
    text: 'Seorang pejabat menerima komisi dari penjualan aset negara. Ini termasuk...',
    options: [
      'Fee penjualan',
      'Korupsi penjualan aset',
      'Insentif kinerja',
      'Komisi yang sah'
    ],
    correctAnswer: 1,
    explanation: 'Menerima komisi dari penjualan aset negara termasuk korupsi karena merugikan negara.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 179,
    text: 'Berapa persen minimal kepemilikan saham yang wajib dilaporkan dalam LHKPN?',
    options: [
      'Semua kepemilikan saham',
      '5%',
      '10%',
      '25%'
    ],
    correctAnswer: 0,
    explanation: 'Semua kepemilikan saham wajib dilaporkan dalam LHKPN tanpa melihat persentasenya.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 180,
    text: 'Apa sanksi bagi perusahaan yang terlibat korupsi?',
    options: [
      'Denda saja',
      'Pencabutan izin usaha',
      'Blacklist dari proyek pemerintah',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Perusahaan yang terlibat korupsi dapat dikenakan denda, pencabutan izin, dan blacklist.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 181,
    text: 'Seorang pejabat menggunakan informasi rahasia untuk keuntungan pribadi. Ini termasuk...',
    options: [
      'Insider trading',
      'Pelanggaran kerahasiaan',
      'Penyalahgunaan informasi',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Menggunakan informasi rahasia jabatan untuk keuntungan pribadi melanggar berbagai ketentuan.',
    category: 'penyalahgunaan',
    difficulty: 'Sulit'
  },
  {
    id: 182,
    text: 'Manakah yang BUKAN termasuk upaya pencegahan korupsi?',
    options: [
      'Rotasi jabatan',
      'Peningkatan gaji',
      'Pembiaran pelanggaran kecil',
      'Sistem pengawasan'
    ],
    correctAnswer: 2,
    explanation: 'Pembiaran pelanggaran kecil justru dapat mendorong terjadinya korupsi yang lebih besar.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 183,
    text: 'Berapa batas waktu KPK untuk melakukan penyidikan?',
    options: [
      '60 hari',
      '90 hari',
      '120 hari',
      'Tidak ada batas waktu'
    ],
    correctAnswer: 2,
    explanation: 'KPK memiliki waktu 120 hari untuk melakukan penyidikan yang dapat diperpanjang.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 184,
    text: 'Apa yang dimaksud dengan "grand corruption"?',
    options: [
      'Korupsi besar-besaran',
      'Korupsi kecil',
      'Korupsi berjamaah',
      'Korupsi terencana'
    ],
    correctAnswer: 0,
    explanation: 'Grand corruption adalah korupsi besar-besaran yang melibatkan pejabat tinggi dan kerugian besar.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 185,
    text: 'Seorang pejabat menerima berlian dari pengusaha. Bagaimana seharusnya?',
    options: [
      'Simpan sebagai investasi',
      'Laporkan ke KPK',
      'Jual dan masukkan kas negara',
      'Kembalikan diam-diam'
    ],
    correctAnswer: 1,
    explanation: 'Berlian dari pengusaha termasuk gratifikasi yang wajib dilaporkan ke KPK.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 186,
    text: 'Manakah yang termasuk korupsi politik?',
    options: [
      'Politik uang',
      'Jual beli jabatan',
      'Manipulasi suara',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Politik uang, jual beli jabatan, dan manipulasi suara termasuk bentuk korupsi politik.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 187,
    text: 'Berapa denda maksimal untuk tindak pidana korupsi?',
    options: [
      'Rp 1 miliar',
      'Rp 5 miliar',
      'Rp 10 miliar',
      'Rp 20 miliar'
    ],
    correctAnswer: 0,
    explanation: 'Denda maksimal untuk tindak pidana korupsi adalah Rp 1 miliar sesuai UU Tipikor.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 188,
    text: 'Apa yang dimaksud dengan "crony capitalism"?',
    options: [
      'Kapitalisme modern',
      'Kapitalisme kroni/kolusi',
      'Sistem ekonomi',
      'Pasar bebas'
    ],
    correctAnswer: 1,
    explanation: 'Crony capitalism adalah sistem ekonomi yang dikendalikan oleh hubungan kolusi antara pengusaha dan penguasa.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 189,
    text: 'Seorang pejabat meminta bagian 30% dari dana hibah. Ini termasuk...',
    options: [
      'Fee koordinasi',
      'Pemerasan dana hibah',
      'Biaya administrasi',
      'Komisi yang wajar'
    ],
    correctAnswer: 1,
    explanation: 'Meminta bagian dari dana hibah menggunakan kekuasaan jabatan termasuk pemerasan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 190,
    text: 'Manakah yang BUKAN termasuk prinsip good governance?',
    options: [
      'Transparansi',
      'Akuntabilitas',
      'Nepotisme',
      'Partisipasi'
    ],
    correctAnswer: 2,
    explanation: 'Nepotisme bertentangan dengan prinsip good governance yang mengedepankan profesionalisme.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 191,
    text: 'Kasus korupsi Jiwasraya merugikan negara sekitar...',
    options: [
      'Rp 16,8 triliun',
      'Rp 26,8 triliun',
      'Rp 36,8 triliun',
      'Rp 46,8 triliun'
    ],
    correctAnswer: 0,
    explanation: 'Kasus korupsi Jiwasraya merugikan negara sekitar Rp 16,8 triliun.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 192,
    text: 'Apa fungsi Stranas PK (Strategi Nasional Pencegahan Korupsi)?',
    options: [
      'Menangkap koruptor',
      'Koordinasi pencegahan korupsi',
      'Membuat undang-undang',
      'Mengadili koruptor'
    ],
    correctAnswer: 1,
    explanation: 'Stranas PK berfungsi mengkoordinasikan upaya pencegahan korupsi secara nasional.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 193,
    text: 'Seorang pejabat menerima tiket konser dari artis. Apakah termasuk gratifikasi?',
    options: [
      'Ya, wajib dilaporkan',
      'Tidak, karena bukan dari pengusaha',
      'Tergantung nilai tiket',
      'Tidak, karena hiburan'
    ],
    correctAnswer: 0,
    explanation: 'Semua pemberian kepada pejabat termasuk gratifikasi dan wajib dilaporkan, termasuk dari artis.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 194,
    text: 'Berapa jumlah minimal anggota masyarakat untuk membentuk komunitas anti korupsi?',
    options: [
      'Tidak ada ketentuan',
      '10 orang',
      '20 orang',
      '50 orang'
    ],
    correctAnswer: 0,
    explanation: 'Tidak ada ketentuan minimal untuk membentuk komunitas anti korupsi, siapa saja bisa memulai.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 195,
    text: 'Apa yang dimaksud dengan "state-corporate crime"?',
    options: [
      'Kejahatan negara',
      'Kejahatan korporasi',
      'Kolusi negara-korporasi dalam korupsi',
      'Kejahatan internasional'
    ],
    correctAnswer: 2,
    explanation: 'State-corporate crime adalah kejahatan yang melibatkan kolusi antara pejabat negara dan korporasi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 196,
    text: 'Seorang pejabat mengubah RTRW untuk kepentingan bisnis keluarga. Ini termasuk...',
    options: [
      'Perencanaan wilayah',
      'Penyalahgunaan wewenang',
      'Kebijakan pembangunan',
      'Diskresi pejabat'
    ],
    correctAnswer: 1,
    explanation: 'Mengubah Rencana Tata Ruang Wilayah untuk kepentingan pribadi termasuk penyalahgunaan wewenang.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 197,
    text: 'Manakah yang termasuk dalam Corruption Perception Index (CPI)?',
    options: [
      'Jumlah kasus korupsi',
      'Persepsi korupsi di sektor publik',
      'Kerugian negara',
      'Jumlah koruptor'
    ],
    correctAnswer: 1,
    explanation: 'CPI mengukur persepsi korupsi di sektor publik berdasarkan survei dan penilaian ahli.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 198,
    text: 'Berapa skor CPI Indonesia tahun 2023?',
    options: [
      '34',
      '38',
      '42',
      '46'
    ],
    correctAnswer: 0,
    explanation: 'Skor CPI Indonesia tahun 2023 adalah 34 dari skala 0-100 (0=sangat korup, 100=sangat bersih).',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 199,
    text: 'Apa yang dimaksud dengan "beneficial ownership"?',
    options: [
      'Kepemilikan saham',
      'Pemilik manfaat sebenarnya',
      'Direktur perusahaan',
      'Pemegang saham mayoritas'
    ],
    correctAnswer: 1,
    explanation: 'Beneficial ownership adalah pemilik manfaat sebenarnya yang sering disembunyikan dalam kasus korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 200,
    text: 'Seorang pejabat menerima voucher belanja Rp 300.000 saat lebaran. Apa yang harus dilakukan?',
    options: [
      'Gunakan untuk belanja',
      'Berikan ke keluarga',
      'Laporkan ke KPK',
      'Kembalikan ke pemberi'
    ],
    correctAnswer: 2,
    explanation: 'Voucher belanja termasuk gratifikasi yang wajib dilaporkan ke KPK dalam 30 hari kerja.',
    category: 'gratifikasi',
    difficulty: 'Mudah'
  },
  {
    id: 201,
    text: 'Manakah yang BUKAN termasuk tindak pidana korupsi menurut UU?',
    options: [
      'Kerugian keuangan negara',
      'Suap-menyuap',
      'Pelanggaran lalu lintas',
      'Gratifikasi'
    ],
    correctAnswer: 2,
    explanation: 'Pelanggaran lalu lintas bukan termasuk tindak pidana korupsi menurut UU Tipikor.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 202,
    text: 'Berapa jumlah maksimal uang tunai yang boleh dibawa saat OTT?',
    options: [
      'Tidak ada batasan',
      'Rp 50 juta',
      'Rp 100 juta',
      'Rp 500 juta'
    ],
    correctAnswer: 0,
    explanation: 'Tidak ada batasan jumlah uang tunai dalam OTT, semua barang bukti akan disita.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 203,
    text: 'Apa kepanjangan dari OTT?',
    options: [
      'Operasi Tangkap Tangan',
      'Operasi Tertib Terpadu',
      'Operasi Tindak Tegas',
      'Operasi Tertangkap Tangan'
    ],
    correctAnswer: 0,
    explanation: 'OTT adalah Operasi Tangkap Tangan yang dilakukan untuk menangkap pelaku korupsi.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 204,
    text: 'Seorang pejabat membocorkan soal tes CPNS kepada kerabat. Ini termasuk...',
    options: [
      'Bantuan keluarga',
      'Pelanggaran kerahasiaan',
      'Kebijakan pejabat',
      'Hak prerogatif'
    ],
    correctAnswer: 1,
    explanation: 'Membocorkan soal tes CPNS termasuk pelanggaran kerahasiaan dan penyalahgunaan wewenang.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 205,
    text: 'Manakah yang termasuk kerja sama internasional anti korupsi?',
    options: [
      'UNCAC',
      'Mutual Legal Assistance',
      'Ekstradisi koruptor',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'UNCAC, MLA, dan ekstradisi adalah bentuk kerja sama internasional dalam pemberantasan korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 206,
    text: 'Berapa persen recovery rate (tingkat pengembalian) aset korupsi di Indonesia?',
    options: [
      'Kurang dari 10%',
      '10-30%',
      '30-50%',
      'Lebih dari 50%'
    ],
    correctAnswer: 0,
    explanation: 'Recovery rate aset korupsi di Indonesia masih rendah, kurang dari 10% dari total kerugian.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 207,
    text: 'Apa yang dimaksud dengan "cooling-off period"?',
    options: [
      'Masa pembekuan jabatan',
      'Masa tunggu pejabat pindah ke swasta',
      'Masa cuti pejabat',
      'Masa pendinginan konflik'
    ],
    correctAnswer: 1,
    explanation: 'Cooling-off period adalah masa tunggu bagi pejabat sebelum bekerja di sektor swasta untuk mencegah konflik kepentingan.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 208,
    text: 'Seorang pejabat menerima kue lebaran dari tetangga. Apakah wajib dilaporkan?',
    options: [
      'Ya, semua wajib dilaporkan',
      'Tidak, karena dari tetangga',
      'Tergantung nilai kue',
      'Tidak, karena makanan'
    ],
    correctAnswer: 1,
    explanation: 'Pemberian dari tetangga yang tidak memiliki kepentingan dengan jabatan tidak wajib dilaporkan.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 209,
    text: 'Manakah yang BUKAN termasuk lembaga pengawas internal pemerintah?',
    options: [
      'Inspektorat Jenderal',
      'BPKP',
      'BPK',
      'Inspektorat Daerah'
    ],
    correctAnswer: 2,
    explanation: 'BPK adalah lembaga pengawas eksternal, bukan internal pemerintah.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 210,
    text: 'Berapa lama masa jabatan komisioner KPK?',
    options: [
      '4 tahun',
      '5 tahun',
      '6 tahun',
      '7 tahun'
    ],
    correctAnswer: 0,
    explanation: 'Komisioner KPK menjabat selama 4 tahun dan dapat dipilih kembali untuk 1 periode.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 211,
    text: 'Apa yang dimaksud dengan "regulatory capture"?',
    options: [
      'Penangkapan pelaku',
      'Penguasaan regulasi oleh kepentingan tertentu',
      'Pembuatan peraturan',
      'Pengawasan regulasi'
    ],
    correctAnswer: 1,
    explanation: 'Regulatory capture adalah kondisi dimana pembuat regulasi dikuasai oleh pihak yang seharusnya diatur.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 212,
    text: 'Seorang pejabat menggunakan data rahasia untuk bisnis pribadi. Ini termasuk...',
    options: [
      'Inovasi bisnis',
      'Penyalahgunaan informasi',
      'Kewirausahaan pejabat',
      'Pemanfaatan data'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan data rahasia jabatan untuk kepentingan bisnis pribadi termasuk penyalahgunaan informasi.',
    category: 'penyalahgunaan',
    difficulty: 'Sedang'
  },
  {
    id: 213,
    text: 'Manakah yang termasuk dalam delik korupsi?',
    options: [
      'Melawan hukum',
      'Memperkaya diri',
      'Merugikan negara',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Unsur delik korupsi meliputi perbuatan melawan hukum, memperkaya diri, dan merugikan keuangan negara.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 214,
    text: 'Berapa jumlah minimum gratifikasi yang dianggap suap jika tidak dilaporkan?',
    options: [
      'Rp 10 juta',
      'Rp 50 juta',
      'Rp 100 juta',
      'Semua nilai dianggap suap'
    ],
    correctAnswer: 3,
    explanation: 'Semua gratifikasi yang tidak dilaporkan dapat dianggap sebagai suap tanpa melihat nilainya.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 215,
    text: 'Apa yang dimaksud dengan "integrity due diligence"?',
    options: [
      'Uji integritas calon pejabat',
      'Audit keuangan',
      'Pemeriksaan kesehatan',
      'Tes psikologi'
    ],
    correctAnswer: 0,
    explanation: 'Integrity due diligence adalah proses uji tuntas untuk menilai integritas calon pejabat atau mitra bisnis.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 216,
    text: 'Seorang pejabat menerima beasiswa S2 dari perusahaan swasta. Bagaimana seharusnya?',
    options: [
      'Langsung terima',
      'Laporkan ke KPK',
      'Minta izin atasan',
      'Tolak langsung'
    ],
    correctAnswer: 1,
    explanation: 'Beasiswa dari perusahaan swasta termasuk gratifikasi yang wajib dilaporkan ke KPK.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 217,
    text: 'Manakah yang BUKAN termasuk prinsip pengadaan barang/jasa pemerintah?',
    options: [
      'Efisien',
      'Efektif',
      'Transparan',
      'Eksklusif'
    ],
    correctAnswer: 3,
    explanation: 'Eksklusif bukan prinsip pengadaan. Prinsipnya adalah terbuka dan bersaing.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 218,
    text: 'Berapa persen tingkat korupsi di sektor perizinan menurut survei?',
    options: [
      '20-30%',
      '30-40%',
      '40-50%',
      'Lebih dari 50%'
    ],
    correctAnswer: 3,
    explanation: 'Survei menunjukkan lebih dari 50% responden mengalami pungutan liar dalam pengurusan izin.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 219,
    text: 'Apa fungsi PPATK dalam pencegahan korupsi?',
    options: [
      'Menangkap koruptor',
      'Analisis transaksi keuangan mencurigakan',
      'Menyidik kasus',
      'Mengadili koruptor'
    ],
    correctAnswer: 1,
    explanation: 'PPATK (Pusat Pelaporan dan Analisis Transaksi Keuangan) menganalisis transaksi mencurigakan termasuk dari korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 220,
    text: 'Seorang pejabat meminta jatah 5% dari DAK. Ini termasuk...',
    options: [
      'Fee koordinasi',
      'Pungutan liar',
      'Biaya administrasi',
      'Insentif daerah'
    ],
    correctAnswer: 1,
    explanation: 'Meminta jatah dari Dana Alokasi Khusus termasuk pungutan liar dan korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 221,
    text: 'Manakah yang termasuk early warning system korupsi?',
    options: [
      'LHKPN',
      'Whistleblowing system',
      'Analisis gaya hidup',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'LHKPN, whistleblowing, dan analisis gaya hidup adalah sistem deteksi dini korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 222,
    text: 'Berapa jumlah kekayaan yang wajib dilaporkan dalam LHKPN?',
    options: [
      'Di atas Rp 50 juta',
      'Di atas Rp 100 juta',
      'Di atas Rp 500 juta',
      'Semua kekayaan'
    ],
    correctAnswer: 3,
    explanation: 'Semua kekayaan wajib dilaporkan dalam LHKPN tanpa batasan nilai minimal.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 223,
    text: 'Apa yang dimaksud dengan "political exposed person" (PEP)?',
    options: [
      'Politisi terkenal',
      'Orang yang memiliki/pernah memiliki kekuasaan publik',
      'Aktivis politik',
      'Pengamat politik'
    ],
    correctAnswer: 1,
    explanation: 'PEP adalah orang yang memiliki atau pernah memiliki kekuasaan publik dan berisiko terlibat korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 224,
    text: 'Seorang pejabat menggunakan rumah dinas untuk bisnis kos-kosan. Ini termasuk...',
    options: [
      'Optimalisasi aset',
      'Penyalahgunaan aset negara',
      'Bisnis sampingan',
      'Pemanfaatan aset'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan rumah dinas untuk bisnis pribadi termasuk penyalahgunaan aset negara.',
    category: 'penyalahgunaan',
    difficulty: 'Mudah'
  },
  {
    id: 225,
    text: 'Manakah yang BUKAN termasuk unsur suap?',
    options: [
      'Memberi atau menjanjikan sesuatu',
      'Kepada pejabat',
      'Untuk kepentingan umum',
      'Agar berbuat/tidak berbuat dalam jabatan'
    ],
    correctAnswer: 2,
    explanation: 'Suap dilakukan untuk kepentingan pribadi, bukan kepentingan umum.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 226,
    text: 'Berapa lama waktu yang diberikan untuk banding atas status gratifikasi dari KPK?',
    options: [
      '7 hari',
      '14 hari',
      '30 hari',
      '60 hari'
    ],
    correctAnswer: 2,
    explanation: 'Penerima gratifikasi dapat mengajukan banding atas penetapan status dalam waktu 30 hari.',
    category: 'gratifikasi',
    difficulty: 'Sulit'
  },
  {
    id: 227,
    text: 'Apa yang dimaksud dengan "corporate criminal liability"?',
    options: [
      'Tanggung jawab karyawan',
      'Pertanggungjawaban pidana korporasi',
      'Asuransi perusahaan',
      'Audit perusahaan'
    ],
    correctAnswer: 1,
    explanation: 'Corporate criminal liability adalah pertanggungjawaban pidana yang dapat dikenakan kepada korporasi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 228,
    text: 'Seorang pejabat meminta THR dari kontraktor. Ini termasuk...',
    options: [
      'Tradisi lebaran',
      'Pungutan liar',
      'Tunjangan hari raya',
      'Bonus proyek'
    ],
    correctAnswer: 1,
    explanation: 'Meminta THR dari kontraktor yang memiliki hubungan bisnis termasuk pungutan liar.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 229,
    text: 'Manakah yang termasuk dalam Sistem Integritas Nasional?',
    options: [
      'Eksekutif yang bersih',
      'Legislatif yang akuntabel',
      'Yudikatif yang independen',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Sistem Integritas Nasional mencakup semua pilar pemerintahan yang bersih dan akuntabel.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 230,
    text: 'Berapa persentase anggaran pendidikan yang sering dikorupsi?',
    options: [
      '10-20%',
      '20-30%',
      '30-40%',
      '40-50%'
    ],
    correctAnswer: 1,
    explanation: 'Studi menunjukkan 20-30% anggaran pendidikan rawan dikorupsi melalui berbagai modus.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 231,
    text: 'Apa yang dimaksud dengan "judicial corruption"?',
    options: [
      'Korupsi di pengadilan',
      'Korupsi hakim',
      'Mafia peradilan',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Judicial corruption mencakup semua bentuk korupsi dalam sistem peradilan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 232,
    text: 'Seorang pejabat menerima diskon 50% untuk mobil pribadi dari dealer. Bagaimana seharusnya?',
    options: [
      'Terima karena membeli sendiri',
      'Laporkan ke KPK',
      'Bayar harga penuh',
      'Minta diskon lebih'
    ],
    correctAnswer: 1,
    explanation: 'Diskon khusus karena jabatan termasuk gratifikasi yang wajib dilaporkan.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 233,
    text: 'Manakah yang BUKAN termasuk red flag transaksi mencurigakan?',
    options: [
      'Transfer dalam jumlah besar',
      'Transaksi rutin bulanan',
      'Pemecahan transaksi',
      'Transfer ke luar negeri'
    ],
    correctAnswer: 1,
    explanation: 'Transaksi rutin bulanan dengan pola normal bukan indikator mencurigakan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 234,
    text: 'Berapa jumlah negara yang meratifikasi UNCAC?',
    options: [
      'Kurang dari 100',
      '100-150',
      '150-180',
      'Lebih dari 180'
    ],
    correctAnswer: 3,
    explanation: 'Lebih dari 180 negara telah meratifikasi United Nations Convention Against Corruption.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 235,
    text: 'Apa sanksi bagi saksi yang memberikan keterangan palsu dalam kasus korupsi?',
    options: [
      'Denda saja',
      'Pidana penjara',
      'Sanksi administratif',
      'Tidak ada sanksi'
    ],
    correctAnswer: 1,
    explanation: 'Saksi yang memberikan keterangan palsu dapat dipidana penjara sesuai KUHP.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 236,
    text: 'Seorang pejabat menggunakan SPPD fiktif berulang kali. Ini termasuk...',
    options: [
      'Kesalahan administrasi',
      'Korupsi sistematis',
      'Kelalaian',
      'Ketidaktahuan'
    ],
    correctAnswer: 1,
    explanation: 'Penggunaan SPPD fiktif berulang menunjukkan pola korupsi yang sistematis.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 237,
    text: 'Manakah yang termasuk dalam "fraud triangle"?',
    options: [
      'Tekanan',
      'Kesempatan',
      'Rasionalisasi',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Fraud triangle terdiri dari tekanan (pressure), kesempatan (opportunity), dan rasionalisasi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 238,
    text: 'Berapa persen PDB Indonesia yang hilang akibat korupsi per tahun?',
    options: [
      '1-2%',
      '2-3%',
      '3-4%',
      '4-5%'
    ],
    correctAnswer: 1,
    explanation: 'Diperkirakan 2-3% PDB Indonesia hilang setiap tahun akibat korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 239,
    text: 'Apa yang dimaksud dengan "facilitation payment"?',
    options: [
      'Pembayaran resmi',
      'Uang pelicin untuk mempercepat proses',
      'Biaya administrasi',
      'Denda keterlambatan'
    ],
    correctAnswer: 1,
    explanation: 'Facilitation payment adalah uang pelicin untuk mempercepat proses yang seharusnya gratis/normal.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 240,
    text: 'Seorang pejabat meminta saham 10% untuk meloloskan izin. Ini termasuk...',
    options: [
      'Investasi bersama',
      'Pemerasan ekonomi',
      'Kerjasama bisnis',
      'Joint venture'
    ],
    correctAnswer: 1,
    explanation: 'Meminta saham sebagai syarat pemberian izin termasuk pemerasan ekonomi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 241,
    text: 'Manakah yang BUKAN termasuk peran masyarakat dalam pencegahan korupsi?',
    options: [
      'Melaporkan dugaan korupsi',
      'Mengawasi proyek pemerintah',
      'Menolak memberi suap',
      'Melakukan main hakim sendiri'
    ],
    correctAnswer: 3,
    explanation: 'Main hakim sendiri bukan cara yang benar, harus melalui jalur hukum.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 242,
    text: 'Berapa jumlah uang yang dikembalikan ke kas negara dari kasus korupsi tahun 2023?',
    options: [
      'Rp 1-5 triliun',
      'Rp 5-10 triliun',
      'Rp 10-15 triliun',
      'Lebih dari Rp 15 triliun'
    ],
    correctAnswer: 0,
    explanation: 'Pengembalian kerugian negara dari kasus korupsi tahun 2023 sekitar Rp 3,7 triliun.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 243,
    text: 'Apa yang dimaksud dengan "conflict of interest disclosure"?',
    options: [
      'Merahasiakan konflik',
      'Pengungkapan benturan kepentingan',
      'Menghindari konflik',
      'Menyelesaikan konflik'
    ],
    correctAnswer: 1,
    explanation: 'Conflict of interest disclosure adalah kewajiban untuk mengungkapkan setiap situasi yang dapat menimbulkan benturan kepentingan antara kepentingan pribadi dengan tugas publik. Ini merupakan bagian penting dari transparansi dan pencegahan korupsi.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 244,
    text: 'Berapa lama waktu yang diberikan untuk melaporkan gratifikasi ke KPK?',
    options: [
      '7 hari kerja',
      '14 hari kerja',
      '30 hari kerja',
      '60 hari kerja'
    ],
    correctAnswer: 2,
    explanation: 'Menurut Pasal 12C UU Tipikor, penerima gratifikasi wajib melaporkan ke KPK paling lambat 30 hari kerja sejak tanggal gratifikasi diterima.',
    category: 'gratifikasi',
    difficulty: 'Mudah'
  },
  {
    id: 245,
    text: 'Apa sanksi bagi PNS yang tidak melaporkan gratifikasi?',
    options: [
      'Teguran lisan',
      'Pidana penjara maksimal 20 tahun',
      'Denda maksimal Rp 50 juta',
      'Pemberhentian sementara'
    ],
    correctAnswer: 1,
    explanation: 'Gratifikasi yang tidak dilaporkan dianggap suap dengan ancaman pidana penjara minimal 4 tahun dan maksimal 20 tahun serta denda minimal Rp 200 juta dan maksimal Rp 1 miliar.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 246,
    text: 'Sistem JAGA KPK adalah singkatan dari?',
    options: [
      'Jaringan Gratifikasi',
      'Jangan Ambil Gratifikasi Apapun',
      'Jejaring Advokasi Gratifikasi dan Antikorupsi',
      'Jaga Amanah Gratifikasi Anda'
    ],
    correctAnswer: 1,
    explanation: 'JAGA adalah kampanye KPK yang merupakan singkatan dari "Jangan Ambil Gratifikasi Apapun" untuk mendorong penolakan terhadap segala bentuk gratifikasi.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  },
  {
    id: 247,
    text: 'Manakah yang BUKAN termasuk gratifikasi yang diperbolehkan?',
    options: [
      'Hadiah dari keluarga sedarah',
      'Pemberian dalam acara pernikahan senilai Rp 1 juta',
      'Beasiswa pendidikan dari pemerintah',
      'Parsel lebaran dari rekanan bisnis senilai Rp 2 juta'
    ],
    correctAnswer: 3,
    explanation: 'Parsel dari rekanan bisnis senilai Rp 2 juta harus dilaporkan ke KPK karena berpotensi mempengaruhi independensi pejabat. Gratifikasi dari keluarga, hadiah pernikahan wajar, dan beasiswa resmi dikecualikan.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 248,
    text: 'Apa yang dimaksud dengan "state capture"?',
    options: [
      'Pengambilalihan aset negara',
      'Penguasaan negara oleh kelompok kepentingan',
      'Nasionalisasi perusahaan',
      'Privatisasi BUMN'
    ],
    correctAnswer: 1,
    explanation: 'State capture adalah situasi dimana kelompok kepentingan tertentu menguasai pengambilan keputusan negara untuk keuntungan mereka, merupakan bentuk korupsi sistemik yang sangat berbahaya.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 249,
    text: 'Berapa nilai minimal kerugian negara agar kasus korupsi ditangani KPK?',
    options: [
      'Rp 500 juta',
      'Rp 1 miliar',
      'Rp 2 miliar',
      'Rp 5 miliar'
    ],
    correctAnswer: 1,
    explanation: 'Sesuai Pasal 11 UU KPK, KPK berwenang menangani kasus korupsi dengan kerugian negara minimal Rp 1 miliar.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 250,
    text: 'Apa perbedaan antara suap aktif dan suap pasif?',
    options: [
      'Suap aktif memberi, suap pasif menerima',
      'Suap aktif menerima, suap pasif memberi',
      'Suap aktif dilakukan pejabat, suap pasif dilakukan swasta',
      'Tidak ada perbedaan'
    ],
    correctAnswer: 0,
    explanation: 'Suap aktif adalah tindakan memberi atau menjanjikan sesuatu kepada pejabat, sedangkan suap pasif adalah tindakan menerima atau meminta sesuatu oleh pejabat.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 251,
    text: 'Kasus e-KTP merugikan negara sebesar?',
    options: [
      'Rp 1,2 triliun',
      'Rp 2,3 triliun',
      'Rp 3,4 triliun',
      'Rp 4,5 triliun'
    ],
    correctAnswer: 1,
    explanation: 'Kasus korupsi e-KTP merugikan negara sebesar Rp 2,3 triliun dan melibatkan banyak pejabat tinggi negara, menjadi salah satu kasus korupsi terbesar di Indonesia.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 252,
    text: 'Apa yang dimaksud dengan "mark up" dalam konteks korupsi?',
    options: [
      'Menurunkan harga',
      'Menaikkan harga di atas wajar',
      'Menetapkan harga pasar',
      'Memberikan diskon'
    ],
    correctAnswer: 1,
    explanation: 'Mark up adalah penggelembungan harga barang/jasa di atas harga wajar dalam pengadaan untuk mendapatkan keuntungan ilegal, merupakan modus korupsi yang umum.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 253,
    text: 'Sistem LHKPN adalah singkatan dari?',
    options: [
      'Laporan Harta Kekayaan Penyelenggara Negara',
      'Laporan Hasil Kinerja Pejabat Negara',
      'Lembaga Hukum Korupsi Penyelenggara Negara',
      'Layanan Hukum Kasus Pejabat Negara'
    ],
    correctAnswer: 0,
    explanation: 'LHKPN (Laporan Harta Kekayaan Penyelenggara Negara) adalah kewajiban pelaporan harta kekayaan bagi penyelenggara negara sebagai bentuk transparansi dan pencegahan korupsi.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  },
  {
    id: 254,
    text: 'Berapa lama masa tahanan maksimal untuk tindak pidana korupsi?',
    options: [
      '10 tahun',
      '15 tahun',
      '20 tahun',
      'Seumur hidup'
    ],
    correctAnswer: 3,
    explanation: 'Untuk kasus korupsi tertentu yang sangat merugikan keuangan negara atau perekonomian negara, pelaku dapat dijatuhi pidana penjara seumur hidup.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 255,
    text: 'Apa yang dimaksud dengan "revolving door" dalam konteks korupsi?',
    options: [
      'Pintu putar di gedung pemerintahan',
      'Perpindahan pejabat antara sektor publik dan swasta',
      'Rotasi jabatan internal',
      'Sistem keamanan gedung'
    ],
    correctAnswer: 1,
    explanation: 'Revolving door adalah praktik perpindahan pejabat antara sektor publik dan swasta yang berpotensi menimbulkan konflik kepentingan dan korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 256,
    text: 'Berapa persen maksimal fee yang diperbolehkan dalam pengadaan barang/jasa pemerintah?',
    options: [
      '0% (tidak ada fee)',
      '5%',
      '10%',
      '15%'
    ],
    correctAnswer: 0,
    explanation: 'Tidak ada fee yang diperbolehkan dalam pengadaan barang/jasa pemerintah. Setiap bentuk fee atau komisi dianggap sebagai suap.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 257,
    text: 'Apa nama sistem pelaporan online KPK untuk whistleblower?',
    options: [
      'e-Lapor',
      'WISE',
      'JAGA Lapor',
      'Lapor.go.id'
    ],
    correctAnswer: 1,
    explanation: 'WISE (Whistleblowing System) adalah sistem pelaporan online KPK yang menjamin kerahasiaan identitas pelapor tindak pidana korupsi.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  },
  {
    id: 258,
    text: 'Manakah yang termasuk tindakan "abuse of power"?',
    options: [
      'Menggunakan wewenang sesuai aturan',
      'Mendelegasikan tugas kepada bawahan',
      'Memerintahkan bawahan untuk kepentingan pribadi',
      'Mengambil keputusan berdasarkan musyawarah'
    ],
    correctAnswer: 2,
    explanation: 'Abuse of power (penyalahgunaan wewenang) terjadi ketika pejabat menggunakan kewenangannya untuk kepentingan pribadi, termasuk memerintahkan bawahan untuk urusan pribadi.',
    category: 'penyalahgunaan',
    difficulty: 'Mudah'
  },
  {
    id: 259,
    text: 'Berapa jumlah maksimal gratifikasi yang boleh diterima tanpa harus lapor?',
    options: [
      'Tidak ada (semua harus dilaporkan)',
      'Rp 1 juta',
      'Rp 3 juta',
      'Rp 5 juta'
    ],
    correctAnswer: 0,
    explanation: 'Semua gratifikasi yang diterima penyelenggara negara wajib dilaporkan ke KPK, tidak ada batasan nilai minimal.',
    category: 'gratifikasi',
    difficulty: 'Sedang'
  },
  {
    id: 260,
    text: 'Apa sanksi bagi saksi yang tidak mau bersaksi dalam kasus korupsi?',
    options: [
      'Denda Rp 10 juta',
      'Pidana penjara maksimal 3 tahun',
      'Tidak ada sanksi',
      'Pencabutan hak kewarganegaraan'
    ],
    correctAnswer: 1,
    explanation: 'Saksi yang menolak memberikan keterangan dalam perkara korupsi dapat dipidana penjara maksimal 3 tahun sesuai Pasal 28 UU Tipikor.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 261,
    text: 'Apa yang dimaksud dengan "beneficial ownership"?',
    options: [
      'Kepemilikan saham mayoritas',
      'Pemilik manfaat yang sebenarnya',
      'Pemilik perusahaan terdaftar',
      'Kepemilikan aset tetap'
    ],
    correctAnswer: 1,
    explanation: 'Beneficial ownership adalah pemilik manfaat yang sebenarnya dari suatu perusahaan/aset, penting untuk transparansi dan pencegahan pencucian uang hasil korupsi.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 262,
    text: 'Berapa lama masa kadaluarsa penuntutan kasus korupsi?',
    options: [
      '12 tahun',
      '18 tahun',
      '30 tahun',
      'Tidak ada kadaluarsa'
    ],
    correctAnswer: 1,
    explanation: 'Masa kadaluarsa penuntutan tindak pidana korupsi adalah 18 tahun sesuai Pasal 78 KUHP jo. Pasal 40 UU Tipikor.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 263,
    text: 'Apa peran APIP dalam pencegahan korupsi?',
    options: [
      'Menangkap koruptor',
      'Pengawasan internal pemerintah',
      'Menetapkan tersangka',
      'Menyidik kasus korupsi'
    ],
    correctAnswer: 1,
    explanation: 'APIP (Aparat Pengawasan Intern Pemerintah) berperan melakukan pengawasan internal untuk mencegah dan mendeteksi dini potensi korupsi di instansi pemerintah.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 264,
    text: 'Manakah contoh "kickback" dalam pengadaan?',
    options: [
      'Diskon dari vendor',
      'Pengembalian sebagian nilai kontrak ke pejabat',
      'Cashback untuk pembeli',
      'Potongan harga volume'
    ],
    correctAnswer: 1,
    explanation: 'Kickback adalah pengembalian sebagian nilai kontrak dari pemenang tender kepada pejabat pengadaan sebagai balas jasa, merupakan bentuk suap.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 265,
    text: 'Kasus Century Bank merugikan negara sebesar?',
    options: [
      'Rp 6,7 triliun',
      'Rp 7,8 triliun',
      'Rp 8,9 triliun',
      'Rp 9,1 triliun'
    ],
    correctAnswer: 0,
    explanation: 'Kasus bailout Bank Century merugikan negara sebesar Rp 6,7 triliun, menjadi salah satu kasus kontroversial terkait kebijakan penyelamatan bank.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 266,
    text: 'Apa yang dimaksud dengan "integrity pact"?',
    options: [
      'Sumpah jabatan',
      'Pakta integritas dalam pengadaan',
      'Perjanjian kerja',
      'Kontrak bisnis'
    ],
    correctAnswer: 1,
    explanation: 'Integrity pact adalah pakta integritas yang ditandatangani peserta tender untuk tidak melakukan kolusi, korupsi, dan nepotisme dalam proses pengadaan.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 267,
    text: 'Berapa persen uang pengganti maksimal dari harta terpidana korupsi?',
    options: [
      '50%',
      '75%',
      '100%',
      'Tidak terbatas'
    ],
    correctAnswer: 2,
    explanation: 'Uang pengganti dapat mencapai 100% dari harta terpidana korupsi bahkan bisa melebihi jika kerugian negara lebih besar dari harta yang dimiliki.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 268,
    text: 'Apa sanksi bagi perusahaan yang terlibat korupsi?',
    options: [
      'Teguran tertulis',
      'Pencabutan izin usaha',
      'Denda maksimal Rp 100 juta',
      'Tidak ada sanksi untuk perusahaan'
    ],
    correctAnswer: 1,
    explanation: 'Perusahaan yang terlibat korupsi dapat dikenai sanksi pencabutan izin usaha, blacklist dari tender pemerintah, dan denda sesuai kerugian negara.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 269,
    text: 'Apa yang dimaksud dengan "politically exposed person" (PEP)?',
    options: [
      'Aktivis politik',
      'Pejabat publik berisiko tinggi korupsi',
      'Anggota partai politik',
      'Calon legislatif'
    ],
    correctAnswer: 1,
    explanation: 'PEP adalah individu yang menduduki jabatan publik penting dan berisiko tinggi terlibat korupsi, memerlukan pengawasan khusus dalam transaksi keuangan.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 270,
    text: 'Manakah yang BUKAN termasuk kerugian negara?',
    options: [
      'Berkurangnya aset negara',
      'Bertambahnya kewajiban negara',
      'Hilangnya keuntungan yang seharusnya diterima',
      'Penurunan nilai tukar rupiah'
    ],
    correctAnswer: 3,
    explanation: 'Penurunan nilai tukar rupiah bukan termasuk kerugian negara dalam konteks korupsi. Kerugian negara meliputi berkurangnya aset, bertambahnya kewajiban, atau hilangnya keuntungan.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 271,
    text: 'Berapa lama perlindungan diberikan kepada whistleblower?',
    options: [
      '1 tahun',
      '5 tahun',
      'Selama proses hukum',
      'Seumur hidup jika diperlukan'
    ],
    correctAnswer: 3,
    explanation: 'Perlindungan whistleblower diberikan selama diperlukan, bahkan seumur hidup jika ancaman masih ada, sesuai UU Perlindungan Saksi dan Korban.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 272,
    text: 'Apa yang dimaksud dengan "asset recovery"?',
    options: [
      'Pemulihan ekonomi',
      'Pengembalian aset hasil korupsi',
      'Restrukturisasi aset',
      'Penjualan aset negara'
    ],
    correctAnswer: 1,
    explanation: 'Asset recovery adalah upaya pengembalian aset hasil tindak pidana korupsi kepada negara, termasuk yang disembunyikan di luar negeri.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 273,
    text: 'Berapa minimal orang untuk memenuhi unsur "bersama-sama" dalam korupsi?',
    options: [
      '2 orang',
      '3 orang',
      '4 orang',
      '5 orang'
    ],
    correctAnswer: 0,
    explanation: 'Unsur "bersama-sama" dalam tindak pidana korupsi terpenuhi dengan minimal 2 orang yang bersekongkol melakukan korupsi.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 274,
    text: 'Apa perbedaan korupsi dan pencucian uang?',
    options: [
      'Tidak ada perbedaan',
      'Korupsi mengambil uang negara, pencucian uang menyamarkan asal uang',
      'Korupsi dilakukan pejabat, pencucian uang dilakukan swasta',
      'Korupsi pidana ringan, pencucian uang pidana berat'
    ],
    correctAnswer: 1,
    explanation: 'Korupsi adalah tindak pidana asal yang merugikan negara, sedangkan pencucian uang adalah upaya menyamarkan asal-usul harta hasil kejahatan termasuk korupsi.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 275,
    text: 'Siapa yang berwenang menetapkan status tersangka korupsi?',
    options: [
      'Presiden',
      'Penyidik (Polisi/Jaksa/KPK)',
      'Hakim',
      'DPR'
    ],
    correctAnswer: 1,
    explanation: 'Penyidik dari Kepolisian, Kejaksaan, atau KPK yang berwenang menetapkan status tersangka berdasarkan minimal 2 alat bukti.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 276,
    text: 'Apa yang dimaksud dengan "red flag" dalam audit?',
    options: [
      'Bendera merah',
      'Indikasi awal kecurangan',
      'Tanda bahaya',
      'Peringatan sistem'
    ],
    correctAnswer: 1,
    explanation: 'Red flag adalah indikasi atau tanda awal adanya kecurangan/korupsi yang ditemukan dalam proses audit, memerlukan investigasi lebih lanjut.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 277,
    text: 'Berapa jumlah minimal alat bukti untuk menetapkan tersangka korupsi?',
    options: [
      '1 alat bukti',
      '2 alat bukti',
      '3 alat bukti',
      '4 alat bukti'
    ],
    correctAnswer: 1,
    explanation: 'Sesuai KUHAP, diperlukan minimal 2 alat bukti yang sah untuk menetapkan seseorang sebagai tersangka tindak pidana korupsi.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 278,
    text: 'Apa sanksi bagi advokat yang membantu klien menyembunyikan aset korupsi?',
    options: [
      'Teguran dari organisasi advokat',
      'Pencabutan izin praktik',
      'Pidana penjara sebagai pelaku pencucian uang',
      'Semua benar'
    ],
    correctAnswer: 3,
    explanation: 'Advokat yang membantu menyembunyikan aset korupsi dapat dikenai sanksi etik, pencabutan izin, dan pidana pencucian uang.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 279,
    text: 'Manakah yang termasuk "grand corruption"?',
    options: [
      'Pungli di jalan raya',
      'Korupsi proyek infrastruktur besar',
      'Gratifikasi parsel lebaran',
      'Mark up ATK kantor'
    ],
    correctAnswer: 1,
    explanation: 'Grand corruption adalah korupsi berskala besar yang melibatkan pejabat tinggi dan kerugian negara sangat besar, seperti korupsi mega proyek infrastruktur.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 280,
    text: 'Apa peran masyarakat dalam pencegahan korupsi?',
    options: [
      'Tidak ada peran',
      'Hanya sebagai korban',
      'Ikut mengawasi dan melaporkan',
      'Menunggu tindakan pemerintah'
    ],
    correctAnswer: 2,
    explanation: 'Masyarakat berperan aktif dalam pencegahan korupsi melalui pengawasan, pelaporan, dan partisipasi dalam program antikorupsi.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  },
  {
    id: 281,
    text: 'Berapa persen minimal kepemilikan saham untuk dikategorikan sebagai pengendali perusahaan?',
    options: [
      '25%',
      '50%',
      '51%',
      '75%'
    ],
    correctAnswer: 0,
    explanation: 'Kepemilikan saham 25% atau lebih dianggap sebagai pengendali perusahaan dan wajib dilaporkan dalam LHKPN untuk transparansi.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 282,
    text: 'Apa yang dimaksud dengan "predicate crime"?',
    options: [
      'Kejahatan terorganisir',
      'Tindak pidana asal',
      'Kejahatan berulang',
      'Kejahatan terencana'
    ],
    correctAnswer: 1,
    explanation: 'Predicate crime adalah tindak pidana asal (seperti korupsi) yang menghasilkan harta kekayaan yang kemudian dicuci melalui pencucian uang.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 283,
    text: 'Manakah yang BUKAN termasuk alat bukti sah dalam kasus korupsi?',
    options: [
      'Keterangan saksi',
      'Surat/dokumen',
      'Petunjuk',
      'Desas-desus'
    ],
    correctAnswer: 3,
    explanation: 'Desas-desus bukan alat bukti sah. Alat bukti sah meliputi: keterangan saksi, keterangan ahli, surat, petunjuk, dan keterangan terdakwa.',
    category: 'korupsi',
    difficulty: 'Mudah'
  },
  {
    id: 284,
    text: 'Berapa lama masa jabatan pimpinan KPK?',
    options: [
      '3 tahun',
      '4 tahun',
      '5 tahun',
      '6 tahun'
    ],
    correctAnswer: 1,
    explanation: 'Pimpinan KPK menjabat selama 4 tahun dan dapat dipilih kembali untuk 1 kali masa jabatan.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  },
  {
    id: 285,
    text: 'Apa yang dimaksud dengan "cooling-off period"?',
    options: [
      'Masa istirahat',
      'Masa tunggu sebelum pindah ke sektor swasta',
      'Masa percobaan',
      'Masa pensiun'
    ],
    correctAnswer: 1,
    explanation: 'Cooling-off period adalah masa tunggu bagi pejabat publik sebelum dapat bekerja di sektor swasta yang pernah berurusan dengan jabatannya untuk mencegah konflik kepentingan.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 286,
    text: 'Kasus BLBI merugikan negara sebesar?',
    options: [
      'Rp 138,4 triliun',
      'Rp 148,4 triliun',
      'Rp 158,4 triliun',
      'Rp 168,4 triliun'
    ],
    correctAnswer: 0,
    explanation: 'Kasus Bantuan Likuiditas Bank Indonesia (BLBI) merugikan negara Rp 138,4 triliun, menjadi kasus korupsi terbesar dalam sejarah Indonesia.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 287,
    text: 'Apa fungsi "know your customer" (KYC) dalam pencegahan korupsi?',
    options: [
      'Meningkatkan penjualan',
      'Identifikasi nasabah berisiko tinggi',
      'Layanan pelanggan',
      'Program loyalitas'
    ],
    correctAnswer: 1,
    explanation: 'KYC berfungsi mengidentifikasi nasabah berisiko tinggi termasuk PEP (politically exposed person) untuk mencegah pencucian uang hasil korupsi.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 288,
    text: 'Berapa jumlah maksimal uang tunai yang boleh dibawa keluar negeri?',
    options: [
      'Rp 50 juta',
      'Rp 100 juta',
      'Rp 150 juta',
      'Rp 200 juta'
    ],
    correctAnswer: 1,
    explanation: 'Batas maksimal membawa uang tunai keluar negeri adalah Rp 100 juta. Lebih dari itu wajib dilaporkan untuk mencegah pelarian aset korupsi.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 289,
    text: 'Apa yang dimaksud dengan "plea bargaining"?',
    options: [
      'Tawar-menawar hukuman',
      'Negosiasi kontrak',
      'Mediasi perdata',
      'Banding putusan'
    ],
    correctAnswer: 0,
    explanation: 'Plea bargaining adalah mekanisme tawar-menawar hukuman dimana terdakwa mengaku bersalah untuk mendapat hukuman lebih ringan, belum diterapkan di Indonesia.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 290,
    text: 'Manakah yang termasuk "administrative corruption"?',
    options: [
      'Korupsi kebijakan nasional',
      'Pungli dalam pelayanan publik',
      'Korupsi proyek strategis',
      'State capture'
    ],
    correctAnswer: 1,
    explanation: 'Administrative corruption adalah korupsi kecil dalam pelayanan publik sehari-hari seperti pungli, berbeda dengan grand corruption yang melibatkan kebijakan besar.',
    category: 'korupsi',
    difficulty: 'Sedang'
  },
  {
    id: 291,
    text: 'Apa konsekuensi bagi negara yang masuk "blacklist" FATF?',
    options: [
      'Tidak ada konsekuensi',
      'Sanksi ekonomi internasional',
      'Pengucilan diplomatik',
      'Embargo perdagangan'
    ],
    correctAnswer: 1,
    explanation: 'Negara yang masuk blacklist FATF (Financial Action Task Force) akan menghadapi sanksi ekonomi internasional dan kesulitan transaksi keuangan global.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 292,
    text: 'Berapa persen recovery rate aset korupsi di Indonesia?',
    options: [
      'Kurang dari 10%',
      '10-30%',
      '30-50%',
      'Lebih dari 50%'
    ],
    correctAnswer: 1,
    explanation: 'Recovery rate aset korupsi di Indonesia masih rendah, berkisar 10-30%, jauh di bawah target ideal karena berbagai kendala hukum dan teknis.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 293,
    text: 'Apa yang dimaksud dengan "capture theory"?',
    options: [
      'Teori penangkapan',
      'Regulator dikuasai pihak yang diatur',
      'Strategi penegakan hukum',
      'Metode investigasi'
    ],
    correctAnswer: 1,
    explanation: 'Capture theory menjelaskan kondisi dimana regulator/pengawas dikuasai atau dipengaruhi oleh pihak yang seharusnya diawasi, memfasilitasi korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 294,
    text: 'Manakah yang BUKAN termasuk prinsip good governance?',
    options: [
      'Transparansi',
      'Akuntabilitas',
      'Kerahasiaan mutlak',
      'Partisipasi'
    ],
    correctAnswer: 2,
    explanation: 'Kerahasiaan mutlak bukan prinsip good governance. Prinsipnya meliputi transparansi, akuntabilitas, partisipasi, supremasi hukum, dan efektivitas.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  },
  {
    id: 295,
    text: 'Berapa jumlah negara anggota UN Convention Against Corruption (UNCAC)?',
    options: [
      'Sekitar 100 negara',
      'Sekitar 140 negara',
      'Sekitar 180 negara',
      'Sekitar 220 negara'
    ],
    correctAnswer: 2,
    explanation: 'UNCAC telah diratifikasi oleh sekitar 180 negara, menjadikannya konvensi antikorupsi global paling komprehensif.',
    category: 'pencegahan',
    difficulty: 'Sulit'
  },
  {
    id: 296,
    text: 'Apa perbedaan "bribery" dan "extortion"?',
    options: [
      'Tidak ada perbedaan',
      'Bribery sukarela, extortion paksaan',
      'Bribery paksaan, extortion sukarela',
      'Bribery oleh swasta, extortion oleh pejabat'
    ],
    correctAnswer: 1,
    explanation: 'Bribery (suap) diberikan secara sukarela untuk mendapat keuntungan, sedangkan extortion (pemerasan) melibatkan paksaan/ancaman dari pejabat.',
    category: 'suap',
    difficulty: 'Sedang'
  },
  {
    id: 297,
    text: 'Kapan Indonesia meratifikasi UNCAC?',
    options: [
      '2003',
      '2006',
      '2009',
      '2012'
    ],
    correctAnswer: 1,
    explanation: 'Indonesia meratifikasi UN Convention Against Corruption (UNCAC) pada tahun 2006 melalui UU No. 7 Tahun 2006.',
    category: 'pencegahan',
    difficulty: 'Sedang'
  },
  {
    id: 298,
    text: 'Apa yang dimaksud dengan "corporate criminal liability"?',
    options: [
      'Tanggung jawab pidana direksi',
      'Tanggung jawab pidana korporasi',
      'Tanggung jawab perdata perusahaan',
      'Asuransi tanggung jawab'
    ],
    correctAnswer: 1,
    explanation: 'Corporate criminal liability adalah pertanggungjawaban pidana korporasi sebagai subjek hukum yang dapat dipidana dalam kasus korupsi.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 299,
    text: 'Berapa persen ambang batas kenaikan kekayaan yang tidak wajar?',
    options: [
      '30%',
      '50%',
      'Tidak ada patokan pasti',
      '100%'
    ],
    correctAnswer: 2,
    explanation: 'Tidak ada patokan pasti persentase kenaikan kekayaan tidak wajar. Penilaian dilakukan case by case dengan mempertimbangkan penghasilan sah.',
    category: 'korupsi',
    difficulty: 'Sulit'
  },
  {
    id: 300,
    text: 'Apa tujuan utama pendidikan antikorupsi?',
    options: [
      'Menghukum koruptor',
      'Membangun budaya integritas',
      'Meningkatkan pendapatan negara',
      'Mengurangi pegawai negeri'
    ],
    correctAnswer: 1,
    explanation: 'Tujuan utama pendidikan antikorupsi adalah membangun budaya integritas dan kesadaran antikorupsi sejak dini sebagai upaya pencegahan jangka panjang.',
    category: 'pencegahan',
    difficulty: 'Mudah'
  }
]


// Combine all quiz questions into one array
const quizData: QuizQuestion[] = [
  ...dasarHukumAntikorupsi,
  ...bentukKorupsi,
  ...pencegahanPemberantasan
]

// Export the complete quiz data
export { quizData }

// Additional helper functions
export const getQuestionsByCategory = (category: string) => {
  return quizData.filter(q => q.category === category)
}

export const getQuestionsByDifficulty = (difficulty: string) => {
  return quizData.filter(q => q.difficulty === difficulty)
}

export const getQuestionsByTopic = (topic: string) => {
  // Topic filtering is not available in current interface
  // Return empty array or implement based on category
  return quizData.filter(q => q.category.includes(topic.toLowerCase()))
}

export const getRandomQuestions = (count: number, options?: {
  category?: string
  difficulty?: string
  topic?: string
}) => {
  let filtered = [...quizData]
  
  if (options?.category) {
    filtered = filtered.filter(q => q.category === options.category)
  }
  if (options?.difficulty) {
    filtered = filtered.filter(q => q.difficulty === options.difficulty)
  }
  if (options?.topic) {
    // Topic filtering is not available in current interface
    // Filter based on category instead
    filtered = filtered.filter(q => q.category === options.topic)
  }
  
  // Shuffle array
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]]
  }
  
  return filtered.slice(0, count)
}

// Quiz configuration based on level
export const getQuizConfiguration = (level: string, topic: string) => {
  const configs = {
    pemula: {
      questionCount: 15,
      timeLimit: 20 * 60, // 20 minutes in seconds
      passingGrade: 60,
      allowRetry: true,
      retryLimit: -1 // unlimited
    },
    menengah: {
      questionCount: 25,
      timeLimit: 30 * 60, // 30 minutes
      passingGrade: 70,
      allowRetry: true,
      retryLimit: 3
    },
    lanjutan: {
      questionCount: 35,
      timeLimit: 45 * 60, // 45 minutes
      passingGrade: 80,
      allowRetry: true,
      retryLimit: 1
    }
  }
  
  return configs[level as keyof typeof configs] || configs.pemula
}

// Get questions by level and topic
export const getQuestionsByLevelAndTopic = (level: string, topic: string) => {
  const config = getQuizConfiguration(level, topic)
  // Map topic to actual category in the data
  const topicToCategoryMap: { [key: string]: string } = {
    'dasar-hukum': 'dasar-hukum',
    'bentuk-korupsi': 'bentuk-korupsi', 
    'pencegahan': 'pencegahan',
    'gratifikasi': 'gratifikasi',
    'suap': 'suap',
    'penyalahgunaan': 'penyalahgunaan',
    'korupsi': 'korupsi',
    // Map UI topics to actual categories
    'whistleblowing': 'pencegahan',
    'uu-tipikor': 'dasar-hukum',
    'modus-operandi': 'bentuk-korupsi',
    'studi-kasus': 'korupsi',
    'kpk-apip': 'pencegahan'
  }
  
  const category = topicToCategoryMap[topic] || topic
  const questions = getRandomQuestions(config.questionCount, { category })
  return questions
}

// Get available topics
export const getAvailableTopics = () => {
  const topics = [
    {
      id: 'dasar-hukum',
      name: 'Dasar Hukum Antikorupsi',
      description: 'UU Tipikor, KPK, dan regulasi terkait',
      icon: '⚖️',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      questionCount: quizData.filter(q => q.category === 'dasar-hukum').length
    },
    {
      id: 'bentuk-korupsi',
      name: '30 Bentuk Korupsi',
      description: 'Suap, gratifikasi, penyalahgunaan wewenang',
      icon: '🚫',
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      questionCount: quizData.filter(q => q.category === 'bentuk-korupsi').length
    },
    {
      id: 'pencegahan',
      name: 'Pencegahan & Pemberantasan',
      description: 'Strategi pencegahan dan sistem pengawasan',
      icon: '🛡️',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      questionCount: quizData.filter(q => q.category === 'pencegahan').length
    },
    {
      id: 'whistleblowing',
      name: 'Whistleblowing System',
      description: 'Sistem pelaporan dan perlindungan pelapor',
      icon: '📢',
      color: 'from-orange-500 to-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      questionCount: quizData.filter(q => q.category === 'pencegahan').length
    },
    {
      id: 'uu-tipikor',
      name: 'UU Tipikor & Perubahan',
      description: 'Undang-undang dan regulasi terkait',
      icon: '📚',
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-600',
      questionCount: quizData.filter(q => q.category === 'dasar-hukum').length
    },
    {
      id: 'modus-operandi',
      name: 'Modus Operandi Terkini',
      description: 'Bentuk dan cara korupsi terbaru',
      icon: '🔍',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      questionCount: quizData.filter(q => q.category === 'bentuk-korupsi').length
    },
    {
      id: 'studi-kasus',
      name: 'Studi Kasus Besar',
      description: 'Analisis kasus korupsi terkenal',
      icon: '📋',
      color: 'from-amber-500 to-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-600',
      questionCount: quizData.filter(q => q.category === 'korupsi').length
    },
    {
      id: 'kpk-apip',
      name: 'Peran KPK & APIP',
      description: 'Lembaga pengawas dan pemberantas korupsi',
      icon: '🏛️',
      color: 'from-teal-500 to-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-600',
      questionCount: quizData.filter(q => q.category === 'pencegahan').length
    }
  ]
  return topics
}

// Get quiz statistics
export const getQuizStatistics = () => {
  const totalQuestions = quizData.length
  const categories = quizData.map(q => q.category).filter((value, index, self) => self.indexOf(value) === index)
  const difficulties = quizData.map(q => q.difficulty).filter((value, index, self) => self.indexOf(value) === index)
  
  const statsByCategory = categories.map(category => ({
    category,
    count: quizData.filter(q => q.category === category).length,
    percentage: Math.round((quizData.filter(q => q.category === category).length / totalQuestions) * 100)
  }))
  
  const statsByDifficulty = difficulties.map(difficulty => ({
    difficulty,
    count: quizData.filter(q => q.difficulty === difficulty).length,
    percentage: Math.round((quizData.filter(q => q.difficulty === difficulty).length / totalQuestions) * 100)
  }))
  
  return {
    totalQuestions,
    categories: categories.length,
    difficulties: difficulties.length,
    statsByCategory,
    statsByDifficulty
  }
}