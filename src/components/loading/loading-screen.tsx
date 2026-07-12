'use client';

import { ImageSpinner } from '@/components/loading/image-spinner';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  className?: string;
  message?: string;
}

export function LoadingScreen({ className, message = 'Wird geladen…' }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'bg-background flex h-screen w-full flex-col items-center justify-center gap-4',
        className
      )}
    >
      <ImageSpinner />
      <p className="text-muted-foreground animate-pulse text-sm">{message}</p>
    </div>
  );
}
