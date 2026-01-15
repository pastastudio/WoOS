'use client';
import Laptop from '@/assets/icons/laptop.svg';
import Moon from '@/assets/icons/moon.svg';
import Sun from '@/assets/icons/sun.svg';
import { useTheme } from 'next-themes';
import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Aktuelle Einstellung (light | dark | system). Vor Mount defaulten wir zu 'system'.
  const currentSetting = (theme ?? 'system') as 'light' | 'dark' | 'system';

  // Nächste Einstellung im Zyklus: light -> dark -> system -> light
  const getNext = (t: 'light' | 'dark' | 'system') =>
    t === 'light' ? 'dark' : t === 'dark' ? 'system' : 'light';

  const onToggle = () => setTheme(getNext(currentSetting));

  return (
    <Tooltip delay={500}>
      <TooltipTrigger
        onClick={onToggle}
        className='focus-visible:ring-ring hover:bg-accent relative inline-flex items-center justify-center rounded-md p-2 p-3 transition-colors focus-visible:ring-1 focus-visible:outline-none dark:hover:bg-white/10'
        aria-label='Theme umschalten'
      >
        {mounted ? (
          currentSetting === 'system' ? (
            <Laptop className='h-4 w-4' />
          ) : currentSetting === 'dark' ? (
            <Moon className='h-4 w-4' />
          ) : (
            <Sun className='h-4 w-4' />
          )
        ) : (
          <Sun className='h-4 w-4' />
        )}
        <span className='sr-only'>Theme umschalten</span>
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent className='bg-white text-black [&_[data-slot=tooltip-arrow]]:bg-white [&_[data-slot=tooltip-arrow]]:fill-white'>
          <p>Toggle Theme</p>
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}
