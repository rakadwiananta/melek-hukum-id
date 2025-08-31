'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { toast } from '@/app/components/ui/use-toast'
import { Mail, Shield, Bell, Zap, CheckCircle } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    text: 'Tips anti-korupsi'
  },
  {
    icon: Bell,
    text: 'Update regulasi terbaru'
  },
  {
    icon: Zap,
    text: 'Panduan hukum praktis'
  }
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Email tidak valid',
        description: 'Masukkan alamat email yang valid',
        variant: 'destructive'
      })
      return
    }

    try {
      setIsSubmitting(true)
      
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
        toast({
          title: 'Berhasil berlangganan!',
          description: 'Anda akan menerima update terbaru dari kami',
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Gagal berlangganan')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast({
        title: 'Gagal berlangganan',
        description: 'Silakan coba lagi nanti',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Terima Kasih!
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Anda telah berhasil berlangganan newsletter kami. Kami akan mengirimkan update terbaru seputar hukum dan anti-korupsi ke email Anda.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Dapatkan Update Hukum Terbaru
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Berlangganan newsletter kami untuk mendapatkan informasi terbaru seputar hukum, regulasi, dan tips anti-korupsi langsung ke email Anda.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Privacy Note */}
            <p className="text-sm text-gray-400">
              Kami menghargai privasi Anda. Email Anda tidak akan dibagikan kepada pihak ketiga.
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Berlangganan Newsletter
              </h3>
              <p className="text-gray-600">
                Gratis dan tanpa spam
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Memproses...' : 'Berlangganan Sekarang'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Dengan berlangganan, Anda menyetujui{' '}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Syarat & Ketentuan
                </a>{' '}
                dan{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Kebijakan Privasi
                </a>{' '}
                kami.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
