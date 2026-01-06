'use client';

import { ReactElement, useState } from 'react';
import Link from 'next/link';
import type { Links, Sozials } from '@/types/index';

import Logo from '@/assets/logo.svg';
import Banner from '@/assets/banner.svg';
import Discord from '@/assets/icons/discord.svg';
import Youtube from '@/assets/icons/youtube.svg';
import Github from '@/assets/icons/github.svg';
import Wave from '@/assets/wave.svg';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import styles from './index.module.css';

export interface LinkCategorys {
  resources: Links[] | null | undefined;
  legal: Links[] | null | undefined;
  about: Links[] | null | undefined;
  social: Links[] | null | undefined;
}

export interface FooterProps {
  links: LinkCategorys | null | undefined;
  sozials: Sozials[] | boolean | null | undefined;
  logo: boolean | null | undefined;
  banner: boolean | null | undefined;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Checks if a value exists and is not empty
 */
const hasValue = (value: unknown): boolean => {
  if (
    value === null ||
    value === undefined ||
    value === false ||
    value === ''
  ) {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  return true;
};

/**
 * Maps category links or returns null
 */
const mapLinks = (category: Links[] | null | undefined): Links[] | null => {
  if (!hasValue(category)) return null;
  return category as Links[];
};

/**
 * Gets logo display state
 */
const getLogo = (logo: FooterProps['logo']): boolean => {
  return hasValue(logo);
};

/**
 * Gets banner display state
 */
const getBanner = (banner: FooterProps['banner']): boolean => {
  return hasValue(banner);
};

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

// ============================================================================
// Component Sections
// ============================================================================

/**
 * Language data constant
 */
const LANGUAGES = [
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
] as const;

/**
 * Renders the footer info section (language, socials, logo)
 */
const InfoSection = ({
  showLogo,
  hasSozials,
  sozials,
}: {
  showLogo: boolean;
  hasSozials: boolean;
  sozials: Sozials[];
}): ReactElement => {
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const selectedLang = LANGUAGES.find(
    (lang) => lang.value === selectedLanguage,
  );

  return (
    <div className={styles.infoSection}>
      {/* Logo */}
      {showLogo && (
        <div className={styles.logoWrapper}>
          <Link href='/' aria-label='Home'>
            <Logo className={styles.logo} />
          </Link>
        </div>
      )}

      {/* Language */}
      <div className={styles.languageWrapper}>
        <p className={styles.sectionTitle}>Sprache</p>
        <Select
          value={selectedLanguage}
          onValueChange={(value) => value && setSelectedLanguage(value)}
        >
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
      {hasSozials && (
        <div>
          <p className={styles.sectionTitle}>Soziales</p>
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
};

/**
 * Link categories configuration
 */
const LINK_CATEGORIES = [
  { key: 'resources', title: 'Ressourcen' },
  { key: 'social', title: 'Soziales' },
  { key: 'about', title: 'Informationen' },
  { key: 'legal', title: 'Richtlinien' },
] as const;

/**
 * Renders the footer links section
 */
const LinksSection = ({
  mappedLinks,
}: {
  mappedLinks: {
    resources: Links[] | null;
    legal: Links[] | null;
    about: Links[] | null;
    social: Links[] | null;
  };
}): ReactElement => {
  return (
    <div className={styles.linksContainer}>
      {LINK_CATEGORIES.map(({ key, title }) => {
        const links = mappedLinks[key];
        if (!links) return null;

        return (
          <div key={key} className={styles.linkCategory}>
            <h3 className={styles.categoryTitle}>{title}</h3>
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
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
};

/**
 * Renders the footer banner
 */
const BannerSection = ({
  showBanner,
}: {
  showBanner: boolean;
}): ReactElement | null => {
  if (!showBanner) return null;

  return (
    <div className={styles.bannerWrapper}>
      <Banner aria-label='Footer Banner' className={styles.banner} />
    </div>
  );
};

/**
 * Page footer with a list of links and social media links.
 *
 * @param {FooterProps} props - The properties for the Footer component.
 * @param {LinkCategorys | null | undefined} props.links - The categories of links to display in the footer.
 * @param {Sozials[] | boolean | null | undefined} props.sozials - The social media links to display.
 * @param {boolean | null | undefined} props.showLogo - Whether to display the logo.
 * @param {boolean | null | undefined} props.logoBanner - Whether to display the logo banner.
 * @returns {ReactElement} The Footer component.
 */
export default function Footer({
  links,
  sozials,
  logo,
  banner,
}: FooterProps): ReactElement {
  // const hasLinks = hasLinkCategory(links); - not used currently
  const hasSozials = hasValue(sozials) && Array.isArray(sozials);
  const showLogo = getLogo(logo);
  const showBanner = getBanner(banner);

  const mappedLinks = {
    resources: links?.resources ? mapLinks(links.resources) : null,
    legal: links?.legal ? mapLinks(links.legal) : null,
    about: links?.about ? mapLinks(links.about) : null,
    social: links?.social ? mapLinks(links.social) : null,
  };

  return (
    <footer>
      <div className={styles.waveWrapper}>
        <Wave className={styles.wave} />
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.contentGrid}>
          {/* Row 1 - Left Column: Language + Sozials + Logo */}
          <InfoSection
            showLogo={showLogo}
            hasSozials={hasSozials}
            sozials={(sozials as Sozials[]) || []}
          />

          {/* Row 1 - Right Column: Links (spans 2 columns) */}
          <div className={styles.linksWrapper}>
            <LinksSection mappedLinks={mappedLinks} />
          </div>

          {/* Row 2 - Full Width Banner */}
          <BannerSection showBanner={showBanner} />
        </div>
      </div>
    </footer>
  );
}
