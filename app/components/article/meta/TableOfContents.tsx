'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, List, BookOpen } from 'lucide-react'

interface TableOfContentsProps {
  content: string
  className?: string
}

interface TocItem {
  id: string
  text: string
  level: number
  isActive: boolean
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const tocRef = useRef<HTMLDivElement>(null)

  // Generate TOC items from content
  useEffect(() => {
    const generateToc = () => {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = content
      
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const items: TocItem[] = []
      
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1))
        const text = heading.textContent || ''
        const id = `section-${index}`
        
        // Set ID on the heading element
        heading.setAttribute('id', id)
        
        items.push({
          id,
          text,
          level,
          isActive: false
        })
      })
      
      setTocItems(items)
    }

    // Wait for content to be rendered
    setTimeout(generateToc, 100)
  }, [content])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (tocItems.length === 0) return

      const scrollPosition = window.scrollY + 100

      let currentActive = ''
      tocItems.forEach(item => {
        const element = document.getElementById(item.id)
        if (element) {
          const elementTop = element.offsetTop
          if (scrollPosition >= elementTop) {
            currentActive = item.id
          }
        }
      })

      setActiveSection(currentActive)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1: return 'font-bold text-lg'
      case 2: return 'font-semibold text-base ml-2'
      case 3: return 'font-medium text-sm ml-4'
      case 4: return 'text-sm ml-6'
      case 5: return 'text-xs ml-8'
      case 6: return 'text-xs ml-10'
      default: return 'text-base'
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
      ref={tocRef}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-semibold text-lg">Daftar Isi</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Sembunyikan daftar isi' : 'Tampilkan daftar isi'}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* TOC Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 max-h-96 overflow-y-auto">
              <nav className="space-y-2">
                {tocItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left p-2 rounded-lg transition-all duration-200 hover:bg-amber-50 hover:text-amber-700 ${
                        activeSection === item.id
                          ? 'bg-amber-100 text-amber-800 border-l-4 border-amber-500'
                          : 'text-gray-700'
                      } ${getLevelClass(item.level)}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                        <span className="truncate">{item.text}</span>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile TOC Toggle */}
      <div className="md:hidden border-t border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 text-left text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isExpanded ? 'Sembunyikan' : 'Tampilkan'} Daftar Isi
            </span>
          </span>
          <span className="text-xs text-gray-500">
            {tocItems.length} bagian
          </span>
        </button>
      </div>
    </motion.div>
  )
}
