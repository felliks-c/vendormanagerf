// proxy.ts (в корне проекта!)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const HIDDEN_PATHS = [
  '/api/test',
  '/test'
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isHidden = HIDDEN_PATHS.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  );

  if (isHidden && process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};