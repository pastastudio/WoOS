'use client';

import { FeedbackCard } from '@/components/ui/base/feedback-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ThumbsdownSolid,
  ThumbsupSolid,
  UserCheckSolid,
} from '@2hoch1/pixel-icon-library-react';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

const verifiedBadge = {
  label: (
    <div className='flex items-center gap-1'>
      <UserCheckSolid className='size-3' />
      Verified
    </div>
  ),
  variant: 'secondary' as const,
  className: 'bg-blue-500 text-white dark:bg-blue-600',
};

const positiveBadge = {
  label: (
    <div className='flex items-center gap-1'>
      <ThumbsupSolid className='size-3' />
      Positive
    </div>
  ),
  variant: 'secondary' as const,
  className: 'bg-green-500 text-white dark:bg-green-600',
};

const negativeBadge = {
  label: (
    <div className='flex items-center gap-1'>
      <ThumbsdownSolid className='size-3' />
      Negative
    </div>
  ),
  variant: 'secondary' as const,
  className: 'bg-red-500 text-white dark:bg-red-600',
};

interface FeedbackData {
  author: {
    name: string;
    avatarUrl: string;
  };
  description: string;
  badges: Array<{
    label: React.ReactNode;
    variant: 'secondary';
    className: string;
  }>;
}

interface FeedbackCarouselProps {
  feedbackData: FeedbackData[];
}

function FeedbackCarousel({ feedbackData }: FeedbackCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className='w-full max-w-6xl'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {feedbackData.map((feedback, index) => (
          <CarouselItem key={index} className='md:basis-1/3'>
            <FeedbackCard
              author={feedback.author}
              description={feedback.description}
              badges={feedback.badges}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export { FeedbackCarousel, negativeBadge, positiveBadge, verifiedBadge };
export type { FeedbackCarouselProps, FeedbackData };
