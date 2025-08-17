'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TemplatePerjanjianPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/solusi/template/surat-perjanjian-jual-beli')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Mengarahkan ke template perjanjian...</p>
      </div>
    </div>
  )
}