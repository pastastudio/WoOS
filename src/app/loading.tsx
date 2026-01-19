'use client';

import { SystemLayout } from '@/layouts/SystemLayout';
import Image from 'next/image';

const LOADING_CONFIG = {
  message: 'Wird geladen…',
} as const;

export default function Loading() {
  return (
    <SystemLayout lang='en'>
      <div className='animate-scale-in flex flex-col items-center gap-4'>
        {/* Spinner images via next/image, kept unoptimized per request */}
        <Image
          src='/spinner-light.webp'
          alt='Loading spinner'
          width={64}
          height={64}
          unoptimized
          priority
          className='animate-spin dark:hidden'
          style={{ filter: 'invert(0)' }}
        />
        <Image
          src='/spinner-dark.webp'
          alt='Loading spinner'
          width={64}
          height={64}
          unoptimized
          priority
          className='hidden animate-spin dark:block'
          style={{ filter: 'invert(1)' }}
        />

        <p className='animate-pulse text-sm text-neutral-500'>
          {LOADING_CONFIG.message}
        </p>
      </div>
    </SystemLayout>
  );
}
