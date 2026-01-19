'use client';

import { Button } from '@/components/ui/button';
import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SystemLayout } from '@/layouts/SystemLayout';
import { ExclaimationSolid } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { useEffect } from 'react';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

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

  // Default to English for global error page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SystemLayout>
      <div className='animate-fade-in flex flex-col items-center gap-4 text-center'>
        <div className='animate-float'>
          <ExclaimationSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {systemFiles.globalError.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>
          {systemFiles.globalError.description}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <Button onClick={() => reset()}>
            {systemFiles.globalError.buttons.retry}
          </Button>

          <Link href='/'>
            <Button>{systemFiles.globalError.buttons.home}</Button>
          </Link>
        </div>
      </div>
    </SystemLayout>
  );
}
