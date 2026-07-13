import type { getDictionary } from '@/lib/i18n';
import type { FooterProps } from '@/layouts/Footer';
import type { NavbarProps } from '@/layouts/Navbar';
import { BookHeartSolid, HomeSolid, SparklesSolid } from '@2hoch1/pixel-icon-library-react';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

// Must stay in sync with the --color-chrome-background token in globals.css.
export const SITE_CHROME_BACKGROUND = '#161a24';
// Literal Tailwind class (not built via template interpolation) so the
// arbitrary-value utility is statically discoverable by Tailwind's scanner.
export const SITE_CHROME_BACKGROUND_CLASS = 'bg-[#161a24]';

/** Shared navbar/footer configuration for the site's route-group layouts. */
export function getSiteNavFooterProps(
  dict: Dictionary,
  options?: { withBackground?: boolean }
): { navbar: NavbarProps; footer: FooterProps } {
  const navbar: NavbarProps = {
    logo: false,
    logoUrl: `/`,
    links: [
      { label: dict.nav.home, href: `/`, icon: HomeSolid },
      { label: dict.nav.quests, href: `/quests`, icon: SparklesSolid },
      { label: dict.nav.docs, href: `/docs/chapter_1`, icon: BookHeartSolid },
    ],
    searchBar: false,
    loginButton: true,
    fixed: false,
    ...(options?.withBackground ? { backgroundColor: SITE_CHROME_BACKGROUND } : {}),
  };

  const footer: FooterProps = {
    links: {
      resources: [
        {
          label: dict.footer.resources.tests,
          href: 'https://github.com/copiedcopypasta/dmwt_WoOS/deployments',
        },
        {
          label: dict.footer.resources.analytics,
          href: `/quests/analyze`,
        },
        {
          label: dict.footer.resources.source,
          href: 'https://github.com/copiedcopypasta/dmwt',
        },
      ],
      legal: [
        { label: dict.footer.legal.imprint, href: `/legal` },
        { label: dict.footer.legal.privacy, href: `/legal` },
        { label: dict.footer.legal.licenses, href: `/legal` },
        { label: dict.footer.legal.bindings, href: `/legal` },
      ],
      about: [
        {
          label: dict.footer.about.us,
          href: `https://github.com/copiedcopypasta/dmwt`,
        },
        {
          label: dict.footer.about.university,
          href: 'https://www.reutlingen-university.de/',
        },
        {
          label: dict.footer.about.accessibility,
          href: `/legal`,
        },
      ],
      social: [
        { label: dict.footer.social.feedback, href: `/feedback` },
        { label: dict.footer.social.contact, href: `/legal` },
      ],
    },
    sozials: [
      { href: 'https://github.com', altText: 'GitHub' },
      { href: 'https://youtube.com', altText: 'YouTube' },
      { href: 'https://discord.com', altText: 'Discord' },
    ],
    logo: true,
    banner: true,
    categories: [
      { key: 'resources', title: dict.footer.resources.title },
      { key: 'social', title: dict.footer.social.title },
      { key: 'about', title: dict.footer.about.title },
      { key: 'legal', title: dict.footer.legal.title },
    ],
    socialsText: { key: 'socialText', title: dict.other.socialText },
    languageText: { key: 'languageText', title: dict.other.languageText },
  };

  return { navbar, footer };
}
