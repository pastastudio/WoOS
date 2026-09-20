import type { getDictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { LayoutLinkItem } from '@/layouts/shared/link-item';
import type { Links, Sozials } from '@/types/index';
import Link from 'next/link';
import * as React from 'react';
import { type ReactElement } from 'react';

import Banner from '@/assets/banner.svg';
import Discord from '@/assets/icons/discord.svg';
import Github from '@/assets/icons/github.svg';
import Youtube from '@/assets/icons/youtube.svg';
import Wave from '@/assets/wave.svg';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export interface FooterData {
  logo: boolean;
  banner: boolean;
  languageText: string;
  socialsText: string;
  socials: Sozials[];
  linkGroups: { key: string; title: string; links: Links[] }[];
}

/** Builds the site footer's default content from the locale dictionary. */
export function getFooterData(dict: Dictionary): FooterData {
  return {
    logo: true,
    banner: true,
    languageText: dict.other.languageText,
    socialsText: dict.other.socialText,
    socials: [
      { href: 'https://github.com', altText: 'GitHub', icon: Github },
      { href: 'https://youtube.com', altText: 'YouTube', icon: Youtube },
      { href: 'https://discord.com', altText: 'Discord', icon: Discord },
    ],
    linkGroups: [
      {
        key: 'resources',
        title: dict.footer.resources.title,
        links: [
          {
            label: dict.footer.resources.tests,
            href: 'https://github.com/copiedcopypasta/dmwt_WoOS/deployments',
          },
          { label: dict.footer.resources.analytics, href: `/quests/analyze` },
          {
            label: dict.footer.resources.source,
            href: 'https://github.com/copiedcopypasta/dmwt',
          },
        ],
      },
      {
        key: 'social',
        title: dict.footer.social.title,
        links: [
          { label: dict.footer.social.feedback, href: `/feedback` },
          { label: dict.footer.social.contact, href: `/legal` },
        ],
      },
      {
        key: 'about',
        title: dict.footer.about.title,
        links: [
          { label: dict.footer.about.us, href: `https://github.com/copiedcopypasta/dmwt` },
          {
            label: dict.footer.about.university,
            href: 'https://www.reutlingen-university.de/',
          },
          { label: dict.footer.about.accessibility, href: `/legal` },
        ],
      },
      {
        key: 'legal',
        title: dict.footer.legal.title,
        links: [
          { label: dict.footer.legal.imprint, href: `/legal` },
          { label: dict.footer.legal.privacy, href: `/legal` },
          { label: dict.footer.legal.licenses, href: `/legal` },
          { label: dict.footer.legal.bindings, href: `/legal` },
        ],
      },
    ],
  };
}

interface FooterProps extends React.ComponentProps<'footer'> {
  socials?: React.ReactNode;
  banner?: boolean;
  showWave?: boolean;
  color?: string;
  waveBackgroundColor?: string;
}

function Footer({
  className,
  socials,
  banner = true,
  showWave = true,
  color = 'var(--color-footer-brand)',
  waveBackgroundColor = 'var(--background)',
  children,
  ...props
}: FooterProps) {
  return (
    <footer data-slot="footer" className={cn(className)} {...props}>
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
          {socials}

          {/* Links Section */}
          <div className="col-span-2 [@media(max-width:640px)]:col-span-1">
            <div className="flex justify-end gap-32 [@media(max-width:1440px)]:flex-wrap [@media(max-width:1440px)]:gap-6 [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-8">
              {children}
            </div>
          </div>

          <FooterBanner banner={banner} />
        </div>
      </div>
    </footer>
  );
}

function FooterSection({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<'div'> & { title: string }) {
  return (
    <div
      data-slot="footer-section"
      className={cn('[@media(max-width:1440px)]:w-[calc(50%_-_0.75rem)]', className)}
      {...props}
    >
      <h3 className="font-pixelify mb-4 text-lg/6 text-[var(--color-neutral-400)] [@media(max-width:640px)]:mb-3 [@media(max-width:640px)]:text-base">
        {title}
      </h3>
      <ul className="font-pixelify flex flex-col gap-2 [@media(max-width:640px)]:gap-1">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <LayoutLinkItem
      slot="footer-link"
      className={cn(
        'text-lg/6 text-[var(--color-neutral-700)] no-underline transition-[text-decoration] hover:underline [@media(max-width:640px)]:text-base',
        className
      )}
      {...props}
    >
      {children}
    </LayoutLinkItem>
  );
}

/**
 * Renders the footer banner section
 */
function FooterBanner({ banner }: { banner?: boolean }): ReactElement | null {
  if (!banner) return null;

  return (
    <div className="col-span-3 [@media(max-width:640px)]:col-span-1 [@media(max-width:920px)]:col-span-2">
      <Banner aria-label="Footer Banner" className="block h-auto w-full" />
    </div>
  );
}

export { Footer, FooterLink, FooterSection };
