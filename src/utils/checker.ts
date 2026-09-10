import { QuestionItem } from '../types';

/**
 * Normalizes user answer text:
 * - lowercase
 * - trim whitespace
 * - replace curly/grave/acute apostrophes with straight apostrophe
 * - collapse multiple consecutive spaces to a single space
 */
export function normalizeAnswer(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/\s+/g, ' ');
}

/**
 * Checks whether an answer for a specific blank matches any expected variation.
 */
export function checkBlankAnswer(userInput: string, expectedVariations: string[]): boolean {
  const normUser = normalizeAnswer(userInput);
  if (!normUser) return false;

  return expectedVariations.some((exp) => {
    const normExp = normalizeAnswer(exp);
    return normUser === normExp;
  });
}

/**
 * Validates all blanks for a question.
 * Returns true if ALL blanks are completely filled and match expected answers.
 */
export function checkQuestionAnswers(question: QuestionItem, userAnswers: string[]): {
  isAllFilled: boolean;
  isCorrect: boolean;
  blankResults: boolean[];
} {
  const blankCount = question.expectedAnswers.length;
  const blankResults: boolean[] = [];
  let isAllFilled = true;

  for (let i = 0; i < blankCount; i++) {
    const rawVal = userAnswers[i] || '';
    const normVal = normalizeAnswer(rawVal);
    if (!normVal) {
      isAllFilled = false;
    }
    const match = checkBlankAnswer(rawVal, question.expectedAnswers[i]);
    blankResults.push(match);
  }

  const isCorrect = isAllFilled && blankResults.every(Boolean);

  return {
    isAllFilled,
    isCorrect,
    blankResults
  };
}
