'use client';

import { LoadingScreen } from '@/components/loading/loading-screen';
import { useAssetPreloader } from '@/hooks/useAssetPreloader';
import { ReactNode } from 'react';

/**
 * Props for withPagePreload HOC
 */
interface WithPagePreloadProps {
  children: ReactNode;
  fallback?: ReactNode;
  waitForPreload?: boolean;
}

/**
 * Higher-order component that wraps content with asset preloading
 * Only renders children after all critical assets are loaded
 *
 * @param Component - Component to wrap
 * @param waitForPreload - Whether to wait for preload completion (default: true)
 * @returns Wrapped component with preloading functionality
 */
export function withPagePreload<P extends WithPagePreloadProps>(
  Component: React.ComponentType<P>,
  waitForPreload: boolean = true
) {
  return function PreloadWrapper(props: P) {
    const { isPreloaded } = useAssetPreloader();

    // If preloading is disabled or not required, render immediately
    if (!waitForPreload) {
      return <Component {...props} />;
    }

    // While preloading, show fallback UI
    if (!isPreloaded) {
      return props.fallback || <LoadingScreen />;
    }

    // Once preloaded, render the actual component
    return <Component {...props} />;
  };
}

/**
 * PagePreload wrapper component
 * Direct component wrapper for conditional content rendering during asset preload
 *
 * Usage:
 * ```tsx
 * <PagePreload fallback={<LoadingSpinner />}>
 *   <YourContent />
 * </PagePreload>
 * ```
 */
export function PagePreload({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { isPreloaded } = useAssetPreloader();

  if (!isPreloaded) {
    return fallback || <LoadingScreen />;
  }

  return <>{children}</>;
}
