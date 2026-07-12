import { Button } from '@/components/ui/button';
import type { QuizFlowLabels } from '@/types/quiz';

import { fillLabel } from '../fill-label';

interface CompletePhaseProps {
  labels: QuizFlowLabels;
  totalQuestions: number;
  chapter: number;
  onBackToQuests: () => void;
  onViewAnalysis: () => void;
}

export function CompletePhase({
  labels,
  totalQuestions,
  chapter,
  onBackToQuests,
  onViewAnalysis,
}: CompletePhaseProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <h1 className="text-4xl font-bold">{labels.complete}</h1>
      <p className="text-muted-foreground max-w-md text-center">
        {fillLabel(labels.completeMessage, { total: totalQuestions, chapter })}
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
