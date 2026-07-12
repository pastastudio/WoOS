import type { RouteEntry } from '@/lib/content';

/** Returns the URL of the previous/next route relative to `currentSlug`, wrapping around. */
export function getCircularNavUrl(
  direction: 'prev' | 'next',
  routes: RouteEntry[],
  currentSlug: string,
  section: 'information' | 'docs'
) {
  if (!routes?.length) return '#';
  const currentIndex = routes.findIndex(r => r.slug === currentSlug);
  if (currentIndex === -1) return '#';

  let nextIndex;
  if (direction === 'next') {
    nextIndex = (currentIndex + 1) % routes.length;
  } else {
    nextIndex = (currentIndex - 1 + routes.length) % routes.length;
  }
  return `/${section}/${routes[nextIndex]?.slug || '#'}`;
}
