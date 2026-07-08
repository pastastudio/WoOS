export type QuestionOption = {
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

export type Question = {
  _title: string;
  options: QuestionOption;
};

export type QuestionsData = Record<string, Question>;

export type QuizPhase = 'technical' | 'transition' | 'personal' | 'analyze' | 'complete';

export type QuizFlowLabels = {
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
