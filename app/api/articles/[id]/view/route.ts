import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get client IP for rate limiting (optional)
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Get current timestamp
    const now = new Date().toISOString()

    // Increment view count using Supabase RPC function
    const { data, error } = await supabase
      .rpc('increment_article_views', {
        article_id_param: id,
        viewer_ip: clientIP,
        viewed_at: now
      })

    if (error) {
      console.error('Error incrementing view (RPC):', error)
      
      // Fallback: Try simple increment without duplicate check
      const { data: fallbackData, error: fallbackError } = await supabase
        .rpc('increment_article_views_simple', {
          article_id_param: id,
          viewer_ip: clientIP
        })

      if (fallbackError) {
        console.error('Error with simple increment:', fallbackError)
        
        // Final fallback: Direct database update
        const { data: currentArticle, error: fetchError } = await supabase
          .from('articles')
          .select('view_count')
          .eq('id', id)
          .single()

        if (fetchError) throw fetchError

        const newViewCount = ((currentArticle?.view_count as number) || 0) + 1
        
        const { data: updateData, error: updateError } = await supabase
          .from('articles')
          .update({ 
            view_count: newViewCount,
            updated_at: now
          })
          .eq('id', id)
          .select('view_count')
          .single()

        if (updateError) {
          throw updateError
        }

        return NextResponse.json({
          success: true,
          view_count: updateData?.view_count || 0,
          message: 'View count updated (direct fallback method)'
        })
      }

      return NextResponse.json({
        success: true,
        view_count: (fallbackData as any)?.new_view_count || 0,
        message: (fallbackData as any)?.message || 'View count updated (simple method)'
      })
    }

    return NextResponse.json({
      success: true,
      view_count: (data as any)?.new_view_count || 0,
      message: (data as any)?.message || 'View count updated successfully'
    })

  } catch (error) {
    console.error('View increment API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to increment view count',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get current view count
    const { data, error } = await supabase
      .from('articles')
      .select('id, view_count, like_count, title')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        title: data.title,
        view_count: data.view_count || 0,
        like_count: data.like_count || 0
      }
    })

  } catch (error) {
    console.error('View count fetch API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch view count',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}