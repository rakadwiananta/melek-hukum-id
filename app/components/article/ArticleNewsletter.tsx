'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { toast } from '@/app/components/ui/use-toast'

interface ArticleNewsletterProps {
  className?: string
}

export default function ArticleNewsletter({ className = '' }: ArticleNewsletterProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: 'Email diperlukan',
        description: 'Silakan masukkan alamat email Anda.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubscribed(true)
        setEmail('')
        toast({
          title: 'Berhasil berlangganan!',
          description: 'Anda akan menerima artikel hukum terbaru di email Anda.',
          variant: 'default',
        })
      } else {
        throw new Error('Gagal berlangganan')
      }
    } catch (error) {
      toast({
        title: 'Gagal berlangganan',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (subscribed) {
    return (
      <div className={`bg-gradient-to-r from-primary to-primary-600 text-white rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Terima Kasih!</h3>
        </div>
        <p className="text-primary-100">
          Anda telah berhasil berlangganan newsletter kami. Artikel hukum terbaru akan dikirim ke email Anda.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Berlangganan Newsletter</h3>
          <p className="text-sm text-gray-600">Dapatkan artikel hukum terbaru langsung di email Anda</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email Anda"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Berlangganan Gratis'}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        <p>✓ Artikel hukum terbaru setiap minggu</p>
        <p>✓ Tips dan panduan hukum praktis</p>
        <p>✓ Bisa berhenti berlangganan kapan saja</p>
      </div>
    </div>
  )
} 