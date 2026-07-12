'use client';

import Image from 'next/image';

export function ImageSpinner() {
  return (
    <Image
      src="/images/spinner-dark.webp"
      alt="Spinner loading animation"
      width={240}
      height={240}
      priority
      unoptimized
    />
  );
}
