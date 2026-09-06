import { useState, useEffect, useCallback, useRef } from 'react';
import type { Answer, Attempt, AttemptResult, Paper, Question, QuestionStatus } from '../types';
import { scoreService } from '../services/scoreService';
import { attemptService } from '../services/attemptService';

interface UseTestEngineProps {
  paper: Paper;
  questions: Question[];
  existingAttemptId?: string;
}

interface TestEngineState {
  attempt: Attempt;
  currentQuestionIndex: number;
  isSubmitted: boolean;
  result: AttemptResult | null;
  timeRemainingSeconds: number;
  isTimerRunning: boolean;
}

interface TestEngineActions {
  selectAnswer: (questionId: string, option: 'A' | 'B' | 'C' | 'D') => void;
  clearResponse: (questionId: string) => void;
  markForReview: (questionId: string) => void;
  saveAndNext: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  submitTest: () => AttemptResult;
  getQuestionStatus: (questionId: string) => QuestionStatus;
  getStatusCounts: () => Record<QuestionStatus, number>;
}

export function useTestEngine({
  paper,
  questions,
  existingAttemptId,
}: UseTestEngineProps): TestEngineState & TestEngineActions {
  const initAttempt = useCallback((): Attempt => {
    // Try to resume existing attempt
    if (existingAttemptId) {
      const saved = attemptService.getAttempt(existingAttemptId);
      if (saved && !saved.submitted) return saved;
    }

    // Look for an in-progress attempt for this paper
    const inProgress = attemptService.getInProgressAttempt(paper.id);
    if (inProgress) return inProgress;

    // Create new attempt
    const now = Date.now();
    const answers: Record<string, Answer> = {};
    questions.forEach((q) => {
      answers[q.id] = {
        questionId: q.id,
        selectedOption: null,
        status: 'not-visited',
      };
    });

    const newAttempt: Attempt = {
      id: `attempt-${now}-${paper.id}`,
      paperId: paper.id,
      paper,
      startTime: now,
      durationSecondsAllowed: paper.durationMinutes * 60,
      answers,
      submitted: false,
    };

    attemptService.saveAttempt(newAttempt);
    return newAttempt;
  }, [paper, questions, existingAttemptId]);

  const [attempt, setAttempt] = useState<Attempt>(initAttempt);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(attempt.submitted);
  const [result, setResult] = useState<AttemptResult | null>(attempt.result || null);
  const [isTimerRunning, setIsTimerRunning] = useState(!attempt.submitted);

  const elapsed = attempt.endTime
    ? Math.floor((attempt.endTime - attempt.startTime) / 1000)
    : Math.floor((Date.now() - attempt.startTime) / 1000);

  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(
    Math.max(0, paper.durationMinutes * 60 - elapsed)
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptRef = useRef(attempt);
  const handleAutoSubmitRef = useRef<() => void>(() => {});

  useEffect(() => {
    attemptRef.current = attempt;
  }, [attempt]);

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          // Auto-submit
          clearInterval(timerRef.current!);
          handleAutoSubmitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isSubmitted]);

  // Persist attempt to localStorage on every change
  const persistAttempt = useCallback((updated: Attempt) => {
    attemptService.saveAttempt(updated);
  }, []);

  const updateAttempt = useCallback(
    (updater: (prev: Attempt) => Attempt) => {
      setAttempt((prev) => {
        const updated = updater(prev);
        persistAttempt(updated);
        return updated;
      });
    },
    [persistAttempt]
  );

  const selectAnswer = useCallback(
    (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
      updateAttempt((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: {
            ...prev.answers[questionId],
            selectedOption: option,
            status:
              prev.answers[questionId].status === 'marked-for-review'
                ? 'answered-marked'
                : 'answered',
          },
        },
      }));
    },
    [updateAttempt]
  );

  const clearResponse = useCallback(
    (questionId: string) => {
      updateAttempt((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: {
            ...prev.answers[questionId],
            selectedOption: null,
            status: 'not-answered',
          },
        },
      }));
    },
    [updateAttempt]
  );

  const markForReview = useCallback(
    (questionId: string) => {
      updateAttempt((prev) => {
        const current = prev.answers[questionId];
        const newStatus: QuestionStatus =
          current.selectedOption
            ? 'answered-marked'
            : 'marked-for-review';
        return {
          ...prev,
          answers: {
            ...prev.answers,
            [questionId]: { ...current, status: newStatus },
          },
        };
      });
    },
    [updateAttempt]
  );

  const visitQuestion = useCallback(
    (questionId: string) => {
      updateAttempt((prev) => {
        const current = prev.answers[questionId];
        if (current.status === 'not-visited') {
          return {
            ...prev,
            answers: {
              ...prev.answers,
              [questionId]: { ...current, status: 'not-answered' },
            },
          };
        }
        return prev;
      });
    },
    [updateAttempt]
  );

  const saveAndNext = useCallback(
    (_questionId?: string) => {
      // Status is already set by selectAnswer; just advance
      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        visitQuestion(questions[nextIndex].id);
      }
    },
    [currentQuestionIndex, questions, visitQuestion]
  );

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentQuestionIndex(index);
        visitQuestion(questions[index].id);
      }
    },
    [questions, visitQuestion]
  );

  const goNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      visitQuestion(questions[nextIndex].id);
    }
  }, [currentQuestionIndex, questions, visitQuestion]);

  const goPrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      visitQuestion(questions[prevIndex].id);
    }
  }, [currentQuestionIndex, questions, visitQuestion]);

  const doSubmit = useCallback(
    (auto = false): AttemptResult => {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsTimerRunning(false);

      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - attemptRef.current.startTime) / 1000);

      const calculatedResult = scoreService.calculate({
        paper,
        questions,
        answers: attemptRef.current.answers,
        timeTakenSeconds: auto
          ? paper.durationMinutes * 60
          : timeTaken,
        attemptId: attemptRef.current.id,
      });

      const finalAttempt: Attempt = {
        ...attemptRef.current,
        endTime,
        durationSecondsUsed: timeTaken,
        submitted: true,
        result: calculatedResult,
      };

      setAttempt(finalAttempt);
      setIsSubmitted(true);
      setResult(calculatedResult);
      attemptService.saveAttempt(finalAttempt);
      attemptService.addToHistory(finalAttempt);

      return calculatedResult;
    },
    [paper, questions]
  );

  const submitTest = useCallback(() => doSubmit(false), [doSubmit]);
  const handleAutoSubmit = useCallback(() => doSubmit(true), [doSubmit]);

  useEffect(() => {
    handleAutoSubmitRef.current = handleAutoSubmit;
  }, [handleAutoSubmit]);

  // Visit first question on mount
  useEffect(() => {
    if (questions.length > 0 && !isSubmitted) {
      visitQuestion(questions[0].id);
    }
  }, []);

  const getQuestionStatus = useCallback(
    (questionId: string): QuestionStatus => {
      return attempt.answers[questionId]?.status ?? 'not-visited';
    },
    [attempt.answers]
  );

  const getStatusCounts = useCallback((): Record<QuestionStatus, number> => {
    const counts: Record<QuestionStatus, number> = {
      'not-visited': 0,
      'not-answered': 0,
      answered: 0,
      'marked-for-review': 0,
      'answered-marked': 0,
    };
    Object.values(attempt.answers).forEach((a) => {
      counts[a.status]++;
    });
    return counts;
  }, [attempt.answers]);

  return {
    attempt,
    currentQuestionIndex,
    isSubmitted,
    result,
    timeRemainingSeconds,
    isTimerRunning,
    selectAnswer,
    clearResponse,
    markForReview,
    saveAndNext,
    goToQuestion,
    goNext,
    goPrev,
    submitTest,
    getQuestionStatus,
    getStatusCounts,
  };
}
