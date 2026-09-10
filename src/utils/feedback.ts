import { PerformanceLevel, QuestionItem, QuestionResult } from '../types';

export function getPerformanceLevel(percentage: number): PerformanceLevel {
  if (percentage >= 90) return 'Outstanding';
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 70) return 'Good';
  if (percentage >= 50) return 'Keep Practising';
  return 'More Practice Needed';
}

export function generateParentFeedback(
  studentName: string,
  score: number,
  percentage: number,
  questions: QuestionItem[],
  results: Record<number, QuestionResult>
): string {
  // Categorize questions
  const categories: Record<string, { label: string; total: number; correct: number }> = {
    regular: { label: 'động từ có quy tắc (thêm -ed)', total: 0, correct: 0 },
    irregular: { label: 'động từ bất quy tắc', total: 0, correct: 0 },
    negative: { label: 'câu phủ định với "did not/didn’t"', total: 0, correct: 0 },
    question: { label: 'câu nghi vấn và câu hỏi với từ để hỏi', total: 0, correct: 0 },
    tobe: { label: 'động từ "to be" (was/were)', total: 0, correct: 0 },
    multi: { label: 'câu kết hợp nhiều động từ', total: 0, correct: 0 },
  };

  questions.forEach((q) => {
    const cat = categories[q.category];
    if (cat) {
      cat.total += 1;
      const res = results[q.id];
      if (res && res.finalIsCorrect) {
        cat.correct += 1;
      }
    }
  });

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  Object.entries(categories).forEach(([_, data]) => {
    if (data.total > 0) {
      const rate = (data.correct / data.total) * 100;
      if (rate >= 75) {
        strengths.push(data.label);
      } else if (rate < 60) {
        weaknesses.push(data.label);
      }
    }
  });

  let strengthText = '';
  if (strengths.length > 0) {
    strengthText = `nắm rất chắc các phần kiến thức về ${strengths.slice(0, 3).join(', ')}`;
  } else {
    strengthText = 'thể hiện tinh thần học tập tích cực và nỗ lực hoàn thành các câu hỏi';
  }

  let weaknessText = '';
  if (weaknesses.length > 0) {
    weaknessText = `các dạng ${weaknesses.slice(0, 3).join(', ')}`;
  } else {
    weaknessText = 'tốc độ phản xạ và sự tỉ mỉ khi làm bài để đạt điểm số tuyệt đối 500/500';
  }

  return `Em ${studentName || 'học sinh'} đạt ${score}/500 điểm, tương ứng ${percentage.toFixed(1)}%. Em đã ${strengthText}. Em cần luyện thêm ${weaknessText}. Mong phụ huynh tiếp tục động viên em ôn tập và thực hành thường xuyên.`;
}
