'use client'

import React from 'react'
import { Scale } from 'lucide-react'

/**
 * Regulasi Kasus Page - Lightweight version
 */

export default function RegulasiKasusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <Scale className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Regulasi & Kasus Hukum
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kumpulan regulasi dan studi kasus hukum di Indonesia
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
          <p className="text-gray-600 text-center">
            Konten regulasi dan kasus hukum akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  )
}
