import { Metadata } from 'next'
import { 
  Megaphone, FileText, Mail, AlertTriangle, CheckCircle, Clock, 
  Scale, Send, Shield, Calendar, AlertCircle, Download, Copy, 
  ChevronRight, Info, DollarSign, Briefcase, Users, ArrowRight,
  Package, Truck, MessageSquare, FileCheck
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Membuat Somasi yang Benar - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Panduan lengkap cara membuat surat somasi yang sah: struktur, template, contoh kasus, biaya, dan strategi pengiriman efektif.',
  keywords: ['somasi', 'surat teguran', 'peringatan hukum', 'wanprestasi', 'hutang piutang', 'template somasi'],
}

// Data jenis-jenis somasi
const somasiTypes = [
  {
    id: 'wanprestasi',
    name: 'Somasi Wanprestasi',
    icon: FileText,
    color: 'blue',
    description: 'Untuk pihak yang ingkar janji/kontrak',
    cases: [
      'Hutang yang tidak dibayar',
      'Kontrak yang tidak dipenuhi',
      'Pembayaran yang tertunda',
      'Penyerahan barang yang terlambat',
    ],
    urgency: 'high',
  },
  {
    id: 'perbuatan-melawan-hukum',
    name: 'Somasi Perbuatan Melawan Hukum',
    icon: Scale,
    color: 'red',
    description: 'Untuk tindakan yang merugikan pihak lain',
    cases: [
      'Pencemaran nama baik',
      'Pelanggaran hak cipta',
      'Gangguan kepemilikan',
      'Kerugian akibat kelalaian',
    ],
    urgency: 'high',
  },
  {
    id: 'ketenagakerjaan',
    name: 'Somasi Ketenagakerjaan',
    icon: Briefcase,
    color: 'green',
    description: 'Terkait hubungan kerja',
    cases: [
      'Gaji tidak dibayar',
      'PHK sepihak',
      'Hak cuti tidak diberikan',
      'Pesangon tidak dibayar',
    ],
    urgency: 'medium',
  },
  {
    id: 'properti',
    name: 'Somasi Properti',
    icon: Package,
    color: 'purple',
    description: 'Sengketa tanah dan bangunan',
    cases: [
      'Sewa yang menunggak',
      'Penggusuran ilegal',
      'Sengketa batas tanah',
      'Jual beli bermasalah',
    ],
    urgency: 'medium',
  },
]

// Struktur somasi yang benar
const somasiStructure = [
  {
    section: 'Kop Surat',
    content: 'Nama lengkap/kantor hukum, alamat, nomor telepon, email',
    required: true,
    example: 'KANTOR HUKUM ADIL & PARTNERS\nJl. Sudirman No. 123, Jakarta\nTelp: (021) 1234567',
  },
  {
    section: 'Nomor & Tanggal',
    content: 'Nomor surat dan tanggal pembuatan',
    required: true,
    example: 'Nomor: 001/SOM/XII/2024\nJakarta, 15 Desember 2024',
  },
  {
    section: 'Perihal',
    content: 'Judul singkat somasi',
    required: true,
    example: 'Perihal: SOMASI PERTAMA - Pembayaran Hutang',
  },
  {
    section: 'Identitas Penerima',
    content: 'Nama lengkap dan alamat penerima somasi',
    required: true,
    example: 'Kepada Yth.\nBapak/Ibu [Nama Lengkap]\nAlamat: [Alamat Lengkap]',
  },
  {
    section: 'Pembuka',
    content: 'Salam pembuka dan identifikasi pengirim',
    required: true,
    example: 'Dengan hormat,\nYang bertanda tangan di bawah ini, kami bertindak untuk dan atas nama klien kami...',
  },
  {
    section: 'Uraian Fakta',
    content: 'Kronologi peristiwa secara rinci dan sistematis',
    required: true,
    example: 'Bahwa pada tanggal... telah terjadi perjanjian... dengan ketentuan...',
  },
  {
    section: 'Dasar Hukum',
    content: 'Pasal-pasal yang dilanggar',
    required: true,
    example: 'Bahwa perbuatan tersebut melanggar Pasal 1234 KUH Perdata tentang...',
  },
  {
    section: 'Tuntutan',
    content: 'Hal yang diminta untuk dipenuhi',
    required: true,
    example: 'Membayar hutang pokok sebesar Rp... ditambah bunga...',
  },
  {
    section: 'Batas Waktu',
    content: 'Tenggat waktu pemenuhan (minimal 7 hari)',
    required: true,
    example: 'Dalam waktu 7 (tujuh) hari sejak surat ini diterima',
  },
  {
    section: 'Ancaman Hukum',
    content: 'Konsekuensi jika tidak dipenuhi',
    required: true,
    example: 'Apabila tidak dipenuhi, kami akan mengajukan gugatan perdata/pidana',
  },
  {
    section: 'Penutup & TTD',
    content: 'Penutup formal dan tanda tangan',
    required: true,
    example: 'Demikian somasi ini kami sampaikan.\nHormat kami,\n[Tanda Tangan]\n[Nama Terang]',
  },
]

// Metode pengiriman somasi
const deliveryMethods = [
  {
    method: 'Kurir/Ekspedisi',
    icon: Truck,
    cost: 'Rp 50.000 - 150.000',
    proof: 'Resi & tanda terima',
    legal: 'Sangat kuat',
    days: '1-3 hari',
  },
  {
    method: 'Pos Tercatat',
    icon: Mail,
    cost: 'Rp 20.000 - 50.000',
    proof: 'Resi pos',
    legal: 'Kuat',
    days: '3-7 hari',
  },
  {
    method: 'Email Resmi',
    icon: MessageSquare,
    cost: 'Gratis',
    proof: 'Read receipt',
    legal: 'Cukup kuat',
    days: 'Instant',
  },
  {
    method: 'Bailiff/Juru Sita',
    icon: Shield,
    cost: 'Rp 500.000 - 1.500.000',
    proof: 'Berita acara',
    legal: 'Sangat kuat',
    days: '3-7 hari',
  },
]

// Template somasi
const templateExamples = {
  hutang: `SOMASI

Nomor: 001/SOM/XII/2024
Jakarta, 15 Desember 2024

Perihal: SOMASI PERTAMA - Pembayaran Hutang

Kepada Yth.
Sdr. [NAMA DEBITUR]
[ALAMAT LENGKAP]

Dengan hormat,

Sehubungan dengan hutang Saudara kepada klien kami [NAMA KREDITUR] sebesar Rp [JUMLAH] berdasarkan [DASAR HUTANG] tertanggal [TANGGAL], yang telah jatuh tempo pada tanggal [TANGGAL JATUH TEMPO].

Bahwa sampai dengan surat ini dibuat, Saudara belum melakukan pembayaran sebagaimana mestinya, padahal telah berulang kali ditagih secara baik-baik.

Maka dengan ini kami TEGUR dan PERINGATKAN kepada Saudara untuk:

1. Membayar hutang pokok sebesar Rp [JUMLAH]
2. Membayar bunga keterlambatan sebesar [X]% per bulan
3. Menyelesaikan seluruh kewajiban dalam waktu 7 (tujuh) hari kerja sejak surat ini diterima

Apabila Saudara tidak memenuhi somasi ini, maka kami akan mengajukan gugatan perdata ke Pengadilan Negeri dengan segala konsekuensi hukumnya.

Demikian somasi ini kami sampaikan untuk dipatuhi.

Hormat kami,

[NAMA PENGIRIM]
[JABATAN]`,
  
  wanprestasi: `SOMASI WANPRESTASI

[Format serupa dengan template hutang, disesuaikan dengan kasus wanprestasi]`,
}

export default function SomasiPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-5 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
              <Megaphone className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
            Panduan Membuat Somasi yang Benar
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto text-center">
            Template lengkap, struktur baku, contoh kasus, dan strategi pengiriman 
            agar somasi Anda efektif secara hukum
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-violet-100">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-violet-600" />
              <h3 className="font-bold text-gray-900">Batas Waktu</h3>
            </div>
            <p className="text-2xl font-bold text-violet-600">7-14</p>
            <p className="text-xs text-gray-500">Hari minimal</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <Send className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Pengiriman</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-xs text-gray-500">Metode sah</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-gray-900">Biaya</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">20rb+</p>
            <p className="text-xs text-gray-500">Pengiriman</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="h-5 w-5 text-red-600" />
              <h3 className="font-bold text-gray-900">Kekuatan</h3>
            </div>
            <p className="text-2xl font-bold text-red-600">Bukti</p>
            <p className="text-xs text-gray-500">Di pengadilan</p>
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Penting untuk Diketahui!</h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Somasi BUKAN putusan pengadilan, hanya peringatan/teguran</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Dapat dibuat sendiri atau melalui kuasa hukum (lebih kuat)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Umumnya dikirim 1-3 kali sebelum gugatan ke pengadilan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jenis-jenis Somasi */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jenis-Jenis Somasi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {somasiTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-violet-300 transition-all">
                <div className={`bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    <type.icon className="h-8 w-8" />
                    <h3 className="text-xl font-bold">{type.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{type.description}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Kasus yang Umum:</h4>
                  <ul className="space-y-2">
                    {type.cases.map((kasus, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{kasus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Struktur Somasi */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Struktur Surat Somasi yang Benar
          </h2>
          
          <div className="space-y-4">
            {somasiStructure.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.section}</h3>
                      {item.required && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                          Wajib
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{item.content}</p>
                    <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600">
                      {item.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Somasi */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileCheck className="h-8 w-8 text-purple-600" />
            Contoh Template Somasi
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Template Somasi Hutang Piutang:</h3>
            <div className="bg-white rounded-xl p-6 font-mono text-sm text-gray-700 whitespace-pre-wrap border border-purple-200 max-h-96 overflow-y-auto">
              {templateExamples.hutang}
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all">
              <Copy className="h-5 w-5" />
              Salin Template
            </button>
            <button 
              onClick={() => {
                // Simulate download
                const link = document.createElement('a')
                link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Template Somasi\n\nSURAT SOMASI\n\nNomor: _________________\nLampiran: -\nPerihal: Somasi\n\nKepada Yth.\n[NAMA PENERIMA]\n[ALAMAT PENERIMA]\n\nDengan hormat,\n\nYang bertanda tangan di bawah ini:\nNama: _________________\nAlamat: _________________\nNo. KTP: _________________\nNo. HP: _________________\n\nDengan ini menyampaikan somasi kepada Saudara/i:\n\nFAKTA:\n1. _________________\n2. _________________\n3. _________________\n\nDASAR HUKUM:\n_________________\n\nTUNTUTAN:\n1. _________________\n2. _________________\n3. _________________\n\nBATAS WAKTU:\n_________________\n\nDemikian somasi ini disampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.\n\n[Kota], [Tanggal]\n\nYang Menyampaikan,\n\n\n\n\n[NAMA LENGKAP]\n\nUntuk template lengkap, silakan hubungi kami atau gunakan layanan konsultasi hukum.`)}`
                link.download = 'template-somasi.txt'
                link.click()
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-600 hover:bg-purple-50 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Semua Template
            </button>
          </div>
        </div>

        {/* Metode Pengiriman */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Metode Pengiriman Somasi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {deliveryMethods.map((method, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{method.method}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Biaya:</span>
                        <span className="font-semibold text-gray-800">{method.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bukti:</span>
                        <span className="font-semibold text-gray-800">{method.proof}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kekuatan hukum:</span>
                        <span className="font-semibold text-green-600">{method.legal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Waktu:</span>
                        <span className="font-semibold text-blue-600">{method.days}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips dan Kesalahan Umum */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 mb-12 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Info className="h-8 w-8" />
            Tips & Kesalahan yang Harus Dihindari
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">✅ Yang Harus Dilakukan:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Gunakan bahasa formal dan sopan</li>
                <li>• Cantumkan fakta yang jelas dan kronologis</li>
                <li>• Berikan batas waktu yang wajar (min. 7 hari)</li>
                <li>• Simpan bukti pengiriman dan penerimaan</li>
                <li>• Kirim melalui alamat yang pasti diterima</li>
                <li>• Lampirkan bukti pendukung (copy kontrak, dll)</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">❌ Yang Harus Dihindari:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Menggunakan kata-kata kasar/ancaman fisik</li>
                <li>• Memberikan batas waktu terlalu singkat</li>
                <li>• Mengirim tanpa bukti pengiriman</li>
                <li>• Mencantumkan tuntutan yang berlebihan</li>
                <li>• Mengabaikan prosedur hukum yang berlaku</li>
                <li>• Memalsukan fakta atau dokumen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tahapan Setelah Somasi */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tahapan Setelah Mengirim Somasi</h2>
          <div className="space-y-4">
            {[
              {
                step: 'Menunggu Respon',
                duration: '7-14 hari',
                desc: 'Tunggu respon dari pihak yang disomasi sesuai batas waktu yang diberikan',
                action: 'Dokumentasikan jika ada komunikasi',
              },
              {
                step: 'Somasi Kedua (Opsional)',
                duration: '7 hari',
                desc: 'Jika tidak ada respon, kirim somasi kedua dengan nada lebih tegas',
                action: 'Perkuat dengan bukti tambahan',
              },
              {
                step: 'Mediasi',
                duration: '30 hari',
                desc: 'Upayakan mediasi jika pihak lawan merespon untuk negosiasi',
                action: 'Siapkan opsi win-win solution',
              },
              {
                step: 'Gugatan Pengadilan',
                duration: '3-6 bulan',
                desc: 'Ajukan gugatan perdata/pidana jika somasi tidak diindahkan',
                action: 'Konsultasi dengan pengacara',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-violet-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{item.step}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{item.desc}</p>
                    <div className="bg-violet-50 rounded-lg p-3">
                      <p className="text-sm text-violet-800">
                        <strong>Action:</strong> {item.action}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Apakah somasi harus dibuat oleh pengacara?',
                a: 'Tidak harus. Anda bisa membuat sendiri, namun somasi dari pengacara/advokat memiliki efek psikologis yang lebih kuat.',
              },
              {
                q: 'Berapa kali somasi harus dikirim sebelum gugatan?',
                a: 'Minimal 1 kali sudah cukup secara hukum. Umumnya 1-3 kali dengan interval 7-14 hari.',
              },
              {
                q: 'Apakah somasi bisa dikirim via WhatsApp?',
                a: 'Bisa, namun kekuatan hukumnya lemah. Sebaiknya tetap kirim via pos/kurir dengan bukti terima.',
              },
              {
                q: 'Bagaimana jika alamat penerima tidak diketahui?',
                a: 'Bisa melalui iklan di koran atau papan pengumuman pengadilan, namun prosesnya lebih kompleks.',
              },
              {
                q: 'Berapa biaya membuat somasi di kantor hukum?',
                a: 'Bervariasi, umumnya Rp 500.000 - 5.000.000 tergantung kompleksitas kasus dan reputasi kantor hukum.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Biaya Somasi */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            Estimasi Biaya Pembuatan Somasi
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Buat Sendiri:</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Materai</span>
                  <span className="font-semibold">Rp 10.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Print & Fotokopi</span>
                  <span className="font-semibold">Rp 10.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Pengiriman</span>
                  <span className="font-semibold">Rp 20.000 - 150.000</span>
                </li>
                <li className="flex justify-between items-center py-2 font-bold text-green-700">
                  <span>Total</span>
                  <span>Rp 40.000 - 170.000</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Melalui Pengacara:</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Jasa pembuatan</span>
                  <span className="font-semibold">Rp 500.000 - 3.000.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Materai & admin</span>
                  <span className="font-semibold">Rp 50.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Pengiriman resmi</span>
                  <span className="font-semibold">Rp 150.000 - 500.000</span>
                </li>
                <li className="flex justify-between items-center py-2 font-bold text-green-700">
                  <span>Total</span>
                  <span>Rp 700.000 - 3.550.000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Template Somasi Lengkap?</h3>
          <p className="text-gray-700 mb-6">
            Download 10+ template somasi untuk berbagai kasus: hutang, wanprestasi, ketenagakerjaan, dll
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/template/somasi-lengkap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Template Gratis
            </Link>
            <a 
              href="https://peradi.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 font-semibold rounded-2xl border-2 border-violet-600 hover:bg-violet-50 transition-all"
            >
              <Users className="h-5 w-5" />
              Konsultasi dengan PERADI
            </a>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-12 bg-gray-100 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Checklist Sebelum Mengirim Somasi</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Identitas lengkap dan benar',
              'Fakta disusun kronologis',
              'Dasar hukum dicantumkan',
              'Tuntutan jelas dan wajar',
              'Batas waktu minimal 7 hari',
              'Bukti pendukung dilampirkan',
              'Alamat penerima valid',
              'Metode pengiriman dipilih',
              'Copy untuk arsip disiapkan',
              'Materai ditempel (jika perlu)',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-3">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
