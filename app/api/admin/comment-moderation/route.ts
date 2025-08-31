import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, supabaseAdmin } from '@/app/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || 'pending'
    const priority = searchParams.get('priority') // high, medium, low

    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Menggunakan view comment_moderation_queue
    let query = supabaseServer
      .from('comment_moderation_queue')
      .select('*')

    // Filter berdasarkan status jika bukan 'all'
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Filter berdasarkan prioritas
    if (priority) {
      switch (priority) {
        case 'high':
          query = query.gte('moderation_priority', 8)
          break
        case 'medium':
          query = query.gte('moderation_priority', 4).lt('moderation_priority', 8)
          break
        case 'low':
          query = query.lt('moderation_priority', 4)
          break
      }
    }

    query = query
      .order('moderation_priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(limit)

    const { data, error } = await query

    if (error) throw error

    // Mendapatkan statistik moderasi
    const { data: stats } = await supabaseServer
      .from('article_comments')
      .select('status')

    const moderationStats = {
      pending: stats?.filter((s: any) => s.status === 'pending').length || 0,
      approved: stats?.filter((s: any) => s.status === 'approved').length || 0,
      rejected: stats?.filter((s: any) => s.status === 'rejected').length || 0,
      spam: stats?.filter((s: any) => s.status === 'spam').length || 0,
      total: stats?.length || 0
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      stats: moderationStats,
      meta: {
        limit,
        status,
        priority,
        count: data?.length || 0
      }
    })

  } catch (error) {
    console.error('Comment moderation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { commentId, action, reason } = await request.json()

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Validasi action
    const validActions = ['approve', 'reject', 'spam']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Update status komentar
    const newStatus = action === 'approve' ? 'approved' : 
                     action === 'reject' ? 'rejected' : 'spam'

    const { data, error } = await supabaseAdmin
      .from('article_comments')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', commentId)
      .select()
      .single()

    if (error) throw error

    // Log moderasi action (opsional, bisa ditambahkan tabel audit)
    console.log(`Comment ${commentId} ${action}ed. Reason: ${reason || 'No reason provided'}`)

    return NextResponse.json({
      success: true,
      data: data,
      message: `Comment ${action}ed successfully`
    })

  } catch (error) {
    console.error('Comment moderation action error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}