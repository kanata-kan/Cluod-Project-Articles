import { NextResponse } from 'next/server';

export function middleware(request) {
  const jwtToken = request.cookies.get('jwtToken');
  const token = jwtToken?.value;

  if (!token) {
    if (request.nextUrl.pathname.startsWith('/api/users/profile/')) {
      return NextResponse.json(
        { message: 'التوكن غير موجود : middleware' },
        { status: 401 },
      );
    }
  } else {
    if (
      request.nextUrl.pathname === '/Login' ||
      request.nextUrl.pathname === '/Register'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/api/users/profile/:path*', '/Login', '/Register'],
};
