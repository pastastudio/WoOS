'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ExclamationTriangleSolid,
  ArrowLeftSolid,
  HomeSolid,
} from '@2hoch1/pixel-icon-library-react';
import ErrorLayout from '@/layouts/ErrorLayout';
import { FlipButton } from '@/components/ui/shadcn-io/flip-button';

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
    <ErrorLayout>
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
          <FlipButton
            onClick={() => router.back()}
            frontText={FORBIDDEN_CONFIG.buttons.back}
            backText={<ArrowLeftSolid className='inline' size={16} />}
            from='left'
            frontClassName='bg-neutral-100'
            backClassName='bg-error-500 text-white'
          />

          <Link href='/'>
            <FlipButton
              frontText={FORBIDDEN_CONFIG.buttons.home}
              backText={<HomeSolid className='inline' size={16} />}
              frontClassName='bg-neutral-100'
              backClassName='bg-error-500 text-white'
            />
          </Link>
        </div>
      </div>
    </ErrorLayout>
  );
}
