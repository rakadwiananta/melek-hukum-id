# 📱 Panduan Edit File Besar di Android untuk 295 Istilah

## 🚫 Masalah GitHub Mobile
- GitHub mobile **NGELEG** untuk file besar
- Editor terbatas dan sering crash
- Tidak cocok untuk 295 istilah data

## ✅ Solusi Praktis untuk Android

### 🎯 **METODE 1: Termux (RECOMMENDED)**
```bash
# Install Termux dari F-Droid atau Play Store
pkg update && pkg upgrade
pkg install git nodejs nano vim

# Clone repository
git clone https://github.com/rakadwiananta/melek-hukum-id
cd melek-hukum-id

# Edit dengan nano (mudah)
nano app/components/kamus/istilah/IstilahBisnis.tsx

# Atau vim (advanced)
vim app/components/kamus/istilah/IstilahBisnis.tsx

# Commit & push
git add .
git commit -m "Add remaining 260 business terms"
git push
```

### 📝 **METODE 2: Code Editor Apps**

#### **A. Acode (FREE)**
1. Install **Acode** dari Play Store
2. Clone/download repository
3. Open file `IstilahBisnis.tsx`
4. Edit dengan syntax highlighting
5. Sync kembali ke GitHub

#### **B. Dcoder (CODE EDITOR)**
1. Install **Dcoder** 
2. Import project
3. Edit file dengan autocomplete
4. Push via Git integration

#### **C. Spck Editor**
1. Web-based editor
2. GitHub integration built-in
3. Mobile-friendly interface

### 🌐 **METODE 3: Web Alternatives**

#### **A. GitHub1s (github1s.com)**
```
https://github1s.com/rakadwiananta/melek-hukum-id
```
- VS Code di browser
- Full editing capabilities
- Mobile responsive

#### **B. Gitpod**
```
https://gitpod.io/#https://github.com/rakadwiananta/melek-hukum-id
```
- Cloud development environment
- Terminal + editor
- Auto-sync dengan GitHub

#### **C. CodeSandbox**
- Import GitHub repository
- Edit in browser
- Auto-sync changes

### 📋 **METODE 4: Split File Strategy**

Karena 295 istilah terlalu besar, kita bisa split menjadi beberapa file:

```typescript
// istilah-1-100.ts
export const terms1to100 = [ /* 100 terms */ ];

// istilah-101-200.ts  
export const terms101to200 = [ /* 100 terms */ ];

// istilah-201-295.ts
export const terms201to295 = [ /* 95 terms */ ];

// IstilahBisnis.tsx
import { terms1to100 } from './istilah-1-100';
import { terms101to200 } from './istilah-101-200'; 
import { terms201to295 } from './istilah-201-295';

const businessLawTerms = [
  ...terms1to100,
  ...terms101to200, 
  ...terms201to295
];
```

### 💾 **METODE 5: Copy-Paste Smart**

#### **Persiapan di Android:**
1. **Google Docs/WPS Office**
2. **Buat template** dengan 10 istilah per halaman
3. **Copy-paste** ke GitHub secara bertahap
4. **Multiple small commits** instead of 1 big commit

#### **Format Template:**
```
=== BATCH 1: ISTILAH 36-45 ===

{
  id: 36,
  term: "Cash Flow",
  category: "accounting",
  definition: "...",
  example: "...",
  relatedTerms: [...],
  legalBasis: "..."
},

[REPEAT 9 MORE TIMES]

=== BATCH 2: ISTILAH 46-55 ===
[NEXT 10 TERMS]
```

### 🔧 **METODE 6: Android IDEs**

#### **AIDE (Android IDE)**
- Full Java/JavaScript support
- Git integration
- Project management

#### **CppDroid**
- Multi-language support
- File management
- Terminal access

## 🎯 **REKOMENDASI TERBAIK untuk 295 Istilah:**

### **📱 Untuk Pemula:**
1. **Termux** + **nano** (simple editing)
2. **Split file approach** (manageable chunks)

### **🔥 Untuk Advanced:**
1. **GitHub1s** (VS Code in browser)
2. **Termux** + **vim** (power user)

### **⚡ Untuk Quick Edit:**
1. **Acode app** (offline editing)
2. **Copy-paste batches** via Google Docs

## 📋 **Step-by-Step Termux Tutorial:**

```bash
# 1. Install & Setup
pkg install git nano
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 2. Clone & Navigate
git clone [your-repo-url]
cd melek-hukum-id

# 3. Edit File
nano app/components/kamus/istilah/IstilahBisnis.tsx

# 4. Termux Nano Controls:
# Ctrl+X = Exit & Save
# Ctrl+O = Save
# Ctrl+K = Cut line
# Ctrl+U = Paste
# Ctrl+W = Search

# 5. Commit & Push
git add .
git commit -m "Add terms 36-295"
git push
```

## 🆘 **Backup Plan:**
Jika semua gagal, saya bisa:
1. **Buatkan file JSON** dengan 295 istilah
2. **Anda download** dan edit lokal
3. **Upload via any method** yang berhasil

**Choose your weapon!** 🗡️📱