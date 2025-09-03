import { Metadata } from 'next'
import { Briefcase, Calculator, FileText, CheckCircle, AlertTriangle, Scale, Clock, TrendingUp, Users, Shield, Download, Info, DollarSign, Award, Calendar, ChevronRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PHK dan Hak Pesangon - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Panduan lengkap PHK dan perhitungan pesangon: jenis PHK, rumus pesangon, UPMK, UPH, prosedur pengaduan, dan hak-hak pekerja sesuai UU Cipta Kerja.',
  keywords: ['PHK', 'pesangon', 'UPMK', 'UPH', 'ketenagakerjaan', 'Disnaker', 'PHI', 'hak pekerja', 'UU Cipta Kerja'],
}

// Data jenis-jenis PHK
const phkTypes = [
  {
    id: 'phk-perusahaan',
    name: 'PHK oleh Perusahaan',
    icon: Briefcase,
    color: 'red',
    reasons: [
      'Perusahaan tutup karena merugi',
      'Perusahaan pailit',
      'Perubahan status/kepemilikan',
      'Efisiensi (restrukturisasi)',
      'Force majeure',
    ],
    compensation: '2x UP + 1x UPMK + UPH',
  },
  {
    id: 'phk-pekerja',
    name: 'PHK atas Kemauan Pekerja',
    icon: Users,
    color: 'blue',
    reasons: [
      'Mengundurkan diri',
      'Pekerja meninggal dunia',
      'Pekerja memasuki usia pensiun',
      'Pekerja sakit berkepanjangan',
    ],
    compensation: 'UPH + UPMK (untuk pensiun/sakit)',
  },
  {
    id: 'phk-pelanggaran',
    name: 'PHK karena Pelanggaran',
    icon: AlertTriangle,
    color: 'orange',
    reasons: [
      'Pelanggaran berat',
      'Mangkir 5 hari berturut-turut',
      'Pelanggaran PKB/PP',
      'Tindak pidana',
    ],
    compensation: 'UPH atau 0 (pelanggaran berat)',
  },
  {
    id: 'phk-pkwt',
    name: 'Berakhirnya PKWT',
    icon: Calendar,
    color: 'green',
    reasons: [
      'Kontrak selesai',
      'Pekerjaan selesai',
      'Proyek berakhir',
    ],
    compensation: 'Kompensasi PKWT (jika ada)',
  },
]

// Tabel pesangon berdasarkan masa kerja
const pesangonTable = [
  { masa: '< 1 tahun', up: '1 bulan', upmk: '-' },
  { masa: '1 - 2 tahun', up: '2 bulan', upmk: '-' },
  { masa: '2 - 3 tahun', up: '3 bulan', upmk: '-' },
  { masa: '3 - 4 tahun', up: '4 bulan', upmk: '2 bulan' },
  { masa: '4 - 5 tahun', up: '5 bulan', upmk: '2 bulan' },
  { masa: '5 - 6 tahun', up: '6 bulan', upmk: '2 bulan' },
  { masa: '6 - 7 tahun', up: '7 bulan', upmk: '3 bulan' },
  { masa: '7 - 8 tahun', up: '8 bulan', upmk: '3 bulan' },
  { masa: '≥ 8 tahun', up: '9 bulan', upmk: '4 bulan' },
  { masa: '9 - 12 tahun', up: '9 bulan', upmk: '4 bulan' },
  { masa: '12 - 15 tahun', up: '9 bulan', upmk: '5 bulan' },
  { masa: '15 - 18 tahun', up: '9 bulan', upmk: '6 bulan' },
  { masa: '18 - 21 tahun', up: '9 bulan', upmk: '7 bulan' },
  { masa: '21 - 24 tahun', up: '9 bulan', upmk: '8 bulan' },
  { masa: '≥ 24 tahun', up: '9 bulan', upmk: '10 bulan' },
]

// Komponen UPH
const uphComponents = [
  'Cuti tahunan yang belum diambil',
  'Biaya/ongkos pulang ke tempat pekerja diterima',
  'Penggantian perumahan, pengobatan, dan perawatan (15% dari UP + UPMK)',
  'Hal-hal lain yang ditetapkan dalam PKB/Perjanjian Kerja',
]

export default function PHKPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-5 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
              <Briefcase className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
            PHK dan Hak Pesangon
          </h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto text-center">
            Panduan lengkap hak pekerja saat PHK, cara menghitung pesangon, 
            dan prosedur pengaduan sesuai UU Ketenagakerjaan
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="h-5 w-5 text-red-600" />
              <h3 className="font-bold text-gray-900">UP</h3>
            </div>
            <p className="text-sm text-gray-600">Uang Pesangon</p>
            <p className="text-2xl font-bold text-red-600 mt-2">1-9x</p>
            <p className="text-xs text-gray-500">Gaji bulanan</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">UPMK</h3>
            </div>
            <p className="text-sm text-gray-600">Penghargaan Masa Kerja</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">2-10x</p>
            <p className="text-xs text-gray-500">Gaji bulanan</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-gray-900">UPH</h3>
            </div>
            <p className="text-sm text-gray-600">Penggantian Hak</p>
            <p className="text-2xl font-bold text-green-600 mt-2">15%+</p>
            <p className="text-xs text-gray-500">UP + UPMK</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <h3 className="font-bold text-gray-900">Proses</h3>
            </div>
            <p className="text-sm text-gray-600">Mediasi-PHI</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">30-140</p>
            <p className="text-xs text-gray-500">Hari kerja</p>
          </div>
        </div>

        {/* Alert Box UU Cipta Kerja */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Update UU Cipta Kerja No. 11/2020</h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Komponen pesangon: UP + UPMK + UPH (tidak ada perubahan rumus)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>PHK efisiensi: tetap dapat pesangon 1x sesuai ketentuan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Program JKP (Jaminan Kehilangan Pekerjaan) dari BPJS Ketenagakerjaan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jenis-jenis PHK */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jenis-Jenis PHK dan Hak Pesangon</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {phkTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-red-300 transition-all">
                <div className={`bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    <type.icon className="h-8 w-8" />
                    <h3 className="text-xl font-bold">{type.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Alasan PHK:</h4>
                    <ul className="space-y-2">
                      {type.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-800 mb-2">Hak Kompensasi:</h4>
                    <p className="text-sm font-medium text-green-700 bg-green-50 rounded-lg px-3 py-2">
                      {type.compensation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel Perhitungan Pesangon */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            Tabel Perhitungan Pesangon
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Masa Kerja</th>
                  <th className="px-6 py-4 text-center">Uang Pesangon (UP)</th>
                  <th className="px-6 py-4 text-center">UPMK</th>
                  <th className="px-6 py-4 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {pesangonTable.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-3 font-medium text-gray-900">{row.masa}</td>
                    <td className="px-6 py-3 text-center text-gray-700">{row.up}</td>
                    <td className="px-6 py-3 text-center text-gray-700">{row.upmk}</td>
                    <td className="px-6 py-3 text-center font-semibold text-blue-600">
                      {row.upmk === '-' 
                        ? row.up 
                        : `${parseInt(row.up) + parseInt(row.upmk)} bulan`
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-100 rounded-xl border border-yellow-300">
            <p className="text-sm text-yellow-800">
              <strong>Catatan:</strong> Tabel di atas adalah ketentuan minimum. Perusahaan dapat memberikan lebih besar sesuai PKB/Perjanjian Kerja.
            </p>
          </div>
        </div>

        {/* Kalkulator Pesangon - TANPA TOMBOL ONLINE */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-purple-600" />
            Kalkulator Estimasi Pesangon
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Contoh Perhitungan:</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                <span className="text-gray-600">Gaji Pokok</span>
                <span className="font-semibold">Rp 8.000.000</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                <span className="text-gray-600">Tunjangan Tetap</span>
                <span className="font-semibold">Rp 2.000.000</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                <span className="text-gray-600">Total Upah</span>
                <span className="font-bold text-purple-700">Rp 10.000.000</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                <span className="text-gray-600">Masa Kerja</span>
                <span className="font-semibold">7 tahun</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">UP (8 bulan)</span>
                <span className="font-semibold">Rp 80.000.000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">UPMK (3 bulan)</span>
                <span className="font-semibold">Rp 30.000.000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">UPH (15%)</span>
                <span className="font-semibold">Rp 16.500.000</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t-2 border-purple-300">
                <span className="text-lg font-bold text-purple-800">Total Pesangon</span>
                <span className="text-xl font-bold text-purple-800">Rp 126.500.000</span>
              </div>
            </div>
          </div>
          
          {/* TOMBOL KALKULATOR ONLINE DIHAPUS */}
        </div>

        {/* Komponen UPH */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            Komponen Uang Penggantian Hak (UPH)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {uphComponents.map((component, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700">{component}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-emerald-100 rounded-xl p-4 border border-emerald-300">
            <p className="text-sm text-emerald-800">
              <strong>Tips:</strong> Pastikan semua hak Anda tercatat dan diminta saat negosiasi pesangon, termasuk bonus yang belum dibayar dan THR proporsional.
            </p>
          </div>
        </div>

        {/* Prosedur Pengaduan */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prosedur Jika Hak Tidak Dipenuhi</h2>
          <div className="space-y-4">
            {[
              {
                step: 'Negosiasi Bipartit',
                duration: 'Max 30 hari',
                desc: 'Perundingan langsung antara pekerja dengan pengusaha untuk mencapai kesepakatan.',
                icon: Users,
                color: 'blue',
              },
              {
                step: 'Mediasi Disnaker',
                duration: 'Max 30 hari',
                desc: 'Jika bipartit gagal, ajukan mediasi ke Dinas Ketenagakerjaan setempat.',
                icon: Shield,
                color: 'green',
              },
              {
                step: 'Konsiliasi/Arbitrase',
                duration: 'Max 30 hari',
                desc: 'Alternatif penyelesaian melalui konsiliator atau arbiter yang disepakati.',
                icon: Scale,
                color: 'purple',
              },
              {
                step: 'Gugatan ke PHI',
                duration: 'Max 140 hari',
                desc: 'Pengadilan Hubungan Industrial jika semua upaya damai gagal.',
                icon: Briefcase,
                color: 'red',
              },
              {
                step: 'Kasasi ke MA',
                duration: 'Max 30 hari',
                desc: 'Upaya hukum terakhir ke Mahkamah Agung jika tidak puas dengan putusan PHI.',
                icon: FileText,
                color: 'orange',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-red-500">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        Tahap {idx + 1}: {item.step}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dokumen Penting */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-orange-600" />
            Dokumen yang Harus Disiapkan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">Dari Perusahaan:</h3>
              <ul className="space-y-3">
                {[
                  'Surat PHK dengan alasan jelas',
                  'Perhitungan pesangon tertulis',
                  'Paklaring/Surat Pengalaman Kerja',
                  'Surat keterangan berhenti bekerja',
                  'Formulir pengajuan JHT/JP BPJS',
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">Yang Harus Anda Simpan:</h3>
              <ul className="space-y-3">
                {[
                  'Kontrak kerja/PKB',
                  'Slip gaji 3 bulan terakhir',
                  'Bukti prestasi/penilaian kinerja',
                  'Korespondensi terkait PHK',
                  'Bukti-bukti pendukung lainnya',
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
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
                q: 'Apakah perusahaan bisa PHK tanpa pesangon?',
                a: 'Tidak bisa, kecuali untuk pelanggaran berat yang dibuktikan dengan bukti dan saksi. Minimal pekerja tetap dapat UPH.',
              },
              {
                q: 'Bagaimana jika perusahaan menolak bayar pesangon?',
                a: 'Laporkan ke Disnaker setempat untuk mediasi. Jika gagal, ajukan gugatan ke PHI. Putusan PHI bersifat final untuk nilai di bawah Rp 150 juta.',
              },
              {
                q: 'Apakah karyawan kontrak dapat pesangon?',
                a: 'Karyawan PKWT yang di-PHK sebelum kontrak berakhir berhak atas ganti rugi sebesar upah hingga kontrak selesai.',
              },
              {
                q: 'Berapa lama pesangon harus dibayar?',
                a: 'Sesuai putusan atau kesepakatan, umumnya maksimal 1 bulan setelah PHK efektif atau putusan berkekuatan hukum tetap.',
              },
              {
                q: 'Bagaimana dengan BPJS Ketenagakerjaan?',
                a: 'JHT bisa dicairkan 1 bulan setelah berhenti bekerja. JP bisa dicairkan saat pensiun. JKP (Jaminan Kehilangan Pekerjaan) bisa diklaim jika memenuhi syarat.',
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
            Tips Menghadapi PHK
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">Yang Harus Dilakukan:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>✓ Minta surat PHK tertulis dengan alasan jelas</li>
                <li>✓ Hitung sendiri estimasi pesangon Anda</li>
                <li>✓ Dokumentasikan semua komunikasi</li>
                <li>✓ Konsultasi dengan serikat pekerja/pengacara</li>
                <li>✓ Ajukan klaim BPJS Ketenagakerjaan</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">Yang Harus Dihindari:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>✗ Menandatangani dokumen tanpa membaca</li>
                <li>✗ Menerima pesangon di bawah ketentuan</li>
                <li>✗ Resign atas tekanan (kehilangan hak)</li>
                <li>✗ Menunda pengaduan (ada batas waktu)</li>
                <li>✗ Emosional saat negosiasi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section - TANPA TOMBOL KONSULTASI */}
        <div className="text-center bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Bantuan Hukum PHK?</h3>
          <p className="text-gray-700 mb-6">
            Download template surat keberatan PHK dan panduan lengkap perhitungan pesangon
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/template/somasi-lengkap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Template Surat
            </Link>
            {/* TOMBOL KONSULTASI GRATIS DIHAPUS */}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 bg-gray-100 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Kontak Penting</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Kemnaker RI</h4>
              <p className="text-sm text-gray-600">Call Center: 1500 646</p>
              <p className="text-sm text-gray-600">www.kemnaker.go.id</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">BPJS Ketenagakerjaan</h4>
              <p className="text-sm text-gray-600">Call Center: 175</p>
              <p className="text-sm text-gray-600">www.bpjsketenagakerjaan.go.id</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">LBH/YLBHI</h4>
              <p className="text-sm text-gray-600">Bantuan hukum gratis</p>
              <p className="text-sm text-gray-600">www.ylbhi.or.id</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
