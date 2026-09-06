import type { Answer, AttemptResult, Paper, Question, SubjectPerformance, TopicPerformance } from '../types';

interface CalculateParams {
  paper: Paper;
  questions: Question[];
  answers: Record<string, Answer>;
  timeTakenSeconds: number;
  attemptId: string;
}

export const scoreService = {
  calculate({
    paper,
    questions,
    answers,
    timeTakenSeconds,
    attemptId,
  }: CalculateParams): AttemptResult {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let markedForReview = 0;
    let rawScore = 0;

    const subjectMap = new Map<string, SubjectPerformance>();
    const topicMap = new Map<string, TopicPerformance>();

    questions.forEach((q) => {
      const answer = answers[q.id];
      const isMarked =
        answer.status === 'marked-for-review' ||
        answer.status === 'answered-marked';

      if (isMarked) markedForReview++;

      const subjectKey = q.subject;
      if (!subjectMap.has(subjectKey)) {
        subjectMap.set(subjectKey, {
          subject: subjectKey,
          total: 0,
          attempted: 0,
          correct: 0,
          incorrect: 0,
          score: 0,
          maxScore: 0,
          accuracy: 0,
        });
      }
      const subjectPerf = subjectMap.get(subjectKey)!;
      subjectPerf.total++;
      subjectPerf.maxScore += paper.correctMarkingPerQuestion;

      if (q.topic) {
        const topicKey = `${subjectKey}::${q.topic}`;
        if (!topicMap.has(topicKey)) {
          topicMap.set(topicKey, {
            subject: subjectKey,
            topic: q.topic,
            total: 0,
            correct: 0,
            accuracy: 0,
          });
        }
        topicMap.get(topicKey)!.total++;
      }

      if (!answer.selectedOption) {
        unattempted++;
      } else {
        subjectPerf.attempted++;

        if (q.correctOption === null || q.correctOption === undefined) {
          // Official answer key pending (e.g. recent official PYQ practice mode)
          // Attempt is recorded, but no right/wrong marking or penalty is applied yet
        } else if (answer.selectedOption === q.correctOption) {
          correct++;
          rawScore += paper.correctMarkingPerQuestion;
          subjectPerf.correct++;
          subjectPerf.score += paper.correctMarkingPerQuestion;

          if (q.topic) {
            const topicKey = `${subjectKey}::${q.topic}`;
            topicMap.get(topicKey)!.correct++;
          }
        } else {
          incorrect++;
          rawScore -= paper.negativeMarking;
          subjectPerf.incorrect++;
          subjectPerf.score -= paper.negativeMarking;
        }
      }
    });

    const hasAnswerKey = questions.some((q) => q.correctOption !== null && q.correctOption !== undefined);
    const score = Math.max(0, Math.round(rawScore * 100) / 100);
    const maxScore = paper.maximumMarks;
    const attempted = hasAnswerKey ? (correct + incorrect) : (questions.length - unattempted);
    const accuracy = (hasAnswerKey && attempted > 0) ? Math.round((correct / attempted) * 100) : 0;

    // Compute subject accuracies
    const subjectPerformance: SubjectPerformance[] = [];
    subjectMap.forEach((sp) => {
      sp.accuracy =
        sp.attempted > 0 ? Math.round((sp.correct / sp.attempted) * 100) : 0;
      sp.score = Math.max(0, Math.round(sp.score * 100) / 100);
      subjectPerformance.push(sp);
    });

    // Compute topic accuracies
    const topicPerformance: TopicPerformance[] = [];
    topicMap.forEach((tp) => {
      tp.accuracy = tp.total > 0 ? Math.round((tp.correct / tp.total) * 100) : 0;
      topicPerformance.push(tp);
    });

    return {
      attemptId,
      totalQuestions: questions.length,
      attempted,
      correct,
      incorrect,
      unattempted,
      markedForReview,
      score,
      maxScore,
      accuracy,
      timeTakenSeconds,
      subjectPerformance,
      topicPerformance,
      answerKeyAvailable: hasAnswerKey,
    };
  },
};
