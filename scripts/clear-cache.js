#!/usr/bin/env node

/**
 * Cache Clearing Script for Domain Migration
 * This script helps clear various caches and ensure proper resource loading
 * after a domain change.
 */

const fs = require('fs')
const path = require('path')

console.log('🧹 Starting cache clearing process...')

// Clear Next.js build cache
const nextCacheDir = path.join(process.cwd(), '.next')
if (fs.existsSync(nextCacheDir)) {
  console.log('🗑️  Clearing Next.js cache...')
  fs.rmSync(nextCacheDir, { recursive: true, force: true })
  console.log('✅ Next.js cache cleared')
}

// Clear node_modules cache (optional)
const nodeModulesDir = path.join(process.cwd(), 'node_modules')
if (fs.existsSync(nodeModulesDir)) {
  console.log('🗑️  Clearing node_modules cache...')
  fs.rmSync(nodeModulesDir, { recursive: true, force: true })
  console.log('✅ node_modules cache cleared')
}

// Clear package-lock.json to force fresh install
const packageLockPath = path.join(process.cwd(), 'package-lock.json')
if (fs.existsSync(packageLockPath)) {
  console.log('🗑️  Removing package-lock.json...')
  fs.unlinkSync(packageLockPath)
  console.log('✅ package-lock.json removed')
}

console.log('📦 Installing fresh dependencies...')
const { execSync } = require('child_process')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Dependencies installed successfully')
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message)
  process.exit(1)
}

console.log('🔨 Building fresh application...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Application built successfully')
} catch (error) {
  console.error('❌ Error building application:', error.message)
  process.exit(1)
}

console.log('🎉 Cache clearing and rebuild completed successfully!')
console.log('💡 Remember to:')
console.log('   1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)')
console.log('   2. Hard refresh the website')
console.log('   3. Check that fonts are loading correctly')
console.log('   4. Verify all styling is consistent')