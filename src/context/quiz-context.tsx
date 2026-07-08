'use client';

import type { Question, QuizPhase } from '@/types/quiz';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type QuizState = {
  chapter: number | null;
  locale: 'de' | 'en';
  technicalQuestions: Question[];
  personalQuestions: Question[];
  technicalAnswers: Record<number, string>;
  personalAnswers: Record<number, string>;
  phase: QuizPhase;
};

export const initialQuizState: QuizState = {
  chapter: null,
  locale: 'en',
  technicalQuestions: [],
  personalQuestions: [],
  technicalAnswers: {},
  personalAnswers: {},
  phase: 'technical',
};

type QuizContextValue = {
  state: QuizState;
  setState: Dispatch<SetStateAction<QuizState>>;
};

export const QuizContext = createContext<QuizContextValue | null>(null);

export function useQuizContext(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
}
