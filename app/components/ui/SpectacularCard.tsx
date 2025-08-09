'use client'

import React from 'react'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/app/lib/utils'

interface SpectacularCardProps {
  children: React.ReactNode
  className?: string
  gradient?: 'primary' | 'secondary' | 'success' | 'warning'
  interactive?: boolean
}

export default function SpectacularCard({ 
  children, 
  className,
  gradient = 'primary',
  interactive = true
}: SpectacularCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]))
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    
    mouseX.set(x)
    mouseY.set(y)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const gradientClasses = {
    primary: 'from-red-500 to-pink-600',
    secondary: 'from-blue-500 to-purple-600',
    success: 'from-cyan-500 to-blue-600',
    warning: 'from-orange-500 to-yellow-600'
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("card-3d relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
      whileHover={{ scale: interactive ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Glow Effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 blur-2xl",
          `bg-gradient-to-br ${gradientClasses[gradient]}`
        )}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card Content */}
      <div className="card-3d-inner relative z-10 h-full">
        {/* Gradient Border */}
        <div className={cn(
          "absolute inset-0 rounded-2xl p-[2px]",
          `bg-gradient-to-br ${gradientClasses[gradient]}`
        )}>
          <div className="h-full w-full rounded-2xl bg-white dark:bg-gray-900" />
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-full p-6">
          {children}
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)',
              transform: 'translateX(-100%)'
            }}
            animate={{
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      {/* Particles */}
      {isHovered && interactive && (
        <div className="particle-container">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 200 - 100,
                y: -Math.random() * 200 - 50
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0%'
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
