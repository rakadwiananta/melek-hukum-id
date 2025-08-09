import midtransClient from 'midtrans-client'

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'

const serverKey = process.env.MIDTRANS_SERVER_KEY || ''
const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''

if (!serverKey) {
  // Jangan melempar error di build time; log saja untuk awareness
  console.warn('[Midtrans] MIDTRANS_SERVER_KEY belum diset di environment.')
}

export const midtransCore = new midtransClient.CoreApi({
  isProduction,
  serverKey,
  clientKey,
})

export function generateOrderId(prefix: string = 'order'): string {
  const now = new Date()
  const rand = Math.random().toString(36).slice(2, 8)
  const ts = now.toISOString().replace(/\D/g, '').slice(0, 14)
  return `${prefix}-${ts}-${rand}`
}

export function getMidtransKeys() {
  return { isProduction, serverKey, clientKey }
}

export function verifySignatureKey(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const crypto = require('crypto') as typeof import('crypto')
  const raw = orderId + statusCode + grossAmount + serverKey
  const calc = crypto.createHash('sha512').update(raw).digest('hex')
  return calc === signatureKey
} 