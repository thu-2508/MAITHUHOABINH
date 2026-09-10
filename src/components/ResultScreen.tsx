import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  RotateCcw,
  BookOpen,
  Printer,
  Download,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  School,
  User,
  GraduationCap
} from 'lucide-react';
import { StudentProfile, PerformanceLevel, QuestionItem, QuestionResult } from '../types';
import { TutorMascot } from './TutorMascot';
import { generateParentFeedback } from '../utils/feedback';
import { sound } from '../utils/audio';

interface ResultScreenProps {
  student: StudentProfile;
  questions: QuestionItem[];
  results: Record<number, QuestionResult>;
  initialScore: number;
  reviewScore: number;
  finalScore: number;
  percentage: number;
  performanceLevel: PerformanceLevel;
  completionDate: string;
  onPlayAgain: () => void;
  onOpenReviewAnswers: () => void;
  onOpenCertificate: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  student,
  questions,
  results,
  initialScore,
  reviewScore,
  finalScore,
  percentage,
  performanceLevel,
  completionDate,
  onPlayAgain,
  onOpenReviewAnswers,
  onOpenCertificate,
}) => {
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  // Trigger celebration on mount
  useEffect(() => {
    if (percentage >= 90) {
      sound.playVictoryFanfare();
      // Fireworks burst
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } else if (percentage >= 70) {
      sound.playCertificateSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sound.playVictoryFanfare();
    }
  }, [percentage]);

  const correctCount = (Object.values(results) as QuestionResult[]).filter((r) => r.finalIsCorrect).length;
  const incorrectCount = 50 - correctCount;

  // Breakdown by level
  const levelStats = {
    Recognize: { total: 20, correct: 0 },
    Understand: { total: 20, correct: 0 },
    Apply: { total: 10, correct: 0 },
  };

  questions.forEach((q) => {
    const res = results[q.id];
    if (res && res.finalIsCorrect) {
      levelStats[q.level].correct += 1;
    }
  });

  const parentFeedback = generateParentFeedback(
    student.fullName,
    finalScore,
    percentage,
    questions,
    results
  );

  const handleCopyFeedback = () => {
    navigator.clipboard.writeText(parentFeedback).then(() => {
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2500);
    }).catch(() => {
      // Fallback
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadResultReport = () => {
    const textReport = `
=====================================================
SMART ENGLISH TUTOR - GAME COMPLETED REPORT
PAST SIMPLE VERB CHALLENGE
Teacher: VŨ THỊ MAI THU
=====================================================

STUDENT INFORMATION:
- Full Name: ${student.fullName}
- Class: ${student.className}
- School: ${student.school}
- Completion Date: ${completionDate}

SCORE & PERFORMANCE:
- Initial Round Score: ${initialScore} / 500
- Review Round Score: ${reviewScore}
- FINAL SCORE: ${finalScore} / 500
- Percentage: ${percentage.toFixed(1)}%
- Performance Level: ${performanceLevel}
- Correct Answers: ${correctCount} / 50
- Incorrect Answers: ${incorrectCount} / 50

LEVEL BREAKDOWN:
- Recognize (Nhận biết): ${levelStats.Recognize.correct}/20 (${((levelStats.Recognize.correct/20)*100).toFixed(0)}%)
- Understand (Thông hiểu): ${levelStats.Understand.correct}/20 (${((levelStats.Understand.correct/20)*100).toFixed(0)}%)
- Apply (Vận dụng): ${levelStats.Apply.correct}/10 (${((levelStats.Apply.correct/10)*100).toFixed(0)}%)

NHẬN XÉT GỬI PHỤ HUYNH:
${parentFeedback}

=====================================================
Smart English Tutor - English for Grades 6, 7, 8 and 9
`.trim();

    const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Report_${student.fullName.replace(/\s+/g, '_')}_PastSimple.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const badgeColor = {
    'Outstanding': 'from-amber-400 to-yellow-500 text-slate-950 border-yellow-300',
    'Excellent': 'from-purple-500 to-indigo-600 text-white border-purple-300',
    'Good': 'from-cyan-500 to-blue-600 text-white border-cyan-300',
    'Keep Practising': 'from-amber-600 to-orange-600 text-white border-orange-400',
    'More Practice Needed': 'from-rose-600 to-red-700 text-white border-rose-400',
  }[performanceLevel];

  return (
    <div id="game-completed-screen" className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-slate-900/80 to-pink-900/60 border-2 border-purple-500/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(168,85,247,0.3)] mb-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-black tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>GAME COMPLETED</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-400 bg-clip-text text-transparent">
              PAST SIMPLE VERB CHALLENGE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Teacher: <span className="font-bold text-white">VŨ THỊ MAI THU</span> • Smart English Tutor
            </p>
          </div>

          <div className="flex flex-col items-center">
            <TutorMascot
              mood={percentage >= 70 ? 'victory' : 'idle'}
              message={
                percentage >= 90
                  ? 'Incredible performance! Outstanding mastery of past simple!'
                  : percentage >= 70
                  ? 'Congratulations! You earned your Certificate of Achievement!'
                  : 'Well tried! Continue practicing to boost your past simple skills!'
              }
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Student Profile Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-purple-500/30 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider text-purple-400 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Student Profile</span>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-400 block">Full Name</span>
                <span className="text-lg font-black text-white">{student.fullName || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-slate-400 block">Class</span>
                  <span className="text-base font-bold text-cyan-300 flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" /> {student.className || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Date</span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5" /> {completionDate}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">School</span>
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
                  <School className="w-4 h-4 text-purple-400" /> {student.school || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            Activity: <span className="text-slate-200 font-bold">Past Simple Verbs</span>
          </div>
        </div>

        {/* Primary Score Card */}
        <div className="rounded-3xl bg-gradient-to-b from-purple-950/60 to-slate-900/90 border-2 border-purple-500/50 p-6 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <Trophy className="w-12 h-12 text-amber-400 mb-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
          
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            FINAL SCORE
          </span>
          <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 my-1">
            {finalScore}
          </div>
          <span className="text-xs text-slate-400 font-bold mb-3">
            Maximum Score: 500
          </span>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span>Initial: <b className="text-purple-300">{initialScore}</b></span>
            <span>•</span>
            <span>Review Round: <b className="text-cyan-300">+{reviewScore}</b></span>
          </div>

          {/* Performance Pill */}
          <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-black tracking-wide uppercase bg-gradient-to-r ${badgeColor} shadow-md`}>
            {performanceLevel} ({percentage.toFixed(1)}%)
          </div>
        </div>

        {/* Accuracy & Breakdown Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-purple-500/30 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider text-purple-400 mb-4 flex items-center justify-between">
              <span>Performance by Level</span>
              <span className="text-cyan-300">{correctCount}/50 Correct</span>
            </div>

            {/* Level Bars */}
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-300">Recognize (Nhận biết)</span>
                  <span className="text-slate-300">{levelStats.Recognize.correct}/20</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(levelStats.Recognize.correct / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-cyan-300">Understand (Thông hiểu)</span>
                  <span className="text-slate-300">{levelStats.Understand.correct}/20</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(levelStats.Understand.correct / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-purple-300">Apply (Vận dụng)</span>
                  <span className="text-slate-300">{levelStats.Apply.correct}/10</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(levelStats.Apply.correct / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> {correctCount} Correct
            </span>
            <span className="flex items-center gap-1 text-rose-400 font-bold">
              <XCircle className="w-4 h-4" /> {incorrectCount} Incorrect
            </span>
          </div>
        </div>
      </div>

      {/* Parent Feedback Box (Vietnamese) */}
      <div
        id="parent-feedback-section"
        className="rounded-3xl bg-[#12162b] border-2 border-purple-500/30 p-6 sm:p-8 shadow-xl mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-purple-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-400" />
              <span>NHẬN XÉT GỬI PHỤ HUYNH</span>
            </h3>
            <p className="text-xs text-slate-400">
              Đánh giá chi tiết điểm mạnh và nội dung cần rèn luyện gửi đến phụ huynh học sinh
            </p>
          </div>

          <button
            id="btn-copy-parent-feedback"
            onClick={handleCopyFeedback}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
              copiedFeedback
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]'
            }`}
          >
            {copiedFeedback ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Parent Feedback</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/20 text-slate-200 text-sm sm:text-base leading-relaxed italic select-all">
          “{parentFeedback}”
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Certificate Button (Active if >= 70%) */}
        {percentage >= 70 ? (
          <button
            id="btn-download-certificate"
            onClick={onOpenCertificate}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(245,158,11,0.6)] transform active:scale-95 transition-all cursor-pointer"
          >
            <Award className="w-5 h-5" />
            <span>Download Certificate</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-semibold">
            <Award className="w-4 h-4 text-slate-500" />
            <span>Certificate unlocks at 70% (350+ pts)</span>
          </div>
        )}

        {/* Review Answers Button */}
        <button
          id="btn-review-answers"
          onClick={onOpenReviewAnswers}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-purple-500/40 text-slate-100 font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Review Answers</span>
        </button>

        {/* Download Result */}
        <button
          id="btn-download-result"
          onClick={handleDownloadResultReport}
          className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-purple-400" />
          <span>Download Result</span>
        </button>

        {/* Print Result */}
        <button
          id="btn-print-result"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-pink-400" />
          <span>Print Result</span>
        </button>

        {/* Play Again Button */}
        <button
          id="btn-play-again"
          onClick={onPlayAgain}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm sm:text-base shadow-[0_0_20px_rgba(217,70,239,0.5)] transform active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
};
