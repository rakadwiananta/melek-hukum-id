export interface Regulasi {
    id: number;
    judul: string;
    nomor: string;
    tahun: string;
    kategori: string;
    deskripsi: string;
    tanggalDitetapkan: string;
    tanggalDiundangkan: string;
    sumber: string;
    status: 'Berlaku' | 'Dicabut' | 'Diubah';
    isiPasal: {
      bab?: string;
      pasal: string;
      bunyi: string;
    }[];
  }
  
  export const dataRegulasi: Regulasi[] = [
    {
      id: 1,
      judul: "Undang-Undang Dasar Negara Republik Indonesia Tahun 1945",
      nomor: "UUD 1945",
      tahun: "1945",
      kategori: "Konstitusi",
      deskripsi: "Konstitusi Negara Republik Indonesia",
      tanggalDitetapkan: "18-08-1945",
      tanggalDiundangkan: "18-08-1945",
      sumber: "Lembaran Negara",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - BENTUK DAN KEDAULATAN",
          pasal: "Pasal 1",
          bunyi: "(1) Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik.\n(2) Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar.\n(3) Negara Indonesia adalah negara hukum."
        },
        {
          bab: "BAB II - MAJELIS PERMUSYAWARATAN RAKYAT",
          pasal: "Pasal 2",
          bunyi: "(1) Majelis Permusyawaratan Rakyat terdiri atas anggota Dewan Perwakilan Rakyat dan anggota Dewan Perwakilan Daerah yang dipilih melalui pemilihan umum dan diatur lebih lanjut dengan undang-undang.\n(2) Majelis Permusyawaratan Rakyat bersidang sedikitnya sekali dalam lima tahun di ibu kota negara.\n(3) Segala putusan Majelis Permusyawaratan Rakyat ditetapkan dengan suara yang terbanyak."
        }
      ]
    },
    {
      id: 2,
      judul: "Kitab Undang-Undang Hukum Pidana",
      nomor: "UU No. 1 Tahun 1946",
      tahun: "1946",
      kategori: "Pidana",
      deskripsi: "Tentang Peraturan Hukum Pidana",
      tanggalDitetapkan: "26-02-1946",
      tanggalDiundangkan: "26-02-1946",
      sumber: "Berita Republik Indonesia Tahun II No. 9",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - ATURAN UMUM",
          pasal: "Pasal 1",
          bunyi: "(1) Suatu perbuatan tidak dapat dipidana, kecuali berdasarkan kekuatan ketentuan perundang-undangan pidana yang telah ada.\n(2) Bilamana ada perubahan dalam perundang-undangan sesudah perbuatan dilakukan, maka terhadap terdakwa diterapkan ketentuan yang paling menguntungkannya."
        },
        {
          pasal: "Pasal 2",
          bunyi: "Ketentuan pidana dalam perundang-undangan Indonesia diterapkan bagi setiap orang yang melakukan sesuatu tindak pidana di Indonesia."
        },
        {
          bab: "BAB II - TENTANG PIDANA",
          pasal: "Pasal 10",
          bunyi: "Pidana terdiri atas:\na. pidana pokok:\n1. pidana mati;\n2. pidana penjara;\n3. pidana kurungan;\n4. pidana denda;\n5. pidana tutupan.\nb. pidana tambahan:\n1. pencabutan hak-hak tertentu;\n2. perampasan barang-barang tertentu;\n3. pengumuman putusan hakim."
        }
      ]
    },
    {
      id: 3,
      judul: "Undang-Undang tentang Hukum Perdata",
      nomor: "Kitab Undang-Undang Hukum Perdata",
      tahun: "1847",
      kategori: "Perdata",
      deskripsi: "Burgerlijk Wetboek voor Indonesie",
      tanggalDitetapkan: "30-04-1847",
      tanggalDiundangkan: "30-04-1847",
      sumber: "Staatsblad 1847 No. 23",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BUKU I - TENTANG ORANG",
          pasal: "Pasal 1",
          bunyi: "Menikmati hak kewarganegaraan tidak bergantung pada hak-hak kenegaraan."
        },
        {
          pasal: "Pasal 2",
          bunyi: "Anak yang ada dalam kandungan seorang perempuan, dianggap sebagai telah dilahirkan, bilamana juga kepentingan si anak menghendakinya. Mati sewaktu dilahirkan, dianggapnya ia tak pernah ada."
        },
        {
          bab: "BUKU II - TENTANG KEBENDAAN",
          pasal: "Pasal 499",
          bunyi: "Menurut paham undang-undang yang dinamakan kebendaan ialah, tiap-tiap barang dan tiap-tiap hak, yang dapat dikuasai oleh hak milik."
        }
      ]
    },
    {
      id: 4,
      judul: "Undang-Undang tentang Perkawinan",
      nomor: "UU No. 1 Tahun 1974",
      tahun: "1974",
      kategori: "Perdata",
      deskripsi: "Mengatur tentang Perkawinan",
      tanggalDitetapkan: "02-01-1974",
      tanggalDiundangkan: "02-01-1974",
      sumber: "Lembaran Negara Tahun 1974 No. 1",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - DASAR PERKAWINAN",
          pasal: "Pasal 1",
          bunyi: "Perkawinan ialah ikatan lahir bathin antara seorang pria dengan seorang wanita sebagai suami isteri dengan tujuan membentuk keluarga (rumah tangga) yang bahagia dan kekal berdasarkan Ketuhanan Yang Maha Esa."
        },
        {
          pasal: "Pasal 2",
          bunyi: "(1) Perkawinan adalah sah, apabila dilakukan menurut hukum masing-masing agamanya dan kepercayaannya itu.\n(2) Tiap-tiap perkawinan dicatat menurut peraturan perundang-undangan yang berlaku."
        },
        {
          pasal: "Pasal 7",
          bunyi: "(1) Perkawinan hanya diizinkan jika pihak pria sudah mencapai umur 19 (sembilan belas) tahun dan pihak wanita sudah mencapai umur 19 (sembilan belas) tahun."
        }
      ]
    },
    {
      id: 5,
      judul: "Kitab Undang-Undang Hukum Acara Pidana",
      nomor: "UU No. 8 Tahun 1981",
      tahun: "1981",
      kategori: "Pidana",
      deskripsi: "Tentang Hukum Acara Pidana",
      tanggalDitetapkan: "31-12-1981",
      tanggalDiundangkan: "31-12-1981",
      sumber: "Lembaran Negara Tahun 1981 No. 76",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Yang dimaksud dalam undang-undang ini dengan:\n1. Penyidik adalah pejabat polisi negara Republik Indonesia atau pejabat pegawai negeri sipil tertentu yang diberi wewenang khusus oleh undang-undang untuk melakukan penyidikan.\n2. Penyidikan adalah serangkaian tindakan penyidik dalam hal dan menurut cara yang diatur dalam undang-undang ini untuk mencari serta mengumpulkan bukti yang dengan bukti itu membuat terang tentang tindak pidana yang terjadi dan guna menemukan tersangkanya."
        },
        {
          bab: "BAB V - PENANGKAPAN, PENAHANAN",
          pasal: "Pasal 17",
          bunyi: "Perintah penangkapan dilakukan terhadap seorang yang diduga keras melakukan tindak pidana berdasarkan bukti permulaan yang cukup."
        }
      ]
    },
    {
      id: 6,
      judul: "Undang-Undang tentang Pokok-Pokok Agraria",
      nomor: "UU No. 5 Tahun 1960",
      tahun: "1960",
      kategori: "Perdata",
      deskripsi: "Tentang Peraturan Dasar Pokok-Pokok Agraria",
      tanggalDitetapkan: "24-09-1960",
      tanggalDiundangkan: "24-09-1960",
      sumber: "Lembaran Negara Tahun 1960 No. 104",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN DASAR",
          pasal: "Pasal 1",
          bunyi: "(1) Seluruh wilayah Indonesia adalah kesatuan tanah-air dari seluruh rakyat Indonesia, yang bersatu sebagai bangsa Indonesia.\n(2) Seluruh bumi, air dan ruang angkasa, termasuk kekayaan alam yang terkandung didalamnya dalam wilayah Republik Indonesia sebagai karunia Tuhan Yang Maha Esa adalah bumi, air dan ruang angkasa bangsa Indonesia dan merupakan kekayaan nasional."
        },
        {
          pasal: "Pasal 6",
          bunyi: "Semua hak atas tanah mempunyai fungsi sosial."
        }
      ]
    },
    {
      id: 7,
      judul: "Undang-Undang tentang Pemberantasan Tindak Pidana Korupsi",
      nomor: "UU No. 31 Tahun 1999",
      tahun: "1999",
      kategori: "Anti Korupsi",
      deskripsi: "Pemberantasan Tindak Pidana Korupsi",
      tanggalDitetapkan: "16-08-1999",
      tanggalDiundangkan: "16-08-1999",
      sumber: "Lembaran Negara Tahun 1999 No. 140",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB II - TINDAK PIDANA KORUPSI",
          pasal: "Pasal 2",
          bunyi: "(1) Setiap orang yang secara melawan hukum melakukan perbuatan memperkaya diri sendiri atau orang lain atau suatu korporasi yang dapat merugikan keuangan negara atau perekonomian negara, dipidana dengan pidana penjara seumur hidup atau pidana penjara paling singkat 4 (empat) tahun dan paling lama 20 (dua puluh) tahun dan denda paling sedikit Rp. 200.000.000,00 (dua ratus juta rupiah) dan paling banyak Rp. 1.000.000.000,00 (satu miliar rupiah)."
        },
        {
          pasal: "Pasal 3",
          bunyi: "Setiap orang yang dengan tujuan menguntungkan diri sendiri atau orang lain atau suatu korporasi, menyalahgunakan kewenangan, kesempatan atau sarana yang ada padanya karena jabatan atau kedudukan yang dapat merugikan keuangan negara atau perekonomian negara, dipidana dengan pidana penjara seumur hidup atau pidana penjara paling singkat 1 (satu) tahun dan paling lama 20 (dua puluh) tahun dan atau denda paling sedikit Rp. 50.000.000,00 (lima puluh juta rupiah) dan paling banyak Rp. 1.000.000.000,00 (satu miliar rupiah)."
        }
      ]
    },
    {
      id: 8,
      judul: "Undang-Undang tentang Hak Asasi Manusia",
      nomor: "UU No. 39 Tahun 1999",
      tahun: "1999",
      kategori: "HAM",
      deskripsi: "Tentang Hak Asasi Manusia",
      tanggalDitetapkan: "23-09-1999",
      tanggalDiundangkan: "23-09-1999",
      sumber: "Lembaran Negara Tahun 1999 No. 165",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-undang ini yang dimaksud dengan:\n1. Hak Asasi Manusia adalah seperangkat hak yang melekat pada hakikat dan keberadaan manusia sebagai makhluk Tuhan Yang Maha Esa dan merupakan anugerah-Nya yang wajib dihormati, dijunjung tinggi dan dilindungi oleh negara, hukum, Pemerintah, dan setiap orang demi kehormatan serta perlindungan harkat dan martabat manusia."
        },
        {
          bab: "BAB III - HAK ASASI MANUSIA DAN KEBEBASAN DASAR MANUSIA",
          pasal: "Pasal 9",
          bunyi: "(1) Setiap orang berhak untuk hidup, mempertahankan hidup dan meningkatkan taraf kehidupannya.\n(2) Setiap orang berhak hidup tenteram, aman, damai, bahagia, sejahtera lahir dan batin.\n(3) Setiap orang berhak atas lingkungan hidup yang baik dan sehat."
        }
      ]
    },
    {
      id: 9,
      judul: "Undang-Undang tentang Kepolisian Negara Republik Indonesia",
      nomor: "UU No. 2 Tahun 2002",
      tahun: "2002",
      kategori: "Tata Negara",
      deskripsi: "Tentang Kepolisian Negara Republik Indonesia",
      tanggalDitetapkan: "08-01-2002",
      tanggalDiundangkan: "08-01-2002",
      sumber: "Lembaran Negara Tahun 2002 No. 2",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam undang-undang ini yang dimaksud dengan:\n1. Kepolisian adalah segala hal-ihwal yang berkaitan dengan fungsi dan lembaga polisi sesuai dengan peraturan perundang-undangan.\n2. Kepolisian Negara Republik Indonesia adalah Kepolisian Nasional yang merupakan satu kesatuan dalam melaksanakan peran sebagai pemelihara keamanan dan ketertiban masyarakat, penegak hukum, pelindung, pengayom dan pelayan masyarakat."
        },
        {
          bab: "BAB III - TUGAS DAN WEWENANG",
          pasal: "Pasal 13",
          bunyi: "Tugas pokok Kepolisian Negara Republik Indonesia adalah:\na. memelihara keamanan dan ketertiban masyarakat;\nb. menegakkan hukum; dan\nc. memberikan perlindungan, pengayoman, dan pelayanan kepada masyarakat."
        }
      ]
    },
    {
      id: 10,
      judul: "Undang-Undang tentang Komisi Pemberantasan Korupsi",
      nomor: "UU No. 30 Tahun 2002",
      tahun: "2002",
      kategori: "Anti Korupsi",
      deskripsi: "Tentang Komisi Pemberantasan Tindak Pidana Korupsi",
      tanggalDitetapkan: "27-12-2002",
      tanggalDiundangkan: "27-12-2002",
      sumber: "Lembaran Negara Tahun 2002 No. 137",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Tindak Pidana Korupsi adalah tindak pidana sebagaimana dimaksud dalam Undang-Undang Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi sebagaimana telah diubah dengan Undang-Undang Nomor 20 Tahun 2001 tentang Perubahan atas Undang-Undang Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi.\n3. Komisi Pemberantasan Korupsi adalah lembaga negara yang dalam melaksanakan tugas dan wewenangnya bersifat independen dan bebas dari pengaruh kekuasaan manapun."
        },
        {
          bab: "BAB II - KOMISI PEMBERANTASAN KORUPSI",
          pasal: "Pasal 6",
          bunyi: "Komisi Pemberantasan Korupsi mempunyai tugas:\na. koordinasi dengan instansi yang berwenang melakukan pemberantasan tindak pidana korupsi;\nb. supervisi terhadap instansi yang berwenang melakukan pemberantasan tindak pidana korupsi;\nc. melakukan penyelidikan, penyidikan, dan penuntutan terhadap tindak pidana korupsi;\nd. melakukan tindakan-tindakan pencegahan tindak pidana korupsi; dan\ne. melakukan monitor terhadap penyelenggaraan pemerintahan negara."
        }
      ]
    },
    {
      id: 11,
      judul: "Undang-Undang tentang Sistem Pendidikan Nasional",
      nomor: "UU No. 20 Tahun 2003",
      tahun: "2003",
      kategori: "Pendidikan",
      deskripsi: "Tentang Sistem Pendidikan Nasional",
      tanggalDitetapkan: "08-07-2003",
      tanggalDiundangkan: "08-07-2003",
      sumber: "Lembaran Negara Tahun 2003 No. 78",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam undang-undang ini yang dimaksud dengan:\n1. Pendidikan adalah usaha sadar dan terencana untuk mewujudkan suasana belajar dan proses pembelajaran agar peserta didik secara aktif mengembangkan potensi dirinya untuk memiliki kekuatan spiritual keagamaan, pengendalian diri, kepribadian, kecerdasan, akhlak mulia, serta keterampilan yang diperlukan dirinya, masyarakat, bangsa dan negara."
        },
        {
          bab: "BAB II - DASAR, FUNGSI, DAN TUJUAN",
          pasal: "Pasal 3",
          bunyi: "Pendidikan nasional berfungsi mengembangkan kemampuan dan membentuk watak serta peradaban bangsa yang bermartabat dalam rangka mencerdaskan kehidupan bangsa, bertujuan untuk berkembangnya potensi peserta didik agar menjadi manusia yang beriman dan bertakwa kepada Tuhan Yang Maha Esa, berakhlak mulia, sehat, berilmu, cakap, kreatif, mandiri, dan menjadi warga negara yang demokratis serta bertanggung jawab."
        }
      ]
    },
    {
      id: 12,
      judul: "Undang-Undang tentang Perlindungan Anak",
      nomor: "UU No. 35 Tahun 2014",
      tahun: "2014",
      kategori: "HAM",
      deskripsi: "Perubahan atas UU No. 23 Tahun 2002 tentang Perlindungan Anak",
      tanggalDitetapkan: "17-10-2014",
      tanggalDiundangkan: "17-10-2014",
      sumber: "Lembaran Negara Tahun 2014 No. 297",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Anak adalah seseorang yang belum berusia 18 (delapan belas) tahun, termasuk anak yang masih dalam kandungan.\n2. Perlindungan Anak adalah segala kegiatan untuk menjamin dan melindungi Anak dan hak-haknya agar dapat hidup, tumbuh, berkembang, dan berpartisipasi secara optimal sesuai dengan harkat dan martabat kemanusiaan, serta mendapat perlindungan dari kekerasan dan diskriminasi."
        },
        {
          bab: "BAB II - ASAS DAN TUJUAN",
          pasal: "Pasal 3",
          bunyi: "Perlindungan anak bertujuan untuk menjamin terpenuhinya hak-hak anak agar dapat hidup, tumbuh, berkembang, dan berpartisipasi secara optimal sesuai dengan harkat dan martabat kemanusiaan, serta mendapat perlindungan dari kekerasan dan diskriminasi, demi terwujudnya anak Indonesia yang berkualitas, berakhlak mulia, dan sejahtera."
        }
      ]
    },
    {
      id: 13,
      judul: "Undang-Undang tentang Informasi dan Transaksi Elektronik",
      nomor: "UU No. 11 Tahun 2008",
      tahun: "2008",
      kategori: "Teknologi",
      deskripsi: "Tentang Informasi dan Transaksi Elektronik",
      tanggalDitetapkan: "21-04-2008",
      tanggalDiundangkan: "21-04-2008",
      sumber: "Lembaran Negara Tahun 2008 No. 58",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Informasi Elektronik adalah satu atau sekumpulan data elektronik, termasuk tetapi tidak terbatas pada tulisan, suara, gambar, peta, rancangan, foto, electronic data interchange (EDI), surat elektronik (electronic mail), telegram, teleks, telecopy atau sejenisnya, huruf, tanda, angka, Kode Akses, simbol, atau perforasi yang telah diolah yang memiliki arti atau dapat dipahami oleh orang yang mampu memahaminya."
        },
        {
          bab: "BAB VII - PERBUATAN YANG DILARANG",
          pasal: "Pasal 27",
          bunyi: "(1) Setiap Orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan dan/atau membuat dapat diaksesnya Informasi Elektronik dan/atau Dokumen Elektronik yang memiliki muatan yang melanggar kesusilaan.\n(3) Setiap Orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan dan/atau membuat dapat diaksesnya Informasi Elektronik dan/atau Dokumen Elektronik yang memiliki muatan penghinaan dan/atau pencemaran nama baik."
        }
      ]
    },
    {
      id: 14,
      judul: "Undang-Undang tentang Pembentukan Peraturan Perundang-undangan",
      nomor: "UU No. 12 Tahun 2011",
      tahun: "2011",
      kategori: "Tata Negara",
      deskripsi: "Tentang Pembentukan Peraturan Perundang-undangan",
      tanggalDitetapkan: "12-08-2011",
      tanggalDiundangkan: "12-08-2011",
      sumber: "Lembaran Negara Tahun 2011 No. 82",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pembentukan Peraturan Perundang-undangan adalah pembuatan Peraturan Perundang-undangan yang mencakup tahapan perencanaan, penyusunan, pembahasan, pengesahan atau penetapan, dan pengundangan."
        },
        {
          bab: "BAB II - ASAS PEMBENTUKAN PERATURAN PERUNDANG-UNDANGAN",
          pasal: "Pasal 5",
          bunyi: "Dalam membentuk Peraturan Perundang-undangan harus dilakukan berdasarkan pada asas Pembentukan Peraturan Perundang-undangan yang baik, yang meliputi:\na. kejelasan tujuan;\nb. kelembagaan atau pejabat pembentuk yang tepat;\nc. kesesuaian antara jenis, hierarki, dan materi muatan;\nd. dapat dilaksanakan;\ne. kedayagunaan dan kehasilgunaan;\nf. kejelasan rumusan; dan\ng. keterbukaan."
        }
      ]
    },
    {
      id: 15,
      judul: "Undang-Undang tentang Kesehatan",
      nomor: "UU No. 36 Tahun 2009",
      tahun: "2009",
      kategori: "Kesehatan",
      deskripsi: "Tentang Kesehatan",
      tanggalDitetapkan: "13-10-2009",
      tanggalDiundangkan: "13-10-2009",
      sumber: "Lembaran Negara Tahun 2009 No. 144",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam undang-undang ini yang dimaksud dengan:\n1. Kesehatan adalah keadaan sehat, baik secara fisik, mental, spritual maupun sosial yang memungkinkan setiap orang untuk hidup produktif secara sosial dan ekonomis."
        },
        {
          bab: "BAB III - HAK DAN KEWAJIBAN",
          pasal: "Pasal 4",
          bunyi: "Setiap orang berhak atas kesehatan."
        },
        {
          pasal: "Pasal 5",
          bunyi: "(1) Setiap orang mempunyai hak yang sama dalam memperoleh akses atas sumber daya di bidang kesehatan.\n(2) Setiap orang mempunyai hak dalam memperoleh pelayanan kesehatan yang aman, bermutu, dan terjangkau.\n(3) Setiap orang berhak secara mandiri dan bertanggung jawab menentukan sendiri pelayanan kesehatan yang diperlukan bagi dirinya."
        }
      ]
    },
    {
      id: 16,
      judul: "Undang-Undang tentang Pemerintahan Daerah",
      nomor: "UU No. 23 Tahun 2014",
      tahun: "2014",
      kategori: "Tata Negara",
      deskripsi: "Tentang Pemerintahan Daerah",
      tanggalDitetapkan: "30-09-2014",
      tanggalDiundangkan: "02-10-2014",
      sumber: "Lembaran Negara Tahun 2014 No. 244",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n2. Pemerintahan Daerah adalah penyelenggaraan urusan pemerintahan oleh pemerintah daerah dan dewan perwakilan rakyat daerah menurut asas otonomi dan tugas pembantuan dengan prinsip otonomi seluas-luasnya dalam sistem dan prinsip Negara Kesatuan Republik Indonesia sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
        },
        {
          bab: "BAB IV - URUSAN PEMERINTAHAN",
          pasal: "Pasal 9",
          bunyi: "(1) Urusan Pemerintahan terdiri atas urusan pemerintahan absolut, urusan pemerintahan konkuren, dan urusan pemerintahan umum.\n(2) Urusan pemerintahan absolut adalah Urusan Pemerintahan yang sepenuhnya menjadi kewenangan Pemerintah Pusat.\n(3) Urusan pemerintahan konkuren adalah Urusan Pemerintahan yang dibagi antara Pemerintah Pusat dan Daerah provinsi dan Daerah kabupaten/kota."
        }
      ]
    },
    {
      id: 17,
      judul: "Undang-Undang tentang Desa",
      nomor: "UU No. 6 Tahun 2014",
      tahun: "2014",
      kategori: "Tata Negara",
      deskripsi: "Tentang Desa",
      tanggalDitetapkan: "15-01-2014",
      tanggalDiundangkan: "15-01-2014",
      sumber: "Lembaran Negara Tahun 2014 No. 7",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Desa adalah desa dan desa adat atau yang disebut dengan nama lain, selanjutnya disebut Desa, adalah kesatuan masyarakat hukum yang memiliki batas wilayah yang berwenang untuk mengatur dan mengurus urusan pemerintahan, kepentingan masyarakat setempat berdasarkan prakarsa masyarakat, hak asal usul, dan/atau hak tradisional yang diakui dan dihormati dalam sistem pemerintahan Negara Kesatuan Republik Indonesia."
        },
        {
          bab: "BAB IV - KEWENANGAN DESA",
          pasal: "Pasal 18",
          bunyi: "Kewenangan Desa meliputi kewenangan di bidang penyelenggaraan Pemerintahan Desa, pelaksanaan Pembangunan Desa, pembinaan kemasyarakatan Desa, dan pemberdayaan masyarakat Desa berdasarkan prakarsa masyarakat, hak asal usul, dan adat istiadat Desa."
        }
      ]
    },
    {
      id: 18,
      judul: "Undang-Undang tentang Ketenagakerjaan",
      nomor: "UU No. 13 Tahun 2003",
      tahun: "2003",
      kategori: "Ketenagakerjaan",
      deskripsi: "Tentang Ketenagakerjaan",
      tanggalDitetapkan: "25-03-2003",
      tanggalDiundangkan: "25-03-2003",
      sumber: "Lembaran Negara Tahun 2003 No. 39",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam undang-undang ini yang dimaksud dengan:\n1. Ketenagakerjaan adalah segala hal yang berhubungan dengan tenaga kerja pada waktu sebelum, selama, dan sesudah masa kerja.\n2. Tenaga kerja adalah setiap orang yang mampu melakukan pekerjaan guna menghasilkan barang dan/atau jasa baik untuk memenuhi kebutuhan sendiri maupun untuk masyarakat."
        },
        {
          bab: "BAB X - PENGUPAHAN",
          pasal: "Pasal 88",
          bunyi: "(1) Setiap pekerja/buruh berhak memperoleh penghasilan yang memenuhi penghidupan yang layak bagi kemanusiaan.\n(2) Untuk mewujudkan penghasilan yang memenuhi penghidupan yang layak bagi kemanusiaan sebagaimana dimaksud dalam ayat (1), pemerintah menetapkan kebijakan pengupahan yang melindungi pekerja/buruh."
        }
      ]
    },
    {
      id: 19,
      judul: "Undang-Undang tentang Penghapusan Kekerasan Dalam Rumah Tangga",
      nomor: "UU No. 23 Tahun 2004",
      tahun: "2004",
      kategori: "HAM",
      deskripsi: "Tentang Penghapusan Kekerasan dalam Rumah Tangga",
      tanggalDitetapkan: "22-09-2004",
      tanggalDiundangkan: "22-09-2004",
      sumber: "Lembaran Negara Tahun 2004 No. 95",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Kekerasan dalam Rumah Tangga adalah setiap perbuatan terhadap seseorang terutama perempuan, yang berakibat timbulnya kesengsaraan atau penderitaan secara fisik, seksual, psikologis, dan/atau penelantaran rumah tangga termasuk ancaman untuk melakukan perbuatan, pemaksaan, atau perampasan kemerdekaan secara melawan hukum dalam lingkup rumah tangga."
        },
        {
          bab: "BAB III - LARANGAN KEKERASAN DALAM RUMAH TANGGA",
          pasal: "Pasal 5",
          bunyi: "Setiap orang dilarang melakukan kekerasan dalam rumah tangga terhadap orang dalam lingkup rumah tangganya, dengan cara:\na. kekerasan fisik;\nb. kekerasan psikis;\nc. kekerasan seksual; atau\nd. penelantaran rumah tangga."
        }
      ]
    },
    {
      id: 20,
      judul: "Undang-Undang tentang Pajak Penghasilan",
      nomor: "UU No. 36 Tahun 2008",
      tahun: "2008",
      kategori: "Pajak",
      deskripsi: "Perubahan Keempat atas UU No. 7 Tahun 1983 tentang Pajak Penghasilan",
      tanggalDitetapkan: "23-09-2008",
      tanggalDiundangkan: "23-09-2008",
      sumber: "Lembaran Negara Tahun 2008 No. 133",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB II - SUBJEK PAJAK",
          pasal: "Pasal 2",
          bunyi: "(1) Yang menjadi subjek pajak adalah:\na. 1. orang pribadi;\n2. warisan yang belum terbagi sebagai satu kesatuan menggantikan yang berhak;\nb. badan; dan\nc. bentuk usaha tetap."
        },
        {
          bab: "BAB III - OBJEK PAJAK",
          pasal: "Pasal 4",
          bunyi: "(1) Yang menjadi objek pajak adalah penghasilan, yaitu setiap tambahan kemampuan ekonomis yang diterima atau diperoleh Wajib Pajak, baik yang berasal dari Indonesia maupun dari luar Indonesia, yang dapat dipakai untuk konsumsi atau untuk menambah kekayaan Wajib Pajak yang bersangkutan, dengan nama dan dalam bentuk apa pun."
        }
      ]
    },
    {
      id: 21,
      judul: "Undang-Undang tentang Pemilihan Umum",
      nomor: "UU No. 7 Tahun 2017",
      tahun: "2017",
      kategori: "Tata Negara",
      deskripsi: "Tentang Pemilihan Umum",
      tanggalDitetapkan: "15-08-2017",
      tanggalDiundangkan: "16-08-2017",
      sumber: "Lembaran Negara Tahun 2017 No. 182",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pemilihan Umum yang selanjutnya disebut Pemilu adalah sarana kedaulatan rakyat untuk memilih anggota Dewan Perwakilan Rakyat, anggota Dewan Perwakilan Daerah, Presiden dan Wakil Presiden, dan untuk memilih anggota Dewan Perwakilan Rakyat Daerah, yang dilaksanakan secara langsung, umum, bebas, rahasia, jujur, dan adil dalam Negara Kesatuan Republik Indonesia berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
        },
        {
          bab: "BAB II - ASAS, PRINSIP, DAN TUJUAN",
          pasal: "Pasal 2",
          bunyi: "Pemilu dilaksanakan berdasarkan asas langsung, umum, bebas, rahasia, jujur, dan adil."
        }
      ]
    },
    {
      id: 22,
      judul: "Undang-Undang tentang Narkotika",
      nomor: "UU No. 35 Tahun 2009",
      tahun: "2009",
      kategori: "Pidana",
      deskripsi: "Tentang Narkotika",
      tanggalDitetapkan: "12-10-2009",
      tanggalDiundangkan: "12-10-2009",
      sumber: "Lembaran Negara Tahun 2009 No. 143",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Narkotika adalah zat atau obat yang berasal dari tanaman atau bukan tanaman, baik sintetis maupun semisintetis, yang dapat menyebabkan penurunan atau perubahan kesadaran, hilangnya rasa, mengurangi sampai menghilangkan rasa nyeri, dan dapat menimbulkan ketergantungan, yang dibedakan ke dalam golongan-golongan sebagaimana terlampir dalam Undang-Undang ini."
        },
        {
          bab: "BAB XV - KETENTUAN PIDANA",
          pasal: "Pasal 111",
          bunyi: "(1) Setiap orang yang tanpa hak atau melawan hukum menanam, memelihara, memiliki, menyimpan, menguasai, atau menyediakan Narkotika Golongan I dalam bentuk tanaman, dipidana dengan pidana penjara paling singkat 4 (empat) tahun dan paling lama 12 (dua belas) tahun dan pidana denda paling sedikit Rp800.000.000,00 (delapan ratus juta rupiah) dan paling banyak Rp8.000.000.000,00 (delapan miliar rupiah)."
        }
      ]
    },
    {
      id: 23,
      judul: "Undang-Undang tentang Lalu Lintas dan Angkutan Jalan",
      nomor: "UU No. 22 Tahun 2009",
      tahun: "2009",
      kategori: "Transportasi",
      deskripsi: "Tentang Lalu Lintas dan Angkutan Jalan",
      tanggalDitetapkan: "22-06-2009",
      tanggalDiundangkan: "22-06-2009",
      sumber: "Lembaran Negara Tahun 2009 No. 96",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Lalu Lintas dan Angkutan Jalan adalah satu kesatuan sistem yang terdiri atas Lalu Lintas, Angkutan Jalan, Jaringan Lalu Lintas dan Angkutan Jalan, Prasarana Lalu Lintas dan Angkutan Jalan, Kendaraan, Pengemudi, Pengguna Jalan, serta pengelolaannya."
        },
        {
          bab: "BAB X - KENDARAAN",
          pasal: "Pasal 48",
          bunyi: "(1) Setiap Kendaraan Bermotor yang dioperasikan di Jalan wajib memenuhi persyaratan teknis dan laik jalan.\n(2) Persyaratan teknis sebagaimana dimaksud pada ayat (1) terdiri atas:\na. susunan;\nb. perlengkapan;\nc. ukuran;\nd. karoseri;\ne. rancangan teknis kendaraan sesuai dengan peruntukannya;\nf. pemuatan;\ng. penggunaan;\nh. penggandengan Kendaraan Bermotor; dan/atau\ni. penempelan Kendaraan Bermotor."
        }
      ]
    },
    {
      id: 24,
      judul: "Undang-Undang tentang Perbankan",
      nomor: "UU No. 10 Tahun 1998",
      tahun: "1998",
      kategori: "Ekonomi",
      deskripsi: "Perubahan atas UU No. 7 Tahun 1992 tentang Perbankan",
      tanggalDitetapkan: "10-11-1998",
      tanggalDiundangkan: "10-11-1998",
      sumber: "Lembaran Negara Tahun 1998 No. 182",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam undang-undang ini yang dimaksud dengan:\n1. Perbankan adalah segala sesuatu yang menyangkut tentang bank, mencakup kelembagaan, kegiatan usaha, serta cara dan proses dalam melaksanakan kegiatan usahanya.\n2. Bank adalah badan usaha yang menghimpun dana dari masyarakat dalam bentuk simpanan dan menyalurkannya kepada masyarakat dalam bentuk kredit dan atau bentuk-bentuk lainnya dalam rangka meningkatkan taraf hidup rakyat banyak."
        },
        {
          bab: "BAB III - JENIS DAN USAHA BANK",
          pasal: "Pasal 5",
          bunyi: "(1) Menurut jenisnya bank terdiri dari:\na. Bank Umum;\nb. Bank Perkreditan Rakyat.\n(2) Bank Umum dapat mengkhususkan diri untuk melaksanakan kegiatan tertentu atau memberikan perhatian yang lebih besar kepada kegiatan tertentu."
        }
      ]
    },
    {
      id: 25,
      judul: "Undang-Undang tentang Peradilan Tata Usaha Negara",
      nomor: "UU No. 5 Tahun 1986",
      tahun: "1986",
      kategori: "Peradilan",
      deskripsi: "Tentang Peradilan Tata Usaha Negara",
      tanggalDitetapkan: "29-12-1986",
      tanggalDiundangkan: "29-12-1986",
      sumber: "Lembaran Negara Tahun 1986 No. 77",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-undang ini yang dimaksud dengan:\n9. Keputusan Tata Usaha Negara adalah suatu penetapan tertulis yang dikeluarkan oleh badan atau pejabat tata usaha negara yang berisi tindakan hukum tata usaha negara yang berdasarkan peraturan perundang-undangan yang berlaku, yang bersifat konkret, individual, dan final, yang menimbulkan akibat hukum bagi seseorang atau badan hukum perdata."
        },
        {
          bab: "BAB II - SUSUNAN PENGADILAN",
          pasal: "Pasal 5",
          bunyi: "(1) Peradilan Tata Usaha Negara terdiri dari:\na. Pengadilan Tata Usaha Negara;\nb. Pengadilan Tinggi Tata Usaha Negara."
        }
      ]
    },
    {
      id: 26,
      judul: "Undang-Undang tentang Pelayanan Publik",
      nomor: "UU No. 25 Tahun 2009",
      tahun: "2009",
      kategori: "Administrasi",
      deskripsi: "Tentang Pelayanan Publik",
      tanggalDitetapkan: "18-07-2009",
      tanggalDiundangkan: "18-07-2009",
      sumber: "Lembaran Negara Tahun 2009 No. 112",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pelayanan publik adalah kegiatan atau rangkaian kegiatan dalam rangka pemenuhan kebutuhan pelayanan sesuai dengan peraturan perundang-undangan bagi setiap warga negara dan penduduk atas barang, jasa, dan/atau pelayanan administratif yang disediakan oleh penyelenggara pelayanan publik."
        },
        {
          bab: "BAB II - MAKSUD, TUJUAN, ASAS, DAN RUANG LINGKUP",
          pasal: "Pasal 3",
          bunyi: "Tujuan undang-undang tentang pelayanan publik adalah:\na. terwujudnya batasan dan hubungan yang jelas tentang hak, tanggung jawab, kewajiban, dan kewenangan seluruh pihak yang terkait dengan penyelenggaraan pelayanan publik;\nb. terwujudnya sistem penyelenggaraan pelayanan publik yang layak sesuai dengan asas-asas umum pemerintahan dan korporasi yang baik;\nc. terpenuhinya penyelenggaraan pelayanan publik sesuai dengan peraturan perundang-undangan; dan\nd. terwujudnya perlindungan dan kepastian hukum bagi masyarakat dalam penyelenggaraan pelayanan publik."
        }
      ]
    },
    {
      id: 27,
      judul: "Undang-Undang tentang Advokat",
      nomor: "UU No. 18 Tahun 2003",
      tahun: "2003",
      kategori: "Profesi",
      deskripsi: "Tentang Advokat",
      tanggalDitetapkan: "05-04-2003",
      tanggalDiundangkan: "05-04-2003",
      sumber: "Lembaran Negara Tahun 2003 No. 49",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Advokat adalah orang yang berprofesi memberi jasa hukum, baik di dalam maupun di luar pengadilan yang memenuhi persyaratan berdasarkan ketentuan Undang-Undang ini.\n2. Jasa Hukum adalah jasa yang diberikan Advokat berupa memberikan konsultasi hukum, bantuan hukum, menjalankan kuasa, mewakili, mendampingi, membela, dan melakukan tindakan hukum lain untuk kepentingan hukum klien."
        },
        {
          bab: "BAB III - PENGANGKATAN, SUMPAH, DAN PEMBERHENTIAN",
          pasal: "Pasal 3",
          bunyi: "(1) Untuk dapat diangkat menjadi Advokat harus memenuhi persyaratan sebagai berikut:\na. warga negara Republik Indonesia;\nb. bertempat tinggal di Indonesia;\nc. tidak berstatus sebagai pegawai negeri atau pejabat negara;\nd. berusia sekurang-kurangnya 25 (dua puluh lima) tahun;\ne. berijazah sarjana yang berlatar belakang pendidikan tinggi hukum sebagaimana dimaksud dalam Pasal 2 ayat (1);\nf. lulus ujian yang diadakan oleh Organisasi Advokat;\ng. magang sekurang-kurangnya 2 (dua) tahun terus menerus pada kantor Advokat;\nh. tidak pernah dipidana karena melakukan tindak pidana kejahatan yang diancam dengan pidana penjara 5 (lima) tahun atau lebih;\ni. berperilaku baik, jujur, bertanggung jawab, adil, dan mempunyai integritas yang tinggi."
        }
      ]
    },
    {
      id: 28,
      judul: "Undang-Undang tentang Keuangan Negara",
      nomor: "UU No. 17 Tahun 2003",
      tahun: "2003",
      kategori: "Keuangan",
      deskripsi: "Tentang Keuangan Negara",
      tanggalDitetapkan: "05-04-2003",
      tanggalDiundangkan: "05-04-2003",
      sumber: "Lembaran Negara Tahun 2003 No. 47",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam undang-undang ini yang dimaksud dengan:\n1. Keuangan Negara adalah semua hak dan kewajiban negara yang dapat dinilai dengan uang, serta segala sesuatu baik berupa uang maupun berupa barang yang dapat dijadikan milik negara berhubung dengan pelaksanaan hak dan kewajiban tersebut."
        },
        {
          bab: "BAB II - RUANG LINGKUP KEUANGAN NEGARA",
          pasal: "Pasal 2",
          bunyi: "Keuangan Negara sebagaimana dimaksud dalam Pasal 1 angka 1, meliputi:\na. hak negara untuk memungut pajak, mengeluarkan dan mengedarkan uang, dan melakukan pinjaman;\nb. kewajiban negara untuk menyelenggarakan tugas layanan umum pemerintahan negara dan membayar tagihan pihak ketiga;\nc. Penerimaan Negara;\nd. Pengeluaran Negara;\ne. Penerimaan Daerah;\nf. Pengeluaran Daerah;\ng. kekayaan negara/kekayaan daerah yang dikelola sendiri atau oleh pihak lain berupa uang, surat berharga, piutang, barang, serta hak-hak lain yang dapat dinilai dengan uang, termasuk kekayaan yang dipisahkan pada perusahaan negara/ perusahaan daerah;\nh. kekayaan pihak lain yang dikuasai oleh pemerintah dalam rangka penyelenggaraan tugas pemerintahan dan/atau kepentingan umum;\ni. kekayaan pihak lain yang diperoleh dengan menggunakan fasilitas yang diberikan pemerintah."
        }
      ]
    },
    {
      id: 29,
      judul: "Undang-Undang tentang Lingkungan Hidup",
      nomor: "UU No. 32 Tahun 2009",
      tahun: "2009",
      kategori: "Lingkungan",
      deskripsi: "Tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      tanggalDitetapkan: "03-10-2009",
      tanggalDiundangkan: "03-10-2009",
      sumber: "Lembaran Negara Tahun 2009 No. 140",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Lingkungan hidup adalah kesatuan ruang dengan semua benda, daya, keadaan, dan makhluk hidup, termasuk manusia dan perilakunya, yang mempengaruhi alam itu sendiri, kelangsungan perikehidupan, dan kesejahteraan manusia serta makhluk hidup lain."
        },
        {
          bab: "BAB X - HAK, KEWAJIBAN, DAN LARANGAN",
          pasal: "Pasal 65",
          bunyi: "(1) Setiap orang berhak atas lingkungan hidup yang baik dan sehat sebagai bagian dari hak asasi manusia.\n(2) Setiap orang berhak mendapatkan pendidikan lingkungan hidup, akses informasi, akses partisipasi, dan akses keadilan dalam memenuhi hak atas lingkungan hidup yang baik dan sehat.\n(3) Setiap orang berhak mengajukan usul dan/atau keberatan terhadap rencana usaha dan/atau kegiatan yang diperkirakan dapat menimbulkan dampak terhadap lingkungan hidup.\n(4) Setiap orang berhak untuk berperan dalam perlindungan dan pengelolaan lingkungan hidup sesuai dengan peraturan perundang-undangan.\n(5) Setiap orang berhak melakukan pengaduan akibat dugaan pencemaran dan/atau perusakan lingkungan hidup."
        }
      ]
    },
    {
      id: 30,
      judul: "Undang-Undang tentang Sistem Jaminan Sosial Nasional",
      nomor: "UU No. 40 Tahun 2004",
      tahun: "2004",
      kategori: "Sosial",
      deskripsi: "Tentang Sistem Jaminan Sosial Nasional",
      tanggalDitetapkan: "19-10-2004",
      tanggalDiundangkan: "19-10-2004",
      sumber: "Lembaran Negara Tahun 2004 No. 150",
      status: "Berlaku",
      isiPasal: [
        {
          bab: "BAB I - KETENTUAN UMUM",
          pasal: "Pasal 1",
          bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Jaminan sosial adalah salah satu bentuk perlindungan sosial untuk menjamin seluruh rakyat agar dapat memenuhi kebutuhan dasar hidupnya yang layak.\n2. Sistem Jaminan Sosial Nasional adalah suatu tata cara penyelenggaraan program jaminan sosial oleh beberapa badan penyelenggara jaminan sosial."
        },
        {
          bab: "BAB IV - JENIS PROGRAM JAMINAN SOSIAL",
          pasal: "Pasal 18",
          bunyi: "Jenis program jaminan sosial meliputi:\na. jaminan kesehatan;\nb. jaminan kecelakaan kerja;\nc. jaminan hari tua;\nd. jaminan pensiun; dan\ne. jaminan kematian."
        }
      ]
    },
    {
        id: 31,
        judul: "Undang-Undang tentang Pembentukan Peraturan Perundang-undangan",
        nomor: "UU No. 12 Tahun 2011",
        tahun: "2011",
        kategori: "Tata Negara",
        deskripsi: "Tentang Pembentukan Peraturan Perundang-undangan",
        tanggalDitetapkan: "12-08-2011",
        tanggalDiundangkan: "12-08-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 82",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pembentukan Peraturan Perundang-undangan adalah pembuatan Peraturan Perundang-undangan yang mencakup tahapan perencanaan, penyusunan, pembahasan, pengesahan atau penetapan, dan pengundangan."
          },
          {
            bab: "BAB II - ASAS PEMBENTUKAN PERATURAN PERUNDANG-UNDANGAN",
            pasal: "Pasal 5",
            bunyi: "Dalam membentuk Peraturan Perundang-undangan harus dilakukan berdasarkan pada asas Pembentukan Peraturan Perundang-undangan yang baik, yang meliputi:\na. kejelasan tujuan;\nb. kelembagaan atau pejabat pembentuk yang tepat;\nc. kesesuaian antara jenis, hierarki, dan materi muatan;\nd. dapat dilaksanakan;\ne. kedayagunaan dan kehasilgunaan;\nf. kejelasan rumusan; dan\ng. keterbukaan."
          }
        ]
      },
      {
        id: 32,
        judul: "Permendikbud No. 45 Tahun 2014",
        nomor: "Permendikbud No. 45 Tahun 2014",
        tahun: "2014",
        kategori: "Pendidikan Kontroversi",
        deskripsi: "Pakaian Seragam Sekolah - Kontroversi razia rambut & seragam yang dinilai melanggar HAM siswa",
        tanggalDitetapkan: "07-05-2014",
        tanggalDiundangkan: "07-05-2014",
        sumber: "Berita Negara Tahun 2014 No. 645",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB II - PAKAIAN SERAGAM SEKOLAH",
            pasal: "Pasal 3",
            bunyi: "Pakaian seragam sekolah bagi peserta didik jenjang pendidikan dasar dan menengah terdiri atas:\na. pakaian seragam nasional;\nb. pakaian seragam kepramukaan; dan\nc. pakaian seragam khas sekolah."
          },
          {
            pasal: "Pasal 5",
            bunyi: "Model dan warna pakaian seragam nasional:\na. SD/SDLB: kemeja putih dan celana/rok merah hati;\nb. SMP/SMPLB: kemeja putih dan celana/rok biru tua;\nc. SMA/SMALB/SMK/SMKLB: kemeja putih dan celana/rok abu-abu."
          }
        ]
      },
      {
        id: 33,
        judul: "Surat Edaran Mendikbud No. 14 Tahun 2019",
        nomor: "SE Mendikbud No. 14 Tahun 2019",
        tahun: "2019",
        kategori: "Pendidikan Kontroversi",
        deskripsi: "Larangan Membawa HP ke Sekolah - Dinilai tidak realistis di era digital",
        tanggalDitetapkan: "10-07-2019",
        tanggalDiundangkan: "10-07-2019",
        sumber: "Kemendikbud",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Angka 1",
            bunyi: "Dalam rangka menciptakan lingkungan belajar yang kondusif, sekolah dapat membuat kebijakan terkait penggunaan telepon seluler di lingkungan sekolah."
          },
          {
            pasal: "Angka 2",
            bunyi: "Kebijakan sebagaimana dimaksud pada angka 1 dapat berupa:\na. larangan membawa telepon seluler ke sekolah;\nb. pembatasan penggunaan telepon seluler selama jam pembelajaran; atau\nc. pengaturan penggunaan telepon seluler untuk kepentingan pembelajaran."
          }
        ]
      },
      {
        id: 34,
        judul: "Permendikbud No. 23 Tahun 2017",
        nomor: "Permendikbud No. 23 Tahun 2017",
        tahun: "2017",
        kategori: "Pendidikan Kontroversi",
        deskripsi: "Full Day School - Kontroversi jam sekolah 8 jam yang memberatkan",
        tanggalDitetapkan: "05-06-2017",
        tanggalDiundangkan: "05-06-2017",
        sumber: "Berita Negara Tahun 2017 No. 829",
        status: "Dicabut",
        isiPasal: [
          {
            bab: "BAB II - HARI SEKOLAH",
            pasal: "Pasal 2",
            bunyi: "(1) Hari Sekolah dilaksanakan 8 (delapan) jam dalam 1 (satu) hari atau 40 (empat puluh) jam selama 5 (lima) hari dalam 1 (satu) minggu.\n(2) Ketentuan 8 (delapan) jam dalam 1 (satu) hari atau 40 (empat puluh) jam selama 5 (lima) hari dalam 1 (satu) minggu sebagaimana dimaksud pada ayat (1), termasuk waktu istirahat selama 0,5 (nol koma lima) jam dalam 1 (satu) hari atau 2,5 (dua koma lima) jam selama 5 (lima) hari dalam 1 (satu) minggu."
          }
        ]
      },
      {
        id: 35,
        judul: "Peraturan Pemerintah No. 48 Tahun 2008",
        nomor: "PP No. 48 Tahun 2008",
        tahun: "2008",
        kategori: "Pendidikan Kontroversi",
        deskripsi: "Pendanaan Pendidikan - Pungutan & sumbangan yang memberatkan",
        tanggalDitetapkan: "04-07-2008",
        tanggalDiundangkan: "04-07-2008",
        sumber: "Lembaran Negara Tahun 2008 No. 91",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB VI - TANGGUNG JAWAB PENDANAAN",
            pasal: "Pasal 46",
            bunyi: "(1) Pendanaan pendidikan menjadi tanggung jawab bersama antara Pemerintah, pemerintah daerah, dan masyarakat.\n(2) Masyarakat sebagaimana dimaksud pada ayat (1) meliputi:\na. penyelenggara atau satuan pendidikan yang didirikan masyarakat;\nb. peserta didik, orang tua atau wali peserta didik; dan\nc. pihak lain yang mempunyai perhatian dan peranan dalam bidang pendidikan."
          }
        ]
      },
      {
        id: 36,
        judul: "Undang-Undang Cipta Kerja",
        nomor: "UU No. 11 Tahun 2020",
        tahun: "2020",
        kategori: "Lingkungan Kontroversi",
        deskripsi: "UU Cipta Kerja - Hilangnya banyak perlindungan lingkungan",
        tanggalDitetapkan: "02-11-2020",
        tanggalDiundangkan: "02-11-2020",
        sumber: "Lembaran Negara Tahun 2020 No. 245",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB IV - PENINGKATAN EKOSISTEM INVESTASI DAN KEGIATAN BERUSAHA",
            pasal: "Pasal 22",
            bunyi: "Beberapa ketentuan dalam Undang-Undang Nomor 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup diubah."
          },
          {
            pasal: "Pasal 23",
            bunyi: "Setiap usaha dan/atau kegiatan yang berdampak penting terhadap lingkungan hidup wajib memiliki Amdal."
          }
        ]
      },
      {
        id: 37,
        judul: "Perppu Corona",
        nomor: "UU No. 2 Tahun 2020",
        tahun: "2020",
        kategori: "Keuangan Kontroversi",
        deskripsi: "Perppu Corona - Imunitas hukum pejabat keuangan",
        tanggalDitetapkan: "31-03-2020",
        tanggalDiundangkan: "31-03-2020",
        sumber: "Lembaran Negara Tahun 2020 No. 134",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB III - KETENTUAN LAIN-LAIN",
            pasal: "Pasal 27",
            bunyi: "(1) Biaya yang telah dikeluarkan Pemerintah dan/atau lembaga anggota KSSK dalam rangka pelaksanaan kebijakan pendapatan negara termasuk kebijakan di bidang perpajakan, kebijakan belanja negara termasuk kebijakan di bidang keuangan daerah, kebijakan pembiayaan, kebijakan stabilitas sistem keuangan, dan program pemulihan ekonomi nasional, merupakan bagian dari biaya ekonomi untuk penyelamatan perekonomian dari krisis dan bukan merupakan kerugian negara."
          }
        ]
      },
      {
        id: 38,
        judul: "RKUHP",
        nomor: "UU No. 1 Tahun 2023",
        tahun: "2023",
        kategori: "Hukum Kontroversi",
        deskripsi: "KUHP Baru - Pasal kontroversial tentang penghinaan presiden, kumpul kebo",
        tanggalDitetapkan: "02-01-2023",
        tanggalDiundangkan: "02-01-2023",
        sumber: "Lembaran Negara Tahun 2023 No. 1",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB II - TINDAK PIDANA TERHADAP KEHORMATAN PRESIDEN DAN WAKIL PRESIDEN",
            pasal: "Pasal 218",
            bunyi: "Setiap Orang yang di muka umum menyerang kehormatan atau harkat dan martabat Presiden dan/atau Wakil Presiden dipidana dengan pidana penjara paling lama 3 (tiga) tahun 6 (enam) bulan atau pidana denda paling banyak kategori IV."
          },
          {
            bab: "BAB XV - TINDAK PIDANA KESUSILAAN",
            pasal: "Pasal 411",
            bunyi: "(1) Setiap Orang yang melakukan hidup bersama sebagai suami istri di luar perkawinan yang sah dipidana dengan pidana penjara paling lama 6 (enam) bulan atau pidana denda paling banyak kategori II."
          }
        ]
      },
      {
        id: 39,
        judul: "Perppu Ormas",
        nomor: "UU No. 16 Tahun 2017",
        tahun: "2017",
        kategori: "Hukum Kontroversi",
        deskripsi: "Perppu Ormas - Pembubaran ormas tanpa pengadilan",
        tanggalDitetapkan: "10-07-2017",
        tanggalDiundangkan: "10-07-2017",
        sumber: "Lembaran Negara Tahun 2017 No. 138",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB VIIA - LARANGAN",
            pasal: "Pasal 59",
            bunyi: "(1) Ormas dilarang:\na. melakukan tindakan permusuhan terhadap suku, agama, ras, atau golongan;\nb. melakukan penyalahgunaan, penistaan, atau penodaan terhadap agama yang dianut di Indonesia;\nc. melakukan tindakan kekerasan, mengganggu ketenteraman dan ketertiban umum, atau merusak fasilitas umum dan fasilitas sosial; atau\nd. melakukan kegiatan yang menjadi tugas dan wewenang penegak hukum sesuai dengan ketentuan peraturan perundang-undangan."
          }
        ]
      },
      {
        id: 40,
        judul: "Peraturan Pemerintah No. 35 Tahun 2021",
        nomor: "PP No. 35 Tahun 2021",
        tahun: "2021",
        kategori: "Ketenagakerjaan Kontroversi",
        deskripsi: "Kontrak Kerja Waktu Tertentu - PKWT tanpa batas diperpanjang",
        tanggalDitetapkan: "02-02-2021",
        tanggalDiundangkan: "02-02-2021",
        sumber: "Lembaran Negara Tahun 2021 No. 45",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB II - PERJANJIAN KERJA WAKTU TERTENTU",
            pasal: "Pasal 5",
            bunyi: "(1) PKWT berdasarkan jangka waktu sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf a dapat dibuat untuk paling lama 5 (lima) tahun.\n(2) Dalam hal jangka waktu PKWT sebagaimana dimaksud pada ayat (1) akan berakhir dan pekerjaan yang dilaksanakan belum selesai, dapat dilakukan perpanjangan PKWT dengan jangka waktu sesuai kesepakatan antara Pengusaha dengan Pekerja/Buruh."
          }
        ]
      },
      {
        id: 41,
        judul: "Peraturan Pemerintah No. 36 Tahun 2021",
        nomor: "PP No. 36 Tahun 2021",
        tahun: "2021",
        kategori: "Ketenagakerjaan Kontroversi",
        deskripsi: "Pengupahan - Formula upah minimum yang merugikan buruh",
        tanggalDitetapkan: "02-02-2021",
        tanggalDiundangkan: "02-02-2021",
        sumber: "Lembaran Negara Tahun 2021 No. 46",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB II - UPAH MINIMUM",
            pasal: "Pasal 23",
            bunyi: "(1) Upah minimum ditetapkan berdasarkan kondisi ekonomi dan ketenagakerjaan.\n(2) Kondisi ekonomi dan ketenagakerjaan sebagaimana dimaksud pada ayat (1) meliputi variabel:\na. paritas daya beli;\nb. tingkat penyerapan tenaga kerja; dan\nc. median upah."
          }
        ]
      },
      {
        id: 42,
        judul: "Permenkominfo PSE",
        nomor: "Permenkominfo No. 5 Tahun 2020",
        tahun: "2020",
        kategori: "Digital Kontroversi",
        deskripsi: "PSE (Penyelenggara Sistem Elektronik) - Kewenangan blokir berlebihan",
        tanggalDitetapkan: "16-11-2020",
        tanggalDiundangkan: "16-11-2020",
        sumber: "Berita Negara Tahun 2020 No. 1308",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB III - PENDAFTARAN",
            pasal: "Pasal 4",
            bunyi: "(1) PSE Lingkup Privat wajib melakukan Pendaftaran.\n(2) Kewajiban Pendaftaran sebagaimana dimaksud pada ayat (1) dikecualikan terhadap PSE Lingkup Privat yang memiliki karakteristik:\na. menggunakan situs untuk keperluan internal;\nb. menyediakan layanan di situs dengan menggunakan nama domain selain domain indonesia atau titik id; dan\nc. jumlah Pengguna Sistem Elektronik kurang dari 1.000 (seribu) orang."
          }
        ]
      },
      {
        id: 43,
        judul: "SKB 3 Menteri Seragam Sekolah",
        nomor: "SKB 3 Menteri Tahun 2021",
        tahun: "2021",
        kategori: "Agama Kontroversi",
        deskripsi: "Seragam Sekolah - Larangan mewajibkan jilbab di sekolah negeri",
        tanggalDitetapkan: "03-02-2021",
        tanggalDiundangkan: "03-02-2021",
        sumber: "Kemendikbud, Kemenag, Kemendagri",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Diktum KEDUA",
            bunyi: "Pemerintah Daerah dan sekolah yang diselenggarakan oleh pemerintah daerah sesuai dengan kewenangannya wajib:\na. menjamin tidak ada paksaan dan tidak ada sanksi bagi peserta didik dalam mengenakan pakaian seragam dan atribut dengan kekhususan agama;\nb. menjamin tidak ada paksaan dan tidak ada sanksi bagi pendidik dalam mengenakan pakaian seragam dan atribut dengan kekhususan agama; dan\nc. tidak menjadikan ketentuan mengenai pakaian seragam dan atribut dengan kekhususan agama sebagai persyaratan dalam penerimaan peserta didik baru."
          }
        ]
      },
      {
        id: 44,
        judul: "UU Minerba",
        nomor: "UU No. 3 Tahun 2020",
        tahun: "2020",
        kategori: "Lingkungan Kontroversi",
        deskripsi: "UU Minerba - Perpanjangan otomatis izin tambang, lingkungan diabaikan",
        tanggalDitetapkan: "10-06-2020",
        tanggalDiundangkan: "10-06-2020",
        sumber: "Lembaran Negara Tahun 2020 No. 147",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB V - PERIZINAN BERUSAHA",
            pasal: "Pasal 169A",
            bunyi: "(1) Kontrak karya dan perjanjian karya pengusahaan pertambangan batubara sebagaimana dimaksud dalam Pasal 169 diberikan perpanjangan menjadi IUPK sebagai kelanjutan operasi setelah berakhir kontrak karya dan perjanjian karya pengusahaan pertambangan batubara dengan mempertimbangkan peningkatan penerimaan negara.\n(2) Perpanjangan kontrak karya dan perjanjian karya pengusahaan pertambangan batubara menjadi IUPK sebagai kelanjutan operasi sebagaimana dimaksud pada ayat (1) diberikan untuk jangka waktu paling lama 10 (sepuluh) tahun dan dapat diperpanjang untuk jangka waktu 10 (sepuluh) tahun setiap kali perpanjangan."
          }
        ]
      },
      {
        id: 45,
        judul: "UU Harmonisasi Pajak",
        nomor: "UU No. 7 Tahun 2021",
        tahun: "2021",
        kategori: "Pajak Kontroversi",
        deskripsi: "Harmonisasi Pajak - Kenaikan PPN 11% memberatkan rakyat",
        tanggalDitetapkan: "29-10-2021",
        tanggalDiundangkan: "29-10-2021",
        sumber: "Lembaran Negara Tahun 2021 No. 246",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB III - PAJAK PERTAMBAHAN NILAI",
            pasal: "Pasal 7",
            bunyi: "(1) Tarif Pajak Pertambahan Nilai adalah 11% (sebelas persen).\n(2) Tarif Pajak Pertambahan Nilai sebesar 12% (dua belas persen) berlaku paling lambat pada tanggal 1 Januari 2025.\n(3) Dengan Peraturan Pemerintah, tarif pajak sebagaimana dimaksud pada ayat (1) dan ayat (2) dapat diubah menjadi paling rendah 5% (lima persen) dan paling tinggi 15% (lima belas persen)."
          }
        ]
      },
      {
        id: 46,
        judul: "Perda DKI PSBB",
        nomor: "Perda DKI No. 2 Tahun 2020",
        tahun: "2020",
        kategori: "Daerah Kontroversi",
        deskripsi: "PSBB Jakarta - Denda Rp 50 juta tidak pakai masker",
        tanggalDitetapkan: "30-04-2020",
        tanggalDiundangkan: "30-04-2020",
        sumber: "Lembaran Daerah DKI Jakarta Tahun 2020 No. 101",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB VI - SANKSI",
            pasal: "Pasal 9",
            bunyi: "(1) Setiap orang yang melanggar kewajiban sebagaimana dimaksud dalam Pasal 6 dikenakan sanksi administratif berupa:\na. teguran lisan atau teguran tertulis;\nb. kerja sosial;\nc. denda administratif; atau\nd. penghentian sementara kegiatan.\n(2) Denda administratif sebagaimana dimaksud pada ayat (1) huruf c paling banyak Rp50.000.000,00 (lima puluh juta rupiah)."
          }
        ]
      },
      {
        id: 47,
        judul: "UU TPKS",
        nomor: "UU No. 12 Tahun 2022",
        tahun: "2022",
        kategori: "Gender",
        deskripsi: "Tindak Pidana Kekerasan Seksual - Perlindungan korban kekerasan seksual",
        tanggalDitetapkan: "09-05-2022",
        tanggalDiundangkan: "09-05-2022",
        sumber: "Lembaran Negara Tahun 2022 No. 120",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Kekerasan Seksual adalah setiap perbuatan yang memenuhi unsur tindak pidana sebagaimana diatur dalam Undang-Undang ini dan perbuatan kekerasan seksual lainnya sebagaimana diatur dalam Undang-Undang sepanjang ditentukan dalam Undang-Undang ini."
          },
          {
            bab: "BAB II - TINDAK PIDANA KEKERASAN SEKSUAL",
            pasal: "Pasal 4",
            bunyi: "(1) Tindak Pidana Kekerasan Seksual terdiri atas:\na. pelecehan seksual nonfisik;\nb. pelecehan seksual fisik;\nc. pemaksaan kontrasepsi;\nd. pemaksaan sterilisasi;\ne. pemaksaan perkawinan;\nf. penyiksaan seksual;\ng. eksploitasi seksual;\nh. perbudakan seksual; dan\ni. kekerasan seksual berbasis elektronik."
          }
        ]
      },
      {
        id: 48,
        judul: "UU Narkotika",
        nomor: "UU No. 35 Tahun 2009",
        tahun: "2009",
        kategori: "Narkotika Kontroversi",
        deskripsi: "UU Narkotika - Hukuman mati & kriminalisasi pengguna",
        tanggalDitetapkan: "12-10-2009",
        tanggalDiundangkan: "12-10-2009",
        sumber: "Lembaran Negara Tahun 2009 No. 143",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Narkotika adalah zat atau obat yang berasal dari tanaman atau bukan tanaman, baik sintetis maupun semisintetis, yang dapat menyebabkan penurunan atau perubahan kesadaran, hilangnya rasa, mengurangi sampai menghilangkan rasa nyeri, dan dapat menimbulkan ketergantungan, yang dibedakan ke dalam golongan-golongan sebagaimana terlampir dalam Undang-Undang ini."
          },
          {
            bab: "BAB XV - KETENTUAN PIDANA",
            pasal: "Pasal 114",
            bunyi: "(1) Setiap orang yang tanpa hak atau melawan hukum menawarkan untuk dijual, menjual, membeli, menerima, menjadi perantara dalam jual beli, menukar, atau menyerahkan Narkotika Golongan I, dipidana dengan pidana penjara seumur hidup atau pidana penjara paling singkat 5 (lima) tahun dan paling lama 20 (dua puluh) tahun dan pidana denda paling sedikit Rp1.000.000.000,00 (satu miliar rupiah) dan paling banyak Rp10.000.000.000,00 (sepuluh miliar rupiah)."
          }
        ]
      },
      {
        id: 49,
        judul: "UU Lalu Lintas",
        nomor: "UU No. 22 Tahun 2009",
        tahun: "2009",
        kategori: "Transportasi",
        deskripsi: "UU Lalu Lintas dan Angkutan Jalan",
        tanggalDitetapkan: "22-06-2009",
        tanggalDiundangkan: "22-06-2009",
        sumber: "Lembaran Negara Tahun 2009 No. 96",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Lalu Lintas dan Angkutan Jalan adalah satu kesatuan sistem yang terdiri atas Lalu Lintas, Angkutan Jalan, Jaringan Lalu Lintas dan Angkutan Jalan, Prasarana Lalu Lintas dan Angkutan Jalan, Kendaraan, Pengemudi, Pengguna Jalan, serta pengelolaannya."
          },
          {
            bab: "BAB XI - PENGEMUDI",
            pasal: "Pasal 77",
            bunyi: "(1) Setiap orang yang mengemudikan Kendaraan Bermotor di Jalan wajib memiliki Surat Izin Mengemudi sesuai dengan jenis Kendaraan Bermotor yang dikemudikan."
          }
        ]
      },
      {
        id: 50,
        judul: "TAP MPR Peninjauan TAP MPRS/MPR",
        nomor: "TAP MPR No. I/MPR/2003",
        tahun: "2003",
        kategori: "Tata Negara",
        deskripsi: "Peninjauan Materi & Status Hukum TAP MPRS/MPR 1960-2002",
        tanggalDitetapkan: "07-08-2003",
        tanggalDiundangkan: "07-08-2003",
        sumber: "MPR RI",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Pasal 1",
            bunyi: "Ketetapan Majelis Permusyawaratan Rakyat Sementara dan Ketetapan Majelis Permusyawaratan Rakyat Republik Indonesia dari tahun 1960 sampai dengan tahun 2002 sebagaimana terlampir dalam Ketetapan ini, berdasarkan peninjauan terhadap materi dan status hukumnya dinyatakan:\n1. Ketetapan Majelis Permusyawaratan Rakyat Sementara dan Ketetapan Majelis Permusyawaratan Rakyat Republik Indonesia sebagaimana dimaksud dalam Pasal 2 Aturan Tambahan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 adalah sebagaimana tercantum dalam lampiran Ketetapan ini."
          }
        ]
      },
      {
        id: 51,
        judul: "UU Pembentukan Perundang-undangan",
        nomor: "UU No. 12 Tahun 2011",
        tahun: "2011",
        kategori: "Tata Negara",
        deskripsi: "Tentang Pembentukan Peraturan Perundang-undangan",
        tanggalDitetapkan: "12-08-2011",
        tanggalDiundangkan: "12-08-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 82",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB III - JENIS, HIERARKI, DAN MATERI MUATAN",
            pasal: "Pasal 7",
            bunyi: "(1) Jenis dan hierarki Peraturan Perundang-undangan terdiri atas:\na. Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nb. Ketetapan Majelis Permusyawaratan Rakyat;\nc. Undang-Undang/Peraturan Pemerintah Pengganti Undang-Undang;\nd. Peraturan Pemerintah;\ne. Peraturan Presiden;\nf. Peraturan Daerah Provinsi; dan\ng. Peraturan Daerah Kabupaten/Kota."
          }
        ]
      },
      {
        id: 52,
        judul: "UU Kekuasaan Kehakiman",
        nomor: "UU No. 48 Tahun 2009",
        tahun: "2009",
        kategori: "Peradilan",
        deskripsi: "Tentang Kekuasaan Kehakiman",
        tanggalDitetapkan: "29-10-2009",
        tanggalDiundangkan: "29-10-2009",
        sumber: "Lembaran Negara Tahun 2009 No. 157",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Kekuasaan Kehakiman adalah kekuasaan negara yang merdeka untuk menyelenggarakan peradilan guna menegakkan hukum dan keadilan berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, demi terselenggaranya Negara Hukum Republik Indonesia."
          },
          {
            bab: "BAB II - ASAS PENYELENGGARAAN KEKUASAAN KEHAKIMAN",
            pasal: "Pasal 2",
            bunyi: "(1) Peradilan dilakukan \"DEMI KEADILAN BERDASARKAN KETUHANAN YANG MAHA ESA\".\n(2) Peradilan negara menerapkan dan menegakkan hukum dan keadilan berdasarkan Pancasila.\n(3) Semua peradilan di seluruh wilayah negara Republik Indonesia adalah peradilan negara yang diatur dengan undang-undang.\n(4) Peradilan dilakukan dengan sederhana, cepat, dan biaya ringan."
          }
        ]
      },
      {
        id: 53,
        judul: "UU Mahkamah Konstitusi",
        nomor: "UU No. 24 Tahun 2003",
        tahun: "2003",
        kategori: "Peradilan",
        deskripsi: "Tentang Mahkamah Konstitusi",
        tanggalDitetapkan: "13-08-2003",
        tanggalDiundangkan: "13-08-2003",
        sumber: "Lembaran Negara Tahun 2003 No. 98",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Mahkamah Konstitusi adalah salah satu pelaku kekuasaan kehakiman sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
          },
          {
            bab: "BAB III - KEKUASAAN MAHKAMAH KONSTITUSI",
            pasal: "Pasal 10",
            bunyi: "(1) Mahkamah Konstitusi berwenang mengadili pada tingkat pertama dan terakhir yang putusannya bersifat final untuk:\na. menguji undang-undang terhadap Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nb. memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nc. memutus pembubaran partai politik; dan\nd. memutus perselisihan tentang hasil pemilihan umum."
          }
        ]
      },
      {
        id: 54,
        judul: "UU Kejaksaan",
        nomor: "UU No. 16 Tahun 2004",
        tahun: "2004",
        kategori: "Peradilan",
        deskripsi: "Tentang Kejaksaan Republik Indonesia",
        tanggalDitetapkan: "26-07-2004",
        tanggalDiundangkan: "26-07-2004",
        sumber: "Lembaran Negara Tahun 2004 No. 67",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Jaksa adalah pejabat fungsional yang diberi wewenang oleh undang-undang untuk bertindak sebagai penuntut umum dan pelaksana putusan pengadilan yang telah memperoleh kekuatan hukum tetap serta wewenang lain berdasarkan undang-undang."
          },
          {
            bab: "BAB III - TUGAS DAN WEWENANG",
            pasal: "Pasal 30",
            bunyi: "(1) Di bidang pidana, kejaksaan mempunyai tugas dan wewenang:\na. melakukan penuntutan;\nb. melaksanakan penetapan hakim dan putusan pengadilan yang telah memperoleh kekuatan hukum tetap;\nc. melakukan pengawasan terhadap pelaksanaan putusan pidana bersyarat, putusan pidana pengawasan, dan keputusan lepas bersyarat;\nd. melakukan penyidikan terhadap tindak pidana tertentu berdasarkan undang-undang;\ne. melengkapi berkas perkara tertentu dan untuk itu dapat melakukan pemeriksaan tambahan sebelum dilimpahkan ke pengadilan yang dalam pelaksanaannya dikoordinasikan dengan penyidik."
          }
        ]
      },
      {
        id: 55,
        judul: "UU Komisi Yudisial",
        nomor: "UU No. 22 Tahun 2004",
        tahun: "2004",
        kategori: "Peradilan",
        deskripsi: "Tentang Komisi Yudisial",
        tanggalDitetapkan: "13-08-2004",
        tanggalDiundangkan: "13-08-2004",
        sumber: "Lembaran Negara Tahun 2004 No. 89",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Komisi Yudisial adalah lembaga negara sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
          },
          {
            bab: "BAB II - WEWENANG DAN TUGAS",
            pasal: "Pasal 13",
            bunyi: "Komisi Yudisial mempunyai wewenang:\na. mengusulkan pengangkatan hakim agung dan hakim ad hoc di Mahkamah Agung kepada DPR untuk mendapatkan persetujuan;\nb. menjaga dan menegakkan kehormatan, keluhuran martabat, serta perilaku hakim;\nc. menetapkan Kode Etik dan/atau Pedoman Perilaku Hakim bersama-sama dengan Mahkamah Agung; dan\nd. menjaga dan menegakkan pelaksanaan Kode Etik dan/atau Pedoman Perilaku Hakim."
          }
        ]
      },
      {
        id: 56,
        judul: "UU Bantuan Hukum",
        nomor: "UU No. 16 Tahun 2011",
        tahun: "2011",
        kategori: "Peradilan",
        deskripsi: "Tentang Bantuan Hukum",
        tanggalDitetapkan: "02-11-2011",
        tanggalDiundangkan: "02-11-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 104",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Bantuan Hukum adalah jasa hukum yang diberikan oleh Pemberi Bantuan Hukum secara cuma-cuma kepada Penerima Bantuan Hukum.\n2. Penerima Bantuan Hukum adalah orang atau kelompok orang miskin."
          },
          {
            bab: "BAB II - RUANG LINGKUP",
            pasal: "Pasal 4",
            bunyi: "(1) Bantuan Hukum diberikan kepada Penerima Bantuan Hukum yang menghadapi masalah hukum.\n(2) Bantuan Hukum sebagaimana dimaksud pada ayat (1) meliputi masalah hukum keperdataan, pidana, dan tata usaha negara baik litigasi maupun nonlitigasi.\n(3) Bantuan Hukum sebagaimana dimaksud pada ayat (1) meliputi menjalankan kuasa, mendampingi, mewakili, membela, dan/atau melakukan tindakan hukum lain untuk kepentingan hukum Penerima Bantuan Hukum."
          }
        ]
      },
      {
        id: 57,
        judul: "UU Ombudsman",
        nomor: "UU No. 37 Tahun 2008",
        tahun: "2008",
        kategori: "Pengawasan",
        deskripsi: "Tentang Ombudsman Republik Indonesia",
        tanggalDitetapkan: "07-10-2008",
        tanggalDiundangkan: "07-10-2008",
        sumber: "Lembaran Negara Tahun 2008 No. 139",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Ombudsman Republik Indonesia yang selanjutnya disebut Ombudsman adalah lembaga negara yang mempunyai kewenangan mengawasi penyelenggaraan pelayanan publik baik yang diselenggarakan oleh penyelenggara negara dan pemerintahan termasuk yang diselenggarakan oleh Badan Usaha Milik Negara, Badan Usaha Milik Daerah, dan Badan Hukum Milik Negara serta badan swasta atau perseorangan yang diberi tugas menyelenggarakan pelayanan publik tertentu yang sebagian atau seluruh dananya bersumber dari anggaran pendapatan dan belanja negara dan/atau anggaran pendapatan dan belanja daerah."
          },
          {
            bab: "BAB III - TUGAS DAN FUNGSI",
            pasal: "Pasal 7",
            bunyi: "Ombudsman bertugas:\na. menerima Laporan atas dugaan maladministrasi dalam penyelenggaraan pelayanan publik;\nb. melakukan pemeriksaan substansi atas Laporan;\nc. menindaklanjuti Laporan yang tercakup dalam ruang lingkup kewenangan Ombudsman;\nd. melakukan investigasi atas prakarsa sendiri terhadap dugaan maladministrasi dalam penyelenggaraan pelayanan publik;\ne. melakukan koordinasi dan kerja sama dengan lembaga negara atau lembaga pemerintahan lainnya serta lembaga kemasyarakatan dan perseorangan;\nf. membangun jaringan kerja;\ng. melakukan upaya pencegahan maladministrasi dalam penyelenggaraan pelayanan publik; dan\nh. melakukan tugas lain yang diberikan oleh undang-undang."
          }
        ]
      },
      {
        id: 58,
        judul: "UU Pemilu Penyelenggara",
        nomor: "UU No. 15 Tahun 2011",
        tahun: "2011",
        kategori: "Pemilu",
        deskripsi: "Tentang Penyelenggara Pemilihan Umum",
        tanggalDitetapkan: "12-11-2011",
        tanggalDiundangkan: "12-11-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 101",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pemilihan Umum, selanjutnya disingkat Pemilu, adalah sarana pelaksanaan kedaulatan rakyat yang diselenggarakan secara langsung, umum, bebas, rahasia, jujur, dan adil dalam Negara Kesatuan Republik Indonesia berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
          },
          {
            bab: "BAB II - PENYELENGGARA PEMILU",
            pasal: "Pasal 5",
            bunyi: "Penyelenggara Pemilu adalah lembaga yang menyelenggarakan Pemilu yang terdiri atas Komisi Pemilihan Umum dan Badan Pengawas Pemilu sebagai satu kesatuan fungsi penyelenggaraan Pemilu untuk memilih anggota Dewan Perwakilan Rakyat, anggota Dewan Perwakilan Daerah, anggota Dewan Perwakilan Rakyat Daerah, Presiden dan Wakil Presiden secara langsung oleh rakyat, serta untuk memilih gubernur, bupati, dan walikota secara demokratis."
          }
        ]
      },
      {
        id: 59,
        judul: "UU Dewan Perwakilan Daerah",
        nomor: "UU No. 17 Tahun 2014",
        tahun: "2014",
        kategori: "Tata Negara",
        deskripsi: "Tentang MPR, DPR, DPD, dan DPRD",
        tanggalDitetapkan: "15-08-2014",
        tanggalDiundangkan: "15-08-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 182",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n3. Dewan Perwakilan Daerah, selanjutnya disingkat DPD, adalah lembaga perwakilan daerah yang berkedudukan sebagai lembaga negara."
          },
          {
            bab: "BAB V - DPD",
            pasal: "Pasal 249",
            bunyi: "DPD mempunyai wewenang:\na. mengajukan rancangan undang-undang yang berkaitan dengan otonomi daerah, hubungan pusat dan daerah, pembentukan dan pemekaran serta penggabungan daerah, pengelolaan sumber daya alam dan sumber daya ekonomi lainnya, serta yang berkaitan dengan perimbangan keuangan pusat dan daerah kepada DPR;\nb. ikut membahas rancangan undang-undang yang berkaitan dengan hal sebagaimana dimaksud dalam huruf a;\nc. memberikan pertimbangan kepada DPR atas rancangan undang-undang tentang APBN dan rancangan undang-undang yang berkaitan dengan pajak, pendidikan, dan agama; dan\nd. melakukan pengawasan atas pelaksanaan undang-undang mengenai otonomi daerah, pembentukan, pemekaran, dan penggabungan daerah, hubungan pusat dan daerah, pengelolaan sumber daya alam, dan sumber daya ekonomi lainnya, pelaksanaan APBN, pajak, pendidikan, dan agama."
          }
        ]
      },
      {
        id: 60,
        judul: "UU Administrasi Pemerintahan",
        nomor: "UU No. 30 Tahun 2014",
        tahun: "2014",
        kategori: "Administrasi",
        deskripsi: "Tentang Administrasi Pemerintahan",
        tanggalDitetapkan: "17-10-2014",
        tanggalDiundangkan: "17-10-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 292",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Administrasi Pemerintahan adalah tata laksana dalam pengambilan keputusan dan/atau tindakan oleh badan dan/atau pejabat pemerintahan."
          },
          {
            bab: "BAB III - ASAS-ASAS UMUM PEMERINTAHAN YANG BAIK",
            pasal: "Pasal 10",
            bunyi: "(1) AUPB yang dimaksud dalam Undang-Undang ini meliputi asas:\na. kepastian hukum;\nb. kemanfaatan;\nc. ketidakberpihakan;\nd. kecermatan;\ne. tidak menyalahgunakan kewenangan;\nf. keterbukaan;\ng. kepentingan umum; dan\nh. pelayanan yang baik.\n(2) Asas-asas umum lainnya di luar AUPB sebagaimana dimaksud pada ayat (1) dapat diterapkan sepanjang dijadikan dasar penilaian hakim yang tertuang dalam putusan pengadilan yang berkekuatan hukum tetap."
          }
        ]
      },
      {
        id: 61,
        judul: "UU Aparatur Sipil Negara",
        nomor: "UU No. 5 Tahun 2014",
        tahun: "2014",
        kategori: "Kepegawaian",
        deskripsi: "Tentang Aparatur Sipil Negara",
        tanggalDitetapkan: "15-01-2014",
        tanggalDiundangkan: "15-01-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 6",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Aparatur Sipil Negara yang selanjutnya disingkat ASN adalah profesi bagi pegawai negeri sipil dan pegawai pemerintah dengan perjanjian kerja yang bekerja pada instansi pemerintah.\n2. Pegawai Aparatur Sipil Negara yang selanjutnya disebut Pegawai ASN adalah pegawai negeri sipil dan pegawai pemerintah dengan perjanjian kerja yang diangkat oleh pejabat pembina kepegawaian dan diserahi tugas dalam suatu jabatan pemerintahan atau diserahi tugas negara lainnya dan digaji berdasarkan peraturan perundang-undangan."
          },
          {
            bab: "BAB II - JENIS, STATUS, DAN KEDUDUKAN",
            pasal: "Pasal 6",
            bunyi: "Pegawai ASN terdiri atas:\na. PNS; dan\nb. PPPK."
          }
        ]
      },
      {
        id: 62,
        judul: "UU Perlindungan Konsumen",
        nomor: "UU No. 8 Tahun 1999",
        tahun: "1999",
        kategori: "Perdagangan",
        deskripsi: "Tentang Perlindungan Konsumen",
        tanggalDitetapkan: "20-04-1999",
        tanggalDiundangkan: "20-04-1999",
        sumber: "Lembaran Negara Tahun 1999 No. 42",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Perlindungan konsumen adalah segala upaya yang menjamin adanya kepastian hukum untuk memberi perlindungan kepada konsumen.\n2. Konsumen adalah setiap orang pemakai barang dan/atau jasa yang tersedia dalam masyarakat, baik bagi kepentingan diri sendiri, keluarga, orang lain, maupun makhluk hidup lain dan tidak untuk diperdagangkan."
          },
          {
            bab: "BAB III - HAK DAN KEWAJIBAN",
            pasal: "Pasal 4",
            bunyi: "Hak konsumen adalah:\na. hak atas kenyamanan, keamanan, dan keselamatan dalam mengkonsumsi barang dan/atau jasa;\nb. hak untuk memilih barang dan/atau jasa serta mendapatkan barang dan/atau jasa tersebut sesuai dengan nilai tukar dan kondisi serta jaminan yang dijanjikan;\nc. hak atas informasi yang benar, jelas, dan jujur mengenai kondisi dan jaminan barang dan/atau jasa;\nd. hak untuk didengar pendapat dan keluhannya atas barang dan/atau jasa yang digunakan;\ne. hak untuk mendapatkan advokasi, perlindungan, dan upaya penyelesaian sengketa perlindungan konsumen secara patut;\nf. hak untuk mendapat pembinaan dan pendidikan konsumen;\ng. hak untuk diperlakukan atau dilayani secara benar dan jujur serta tidak diskriminatif;\nh. hak untuk mendapatkan kompensasi, ganti rugi dan/atau penggantian, apabila barang dan/atau jasa yang diterima tidak sesuai dengan perjanjian atau tidak sebagaimana mestinya;\ni. hak-hak yang diatur dalam ketentuan peraturan perundang-undangan lainnya."
          }
        ]
      },
      {
        id: 63,
        judul: "UU Perdagangan",
        nomor: "UU No. 7 Tahun 2014",
        tahun: "2014",
        kategori: "Perdagangan",
        deskripsi: "Tentang Perdagangan",
        tanggalDitetapkan: "11-03-2014",
        tanggalDiundangkan: "11-03-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 45",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Perdagangan adalah tatanan kegiatan yang terkait dengan transaksi Barang dan/atau Jasa di dalam negeri dan melampaui batas wilayah negara dengan tujuan pengalihan hak atas Barang dan/atau Jasa untuk memperoleh imbalan atau kompensasi."
          },
          {
            bab: "BAB II - ASAS DAN TUJUAN",
            pasal: "Pasal 2",
            bunyi: "Kebijakan Perdagangan disusun berdasarkan asas:\na. kepentingan nasional;\nb. kepastian hukum;\nc. adil dan sehat;\nd. keamanan berusaha;\ne. akuntabel dan transparan;\nf. kemandirian;\ng. kemitraan;\nh. kemanfaatan;\ni. kesederhanaan; dan\nj. kebersamaan."
          }
        ]
      },
      {
        id: 64,
        judul: "UU Perindustrian",
        nomor: "UU No. 3 Tahun 2014",
        tahun: "2014",
        kategori: "Industri",
        deskripsi: "Tentang Perindustrian",
        tanggalDitetapkan: "15-01-2014",
        tanggalDiundangkan: "15-01-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 4",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Perindustrian adalah tatanan dan segala kegiatan yang bertalian dengan kegiatan industri.\n2. Industri adalah seluruh bentuk kegiatan ekonomi yang mengolah bahan baku dan/atau memanfaatkan sumber daya industri sehingga menghasilkan barang yang mempunyai nilai tambah atau manfaat lebih tinggi, termasuk jasa industri."
          },
          {
            bab: "BAB II - ASAS DAN TUJUAN",
            pasal: "Pasal 2",
            bunyi: "Perindustrian diselenggarakan berdasarkan asas:\na. kepentingan nasional;\nb. demokrasi ekonomi;\nc. kepastian berusaha;\nd. pemerataan persebaran;\ne. persaingan usaha yang sehat;\nf. keterkaitan;\ng. kelestarian lingkungan hidup;\nh. kemandirian;\ni. keseimbangan kemajuan; dan\nj. kesatuan ekonomi nasional."
          }
        ]
      },
      {
        id: 65,
        judul: "UU BUMN",
        nomor: "UU No. 19 Tahun 2003",
        tahun: "2003",
        kategori: "Ekonomi",
        deskripsi: "Tentang Badan Usaha Milik Negara",
        tanggalDitetapkan: "19-06-2003",
        tanggalDiundangkan: "19-06-2003",
        sumber: "Lembaran Negara Tahun 2003 No. 70",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Badan Usaha Milik Negara, yang selanjutnya disebut BUMN, adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh negara melalui penyertaan secara langsung yang berasal dari kekayaan negara yang dipisahkan.\n2. Perusahaan Perseroan, yang selanjutnya disebut Persero, adalah BUMN yang berbentuk perseroan terbatas yang modalnya terbagi dalam saham yang seluruh atau paling sedikit 51% (lima puluh satu persen) sahamnya dimiliki oleh Negara Republik Indonesia yang tujuan utamanya mengejar keuntungan."
          },
          {
            bab: "BAB II - MAKSUD DAN TUJUAN",
            pasal: "Pasal 2",
            bunyi: "(1) Maksud dan tujuan pendirian BUMN adalah:\na. memberikan sumbangan bagi perkembangan perekonomian nasional pada umumnya dan penerimaan negara pada khususnya;\nb. mengejar keuntungan;\nc. menyelenggarakan kemanfaatan umum berupa penyediaan barang dan/atau jasa yang bermutu tinggi dan memadai bagi pemenuhan hajat hidup orang banyak;\nd. menjadi perintis kegiatan-kegiatan usaha yang belum dapat dilaksanakan oleh sektor swasta dan koperasi;\ne. turut aktif memberikan bimbingan dan bantuan kepada pengusaha golongan ekonomi lemah, koperasi, dan masyarakat."
          }
        ]
      },
      {
        id: 66,
        judul: "Undang-Undang tentang Wakaf",
        nomor: "UU No. 41 Tahun 2004",
        tahun: "2004",
        kategori: "Agama",
        deskripsi: "Tentang Wakaf",
        tanggalDitetapkan: "27-10-2004",
        tanggalDiundangkan: "27-10-2004",
        sumber: "Lembaran Negara Tahun 2004 No. 159",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Wakaf adalah perbuatan hukum wakif untuk memisahkan dan/atau menyerahkan sebagian harta benda miliknya untuk dimanfaatkan selamanya atau untuk jangka waktu tertentu sesuai dengan kepentingannya guna keperluan ibadah dan/atau kesejahteraan umum menurut syariah.\n2. Wakif adalah pihak yang mewakafkan harta benda miliknya.\n3. Ikrar Wakaf adalah pernyataan kehendak wakif yang diucapkan secara lisan dan/atau tulisan kepada Nazhir untuk mewakafkan harta benda miliknya."
          },
          {
            bab: "BAB II - DASAR-DASAR WAKAF",
            pasal: "Pasal 6",
            bunyi: "Wakaf dilaksanakan dengan memenuhi unsur wakaf sebagai berikut:\na. Wakif;\nb. Nazhir;\nc. Harta Benda Wakaf;\nd. Ikrar Wakaf;\ne. peruntukan harta benda wakaf;\nf. jangka waktu wakaf."
          }
        ]
      },
      {
        id: 67,
        judul: "Undang-Undang tentang Perpustakaan",
        nomor: "UU No. 43 Tahun 2007",
        tahun: "2007",
        kategori: "Pendidikan",
        deskripsi: "Tentang Perpustakaan",
        tanggalDitetapkan: "01-11-2007",
        tanggalDiundangkan: "01-11-2007",
        sumber: "Lembaran Negara Tahun 2007 No. 129",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Perpustakaan adalah institusi pengelola koleksi karya tulis, karya cetak, dan/atau karya rekam secara profesional dengan sistem yang baku guna memenuhi kebutuhan pendidikan, penelitian, pelestarian, informasi, dan rekreasi para pemustaka.\n2. Koleksi perpustakaan adalah semua informasi dalam bentuk karya tulis, karya cetak, dan/atau karya rekam dalam berbagai media yang mempunyai nilai pendidikan, yang dihimpun, diolah, dan dilayankan."
          },
          {
            bab: "BAB III - HAK DAN KEWAJIBAN",
            pasal: "Pasal 5",
            bunyi: "(1) Masyarakat mempunyai hak yang sama untuk:\na. memperoleh layanan serta memanfaatkan dan mendayagunakan fasilitas perpustakaan;\nb. mengusulkan keanggotaan Dewan Perpustakaan;\nc. mendirikan dan/atau menyelenggarakan perpustakaan;\nd. berperan serta dalam pengawasan dan evaluasi terhadap penyelenggaraan perpustakaan.\n(2) Masyarakat di daerah terpencil, terisolasi, atau terbelakang sebagai akibat faktor geografis berhak memperoleh layanan perpustakaan secara khusus."
          }
        ]
      },
      {
        id: 68,
        judul: "Undang-Undang tentang Rumah Sakit",
        nomor: "UU No. 44 Tahun 2009",
        tahun: "2009",
        kategori: "Kesehatan",
        deskripsi: "Tentang Rumah Sakit",
        tanggalDitetapkan: "28-10-2009",
        tanggalDiundangkan: "28-10-2009",
        sumber: "Lembaran Negara Tahun 2009 No. 153",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Rumah Sakit adalah institusi pelayanan kesehatan yang menyelenggarakan pelayanan kesehatan perorangan secara paripurna yang menyediakan pelayanan rawat inap, rawat jalan, dan gawat darurat.\n2. Pasien adalah setiap orang yang melakukan konsultasi masalah kesehatannya untuk memperoleh pelayanan kesehatan yang diperlukan, baik secara langsung maupun tidak langsung di Rumah Sakit."
          },
          {
            bab: "BAB V - HAK DAN KEWAJIBAN",
            pasal: "Pasal 32",
            bunyi: "Setiap pasien mempunyai hak:\na. memperoleh informasi mengenai tata tertib dan peraturan yang berlaku di Rumah Sakit;\nb. memperoleh informasi tentang hak dan kewajiban pasien;\nc. memperoleh layanan yang manusiawi, adil, jujur, dan tanpa diskriminasi;\nd. memperoleh layanan kesehatan yang bermutu sesuai dengan standar profesi dan standar prosedur operasional;\ne. memperoleh layanan yang efektif dan efisien sehingga pasien terhindar dari kerugian fisik dan materi."
          }
        ]
      },
      {
        id: 69,
        judul: "Undang-Undang tentang Keimigrasian",
        nomor: "UU No. 6 Tahun 2011",
        tahun: "2011",
        kategori: "Tata Negara",
        deskripsi: "Tentang Keimigrasian",
        tanggalDitetapkan: "05-05-2011",
        tanggalDiundangkan: "05-05-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 52",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Keimigrasian adalah hal ihwal lalu lintas orang yang masuk atau keluar Wilayah Indonesia serta pengawasannya dalam rangka menjaga tegaknya kedaulatan negara.\n2. Fungsi Keimigrasian adalah bagian dari urusan pemerintahan negara dalam memberikan pelayanan Keimigrasian, penegakan hukum, keamanan negara, dan fasilitator pembangunan kesejahteraan masyarakat."
          },
          {
            bab: "BAB III - MASUK DAN KELUAR WILAYAH INDONESIA",
            pasal: "Pasal 8",
            bunyi: "(1) Setiap orang yang masuk atau keluar Wilayah Indonesia wajib memiliki Dokumen Perjalanan yang sah dan masih berlaku.\n(2) Setiap Orang Asing yang masuk Wilayah Indonesia wajib memiliki Visa yang sah dan masih berlaku, kecuali ditentukan lain berdasarkan Undang-Undang ini dan perjanjian internasional."
          }
        ]
      },
      {
        id: 70,
        judul: "Undang-Undang tentang Penanganan Fakir Miskin",
        nomor: "UU No. 13 Tahun 2011",
        tahun: "2011",
        kategori: "Sosial",
        deskripsi: "Tentang Penanganan Fakir Miskin",
        tanggalDitetapkan: "21-10-2011",
        tanggalDiundangkan: "22-10-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 83",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Fakir miskin adalah orang yang sama sekali tidak mempunyai sumber mata pencaharian dan/atau mempunyai sumber mata pencaharian tetapi tidak mempunyai kemampuan memenuhi kebutuhan dasar yang layak bagi kehidupan dirinya dan/atau keluarganya.\n2. Penanganan fakir miskin adalah upaya yang terarah, terpadu, dan berkelanjutan yang dilakukan Pemerintah, pemerintah daerah, dan/atau masyarakat dalam bentuk kebijakan, program dan kegiatan pemberdayaan, pendampingan, serta fasilitasi untuk memenuhi kebutuhan dasar setiap warga negara."
          },
          {
            bab: "BAB II - HAK DAN TANGGUNG JAWAB",
            pasal: "Pasal 3",
            bunyi: "Penanganan fakir miskin bertujuan:\na. memenuhi kebutuhan dasar setiap warga negara;\nb. mempercepat pengentasan kemiskinan;\nc. meningkatkan kapasitas dan mengembangkan kemampuan dasar serta kemampuan berusaha;\nd. memperkuat peran fakir miskin dalam pengambilan kebijakan publik yang menjamin penghormatan, perlindungan, dan pemenuhan hak-hak dasar;\ne. memulihkan fungsi sosial warga negara dalam menjalankan peran serta tanggung jawabnya; dan\nf. meningkatkan ketahanan sosial masyarakat dalam mencegah dan menangani masalah kemiskinan."
          }
        ]
      },
      {
        id: 71,
        judul: "Undang-Undang tentang Penyelenggaraan Ibadah Haji",
        nomor: "UU No. 13 Tahun 2008",
        tahun: "2008",
        kategori: "Agama",
        deskripsi: "Tentang Penyelenggaraan Ibadah Haji",
        tanggalDitetapkan: "26-05-2008",
        tanggalDiundangkan: "26-05-2008",
        sumber: "Lembaran Negara Tahun 2008 No. 60",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Ibadah haji adalah rukun Islam kelima yang merupakan kewajiban sekali seumur hidup bagi setiap orang Islam yang mampu menunaikannya.\n2. Penyelenggaraan Ibadah Haji adalah rangkaian kegiatan pengelolaan pelaksanaan Ibadah Haji yang meliputi pembinaan, pelayanan, dan perlindungan jamaah haji."
          },
          {
            bab: "BAB III - HAK DAN KEWAJIBAN",
            pasal: "Pasal 8",
            bunyi: "Setiap warga negara yang beragama Islam berhak untuk menunaikan Ibadah Haji dengan syarat:\na. berusia paling rendah 18 (delapan belas) tahun atau sudah menikah; dan\nb. mampu membayar Biaya Penyelenggaraan Ibadah Haji."
          }
        ]
      },
      {
        id: 72,
        judul: "Undang-Undang tentang Pornografi",
        nomor: "UU No. 44 Tahun 2008",
        tahun: "2008",
        kategori: "Pidana",
        deskripsi: "Tentang Pornografi",
        tanggalDitetapkan: "26-11-2008",
        tanggalDiundangkan: "26-11-2008",
        sumber: "Lembaran Negara Tahun 2008 No. 181",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pornografi adalah gambar, sketsa, ilustrasi, foto, tulisan, suara, bunyi, gambar bergerak, animasi, kartun, percakapan, gerak tubuh, atau bentuk pesan lainnya melalui berbagai bentuk media komunikasi dan/atau pertunjukan di muka umum, yang memuat kecabulan atau eksploitasi seksual yang melanggar norma kesusilaan dalam masyarakat."
          },
          {
            bab: "BAB II - LARANGAN DAN PEMBATASAN",
            pasal: "Pasal 4",
            bunyi: "(1) Setiap orang dilarang memproduksi, membuat, memperbanyak, menggandakan, menyebarluaskan, menyiarkan, mengimpor, mengekspor, menawarkan, memperjualbelikan, menyewakan, atau menyediakan pornografi yang secara eksplisit memuat:\na. persenggamaan, termasuk persenggamaan yang menyimpang;\nb. kekerasan seksual;\nc. masturbasi atau onani;\nd. ketelanjangan atau tampilan yang mengesankan ketelanjangan;\ne. alat kelamin; atau\nf. pornografi anak."
          }
        ]
      },
      {
        id: 73,
        judul: "Undang-Undang tentang Keterbukaan Informasi Publik",
        nomor: "UU No. 14 Tahun 2008",
        tahun: "2008",
        kategori: "Tata Negara",
        deskripsi: "Tentang Keterbukaan Informasi Publik",
        tanggalDitetapkan: "30-04-2008",
        tanggalDiundangkan: "30-04-2008",
        sumber: "Lembaran Negara Tahun 2008 No. 61",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Informasi adalah keterangan, pernyataan, gagasan, dan tanda-tanda yang mengandung nilai, makna, dan pesan, baik data, fakta maupun penjelasannya yang dapat dilihat, didengar, dan dibaca yang disajikan dalam berbagai kemasan dan format sesuai dengan perkembangan teknologi informasi dan komunikasi secara elektronik ataupun nonelektronik.\n2. Informasi Publik adalah informasi yang dihasilkan, disimpan, dikelola, dikirim, dan/atau diterima oleh suatu badan publik yang berkaitan dengan penyelenggara dan penyelenggaraan negara dan/atau penyelenggara dan penyelenggaraan badan publik lainnya yang sesuai dengan Undang-Undang ini serta informasi lain yang berkaitan dengan kepentingan publik."
          },
          {
            bab: "BAB II - HAK DAN KEWAJIBAN",
            pasal: "Pasal 3",
            bunyi: "Undang-Undang ini bertujuan untuk:\na. menjamin hak warga negara untuk mengetahui rencana pembuatan kebijakan publik, program kebijakan publik, dan proses pengambilan keputusan publik, serta alasan pengambilan suatu keputusan publik;\nb. mendorong partisipasi masyarakat dalam proses pengambilan kebijakan publik;\nc. meningkatkan peran aktif masyarakat dalam pengambilan kebijakan publik dan pengelolaan Badan Publik yang baik;\nd. mewujudkan penyelenggaraan negara yang baik, yaitu yang transparan, efektif dan efisien, akuntabel serta dapat dipertanggungjawabkan;\ne. mengetahui alasan kebijakan publik yang mempengaruhi hajat hidup orang banyak;\nf. mengembangkan ilmu pengetahuan dan mencerdaskan kehidupan bangsa; dan/atau\ng. meningkatkan pengelolaan dan pelayanan informasi di lingkungan Badan Publik untuk menghasilkan layanan informasi yang berkualitas."
          }
        ]
      },
      {
        id: 74,
        judul: "Undang-Undang tentang Perlindungan Saksi dan Korban",
        nomor: "UU No. 31 Tahun 2014",
        tahun: "2014",
        kategori: "Pidana",
        deskripsi: "Perubahan atas UU No. 13 Tahun 2006 tentang Perlindungan Saksi dan Korban",
        tanggalDitetapkan: "07-10-2014",
        tanggalDiundangkan: "17-10-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 293",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Saksi adalah orang yang dapat memberikan keterangan guna kepentingan penyelidikan, penyidikan, penuntutan, dan pemeriksaan di sidang pengadilan tentang suatu tindak pidana yang ia dengar sendiri, ia lihat sendiri, dan/atau ia alami sendiri.\n2. Korban adalah seseorang yang mengalami penderitaan fisik, mental, dan/atau kerugian ekonomi yang diakibatkan oleh suatu tindak pidana."
          },
          {
            bab: "BAB III - HAK DAN KEWAJIBAN",
            pasal: "Pasal 5",
            bunyi: "(1) Saksi dan Korban berhak:\na. memperoleh perlindungan atas keamanan pribadi, keluarga, dan harta bendanya, serta bebas dari ancaman yang berkenaan dengan kesaksian yang akan, sedang, atau telah diberikannya;\nb. ikut serta dalam proses memilih dan menentukan bentuk perlindungan dan dukungan keamanan;\nc. memberikan keterangan tanpa tekanan;\nd. mendapat penerjemah;\ne. bebas dari pertanyaan yang menjerat;\nf. mendapat informasi mengenai perkembangan kasus;\ng. mendapat informasi mengenai putusan pengadilan;\nh. mendapat informasi dalam hal terpidana dibebaskan;\ni. dirahasiakan identitasnya;\nj. mendapat identitas baru;\nk. mendapat tempat kediaman sementara;\nl. mendapat tempat kediaman baru;\nm. memperoleh penggantian biaya transportasi sesuai dengan kebutuhan;\nn. mendapat nasihat hukum;\no. memperoleh bantuan biaya hidup sementara sampai batas waktu perlindungan berakhir; dan/atau\np. mendapat pendampingan."
          }
        ]
      },
      {
        id: 75,
        judul: "Undang-Undang tentang Aparatur Sipil Negara",
        nomor: "UU No. 5 Tahun 2014",
        tahun: "2014",
        kategori: "Tata Negara",
        deskripsi: "Tentang Aparatur Sipil Negara",
        tanggalDitetapkan: "15-01-2014",
        tanggalDiundangkan: "15-01-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 6",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Aparatur Sipil Negara yang selanjutnya disingkat ASN adalah profesi bagi pegawai negeri sipil dan pegawai pemerintah dengan perjanjian kerja yang bekerja pada instansi pemerintah.\n2. Pegawai Aparatur Sipil Negara yang selanjutnya disebut Pegawai ASN adalah pegawai negeri sipil dan pegawai pemerintah dengan perjanjian kerja yang diangkat oleh pejabat pembina kepegawaian dan diserahi tugas dalam suatu jabatan pemerintahan atau diserahi tugas negara lainnya dan digaji berdasarkan peraturan perundang-undangan."
          },
          {
            bab: "BAB II - JENIS, STATUS, DAN KEDUDUKAN",
            pasal: "Pasal 6",
            bunyi: "Pegawai ASN terdiri atas:\na. PNS; dan\nb. PPPK."
          }
        ]
      },
      {
        id: 76,
        judul: "Undang-Undang tentang Pangan",
        nomor: "UU No. 18 Tahun 2012",
        tahun: "2012",
        kategori: "Pertanian",
        deskripsi: "Tentang Pangan",
        tanggalDitetapkan: "17-11-2012",
        tanggalDiundangkan: "17-11-2012",
        sumber: "Lembaran Negara Tahun 2012 No. 227",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pangan adalah segala sesuatu yang berasal dari sumber hayati produk pertanian, perkebunan, kehutanan, perikanan, peternakan, perairan, dan air, baik yang diolah maupun tidak diolah yang diperuntukkan sebagai makanan atau minuman bagi konsumsi manusia, termasuk bahan tambahan Pangan, bahan baku Pangan, dan bahan lainnya yang digunakan dalam proses penyiapan, pengolahan, dan/atau pembuatan makanan atau minuman."
          },
          {
            bab: "BAB II - ASAS, TUJUAN, DAN RUANG LINGKUP",
            pasal: "Pasal 3",
            bunyi: "Penyelenggaraan Pangan bertujuan untuk:\na. meningkatkan kemampuan memproduksi Pangan secara mandiri;\nb. menyediakan Pangan yang beraneka ragam dan memenuhi persyaratan keamanan, mutu, dan gizi bagi konsumsi masyarakat;\nc. mewujudkan tingkat kecukupan Pangan, terutama Pangan Pokok dengan harga yang wajar dan terjangkau sesuai dengan kebutuhan masyarakat;\nd. mempermudah atau meningkatkan akses Pangan bagi masyarakat, terutama masyarakat rawan Pangan dan gizi;\ne. meningkatkan nilai tambah dan daya saing komoditas Pangan di pasar dalam negeri dan luar negeri;\nf. meningkatkan pengetahuan dan kesadaran masyarakat tentang Pangan yang aman, bermutu, dan bergizi bagi konsumsi masyarakat;\ng. meningkatkan kesejahteraan bagi Petani, Nelayan, Pembudi Daya Ikan, dan Pelaku Usaha Pangan; dan\nh. melindungi dan mengembangkan kekayaan sumber daya Pangan Nasional."
          }
        ]
      },
      {
        id: 77,
        judul: "Undang-Undang tentang Pengesahan Konvensi Hak Penyandang Disabilitas",
        nomor: "UU No. 19 Tahun 2011",
        tahun: "2011",
        kategori: "HAM",
        deskripsi: "Tentang Pengesahan Convention on The Rights of Persons with Disabilities",
        tanggalDitetapkan: "10-11-2011",
        tanggalDiundangkan: "10-11-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 107",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Pasal 1",
            bunyi: "Mengesahkan Convention on the Rights of Persons with Disabilities (Konvensi mengenai Hak-Hak Penyandang Disabilitas) yang telah ditandatangani oleh Pemerintah Republik Indonesia di New York pada tanggal 30 Maret 2007."
          },
          {
            pasal: "Pasal 2",
            bunyi: "Salinan naskah asli Convention on the Rights of Persons with Disabilities (Konvensi mengenai Hak-Hak Penyandang Disabilitas) dalam bahasa Inggris dan terjemahannya dalam bahasa Indonesia sebagaimana terlampir dan merupakan bagian yang tidak terpisahkan dari Undang-Undang ini."
          }
        ]
      },
      {
        id: 78,
        judul: "Undang-Undang tentang Pencegahan dan Pemberantasan Perusakan Hutan",
        nomor: "UU No. 18 Tahun 2013",
        tahun: "2013",
        kategori: "Lingkungan",
        deskripsi: "Tentang Pencegahan dan Pemberantasan Perusakan Hutan",
        tanggalDitetapkan: "06-08-2013",
        tanggalDiundangkan: "06-08-2013",
        sumber: "Lembaran Negara Tahun 2013 No. 130",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pencegahan perusakan hutan adalah segala upaya yang dilakukan untuk menghilangkan kesempatan terjadinya perusakan hutan.\n2. Pemberantasan perusakan hutan adalah segala upaya yang dilakukan untuk menindak secara hukum terhadap pelaku perusakan hutan baik langsung, tidak langsung maupun yang terkait lainnya."
          },
          {
            bab: "BAB II - ASAS, TUJUAN, DAN RUANG LINGKUP",
            pasal: "Pasal 3",
            bunyi: "Pencegahan dan pemberantasan perusakan hutan bertujuan untuk:\na. menjamin kepastian hukum dan memberikan efek jera bagi pelaku perusakan hutan;\nb. menjamin keberadaan hutan secara berkelanjutan dengan tetap menjaga kelestarian dan tidak merusak lingkungan serta ekosistem sekitarnya;\nc. mengoptimalkan pengelolaan dan pemanfaatan hasil hutan dengan memperhatikan keseimbangan fungsi hutan guna terwujudnya masyarakat sejahtera."
          }
        ]
      },
      {
        id: 79,
        judul: "Undang-Undang tentang Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme",
        nomor: "UU No. 9 Tahun 2013",
        tahun: "2013",
        kategori: "Pidana",
        deskripsi: "Tentang Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme",
        tanggalDitetapkan: "13-03-2013",
        tanggalDiundangkan: "13-03-2013",
        sumber: "Lembaran Negara Tahun 2013 No. 50",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Terorisme adalah perbuatan yang menggunakan kekerasan atau ancaman kekerasan yang menimbulkan suasana teror atau rasa takut secara meluas, yang dapat menimbulkan korban yang bersifat massal, dan/atau menimbulkan kerusakan atau kehancuran terhadap objek vital yang strategis, lingkungan hidup, fasilitas publik, atau fasilitas internasional dengan motif ideologi, politik, atau gangguan keamanan.\n2. Pendanaan Terorisme adalah segala perbuatan dalam rangka menyediakan, mengumpulkan, memberikan, atau meminjamkan Dana, baik langsung maupun tidak langsung, dengan maksud untuk digunakan dan/atau yang diketahui akan digunakan untuk melakukan kegiatan Terorisme, organisasi teroris, atau teroris."
          },
          {
            bab: "BAB II - TINDAK PIDANA PENDANAAN TERORISME",
            pasal: "Pasal 4",
            bunyi: "Setiap Orang yang dengan sengaja menyediakan, mengumpulkan, memberikan, atau meminjamkan Dana, baik langsung maupun tidak langsung, dengan maksud digunakan seluruhnya atau sebagian untuk melakukan tindak pidana Terorisme, organisasi teroris, atau teroris dipidana karena melakukan tindak pidana Pendanaan Terorisme dengan pidana penjara paling lama 15 (lima belas) tahun dan pidana denda paling banyak Rp1.000.000.000,00 (satu miliar rupiah)."
          }
        ]
      },
      {
        id: 80,
        judul: "Undang-Undang tentang Perubahan atas UU Mahkamah Konstitusi",
        nomor: "UU No. 8 Tahun 2011",
        tahun: "2011",
        kategori: "Peradilan",
        deskripsi: "Perubahan atas UU No. 24 Tahun 2003 tentang Mahkamah Konstitusi",
        tanggalDitetapkan: "20-07-2011",
        tanggalDiundangkan: "21-07-2011",
        sumber: "Lembaran Negara Tahun 2011 No. 70",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Pasal 15",
            bunyi: "(1) Hakim konstitusi harus memenuhi syarat sebagai berikut:\na. memiliki integritas dan kepribadian yang tidak tercela;\nb. adil;\nc. negarawan yang menguasai konstitusi dan ketatanegaraan;\nd. tidak merangkap sebagai pejabat negara;\ne. berusia paling rendah 47 (empat puluh tujuh) tahun dan paling tinggi 65 (enam puluh lima) tahun pada saat pengangkatan;\nf. berijazah sarjana hukum atau sarjana lain yang mempunyai keahlian di bidang hukum;\ng. lulus ujian yang diadakan khusus untuk calon hakim konstitusi;\nh. tidak pernah dijatuhi pidana penjara berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap;\ni. tidak sedang dinyatakan pailit berdasarkan putusan pengadilan; dan\nj. mempunyai pengalaman kerja di bidang hukum paling sedikit 15 (lima belas) tahun."
          }
        ]
      },
      {
        id: 81,
        judul: "Undang-Undang tentang Penanganan Pengungsi Dari Luar Negeri",
        nomor: "Perpres No. 125 Tahun 2016",
        tahun: "2016",
        kategori: "HAM",
        deskripsi: "Tentang Penanganan Pengungsi Dari Luar Negeri",
        tanggalDitetapkan: "31-12-2016",
        tanggalDiundangkan: "31-12-2016",
        sumber: "Lembaran Negara Tahun 2016 No. 368",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Peraturan Presiden ini yang dimaksud dengan:\n1. Pengungsi dari Luar Negeri, yang selanjutnya disebut Pengungsi, adalah orang asing yang berada di wilayah Negara Republik Indonesia disebabkan karena ketakutan yang beralasan akan persekusi dengan alasan ras, suku, agama, kebangsaan, keanggotaan kelompok sosial tertentu, dan pendapat politik yang berbeda serta tidak menginginkan perlindungan dari negara asalnya dan/atau telah mendapatkan status pencari suaka atau status pengungsi dari Perserikatan Bangsa-Bangsa melalui Komisariat Tinggi Urusan Pengungsi di Indonesia."
          },
          {
            bab: "BAB II - PENEMUAN",
            pasal: "Pasal 5",
            bunyi: "(1) Dalam hal ditemukan Pengungsi yang diduga sebagai korban perdagangan orang dan penyelundupan orang, petugas yang menemukan berkoordinasi dengan aparat penegak hukum setempat.\n(2) Terhadap Pengungsi yang menjadi korban tindak pidana perdagangan orang dan tindak pidana penyelundupan orang diberikan perlindungan sesuai dengan ketentuan peraturan perundang-undangan."
          }
        ]
      },
      {
        id: 82,
        judul: "Undang-Undang tentang Administrasi Kependudukan",
        nomor: "UU No. 24 Tahun 2013",
        tahun: "2013",
        kategori: "Tata Negara",
        deskripsi: "Perubahan atas UU No. 23 Tahun 2006 tentang Administrasi Kependudukan",
        tanggalDitetapkan: "24-12-2013",
        tanggalDiundangkan: "24-12-2013",
        sumber: "Lembaran Negara Tahun 2013 No. 232",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Administrasi Kependudukan adalah rangkaian kegiatan penataan dan penertiban dalam penerbitan dokumen dan Data Kependudukan melalui Pendaftaran Penduduk, Pencatatan Sipil, pengelolaan informasi Administrasi Kependudukan serta pendayagunaan hasilnya untuk pelayanan publik dan pembangunan sektor lain.\n2. Penduduk adalah Warga Negara Indonesia dan Orang Asing yang bertempat tinggal di Indonesia."
          },
          {
            pasal: "Pasal 63",
            bunyi: "(1) Penduduk Warga Negara Indonesia dan Orang Asing yang memiliki Izin Tinggal Tetap hanya diperbolehkan terdaftar dalam 1 (satu) KK.\n(2) Perubahan susunan keluarga dalam KK wajib dilaporkan kepada Instansi Pelaksana paling lambat 30 (tiga puluh) hari sejak terjadinya perubahan."
          }
        ]
      },
      {
        id: 83,
        judul: "Undang-Undang tentang Perlindungan dan Pemberdayaan Petani",
        nomor: "UU No. 19 Tahun 2013",
        tahun: "2013",
        kategori: "Pertanian",
        deskripsi: "Tentang Perlindungan dan Pemberdayaan Petani",
        tanggalDitetapkan: "06-08-2013",
        tanggalDiundangkan: "06-08-2013",
        sumber: "Lembaran Negara Tahun 2013 No. 131",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Petani adalah warga negara Indonesia perseorangan dan/atau beserta keluarganya yang melakukan Usaha Tani di bidang tanaman pangan, hortikultura, perkebunan, dan/atau peternakan.\n2. Perlindungan Petani adalah segala upaya untuk membantu Petani dalam menghadapi permasalahan kesulitan memperoleh prasarana dan sarana produksi, kepastian usaha, risiko harga, kegagalan panen, praktik ekonomi biaya tinggi, dan perubahan iklim."
          },
          {
            bab: "BAB II - ASAS, TUJUAN, DAN RUANG LINGKUP",
            pasal: "Pasal 3",
            bunyi: "Perlindungan dan Pemberdayaan Petani bertujuan untuk:\na. mewujudkan kedaulatan dan kemandirian Petani dalam rangka meningkatkan taraf kesejahteraan, kualitas, dan kehidupan yang lebih baik;\nb. menyediakan prasarana dan sarana pertanian yang dibutuhkan dalam mengembangkan Usaha Tani;\nc. memberikan kepastian usaha bagi pelaku Usaha Tani;\nd. melindungi Petani dari fluktuasi harga, praktik ekonomi biaya tinggi, dan kegagalan panen;\ne. meningkatkan kemampuan dan kapasitas Petani serta Kelembagaan Petani dalam menjalankan Usaha Tani yang produktif, maju, modern, berdaya saing, mempunyai pangsa pasar, dan berkelanjutan; dan\nf. menumbuhkembangkan kelembagaan pembiayaan pertanian yang melayani kepentingan Usaha Tani."
          }
        ]
      },
      {
        id: 84,
        judul: "Undang-Undang tentang Keinsinyuran",
        nomor: "UU No. 11 Tahun 2014",
        tahun: "2014",
        kategori: "Profesi",
        deskripsi: "Tentang Keinsinyuran",
        tanggalDitetapkan: "26-03-2014",
        tanggalDiundangkan: "27-03-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 61",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Keinsinyuran adalah kegiatan teknik dengan menggunakan kepakaran dan keahlian berdasarkan penguasaan ilmu pengetahuan dan teknologi untuk meningkatkan nilai tambah dan daya guna secara berkelanjutan dengan memperhatikan keselamatan, kesehatan, kenyamanan, dan keamanan manusia, lingkungan hidup, dan kearifan lokal guna kepentingan dan kesejahteraan masyarakat serta kelestarian lingkungan.\n2. Insinyur adalah seseorang yang mempunyai profesi di bidang Keinsinyuran."
          },
          {
            bab: "BAB III - PROGRAM PROFESI INSINYUR",
            pasal: "Pasal 7",
            bunyi: "(1) Untuk mendapatkan gelar profesi Insinyur seseorang harus:\na. lulus pendidikan tinggi di bidang teknik atau bidang lain yang relevan dengan Keinsinyuran paling rendah program sarjana atau diploma empat; dan\nb. lulus Program Profesi Insinyur.\n(2) Program Profesi Insinyur sebagaimana dimaksud pada ayat (1) huruf b merupakan pendidikan tinggi setelah program sarjana untuk membentuk kompetensi Keinsinyuran."
          }
        ]
      },
      {
        id: 85,
        judul: "Undang-Undang tentang Pemerintah Daerah",
        nomor: "UU No. 9 Tahun 2015",
        tahun: "2015",
        kategori: "Tata Negara",
        deskripsi: "Perubahan Kedua atas UU No. 23 Tahun 2014 tentang Pemerintahan Daerah",
        tanggalDitetapkan: "18-03-2015",
        tanggalDiundangkan: "18-03-2015",
        sumber: "Lembaran Negara Tahun 2015 No. 58",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Pasal 1",
            bunyi: "Beberapa ketentuan dalam Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2014 Nomor 244, Tambahan Lembaran Negara Republik Indonesia Nomor 5587) sebagaimana telah diubah dengan Undang-Undang Nomor 2 Tahun 2015 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah Menjadi Undang-Undang (Lembaran Negara Republik Indonesia Tahun 2015 Nomor 24, Tambahan Lembaran Negara Republik Indonesia Nomor 5657) diubah"
          }
        ]
      },
      {
        id: 86,
        judul: "Undang-Undang tentang Penyandang Disabilitas",
        nomor: "UU No. 8 Tahun 2016",
        tahun: "2016",
        kategori: "HAM",
        deskripsi: "Tentang Penyandang Disabilitas",
        tanggalDitetapkan: "15-04-2016",
        tanggalDiundangkan: "15-04-2016",
        sumber: "Lembaran Negara Tahun 2016 No. 69",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Penyandang Disabilitas adalah setiap orang yang mengalami keterbatasan fisik, intelektual, mental, dan/atau sensorik dalam jangka waktu lama yang dalam berinteraksi dengan lingkungan dapat mengalami hambatan dan kesulitan untuk berpartisipasi secara penuh dan efektif dengan warga negara lainnya berdasarkan kesamaan hak.\n2. Kesamaan Kesempatan adalah keadaan yang memberikan peluang dan/atau menyediakan akses kepada Penyandang Disabilitas untuk menyalurkan potensi dalam segala aspek penyelenggaraan negara dan masyarakat."
          },
          {
            bab: "BAB II - HAK PENYANDANG DISABILITAS",
            pasal: "Pasal 5",
            bunyi: "(1) Penyandang Disabilitas memiliki hak:\na. hidup;\nb. bebas dari stigma;\nc. privasi;\nd. keadilan dan perlindungan hukum;\ne. pendidikan;\nf. pekerjaan, kewirausahaan, dan koperasi;\ng. kesehatan;\nh. politik;\ni. keagamaan;\nj. keolahragaan;\nk. kebudayaan dan pariwisata;\nl. kesejahteraan sosial;\nm. Aksesibilitas;\nn. Pelayanan Publik;\no. Perlindungan dari bencana;\np. habilitasi dan rehabilitasi;\nq. Konsesi;\nr. pendataan;\ns. hidup secara mandiri dan dilibatkan dalam masyarakat;\nt. berekspresi, berkomunikasi, dan memperoleh informasi;\nu. berpindah tempat dan kewarganegaraan; dan\nv. bebas dari tindakan Diskriminasi, penelantaran, penyiksaan, dan eksploitasi."
          }
        ]
      },
      {
        id: 87,
        judul: "Undang-Undang tentang Pengampunan Pajak",
        nomor: "UU No. 11 Tahun 2016",
        tahun: "2016",
        kategori: "Pajak",
        deskripsi: "Tentang Pengampunan Pajak",
        tanggalDitetapkan: "01-07-2016",
        tanggalDiundangkan: "01-07-2016",
        sumber: "Lembaran Negara Tahun 2016 No. 131",
        status: "Dicabut",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pengampunan Pajak adalah penghapusan pajak yang seharusnya terutang, tidak dikenai sanksi administrasi perpajakan dan sanksi pidana di bidang perpajakan, dengan cara mengungkap Harta dan membayar Uang Tebusan sebagaimana diatur dalam Undang-Undang ini.\n2. Wajib Pajak adalah orang pribadi atau badan yang mempunyai hak dan kewajiban perpajakan sesuai dengan ketentuan peraturan perundang-undangan di bidang perpajakan."
          },
          {
            bab: "BAB II - SUBJEK, OBJEK, DAN TARIF",
            pasal: "Pasal 4",
            bunyi: "(1) Tarif Uang Tebusan atas Harta yang berada di dalam wilayah Negara Kesatuan Republik Indonesia atau Harta yang berada di luar wilayah Negara Kesatuan Republik Indonesia yang dialihkan ke dalam wilayah Negara Kesatuan Republik Indonesia dan diinvestasikan di dalam wilayah Negara Kesatuan Republik Indonesia dalam jangka waktu paling singkat 3 (tiga) tahun terhitung sejak dialihkan, adalah sebagai berikut:\na. 2% (dua persen) untuk periode penyampaian Surat Pernyataan pada bulan pertama sampai dengan akhir bulan ketiga terhitung sejak Undang-Undang ini mulai berlaku;\nb. 3% (tiga persen) untuk periode penyampaian Surat Pernyataan pada bulan keempat terhitung sejak Undang-Undang ini mulai berlaku sampai dengan tanggal 31 Desember 2016; dan\nc. 5% (lima persen) untuk periode penyampaian Surat Pernyataan terhitung sejak tanggal 1 Januari 2017 sampai dengan tanggal 31 Maret 2017."
          }
        ]
      },
      {
        id: 88,
        judul: "Undang-Undang tentang Penguatan Komisi Pemberantasan Korupsi",
        nomor: "UU No. 19 Tahun 2019",
        tahun: "2019",
        kategori: "Anti Korupsi",
        deskripsi: "Perubahan Kedua atas UU No. 30 Tahun 2002 tentang Komisi Pemberantasan Tindak Pidana Korupsi",
        tanggalDitetapkan: "17-09-2019",
        tanggalDiundangkan: "17-09-2019",
        sumber: "Lembaran Negara Tahun 2019 No. 197",
        status: "Berlaku",
        isiPasal: [
          {
            pasal: "Pasal 1",
            bunyi: "Beberapa ketentuan dalam Undang-Undang Nomor 30 Tahun 2002 tentang Komisi Pemberantasan Tindak Pidana Korupsi (Lembaran Negara Republik Indonesia Tahun 2002 Nomor 137, Tambahan Lembaran Negara Republik Indonesia Nomor 4250) diubah"
          },
          {
            pasal: "Pasal 3",
            bunyi: "Komisi Pemberantasan Korupsi adalah lembaga negara dalam rumpun kekuasaan eksekutif yang melaksanakan tugas pencegahan dan pemberantasan tindak pidana korupsi sesuai dengan Undang-Undang ini."
          }
        ]
      },
      {
        id: 89,
        judul: "Undang-Undang tentang Sumber Daya Air",
        nomor: "UU No. 17 Tahun 2019",
        tahun: "2019",
        kategori: "Lingkungan",
        deskripsi: "Tentang Sumber Daya Air",
        tanggalDitetapkan: "15-10-2019",
        tanggalDiundangkan: "16-10-2019",
        sumber: "Lembaran Negara Tahun 2019 No. 190",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Sumber Daya Air adalah air, sumber air, dan daya air yang terkandung di dalamnya.\n2. Air adalah semua air yang terdapat pada, di atas, ataupun di bawah permukaan tanah, termasuk dalam pengertian ini air permukaan, air tanah, air hujan, dan air laut yang berada di darat.\n3. Sumber Air adalah tempat atau wadah air alami dan/atau buatan yang terdapat pada, di atas, ataupun di bawah permukaan tanah."
          },
          {
            bab: "BAB II - WEWENANG DAN TANGGUNG JAWAB",
            pasal: "Pasal 6",
            bunyi: "(1) Sumber Daya Air dikuasai oleh negara dan dipergunakan untuk sebesar-besar kemakmuran rakyat.\n(2) Penguasaan Sumber Daya Air oleh negara sebagaimana dimaksud pada ayat (1) diselenggarakan oleh Pemerintah Pusat dan/atau Pemerintah Daerah dengan tetap mengakui dan menghormati kesatuan masyarakat hukum adat beserta hak-hak tradisionalnya, seperti hak ulayat masyarakat hukum adat setempat dan hak yang serupa dengan itu, sepanjang tidak bertentangan dengan kepentingan nasional dan ketentuan peraturan perundang-undangan."
          }
        ]
      },
      {
        id: 90,
        judul: "Undang-Undang tentang Pesantren",
        nomor: "UU No. 18 Tahun 2019",
        tahun: "2019",
        kategori: "Pendidikan",
        deskripsi: "Tentang Pesantren",
        tanggalDitetapkan: "15-10-2019",
        tanggalDiundangkan: "16-10-2019",
        sumber: "Lembaran Negara Tahun 2019 No. 191",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pondok Pesantren, Dayah, Surau, Meunasah, atau sebutan lain yang selanjutnya disebut Pesantren adalah lembaga yang berbasis masyarakat dan didirikan oleh perseorangan, yayasan, organisasi masyarakat Islam, dan/atau masyarakat yang menanamkan keimanan dan ketakwaan kepada Allah Swt., menyemaikan akhlak mulia serta memegang teguh ajaran Islam rahmatan lil'alamin yang tercermin dari sikap rendah hati, toleran, keseimbangan, moderat, dan nilai luhur bangsa Indonesia lainnya melalui pendidikan, dakwah Islam, keteladanan, dan pemberdayaan masyarakat dalam kerangka Negara Kesatuan Republik Indonesia."
          },
          {
            bab: "BAB II - ASAS, TUJUAN, DAN FUNGSI",
            pasal: "Pasal 3",
            bunyi: "Pesantren diselenggarakan dengan tujuan:\na. membentuk individu yang unggul di berbagai bidang yang memahami dan mengamalkan nilai ajaran agamanya dan/atau menjadi ahli ilmu agama yang beriman, bertakwa, berakhlak mulia, berilmu, mandiri, tolong-menolong, seimbang, dan moderat;\nb. membentuk pemahaman agama yang moderat dan cinta tanah air serta membentuk perilaku yang mendorong terciptanya kerukunan hidup beragama; dan\nc. meningkatkan kualitas hidup masyarakat yang berdaya dalam memenuhi kebutuhan pendidikan warga negara dan kesejahteraan sosial masyarakat."
          }
        ]
      },
      {
        id: 91,
        judul: "Undang-Undang tentang Sistem Budidaya Pertanian Berkelanjutan",
        nomor: "UU No. 22 Tahun 2019",
        tahun: "2019",
        kategori: "Pertanian",
        deskripsi: "Tentang Sistem Budidaya Pertanian Berkelanjutan",
        tanggalDitetapkan: "18-10-2019",
        tanggalDiundangkan: "18-10-2019",
        sumber: "Lembaran Negara Tahun 2019 No. 201",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Sistem Budidaya Pertanian Berkelanjutan adalah pengelolaan sumber daya alam hayati dalam memproduksi komoditas Pertanian guna memenuhi kebutuhan manusia secara lebih baik dengan tetap memelihara dan meningkatkan kualitas lingkungan hidup serta melestarikan sumber daya alam.\n2. Pertanian adalah kegiatan mengelola sumber daya alam hayati dengan bantuan teknologi, modal, tenaga kerja, dan manajemen untuk menghasilkan komoditas Pertanian yang mencakup tanaman pangan, tanaman hortikultura, tanaman perkebunan, dan/atau peternakan dalam suatu agroekosistem."
          },
          {
            bab: "BAB II - ASAS, TUJUAN, DAN RUANG LINGKUP",
            pasal: "Pasal 3",
            bunyi: "Penyelenggaraan Sistem Budidaya Pertanian Berkelanjutan bertujuan untuk:\na. meningkatkan dan memperluas penganekaragaman hasil Pertanian, guna memenuhi kebutuhan pangan, sandang, papan, kesehatan, industri dalam negeri, dan memperbesar ekspor;\nb. meningkatkan pendapatan dan taraf hidup Petani;\nc. mendorong perluasan dan pemerataan kesempatan kerja dan kesempatan berusaha;\nd. mengisi dan memperluas pasar, baik pasar dalam negeri maupun pasar luar negeri;\ne. meningkatkan produktivitas, efisiensi, mutu, dan daya saing produk Pertanian;\nf. meningkatkan kemampuan Petani dan Pelaku Usaha Pertanian dalam pemanfaatan teknologi yang lebih baik;\ng. meningkatkan pemanfaatan sumber daya Pertanian secara berkelanjutan; dan\nh. meningkatkan ketahanan pangan."
          }
        ]
      },
      {
        id: 92,
        judul: "Undang-Undang tentang Badan Penyelenggara Jaminan Produk Halal",
        nomor: "UU No. 33 Tahun 2014",
        tahun: "2014",
        kategori: "Agama",
        deskripsi: "Tentang Jaminan Produk Halal",
        tanggalDitetapkan: "17-10-2014",
        tanggalDiundangkan: "17-10-2014",
        sumber: "Lembaran Negara Tahun 2014 No. 295",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Produk adalah barang dan/atau jasa yang terkait dengan makanan, minuman, obat, kosmetik, produk kimiawi, produk biologi, produk rekayasa genetik, serta barang gunaan yang dipakai, digunakan, atau dimanfaatkan oleh masyarakat.\n2. Produk Halal adalah Produk yang telah dinyatakan halal sesuai dengan syariat Islam.\n3. Proses Produk Halal yang selanjutnya disingkat PPH adalah rangkaian kegiatan untuk menjamin kehalalan Produk mencakup penyediaan bahan, pengolahan, penyimpanan, pengemasan, pendistribusian, penjualan, dan penyajian Produk."
          },
          {
            bab: "BAB II - ASAS, TUJUAN, DAN RUANG LINGKUP",
            pasal: "Pasal 3",
            bunyi: "Penyelenggaraan JPH bertujuan:\na. memberikan kenyamanan, keamanan, keselamatan, dan kepastian ketersediaan Produk Halal bagi masyarakat dalam mengonsumsi dan menggunakan Produk; dan\nb. meningkatkan nilai tambah bagi Pelaku Usaha untuk memproduksi dan menjual Produk Halal."
          }
        ]
      },
      {
        id: 93,
        judul: "Undang-Undang tentang Penghapusan Kekerasan Seksual",
        nomor: "UU No. 12 Tahun 2022",
        tahun: "2022",
        kategori: "HAM",
        deskripsi: "Tentang Tindak Pidana Kekerasan Seksual",
        tanggalDitetapkan: "09-05-2022",
        tanggalDiundangkan: "09-05-2022",
        sumber: "Lembaran Negara Tahun 2022 No. 120",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Kekerasan Seksual adalah setiap perbuatan yang memenuhi unsur tindak pidana sebagaimana diatur dalam Undang-Undang ini dan perbuatan kekerasan seksual lainnya sebagaimana diatur dalam Undang-Undang sepanjang ditentukan dalam Undang-Undang ini.\n2. Tindak Pidana Kekerasan Seksual adalah segala perbuatan yang memenuhi unsur pidana yang diatur dalam Undang-Undang ini, termasuk perbuatan yang dilarang dan diancam dengan pidana."
          },
          {
            bab: "BAB II - JENIS TINDAK PIDANA KEKERASAN SEKSUAL",
            pasal: "Pasal 4",
            bunyi: "(1) Tindak pidana kekerasan seksual terdiri atas:\na. pelecehan seksual nonfisik;\nb. pelecehan seksual fisik;\nc. pemaksaan kontrasepsi;\nd. pemaksaan sterilisasi;\ne. pemaksaan perkawinan;\nf. penyiksaan seksual;\ng. eksploitasi seksual;\nh. perbudakan seksual; dan\ni. kekerasan seksual berbasis elektronik.\n(2) Selain tindak pidana kekerasan seksual sebagaimana dimaksud pada ayat (1), tindak pidana kekerasan seksual juga meliputi:\na. perkosaan;\nb. perbuatan cabul;\nc. persetubuhan terhadap anak, perbuatan cabul terhadap anak, dan/atau eksploitasi seksual terhadap anak;\nd. perbuatan melanggar kesusilaan yang bertentangan dengan kehendak korban;\ne. pornografi yang melibatkan anak atau pornografi yang secara eksplisit memuat kekerasan dan eksploitasi seksual;\nf. pemaksaan pelacuran;\ng. tindak pidana perdagangan orang yang ditujukan untuk eksploitasi seksual;\nh. kekerasan seksual dalam lingkup rumah tangga;\ni. tindak pidana pencucian uang yang tindak pidana asalnya merupakan tindak pidana kekerasan seksual; dan\nj. tindak pidana lain yang dinyatakan secara tegas sebagai tindak pidana kekerasan seksual sebagaimana diatur dalam undang-undang."
          }
        ]
      },
      {
        id: 94,
        judul: "Undang-Undang tentang Harmonisasi Peraturan Perpajakan",
        nomor: "UU No. 7 Tahun 2021",
        tahun: "2021",
        kategori: "Pajak",
        deskripsi: "Tentang Harmonisasi Peraturan Perpajakan",
        tanggalDitetapkan: "29-10-2021",
        tanggalDiundangkan: "29-10-2021",
        sumber: "Lembaran Negara Tahun 2021 No. 246",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Beberapa ketentuan dalam:\na. Undang-Undang Nomor 6 Tahun 1983 tentang Ketentuan Umum dan Tata Cara Perpajakan sebagaimana telah beberapa kali diubah terakhir dengan Undang-Undang Nomor 16 Tahun 2009 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 5 Tahun 2008 tentang Perubahan Keempat atas Undang-Undang Nomor 6 Tahun 1983 tentang Ketentuan Umum dan Tata Cara Perpajakan Menjadi Undang-Undang;\nb. Undang-Undang Nomor 7 Tahun 1983 tentang Pajak Penghasilan sebagaimana telah beberapa kali diubah terakhir dengan Undang-Undang Nomor 36 Tahun 2008 tentang Perubahan Keempat atas Undang-Undang Nomor 7 Tahun 1983 tentang Pajak Penghasilan;\nc. Undang-Undang Nomor 8 Tahun 1983 tentang Pajak Pertambahan Nilai Barang dan Jasa dan Pajak Penjualan atas Barang Mewah sebagaimana telah beberapa kali diubah terakhir dengan Undang-Undang Nomor 42 Tahun 2009 tentang Perubahan Ketiga atas Undang-Undang Nomor 8 Tahun 1983 tentang Pajak Pertambahan Nilai Barang dan Jasa dan Pajak Penjualan atas Barang Mewah; dan\nd. Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja,\ndiubah sebagaimana diatur dalam Undang-Undang ini."
          },
          {
            bab: "BAB II - PAJAK PERTAMBAHAN NILAI",
            pasal: "Pasal 7",
            bunyi: "Tarif Pajak Pertambahan Nilai adalah:\na. 11% (sebelas persen) yang mulai berlaku pada tanggal 1 April 2022; dan\nb. 12% (dua belas persen) yang mulai berlaku paling lambat pada tanggal 1 Januari 2025."
          }
        ]
      },
      {
        id: 95,
        judul: "Undang-Undang tentang Perlindungan Data Pribadi",
        nomor: "UU No. 27 Tahun 2022",
        tahun: "2022",
        kategori: "Teknologi",
        deskripsi: "Tentang Perlindungan Data Pribadi",
        tanggalDitetapkan: "17-10-2022",
        tanggalDiundangkan: "17-10-2022",
        sumber: "Lembaran Negara Tahun 2022 No. 196",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Data Pribadi adalah data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi secara tersendiri atau dikombinasi dengan informasi lainnya baik secara langsung maupun tidak langsung melalui sistem elektronik atau nonelektronik.\n2. Pemrosesan Data Pribadi adalah setiap dan/atau serangkaian kegiatan terhadap Data Pribadi, baik terdirisendiri maupun keseluruhan proses, yang meliputi:\na. perolehan dan pengumpulan;\nb. pengolahan dan penganalisisan;\nc. penyimpanan;\nd. perbaikan dan pembaruan;\ne. penampilan, pengumuman, transfer, penyebarluasan, atau pengungkapan; dan/atau\nf. penghapusan atau pemusnahan."
          },
          {
            bab: "BAB III - HAK SUBJEK DATA PRIBADI",
            pasal: "Pasal 5",
            bunyi: "Subjek Data Pribadi berhak:\na. mendapatkan informasi tentang kejelasan identitas, dasar kepentingan hukum, tujuan permintaan dan penggunaan Data Pribadi, dan akuntabilitas pihak yang meminta Data Pribadi;\nb. meminta akses untuk melihat, memeriksa, dan mendapatkan salinan Data Pribadi sesuai dengan ketentuan peraturan perundang-undangan;\nc. meminta perubahan, pembaruan, dan/atau perbaikan kesalahan dan/atau ketidakakuratan Data Pribadi sesuai dengan ketentuan peraturan perundang-undangan;\nd. meminta penghentian Pemrosesan Data Pribadi, penghapusan, dan/atau pemusnahan Data Pribadi sesuai dengan ketentuan peraturan perundang-undangan;\ne. meminta penundaan dan/atau pembatasan Pemrosesan Data Pribadi secara proporsional sesuai dengan tujuan Pemrosesan Data Pribadi;\nf. mengajukan keberatan atas tindakan pengambilan keputusan yang hanya didasarkan pada Pemrosesan secara otomatis, termasuk pemrofilan, yang menimbulkan akibat hukum atau berdampak signifikan pada Subjek Data Pribadi;\ng. meminta ganti rugi atas kerugian yang ditimbulkan akibat pelanggaran dalam Pemrosesan Data Pribadi; dan\nh. hak lainnya sesuai dengan ketentuan peraturan perundang-undangan."
          }
        ]
      },
      {
        id: 96,
        judul: "Undang-Undang tentang Pengembangan dan Penguatan Sektor Keuangan",
        nomor: "UU No. 4 Tahun 2023",
        tahun: "2023",
        kategori: "Ekonomi",
        deskripsi: "Tentang Pengembangan dan Penguatan Sektor Keuangan",
        tanggalDitetapkan: "12-01-2023",
        tanggalDiundangkan: "12-01-2023",
        sumber: "Lembaran Negara Tahun 2023 No. 4",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Sektor Keuangan adalah sektor dalam perekonomian yang meliputi semua lembaga, pasar, instrumen, dan infrastruktur yang menyediakan jasa keuangan.\n2. Lembaga Jasa Keuangan adalah lembaga yang melaksanakan kegiatan di sektor keuangan.\n3. Otoritas Jasa Keuangan yang selanjutnya disingkat OJK adalah lembaga yang independen dalam melaksanakan tugas dan wewenangnya, bebas dari campur tangan pihak lain sebagaimana dimaksud dalam Undang-Undang Nomor 21 Tahun 2011 tentang Otoritas Jasa Keuangan."
          },
          {
            bab: "BAB II - PENGEMBANGAN SEKTOR KEUANGAN",
            pasal: "Pasal 3",
            bunyi: "Pengembangan sektor keuangan bertujuan untuk:\na. meningkatkan stabilitas sistem keuangan;\nb. mendorong pertumbuhan ekonomi yang berkelanjutan;\nc. meningkatkan inklusi keuangan;\nd. meningkatkan perlindungan konsumen;\ne. meningkatkan daya saing sektor keuangan; dan\nf. mendukung pembiayaan pembangunan nasional."
          }
        ]
      },
      {
        id: 97,
        judul: "Undang-Undang tentang Kesehatan",
        nomor: "UU No. 17 Tahun 2023",
        tahun: "2023",
        kategori: "Kesehatan",
        deskripsi: "Tentang Kesehatan (Pengganti UU No. 36 Tahun 2009)",
        tanggalDitetapkan: "08-08-2023",
        tanggalDiundangkan: "08-08-2023",
        sumber: "Lembaran Negara Tahun 2023 No. 105",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Kesehatan adalah keadaan sehat, baik secara fisik, mental, spiritual maupun sosial yang memungkinkan setiap orang untuk hidup produktif secara sosial dan ekonomis.\n2. Upaya Kesehatan adalah setiap kegiatan dan/atau serangkaian kegiatan yang dilakukan secara terpadu, terintegrasi dan berkesinambungan untuk memelihara dan meningkatkan derajat kesehatan masyarakat dalam bentuk pencegahan penyakit, peningkatan kesehatan, pengobatan penyakit, dan pemulihan kesehatan oleh pemerintah dan/atau masyarakat.\n3. Transformasi Kesehatan adalah perubahan mendasar sistem kesehatan untuk mencapai derajat kesehatan masyarakat yang setinggi-tingginya."
          },
          {
            bab: "BAB III - HAK DAN KEWAJIBAN",
            pasal: "Pasal 7",
            bunyi: "(1) Setiap orang berhak:\na. memperoleh informasi dan edukasi tentang kesehatan yang seimbang dan bertanggung jawab;\nb. memperoleh pelayanan kesehatan yang aman, bermutu, dan terjangkau;\nc. memilih pelayanan kesehatan dan tenaga kesehatan sesuai dengan kebutuhannya;\nd. mendapatkan lingkungan yang sehat bagi pencapaian derajat kesehatan;\ne. mendapatkan informasi mengenai data kesehatan dirinya;\nf. menentukan sendiri pelayanan kesehatan yang diperlukan bagi dirinya;\ng. mendapatkan perlindungan dalam pelayanan kesehatan;\nh. menggugat dan/atau menuntut pihak yang menyelenggarakan pelayanan kesehatan yang menimbulkan kerugian;\ni. mendapatkan rehabilitasi medis; dan\nj. hak lain sesuai dengan ketentuan peraturan perundang-undangan."
          }
        ]
      },
      {
        id: 98,
        judul: "Undang-Undang tentang Ibu Kota Negara",
        nomor: "UU No. 3 Tahun 2022",
        tahun: "2022",
        kategori: "Tata Negara",
        deskripsi: "Tentang Ibu Kota Negara",
        tanggalDitetapkan: "15-02-2022",
        tanggalDiundangkan: "15-02-2022",
        sumber: "Lembaran Negara Tahun 2022 No. 41",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Ibu Kota Negara adalah Ibu Kota Negara Kesatuan Republik Indonesia.\n2. Ibu Kota Nusantara yang selanjutnya disebut IKN adalah satuan pemerintahan daerah yang bersifat khusus setingkat provinsi yang wilayahnya menjadi tempat kedudukan Ibu Kota Negara sebagaimana ditetapkan dan diatur dengan Undang-Undang ini.\n3. Otorita Ibu Kota Nusantara yang selanjutnya disebut Otorita IKN adalah lembaga setingkat kementerian yang menyelenggarakan Pemerintahan Daerah Khusus IKN."
          },
          {
            bab: "BAB II - PEMINDAHAN DAN PENETAPAN IBU KOTA NEGARA",
            pasal: "Pasal 3",
            bunyi: "(1) Ibu Kota Negara dipindahkan dari Daerah Khusus Ibukota Jakarta ke IKN yang berada di sebagian wilayah Kabupaten Penajam Paser Utara dan sebagian wilayah Kabupaten Kutai Kartanegara, Provinsi Kalimantan Timur.\n(2) IKN sebagaimana dimaksud pada ayat (1) ditetapkan dengan nama Nusantara dan berstatus sebagai daerah khusus setingkat provinsi."
          }
        ]
      },
      {
        id: 99,
        judul: "Undang-Undang tentang Cipta Kerja",
        nomor: "UU No. 6 Tahun 2023",
        tahun: "2023",
        kategori: "Ekonomi",
        deskripsi: "Tentang Penetapan Perpu No. 2 Tahun 2022 tentang Cipta Kerja Menjadi UU",
        tanggalDitetapkan: "31-03-2023",
        tanggalDiundangkan: "31-03-2023",
        sumber: "Lembaran Negara Tahun 2023 No. 41",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Beberapa ketentuan dalam:\na. Undang-Undang Nomor 5 Tahun 1960 tentang Peraturan Dasar Pokok-Pokok Agraria;\nb. Undang-Undang Nomor 11 Tahun 1967 tentang Ketentuan-Ketentuan Pokok Pertambangan;\nc. Undang-Undang Nomor 5 Tahun 1984 tentang Perindustrian;\nd. Undang-Undang Nomor 5 Tahun 1990 tentang Konservasi Sumber Daya Alam Hayati dan Ekosistemnya;\ne. Undang-Undang Nomor 4 Tahun 1992 tentang Perumahan dan Permukiman;\nf. Undang-Undang Nomor 7 Tahun 1992 tentang Perbankan sebagaimana telah diubah dengan Undang-Undang Nomor 10 Tahun 1998;\ng. Undang-Undang Nomor 12 Tahun 1992 tentang Sistem Budidaya Tanaman;\nh. Undang-Undang Nomor 5 Tahun 1994 tentang Pengesahan United Nations Convention on Biological Diversity (Konvensi Perserikatan Bangsa-Bangsa mengenai Keanekaragaman Hayati);\ni. Undang-Undang Nomor 12 Tahun 1994 tentang Perubahan atas Undang-Undang Nomor 12 Tahun 1985 tentang Pajak Bumi dan Bangunan;\nj. Undang-Undang Nomor 41 Tahun 1999 tentang Kehutanan sebagaimana telah diubah dengan Undang-Undang Nomor 19 Tahun 2004;\ndan undang-undang lainnya, diubah sebagaimana diatur dalam Undang-Undang ini."
          },
          {
            bab: "BAB III - PENINGKATAN EKOSISTEM INVESTASI DAN KEGIATAN BERUSAHA",
            pasal: "Pasal 5",
            bunyi: "Dalam rangka peningkatan ekosistem investasi dan kegiatan berusaha sebagaimana dimaksud dalam Pasal 3 ayat (1) huruf a, Undang-Undang ini mengatur mengenai:\na. penerapan Perizinan Berusaha berbasis risiko;\nb. penyederhanaan persyaratan dasar Perizinan Berusaha, pengadaan lahan, dan pemanfaatan lahan;\nc. penyederhanaan Perizinan Berusaha sektor;\nd. penyederhanaan persyaratan investasi;\ne. kemudahan persyaratan Perizinan Berusaha, kemudahan persyaratan investasi, dan kemudahan penyelenggaraan proyek Pemerintah untuk Unit Usaha Mikro dan Kecil (UMK);\nf. penelitian dan pengembangan untuk mendukung inovasi; dan\ng. pengadministrasian sanksi."
          }
        ]
      },
      {
        id: 100,
        judul: "Undang-Undang tentang Kota Nusantara sebagai Ibu Kota Negara",
        nomor: "UU No. 21 Tahun 2023",
        tahun: "2023",
        kategori: "Tata Negara",
        deskripsi: "Tentang Pembentukan Daerah Otonom Baru Kota Nusantara di Provinsi Kalimantan Timur",
        tanggalDitetapkan: "06-10-2023",
        tanggalDiundangkan: "06-10-2023",
        sumber: "Lembaran Negara Tahun 2023 No. 178",
        status: "Berlaku",
        isiPasal: [
          {
            bab: "BAB I - KETENTUAN UMUM",
            pasal: "Pasal 1",
            bunyi: "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Kota Nusantara adalah daerah otonom baru yang dibentuk untuk menjalankan fungsi sebagai Ibu Kota Negara Kesatuan Republik Indonesia.\n2. Pemerintah Daerah Kota Nusantara adalah Walikota sebagai unsur penyelenggara pemerintahan daerah yang memimpin pelaksanaan urusan pemerintahan yang menjadi kewenangan daerah otonom.\n3. Otorita Ibu Kota Nusantara yang selanjutnya disebut Otorita IKN adalah lembaga setingkat kementerian yang melaksanakan persiapan, pembangunan, dan pemindahan Ibu Kota Negara, serta penyelenggaraan Pemerintahan Daerah Khusus Ibu Kota Nusantara."
          },
          {
            bab: "BAB II - PEMBENTUKAN",
            pasal: "Pasal 2",
            bunyi: "(1) Dengan Undang-Undang ini dibentuk Kota Nusantara di Provinsi Kalimantan Timur.\n(2) Kota Nusantara sebagaimana dimaksud pada ayat (1) berasal dari sebagian wilayah Kabupaten Penajam Paser Utara yang terdiri atas:\na. Kecamatan Sepaku; dan\nb. sebagian Kecamatan Semboja.\n(3) Kota Nusantara sebagaimana dimaksud pada ayat (1) dan ayat (2) masuk dalam wilayah Provinsi Kalimantan Timur."
          }
        ]
      }
    ];

       
  