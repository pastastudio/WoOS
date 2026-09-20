'use client';

import { setLanguageCookie } from '@/lib/i18n';
import { SupportedLanguage } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useLocale } from '@/providers/locale-provider';
import type { Sozials } from '@/types/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

import Logo from '@/assets/logo.svg';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FooterSocialsProps extends React.ComponentProps<'div'> {
  logo?: boolean;
  languageText?: string;
  socialsText?: string;
}

/**
 * Language data constant
 */
const LANGUAGES = [
  { value: 'de' as const, label: 'Deutsch', flag: '🇩🇪' },
  { value: 'en' as const, label: 'English', flag: '🇬🇧' },
] as const;

/**
 * Renders the footer sozials section (logo, language switcher, social links).
 * Client component: the language switcher needs router/state/cookie access.
 */
function FooterSocials({
  className,
  logo,
  languageText,
  socialsText,
  children,
  ...props
}: FooterSocialsProps) {
  const router = useRouter();
  const initialLang = useLocale();

  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(initialLang);

  const selectedLang = LANGUAGES.find(lang => lang.value === selectedLanguage);

  const handleLanguageChange = async (value: string | null) => {
    if (value == null || !['en', 'de'].includes(value)) return;
    setSelectedLanguage(value as SupportedLanguage);

    // Set the cookie server-side, then refresh so Server Components re-render with it
    await setLanguageCookie(value);
    router.refresh();
  };

  return (
    <div
      data-slot="footer-socials"
      className={cn(
        'font-pixelify flex flex-col items-start [@media(max-width:640px)]:w-full',
        className
      )}
      {...props}
    >
      {/* Logo */}
      {logo && (
        <div className="mb-8 [@media(max-width:640px)]:mb-6">
          <Link href="/" aria-label="Home">
            <Logo className="h-[6.25rem] w-auto text-[var(--color-default-font)] [@media(max-width:640px)]:h-20" />
          </Link>
        </div>
      )}

      {/* Language */}
      <div className="mb-8 w-full [@media(max-width:640px)]:mb-6">
        <p className="mb-4 text-lg/6 text-[var(--color-neutral-500)] [@media(max-width:640px)]:mb-3 [@media(max-width:640px)]:text-base">
          {languageText}
        </p>
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="font-pixelify w-fit min-w-[12.5rem] rounded-none border-transparent bg-[color-mix(in_srgb,var(--color-brand-600)_20%,transparent)] p-2 text-[var(--color-default-font)] hover:bg-[color-mix(in_srgb,var(--color-brand-600)_30%,transparent)] [@media(max-width:640px)]:w-full [@media(max-width:640px)]:min-w-0 [@media(max-width:920px)]:min-w-40">
            <SelectValue>
              {selectedLang && (
                <div className="font-pixelify flex items-center gap-2">
                  <span>{selectedLang.flag}</span>
                  <span>{selectedLang.label}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border-transparent bg-[color-mix(in_srgb,var(--color-brand-600)_20%,transparent)] text-[var(--color-default-font)] backdrop-blur-[4px]">
            <SelectGroup>
              {LANGUAGES.map(lang => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="p-2 hover:bg-[color-mix(in_srgb,var(--color-brand-600)_30%,transparent)] hover:text-[var(--color-default-font)] focus:bg-[color-mix(in_srgb,var(--color-brand-600)_30%,transparent)] focus:text-[var(--color-default-font)]"
                >
                  <div className="font-pixelify flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Sozials */}
      {children && (
        <div>
          {socialsText && (
            <p className="mb-4 text-lg/6 text-[var(--color-neutral-500)] [@media(max-width:640px)]:mb-3 [@media(max-width:640px)]:text-base">
              {socialsText}
            </p>
          )}
          <div className="flex gap-4 [@media(max-width:640px)]:gap-3">{children}</div>
        </div>
      )}
    </div>
  );
}

function FooterSocialLink({
  className,
  altText,
  icon: Icon,
  ...props
}: React.ComponentProps<'a'> & Pick<Sozials, 'altText' | 'icon'>) {
  return (
    <a
      data-slot="footer-social-link"
      aria-label={altText}
      className={cn('transition-opacity hover:opacity-70', className)}
      {...props}
    >
      <Icon className="size-6 text-[var(--color-default-font)] [@media(max-width:640px)]:size-5" />
    </a>
  );
}

export { FooterSocialLink, FooterSocials };
