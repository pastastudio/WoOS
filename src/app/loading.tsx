'use client';

import { Spinner } from '@/components/ui/shadcn-io/spinner';
import LoadingLayout from '@/layouts/LoadingLayout';

const LOADING_CONFIG = {
  message: 'Wird geladen…',
} as const;

export default function Loading() {
  return (
    <LoadingLayout>
      <div className='animate-scale-in flex flex-col items-center gap-4'>
        <Spinner
          variant='infinite'
          size={56}
          className='text-brand-600'
          aria-label='Ladevorgang läuft'
        />

        <p className='animate-pulse text-sm text-neutral-500'>
          {LOADING_CONFIG.message}
        </p>
      </div>
    </LoadingLayout>
  );
}
