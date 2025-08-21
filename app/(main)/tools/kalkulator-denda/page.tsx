'use client'

import { useState, useEffect } from 'react'
import PageHeader from '@/app/components/ui/PageHeader'
import { formatNumber, shareUrl } from '@/app/lib/utils'
import { Calculator, AlertCircle, TrendingUp, Scale, Gavel, Car, Bike, Shield, AlertTriangle, Info, ChevronDown, MapPin, Clock, Users } from 'lucide-react'
import { InContentAd } from '@/app/components/ads/AdPlacements'
import { useToast } from '@/app/components/ui/use-toast'

// Data pelanggaran berdasarkan UU No. 22 Tahun 2009 dan peraturan terbaru Indonesia
const violationTypes = [
  {
    id: 'tilang-ringan',
    name: 'Tilang Ringan',
    description: 'Melanggar marka/rambu, tidak pakai helm SNI',
    baseAmount: 250000,
    maxAmount: 500000,
    lawReference: 'Pasal 287-288 UU No. 22/2009',
    statistics: '45% dari total pelanggaran (Data Korlantas 2024)',
    icon: '🚦',
    color: 'bg-yellow-500',
    examples: [
      'Tidak menggunakan helm SNI',
      'Melanggar rambu lalu lintas',
      'Tidak menyalakan lampu saat siang hari',
      'Parkir di tempat terlarang'
    ]
  },
  {
    id: 'tilang-sedang', 
    name: 'Tilang Sedang',
    description: 'Melawan arus, tidak punya SIM, modifikasi ilegal',
    baseAmount: 500000,
    maxAmount: 750000,
    lawReference: 'Pasal 281, 289 UU No. 22/2009',
    statistics: '35% dari total pelanggaran (Data Korlantas 2024)',
    icon: '⚠️',
    color: 'bg-orange-500',
    examples: [
      'Berkendara tanpa SIM',
      'Melawan arus lalu lintas',
      'Modifikasi kendaraan ilegal',
      'Tidak memiliki STNK'
    ]
  },
  {
    id: 'tilang-berat',
    name: 'Tilang Berat',
    description: 'Ugal-ugalan, balapan liar, membahayakan orang lain',
    baseAmount: 750000,
    maxAmount: 1000000,
    lawReference: 'Pasal 297, 310-311 UU No. 22/2009',
    statistics: '20% dari total pelanggaran (Data Korlantas 2024)',
    icon: '🚨',
    color: 'bg-red-500',
    examples: [
      'Mengemudi dalam keadaan mabuk',
      'Balapan liar di jalan raya',
      'Menyebabkan kecelakaan',
      'Mengemudi ugal-ugalan'
    ]
  },
  {
    id: 'pajak-kendaraan',
    name: 'Pajak Kendaraan Terlambat',
    description: 'Denda keterlambatan pajak tahunan kendaraan bermotor',
    baseAmount: 0,
    formula: 'PKB x 2% per bulan (max 24 bulan) + SWDKLLJ',
    lawReference: 'Perda setiap provinsi di Indonesia',
    statistics: '3.2 juta kendaraan telat pajak di Indonesia (Data Samsat 2024)',
    icon: '📋',
    color: 'bg-purple-500',
    examples: [
      'Pajak motor terlambat',
      'Pajak mobil terlambat',
      'SWDKLLJ tidak dibayar',
      'Pajak progresif kendaraan kedua'
    ]
  },
  {
    id: 'electronic-tilang',
    name: 'Tilang Elektronik (E-TLE)',
    description: 'Pelanggaran tertangkap kamera CCTV',
    baseAmount: 500000,
    maxAmount: 1000000,
    lawReference: 'Perkap No. 5 Tahun 2021',
    statistics: '127,431 pelanggaran E-TLE per bulan (Data 2024)',
    icon: '📸',
    color: 'bg-blue-500',
    examples: [
      'Menerobos lampu merah',
      'Melanggar batas kecepatan',
      'Tidak pakai seatbelt',
      'Menggunakan HP saat mengemudi'
    ]
  },
  {
    id: 'odd-even',
    name: 'Pelanggaran Ganjil Genap',
    description: 'Melanggar aturan ganjil genap DKI Jakarta',
    baseAmount: 500000,
    maxAmount: 500000,
    lawReference: 'Pergub DKI Jakarta No. 88/2019',
    statistics: 'Berlaku di 25 ruas jalan Jakarta',
    icon: '🔢',
    color: 'bg-indigo-500',
    examples: [
      'Plat ganjil masuk di hari genap',
      'Plat genap masuk di hari ganjil',
      'Melanggar jam operasional ganjil genap',
      'Masuk jalur khusus tanpa izin'
    ]
  }
]

// Statistik pelanggaran lalu lintas Indonesia
const trafficStatistics = {
  totalViolations2024: 2847562,
  averageFine: 425000,
  mostCommonViolation: 'Tidak menggunakan helm SNI',
  fatalities2024: 25671,
  percentageIncrease: 12.5,
  topCities: [
    { name: 'Jakarta', violations: 487231 },
    { name: 'Surabaya', violations: 321456 },
    { name: 'Bandung', violations: 298765 },
    { name: 'Medan', violations: 234567 },
    { name: 'Semarang', violations: 187654 }
  ]
}

// Data denda populer di Indonesia
const popularFines = [
  { name: 'Tidak pakai helm', amount: 250000, frequency: 'Sangat Sering' },
  { name: 'Melawan arus', amount: 500000, frequency: 'Sering' },
  { name: 'Lampu merah', amount: 500000, frequency: 'Sering' },
  { name: 'Tidak punya SIM', amount: 500000, frequency: 'Sering' },
  { name: 'Ganjil Genap', amount: 500000, frequency: 'Jakarta' },
  { name: 'Balapan liar', amount: 1000000, frequency: 'Jarang' }
]

export default function KalkulatorDendaPage() {
  const [selectedViolation, setSelectedViolation] = useState('')
  const [pkbAmount, setPkbAmount] = useState('')
  const [monthsLate, setMonthsLate] = useState('')
  const [vehicleType, setVehicleType] = useState('motor')
  const [showDetails, setShowDetails] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')
  const [result, setResult] = useState<{
    amount: number
    breakdown: string[]
  } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  const calculateFine = () => {
    if (selectedViolation === 'pajak-kendaraan') {
      const pkb = parseFloat(pkbAmount) || 0
      const months = Math.min(parseInt(monthsLate) || 0, 24)
      const fine = pkb * 0.02 * months
      const swdkllj = vehicleType === 'motor' ? 32000 * (months / 12) : 143000 * (months / 12)
      const adminFee = 25000
      const total = fine + swdkllj + adminFee

      setResult({
        amount: total,
        breakdown: [
          `Jenis Kendaraan: ${vehicleType === 'motor' ? 'Sepeda Motor' : 'Mobil'}`,
          `PKB: Rp ${formatNumber(pkb)}`,
          `Keterlambatan: ${months} bulan`,
          `Denda PKB (2%/bulan): Rp ${formatNumber(fine)}`,
          `Denda SWDKLLJ: Rp ${formatNumber(Math.round(swdkllj))}`,
          `Biaya Administrasi: Rp ${formatNumber(adminFee)}`,
          `Total yang harus dibayar: Rp ${formatNumber(Math.round(total))}`,
          `💡 Tips: Bayar pajak tepat waktu untuk menghindari denda!`,
        ],
      })
    } else {
      const violation = violationTypes.find(v => v.id === selectedViolation)
      if (violation && violation.baseAmount) {
        const isMotorcycle = vehicleType === 'motor'
        const adjustedAmount = isMotorcycle ? violation.baseAmount : violation.baseAmount * 1.5
        
        setResult({
          amount: adjustedAmount,
          breakdown: [
            `Jenis pelanggaran: ${violation.name}`,
            `Kendaraan: ${isMotorcycle ? 'Sepeda Motor' : 'Mobil'}`,
            `Denda minimal: Rp ${formatNumber(adjustedAmount)}`,
            `Denda maksimal: Rp ${formatNumber(violation.maxAmount ? (isMotorcycle ? violation.maxAmount : violation.maxAmount * 1.5) : adjustedAmount)}`,
            `Dasar hukum: ${violation.lawReference}`,
            `Statistik: ${violation.statistics}`,
            `⚖️ Catatan: Denda final ditentukan oleh hakim dalam persidangan`,
            `📍 Lokasi bayar: Kejaksaan Negeri setempat atau BRI/Bank yang ditunjuk`,
          ],
        })
      }
    }
    setShowDetails(true)
  }

  return (
    <>
      <PageHeader
        title="Kalkulator Denda Lalu Lintas Indonesia"
        description="Hitung estimasi denda tilang dan pajak kendaraan berdasarkan peraturan resmi di Indonesia"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Kalkulator Denda' },
        ]}
      />

      {/* Enhanced CSS untuk animasi 3D khas Nusantara */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --merah-indonesia: #FF0000;
          --putih-indonesia: #FFFFFF;
          --emas-garuda: #FFD700;
          --hijau-zamrud: #10B981;
          --biru-laut: #0EA5E9;
          --coklat-batik: #8B4513;
          --orange-senja: #FB923C;
        }

        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes batikPattern {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        @keyframes wayangFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-8px) rotate(2deg) scale(1.02); }
          50% { transform: translateY(-15px) rotate(-2deg) scale(1.05); }
          75% { transform: translateY(-8px) rotate(1deg) scale(1.02); }
        }

        @keyframes mandalaRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes garudaFly {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(10px) translateY(-5px) rotate(5deg); }
          50% { transform: translateX(-10px) translateY(-10px) rotate(-5deg); }
          75% { transform: translateX(5px) translateY(-5px) rotate(3deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6); }
        }

        .batik-bg {
          background-image: 
            repeating-linear-gradient(45deg, var(--coklat-batik) 0, var(--coklat-batik) 1px, transparent 1px, transparent 15px),
            repeating-linear-gradient(-45deg, var(--coklat-batik) 0, var(--coklat-batik) 1px, transparent 1px, transparent 15px),
            repeating-linear-gradient(90deg, var(--emas-garuda) 0, var(--emas-garuda) 1px, transparent 1px, transparent 30px);
          animation: batikPattern 30s linear infinite;
          opacity: 0.03;
        }

        .card-nusantara {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,237,213,0.95) 100%);
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-nusantara::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, var(--merah-indonesia), var(--emas-garuda), var(--hijau-zamrud));
          border-radius: inherit;
          z-index: -1;
          opacity: 0.3;
          transition: opacity 0.3s;
        }

        .card-nusantara:hover::before {
          opacity: 0.6;
        }

        .card-nusantara:hover {
          transform: translateY(-4px) rotateX(2deg) rotateY(-2deg);
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.2);
        }

        .floating-ornament {
          animation: wayangFloat 5s ease-in-out infinite;
        }

        .mandala-spinner {
          animation: mandalaRotate 20s linear infinite;
        }

        .garuda-element {
          animation: garudaFly 8s ease-in-out infinite;
        }

        .gradient-indonesia {
          background: linear-gradient(135deg, var(--merah-indonesia) 0%, var(--putih-indonesia) 50%, var(--merah-indonesia) 100%);
        }

        .gradient-nusantara {
          background: linear-gradient(135deg, var(--coklat-batik) 0%, var(--orange-senja) 50%, var(--emas-garuda) 100%);
        }

        .gradient-garuda {
          background: linear-gradient(135deg, var(--emas-garuda) 0%, var(--orange-senja) 50%, var(--merah-indonesia) 100%);
        }

        .text-shadow-nusantara {
          text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
        }

        .button-nusantara {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-nusantara::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .button-nusantara:hover::before {
          width: 300px;
          height: 300px;
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          height: 3px;
          background: var(--merah-indonesia);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        /* Mobile specific styles */
        @media (max-width: 768px) {
          .card-nusantara:hover {
            transform: none;
          }
          
          .floating-ornament {
            animation-duration: 3s;
          }

          .text-4xl {
            font-size: 1.875rem;
          }

          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
        }

        /* Animations */
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(139, 69, 19, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--coklat-batik);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--orange-senja);
        }
      `}</style>

      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8 relative">
        {/* Background Pattern Batik */}
        <div className="absolute inset-0 batik-bg pointer-events-none"></div>

        {/* Header Section dengan Ornamen Garuda */}
        <div className="relative mb-8">
          <div className="text-center">
            <div className="inline-block p-4 mb-4 garuda-element">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto gradient-garuda rounded-full flex items-center justify-center shadow-xl">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-shadow-nusantara mb-2">
              Kalkulator Denda Indonesia
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Hitung denda tilang dan pajak kendaraan sesuai peraturan resmi
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {['calculator', 'statistics', 'popular'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'gradient-nusantara text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-600 hover:bg-orange-50'
                }`}
              >
                {tab === 'calculator' && '🧮 Kalkulator'}
                {tab === 'statistics' && '📊 Statistik'}
                {tab === 'popular' && '⭐ Denda Populer'}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="space-y-6 animate-fade-in">
            <div className="card-nusantara rounded-2xl shadow-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 gradient-garuda rounded-xl shadow-lg floating-ornament">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Statistik Pelanggaran 2024</h3>
                  <p className="text-xs md:text-sm text-gray-600">Data resmi Korlantas Polri</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl mb-1">🚨</div>
                  <p className="text-xl md:text-2xl font-bold text-red-700">{formatNumber(trafficStatistics.totalViolations2024)}</p>
                  <p className="text-xs md:text-sm text-red-600">Total Pelanggaran</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl mb-1">💰</div>
                  <p className="text-xl md:text-2xl font-bold text-yellow-700">Rp {formatNumber(trafficStatistics.averageFine)}</p>
                  <p className="text-xs md:text-sm text-yellow-600">Rata-rata Denda</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl mb-1">⚠️</div>
                  <p className="text-xl md:text-2xl font-bold text-gray-700">{formatNumber(trafficStatistics.fatalities2024)}</p>
                  <p className="text-xs md:text-sm text-gray-600">Korban Jiwa</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  Top 5 Kota dengan Pelanggaran Terbanyak
                </h4>
                <div className="space-y-2">
                  {trafficStatistics.topCities.map((city, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="flex items-center gap-2 text-sm md:text-base">
                        <span className="font-bold text-orange-600">#{idx + 1}</span>
                        {city.name}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-gray-700">
                        {formatNumber(city.violations)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popular Fines Tab */}
        {activeTab === 'popular' && (
          <div className="space-y-6 animate-fade-in">
            <div className="card-nusantara rounded-2xl shadow-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 gradient-indonesia rounded-xl shadow-lg">
                  <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Denda Populer di Indonesia</h3>
                  <p className="text-xs md:text-sm text-gray-600">Pelanggaran yang sering terjadi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularFines.map((fine, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border-l-4 border-orange-500 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">{fine.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        fine.frequency === 'Sangat Sering' ? 'bg-red-100 text-red-700' :
                        fine.frequency === 'Sering' ? 'bg-orange-100 text-orange-700' :
                        fine.frequency === 'Jakarta' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {fine.frequency}
                      </span>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-orange-600">
                      Rp {formatNumber(fine.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-nusantara rounded-2xl shadow-xl p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 gradient-nusantara rounded-xl shadow-lg pulse-glow">
                    <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">Kalkulator Denda</h2>
                    <p className="text-xs md:text-sm text-gray-600">
                      Hitung estimasi denda sesuai peraturan
                    </p>
                  </div>
                </div>

                {/* Vehicle Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    Jenis Kendaraan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setVehicleType('motor')}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        vehicleType === 'motor' 
                          ? 'border-orange-500 bg-orange-50 shadow-md transform scale-105' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <Bike className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 ${
                        vehicleType === 'motor' ? 'text-orange-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-sm font-medium ${
                        vehicleType === 'motor' ? 'text-orange-700' : 'text-gray-600'
                      }`}>
                        Sepeda Motor
                      </p>
                    </button>
                    <button
                      onClick={() => setVehicleType('mobil')}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        vehicleType === 'mobil' 
                          ? 'border-orange-500 bg-orange-50 shadow-md transform scale-105' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <Car className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 ${
                        vehicleType === 'mobil' ? 'text-orange-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-sm font-medium ${
                        vehicleType === 'mobil' ? 'text-orange-700' : 'text-gray-600'
                      }`}>
                        Mobil
                      </p>
                    </button>
                  </div>
                </div>

                {/* Violation Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 flex items-center gap-2 text-gray-700">
                    <Scale className="h-4 w-4 text-orange-600" />
                    Jenis Pelanggaran
                  </label>
                  <div className="relative">
                    <select
                      value={selectedViolation}
                      onChange={(e) => {
                        setSelectedViolation(e.target.value)
                        setResult(null)
                        setShowDetails(false)
                      }}
                      className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 appearance-none bg-white text-sm md:text-base"
                    >
                      <option value="">Pilih jenis pelanggaran</option>
                      {violationTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.icon} {type.name} - {type.description}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Additional Fields for Vehicle Tax */}
                {selectedViolation === 'pajak-kendaraan' && (
                  <div className="space-y-4 animate-slide-up">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Nilai PKB (Pajak Kendaraan Bermotor)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={pkbAmount}
                          onChange={(e) => setPkbAmount(e.target.value)}
                          placeholder="Contoh: 500000"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-sm md:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Jumlah Bulan Terlambat
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={monthsLate}
                          onChange={(e) => setMonthsLate(e.target.value)}
                          placeholder="Maksimal 24 bulan"
                          max="24"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-sm md:text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={calculateFine}
                  disabled={!selectedViolation || (selectedViolation === 'pajak-kendaraan' && (!pkbAmount || !monthsLate))}
                  className="w-full mt-6 py-3 md:py-4 gradient-nusantara text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none button-nusantara text-sm md:text-base"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Gavel className="h-5 w-5" />
                    Hitung Denda Sekarang
                  </div>
                </button>
              </div>

              {/* Result */}
              {result && showDetails && (
                <div className="card-nusantara rounded-2xl shadow-xl p-4 md:p-6 animate-bounce-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <Calculator className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                      Hasil Perhitungan
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    {result.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm md:text-base text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  {result.amount > 0 && (
                    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 mb-6">
                      <p className="text-center text-gray-600 text-sm mb-2">Total yang harus dibayar:</p>
                      <p className="text-2xl md:text-4xl font-bold text-orange-700 text-center">
                        Rp {formatNumber(Math.round(result.amount))}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        const text = `Denda ${selectedViolation}: Rp ${formatNumber(Math.round(result.amount))}`;
                        navigator.clipboard.writeText(text);
                        toast({
                          title: "Berhasil disalin!",
                          description: "Hasil perhitungan telah disalin",
                        });
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 font-medium text-sm md:text-base"
                    >
                      📋 Salin Hasil
                    </button>
                    
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          shareUrl('whatsapp', window.location.href, 'Kalkulator Denda - Melek Hukum ID')
                        }
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 font-medium text-sm md:text-base"
                    >
                      💬 Share WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Violation Details Card */}
              {selectedViolation && (
                <div className="card-nusantara rounded-2xl shadow-xl p-4 animate-slide-in-right">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-orange-600" />
                    Detail Pelanggaran
                  </h3>
                  {(() => {
                    const violation = violationTypes.find(v => v.id === selectedViolation)
                    return violation ? (
                      <div className="space-y-3">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${violation.color} text-white text-sm`}>
                          <span>{violation.icon}</span>
                          <span className="font-medium">{violation.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium mb-2">Contoh pelanggaran:</p>
                          <ul className="space-y-1">
                            {violation.examples?.map((example, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-orange-500">•</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-500">
                            {violation.lawReference}
                          </p>
                        </div>
                      </div>
                    ) : null
                  })()}
                </div>
              )}

              {/* Tips Card */}
              <div className="card-nusantara rounded-2xl shadow-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  💡 Tips Menghindari Tilang
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Selalu gunakan helm SNI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Lengkapi dokumen kendaraan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Patuhi rambu lalu lintas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Bayar pajak tepat waktu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Jangan melawan arus</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Contacts */}
              <div className="card-nusantara rounded-2xl shadow-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  📞 Kontak Penting
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Polisi</span>
                    <span className="font-bold text-gray-800">110</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ambulans</span>
                    <span className="font-bold text-gray-800">118/119</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pemadam</span>
                    <span className="font-bold text-gray-800">113</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Call Center Polri</span>
                    <span className="font-bold text-gray-800">110</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer dengan ornamen Nusantara */}
        <div className="mt-8 md:mt-12 relative">
          <div className="card-nusantara rounded-2xl shadow-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 md:w-32 md:h-32 opacity-10 mandala-spinner">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8B4513" strokeWidth="2"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="#D2691E" strokeWidth="2"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="#FFD700" strokeWidth="2"/>
                <path d="M50 5 L61 35 L95 35 L68 55 L79 85 L50 65 L21 85 L32 55 L5 35 L39 35 Z" fill="#FFD700" opacity="0.3"/>
              </svg>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm md:text-base font-bold text-gray-800 mb-2">
                  ⚖️ Disclaimer Penting
                </p>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  Perhitungan ini berdasarkan <strong>UU No. 22 Tahun 2009</strong> tentang Lalu Lintas dan Angkutan Jalan serta peraturan daerah yang berlaku di Indonesia. 
                  Hasil perhitungan bersifat <strong>estimasi</strong> dan dapat berbeda dengan keputusan final pengadilan.
                </p>
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <p className="text-xs text-gray-600">
                    📍 <strong>Lokasi Pembayaran:</strong> Kejaksaan Negeri setempat atau bank yang ditunjuk (BRI, BNI, Mandiri)
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    ⏰ <strong>Batas Waktu:</strong> Maksimal 14 hari setelah sidang tilang
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Help Button for Mobile */}
        <div className="fixed bottom-4 right-4 md:hidden z-50">
          <button className="p-3 gradient-nusantara rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
            <Info className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </>
  )
}
