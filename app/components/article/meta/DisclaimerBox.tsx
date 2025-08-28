'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Scale, Shield, Info } from 'lucide-react'

interface DisclaimerBoxProps {
  variant?: 'default' | 'warning' | 'info' | 'legal'
  className?: string
  showIcon?: boolean
}

export default function DisclaimerBox({ 
  variant = 'default', 
  className = '',
  showIcon = true 
}: DisclaimerBoxProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: 'text-red-600',
          title: 'text-red-800'
        }
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: 'text-blue-600',
          title: 'text-blue-800'
        }
      case 'legal':
        return {
          container: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: 'text-amber-600',
          title: 'text-amber-800'
        }
      default:
        return {
          container: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: 'text-gray-600',
          title: 'text-gray-800'
        }
    }
  }

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />
      case 'info':
        return <Info className="h-5 w-5" />
      case 'legal':
        return <Scale className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const getTitle = () => {
    switch (variant) {
      case 'warning':
        return 'Peringatan Penting'
      case 'info':
        return 'Informasi'
      case 'legal':
        return 'Pernyataan Hukum'
      default:
        return 'Penting'
    }
  }

  const getContent = () => {
    switch (variant) {
      case 'warning':
        return 'Informasi dalam artikel ini bersifat edukasi umum dan bukan merupakan nasihat hukum. Untuk masalah spesifik, sangat disarankan untuk berkonsultasi dengan praktisi hukum profesional.'
      case 'info':
        return 'Artikel ini disusun berdasarkan sumber-sumber terpercaya dan diperbarui secara berkala. Pastikan untuk selalu memverifikasi informasi terbaru.'
      case 'legal':
        return 'Konten ini disediakan "sebagaimana adanya" tanpa jaminan apapun. Melek Hukum ID tidak bertanggung jawab atas penggunaan informasi yang dapat menyebabkan kerugian.'
      default:
        return 'Informasi dalam artikel ini bersifat edukasi umum dan bukan merupakan nasihat hukum. Untuk masalah spesifik, sangat disarankan untuk berkonsultasi dengan praktisi hukum profesional.'
    }
  }

  const styles = getVariantStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`disclaimer-box border-l-4 p-4 md:p-6 rounded-lg shadow-sm ${styles.container} ${className}`}
    >
      <div className="flex items-start gap-3 md:gap-4">
        {showIcon && (
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {getIcon()}
          </div>
        )}
        <div className="flex-1">
          <h4 className={`font-semibold text-base md:text-lg mb-2 ${styles.title}`}>
            {getTitle()}
          </h4>
          <p className="text-sm md:text-base leading-relaxed opacity-90">
            {getContent()}
          </p>
          
          {/* Additional legal links for legal variant */}
          {variant === 'legal' && (
            <div className="mt-4 pt-4 border-t border-amber-200">
              <p className="text-xs opacity-75 mb-2">
                Untuk bantuan hukum profesional, silakan hubungi:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a 
                  href="https://www.kpk.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 underline"
                >
                  KPK RI
                </a>
                <span className="text-amber-600">•</span>
                <a 
                  href="https://www.kemenkumham.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 underline"
                >
                  Kemenkumham
                </a>
                <span className="text-amber-600">•</span>
                <a 
                  href="https://www.mahkamahagung.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 underline"
                >
                  Mahkamah Agung
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}