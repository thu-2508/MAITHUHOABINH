import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Clock, Check, Volume2 } from 'lucide-react';
import { QuestionItem, QuestionResult } from '../types';
import { speakText } from '../utils/speech';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionItem[];
  results: Record<number, QuestionResult>;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  questions,
  results,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredQuestions = questions.filter((q) => {
    const res = results[q.id];
    const isCorrect = res ? res.finalIsCorrect : false;
    if (filter === 'correct') return isCorrect;
    if (filter === 'incorrect') return !isCorrect;
    return true;
  });

  const handleSpeak = (q: QuestionItem) => {
    setSpeakingId(q.id);
    speakText(q.spokenSentence, () => {
      setSpeakingId(null);
    });
  };

  return (
    <div
      id="review-answers-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f1325] border-2 border-purple-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Full Answer Review (50 Questions)
            </h2>
            <p className="text-xs text-purple-300">
              Check all correct answers and explanations for past simple verbs
            </p>
          </div>
          <button
            id="btn-close-review-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 my-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All (50)
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Correct</span>
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Needs Practice</span>
          </button>
        </div>

        {/* Scrollable Questions list */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
          {filteredQuestions.map((q) => {
            const res = results[q.id];
            const isCorrect = res ? res.finalIsCorrect : false;
            const isTimeout = res ? (res.initialTimedOut && !res.reviewIsCorrect) : false;
            const answersGiven = res ? (res.reviewAnswers || res.initialAnswers || []) : [];

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500/70'
                    : isTimeout
                    ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70'
                    : 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-extrabold text-slate-200">
                      Q{q.id}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      [{q.level}] {q.categoryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(q)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        speakingId === q.id
                          ? 'bg-cyan-500 text-white border-cyan-400 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-cyan-300'
                      }`}
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        <Check className="w-3.5 h-3.5" /> Correct (+10)
                      </span>
                    ) : isTimeout ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                        <Clock className="w-3.5 h-3.5" /> Timed Out
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/30">
                        <X className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                {/* Question sentence */}
                <p className="text-sm sm:text-base font-semibold text-slate-100 mb-2">
                  {q.rawSentence}
                </p>

                {/* Answers summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Your Answer:</span>
                    <span className={`font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {answersGiven.length > 0 && answersGiven.some(Boolean)
                        ? answersGiven.join(' | ')
                        : '(No answer provided)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Expected Answer:</span>
                    <span className="font-bold text-cyan-300">
                      {q.expectedAnswers.map((g) => g.join(' hoặc ')).join(' | ')}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs text-purple-300 mt-2 pl-1 border-l-2 border-purple-500">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-purple-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};
