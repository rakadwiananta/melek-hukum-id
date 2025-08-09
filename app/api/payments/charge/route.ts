import { NextRequest, NextResponse } from 'next/server'
import { midtransCore, generateOrderId } from '@/app/lib/midtrans'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

const allowedPaymentsEnv = (process.env.MIDTRANS_ALLOWED_PAYMENT_TYPES || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const allowedPayments = new Set(allowedPaymentsEnv)
const defaultPaymentType = (process.env.MIDTRANS_DEFAULT_PAYMENT_TYPE || 'qris').trim()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const {
      payment_type: incomingPaymentType,
      gross_amount,
      order_id = generateOrderId('mlkhkm'),
      customer_details,
      bank, // for bank_transfer
      items = [],
    } = body || {}

    if (!gross_amount || Number(gross_amount) <= 0) {
      return NextResponse.json({ error: 'gross_amount tidak valid' }, { status: 400 })
    }

    // Tentukan payment_type: dari request atau default dari env
    const payment_type: string = (incomingPaymentType || defaultPaymentType)

    // Jika ada daftar channel yang diizinkan di env, validasi di sini
    if (allowedPayments.size > 0 && !allowedPayments.has(payment_type)) {
      return NextResponse.json(
        {
          error: 'Payment channel tidak diizinkan/aktif',
          detail:
            'Channel pembayaran ini belum diaktifkan untuk merchant pada environment saat ini. Aktifkan di Midtrans Dashboard atau gunakan salah satu channel yang diizinkan.',
          allowed_payment_types: Array.from(allowedPayments),
        },
        { status: 400 }
      )
    }

    const params: any = {
      payment_type,
      transaction_details: {
        order_id,
        gross_amount: Number(gross_amount),
      },
      item_details: items,
      customer_details,
    }

    // Tambahkan URL redirect jika tersedia di environment
    const finishUrl = process.env.MIDTRANS_FINISH_URL
    const errorUrl = process.env.MIDTRANS_ERROR_URL
    
    if (finishUrl) {
      params.finish_redirect_url = finishUrl
    }
    
    if (errorUrl) {
      params.error_redirect_url = errorUrl
    }

    if (payment_type === 'bank_transfer') {
      params.bank_transfer = { bank: bank || 'bca' }
    }

    // Charge via Core API
    const chargeResponse = await midtransCore.charge(params)

    return NextResponse.json({ order_id, charge: chargeResponse })
  } catch (error: any) {
    // Perjelas error saat channel belum diaktifkan
    const httpStatusCode = error?.httpStatusCode || error?.ApiResponse?.status_code
    const statusMessage = error?.ApiResponse?.status_message || error?.message

    if (String(httpStatusCode) === '402' || /Payment channel is not activated/i.test(String(statusMessage))) {
      return NextResponse.json(
        {
          error: 'PAYMENT_CHANNEL_NOT_ACTIVATED',
          detail:
            'Channel pembayaran belum diaktifkan untuk merchant/environment ini. Aktifkan di Midtrans Dashboard (Sandbox/Production sesuai env) atau gunakan channel lain yang sudah aktif.',
          hint:
            'Setel MIDTRANS_ALLOWED_PAYMENT_TYPES dan MIDTRANS_DEFAULT_PAYMENT_TYPE di environment, atau kirim payment_type yang valid seperti gopay/bank_transfer.',
          midtrans: {
            httpStatusCode: httpStatusCode || null,
            statusMessage: statusMessage || null,
          },
        },
        { status: 400 }
      )
    }

    console.error('[Midtrans] charge error', error)
    return NextResponse.json(
      { error: 'Charge failed', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
} 