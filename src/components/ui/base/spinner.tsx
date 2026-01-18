'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export function Spinner() {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const spinnerSrc =
    currentTheme === 'dark' ? '/spinner-dark.webp' : '/spinner-light.webp';

  return (
    <Image
      src={spinnerSrc}
      alt='Spinner loading animation'
      width={240}
      height={240}
      preload={true}
    />
  );
}
