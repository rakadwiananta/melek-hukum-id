import { Metadata } from 'next'
import { 
  FileSignature, FileText, User, CheckCircle, Scale, Shield, 
  AlertTriangle, Download, Copy, Calendar, DollarSign, Briefcase, 
  Users, ChevronRight, Info, AlertCircle, Clock, Award, MapPin
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Membuat Surat Kuasa - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Panduan lengkap membuat surat kuasa yang sah: jenis-jenis, syarat, struktur, template, biaya notaris, dan contoh untuk berbagai keperluan.',
  keywords: ['surat kuasa', 'kuasa umum', 'kuasa khusus', 'notaris', 'legalisasi', 'template surat kuasa'],
}

// Jenis-jenis surat kuasa
const suratKuasaTypes = [
  {
    id: 'umum',
    name: 'Surat Kuasa Umum',
    icon: FileText,
    color: 'blue',
    description: 'Memberikan wewenang luas untuk berbagai urusan',
    uses: [
      'Mewakili dalam berbagai transaksi',
      'Mengurus administrasi umum',
      'Bertindak atas nama pemberi kuasa',
    ],
    validity: 'Berlaku sampai dicabut',
    needNotary: false,
    cost: 'Rp 50.000 - 100.000',
  },
  {
    id: 'khusus',
    name: 'Surat Kuasa Khusus',
    icon: Shield,
    color: 'green',
    description: 'Wewenang terbatas untuk urusan tertentu',
    uses: [
      'Jual beli properti/kendaraan',
      'Pengambilan dokumen spesifik',
      'Pengurusan satu jenis administrasi',
    ],
    validity: 'Sesuai tujuan tercapai',
    needNotary: true,
    cost: 'Rp 100.000 - 500.000',
  },
  {
    id: 'litigasi',
    name: 'Surat Kuasa Litigasi',
    icon: Scale,
    color: 'red',
    description: 'Untuk beracara di pengadilan',
    uses: [
      'Mewakili di persidangan',
      'Mengajukan gugatan/permohonan',
      'Menerima putusan pengadilan',
    ],
    validity: 'Sampai perkara selesai',
    needNotary: false,
    cost: 'Gratis (materai saja)',
  },
  {
    id: 'notariil',
    name: 'Surat Kuasa Notariil',
    icon: Award,
    color: 'purple',
    description: 'Dibuat di hadapan notaris dengan akta autentik',
    uses: [
      'Transaksi properti bernilai tinggi',
      'Pendirian/perubahan PT',
      'Urusan luar negeri',
    ],
    validity: 'Sesuai akta',
    needNotary: true,
    cost: 'Rp 500.000 - 5.000.000',
  },
]

// Syarat pembuatan surat kuasa
const requirements = {
  pemberi: [
    'KTP asli dan fotokopi',
    'Cakap hukum (dewasa dan sehat mental)',
    'Berhak atas objek yang dikuasakan',
    'Tidak dalam tekanan/paksaan',
  ],
  penerima: [
    'KTP asli dan fotokopi',
    'Cakap hukum',
    'Tidak ada konflik kepentingan',
    'Bersedia menerima kuasa',
  ],
  dokumen: [
    'Draft surat kuasa',
    'Dokumen pendukung terkait objek kuasa',
    'Materai Rp 10.000',
    'Saksi (jika diperlukan)',
  ],
}

// Template surat kuasa
const templates = {
  umum: `SURAT KUASA

Yang bertanda tangan di bawah ini:
Nama            : [NAMA PEMBERI KUASA]
NIK             : [NIK]
Tempat/Tgl Lahir: [TEMPAT], [TANGGAL LAHIR]
Alamat          : [ALAMAT LENGKAP]
Selanjutnya disebut sebagai PEMBERI KUASA

Dengan ini memberikan kuasa kepada:
Nama            : [NAMA PENERIMA KUASA]
NIK             : [NIK]
Tempat/Tgl Lahir: [TEMPAT], [TANGGAL LAHIR]
Alamat          : [ALAMAT LENGKAP]
Selanjutnya disebut sebagai PENERIMA KUASA

----------------------- UNTUK -----------------------

[Uraikan dengan jelas dan spesifik hal-hal yang dikuasakan, misalnya:
1. Mengambil dokumen...
2. Menandatangani...
3. Mewakili dalam urusan...
dst.]

Surat kuasa ini berlaku sejak tanggal ditandatangani sampai dengan [TANGGAL/SELESAINYA URUSAN].

Demikian surat kuasa ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.

[KOTA], [TANGGAL]

Pemberi Kuasa,               Penerima Kuasa,
[Materai 10.000]

(________________)          (________________)
[NAMA TERANG]               [NAMA TERANG]

Saksi-saksi:
1. (________________)       2. (________________)`,

  khusus: `SURAT KUASA KHUSUS
[Format serupa dengan detail yang lebih spesifik pada bagian UNTUK]`,
}

export default function SuratKuasaPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-5 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
              <FileSignature className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
            Panduan Membuat Surat Kuasa
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto text-center">
            Lengkap dengan jenis-jenis, syarat sah, template siap pakai, 
            dan tips agar surat kuasa Anda kuat secara hukum
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <h3 className="font-bold text-gray-900">Jenis</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">4</p>
            <p className="text-xs text-gray-500">Tipe surat kuasa</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-100">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-amber-600" />
              <h3 className="font-bold text-gray-900">Biaya</h3>
            </div>
            <p className="text-2xl font-bold text-amber-600">10rb+</p>
            <p className="text-xs text-gray-500">Mulai dari materai</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Proses</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">15</p>
            <p className="text-xs text-gray-500">Menit (sederhana)</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-gray-900">Legal</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">100%</p>
            <p className="text-xs text-gray-500">Sah & mengikat</p>
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
                  <span>Surat kuasa TIDAK boleh untuk melakukan perbuatan melawan hukum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Pemberi kuasa dapat mencabut kuasa kapan saja sebelum tujuan tercapai</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Untuk transaksi properti, WAJIB menggunakan kuasa notariil</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jenis-jenis Surat Kuasa */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jenis-Jenis Surat Kuasa</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {suratKuasaTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-orange-300 transition-all">
                <div className={`bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <type.icon className="h-8 w-8" />
                      <h3 className="text-xl font-bold">{type.name}</h3>
                    </div>
                    {type.needNotary && (
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                        Perlu Notaris
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-90">{type.description}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Digunakan untuk:</h4>
                    <ul className="space-y-1">
                      {type.uses.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Masa berlaku:</p>
                      <p className="text-sm font-semibold text-gray-800">{type.validity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estimasi biaya:</p>
                      <p className="text-sm font-semibold text-green-600">{type.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Syarat Pembuatan */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            Syarat Pembuatan Surat Kuasa
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Pemberi Kuasa
              </h3>
              <ul className="space-y-2">
                {requirements.pemberi.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Penerima Kuasa
              </h3>
              <ul className="space-y-2">
                {requirements.penerima.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Dokumen
              </h3>
              <ul className="space-y-2">
                {requirements.dokumen.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Struktur Surat Kuasa */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Struktur Surat Kuasa yang Benar</h2>
          <div className="space-y-4">
            {[
              {
                section: 'Judul',
                content: 'SURAT KUASA atau SURAT KUASA KHUSUS',
                tips: 'Tulis dengan huruf kapital di tengah',
              },
              {
                section: 'Identitas Pemberi Kuasa',
                content: 'Nama lengkap, NIK, tempat tanggal lahir, alamat',
                tips: 'Harus sesuai KTP',
              },
              {
                section: 'Identitas Penerima Kuasa',
                content: 'Nama lengkap, NIK, tempat tanggal lahir, alamat',
                tips: 'Data harus lengkap dan valid',
              },
              {
                section: 'Isi Kuasa',
                content: 'Uraian detail hal-hal yang dikuasakan',
                tips: 'Spesifik, jelas, tidak multitafsir',
              },
              {
                section: 'Batas Waktu',
                content: 'Tanggal mulai dan berakhir atau sampai selesai',
                tips: 'Cantumkan untuk menghindari penyalahgunaan',
              },
              {
                section: 'Tanggal & Tempat',
                content: 'Kota dan tanggal pembuatan surat',
                tips: 'Harus jelas kapan dibuat',
              },
              {
                section: 'Tanda Tangan',
                content: 'TTD pemberi & penerima kuasa di atas materai',
                tips: 'Materai Rp 10.000 wajib ada',
              },
              {
                section: 'Saksi',
                content: 'Minimal 2 orang saksi (opsional tapi disarankan)',
                tips: 'Perkuat keabsahan surat',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.section}</h3>
                    <p className="text-gray-700 mb-2">{item.content}</p>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <p className="text-xs text-amber-800">
                        <strong>Tips:</strong> {item.tips}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Section */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border-2 border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-orange-600" />
            Template Surat Kuasa Umum
          </h2>
          
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-6">
            <div className="bg-white rounded-xl p-6 font-mono text-sm text-gray-700 whitespace-pre-wrap border border-orange-200 max-h-96 overflow-y-auto">
              {templates.umum}
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all">
              <Copy className="h-5 w-5" />
              Salin Template
            </button>
            <Link 
              href="/template/surat-kuasa-lengkap"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl border-2 border-orange-600 hover:bg-orange-50 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Word/PDF
            </Link>
          </div>
        </div>

        {/* Biaya Pembuatan */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            Estimasi Biaya Pembuatan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Buat Sendiri</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Materai</span>
                  <span className="font-semibold">Rp 10.000</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Print</span>
                  <span className="font-semibold">Rp 5.000</span>
                </li>
                <li className="flex justify-between text-sm pt-2 border-t font-bold text-green-700">
                  <span>Total</span>
                  <span>Rp 15.000</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Legalisasi Notaris</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Jasa legalisasi</span>
                  <span className="font-semibold">Rp 100-250rb</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Materai</span>
                  <span className="font-semibold">Rp 10.000</span>
                </li>
                <li className="flex justify-between text-sm pt-2 border-t font-bold text-green-700">
                  <span>Total</span>
                  <span>Rp 110-260rb</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Akta Notariil</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Jasa notaris</span>
                  <span className="font-semibold">Rp 500rb-5jt</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Materai & admin</span>
                  <span className="font-semibold">Rp 50.000</span>
                </li>
                <li className="flex justify-between text-sm pt-2 border-t font-bold text-green-700">
                  <span>Total</span>
                  <span>Rp 550rb-5jt+</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Apakah surat kuasa harus dilegalisir notaris?',
                a: 'Tidak selalu. Untuk urusan sederhana cukup dengan materai. Namun untuk transaksi properti, pendirian PT, atau urusan luar negeri wajib notariil.',
              },
              {
                q: 'Berapa lama surat kuasa berlaku?',
                a: 'Tergantung jenis dan isi surat. Kuasa umum berlaku sampai dicabut. Kuasa khusus berlaku sampai tujuan tercapai atau batas waktu yang ditentukan.',
              },
              {
                q: 'Bisakah surat kuasa dibatalkan?',
                a: 'Bisa. Pemberi kuasa dapat mencabut kuasa kapan saja dengan membuat surat pencabutan kuasa.',
              },
              {
                q: 'Apakah penerima kuasa bisa memberikan kuasa lagi ke orang lain?',
                a: 'Hanya jika disebutkan secara tegas dalam surat kuasa bahwa penerima kuasa diberi hak substitusi.',
              },
              {
                q: 'Apa bedanya legalisasi dan waarmerking?',
                a: 'Legalisasi: pihak menandatangani di hadapan notaris. Waarmerking: dokumen sudah ditandatangani, notaris hanya mengesahkan tanda tangan.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 mb-12 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Info className="h-8 w-8" />
            Tips Membuat Surat Kuasa yang Kuat
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">✅ Best Practices:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Tulis dengan jelas dan spesifik</li>
                <li>• Cantumkan batas waktu berlaku</li>
                <li>• Gunakan 2 saksi untuk memperkuat</li>
                <li>• Simpan copy untuk arsip</li>
                <li>• Pertimbangkan notaris untuk urusan penting</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">⚠️ Hindari:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Memberikan kuasa terlalu luas</li>
                <li>• Tidak mencantumkan batas waktu</li>
                <li>• Menggunakan bahasa ambigu</li>
                <li>• Lupa materai atau tanda tangan</li>
                <li>• Memberikan kuasa untuk tindakan ilegal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Template Lebih Lengkap?</h3>
          <p className="text-gray-700 mb-6">
            Download 15+ template surat kuasa untuk berbagai keperluan
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/template/surat-kuasa-lengkap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Semua Template
            </Link>
            <a 
              href="https://www.ini.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl border-2 border-orange-600 hover:bg-orange-50 transition-all"
            >
              <Briefcase className="h-5 w-5" />
              Konsultasi Notaris
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
