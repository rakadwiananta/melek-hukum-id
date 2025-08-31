import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// Update: Hello to Goodbye