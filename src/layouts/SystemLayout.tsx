'use client';

import Footer, { FooterProps } from '@/components/Footer';
import Navbar, { NavbarProps } from '@/components/Navbar';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

const SystemLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const params = useParams<{ lang?: string }>();
  const rawLang = params?.lang;
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang || 'en';

  const navbar: NavbarProps = {
    logo: true,
    logoUrl: `/${lang}`,
    links: [
      { label: 'Quests', href: `/${lang}/quests` },
      { label: 'Informations', href: `/${lang}/info/chapter_1` },
      {
        label: 'Documentation',
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
          label: 'Tests',
          href: 'https://github.com/copiedcopypasta/dmwt_WoOS/deployments',
        },
        { label: 'Analytics', href: `/${lang}/analyze` },
        {
          label: 'Source Code',
          href: 'https://github.com/copiedcopypasta/dmwt',
        },
      ],
      legal: [
        { label: 'Impressum', href: `/${lang}/legal` },
        { label: 'Datenschutz', href: `/${lang}/legal` },
        { label: 'Cookie-Einstellungen', href: `/${lang}/legal` },
        { label: 'Lizenzen', href: `/${lang}/license` },
        { label: 'Nutzerbindungen', href: `/${lang}/legal` },
      ],
      about: [
        { label: 'Über uns', href: 'https://github.com/copiedcopypasta/dmwt' },
        { label: 'Hochschule', href: 'https://www.reutlingen-university.de/' },
        { label: 'Barrierefreiheit', href: `/${lang}/legal` },
      ],
      social: [
        { label: 'Feedback', href: `/${lang}/feedback` },
        { label: 'Kontakt', href: `/${lang}/legal` },
        { label: 'FAQ', href: `/${lang}/faq` },
      ],
    },
    sozials: [
      { href: 'https://github.com', altText: 'GitHub' },
      { href: 'https://youtube.com', altText: 'YouTube' },
      { href: 'https://discord.com', altText: 'Discord' },
    ],
    logo: true,
    banner: true,
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
