import { Metadata } from 'next'
import { Download, FileText, CheckCircle, AlertTriangle, Info, Scale } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Template Gugatan Sederhana - Download Gratis',
  description: 'Download template gugatan sederhana untuk berbagai kasus perdata. Template siap pakai sesuai Perma No. 2 Tahun 2015 dan gratis.',
}

const gugatanTemplates = [
  {
    id: 'gugatan-hutang',
    title: 'Gugatan Hutang Piutang',
    description: 'Template untuk gugatan hutang yang sudah jatuh tempo',
    category: 'Hutang Piutang',
    format: 'DOCX & PDF',
    size: '52 KB',
    downloads: 1892,
    updated: '2024-01-20',
  },
  {
    id: 'gugatan-wanprestasi',
    title: 'Gugatan Wanprestasi',
    description: 'Template untuk gugatan wanprestasi dalam perjanjian',
    category: 'Perjanjian',
    format: 'DOCX & PDF',
    size: '58 KB',
    downloads: 1247,
    updated: '2024-01-18',
  },
  {
    id: 'gugatan-sewa-menyewa',
    title: 'Gugatan Sewa Menyewa',
    description: 'Template untuk gugatan masalah sewa menyewa',
    category: 'Sewa Menyewa',
    format: 'DOCX & PDF',
    size: '48 KB',
    downloads: 892,
    updated: '2024-01-15',
  },
  {
    id: 'gugatan-jual-beli',
    title: 'Gugatan Jual Beli',
    description: 'Template untuk gugatan masalah transaksi jual beli',
    category: 'Jual Beli',
    format: 'DOCX & PDF',
    size: '45 KB',
    downloads: 756,
    updated: '2024-01-12',
  },
  {
    id: 'gugatan-ketenagakerjaan',
    title: 'Gugatan Ketenagakerjaan',
    description: 'Template untuk gugatan masalah ketenagakerjaan',
    category: 'Ketenagakerjaan',
    format: 'DOCX & PDF',
    size: '62 KB',
    downloads: 634,
    updated: '2024-01-10',
  },
  {
    id: 'gugatan-umum',
    title: 'Gugatan Umum',
    description: 'Template gugatan yang bisa disesuaikan untuk berbagai keperluan',
    category: 'Umum',
    format: 'DOCX & PDF',
    size: '41 KB',
    downloads: 2156,
    updated: '2024-01-08',
  },
]

export default function GugatanSederhanaTemplatesPage() {
  return (
    <article className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Template Gugatan Sederhana
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download template gugatan sederhana sesuai Perma No. 2 Tahun 2015. 
            Template siap pakai, mudah disesuaikan, dan gratis.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Panduan Penggunaan</h3>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• Download template yang sesuai dengan kasus Anda</li>
                <li>• Sesuaikan isi dengan fakta dan data yang ada</li>
                <li>• Pastikan nilai gugatan tidak melebihi Rp 500 juta</li>
                <li>• Lampirkan bukti pendukung yang relevan</li>
                <li>• Gunakan bahasa yang sopan dan formal</li>
                <li>• Konsultasikan dengan ahli hukum jika diperlukan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Syarat Gugatan Sederhana */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Syarat Gugatan Sederhana
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">✅ Yang Bisa Digugat:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Nilai gugatan maksimal Rp 500 juta</li>
                <li>• Kasus perdata sederhana</li>
                <li>• Bukti-bukti sederhana</li>
                <li>• Tidak memerlukan saksi ahli</li>
                <li>• Dapat diselesaikan dalam 1 sidang</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">❌ Yang Tidak Bisa:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Nilai gugatan di atas Rp 500 juta</li>
                <li>• Kasus yang kompleks</li>
                <li>• Memerlukan saksi ahli</li>
                <li>• Kasus pidana</li>
                <li>• Kasus yang memerlukan mediasi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gugatanTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {template.category}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">{template.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{template.format}</span>
                <span>{template.size}</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">
                  {template.downloads.toLocaleString()} download
                </span>
                <span className="text-xs text-gray-500">
                  Update: {new Date(template.updated).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  // Simulate download
                  const link = document.createElement('a')
                  link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Template ${template.title}\n\nIni adalah template ${template.title} yang bisa disesuaikan dengan kebutuhan Anda.\n\nUntuk template lengkap, silakan hubungi kami atau gunakan layanan konsultasi hukum.`)}`
                  link.download = `${template.id}.txt`
                  link.click()
                }}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Gratis
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Butuh Bantuan Lebih Lanjut?
          </h3>
          <p className="text-gray-700 mb-6">
            Konsultasikan kasus gugatan Anda dengan ahli hukum berpengalaman
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://peradi.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Scale className="h-5 w-5" />
              Konsultasi dengan PERADI
            </a>
            <a 
              href="https://www.kemenkumham.go.id/berita/posbakum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-2xl border-2 border-green-600 hover:bg-green-50 transition-all"
            >
              <Info className="h-5 w-5" />
              Bantuan Hukum Gratis
            </a>
          </div>
        </div>

        {/* Back to Panduan */}
        <div className="text-center mt-12">
          <Link 
            href="/panduan"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            ← Kembali ke Panduan
          </Link>
        </div>
      </div>
    </article>
  )
}