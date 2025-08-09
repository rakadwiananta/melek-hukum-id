'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TrendingUp, Users, CircleDollarSign, AlertTriangle, BarChart3, Award, FileText, Building, Scale, PieChart, Activity, Globe, Target, Zap } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Data berdasarkan Laporan Tahunan KPK 2023 & ICW
const statistikData = [
  {
    icon: TrendingUp,
    title: 'Total Kasus 2023',
    value: '532',
    description: 'Kasus korupsi ditangani (KPK, Kejaksaan, Polri)',
    detail: 'KPK: 132, Kejaksaan: 312, Polri: 88',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    gradient: 'from-red-500 to-red-600',
    pattern: 'sekar-jagad',
    trend: 'up',
    changePercent: '+8.3%'
  },
  {
    icon: Users,
    title: 'Tersangka Korupsi',
    value: '1,357',
    description: 'Total tersangka dari berbagai profesi',
    detail: 'ASN: 567, Swasta: 423, DPR/DPRD: 182, Lainnya: 185',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
    pattern: 'sido-mukti',
    trend: 'up',
    changePercent: '+12.1%'
  },
  {
    icon: CircleDollarSign,
    title: 'Kerugian Negara',
    value: 'Rp 15.2 T',
    description: 'Total kerugian negara tahun 2023',
    detail: 'Pengadaan: 35%, Perizinan: 28%, Suap: 22%, Lainnya: 15%',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    gradient: 'from-green-500 to-green-600',
    pattern: 'kawung',
    trend: 'down',
    changePercent: '-5.2%'
  },
  {
    icon: AlertTriangle,
    title: 'Laporan Publik',
    value: '8,234',
    description: 'Laporan masyarakat yang ditindaklanjuti',
    detail: 'Online: 4,567, Telepon: 2,345, Langsung: 1,322',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    gradient: 'from-yellow-500 to-yellow-600',
    pattern: 'parang',
    trend: 'up',
    changePercent: '+18.7%'
  }
]

// Data tren 5 tahun dari KPK & ICW
const trenKorupsi = [
  { tahun: '2019', kpk: 153, kejaksaan: 289, polri: 76, kerugian: 8.4, pemulihan: 2.1 },
  { tahun: '2020', kpk: 115, kejaksaan: 301, polri: 82, kerugian: 56.7, pemulihan: 8.9 },
  { tahun: '2021', kpk: 118, kejaksaan: 298, polri: 71, kerugian: 62.9, pemulihan: 12.3 },
  { tahun: '2022', kpk: 132, kejaksaan: 305, polri: 85, kerugian: 15.2, pemulihan: 3.7 },
  { tahun: '2023', kpk: 132, kejaksaan: 312, polri: 88, kerugian: 15.2, pemulihan: 4.2 }
]

// Data profesi tersangka dari KPK
const profesiTersangka = [
  { profesi: 'ASN/PNS', jumlah: 567, warna: '#EF4444' },
  { profesi: 'Swasta', jumlah: 423, warna: '#3B82F6' },
  { profesi: 'DPR/DPRD', jumlah: 182, warna: '#10B981' },
  { profesi: 'Kepala Daerah', jumlah: 89, warna: '#F59E0B' },
  { profesi: 'Hakim/Jaksa', jumlah: 31, warna: '#8B5CF6' },
  { profesi: 'Lainnya', jumlah: 65, warna: '#6B7280' }
]

// Data sektor rawan dari ICW
const sektorRawan = [
  { sektor: 'Pengadaan Barang/Jasa', persentase: 35, kasus: 186 },
  { sektor: 'Perizinan', persentase: 28, kasus: 149 },
  { sektor: 'Pungutan Liar', persentase: 15, kasus: 80 },
  { sektor: 'Suap', persentase: 12, kasus: 64 },
  { sektor: 'Penyalahgunaan Anggaran', persentase: 10, kasus: 53 }
]

// Enhanced 3D Card Component
const Card3D = ({ children, className = "", delay = 0, index = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20
    })
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <motion.div
        animate={!isMobile && isHovered ? {
          rotateY: mousePosition.x,
          rotateX: mousePosition.y,
          scale: 1.02
        } : {
          rotateY: 0,
          rotateX: 0,
          scale: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2 }: {
  value: string | number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0)
  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''))
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(numericValue * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(numericValue)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [numericValue, duration])

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatistikKorupsi() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 500], [0, -50])
  const [selectedYear, setSelectedYear] = useState('2023')
  const [isMobile, setIsMobile] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Chart configurations
  const lineChartData = {
    labels: trenKorupsi.map(t => t.tahun),
    datasets: [
      {
        label: 'KPK',
        data: trenKorupsi.map(t => t.kpk),
        borderColor: '#DC2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Kejaksaan',
        data: trenKorupsi.map(t => t.kejaksaan),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Polri',
        data: trenKorupsi.map(t => t.polri),
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const pieChartData = {
    labels: profesiTersangka.map(p => p.profesi),
    datasets: [{
      data: profesiTersangka.map(p => p.jumlah),
      backgroundColor: profesiTersangka.map(p => p.warna),
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  }

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Enhanced 3D Background - Batik Sido Mukti */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: yParallax }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern id="sido-mukti-3d" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <motion.g
                animate={!isMobile ? {
                  rotate: [0, 360]
                } : {}}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "30px 30px" }}
              >
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-600"/>
                <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-400"/>
                <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-300"/>
                <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-200"/>
                <circle cx="30" cy="30" r="5" fill="currentColor" className="text-red-500" opacity="0.3"/>
              </motion.g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sido-mukti-3d)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with 3D Rotating Globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center relative">
              <BarChart3 className="w-10 h-10 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.8)",
                    "0 0 20px rgba(239, 68, 68, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Indonesia Map Dots */}
              {!isMobile && [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-40px)`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Statistik Korupsi Indonesia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Data real-time dari KPK, Kejaksaan Agung, Polri, dan ICW. 
            Update terakhir: <span className="font-semibold text-red-600">November 2024</span>
          </p>
        </motion.div>

        {/* 3D Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statistikData.map((stat, index) => (
            <Card3D key={index} delay={index * 0.1} index={index}>
              <motion.div
                className={`${stat.bgColor} ${stat.borderColor} p-6 rounded-xl border-2 relative overflow-hidden h-full`}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
              >
                {/* 3D Background Pattern */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />

                {/* Nusantara Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern id={`batik-stat-${index}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                      {stat.pattern === 'kawung' && (
                        <>
                          <circle cx="12.5" cy="12.5" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                          <circle cx="12.5" cy="12.5" r="5" fill="currentColor" opacity="0.3"/>
                        </>
                      )}
                      {stat.pattern === 'parang' && (
                        <path d="M0,12.5 L12.5,0 L25,12.5 L12.5,25 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      )}
                    </pattern>
                    <rect width="100" height="100" fill={`url(#batik-stat-${index})`} />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{ 
                        rotateZ: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </motion.div>
                    <motion.div
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.trend === 'up' ? '↑' : '↓'}
                      {stat.changePercent}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className={`text-2xl font-bold ${stat.color} mb-1`}
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                  >
                    <AnimatedCounter value={stat.value} prefix={stat.value.includes('Rp') ? 'Rp ' : ''} suffix={stat.value.includes('T') ? ' T' : ''} />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {stat.description}
                  </p>
                  <p className="text-xs text-gray-500 border-t pt-2">
                    {stat.detail}
                  </p>
                </div>

                {/* Floating Particles */}
                {!isMobile && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 ${stat.bgColor} rounded-full`}
                    style={{
                      left: `${20 + i * 30}%`,
                      bottom: '-10px'
                    }}
                    animate={{
                      y: [-10, -100, -10],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5 + i * 0.3
                    }}
                  />
                ))}
              </motion.div>
            </Card3D>
          ))}
        </div>

        {/* 3D Interactive Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Trend Chart */}
          <Card3D delay={0.4}>
            <motion.div 
              ref={chartRef}
              className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden h-full"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="w-6 h-6 text-blue-600 mr-3" />
                Tren Penanganan Kasus 5 Tahun
              </h3>
              
              <div className="h-64">
                <Line data={lineChartData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const
                    },
                    tooltip: {
                      mode: 'index' as const,
                      intersect: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Jumlah Kasus'
                      }
                    }
                  }
                }} />
              </div>

              <motion.div
                className="mt-6 p-4 bg-blue-50 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-blue-800">
                  <strong>Insight:</strong> Kejaksaan menangani kasus terbanyak (58.6%), 
                  diikuti KPK (24.8%) dan Polri (16.6%)
                </p>
              </motion.div>
            </motion.div>
          </Card3D>

          {/* Profession Distribution */}
          <Card3D delay={0.5}>
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden h-full"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <PieChart className="w-6 h-6 text-purple-600 mr-3" />
                Profesi Tersangka Korupsi
              </h3>
              
              <div className="h-64">
                <Doughnut data={pieChartData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right' as const,
                      labels: {
                        boxWidth: 12,
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }} />
              </div>

              <motion.div
                className="mt-6 p-4 bg-purple-50 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-purple-800">
                  <strong>Fakta:</strong> ASN/PNS mendominasi 41.8% tersangka korupsi, 
                  menunjukkan urgensi reformasi birokrasi
                </p>
              </motion.div>
            </motion.div>
          </Card3D>
        </div>

        {/* 3D Detailed Table with Wayang Shadow */}
        <Card3D delay={0.6}>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: 1000
            }}
          >
            {/* Wayang Shadow Effect */}
            {!isMobile && (
              <motion.div
                className="absolute -right-20 top-0 bottom-0 w-40 opacity-5"
                animate={{ 
                  x: [-20, 20, -20]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity
                }}
              >
                <svg className="h-full" viewBox="0 0 100 200">
                  <motion.path 
                    d="M50,20 Q30,40 40,60 L40,140 Q30,160 50,180 Q70,160 60,140 L60,60 Q70,40 50,20" 
                    fill="currentColor" 
                    className="text-gray-800"
                    animate={{
                      d: [
                        "M50,20 Q30,40 40,60 L40,140 Q30,160 50,180 Q70,160 60,140 L60,60 Q70,40 50,20",
                        "M50,15 Q25,35 35,55 L35,145 Q25,165 50,185 Q75,165 65,145 L65,55 Q75,35 50,15",
                        "M50,20 Q30,40 40,60 L40,140 Q30,160 50,180 Q70,160 60,140 L60,60 Q70,40 50,20"
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                </svg>
              </motion.div>
            )}

            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
              <Scale className="w-6 h-6 text-red-600 mr-3" />
              Detail Korupsi Per Tahun
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tahun</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Total Kasus</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Kerugian</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Pemulihan</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Recovery Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {trenKorupsi.map((data, index) => {
                    const totalKasus = data.kpk + data.kejaksaan + data.polri
                    const recoveryRate = ((data.pemulihan / data.kerugian) * 100).toFixed(1)
                    
                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          backgroundColor: '#f9fafb',
                          scale: 1.01
                        }}
                        className="border-b border-gray-100 cursor-pointer"
                        onClick={() => setSelectedYear(data.tahun)}
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">
                          {data.tahun}
                          {selectedYear === data.tahun && (
                            <motion.span
                              className="ml-2 text-xs text-red-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              (selected)
                            </motion.span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="font-semibold"
                          >
                            {totalKasus.toLocaleString()}
                          </motion.span>
                        </td>
                        <td className="py-4 px-4 text-center text-red-600 font-semibold">
                          Rp {data.kerugian} T
                        </td>
                        <td className="py-4 px-4 text-center text-green-600 font-semibold">
                          Rp {data.pemulihan} T
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                initial={{ width: '0%' }}
                                whileInView={{ width: `${recoveryRate}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {recoveryRate}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Insight Box */}
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Analisis Tren Korupsi
              </h4>
              <ul className="text-red-700 text-sm space-y-2">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-start"
                >
                  <Zap className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Lonjakan kerugian tahun 2020-2021 terkait pengadaan COVID-19</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="flex items-start"
                >
                  <Zap className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Recovery rate meningkat dari 25% (2019) menjadi 27.6% (2023)</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-start"
                >
                  <Zap className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sektor pengadaan tetap menjadi area paling rawan (35% kasus)</span>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </Card3D>

        {/* 3D Sector Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sektor Rawan Korupsi
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {sektorRawan.map((sektor, index) => (
              <Card3D key={index} delay={index * 0.1}>
                <motion.div
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 text-center relative overflow-hidden"
                  whileHover={{ 
                    borderColor: '#DC2626',
                    scale: 1.05
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-500 to-transparent opacity-0"
                    whileHover={{ opacity: 0.1 }}
                  />
                  
                  <Building className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    {sektor.sektor}
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-red-600 mb-1"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                  >
                    {sektor.persentase}%
                  </motion.div>
                  <p className="text-xs text-gray-600">
                    {sektor.kasus} kasus
                  </p>
                  
                  {/* Progress Ring */}
                  <svg className="w-16 h-16 mx-auto mt-3">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="4"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      whileInView={{ 
                        strokeDashoffset: 2 * Math.PI * 28 * (1 - sektor.persentase / 100)
                      }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      transform="rotate(-90 32 32)"
                    />
                  </svg>
                </motion.div>
              </Card3D>
            ))}
          </div>
        </motion.div>

        {/* 3D Call to Action with Garuda Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card3D>
            <motion.div 
              className="bg-gradient-to-r from-red-600 to-red-700 p-8 rounded-xl text-white relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated Garuda Wings */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity
                  }}
                >
                  <svg className="w-full h-full max-w-md" viewBox="0 0 200 100">
                    <motion.path 
                      d="M100,30 Q60,10 30,30 Q60,20 100,40 Q140,20 170,30 Q140,10 100,30" 
                      fill="currentColor" 
                      className="text-white"
                      animate={{
                        d: [
                          "M100,30 Q60,10 30,30 Q60,20 100,40 Q140,20 170,30 Q140,10 100,30",
                          "M100,25 Q55,5 25,25 Q55,15 100,35 Q145,15 175,25 Q145,5 100,25",
                          "M100,30 Q60,10 30,30 Q60,20 100,40 Q140,20 170,30 Q140,10 100,30"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </svg>
                </motion.div>
              )}

              <h3 className="text-2xl font-bold mb-4 relative z-10">
                Mari Bersama Berantas Korupsi!
              </h3>
              <p className="text-lg mb-6 opacity-90 relative z-10 max-w-2xl mx-auto">
                Data menunjukkan korupsi masih menjadi masalah serius. 
                Setiap laporan Anda berkontribusi untuk Indonesia yang lebih bersih.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <motion.a 
                  href="/anti-korupsi/cara-melapor"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Pelajari Cara Melapor
                </motion.a>
                <motion.a 
                  href="/tools/kuis-korupsi"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-5 h-5 mr-2" />
                  Test Pemahaman
                </motion.a>
              </div>

              {/* Live Update Ticker */}
              <motion.div
                className="mt-6 text-sm opacity-80 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Activity className="w-4 h-4" />
                <span>Update data setiap hari kerja dari KPK, Kejaksaan & Polri</span>
              </motion.div>
            </motion.div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  )
}
