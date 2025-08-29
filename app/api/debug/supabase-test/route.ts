import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    supabase_configured: false,
    connection_test: null,
    articles_test: null,
    rpc_functions_test: null,
    view_increment_test: null
  }

  try {
    // Test 1: Supabase Configuration
    results.supabase_configured = !!supabase
    if (!supabase) {
      return NextResponse.json({
        ...results,
        error: 'Supabase not configured. Check environment variables.'
      })
    }

    // Test 2: Connection Test
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('count')
        .limit(1)

      results.connection_test = {
        success: !error,
        error: error?.message || null
      }
    } catch (err) {
      results.connection_test = {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      }
    }

    // Test 3: Articles Table Test
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, view_count, like_count')
        .limit(3)

      results.articles_test = {
        success: !error,
        error: error?.message || null,
        sample_articles: data?.length || 0,
        articles: data?.map(article => ({
          id: article.id,
          title: article.title?.substring(0, 50) + '...',
          view_count: article.view_count || 0,
          like_count: article.like_count || 0
        })) || []
      }
    } catch (err) {
      results.articles_test = {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      }
    }

    // Test 4: RPC Functions Test
    try {
      // Try to call a simple RPC function with a real article ID if available
      const testArticleId = results.articles_test?.articles?.[0]?.id || 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
      
      const { data, error } = await supabase
        .rpc('get_article_stats', { article_id_param: testArticleId })

      results.rpc_functions_test = {
        success: !error,
        error: error?.message || null,
        rpc_available: !error,
        test_article_id: testArticleId,
        result: data || null
      }
    } catch (err) {
      results.rpc_functions_test = {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      }
    }

    // Test 5: View Increment Test (if we have articles)
    if (results.articles_test?.articles && results.articles_test.articles.length > 0) {
      const testArticleId = results.articles_test.articles[0].id
      
      try {
        const { data, error } = await supabase
          .rpc('increment_article_views', {
            article_id_param: testArticleId,
            viewer_ip: 'debug-test',
            viewed_at: new Date().toISOString()
          })

        results.view_increment_test = {
          success: !error,
          error: error?.message || null,
          test_article_id: testArticleId,
          result: data || null
        }
      } catch (err) {
        results.view_increment_test = {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          test_article_id: testArticleId
        }
      }
    }

    return NextResponse.json(results)

  } catch (error) {
    return NextResponse.json({
      ...results,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { articleId, action } = await request.json()

    if (!supabase) {
      return NextResponse.json({
        error: 'Supabase not configured'
      }, { status: 500 })
    }

    if (!articleId) {
      return NextResponse.json({
        error: 'Article ID is required'
      }, { status: 400 })
    }

    const results = {
      timestamp: new Date().toISOString(),
      article_id: articleId,
      action: action || 'increment_view'
    }

    if (action === 'get_stats') {
      // Get current stats
      const { data, error } = await supabase
        .rpc('get_article_stats', { article_id_param: articleId })

      return NextResponse.json({
        ...results,
        success: !error,
        error: error?.message || null,
        data: data || null
      })
    } else {
      // Increment view
      const { data, error } = await supabase
        .rpc('increment_article_views', {
          article_id_param: articleId,
          viewer_ip: 'debug-manual-test',
          viewed_at: new Date().toISOString()
        })

      return NextResponse.json({
        ...results,
        success: !error,
        error: error?.message || null,
        data: data || null
      })
    }

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}