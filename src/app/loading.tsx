'use client';

import { Spinner } from '@/components/ui/base/spinner';
import { SystemLayout } from '@/layouts/SystemLayout';

const LOADING_CONFIG = {
  message: 'Wird geladen…',
} as const;

export default function Loading() {
  return (
    <SystemLayout>
      <div className='animate-scale-in flex flex-col items-center gap-4'>
        <Spinner />

        <p className='animate-pulse text-sm text-neutral-500'>
          {LOADING_CONFIG.message}
        </p>
      </div>
    </SystemLayout>
  );
}
