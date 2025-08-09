import { NextRequest, NextResponse } from 'next/server'
import { midtransCore, verifySignatureKey } from '@/app/lib/midtrans'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json()

    const { order_id, status_code, gross_amount, signature_key } = notification || {}

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return NextResponse.json({ error: 'payload tidak lengkap' }, { status: 400 })
    }

    // Verify signature
    const valid = verifySignatureKey(order_id, String(status_code), String(gross_amount), String(signature_key))
    if (!valid) {
      return NextResponse.json({ error: 'signature tidak valid' }, { status: 403 })
    }

    // Dapatkan status transaksi terbaru dari Midtrans (opsional)
    const status = await midtransCore.transaction.status(order_id)

    // TODO: Update status pesanan di database Anda di sini

    return NextResponse.json({ ok: true, status })
  } catch (error: any) {
    console.error('[Midtrans] notification error', error)
    return NextResponse.json({ error: 'Notification handling failed', detail: String(error?.message || error) }, { status: 500 })
  }
} 