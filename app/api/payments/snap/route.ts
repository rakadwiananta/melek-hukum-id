import { NextRequest, NextResponse } from 'next/server'
import { midtransSnap, generateOrderId } from '@/app/lib/midtrans'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

function sanitizeCustomerDetails(input: any) {
  if (!input || typeof input !== 'object') return undefined
  const out: any = {}
  if (input.first_name) out.first_name = String(input.first_name)
  if (input.last_name) out.last_name = String(input.last_name)
  if (input.phone) out.phone = String(input.phone)
  if (input.email) {
    const email = String(input.email).trim()
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    if (ok) out.email = email
  }
  return Object.keys(out).length ? out : undefined
}

// Baca daftar metode pembayaran yang diizinkan (opsional)
const allowedPaymentsEnv = (process.env.MIDTRANS_ALLOWED_PAYMENT_TYPES || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

// Daftar default yang umum dipakai; Midtrans akan otomatis menyembunyikan channel yang belum aktif
const DEFAULT_ENABLED_PAYMENTS = [
  'credit_card',
  'qris',
  'gopay',
  'shopeepay',
  'bank_transfer',
  'bca_va',
  'bni_va',
  'bri_va',
  'permata_va',
  'other_va',
  'echannel',
  'indomaret',
  'alfamart',
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const {
      order_id = generateOrderId('mlkhkm'),
      customer_details,
      items = [],
    } = body || {}

    // Harga tetap dari env
    const fixedPriceEnv = process.env.MIDTRANS_FIXED_PRICE
    if (!fixedPriceEnv) {
      return NextResponse.json(
        { error: 'PRICE_NOT_CONFIGURED', detail: 'Set MIDTRANS_FIXED_PRICE di environment deployment (Netlify).' },
        { status: 500 }
      )
    }
    const FIXED_PRICE = Number(fixedPriceEnv)

    // enabled_payments prioritas dari env; fallback ke default list
    const enabled_payments = allowedPaymentsEnv.length > 0 ? allowedPaymentsEnv : DEFAULT_ENABLED_PAYMENTS

    const transaction: any = {
      transaction_details: {
        order_id,
        gross_amount: FIXED_PRICE,
      },
      item_details: items.length
        ? items
        : [
            {
              id: `premium-${FIXED_PRICE}`,
              price: FIXED_PRICE,
              quantity: 1,
              name: 'Premium Access',
            },
          ],
      credit_card: {
        secure: true,
      },
      // Batasi/aktifkan channel yang ingin ditampilkan Snap
      enabled_payments,
      callbacks: {
        finish: process.env.MIDTRANS_FINISH_URL,
        error: process.env.MIDTRANS_ERROR_URL,
      },
    }

    const sanitized = sanitizeCustomerDetails(customer_details)
    if (sanitized) transaction.customer_details = sanitized

    const snapResponse = await midtransSnap.createTransaction(transaction)

    return NextResponse.json({ order_id, amount: FIXED_PRICE, token: snapResponse?.token, redirect_url: snapResponse?.redirect_url })
  } catch (error: any) {
    const statusMessage = error?.ApiResponse?.status_message || error?.message
    const httpStatusCode = error?.httpStatusCode || error?.ApiResponse?.status_code

    // Pesan jelas jika channel belum diaktifkan di dashboard
    if (String(httpStatusCode) === '402' || /Payment channel is not activated/i.test(String(statusMessage))) {
      return NextResponse.json(
        {
          error: 'PAYMENT_CHANNEL_NOT_ACTIVATED',
          detail:
            'Channel pembayaran Snap belum diaktifkan untuk merchant/environment ini. Aktifkan di Midtrans Dashboard (Sandbox/Production sesuai env) atau setel MIDTRANS_ALLOWED_PAYMENT_TYPES untuk hanya menampilkan channel yang aktif.',
          midtrans: {
            httpStatusCode: httpStatusCode || null,
            statusMessage: statusMessage || null,
          },
        },
        { status: 400 }
      )
    }

    console.error('[Midtrans] snap create error', error)
    return NextResponse.json(
      { error: 'Snap create failed', detail: String(statusMessage || error) },
      { status: 500 }
    )
  }
} 