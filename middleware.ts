// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Список тестовых страниц (можно расширять)
  const debugPaths = [
    '/api/test',
    '/test'
  ];

  // Проверяем, начинается ли путь с одного из тестовых
  const isDebugPath = debugPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // В продакшене — 404
  if (isDebugPath && process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

// Применяем ко всем путям
export const config = {
  matcher: '/:path*',
};