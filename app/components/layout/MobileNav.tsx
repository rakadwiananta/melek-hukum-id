'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, ChevronRight } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import SearchBar from '../ui/SearchBar'

const menuItems = [
  {
    title: 'Kamus Hukum Rakyat',
    href: '/kamus-hukum',
    icon: '📚',
    children: [
      { title: 'Istilah Dasar', href: '/kamus-hukum/istilah-dasar' },
      { title: 'Konsep Anti-Korupsi', href: '/kamus-hukum/anti-korupsi' },
      { title: 'FAQ Hukum', href: '/kamus-hukum/faq' },
    ],
  },
  {
    title: 'Solusi Masalahmu',
    href: '/solusi',
    icon: '🔧',
    children: [
      { title: 'Panduan Praktis', href: '/solusi/panduan' },
      { title: 'Template Dokumen', href: '/solusi/template' },
      { title: 'Langkah Hukum', href: '/solusi/langkah' },
    ],
  },
  {
    title: 'Sorotan Regulasi',
    href: '/regulasi',
    icon: '📰',
    children: [
      { title: 'UU Terbaru', href: '/regulasi/uu-terbaru' },
      { title: 'Opini Ahli', href: '/regulasi/opini' },
      { title: 'Dampak Regulasi', href: '/regulasi/dampak' },
    ],
  },
  {
    title: 'Fokus Anti-Korupsi',
    href: '/anti-korupsi',
    icon: '⚖️',
    children: [
      { title: 'Edukasi', href: '/anti-korupsi/edukasi' },
      { title: 'Pencegahan', href: '/anti-korupsi/pencegahan' },
      { title: 'Integritas', href: '/anti-korupsi/integritas' },
    ],
  },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden touch-target rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="touch-target rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b">
                <SearchBar className="w-full" />
              </div>

              {/* Menu Items */}
              <ul className="p-4">
                {menuItems.map((item) => (
                  <li key={item.href} className="mb-2">
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.href)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronRight 
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.href) && "rotate-90"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedItems.includes(item.href) && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-12 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block p-2 rounded text-sm hover:bg-gray-100 transition-colors"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer Links */}
              <div className="p-4 border-t mt-auto">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/tentang"
                      onClick={() => setIsOpen(false)}
                      className="block p-2 text-sm hover:text-primary transition-colors"
                    >
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kontak"
                      onClick={() => setIsOpen(false)}
                      className="block p-2 text-sm hover:text-primary transition-colors"
                    >
                      Kontak
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      onClick={() => setIsOpen(false)}
                      className="block p-2 text-sm hover:text-primary transition-colors"
                    >
                      Kebijakan Privasi
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
