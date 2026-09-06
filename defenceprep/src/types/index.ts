// ============================================================
// Core Types for DefencePrep
// Architecture designed to support NDA, CDS, AFCAT, CAPF etc.
// ============================================================

export type ExamCode = 'NDA' | 'CDS' | 'AFCAT' | 'CAPF' | 'INET';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionStatus =
  | 'not-visited'
  | 'not-answered'
  | 'answered'
  | 'marked-for-review'
  | 'answered-marked';

// ============================================================
// Exam
// ============================================================
export interface Exam {
  id: string;
  code: ExamCode;
  name: string;
  fullName: string;
  description: string;
  conductedBy: string;
  frequency: string;
  officialSite: string;
  eligibility: {
    age: string;
    education: string;
    nationality: string;
    gender: string;
  };
  selectionProcess: string[];
  color: string; // accent color for exam branding
}

// ============================================================
// Paper
// ============================================================
export interface Paper {
  id: string;
  examCode: ExamCode;
  year: number;
  session?: 'I' | 'II' | 'I+II'; // NDA/CDS has 2 sessions per year
  paperName: string;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  maximumMarks: number;
  negativeMarking: number; // marks deducted per wrong answer (e.g. 0.83)
  correctMarkingPerQuestion: number;
  instructions: string[];
  sections?: PaperSection[]; // optional sections within a paper
  available: boolean; // whether questions are loaded
  tags: string[];
}

export interface PaperSection {
  id: string;
  name: string;
  questions: number;
  marks: number;
}

// ============================================================
// Question
// ============================================================
export interface Option {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  paperId: string;
  questionNumber: number;
  text: string;
  options: Option[];
  correctOption: 'A' | 'B' | 'C' | 'D' | null;
  explanation?: string; // placeholder for future
  subject: string;
  topic?: string;
  difficulty?: Difficulty;
  imageUrl?: string; // for diagram questions
  contentMode?: 'text' | 'latex' | 'image';
  sourceImage?: string | null;
  sharedContext?: string | null;
  latex?: string | null;
  pageNumber?: number;
  extractionConfidence?: number;
  needsReview?: boolean;
  warning?: string | null;
}

// ============================================================
// Attempt (Test Session)
// ============================================================
export interface Answer {
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  status: QuestionStatus;
  timeSpent?: number; // seconds spent on this question
}

export interface Attempt {
  id: string;
  paperId: string;
  paper: Paper;
  startTime: number; // unix timestamp ms
  endTime?: number;
  durationSecondsAllowed: number;
  durationSecondsUsed?: number;
  answers: Record<string, Answer>; // key: questionId
  submitted: boolean;
  result?: AttemptResult;
}

// ============================================================
// Result
// ============================================================
export interface AttemptResult {
  attemptId: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  markedForReview: number;
  score: number;
  maxScore: number;
  accuracy: number; // percentage
  timeTakenSeconds: number;
  subjectPerformance: SubjectPerformance[];
  topicPerformance: TopicPerformance[];
  answerKeyAvailable?: boolean;
}

export interface SubjectPerformance {
  subject: string;
  total: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  maxScore: number;
  accuracy: number;
}

export interface TopicPerformance {
  subject: string;
  topic: string;
  total: number;
  correct: number;
  accuracy: number;
}

// ============================================================
// Performance Dashboard
// ============================================================
export interface UserStats {
  testsAttempted: number;
  totalQuestionsAttempted: number;
  averageScore: number;
  averageAccuracy: number;
  bestScore: number;
  recentAttempts: AttemptSummary[];
  subjectStrengths: SubjectStrength[];
}

export interface AttemptSummary {
  attemptId: string;
  paperId: string;
  paperName: string;
  examCode: ExamCode;
  score: number;
  maxScore: number;
  accuracy: number;
  date: number;
}

export interface SubjectStrength {
  subject: string;
  accuracy: number;
  questionsAttempted: number;
}

// ============================================================
// Filter Types
// ============================================================
export interface PaperFilters {
  examCode?: ExamCode | 'ALL';
  year?: number | 'ALL';
  subject?: string | 'ALL';
  search?: string;
  sortOrder?: 'newest' | 'oldest';
}
