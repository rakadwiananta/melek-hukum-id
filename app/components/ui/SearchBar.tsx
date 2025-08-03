'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  className?: string
}

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Mock suggestions - replace with real API call
  useEffect(() => {
    if (query.length > 2) {
      const mockSuggestions = [
        'Cara melaporkan korupsi',
        'UU ITE pasal 27',
        'Prosedur tilang elektronik',
        'Hak konsumen dalam jual beli online',
        'Cara mengurus sertifikat tanah hilang',
      ].filter(s => s.toLowerCase().includes(query.toLowerCase()))
      
      setSuggestions(mockSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setQuery('')
      setIsOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      {/* Desktop Search */}
      <form onSubmit={handleSearch} className="hidden md:flex">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Cari artikel, panduan..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </form>

      {/* Mobile Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden touch-target rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-white"
          >
            <div className="container-padding py-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari artikel, panduan..."
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className="touch-target rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden z-50"
          >
            <ul className="py-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Search className="inline-block h-3 w-3 mr-2 text-muted-foreground" />
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
