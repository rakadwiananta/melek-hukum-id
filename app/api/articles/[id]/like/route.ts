import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, supabaseAdmin } from '@/app/lib/supabase-server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params
    const { action } = await request.json()
    
    if (!supabaseServer || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get client IP as user identifier for anonymous users
    const userIdentifier = request.headers.get('x-forwarded-for') || 
                          request.headers.get('x-real-ip') || 
                          'anonymous'

    if (action === 'like') {
      // Check if user already liked this article
      const { data: existingLike } = await supabaseServer
        .from('article_likes')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_identifier', userIdentifier)
        .single()

      if (existingLike) {
        return NextResponse.json(
          { error: 'Already liked this article' },
          { status: 400 }
        )
      }

      // Add like
      const { error: likeError } = await supabaseServer
        .from('article_likes')
        .insert({
          article_id: articleId,
          user_identifier: userIdentifier,
          created_at: new Date().toISOString()
        })

      if (likeError) throw likeError

      // Update article like count
      const { data: article } = await supabaseServer
        .from('articles')
        .select('like_count')
        .eq('id', articleId)
        .single()

      const newLikeCount = ((article?.like_count as number) || 0) + 1

      const { error: updateError } = await supabaseAdmin
        .from('articles')
        .update({ like_count: newLikeCount })
        .eq('id', articleId)

      if (updateError) throw updateError

      return NextResponse.json({
        success: true,
        likeCount: newLikeCount,
        message: 'Article liked successfully'
      })

    } else if (action === 'unlike') {
      // Remove like
      const { error: unlikeError } = await supabaseServer
        .from('article_likes')
        .delete()
        .eq('article_id', articleId)
        .eq('user_identifier', userIdentifier)

      if (unlikeError) throw unlikeError

      // Update article like count
      const { data: article } = await supabaseServer
        .from('articles')
        .select('like_count')
        .eq('id', articleId)
        .single()

      const newLikeCount = Math.max(0, ((article?.like_count as number) || 0) - 1)

      const { error: updateError } = await supabaseAdmin
        .from('articles')
        .update({ like_count: newLikeCount })
        .eq('id', articleId)

      if (updateError) throw updateError

      return NextResponse.json({
        success: true,
        likeCount: newLikeCount,
        message: 'Like removed successfully'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Like API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params
    
    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get client IP as user identifier
    const userIdentifier = request.headers.get('x-forwarded-for') || 
                          request.headers.get('x-real-ip') || 
                          'anonymous'

    // Check if user has liked this article
    const { data: like } = await supabaseServer
      .from('article_likes')
      .select('id')
      .eq('article_id', articleId)
      .eq('user_identifier', userIdentifier)
      .single()

    // Get article like count
    const { data: article } = await supabaseServer
      .from('articles')
      .select('like_count')
      .eq('id', articleId)
      .single()

    return NextResponse.json({
      isLiked: !!like,
      likeCount: article?.like_count || 0
    })

  } catch (error) {
    console.error('Get like status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}