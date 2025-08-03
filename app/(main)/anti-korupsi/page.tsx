'use client'

import { Metadata } from 'next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import AntiKorupsiHero from '@/app/components/anti-korupsi/AntiKorupsiHero'
import EdukasiKorupsi from '@/app/components/anti-korupsi/EdukasiKorupsi'
import CaraMelapor from '@/app/components/anti-korupsi/CaraMelapor'
import KuisSection from '@/app/components/anti-korupsi/KuisSection'
import StatistikKorupsi from '@/app/components/anti-korupsi/StatistikKorupsi'
import { HeaderBannerAd, MobileAd } from '@/app/components/ads/AdPlacements'

// Enhanced 3D Nusantara Components
const BatikPattern3D = ({ className = "" }: { className?: string }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isMobile ? 0.03 : 0.05 }}
      transition={{ duration: 2 }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <pattern id="batik3d-main" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ scale: 0.8, rotate: 0 }}
              animate={!isMobile ? { 
                scale: [0.8, 1.2, 0.8], 
                rotate: 360 
              } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M25,5 Q45,25 25,45 Q5,25 25,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={!isMobile ? { pathLength: 1 } : { pathLength: 0.5 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Mega Mendung Pattern */}
            <motion.path
              d="M0,25 Q12.5,15 25,25 T50,25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              opacity="0.5"
              animate={!isMobile ? {
                d: [
                  "M0,25 Q12.5,15 25,25 T50,25",
                  "M0,25 Q12.5,35 25,25 T50,25",
                  "M0,25 Q12.5,15 25,25 T50,25"
                ]
              } : {}}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#batik3d-main)" />
      </svg>
    </motion.div>
  )
}

const WayangShadow3D = ({ className = "" }: { className?: string }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) return null

  return (
    <motion.div
      className={`fixed ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.1, scale: 1 }}
      transition={{ duration: 2 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.svg
        width="300"
        height="400"
        viewBox="0 0 300 400"
        animate={{
          rotateY: [0, 10, -10, 0],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        {/* Wayang Gunungan Shape */}
        <defs>
          <linearGradient id="wayangGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M150 50 Q100 100 80 200 L80 350 Q150 380 220 350 L220 200 Q200 100 150 50"
          fill="url(#wayangGradient)"
          animate={{
            d: [
              "M150 50 Q100 100 80 200 L80 350 Q150 380 220 350 L220 200 Q200 100 150 50",
              "M150 40 Q90 90 70 190 L70 340 Q150 370 230 340 L230 190 Q210 90 150 40",
              "M150 50 Q100 100 80 200 L80 350 Q150 380 220 350 L220 200 Q200 100 150 50"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Decorative Elements */}
        <circle cx="150" cy="150" r="20" fill="#DC2626" opacity="0.1" />
        <circle cx="120" cy="250" r="15" fill="#DC2626" opacity="0.08" />
        <circle cx="180" cy="250" r="15" fill="#DC2626" opacity="0.08" />
      </motion.svg>
    </motion.div>
  )
}

const GarudaPancasila3D = ({ className = "" }: { className?: string }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <motion.svg
        viewBox="0 0 200 150"
        className="w-full h-full"
        initial={{ rotateX: -20 }}
        animate={!isMobile ? { 
          rotateX: [-20, 20, -20],
          rotateY: [0, 180, 360]
        } : { 
          rotateX: 0,
          rotateY: 0 
        }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        {/* Garuda Wings */}
        <motion.path
          d="M100 75 Q50 50 20 60 Q10 70 20 80 Q30 85 40 80 Q60 75 100 75"
          fill="currentColor"
          animate={!isMobile ? { 
            d: [
              "M100 75 Q50 50 20 60 Q10 70 20 80 Q30 85 40 80 Q60 75 100 75",
              "M100 75 Q50 40 20 55 Q5 65 20 80 Q35 90 45 85 Q65 80 100 75",
              "M100 75 Q50 50 20 60 Q10 70 20 80 Q30 85 40 80 Q60 75 100 75"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M100 75 Q150 50 180 60 Q190 70 180 80 Q170 85 160 80 Q140 75 100 75"
          fill="currentColor"
          animate={!isMobile ? { 
            d: [
              "M100 75 Q150 50 180 60 Q190 70 180 80 Q170 85 160 80 Q140 75 100 75",
              "M100 75 Q150 40 180 55 Q195 65 180 80 Q165 90 155 85 Q135 80 100 75",
              "M100 75 Q150 50 180 60 Q190 70 180 80 Q170 85 160 80 Q140 75 100 75"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Pancasila Shield */}
        <motion.polygon
          points="100,40 120,50 120,80 100,90 80,80 80,50"
          fill="currentColor"
          opacity="0.8"
          animate={!isMobile ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  )
}

// Floating Keris 3D Animation
const FloatingKeris3D = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed top-20 right-20 w-24 h-48 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
    >
      <motion.svg
        viewBox="0 0 50 200"
        className="w-full h-full"
        animate={{
          y: [-20, 20, -20],
          rotate: [-5, 5, -5],
          rotateY: [0, 180, 360]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          <linearGradient id="kerisGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7C2D12" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#451A03" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Keris Blade with Luk (waves) */}
        <path
          d="M25 20 Q20 40 25 60 Q30 80 25 100 Q20 120 25 140 Q30 160 25 180"
          fill="none"
          stroke="url(#kerisGradient)"
          strokeWidth="4"
        />
        {/* Keris Handle */}
        <rect x="20" y="10" width="10" height="20" fill="#451A03" opacity="0.3" rx="2" />
        <circle cx="25" cy="15" r="3" fill="#DC2626" opacity="0.4" />
      </motion.svg>
    </motion.div>
  )
}

export default function AntiKorupsiPage() {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const wayangX = useTransform(scrollY, [0, 1000], [0, 100])
  const garudaRotate = useTransform(scrollY, [0, 1000], [0, 360])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* Header Ad */}
      <HeaderBannerAd />
      
      {/* Enhanced 3D Nusantara Background */}
      <div className="fixed inset-0 z-0">
        {/* Batik Pattern Layer */}
        <BatikPattern3D className="top-0 left-0 w-full h-full text-red-300" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>
      
      {/* Wayang Shadow - Desktop Only */}
      {!isMobile && (
        <motion.div style={{ x: wayangX }}>
          <WayangShadow3D className="bottom-0 right-0 w-64 h-96" />
        </motion.div>
      )}
      
      {/* Floating Keris - Desktop Only */}
      <FloatingKeris3D />
      
      {/* Garuda Pancasila */}
      <motion.div style={{ rotate: garudaRotate }}>
        <GarudaPancasila3D className="top-1/3 left-10 w-32 h-32 text-red-200 opacity-10 hidden lg:block" />
      </motion.div>
      
      {/* Hero Section with 3D Effect */}
      <motion.div 
        className="relative z-10"
        style={{ y: backgroundY }}
      >
        <AntiKorupsiHero />
      </motion.div>
      
      {/* Mobile Ad */}
      <MobileAd className="mt-4 md:mt-8 px-4" />
      
      {/* Edukasi Korupsi with 3D Cards */}
      <div className="relative z-10">
        <EdukasiKorupsi />
      </div>
      
      {/* Statistik Korupsi with 3D Charts */}
      <div className="relative z-10">
        <StatistikKorupsi />
      </div>
      
      {/* Cara Melapor with 3D Interactive Elements */}
      <div className="relative z-10">
        <CaraMelapor />
      </div>
      
      {/* Kuis Section with 3D Game-like Interface */}
      <div className="relative z-10">
        <KuisSection />
      </div>
    </main>
  )
}
