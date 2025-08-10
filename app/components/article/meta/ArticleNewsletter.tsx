'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Mail } from 'lucide-react'
import { toast } from '@/app/components/ui/use-toast'

// Types
interface WorldBankIndicator {
  value: number | null
  date: string
}

interface NewsletterFormData {
  email: string
}

interface StatisticsData {
  internetPercent: number | null
  internetYear: number | null
  loading: boolean
  error: string | null
}

interface ArticleNewsletterProps {
  className?: string
}

// Constants
const WORLD_BANK_API_BASE = 'https://api.worldbank.org/v2/country'
const INDONESIA_CODE = 'IDN'
const INTERNET_INDICATOR = 'IT.NET.USER.ZS'

// Custom hooks
const useWorldBankStatistics = (): StatisticsData => {
  const [data, setData] = useState<StatisticsData>({
    internetPercent: null,
    internetYear: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let mounted = true

    const fetchIndicator = async () => {
      try {
        const url = `${WORLD_BANK_API_BASE}/${INDONESIA_CODE}/indicator/${INTERNET_INDICATOR}?format=json&per_page=10`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const jsonData = await response.json()
        
        if (!mounted) return
        
        // World Bank API returns array with metadata at index 0 and data at index 1
        const indicatorData = jsonData[1] as WorldBankIndicator[]
        
        // Find the most recent non-null value
        const validEntry = indicatorData?.find(entry => entry.value !== null)
        
        if (validEntry) {
          setData({
            internetPercent: Number(validEntry.value),
            internetYear: Number(validEntry.date),
            loading: false,
            error: null
          })
        } else {
          setData(prev => ({
            ...prev,
            loading: false,
            error: 'Data tidak tersedia'
          }))
        }
      } catch (error) {
        if (mounted) {
          setData(prev => ({
            ...prev,
            loading: false,
            error: 'Gagal memuat data'
          }))
        }
      }
    }

    fetchIndicator()

    return () => {
      mounted = false
    }
  }, [])

  return data
}

// Utility functions
const validateEmail = (email: string): boolean => {
  const trimmedEmail = email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(trimmedEmail)
}

// Main component
export default function ArticleNewsletter({ className = '' }: ArticleNewsletterProps) {
  const [email, setEmail] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const statistics = useWorldBankStatistics()

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()
    
    if (!trimmedEmail) {
      toast({
        title: 'Email diperlukan',
        description: 'Silakan masukkan alamat email Anda.',
        variant: 'destructive'
      })
      return
    }
    
    if (!validateEmail(trimmedEmail)) {
      toast({
        title: 'Email tidak valid',
        description: 'Silakan masukkan alamat email yang valid.',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail } as NewsletterFormData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      setIsSubscribed(true)
      setEmail('')
      
      toast({
        title: 'Berhasil!',
        description: 'Terima kasih telah berlangganan newsletter kami.',
      })
    } catch (error) {
      toast({
        title: 'Gagal berlangganan',
        description: error instanceof Error ? error.message : 'Silakan coba lagi nanti.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [email])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const handleUnsubscribe = useCallback(() => {
    setIsSubscribed(false)
  }, [])

  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      {/* Outer container with subtle background */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50">
        {/* Inner card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5">
            {isSubscribed ? (
              // Success state
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Terima kasih!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Anda telah berhasil berlangganan newsletter kami.
                </p>
                <button
                  onClick={handleUnsubscribe}
                  className="text-sm text-amber-600 hover:text-amber-700 underline"
                >
                  Kembali
                </button>
              </div>
            ) : (
              // Form state
              <>
                {/* Header with icon */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Langganan Newsletter
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Ringkas & relevan — langsung ke email
                    </p>
                  </div>
                </div>

                {/* Email form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="nama@domain.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 
                               text-sm placeholder:text-gray-400 
                               focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                               disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                      disabled={isSubmitting}
                      aria-label="Alamat email"
                      required
                    />
                    
                    <p className="text-xs text-gray-500">
                      Privasi terjaga • Hanya newsletter
                    </p>

                    {/* Submit button (hidden visually but functional) */}
                    <button
                      type="submit"
                      className="sr-only"
                      disabled={isSubmitting}
                      aria-label="Berlangganan newsletter"
                    >
                      Berlangganan
                    </button>
                  </div>
                </form>

                {/* Bottom info sections */}
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3 text-xs">
                  {/* Benefits */}
                  <div className="space-y-1">
                    <div className="flex items-start gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 leading-tight">Ringkasan mingguan</span>
                    </div>
                  </div>

                  {/* center: privacy/filler (centered) */}
                  <div className="flex items-center justify-center">
                    <div className="text-center text-[11px] text-gray-500 whitespace-nowrap">Berhenti kapan saja</div>
                  </div>

                  {/* Statistics */}
                  <div className="text-right">
                    <div className="text-gray-500 mb-0.5">Akses Internet (ID)</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {statistics.loading ? (
                        <span className="text-sm">...</span>
                      ) : statistics.error ? (
                        <span className="text-sm text-gray-400">—</span>
                      ) : (
                        `${Math.round(statistics.internetPercent || 0)}%`
                      )}
                    </div>
                    {statistics.internetYear && (
                      <div className="text-[10px] text-gray-400">
                        {statistics.internetYear}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
