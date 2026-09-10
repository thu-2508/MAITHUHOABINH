import React, { useEffect, useRef } from 'react';
import { Volume2, Send, CheckCircle, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { QuestionItem } from '../types';
import { TutorMascot } from './TutorMascot';

interface QuestionCardProps {
  question: QuestionItem;
  currentNumber: number;
  userAnswers: string[];
  onChangeAnswer: (blankIndex: number, val: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  isSubmitted: boolean;
  submissionState: 'idle' | 'correct' | 'wrong' | 'timeout';
  praiseMessage?: string;
  isSpeaking: boolean;
  onSpeak: () => void;
  isReviewMode?: boolean;
  validationWarning?: string | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentNumber,
  userAnswers,
  onChangeAnswer,
  onSubmit,
  onNext,
  isSubmitted,
  submissionState,
  praiseMessage,
  isSpeaking,
  onSpeak,
  isReviewMode = false,
  validationWarning,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto focus first blank on question change
  useEffect(() => {
    if (!isSubmitted) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [question.id, isSubmitted]);

  // Handle Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, blankIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const totalBlanks = question.expectedAnswers.length;
      if (blankIndex < totalBlanks - 1) {
        // Focus next blank
        inputRefs.current[blankIndex + 1]?.focus();
      } else {
        // Submit
        onSubmit();
      }
    }
  };

  // Border & Glow styling based on submission state
  let cardBorder = 'border-purple-500/30 hover:border-purple-500/50';
  let cardShadow = 'shadow-[0_0_40px_rgba(147,51,234,0.15)]';
  let mascotMood: 'idle' | 'speaking' | 'correct' | 'wrong' | 'hurry' | 'victory' = 'idle';

  if (isSpeaking) {
    mascotMood = 'speaking';
  } else if (submissionState === 'correct') {
    cardBorder = 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)] ring-2 ring-emerald-400/50';
    mascotMood = 'correct';
  } else if (submissionState === 'wrong') {
    cardBorder = 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)] ring-2 ring-rose-400/50';
    mascotMood = 'wrong';
  } else if (submissionState === 'timeout') {
    cardBorder = 'border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.3)]';
    mascotMood = 'wrong';
  }

  return (
    <div
      id={`question-card-${question.id}`}
      className={`w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#14182b]/95 via-[#101424]/95 to-[#0b0e1b]/95 backdrop-blur-xl border-2 ${cardBorder} ${cardShadow} p-5 sm:p-8 transition-all duration-300 relative overflow-hidden`}
    >
      {/* Decorative top corner neon bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

      {/* Header section of card */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-2xl bg-purple-600/30 border border-purple-500/50 text-purple-200 font-extrabold text-sm tracking-wide shadow-sm">
            Question {currentNumber}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
            {question.categoryLabel}
          </span>
        </div>

        {/* Speaker button */}
        <button
          id={`btn-speak-${question.id}`}
          onClick={onSpeak}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            isSpeaking
              ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-pulse'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-700/80 shadow-sm'
          }`}
          title="Listen to question (UK/US English)"
        >
          <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-cyan-300 animate-bounce' : 'text-slate-400'}`} />
          <span>{isSpeaking ? 'Reading...' : 'Listen'}</span>
        </button>
      </div>

      {/* Vietnamese hint in Review Round */}
      {isReviewMode && question.vietnameseHint && (
        <div
          id="review-hint-box"
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border-2 border-amber-500/50 text-amber-200 flex items-start gap-3 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-fade-in"
        >
          <Lightbulb className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-0.5">
              Review Round Hint:
            </div>
            <p className="text-sm sm:text-base font-medium leading-relaxed">
              {question.vietnameseHint}
            </p>
          </div>
        </div>
      )}

      {/* Main interactive sentence display */}
      <div className="my-6 p-6 sm:p-8 rounded-2xl bg-[#0d1020]/90 border border-purple-500/20 shadow-inner">
        <div className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-3 flex items-center gap-2">
          <span>Give the correct form of the verbs in brackets:</span>
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed flex flex-wrap items-center gap-2.5">
          {question.segments.map((seg, idx) => {
            if (seg.isBlank && seg.blankIndex !== undefined) {
              const bIndex = seg.blankIndex;
              const val = userAnswers[bIndex] || '';

              let inputBorder = 'border-purple-400/40 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 bg-slate-900/80';
              if (submissionState === 'correct') {
                inputBorder = 'border-emerald-500 bg-emerald-950/30 text-emerald-300 ring-2 ring-emerald-500/40';
              } else if (submissionState === 'wrong' || submissionState === 'timeout') {
                inputBorder = 'border-rose-500 bg-rose-950/30 text-rose-300 ring-2 ring-rose-500/40';
              }

              return (
                <span key={idx} className="inline-flex flex-col items-center my-1.5 mt-3">
                  <span className="relative">
                    <input
                      id={`blank-input-${question.id}-${bIndex}`}
                      ref={(el) => {
                        inputRefs.current[bIndex] = el;
                        if (bIndex === 0) (firstInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                      }}
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      disabled={isSubmitted}
                      value={val}
                      onChange={(e) => onChangeAnswer(bIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, bIndex)}
                      placeholder={seg.placeholder || 'Type here...'}
                      className={`min-w-[130px] sm:min-w-[160px] max-w-[220px] px-3.5 py-2 text-center text-lg sm:text-2xl font-bold rounded-xl border-2 text-cyan-200 placeholder-slate-600 transition-all outline-none ${inputBorder}`}
                    />
                    {/* Verb in brackets with font-size 16 */}
                    {seg.cue && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-purple-900/95 border border-purple-400/50 text-[16px] font-bold text-purple-200 rounded-lg shadow-md whitespace-nowrap z-10">
                        ({seg.cue})
                      </span>
                    )}
                  </span>
                </span>
              );
            }

            // If text contains bracketed verb, ensure it also has font size 16
            if (seg.text && seg.text.includes('(') && seg.text.includes(')')) {
              const parts = seg.text.split(/(\([^)]+\))/g);
              return (
                <span key={idx} className="inline">
                  {parts.map((part, pIdx) => {
                    if (part.startsWith('(') && part.endsWith(')')) {
                      return (
                        <span key={pIdx} className="text-[16px] font-bold text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded-lg border border-purple-400/40 inline-block align-middle mx-1">
                          {part}
                        </span>
                      );
                    }
                    return <span key={pIdx}>{part}</span>;
                  })}
                </span>
              );
            }

            return (
              <span key={idx} className="inline">
                {seg.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Validation warning */}
      {validationWarning && (
        <div
          id="blank-warning-banner"
          className="mb-4 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-sm font-semibold flex items-center gap-2 animate-bounce"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{validationWarning}</span>
        </div>
      )}

      {/* Feedback banner after submit */}
      {isSubmitted && (
        <div className="mb-6 animate-fade-in">
          {submissionState === 'correct' && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500 text-emerald-200 flex items-center justify-between gap-4 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-emerald-300">
                    {praiseMessage || 'Excellent!'} (+10 Points)
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {submissionState === 'wrong' && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-500 text-rose-200 flex items-center justify-between gap-4 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 text-2xl">
                  🥺
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-rose-300">
                    {isReviewMode
                      ? 'Incorrect in Review Round.'
                      : 'Not quite. You can try this question again in the Review Round.'}
                  </h4>
                  {isReviewMode && (
                    <div className="mt-1.5 text-xs sm:text-sm text-slate-200 bg-black/40 p-2.5 rounded-lg border border-rose-500/30">
                      <span className="font-bold text-yellow-300">Đáp án đúng: </span>
                      <span className="font-bold text-cyan-300">
                        {question.expectedAnswers.map((g) => g[0]).join(' | ')}
                      </span>
                      <div className="mt-1 text-slate-300">{question.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {submissionState === 'timeout' && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500 text-amber-200 flex items-center gap-3 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 text-2xl">
                ⏰
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-amber-300">
                  Time’s up! You can try this question again later.
                </h4>
                {isReviewMode && (
                  <div className="mt-1.5 text-xs sm:text-sm text-slate-200 bg-black/40 p-2.5 rounded-lg border border-amber-500/30">
                    <span className="font-bold text-yellow-300">Đáp án đúng: </span>
                    <span className="font-bold text-cyan-300">
                      {question.expectedAnswers.map((g) => g[0]).join(' | ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-500/20">
        <TutorMascot
          mood={mascotMood}
          message={
            isSubmitted
              ? submissionState === 'correct'
                ? 'Spot on! Fantastic grammar skills!'
                : 'Keep going! Every mistake is a learning step.'
              : 'Read the cue verb in brackets carefully.'
          }
          size="sm"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {!isSubmitted ? (
            <button
              id="btn-submit-answer"
              onClick={onSubmit}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-white font-extrabold text-base tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Answer</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="btn-next-question"
              onClick={onNext}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-base tracking-wide shadow-[0_0_25px_rgba(217,70,239,0.5)] transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
