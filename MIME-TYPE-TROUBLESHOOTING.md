# MIME Type Troubleshooting Guide

## Error: "Refused to execute script from '...' because its MIME type ('text/css') is not executable"

### Penyebab Masalah

Error ini terjadi karena browser mendeteksi bahwa file CSS sedang dicoba dieksekusi sebagai JavaScript, yang melanggar Content Security Policy (CSP) dan MIME type checking.

### Solusi Komprehensif

#### 1. **Next.js Configuration Fix**

Update `next.config.js` untuk menambahkan header MIME type yang tepat:

```javascript
// CSS files with proper MIME type
{
  source: '/_next/static/(.*)\\.css',
  headers: [
    {
      key: 'Content-Type',
      value: 'text/css; charset=utf-8'
    },
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }
  ],
},
// JavaScript files with proper MIME type
{
  source: '/_next/static/(.*)\\.js',
  headers: [
    {
      key: 'Content-Type',
      value: 'application/javascript; charset=utf-8'
    },
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }
  ],
},
```

#### 2. **Content Security Policy Update**

Tambahkan CSP yang lebih fleksibel:

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://pagead2.googlesyndication.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;"
}
```

#### 3. **Apache .htaccess Configuration**

Jika menggunakan Apache, tambahkan file `.htaccess` di folder `public/`:

```apache
# MIME Type Configuration
<IfModule mod_mime.c>
    AddType text/css .css
    AddType application/javascript .js
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType image/webp .webp
    AddType image/avif .avif
</IfModule>

# Force MIME types for Next.js static files
<FilesMatch "\.(css)$">
    Header set Content-Type "text/css; charset=utf-8"
</FilesMatch>

<FilesMatch "\.(js)$">
    Header set Content-Type "application/javascript; charset=utf-8"
</FilesMatch>

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Frame-Options DENY
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

#### 4. **Nginx Configuration**

Jika menggunakan Nginx, tambahkan ke `nginx.conf`:

```nginx
# MIME types
types {
    text/css css;
    application/javascript js;
    application/json json;
    image/svg+xml svg;
    image/webp webp;
    image/avif avif;
}

# Security headers
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header X-Frame-Options DENY;
add_header Referrer-Policy "strict-origin-when-cross-origin";

# Next.js static files
location /_next/static/ {
    add_header Content-Type "text/css; charset=utf-8" always;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Langkah-langkah Implementasi

#### **Langkah 1: Update Configuration**
```bash
# Build ulang aplikasi
npm run build

# Deploy ke production
npm run start
```

#### **Langkah 2: Test MIME Types**
```bash
# Jalankan script testing
npm run fix-mime-types

# Atau manual test
curl -I https://www.wacanahukum.com/_next/static/css/0f8a1853ab8e092c.css
```

#### **Langkah 3: Clear Cache**
```bash
# Clear application cache
npm run clear-cache

# Clear browser cache (manual)
# Chrome: Ctrl+Shift+R
# Firefox: Ctrl+F5
# Safari: Cmd+Option+R
```

#### **Langkah 4: CDN Configuration**

Jika menggunakan CDN (Cloudflare, AWS CloudFront, dll):

1. **Cloudflare:**
   - Go to Rules → Transform Rules
   - Add rule for CSS files:
     - Field: URI Path
     - Operator: Contains
     - Value: .css
   - Set Header: Content-Type = text/css

2. **AWS CloudFront:**
   - Go to Behaviors
   - Edit behavior for `/_next/static/*`
   - Add custom header: Content-Type = text/css

### Testing dan Verifikasi

#### **Manual Testing**
```bash
# Test CSS file
curl -I https://www.wacanahukum.com/_next/static/css/0f8a1853ab8e092c.css

# Expected output:
# HTTP/1.1 200 OK
# Content-Type: text/css; charset=utf-8
# Cache-Control: public, max-age=31536000, immutable
```

#### **Browser Testing**
1. Open Developer Tools (F12)
2. Go to Network tab
3. Reload page
4. Check CSS files for proper Content-Type header

#### **Automated Testing**
```bash
# Run comprehensive test
npm run fix-mime-types
```

### Troubleshooting Checklist

#### ✅ **Configuration**
- [ ] Next.js headers configured
- [ ] .htaccess file exists (Apache)
- [ ] nginx.conf updated (Nginx)
- [ ] CDN settings configured

#### ✅ **Headers**
- [ ] Content-Type: text/css for CSS files
- [ ] Content-Type: application/javascript for JS files
- [ ] X-Content-Type-Options: nosniff
- [ ] Cache-Control headers set

#### ✅ **Testing**
- [ ] CSS files load without errors
- [ ] JavaScript files load without errors
- [ ] No console errors about MIME types
- [ ] Website functions normally

### Common Issues dan Solutions

#### **Issue 1: CSS still showing as executable**
**Solution:** Clear all caches (browser, CDN, server)

#### **Issue 2: Headers not being applied**
**Solution:** Check server configuration and restart web server

#### **Issue 3: CDN overriding headers**
**Solution:** Configure CDN to respect origin headers

#### **Issue 4: Mixed content errors**
**Solution:** Ensure all resources use HTTPS

### Monitoring

#### **Performance Monitoring**
- Monitor page load times
- Check for blocked resources
- Verify font loading

#### **Error Monitoring**
- Monitor console errors
- Check network failures
- Track MIME type violations

### Prevention

#### **Best Practices**
1. Always set proper Content-Type headers
2. Use HTTPS for all resources
3. Implement proper CSP
4. Regular testing and monitoring
5. Keep configurations updated

#### **Automation**
1. Automated testing scripts
2. CI/CD pipeline checks
3. Regular security audits
4. Performance monitoring

### Support

Jika masalah masih berlanjut:
1. Check server error logs
2. Verify hosting provider settings
3. Test with different browsers
4. Contact hosting provider support
5. Check CDN configuration

### Emergency Fix

Jika masalah kritis, gunakan fallback:

```javascript
// Temporary fix in next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        }
      ],
    }
  ]
}
```

Semua perbaikan ini akan mengatasi masalah MIME type dan memastikan website berfungsi dengan baik setelah pergantian domain.