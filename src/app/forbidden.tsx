'use client';

import { Button } from '@/components/ui/button';
import { SystemLayout } from '@/layouts/SystemLayout';
import { ExclamationTriangleSolid } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FORBIDDEN_CONFIG = {
  title: 'Zugriff verweigert',
  description: 'Du hast keine Berechtigung, um auf diese Seite zuzugreifen.',
  buttons: {
    back: 'Zurück',
    home: 'Home',
  },
} as const;

export default function Forbidden() {
  const router = useRouter();

  return (
    <SystemLayout>
      <div className='animate-fade-in flex flex-col items-center gap-4 text-center'>
        <div className='animate-float'>
          <ExclamationTriangleSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {FORBIDDEN_CONFIG.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>
          {FORBIDDEN_CONFIG.description}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <Button onClick={() => router.back()}>
            {FORBIDDEN_CONFIG.buttons.back}
          </Button>

          <Link href='/'>
            <Button>{FORBIDDEN_CONFIG.buttons.home}</Button>
          </Link>
        </div>
      </div>
    </SystemLayout>
  );
}
