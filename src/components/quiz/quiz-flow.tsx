'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Question, QuestionOption, QuizFlowLabels, QuizPhase } from '@/types/quiz';

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

function fillLabel(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );
}

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">{labels.loading}</p>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
        <h1 className="text-4xl font-bold">{labels.complete}</h1>
        <p className="text-muted-foreground max-w-md text-center">
          {fillLabel(labels.completeMessage, {
            total: technicalQuestions.length + personalQuestions.length,
            chapter,
          })}
        </p>
        <div className="flex gap-4">
          <Button size="lg" variant="outline" onClick={onBackToQuests}>
            {labels.backToQuests}
          </Button>
          <Button size="lg" onClick={onViewAnalysis}>
            View My Analysis
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion && phase !== 'transition' && phase !== 'analyze') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">{labels.noQuestions}</p>
      </div>
    );
  }

  if (phase === 'transition') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
        <div className="border-primary/20 bg-primary/10 rounded-full border p-4">
          <svg
            className="text-primary size-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">{labels.transitionTitle}</h1>
        <p className="text-muted-foreground max-w-md text-center">
          {fillLabel(labels.transitionMessage, {
            technicalCount: technicalQuestions.length,
            personalCount: personalQuestions.length,
          })}
        </p>
        <Button size="lg" onClick={onStartPersonalQuestions}>
          {labels.startPersonal}
        </Button>
      </div>
    );
  }

  if (phase === 'analyze') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
        <div className="w-full max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold">{labels.analyze}</h1>
          <p className="text-muted-foreground mb-8">
            {fillLabel(labels.analyzeMessage, {
              technicalCount: technicalQuestions.length,
              personalCount: personalQuestions.length,
              chapter,
            })}
          </p>
        </div>

        <Card className="w-full max-w-3xl p-8">
          <h2 className="mb-6 text-2xl font-bold">{labels.technicalPhase}</h2>
          <div className="mb-8 space-y-2">
            {technicalQuestions.map((_, index) => (
              <div
                key={`tech-${index}`}
                className="text-muted-foreground flex items-center justify-between"
              >
                <span>
                  {fillLabel(labels.progressLabel, {
                    current: index + 1,
                    total: technicalQuestions.length,
                  })}
                </span>
                <span className="text-primary font-medium">
                  {technicalAnswers[index] ? technicalAnswers[index].toUpperCase() : '—'}
                </span>
              </div>
            ))}
          </div>

          <h2 className="mt-8 mb-6 text-2xl font-bold">{labels.personalPhase}</h2>
          <div className="space-y-2">
            {personalQuestions.map((_, index) => (
              <div
                key={`personal-${index}`}
                className="text-muted-foreground flex items-center justify-between"
              >
                <span>
                  {fillLabel(labels.progressLabel, {
                    current: index + 1,
                    total: personalQuestions.length,
                  })}
                </span>
                <span className="text-primary font-medium">
                  {personalAnswers[index] ? personalAnswers[index].toUpperCase() : '—'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Button size="lg" onClick={onCompleteAnalyze} className="min-w-[200px]">
          {labels.finish}
        </Button>
      </div>
    );
  }

  const optionKeys = Object.keys(currentQuestion?.options ?? {}).filter(
    key => !key.startsWith('_')
  ) as Array<keyof QuestionOption>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {fillLabel(labels.progressLabel, {
              current: currentQuestionIndex + 1,
              total: totalInPhase,
            })}
          </span>
          <span className="font-medium">
            {phase === 'technical' ? labels.technicalPhase : labels.personalPhase}
          </span>
        </div>
        <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalInPhase) * 100}%` }}
          />
        </div>
      </div>

      <Card className="w-full max-w-3xl p-8">
        <h2 className="mb-8 text-2xl leading-tight font-bold">{currentQuestion?._title}</h2>

        <div className="flex flex-col gap-4">
          {optionKeys.map(optionKey => {
            const isSelected = selectedAnswer === optionKey;
            return (
              <button
                key={optionKey}
                onClick={() => onAnswerSelect(optionKey)}
                disabled={isCurrentAnswered}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground border-input flex items-start gap-4 rounded-lg border p-4 text-left transition-all',
                  isSelected && 'border-primary ring-primary/60 ring-2',
                  isCurrentAnswered && 'cursor-not-allowed opacity-75'
                )}
              >
                <div
                  className={cn(
                    'border-input flex size-6 shrink-0 items-center justify-center rounded-full border',
                    isSelected && 'border-primary bg-primary text-white'
                  )}
                >
                  {isSelected && (
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="flex-1">{currentQuestion?.options[optionKey]}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex w-full max-w-3xl items-center justify-between">
        <Button variant="outline" size="lg" onClick={onPrevious} disabled={isPreviousDisabled}>
          {labels.previous}
        </Button>
        <Button size="lg" onClick={onNext} disabled={!selectedAnswer} className="min-w-[120px]">
          {currentQuestionIndex === totalInPhase - 1 ? labels.finish : labels.next}
        </Button>
      </div>
    </div>
  );
}
