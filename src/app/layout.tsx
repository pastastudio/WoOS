import { CustomCursor } from '@/components/ui/base/cursor';
import { getLocale } from '@/lib/locale';
import { getSiteUrl } from '@/lib/server-utils';
import { LocaleProvider } from '@/providers/locale-provider';
import { PreloadProvider } from '@/providers/preload-provider';
import { QuizProvider } from '@/providers/quiz-provider';
import { SmoothScrollProvider } from '@/providers/scroll-provider';
import { ThemeProvider } from '@/providers/theme-provider';
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLocale();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geist.variable} ${pixelifySans.variable} ${jersey10.variable}`}>
        <CustomCursor variation="flowerstaff-4" enableGlow enableSparkles />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider>
            <PreloadProvider>
              <QuizProvider>
                <LocaleProvider locale={lang}>{children}</LocaleProvider>
              </QuizProvider>
            </PreloadProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
