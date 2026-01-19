import { PreloadProvider } from '@/components/PreloadProvider';
import { SmoothScrollProvider } from '@/components/scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { CustomCursor } from '@/components/ui/base/cursor';
import { getSiteUrl } from '@/lib/server-utils';
import '@/styles/globals.css';
import { Metadata } from 'next';
import React from 'react';
import { geist, jersey10, pixelifySans } from './fonts';

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
        url: '/favicon/og-default.jpg',
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
    images: ['/twitter-default.jpg'],
    creator: '@deinTwitterHandle',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const { lang: paramLang } = await params;
  const lang = paramLang || 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${pixelifySans.variable} ${jersey10.variable}`}
      >
        <CustomCursor variation='flowerstaff-4' enableGlow enableSparkles />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SmoothScrollProvider>
            <PreloadProvider>{children}</PreloadProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
