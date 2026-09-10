import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  User,
  GraduationCap,
  School,
  AlertCircle
} from 'lucide-react';
import { StudentProfile } from '../types';
import { TutorMascot } from './TutorMascot';

interface StartScreenProps {
  student: StudentProfile;
  onChangeStudent: (field: keyof StudentProfile, value: string) => void;
  onStartClick: () => void;
  onOpenInstructions: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  student,
  onChangeStudent,
  onStartClick,
  onOpenInstructions,
  soundEnabled,
  onToggleSound,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleStart = () => {
    if (!student.fullName.trim() || !student.className.trim() || !student.school.trim()) {
      setErrorMessage('Please complete all required information before starting.');
      return;
    }
    setErrorMessage(null);
    onStartClick();
  };

  return (
    <div id="start-screen-container" className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top action bar with sound and fullscreen */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
            Online Challenge Ready
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-sound-toggle-start"
            onClick={onToggleSound}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-200 hover:bg-purple-900/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
          </button>

          <button
            id="btn-fullscreen-toggle-start"
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#14182f] via-[#101426] to-[#0a0d1b] border-2 border-purple-500/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(147,51,234,0.25)] overflow-hidden">
        {/* Glow accents */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Branding & Titles */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <TutorMascot
            mood="idle"
            message="Welcome! Let's conquer all 50 past simple questions together!"
            size="lg"
          />

          {/* Main Title Badge */}
          <div className="mt-6 mb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide leading-tight">
              GIA SƯ THÔNG THÁI TIẾNG ANH CÁC KHỐI LỚP 6, 7, 8, 9 – VŨ THỊ MAI THU
            </h1>
          </div>

          {/* English Titles */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              SMART ENGLISH TUTOR
            </h2>
            <p className="text-sm sm:text-base font-bold text-cyan-300 tracking-widest uppercase">
              English for Grades 6, 7, 8 and 9
            </p>
            <p className="text-xs sm:text-sm font-semibold text-purple-300 pt-1">
              Teacher: <span className="text-white font-extrabold">VŨ THỊ MAI THU</span>
            </p>
          </div>

          {/* Game Title & Exercise */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 max-w-xl w-full">
            <div className="flex items-center justify-center gap-2 text-pink-400 font-black text-base sm:text-lg tracking-wider uppercase">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>PAST SIMPLE VERB CHALLENGE</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic mt-1">
              “Give the correct form of the verbs in brackets.”
            </p>
          </div>
        </div>

        {/* Student Registration Form */}
        <div className="max-w-xl mx-auto rounded-2xl bg-[#0c1020]/90 border border-purple-500/30 p-6 shadow-inner relative z-10 mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Student Registration (Required)</span>
          </h3>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full name:</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                id="input-student-fullname"
                type="text"
                value={student.fullName}
                onChange={(e) => {
                  onChangeStudent('fullName', e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="e.g. Nguyễn Văn An"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/40 text-white font-semibold placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm sm:text-base transition-all"
              />
            </div>

            {/* Class & School */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
                  <span>Class:</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  id="input-student-class"
                  type="text"
                  value={student.className}
                  onChange={(e) => {
                    onChangeStudent('className', e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="e.g. 7A1"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/40 text-white font-semibold placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm sm:text-base transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-yellow-400" />
                  <span>School:</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  id="input-student-school"
                  type="text"
                  value={student.school}
                  onChange={(e) => {
                    onChangeStudent('school', e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="e.g. THCS Lê Quý Đôn"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/40 text-white font-semibold placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm sm:text-base transition-all"
                />
              </div>
            </div>
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <div
              id="start-error-message"
              className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button
            id="btn-vietnamese-instructions"
            onClick={onOpenInstructions}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-purple-500/40 text-purple-200 hover:text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-pink-400" />
            <span>Vietnamese Instructions</span>
          </button>

          <button
            id="btn-start-game"
            onClick={handleStart}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-white font-black text-base sm:text-lg shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] transform active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Start Game</span>
            <Play className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
