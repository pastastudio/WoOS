'use client';

import { QuizFlow, defaultQuizFlowLabels } from '@/components/quiz/quiz-flow';
import { useQuizFlow } from '@/hooks/use-quiz-flow';
import { useLocale } from '@/providers/locale-provider';
import { useRouter, useSearchParams } from 'next/navigation';

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = useLocale();
  const chapter = searchParams.get('chapter') || '1';

  const quiz = useQuizFlow({ chapter, locale: lang, withAnalyzePhase: false });

  return (
    <QuizFlow
      labels={defaultQuizFlowLabels}
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
