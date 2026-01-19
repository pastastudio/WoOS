import { ReactNode } from 'react';

interface InformationBlockProps {
  icon?: ReactNode;
  title: ReactNode;
  content: ReactNode;
}

function InformationBlock({ icon, title, content }: InformationBlockProps) {
  return (
    <div
      className='min-h-[240px] w-full rounded-md border p-5'
      style={{
        boxShadow:
          '0px 1px 0px 1px #00000005, 0px 4px 6px #00000005, inset 0px 0px 12px 6px #111',
        background: 'linear-gradient(#242424 0%,#121212 65.62%)',
      }}
    >
      <div className='align-start full grid h-full grid-cols-1 content-start gap-4'>
        {/* Header - Icon */}
        {icon && (
          <div className='flex h-[40px] flex-shrink-0 items-center justify-start'>
            <div className='text-primary'>{icon}</div>
          </div>
        )}

        {/* Mid - Title */}
        <div className=''>
          <h3 className='mb-2 text-xl font-semibold tracking-tight md:text-2xl'>
            {title}
          </h3>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export { InformationBlock };
export type { InformationBlockProps };
