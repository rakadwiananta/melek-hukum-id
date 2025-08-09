'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, AlertTriangle, Users, Target, Sparkles, TrendingDown, BarChart3, Award } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

// Data statistik dari sumber kredibel
const heroStats = {
  // Corruption Perception Index 2023 - Transparency International
  cpiScore: 34,
  cpiRank: 115,
  cpiTotal: 180,
  
  // Data KPK 2023
  kasusKorupsi2023: 132,
  kerugianNegara: "Rp 15.2 Triliun",
  pengembalianAset: "Rp 3.7 Triliun",
  
  // Tren 3 tahun terakhir
  trenPenurunan: 12 // persen
}

// 3D Shield Component with Animation
const Shield3D = ({ className = "" }: { className?: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-red-600 blur-3xl"
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shield Container */}
      <motion.div
        className="relative bg-gradient-to-br from-red-100 to-red-200 p-6 md:p-8 rounded-full shadow-2xl"
        animate={{
          rotateY: isHovered ? 180 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <motion.div
          className="backface-hidden"
          style={{ transform: "translateZ(50px)" }}
        >
          <Shield className="w-16 h-16 md:w-20 md:h-20 text-red-600 relative z-10" />
        </motion.div>
        
        {/* Back Side */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center backface-hidden"
          style={{ 
            transform: "rotateY(180deg) translateZ(50px)",
            backfaceVisibility: "hidden"
          }}
        >
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-full p-6 md:p-8">
            <Award className="w-16 h-16 md:w-20 md:h-20 text-white" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Floating Particles */}
      {!isMobile && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-400 rounded-full"
          initial={{
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{
            x: Math.cos(i * 60 * Math.PI / 180) * 100,
            y: Math.sin(i * 60 * Math.PI / 180) * 100,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  )
}

// Animated Statistics Component
const AnimatedStat = ({ label, value, icon: Icon, color, delay = 0 }: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 ${color} rounded-xl mb-2`}
      >
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ 
          type: "spring",
          stiffness: 200,
          delay: delay + 0.2
        }}
        className="text-xl md:text-2xl font-bold text-gray-900"
      >
        {value}
      </motion.div>
      <div className="text-xs md:text-sm text-gray-600">{label}</div>
    </motion.div>
  )
}

export default function AntiKorupsiHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <section ref={ref} className="relative min-h-[100vh] md:min-h-[90vh] flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced 3D Batik Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-blue-50"></div>
        
        {/* Animated Batik Kawung Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="batik-kawung" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <motion.circle 
                cx="10" 
                cy="10" 
                r="8"
                fill="none"
                stroke="#DC2626"
                strokeWidth="0.5"
                animate={!isMobile ? { r: [8, 9, 8] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle 
                cx="10" 
                cy="10" 
                r="4"
                fill="#DC2626"
                opacity="0.3"
                animate={!isMobile ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#batik-kawung)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="text-center"
        >
          {/* 3D Shield Icon */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <Shield3D />
          </motion.div>
          
          {/* 3D Title with Wayang Shadow Effect */}
          <motion.h1 
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 md:mb-6 relative"
          >
            <motion.span 
              className="inline-block transform hover:scale-110 transition-transform duration-300"
              style={{
                textShadow: isMobile 
                  ? "2px 2px 4px rgba(0,0,0,0.1)" 
                  : "5px 5px 10px rgba(0,0,0,0.2), -5px -5px 10px rgba(255,255,255,0.5)"
              }}
            >
              <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Anti
              </span>
            </motion.span>{' '}
            <motion.span 
              className="inline-block transform hover:scale-110 transition-transform duration-300"
              style={{
                textShadow: isMobile 
                  ? "2px 2px 4px rgba(0,0,0,0.1)" 
                  : "5px 5px 10px rgba(0,0,0,0.2), -5px -5px 10px rgba(255,255,255,0.5)"
              }}
            >
              Korupsi
            </motion.span>
            <Sparkles className="absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-spin-slow" />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto px-4"
          >
            Bersama kita berantas korupsi di Indonesia. Pelajari, pahami, dan ikut berpartisipasi dalam pemberantasan korupsi.
          </motion.p>

          {/* Real Statistics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10 px-4 md:px-0"
          >
            <AnimatedStat
              label="CPI Score 2023"
              value={heroStats.cpiScore}
              icon={BarChart3}
              color="bg-red-600"
              delay={0.6}
            />
            <AnimatedStat
              label="Peringkat Dunia"
              value={`${heroStats.cpiRank}/${heroStats.cpiTotal}`}
              icon={TrendingDown}
              color="bg-orange-600"
              delay={0.7}
            />
            <AnimatedStat
              label="Kasus 2023"
              value={heroStats.kasusKorupsi2023}
              icon={AlertTriangle}
              color="bg-yellow-600"
              delay={0.8}
            />
            <AnimatedStat
              label="Kerugian Negara"
              value={heroStats.kerugianNegara}
              icon={Shield}
              color="bg-blue-600"
              delay={0.9}
            />
          </motion.div>

          {/* 3D Feature Cards with Improved Mobile Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 px-4 md:px-0"
          >
            {[
              {
                icon: AlertTriangle,
                title: "Kenali Korupsi",
                description: "Pelajari berbagai bentuk korupsi dan dampaknya terhadap masyarakat.",
                color: "yellow",
                gradient: "from-yellow-400 to-orange-500",
                delay: 0.8,
                stats: "13 Jenis Korupsi"
              },
              {
                icon: Users,
                title: "Cara Melapor",
                description: "Ketahui cara melapor korupsi dengan aman dan terlindungi.",
                color: "blue",
                gradient: "from-blue-400 to-indigo-500",
                delay: 0.9,
                stats: "6 Saluran Lapor"
              },
              {
                icon: Target,
                title: "Test Pengetahuan",
                description: "Uji pemahaman Anda tentang anti-korupsi melalui kuis interaktif.",
                color: "green",
                gradient: "from-green-400 to-teal-500",
                delay: 1.0,
                stats: "50+ Soal Kuis"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={!isMobile ? { 
                  y: -10, 
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                } : {}}
                whileTap={{ scale: 0.98 }}
                className="relative transform-gpu"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: 1000
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-xl opacity-20 animate-pulse`}></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 group overflow-hidden">
                  {/* Enhanced Batik Pattern Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <pattern id={`batik-${index}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                        <circle cx="12.5" cy="12.5" r="10" fill="none" stroke={`var(--${item.color}-600)`} strokeWidth="0.5" opacity="0.3"/>
                        <path d="M0,12.5 L25,12.5 M12.5,0 L12.5,25" stroke={`var(--${item.color}-600)`} strokeWidth="0.3" opacity="0.2"/>
                      </pattern>
                      <rect width="100" height="100" fill={`url(#batik-${index})`} />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="flex justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`p-3 bg-gradient-to-r ${item.gradient} rounded-xl shadow-lg`}>
                        <item.icon className={`w-8 h-8 md:w-10 md:h-10 text-white`} />
                      </div>
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3">{item.description}</p>
                    <div className="text-xs md:text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      {item.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Ornaments - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-20 h-20 opacity-10"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.polygon
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="50" cy="50" r="20" fill="#DC2626" opacity="0.2" />
            </svg>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [360, 180, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 right-10 w-24 h-24 opacity-10"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M50,20 L80,50 L50,80 L20,50 Z"
                fill="none"
                stroke="#1E40AF"
                strokeWidth="2"
                animate={{ 
                  d: [
                    "M50,20 L80,50 L50,80 L20,50 Z",
                    "M50,10 L90,50 L50,90 L10,50 Z",
                    "M50,20 L80,50 L50,80 L20,50 Z"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <circle cx="50" cy="50" r="10" fill="#1E40AF" opacity="0.3" />
            </svg>
          </motion.div>
        </>
      )}
    </section>
  )
}
