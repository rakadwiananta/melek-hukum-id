import { Metadata } from 'next'
import { 
  Gift, Users, Scale, FileText, AlertTriangle, Calendar, Shield,
  DollarSign, Home, Book, CheckCircle, Info, Download, Calculator,
  ChevronRight, AlertCircle, Briefcase, TrendingUp, MapPin, Award
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pembagian Warisan & Hibah - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Panduan lengkap hukum waris Islam dan BW, prosedur hibah, perhitungan bagian, dokumen, biaya, dan cara mengurus di pengadilan/PPAT.',
  keywords: ['warisan', 'hibah', 'faraidh', 'waris Islam', 'waris BW', 'PPAT', 'surat keterangan waris'],
}

// Sistem pembagian waris
const inheritanceSystems = [
  {
    id: 'islam',
    name: 'Hukum Waris Islam (Faraidh)',
    icon: Book,
    color: 'green',
    court: 'Pengadilan Agama',
    heirs: {
      'Anak laki-laki': '2 bagian',
      'Anak perempuan': '1 bagian',
      'Suami': '1/2 atau 1/4',
      'Istri': '1/4 atau 1/8',
      'Ayah': '1/6 + ashabah',
      'Ibu': '1/6 atau 1/3',
    },
    process: 'Penetapan Ahli Waris di PA',
    document: 'Surat Keterangan Waris dari KUA',
  },
  {
    id: 'bw',
    name: 'Hukum Waris Perdata (BW)',
    icon: Scale,
    color: 'blue',
    court: 'Pengadilan Negeri',
    heirs: {
      'Golongan I': 'Anak & keturunannya',
      'Golongan II': 'Orang tua & saudara',
      'Golongan III': 'Kakek/nenek',
      'Golongan IV': 'Keluarga sedarah lainnya',
    },
    process: 'Surat Keterangan Hak Mewaris',
    document: 'SKW dari Notaris/Lurah',
  },
  {
    id: 'adat',
    name: 'Hukum Waris Adat',
    icon: Users,
    color: 'purple',
    court: 'Musyawarah Adat',
    heirs: {
      'Patrilineal': 'Garis keturunan ayah',
      'Matrilineal': 'Garis keturunan ibu',
      'Bilateral': 'Kedua garis keturunan',
    },
    process: 'Keputusan Adat',
    document: 'Surat Keterangan Adat',
  },
]

// Jenis-jenis hibah
const hibahTypes = [
  {
    id: 'biasa',
    name: 'Hibah Biasa',
    description: 'Pemberian cuma-cuma tanpa syarat',
    taxRate: '5% (keluarga) / 30% (non-keluarga)',
    needNotary: true,
    revocable: 'Tidak bisa dibatalkan',
  },
  {
    id: 'wasiat',
    name: 'Hibah Wasiat',
    description: 'Berlaku setelah pemberi meninggal',
    taxRate: 'Sesuai pajak waris',
    needNotary: true,
    revocable: 'Bisa diubah sewaktu hidup',
  },
  {
    id: 'umra',
    name: 'Hibah Umra',
    description: 'Hak pakai selama penerima hidup',
    taxRate: '5-30%',
    needNotary: true,
    revocable: 'Kembali ke pemberi setelah penerima meninggal',
  },
]

// Dokumen yang diperlukan
const requiredDocuments = {
  waris: [
    'Surat kematian dari kelurahan/RS',
    'KTP & KK semua ahli waris',
    'Akta kelahiran ahli waris',
    'Buku nikah/akta nikah',
    'Sertifikat tanah/BPKB (jika ada)',
    'Surat pernyataan ahli waris',
  ],
  hibah: [
    'KTP pemberi & penerima hibah',
    'KK pemberi & penerima',
    'Sertifikat hak atas tanah',
    'SPPT PBB tahun berjalan',
    'Bukti pembayaran BPHTB',
    'Surat pernyataan hibah',
  ],
}

// Biaya-biaya
const costs = {
  waris: {
    'Penetapan ahli waris PA/PN': 'Rp 300.000 - 1.000.000',
    'SKW dari notaris': 'Rp 1.000.000 - 3.000.000',
    'SKW dari lurah (WNI asli)': 'Rp 100.000 - 300.000',
    'Akta pembagian waris': 'Rp 2.000.000 - 10.000.000',
    'Balik nama sertifikat': 'Rp 500.000 - 2.000.000',
    'BPHTB (pajak)': '5% dari NJOP',
  },
  hibah: {
    'Akta hibah notaris': 'Rp 2.000.000 - 10.000.000',
    'BPHTB pemberi': '5% (keluarga) / 30% (non)',
    'PPh penerima': '5% dari NJOP',
    'Balik nama BPN': 'Rp 500.000 - 2.000.000',
    'Biaya administrasi': 'Rp 200.000 - 500.000',
  },
}

export default function WarisanHibahPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-5 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
              <Gift className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
            Pembagian Warisan & Hibah
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto text-center">
            Panduan lengkap hukum waris Islam, BW, dan adat, prosedur hibah, 
            perhitungan bagian, dan cara mengurus dokumen resmi
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="h-5 w-5 text-purple-600" />
              <h3 className="font-bold text-gray-900">Sistem</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">3</p>
            <p className="text-xs text-gray-500">Hukum waris</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Pajak</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-600">5-30%</p>
            <p className="text-xs text-gray-500">BPHTB hibah</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Proses</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">14-30</p>
            <p className="text-xs text-gray-500">Hari kerja</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-gray-900">Dokumen</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">10+</p>
            <p className="text-xs text-gray-500">Berkas wajib</p>
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Hal Penting yang Perlu Diketahui!</h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Hibah kepada ahli waris dapat dianggap sebagai warisan dan diperhitungkan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Pajak hibah keluarga sedarah (5%) jauh lebih rendah dari non-keluarga (30%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Wasiat maksimal 1/3 harta untuk non-ahli waris (hukum Islam)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sistem Pembagian Waris */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sistem Pembagian Waris di Indonesia</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {inheritanceSystems.map((system) => (
              <div key={system.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-purple-300 transition-all">
                <div className={`bg-gradient-to-r from-${system.color}-500 to-${system.color}-600 p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    <system.icon className="h-8 w-8" />
                    <h3 className="text-lg font-bold">{system.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{system.court}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Ahli Waris:</h4>
                  <ul className="space-y-2 mb-4">
                    {Object.entries(system.heirs).slice(0, 4).map(([heir, portion]) => (
                      <li key={heir} className="flex justify-between text-sm">
                        <span className="text-gray-600">{heir}</span>
                        <span className="font-semibold text-gray-800">{portion}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-1">Proses:</p>
                    <p className="text-sm font-semibold text-gray-800">{system.process}</p>
                    <p className="text-xs text-gray-500 mt-2">Dokumen:</p>
                    <p className="text-sm font-semibold text-blue-600">{system.document}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contoh Perhitungan Waris Islam */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-green-600" />
            Contoh Perhitungan Waris Islam
          </h2>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Kasus: Pewaris meninggalkan harta Rp 1.2 Milyar</h3>
            <p className="text-gray-600 mb-4">Ahli waris: Istri, 2 anak laki-laki, 1 anak perempuan, ibu</p>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Istri (1/8)</span>
                <span className="font-semibold">Rp 150.000.000</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Ibu (1/6)</span>
                <span className="font-semibold">Rp 200.000.000</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Sisa untuk anak-anak</span>
                <span className="font-semibold">Rp 850.000.000</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-green-100 rounded-xl">
              <p className="text-sm text-green-800 font-semibold mb-2">Pembagian anak (2:1):</p>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Setiap anak laki-laki: Rp 340.000.000 (2 bagian)</li>
                <li>• Anak perempuan: Rp 170.000.000 (1 bagian)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jenis-jenis Hibah */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jenis-Jenis Hibah</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hibahTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{type.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pajak:</span>
                    <span className="font-semibold text-red-600">{type.taxRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-semibold text-blue-600">{type.revocable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prosedur Step by Step */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prosedur Lengkap</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Prosedur Waris */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                Prosedur Pembagian Waris
              </h3>
              <div className="space-y-4">
                {[
                  'Urus surat kematian di kelurahan',
                  'Buat surat pernyataan ahli waris',
                  'Ajukan penetapan ahli waris ke PA/PN',
                  'Atau buat SKW di notaris/lurah',
                  'Hitung dan sepakati pembagian',
                  'Buat akta pembagian waris di notaris',
                  'Bayar BPHTB (5% dari NJOP)',
                  'Balik nama aset ke ahli waris',
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Prosedur Hibah */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Gift className="h-6 w-6 text-indigo-600" />
                Prosedur Hibah Tanah/Properti
              </h3>
              <div className="space-y-4">
                {[
                  'Siapkan dokumen tanah/properti',
                  'Cek NJOP dan hitung pajak',
                  'Bayar BPHTB di bank/online',
                  'Buat akta hibah di PPAT/notaris',
                  'Validasi pembayaran pajak',
                  'Daftar balik nama ke BPN',
                  'Tunggu proses (14-30 hari)',
                  'Ambil sertifikat baru',
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dokumen yang Diperlukan */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Dokumen yang Diperlukan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Pembagian Waris:</h3>
              <ul className="space-y-2">
                {requiredDocuments.waris.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Hibah Properti:</h3>
              <ul className="space-y-2">
                {requiredDocuments.hibah.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Estimasi Biaya */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            Estimasi Biaya
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">Biaya Waris:</h3>
              <ul className="space-y-2">
                {Object.entries(costs.waris).map(([item, cost]) => (
                  <li key={item} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item}</span>
                    <span className="font-semibold text-gray-800">{cost}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">Biaya Hibah:</h3>
              <ul className="space-y-2">
                {Object.entries(costs.hibah).map(([item, cost]) => (
                  <li key={item} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item}</span>
                    <span className="font-semibold text-gray-800">{cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-100 rounded-xl border border-yellow-300">
            <p className="text-sm text-yellow-800">
              <strong>Tips:</strong> Hibah saat hidup bisa lebih hemat pajak dibanding waris, terutama untuk keluarga sedarah.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Apa bedanya hibah dan waris?',
                a: 'Hibah adalah pemberian saat pemberi masih hidup dan langsung beralih hak. Waris adalah peralihan harta setelah pewaris meninggal dunia.',
              },
              {
                q: 'Bisakah hibah dibatalkan?',
                a: 'Hibah yang sudah dilaksanakan tidak dapat dibatalkan kecuali hibah orang tua kepada anak yang durhaka (Pasal 1688 KUHPerdata).',
              },
              {
                q: 'Bagaimana jika ada ahli waris yang tidak setuju pembagian?',
                a: 'Bisa diselesaikan melalui musyawarah keluarga, mediasi, atau gugatan pembagian waris ke pengadilan.',
              },
              {
                q: 'Apakah anak angkat dapat warisan?',
                a: 'Dalam hukum Islam, anak angkat bukan ahli waris namun bisa diberi melalui wasiat (maks 1/3). Dalam BW, anak angkat yang sah sama haknya dengan anak kandung.',
              },
              {
                q: 'Berapa pajak waris?',
                a: 'BPHTB waris adalah 5% dari NJOP dikurangi NJOPTKP (nilai tidak kena pajak) yang besarnya bervariasi tiap daerah.',
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
            Tips Penting Waris & Hibah
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">💡 Tips Waris:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Buat surat wasiat untuk memperjelas kehendak</li>
                <li>• Inventarisir semua aset sejak dini</li>
                <li>• Libatkan semua ahli waris dalam pembagian</li>
                <li>• Gunakan jasa notaris untuk menghindari sengketa</li>
                <li>• Segera urus dalam 6 bulan untuk hindari denda</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">🎁 Tips Hibah:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Pertimbangkan pajak sebelum menghibahkan</li>
                <li>• Buat akta hibah di hadapan PPAT/notaris</li>
                <li>• Segera balik nama setelah akta dibuat</li>
                <li>• Hibah ke anak dapat sebagai warisan</li>
                <li>• Dokumentasikan dengan baik untuk bukti</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Bantuan Mengurus Waris atau Hibah?</h3>
          <p className="text-gray-700 mb-6">
            Download panduan lengkap dan template dokumen waris/hibah
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/template/waris-hibah"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Panduan & Template
            </Link>
            <Link 
              href="/konsultasi/waris"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl border-2 border-purple-600 hover:bg-purple-50 transition-all"
            >
              <Briefcase className="h-5 w-5" />
              Konsultasi Notaris/PPAT
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
