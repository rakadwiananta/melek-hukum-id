import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7' // days
    const category = searchParams.get('category')

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const periodDays = parseInt(period)
    const startDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0]

    // 1. Overview Statistics
    const { data: overviewStats } = await supabase
      .from('article_stats')
      .select('view_count, actual_likes, approved_comments, total_bookmarks')

    const totalViews = overviewStats?.reduce((sum, item) => sum + (item.view_count || 0), 0) || 0
    const totalLikes = overviewStats?.reduce((sum, item) => sum + (item.actual_likes || 0), 0) || 0
    const totalComments = overviewStats?.reduce((sum, item) => sum + (item.approved_comments || 0), 0) || 0
    const totalBookmarks = overviewStats?.reduce((sum, item) => sum + (item.total_bookmarks || 0), 0) || 0

    // 2. Daily Activity untuk periode yang diminta
    let dailyQuery = supabase
      .from('daily_activity')
      .select('*')
      .gte('activity_date', startDate)
      .order('activity_date', { ascending: true })

    const { data: dailyActivity } = await dailyQuery

    // 3. Top Articles
    let topArticlesQuery = supabase
      .from('article_stats')
      .select('id, slug, title, category, view_count, actual_likes, approved_comments, popularity_score')
      .order('popularity_score', { ascending: false })
      .limit(10)

    if (category) {
      topArticlesQuery = topArticlesQuery.eq('category', category)
    }

    const { data: topArticles } = await topArticlesQuery

    // 4. Category Performance
    const { data: categoryStats } = await supabase
      .from('article_stats')
      .select('category, view_count, actual_likes, approved_comments, total_bookmarks')
      .not('category', 'is', null)

    const categoryPerformance = categoryStats?.reduce((acc, item) => {
      const cat = item.category || 'Uncategorized'
      if (!acc[cat]) {
        acc[cat] = {
          category: cat,
          total_views: 0,
          total_likes: 0,
          total_comments: 0,
          total_bookmarks: 0,
          article_count: 0
        }
      }
      acc[cat].total_views += item.view_count || 0
      acc[cat].total_likes += item.actual_likes || 0
      acc[cat].total_comments += item.approved_comments || 0
      acc[cat].total_bookmarks += item.total_bookmarks || 0
      acc[cat].article_count += 1
      return acc
    }, {} as Record<string, any>)

    const categoryArray = Object.values(categoryPerformance || {})

    // 5. User Engagement Levels
    const { data: userEngagement } = await supabase
      .from('user_interactions')
      .select('engagement_level')

    const engagementDistribution = userEngagement?.reduce((acc, item) => {
      const level = item.engagement_level || 'Low'
      acc[level] = (acc[level] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // 6. Recent Activity (untuk real-time feel)
    const { data: recentLikes } = await supabase
      .from('article_likes')
      .select('created_at, article_id, articles!inner(title)')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(5)

    const { data: recentComments } = await supabase
      .from('article_comments')
      .select('created_at, article_id, author_name, articles!inner(title)')
      .eq('status', 'approved')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(5)

    // 7. Trending Articles (menggunakan function)
    const { data: trendingArticles } = await supabase
      .rpc('get_trending_articles', { days_param: periodDays, limit_param: 5 })

    // 8. Comment Moderation Stats
    const { data: commentModerationStats } = await supabase
      .from('article_comments')
      .select('status, created_at')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    const moderationStats = {
      pending: commentModerationStats?.filter(c => c.status === 'pending').length || 0,
      approved: commentModerationStats?.filter(c => c.status === 'approved').length || 0,
      rejected: commentModerationStats?.filter(c => c.status === 'rejected').length || 0,
      spam: commentModerationStats?.filter(c => c.status === 'spam').length || 0
    }

    // Compile response
    const dashboardData = {
      overview: {
        total_views: totalViews,
        total_likes: totalLikes,
        total_comments: totalComments,
        total_bookmarks: totalBookmarks,
        total_articles: overviewStats?.length || 0,
        avg_engagement_rate: overviewStats?.length > 0 
          ? (totalLikes + totalComments) / totalViews * 100 
          : 0
      },
      daily_activity: dailyActivity || [],
      top_articles: topArticles || [],
      category_performance: categoryArray,
      user_engagement: engagementDistribution || {},
      trending_articles: trendingArticles || [],
      recent_activity: {
        likes: recentLikes || [],
        comments: recentComments || []
      },
      moderation: moderationStats,
      meta: {
        period: `${periodDays} hari`,
        category: category || 'Semua Kategori',
        generated_at: new Date().toISOString(),
        data_freshness: 'Real-time'
      }
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}