import Image from 'next/image';
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
        data-slot="feedback-card"
        className={cn(
          'm-4 flex h-full max-h-[264px] max-w-[419px] cursor-pointer overflow-hidden rounded-none p-4',
          className
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        {/* Header Section with Author and Badges */}
        <div className="border-border flex items-start justify-between gap-3 border-b pb-3">
          <div className="min-w-0 flex-1">
            <Badge className="max-w-full min-w-0 shrink ps-[3px] text-xs" variant="outline">
              {author.avatarUrl && (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  className="h-4 w-4 rounded-full"
                  height={16}
                  width={16}
                />
              )}
              <span className="min-w-0 truncate">{author.name}</span>
            </Badge>
            {wand && <Image src={wand} alt="" className="h-4 w-4" height={16} width={16} />}
          </div>
          {badges && badges.length > 0 && (
            <div className="flex shrink-0 flex-nowrap justify-end gap-1.5">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'secondary'}
                  className={cn('shrink-0 text-xs whitespace-nowrap', badge.className)}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        {(description || children) && (
          <CardContent className="flex-1 px-0 pt-0">
            {description && (
              <div className="text-foreground/70 line-clamp-6 text-xs leading-relaxed">
                {description}
              </div>
            )}
            {children}
          </CardContent>
        )}

        {/* Footer Section */}
        {footer && (
          <div className="text-muted-foreground border-border mt-2 border-t pt-2 text-xs">
            {footer}
          </div>
        )}
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto" showCloseButton={false}>
          <DialogHeader className="border-border mb-3 border-b pb-3">
            <DialogTitle className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge className="ps-[3px] text-sm" variant="outline">
                  {author.avatarUrl && (
                    <Image
                      src={author.avatarUrl}
                      alt={author.name}
                      className="h-5 w-5 rounded-full"
                      height={20}
                      width={20}
                    />
                  )}
                  <span>{author.name}</span>
                </Badge>
                {wand && <Image src={wand} alt="" className="h-5 w-5" height={20} width={20} />}
              </div>
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
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
          <DialogDescription className="text-foreground/80 whitespace-pre-wrap">
            {description}
            {children}
          </DialogDescription>
          {footer && (
            <div className="text-muted-foreground mt-4 border-t pt-4 text-xs">{footer}</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export { FeedbackCard, type FeedbackCardProps };
