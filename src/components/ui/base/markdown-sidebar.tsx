import { ReactNode } from 'react';

interface MarkdownSidebarProps {
  children: ReactNode;
  className?: string;
}

export function MarkdownSidebar({
  children,
  className = '',
}: MarkdownSidebarProps) {
  return (
    <div className={className}>
      <aside>{children}</aside>
    </div>
  );
}
