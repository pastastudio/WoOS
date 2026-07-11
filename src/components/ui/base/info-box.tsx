import { cn } from '@/lib/utils';
import type { PropsWithChildren, ReactElement } from 'react';

const variants = {
  info: {
    border: 'border-blue-300/60',
    bg: 'bg-blue-200/10',
    title: 'text-blue-200',
    text: 'text-blue-100/80',
  },
  note: {
    border: 'border-slate-400/50',
    bg: 'bg-slate-200/10',
    title: 'text-slate-100',
    text: 'text-slate-100/80',
  },
  tip: {
    border: 'border-emerald-300/60',
    bg: 'bg-emerald-200/10',
    title: 'text-emerald-200',
    text: 'text-emerald-100/80',
  },
  important: {
    border: 'border-indigo-300/60',
    bg: 'bg-indigo-200/10',
    title: 'text-indigo-200',
    text: 'text-indigo-100/80',
  },
  warning: {
    border: 'border-amber-300/60',
    bg: 'bg-amber-200/10',
    title: 'text-amber-200',
    text: 'text-amber-100/80',
  },
  caution: {
    border: 'border-orange-300/60',
    bg: 'bg-orange-200/10',
    title: 'text-orange-200',
    text: 'text-orange-100/80',
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
    <div className={cn('rounded-md border p-4 text-sm', theme.bg, theme.border, className)}>
      <p className={cn('text-base font-semibold', theme.title)}>{title}</p>
      <div className={cn('mt-1 text-xs leading-relaxed', theme.text, bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

export default InfoBox;
