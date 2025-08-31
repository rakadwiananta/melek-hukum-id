'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SpectacularHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay animations to improve initial load
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Simplified Background Design */}
      <div className="absolute inset-0">
        {/* Minimal Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="min-h-screen flex items-center py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-sm font-medium text-red-700">Platform Hukum #1 di Indonesia</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]">
                <span className="block">Pahami Hukum</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                  Indonesia
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Platform edukasi hukum terlengkap untuk masyarakat Indonesia. 
                Akses ribuan informasi hukum, template dokumen, dan panduan praktis anti-korupsi.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/kamus-hukum"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:bg-gray-800"
                >
                  <span className="relative z-10">Mulai Belajar</span>
                  <svg 
                    className="relative z-10 w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link 
                  href="/tools/kuis-korupsi"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
                >
                  <svg 
                    className="w-5 h-5 mr-2 text-red-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Test Anti-Korupsi</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { value: '500+', label: 'Istilah Hukum' },
                  { value: '50+', label: 'Template' },
                  { value: '10K+', label: 'Pengguna' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Simplified Visual Design */}
            <div className="relative order-1 lg:order-2">
              <div className="relative mx-auto w-full max-w-lg">
                {/* Simple Background Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-72 h-72 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-30 blur-3xl" />
                </div>

                {/* Simplified Justice Scale Design */}
                <div className="relative z-10">
                  {/* Simple SVG Design */}
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="200"
                      cy="200"
                      r="180"
                      fill="url(#gradient1)"
                      opacity="0.1"
                    />
                    
                    {/* Justice Scale - Simplified */}
                    <g transform="translate(200, 200)">
                      {/* Central Pole */}
                      <rect x="-4" y="-120" width="8" height="120" fill="#374151" rx="4"/>
                      
                      {/* Horizontal Bar */}
                      <rect x="-60" y="-120" width="120" height="8" fill="#374151" rx="4"/>
                      
                      {/* Left Scale */}
                      <circle cx="-50" cy="-80" r="25" fill="#EF4444" opacity="0.8"/>
                      <path d="M -50 -80 L -50 -120" stroke="#374151" strokeWidth="3" fill="none"/>
                      
                      {/* Right Scale */}
                      <circle cx="50" cy="-80" r="25" fill="#3B82F6" opacity="0.8"/>
                      <path d="M 50 -80 L 50 -120" stroke="#374151" strokeWidth="3" fill="none"/>
                      
                      {/* Center Balance */}
                      <circle cx="0" cy="-120" r="8" fill="#10B981"/>
                    </g>
                    
                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEE2E2" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.5"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
