'use client'

import { useState } from 'react'
import PageHeader from '@/app/components/ui/PageHeader'
import { formatNumber, shareUrl } from '@/app/lib/utils'
import { Calculator, AlertCircle } from 'lucide-react'
import { InContentAd } from '@/app/components/ads/AdPlacements'
import { useToast } from '@/app/components/ui/use-toast'

const violationTypes = [
  {
    id: 'tilang-ringan',
    name: 'Tilang Ringan',
    description: 'Melanggar marka/rambu, tidak pakai helm',
    baseAmount: 250000,
    maxAmount: 500000,
  },
  {
    id: 'tilang-sedang',
    name: 'Tilang Sedang',
    description: 'Melawan arus, tidak punya SIM',
    baseAmount: 500000,
    maxAmount: 750000,
  },
  {
    id: 'tilang-berat',
    name: 'Tilang Berat',
    description: 'Ugal-ugalan, membahayakan orang lain',
    baseAmount: 750000,
    maxAmount: 1000000,
  },
  {
    id: 'pajak-kendaraan',
    name: 'Pajak Kendaraan Terlambat',
    description: 'Denda keterlambatan pajak tahunan',
    baseAmount: 0,
    formula: 'PKB x 2% per bulan (max 24 bulan)',
  },
]



export default function KalkulatorDendaPage() {
  const [selectedViolation, setSelectedViolation] = useState('')
  const [pkbAmount, setPkbAmount] = useState('')
  const [monthsLate, setMonthsLate] = useState('')
  const [result, setResult] = useState<{
    amount: number
    breakdown: string[]
  } | null>(null)
  const { toast } = useToast()

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
        description="Hitung estimasi denda untuk berbagai pelanggaran"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Kalkulator Denda' },
        ]}
      />

      <div className="container-padding mx-auto max-w-3xl py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Kalkulator Denda</h2>
              <p className="text-sm text-gray-600">
                Hitung estimasi denda pelanggaran lalu lintas dan pajak kendaraan
              </p>
            </div>
          </div>

          {/* Violation Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Jenis Pelanggaran
            </label>
            <select
              value={selectedViolation}
              onChange={(e) => {
                setSelectedViolation(e.target.value)
                setResult(null)
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Nilai PKB (Pajak Kendaraan Bermotor)
                </label>
                <input
                  type="number"
                  value={pkbAmount}
                  onChange={(e) => setPkbAmount(e.target.value)}
                  placeholder="Contoh: 500000"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Jumlah Bulan Terlambat
                </label>
                <input
                  type="number"
                  value={monthsLate}
                  onChange={(e) => setMonthsLate(e.target.value)}
                  placeholder="Maksimal 24 bulan"
                  max="24"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </>
          )}

          {/* Calculate Button */}
          <button
            onClick={calculateFine}
            disabled={!selectedViolation}
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hitung Denda
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-green-800">
              Hasil Perhitungan
            </h3>
            <div className="space-y-2">
              {result.breakdown.map((item, idx) => (
                <p key={idx} className="text-sm text-green-700">
                  {item}
                </p>
              ))}
            </div>
            {result.amount > 0 && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-2xl font-bold text-green-800">
                  Total: Rp {formatNumber(Math.round(result.amount))}
                </p>
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  const text = `Denda ${selectedViolation}: Rp ${formatNumber(Math.round(result.amount))}`;
                  navigator.clipboard.writeText(text);
                  toast({
                    title: "Berhasil disalin!",
                    description: "Hasil perhitungan telah disalin ke clipboard",
                  });
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Salin Hasil
              </button>
              
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    shareUrl('whatsapp', window.location.href, 'Kalkulator Denda - Melek Hukum ID')
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> Perhitungan ini berdasarkan peraturan yang berlaku dan bersifat estimasi. 
            Untuk kepastian denda, silakan konfirmasi dengan pihak berwenang terkait.
          </p>
        </div>
      </div>
    </>
  )
}

