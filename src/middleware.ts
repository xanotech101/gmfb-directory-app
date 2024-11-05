import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add this function to check if the request is for a static file
function isStaticFile(pathname: string) {
  return /\.(.*)$/.test(pathname)
}

export function middleware(request: NextRequest) {
  const session = request.cookies.get('gmfbEToken')?.value
  const { pathname } = request.nextUrl
  const isAuthPage = pathname === '/'
  const isApiRoute = pathname.startsWith('/api/')

  // Allow static files, API routes, and other excluded paths to pass through
  if (isStaticFile(pathname) || isApiRoute) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users to login page
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect authenticated users to dashboard if they try to access login page
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

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