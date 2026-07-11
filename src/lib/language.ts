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
export function isValidLanguage(lang: string | unknown): lang is SupportedLanguage {
  return typeof lang === 'string' && SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
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
export function getAlternateLanguage(current: SupportedLanguage): SupportedLanguage {
  return current === 'en' ? 'de' : 'en';
}
