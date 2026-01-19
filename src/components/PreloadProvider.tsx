'use client';

import { Spinner } from '@/components/ui/base/spinner';
import { useAssetPreloader } from '@/hooks/useAssetPreloader';
import { ReactNode } from 'react';

/**
 * Preload Provider Component
 * Wraps content and ensures all critical assets are preloaded before rendering
 * Only renders children after preloading is complete
 */
export function PreloadProvider({ children }: { children: ReactNode }) {
  const { isPreloaded } = useAssetPreloader();

  if (!isPreloaded) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 bg-white p-8 dark:bg-black'>
        <Spinner />
        <p className='animate-pulse text-sm text-neutral-500'>Wird geladen…</p>
      </div>
    );
  }

  return <>{children}</>;
}
