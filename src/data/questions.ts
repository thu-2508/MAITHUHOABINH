import { QuestionItem } from '../types';

export const HINTS = {
  affirmative: "Gợi ý: Đây là câu khẳng định ở quá khứ đơn. Hãy dùng dạng quá khứ của động từ.",
  negative: "Gợi ý: Câu phủ định ở quá khứ đơn dùng ‘did not/didn’t + động từ nguyên mẫu’.",
  interrogative: "Gợi ý: Câu hỏi quá khứ đơn dùng ‘Did/did + chủ ngữ + động từ nguyên mẫu’.",
  tobeAffirmative: "Gợi ý: Chọn ‘was’ cho chủ ngữ số ít và ‘were’ cho chủ ngữ số nhiều.",
  tobeNegative: "Gợi ý: Dùng dạng phủ định phù hợp của ‘was/were’.",
  tobeQuestion: "Gợi ý: Đưa ‘Was/Were’ lên đầu câu hỏi.",
  multiVerbs: "Gợi ý: Xác định từng động từ và chuyển tất cả về dạng quá khứ phù hợp.",
};

export const QUESTIONS: QuestionItem[] = [
  // 1-20: Recognize - Nhận biết
  {
    id: 1,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'regular',
    categoryLabel: 'Regular Verbs',
    rawSentence: "Yesterday, Lan ______ (visit) her grandparents in the countryside.",
    cueLabel: "(visit)",
    segments: [
      { text: "Yesterday, Lan " },
      { isBlank: true, blankIndex: 0, cue: "visit", placeholder: "Type answer..." },
      { text: " her grandparents in the countryside." }
    ],
    expectedAnswers: [["visited"]],
    spokenSentence: "Yesterday, Lan, blank, visit, her grandparents in the countryside.",
    vietnameseHint: HINTS.affirmative,
    explanation: "Động từ có quy tắc 'visit' thêm đuôi '-ed' thành 'visited'."
  },
  {
    id: 2,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'regular',
    categoryLabel: 'Regular Verbs',
    rawSentence: "My brother ______ (play) football with his friends last Sunday.",
    cueLabel: "(play)",
    segments: [
      { text: "My brother " },
      { isBlank: true, blankIndex: 0, cue: "play", placeholder: "Type answer..." },
      { text: " football with his friends last Sunday." }
    ],
    expectedAnswers: [["played"]],
    spokenSentence: "My brother, blank, play, football with his friends last Sunday.",
    vietnameseHint: HINTS.affirmative,
    explanation: "Động từ có quy tắc 'play' thêm đuôi '-ed' thành 'played'."
  },
  {
    id: 3,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "We ______ (go) to the cinema two days ago.",
    cueLabel: "(go)",
    segments: [
      { text: "We " },
      { isBlank: true, blankIndex: 0, cue: "go", placeholder: "Type answer..." },
      { text: " to the cinema two days ago." }
    ],
    expectedAnswers: [["went"]],
    spokenSentence: "We, blank, go, to the cinema two days ago.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Go' là động từ bất quy tắc, dạng quá khứ đơn là 'went'."
  },
  {
    id: 4,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "Nam ______ (buy) a new schoolbag yesterday.",
    cueLabel: "(buy)",
    segments: [
      { text: "Nam " },
      { isBlank: true, blankIndex: 0, cue: "buy", placeholder: "Type answer..." },
      { text: " a new schoolbag yesterday." }
    ],
    expectedAnswers: [["bought"]],
    spokenSentence: "Nam, blank, buy, a new schoolbag yesterday.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Buy' là động từ bất quy tắc, dạng quá khứ đơn là 'bought'."
  },
  {
    id: 5,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'regular',
    categoryLabel: 'Regular Verbs',
    rawSentence: "Hoa ______ (wash) the dishes after dinner last night.",
    cueLabel: "(wash)",
    segments: [
      { text: "Hoa " },
      { isBlank: true, blankIndex: 0, cue: "wash", placeholder: "Type answer..." },
      { text: " the dishes after dinner last night." }
    ],
    expectedAnswers: [["washed"]],
    spokenSentence: "Hoa, blank, wash, the dishes after dinner last night.",
    vietnameseHint: HINTS.affirmative,
    explanation: "Động từ 'wash' có quy tắc, thêm đuôi '-ed' thành 'washed'."
  },
  {
    id: 6,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'regular',
    categoryLabel: 'Regular Verbs',
    rawSentence: "My parents ______ (travel) to Da Nang last summer.",
    cueLabel: "(travel)",
    segments: [
      { text: "My parents " },
      { isBlank: true, blankIndex: 0, cue: "travel", placeholder: "Type answer..." },
      { text: " to Da Nang last summer." }
    ],
    expectedAnswers: [["travelled", "traveled"]],
    spokenSentence: "My parents, blank, travel, to Da Nang last summer.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Travel' chuyển sang quá khứ là 'travelled' (tiếng Anh-Anh) hoặc 'traveled' (tiếng Anh-Mỹ)."
  },
  {
    id: 7,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'regular',
    categoryLabel: 'Regular Verbs',
    rawSentence: "The students ______ (finish) their homework before dinner.",
    cueLabel: "(finish)",
    segments: [
      { text: "The students " },
      { isBlank: true, blankIndex: 0, cue: "finish", placeholder: "Type answer..." },
      { text: " their homework before dinner." }
    ],
    expectedAnswers: [["finished"]],
    spokenSentence: "The students, blank, finish, their homework before dinner.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Finish' là động từ có quy tắc, thêm đuôi '-ed' thành 'finished'."
  },
  {
    id: 8,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "Mai ______ (see) her English teacher at the supermarket yesterday.",
    cueLabel: "(see)",
    segments: [
      { text: "Mai " },
      { isBlank: true, blankIndex: 0, cue: "see", placeholder: "Type answer..." },
      { text: " her English teacher at the supermarket yesterday." }
    ],
    expectedAnswers: [["saw"]],
    spokenSentence: "Mai, blank, see, her English teacher at the supermarket yesterday.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'See' là động từ bất quy tắc, dạng quá khứ là 'saw'."
  },
  {
    id: 9,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "Tom ______ (write) an email to his friend last night.",
    cueLabel: "(write)",
    segments: [
      { text: "Tom " },
      { isBlank: true, blankIndex: 0, cue: "write", placeholder: "Type answer..." },
      { text: " an email to his friend last night." }
    ],
    expectedAnswers: [["wrote"]],
    spokenSentence: "Tom, blank, write, an email to his friend last night.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Write' là động từ bất quy tắc, dạng quá khứ là 'wrote'."
  },
  {
    id: 10,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "They ______ (have) a picnic near the lake last weekend.",
    cueLabel: "(have)",
    segments: [
      { text: "They " },
      { isBlank: true, blankIndex: 0, cue: "have", placeholder: "Type answer..." },
      { text: " a picnic near the lake last weekend." }
    ],
    expectedAnswers: [["had"]],
    spokenSentence: "They, blank, have, a picnic near the lake last weekend.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Have' là động từ bất quy tắc, dạng quá khứ là 'had'."
  },
  {
    id: 11,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "My father ______ (drive) me to school yesterday morning.",
    cueLabel: "(drive)",
    segments: [
      { text: "My father " },
      { isBlank: true, blankIndex: 0, cue: "drive", placeholder: "Type answer..." },
      { text: " me to school yesterday morning." }
    ],
    expectedAnswers: [["drove"]],
    spokenSentence: "My father, blank, drive, me to school yesterday morning.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Drive' là động từ bất quy tắc, dạng quá khứ là 'drove'."
  },
  {
    id: 12,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "The little girl ______ (drink) a glass of milk before bed.",
    cueLabel: "(drink)",
    segments: [
      { text: "The little girl " },
      { isBlank: true, blankIndex: 0, cue: "drink", placeholder: "Type answer..." },
      { text: " a glass of milk before bed." }
    ],
    expectedAnswers: [["drank"]],
    spokenSentence: "The little girl, blank, drink, a glass of milk before bed.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Drink' là động từ bất quy tắc, dạng quá khứ là 'drank'."
  },
  {
    id: 13,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "We ______ (take) many beautiful photos during our holiday.",
    cueLabel: "(take)",
    segments: [
      { text: "We " },
      { isBlank: true, blankIndex: 0, cue: "take", placeholder: "Type answer..." },
      { text: " many beautiful photos during our holiday." }
    ],
    expectedAnswers: [["took"]],
    spokenSentence: "We, blank, take, many beautiful photos during our holiday.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Take' là động từ bất quy tắc, dạng quá khứ là 'took'."
  },
  {
    id: 14,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "Peter ______ (give) his mother some flowers on her birthday.",
    cueLabel: "(give)",
    segments: [
      { text: "Peter " },
      { isBlank: true, blankIndex: 0, cue: "give", placeholder: "Type answer..." },
      { text: " his mother some flowers on her birthday." }
    ],
    expectedAnswers: [["gave"]],
    spokenSentence: "Peter, blank, give, his mother some flowers on her birthday.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Give' là động từ bất quy tắc, dạng quá khứ là 'gave'."
  },
  {
    id: 15,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "The children ______ (sing) an English song at the party.",
    cueLabel: "(sing)",
    segments: [
      { text: "The children " },
      { isBlank: true, blankIndex: 0, cue: "sing", placeholder: "Type answer..." },
      { text: " an English song at the party." }
    ],
    expectedAnswers: [["sang"]],
    spokenSentence: "The children, blank, sing, an English song at the party.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Sing' là động từ bất quy tắc, dạng quá khứ là 'sang'."
  },
  {
    id: 16,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "Mrs Brown ______ (teach) us English last year.",
    cueLabel: "(teach)",
    segments: [
      { text: "Mrs Brown " },
      { isBlank: true, blankIndex: 0, cue: "teach", placeholder: "Type answer..." },
      { text: " us English last year." }
    ],
    expectedAnswers: [["taught"]],
    spokenSentence: "Mrs Brown, blank, teach, us English last year.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Teach' là động từ bất quy tắc, dạng quá khứ là 'taught'."
  },
  {
    id: 17,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "I ______ (meet) my best friend at the library yesterday.",
    cueLabel: "(meet)",
    segments: [
      { text: "I " },
      { isBlank: true, blankIndex: 0, cue: "meet", placeholder: "Type answer..." },
      { text: " my best friend at the library yesterday." }
    ],
    expectedAnswers: [["met"]],
    spokenSentence: "I, blank, meet, my best friend at the library yesterday.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Meet' là động từ bất quy tắc, dạng quá khứ là 'met'."
  },
  {
    id: 18,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "David ______ (make) a model plane last weekend.",
    cueLabel: "(make)",
    segments: [
      { text: "David " },
      { isBlank: true, blankIndex: 0, cue: "make", placeholder: "Type answer..." },
      { text: " a model plane last weekend." }
    ],
    expectedAnswers: [["made"]],
    spokenSentence: "David, blank, make, a model plane last weekend.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Make' là động từ bất quy tắc, dạng quá khứ là 'made'."
  },
  {
    id: 19,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "The dog ______ (run) across the garden five minutes ago.",
    cueLabel: "(run)",
    segments: [
      { text: "The dog " },
      { isBlank: true, blankIndex: 0, cue: "run", placeholder: "Type answer..." },
      { text: " across the garden five minutes ago." }
    ],
    expectedAnswers: [["ran"]],
    spokenSentence: "The dog, blank, run, across the garden five minutes ago.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Run' là động từ bất quy tắc, dạng quá khứ là 'ran'."
  },
  {
    id: 20,
    level: 'Recognize',
    levelVi: 'Nhận biết',
    category: 'irregular',
    categoryLabel: 'Irregular Verbs',
    rawSentence: "My sister ______ (read) an interesting story last night.",
    cueLabel: "(read)",
    segments: [
      { text: "My sister " },
      { isBlank: true, blankIndex: 0, cue: "read", placeholder: "Type answer..." },
      { text: " an interesting story last night." }
    ],
    expectedAnswers: [["read"]],
    spokenSentence: "My sister, blank, read, an interesting story last night.",
    vietnameseHint: HINTS.affirmative,
    explanation: "'Read' ở thì quá khứ viết giống dạng nguyên mẫu là 'read' (phát âm là /red/)."
  },

  // 21-40: Understand - Thông hiểu
  {
    id: 21,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "I ______ (not watch) television yesterday evening.",
    cueLabel: "(not watch)",
    segments: [
      { text: "I " },
      { isBlank: true, blankIndex: 0, cue: "not watch", placeholder: "Type answer..." },
      { text: " television yesterday evening." }
    ],
    expectedAnswers: [["did not watch", "didn't watch", "didn’t watch"]],
    spokenSentence: "I, blank, not watch, television yesterday evening.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: S + did not / didn't + V(nguyên mẫu) -> 'did not watch' hoặc 'didn't watch'."
  },
  {
    id: 22,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "She ______ (not come) to school last Monday.",
    cueLabel: "(not come)",
    segments: [
      { text: "She " },
      { isBlank: true, blankIndex: 0, cue: "not come", placeholder: "Type answer..." },
      { text: " to school last Monday." }
    ],
    expectedAnswers: [["did not come", "didn't come", "didn’t come"]],
    spokenSentence: "She, blank, not come, to school last Monday.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not come' hoặc 'didn't come'."
  },
  {
    id: 23,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "We ______ (not understand) the teacher’s question.",
    cueLabel: "(not understand)",
    segments: [
      { text: "We " },
      { isBlank: true, blankIndex: 0, cue: "not understand", placeholder: "Type answer..." },
      { text: " the teacher’s question." }
    ],
    expectedAnswers: [["did not understand", "didn't understand", "didn’t understand"]],
    spokenSentence: "We, blank, not understand, the teacher’s question.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not understand' hoặc 'didn't understand'."
  },
  {
    id: 24,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "Nam ______ (not do) his homework last night.",
    cueLabel: "(not do)",
    segments: [
      { text: "Nam " },
      { isBlank: true, blankIndex: 0, cue: "not do", placeholder: "Type answer..." },
      { text: " his homework last night." }
    ],
    expectedAnswers: [["did not do", "didn't do", "didn’t do"]],
    spokenSentence: "Nam, blank, not do, his homework last night.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not do' hoặc 'didn't do' (do là động từ chính nguyên mẫu)."
  },
  {
    id: 25,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "My parents ______ (not buy) anything at the market yesterday.",
    cueLabel: "(not buy)",
    segments: [
      { text: "My parents " },
      { isBlank: true, blankIndex: 0, cue: "not buy", placeholder: "Type answer..." },
      { text: " anything at the market yesterday." }
    ],
    expectedAnswers: [["did not buy", "didn't buy", "didn’t buy"]],
    spokenSentence: "My parents, blank, not buy, anything at the market yesterday.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not buy' hoặc 'didn't buy'."
  },
  {
    id: 26,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "The children ______ (not play) outside because it rained heavily.",
    cueLabel: "(not play)",
    segments: [
      { text: "The children " },
      { isBlank: true, blankIndex: 0, cue: "not play", placeholder: "Type answer..." },
      { text: " outside because it rained heavily." }
    ],
    expectedAnswers: [["did not play", "didn't play", "didn’t play"]],
    spokenSentence: "The children, blank, not play, outside because it rained heavily.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not play' hoặc 'didn't play'."
  },
  {
    id: 27,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "Hoa ______ (not eat) breakfast yesterday morning.",
    cueLabel: "(not eat)",
    segments: [
      { text: "Hoa " },
      { isBlank: true, blankIndex: 0, cue: "not eat", placeholder: "Type answer..." },
      { text: " breakfast yesterday morning." }
    ],
    expectedAnswers: [["did not eat", "didn't eat", "didn’t eat"]],
    spokenSentence: "Hoa, blank, not eat, breakfast yesterday morning.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not eat' hoặc 'didn't eat'."
  },
  {
    id: 28,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "He ______ (not take) the bus to work last week.",
    cueLabel: "(not take)",
    segments: [
      { text: "He " },
      { isBlank: true, blankIndex: 0, cue: "not take", placeholder: "Type answer..." },
      { text: " the bus to work last week." }
    ],
    expectedAnswers: [["did not take", "didn't take", "didn’t take"]],
    spokenSentence: "He, blank, not take, the bus to work last week.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not take' hoặc 'didn't take'."
  },
  {
    id: 29,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "They ______ (not visit) the museum during their trip.",
    cueLabel: "(not visit)",
    segments: [
      { text: "They " },
      { isBlank: true, blankIndex: 0, cue: "not visit", placeholder: "Type answer..." },
      { text: " the museum during their trip." }
    ],
    expectedAnswers: [["did not visit", "didn't visit", "didn’t visit"]],
    spokenSentence: "They, blank, not visit, the museum during their trip.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not visit' hoặc 'didn't visit'."
  },
  {
    id: 30,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'negative',
    categoryLabel: 'Negative Form',
    rawSentence: "My mother ______ (not cook) dinner last night.",
    cueLabel: "(not cook)",
    segments: [
      { text: "My mother " },
      { isBlank: true, blankIndex: 0, cue: "not cook", placeholder: "Type answer..." },
      { text: " dinner last night." }
    ],
    expectedAnswers: [["did not cook", "didn't cook", "didn’t cook"]],
    spokenSentence: "My mother, blank, not cook, dinner last night.",
    vietnameseHint: HINTS.negative,
    explanation: "Câu phủ định quá khứ đơn: 'did not cook' hoặc 'didn't cook'."
  },
  {
    id: 31,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "______ you ______ (help) your mother yesterday?",
    cueLabel: "(help)",
    segments: [
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "Did..." },
      { text: " you " },
      { isBlank: true, blankIndex: 1, cue: "help", placeholder: "Verb..." },
      { text: " your mother yesterday?" }
    ],
    expectedAnswers: [["did"], ["help"]],
    spokenSentence: "Blank, you, blank, help, your mother yesterday?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Câu hỏi Yes/No quá khứ đơn: Did + S + V(nguyên mẫu)? -> Ô 1: 'Did', Ô 2: 'help'."
  },
  {
    id: 32,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "______ Lan ______ (go) to the English club last Saturday?",
    cueLabel: "(go)",
    segments: [
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "Did..." },
      { text: " Lan " },
      { isBlank: true, blankIndex: 1, cue: "go", placeholder: "Verb..." },
      { text: " to the English club last Saturday?" }
    ],
    expectedAnswers: [["did"], ["go"]],
    spokenSentence: "Blank, Lan, blank, go, to the English club last Saturday?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Câu hỏi Yes/No: Did + Lan + go...? -> Ô 1: 'Did', Ô 2: 'go'."
  },
  {
    id: 33,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "What ______ Nam ______ (do) after school yesterday?",
    cueLabel: "(do)",
    segments: [
      { text: "What " },
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "did..." },
      { text: " Nam " },
      { isBlank: true, blankIndex: 1, cue: "do", placeholder: "Verb..." },
      { text: " after school yesterday?" }
    ],
    expectedAnswers: [["did"], ["do"]],
    spokenSentence: "What, blank, Nam, blank, do, after school yesterday?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Wh-question: What + did + Nam + do...? -> Ô 1: 'did', Ô 2: 'do'."
  },
  {
    id: 34,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "Where ______ your family ______ (stay) during the holiday?",
    cueLabel: "(stay)",
    segments: [
      { text: "Where " },
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "did..." },
      { text: " your family " },
      { isBlank: true, blankIndex: 1, cue: "stay", placeholder: "Verb..." },
      { text: " during the holiday?" }
    ],
    expectedAnswers: [["did"], ["stay"]],
    spokenSentence: "Where, blank, your family, blank, stay, during the holiday?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Wh-question: Where + did + your family + stay...? -> Ô 1: 'did', Ô 2: 'stay'."
  },
  {
    id: 35,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "When ______ they ______ (arrive) at the airport?",
    cueLabel: "(arrive)",
    segments: [
      { text: "When " },
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "did..." },
      { text: " they " },
      { isBlank: true, blankIndex: 1, cue: "arrive", placeholder: "Verb..." },
      { text: " at the airport?" }
    ],
    expectedAnswers: [["did"], ["arrive"]],
    spokenSentence: "When, blank, they, blank, arrive, at the airport?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Wh-question: When + did + they + arrive...? -> Ô 1: 'did', Ô 2: 'arrive'."
  },
  {
    id: 36,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "______ Mai ______ (send) you a message last night?",
    cueLabel: "(send)",
    segments: [
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "Did..." },
      { text: " Mai " },
      { isBlank: true, blankIndex: 1, cue: "send", placeholder: "Verb..." },
      { text: " you a message last night?" }
    ],
    expectedAnswers: [["did"], ["send"]],
    spokenSentence: "Blank, Mai, blank, send, you a message last night?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Câu hỏi Yes/No: Did + Mai + send...? -> Ô 1: 'Did', Ô 2: 'send'."
  },
  {
    id: 37,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "Why ______ Tom ______ (leave) the party early?",
    cueLabel: "(leave)",
    segments: [
      { text: "Why " },
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "did..." },
      { text: " Tom " },
      { isBlank: true, blankIndex: 1, cue: "leave", placeholder: "Verb..." },
      { text: " the party early?" }
    ],
    expectedAnswers: [["did"], ["leave"]],
    spokenSentence: "Why, blank, Tom, blank, leave, the party early?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Wh-question: Why + did + Tom + leave...? -> Ô 1: 'did', Ô 2: 'leave'."
  },
  {
    id: 38,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "What time ______ your father ______ (get) home yesterday?",
    cueLabel: "(get)",
    segments: [
      { text: "What time " },
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "did..." },
      { text: " your father " },
      { isBlank: true, blankIndex: 1, cue: "get", placeholder: "Verb..." },
      { text: " home yesterday?" }
    ],
    expectedAnswers: [["did"], ["get"]],
    spokenSentence: "What time, blank, your father, blank, get, home yesterday?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Wh-question: What time + did + your father + get...? -> Ô 1: 'did', Ô 2: 'get'."
  },
  {
    id: 39,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "______ the students ______ (complete) the project on time?",
    cueLabel: "(complete)",
    segments: [
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "Did..." },
      { text: " the students " },
      { isBlank: true, blankIndex: 1, cue: "complete", placeholder: "Verb..." },
      { text: " the project on time?" }
    ],
    expectedAnswers: [["did"], ["complete"]],
    spokenSentence: "Blank, the students, blank, complete, the project on time?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Câu hỏi Yes/No: Did + the students + complete...? -> Ô 1: 'Did', Ô 2: 'complete'."
  },
  {
    id: 40,
    level: 'Understand',
    levelVi: 'Thông hiểu',
    category: 'question',
    categoryLabel: 'Question Form',
    rawSentence: "Who ______ you ______ (meet) at the shopping centre?",
    cueLabel: "(meet)",
    segments: [
      { text: "Who " },
      { isBlank: true, blankIndex: 0, cue: "", placeholder: "did..." },
      { text: " you " },
      { isBlank: true, blankIndex: 1, cue: "meet", placeholder: "Verb..." },
      { text: " at the shopping centre?" }
    ],
    expectedAnswers: [["did"], ["meet"]],
    spokenSentence: "Who, blank, you, blank, meet, at the shopping centre?",
    vietnameseHint: HINTS.interrogative,
    explanation: "Wh-question: Who + did + you + meet...? -> Ô 1: 'did', Ô 2: 'meet'."
  },

  // 41-50: Apply - Vận dụng
  {
    id: 41,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "I ______ (be) very tired after the football match.",
    cueLabel: "(be)",
    segments: [
      { text: "I " },
      { isBlank: true, blankIndex: 0, cue: "be", placeholder: "was / were..." },
      { text: " very tired after the football match." }
    ],
    expectedAnswers: [["was"]],
    spokenSentence: "I, blank, be, very tired after the football match.",
    vietnameseHint: HINTS.tobeAffirmative,
    explanation: "Chủ ngữ 'I' đi với dạng quá khứ của 'to be' là 'was'."
  },
  {
    id: 42,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "Nam and Minh ______ (be) at the zoo yesterday afternoon.",
    cueLabel: "(be)",
    segments: [
      { text: "Nam and Minh " },
      { isBlank: true, blankIndex: 0, cue: "be", placeholder: "was / were..." },
      { text: " at the zoo yesterday afternoon." }
    ],
    expectedAnswers: [["were"]],
    spokenSentence: "Nam and Minh, blank, be, at the zoo yesterday afternoon.",
    vietnameseHint: HINTS.tobeAffirmative,
    explanation: "Chủ ngữ số nhiều 'Nam and Minh' đi với 'were'."
  },
  {
    id: 43,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "The weather ______ (be) sunny and warm last weekend.",
    cueLabel: "(be)",
    segments: [
      { text: "The weather " },
      { isBlank: true, blankIndex: 0, cue: "be", placeholder: "was / were..." },
      { text: " sunny and warm last weekend." }
    ],
    expectedAnswers: [["was"]],
    spokenSentence: "The weather, blank, be, sunny and warm last weekend.",
    vietnameseHint: HINTS.tobeAffirmative,
    explanation: "Chủ ngữ không đếm được / số ít 'The weather' đi với 'was'."
  },
  {
    id: 44,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "My friends ______ (be not) at school yesterday.",
    cueLabel: "(be not)",
    segments: [
      { text: "My friends " },
      { isBlank: true, blankIndex: 0, cue: "be not", placeholder: "were not..." },
      { text: " at school yesterday." }
    ],
    expectedAnswers: [["were not", "weren't", "weren’t"]],
    spokenSentence: "My friends, blank, be not, at school yesterday.",
    vietnameseHint: HINTS.tobeNegative,
    explanation: "Chủ ngữ số nhiều 'My friends' phủ định với to be là 'were not' hoặc 'weren't'."
  },
  {
    id: 45,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "She ______ (be not) happy with her test result.",
    cueLabel: "(be not)",
    segments: [
      { text: "She " },
      { isBlank: true, blankIndex: 0, cue: "be not", placeholder: "was not..." },
      { text: " happy with her test result." }
    ],
    expectedAnswers: [["was not", "wasn't", "wasn’t"]],
    spokenSentence: "She, blank, be not, happy with her test result.",
    vietnameseHint: HINTS.tobeNegative,
    explanation: "Chủ ngữ số ít 'She' phủ định với to be là 'was not' hoặc 'wasn't'."
  },
  {
    id: 46,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "______ your teacher at the meeting yesterday? (be)",
    cueLabel: "(be)",
    segments: [
      { isBlank: true, blankIndex: 0, cue: "be", placeholder: "Was / Were..." },
      { text: " your teacher at the meeting yesterday? (be)" }
    ],
    expectedAnswers: [["was"]],
    spokenSentence: "Blank, your teacher at the meeting yesterday? be.",
    vietnameseHint: HINTS.tobeQuestion,
    explanation: "Chủ ngữ số ít 'your teacher' đảo 'Was' lên đầu câu hỏi."
  },
  {
    id: 47,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'tobe',
    categoryLabel: 'Verb "to be"',
    rawSentence: "______ the children excited about the school trip? (be)",
    cueLabel: "(be)",
    segments: [
      { isBlank: true, blankIndex: 0, cue: "be", placeholder: "Was / Were..." },
      { text: " the children excited about the school trip? (be)" }
    ],
    expectedAnswers: [["were"]],
    spokenSentence: "Blank, the children excited about the school trip? be.",
    vietnameseHint: HINTS.tobeQuestion,
    explanation: "Chủ ngữ số nhiều 'the children' đảo 'Were' lên đầu câu hỏi."
  },
  {
    id: 48,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'regular',
    categoryLabel: 'Regular Verbs',
    rawSentence: "When I was six, I ______ (live) in a small village.",
    cueLabel: "(live)",
    segments: [
      { text: "When I was six, I " },
      { isBlank: true, blankIndex: 0, cue: "live", placeholder: "Type answer..." },
      { text: " in a small village." }
    ],
    expectedAnswers: [["lived"]],
    spokenSentence: "When I was six, I, blank, live, in a small village.",
    vietnameseHint: HINTS.multiVerbs,
    explanation: "Động từ 'live' kết thúc bằng 'e', chỉ cần thêm 'd' thành 'lived'."
  },
  {
    id: 49,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'multi',
    categoryLabel: 'Multiple Verbs',
    rawSentence: "Last summer, we ______ (swim) in the sea and ______ (eat) fresh seafood.",
    cueLabel: "(swim) & (eat)",
    segments: [
      { text: "Last summer, we " },
      { isBlank: true, blankIndex: 0, cue: "swim", placeholder: "1st verb..." },
      { text: " in the sea and " },
      { isBlank: true, blankIndex: 1, cue: "eat", placeholder: "2nd verb..." },
      { text: " fresh seafood." }
    ],
    expectedAnswers: [["swam"], ["ate"]],
    spokenSentence: "Last summer, we, blank, swim, in the sea and, blank, eat, fresh seafood.",
    vietnameseHint: HINTS.multiVerbs,
    explanation: "Cả hai hành động đều ở quá khứ: 'swim' chuyển thành 'swam' và 'eat' chuyển thành 'ate'."
  },
  {
    id: 50,
    level: 'Apply',
    levelVi: 'Vận dụng',
    category: 'multi',
    categoryLabel: 'Multiple Verbs',
    rawSentence: "Yesterday, Mai ______ (get) up early, ______ (have) breakfast and ______ (walk) to school.",
    cueLabel: "(get), (have) & (walk)",
    segments: [
      { text: "Yesterday, Mai " },
      { isBlank: true, blankIndex: 0, cue: "get", placeholder: "1st verb..." },
      { text: " up early, " },
      { isBlank: true, blankIndex: 1, cue: "have", placeholder: "2nd verb..." },
      { text: " breakfast and " },
      { isBlank: true, blankIndex: 2, cue: "walk", placeholder: "3rd verb..." },
      { text: " to school." }
    ],
    expectedAnswers: [["got"], ["had"], ["walked"]],
    spokenSentence: "Yesterday, Mai, blank, get, up early, blank, have, breakfast and, blank, walk, to school.",
    vietnameseHint: HINTS.multiVerbs,
    explanation: "Chuỗi hành động quá khứ: 'get' -> 'got', 'have' -> 'had', 'walk' -> 'walked'."
  }
];
