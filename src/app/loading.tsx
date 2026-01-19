'use client';

import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SystemLayout } from '@/layouts/SystemLayout';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

export default function Loading() {
  // Default to English for loading page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SystemLayout lang='en'>
      <div className='animate-scale-in flex flex-col items-center gap-4'>
        <p className='animate-pulse text-sm text-neutral-500'>
          {systemFiles.loading.message}
        </p>
      </div>
    </SystemLayout>
  );
}
