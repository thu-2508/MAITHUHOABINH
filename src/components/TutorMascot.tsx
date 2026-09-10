import React from 'react';

interface TutorMascotProps {
  mood?: 'idle' | 'speaking' | 'correct' | 'wrong' | 'hurry' | 'victory';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TutorMascot: React.FC<TutorMascotProps> = ({
  mood = 'idle',
  message,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20 md:w-24 md:h-24',
    lg: 'w-28 h-28 md:w-36 md:h-36',
  }[size];

  // Glow color based on mood
  const glowBorder = {
    idle: 'from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_25px_rgba(168,85,247,0.4)]',
    speaking: 'from-amber-300 via-cyan-400 to-blue-500 shadow-[0_0_30px_rgba(56,189,248,0.6)] animate-pulse',
    correct: 'from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_30px_rgba(52,211,153,0.7)]',
    wrong: 'from-rose-400 via-amber-400 to-pink-500 shadow-[0_0_25px_rgba(244,63,94,0.4)]',
    hurry: 'from-amber-400 via-orange-500 to-red-500 shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-bounce',
    victory: 'from-amber-300 via-yellow-400 to-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.8)]',
  }[mood];

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative group">
        {/* Neon 3D ring */}
        <div
          className={`relative rounded-3xl p-[3px] bg-gradient-to-tr ${glowBorder} transition-all duration-300 transform group-hover:scale-105`}
        >
          <div className={`${sizeClasses} rounded-[22px] bg-gradient-to-b from-[#181d33] to-[#0d1122] flex items-center justify-center overflow-hidden relative`}>
            {/* Ambient inner sheen */}
            <div className="absolute inset-0 bg-radial from-purple-500/20 via-transparent to-transparent opacity-80" />
            
            {/* 3D Stylized Cute Tutor SVG Illustration */}
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full drop-shadow-md z-10 transition-transform duration-300"
            >
              <defs>
                <linearGradient id="tutorBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
                <linearGradient id="tutorFace" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FEE2E2" />
                  <stop offset="100%" stopColor="#FED7AA" />
                </linearGradient>
                <linearGradient id="tutorGlasses" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="tutorHat" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E1B4B" />
                  <stop offset="100%" stopColor="#312E81" />
                </linearGradient>
              </defs>

              {/* Graduation Cap */}
              <polygon points="60,12 105,28 60,44 15,28" fill="url(#tutorHat)" stroke="#6366F1" strokeWidth="1.5" />
              <rect x="42" y="38" width="36" height="12" rx="4" fill="#1E1B4B" />
              {/* Tassel */}
              <line x1="60" y1="28" x2="24" y2="42" stroke="#F59E0B" strokeWidth="2.5" />
              <circle cx="24" cy="45" r="3.5" fill="#F59E0B" />

              {/* Head / Face */}
              <circle cx="60" cy="68" r="32" fill="url(#tutorFace)" />

              {/* Hair accents */}
              <path d="M 32 60 Q 40 46 60 48 Q 80 46 88 60 Q 82 52 60 54 Q 38 52 32 60" fill="#4B2818" />

              {/* Glasses */}
              <rect x="36" y="60" width="18" height="14" rx="4" fill="none" stroke="url(#tutorGlasses)" strokeWidth="2.5" />
              <rect x="66" y="60" width="18" height="14" rx="4" fill="none" stroke="url(#tutorGlasses)" strokeWidth="2.5" />
              <line x1="54" y1="67" x2="66" y2="67" stroke="#06B6D4" strokeWidth="2.5" />

              {/* Eyes */}
              {mood === 'correct' || mood === 'victory' ? (
                // Happy squint eyes
                <>
                  <path d="M 40 68 Q 45 63 50 68" stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 70 68 Q 75 63 80 68" stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
              ) : mood === 'wrong' ? (
                // Gentle sympathetic eyes
                <>
                  <circle cx="45" cy="67" r="3" fill="#374151" />
                  <circle cx="75" cy="67" r="3" fill="#374151" />
                </>
              ) : (
                // Bright alert eyes with shine
                <>
                  <circle cx="45" cy="67" r="3.5" fill="#1E1B4B" />
                  <circle cx="46" cy="65.5" r="1.2" fill="#FFFFFF" />
                  <circle cx="75" cy="67" r="3.5" fill="#1E1B4B" />
                  <circle cx="76" cy="65.5" r="1.2" fill="#FFFFFF" />
                </>
              )}

              {/* Cheeks */}
              <circle cx="37" cy="76" r="4.5" fill="#F43F5E" opacity="0.35" />
              <circle cx="83" cy="76" r="4.5" fill="#F43F5E" opacity="0.35" />

              {/* Mouth */}
              {mood === 'correct' || mood === 'victory' ? (
                <path d="M 50 82 Q 60 92 70 82" stroke="#BE123C" strokeWidth="2.5" fill="#FDA4AF" strokeLinecap="round" />
              ) : mood === 'wrong' ? (
                <path d="M 52 83 Q 60 81 68 83" stroke="#9F1239" strokeWidth="2" fill="none" strokeLinecap="round" />
              ) : mood === 'speaking' ? (
                <ellipse cx="60" cy="83" rx="4.5" ry="6" fill="#BE123C" />
              ) : (
                <path d="M 52 81 Q 60 87 68 81" stroke="#BE123C" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              )}

              {/* Sparkles / effects */}
              {mood === 'correct' && (
                <polygon points="100,45 102,52 109,54 102,56 100,63 98,56 91,54 98,52" fill="#FBBF24" />
              )}
              {mood === 'speaking' && (
                <path d="M 98 62 Q 106 70 98 78" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
              )}
            </svg>
          </div>
        </div>

        {/* Small floating badge */}
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-[10px] font-bold text-white px-2 py-0.5 rounded-full border border-purple-300/40 shadow-sm">
          TUTOR
        </div>
      </div>

      {message && (
        <div className="relative bg-gradient-to-r from-slate-900/90 to-purple-950/90 backdrop-blur-md border border-purple-500/30 rounded-2xl px-4 py-2 text-sm text-purple-100 shadow-lg max-w-xs md:max-w-md animate-fade-in">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-purple-900/90 border-b-6 border-b-transparent" />
          <p className="font-medium text-slate-100">{message}</p>
        </div>
      )}
    </div>
  );
};
