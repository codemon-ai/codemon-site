import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* except login page and login API
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !pathname.startsWith('/api/admin/login')
  ) {
    const token = request.cookies.get('admin_session')?.value

    if (!token || !token.includes('.') || token.split('.').length !== 2) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect /work/* except its login page and login API
  if (
    pathname.startsWith('/work') &&
    pathname !== '/work/login' &&
    !pathname.startsWith('/api/work/login')
  ) {
    const token = request.cookies.get('work_session')?.value

    if (!token || !token.includes('.') || token.split('.').length !== 2) {
      return NextResponse.redirect(new URL('/work/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/work/:path*'],
}
