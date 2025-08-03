'use client'

import React from 'react'
import IstilahAntiKorupsiComponent from '@/app/components/kamus/istilah/IstilahAntiKorupsiComponent'
import { motion } from 'framer-motion'
import { 
  Shield, 
  BookOpen, 
  Home,
  ChevronRight,
  BarChart3,
  Sparkles,
  Clock,
  FileText,
  TrendingUp,
  Hash
} from 'lucide-react'
import { istilahAntiKorupsiData } from '@/app/components/kamus/istilah/IstilahAntiKorupsi'

// Nusantara Background
const NusantaraBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Simplified Batik Pattern untuk performa */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23f97316' stroke-width='0.3' opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Simplified floating elements - Hidden on mobile */}
      <motion.div
        className="absolute top-20 right-10 w-24 h-24 opacity-5 hidden md:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 3, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-orange-600">
          <path d="M50 10c-5 0-10 5-10 15 0 5 2 8 4 10-2 2-4 5-4 10 0 7 5 12 9 13v15l-12 10v20h10v-15l5-5v10c0 5 2 10 8 10s8-5 8-10v-10l5 5v15h10v-20l-12-10v-15c4-1 9-6 9-13 0-5-2-8-4-10 2-2 4-5 4-10 0-10-5-15-10-15-3 0-6 2-8 5-2-3-5-5-8-5z"/>
        </svg>
      </motion.div>
    </div>
  );
};

// Optimized Statistics Bar - Mobile Responsive
const StatisticsBar = () => {
  const stats = istilahAntiKorupsiData.getStatistics()
  
  const statsData = [
    { icon: FileText, label: "Total Istilah", value: stats.totalTerms.toString() },
    { icon: Hash, label: "Kategori", value: stats.categories.toString() },
    { icon: TrendingUp, label: "Trending", value: stats.trendingTerms.toString() },
    { icon: Clock, label: "Update", value: "Nov 2024" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 md:py-3"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="flex items-center gap-1 md:gap-2"
              >
                <Icon className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">
                  <span className="font-semibold">{stat.value}</span>
                  <span className="hidden sm:inline"> {stat.label}</span>
                  <span className="sm:hidden"> {stat.label.split(' ')[0]}</span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const IstilahAntiKorupsiPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <NusantaraBackground />
      
      {/* Header Section - Mobile Optimized */}
      <div className="bg-white border-b border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
          <motion.div 
            className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href="/kamus-hukum" className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Kamus Hukum</span>
              <span className="sm:hidden">Kamus</span>
            </a>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
            <a href="/kamus-hukum/kategori/anti-korupsi" className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Shield className="h-3 w-3 md:h-4 md:w-4" />
              <span>Anti Korupsi</span>
            </a>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
            <span className="font-medium text-gray-900">Istilah</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
              Istilah Hukum Anti Korupsi
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Database lengkap {istilahAntiKorupsiData.metadata.total} istilah fundamental dalam pemberantasan korupsi Indonesia
            </p>
          </motion.div>
        </div>
      </div>

      {/* Statistics Bar */}
      <StatisticsBar />

      {/* Main Content */}
      <div className="relative z-10">
        <IstilahAntiKorupsiComponent />
      </div>
    </div>
  );
};

export default IstilahAntiKorupsiPage;
