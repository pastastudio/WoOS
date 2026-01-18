import { MarkdownSidebar } from '@/components/ui/base/markdown-sidebar';
import { ReactNode } from 'react';

interface MarkdownLayoutProps {
  leftSidebar?: ReactNode;
  content?: ReactNode;
  rightSidebar?: ReactNode;
  className?: string;
}

function MarkdownLayout({
  leftSidebar,
  content,
  rightSidebar,
  className = '',
}: MarkdownLayoutProps) {
  const hasLeft = Boolean(leftSidebar);
  const hasRight = Boolean(rightSidebar);
  const hasSidebars = hasLeft || hasRight;

  const gridTemplateColumns = hasSidebars
    ? hasLeft && hasRight
      ? '1fr minmax(0, 3fr) 1fr'
      : hasLeft
        ? '1fr minmax(0, 3fr)'
        : 'minmax(0, 3fr) 1fr'
    : '1fr';

  return (
    <div
      className={`grid gap-20 px-60 py-20 ${className}`}
      style={{
        gridTemplateColumns,
        justifyItems: hasSidebars ? undefined : 'center',
      }}
    >
      {hasLeft && (
        <MarkdownSidebar className='sticky top-20 h-fit'>
          {leftSidebar}
        </MarkdownSidebar>
      )}
      {hasSidebars ? (
        content
      ) : (
        <div className='w-full max-w-4xl'>{content}</div>
      )}
      {hasRight && (
        <MarkdownSidebar className='sticky top-20 h-fit'>
          {rightSidebar}
        </MarkdownSidebar>
      )}
    </div>
  );
}

export { MarkdownLayout };
