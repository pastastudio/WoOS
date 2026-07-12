import { ReactNode } from 'react';

interface InformationBlockProps {
  icon?: ReactNode;
  title: ReactNode;
  content: ReactNode;
}

function InformationBlock({ icon, title, content }: InformationBlockProps) {
  return (
    <div
      className="min-h-[240px] w-full rounded-none border p-5"
      style={{
        boxShadow: 'var(--shadow-card-inset)',
        background: 'var(--gradient-card-dark)',
      }}
    >
      <div className="align-start full grid h-full grid-cols-1 content-start gap-4">
        {/* Header - Icon */}
        {icon && (
          <div className="flex h-[40px] flex-shrink-0 items-center justify-start">
            <div className="text-primary">{icon}</div>
          </div>
        )}

        {/* Mid - Title */}
        <div className="">
          <h3 className="mb-2 text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

export { InformationBlock };
export type { InformationBlockProps };
