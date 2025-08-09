'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from './ArticleCard'

interface ArticleCarouselProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  published_at: string
  view_count: number
  category?: string
  author?: string
}

export default function ArticleCarousel({ 
  category, 
  limit = 6, 
  showHeader = false,
  headerTitle = 'Artikel Pilihan'
}: ArticleCarouselProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoPlay = true
  const interval = 5000
  const showNavigation = true

  useEffect(() => {
    const fetchCarouselArticles = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles
            .filter(article => !category || article.category === category)
            .slice(0, limit)
          setArticles(mockData)
          return
        }
        
        let query = supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.order('published_at', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
          console.error('Error fetching articles:', error)
          // Fallback to mock data
          const mockData = mockArticles
            .filter(article => !category || article.category === category)
            .slice(0, limit)
          setArticles(mockData)
          return
        }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
        // Fallback to mock data
        const mockData = mockArticles
          .filter(article => !category || article.category === category)
          .slice(0, limit)
        setArticles(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchCarouselArticles()
  }, [category, limit])

  useEffect(() => {
    if (autoPlay && articles.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, articles.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">{headerTitle}</h2>
        </div>
      )}
      
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {articles.map((article) => (
              <div key={article.id} className="w-full flex-shrink-0">
                <div className="px-4">
                  <ArticleCard 
                    article={article} 
                    variant="featured" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {showNavigation && articles.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {articles.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 