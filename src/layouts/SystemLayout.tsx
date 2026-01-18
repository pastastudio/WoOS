import Footer, { FooterProps } from '@/components/Footer';
import Navbar, { NavbarProps } from '@/components/Navbar';
import { ReactNode } from 'react';

const navbar: NavbarProps = {
  logo: true,
  logoUrl: '/',
  links: [
    { label: 'Quests', href: '/quests' },
    { label: 'Informations', href: '/informations' },
    { label: 'Documentation', href: '/documentation' },
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
      { label: 'Tests', href: '/tests' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Source Code', href: 'https://github.com/copiedcopypasta/dmwt' },
    ],
    legal: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'Cookie-Einstellungen', href: '/cookie-settings' },
      { label: 'Lizenzen', href: '/lizenzen' },
      { label: 'Nutzerbindungen', href: '/nutzerbindungen' },
    ],
    about: [
      { label: 'Über uns', href: '/about' },
      { label: 'Hochschule', href: 'https://www.reutlingen-university.de/' },
      { label: 'Barrierefreiheit', href: '/barrierefreiheit' },
    ],
    social: [
      { label: 'Feedback', href: '/feedback' },
      { label: 'Kontakt', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
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

const SystemLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
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
