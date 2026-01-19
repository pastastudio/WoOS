import { ParallaxWindow } from '@/components/ui/base/parallax-window';
import { QuestionOverview, Quiz } from '@/components/ui/base/question-overview';
import { cookies } from 'next/headers';

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
async function getUserQuizProgress(): Promise<{ completedCount: number }> {
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
async function getChapterMetadata(
  locale: string,
  chapterNumber: number,
): Promise<{ title: string; description: string }> {
  try {
    // Reads the chapter_X.mdx file from content/{locale}/info/
    const { source } = getContent(
      locale,
      'information',
      `chapter_${chapterNumber}`,
    );
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
 * Detects the user's preferred language from browser cookies
 * Defaults to English ('en') if no locale preference is found
 * @returns User's preferred locale ('de' or 'en')
 */
async function getLocale(): Promise<'de' | 'en'> {
  const cookieStore = await cookies();
  // Check for locale preference in cookies or default to 'en'
  const locale = cookieStore.get('locale')?.value;
  return locale === 'de' ? 'de' : 'en';
}

/**
 * Loads UI text translations for the page based on locale
 * Translations are stored in src/i18n/{locale}/quests/page.json
 * @param locale - Language locale ('de' or 'en')
 * @returns Object containing translated strings
 */
async function getTranslations(locale: 'de' | 'en') {
  const translations = await import(`@/i18n/${locale}/quests/page.json`);
  return translations.default;
}

/**
 * Main page component for the Quests/Chapters overview
 * Displays header, description, and chapter timeline layout
 */
export default async function Page() {
  // Get user's language preference
  const locale = await getLocale();
  // Load translated UI text
  const t = await getTranslations(locale);

  // Load chapter metadata (title and description) from all 6 chapter files
  const chaptersData = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((num) => getChapterMetadata(locale, num)),
  );

  /**
   * Build the quizzes array with routing information
   * Routes to: /chapters/{chapter_number} to match new nested route structure
   */
  const quizzes: Quiz[] = chaptersData.map((chapter, index) => ({
    id: index + 1,
    title: chapter.title,
    // Routes to chapters nested route with chapter number
    href: `/${locale}/chapters/${index + 1}`,
    blurb: chapter.description,
    slug: `chapter_${index + 1}`,
  }));

  // Fetch user's completion progress
  const { completedCount } = await getUserQuizProgress();

  return (
    <>
      <ParallaxWindow />
      <div className='relative z-[100] w-full bg-black pb-20'>
        <div className='flex flex-col items-center gap-10 px-6 py-12'>
          {/* Page header with title and description */}
          <div className='flex max-w-3xl flex-col items-center gap-3 text-center'>
            <h1 className='text-4xl font-bold tracking-tight'>{t.title}</h1>
            <p className='text-muted-foreground'>{t.description}</p>
          </div>

          {/* Chapter timeline component */}
          <QuestionOverview
            quizzes={quizzes}
            completedCount={completedCount}
            translations={t}
          />
        </div>
      </div>
    </>
  );
}
