import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const host = request.headers.get('host')
  const url = request.nextUrl.clone()
  
  // Check if the request is from the old domain
  if (host === 'bicarahukum.my.id' || host === 'www.bicarahukum.my.id') {
    // Construct the new URL
    const newUrl = new URL(url.pathname + url.search, 'https://wacanahukum.com')
    
    // Return 301 redirect
    return NextResponse.redirect(newUrl, 301)
  }
  
  // If not from old domain, continue normally
  return NextResponse.next()
}

export async function POST(request: NextRequest) {
  return GET(request)
}

export async function PUT(request: NextRequest) {
  return GET(request)
}

export async function DELETE(request: NextRequest) {
  return GET(request)
}

export async function PATCH(request: NextRequest) {
  return GET(request)
}