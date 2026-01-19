'use server';

import { cookies } from 'next/headers';

export async function setLanguageCookie(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('preferred_language', locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  });
}
