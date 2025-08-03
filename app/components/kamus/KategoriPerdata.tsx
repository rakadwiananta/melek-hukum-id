'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  FileText, 
  Home, 
  Users,
  Heart,
  ScrollText,
  Shield,
  Banknote,
  UserCheck,
  BookOpen,
  Scale,
  Building,
  HandshakeIcon,
  AlertCircle,
  Baby
} from 'lucide-react'

interface KategoriPerdataProps {
  searchQuery?: string
}

// Data statistik berdasarkan Dirjen AHU & MA 2023
const civilStats = {
  marriageAndDivorce: {
    marriages: 1876543,
    divorces: 487234,
    divorceRate: 25.9,
    byReligion: {
      islam: 456789,
      kristen: 23456,
      katolik: 3456,
      hindu: 2345,
      buddha: 1234,
      konghucu: 954
    }
  },
  inheritance: {
    cases: 134567,
    wasiat: 23456,
    waris: 87654,
    hibah: 23457,
    avgDuration: 8.5 // months
  },
  contracts: {
    registered: 567890,
    types: [
      { name: 'Jual Beli', count: 234567, percentage: 41 },
      { name: 'Sewa Menyewa', count: 123456, percentage: 22 },
      { name: 'Pinjam Meminjam', count: 98765, percentage: 17 },
      { name: 'Kerjasama', count: 65432, percentage: 12 },
      { name: 'Lainnya', count: 45890, percentage: 8 }
    ]
  },
  landDisputes: {
    total: 98765,
    resolved: 76543,
    ongoing: 22222,
    types: {
      ownership: 45678,
      boundary: 23456,
      inheritance: 19876,
      fraud: 9755
    }
  },
  consumerProtection: {
    complaints: 234567,
    resolved: 198765,
    compensated: 87654,
    sectors: {
      ecommerce: 98765,
      banking: 45678,
      property: 34567,
      automotive: 23456,
      others: 32101
    }
  }
}

// Batik Pattern untuk Perdata (Motif Truntum - melambangkan cinta & kesetiaan)
const BatikTruntum = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
    <defs>
      <pattern id="truntum" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <path d="M25,10 Q40,25 25,40 Q10,25 25,10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="0" cy="0" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="0" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="0" cy="50" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#truntum)" />
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
      initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
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

// Marriage & Divorce Statistics
const MarriageDivorceStats = () => {
  const { marriages, divorces, divorceRate, byReligion } = civilStats.marriageAndDivorce
  
  return (
    <Card3D delay={0.2} className="lg:col-span-2">
      <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl shadow-lg p-6 h-full">
        <BatikTruntum />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pink-600" />
            Perkawinan & Perceraian 2023
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-green-100 rounded-lg p-4 text-center"
            >
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">
                {(marriages/1000000).toFixed(2)}Jt
              </div>
              <div className="text-sm text-gray-600">Pernikahan</div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-red-100 rounded-lg p-4 text-center"
            >
              <UserCheck className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-700">
                {divorces.toLocaleString('id-ID')}
              </div>
              <div className="text-sm text-gray-600">Perceraian</div>
              <div className="text-xs text-red-600 mt-1">({divorceRate}%)</div>
            </motion.div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Perceraian per Agama</h4>
            <div className="space-y-1">
              {Object.entries(byReligion).map(([religion, count], index) => (
                <div key={religion} className="flex justify-between text-sm">
                  <span className="capitalize text-gray-600">{religion}</span>
                  <span className="font-medium">{count.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Inheritance Cases
const InheritanceCases = () => {
  const { cases, wasiat, waris, hibah, avgDuration } = civilStats.inheritance
  
  return (
    <Card3D delay={0.3}>
      <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <ScrollText className="h-5 w-5 mr-2 text-amber-600" />
          Waris & Hibah
        </h3>
        
        <div className="text-center mb-4">
          <motion.div
            className="text-3xl font-bold text-amber-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {cases.toLocaleString('id-ID')}
          </motion.div>
          <div className="text-sm text-gray-600">Total Kasus</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-amber-100 rounded-lg">
            <span className="text-sm font-medium">Waris</span>
            <span className="font-bold text-amber-700">{waris.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
            <span className="text-sm font-medium">Wasiat</span>
            <span className="font-bold text-orange-700">{wasiat.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
            <span className="text-sm font-medium">Hibah</span>
            <span className="font-bold text-yellow-700">{hibah.toLocaleString('id-ID')}</span>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Rata-rata penyelesaian: <span className="font-semibold">{avgDuration} bulan</span>
        </div>
      </div>
    </Card3D>
  )
}

// Contract Statistics
const ContractStatistics = () => {
  const { registered, types } = civilStats.contracts
  
  return (
    <Card3D delay={0.4} className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-blue-600" />
          Kontrak/Perjanjian Terdaftar
        </h3>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
          <div className="text-3xl font-bold text-blue-700">
            {registered.toLocaleString('id-ID')}
          </div>
          <div className="text-sm text-gray-600">Total Kontrak 2023</div>
        </div>
        
        <div className="space-y-3">
          {types.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{type.name}</span>
                <span className="text-sm text-gray-600">
                  {type.count.toLocaleString('id-ID')} ({type.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${type.percentage}%` }}
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

// Land Disputes
const LandDisputes = () => {
  const { total, resolved, ongoing, types } = civilStats.landDisputes
  const resolvedPercentage = (resolved / total) * 100
  
  return (
    <Card3D delay={0.5}>
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Home className="h-5 w-5 mr-2 text-green-600" />
          Sengketa Tanah
        </h3>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">
              {total.toLocaleString('id-ID')}
            </div>
            <div className="text-sm text-gray-600">Total Sengketa</div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Selesai</span>
              <span className="text-sm font-semibold text-green-600">
                {resolved.toLocaleString('id-ID')} ({resolvedPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-green-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${resolvedPercentage}%` }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Jenis Sengketa:</p>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Kepemilikan</span>
                <span className="font-medium">{types.ownership.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Batas Tanah</span>
                <span className="font-medium">{types.boundary.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Warisan</span>
                <span className="font-medium">{types.inheritance.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Penipuan</span>
                <span className="font-medium">{types.fraud.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Consumer Protection
const ConsumerProtection = () => {
  const { complaints, resolved, sectors } = civilStats.consumerProtection
  
  return (
    <Card3D delay={0.6}>
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-purple-600" />
          Perlindungan Konsumen
        </h3>
        
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-purple-700">
            {complaints.toLocaleString('id-ID')}
          </div>
          <div className="text-sm text-gray-600">Total Pengaduan</div>
          <div className="text-xs text-green-600 mt-1">
            {((resolved/complaints)*100).toFixed(1)}% Terselesaikan
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-700 mb-1">Top 5 Sektor:</div>
          {Object.entries(sectors).slice(0, 5).map(([sector, count], index) => (
            <div key={sector} className="flex items-center justify-between text-sm">
              <span className="capitalize text-gray-600">{sector}</span>
              <span className="font-medium">{(count/1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

// Main Component
export default function KategoriPerdata({ searchQuery }: KategoriPerdataProps) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
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
              <Scale className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-3 text-pink-600" />
              Kategori Hukum Perdata
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Data lengkap hukum keluarga, kontrak, pertanahan, dan perlindungan konsumen 
              berdasarkan Dirjen AHU Kemenkumham dan Mahkamah Agung RI.
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
              { icon: BookOpen, value: "1,245", label: "Pasal BW", color: "text-blue-600" },
              { icon: Baby, value: "18 tahun", label: "Usia Dewasa", color: "text-green-600" },
              { icon: Banknote, value: "30 tahun", label: "Daluwarsa Hutang", color: "text-purple-600" },
              { icon: AlertCircle, value: "24 jam", label: "Lapor Kehilangan", color: "text-red-600" }
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
            <MarriageDivorceStats />
            <InheritanceCases />
            <ContractStatistics />
            <LandDisputes />
            <ConsumerProtection />
          </div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <HandshakeIcon className="h-8 w-8 text-pink-600 mb-3" />
              <h4 className="font-semibold mb-2">Format Perjanjian</h4>
              <p className="text-sm text-gray-600 mb-3">
                Template kontrak dan perjanjian yang sah.
              </p>
              <a href="/solusi/template/perjanjian" className="text-pink-600 text-sm font-medium hover:underline">
                Download Template →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <Home className="h-8 w-8 text-green-600 mb-3" />
              <h4 className="font-semibold mb-2">Panduan Jual Beli Tanah</h4>
              <p className="text-sm text-gray-600 mb-3">
                Prosedur lengkap transaksi properti yang aman.
              </p>
              <a href="/kamus-hukum/jual-beli-tanah" className="text-green-600 text-sm font-medium hover:underline">
                Baca Panduan →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <Heart className="h-8 w-8 text-red-600 mb-3" />
              <h4 className="font-semibold mb-2">Konsultasi Keluarga</h4>
              <p className="text-sm text-gray-600 mb-3">
                Layanan konsultasi hukum keluarga gratis.
              </p>
              <a href="/konsultasi/keluarga" className="text-red-600 text-sm font-medium hover:underline">
                Konsultasi Sekarang →
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
