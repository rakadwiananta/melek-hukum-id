import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const subscribeSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = subscribeSchema.parse(body)

    // Get IP address
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'

    // Check if email already exists
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active',
            subscribed_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        if (error) throw error
      }
    } else {
      // Insert new subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          ip_address: ip,
          source: 'website',
        })

      if (error) throw error
    }

    // Send welcome email (implement your email service here)
    // await sendWelcomeEmail(email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
