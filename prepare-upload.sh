#!/bin/bash

echo "📦 Preparing files for SSH upload..."

# Create upload package
echo "📁 Creating upload package..."
mkdir -p upload-package
cp -r .next upload-package/
cp -r public upload-package/
cp package.json upload-package/
cp package-lock.json upload-package/
cp next.config.js upload-package/
cp .env.production upload-package/
cp .htaccess upload-package/
cp .cpanel.yml upload-package/

# Create ZIP file for easy upload
echo "🗜️ Creating ZIP file..."
zip -r deploy-package.zip upload-package/

echo "✅ Upload package ready!"
echo ""
echo "📋 Files in upload-package/:"
ls -la upload-package/
echo ""
echo "📦 ZIP file: deploy-package.zip"
echo ""
echo "🚀 Next steps:"
echo "1. Upload deploy-package.zip via File Manager"
echo "2. Extract di /home/bicarahu/public_html/"
echo "3. Atau gunakan SCP command:"
echo "   scp deploy-package.zip username@your-server:/tmp/"
echo "   ssh username@your-server 'cd /home/bicarahu/public_html/ && unzip /tmp/deploy-package.zip'"