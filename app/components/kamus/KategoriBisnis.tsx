'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Briefcase, 
  TrendingUp, 
  Building,
  FileText,
  DollarSign,
  ShieldCheck,
  Globe,
  BarChart3,
  Users,
  Lightbulb,
  Scale,
  Award,
  PiggyBank,
  Landmark,
  AlertTriangle
} from 'lucide-react'

interface KategoriBisnisProps {
  searchQuery?: string
}

// Data statistik berdasarkan BKPM, OJK, dan Kemenkumham 2023
const businessStats = {
  businessEntities: {
    pt: 684325,
    cv: 456789,
    firma: 23456,
    koperasi: 127890,
    umkm: 64800000,
    year: '2023'
  },
  investment: {
    domestic: 654.6, // dalam triliun
    foreign: 423.7,
    growth: 14.2,
    sectors: [
      { name: 'Manufaktur', value: 234.5, percentage: 29 },
      { name: 'Pertambangan', value: 178.9, percentage: 22 },
      { name: 'Listrik, Gas & Air', value: 145.6, percentage: 18 },
      { name: 'Transportasi', value: 98.7, percentage: 12 },
      { name: 'Perumahan', value: 87.6, percentage: 11 },
      { name: 'Lainnya', value: 65.4, percentage: 8 }
    ]
  },
  intellectualProperty: {
    trademark: 98765,
    patent: 12543,
    copyright: 45678,
    industrialDesign: 8765,
    growthRate: 23.5
  },
  bankruptcy: {
    cases: 876,
    pkpu: 543,
    resolved: 654,
    sectors: {
      property: 234,
      trading: 187,
      manufacturing: 156,
      services: 145,
      others: 154
    }
  },
  compliance: {
    taxCompliance: 78.9,
    legalCompliance: 82.3,
    esgCompliance: 45.6,
    halal: 67.8
  }
}

// Batik Pattern untuk Bisnis (Motif Sekar Jagad - melambangkan keberagaman)
const BatikSekarJagad = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
    <defs>
      <pattern id="sekarjagad" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="60" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="10" y="60" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="60" y="60" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="75" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="25" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="75" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#sekarjagad)" />
  </svg>
)

// 3D Card Component
interface Card3DProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const Card3D = ({ children, delay = 0, className = "" }: Card3DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 180, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, z: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}
    >
      <motion.div
        animate={isHovered ? { rotateY: -5, rotateX: 5 } : { rotateY: 0, rotateX: 0 }}
        className="relative h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Business Entity Statistics
const BusinessEntityStats = () => {
  const entities = businessStats.businessEntities
  const total = entities.pt + entities.cv + entities.firma + entities.koperasi
  
  return (
    <Card3D delay={0.2} className="lg:col-span-2">
      <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl shadow-lg p-6 h-full">
        <BatikSekarJagad />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Building className="h-6 w-6 mr-2 text-emerald-600" />
            Badan Usaha Terdaftar 2023
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-emerald-100 rounded-lg p-4 text-center"
            >
              <Briefcase className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-700">
                {entities.pt.toLocaleString('id-ID')}
              </div>
              <div className="text-sm text-gray-600">Perseroan Terbatas</div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-blue-100 rounded-lg p-4 text-center"
            >
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">
                {entities.cv.toLocaleString('id-ID')}
              </div>
              <div className="text-sm text-gray-600">CV</div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-purple-100 rounded-lg p-4 text-center"
            >
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">
                {entities.koperasi.toLocaleString('id-ID')}
              </div>
              <div className="text-sm text-gray-600">Koperasi</div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="bg-orange-100 rounded-lg p-4 text-center"
            >
              <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">
                {(entities.umkm/1000000).toFixed(1)}Jt
              </div>
              <div className="text-sm text-gray-600">UMKM</div>
            </motion.div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600 mb-1">Total Badan Usaha (Non-UMKM)</div>
            <div className="text-2xl font-bold text-gray-800">
              {total.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Investment Statistics
const InvestmentStats = () => {
  const { domestic, foreign, growth, sectors } = businessStats.investment
  const total = domestic + foreign
  
  return (
    <Card3D delay={0.3} className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
          Realisasi Investasi 2023
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
            <div className="text-xl font-bold text-blue-700">Rp {domestic} T</div>
            <div className="text-sm text-gray-600">Investasi Domestik</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <Globe className="h-6 w-6 text-green-600 mb-2" />
            <div className="text-xl font-bold text-green-700">Rp {foreign} T</div>
            <div className="text-sm text-gray-600">Investasi Asing</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
            <div className="text-xl font-bold text-purple-700">+{growth}%</div>
            <div className="text-sm text-gray-600">Pertumbuhan YoY</div>
          </div>
        </div>
        
        <h4 className="font-semibold mb-3">Distribusi per Sektor</h4>
        <div className="space-y-2">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{sector.name}</span>
                <span className="text-sm text-gray-600">Rp {sector.value} T</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${sector.percentage}%` }}
                  transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

// Intellectual Property Stats
const IntellectualPropertyStats = () => {
  const ip = businessStats.intellectualProperty
  
  return (
    <Card3D delay={0.4}>
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-indigo-600" />
          Kekayaan Intelektual
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-indigo-100 rounded-lg">
            <span className="text-sm font-medium">Merek Dagang</span>
            <span className="font-bold text-indigo-700">{ip.trademark.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg">
            <span className="text-sm font-medium">Paten</span>
            <span className="font-bold text-purple-700">{ip.patent.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg">
            <span className="text-sm font-medium">Hak Cipta</span>
            <span className="font-bold text-blue-700">{ip.copyright.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
            <span className="text-sm font-medium">Desain Industri</span>
            <span className="font-bold text-green-700">{ip.industrialDesign.toLocaleString('id-ID')}</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm">Pertumbuhan</span>
            <span className="font-bold">+{ip.growthRate}%</span>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Compliance Metrics
const ComplianceMetrics = () => {
  const compliance = businessStats.compliance
  
  return (
    <Card3D delay={0.5}>
      <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-teal-600" />
          Tingkat Kepatuhan
        </h3>
        
        <div className="space-y-4">
          {Object.entries(compliance).map(([key, value], index) => {
            const labels: { [key: string]: string } = {
              taxCompliance: 'Kepatuhan Pajak',
              legalCompliance: 'Kepatuhan Hukum',
              esgCompliance: 'ESG Compliance',
              halal: 'Sertifikasi Halal'
            }
            
            return (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{labels[key]}</span>
                  <span className="text-sm font-bold">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      value >= 80 ? 'bg-green-500' : 
                      value >= 60 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card3D>
  )
}

// Bankruptcy Cases
const BankruptcyCases = () => {
  const { cases, pkpu, resolved } = businessStats.bankruptcy
  
  return (
    <Card3D delay={0.6}>
      <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
          Kepailitan & PKPU
        </h3>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-3 bg-red-100 rounded-lg">
            <div className="text-xl font-bold text-red-600">{cases}</div>
            <div className="text-xs text-gray-600">Pailit</div>
          </div>
          <div className="text-center p-3 bg-orange-100 rounded-lg">
            <div className="text-xl font-bold text-orange-600">{pkpu}</div>
            <div className="text-xs text-gray-600">PKPU</div>
          </div>
          <div className="text-center p-3 bg-green-100 rounded-lg">
            <div className="text-xl font-bold text-green-600">{resolved}</div>
            <div className="text-xs text-gray-600">Selesai</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-2">Sektor Terbanyak:</p>
          <div className="text-sm font-medium">Property ({businessStats.bankruptcy.sectors.property} kasus)</div>
        </div>
      </div>
    </Card3D>
  )
}

// Main Component
export default function KategoriBisnis({ searchQuery }: KategoriBisnisProps) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-3 text-emerald-600" />
              Kategori Hukum Bisnis
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Informasi lengkap regulasi bisnis, investasi, dan perdagangan di Indonesia 
              berdasarkan data BKPM, OJK, dan Kemenkumham RI.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Scale, value: "47", label: "UU Bisnis Aktif", color: "text-blue-600" },
              { icon: Landmark, value: "OSS", label: "Sistem Perizinan", color: "text-green-600" },
              { icon: Award, value: "73", label: "Ease of Doing", color: "text-purple-600" },
              { icon: PiggyBank, value: "4.2%", label: "Pertumbuhan", color: "text-yellow-600" }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
                >
                  <Icon className={`h-6 w-6 ${stat.color} mb-2`} />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BusinessEntityStats />
            <IntellectualPropertyStats />
            <InvestmentStats />
            <ComplianceMetrics />
            <BankruptcyCases />
          </div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <FileText className="h-8 w-8 text-emerald-600 mb-3" />
              <h4 className="font-semibold mb-2">Panduan Pendirian PT</h4>
              <p className="text-sm text-gray-600 mb-3">
                Langkah-langkah mendirikan PT dengan OSS RBA.
              </p>
              <a href="/solusi/pendirian-pt" className="text-emerald-600 text-sm font-medium hover:underline">
                Lihat Panduan →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <ShieldCheck className="h-8 w-8 text-blue-600 mb-3" />
              <h4 className="font-semibold mb-2">Cek Legalitas Usaha</h4>
              <p className="text-sm text-gray-600 mb-3">
                Verifikasi legalitas perusahaan secara online.
              </p>
              <a href="/tools/cek-legalitas" className="text-blue-600 text-sm font-medium hover:underline">
                Cek Sekarang →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-3" />
              <h4 className="font-semibold mb-2">Kalkulator Pajak Usaha</h4>
              <p className="text-sm text-gray-600 mb-3">
                Hitung pajak penghasilan badan usaha Anda.
              </p>
              <a href="/tools/kalkulator-pajak" className="text-purple-600 text-sm font-medium hover:underline">
                Hitung Pajak →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS untuk animasi blob */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
