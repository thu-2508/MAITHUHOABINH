export interface StudentProfile {
  fullName: string;
  className: string;
  school: string;
}

export type QuestionLevel = 'Recognize' | 'Understand' | 'Apply';
export type QuestionCategory = 'regular' | 'irregular' | 'negative' | 'question' | 'tobe' | 'multi';

export interface QuestionSegment {
  text?: string;
  isBlank?: boolean;
  blankIndex?: number;
  cue?: string;
  placeholder?: string;
}

export interface QuestionItem {
  id: number;
  level: QuestionLevel;
  levelVi: string;
  category: QuestionCategory;
  categoryLabel: string;
  rawSentence: string;
  cueLabel: string; // e.g. "(visit)" or "(not watch)"
  segments: QuestionSegment[];
  expectedAnswers: string[][]; // For each blankIndex: list of valid normalized variations
  spokenSentence: string;
  vietnameseHint: string;
  explanation: string;
}

export interface QuestionResult {
  questionId: number;
  initialAnswers: string[];
  initialIsCorrect: boolean;
  initialTimedOut: boolean;
  reviewAnswers?: string[];
  reviewIsCorrect?: boolean;
  reviewTimedOut?: boolean;
  finalIsCorrect: boolean;
}

export type PerformanceLevel = 
  | 'Outstanding'
  | 'Excellent'
  | 'Good'
  | 'Keep Practising'
  | 'More Practice Needed';
