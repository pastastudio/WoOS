import { useEffect, useRef, useState } from 'react';

const FADE_MS = 1500;
const EXTRA_READY_MS = 5500;
const BASE_DELAY_MS = 150;

/**
 * Reveals `sectionCount` sections one by one on a staggered delay while
 * `active` is true, then flags `contentReady` once the last section has had
 * time to fade in plus a short extra pause.
 */
export function useStagedReveal(active: boolean, sectionCount: number) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [contentReady, setContentReady] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    setVisibleCount(0);
    setContentReady(false);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const start = () => {
    reset();
    for (let index = 0; index < sectionCount; index++) {
      const delay = BASE_DELAY_MS + index * FADE_MS;
      const timer = setTimeout(() => {
        setVisibleCount(count => Math.max(count, index + 1));
      }, delay);
      timersRef.current.push(timer);
    }

    const totalDelay = BASE_DELAY_MS + sectionCount * FADE_MS + EXTRA_READY_MS;
    const readyTimer = setTimeout(() => setContentReady(true), totalDelay);
    timersRef.current.push(readyTimer);
  };

  useEffect(() => {
    if (active) {
      start();
    } else {
      reset();
    }

    return reset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return { visibleCount, contentReady, fadeMs: FADE_MS };
}
