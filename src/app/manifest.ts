import type { MetadataRoute } from 'next';
import theme from '@/generated/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wizard of OS',
    short_name: 'WoOS',
    description: 'Learn more about Operating Systems with Wizard of OS.',
    start_url: '/',
    display: 'standalone',
    background_color: theme.backgroundColor,
    theme_color: theme.themeColor,
    icons: [
      {
        src: '/favicon/favicon.ico',
        type: 'image/x-icon',
      },
      {
        src: '/favicon/icon1.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
