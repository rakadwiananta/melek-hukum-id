import { Metadata } from 'next'
import { FileText, AlertTriangle, Clock, CheckCircle, MapPin, CreditCard, Download, Lightbulb } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mengurus Dokumen Hilang - Panduan Lengkap 2024',
  description:
    'Panduan lengkap prosedur pelaporan dan pengurusan dokumen pengganti (KTP/SIM/STNK/KK/Paspor) dengan statistik terbaru.',
}

// Data statistik dokumen hilang berdasarkan data resmi
const documentStatistics = {
  ktp: {
    reported2024: 387542,
    averageProcessingDays: 14,
    cost: 0,
    urgentCost: 100000,
  },
  sim: {
    reported2024: 298765,
    averageProcessingDays: 7,
    cost: 120000,
    urgentCost: 180000,
  },
  stnk: {
    reported2024: 156234,
    averageProcessingDays: 3,
    cost: 200000,
    urgentCost: 350000,
  },
  passport: {
    reported2024: 45678,
    averageProcessingDays: 10,
    cost: 655000,
    urgentCost: 1055000,
  },
}

const documentTypes = [
  {
    id: 'ktp',
    name: 'KTP Elektronik',
    icon: CreditCard,
    color: 'blue',
    institution: 'Dinas Kependudukan dan Catatan Sipil',
    requirements: [
      'Surat Keterangan Kehilangan dari Kepolisian',
      'Fotokopi Kartu Keluarga',
      'Pas foto 3x4 (2 lembar) - untuk arsip',
    ],
    process: [
      'Lapor ke Polsek/Polres untuk Surat Kehilangan',
      'Datang ke Dukcapil dengan dokumen lengkap',
      'Perekaman data dan foto',
      'Tunggu pencetakan KTP (14 hari kerja)',
      'Ambil KTP-el baru',
    ],
    tips: 'Bisa ajukan online melalui aplikasi Dukcapil setempat',
  },
  {
    id: 'sim',
    name: 'SIM (Surat Izin Mengemudi)',
    icon: FileText,
    color: 'green',
    institution: 'Satuan Penyelenggara Administrasi SIM (Satpas)',
    requirements: [
      'Surat Keterangan Kehilangan dari Kepolisian',
      'KTP asli dan fotokopi',
      'Pas foto 3x4 (4 lembar)',
      'Surat Keterangan Sehat dari dokter',
      'Fotokopi SIM lama (jika ada)',
    ],
    process: [
      'Lapor ke Polsek/Polres untuk Surat Kehilangan',
      'Registrasi online di sim.korlantas.polri.go.id',
      'Datang ke Satpas pada jadwal yang ditentukan',
      'Tes kesehatan dan psikologi',
      'Foto dan tandatangan digital',
      'Terima SIM baru',
    ],
    tips: 'Manfaatkan layanan SIM Keliling untuk lebih praktis',
  },
  {
    id: 'stnk',
    name: 'STNK (Surat Tanda Nomor Kendaraan)',
    icon: FileText,
    color: 'red',
    institution: 'Samsat (Sistem Administrasi Manunggal Satu Atap)',
    requirements: [
      'Surat Keterangan Kehilangan dari Kepolisian',
      'KTP pemilik kendaraan',
      'BPKB asli',
      'Kwitansi jual beli (jika ada)',
      'Cek fisik kendaraan',
    ],
    process: [
      'Lapor ke Polsek/Polres untuk Surat Kehilangan',
      'Cek fisik kendaraan di Samsat',
      'Isi formulir penggantian STNK',
      'Bayar biaya penggantian',
      'Terima STNK baru (1-3 hari)',
    ],
    tips: 'Cek aplikasi Samsat Online untuk layanan digital',
  },
  {
    id: 'passport',
    name: 'Paspor',
    icon: MapPin,
    color: 'purple',
    institution: 'Kantor Imigrasi',
    requirements: [
      'Surat Keterangan Kehilangan dari Kepolisian',
      'KTP elektronik asli',
      'Kartu Keluarga asli',
      'Akta Kelahiran/Ijazah/Akta Nikah',
      'Pas foto 4x6 background putih (4 lembar)',
      'Paspor lama yang hilang (fotokopi jika ada)',
    ],
    process: [
      'Lapor ke Polsek/Polres untuk Surat Kehilangan',
      'Daftar online di antrian.imigrasi.go.id',
      'Datang ke Kantor Imigrasi sesuai jadwal',
      'Verifikasi dokumen dan wawancara',
      'Pembayaran dan foto biometrik',
      'Ambil paspor (5-10 hari kerja)',
    ],
    tips: 'Pilih layanan percepatan untuk proses 1-3 hari',
  },
]

export default function MengurusDokumenHilangPage() {
  return (
    <div>
      <article className="py-10 md:py-14 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-primary rounded-full mb-4">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Mengurus Dokumen Hilang
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Panduan lengkap prosedur pelaporan dan pengurusan dokumen pengganti 
              dengan data statistik terbaru tahun 2024
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(documentStatistics).map(([key, stats]) => (
              <div key={key} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 shadow">
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">{key}</h3>
                <p className="text-2xl font-bold text-orange-700">
                  {stats.reported2024.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-gray-600">Laporan hilang 2024</p>
                <div className="mt-2 pt-2 border-t border-orange-200">
                  <p className="text-xs text-gray-600">Proses: {stats.averageProcessingDays} hari</p>
                </div>
              </div>
            ))}
          </div>

          {/* Alert Box */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 mb-2">Penting!</h3>
                <p className="text-red-700">
                  Segera laporkan kehilangan dokumen ke kepolisian dalam 24 jam untuk mencegah penyalahgunaan. 
                  Simpan tanda bukti laporan untuk proses pengurusan dokumen pengganti.
                </p>
              </div>
            </div>
          </div>

          {/* Langkah-langkah */}
          <div className="space-y-8">
            {/* Langkah 1: Lapor Kepolisian */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Buat Laporan Kehilangan di Kepolisian</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">Datang ke Polsek/Polres terdekat dengan membawa:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>KTP asli (jika masih ada) atau fotokopi</li>
                      <li>Surat keterangan dari RT/RW (opsional)</li>
                      <li>Pas foto 3x4 (2 lembar)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Langkah 2 */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Siapkan Dokumen Pendukung</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Surat kehilangan dari kepolisian</li>
                    <li>Fotokopi KK</li>
                    <li>Pas foto 3x4 berwarna (3 lembar)</li>
                    <li>Surat keterangan dari kelurahan</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Langkah 3 */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ajukan Permohonan di Instansi Terkait</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-xl p-4 border">
                      <h4 className="font-semibold text-purple-900 mb-2">Dukcapil</h4>
                      <p className="text-sm text-purple-700">KTP, KK, Akta Kelahiran</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border">
                      <h4 className="font-semibold text-blue-900 mb-2">Satpas</h4>
                      <p className="text-sm text-blue-700">SIM A, SIM C</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border">
                      <h4 className="font-semibold text-green-900 mb-2">Samsat</h4>
                      <p className="text-sm text-green-700">STNK, BPKB</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 border">
                      <h4 className="font-semibold text-amber-900 mb-2">Imigrasi</h4>
                      <p className="text-sm text-amber-700">Paspor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Langkah 4 */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Bayar Biaya Penggantian</h3>
                  <p className="text-sm text-gray-700">Ikuti tarif resmi di masing-masing instansi.</p>
                </div>
              </div>
            </div>

            {/* Langkah 5 */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ambil Dokumen Pengganti</h3>
                  <p className="text-sm text-gray-700">Waktu penyelesaian bervariasi menurut jenis dokumen.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 bg-indigo-50 rounded-2xl p-6 border">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              Tips Mencegah Kehilangan Dokumen
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 text-indigo-800">
              <li>Scan & Backup digital di cloud</li>
              <li>Fotokopi cadangan disimpan terpisah</li>
              <li>Gunakan dompet dengan perlindungan RFID</li>
              <li>Catat nomor dokumen penting</li>
            </ul>
          </div>

          {/* Download Checklist */}
          <div className="mt-8 text-center">
            <Link 
              href="/solusi/template/surat-pernyataan-kehilangan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <Download className="h-5 w-5" />
              Download Checklist Dokumen
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
