'use server';

import { cookies } from 'next/headers';
import { SupportedLanguage, isValidLanguage } from './language';

/**
 * Gets dictionary for specified language
 * @param lang - Language code (en or de)
 * @returns Promise resolving to dictionary object
 */
async function getDictionary(lang: string | SupportedLanguage) {
  const normalizedLang = isValidLanguage(lang) ? lang : 'en';

  switch (normalizedLang) {
    case 'de':
      return import('@dic/de/common.json').then((m) => m.default);
    case 'en':
    default:
      return import('@dic/en/common.json').then((m) => m.default);
  }
}

/**
 * Sets language preference cookie
 * @param locale - Language code to set
 */
async function setLanguageCookie(locale: string) {
  if (!isValidLanguage(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set('preferred_language', locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  });
}

export { getDictionary, setLanguageCookie };
