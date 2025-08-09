// Type definitions untuk komponen Solusi

export interface SolutionItem {
    title: string
    description: string
    href: string
    downloadCount?: number
    rating?: number
    viewCount?: number
    difficulty?: string
    memberCount?: number
    responseRate?: number
    lawyerCount?: number
    satisfaction?: number
    participantCount?: number
    upcomingEvents?: number
  }
  
  export interface SolutionGroup {
    category: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    bgColor: string
    stats?: {
      totalDownloads?: number
      monthlyGrowth?: number
      totalReaders?: number
      avgReadTime?: string
      totalKonsultasi?: number
      responTime?: string
    }
    items: SolutionItem[]
  }
  
  export interface TemplateItem {
    id: string
    title: string
    description: string
    category: string
    fileType: 'docx' | 'pdf'
    downloadCount: number
    fileSize: string
    updatedAt: string
  }
  
  export interface FAQItem {
    question: string
    answer: string
    category?: string
    icon?: React.ElementType
    stats?: {
      label: string
      value: string
    }
  }
  
  export interface Statistics {
    totalAdvokat: number
    totalPosbakum: number
    totalPengadilan: number
    kasusPerYear: number
    tingkatPenyelesaian: number
  }
  
  export type SolusiCategory = 
    | 'Semua' 
    | 'Pernyataan' 
    | 'Kuasa' 
    | 'Perjanjian' 
    | 'Permohonan' 
    | 'Somasi' 
    | 'Panduan' 
    | 'Konsultasi'
  