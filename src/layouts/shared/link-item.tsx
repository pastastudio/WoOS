import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';

function LayoutLinkItem({
  slot,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { slot: string }) {
  return (
    <li className="list-none">
      <Link data-slot={slot} className={cn('flex items-center', className)} {...props}>
        {children}
      </Link>
    </li>
  );
}

export { LayoutLinkItem };
