import type { Question } from '@/types/quiz';

export type OsCategory = 'windows' | 'linux' | 'macos';

export function normalizeOsCategory(value: string): OsCategory | null {
  const lower = value.toLowerCase();
  if (lower.includes('windows')) return 'windows';
  if (lower.includes('linux')) return 'linux';
  if (lower.includes('mac')) return 'macos';
  return null;
}

/** Tallies how many answered personal questions map to each OS category. */
export function computeOsCounts(
  questions: Question[],
  answers: Record<number, string>
): Record<OsCategory, number> {
  const counts: Record<OsCategory, number> = { windows: 0, linux: 0, macos: 0 };

  questions.forEach((question, index) => {
    const answerKey = answers[index];
    if (!answerKey) return;
    const category = question.options[`_${answerKey}` as keyof typeof question.options];
    const normalized = category ? normalizeOsCategory(category) : null;
    if (normalized) counts[normalized] += 1;
  });

  return counts;
}

export function toPercentage(count: number, total: number): number {
  return total ? Math.round((count / total) * 100) : 0;
}
