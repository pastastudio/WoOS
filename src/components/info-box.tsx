import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { PropsWithChildren, ReactElement } from 'react';

const variants = {
  info: {
    border: 'border-border',
    bg: 'bg-muted/40',
    title: 'text-foreground',
    text: 'text-muted-foreground',
  },
  note: {
    border: 'border-border/70',
    bg: 'bg-muted/20',
    title: 'text-foreground/90',
    text: 'text-muted-foreground',
  },
  tip: {
    border: 'border-success-600/50',
    bg: 'bg-success-900/10',
    title: 'text-success-700',
    text: 'text-success-600',
  },
  important: {
    border: 'border-error-600/50',
    bg: 'bg-error-900/10',
    title: 'text-error-700',
    text: 'text-error-600',
  },
  warning: {
    border: 'border-warning-600/50',
    bg: 'bg-warning-900/10',
    title: 'text-warning-700',
    text: 'text-warning-600',
  },
  caution: {
    border: 'border-warning-600/60',
    bg: 'bg-warning-900/15',
    title: 'text-warning-700',
    text: 'text-warning-600',
  },
} as const;

type Variant = keyof typeof variants;

interface InfoBoxProps extends PropsWithChildren {
  title: string;
  variant?: Variant;
  className?: string;
  bodyClassName?: string;
}

export function InfoBox({
  title,
  variant = 'info',
  className,
  bodyClassName,
  children,
}: InfoBoxProps): ReactElement {
  const theme = variants[variant];

  return (
    <Alert
      className={cn('rounded-none p-4 text-sm after:hidden', theme.bg, theme.border, className)}
    >
      <AlertTitle className={cn('text-base', theme.title)}>{title}</AlertTitle>
      <AlertDescription className={cn('text-xs leading-relaxed', theme.text, bodyClassName)}>
        {children}
      </AlertDescription>
    </Alert>
  );
}

export default InfoBox;
