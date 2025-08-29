'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileCommentFABProps {
  commentCount: number
  onScrollToComments: () => void
  onOpenCommentForm: () => void
}

export default function MobileCommentFAB({ 
  commentCount, 
  onScrollToComments, 
  onOpenCommentForm 
}: MobileCommentFABProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setShowOptions(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleMainButtonClick = () => {
    if (commentCount > 0) {
      setShowOptions(!showOptions)
    } else {
      onOpenCommentForm()
    }
  }

  return (
    <>
      {/* Mobile FAB - Only visible on mobile */}
      <div className="md:hidden">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed bottom-20 right-4 z-40"
            >
              {/* Options Menu */}
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mb-3 space-y-2"
                  >
                    <button
                      onClick={() => {
                        onScrollToComments()
                        setShowOptions(false)
                      }}
                      className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-full shadow-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors w-full"
                    >
                      <ChevronUp className="h-4 w-4" />
                      Lihat Komentar
                    </button>
                    
                    <button
                      onClick={() => {
                        onOpenCommentForm()
                        setShowOptions(false)
                      }}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Tulis Komentar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main FAB Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMainButtonClick}
                className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                
                {/* Comment Count Badge */}
                {commentCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {commentCount > 99 ? '99+' : commentCount}
                  </span>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop */}
      {showOptions && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
          onClick={() => setShowOptions(false)}
        />
      )}
    </>
  )
}