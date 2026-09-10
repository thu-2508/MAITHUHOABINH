import React from 'react';
import { Clock, Trophy, HelpCircle, Volume2, VolumeX, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { QuestionLevel } from '../types';

interface HeaderBarProps {
  timeRemaining: number;
  score: number;
  currentQuestionNum: number;
  totalQuestions: number;
  level: QuestionLevel;
  levelVi: string;
  isReviewMode?: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenInstructions: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  timeRemaining,
  score,
  currentQuestionNum,
  totalQuestions,
  level,
  levelVi,
  isReviewMode = false,
  soundEnabled,
  onToggleSound,
  onOpenInstructions,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Timer colors
  let timerBg = 'from-cyan-500/20 to-blue-600/20 border-cyan-500/40 text-cyan-300';
  let timerPill = 'text-cyan-400';
  let timerLabel = 'TIME';

  if (timeRemaining <= 5) {
    timerBg = 'from-red-600/30 to-rose-700/30 border-red-500 text-red-300 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]';
    timerPill = 'text-red-400 font-black';
    timerLabel = 'Hurry up!';
  } else if (timeRemaining <= 10) {
    timerBg = 'from-amber-500/30 to-orange-600/30 border-orange-500 text-amber-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]';
    timerPill = 'text-orange-400 font-bold';
    timerLabel = 'Hurry up!';
  }

  const levelColors: Record<QuestionLevel, string> = {
    Recognize: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
    Understand: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
    Apply: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
  };

  const progressPercent = Math.min(100, Math.round((currentQuestionNum / totalQuestions) * 100));

  return (
    <header id="app-header-bar" className="w-full bg-[#0d1224]/90 backdrop-blur-md border-b border-purple-500/20 px-3 sm:px-6 py-3 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Top left: App branding badge & Controls */}
        <div className="w-full md:w-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-black text-white text-xs shadow-md">
              SET
            </div>
            <div>
              <div className="text-xs font-black tracking-wider text-purple-300 uppercase flex items-center gap-1.5">
                SMART ENGLISH TUTOR
                {isReviewMode && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                    REVIEW ROUND
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Teacher: VŨ THỊ MAI THU
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="header-btn-sound"
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-purple-900/40 border-purple-500/40 text-purple-300 hover:bg-purple-800/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-800/60 border-slate-700 text-slate-500 hover:bg-slate-700'
              }`}
              title={soundEnabled ? "Sound: On" : "Sound: Off"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="header-btn-instructions"
              onClick={onOpenInstructions}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
              title="Vietnamese Instructions"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button
              id="header-btn-fullscreen"
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all hidden sm:block"
              title={isFullscreen ? "Exit Full Screen" : "Full Screen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Essential 5 items: TIME, SCORE, QUESTION, PROGRESS, LEVEL */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
          
          {/* LEVEL */}
          <div id="stat-level" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${levelColors[level]}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEVEL: {level} ({levelVi})</span>
          </div>

          {/* QUESTION */}
          <div id="stat-question" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700/80 text-xs font-semibold text-slate-200">
            <span className="text-purple-400 font-bold">QUESTION</span>
            <span className="text-white font-black">{currentQuestionNum}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalQuestions}</span>
          </div>

          {/* SCORE */}
          <div id="stat-score" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 text-xs font-semibold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>SCORE:</span>
            <span className="font-black text-amber-200 text-sm">{score}</span>
            <span className="text-amber-500/70">/ 500</span>
          </div>

          {/* TIME */}
          <div id="stat-time" className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border bg-gradient-to-r ${timerBg} transition-all duration-300 min-w-[120px] justify-center`}>
            <Clock className={`w-4 h-4 ${timerPill} ${timeRemaining <= 5 ? 'animate-spin' : ''}`} />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] uppercase font-extrabold tracking-wider">{timerLabel}</span>
              <span className={`text-base font-black tabular-nums ${timerPill}`}>
                {timeRemaining}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div id="stat-progress-bar" className="max-w-7xl mx-auto mt-2.5">
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden p-[1px] border border-purple-500/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500 shadow-[0_0_8px_rgba(217,70,239,0.7)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
