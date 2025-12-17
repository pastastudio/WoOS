import React from 'react';
import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/server-utils';
import '@/styles/globals.css';
import Footer, { FooterProps } from '@/components/Footer';
import Navbar, { NavbarProps } from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: {
    default: 'Wizard of OS',
    template: '%s | Wizard of OS',
  },

  description: 'Wizard of OS – Tools, Utilities & Magic für dein System.',

  icons: {
    icon: '/favicon/favicon.png',
    apple: '/favicon/apple-icon.png',
    shortcut: '/favicon/favicon.ico',
  },

  openGraph: {
    type: 'website',
    siteName: 'Wizard of OS',
    title: 'Wizard of OS',
    description: 'Wizard of OS – Tools, Utilities & Magic für dein System.',
    images: [
      {
        url: '/favicon/og-default.jpg', // Optional: kannst du später ersetzen
        width: 1200,
        height: 630,
        alt: 'Wizard of OS – Open Graph Bild',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Wizard of OS',
    description: 'Wizard of OS – Tools, Utilities & Magic für dein System.',
    images: ['/twitter-default.jpg'], // optional
    creator: '@deinTwitterHandle', // optional
  },

  robots: {
    index: true,
    follow: true,
  },
};

const navbar: NavbarProps = {
  logo: true,
  logoUrl: '/',
  links: [
    { label: 'Quests', href: '/quests' },
    { label: 'Informations', href: '/informations' },
    { label: 'Analytics', href: '/analytics' },
  ],
  searchBar: true,
  darkModeToggle: true,
  loginButton: true,
  borderLine: true,
  fixed: false,
};

const footer: FooterProps = {
  links: {
    resources: [
      { label: 'Quests', href: '/quests' },
      { label: 'Tests', href: '/tests' },
      { label: 'FAQ', href: '/faq' },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='de' style={{ height: '100vh' }} suppressHydrationWarning>
      <body
        className='min-h-screen'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <ThemeProvider attribute='class' defaultTheme='system'>
          <Navbar {...navbar} />
          {children}
          <Footer {...footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
