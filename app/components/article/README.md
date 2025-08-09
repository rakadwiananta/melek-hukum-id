# Struktur Folder Article

Refaktor selesai! File-file komponen artikel telah dikelompokkan ke dalam dua folder:

## display/ (komponen tampilan utama artikel)
- ArticleGrid.tsx
- ArticleCarousel.tsx
- ArticleCompact.tsx
- ArticleContent.tsx
- ArticleFeatured.tsx
- ArticleList.tsx
- ArticleMasonry.tsx
- ArticleHero.tsx
- ArticleBody.tsx
- ArticleHeader.tsx
- ArticleCard.tsx
- FeaturedArticle.tsx
- LatestArticles.tsx
- PopularArticles.tsx
- CategoryArticles.tsx
- RelatedArticles.tsx

## meta/ (komponen pendukung, navigasi, statistik, dsb)
- ArticleStats.tsx
- ArticleTimeline.tsx
- CategoryFilter.tsx
- ShareModal.tsx
- TableOfContents.tsx
- ArticleFooter.tsx
- ArticleNewsletter.tsx
- ReadingProgress.tsx

## Import
Gunakan import berikut:
- `import { ArticleList } from '@/app/components/article/display'`
- `import { ArticleStats } from '@/app/components/article/meta'`
- Atau import langsung: `import ArticleList from '@/app/components/article/display/ArticleList'` 