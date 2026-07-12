'use client';

import { defaultQuizFlowLabels, QuizFlow } from '@/layouts/Quiz/quiz-flow';
import { useQuizFlow } from '@/hooks/use-quiz-flow';
import { useLocale } from '@/providers/locale-provider';
import type { QuizFlowLabels } from '@/types/quiz';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const lang = useLocale();

  const [labels, setLabels] = useState<QuizFlowLabels | null>(null);

  useEffect(() => {
    let cancelled = false;
    import(`@/i18n/${lang}/quests/quiz.json`)
      .then(module => {
        if (!cancelled) setLabels(module.default as QuizFlowLabels);
      })
      .catch(error => {
        console.error('Failed to load quiz translations:', error);
        // Fall back to the built-in labels instead of hanging on "Loading..." forever.
        if (!cancelled) setLabels(defaultQuizFlowLabels);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const quiz = useQuizFlow({
    chapter: id,
    locale: lang,
    withAnalyzePhase: true,
    lockAnsweredQuestions: true,
  });

  if (!labels) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <QuizFlow
      labels={labels}
      loading={quiz.loading}
      phase={quiz.phase}
      chapter={quiz.chapter}
      technicalQuestions={quiz.technicalQuestions}
      personalQuestions={quiz.personalQuestions}
      currentQuestion={quiz.currentQuestion}
      currentQuestionIndex={quiz.currentQuestionIndex}
      totalInPhase={quiz.totalInPhase}
      selectedAnswer={quiz.selectedAnswer}
      technicalAnswers={quiz.technicalAnswers}
      personalAnswers={quiz.personalAnswers}
      isCurrentAnswered={quiz.isCurrentAnswered}
      isPreviousDisabled={quiz.isPreviousDisabled}
      onAnswerSelect={quiz.handleAnswerSelect}
      onNext={quiz.handleNext}
      onPrevious={quiz.handlePrevious}
      onStartPersonalQuestions={quiz.handleStartPersonalQuestions}
      onCompleteAnalyze={quiz.handleCompleteAnalyze}
      onBackToQuests={() => router.push(`/quests`)}
      onViewAnalysis={() => router.push(`/analyze`)}
    />
  );
}
