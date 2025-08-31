import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/app/lib/supabase-server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params
    const { action } = await request.json()
    
    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get client IP as user identifier for anonymous users
    const userIdentifier = request.headers.get('x-forwarded-for') || 
                          request.headers.get('x-real-ip') || 
                          'anonymous'

    if (action === 'save') {
      // Check if user already bookmarked this article
      const { data: existingBookmark } = await supabaseServer
        .from('article_bookmarks')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_identifier', userIdentifier)
        .single()

      if (existingBookmark) {
        return NextResponse.json(
          { error: 'Already bookmarked this article' },
          { status: 400 }
        )
      }

      // Add bookmark
      const { error: bookmarkError } = await supabaseServer
        .from('article_bookmarks')
        .insert({
          article_id: articleId,
          user_identifier: userIdentifier,
          created_at: new Date().toISOString()
        })

      if (bookmarkError) throw bookmarkError

      return NextResponse.json({
        success: true,
        message: 'Article bookmarked successfully'
      })

    } else if (action === 'unsave') {
      // Remove bookmark
      const { error: removeError } = await supabaseServer
        .from('article_bookmarks')
        .delete()
        .eq('article_id', articleId)
        .eq('user_identifier', userIdentifier)

      if (removeError) throw removeError

      return NextResponse.json({
        success: true,
        message: 'Bookmark removed successfully'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Bookmark API error:', error)
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

    // Check if user has bookmarked this article
    const { data: bookmark } = await supabaseServer
      .from('article_bookmarks')
      .select('id')
      .eq('article_id', articleId)
      .eq('user_identifier', userIdentifier)
      .single()

    return NextResponse.json({
      isBookmarked: !!bookmark
    })

  } catch (error) {
    console.error('Get bookmark status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}