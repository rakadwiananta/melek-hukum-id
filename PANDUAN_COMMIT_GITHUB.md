# Panduan Commit ke GitHub Repository

## Persiapan Awal

### 1. Konfigurasi Git (Jika Belum)
```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@example.com"
```

### 2. Cek Status Repository
```bash
git status
```

## Langkah-langkah Commit

### 1. Menambahkan File ke Staging Area
```bash
# Menambahkan semua file yang berubah
git add .

# Atau menambahkan file tertentu
git add nama-file.tsx
git add app/components/
```

### 2. Melihat Perubahan yang Akan Di-commit
```bash
# Melihat file yang sudah di-staging
git status

# Melihat detail perubahan
git diff --cached
```

### 3. Membuat Commit
```bash
# Commit dengan pesan singkat
git commit -m "feat: tambah fitur anti korupsi"

# Commit dengan pesan detail
git commit -m "feat: tambah komponen anti korupsi

- Tambah halaman anti korupsi
- Implementasi kuis korupsi
- Perbaikan UI/UX
- Update dependencies"
```

### 4. Push ke GitHub
```bash
# Push ke branch main
git push origin main

# Push ke branch baru
git push origin nama-branch
```

## Konvensi Pesan Commit

### Format Standar
```
type(scope): description

[optional body]

[optional footer]
```

### Jenis Type
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Dokumentasi
- `style`: Formatting, missing semicolons, dll
- `refactor`: Refactoring kode
- `test`: Menambah atau memperbaiki test
- `chore`: Update build process, tools, dll

### Contoh Pesan Commit
```bash
# Fitur baru
git commit -m "feat(anti-korupsi): tambah halaman edukasi korupsi"

# Perbaikan bug
git commit -m "fix(quiz): perbaiki perhitungan skor kuis"

# Refactoring
git commit -m "refactor(components): pisahkan komponen ArticleCard"

# Update dependencies
git commit -m "chore(deps): update Next.js ke versi 14"
```

## Workflow Git yang Direkomendasikan

### 1. Branch Strategy
```bash
# Buat branch baru untuk fitur
git checkout -b feature/anti-korupsi

# Buat branch untuk perbaikan bug
git checkout -b fix/quiz-calculation

# Buat branch untuk hotfix
git checkout -b hotfix/urgent-fix
```

### 2. Merge Strategy
```bash
# Update branch main
git checkout main
git pull origin main

# Merge branch fitur
git merge feature/anti-korupsi

# Push perubahan
git push origin main
```

## Perintah Git Penting

### Melihat History
```bash
# Lihat log commit
git log --oneline

# Lihat log dengan detail
git log --graph --oneline --all
```

### Mengelola Branch
```bash
# Lihat semua branch
git branch -a

# Hapus branch lokal
git branch -d nama-branch

# Hapus branch remote
git push origin --delete nama-branch
```

### Reset dan Revert
```bash
# Reset commit terakhir (soft - keep changes)
git reset --soft HEAD~1

# Reset commit terakhir (hard - delete changes)
git reset --hard HEAD~1

# Revert commit tertentu
git revert commit-hash
```

## Troubleshooting

### 1. Conflict Merge
```bash
# Lihat file yang conflict
git status

# Setelah resolve conflict
git add .
git commit -m "resolve merge conflict"
```

### 2. Undo Last Commit
```bash
# Undo commit tapi keep changes
git reset --soft HEAD~1

# Undo commit dan delete changes
git reset --hard HEAD~1
```

### 3. Stash Changes
```bash
# Simpan perubahan sementara
git stash

# Lihat stash
git stash list

# Apply stash
git stash pop
```

## Tips Best Practices

1. **Commit Sering**: Commit setiap fitur kecil selesai
2. **Pesan Jelas**: Gunakan pesan commit yang deskriptif
3. **Review Sebelum Push**: Selalu review perubahan sebelum push
4. **Gunakan Branch**: Jangan commit langsung ke main
5. **Update Regular**: Pull dari remote secara regular

## Contoh Workflow Lengkap

```bash
# 1. Update repository
git pull origin main

# 2. Buat branch baru
git checkout -b feature/navbar-improvement

# 3. Edit file
# ... edit kode ...

# 4. Add perubahan
git add .

# 5. Commit
git commit -m "feat(navbar): tambah responsive navigation menu"

# 6. Push branch
git push origin feature/navbar-improvement

# 7. Buat Pull Request di GitHub
# 8. Setelah review, merge ke main
```

## Konfigurasi Git Hooks (Opsional)

Buat file `.git/hooks/pre-commit` untuk auto-check:
```bash
#!/bin/sh
npm run lint
npm run type-check
```

## Catatan Penting

- Selalu backup sebelum melakukan operasi git yang berisiko
- Gunakan `git log` untuk melihat history sebelum reset/revert
- Test kode sebelum commit
- Dokumentasikan perubahan penting di README.md 