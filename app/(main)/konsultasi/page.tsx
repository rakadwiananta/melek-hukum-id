'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Users, Scale, FileText, MessageCircle, Phone, Video,
  Clock, CheckCircle, Star, Shield, Award, Globe,
  ArrowRight, Calendar, Mail, MapPin, Briefcase,
  BookOpen, AlertCircle, Info, Zap, Target
} from 'lucide-react'
import Link from 'next/link'

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-konsultasi" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <g transform="translate(60,60)">
          <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.3"/>
          <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="0.2"/>
          <path d="M-30,0 L30,0 M0,-30 L0,30" stroke="currentColor" strokeWidth="0.2"/>
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-konsultasi)" />
  </svg>
)

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 15)
    setRotateY((centerX - x) / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      {children}
    </motion.div>
  )
}

// Floating Elements
const FloatingElement = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      delay, 
      duration: 0.8,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.3 }
    }}
  >
    {children}
  </motion.div>
)

// Consultation Services Data
const consultationServices = [
  {
    id: 'perdata',
    title: 'Konsultasi Hukum Perdata',
    description: 'Perkawinan, perceraian, waris, kontrak, properti, dan sengketa perdata lainnya',
    icon: Scale,
    color: 'from-green-500 to-emerald-600',
    price: 'Mulai Rp 150.000',
    duration: '60 menit',
    features: ['Analisis kasus', 'Saran hukum', 'Draft dokumen', 'Follow-up 7 hari']
  },
  {
    id: 'pidana',
    title: 'Konsultasi Hukum Pidana',
    description: 'Pendampingan kasus pidana, pembelaan, dan perlindungan hak tersangka/terdakwa',
    icon: Shield,
    color: 'from-red-500 to-rose-600',
    price: 'Mulai Rp 200.000',
    duration: '60 menit',
    features: ['Analisis pasal', 'Strategi pembelaan', 'Persiapan sidang', 'Konsultasi keluarga']
  },
  {
    id: 'bisnis',
    title: 'Konsultasi Hukum Bisnis',
    description: 'Pendirian perusahaan, kontrak bisnis, ketenagakerjaan, dan compliance',
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-600',
    price: 'Mulai Rp 250.000',
    duration: '90 menit',
    features: ['Business review', 'Risk assessment', 'Compliance audit', 'Legal structure']
  },
  {
    id: 'keluarga',
    title: 'Konsultasi Hukum Keluarga',
    description: 'Masalah keluarga, adopsi, perwalian, dan perlindungan anak',
    icon: Users,
    color: 'from-pink-500 to-purple-600',
    price: 'Mulai Rp 125.000',
    duration: '45 menit',
    features: ['Mediasi keluarga', 'Perlindungan anak', 'Hak waris', 'Konseling hukum']
  }
]

// Consultation Methods
const consultationMethods = [
  {
    method: 'Video Call',
    icon: Video,
    description: 'Konsultasi tatap muka virtual melalui Zoom/Google Meet',
    price: 'Standar',
    color: 'from-blue-500 to-blue-600'
  },
  {
    method: 'Voice Call',
    icon: Phone,
    description: 'Konsultasi melalui telepon untuk kasus mendesak',
    price: 'Standar',
    color: 'from-green-500 to-green-600'
  },
  {
    method: 'Chat/Email',
    icon: MessageCircle,
    description: 'Konsultasi tertulis dengan response dalam 24 jam',
    price: '50% dari tarif standar',
    color: 'from-purple-500 to-purple-600'
  },
  {
    method: 'Tatap Muka',
    icon: MapPin,
    description: 'Konsultasi langsung di kantor (Jakarta, Surabaya)',
    price: 'Standar + biaya transportasi',
    color: 'from-orange-500 to-orange-600'
  }
]

// Expert Lawyers
const expertLawyers = [
  {
    name: 'Dr. Ahmad Santoso, S.H., M.H.',
    specialization: 'Hukum Perdata & Bisnis',
    experience: '15+ tahun',
    cases: '500+ kasus',
    rating: 4.9,
    image: '/images/lawyer-1.jpg'
  },
  {
    name: 'Prof. Siti Nurhaliza, S.H., M.H.',
    specialization: 'Hukum Keluarga & Waris',
    experience: '20+ tahun',
    cases: '800+ kasus',
    rating: 4.8,
    image: '/images/lawyer-2.jpg'
  },
  {
    name: 'Drs. Bambang Wijaya, S.H., M.H.',
    specialization: 'Hukum Pidana',
    experience: '12+ tahun',
    cases: '300+ kasus',
    rating: 4.9,
    image: '/images/lawyer-3.jpg'
  }
]

export default function KonsultasiPage() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    description: '',
    urgency: 'normal'
  })
  
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.9])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <BatikPattern />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingElement 
          className="absolute top-20 left-10 text-blue-200/20" 
          delay={0.2}
        >
          <Scale size={120} />
        </FloatingElement>
        <FloatingElement 
          className="absolute top-40 right-20 text-indigo-200/20" 
          delay={0.4}
        >
          <Users size={100} />
        </FloatingElement>
        <FloatingElement 
          className="absolute bottom-40 left-20 text-cyan-200/20" 
          delay={0.6}
        >
          <Shield size={80} />
        </FloatingElement>
        <FloatingElement 
          className="absolute bottom-20 right-40 text-blue-200/20" 
          delay={0.8}
        >
          <Briefcase size={90} />
        </FloatingElement>
      </div>

      {/* Header Section */}
      <motion.div 
        className="relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-blue-600 font-medium">Konsultasi Hukum</span>
          </motion.nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-6">
                <Card3D delay={0.2}>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl">
                    <Scale className="w-16 h-16 text-white" />
                  </div>
                </Card3D>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Konsultasi{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Hukum
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Dapatkan solusi hukum terpercaya dari para ahli hukum berpengalaman. 
                Konsultasi mudah, cepat, dan terjangkau untuk berbagai masalah hukum Anda.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: 'Ahli Hukum', value: '50+', icon: Users },
                  { label: 'Kasus Ditangani', value: '5000+', icon: Briefcase },
                  { label: 'Tingkat Kepuasan', value: '98%', icon: Star },
                  { label: 'Response Time', value: '< 2 jam', icon: Clock }
                ].map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <Card3D key={stat.label} delay={0.3 + index * 0.1}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    </Card3D>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Consultation Services Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Konsultasi
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih layanan konsultasi sesuai kebutuhan hukum Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultationServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card3D key={service.id} delay={index * 0.1}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {service.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{service.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedService === service.id
                          ? `bg-gradient-to-r ${service.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedService === service.id ? 'Dipilih' : 'Pilih Layanan'}
                    </button>
                  </div>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>

      {/* Consultation Methods Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Metode{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Konsultasi
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih cara konsultasi yang paling nyaman untuk Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card3D key={method.method} delay={index * 0.1}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {method.method}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {method.description}
                    </p>

                    <div className="text-sm font-medium text-blue-600">
                      {method.price}
                    </div>
                  </div>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>

      {/* Expert Lawyers Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ahli Hukum
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Konsultasi dengan para ahli hukum berpengalaman dan tersertifikasi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertLawyers.map((lawyer, index) => (
              <Card3D key={lawyer.name} delay={index * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {lawyer.name}
                  </h3>
                  
                  <p className="text-blue-600 font-medium mb-4">
                    {lawyer.specialization}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lawyer.experience}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lawyer.cases}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{lawyer.rating}/5.0</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Konsultasi Sekarang
                  </button>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Form Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mulai{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Konsultasi
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Isi form di bawah untuk memulai konsultasi hukum Anda
            </p>
          </motion.div>

          <Card3D>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Kasus
                    </label>
                    <select
                      value={formData.caseType}
                      onChange={(e) => setFormData({...formData, caseType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Pilih jenis kasus</option>
                      <option value="perdata">Hukum Perdata</option>
                      <option value="pidana">Hukum Pidana</option>
                      <option value="bisnis">Hukum Bisnis</option>
                      <option value="keluarga">Hukum Keluarga</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Kasus
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jelaskan masalah hukum Anda secara detail..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tingkat Urgensi
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['normal', 'mendesak', 'sangat mendesak'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value={level}
                          checked={formData.urgency === level}
                          onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" required className="mt-1" />
                  <p className="text-sm text-gray-600">
                    Saya setuju dengan{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      syarat dan ketentuan
                    </Link>{' '}
                    serta{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      kebijakan privasi
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Mulai Konsultasi Sekarang
                </button>
              </form>
            </div>
          </Card3D>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQ{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Konsultasi
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Bagaimana cara memulai konsultasi?",
                a: "Isi form konsultasi di atas, pilih metode konsultasi, lakukan pembayaran, dan tim kami akan menghubungi Anda dalam 2 jam."
              },
              {
                q: "Apakah konsultasi bersifat rahasia?",
                a: "Ya, semua konsultasi dilindungi oleh kerahasiaan advokat-klien dan tidak akan dibagikan kepada pihak ketiga."
              },
              {
                q: "Berapa lama durasi konsultasi?",
                a: "Durasi bervariasi sesuai paket: 45-90 menit untuk konsultasi langsung, unlimited untuk konsultasi chat/email."
              },
              {
                q: "Apakah ada garansi kepuasan?",
                a: "Ya, kami memberikan garansi 100% uang kembali jika Anda tidak puas dengan layanan konsultasi dalam 7 hari."
              }
            ].map((faq, index) => (
              <Card3D key={index} delay={index * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dapatkan Solusi Hukum Terbaik
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Jangan biarkan masalah hukum mengganggu hidup Anda. Konsultasikan sekarang dan dapatkan kepastian hukum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
                <Phone className="w-5 h-5" />
                Hubungi Sekarang
              </button>
              <Link
                href="/kontak"
                className="px-8 py-4 bg-blue-700/30 backdrop-blur-sm text-white font-semibold rounded-2xl border border-blue-400/30 hover:bg-blue-700/40 transition-colors flex items-center gap-2 justify-center"
              >
                <Mail className="w-5 h-5" />
                Kirim Email
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}