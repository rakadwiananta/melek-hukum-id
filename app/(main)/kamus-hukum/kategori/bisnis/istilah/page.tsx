'use client'

import React from 'react'
import { BusinessLawDictionary } from '@/app/components/kamus/istilah/IstilahBisnis'
import { motion } from 'framer-motion'
import { BookOpen, ChevronRight, Briefcase, ScrollText } from 'lucide-react'
import Link from 'next/link'
import PatternBackground from '@/app/components/nusantara/PatternBackground'

export default function IstilahBisnisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 relative overflow-hidden">
      {/* Background Pattern */}
      <PatternBackground />
      
      {/* Enhanced Breadcrumb Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-amber-100 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/kamus-hukum" className="text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Kamus Hukum
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/kamus-hukum/kategori/bisnis" className="text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Bisnis
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-amber-600 font-semibold flex items-center gap-1">
              <ScrollText className="w-4 h-4" />
              Istilah
            </span>
          </nav>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-4 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl shadow-xl"
            >
              <ScrollText className="h-10 w-10 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
                  Istilah Hukum Bisnis Indonesia
                </span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-2">
                Kamus lengkap istilah hukum bisnis dengan definisi, contoh, dan dasar hukum
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Dictionary Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div 
          className="rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl ring-1 ring-gray-200/70 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <BusinessLawDictionary />
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full shadow-lg flex items-center justify-center text-white z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <BookOpen className="w-6 h-6" />
      </motion.button>
    </div>
  )
}