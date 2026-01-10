'use client';

import CursorSelectSkeleton from '@/components/ui/base/cursor-selector';

export default function Page() {
  return (
    <div className='from-background via-background to-muted/40 min-h-[60vh] bg-gradient-to-b'>
      <div className='mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 sm:py-16'>
        <div className='space-y-2'>
          <p className='text-muted-foreground text-xs tracking-[0.3em] uppercase'>
            Cursor Lab
          </p>
          <h1 className='text-3xl font-semibold sm:text-4xl'>
            Custom Cursor Playground
          </h1>
          <p className='text-muted-foreground'>
            Eine kleine Skeleton-Ansicht, die den Dialog demonstriert. Hier
            könnte später eine echte Auswahl und Vorschau der Cursor-Styles
            stehen.
          </p>
        </div>

        <CursorSelectSkeleton />
      </div>
    </div>
  );
}
