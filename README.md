# Melek Hukum ID

Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia.

## 🏗️ Struktur Project

```
melek-hukum-id/
├── app/
│   ├── (main)/           # Main pages
│   │   ├── kamus-hukum/        # Kamus hukum
│   │   ├── solusi/             # Solusi hukum
│   │   ├── regulasi/           # Regulasi
│   │   ├── anti-korupsi/       # Anti korupsi
│   │   ├── artikel/            # Artikel hukum
│   │   ├── payment-success/    # Payment success page
│   │   ├── payment-error/      # Payment error page
│   │   └── tools/              # Tools interaktif
│   │       ├── kalkulator-denda/
│   │       └── kuis-korupsi/
│   ├── api/                    # API routes
│   │   ├── newsletter/
│   │   ├── payments/           # Midtrans payment APIs
│   │   └── search/
│   ├── components/
│   │   ├── ui/                 # UI components
│   │   ├── layout/             # Layout components
│   │   ├── home/               # Home page components
│   │   ├── article/            # Article components
│   │   ├── solusi/             # Solusi components
│   │   ├── tools/              # Tools components
│   │   ├── ads/                # Advertisement components
│   │   ├── analytics/          # Analytics components
│   │   └── seo/                # SEO components
│   └── lib/                    # Utility functions
│       └── supabase/
├── public/                     # Static assets
├── styles/                     # Global styles
└── types/                      # TypeScript types
```

## Setup Environment Variables

1. Copy file `env.example` ke `.env.local`:
```bash
cp env.example .env.local
```

2. Edit file `.env.local` dan isi dengan kredensial yang diperlukan:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Midtrans Configuration
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_SERVER_KEY=your_midtrans_server_key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_ALLOWED_PAYMENT_TYPES=qris,gopay,bank_transfer
MIDTRANS_DEFAULT_PAYMENT_TYPE=qris
MIDTRANS_FINISH_URL=https://yourdomain.com/payment-success
MIDTRANS_ERROR_URL=https://yourdomain.com/payment-error
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/your-username/melek-hukum-id.git
cd melek-hukum-id
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp env.example .env.local
# Edit .env.local dengan kredensial Anda
```

4. **Run development server**
```bash
npm run dev
```

## 🔧 Konfigurasi Midtrans

### Setup Payment Channels

1. **Aktifkan channel di Midtrans Dashboard:**
   - Login ke [Midtrans Dashboard](https://dashboard.midtrans.com)
   - Pilih environment (Sandbox/Production)
   - Masuk ke **Settings** → **Payment** → **Payment Channels**
   - Aktifkan channel yang diinginkan: QRIS, GoPay, Bank Transfer

2. **Konfigurasi URL Redirect:**
   - Di **Settings** → **Snap Preferences** → **Payment Channels**
   - Set **Finish Redirect URL** ke: `https://yourdomain.com/payment-success`
   - Set **Error Payment URL** ke: `https://yourdomain.com/payment-error`
   - **PENTING:** Jangan gunakan IP address atau localhost

3. **Environment Variables:**
   ```env
   # Payment channels yang diizinkan
   MIDTRANS_ALLOWED_PAYMENT_TYPES=qris,gopay,bank_transfer
   
   # Default payment type
   MIDTRANS_DEFAULT_PAYMENT_TYPE=qris
   
   # URL redirect (wajib domain valid, bukan IP/localhost)
   MIDTRANS_FINISH_URL=https://yourdomain.com/payment-success
   MIDTRANS_ERROR_URL=https://yourdomain.com/payment-error
   ```

### Testing Payment

1. **Test QRIS:**
   ```bash
   curl -X POST http://localhost:3000/api/payments/charge \
     -H "Content-Type: application/json" \
     -d '{
       "payment_type": "qris",
       "gross_amount": 15000,
       "customer_details": {"first_name": "Test"},
       "items": [{"id": "SKU1", "price": 15000, "quantity": 1, "name": "Test Product"}]
     }'
   ```

2. **Test GoPay:**
   ```bash
   curl -X POST http://localhost:3000/api/payments/charge \
     -H "Content-Type: application/json" \
     -d '{
       "payment_type": "gopay",
       "gross_amount": 15000,
       "customer_details": {"first_name": "Test"},
       "items": [{"id": "SKU1", "price": 15000, "quantity": 1, "name": "Test Product"}]
     }'
   ```

3. **Test Bank Transfer:**
   ```bash
   curl -X POST http://localhost:3000/api/payments/charge \
     -H "Content-Type: application/json" \
     -d '{
       "payment_type": "bank_transfer",
       "bank": "bca",
       "gross_amount": 15000,
       "customer_details": {"first_name": "Test"},
       "items": [{"id": "SKU1", "price": 15000, "quantity": 1, "name": "Test Product"}]
     }'
   ```

## 🐛 Troubleshooting

### Error 402: Payment channel is not activated

**Penyebab:** Channel pembayaran belum diaktifkan di Midtrans Dashboard.

**Solusi:**
1. Aktifkan channel di **Settings** → **Payment** → **Payment Channels**
2. Pastikan environment (Sandbox/Production) sesuai dengan kunci yang digunakan
3. Update `MIDTRANS_ALLOWED_PAYMENT_TYPES` di environment variables

### Error: Success payment URL cannot accept IP address

**Penyebab:** URL redirect menggunakan IP address atau localhost.

**Solusi:**
1. Gunakan domain yang valid (bukan IP/localhost)
2. Set environment variables:
   ```env
   MIDTRANS_FINISH_URL=https://yourdomain.com/payment-success
   MIDTRANS_ERROR_URL=https://yourdomain.com/payment-error
   ```
3. Update URL di Midtrans Dashboard

### Error: payment_fee_configs should not be an empty array

**Penyebab:** Konfigurasi fee tidak lengkap.

**Solusi:**
- Error ini sudah ditangani di kode terbaru
- Pastikan menggunakan versi terbaru dari `app/api/payments/charge/route.ts`

### Error: Signature tidak valid

**Penyebab:** Verifikasi signature gagal.

**Solusi:**
1. Pastikan `MIDTRANS_SERVER_KEY` benar dan sesuai environment
2. Cek apakah payload diteruskan apa adanya
3. Verifikasi `order_id`, `status_code`, `gross_amount` konsisten

## 📊 Analytics & SEO

### Google Analytics
- Page view tracking
- Event tracking
- Conversion tracking
- Performance monitoring

### SEO
- Meta tags optimization
- Open Graph tags
- Twitter Cards
- Structured data
- Sitemap generation

### AdSense
- Header banner ads
- In-content ads
- Mobile ads
- Responsive ads

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables
4. Deploy otomatis

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.