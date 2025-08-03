'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/app/lib/utils'

export default function SpectacularNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const navY = useTransform(scrollY, [0, 100], [0, -10])
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      style={{ y: navY, opacity: navOpacity }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-effect" : "bg-white/80"
      )}
    >
      <div className="container-padding mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo with 3D effect */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative w-10 h-10">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-1 bg-white rounded-md flex items-center justify-center">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-pink-600">
                    MH
                  </span>
                </div>
              </div>
              <span className="font-bold text-lg hidden sm:block">
                Melek Hukum ID
              </span>
            </motion.div>
          </Link>

          {/* Nav Items with Hover Effects */}
          <div className="hidden lg:flex items-center gap-6">
            {['Kamus', 'Solusi', 'Regulasi', 'Anti-Korupsi'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace('-', '')}`}
                  className="relative group px-4 py-2"
                >
                  <span className="relative z-10 font-medium">
                    {item}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="nav-hover"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 opacity-20 blur-xl" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Spectacular CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-spectacular hidden md:block"
          >
            Mulai Belajar
          </motion.button>

          {/* Mobile Menu with 3D Hamburger */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="space-y-2">
              <motion.span
                className="block w-6 h-0.5 bg-gradient-to-r from-red-500 to-pink-600"
                animate={{ rotateZ: 0 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-gradient-to-r from-red-500 to-pink-600"
                animate={{ scaleX: 1 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-gradient-to-r from-red-500 to-pink-600"
                animate={{ rotateZ: 0 }}
              />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
