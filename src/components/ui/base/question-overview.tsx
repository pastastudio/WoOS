'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Type definition for a quiz/chapter button
 * @property id - Unique identifier for the quiz
 * @property title - Title of the chapter (loaded from MDX frontmatter)
 * @property href - URL the button should navigate to when clicked
 * @property blurb - Description/preview text (loaded from MDX frontmatter)
 * @property slug - File name slug (e.g., 'chapter_1')
 */
export type Quiz = {
  id: number;
  title: string;
  href: string;
  blurb: string;
  slug: string;
};

interface QuestionOverviewProps {
  quizzes: Quiz[];
  completedCount: number;
  translations: {
    status: {
      completed: string;
      ready: string;
      locked: string;
    };
    continue: string;
  };
}

/**
 * Component displaying chapters in a timeline layout with alternating positions
 * Handles unlock state, completion tracking, and sequential navigation
 */
export function QuestionOverview({
  quizzes,
  completedCount,
  translations,
}: QuestionOverviewProps) {
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  // Load completed chapters from cookies on client mount
   
  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('completed_chapters='))
      ?.split('=')[1];

    if (cookieValue) {
      try {
        const chapters = JSON.parse(decodeURIComponent(cookieValue));
        setCompletedChapters(Array.isArray(chapters) ? chapters : []);
      } catch (error) {
        console.error('Failed to parse completed chapters cookie:', error);
      }
    }
  }, []);

  // Calculate how many chapters are unlocked
  // Use cookie-based completed chapters if available, otherwise fall back to prop
  const actualCompletedCount = completedChapters.length || completedCount;
  const unlockedCount = Math.min(actualCompletedCount + 1, quizzes.length);
  // Get the most recently unlocked chapter for the "Continue" button
  const lastUnlocked = quizzes[Math.max(unlockedCount - 1, 0)];

  return (
    <div className='w-full max-w-4xl'>
      <div className='relative flex flex-col gap-10'>
        {/* Vertical center line connecting all buttons */}
        <div className='from-primary/30 via-muted-foreground/30 to-primary/30 absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b' />

        {/* Map through all chapters and render buttons */}
        {quizzes.map((quiz, index) => {
          // Determine unlock state: chapters unlock sequentially
          const isUnlocked = index < unlockedCount;
          // Check if chapter is completed from cookie
          const isCompleted = completedChapters.includes(index + 1);
          // Highlight the next available chapter
          const isNext = index === unlockedCount - 1 && !isCompleted;
          // Alternate button positions (left/right) for visual interest
          const alignRight = index % 2 === 1;

          return (
            <div
              key={quiz.id}
              className={cn(
                'flex w-full items-center gap-6',
                alignRight ? 'justify-end pr-10' : 'justify-start pl-10',
              )}
            >
              {/* Connector line from left button to center timeline */}
              {!alignRight && (
                <div className='relative max-w-[50%] flex-1 text-right'>
                  <div className='border-muted-foreground/40 absolute top-1/2 right-[-0.6rem] h-px w-10 -translate-y-1/2 border-t border-dashed' />
                </div>
              )}

              {/* Chapter button */}
              <div className='relative z-10'>
                <Button
                  // Style changes based on unlock state and completion
                  variant={
                    isCompleted ? 'default' : isUnlocked ? 'default' : 'outline'
                  }
                  size='lg'
                  disabled={!isUnlocked}
                  className={cn(
                    'h-auto w-[340px] flex-col items-start gap-0 px-5 py-4 text-left shadow-sm transition-transform',
                    isUnlocked && 'hover:-translate-y-0.5 hover:shadow-md',
                    isCompleted && 'bg-white text-black hover:bg-neutral-200',
                    isNext && 'ring-primary/60 ring-2 ring-offset-2',
                  )}
                >
                  {/* Link with routing */}
                  <Link
                    href={quiz.href}
                    prefetch={false}
                    className='flex w-full flex-col gap-0'
                  >
                    {/* Chapter title (wraps to multiple lines if too long) */}
                    <span className='text-base leading-tight font-semibold break-words whitespace-normal'>
                      {quiz.title}
                    </span>
                    {/* Chapter description - only visible when unlocked */}
                    {isUnlocked && (
                      <span
                        className={cn(
                          'mt-2 text-xs leading-relaxed break-words whitespace-normal',
                          isCompleted
                            ? 'text-black/60'
                            : 'text-muted-foreground',
                        )}
                      >
                        {quiz.blurb}
                      </span>
                    )}
                    {/* Status badge showing completion state */}
                    <span className='mt-3 inline-flex items-center gap-2 text-xs font-medium'>
                      {isCompleted && translations.status.completed}
                      {!isCompleted && isUnlocked && translations.status.ready}
                      {!isUnlocked && translations.status.locked}
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Connector line from right button to center timeline */}
              {alignRight && (
                <div className='relative max-w-[50%] flex-1 text-left'>
                  <div className='border-muted-foreground/40 absolute top-1/2 left-[-0.6rem] h-px w-10 -translate-y-1/2 border-t border-dashed' />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* "Continue to latest" button - takes user to the most recently unlocked chapter */}
      <div className='w-full pt-10'>
        <Button
          size='lg'
          className='h-14 w-full text-base font-semibold shadow-md'
        >
          {/* Routes to the most recently unlocked chapter */}
          <Link href={lastUnlocked.href} prefetch={false}>
            {translations.continue}: {lastUnlocked.title}
          </Link>
        </Button>
      </div>
    </div>
  );
}
