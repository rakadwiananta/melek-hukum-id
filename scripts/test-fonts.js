#!/usr/bin/env node

/**
 * Font Testing Script
 * This script helps verify that fonts are loading correctly after domain migration
 */

const puppeteer = require('puppeteer')

async function testFonts() {
  console.log('🧪 Starting font loading tests...')
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    const page = await browser.newPage()
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 })
    
    // Navigate to the site
    const siteUrl = process.env.TEST_URL || 'http://localhost:3000'
    console.log(`🌐 Testing fonts at: ${siteUrl}`)
    
    await page.goto(siteUrl, { waitUntil: 'networkidle0', timeout: 30000 })
    
    // Wait for fonts to load
    await page.waitForTimeout(3000)
    
    // Test font loading
    const fontResults = await page.evaluate(() => {
      const results = {
        fontsLoaded: 0,
        fontFamilies: [],
        cssVariables: {},
        fontLoadingAPI: false,
        errors: []
      }
      
      try {
        // Check Font Loading API
        if (document.fonts && document.fonts.ready) {
          results.fontLoadingAPI = true
          results.fontsLoaded = document.fonts.size
          
          // Get font families
          document.fonts.forEach(font => {
            results.fontFamilies.push(font.family)
          })
        }
        
        // Check CSS variables
        const computedStyle = getComputedStyle(document.documentElement)
        results.cssVariables = {
          '--font-inter': computedStyle.getPropertyValue('--font-inter'),
          '--font-sans': computedStyle.getPropertyValue('--font-sans'),
          '--font-mono': computedStyle.getPropertyValue('--font-mono')
        }
        
        // Check if Inter font is applied
        const bodyFont = getComputedStyle(document.body).fontFamily
        results.bodyFont = bodyFont
        
        // Check for font loading classes
        results.fontClasses = {
          'fonts-loading': document.documentElement.classList.contains('fonts-loading'),
          'fonts-loaded': document.documentElement.classList.contains('fonts-loaded'),
          'fonts-error': document.documentElement.classList.contains('fonts-error')
        }
        
      } catch (error) {
        results.errors.push(error.message)
      }
      
      return results
    })
    
    // Print results
    console.log('\n📊 Font Loading Test Results:')
    console.log('================================')
    console.log(`✅ Font Loading API: ${fontResults.fontLoadingAPI ? 'Supported' : 'Not Supported'}`)
    console.log(`📝 Fonts Loaded: ${fontResults.fontsLoaded}`)
    console.log(`🎨 Font Families: ${fontResults.fontFamilies.join(', ')}`)
    console.log(`🎯 Body Font: ${fontResults.bodyFont}`)
    
    console.log('\n🔧 CSS Variables:')
    Object.entries(fontResults.cssVariables).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`)
    })
    
    console.log('\n🏷️  Font Loading Classes:')
    Object.entries(fontResults.fontClasses).forEach(([key, value]) => {
      console.log(`   ${key}: ${value ? '✅' : '❌'}`)
    })
    
    if (fontResults.errors.length > 0) {
      console.log('\n❌ Errors:')
      fontResults.errors.forEach(error => {
        console.log(`   ${error}`)
      })
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'font-test-screenshot.png',
      fullPage: true 
    })
    console.log('\n📸 Screenshot saved as: font-test-screenshot.png')
    
    // Performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0]
      const resources = performance.getEntriesByType('resource')
      const fontResources = resources.filter(r => r.name.includes('font'))
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        fontResources: fontResources.length,
        fontLoadTimes: fontResources.map(r => ({
          name: r.name,
          duration: r.duration
        }))
      }
    })
    
    console.log('\n⚡ Performance Metrics:')
    console.log(`   Load Time: ${performanceMetrics.loadTime.toFixed(2)}ms`)
    console.log(`   DOM Content Loaded: ${performanceMetrics.domContentLoaded.toFixed(2)}ms`)
    console.log(`   Font Resources: ${performanceMetrics.fontResources}`)
    
    if (performanceMetrics.fontLoadTimes.length > 0) {
      console.log('\n📊 Font Load Times:')
      performanceMetrics.fontLoadTimes.forEach(font => {
        console.log(`   ${font.name}: ${font.duration.toFixed(2)}ms`)
      })
    }
    
    // Overall assessment
    console.log('\n🎯 Overall Assessment:')
    if (fontResults.fontsLoaded > 0 && fontResults.fontClasses['fonts-loaded']) {
      console.log('✅ Fonts are loading correctly!')
    } else if (fontResults.fontClasses['fonts-loading']) {
      console.log('⏳ Fonts are still loading...')
    } else if (fontResults.fontClasses['fonts-error']) {
      console.log('❌ Font loading errors detected')
    } else {
      console.log('⚠️  Font loading status unclear')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  } finally {
    await browser.close()
  }
}

// Run the test
testFonts().catch(console.error)