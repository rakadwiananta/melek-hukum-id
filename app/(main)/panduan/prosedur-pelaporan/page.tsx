import { Metadata } from 'next'
import { AlertTriangle, Clock, FileText, Users, Phone, MapPin, CheckCircle, Download, Info, ChevronRight, Shield, Clipboard, Camera, UserCheck, FileCheck, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prosedur Pelaporan ke Polisi - Panduan Lengkap | Melek Hukum ID',
  description: 'Panduan lengkap cara membuat laporan polisi untuk berbagai kasus: kehilangan, pencurian, penipuan, kecelakaan. Termasuk dokumen yang diperlukan dan tips praktis.',
  keywords: ['laporan polisi', 'cara melapor polisi', 'SPKT', 'LP', 'tindak pidana', 'prosedur pelaporan'],
}

export default function ProsedurPelaporanPage() {
  return (
    <article className="py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Gradient Background */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-wayang">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-lg rounded-xl">
                <Shield className="h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Prosedur Pelaporan ke Polisi
              </h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed">
              Panduan lengkap membuat laporan polisi dengan benar, dari persiapan hingga mendapatkan tanda bukti laporan.
            </p>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
            <Clock className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-900">Waktu Pelayanan</h3>
            <p className="text-sm text-green-700 mt-1">24 Jam (SPKT Polres/Polsek)</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
            <FileText className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-blue-900">Biaya</h3>
            <p className="text-sm text-blue-700 mt-1">GRATIS (Tidak dipungut biaya)</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-purple-900">Proses</h3>
            <p className="text-sm text-purple-700 mt-1">15-30 menit (tergantung kasus)</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10">
          {/* Alert Box */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-batik">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-600 rounded-lg gunungan-float">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 mb-2">Penting!</h3>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Segera laporkan dalam 1x24 jam untuk kasus urgent (kehilangan dokumen penting, kecelakaan)</li>
                  <li>• Bawa barang bukti dalam kondisi asli (jangan diubah/dibersihkan)</li>
                  <li>• Ajak saksi yang melihat langsung kejadian</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Jenis Laporan */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clipboard className="h-6 w-6 text-primary" />
              Jenis-Jenis Laporan
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">Laporan Polisi (LP)</h3>
                <p className="text-sm text-gray-600 mb-3">Untuk tindak pidana yang sudah terjadi</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Pencurian</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Penipuan</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Penganiayaan</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Kehilangan</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">Laporan Model A</h3>
                <p className="text-sm text-gray-600 mb-3">Untuk pengaduan/informasi awal</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Dugaan tindak pidana</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Informasi kejahatan</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Pengaduan masyarakat</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Langkah-langkah Detail */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-primary" />
              Langkah-Langkah Pelaporan
            </h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-batik border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold wayang-bounce">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Persiapan Sebelum ke Polisi</h3>
                    <div className="bg-blue-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Dokumen yang Harus Dibawa:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">KTP/Identitas</p>
                            <p className="text-sm text-blue-700">Asli dan fotokopi</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Barang Bukti</p>
                            <p className="text-sm text-blue-700">Foto, rekaman, dokumen</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Kronologi Tertulis</p>
                            <p className="text-sm text-blue-700">Waktu, tempat, kejadian</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Data Saksi</p>
                            <p className="text-sm text-blue-700">Nama, alamat, kontak</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Tips:</strong> Buat kronologi dengan format 5W+1H (What, When, Where, Who, Why, How)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-batik border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold wayang-bounce">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Datang ke SPKT Polsek/Polres</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Lokasi Pelaporan</p>
                          <p className="text-sm text-green-700">Polsek/Polres sesuai TKP atau domisili</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Clock className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Jam Operasional</p>
                          <p className="text-sm text-green-700">24 Jam (Unit SPKT)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-batik border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold wayang-bounce">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Proses Pembuatan Laporan</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Tahapan di SPKT:</h4>
                        <ol className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">1.</span>
                            <span>Ambil nomor antrian di meja SPKT</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">2.</span>
                            <span>Sampaikan maksud kedatangan ke petugas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">3.</span>
                            <span>Ceritakan kronologi dengan jelas dan lengkap</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">4.</span>
                            <span>Serahkan dokumen pendukung</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">5.</span>
                            <span>Tunggu petugas mengetik laporan</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">6.</span>
                            <span>Baca dan koreksi draft laporan</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-600">7.</span>
                            <span>Tanda tangan laporan</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-batik border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold wayang-bounce">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Terima Tanda Bukti Laporan</h3>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <h4 className="font-semibold text-orange-900 mb-3">Yang Akan Anda Terima:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-orange-800">Tanda Bukti Laporan (TBL)</p>
                            <p className="text-sm text-orange-700">Berisi nomor LP dan stempel resmi</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-orange-800">Salinan Laporan Polisi</p>
                            <p className="text-sm text-orange-700">Untuk arsip pribadi Anda</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                        <p className="text-sm text-orange-800">
                          <strong>Penting:</strong> Simpan nomor LP dan TBL untuk follow up kasus
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-2xl p-6 shadow-batik border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold wayang-bounce">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Tindak Lanjut</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <h4 className="font-semibold text-indigo-900 mb-2">Jika Diperlukan:</h4>
                        <ul className="space-y-2 text-sm text-indigo-700">
                          <li>• Pemeriksaan tambahan sebagai saksi</li>
                          <li>• Penyerahan barang bukti tambahan</li>
                          <li>• Visum (untuk kasus penganiayaan)</li>
                          <li>• Identifikasi tersangka</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <h4 className="font-semibold text-indigo-900 mb-2">Hak Pelapor:</h4>
                        <ul className="space-y-2 text-sm text-indigo-700">
                          <li>• Mendapat nomor LP</li>
                          <li>• Mengetahui perkembangan kasus</li>
                          <li>• Didampingi kuasa hukum</li>
                          <li>• Meminta perlindungan saksi</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Info className="h-6 w-6" />
                Tips Penting Saat Melapor
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-indigo-800">Tenang dan Jelas</p>
                      <p className="text-sm text-indigo-700">Ceritakan kronologi dengan tenang dan berurutan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-indigo-800">Jujur dan Faktual</p>
                      <p className="text-sm text-indigo-700">Sampaikan fakta apa adanya, jangan menambah/mengurangi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-indigo-800">Bawa Saksi</p>
                      <p className="text-sm text-indigo-700">Ajak saksi yang melihat langsung kejadian</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-indigo-800">Dokumentasi</p>
                      <p className="text-sm text-indigo-700">Foto/video kondisi TKP dan barang bukti</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-indigo-800">Catat Detail</p>
                      <p className="text-sm text-indigo-700">Nama petugas, nomor LP, tanggal pelaporan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-indigo-800">Arsip Digital</p>
                      <p className="text-sm text-indigo-700">Scan/foto semua dokumen untuk backup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pertanyaan Umum (FAQ)</h2>
            <div className="space-y-4">
              <details className="bg-white rounded-xl border border-gray-200 p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Apakah membuat laporan polisi dikenakan biaya?
                </summary>
                <p className="mt-3 text-gray-700">
                  Tidak, pembuatan laporan polisi adalah GRATIS. Jika ada oknum yang meminta bayaran, 
                  laporkan ke Propam atau hubungi 110.
                </p>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Berapa lama proses pembuatan laporan?
                </summary>
                <p className="mt-3 text-gray-700">
                  Normalnya 15-30 menit, tergantung kompleksitas kasus dan antrean. 
                  Untuk kasus kompleks bisa memakan waktu lebih lama.
                </p>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Bisakah melapor online?
                </summary>
                <p className="mt-3 text-gray-700">
                  Ya, beberapa kepolisian daerah menyediakan layanan lapor online. 
                  Namun untuk kasus tertentu tetap harus datang langsung untuk verifikasi.
                </p>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Apa bedanya LP dan Laporan Model A?
                </summary>
                <p className="mt-3 text-gray-700">
                  LP (Laporan Polisi) untuk kejadian yang sudah terjadi dan ada unsur pidananya. 
                  Laporan Model A untuk pengaduan atau informasi awal yang perlu ditindaklanjuti.
                </p>
              </details>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="mt-12">
            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <Phone className="h-6 w-6" />
                Kontak Darurat
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600 mb-1">110</p>
                  <p className="text-sm text-gray-700">Call Center Polri</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600 mb-1">112</p>
                  <p className="text-sm text-gray-700">Nomor Darurat</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600 mb-1">1717</p>
                  <p className="text-sm text-gray-700">Pengaduan Polri</p>
                </div>
              </div>
            </div>
          </section>

          {/* Download Section */}
          <div className="mt-12 text-center space-y-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg">
              <Download className="h-5 w-5" />
              Download Template Kronologi
            </button>
            <p className="text-sm text-gray-600">
              Template untuk membantu Anda menyusun kronologi kejadian dengan sistematis
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <Link 
              href="/panduan/mengurus-dokumen-hilang"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
            >
              <div>
                <p className="text-sm text-gray-600">Panduan Sebelumnya</p>
                <p className="font-semibold text-gray-900">Mengurus Dokumen Hilang</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 rotate-180" />
            </Link>
            
            <Link 
              href="/panduan/gugatan-sederhana"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
            >
              <div className="text-right">
                <p className="text-sm text-gray-600">Panduan Selanjutnya</p>
                <p className="font-semibold text-gray-900">Gugatan Sederhana</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
