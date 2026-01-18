'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AngleLeft, AngleRight } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface MarkdownContentProps {
  title?: string;
  description?: string;
  badges?: string[];
  children: ReactNode;
  className?: string;
  prevUrl?: string;
  nextUrl?: string;
  showHeader?: boolean;
  showInfo?: boolean;
  showFooter?: boolean;
  onBack?: () => void;
  onForward?: () => void;
}

export function MarkdownContent({
  title = 'Information',
  description,
  badges = [],
  children,
  className = '',
  prevUrl,
  nextUrl,
  showHeader = true,
  showInfo = true,
  showFooter = true,
  onBack,
  onForward,
}: MarkdownContentProps) {
  return (
    <div className={`flex w-full min-w-0 flex-col gap-5 p-5 ${className}`}>
      {showHeader && (
        <div className='flex items-center justify-between'>
          <Breadcrumb>
            <BreadcrumbList className='text-base'>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href='/de/info/chapter_1'>Information</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className='font-medium'
                  style={{ color: '#00a63e' }}
                >
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='flex gap-2'>
            {prevUrl && (
              <Link href={prevUrl}>
                <Button variant='outline' size='sm'>
                  <AngleLeft />
                </Button>
              </Link>
            )}
            {!prevUrl && (
              <Button onClick={onBack} variant='outline' size='sm'>
                <AngleLeft />
              </Button>
            )}
            {nextUrl && (
              <Link href={nextUrl}>
                <Button variant='outline' size='sm'>
                  <AngleRight />
                </Button>
              </Link>
            )}
            {!nextUrl && (
              <Button onClick={onForward} variant='outline' size='sm'>
                <AngleRight />
              </Button>
            )}
          </div>
        </div>
      )}

      {showInfo && (
        <>
          <div className='py-10'>
            <h1
              className='mb-3 text-4xl font-bold'
              style={{ color: '#00a63e' }}
            >
              {title}
            </h1>
            {badges.length > 0 && (
              <div className='mb-3 flex gap-2'>
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className='inline-block rounded-full bg-blue-900 px-3 py-1 text-sm text-blue-100'
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
            {description && (
              <p className='text-muted-foreground text-sm'>{description}</p>
            )}
          </div>

          <Separator />
        </>
      )}

      {/* Content: Markdown + Rating */}
      <div className='flex flex-col gap-5 py-10'>
        <article className='markdown'>{children}</article>
        <div className='border p-5 text-center'>
          <p className='text-gray-400'>Rating Component (Placeholder)</p>
        </div>
      </div>

      {showFooter && (
        <>
          <Separator />

          <div className='flex gap-5 pt-10'>
            {prevUrl ? (
              <Link
                href={prevUrl}
                className='border-input bg-background hover:bg-accent hover:text-accent-foreground flex h-12 flex-1 items-center justify-center rounded-md border text-base'
              >
                ← Back
              </Link>
            ) : (
              <button
                onClick={onBack}
                className='border-input bg-background hover:bg-accent hover:text-accent-foreground flex h-12 flex-1 items-center justify-center rounded-md border text-base'
                disabled={!onBack}
              >
                ← Back
              </button>
            )}
            {nextUrl ? (
              <Link
                href={nextUrl}
                className='border-input bg-background hover:bg-accent hover:text-accent-foreground flex h-12 flex-1 items-center justify-center rounded-md border text-base'
              >
                Forward →
              </Link>
            ) : (
              <button
                onClick={onForward}
                className='border-input bg-background hover:bg-accent hover:text-accent-foreground flex h-12 flex-1 items-center justify-center rounded-md border text-base'
                disabled={!onForward}
              >
                Forward →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
