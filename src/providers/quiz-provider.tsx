'use client';

import { initialQuizState, QuizContext, type QuizState } from '@/context/quiz-context';
import { useState } from 'react';

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QuizState>(initialQuizState);

  return <QuizContext.Provider value={{ state, setState }}>{children}</QuizContext.Provider>;
}
