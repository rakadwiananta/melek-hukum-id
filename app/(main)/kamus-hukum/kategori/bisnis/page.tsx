'use client'

import React from 'react'
import { Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Kategori Bisnis Page - Lightweight version
 */

export default function KategoriBisnisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Istilah Hukum Bisnis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kumpulan istilah hukum yang berkaitan dengan dunia bisnis dan perdagangan
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600 text-center">
            Konten istilah hukum bisnis akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  )
}
