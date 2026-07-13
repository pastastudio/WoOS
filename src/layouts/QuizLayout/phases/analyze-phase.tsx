import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Question, QuizFlowLabels } from '@/types/quiz';

import { fillLabel } from '../fill-label';

interface AnalyzePhaseProps {
  labels: QuizFlowLabels;
  chapter: number;
  technicalQuestions: Question[];
  personalQuestions: Question[];
  technicalAnswers: Record<number, string>;
  personalAnswers: Record<number, string>;
  onCompleteAnalyze: () => void;
}

export function AnalyzePhase({
  labels,
  chapter,
  technicalQuestions,
  personalQuestions,
  technicalAnswers,
  personalAnswers,
  onCompleteAnalyze,
}: AnalyzePhaseProps) {
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
