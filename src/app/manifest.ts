import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wizard of OS',
    short_name: 'WoOS',
    description: 'Learn more about Operating Systems with Wizard of OS.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
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
    ],
  };
}
