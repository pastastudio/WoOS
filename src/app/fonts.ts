import { Geist, Geist_Mono, Jersey_10, Pixelify_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixelify',
  display: 'swap',
});

export const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jersey',
  display: 'swap',
});

export const fontVariables = cn(
  geist.variable,
  geistMono.variable,
  pixelifySans.variable,
  jersey10.variable
);
