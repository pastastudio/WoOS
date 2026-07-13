import { ParallaxWindow } from '@/components/parallax-window';
import { QuestionOverview, Quiz } from '@/components/question-overview';

import { getLocale } from '@/lib/locale';
import { getChapterMetadata, getTranslations, getUserQuizProgress } from '@/lib/quests';

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
    [1, 2, 3, 4, 5, 6].map(num => getChapterMetadata(locale, num))
  );

  /**
   * Build the quizzes array with routing information
   * Routes to: /quests/chapters/{chapter_number} to match new nested route structure
   */
  const quizzes: Quiz[] = chaptersData.map((chapter, index) => ({
    id: index + 1,
    title: chapter.title,
    // Routes to chapters nested route with chapter number
    href: `/quests/chapters/${index + 1}`,
    blurb: chapter.description,
    slug: `chapter_${index + 1}`,
  }));

  // Fetch user's completion progress
  const { completedCount } = await getUserQuizProgress();

  return (
    <>
      <ParallaxWindow />
      <div className="bg-background relative z-[100] w-full pb-20">
        <div className="flex flex-col items-center gap-10 px-6 py-12">
          {/* Page header with title and description */}
          <div className="flex max-w-3xl flex-col items-center gap-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-muted-foreground">{t.description}</p>
          </div>

          {/* Chapter timeline component */}
          <QuestionOverview quizzes={quizzes} completedCount={completedCount} translations={t} />
        </div>
      </div>
    </>
  );
}
