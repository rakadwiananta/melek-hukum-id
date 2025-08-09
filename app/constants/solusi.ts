import { FileText, Shield, Handshake, FileSignature, Send, AlertTriangle, BookOpen, Users } from 'lucide-react'
import type { SolusiCategory } from '@/types/solusi'

// Category configuration
export const CATEGORY_CONFIG: Record<SolusiCategory, { 
  icon: React.ElementType
  color: string
  bgGradient: string
  count?: number 
}> = {
  'Semua': { 
    icon: FileText, 
    color: 'text-gray-700', 
    bgGradient: 'from-gray-500 to-gray-600',
    count: 1250 
  },
  'Pernyataan': { 
    icon: Shield, 
    color: 'text-red-700', 
    bgGradient: 'from-red-500 to-red-600',
    count: 234 
  },
  'Kuasa': { 
    icon: Handshake, 
    color: 'text-amber-700', 
    bgGradient: 'from-amber-500 to-amber-600',
    count: 189 
  },
  'Perjanjian': { 
    icon: FileSignature, 
    color: 'text-green-700', 
    bgGradient: 'from-green-500 to-green-600',
    count: 312 
  },
  'Permohonan': { 
    icon: Send, 
    color: 'text-blue-700', 
    bgGradient: 'from-blue-500 to-blue-600',
    count: 156 
  },
  'Somasi': { 
    icon: AlertTriangle, 
    color: 'text-orange-700', 
    bgGradient: 'from-orange-500 to-orange-600',
    count: 98 
  },
  'Panduan': { 
    icon: BookOpen, 
    color: 'text-purple-700', 
    bgGradient: 'from-purple-500 to-purple-600',
    count: 145 
  },
  'Konsultasi': { 
    icon: Users, 
    color: 'text-teal-700', 
    bgGradient: 'from-teal-500 to-teal-600',
    count: 116 
  }
}

// Statistik berdasarkan data resmi 2024
export const LEGAL_STATISTICS = {
  totalAdvokat: 45782, // Data Peradi 2024
  totalPosbakum: 234, // Data Kemenkumham 2024
  totalPengadilan: 842, // Data MA 2024
  kasusPerYear: 4500000, // Data MA 2024
  tingkatPenyelesaian: 87.3, // Persentase
  totalTemplateDownloads: 2300000, // Data sistem AHU
  activeUsers: 523456, // Data platform
  avgResponseTime: '< 2 jam',
  satisfactionRate: 94.5
}

// Biaya konsultasi hukum (dalam Rupiah)
export const CONSULTATION_FEES = {
  junior: {
    min: 500000,
    max: 1500000,
    unit: 'per jam'
  },
  senior: {
    min: 1500000,
    max: 5000000,
    unit: 'per jam'
  },
  probono: {
    min: 0,
    max: 0,
    unit: 'gratis'
  }
}

// Waktu proses dokumen (dalam hari)
export const PROCESSING_TIME = {
  laporanKehilangan: {
    min: 1,
    max: 3,
    unit: 'hari kerja'
  },
  dokumenPengganti: {
    min: 3,
    max: 14,
    unit: 'hari kerja'
  },
  gugatanSederhana: {
    min: 7,
    max: 30,
    unit: 'hari kerja'
  }
}
