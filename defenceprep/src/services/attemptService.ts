import type { Attempt, AttemptSummary, UserStats } from '../types';

const KEYS = {
  ATTEMPTS: 'dp-attempts',
  HISTORY: 'dp-history',
};

export const attemptService = {
  saveAttempt(attempt: Attempt): void {
    const all = this.getAllAttempts();
    all[attempt.id] = attempt;
    localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(all));
  },

  getAttempt(id: string): Attempt | null {
    const all = this.getAllAttempts();
    return all[id] ?? null;
  },

  getInProgressAttempt(paperId: string): Attempt | null {
    const all = this.getAllAttempts();
    const found = Object.values(all).find(
      (a) => a.paperId === paperId && !a.submitted
    );
    return found ?? null;
  },

  getAllAttempts(): Record<string, Attempt> {
    try {
      const raw = localStorage.getItem(KEYS.ATTEMPTS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  addToHistory(attempt: Attempt): void {
    if (!attempt.result) return;
    const history = this.getHistory();
    const summary: AttemptSummary = {
      attemptId: attempt.id,
      paperId: attempt.paperId,
      paperName: `${attempt.paper.paperName} — ${attempt.paper.subject}`,
      examCode: attempt.paper.examCode,
      score: attempt.result.score,
      maxScore: attempt.result.maxScore,
      accuracy: attempt.result.accuracy,
      date: attempt.endTime ?? Date.now(),
    };
    // Avoid duplicates
    const filtered = history.filter((h) => h.attemptId !== attempt.id);
    filtered.unshift(summary);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(filtered.slice(0, 100)));
  },

  getHistory(): AttemptSummary[] {
    try {
      const raw = localStorage.getItem(KEYS.HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  getUserStats(): UserStats {
    const history = this.getHistory();

    if (history.length === 0) {
      return {
        testsAttempted: 0,
        totalQuestionsAttempted: 0,
        averageScore: 0,
        averageAccuracy: 0,
        bestScore: 0,
        recentAttempts: [],
        subjectStrengths: [],
      };
    }

    const scores = history.map((h) => (h.score / h.maxScore) * 100);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const avgAccuracy = Math.round(
      history.reduce((a, b) => a + b.accuracy, 0) / history.length
    );
    const bestScore = Math.round(Math.max(...scores));

    // Subject strengths from attempts
    const all = this.getAllAttempts();
    const subjectMap = new Map<string, { correct: number; total: number }>();

    Object.values(all).forEach((attempt) => {
      if (!attempt.result) return;
      attempt.result.subjectPerformance.forEach((sp) => {
        const existing = subjectMap.get(sp.subject) ?? { correct: 0, total: 0 };
        existing.correct += sp.correct;
        existing.total += sp.attempted;
        subjectMap.set(sp.subject, existing);
      });
    });

    const subjectStrengths = Array.from(subjectMap.entries()).map(([subject, v]) => ({
      subject,
      accuracy: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
      questionsAttempted: v.total,
    }));

    const totalQuestionsAttempted = Object.values(all).reduce(
      (sum, a) => sum + (a.result?.attempted ?? 0),
      0
    );

    return {
      testsAttempted: history.length,
      totalQuestionsAttempted,
      averageScore: avgScore,
      averageAccuracy: avgAccuracy,
      bestScore,
      recentAttempts: history.slice(0, 10),
      subjectStrengths,
    };
  },

  clearAll(): void {
    localStorage.removeItem(KEYS.ATTEMPTS);
    localStorage.removeItem(KEYS.HISTORY);
  },
};
