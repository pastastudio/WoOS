'use client';

import Search from '@/assets/icons/magnifying-glass.svg';
import { SearchBarDialog } from '@/components/searchbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as React from 'react';

export function SearchBarToggle(): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TooltipProvider delay={500}>
        <Tooltip>
          <TooltipTrigger
            onClick={() => setOpen(!open)}
            className="focus-visible:ring-ring hover:bg-foreground/10 relative inline-flex items-center justify-center rounded-none p-3 transition-colors focus-visible:ring-1 focus-visible:outline-none"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Open search</span>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground text-background [&_[data-slot=tooltip-arrow]]:bg-foreground [&_[data-slot=tooltip-arrow]]:fill-foreground">
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SearchBarDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
