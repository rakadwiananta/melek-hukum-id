'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, List, X } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface TableOfContentsProps {
  content: string
}

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Extract headings from content
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const elements = tempDiv.querySelectorAll('h2, h3')
    const extractedHeadings: Heading[] = []
    
    elements.forEach((element, index) => {
      const text = element.textContent || ''
      const id = `heading-${index}`
      extractedHeadings.push({
        id,
        text,
        level: element.tagName === 'H2' ? 2 : 3
      })
    })
    
    setHeadings(extractedHeadings)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -70% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      if (isMobile) setIsOpen(false)
    }
  }

  if (headings.length === 0) return null

  // Mobile Floating Button
  if (isMobile) {
    return (
      <>
        {/* Floating TOC Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-red-600 to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
          aria-label="Daftar Isi"
        >
          <List className="h-6 w-6" />
        </button>

        {/* Mobile TOC Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[70vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Daftar Isi</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <nav className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={cn(
                        "transition-all duration-300",
                        heading.level === 3 && "ml-4"
                      )}
                    >
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg transition-all duration-300",
                          "hover:bg-red-50 hover:text-red-700",
                          activeId === heading.id
                            ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg"
                            : "text-gray-700"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className={cn(
                            "h-4 w-4 transition-transform",
                            activeId === heading.id && "rotate-90"
                          )} />
                          <span className={cn(
                            "line-clamp-2",
                            heading.level === 2 ? "font-semibold" : "text-sm"
                          )}>
                            {heading.text}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop Sticky Sidebar
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-red-600 to-amber-600 p-4">
          <h3 className="text-white font-bold flex items-center gap-2">
            <List className="h-5 w-5" />
            Daftar Isi
          </h3>
        </div>

        {/* Content */}
        <nav className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  "transition-all duration-300",
                  heading.level === 3 && "ml-4"
                )}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-all duration-300 text-sm",
                    "hover:bg-red-50 hover:text-red-700",
                    activeId === heading.id
                      ? "bg-red-50 text-red-700 font-semibold border-l-4 border-red-600"
                      : "text-gray-600 hover:translate-x-1"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {heading.level === 2 && (
                      <ChevronRight className={cn(
                        "h-3 w-3 transition-transform flex-shrink-0",
                        activeId === heading.id && "rotate-90"
                      )} />
                    )}
                    <span className="line-clamp-2">{heading.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Progress Indicator */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">Progress Membaca</div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-300"
              style={{ 
                width: `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </aside>
  )
}
