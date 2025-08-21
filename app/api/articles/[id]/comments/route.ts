import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/app/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params
    const { content, author_name, author_email } = await request.json()
    
    if (!supabase || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Validate required fields
    if (!content || !author_name) {
      return NextResponse.json(
        { error: 'Content and author name are required' },
        { status: 400 }
      )
    }

    // Basic content validation
    if (content.length < 10 || content.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be between 10 and 1000 characters' },
        { status: 400 }
      )
    }

    // Get client IP for spam protection
    const userIdentifier = request.headers.get('x-forwarded-for') || 
                          request.headers.get('x-real-ip') || 
                          'anonymous'

    // Check for spam (same user commenting too frequently)
    const { data: recentComments } = await supabase
      .from('article_comments')
      .select('created_at')
      .eq('user_identifier', userIdentifier)
      .gte('created_at', new Date(Date.now() - 60000).toISOString()) // Last minute
      .limit(5)

    if (recentComments && recentComments.length >= 3) {
      return NextResponse.json(
        { error: 'Too many comments in a short time. Please wait before commenting again.' },
        { status: 429 }
      )
    }

    // Add comment
    const { data: newComment, error: commentError } = await supabase
      .from('article_comments')
      .insert({
        article_id: articleId,
        content: content.trim(),
        author_name: author_name.trim(),
        author_email: author_email?.trim() || null,
        user_identifier: userIdentifier,
        status: 'pending', // Comments need moderation
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (commentError) throw commentError

    // Update article comment count
    const { data: article } = await supabase
      .from('articles')
      .select('comment_count')
      .eq('id', articleId)
      .single()

    const newCommentCount = (article?.comment_count || 0) + 1

    const { error: updateError } = await supabaseAdmin
      .from('articles')
      .update({ comment_count: newCommentCount })
      .eq('id', articleId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      comment: newComment,
      commentCount: newCommentCount,
      message: 'Comment submitted successfully. It will be visible after moderation.'
    })

  } catch (error) {
    console.error('Comment API error:', error)
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
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get approved comments
    const { data: comments, error: commentsError } = await supabase
      .from('article_comments')
      .select('*')
      .eq('article_id', articleId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (commentsError) throw commentsError

    // Get total count
    const { count, error: countError } = await supabase
      .from('article_comments')
      .select('*', { count: 'exact', head: true })
      .eq('article_id', articleId)
      .eq('status', 'approved')

    if (countError) throw countError

    return NextResponse.json({
      comments: comments || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > offset + limit
    })

  } catch (error) {
    console.error('Get comments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}