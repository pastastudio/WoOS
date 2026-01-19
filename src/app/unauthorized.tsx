'use client';

import { Button } from '@/components/ui/button';
import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SystemLayout } from '@/layouts/SystemLayout';
import { LockSolid } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

export default function Unauthorized() {
  const router = useRouter();
  // Default to English for unauthorized page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SystemLayout>
      <div className='animate-fade-in flex flex-col items-center gap-4 text-center'>
        <div className='animate-float'>
          <LockSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {systemFiles.unauthorized.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>
          {systemFiles.unauthorized.description}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <Button onClick={() => router.back()}>
            {systemFiles.unauthorized.buttons.back}
          </Button>

          <Link href='/'>
            <Button>{systemFiles.unauthorized.buttons.home}</Button>
          </Link>
        </div>
      </div>
    </SystemLayout>
  );
}
