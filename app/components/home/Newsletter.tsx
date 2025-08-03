'use client'

import { motion } from 'framer-motion'
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
    </section>
  )
}
