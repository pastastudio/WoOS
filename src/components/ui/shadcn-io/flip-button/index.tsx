'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type FlipDirection = 'top' | 'bottom' | 'left' | 'right';

type FlipButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  frontText: string;
  backText: string | React.ReactElement;
  frontClassName?: string;
  backClassName?: string;
  from?: FlipDirection;
};

const DEFAULT_SPAN_CLASS_NAME =
  'absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-300';

function FlipButton({
  frontText,
  backText,
  className,
  frontClassName,
  backClassName,
  from = 'top',
  ...props
}: FlipButtonProps) {
  const isVertical = from === 'top' || from === 'bottom';
  const flipDirection =
    from === 'top' || from === 'left' ? 'normal' : 'reverse';

  const flipClass = isVertical
    ? `flip-button-vertical-${flipDirection}`
    : `flip-button-horizontal-${flipDirection}`;

  return (
    <button
      data-slot='flip-button'
      className={cn(
        'flip-button group relative inline-block h-10 cursor-pointer px-4 py-2 text-sm font-medium [perspective:1000px] focus:outline-none active:scale-95',
        flipClass,
        className,
      )}
      {...props}
    >
      <span
        data-slot='flip-button-front'
        className={cn(
          DEFAULT_SPAN_CLASS_NAME,
          'flip-button-front bg-neutral-100 text-black dark:text-white',
          frontClassName,
        )}
      >
        {frontText}
      </span>
      <span
        data-slot='flip-button-back'
        className={cn(
          DEFAULT_SPAN_CLASS_NAME,
          'flip-button-back bg-brand-600 text-white',
          backClassName,
        )}
      >
        {backText}
      </span>
      <span className='invisible'>{frontText}</span>
    </button>
  );
}

export { FlipButton, type FlipButtonProps, type FlipDirection };
