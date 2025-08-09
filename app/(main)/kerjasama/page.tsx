'use client'

import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'

const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })

export default function KerjasamaPage() {
  const reduced = usePrefersReducedMotion()
  const stats: StatItem[] = [
    // { label: 'Mitra aktif', value: '12', sourceLabel: 'Laporan Kemitraan 2025', sourceUrl: 'https://tautan.sumber-kemitraan' }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader title="Kerjasama" breadcrumb={[{ label: 'Tentang', href: '/tentang' }, { label: 'Kerjasama' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-6" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Bentuk Kolaborasi</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Co-branding konten edukasi hukum dan anti-korupsi.</li>
                <li>Riset data dan publikasi bersama.</li>
                <li>Integrasi widget/tools (kalkulator, template) di platform mitra.</li>
                <li>Program CSR literasi hukum.</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Manfaat</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Meningkatkan literasi hukum publik.</li>
                <li>Eksposur brand positif terkait integritas dan kepatuhan.</li>
                <li>Akses ke modul edukasi dan template siap pakai.</li>
              </ul>
              <div className="mt-4">
                <a href="mailto:partnership@melekhukum.id" className="inline-block px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Kirim Proposal</a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <TrustedStats
              title="Statistik Kemitraan"
              description="Tampilkan statistik kemitraan (jumlah, jangkauan, dampak) beserta sumber yang dapat diverifikasi."
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
