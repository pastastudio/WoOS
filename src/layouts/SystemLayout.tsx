'use client';

import Footer, { FooterProps } from '@/components/Footer';
import Navbar, { NavbarProps } from '@/components/Navbar';
import deComponents from '@/i18n/de/components.json';
import enComponents from '@/i18n/en/components.json';
import { SupportedLanguage } from '@/lib/language';
import { ReactNode } from 'react';

interface SystemLayoutProps {
  children: ReactNode;
  lang?: SupportedLanguage;
}

const componentsDict = {
  de: deComponents,
  en: enComponents,
};

const SystemLayout = ({
  children,
  lang = 'en',
}: Readonly<SystemLayoutProps>) => {
  const components = componentsDict[lang];

  const navbar: NavbarProps = {
    logo: true,
    logoUrl: `/${lang}`,
    links: [
      { label: components.navbar.quests, href: `/${lang}/quests` },
      {
        label: components.navbar.information,
        href: `/${lang}/information/chapter_1`,
      },
      {
        label: components.navbar.documentation,
        href: 'https://github.com/copiedcopypasta/dmwt_WoOS/blob/main/README.md',
      },
    ],
    searchBar: false,
    darkModeToggle: true,
    loginButton: true,
    fixed: false,
    backgroundColor: 'false',
  };

  const footer: FooterProps = {
    links: {
      resources: [
        {
          label: components.footer.tests,
          href: 'https://github.com/copiedcopypasta/dmwt_WoOS/deployments',
        },
        { label: components.footer.analytics, href: `/${lang}/analyze` },
        {
          label: components.footer.sourceCode,
          href: 'https://github.com/copiedcopypasta/dmwt',
        },
      ],
      legal: [
        { label: components.footer.impressum, href: `/${lang}/legal` },
        { label: components.footer.datenschutz, href: `/${lang}/legal` },
        { label: components.footer.cookieSettings, href: `/${lang}/legal` },
        { label: components.footer.licenses, href: `/${lang}/license` },
        { label: components.footer.userBindings, href: `/${lang}/legal` },
      ],
      about: [
        {
          label: components.footer.aboutUs,
          href: 'https://github.com/copiedcopypasta/dmwt',
        },
        {
          label: components.footer.university,
          href: 'https://www.reutlingen-university.de/',
        },
        { label: components.footer.accessibility, href: `/${lang}/legal` },
      ],
      social: [
        { label: components.footer.feedback, href: `/${lang}/feedback` },
        { label: components.footer.contact, href: `/${lang}/legal` },
        { label: components.footer.faq, href: `/${lang}/faq` },
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
      { key: 'resources', title: components.footer.resources },
      { key: 'social', title: components.footer.social },
      { key: 'about', title: components.footer.about },
      { key: 'legal', title: components.footer.legal },
    ],
    socialsText: { key: 'socialText', title: components.footer.socialMedia },
    languageText: { key: 'languageText', title: components.footer.language },
  };

  return (
    <>
      <Navbar {...navbar} />
      <main>
        <div className='flex min-h-screen w-full flex-1 items-center justify-center bg-white dark:bg-black'>
          {children}
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
};

export { SystemLayout };
