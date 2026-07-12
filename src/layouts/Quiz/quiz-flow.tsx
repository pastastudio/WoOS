'use client';

import type { Question, QuizFlowLabels, QuizPhase } from '@/types/quiz';

import { AnalyzePhase } from './phases/analyze-phase';
import { CompletePhase } from './phases/complete-phase';
import { MessagePhase } from './phases/message-phase';
import { QuestionPhase } from './phases/question-phase';
import { TransitionPhase } from './phases/transition-phase';

export const defaultQuizFlowLabels: QuizFlowLabels = {
  loading: 'Loading questions...',
  noQuestions: 'No questions available for this chapter.',
  complete: 'Quiz Complete!',
  completeMessage:
    "You've completed all {total} questions for Chapter {chapter}. Your answers have been saved.",
  transitionTitle: 'Technical Questions Complete!',
  transitionMessage:
    "Great job! You've answered all {technicalCount} technical questions. Now let's move on to {personalCount} personal questions to help us understand your preferences better.",
  startPersonal: 'Start Personal Questions',
  progressLabel: 'Question {current} of {total}',
  technicalPhase: ' Technical Questions',
  personalPhase: ' Personal Questions',
  previous: 'Previous',
  next: 'Next',
  finish: 'Finish',
  analyze: 'Your Answers',
  analyzeMessage: 'Review your {technicalCount} technical and {personalCount} personal answers.',
  backToQuests: 'Back to Quests',
};

type QuizFlowProps = {
  labels: QuizFlowLabels;
  loading: boolean;
  phase: QuizPhase;
  chapter: number;
  technicalQuestions: Question[];
  personalQuestions: Question[];
  currentQuestion: Question | undefined;
  currentQuestionIndex: number;
  totalInPhase: number;
  selectedAnswer: string | null;
  technicalAnswers: Record<number, string>;
  personalAnswers: Record<number, string>;
  isCurrentAnswered: boolean;
  isPreviousDisabled: boolean;
  onAnswerSelect: (optionKey: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onStartPersonalQuestions: () => void;
  onCompleteAnalyze: () => void;
  onBackToQuests: () => void;
  onViewAnalysis: () => void;
};

export function QuizFlow({
  labels,
  loading,
  phase,
  chapter,
  technicalQuestions,
  personalQuestions,
  currentQuestion,
  currentQuestionIndex,
  totalInPhase,
  selectedAnswer,
  technicalAnswers,
  personalAnswers,
  isCurrentAnswered,
  isPreviousDisabled,
  onAnswerSelect,
  onNext,
  onPrevious,
  onStartPersonalQuestions,
  onCompleteAnalyze,
  onBackToQuests,
  onViewAnalysis,
}: QuizFlowProps) {
  if (loading) {
    return <MessagePhase message={labels.loading} />;
  }

  if (phase === 'complete') {
    return (
      <CompletePhase
        labels={labels}
        totalQuestions={technicalQuestions.length + personalQuestions.length}
        chapter={chapter}
        onBackToQuests={onBackToQuests}
        onViewAnalysis={onViewAnalysis}
      />
    );
  }

  if (!currentQuestion && phase !== 'transition' && phase !== 'analyze') {
    return <MessagePhase message={labels.noQuestions} />;
  }

  if (phase === 'transition') {
    return (
      <TransitionPhase
        labels={labels}
        technicalCount={technicalQuestions.length}
        personalCount={personalQuestions.length}
        onStartPersonalQuestions={onStartPersonalQuestions}
      />
    );
  }

  if (phase === 'analyze') {
    return (
      <AnalyzePhase
        labels={labels}
        chapter={chapter}
        technicalQuestions={technicalQuestions}
        personalQuestions={personalQuestions}
        technicalAnswers={technicalAnswers}
        personalAnswers={personalAnswers}
        onCompleteAnalyze={onCompleteAnalyze}
      />
    );
  }

  return (
    <QuestionPhase
      labels={labels}
      phase={phase}
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalInPhase={totalInPhase}
      selectedAnswer={selectedAnswer}
      isCurrentAnswered={isCurrentAnswered}
      isPreviousDisabled={isPreviousDisabled}
      onAnswerSelect={onAnswerSelect}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
}
