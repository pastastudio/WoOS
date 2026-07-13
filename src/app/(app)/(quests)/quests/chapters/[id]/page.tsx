import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getLocale } from '@/lib/locale';
import { loadChapterQuestions } from '@/services/questions';

interface ChapterPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Chapter page with quiz questions
 * Displays technical questions and personal/analysis questions
 */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id } = await params;
  const lang = await getLocale();
  const chapterId = parseInt(id, 10);

  // Validate chapter ID
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 6) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Kapitel nicht gefunden</h1>
      </div>
    );
  }

  // Load questions
  const questionsData = await loadChapterQuestions(lang, chapterId);
  if (!questionsData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Fragen konnten nicht geladen werden</h1>
      </div>
    );
  }

  const { questions, analysis } = questionsData;

  return (
    <div className="bg-background relative z-[100] min-h-screen w-full">
      <div className="flex flex-col items-center gap-8 px-6 py-12">
        {/* Chapter header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Kapitel {chapterId}</h1>
          <p className="text-muted-foreground max-w-2xl">Beantworte die Fragen zu diesem Kapitel</p>
        </div>

        {/* Questions summary */}
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
          <Card className="flex flex-col items-center gap-3 p-6">
            <div className="text-primary text-3xl font-bold">{questions.length}</div>
            <p className="text-muted-foreground text-sm">Technische Fragen</p>
          </Card>
          <Card className="flex flex-col items-center gap-3 p-6">
            <div className="text-primary text-3xl font-bold">{analysis.length}</div>
            <p className="text-muted-foreground text-sm">Persönliche Fragen</p>
          </Card>
        </div>

        {/* Start button */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-center">
            Du wirst zuerst die technischen Fragen beantworten, dann die persönlichen Fragen zur
            Profilierung.
          </p>
          <Link href={`/quests/chapters/${chapterId}/quiz`}>
            <Button size="lg" className="px-8">
              Quiz starten
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
