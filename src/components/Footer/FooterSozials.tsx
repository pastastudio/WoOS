'use client';

import { setLanguageCookie } from '@/lib/i18n';
import { extractLanguageFromPathname, SupportedLanguage } from '@/lib/language';
import type { Sozials } from '@/types/index';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import Discord from '@/assets/icons/discord.svg';
import Github from '@/assets/icons/github.svg';
import Youtube from '@/assets/icons/youtube.svg';
import Logo from '@/assets/logo.svg';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import styles from './index.module.css';

interface FooterSozialsProps {
  logo?: boolean;
  sozials?: Sozials[];
  socialText?: { key: string; title: string };
  languageText?: { key: string; title: string };
}

/**
 * Gets the appropriate icon based on the href
 */
const getIcon = (href: string): ReactElement | null => {
  if (href.includes('discord')) {
    return <Discord className={styles.socialIcon} />;
  }
  if (href.includes('youtube')) {
    return <Youtube className={styles.socialIcon} />;
  }
  if (href.includes('github')) {
    return <Github className={styles.socialIcon} />;
  }
  return null;
};

/**
 * Language data constant
 */
const LANGUAGES = [
  { value: 'de' as const, label: 'Deutsch', flag: '🇩🇪' },
  { value: 'en' as const, label: 'English', flag: '🇬🇧' },
] as const;

/**
 * Renders the footer sozials section (logo, language, social links)
 */
export default function FooterSozials({
  logo,
  sozials,
  socialText,
  languageText,
}: FooterSozialsProps): ReactElement {
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = extractLanguageFromPathname(pathname);
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(initialLang);

  const selectedLang = LANGUAGES.find(
    (lang) => lang.value === selectedLanguage,
  );

  const handleLanguageChange = async (value: string | null) => {
    if (value == null || !['en', 'de'].includes(value)) return;
    setSelectedLanguage(value as SupportedLanguage);

    // Set the cookie server-side
    await setLanguageCookie(value);

    const parts = window.location.pathname.split('/');
    parts[1] = value;
    router.push(parts.join('/'));
  };

  return (
    <div className={styles.infoSection}>
      {/* Logo */}
      {logo && (
        <div className={styles.logoWrapper}>
          <Link href='/' aria-label='Home'>
            <Logo className={styles.logo} />
          </Link>
        </div>
      )}

      {/* Language */}
      <div className={styles.languageWrapper}>
        <p className={styles.sectionTitle}>{languageText?.title}</p>
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue>
              {selectedLang && (
                <div className={styles.languageOption}>
                  <span>{selectedLang.flag}</span>
                  <span>{selectedLang.label}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className={styles.selectContent}>
            <SelectGroup>
              {LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className={styles.selectItem}
                >
                  <div className={styles.languageOption}>
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
      {sozials && sozials.length > 0 && (
        <div>
          <p className={styles.sectionTitle}>{socialText?.title}</p>
          <div className={styles.socialLinks}>
            {sozials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.altText}
                className={styles.socialLink}
              >
                {social.href && getIcon(social.href)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
