import { dataRegulasi } from '../../lib/data'
import RegulasiList from '../../components/regulasi/RegulasiList'
import type { Regulasi } from '../../lib/data'
import { Calendar, FileText, Gavel, Building2, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react'

export default function RegulasiPage() {
  // Calculate detailed statistics
  const totalRegulasi = dataRegulasi.length
  const regulasiBerlaku = dataRegulasi.filter((r: Regulasi) => r.status === 'Berlaku').length
  const regulasiDiubah = dataRegulasi.filter((r: Regulasi) => r.status === 'Diubah').length
  const regulasiDicabut = dataRegulasi.filter((r: Regulasi) => r.status === 'Dicabut').length

  // Calculate percentage
  const persentaseBerlaku = ((regulasiBerlaku / totalRegulasi) * 100).toFixed(1)
  const persentaseDiubah = ((regulasiDiubah / totalRegulasi) * 100).toFixed(1)
  const persentaseDicabut = ((regulasiDicabut / totalRegulasi) * 100).toFixed(1)

  // Group by category
  const categoryStats = dataRegulasi.reduce((acc: Record<string, number>, reg: Regulasi) => {
    acc[reg.kategori] = (acc[reg.kategori] || 0) + 1
    return acc
  }, {})

  // Get most active category
  const mostActiveCategory = Object.entries(categoryStats).sort(([,a], [,b]) => b - a)[0]

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Animated Batik Pattern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] animate-pattern-float" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='batik' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='20' fill='none' stroke='%23964B00' stroke-width='2'/%3E%3Ccircle cx='25' cy='25' r='15' fill='none' stroke='%23B87333' stroke-width='1.5'/%3E%3Ccircle cx='25' cy='25' r='10' fill='none' stroke='%23D2691E' stroke-width='1'/%3E%3Ccircle cx='25' cy='25' r='5' fill='%23964B00' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23batik)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        <div className="absolute inset-0 opacity-[0.02] animate-pattern-slide" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23964B00' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Wayang-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-amber-600 to-red-600"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 transform translate-x-1/2 translate-y-1/2 animate-spin-reverse">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-red-600 to-amber-600"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-10 lg:py-14">
        {/* Enhanced Header with Animation */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-red-700 to-amber-900 mb-4 animate-gradient-x">
              Database Peraturan Hukum Indonesia
            </h1>
            {/* Traditional ornament */}
            <div className="absolute -top-6 -left-6 w-12 h-12 opacity-20 animate-pulse">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-600">
                <path d="M50 5 L61 39 L95 39 L68 60 L79 94 L50 72 L21 94 L32 60 L5 39 L39 39 Z"/>
              </svg>
            </div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 opacity-20 animate-pulse animation-delay-500">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-600">
                <path d="M50 5 L61 39 L95 39 L68 60 L79 94 L50 72 L21 94 L32 60 L5 39 L39 39 Z"/>
              </svg>
            </div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto mt-4 animate-fade-in animation-delay-200">
            Kumpulan peraturan perundang-undangan Republik Indonesia yang lengkap, terstruktur, dan terpercaya
          </p>
          <div className="mt-6 flex justify-center animate-fade-in animation-delay-400">
            <div className="h-1 w-32 bg-gradient-to-r from-amber-600 to-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Stats Summary with 3D Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 max-w-6xl mx-auto">
          {/* Total Peraturan Card */}
          <div className="group perspective-1000 animate-fade-in-up animation-delay-200">
            <div className="relative transform transition-all duration-500 group-hover:rotate-y-10 group-hover:-translate-y-2">
              <div className="bg-gradient-to-br from-white/90 to-amber-50/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-amber-300/50 shadow-xl group-hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mb-2 group-hover:animate-bounce" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-800 mb-1">{totalRegulasi}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Peraturan</div>
                  <div className="text-xs text-gray-500 mt-1">Dalam Database</div>
                </div>
              </div>
            </div>
          </div>

          {/* Berlaku Card */}
          <div className="group perspective-1000 animate-fade-in-up animation-delay-300">
            <div className="relative transform transition-all duration-500 group-hover:rotate-y-10 group-hover:-translate-y-2">
              <div className="bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-green-300/50 shadow-xl group-hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2 group-hover:animate-bounce" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-1">{regulasiBerlaku}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Berlaku</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{persentaseBerlaku}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Diubah Card */}
          <div className="group perspective-1000 animate-fade-in-up animation-delay-400">
            <div className="relative transform transition-all duration-500 group-hover:rotate-y-10 group-hover:-translate-y-2">
              <div className="bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-orange-300/50 shadow-xl group-hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mb-2 group-hover:animate-bounce" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-700 mb-1">{regulasiDiubah}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Diubah</div>
                  <div className="text-xs text-orange-600 font-medium mt-1">{persentaseDiubah}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dicabut Card */}
          <div className="group perspective-1000 animate-fade-in-up animation-delay-500">
            <div className="relative transform transition-all duration-500 group-hover:rotate-y-10 group-hover:-translate-y-2">
              <div className="bg-gradient-to-br from-white/90 to-red-50/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-red-300/50 shadow-xl group-hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Gavel className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-2 group-hover:animate-bounce" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 mb-1">{regulasiDicabut}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Dicabut</div>
                  <div className="text-xs text-red-600 font-medium mt-1">{persentaseDicabut}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics Section */}
        <div className="mb-8 sm:mb-12 max-w-6xl mx-auto animate-fade-in-up animation-delay-600">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-4 sm:p-6 lg:p-8 border border-amber-200/50 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-600" />
              Analisis & Insight
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Most Active Category */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50">
                <Building2 className="w-6 h-6 text-amber-600 mb-2" />
                <h3 className="font-semibold text-gray-700 mb-1">Kategori Terbanyak</h3>
                <p className="text-2xl font-bold text-amber-800">{mostActiveCategory?.[0]}</p>
                <p className="text-sm text-gray-600">{mostActiveCategory?.[1]} peraturan</p>
              </div>

              {/* Compliance Rate */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-700 mb-1">Tingkat Kepatuhan</h3>
                <p className="text-2xl font-bold text-green-800">{persentaseBerlaku}%</p>
                <p className="text-sm text-gray-600">Peraturan aktif berlaku</p>
              </div>

              {/* Update Frequency */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
                <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-700 mb-1">Pembaruan Regulasi</h3>
                <p className="text-2xl font-bold text-blue-800">{regulasiDiubah}</p>
                <p className="text-sm text-gray-600">Peraturan diperbarui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulasi List */}
        <RegulasiList dataRegulasi={dataRegulasi} />
      </div>
    </main>
  )
}
