import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/app/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('id')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sortBy = searchParams.get('sort') || 'popularity_score'

    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Jika ada article ID spesifik
    if (articleId) {
      const { data, error } = await supabaseServer
        .rpc('get_article_engagement', { article_id_param: articleId })

      if (error) throw error

      return NextResponse.json({
        success: true,
        data: (data as any[])?.[0] || null
      })
    }

    // Query untuk multiple articles
    let query = supabaseServer
      .from('article_stats')
      .select('*')

    // Filter berdasarkan kategori jika ada
    if (category) {
      query = query.eq('category', category)
    }

    // Sorting
    const validSortFields = ['popularity_score', 'engagement_rate', 'view_count', 'actual_likes', 'approved_comments']
    if (validSortFields.includes(sortBy)) {
      query = query.order(sortBy, { ascending: false })
    }

    // Limit
    query = query.limit(limit)

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: data || [],
      meta: {
        count: data?.length || 0,
        limit,
        sortBy,
        category
      }
    })

  } catch (error) {
    console.error('Article stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}