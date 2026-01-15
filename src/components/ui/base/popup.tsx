'use client';

import { Button } from '@/components/ui/button';
import React, { ReactElement } from 'react';

interface BannerProps {
  position: 'top' | 'bottom';
  color?: string | undefined;
  message: string | undefined;
}

/**
 * Banner
 *
 * Displays a short banner message at the top or bottom of the page.
 * Includes an optional background color and a close button.
 *
 * Props:
 * @param {'top'|'bottom'} position - Banner position (top or bottom).
 * @param {string | undefined} color - Optional CSS color for the background.
 * @param {string | undefined} message - The message to display. If not provided, the component renders nothing.
 *
 * Return: ReactElement
 */
export default function Banner({
  position,
  message,
  color,
}: BannerProps): ReactElement {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleClose = () => setIsVisible(false);
  // Banner should be responsive; width handled via CSS (Tailwind classes)

  if (!isVisible || !message) {
    return <></>;
  }

  // position wrapper: fixed at top or bottom, full-width container with centered content
  const wrapperPositionClass = position === 'bottom' ? 'bottom-4' : 'top-4';

  return (
    <>
      <div
        style={
          {
            ['--banner-color' as string]: color ?? 'transparent',
          } as React.CSSProperties
        }
        className={`fixed inset-x-0 ${wrapperPositionClass} pointer-events-none z-50 flex justify-center`}
      >
        <div
          className={`pointer-events-auto mx-auto flex w-4/6 max-w-4xl flex-col items-center gap-2 rounded border bg-[var(--banner-color)]/100 p-3`}
        >
          <div className='text-center'>{message}</div>
          <Button onClick={handleClose} />
        </div>
      </div>
    </>
  );
}
