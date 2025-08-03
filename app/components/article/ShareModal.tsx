'use client'

import { useState, useEffect } from 'react'
import { X, Copy, Check, Facebook, Twitter, Linkedin, Send, MessageCircle } from 'lucide-react'
import { toast } from '@/app/components/ui/use-toast'

interface ShareModalProps {
  url: string
  title: string
  onClose: () => void
}

export default function ShareModal({ url, title, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
          '_blank'
        )
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        )
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        )
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        )
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-600 hover:bg-sky-700',
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank'
        )
      }
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: 'Link berhasil disalin!',
        description: 'Link artikel telah disalin ke clipboard',
        variant: 'default',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: 'Gagal menyalin link',
        description: 'Silakan coba lagi',
        variant: 'destructive',
      })
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Decorative Pattern */}
        <div className="absolute -top-20 -right-20 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <pattern id="share-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="8" fill="#dc2626" opacity="0.3"/>
            </pattern>
            <rect width="100" height="100" fill="url(#share-pattern)" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-amber-600 p-6 rounded-t-3xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Bagikan Artikel
          </h2>
          <p className="text-white/80 text-sm line-clamp-2">
            {title}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Social Share Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`${option.color} text-white p-4 rounded-2xl flex flex-col items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <option.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Atau salin link:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-gray-700 text-sm"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:shadow-lg'
                }`}
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl border border-red-200">
            <p className="text-sm text-gray-700 text-center">
              <span className="font-semibold">💡 Tahukah Anda?</span><br/>
              Artikel yang dibagikan membantu meningkatkan kesadaran hukum masyarakat Indonesia
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
