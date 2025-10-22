'use client';

import React, { ReactElement } from 'react';

interface TooltipProps {
  text: string | undefined;
  children: React.ReactNode;
}

/**
 * Tooltip
 *
 * A simple tooltip wrapper component that shows text on hover.
 *
 * Props:
 * @param {string | undefined} text - The tooltip text shown on hover.
 * @param {React.ReactNode} children - The element that triggers the hover effect.
 *
 * Return: ReactElement
 */
export default function Tooltip({
  text,
  children,
}: TooltipProps): ReactElement {
  const [isVisible, setVisible] = React.useState(false);
  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
        {isVisible && (
          <div className="absolute bottom-full mb-2 w-max max-w-xs rounded-md bg-gray-800 p-2 text-sm text-white shadow-lg">
            {text}
          </div>
        )}
      </div>
    </>
  );
}
