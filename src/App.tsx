/**
 * SMART ENGLISH TUTOR - PAST SIMPLE VERB CHALLENGE
 * Teacher: VŨ THỊ MAI THU
 * English for Grades 6, 7, 8 and 9
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw } from 'lucide-react';
import {
  StudentProfile,
  QuestionResult,
  PerformanceLevel,
} from './types';
import { QUESTIONS } from './data/questions';
import { checkQuestionAnswers } from './utils/checker';
import { getPerformanceLevel } from './utils/feedback';
import { sound } from './utils/audio';
import { speakText, stopSpeaking, registerSpeakingListener } from './utils/speech';

import { HeaderBar } from './components/HeaderBar';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { InstructionModal } from './components/InstructionModal';
import { ResultScreen } from './components/ResultScreen';
import { CertificateModal } from './components/CertificateModal';
import { ReviewModal } from './components/ReviewModal';

const PRAISES = [
  'Excellent!',
  'Great job!',
  'Well done!',
  'Amazing!',
  'Perfect answer!'
];

type GamePhase = 'START' | 'PLAYING' | 'REVIEW_INTRO' | 'REVIEW_PLAYING' | 'RESULT';

const LOCAL_STORAGE_KEY = 'smart_english_tutor_save_v1';

export default function App() {
  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.student) return parsed.student;
      }
    } catch {
      // Ignore
    }
    return { fullName: '', className: '', school: '' };
  });

  // Game state
  const [phase, setPhase] = useState<GamePhase>('START');
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 0 to 49
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(50);
  const [initialScore, setInitialScore] = useState<number>(0);
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [results, setResults] = useState<Record<number, QuestionResult>>({});
  
  // Submission state for currently displayed question
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'correct' | 'wrong' | 'timeout'>('idle');
  const [praiseMessage, setPraiseMessage] = useState<string>('Excellent!');
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  // Review round queue: array of question IDs needing review
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);
  const [reviewQueueIndex, setReviewQueueIndex] = useState<number>(0);

  // Modals
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [showReviewAnswers, setShowReviewAnswers] = useState<boolean>(false);

  // Sound & Speech
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const autoAdvanceRef = useRef<number | null>(null);

  // Completion Date
  const [completionDate, setCompletionDate] = useState<string>(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  });

  // Keep speech speaking state updated
  useEffect(() => {
    const unregister = registerSpeakingListener((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => {
      unregister();
      stopSpeaking();
    };
  }, []);

  // Save student info into localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          student,
        })
      );
    } catch {
      // Ignore
    }
  }, [student]);

  // Total current score
  const totalScore = Math.min(500, initialScore + reviewScore);
  const percentage = (totalScore / 500) * 100;
  const performanceLevel: PerformanceLevel = getPerformanceLevel(percentage);

  // Determine current active question
  const isReviewMode = phase === 'REVIEW_PLAYING';
  const currentQuestion = isReviewMode
    ? QUESTIONS.find((q) => q.id === reviewQueue[reviewQueueIndex]) || QUESTIONS[0]
    : QUESTIONS[currentIndex] || QUESTIONS[0];

  const currentDisplayNumber = isReviewMode
    ? currentQuestion.id
    : currentIndex + 1;

  // Clear running timer
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoAdvanceRef.current !== null) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  // Move to next question or complete round
  const handleNextQuestion = useCallback(() => {
    clearTimer();
    stopSpeaking();
    setIsSubmitted(false);
    setSubmissionState('idle');
    setValidationWarning(null);
    setUserAnswers([]);

    if (phase === 'PLAYING') {
      if (currentIndex < QUESTIONS.length - 1) {
        // Next standard question
        setCurrentIndex((prev) => prev + 1);
        setTimeRemaining(50);
      } else {
        // Initial round completed!
        // Check if there are questions for Review Round
        const failedIds: number[] = [];
        QUESTIONS.forEach((q) => {
          const r = results[q.id];
          if (!r || !r.initialIsCorrect) {
            failedIds.push(q.id);
          }
        });

        if (failedIds.length > 0) {
          setReviewQueue(failedIds);
          setReviewQueueIndex(0);
          setPhase('REVIEW_INTRO');
        } else {
          // Perfect score in initial round!
          setPhase('RESULT');
        }
      }
    } else if (phase === 'REVIEW_PLAYING') {
      if (reviewQueueIndex < reviewQueue.length - 1) {
        // Next review question
        setReviewQueueIndex((prev) => prev + 1);
        setTimeRemaining(50);
      } else {
        // Review round completed!
        setPhase('RESULT');
      }
    }
  }, [clearTimer, currentIndex, phase, results, reviewQueue, reviewQueueIndex]);

  // Handle Timeout (50s expired)
  const handleTimeout = useCallback(() => {
    clearTimer();
    setIsSubmitted(true);
    setSubmissionState('timeout');
    sound.playIncorrect();

    const qId = currentQuestion.id;
    setResults((prev) => {
      const existing = prev[qId];
      if (isReviewMode) {
        return {
          ...prev,
          [qId]: {
            ...existing,
            reviewAnswers: userAnswers,
            reviewIsCorrect: false,
            reviewTimedOut: true,
            finalIsCorrect: false,
          },
        };
      } else {
        return {
          ...prev,
          [qId]: {
            questionId: qId,
            initialAnswers: userAnswers,
            initialIsCorrect: false,
            initialTimedOut: true,
            finalIsCorrect: false,
          },
        };
      }
    });

    // Auto advance after 2s
    autoAdvanceRef.current = window.setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  }, [clearTimer, currentQuestion.id, handleNextQuestion, isReviewMode, userAnswers]);

  // Start 50s clock whenever active question resets
  useEffect(() => {
    if ((phase === 'PLAYING' || phase === 'REVIEW_PLAYING') && !isSubmitted) {
      clearTimer();
      setTimeRemaining(50);

      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }

          // Sound warning at 5 seconds
          if (prev === 6) {
            sound.playTimeWarning();
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimer();
    };
  }, [currentIndex, reviewQueueIndex, phase, isSubmitted, clearTimer, handleTimeout]);

  // Handle Input Changes
  const handleAnswerChange = (blankIndex: number, val: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[blankIndex] = val;
      return copy;
    });
    if (validationWarning) {
      setValidationWarning(null);
    }
  };

  // Submit Answer
  const handleSubmit = () => {
    if (isSubmitted) return;

    // Check all blanks are filled
    const check = checkQuestionAnswers(currentQuestion, userAnswers);
    if (!check.isAllFilled) {
      setValidationWarning('Please complete all blanks before submitting.');
      return;
    }

    clearTimer();
    setIsSubmitted(true);
    setValidationWarning(null);

    const qId = currentQuestion.id;
    const isCorrect = check.isCorrect;

    if (isCorrect) {
      setSubmissionState('correct');
      sound.playCorrect();
      
      // Sparkle / confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      const randomPraise = PRAISES[Math.floor(Math.random() * PRAISES.length)];
      setPraiseMessage(randomPraise);

      if (isReviewMode) {
        setReviewScore((prev) => prev + 10);
      } else {
        setInitialScore((prev) => prev + 10);
      }

      setResults((prev) => {
        const existing = prev[qId];
        if (isReviewMode) {
          return {
            ...prev,
            [qId]: {
              ...existing,
              reviewAnswers: userAnswers,
              reviewIsCorrect: true,
              reviewTimedOut: false,
              finalIsCorrect: true,
            },
          };
        } else {
          return {
            ...prev,
            [qId]: {
              questionId: qId,
              initialAnswers: userAnswers,
              initialIsCorrect: true,
              initialTimedOut: false,
              finalIsCorrect: true,
            },
          };
        }
      });

      // Auto advance after 1.8 seconds
      autoAdvanceRef.current = window.setTimeout(() => {
        handleNextQuestion();
      }, 1800);
    } else {
      setSubmissionState('wrong');
      sound.playIncorrect();

      setResults((prev) => {
        const existing = prev[qId];
        if (isReviewMode) {
          return {
            ...prev,
            [qId]: {
              ...existing,
              reviewAnswers: userAnswers,
              reviewIsCorrect: false,
              reviewTimedOut: false,
              finalIsCorrect: false,
            },
          };
        } else {
          return {
            ...prev,
            [qId]: {
              questionId: qId,
              initialAnswers: userAnswers,
              initialIsCorrect: false,
              initialTimedOut: false,
              finalIsCorrect: false,
            },
          };
        }
      });

      // Auto advance after 2 seconds
      autoAdvanceRef.current = window.setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  };

  // Sound Toggle
  const handleToggleSound = () => {
    const updated = sound.toggleSound();
    setSoundEnabled(updated);
  };

  // Read current question via speech
  const handleSpeakCurrentQuestion = () => {
    speakText(currentQuestion.spokenSentence);
  };

  // Start initial game round after instructions
  const handleStartGameFromModal = () => {
    setShowInstructions(false);
    setCurrentIndex(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    setSubmissionState('idle');
    setInitialScore(0);
    setReviewScore(0);
    setResults({});
    setTimeRemaining(50);
    setPhase('PLAYING');
    sound.startBgm();
  };

  // Start Review Round
  const handleStartReviewPlaying = () => {
    setReviewQueueIndex(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    setSubmissionState('idle');
    setTimeRemaining(50);
    setPhase('REVIEW_PLAYING');
  };

  // Play Again: keeps student info, resets game
  const handlePlayAgain = () => {
    clearTimer();
    stopSpeaking();
    setCurrentIndex(0);
    setReviewQueue([]);
    setReviewQueueIndex(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    setSubmissionState('idle');
    setInitialScore(0);
    setReviewScore(0);
    setResults({});
    setTimeRemaining(50);
    setPhase('START');
  };

  return (
    <div className="min-h-screen bg-[#090D1A] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative">
      {/* Background ambient neon meshes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[150px]" />
      </div>

      {/* Header Bar during gameplay */}
      {(phase === 'PLAYING' || phase === 'REVIEW_PLAYING') && (
        <HeaderBar
          timeRemaining={timeRemaining}
          score={totalScore}
          currentQuestionNum={currentDisplayNumber}
          totalQuestions={isReviewMode ? reviewQueue.length : 50}
          level={currentQuestion.level}
          levelVi={currentQuestion.levelVi}
          isReviewMode={isReviewMode}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenInstructions={() => setShowInstructions(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center relative z-10 py-4 px-3 sm:px-6">
        
        {/* PHASE 1: START SCREEN */}
        {phase === 'START' && (
          <StartScreen
            student={student}
            onChangeStudent={(field, val) => setStudent((prev) => ({ ...prev, [field]: val }))}
            onStartClick={() => setShowInstructions(true)}
            onOpenInstructions={() => setShowInstructions(true)}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}

        {/* PHASE 2: PLAYING QUESTION */}
        {phase === 'PLAYING' && (
          <div className="w-full my-auto animate-fade-in">
            <QuestionCard
              question={currentQuestion}
              currentNumber={currentIndex + 1}
              userAnswers={userAnswers}
              onChangeAnswer={handleAnswerChange}
              onSubmit={handleSubmit}
              onNext={handleNextQuestion}
              isSubmitted={isSubmitted}
              submissionState={submissionState}
              praiseMessage={praiseMessage}
              isSpeaking={isSpeaking}
              onSpeak={handleSpeakCurrentQuestion}
              validationWarning={validationWarning}
              isReviewMode={false}
            />
          </div>
        )}

        {/* PHASE 3: REVIEW ROUND INTRO */}
        {phase === 'REVIEW_INTRO' && (
          <div className="w-full max-w-2xl mx-auto my-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#181c38] via-[#101428] to-[#0a0d1d] border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 mx-auto flex items-center justify-center shadow-lg mb-4">
              <RotateCcw className="w-9 h-9 text-slate-950" />
            </div>

            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest">
              BONUS RECOVERY ROUND
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 my-3">
              REVIEW ROUND
            </h2>

            <p className="text-base sm:text-lg text-slate-200 font-medium mb-3">
              Try your incorrect answers again. Read the Vietnamese hint carefully.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 text-left space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>You have <b>{reviewQueue.length}</b> questions to review.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Each question continues to have <b>50 seconds</b>.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Correct answers will earn you <b>+10 points</b> each!</span>
              </div>
            </div>

            <button
              id="btn-start-review-round"
              onClick={handleStartReviewPlaying}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-lg shadow-[0_0_30px_rgba(245,158,11,0.6)] transform active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start Review Round</span>
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PHASE 4: REVIEW PLAYING */}
        {phase === 'REVIEW_PLAYING' && (
          <div className="w-full my-auto animate-fade-in">
            <QuestionCard
              question={currentQuestion}
              currentNumber={currentQuestion.id}
              userAnswers={userAnswers}
              onChangeAnswer={handleAnswerChange}
              onSubmit={handleSubmit}
              onNext={handleNextQuestion}
              isSubmitted={isSubmitted}
              submissionState={submissionState}
              praiseMessage={praiseMessage}
              isSpeaking={isSpeaking}
              onSpeak={handleSpeakCurrentQuestion}
              validationWarning={validationWarning}
              isReviewMode={true}
            />
          </div>
        )}

        {/* PHASE 5: GAME COMPLETED / RESULTS */}
        {phase === 'RESULT' && (
          <ResultScreen
            student={student}
            questions={QUESTIONS}
            results={results}
            initialScore={initialScore}
            reviewScore={reviewScore}
            finalScore={totalScore}
            percentage={percentage}
            performanceLevel={performanceLevel}
            completionDate={completionDate}
            onPlayAgain={handlePlayAgain}
            onOpenReviewAnswers={() => setShowReviewAnswers(true)}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="py-4 text-center text-xs text-slate-500 relative z-10 print:hidden">
        <p>
          SMART ENGLISH TUTOR • Teacher: <span className="text-purple-300 font-bold">VŨ THỊ MAI THU</span> • English Grades 6, 7, 8, 9
        </p>
      </footer>

      {/* MODALS */}
      {/* 1. Vietnamese Instructions Modal */}
      <InstructionModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onConfirmStart={handleStartGameFromModal}
      />

      {/* 2. Certificate of Achievement Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        student={student}
        score={totalScore}
        percentage={percentage}
        performanceLevel={performanceLevel}
        completionDate={completionDate}
      />

      {/* 3. Review Answers Modal */}
      <ReviewModal
        isOpen={showReviewAnswers}
        onClose={() => setShowReviewAnswers(false)}
        questions={QUESTIONS}
        results={results}
      />
    </div>
  );
}
