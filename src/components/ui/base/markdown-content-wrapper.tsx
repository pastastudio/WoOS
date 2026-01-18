'use client';

import { MarkdownContent } from '@/components/ui/base/markdown-content';
import { ReactNode } from 'react';

interface MarkdownContentWrapperProps {
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
}

export function MarkdownContentWrapper({
  title,
  description,
  badges,
  children,
  className,
  prevUrl,
  nextUrl,
  showHeader,
  showInfo,
  showFooter,
}: MarkdownContentWrapperProps) {
  return (
    <MarkdownContent
      title={title}
      description={description}
      badges={badges}
      prevUrl={prevUrl}
      nextUrl={nextUrl}
      showHeader={showHeader}
      showInfo={showInfo}
      showFooter={showFooter}
      className={className}
    >
      {children}
    </MarkdownContent>
  );
}
