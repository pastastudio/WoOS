import React, { ReactElement } from 'react';

interface BadgeProps {
  text: string | undefined;
  color?: keyof typeof badgeColors;
}

const badgeColors = {
  red: 'border-red-400 bg-red-600/40 text-red-400',
  green: 'border-green-400 bg-green-600/40 text-green-400',
  yellow: 'border-yellow-400 bg-yellow-600/40 text-yellow-400',
  blue: 'border-blue-400 bg-blue-600/40 text-blue-400',
  gray: 'border-gray-400 bg-gray-600/40 text-gray-400',
};

/**
 * Badge
 *
 * A small badge/status indicator with an optional color.
 *
 * Props:
 * @param {string | undefined} text - Text to display inside the badge.
 * @param {'red'|'green'|'yellow'|'blue'|'gray'} [color='gray'] - Color choice for the badge (uses predefined utility classes).
 *
 * Return: ReactElement
 */
export default function Badge({
  text,
  color = 'gray',
}: BadgeProps): ReactElement {
  const colorClasses = badgeColors[color];

  return (
    <>
      <span
        className={`py-0.1 inline-flex items-center rounded-md border-2 px-2 text-xs font-medium transition-colors ${colorClasses}`}
      >
        {text}
      </span>
    </>
  );
}
