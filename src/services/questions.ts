import type { Question, QuestionsData } from '@/types/quiz';

export async function loadChapterQuestions(
  locale: string,
  chapterId: number | string
): Promise<{ questions: Question[]; analysis: Question[] } | null> {
  try {
    const questionsModule = await import(
      `@/i18n/${locale}/quests/questions/chapter_${chapterId}.json`
    );
    const questionsData: QuestionsData = questionsModule.default;

    const analysisModule = await import(
      `@/i18n/${locale}/quests/analysis/chapter_${chapterId}.json`
    );
    const analysisData: QuestionsData = analysisModule.default;

    return {
      questions: Object.values(questionsData),
      analysis: Object.values(analysisData),
    };
  } catch (error) {
    console.error(`Failed to load questions for chapter ${chapterId}:`, error);
    return null;
  }
}
