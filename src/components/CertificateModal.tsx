import React, { useRef } from 'react';
import { Download, Printer, X, Award, Star } from 'lucide-react';
import { StudentProfile, PerformanceLevel } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  score: number;
  percentage: number;
  performanceLevel: PerformanceLevel;
  completionDate: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  score,
  percentage,
  performanceLevel,
  completionDate,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = () => {
    // Render high resolution canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1130;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, 1600, 1130);
    bgGradient.addColorStop(0, '#0d1124');
    bgGradient.addColorStop(0.5, '#161b38');
    bgGradient.addColorStop(1, '#0b0f1e');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1600, 1130);

    // Outer border (Gold/Cyan)
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1540, 1070);

    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, 1504, 1034);

    // Inner patterned corner lines
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 1480, 1010);

    // Top Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#93C5FD';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SMART ENGLISH TUTOR', 800, 120);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('English for Grades 6, 7, 8 and 9', 800, 155);

    // Title
    ctx.fillStyle = '#FBBF24';
    ctx.font = '900 62px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 800, 240);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'italic 26px "Plus Jakarta Sans", Georgia, serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('This certificate is proudly presented to', 800, 310);

    // Student Name
    ctx.fillStyle = '#38BDF8';
    ctx.font = '900 68px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText((student.fullName || 'STUDENT').toUpperCase(), 800, 400);

    // Underline
    const lineGrad = ctx.createLinearGradient(400, 0, 1200, 0);
    lineGrad.addColorStop(0, 'transparent');
    lineGrad.addColorStop(0.5, '#F59E0B');
    lineGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = lineGrad;
    ctx.fillRect(400, 425, 800, 4);

    // School and Class
    ctx.fillStyle = '#F1F5F9';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Class: ${student.className || 'N/A'}    •    School: ${student.school || 'N/A'}`, 800, 480);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('for successfully completing the', 800, 540);

    // Activity Title
    ctx.fillStyle = '#E879F9';
    ctx.font = '900 42px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('PAST SIMPLE VERB CHALLENGE', 800, 600);

    // Stats Box background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.fillRect(350, 650, 900, 130);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(350, 650, 900, 130);

    // Score / Percentage / Performance
    ctx.fillStyle = '#FCD34D';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Score: ${score}/500`, 500, 725);

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Percentage: ${percentage.toFixed(1)}%`, 800, 725);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Performance: ${performanceLevel}`, 1100, 725);

    // Footer signatures
    // Left: Teacher
    ctx.textAlign = 'left';
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 26px "Cinzel", serif';
    ctx.fillText('Teacher: VŨ THỊ MAI THU', 180, 960);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Secondary English Educator', 180, 995);

    // Right: Date
    ctx.textAlign = 'right';
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Date: ${completionDate}`, 1420, 960);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Verified Certificate of Completion', 1420, 995);

    // Convert to download link
    const link = document.createElement('a');
    link.download = `Certificate_${(student.fullName || 'Student').replace(/\s+/g, '_')}_PastSimple.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      id="certificate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-5xl bg-[#0c1022] border-2 border-amber-500/60 rounded-3xl p-4 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.35)] my-auto">
        {/* Modal Controls */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400 animate-bounce" />
            <span className="font-extrabold text-amber-300 text-lg">
              Certificate of Achievement (Score: {percentage.toFixed(1)}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-print-cert"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              id="btn-download-cert"
              onClick={handleDownloadImage}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-extrabold shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Image (PNG)</span>
            </button>
            <button
              id="btn-close-cert"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Landscape) */}
        <div
          id="certificate-print-area"
          ref={certRef}
          className="relative mt-4 p-6 sm:p-12 rounded-2xl bg-gradient-to-b from-[#11172f] via-[#161f3d] to-[#0c1022] border-8 border-amber-600/80 shadow-2xl overflow-hidden text-center"
          style={{ aspectRatio: '16 / 11' }}
        >
          {/* Inner decorative borders */}
          <div className="absolute inset-3 border-2 border-amber-400/50 pointer-events-none rounded-lg" />
          <div className="absolute inset-5 border border-cyan-400/30 pointer-events-none rounded-md" />

          {/* Corner ornamental elements */}
          <div className="absolute top-7 left-7 text-amber-400 opacity-60">
            <Star className="w-8 h-8 fill-amber-400" />
          </div>
          <div className="absolute top-7 right-7 text-amber-400 opacity-60">
            <Star className="w-8 h-8 fill-amber-400" />
          </div>
          <div className="absolute bottom-7 left-7 text-amber-400 opacity-60">
            <Star className="w-8 h-8 fill-amber-400" />
          </div>
          <div className="absolute bottom-7 right-7 text-amber-400 opacity-60">
            <Star className="w-8 h-8 fill-amber-400" />
          </div>

          {/* App details */}
          <div className="mb-2">
            <p className="text-xs sm:text-sm tracking-[0.25em] font-extrabold uppercase text-cyan-300">
              SMART ENGLISH TUTOR
            </p>
            <p className="text-[11px] sm:text-xs tracking-wider text-slate-300 font-medium">
              English for Grades 6, 7, 8 and 9
            </p>
          </div>

          {/* Certificate Title */}
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 tracking-wider my-3"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            CERTIFICATE OF ACHIEVEMENT
          </h1>

          <p className="text-xs sm:text-base italic text-slate-300 my-2">
            This certificate is proudly presented to
          </p>

          {/* Student Full Name */}
          <div className="my-4">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-black text-cyan-300 tracking-wide uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              {student.fullName || 'STUDENT NAME'}
            </h2>
            <div className="h-1 w-64 mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {/* Class & School */}
          <p className="text-xs sm:text-base font-bold text-slate-200 my-2">
            Class: <span className="text-yellow-300">{student.className || 'N/A'}</span> &nbsp;•&nbsp;
            School: <span className="text-yellow-300">{student.school || 'N/A'}</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            for successfully completing the
          </p>

          <h3
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-pink-300 tracking-wider my-2"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            PAST SIMPLE VERB CHALLENGE
          </h3>

          {/* Score Box */}
          <div className="max-w-2xl mx-auto my-4 p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="block text-[10px] sm:text-xs uppercase font-bold text-slate-400">Score</span>
              <span className="text-sm sm:text-xl font-black text-amber-300">{score}/500</span>
            </div>
            <div>
              <span className="block text-[10px] sm:text-xs uppercase font-bold text-slate-400">Percentage</span>
              <span className="text-sm sm:text-xl font-black text-emerald-400">{percentage.toFixed(1)}%</span>
            </div>
            <div>
              <span className="block text-[10px] sm:text-xs uppercase font-bold text-slate-400">Performance</span>
              <span className="text-sm sm:text-xl font-black text-cyan-300">{performanceLevel}</span>
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="flex items-end justify-between px-2 sm:px-8 mt-6 sm:mt-10 text-left">
            <div>
              <div className="text-xs sm:text-base font-extrabold text-white" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                Teacher: VŨ THỊ MAI THU
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400">
                Secondary English Educator
              </div>
            </div>

            {/* Center Gold 3D Badge */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-[3px] shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                <div className="w-full h-full rounded-full bg-[#101428] flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 mt-1">OFFICIAL</span>
            </div>

            <div className="text-right">
              <div className="text-xs sm:text-base font-bold text-white">
                Date: {completionDate}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400">
                Smart English Tutor Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
