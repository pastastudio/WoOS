'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

type Translations = {
  loading: string;
  noQuestions: string;
  complete: string;
  completeMessage: string;
  transitionTitle: string;
  transitionMessage: string;
  startPersonal: string;
  progressLabel: string;
  technicalPhase: string;
  personalPhase: string;
  previous: string;
  next: string;
  finish: string;
  analyze: string;
  analyzeMessage: string;
  backToQuests: string;
};

/**
 * Quiz Page Component
 * Displays a four-phase quiz system for each chapter:
 * PHASE 1 - Technical Questions: questions to test knowledge
 * PHASE 2 - Transition screen: celebrate tech questions completion
 * PHASE 3 - Personal Questions: questions for user profiling/analysis
 * PHASE 4 - Analyze: show results before final completion
 */
export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { id, lang } = params as { id: string; lang: string };
  const chapter = id;
  const locale = lang as 'de' | 'en';

  // State: Questions loaded from JSON files
  const [questions, setQuestions] = useState<Question[]>([]);
  const [analysisQuestions, setAnalysisQuestions] = useState<Question[]>([]);

  // State: Translations loaded from JSON files
  const [t, setT] = useState<Translations | null>(null);

  // State: Current UI position
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // State: Quiz progress and completion
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  // State: Phase management
  const [phase, setPhase] = useState<
    'technical' | 'transition' | 'personal' | 'analyze'
  >('technical');

  // State: Answer storage for each phase
  const [technicalAnswers, setTechnicalAnswers] = useState<
    Record<number, string>
  >({});
  const [personalAnswers, setPersonalAnswers] = useState<
    Record<number, string>
  >({});

  // State: Track answered questions to prevent re-answering
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set(),
  );

  /**
   * Load questions and translations when component mounts
   */
  useEffect(() => {
    async function loadData() {
      try {
        // Load translations
        const tModule = await import(`@/i18n/${locale}/quests/quiz.json`);
        setT(tModule.default as Translations);

        // Load technical questions
        const questionsModule = await import(
          `@/i18n/${locale}/quests/questions/chapter_${chapter}.json`
        );
        const questionsData: QuestionsData = questionsModule.default;
        const questionsList = Object.values(questionsData);

        // Load personal/analysis questions
        const analysisModule = await import(
          `@/i18n/${locale}/quests/analysis/chapter_${chapter}.json`
        );
        const analysisData: QuestionsData = analysisModule.default;
        const analysisList = Object.values(analysisData);

        setQuestions(questionsList);
        setAnalysisQuestions(analysisList);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, [chapter, locale]);

  /**
   * Computed values based on current phase
   */
  const currentQuestions = phase === 'personal' ? analysisQuestions : questions;
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalInPhase = currentQuestions.length;

  /**
   * Handle user selecting an answer option
   */
  const handleAnswerSelect = (optionKey: string) => {
    // Prevent changing answer if question already answered
    if (!answeredQuestions.has(currentQuestionIndex)) {
      setSelectedAnswer(optionKey);
    }
  };

  /**
   * Handle moving to next question or completing phase
   */
  const handleNext = () => {
    if (selectedAnswer) {
      // Mark question as answered
      setAnsweredQuestions((prev) => new Set(prev).add(currentQuestionIndex));

      if (phase === 'technical') {
        setTechnicalAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: selectedAnswer,
        }));
      } else if (phase === 'personal') {
        setPersonalAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: selectedAnswer,
        }));
      }

      if (currentQuestionIndex < totalInPhase - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else if (phase === 'technical') {
        setPhase('transition');
        setSelectedAnswer(null);
      } else if (phase === 'personal') {
        setPhase('analyze');
        setSelectedAnswer(null);
      }
    }
  };

  /**
   * Handle starting personal questions
   */
  const handleStartPersonalQuestions = () => {
    setPhase('personal');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
  };

  /**
   * Handle completing the analyze phase
   */
  const handleCompleteAnalyze = () => {
    setIsComplete(true);
    saveAnswersToDatabase();
  };

  /**
   * Handle navigating to previous question (blocked if answered)
   */
  const handlePrevious = () => {
    if (
      currentQuestionIndex > 0 &&
      !answeredQuestions.has(currentQuestionIndex - 1)
    ) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  /**
   * Save answers to database and mark chapter as completed
   */
  const saveAnswersToDatabase = async () => {
    const quizAnswers = Object.entries(technicalAnswers).map(
      ([index, answer]) => ({
        questionIndex: parseInt(index),
        answer,
        chapter: parseInt(chapter),
      }),
    );

    const analysisAnswers = Object.entries(personalAnswers).map(
      ([index, answer]) => ({
        questionIndex: parseInt(index),
        answer,
        chapter: parseInt(chapter),
      }),
    );

    console.log('Quiz Answers (for scoring):', quizAnswers);
    console.log('Analysis Answers (for profiling):', analysisAnswers);

    // Save chapter completion to cookies
    try {
      const chapterNum = parseInt(chapter);
      // Get existing completed chapters from cookies
      const cookieResponse = await fetch('/api/chapters/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapter: chapterNum }),
      });

      if (cookieResponse.ok) {
        console.log(`Chapter ${chapterNum} marked as completed`);
      }
    } catch (error) {
      console.error('Failed to save chapter completion:', error);
    }

    // TODO: API call to save answers
  };

  // Loading state
  if (loading || !t) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-lg'>{t?.loading || 'Loading...'}</p>
      </div>
    );
  }

  // Completion state
  if (isComplete) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-6'>
        <h1 className='text-4xl font-bold'>{t.complete}</h1>
        <p className='text-muted-foreground max-w-md text-center'>
          {t.completeMessage
            .replace(
              '{total}',
              (questions.length + analysisQuestions.length).toString(),
            )
            .replace('{chapter}', chapter)}
        </p>
        <Button size='lg' onClick={() => router.push(`/${lang}/quests`)}>
          {t.backToQuests}
        </Button>
      </div>
    );
  }

  // Error state
  if (!currentQuestion && phase !== 'transition' && phase !== 'analyze') {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-lg'>{t.noQuestions}</p>
      </div>
    );
  }

  /**
   * Extract answer option keys
   */
  const optionKeys = Object.keys(currentQuestion?.options || {}).filter(
    (key) => !key.startsWith('_'),
  ) as Array<keyof QuestionOption>;

  /**
   * Transition screen
   */
  if (phase === 'transition') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-6'>
        <div className='border-primary/20 bg-primary/10 rounded-full border p-4'>
          <svg
            className='text-primary size-12'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h1 className='text-3xl font-bold'>{t.transitionTitle}</h1>
        <p className='text-muted-foreground max-w-md text-center'>
          {t.transitionMessage
            .replace('{technicalCount}', questions.length.toString())
            .replace('{personalCount}', analysisQuestions.length.toString())}
        </p>
        <Button size='lg' onClick={handleStartPersonalQuestions}>
          {t.startPersonal}
        </Button>
      </div>
    );
  }

  /**
   * Analyze screen
   */
  if (phase === 'analyze') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-8 px-6'>
        <div className='w-full max-w-3xl text-center'>
          <h1 className='mb-4 text-4xl font-bold'>{t.analyze}</h1>
          <p className='text-muted-foreground mb-8'>
            {t.analyzeMessage
              .replace('{technicalCount}', questions.length.toString())
              .replace('{personalCount}', analysisQuestions.length.toString())
              .replace('{chapter}', chapter)}
          </p>
        </div>

        {/* Answer Summary */}
        <Card className='w-full max-w-3xl p-8'>
          <h2 className='mb-6 text-2xl font-bold'>{t.technicalPhase}</h2>
          <div className='mb-8 space-y-2'>
            {questions.map((_, index) => (
              <div
                key={`tech-${index}`}
                className='text-muted-foreground flex items-center justify-between'
              >
                <span>
                  {t.progressLabel
                    .replace('{current}', (index + 1).toString())
                    .replace('{total}', questions.length.toString())}
                </span>
                <span className='text-primary font-medium'>
                  {technicalAnswers[index]
                    ? technicalAnswers[index].toUpperCase()
                    : '—'}
                </span>
              </div>
            ))}
          </div>

          <h2 className='mt-8 mb-6 text-2xl font-bold'>{t.personalPhase}</h2>
          <div className='space-y-2'>
            {analysisQuestions.map((_, index) => (
              <div
                key={`personal-${index}`}
                className='text-muted-foreground flex items-center justify-between'
              >
                <span>
                  {t.progressLabel
                    .replace('{current}', (index + 1).toString())
                    .replace('{total}', analysisQuestions.length.toString())}
                </span>
                <span className='text-primary font-medium'>
                  {personalAnswers[index]
                    ? personalAnswers[index].toUpperCase()
                    : '—'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Button
          size='lg'
          onClick={handleCompleteAnalyze}
          className='min-w-[200px]'
        >
          {t.finish}
        </Button>
      </div>
    );
  }

  /**
   * Main quiz interface
   */
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12'>
      {/* Progress indicator */}
      <div className='w-full max-w-3xl'>
        <div className='mb-2 flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>
            {t.progressLabel
              .replace('{current}', (currentQuestionIndex + 1).toString())
              .replace('{total}', totalInPhase.toString())}
          </span>
          <span className='font-medium'>
            {phase === 'technical' ? t.technicalPhase : t.personalPhase}
          </span>
        </div>
        <div className='bg-muted h-2 w-full overflow-hidden rounded-full'>
          <div
            className='bg-primary h-full transition-all duration-300'
            style={{
              width: `${((currentQuestionIndex + 1) / totalInPhase) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <Card className='w-full max-w-3xl p-8'>
        <h2 className='mb-8 text-2xl leading-tight font-bold'>
          {currentQuestion._title}
        </h2>

        {/* Answer options */}
        <div className='flex flex-col gap-4'>
          {optionKeys.map((optionKey) => {
            const isSelected = selectedAnswer === optionKey;
            const isAnswered = answeredQuestions.has(currentQuestionIndex);
            return (
              <button
                key={optionKey}
                onClick={() => handleAnswerSelect(optionKey)}
                disabled={isAnswered}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground border-input flex items-start gap-4 rounded-lg border p-4 text-left transition-all',
                  isSelected && 'border-primary ring-primary/60 ring-2',
                  isAnswered && 'cursor-not-allowed opacity-75',
                )}
              >
                <div
                  className={cn(
                    'border-input flex size-6 shrink-0 items-center justify-center rounded-full border',
                    isSelected && 'border-primary bg-primary text-white',
                  )}
                >
                  {isSelected && (
                    <svg
                      className='size-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='flex-1'>
                  {currentQuestion.options[optionKey]}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Navigation buttons */}
      <div className='flex w-full max-w-3xl items-center justify-between'>
        <Button
          variant='outline'
          size='lg'
          onClick={handlePrevious}
          disabled={
            currentQuestionIndex === 0 ||
            answeredQuestions.has(currentQuestionIndex - 1)
          }
        >
          {t.previous}
        </Button>
        <Button
          size='lg'
          onClick={handleNext}
          disabled={!selectedAnswer}
          className='min-w-[120px]'
        >
          {currentQuestionIndex === totalInPhase - 1 ? t.finish : t.next}
        </Button>
      </div>
    </div>
  );
}
