// types/kamus.ts
export interface Term {
    id: number
    term: string
    category: string
    definition: string
    example?: string
    legalBasis: string
    relatedTerms?: string[]
    trending?: boolean
    englishTerm?: string
    additionalNotes?: string
  }
  
  export interface Category {
    id: string
    name: string
    count: number
  }
  
  export interface TermsMetadata {
    total: number
    lastUpdated: string
    sources: string[]
    categories: Category[]
  }
  
  export interface TermsDatabase {
    metadata: TermsMetadata
    terms: Term[]
    getTermsByLetter: (letter: string) => Term[]
    getRandomTerm: () => Term
    getTotalByCategory: () => { [key: string]: number }
  }
  