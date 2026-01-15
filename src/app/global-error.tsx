'use client';

import { Button } from '@/components/ui/button';
import { SystemLayout } from '@/layouts/SystemLayout';
import { ExclaimationSolid } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { useEffect } from 'react';

const ERROR_CONFIG = {
  title: 'Etwas ist schiefgelaufen',
  description:
    'Keine Sorge das kann mal passieren. Du kannst es erneut versuchen oder zur Startseite zurückkehren.',
  buttons: {
    retry: 'Erneut versuchen',
    home: 'Startseite',
  },
} as const;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SystemLayout>
      <div className='animate-fade-in flex flex-col items-center gap-4 text-center'>
        <div className='animate-float'>
          <ExclaimationSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {ERROR_CONFIG.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>{ERROR_CONFIG.description}</p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <Button onClick={() => reset()}>{ERROR_CONFIG.buttons.retry}</Button>

          <Link href='/'>
            <Button>{ERROR_CONFIG.buttons.home}</Button>
          </Link>
        </div>
      </div>
    </SystemLayout>
  );
}
