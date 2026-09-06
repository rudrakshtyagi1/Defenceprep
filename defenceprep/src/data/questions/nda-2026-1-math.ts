import type { Question } from '../../types';
import rawData from './nda-2026-1-mathematics.json';

// ============================================================
// NDA 2026 (I) — Mathematics (Full Paper: 120 Questions)
// Extracted from official UPSC NDA (I) 2026 Mathematics PDF
// High-resolution original print crops at /questions/nda-2026-1-math/
// ============================================================

const PAPER_ID = 'nda-2026-1-math';

interface RawQuestion {
  questionNumber: number;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  pageNumber?: number;
  contentMode: 'text' | 'latex' | 'image';
  latex?: string | null;
  sourceImage?: string | null;
  sharedContext?: string | null;
  extractionConfidence?: number;
  needsReview?: boolean;
  warning?: string | null;
  correctOption?: 'A' | 'B' | 'C' | 'D' | null;
  topic?: string;
}

export const NDA_2026_1_MATH_QUESTIONS: Question[] = (
  rawData.questions as unknown as RawQuestion[]
).map((q) => ({
  id: `${PAPER_ID}-q${q.questionNumber}`,
  paperId: PAPER_ID,
  questionNumber: q.questionNumber,
  text: q.text,
  options: [
    { key: 'A', text: q.options?.A ?? 'A' },
    { key: 'B', text: q.options?.B ?? 'B' },
    { key: 'C', text: q.options?.C ?? 'C' },
    { key: 'D', text: q.options?.D ?? 'D' },
  ],
  correctOption: q.correctOption ?? null,
  explanation: q.latex
    ? `LaTeX expression: ${q.latex}`
    : q.sourceImage
    ? `Source: Official UPSC NDA 2026 (I) Page ${q.pageNumber || 'English section'}`
    : undefined,
  subject: 'Mathematics',
  topic: q.topic || 'General Mathematics',
  difficulty:
    q.questionNumber > 80 ? 'hard' : q.questionNumber > 40 ? 'medium' : 'easy',
  contentMode: q.contentMode,
  sourceImage: q.sourceImage ?? null,
  sharedContext: q.sharedContext ?? null,
  latex: q.latex ?? null,
  pageNumber: q.pageNumber,
  extractionConfidence: q.extractionConfidence,
  needsReview: q.needsReview,
  warning: q.warning,
}));
