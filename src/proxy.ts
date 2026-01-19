import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // 1. Check for preferred_language cookie
  const cookieLocale = request.cookies.get('preferred_language')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header (system language preference)
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language: en-US,en;q=0.9,de;q=0.8
    const languages = acceptLanguage.split(',').map((lang) => {
      const [locale] = lang.trim().split(';');
      const [language] = locale.split('-');
      return language.toLowerCase();
    });

    for (const lang of languages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  // 3. Fall back to default locale
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const selectedLocale = getLocale(request);
  request.nextUrl.pathname = `/${selectedLocale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);

  // Set the cookie for future requests
  response.cookies.set('preferred_language', selectedLocale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
