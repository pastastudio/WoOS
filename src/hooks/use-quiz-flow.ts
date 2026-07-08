'use client';

import { useQuizContext } from '@/context/quiz-context';
import { markChapterComplete } from '@/services/chapter-completion';
import { loadChapterQuestions } from '@/services/questions';
import type { Question, QuizPhase } from '@/types/quiz';
import { useEffect, useState } from 'react';

type UseQuizFlowOptions = {
  chapter: number | string;
  locale: 'de' | 'en';
  /** Chapters flow shows a results summary ("analyze") screen before completing. */
  withAnalyzePhase?: boolean;
  /** Chapters flow prevents changing/revisiting an already-answered question. */
  lockAnsweredQuestions?: boolean;
};

export function useQuizFlow({
  chapter,
  locale,
  withAnalyzePhase = false,
  lockAnsweredQuestions = false,
}: UseQuizFlowOptions) {
  const chapterNum = typeof chapter === 'string' ? parseInt(chapter, 10) : chapter;
  const { setState: setQuizState } = useQuizContext();

  const [technicalQuestions, setTechnicalQuestions] = useState<Question[]>([]);
  const [personalQuestions, setPersonalQuestions] = useState<Question[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const questionsKey = `${locale}:${chapterNum}`;
  const loading = loadedKey !== questionsKey;

  const [phase, setPhase] = useState<QuizPhase>('technical');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [technicalAnswers, setTechnicalAnswers] = useState<Record<number, string>>({});
  const [personalAnswers, setPersonalAnswers] = useState<Record<number, string>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;

    loadChapterQuestions(locale, chapterNum).then(data => {
      if (cancelled) return;
      setTechnicalQuestions(data?.questions ?? []);
      setPersonalQuestions(data?.analysis ?? []);
      setLoadedKey(questionsKey);
    });

    return () => {
      cancelled = true;
    };
  }, [locale, chapterNum, questionsKey]);

  const currentQuestions = phase === 'personal' ? personalQuestions : technicalQuestions;
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalInPhase = currentQuestions.length;

  const handleAnswerSelect = (optionKey: string) => {
    if (lockAnsweredQuestions && answeredQuestions.has(currentQuestionIndex)) return;
    setSelectedAnswer(optionKey);
  };

  const finish = async (finalTechnicalAnswers: Record<number, string>) => {
    setPhase('complete');
    setQuizState(prev => ({
      ...prev,
      chapter: chapterNum,
      locale,
      technicalQuestions,
      personalQuestions,
      technicalAnswers: finalTechnicalAnswers,
      personalAnswers,
      phase: 'complete',
    }));

    try {
      await markChapterComplete(chapterNum);
    } catch (error) {
      console.error('Failed to save chapter completion:', error);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (lockAnsweredQuestions) {
      setAnsweredQuestions(prev => new Set(prev).add(currentQuestionIndex));
    }

    if (phase === 'technical') {
      setTechnicalAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedAnswer }));
    } else if (phase === 'personal') {
      setPersonalAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedAnswer }));
    }

    if (currentQuestionIndex < totalInPhase - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      return;
    }

    if (phase === 'technical') {
      setPhase('transition');
      setSelectedAnswer(null);
      return;
    }

    if (phase === 'personal') {
      setSelectedAnswer(null);
      if (withAnalyzePhase) {
        setPhase('analyze');
      } else {
        finish(technicalAnswers);
      }
    }
  };

  const handleStartPersonalQuestions = () => {
    setPhase('personal');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    if (lockAnsweredQuestions) setAnsweredQuestions(new Set());
  };

  const handleCompleteAnalyze = () => {
    finish(technicalAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) return;
    if (lockAnsweredQuestions && answeredQuestions.has(currentQuestionIndex - 1)) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setSelectedAnswer(null);
  };

  return {
    loading,
    phase,
    chapter: chapterNum,
    technicalQuestions,
    personalQuestions,
    currentQuestion,
    currentQuestionIndex,
    totalInPhase,
    selectedAnswer,
    technicalAnswers,
    personalAnswers,
    isCurrentAnswered: lockAnsweredQuestions && answeredQuestions.has(currentQuestionIndex),
    isPreviousDisabled:
      currentQuestionIndex === 0 ||
      (lockAnsweredQuestions && answeredQuestions.has(currentQuestionIndex - 1)),
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    handleStartPersonalQuestions,
    handleCompleteAnalyze,
  };
}
