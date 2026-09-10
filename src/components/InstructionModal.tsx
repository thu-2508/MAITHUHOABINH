import React from 'react';
import { BookOpen, CheckCircle2, Sparkles, X } from 'lucide-react';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmStart: () => void;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
  onConfirmStart,
}) => {
  if (!isOpen) return null;

  const instructions = [
    "Em hãy đọc kĩ câu và từ gợi ý trong ngoặc.",
    "Gõ dạng đúng của động từ vào ô trống.",
    "Mỗi câu có thời gian làm bài là 50 giây.",
    "Mỗi câu trả lời đúng được 10 điểm.",
    "Với câu có từ hai ô trống trở lên, em phải điền đúng tất cả các ô mới được tính điểm.",
    "Em có thể nhấn biểu tượng loa để nghe câu hỏi.",
    "Nhấn ‘Submit Answer’ để nộp đáp án.",
    "Nếu trả lời sai hoặc hết giờ, câu hỏi sẽ được lưu lại để em làm lại trong Review Round.",
    "Trong Review Round, em sẽ nhận được gợi ý bằng tiếng Việt.",
    "Đạt từ 70% tổng số điểm trở lên, em sẽ nhận được giấy chứng nhận.",
    "Chúc em bình tĩnh, tự tin và hoàn thành thật tốt!"
  ];

  return (
    <div
      id="instruction-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        id="instruction-modal-container"
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#161a30] via-[#101426] to-[#0b0e1b] border-2 border-purple-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] max-h-[90vh] overflow-y-auto"
      >
        {/* Decorative close button */}
        <button
          id="btn-close-instructions"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with 3D gradient text */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl shadow-[0_0_20px_rgba(217,70,239,0.5)]">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-400 bg-clip-text text-transparent">
              HƯỚNG DẪN TRÒ CHƠI
            </h2>
            <p className="text-xs md:text-sm text-purple-300 font-medium">
              Past Simple Verb Challenge – Vũ Thị Mai Thu
            </p>
          </div>
        </div>

        {/* 11 instructions list */}
        <div className="space-y-3 mb-8">
          {instructions.map((item, index) => {
            const isLast = index === instructions.length - 1;
            return (
              <div
                key={index}
                className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all ${
                  isLast
                    ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-pink-500/50 text-pink-200 font-semibold shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-200 hover:border-purple-500/30'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isLast
                      ? 'bg-pink-500 text-white'
                      : 'bg-purple-600/40 text-purple-300 border border-purple-500/40'
                  }`}
                >
                  {index + 1}
                </span>
                <p className="text-sm md:text-base leading-relaxed">{item}</p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-understand-start"
            onClick={onConfirmStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-white font-black text-lg rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_45px_rgba(236,72,153,0.8)] transform active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>TÔI ĐÃ HIỂU – BẮT ĐẦU</span>
            <CheckCircle2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
