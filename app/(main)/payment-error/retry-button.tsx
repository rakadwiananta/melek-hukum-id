"use client"

import { RefreshCw } from 'lucide-react'

export default function RetryButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
    >
      <RefreshCw className="w-4 h-4" />
      Coba Lagi
    </button>
  )
} 