'use client';

import { LoadingScreen } from '@/components/loading/loading-screen';
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
    return <LoadingScreen className="min-h-screen p-8" />;
  }

  return <>{children}</>;
}
