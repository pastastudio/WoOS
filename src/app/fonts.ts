import { Geist, Jersey_10, Pixelify_Sans } from 'next/font/google';

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
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
