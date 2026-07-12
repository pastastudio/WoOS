import { getContent } from '@/lib/content';
import { compileMdx } from '@/lib/markdown';

type ChapterFrontmatter = {
  title: string;
  description: string;
  filename?: string;
};

/**
 * Fetches the user's quiz progress from the database
 * TODO: Replace with a real DB-backed progress lookup for the signed-in user
 * This function should query a database table that tracks which quizzes the user has completed
 * @returns {completedCount} - Number of quizzes the user has completed
 */
export async function getUserQuizProgress(): Promise<{ completedCount: number }> {
  // Example implementation for now; wire this to your user/quiz progress table
  return { completedCount: 2 };
}

/**
 * Loads chapter metadata (title and description) from the MDX files
 * Supports both German (de) and English (en) locales
 * @param locale - Language locale ('de' or 'en')
 * @param chapterNumber - Chapter number (1-6)
 * @returns Chapter title and description from MDX frontmatter
 */
export async function getChapterMetadata(
  locale: string,
  chapterNumber: number
): Promise<{ title: string; description: string }> {
  try {
    // Reads the chapter_X.mdx file from content/{locale}/info/
    const { source } = getContent(locale, 'information', `chapter_${chapterNumber}`);
    // Extracts frontmatter (title, description) from the MDX file
    const { frontmatter } = await compileMdx<ChapterFrontmatter>({ source });
    return {
      title: frontmatter.title || `Chapter ${chapterNumber}`,
      description: frontmatter.description || '',
    };
  } catch {
    // Fallback values if the file cannot be read
    return {
      title: `Chapter ${chapterNumber}`,
      description: '',
    };
  }
}

/**
 * Loads UI text translations for the page based on locale
 * Translations are stored in src/i18n/{locale}/quests/page.json
 * @param locale - Language locale ('de' or 'en')
 * @returns Object containing translated strings
 */
export async function getTranslations(locale: 'de' | 'en') {
  const translations = await import(`@/i18n/${locale}/quests/page.json`);
  return translations.default;
}
