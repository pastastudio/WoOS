'use client';

import Footer, { FooterProps } from '@/layouts/Footer';
import Navbar, { NavbarProps } from '@/layouts/Navbar';
import deComponents from '@/i18n/de/components.json';
import enComponents from '@/i18n/en/components.json';
import { SupportedLanguage } from '@/lib/language';
import { BookHeartSolid, HomeSolid, SparklesSolid } from '@2hoch1/pixel-icon-library-react';
import { ReactNode } from 'react';

interface SystemLayoutProps {
  children: ReactNode;
  lang?: SupportedLanguage;
}

const componentsDict = {
  de: deComponents,
  en: enComponents,
};

const SystemLayout = ({ children, lang = 'en' }: Readonly<SystemLayoutProps>) => {
  const components = componentsDict[lang];

  const navbar: NavbarProps = {
    logo: false,
    logoUrl: `/`,
    links: [
      { label: components.navbar.home, href: `/`, icon: HomeSolid },
      { label: components.navbar.quests, href: `/quests`, icon: SparklesSolid },
      { label: components.navbar.documentation, href: `/docs/chapter_1`, icon: BookHeartSolid },
    ],
    searchBar: false,
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
        { label: components.footer.analytics, href: `/analyze` },
        {
          label: components.footer.sourceCode,
          href: 'https://github.com/copiedcopypasta/dmwt',
        },
      ],
      legal: [
        { label: components.footer.impressum, href: `/legal` },
        { label: components.footer.datenschutz, href: `/legal` },
        { label: components.footer.cookieSettings, href: `/legal` },
        { label: components.footer.licenses, href: `/legal` },
        { label: components.footer.userBindings, href: `/legal` },
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
        { label: components.footer.accessibility, href: `/legal` },
      ],
      social: [
        { label: components.footer.feedback, href: `/feedback` },
        { label: components.footer.contact, href: `/legal` },
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
        <div className="bg-background flex min-h-screen w-full flex-1 items-center justify-center">
          {children}
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
};

export { SystemLayout };
