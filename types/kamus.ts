// types/kamus.ts
export interface KamusTerm {
  id: string
  term: string
  definition: string
  category: string
  examples?: string[]
  related_terms?: string[]
  created_at: string
  updated_at: string
}

export interface KamusCategory {
  id: string
  name: string
  description: string
  slug: string
  term_count: number
  created_at: string
  updated_at: string
}

export interface KamusSearchResult {
  term: string
  definition: string
  category: string
  relevance_score: number
}

// Update: Hello to Goodbye
  