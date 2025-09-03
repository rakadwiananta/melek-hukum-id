import { Metadata } from 'next'
import { Download, FileText, CheckCircle, AlertTriangle, Info, Briefcase } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Template Surat Kuasa Lengkap - Download Gratis',
  description: 'Download template surat kuasa untuk berbagai keperluan: umum, khusus, notaris, dan lainnya. Template siap pakai dan gratis.',
}

const suratKuasaTemplates = [
  {
    id: 'surat-kuasa-umum',
    title: 'Surat Kuasa Umum',
    description: 'Template untuk pemberian kuasa secara umum',
    category: 'Umum',
    format: 'DOCX & PDF',
    size: '38 KB',
    downloads: 2156,
    updated: '2024-01-20',
  },
  {
    id: 'surat-kuasa-khusus',
    title: 'Surat Kuasa Khusus',
    description: 'Template untuk pemberian kuasa secara khusus',
    category: 'Khusus',
    format: 'DOCX & PDF',
    size: '42 KB',
    downloads: 1893,
    updated: '2024-01-18',
  },
  {
    id: 'surat-kuasa-notaris',
    title: 'Surat Kuasa Notaris',
    description: 'Template untuk kuasa yang memerlukan notaris',
    category: 'Notaris',
    format: 'DOCX & PDF',
    size: '45 KB',
    downloads: 1247,
    updated: '2024-01-15',
  },
  {
    id: 'surat-kuasa-properti',
    title: 'Surat Kuasa Properti',
    description: 'Template untuk urusan properti dan tanah',
    category: 'Properti',
    format: 'DOCX & PDF',
    size: '48 KB',
    downloads: 892,
    updated: '2024-01-12',
  },
  {
    id: 'surat-kuasa-bisnis',
    title: 'Surat Kuasa Bisnis',
    description: 'Template untuk urusan bisnis dan perusahaan',
    category: 'Bisnis',
    format: 'DOCX & PDF',
    size: '41 KB',
    downloads: 756,
    updated: '2024-01-10',
  },
  {
    id: 'surat-kuasa-pengadilan',
    title: 'Surat Kuasa Pengadilan',
    description: 'Template untuk urusan pengadilan dan hukum',
    category: 'Pengadilan',
    format: 'DOCX & PDF',
    size: '44 KB',
    downloads: 634,
    updated: '2024-01-08',
  },
  {
    id: 'surat-kuasa-bank',
    title: 'Surat Kuasa Bank',
    description: 'Template untuk urusan perbankan',
    category: 'Bank',
    format: 'DOCX & PDF',
    size: '39 KB',
    downloads: 521,
    updated: '2024-01-05',
  },
  {
    id: 'surat-kuasa-pencabutan',
    title: 'Surat Pencabutan Kuasa',
    description: 'Template untuk mencabut kuasa yang telah diberikan',
    category: 'Pencabutan',
    format: 'DOCX & PDF',
    size: '35 KB',
    downloads: 423,
    updated: '2024-01-03',
  },
]

export default function SuratKuasaTemplatesPage() {
  return (
    <article className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Template Surat Kuasa Lengkap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download template surat kuasa profesional untuk berbagai keperluan. 
            Template siap pakai, mudah disesuaikan, dan gratis.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Panduan Penggunaan</h3>
              <ul className="text-orange-800 space-y-1 text-sm">
                <li>• Download template yang sesuai dengan keperluan Anda</li>
                <li>• Sesuaikan isi dengan data pemberi dan penerima kuasa</li>
                <li>• Cantumkan ruang lingkup kuasa secara jelas</li>
                <li>• Tentukan batas waktu berlaku kuasa</li>
                <li>• Gunakan materai jika diperlukan (Rp 10.000)</li>
                <li>• Untuk urusan penting, pertimbangkan notaris</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {suratKuasaTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
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
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Gratis
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Butuh Bantuan Lebih Lanjut?
          </h3>
          <p className="text-gray-700 mb-6">
            Konsultasikan kebutuhan surat kuasa Anda dengan ahli hukum berpengalaman
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://peradi.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Briefcase className="h-5 w-5" />
              Konsultasi dengan PERADI
            </a>
            <a 
              href="https://www.ini.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl border-2 border-orange-600 hover:bg-orange-50 transition-all"
            >
              <FileText className="h-5 w-5" />
              Konsultasi Notaris
            </a>
          </div>
        </div>

        {/* Back to Panduan */}
        <div className="text-center mt-12">
          <Link 
            href="/panduan"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Kembali ke Panduan
          </Link>
        </div>
      </div>
    </article>
  )
}