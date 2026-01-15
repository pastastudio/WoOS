import { SpinnerSolid } from '@2hoch1/pixel-icon-library-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <SpinnerSolid
      role='status'
      aria-label='Loading'
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
