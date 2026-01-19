'use client';

import type { TableOfContents } from '@/lib/markdown';
import Link from 'next/link';

interface MarkdownTocProps {
  toc?: TableOfContents;
  className?: string;
}

export function MarkdownToc({ toc, className = '' }: MarkdownTocProps) {
  if (!toc?.length) {
    return <p className={`${className} text-base`}>No headings yet.</p>;
  }

  return (
    <nav aria-label='On this page' className={className}>
      <h2 className='text-foreground mb-3 text-base font-bold'>On This Page</h2>
      <ul className='text-muted-foreground space-y-2 text-sm'>
        {toc.map((item) => {
          // Add left padding based on heading depth (h2+ gets indentation)
          const paddingClass =
            item.depth === 1
              ? 'pl-0'
              : item.depth === 2
                ? 'pl-4'
                : item.depth === 3
                  ? 'pl-8'
                  : 'pl-12';
          return (
            <li key={item.url} className={paddingClass}>
              <Link
                href={item.url}
                className='hover:text-foreground cursor-pointer transition-colors'
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
