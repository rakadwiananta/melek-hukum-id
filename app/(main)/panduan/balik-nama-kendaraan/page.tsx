import { Metadata } from 'next'
import { Car, FileText, Calendar, CheckCircle, AlertTriangle, TrendingUp, MapPin, Clock, CreditCard, Users } from 'lucide-react'
import ExistingArticleWrapper from '@/app/components/article/templates/ExistingArticleWrapper'

export const metadata: Metadata = {
  title: 'Balik Nama Kendaraan - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Prosedur lengkap balik nama BPKB dan STNK kendaraan bermotor: dokumen, cek fisik, biaya, dan estimasi waktu. Panduan praktis 2024.',
  keywords: ['balik nama kendaraan', 'BPKB', 'STNK', 'Samsat', 'cek fisik', 'prosedur balik nama'],
}

export default function BalikNamaKendaraanPage() {
  return (
    <ExistingArticleWrapper
      title="Balik Nama Kendaraan - Panduan Lengkap"
      category="Panduan Praktis"
      readTime="8 menit"
      author="Tim Ahli Hukum Melek Hukum ID"
      publishedAt="2024-12-15T10:00:00Z"
      tags={['balik-nama', 'kendaraan', 'BPKB', 'STNK', 'Samsat', 'cek-fisik']}
      summary="Panduan balik nama STNK dan BPKB: syarat dokumen, cek fisik, pembayaran, dan waktu pengurusan. Termasuk tips praktis dan estimasi biaya."
    >
      {/* Custom Styles untuk Nusantara */}
      <style jsx>{`
        .batik-border {
          background: linear-gradient(45deg, #d97706, #dc2626, #d97706, #dc2626);
          background-size: 60px 60px;
          animation: batik-move 3s linear infinite;
        }
        @keyframes batik-move {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        .wayang-shadow {
          box-shadow: 0 10px 30px rgba(139, 69, 19, 0.2), 0 4px 12px rgba(139, 69, 19, 0.1);
        }
      `}</style>

      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 text-white">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                  <Car className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">Balik Nama Kendaraan</h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-2xl mb-8 leading-relaxed">
                Panduan balik nama STNK dan BPKB: syarat dokumen, cek fisik, pembayaran, dan waktu pengurusan di Samsat Indonesia.
              </p>
              
              {/* Statistik Kendaraan Indonesia 2024 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
                  <p className="text-xl sm:text-2xl font-bold">152 Juta</p>
                  <p className="text-xs sm:text-sm text-emerald-100">Total Kendaraan</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
                  <p className="text-xl sm:text-2xl font-bold">126 Juta</p>
                  <p className="text-xs sm:text-sm text-emerald-100">Sepeda Motor</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
                  <p className="text-xl sm:text-2xl font-bold">26 Juta</p>
                  <p className="text-xs sm:text-sm text-emerald-100">Mobil</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
                  <p className="text-xl sm:text-2xl font-bold">3.2 Juta</p>
                  <p className="text-xs sm:text-sm text-emerald-100">Balik Nama/Tahun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Info Cards dengan Desain Nusantara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Dokumen</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">KTP, BPKB, STNK, kuitansi jual beli, hasil cek fisik</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📋 Siapkan 2 set fotokopi</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Estimasi Waktu</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">1-3 hari kerja (reguler)</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">⚡ Same day service tersedia</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:transform hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Cek Fisik</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Wajib dilakukan di Samsat</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">🔍 Gratis, waktu 10-15 menit</p>
            </div>
          </div>
        </div>

        {/* Statistik Balik Nama per Provinsi */}
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 wayang-shadow border-2 border-amber-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Data Balik Nama Kendaraan 2024
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">DKI Jakarta</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">487,325</p>
              <p className="text-xs text-green-600">↑ 18% dari 2023</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">Jawa Barat</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">623,892</p>
              <p className="text-xs text-green-600">↑ 22% dari 2023</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">Jawa Timur</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">542,178</p>
              <p className="text-xs text-green-600">↑ 15% dari 2023</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">Jawa Tengah</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">398,456</p>
              <p className="text-xs text-green-600">↑ 12% dari 2023</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">Sumatera Utara</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">287,943</p>
              <p className="text-xs text-green-600">↑ 20% dari 2023</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">Bali</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">156,234</p>
              <p className="text-xs text-green-600">↑ 25% dari 2023</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 italic">*Sumber: Korlantas Polri & Ditjen Pajak Kemenkeu, Update November 2024</p>
        </div>

        {/* Langkah-langkah dengan Desain Nusantara */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Langkah-Langkah Balik Nama</h2>
        <ol className="space-y-4">
          {[
            {
              title: 'Cek Fisik Kendaraan',
              desc: 'Lakukan cek fisik kendaraan di Samsat dan minta hasilnya',
              detail: 'Pastikan nomor rangka dan mesin sesuai dengan dokumen. Proses 10-15 menit.',
              icon: '🔍',
              tips: 'Datang pagi untuk menghindari antrian',
              biaya: 'Gratis'
            },
            {
              title: 'Lengkapi Berkas',
              desc: 'KTP, BPKB, STNK, kuitansi jual beli bermaterai',
              detail: 'Siapkan fotokopi masing-masing 2 rangkap. Materai Rp 10.000 untuk kuitansi.',
              icon: '📄',
              tips: 'Cek keaslian BPKB di aplikasi e-Samsat',
              biaya: 'Materai Rp 10.000'
            },
            {
              title: 'Pembayaran',
              desc: 'Isi formulir balik nama dan bayar biaya administrasi',
              detail: 'Biaya tergantung jenis kendaraan dan wilayah. Bisa bayar tunai atau non-tunai.',
              icon: '💰',
              tips: 'Gunakan e-Samsat untuk estimasi biaya',
              biaya: 'Rp 375.000 - 1.075.000'
            },
            {
              title: 'Terima Dokumen Baru',
              desc: 'Terima STNK dan BPKB baru sesuai jadwal',
              detail: 'STNK bisa diambil hari yang sama, BPKB 3-7 hari kerja.',
              icon: '✅',
              tips: 'Simpan resi pengambilan dengan baik',
              biaya: '-'
            },
          ].map((step, idx) => (
            <li key={idx} className="bg-white rounded-2xl border-2 border-gray-200 p-5 sm:p-6 wayang-shadow hover:border-emerald-400 transition-all hover:transform hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div className="text-2xl">{step.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-700">{step.desc}</p>
                  <p className="text-xs text-gray-600 mt-2">{step.detail}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <p className="text-xs text-emerald-800">
                        <strong>💡 Tips:</strong> {step.tips}
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <p className="text-xs text-amber-800">
                        <strong>💰 Biaya:</strong> {step.biaya}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Tabel Biaya per Jenis Kendaraan */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-8 wayang-shadow border-2 border-blue-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Estimasi Biaya Balik Nama 2024</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-blue-200">
                  <th className="text-left py-2 px-2 sm:px-4">Jenis Kendaraan</th>
                  <th className="text-right py-2 px-2 sm:px-4">BBN KB</th>
                  <th className="text-right py-2 px-2 sm:px-4">PKB</th>
                  <th className="text-right py-2 px-2 sm:px-4">SWDKLLJ</th>
                  <th className="text-right py-2 px-2 sm:px-4">Total (Est.)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-100">
                  <td className="py-2 px-2 sm:px-4">Motor < 250cc</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 225.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 100.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 35.000</td>
                  <td className="text-right py-2 px-2 sm:px-4 font-bold">Rp 375.000</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 px-2 sm:px-4">Motor > 250cc</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 325.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 150.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 35.000</td>
                  <td className="text-right py-2 px-2 sm:px-4 font-bold">Rp 525.000</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 px-2 sm:px-4">Mobil < 1500cc</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 575.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 350.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 143.000</td>
                  <td className="text-right py-2 px-2 sm:px-4 font-bold">Rp 1.075.000</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 px-2 sm:px-4">Mobil > 1500cc</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 875.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 550.000</td>
                  <td className="text-right py-2 px-2 sm:px-4">Rp 143.000</td>
                  <td className="text-right py-2 px-2 sm:px-4 font-bold">Rp 1.575.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-4 italic">*Biaya dapat berbeda per provinsi, belum termasuk denda keterlambatan</p>
        </div>

        {/* Layanan Online Samsat */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 wayang-shadow border-2 border-purple-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Layanan Digital Samsat</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold text-purple-700 mb-2">e-Samsat</h4>
              <p className="text-xs text-gray-600">Pembayaran pajak online untuk perpanjangan STNK</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold text-purple-700 mb-2">Samsat Online</h4>
              <p className="text-xs text-gray-600">Cek pajak dan informasi kendaraan</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold text-purple-700 mb-2">Samsat Keliling</h4>
              <p className="text-xs text-gray-600">Layanan mobile di lokasi strategis</p>
            </div>
          </div>
        </div>

        {/* Peringatan */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-5 sm:p-6 border-2 border-red-300 wayang-shadow">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-800 mb-2 text-sm sm:text-base">Peringatan Penting</h3>
              <ul className="space-y-1 text-xs sm:text-sm text-red-700">
                <li>• Pastikan nomor rangka dan mesin sesuai dokumen untuk menghindari kendala hukum</li>
                <li>• Cek keaslian BPKB melalui aplikasi resmi atau website Korlantas Polri</li>
                <li>• Hindari calo, urus langsung di Samsat untuk keamanan</li>
                <li>• Segera balik nama maksimal 30 hari setelah transaksi untuk menghindari denda</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ExistingArticleWrapper>
  )
}
