'use client';

import { Button } from '@/components/ui/button';
import { SystemLayout } from '@/layouts/SystemLayout';
import { LockSolid } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UNAUTHORIZED_CONFIG = {
  title: 'Zugriff verweigert',
  description:
    'Du benötigst Authentifizierung, um auf diese Seite zuzugreifen. Bitte melde dich an.',
  buttons: {
    back: 'Zurück',
    home: 'Home',
  },
} as const;

export default function Unauthorized() {
  const router = useRouter();

  return (
    <SystemLayout>
      <div className='animate-fade-in flex flex-col items-center gap-4 text-center'>
        <div className='animate-float'>
          <LockSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {UNAUTHORIZED_CONFIG.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>
          {UNAUTHORIZED_CONFIG.description}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <Button onClick={() => router.back()}>
            {UNAUTHORIZED_CONFIG.buttons.back}
          </Button>

          <Link href='/'>
            <Button>{UNAUTHORIZED_CONFIG.buttons.home}</Button>
          </Link>
        </div>
      </div>
    </SystemLayout>
  );
}
