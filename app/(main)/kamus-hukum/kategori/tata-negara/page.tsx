'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  BookOpen, 
  Scale, 
  Shield, 
  Users,
  TrendingUp,
  FileText,
  Award,
  Search,
  Clock,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Globe,
  Zap,
  Target,
  BarChart3,
  Star,
  ChevronRight,
  ExternalLink,
  Info,
  Download,
  Smartphone,
  Building,
  Gavel,
  Crown,
  Flag,
  Home,
  Landmark,
  ScrollText,
  Building2,
  HeartHandshake,
  MapPin
} from 'lucide-react';

// Custom icons dengan performa optimal
const BatikPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <pattern id="batikPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.1"/>
      <path d="M0 10 Q5 5 10 10 T20 10" stroke="currentColor" strokeWidth="0.3" opacity="0.2" fill="none"/>
    </pattern>
    <rect width="100" height="100" fill="url(#batikPattern)"/>
  </svg>
);

// Simple icons for better performance
const WayangIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="3"/>
    <path d="M12 11v7M9 18l3 3 3-3"/>
  </svg>
);

const GarudaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-3 5-3-1 1 3-5 3 5 1-1 3 3-1 3 5 3-5 3 1-1-3 5-3-5-1 1-3-3 1z"/>
  </svg>
);

// Vote dan Map icons
const Vote = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Map = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
  </svg>
);

// Optimized Background
const FloatingBatikBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -right-20 w-40 h-40 opacity-5 hidden lg:block">
        <BatikPattern className="w-full h-full text-blue-600" />
      </div>
    </div>
  );
};

// Mobile-friendly Card Component
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Mobile Optimized Statistics
const StatisticsSection = () => {
  const stats = [
    { label: "Total Istilah", value: "900+", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { label: "Kategori", value: "11", icon: Landmark, color: "from-purple-500 to-purple-600" },
    { label: "Dasar Hukum", value: "150+", icon: Scale, color: "from-green-500 to-green-600" },
    { label: "Update", value: "2024", icon: Clock, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
            Database Lengkap Hukum Tata Negara Indonesia
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Berdasarkan UUD 1945, TAP MPR, dan berbagai peraturan perundang-undangan terkait
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card3D>
                  <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${stat.color} p-2 md:p-2.5 mb-3 md:mb-4`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Mobile Optimized Quick Navigation
const QuickNavigationTataNegara = () => {
  const quickLinks = [
    {
      title: 'Istilah Dasar',
      description: 'Istilah-istilah fundamental',
      href: '/kamus-hukum/kategori/tata-negara/istilah',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      count: '150+',
      nusantaraIcon: 'wayang'
    },
    {
      title: 'Lembaga Negara',
      description: 'Penjelasan lembaga-lembaga',
      href: '/kamus-hukum/kategori/tata-negara/lembaga',
      icon: Building,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      count: '145',
      nusantaraIcon: 'garuda'
    },
    {
      title: 'Sistem Pemerintahan',
      description: 'Sistem pemerintahan Indonesia',
      href: '/kamus-hukum/kategori/tata-negara/sistem',
      icon: Crown,
      color: 'from-yellow-600 to-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      count: '78',
      nusantaraIcon: 'batik'
    },
    {
      title: 'Hak & Kewajiban',
      description: 'Hak dan kewajiban warga',
      href: '/kamus-hukum/kategori/tata-negara/hak-kewajiban',
      icon: Users,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      count: '67',
      nusantaraIcon: 'wayang'
    },
    {
      title: 'Konstitusi',
      description: 'UUD 1945 dan amandemen',
      href: '/kamus-hukum/kategori/tata-negara/konstitusi',
      icon: Flag,
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      count: '89',
      nusantaraIcon: 'garuda'
    },
    {
      title: 'Pemilu & Demokrasi',
      description: 'Sistem pemilu Indonesia',
      href: '/kamus-hukum/kategori/tata-negara/pemilu',
      icon: Vote,
      color: 'from-indigo-600 to-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      count: '98',
      nusantaraIcon: 'batik'
    },
    {
      title: 'Otonomi Daerah',
      description: 'Desentralisasi daerah',
      href: '/kamus-hukum/kategori/tata-negara/otonomi',
      icon: Map,
      color: 'from-teal-600 to-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      count: '78',
      nusantaraIcon: 'wayang'
    },
    {
      title: 'Hubungan Internasional',
      description: 'Hubungan luar negeri',
      href: '/kamus-hukum/kategori/tata-negara/internasional',
      icon: Globe,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      count: '45',
      nusantaraIcon: 'garuda'
    }
  ];

  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
            Navigasi Cepat - Hukum Tata Negara
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Akses langsung ke semua sub-kategori hukum tata negara
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card3D>
                  <Link
                    href={link.href}
                    className={`block p-3 md:p-4 rounded-lg md:rounded-xl border-2 ${link.bgColor} ${link.borderColor} hover:shadow-lg transition-all duration-200 group`}
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div
                        className={`p-1.5 md:p-2 rounded-lg bg-gradient-to-r ${link.color} text-white shadow-sm`}
                      >
                        <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xs md:text-sm text-gray-900 mb-0.5 md:mb-1">
                          {link.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1 md:mb-2 line-clamp-2">
                          {link.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-sm">
                            {link.count}
                          </span>
                          <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-6 md:mt-8"
        >
          <Card3D>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl p-4 md:p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Halaman Terbaru
                </h3>
                <p className="text-xs md:text-sm mb-3 md:mb-4 opacity-90">
                  Jelajahi halaman baru dengan database lengkap 900 istilah
                </p>
                <motion.a
                  href="/kamus-hukum/kategori/tata-negara/istilah"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all text-xs md:text-sm font-medium"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Lihat Istilah Lengkap
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </motion.a>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  );
};

// Main Page Component
const TataNegaraPage = () => {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -20]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  const subKategori = [
    {
      id: '1',
      title: 'Istilah Dasar',
      description: 'Istilah-istilah fundamental dalam hukum tata negara',
      href: '/kamus-hukum/kategori/tata-negara/istilah',
      icon: '📚',
      stats: '900 istilah',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      title: 'Lembaga Negara',
      description: 'Penjelasan tentang lembaga-lembaga negara',
      href: '/kamus-hukum/kategori/tata-negara/lembaga',
      icon: '🏛️',
      stats: '145 lembaga',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '3',
      title: 'Sistem Pemerintahan',
      description: 'Sistem dan mekanisme pemerintahan Indonesia',
      href: '/kamus-hukum/kategori/tata-negara/sistem',
      icon: '👑',
      stats: '78 konsep',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: '4',
      title: 'Hak & Kewajiban',
      description: 'Hak dan kewajiban warga negara',
      href: '/kamus-hukum/kategori/tata-negara/hak-kewajiban',
      icon: '👥',
      stats: '67 hak',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingBatikBackground />
      
      {/* Sticky Header - Mobile Optimized */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="bg-white shadow-sm sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm">
            <Link href="/kamus-hukum" className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Kamus Hukum</span>
              <span className="sm:hidden">Kamus</span>
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
            <span className="font-medium text-gray-900">Tata Negara</span>
          </div>
        </div>
      </motion.div>

      {/* Hero Section - Mobile Optimized */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Hukum Tata Negara
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            Pelajari tentang hukum yang mengatur struktur dan organisasi negara, 
            hubungan antar lembaga negara, serta hak dan kewajiban warga negara.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Quick Navigation Section */}
        <QuickNavigationTataNegara />

        {/* Main Categories Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
          {subKategori.map((kategori, index) => (
            <motion.div
              key={kategori.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card3D>
                <Link
                  href={kategori.href}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 group-hover:border-blue-300">
                    <div className="flex items-center mb-3 md:mb-4">
                      <span className="text-2xl md:text-3xl mr-2 md:mr-3">
                        {kategori.icon}
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {kategori.title}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 md:py-1 rounded-full">
                          {kategori.stats}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                      {kategori.description}
                    </p>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">Pelajari lebih lanjut</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Back Button - Mobile Optimized */}
        <motion.div 
          className="mt-6 md:mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Link
            href="/kamus-hukum"
            className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm md:text-base"
          >
            ← Kembali ke Kamus Hukum
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TataNegaraPage;
