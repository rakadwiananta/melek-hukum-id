# Template untuk Melengkapi 295 Istilah Hukum Bisnis

## Status Saat Ini
- ✅ Sudah ada: 35 istilah (ID 1-35)
- ⏳ Perlu ditambah: 260 istilah (ID 36-295)

## Cara Melengkapi Data

### 1. Via GitHub Web Interface
1. Buka file `app/components/kamus/istilah/IstilahBisnis.tsx`
2. Edit file dan tambahkan istilah 36-295 sebelum komentar `/* CATATAN */`
3. Gunakan format yang sama:

```typescript
{
  id: 36,
  term: "Cash Flow",
  category: "accounting", 
  definition: "Aliran masuk dan keluar kas perusahaan",
  example: "Laporan arus kas tahunan",
  relatedTerms: ["Arus Kas", "Cashflow"],
  legalBasis: "PSAK"
},
```

### 2. Istilah yang Harus Ditambahkan (36-295)

#### Kelompok Accounting (36-60)
- Cash Flow, CEO, Credit Rating, Current Ratio, etc.

#### Kelompok Corporate (61-100) 
- Collateral, Compliance, Copyright, Corporate Governance, etc.

#### Kelompok Contracts (101-140)
- Due Diligence, Dividend, Export Agreement, etc.

#### Kelompok Finance (141-180)
- Financial Statement, Fintech, Foreign Investment, etc.

#### Kelompok Legal (181-220)
- Forensic Audit, Franchise, Good Faith, etc.

#### Kelompok Compliance (221-260)
- Governance, Risk Management, Tax Planning, etc.

#### Kelompok Trade & Others (261-295)
- Import, Export, Transfer Pricing, Zone Agreement, etc.

### 3. Kategori yang Tersedia
- accounting
- corporate  
- contracts
- finance
- legal
- compliance
- trade
- intellectual-property
- employment
- business-types
- tax

## Referensi Data Lengkap
Silakan gunakan data dari commit sebelumnya yang berisi 295 istilah lengkap.
