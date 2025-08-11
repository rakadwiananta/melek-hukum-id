'use client'

import { useState, useEffect } from 'react'
import PageHeader from '@/app/components/ui/PageHeader'
import { formatNumber, shareUrl } from '@/app/lib/utils'
import { Calculator, AlertCircle, TrendingUp, Scale, Gavel } from 'lucide-react'
import { InContentAd } from '@/app/components/ads/AdPlacements'
import { useToast } from '@/app/components/ui/use-toast'

// Data pelanggaran berdasarkan UU No. 22 Tahun 2009 dan peraturan terbaru
const violationTypes = [
  {
    id: 'tilang-ringan',
    name: 'Tilang Ringan',
    description: 'Melanggar marka/rambu, tidak pakai helm',
    baseAmount: 250000,
    maxAmount: 500000,
    lawReference: 'Pasal 287-288 UU LLAJ',
    statistics: '45% dari total pelanggaran (Data Korlantas 2024)',
  },
  {
    id: 'tilang-sedang', 
    name: 'Tilang Sedang',
    description: 'Melawan arus, tidak punya SIM',
    baseAmount: 500000,
    maxAmount: 750000,
    lawReference: 'Pasal 281, 289 UU LLAJ',
    statistics: '35% dari total pelanggaran (Data Korlantas 2024)',
  },
  {
    id: 'tilang-berat',
    name: 'Tilang Berat',
    description: 'Ugal-ugalan, membahayakan orang lain',
    baseAmount: 750000,
    maxAmount: 1000000,
    lawReference: 'Pasal 297, 310-311 UU LLAJ',
    statistics: '20% dari total pelanggaran (Data Korlantas 2024)',
  },
  {
    id: 'pajak-kendaraan',
    name: 'Pajak Kendaraan Terlambat',
    description: 'Denda keterlambatan pajak tahunan',
    baseAmount: 0,
    formula: 'PKB x 2% per bulan (max 24 bulan) + SWDKLLJ',
    lawReference: 'Perda setiap provinsi',
    statistics: '3.2 juta kendaraan telat pajak di Indonesia (Data Samsat 2024)',
  },
]

// Statistik pelanggaran lalu lintas
const trafficStatistics = {
  totalViolations2024: 2847562,
  averageFine: 425000,
  mostCommonViolation: 'Tidak menggunakan helm SNI',
  fatalities2024: 25671,
  percentageIncrease: 12.5,
}

export default function KalkulatorDendaPage() {
  const [selectedViolation, setSelectedViolation] = useState('')
  const [pkbAmount, setPkbAmount] = useState('')
  const [monthsLate, setMonthsLate] = useState('')
  const [result, setResult] = useState<{
    amount: number
    breakdown: string[]
  } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Animasi masuk halaman
    setIsAnimating(true)
  }, [])

  const calculateFine = () => {
    if (selectedViolation === 'pajak-kendaraan') {
      const pkb = parseFloat(pkbAmount) || 0
      const months = Math.min(parseInt(monthsLate) || 0, 24)
      const fine = pkb * 0.02 * months
      const swdkllj = 32000 * (months / 12)
      const total = fine + swdkllj

      setResult({
        amount: total,
        breakdown: [
          `PKB: Rp ${formatNumber(pkb)}`,
          `Bulan terlambat: ${months} bulan`,
          `Denda PKB (2%/bulan): Rp ${formatNumber(fine)}`,
          `Denda SWDKLLJ: Rp ${formatNumber(Math.round(swdkllj))}`,
          `Total denda: Rp ${formatNumber(Math.round(total))}`,
          `Dasar hukum: Peraturan Daerah tentang Pajak Kendaraan Bermotor`,
        ],
      })
    } else {
      const violation = violationTypes.find(v => v.id === selectedViolation)
      if (violation && violation.baseAmount) {
        setResult({
          amount: violation.baseAmount,
          breakdown: [
            `Jenis pelanggaran: ${violation.name}`,
            `Denda minimal: Rp ${formatNumber(violation.baseAmount)}`,
            `Denda maksimal: Rp ${formatNumber(violation.maxAmount || violation.baseAmount)}`,
            `Dasar hukum: ${violation.lawReference}`,
            `Statistik: ${violation.statistics}`,
            'Denda final ditentukan oleh hakim dalam persidangan',
          ],
        })
      }
    }
  }

  return (
    <>
      <PageHeader
        title="Kalkulator Denda"
        description="Hitung estimasi denda untuk berbagai pelanggaran berdasarkan data resmi"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Kalkulator Denda' },
        ]}
      />

      {/* CSS untuk animasi 3D khas nusantara */}
      <style jsx global>{`
        @keyframes batikPattern {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        @keyframes wayangFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateY(180deg); }
        }

        @keyframes mandalaRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .batik-bg {
          background-image: 
            repeating-linear-gradient(45deg, #8B4513 0, #8B4513 1px, transparent 1px, transparent 15px),
            repeating-linear-gradient(-45deg, #8B4513 0, #8B4513 1px, transparent 1px, transparent 15px);
          animation: batikPattern 20s linear infinite;
          opacity: 0.05;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .card-3d:hover {
          transform: rotateY(5deg) rotateX(-5deg) scale(1.02);
        }

        .floating-ornament {
          animation: wayangFloat 4s ease-in-out infinite;
        }

        .mandala-spinner {
          animation: mandalaRotate 15s linear infinite;
        }

        .gradient-nusantara {
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #FFD700 100%);
        }

        @media (max-width: 768px) {
          .card-3d:hover {
            transform: none;
          }
        }

        /* Additional animations */
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>

      <div className="container-padding mx-auto max-w-3xl py-8 relative">
        {/* Background Pattern Batik */}
        <div className="absolute inset-0 batik-bg pointer-events-none"></div>

        {/* Statistik Pelanggaran Card */}
        <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-6 mb-8 card-3d relative overflow-hidden ${isAnimating ? 'animate-slide-in' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="mandala-spinner">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8B4513" strokeWidth="2"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="#D2691E" strokeWidth="2"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="#FFD700" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 gradient-nusantara rounded-lg floating-ornament">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Statistik Pelanggaran 2024</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur">
              <p className="text-2xl font-bold text-orange-700">{formatNumber(trafficStatistics.totalViolations2024)}</p>
              <p className="text-sm text-gray-600">Total Pelanggaran</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur">
              <p className="text-2xl font-bold text-orange-700">Rp {formatNumber(trafficStatistics.averageFine)}</p>
              <p className="text-sm text-gray-600">Rata-rata Denda</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur">
              <p className="text-2xl font-bold text-red-700">{formatNumber(trafficStatistics.fatalities2024)}</p>
              <p className="text-sm text-gray-600">Korban Jiwa</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mt-4 text-center">
            *Data dari Korlantas Polri per November 2024
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 card-3d relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 gradient-nusantara rounded-lg shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Kalkulator Denda</h2>
              <p className="text-sm text-gray-600">
                Hitung estimasi denda berdasarkan peraturan resmi
              </p>
            </div>
          </div>

          {/* Violation Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Scale className="h-4 w-4 text-orange-600" />
              Jenis Pelanggaran
            </label>
            <select
              value={selectedViolation}
              onChange={(e) => {
                setSelectedViolation(e.target.value)
                setResult(null)
              }}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
            >
              <option value="">Pilih jenis pelanggaran</option>
              {violationTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} - {type.description}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Fields for Vehicle Tax */}
          {selectedViolation === 'pajak-kendaraan' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nilai PKB (Pajak Kendaraan Bermotor)
                </label>
                <input
                  type="number"
                  value={pkbAmount}
                  onChange={(e) => setPkbAmount(e.target.value)}
                  placeholder="Contoh: 500000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Jumlah Bulan Terlambat
                </label>
                <input
                  type="number"
                  value={monthsLate}
                  onChange={(e) => setMonthsLate(e.target.value)}
                  placeholder="Maksimal 24 bulan"
                  max="24"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={calculateFine}
            disabled={!selectedViolation}
            className="w-full mt-6 py-3 gradient-nusantara text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Gavel className="h-5 w-5" />
              Hitung Denda
            </div>
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8 card-3d animate-slide-up">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              Hasil Perhitungan
            </h3>
            <div className="space-y-2">
              {result.breakdown.map((item, idx) => (
                <p key={idx} className="text-sm text-green-700 pl-4 border-l-2 border-green-300">
                  {item}
                </p>
              ))}
            </div>
            {result.amount > 0 && (
              <div className="mt-4 pt-4 border-t-2 border-green-200">
                <p className="text-3xl font-bold text-green-800 text-center">
                  Total: Rp {formatNumber(Math.round(result.amount))}
                </p>
              </div>
            )}
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const text = `Denda ${selectedViolation}: Rp ${formatNumber(Math.round(result.amount))}`;
                  navigator.clipboard.writeText(text);
                  toast({
                    title: "Berhasil disalin!",
                    description: "Hasil perhitungan telah disalin ke clipboard",
                  });
                }}
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Salin Hasil
              </button>
              
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    shareUrl('whatsapp', window.location.href, 'Kalkulator Denda - Melek Hukum ID')
                  }
                }}
                className="flex-1 sm:flex-initial px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Share WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer with ornament */}
        <div className="mt-12 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 opacity-20 floating-ornament">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-600">
              <path d="M50 5 L61 35 L95 35 L68 55 L79 85 L50 65 L21 85 L32 55 L5 35 L39 35 Z"/>
            </svg>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-semibold mb-2">
                Disclaimer Penting:
              </p>
              <p className="text-sm text-amber-700">
                Perhitungan ini berdasarkan UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan serta peraturan daerah yang berlaku. 
                Hasil bersifat estimasi. Untuk kepastian denda, silakan konfirmasi dengan pihak kepolisian atau pengadilan setempat.
              </p>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}
