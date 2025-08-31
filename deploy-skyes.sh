#!/bin/bash

echo "🚀 Starting deployment to Skyes ID..."

# Build the project
echo "📦 Building project..."
npm run build:production

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create deployment package
    echo "📁 Creating deployment package..."
    mkdir -p deploy
    cp -r .next deploy/
    cp -r public deploy/
    cp package.json deploy/
    cp package-lock.json deploy/
    cp next.config.js deploy/
    cp .env.production deploy/
    cp .htaccess deploy/
    cp .cpanel.yml deploy/
    
    echo "📋 Files ready for deployment:"
    ls -la deploy/
    
    echo "🎯 Next steps:"
    echo "1. Upload the 'deploy' folder contents to your Skyes ID hosting"
    echo "2. Upload to: /home/bicarahu/public_html/"
    echo "3. Run 'npm install --production' on the server"
    echo "4. Configure your domain and SSL certificate"
    echo "5. Update .env.production with your actual values"
    
else
    echo "❌ Build failed!"
    exit 1
fi