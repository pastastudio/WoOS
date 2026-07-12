import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Question, QuestionOption, QuizFlowLabels, QuizPhase } from '@/types/quiz';

import { fillLabel } from '../fill-label';

interface QuestionPhaseProps {
  labels: QuizFlowLabels;
  phase: QuizPhase;
  currentQuestion: Question | undefined;
  currentQuestionIndex: number;
  totalInPhase: number;
  selectedAnswer: string | null;
  isCurrentAnswered: boolean;
  isPreviousDisabled: boolean;
  onAnswerSelect: (optionKey: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionPhase({
  labels,
  phase,
  currentQuestion,
  currentQuestionIndex,
  totalInPhase,
  selectedAnswer,
  isCurrentAnswered,
  isPreviousDisabled,
  onAnswerSelect,
  onNext,
  onPrevious,
}: QuestionPhaseProps) {
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
                  'hover:bg-accent hover:text-accent-foreground border-input flex items-start gap-4 rounded-none border p-4 text-left transition-all',
                  isSelected && 'border-primary ring-primary/60 ring-2',
                  isCurrentAnswered && 'cursor-not-allowed opacity-75'
                )}
              >
                <div
                  className={cn(
                    'border-input flex size-6 shrink-0 items-center justify-center rounded-full border',
                    isSelected && 'border-primary bg-primary text-primary-foreground'
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
