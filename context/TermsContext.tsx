'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Term } from '@/types/kamus'

interface TermsContextType {
  bookmarkedTerms: number[]
  recentlyViewed: Term[]
  toggleBookmark: (termId: number) => void
  addToRecentlyViewed: (term: Term) => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
}

const TermsContext = createContext<TermsContextType | undefined>(undefined)

export function TermsProvider({ children }: { children: ReactNode }) {
  const [bookmarkedTerms, setBookmarkedTerms] = useState<number[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<Term[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const toggleBookmark = (termId: number) => {
    setBookmarkedTerms(prev => 
      prev.includes(termId) 
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
    )
  }

  const addToRecentlyViewed = (term: Term) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(t => t.id !== term.id)
      return [term, ...filtered].slice(0, 10)
    })
  }

  const addToSearchHistory = (query: string) => {
    if (query.trim()) {
      setSearchHistory(prev => {
        const filtered = prev.filter(q => q !== query)
        return [query, ...filtered].slice(0, 10)
      })
    }
  }

  return (
    <TermsContext.Provider value={{
      bookmarkedTerms,
      recentlyViewed,
      toggleBookmark,
      addToRecentlyViewed,
      searchHistory,
      addToSearchHistory
    }}>
      {children}
    </TermsContext.Provider>
  )
}

export const useTerms = () => {
  const context = useContext(TermsContext)
  if (!context) {
    throw new Error('useTerms must be used within TermsProvider')
  }
  return context
}
