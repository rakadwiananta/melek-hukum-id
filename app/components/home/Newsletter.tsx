'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { toast } from '@/app/components/ui/use-toast'
import { X } from 'lucide-react'
import NewsletterForm from '@/app/components/ui/NewsletterForm'
import { Mail, Shield, Bell, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    text: 'Tips anti-korupsi'
  },
  {
    icon: Bell,
    text: 'Update regulasi terbaru'
  },
  {
    icon: Zap,
    text: 'Panduan hukum praktis'
  }
]

export default function Newsletter() {
  const [isPaying, setIsPaying] = useState(false)
  const [qrisString, setQrisString] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handlePayPremium = async () => {
    try {
      setIsPaying(true)
      const res = await fetch('/api/payments/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_type: 'qris',
          gross_amount: 49000,
          items: [
            { id: 'premium-template', price: 49000, quantity: 1, name: 'Premium Template Download (Diskon)' }
          ],
          customer_details: { first_name: 'Pengguna', email: '' }
        })
      })
      if (!res.ok) throw new Error('Gagal membuat transaksi')
      const json = await res.json()
      setOrderId(json?.order_id || null)

      const qr = json?.charge?.qr_string || null
      const actions = json?.charge?.actions || []

      if (qr) {
        setQrisString(qr)
        toast({ title: 'Order dibuat', description: 'Silakan scan QRIS untuk menyelesaikan pembayaran.' })
      } else if (actions && actions[0]?.url) {
        window.open(actions[0].url, '_blank')
      } else {
        toast({ title: 'Order dibuat', description: 'Silakan selesaikan pembayaran di halaman Midtrans.' })
      }
    } catch (e: any) {
      toast({ title: 'Gagal membuat pembayaran', description: String(e?.message || e), variant: 'destructive' })
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <section className="py-12 md:py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container-padding mx-auto max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Newsletter Melek Hukum
              </h2>
            </div>

            <p className="text-lg text-white/90 mb-8">
              Dapatkan update mingguan tentang perkembangan hukum, 
              tips anti-korupsi, dan panduan praktis langsung di inbox Anda.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Icon className="h-5 w-5 text-white/70" />
                    <span className="text-white/90">{benefit.text}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold">5,000+</p>
                <p className="text-sm text-white/70">Subscriber aktif</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-white/70">Gratis selamanya</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-2">
              Bergabung Sekarang
            </h3>
            <p className="text-white/80 mb-6">
              Tidak ada spam, hanya konten berkualitas.
            </p>
            
            <NewsletterForm />

            {/* Premium Template CTA */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/70">Premium Template Download</p>
                  <p className="text-xs text-white/70">Akses download template resmi, bebas iklan, update berkala.</p>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through text-white/60">Rp100.000</div>
                  <div className="text-2xl font-bold">Rp49.000</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayPremium}
                disabled={isPaying}
                className="w-full mt-4 px-4 py-3 rounded-lg bg-white text-primary font-semibold disabled:opacity-60"
              >
                {isPaying ? 'Memproses...' : 'Upgrade Sekarang'}
              </motion.button>
            </div>

            <div className="mt-6 flex items-start gap-2">
              <Shield className="h-4 w-4 text-white/60 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/60">
                Data Anda aman. Kami tidak akan membagikan informasi pribadi Anda 
                kepada pihak ketiga tanpa persetujuan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* QRIS Modal */}
      {qrisString && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center relative">
            <button
              onClick={() => setQrisString(null)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-semibold mb-1">Scan QRIS untuk Membayar</h4>
            {orderId && <p className="text-xs text-gray-500 mb-4">Order ID: {orderId}</p>}
            <div className="flex justify-center">
              <img
                alt="QRIS"
                className="w-64 h-64"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrisString)}`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-4">Setelah pembayaran berhasil, halaman akan menerima notifikasi dari Midtrans.</p>
          </div>
        </div>
      )}
    </section>
  )
}
