import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/app/lib/supabase-server'

// Real article ID from the database
const REAL_ARTICLE_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

export async function GET(request: NextRequest) {
  if (!supabaseServer) {
    return NextResponse.json({
      error: 'Supabase not configured'
    }, { status: 500 })
  }

  const results: any = {
    timestamp: new Date().toISOString(),
    article_id: REAL_ARTICLE_ID,
    tests: {}
  }

  try {
    // Test 1: Get article data
    const { data: article, error: articleError } = await supabaseServer
      .from('articles')
      .select('id, title, view_count, like_count, comment_count, updated_at')
      .eq('id', REAL_ARTICLE_ID)
      .single()

    results.tests.article_data = {
      success: !articleError,
      error: articleError?.message || null,
      data: article || null
    }

    // Test 2: Test increment_article_views RPC
    const { data: incrementData, error: incrementError } = await supabaseServer
      .rpc('increment_article_views', {
        article_id_param: REAL_ARTICLE_ID,
        viewer_ip: `debug-test-${Date.now()}`,
        viewed_at: new Date().toISOString()
      })

    results.tests.increment_views = {
      success: !incrementError,
      error: incrementError?.message || null,
      data: incrementData || null
    }

    // Test 3: Get updated article data
    const { data: updatedArticle, error: updatedError } = await supabaseServer
      .from('articles')
      .select('id, title, view_count, like_count, comment_count, updated_at')
      .eq('id', REAL_ARTICLE_ID)
      .single()

    results.tests.updated_article_data = {
      success: !updatedError,
      error: updatedError?.message || null,
      data: updatedArticle || null,
      view_count_changed: article && updatedArticle ? 
        updatedArticle.view_count !== article.view_count : null
    }

    // Test 4: Test get_article_stats RPC
    const { data: statsData, error: statsError } = await supabaseServer
      .rpc('get_article_stats', {
        article_id_param: REAL_ARTICLE_ID
      })

    results.tests.get_stats = {
      success: !statsError,
      error: statsError?.message || null,
      data: statsData || null
    }

    // Test 5: Check article_views table
    const { data: viewsData, error: viewsError } = await supabaseServer
      .from('article_views')
      .select('id, article_id, user_identifier, created_at')
      .eq('article_id', REAL_ARTICLE_ID)
      .order('created_at', { ascending: false })
      .limit(5)

    results.tests.recent_views = {
      success: !viewsError,
      error: viewsError?.message || null,
      data: viewsData || null,
      count: viewsData?.length || 0
    }

    // Summary
    results.summary = {
      all_tests_passed: Object.values(results.tests).every((test: any) => test.success),
      view_increment_working: results.tests.increment_views?.success && 
                             results.tests.updated_article_data?.view_count_changed,
      rpc_functions_available: results.tests.increment_views?.success && 
                              results.tests.get_stats?.success
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
  if (!supabase) {
    return NextResponse.json({
      error: 'Supabase not configured'
    }, { status: 500 })
  }

  try {
    const { action, count } = await request.json()
    const testCount = count || 1

    const results: any = {
      timestamp: new Date().toISOString(),
      article_id: REAL_ARTICLE_ID,
      action: action || 'increment_multiple',
      test_count: testCount,
      results: []
    }

    // Get initial view count
    const { data: initialArticle } = await supabase
      .from('articles')
      .select('view_count')
      .eq('id', REAL_ARTICLE_ID)
      .single()

    results.initial_view_count = initialArticle?.view_count || 0

    // Perform multiple increments
    for (let i = 0; i < testCount; i++) {
      const { data, error } = await supabase
        .rpc('increment_article_views_simple', {
          article_id_param: REAL_ARTICLE_ID,
          viewer_ip: `test-${Date.now()}-${i}`
        })

      results.results.push({
        iteration: i + 1,
        success: !error,
        error: error?.message || null,
        new_view_count: (data as any)?.new_view_count || null
      })

      // Small delay between increments
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Get final view count
    const { data: finalArticle } = await supabase
      .from('articles')
      .select('view_count')
      .eq('id', REAL_ARTICLE_ID)
      .single()

    results.final_view_count = finalArticle?.view_count || 0
    results.total_increment = results.final_view_count - results.initial_view_count
    results.expected_increment = testCount
    results.increment_matches = results.total_increment === results.expected_increment

    return NextResponse.json(results)

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}