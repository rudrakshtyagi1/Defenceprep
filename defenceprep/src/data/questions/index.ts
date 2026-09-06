import type { Question } from '../../types';
import { PAPERS } from '../papers';
import { NDA_2026_1_MATH_QUESTIONS } from './nda-2026-1-math';
import { NDA_2025_1_MATH_QUESTIONS } from './nda-2025-1-math';
import { NDA_2025_1_GAT_QUESTIONS } from './nda-2025-1-gat';
import { CDS_2025_1_ENGLISH_QUESTIONS } from './cds-2025-1-english';

// ============================================================
// Question Registry
// Maps paperId -> questions array
// Add new question sets here as they become available.
// ============================================================

type QuestionRegistry = Record<string, Question[]>;

const QUESTION_REGISTRY: QuestionRegistry = {
  'nda-2026-1-math': NDA_2026_1_MATH_QUESTIONS,
  'nda-2025-1-math': NDA_2025_1_MATH_QUESTIONS,
  'nda-2025-1-gat': NDA_2025_1_GAT_QUESTIONS,
  'cds-2025-1-english': CDS_2025_1_ENGLISH_QUESTIONS,
};

// Generate placeholder questions for papers that don't have questions yet
const generatePlaceholderQuestions = (paperId: string): Question[] => {
  const paper = PAPERS.find((p) => p.id === paperId);
  if (!paper) return [];

  const questions: Question[] = [];
  for (let i = 1; i <= paper.totalQuestions; i++) {
    questions.push({
      id: `${paperId}-q${i}`,
      paperId,
      questionNumber: i,
      text: `[Sample Question ${i}] This is a placeholder question for ${paper.paperName} — ${paper.subject}. Actual previous year questions will be added here.`,
      options: [
        { key: 'A', text: 'Option A — first possible answer' },
        { key: 'B', text: 'Option B — second possible answer' },
        { key: 'C', text: 'Option C — third possible answer' },
        { key: 'D', text: 'Option D — fourth possible answer' },
      ],
      correctOption: (['A', 'B', 'C', 'D'] as const)[i % 4],
      explanation:
        'This is a placeholder explanation. Actual explanations will be provided when the question bank is populated with official PYQs.',
      subject: paper.subject,
      topic: 'General',
      difficulty: i % 3 === 0 ? 'hard' : i % 3 === 1 ? 'medium' : 'easy',
    });
  }
  return questions;
};

export const getQuestionsForPaper = (paperId: string): Question[] => {
  if (QUESTION_REGISTRY[paperId]) {
    return QUESTION_REGISTRY[paperId];
  }
  return generatePlaceholderQuestions(paperId);
};

export const getQuestionById = (paperId: string, questionId: string): Question | undefined => {
  const questions = getQuestionsForPaper(paperId);
  return questions.find((q) => q.id === questionId);
};

export { QUESTION_REGISTRY };
