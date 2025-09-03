import { Metadata } from 'next'
import { Download, FileText, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Template Somasi Lengkap - Download Gratis',
  description: 'Download template somasi untuk berbagai kasus: hutang, wanprestasi, ketenagakerjaan, dan lainnya. Template siap pakai dan gratis.',
}

const somasiTemplates = [
  {
    id: 'somasi-hutang',
    title: 'Somasi Penagihan Hutang',
    description: 'Template untuk menagih hutang yang sudah jatuh tempo',
    category: 'Hutang Piutang',
    format: 'DOCX & PDF',
    size: '45 KB',
    downloads: 1247,
    updated: '2024-01-15',
  },
  {
    id: 'somasi-wanprestasi',
    title: 'Somasi Wanprestasi',
    description: 'Template untuk wanprestasi dalam perjanjian',
    category: 'Perjanjian',
    format: 'DOCX & PDF',
    size: '52 KB',
    downloads: 892,
    updated: '2024-01-10',
  },
  {
    id: 'somasi-ketenagakerjaan',
    title: 'Somasi Ketenagakerjaan',
    description: 'Template untuk masalah ketenagakerjaan',
    category: 'Ketenagakerjaan',
    format: 'DOCX & PDF',
    size: '48 KB',
    downloads: 756,
    updated: '2024-01-08',
  },
  {
    id: 'somasi-sewa-menyewa',
    title: 'Somasi Sewa Menyewa',
    description: 'Template untuk masalah sewa menyewa properti',
    category: 'Properti',
    format: 'DOCX & PDF',
    size: '41 KB',
    downloads: 634,
    updated: '2024-01-05',
  },
  {
    id: 'somasi-jual-beli',
    title: 'Somasi Jual Beli',
    description: 'Template untuk masalah transaksi jual beli',
    category: 'Jual Beli',
    format: 'DOCX & PDF',
    size: '38 KB',
    downloads: 521,
    updated: '2024-01-03',
  },
  {
    id: 'somasi-umum',
    title: 'Somasi Umum',
    description: 'Template somasi yang bisa disesuaikan untuk berbagai keperluan',
    category: 'Umum',
    format: 'DOCX & PDF',
    size: '35 KB',
    downloads: 1892,
    updated: '2024-01-20',
  },
]

export default function SomasiTemplatesPage() {
  return (
    <article className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Template Somasi Lengkap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download template somasi profesional untuk berbagai kasus hukum. 
            Template siap pakai, mudah disesuaikan, dan gratis.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Panduan Penggunaan</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Download template yang sesuai dengan kasus Anda</li>
                <li>• Sesuaikan isi dengan fakta dan data yang ada</li>
                <li>• Gunakan bahasa yang sopan dan formal</li>
                <li>• Cantumkan bukti pendukung yang relevan</li>
                <li>• Berikan batas waktu yang wajar (minimal 7 hari)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {somasiTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Gratis
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Butuh Bantuan Lebih Lanjut?
          </h3>
          <p className="text-gray-700 mb-6">
            Konsultasikan kasus Anda dengan ahli hukum berpengalaman
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://peradi.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <FileText className="h-5 w-5" />
              Konsultasi dengan PERADI
            </a>
            <a 
              href="https://www.kemenkumham.go.id/berita/posbakum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl border-2 border-blue-600 hover:bg-blue-50 transition-all"
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
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Kembali ke Panduan
          </Link>
        </div>
      </div>
    </article>
  )
}