import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const referer = request.headers.get('referer');

  const isInternal = referer?.startsWith(url.origin);

  /*if (!isInternal) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }*/

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/api'],
};
