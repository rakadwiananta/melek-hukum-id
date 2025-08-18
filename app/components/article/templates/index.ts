// Export all article template components and utilities

// Main template component
export { default as ArticleTemplateComponent } from './ArticleTemplate'

// Type definitions
export type {
  ArticleTemplate,
  ArticleSection,
  ArticleMetadata,
  FullArticle
} from './ArticleTemplate'

// Sample articles
export { sampleArticles, perceraianArticle, mendirikanPTArticle } from './sampleArticles'

// Supabase integration
export {
  createArticle,
  getArticleBySlug,
  getArticlesByCategory,
  searchArticles,
  incrementViewCount,
  getFeaturedArticles,
  getArticleStats,
  validateArticle,
  generateMetaDescription,
  extractKeywords,
  generateAIPrompt,
  generateSlug,
  supabase
} from './SupabaseIntegration'

// AI template and guidelines
export { 
  ARTICLE_GUIDELINES,
  SUGGESTED_TOPICS,
  AI_ARTICLE_PROMPT,
  generateArticleStructure
} from './AIArticleTemplate'

// Database types
export type {
  DatabaseArticle,
  DatabaseSection,
  DatabaseSubsection,
  DatabaseSource
} from './SupabaseIntegration'