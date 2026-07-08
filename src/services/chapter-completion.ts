// Chapter completion is currently tracked via a cookie because the DB wasn't
// wired up in time. This file is the single place that knows that — swapping
// to a real DB later should only require changing the two functions below.

export function getCompletedChapters(): number[] {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('completed_chapters='))
    ?.split('=')[1];

  if (!cookieValue) return [];

  try {
    const chapters = JSON.parse(decodeURIComponent(cookieValue));
    return Array.isArray(chapters) ? chapters : [];
  } catch (error) {
    console.error('Failed to parse completed chapters cookie:', error);
    return [];
  }
}

export async function markChapterComplete(chapter: number): Promise<number[]> {
  const response = await fetch('/api/chapters/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapter }),
  });

  if (!response.ok) {
    throw new Error(`Failed to mark chapter ${chapter} complete`);
  }

  const data: { completedChapters: number[] } = await response.json();
  return data.completedChapters;
}
