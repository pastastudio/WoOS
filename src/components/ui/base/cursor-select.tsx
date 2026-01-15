'use client';

import { useEffect, useRef, useState } from 'react';

import InfoBox from '@/components/ui/base/info-box';
import WandDisplay from '@/components/ui/base/wand-display';
import { Button } from '@/components/ui/button';

import LineSvg from '@/assets/line.svg';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const FADE_MS = 1500;
const EXTRA_READY_MS = 5500;
const BASE_DELAY_MS = 150;

function DialogDemo() {
  const [primaryOpen, setPrimaryOpen] = useState(false);
  const [secondaryOpen, setSecondaryOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [contentReady, setContentReady] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const introSections = [
    'In the world of wizards, a wand is far more than a simple tool.',
    'Every wand carries its own history and responds differently to the wizard who wields it.',
    'If you choose to step into the real world, other wizards will be able to see your wand and recognize its power.',
    'Choose wisely, some wands are stronger, others more subtle, but each one reveals something about the wizard who carries it.',
  ];

  const resetIntro = () => {
    setVisibleCount(0);
    setContentReady(false);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const startIntroSequence = () => {
    resetIntro();
    introSections.forEach((_, index) => {
      const delay = BASE_DELAY_MS + index * FADE_MS;
      const timer = setTimeout(() => {
        setVisibleCount((count) => Math.max(count, index + 1));
      }, delay);
      timersRef.current.push(timer);
    });

    const totalDelay =
      BASE_DELAY_MS + introSections.length * FADE_MS + EXTRA_READY_MS;
    const readyTimer = setTimeout(() => setContentReady(true), totalDelay);
    timersRef.current.push(readyTimer);
  };

  useEffect(() => {
    if (primaryOpen) {
      startIntroSequence();
    } else {
      resetIntro();
    }

    return () => {
      resetIntro();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryOpen]);

  const handleContinue = () => {
    setPrimaryOpen(false);
    setSecondaryOpen(true);
  };

  return (
    <>
      <Dialog open={primaryOpen} onOpenChange={setPrimaryOpen}>
        <DialogTrigger>
          <Button variant='outline'>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent
          className='font-pixelify min-h-[790px] w-[670px] sm:max-w-[670px]'
          showCloseButton={false}
        >
          <div className='grid h-full grid-rows-[auto_1fr_auto]'>
            <DialogHeader className='text-left'>
              <DialogTitle>Select your Wand</DialogTitle>
              <DialogDescription>
                A quick primer before you choose.
              </DialogDescription>
              <Separator className='mt-4' />
            </DialogHeader>

            <div className='Content flex flex-1 items-center justify-center'>
              <div className='flex min-h-[320px] w-full max-w-sm flex-col items-center justify-center gap-10 text-center text-lg sm:max-w-sm'>
                {(() => {
                  const lead = introSections[0];
                  const rest = introSections.slice(1);
                  return (
                    <>
                      <p
                        className='text-2xl font-semibold text-white transition-opacity'
                        style={{
                          opacity: visibleCount > 0 ? 1 : 0,
                          transitionDelay: `0ms`,
                          transitionDuration: `${FADE_MS}ms`,
                        }}
                      >
                        {lead}
                      </p>
                      <div className='grid w-full gap-4 pt-4 text-gray-300 transition-opacity'>
                        {rest.map((text, index) => {
                          const overallIndex = index + 1;
                          const isVisible = overallIndex < visibleCount;
                          return (
                            <p
                              key={text}
                              className='transition-opacity'
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transitionDelay: `${overallIndex * FADE_MS}ms`,
                                transitionDuration: `${FADE_MS}ms`,
                              }}
                            >
                              {text}
                            </p>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            <DialogFooter className='justify-end'>
              <Button
                onClick={handleContinue}
                disabled={!contentReady}
                className='transition-opacity duration-500'
                style={{
                  opacity: contentReady ? 1 : 0,
                  pointerEvents: contentReady ? 'auto' : 'none',
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={secondaryOpen} onOpenChange={setSecondaryOpen}>
        <form>
          <DialogContent className='font-pixelify min-h-[790px] w-[670px] sm:max-w-[670px]'>
            <div className='grid h-full grid-rows-[auto_1fr_auto]'>
              <DialogHeader className='text-left'>
                <DialogTitle>Select your Wand</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
                <Separator className='mt-4' />
              </DialogHeader>

              <div className='Content flex min-h-0 flex-1 flex-col gap-4 py-4'>
                <div
                  id='first-wand-selection'
                  className='border-border/50 bg-background/60 grid h-full min-h-0 grid-cols-[3fr_auto_1fr] gap-4 overflow-auto rounded-md border p-4'
                >
                  <div className='border-border/50 grid h-full grid-cols-3 gap-4 rounded-md'>
                    <div className='grid h-full grid-rows-[auto_auto_1fr_auto] gap-2 rounded-md'>
                      <p className='text-foreground/70 px-1 text-center text-xs font-semibold'>
                        Crystal Scepter
                      </p>
                      <div className='relative aspect-square overflow-hidden rounded shadow-lg'>
                        <WandDisplay
                          variation='crystal-scepter-1'
                          alt='Wand top'
                        />
                      </div>
                      <div className='flex items-center justify-center rounded'>
                        <LineSvg className='h-25 w-auto opacity-80' />
                      </div>
                      <div className='relative aspect-square overflow-hidden rounded shadow-lg'>
                        <WandDisplay
                          variation='crystal-scepter-4'
                          alt='Wand bottom'
                          locked={true}
                        />
                      </div>
                    </div>

                    <div className='grid h-full grid-rows-[auto_auto_1fr_auto] gap-2 rounded-md'>
                      <p className='text-foreground/70 px-1 text-center text-xs font-semibold'>
                        Fire Snake
                      </p>
                      <div className='relative aspect-square overflow-hidden rounded shadow-lg'>
                        <WandDisplay variation='fire-snake-1' alt='Wand top' />
                      </div>
                      <div className='flex items-center justify-center rounded p-2 text-center text-sm'>
                        By completing quests you are able to level up styles!
                      </div>
                      <div className='relative aspect-square overflow-hidden rounded shadow-lg'>
                        <WandDisplay
                          variation='fire-snake-4'
                          alt='Wand bottom'
                          locked={true}
                        />
                      </div>
                    </div>

                    <div className='grid h-full grid-rows-[auto_auto_1fr_auto] gap-2 rounded-md'>
                      <p className='text-foreground/70 px-1 text-center text-xs font-semibold'>
                        Flowerstaff
                      </p>
                      <div className='relative aspect-square overflow-hidden rounded shadow-lg'>
                        <WandDisplay variation='flowerstaff-1' alt='Wand top' />
                      </div>
                      <div className='flex items-center justify-center rounded'>
                        <LineSvg className='h-25 w-auto opacity-80' />
                      </div>
                      <div className='relative aspect-square overflow-hidden rounded shadow-lg'>
                        <WandDisplay
                          variation='flowerstaff-4'
                          alt='Wand bottom'
                          locked={true}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator orientation='vertical' className='mx-1 ml-2' />

                  <div className='border-border/50 flex h-full flex-col items-center justify-center rounded-md'>
                    <p className='text-foreground/70 mb-2 text-xs font-semibold'>
                      Classic
                    </p>
                    <div className='relative aspect-square w-32 overflow-hidden rounded shadow-lg'>
                      <WandDisplay
                        variation='default-white'
                        alt='Default Cursor'
                        rotation={-30}
                        offsetX={-4}
                        offsetY={-7}
                        size={0.7}
                      />
                    </div>
                  </div>
                </div>

                <InfoBox variant='info' title='Info'>
                  Cursors can be changed anytime in your account settings.
                </InfoBox>
              </div>

              <DialogFooter className='justify-end'>
                <DialogClose>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default function CursorSelect() {
  return <DialogDemo />;
}
