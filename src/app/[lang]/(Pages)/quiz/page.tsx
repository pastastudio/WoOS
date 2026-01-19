'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Quiz Page Component
 *
 * Displays a two-phase quiz system for each chapter:
 * PHASE 1 - Technical Questions: 5 questions to test knowledge (scored for correctness)
 * PHASE 2 - Personal Questions: 3 questions for user profiling/analysis
 *
 * Flow:
 * 1. Load questions from JSON files based on chapter parameter
 * 2. Show technical questions one by one
 * 3. Display transition screen after technical questions complete
 * 4. Show personal questions one by one
 * 5. Save all answers to database and show completion screen
 */

/**
 * Type for answer options in a question
 * - a, b, c, d, e: Display text for each option
 * - _a, _b, _c, _d, _e: Metadata (correct answer ID or analysis category)
 */
type QuestionOption = {
  a: string;
  b: string;
  c: string;
  d?: string;
  e?: string;
  _a: string; // Correct answer identifier or analysis mapping
  _b: string;
  _c: string;
  _d?: string;
  _e?: string;
};

/**
 * Type for a single question
 * - _title: The question text
 * - options: Available answer choices
 */
type Question = {
  _title: string;
  options: QuestionOption;
};

/**
 * Type for the raw JSON structure of questions
 * Maps question IDs to Question objects
 */
type QuestionsData = Record<string, Question>;

export default function QuizPage() {
  // Get chapter number from URL query parameter (e.g., /quiz?chapter=1)
  const searchParams = useSearchParams();
  const chapter = searchParams.get('chapter') || '1';
  const locale = 'de'; // TODO: Get from cookies/context - determines language for questions

  // State: Questions loaded from JSON files
  const [questions, setQuestions] = useState<Question[]>([]); // Technical questions (5)
  const [analysisQuestions, setAnalysisQuestions] = useState<Question[]>([]); // Personal questions (3)

  // State: Current UI position
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index within the phase
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Currently selected answer option

  // State: Quiz progress and completion
  const [answers] = useState<Record<number, string>>({}); // Legacy - kept for backward compatibility
  const [isComplete, setIsComplete] = useState(false); // True when all questions answered
  const [loading, setLoading] = useState(true); // True while loading questions from JSON

  // State: Phase management (technical -> transition -> personal)
  const [phase, setPhase] = useState<'technical' | 'transition' | 'personal'>(
    'technical',
  );

  // State: Separate answer storage for each phase
  const [technicalAnswers, setTechnicalAnswers] = useState<
    Record<number, string>
  >({}); // Answers to technical questions
  const [personalAnswers, setPersonalAnswers] = useState<
    Record<number, string>
  >({}); // Answers to personal questions

  /**
   * Load questions when component mounts or chapter/locale changes
   * Dynamically imports JSON files based on selected chapter and locale
   */
  useEffect(() => {
    async function loadQuestions() {
      try {
        // Load technical questions from /i18n/{locale}/quests/questions/chapter_{N}.json
        const questionsModule = await import(
          `@/i18n/${locale}/quests/questions/chapter_${chapter}.json`
        );
        const questionsData: QuestionsData = questionsModule.default;
        const questionsList = Object.values(questionsData); // Convert object to array

        // Load personal/analysis questions from /i18n/{locale}/quests/analysis/chapter_{N}.json
        const analysisModule = await import(
          `@/i18n/${locale}/quests/analysis/chapter_${chapter}.json`
        );
        const analysisData: QuestionsData = analysisModule.default;
        const analysisList = Object.values(analysisData); // Convert object to array

        // Store both question sets in state
        setQuestions(questionsList);
        setAnalysisQuestions(analysisList);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setLoading(false);
      }
    }

    loadQuestions();
  }, [chapter, locale]); // Re-run when chapter or locale changes

  /**
   * Computed values based on current phase
   * - During 'technical' phase: show technical questions
   * - During 'personal' phase: show personal/analysis questions
   * - During 'transition' phase: show transition screen (no questions)
   */
  const currentQuestions = phase === 'personal' ? analysisQuestions : questions;
  const currentQuestion = currentQuestions[currentQuestionIndex]; // Current question to display
  const totalInPhase = currentQuestions.length; // Total questions in current phase (5 or 3)

  /**
   * Handle user selecting an answer option
   * Updates the selected answer state to highlight the chosen option
   * @param optionKey - The key of the selected option (a, b, c, d, or e)
   */
  const handleAnswerSelect = (optionKey: string) => {
    setSelectedAnswer(optionKey);
  };

  /**
   * Handle moving to next question or completing phase
   *
   * Logic:
   * 1. Save current answer to appropriate state (technical or personal)
   * 2. Check if more questions remain in current phase
   *    - If yes: move to next question
   *    - If no & technical phase: show transition screen
   *    - If no & personal phase: complete quiz and save to database
   */
  const handleNext = () => {
    if (selectedAnswer) {
      // Save answer to appropriate answer storage based on current phase
      if (phase === 'technical') {
        // Technical phase: save to technicalAnswers state
        setTechnicalAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: selectedAnswer,
        }));
      } else {
        // Personal phase: save to personalAnswers state
        setPersonalAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: selectedAnswer,
        }));
      }

      // Determine next action based on current position and phase
      if (currentQuestionIndex < totalInPhase - 1) {
        // More questions in current phase: advance to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null); // Clear selection for new question
      } else if (phase === 'technical') {
        // Finished all technical questions: move to transition screen
        setPhase('transition');
        setSelectedAnswer(null);
      } else {
        // Finished all personal questions: complete quiz
        setIsComplete(true);
        saveAnswersToDatabase(); // Save all answers to database
      }
    }
  };

  /**
   * Handle user clicking 'Start Personal Questions' button on transition screen
   * Transitions from transition phase to personal phase and resets question index
   */
  const handleStartPersonalQuestions = () => {
    setPhase('personal'); // Switch to personal questions phase
    setCurrentQuestionIndex(0); // Reset to first personal question
    setSelectedAnswer(null); // Clear any previous selection
  };

  /**
   * Handle navigating to previous question
   * Restores the previously selected answer (if any)
   * Note: Previous navigation is disabled on transition screen
   */
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Go back one question
      // Restore previously selected answer (from legacy answers state)
      setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
    }
  };

  /**
   * Save answers to database
   * TODO: Implement actual API call to save answers
   * - First 5 answers: Regular quiz answers (check correctness)
   * - Last 3 answers: Analysis answers (for user profiling)
   */
  const saveAnswersToDatabase = async () => {
    // Convert technical and personal answers
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

    // TODO: API call to save answers
    // await fetch('/api/quiz/submit', {
    //   method: 'POST',
    //   body: JSON.stringify({ quizAnswers, analysisAnswers, chapter }),
    // });
  };

  // Loading state: Show while questions are being fetched from JSON files
  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-lg'>Loading questions...</p>
      </div>
    );
  }

  // Completion state: Show after all questions (technical + personal) are answered
  if (isComplete) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-6'>
        <h1 className='text-4xl font-bold'>Quiz Complete!</h1>
        <p className='text-muted-foreground max-w-md text-center'>
          You&apos;ve completed all{' '}
          {questions.length + analysisQuestions.length} questions for Chapter{' '}
          {chapter}. Your answers have been saved.
        </p>
        {/* Navigate back to quests page */}
        <Button size='lg' onClick={() => (window.location.href = '/quests')}>
          Back to Quests
        </Button>
      </div>
    );
  }

  // Error state: Show if no questions are loaded for current phase
  if (!currentQuestion) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-lg'>No questions available for this chapter.</p>
      </div>
    );
  }

  /**
   * Extract answer option keys from current question
   * Filters out keys starting with '_' (which are metadata)
   * Result: ['a', 'b', 'c'] or ['a', 'b', 'c', 'd', 'e'] depending on question
   */
  const optionKeys = Object.keys(currentQuestion.options).filter(
    (key) => !key.startsWith('_'),
  ) as Array<keyof QuestionOption>;

  /**
   * Transition screen: Shown after completing all technical questions
   * Congratulates user and prompts them to continue to personal questions
   * This creates a clear mental break between the two question types
   */
  if (phase === 'transition') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-6'>
        <div className='bg-primary/10 border-primary/20 rounded-full border p-4'>
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
        <h1 className='text-3xl font-bold'>Technical Questions Complete!</h1>
        <p className='text-muted-foreground max-w-md text-center'>
          Great job! You&apos;ve answered all {questions.length} technical
          questions. Now let&apos;s move on to {analysisQuestions.length}{' '}
          personal questions to help us understand your preferences better.
        </p>
        <Button size='lg' onClick={handleStartPersonalQuestions}>
          Start Personal Questions
        </Button>
      </div>
    );
  }

  /**
   * Main quiz interface
   * Shows current question with answer options and navigation
   */
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12'>
      {/* Progress indicator: Shows current position within phase and phase type */}
      <div className='w-full max-w-3xl'>
        <div className='mb-2 flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>
            Question {currentQuestionIndex + 1} of {totalInPhase}
          </span>
          <span className='font-medium'>
            {phase === 'technical'
              ? ' Technical Questions'
              : ' Personal Questions'}
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
            return (
              <button
                key={optionKey}
                onClick={() => handleAnswerSelect(optionKey)}
                className={cn(
                  'border-input hover:bg-accent hover:text-accent-foreground flex items-start gap-4 rounded-lg border p-4 text-left transition-all',
                  isSelected && 'ring-primary/60 border-primary ring-2',
                )}
              >
                <div
                  className={cn(
                    'border-input flex size-6 shrink-0 items-center justify-center rounded-full border',
                    isSelected && 'bg-primary border-primary text-white',
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
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          size='lg'
          onClick={handleNext}
          disabled={!selectedAnswer}
          className='min-w-[120px]'
        >
          {currentQuestionIndex === totalInPhase - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
