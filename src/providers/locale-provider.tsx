'use client';

import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/lib/language';
import { createContext, ReactNode, useContext } from 'react';

const LocaleContext = createContext<SupportedLanguage>(DEFAULT_LANGUAGE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: SupportedLanguage;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): SupportedLanguage {
  return useContext(LocaleContext);
}
