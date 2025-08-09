import { NextRequest, NextResponse } from 'next/server'
import { midtransCore } from '@/app/lib/midtrans'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export async function GET(_req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params
    if (!orderId) return NextResponse.json({ error: 'orderId tidak ditemukan' }, { status: 400 })

    const status = await midtransCore.transaction.status(orderId)
    return NextResponse.json({ status })
  } catch (error: any) {
    console.error('[Midtrans] status error', error)
    return NextResponse.json({ error: 'Gagal mengambil status', detail: String(error?.message || error) }, { status: 500 })
  }
} 