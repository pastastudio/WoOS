/**
 * Central language configuration and utilities
 * Single source of truth for language management across the application
 *
 * These are pure utility functions that work on both server and client.
 * No 'use server' directive needed - these are not server actions.
 */

export const SUPPORTED_LANGUAGES = ['en', 'de'] as const;
export const DEFAULT_LANGUAGE = 'en' as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Validates if a language is supported
 * @param lang - Language to validate
 * @returns true if language is supported, false otherwise
 */
export function isValidLanguage(
  lang: string | unknown,
): lang is SupportedLanguage {
  return (
    typeof lang === 'string' &&
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
  );
}

/**
 * Gets language from URL params with validation and fallback
 * @param lang - Raw language from URL params
 * @returns Valid language code or default
 */
export function getLanguageFromParams(
  lang: string | string[] | undefined,
): SupportedLanguage {
  const normalizedLang = Array.isArray(lang) ? lang[0] : lang;
  return isValidLanguage(normalizedLang) ? normalizedLang : DEFAULT_LANGUAGE;
}

/**
 * Gets display name for a language
 * @param lang - Language code
 * @returns Human-readable language name with flag emoji
 */
export function getLanguageName(lang: SupportedLanguage): string {
  const names: Record<SupportedLanguage, string> = {
    en: 'English 🇬🇧',
    de: 'Deutsch 🇩🇪',
  };
  return names[lang];
}

/**
 * Gets the alternate language (for language switcher)
 * @param current - Current language
 * @returns The other supported language
 */
export function getAlternateLanguage(
  current: SupportedLanguage,
): SupportedLanguage {
  return current === 'en' ? 'de' : 'en';
}

/**
 * Builds a localized URL path
 * @param path - The path without language prefix
 * @param lang - Target language
 * @returns Full path with language prefix
 */
export function buildLocalizedPath(
  path: string,
  lang: SupportedLanguage,
): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}

/**
 * Extracts language from URL pathname
 * @param pathname - Full pathname
 * @returns Language code or default
 */
export function extractLanguageFromPathname(
  pathname: string,
): SupportedLanguage {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  return getLanguageFromParams(firstSegment);
}
