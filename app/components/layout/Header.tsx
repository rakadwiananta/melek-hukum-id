'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Artikel', href: '/artikel' },
  { name: 'Kamus Hukum', href: '/kamus-hukum' },
  { name: 'Solusi', href: '/solusi' },
  { name: 'Regulasi', href: '/regulasi' },
  { name: 'Anti Korupsi', href: '/anti-korupsi' },
  { name: 'Panduan', href: '/panduan' },
]

  return (
    <header className="bg-white shadow-sm border-b relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                {/* Logo Icon */}
                <div className="relative mr-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#92400e', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    
                    {/* Law scale symbol */}
                    <g transform="translate(2, 2)">
                      {/* Scale base */}
                      <rect x="11" y="22.5" width="3" height="4" fill="url(#logoGrad)" rx="1.5"/>
                      
                      {/* Scale pole */}
                      <rect x="12" y="7.5" width="1" height="17.5" fill="url(#logoGrad)"/>
                      
                      {/* Scale beam */}
                      <rect x="5" y="7.5" width="14" height="1" fill="url(#logoGrad)" rx="0.5"/>
                      
                      {/* Left pan */}
                      <path d="M4 8.5 L9 8.5 L8 12.5 L5 12.5 Z" fill="url(#logoGrad)" opacity="0.8"/>
                      <path d="M3 8.5 L10 8.5" stroke="url(#logoGrad)" strokeWidth="0.5" fill="none"/>
                      
                      {/* Right pan */}
                      <path d="M15 8.5 L20 8.5 L19 12.5 L16 12.5 Z" fill="url(#logoGrad)" opacity="0.8"/>
                      <path d="M14 8.5 L21 8.5" stroke="url(#logoGrad)" strokeWidth="0.5" fill="none"/>
                      
                      {/* Chains */}
                      <path d="M7 8.5 L7 9.5" stroke="url(#logoGrad)" strokeWidth="0.5"/>
                      <path d="M17 8.5 L17 9.5" stroke="url(#logoGrad)" strokeWidth="0.5"/>
                    </g>
                  </svg>
                </div>
                
                {/* Text Logo */}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-red-600 mr-2">MELEK</span>
                    <span className="text-lg font-bold text-red-600">HUKUM</span>
                  </div>
                  <span className="text-xs text-gray-600 -mt-1">Portal Hukum Indonesia</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors relative z-10"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 relative z-10"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden relative z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 