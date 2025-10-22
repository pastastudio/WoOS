import React, { ReactElement } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
}

/**
 * Avatar
 *
 * Round avatar element that displays either an image or a fallback text.
 *
 * Props:
 * @param {string | undefined} src - Optional image URL for the avatar.
 * @param {string | undefined} alt - Alt text for the image.
 * @param {number | undefined} size - Size (width/height) of the avatar in pixels (default: 40).
 * @param {string | undefined} fallback - Fallback text shown when no image is provided.
 *
 * Return: ReactElement
 */
export default function Avatar({
  src,
  alt = '',
  size = 40,
  fallback = '?',
}: AvatarProps): ReactElement {
  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full bg-gray-300"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="font-semibold text-gray-700">{fallback}</span>
      )}
    </div>
  );
}
