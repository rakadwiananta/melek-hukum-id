import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/app/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')

    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Mendapatkan artikel trending menggunakan function
    const { data, error } = await supabaseServer
      .rpc('get_trending_articles', { 
        days_param: days, 
        limit_param: limit 
      })

    if (error) throw error

    // Filter berdasarkan kategori jika diperlukan
    let filteredData = (data as any[]) || []
    if (category) {
      filteredData = filteredData.filter((item: any) => 
        item.category?.toLowerCase() === category.toLowerCase()
      )
    }

    // Mendapatkan data lengkap artikel
    const articleIds = filteredData.map((item: any) => item.article_id)
    
    if (articleIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        meta: {
          days,
          limit,
          category,
          count: 0
        }
      })
    }

    const { data: articlesData, error: articlesError } = await supabaseServer
      .from('articles')
      .select('id, slug, title, excerpt, featured_image, category, published_at, author')
      .in('id', articleIds)

    if (articlesError) throw articlesError

    // Menggabungkan data trending dengan data artikel
    const enrichedData = filteredData.map((trendItem: any) => {
      const articleData = articlesData?.find((article: any) => article.id === trendItem.article_id)
      return {
        ...trendItem,
        ...articleData,
        trending_metrics: {
          recent_likes: trendItem.recent_likes,
          recent_comments: trendItem.recent_comments,
          recent_bookmarks: trendItem.recent_bookmarks,
          trend_score: trendItem.trend_score
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: enrichedData,
      meta: {
        days,
        limit,
        category,
        count: enrichedData.length,
        period: `${days} hari terakhir`
      }
    })

  } catch (error) {
    console.error('Trending articles API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}