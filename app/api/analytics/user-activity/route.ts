import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/app/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userIdentifier = searchParams.get('user') || 
                          request.headers.get('x-forwarded-for') || 
                          request.headers.get('x-real-ip') || 
                          'anonymous'
    const includeDetails = searchParams.get('details') === 'true'

    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Mendapatkan aktivitas user menggunakan function
    const { data, error } = await supabaseServer
      .rpc('get_user_activity', { user_id_param: userIdentifier })

    if (error) throw error

    const userActivity = (data as any[])?.[0] || {
      user_identifier: userIdentifier,
      total_likes: 0,
      total_comments: 0,
      total_bookmarks: 0,
      engagement_level: 'Low',
      last_activity_date: null
    }

    let responseData = {
      success: true,
      data: userActivity
    }

    // Jika diminta detail, ambil data aktivitas lengkap
    if (includeDetails) {
      // Artikel yang di-like
      const { data: likedArticles } = await supabaseServer
        .from('article_likes')
        .select(`
          article_id,
          created_at,
          articles!inner(id, title, slug, category)
        `)
        .eq('user_identifier', userIdentifier)
        .order('created_at', { ascending: false })
        .limit(10)

      // Komentar yang dibuat
      const { data: userComments } = await supabaseServer
        .from('article_comments')
        .select(`
          id,
          article_id,
          content,
          status,
          created_at,
          articles!inner(id, title, slug, category)
        `)
        .eq('user_identifier', userIdentifier)
        .order('created_at', { ascending: false })
        .limit(10)

      // Artikel yang di-bookmark
      const { data: bookmarkedArticles } = await supabaseServer
        .from('article_bookmarks')
        .select(`
          article_id,
          created_at,
          articles!inner(id, title, slug, category, featured_image)
        `)
        .eq('user_identifier', userIdentifier)
        .order('created_at', { ascending: false })
        .limit(10)

      // Aktivitas harian (7 hari terakhir)
      const { data: dailyActivity } = await supabaseServer
        .from('daily_activity')
        .select('*')
        .gte('activity_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('activity_date', { ascending: false })

      responseData = {
        ...responseData,
        data: {
          ...userActivity,
          recent_activities: {
            liked_articles: likedArticles || [],
            comments: userComments || [],
            bookmarked_articles: bookmarkedArticles || [],
            daily_stats: dailyActivity || []
          }
        }
      }
    }

    return NextResponse.json(responseData)

  } catch (error) {
    console.error('User activity API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}