'use client';

import { setLanguageCookie } from '@/lib/i18n';
import { SupportedLanguage } from '@/lib/language';
import { useLocale } from '@/providers/locale-provider';
import type { Links, Sozials } from '@/types/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import Banner from '@/assets/banner.svg';
import Discord from '@/assets/icons/discord.svg';
import Github from '@/assets/icons/github.svg';
import Youtube from '@/assets/icons/youtube.svg';
import Logo from '@/assets/logo.svg';
import Wave from '@/assets/wave.svg';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface LinkCategorys {
  resources?: Links[];
  legal?: Links[];
  about?: Links[];
  social?: Links[];
}

export interface FooterProps {
  links?: LinkCategorys;
  sozials?: Sozials[];
  socialsText?: { key: string; title: string };
  languageText?: { key: string; title: string };
  categories?: { key: string; title: string }[];
  logo?: boolean;
  banner?: boolean;
  showWave?: boolean;
  color?: string;
  waveBackgroundColor?: string;
}

interface FooterBannerProps {
  banner?: boolean;
}

interface FooterLinksProps {
  links?: LinkCategorys;
  categories?: { key: string; title: string }[];
}

interface FooterSozialsProps {
  logo?: boolean;
  sozials?: Sozials[];
  socialText?: { key: string; title: string };
  languageText?: { key: string; title: string };
}

/**
 * Language data constant
 */
const LANGUAGES = [
  { value: 'de' as const, label: 'Deutsch', flag: '🇩🇪' },
  { value: 'en' as const, label: 'English', flag: '🇬🇧' },
] as const;

/**
 * Gets the appropriate icon based on the href
 */
const getIcon = (href: string): ReactElement | null => {
  if (href.includes('discord')) {
    return (
      <Discord className="size-6 text-[var(--color-default-font)] [@media(max-width:640px)]:size-5" />
    );
  }
  if (href.includes('youtube')) {
    return (
      <Youtube className="size-6 text-[var(--color-default-font)] [@media(max-width:640px)]:size-5" />
    );
  }
  if (href.includes('github')) {
    return (
      <Github className="size-6 text-[var(--color-default-font)] [@media(max-width:640px)]:size-5" />
    );
  }
  return null;
};

/**
 * Renders the footer banner section
 */
function FooterBanner({ banner }: FooterBannerProps): ReactElement | null {
  if (!banner) return null;

  return (
    <div className="col-span-3 [@media(max-width:640px)]:col-span-1 [@media(max-width:920px)]:col-span-2">
      <Banner aria-label="Footer Banner" className="block h-auto w-full" />
    </div>
  );
}

/**
 * Renders the footer links section
 */
function FooterLinks({ links, categories }: FooterLinksProps): ReactElement {
  const containerClasses =
    'flex justify-end gap-32 [@media(max-width:1440px)]:flex-wrap [@media(max-width:1440px)]:gap-6 [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-8';

  if (!links) return <div className={containerClasses} />;
  if (!categories) return <div className={containerClasses} />;

  const linkCategories = categories;
  return (
    <div className={containerClasses}>
      {linkCategories.map(({ key, title }) => {
        const categoryLinks = links[key as keyof LinkCategorys];
        if (!categoryLinks || categoryLinks.length === 0) return null;

        return (
          <div key={key} className="[@media(max-width:1440px)]:w-[calc(50%_-_0.75rem)]">
            <h3 className="font-pixelify mb-4 text-lg/6 text-[var(--color-neutral-400)] [@media(max-width:640px)]:mb-3 [@media(max-width:640px)]:text-base">
              {title}
            </h3>
            <ul className="font-pixelify flex flex-col gap-2 [@media(max-width:640px)]:gap-1">
              {categoryLinks.map(link => (
                <li key={`${key}-${link.label}`} className="list-none">
                  <Link
                    href={link.href}
                    className="text-lg/6 text-[var(--color-neutral-700)] no-underline transition-[text-decoration] hover:underline [@media(max-width:640px)]:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Renders the footer sozials section (logo, language, social links)
 */
function FooterSozials({
  logo,
  sozials,
  socialText,
  languageText,
}: FooterSozialsProps): ReactElement {
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
    <div className="font-pixelify flex flex-col items-start [@media(max-width:640px)]:w-full">
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
          {languageText?.title}
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
      {sozials && sozials.length > 0 && (
        <div>
          <p className="mb-4 text-lg/6 text-[var(--color-neutral-500)] [@media(max-width:640px)]:mb-3 [@media(max-width:640px)]:text-base">
            {socialText?.title}
          </p>
          <div className="flex gap-4 [@media(max-width:640px)]:gap-3">
            {sozials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.altText}
                className="transition-opacity hover:opacity-70"
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

/**
 * Page footer with a list of links and social media links.
 *
 * @param {FooterProps} props - The properties for the Footer component.
 * @param {LinkCategorys} props.links - The categories of links to display in the footer.
 * @param {Sozials[]} props.sozials - The social media links to display.
 * @param {boolean} props.logo - Whether to display the logo.
 * @param {boolean} props.banner - Whether to display the banner (defaults to true).
 * @param {boolean} props.showWave - Whether to display the wave decoration (defaults to true).
 * @param {string} props.color - The background color for the footer and wave color (defaults to the footer brand token).
 * @param {string} props.waveBackgroundColor - The background color for the wave section (defaults to the app background token).
 * @returns {ReactElement} The Footer component.
 */
export default function Footer({
  links,
  sozials,
  socialsText,
  languageText,
  categories,
  logo = false,
  banner = true,
  showWave = true,
  color = 'var(--color-footer-brand)',
  waveBackgroundColor = 'var(--background)',
}: FooterProps): ReactElement {
  return (
    <footer>
      {/* Wave Decoration */}
      {showWave && (
        <div
          className="relative z-0 m-0 block overflow-hidden p-0 text-[var(--color-brand-200)]"
          style={{ backgroundColor: waveBackgroundColor }}
        >
          <Wave className="-mb-[3px] block h-auto w-full" style={{ color: color }} />
        </div>
      )}

      {/* Main Footer Content */}
      <div
        className="relative z-10 flex gap-8 bg-[var(--color-brand-200)] px-36 py-8 [@media(max-width:640px)]:gap-4 [@media(max-width:640px)]:px-4 [@media(max-width:640px)]:py-6 [@media(max-width:920px)]:px-8"
        style={{ backgroundColor: color }}
      >
        <div className="grid w-full grid-cols-3 gap-8 [@media(max-width:640px)]:grid-cols-1 [@media(max-width:640px)]:gap-6 [@media(max-width:920px)]:grid-cols-2 [@media(max-width:920px)]:gap-6">
          {/* Sozials Section */}
          <FooterSozials
            logo={logo}
            sozials={sozials}
            socialText={socialsText}
            languageText={languageText}
          />

          {/* Links Section */}
          <div className="col-span-2 [@media(max-width:640px)]:col-span-1">
            <FooterLinks links={links} categories={categories} />
          </div>

          {/* Banner Section */}
          <FooterBanner banner={banner} />
        </div>
      </div>
    </footer>
  );
}
