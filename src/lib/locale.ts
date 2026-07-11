import { cookies, headers } from 'next/headers';
import { DEFAULT_LANGUAGE, isValidLanguage, type SupportedLanguage } from './language';

/**
 * Server-side locale resolution without a URL segment.
 * proxy.ts sets x-locale on every request; cookie/default cover the
 * rare case a request reaches a Server Component without going through it.
 */
export async function getLocale(): Promise<SupportedLanguage> {
  const headerLocale = (await headers()).get('x-locale');
  if (isValidLanguage(headerLocale)) return headerLocale;

  const cookieLocale = (await cookies()).get('preferred_language')?.value;
  if (isValidLanguage(cookieLocale)) return cookieLocale;

  return DEFAULT_LANGUAGE;
}
