import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface FeedbackCardProps extends React.ComponentProps<'div'> {
  author: {
    name: string;
    avatarUrl?: string;
    avatarFallback?: string;
  };
  wand?: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  badges?: Array<{
    label: React.ReactNode;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  }>;
}

function FeedbackCard({
  author,
  wand,
  description,
  footer,
  badges,
  className,
  children,
  ...props
}: FeedbackCardProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card
        data-slot='feedback-card'
        className={cn(
          'border-border m-4 max-h-[264px] max-w-[419px] cursor-pointer overflow-hidden rounded-xl border p-4 shadow-md transition-shadow hover:shadow-lg',
          className,
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        {/* Header Section with Author and Badges */}
        <div className='border-border flex items-start justify-between gap-5 border-b pb-3'>
          <div className='flex items-center gap-2'>
            <Badge
              className='shrink-0 rounded-full ps-[3px] text-xs'
              variant='outline'
            >
              {author.avatarUrl && (
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className='h-4 w-4 rounded-full'
                  height={16}
                  width={16}
                />
              )}
              <span>{author.name}</span>
            </Badge>
            {wand && (
              <img
                src={wand}
                alt=''
                className='h-4 w-4'
                height={16}
                width={16}
              />
            )}
          </div>
          {badges && badges.length > 0 && (
            <div className='flex flex-wrap justify-end gap-1.5'>
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'secondary'}
                  className={cn('shrink-0 text-xs', badge.className)}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        {(description || children) && (
          <CardContent className='px-0 pt-0'>
            {description && (
              <div
                className='text-foreground/70 overflow-hidden text-xs leading-relaxed'
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {description}
              </div>
            )}
            {children}
          </CardContent>
        )}

        {/* Footer Section */}
        {footer && (
          <div className='text-muted-foreground border-border mt-2 border-t pt-2 text-xs'>
            {footer}
          </div>
        )}
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className='max-h-[80vh] max-w-2xl overflow-y-auto'
          showCloseButton={false}
        >
          <DialogHeader className='border-border mb-3 border-b pb-3'>
            <DialogTitle className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <Badge
                  className='rounded-full ps-[3px] text-sm'
                  variant='outline'
                >
                  {author.avatarUrl && (
                    <img
                      src={author.avatarUrl}
                      alt={author.name}
                      className='h-5 w-5 rounded-full'
                      height={20}
                      width={20}
                    />
                  )}
                  <span>{author.name}</span>
                </Badge>
                {wand && (
                  <img
                    src={wand}
                    alt=''
                    className='h-5 w-5 rounded-full'
                    height={20}
                    width={20}
                  />
                )}
              </div>
              {badges && badges.length > 0 && (
                <div className='flex flex-wrap gap-1.5'>
                  {badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant={badge.variant || 'secondary'}
                      className={cn('shrink-0 text-xs', badge.className)}
                    >
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className='text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap'>
              {description}
              {children}
            </div>
          </DialogDescription>
          {footer && (
            <div className='text-muted-foreground mt-4 border-t pt-4 text-xs'>
              {footer}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export { FeedbackCard, type FeedbackCardProps };
