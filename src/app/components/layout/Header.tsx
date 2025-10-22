'use client';

import React, { ReactElement } from 'react';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

/**
 * Header
 *
 * Page header with a centered title and optional nav content (children).
 *
 * Props:
 * @param {string | undefined} title - Optional title displayed centered in the header.
 * @param {React.ReactNode | undefined} children - Optional navigation elements placed on the right side of the header.
 *
 * Return: ReactElement
 */
export default function Header({ title, children }: HeaderProps): ReactElement {
  return (
    <header className="relative bg-gray-800 p-4 text-white">
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-xl font-bold">
        {title}
      </h1>
      <nav className="absolute top-1/2 right-4 -translate-y-1/2 transform">
        {children}
      </nav>
    </header>
  );
}
