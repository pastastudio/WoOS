import { Button } from '@/components/ui/button';
import type { QuizFlowLabels } from '@/types/quiz';

import { fillLabel } from '../fill-label';

interface TransitionPhaseProps {
  labels: QuizFlowLabels;
  technicalCount: number;
  personalCount: number;
  onStartPersonalQuestions: () => void;
}

export function TransitionPhase({
  labels,
  technicalCount,
  personalCount,
  onStartPersonalQuestions,
}: TransitionPhaseProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="border-primary/20 bg-primary/10 rounded-full border p-4">
        <svg className="text-primary size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        {fillLabel(labels.transitionMessage, { technicalCount, personalCount })}
      </p>
      <Button size="lg" onClick={onStartPersonalQuestions}>
        {labels.startPersonal}
      </Button>
    </div>
  );
}
