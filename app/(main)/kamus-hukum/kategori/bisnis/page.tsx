import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building, 
  Scale, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Globe,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kamus Hukum Bisnis - Kategori Bisnis | Bicara Hukum',
  description: 'Kumpulan lengkap istilah-istilah hukum bisnis Indonesia. Pelajari definisi, contoh, dan dasar hukum dari berbagai aspek hukum bisnis dan korporasi.',
  keywords: [
    'kamus hukum bisnis',
    'istilah hukum bisnis',
    'hukum korporasi',
    'hukum perusahaan',
    'definisi hukum bisnis',
    'terminologi bisnis'
  ],
  openGraph: {
    title: 'Kamus Hukum Bisnis - Kategori Bisnis',
    description: 'Kumpulan lengkap istilah-istilah hukum bisnis Indonesia dengan definisi dan contoh praktis',
    type: 'website',
    locale: 'id_ID',
  },
  alternates: {
    canonical: 'https://bicarahukum.my.id/kamus-hukum/kategori/bisnis/',
  },
};

const businessCategories = [
  {
    id: 'corporate',
    title: 'Hukum Korporasi',
    description: 'Istilah-istilah terkait pendirian, pengelolaan, dan struktur perusahaan',
    icon: Building,
    count: 45,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    examples: ['Akuisisi', 'Merger', 'Direksi', 'RUPS']
  },
  {
    id: 'contracts',
    title: 'Kontrak & Perjanjian',
    description: 'Terminologi dalam pembuatan dan pelaksanaan kontrak bisnis',
    icon: BookOpen,
    count: 38,
    color: 'bg-green-50 text-green-600 border-green-200',
    examples: ['Force Majeure', 'Addendum', 'Wanprestasi', 'Due Diligence']
  },
  {
    id: 'finance',
    title: 'Keuangan & Investasi',
    description: 'Istilah-istilah dalam bidang keuangan perusahaan dan investasi',
    icon: TrendingUp,
    count: 52,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    examples: ['Cash Flow', 'Dividend', 'Bond', 'Credit Rating']
  },
  {
    id: 'compliance',
    title: 'Kepatuhan & Tata Kelola',
    description: 'Terminologi terkait compliance dan corporate governance',
    icon: Shield,
    count: 31,
    color: 'bg-red-50 text-red-600 border-red-200',
    examples: ['GCG', 'Compliance', 'Risk Management', 'Anti Monopoli']
  },
  {
    id: 'accounting',
    title: 'Akuntansi & Audit',
    description: 'Istilah-istilah dalam bidang akuntansi dan pemeriksaan keuangan',
    icon: Users,
    count: 29,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    examples: ['Balance Sheet', 'Audit', 'Amortisasi', 'PSAK']
  },
  {
    id: 'trade',
    title: 'Perdagangan & Ekspor',
    description: 'Terminologi dalam perdagangan domestik dan internasional',
    icon: Globe,
    count: 24,
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    examples: ['Export', 'Import', 'Dumping', 'Free Trade']
  },
  {
    id: 'intellectual-property',
    title: 'Kekayaan Intelektual',
    description: 'Istilah-istilah terkait perlindungan kekayaan intelektual',
    icon: Award,
    count: 18,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    examples: ['Copyright', 'Patent', 'Trademark', 'Trade Secret']
  },
  {
    id: 'employment',
    title: 'Ketenagakerjaan',
    description: 'Terminologi dalam hubungan industrial dan ketenagakerjaan',
    icon: Users,
    count: 22,
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    examples: ['PHK', 'Outsourcing', 'ESOP', 'Severance Pay']
  }
];

export default function BusinessCategoryPage() {
  const totalTerms = businessCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Scale className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kamus Hukum Bisnis
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Kumpulan lengkap {totalTerms}+ istilah hukum bisnis Indonesia dengan definisi yang jelas, 
              contoh praktis, dan dasar hukum yang akurat
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm text-blue-100">Definisi Lengkap</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm text-blue-100">Contoh Praktis</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm text-blue-100">Dasar Hukum</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <ArrowRight className="h-4 w-4" />
            <Link href="/kamus-hukum" className="hover:text-blue-600">Kamus Hukum</Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Kategori Bisnis</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Akses Cepat Kamus Hukum Bisnis
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pilih cara yang paling sesuai untuk mengeksplorasi istilah-istilah hukum bisnis
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/kamus-hukum/kategori/bisnis/istilah"
                className="group bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      Jelajahi Semua Istilah
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Akses lengkap {totalTerms} istilah hukum bisnis dengan pencarian dan filter
                    </p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Panduan Penggunaan
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Tips dan cara efektif menggunakan kamus hukum bisnis
                    </p>
                  </div>
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kategori Hukum Bisnis
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Istilah-istilah hukum bisnis telah dikategorikan berdasarkan bidang spesialisasi 
              untuk memudahkan pencarian dan pembelajaran
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl border-2 ${category.color} mb-6`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Jumlah Istilah</span>
                        <span className="text-sm font-bold text-gray-900">{category.count}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Contoh: {category.examples.join(', ')}
                      </div>
                    </div>
                    
                    <Link
                      href={`/kamus-hukum/kategori/bisnis/istilah?kategori=${category.id}`}
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 group"
                    >
                      Lihat Istilah
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl text-white p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Butuh Bantuan Hukum Bisnis?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan hukum bisnis Anda dengan tim ahli kami. 
                Dapatkan solusi yang tepat untuk perkembangan usaha Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/konsultasi"
                  className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Konsultasi Gratis
                </Link>
                <Link
                  href="/artikel?kategori=hukum-bisnis"
                  className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  Baca Artikel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}