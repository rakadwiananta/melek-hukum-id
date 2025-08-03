'use client'

import { motion } from 'framer-motion'

export default function SpectacularLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="relative">
        {/* 3D Cube Loader */}
        <div className="loader-cube">
          <div className="loader-cube-face"></div>
          <div className="loader-cube-face"></div>
          <div className="loader-cube-face"></div>
          <div className="loader-cube-face"></div>
        </div>
        
        {/* Loading Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold gradient-text" data-text="Melek Hukum ID">
            Melek Hukum ID
          </h3>
          <motion.div
            className="flex justify-center gap-1 mt-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'].map((char, i) => (
              <motion.span
                key={i}
                className="text-sm text-gray-600"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.5
                    }
                  }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
