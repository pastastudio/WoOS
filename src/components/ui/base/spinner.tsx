'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Spinner() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

   
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === 'system'
      ? systemTheme
      : theme
    : 'light';
  const spinnerSrc =
    currentTheme === 'dark' ? '/spinner-dark.webp' : '/spinner-light.webp';

  return (
    <Image
      src={spinnerSrc}
      alt='Spinner loading animation'
      width={240}
      height={240}
      priority
    />
  );
}
