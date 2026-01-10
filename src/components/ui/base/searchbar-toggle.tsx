'use client';

import * as React from 'react';
import Search from '@/assets/icons/magnifying-glass.svg';
import { SearchBarDialog } from '@/components/ui/base/searchbar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipPositioner,
} from '@/components/ui/tooltip';

export function SearchBarToggle(): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip delay={500}>
        <TooltipTrigger
          onClick={() => setOpen(!open)}
          className='focus-visible:ring-ring hover:bg-accent relative inline-flex items-center justify-center rounded-md p-3 transition-colors focus-visible:ring-1 focus-visible:outline-none dark:hover:bg-white/10'
          aria-label='Open search'
        >
          <Search className='h-4 w-4' />
          <span className='sr-only'>Open search</span>
        </TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent className='bg-white text-black [&_[data-slot=tooltip-arrow]]:bg-white [&_[data-slot=tooltip-arrow]]:fill-white'>
            <p>Search</p>
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>

      <SearchBarDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
