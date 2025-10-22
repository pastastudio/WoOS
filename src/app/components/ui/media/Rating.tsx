// Todo: Add defaultIcon

import React, { ReactElement } from 'react';

interface RatingProps {
  value: number;
  max: number;
  icon?: React.ReactNode;
}

/**
 * Rating
 *
 * A simple rating component that displays a number of icons based on `value` and `max`.
 *
 * Props:
 * @param {number} value - Current rating value (number of filled icons).
 * @param {number} max - Maximum number of icons.
 * @param {React.ReactNode | undefined} icon - Optional icon element; a simple SVG placeholder is used otherwise.
 *
 * Return: ReactElement
 */
export default function Rating({
  value,
  max,
  icon,
}: RatingProps): ReactElement {
  const defaultIcon = <svg />;

  const RatingIcon = icon || defaultIcon;

  return (
    <div className="flex items-center">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`${i < value ? '' : 'text-gray-300'} flex-shrink-0`}
        >
          {RatingIcon}
        </span>
      ))}
    </div>
  );
}
