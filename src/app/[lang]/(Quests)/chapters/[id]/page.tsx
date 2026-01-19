import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type QuestionOption = {
  a: string;
  b: string;
  c: string;
  d?: string;
  e?: string;
  _a: string;
  _b: string;
  _c: string;
  _d?: string;
  _e?: string;
};

type Question = {
  _title: string;
  options: QuestionOption;
};

type QuestionsData = Record<string, Question>;

interface ChapterPageProps {
  params: Promise<{
    id: string;
    lang: 'de' | 'en';
  }>;
}

/**
 * Load questions from JSON files based on chapter and locale
 */
async function getQuestionsData(locale: string, chapterId: number) {
  try {
    // Load technical questions
    const questionsModule = await import(
      `@/i18n/${locale}/quests/questions/chapter_${chapterId}.json`
    );
    const questionsData: QuestionsData = questionsModule.default;
    const questionsList = Object.values(questionsData);

    // Load personal/analysis questions
    const analysisModule = await import(
      `@/i18n/${locale}/quests/analysis/chapter_${chapterId}.json`
    );
    const analysisData: QuestionsData = analysisModule.default;
    const analysisList = Object.values(analysisData);

    return { questions: questionsList, analysis: analysisList };
  } catch (error) {
    console.error(`Failed to load questions for chapter ${chapterId}:`, error);
    return null;
  }
}

/**
 * Chapter page with quiz questions
 * Displays technical questions and personal/analysis questions
 */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id, lang } = await params;
  const chapterId = parseInt(id, 10);

  // Validate chapter ID
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 6) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>Kapitel nicht gefunden</h1>
      </div>
    );
  }

  // Load questions
  const questionsData = await getQuestionsData(lang, chapterId);
  if (!questionsData) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>
          Fragen konnten nicht geladen werden
        </h1>
      </div>
    );
  }

  const { questions, analysis } = questionsData;

  return (
    <div className='relative z-[100] min-h-screen w-full bg-black'>
      <div className='flex flex-col items-center gap-8 px-6 py-12'>
        {/* Chapter header */}
        <div className='flex flex-col items-center gap-3 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Kapitel {chapterId}
          </h1>
          <p className='text-muted-foreground max-w-2xl'>
            Beantworte die Fragen zu diesem Kapitel
          </p>
        </div>

        {/* Questions summary */}
        <div className='grid w-full max-w-2xl grid-cols-2 gap-4'>
          <Card className='flex flex-col items-center gap-3 p-6'>
            <div className='text-primary text-3xl font-bold'>
              {questions.length}
            </div>
            <p className='text-muted-foreground text-sm'>Technische Fragen</p>
          </Card>
          <Card className='flex flex-col items-center gap-3 p-6'>
            <div className='text-primary text-3xl font-bold'>
              {analysis.length}
            </div>
            <p className='text-muted-foreground text-sm'>Persönliche Fragen</p>
          </Card>
        </div>

        {/* Start button */}
        <div className='flex flex-col items-center gap-4'>
          <p className='text-center text-neutral-400'>
            Du wirst zuerst die technischen Fragen beantworten, dann die
            persönlichen Fragen zur Profilierung.
          </p>
          <a href={`/${lang}/chapters/${chapterId}/quiz`}>
            <Button size='lg' className='px-8'>
              Quiz starten
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
