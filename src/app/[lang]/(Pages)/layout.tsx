import Footer, { FooterProps } from '@/components/Footer';
import Navbar, { NavbarProps } from '@/components/Navbar';
import { getDictionary } from '@/lib/i18n';
import React from 'react';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const navbar: NavbarProps = {
    logo: true,
    logoUrl: `/${lang}`,
    links: [
      { label: dict.nav.quests, href: `/${lang}/quests` },
      { label: dict.nav.info, href: `/${lang}/info/chapter_1` },
      {
        label: dict.nav.docs,
        href: `https://github.com/copiedcopypasta/dmwt_WoOS/blob/main/README.md`,
      },
    ],
    searchBar: false,
    darkModeToggle: true,
    loginButton: true,
    fixed: false,
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
          href: `/${lang}/analyze`,
        },
        {
          label: dict.footer.resources.source,
          href: 'https://github.com/copiedcopypasta/dmwt',
        },
      ],
      legal: [
        { label: dict.footer.legal.imprint, href: `/${lang}/legal` },
        { label: dict.footer.legal.privacy, href: `/${lang}/legal` },
        { label: dict.footer.legal.licenses, href: `/${lang}/license` },
        { label: dict.footer.legal.bindings, href: `/${lang}/legal` },
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
          href: `/${lang}/legal`,
        },
      ],
      social: [
        { label: dict.footer.social.feedback, href: `/${lang}/feedback` },
        { label: dict.footer.social.contact, href: `/${lang}/legal` },
        { label: dict.footer.social.faq, href: `/${lang}/faq` },
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

  return (
    <div>
      <Navbar {...navbar} />
      <main>{children}</main>
      <Footer {...footer} />
    </div>
  );
}
