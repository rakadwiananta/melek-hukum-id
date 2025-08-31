#!/usr/bin/env node

/**
 * MIME Type Fix Script
 * This script helps fix MIME type issues after domain migration
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

console.log('🔧 Starting MIME type fix process...')

// Configuration
const config = {
  siteUrl: process.env.SITE_URL || 'https://www.wacanahukum.com',
  testPaths: [
    '/_next/static/css/0f8a1853ab8e092c.css',
    '/_next/static/chunks/main.js',
    '/_next/static/chunks/webpack.js',
    '/favicon.ico',
    '/manifest.json'
  ]
}

// Test MIME types for different file types
async function testMimeTypes() {
  console.log(`🌐 Testing MIME types for: ${config.siteUrl}`)
  
  for (const testPath of config.testPaths) {
    try {
      const url = `${config.siteUrl}${testPath}`
      console.log(`\n📄 Testing: ${testPath}`)
      
      const response = await makeRequest(url)
      
      if (response) {
        console.log(`   Status: ${response.statusCode}`)
        console.log(`   Content-Type: ${response.headers['content-type'] || 'Not set'}`)
        console.log(`   Cache-Control: ${response.headers['cache-control'] || 'Not set'}`)
        
        // Check for MIME type issues
        const contentType = response.headers['content-type'] || ''
        const fileExtension = path.extname(testPath)
        
        if (fileExtension === '.css' && !contentType.includes('text/css')) {
          console.log(`   ⚠️  Warning: CSS file without proper MIME type`)
        } else if (fileExtension === '.js' && !contentType.includes('javascript')) {
          console.log(`   ⚠️  Warning: JS file without proper MIME type`)
        } else {
          console.log(`   ✅ MIME type looks correct`)
        }
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`)
    }
  }
}

// Make HTTP/HTTPS request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      resolve(res)
    })
    
    req.on('error', (error) => {
      reject(error)
    })
    
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

// Generate .htaccess content
function generateHtaccess() {
  const htaccessContent = `# MIME Type Configuration for Next.js
<IfModule mod_mime.c>
    AddType text/css .css
    AddType application/javascript .js
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType image/webp .webp
    AddType image/avif .avif
</IfModule>

# Force MIME types for Next.js static files
<FilesMatch "\\.(css)$">
    Header set Content-Type "text/css; charset=utf-8"
</FilesMatch>

<FilesMatch "\\.(js)$">
    Header set Content-Type "application/javascript; charset=utf-8"
</FilesMatch>

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Frame-Options DENY
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>
`
  
  return htaccessContent
}

// Create .htaccess file
function createHtaccess() {
  const htaccessPath = path.join(process.cwd(), 'public', '.htaccess')
  const content = generateHtaccess()
  
  try {
    fs.writeFileSync(htaccessPath, content)
    console.log(`\n✅ Created .htaccess file at: ${htaccessPath}`)
    return true
  } catch (error) {
    console.error(`❌ Error creating .htaccess: ${error.message}`)
    return false
  }
}

// Check if .htaccess exists
function checkHtaccess() {
  const htaccessPath = path.join(process.cwd(), 'public', '.htaccess')
  const exists = fs.existsSync(htaccessPath)
  
  console.log(`\n📁 .htaccess file: ${exists ? '✅ Exists' : '❌ Missing'}`)
  
  if (exists) {
    const content = fs.readFileSync(htaccessPath, 'utf8')
    const hasMimeTypes = content.includes('AddType text/css')
    const hasSecurityHeaders = content.includes('X-Content-Type-Options')
    
    console.log(`   MIME types: ${hasMimeTypes ? '✅ Configured' : '❌ Missing'}`)
    console.log(`   Security headers: ${hasSecurityHeaders ? '✅ Configured' : '❌ Missing'}`)
  }
  
  return exists
}

// Main execution
async function main() {
  console.log('🔍 Checking current configuration...')
  
  // Check .htaccess
  const htaccessExists = checkHtaccess()
  
  if (!htaccessExists) {
    console.log('\n📝 Creating .htaccess file...')
    createHtaccess()
  }
  
  // Test MIME types
  console.log('\n🧪 Testing MIME types...')
  await testMimeTypes()
  
  console.log('\n📋 Recommendations:')
  console.log('1. Ensure your hosting provider supports .htaccess files')
  console.log('2. If using Nginx, add MIME type configuration to nginx.conf')
  console.log('3. If using CDN, configure proper MIME types in CDN settings')
  console.log('4. Clear browser cache and test again')
  console.log('5. Check server error logs for additional issues')
  
  console.log('\n🎯 Next steps:')
  console.log('- Deploy the updated .htaccess file')
  console.log('- Clear CDN cache if using one')
  console.log('- Test the website in different browsers')
  console.log('- Monitor for any remaining MIME type errors')
}

// Run the script
main().catch(console.error)