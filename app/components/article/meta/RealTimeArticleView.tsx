'use client'

import { useEffect } from 'react'
import { Eye, Heart, Clock } from 'lucide-react'
import { useArticleViews } from '@/app/hooks/useArticleViews'

interface RealTimeArticleViewProps {
  articleId: string
  initialViewCount?: number
  initialLikeCount?: number
  className?: string
}

export default function RealTimeArticleView({ 
  articleId, 
  initialViewCount = 0, 
  initialLikeCount = 0,
  className = '' 
}: RealTimeArticleViewProps) {
  const { viewData, loading, hasIncrementedView } = useArticleViews({
    articleId,
    autoIncrement: true,
    enableRealTime: true
  })

  // Use real-time data if available, fallback to initial values
  const currentViewCount = viewData?.view_count ?? initialViewCount
  const currentLikeCount = viewData?.like_count ?? initialLikeCount

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 ${className}`}>
      {/* Top row on mobile: View and Like counts */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* View Count */}
        <div className="flex items-center gap-1.5">
          <Eye className="h-4 w-4 flex-shrink-0" />
          <span className="font-medium text-xs sm:text-sm">
            {currentViewCount.toLocaleString()}
          </span>
          <span className="hidden sm:inline text-xs sm:text-sm">views</span>
          {hasIncrementedView && !loading && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1" 
                 title="View counted" />
          )}
        </div>

        {/* Like Count */}
        <div className="flex items-center gap-1.5">
          <Heart className="h-4 w-4 flex-shrink-0" />
          <span className="font-medium text-xs sm:text-sm">
            {currentLikeCount.toLocaleString()}
          </span>
          <span className="hidden sm:inline text-xs sm:text-sm">likes</span>
        </div>
      </div>

      {/* Bottom row on mobile: Real-time indicator */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        <span>Live</span>
      </div>
    </div>
  )
}

// Compact version for article cards/lists
export function CompactRealTimeView({ 
  articleId, 
  initialViewCount = 0,
  showLive = false,
  className = '' 
}: {
  articleId: string
  initialViewCount?: number
  showLive?: boolean
  className?: string
}) {
  const { viewData } = useArticleViews({
    articleId,
    autoIncrement: false, // Don't auto-increment in lists
    enableRealTime: true
  })

  const currentViewCount = viewData?.view_count ?? initialViewCount

  return (
    <div className={`flex items-center gap-1 text-xs text-gray-500 ${className}`}>
      <Eye className="h-3 w-3 flex-shrink-0" />
      <span className="font-medium">{currentViewCount.toLocaleString()}</span>
      {showLive && (
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1 flex-shrink-0" />
      )}
    </div>
  )
}