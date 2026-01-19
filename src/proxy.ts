import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/lib/language';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Determines the user's preferred language based on:
 * 1. Cookie preference (persistent across sessions)
 * 2. Accept-Language header (system/browser preference)
 * 3. Default language fallback
 *
 * This centralized logic ensures consistent language detection
 * across all routing and components.
 */
function isSupportedLanguage(
  lang: string | null | undefined,
): lang is SupportedLanguage {
  return !!lang && SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

function getLocale(request: NextRequest): string {
  // 1. Check for preferred_language cookie (highest priority)
  const cookieLocale = request.cookies.get('preferred_language')?.value;
  if (isSupportedLanguage(cookieLocale)) {
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
      if (isSupportedLanguage(lang)) {
        return lang;
      }
    }
  }

  // 3. Fall back to default locale
  return DEFAULT_LANGUAGE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets, API routes, and files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a language prefix
  const hasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Determine user's preferred language and redirect
  const selectedLocale = getLocale(request);
  request.nextUrl.pathname = `/${selectedLocale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);

  // Persist language preference in cookie for future requests
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
