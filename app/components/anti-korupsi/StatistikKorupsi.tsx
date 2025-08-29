'use client'

import React from 'react'
import { TrendingDown, AlertTriangle, Users, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

// Lightweight chart component using CSS
function SimpleBarChart({ data, title }: { data: Array<{ label: string; value: number; color: string }>, title: string }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-20 text-sm text-gray-600 flex-shrink-0">{item.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="h-full rounded-full flex items-center justify-end pr-2"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-white text-xs font-medium">{item.value}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function StatistikKorupsi() {
  const korupsiData = [
    { label: '2020', value: 169, color: '#ef4444' },
    { label: '2021', value: 156, color: '#f97316' },
    { label: '2022', value: 145, color: '#eab308' },
    { label: '2023', value: 132, color: '#22c55e' },
    { label: '2024', value: 118, color: '#10b981' }
  ]

  const sektorData = [
    { label: 'Pemerintahan', value: 45, color: '#dc2626' },
    { label: 'Kepolisian', value: 23, color: '#ea580c' },
    { label: 'Kehakiman', value: 18, color: '#ca8a04' },
    { label: 'Swasta', value: 32, color: '#16a34a' }
  ]

  const stats = [
    {
      icon: TrendingDown,
      label: 'Penurunan Kasus',
      value: '12%',
      subtitle: 'vs tahun lalu',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: AlertTriangle,
      label: 'Kasus Aktif',
      value: '118',
      subtitle: 'Tahun 2024',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      label: 'Tersangka',
      value: '245',
      subtitle: 'Total tahun ini',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: DollarSign,
      label: 'Kerugian Negara',
      value: '2.1T',
      subtitle: 'Rupiah',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
            <div className="text-xs text-gray-500">{stat.subtitle}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SimpleBarChart 
          data={korupsiData} 
          title="Tren Kasus Korupsi per Tahun"
        />
        <SimpleBarChart 
          data={sektorData} 
          title="Kasus Korupsi per Sektor"
        />
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Catatan Penting</h3>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>• Data statistik berdasarkan laporan KPK dan lembaga penegak hukum lainnya</p>
          <p>• Angka kerugian negara merupakan estimasi dari berbagai kasus yang sedang ditangani</p>
          <p>• Statistik ini diperbarui secara berkala sesuai dengan perkembangan penanganan kasus</p>
        </div>
      </motion.div>
    </div>
  )
}
