import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import { attemptService } from '../services/attemptService';
import { getQuestionsForPaper } from '../data/questions';
import type { AttemptResult } from '../types';
import OptionButton from '../components/test/OptionButton';
import {
  CheckCircle,
  XCircle,
  Minus,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

type ReviewFilter = 'all' | 'correct' | 'incorrect' | 'unattempted' | 'marked';

const ResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const [showReview, setShowReview] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const attempt = attemptId ? attemptService.getAttempt(attemptId) : null;
  const result: AttemptResult | null = attempt?.result ?? null;
  const questions = attempt ? getQuestionsForPaper(attempt.paperId) : [];

  const filteredQuestions = useMemo(() => {
    if (!attempt) return [];
    return questions.filter((q) => {
      const answer = attempt.answers[q.id];
      switch (reviewFilter) {
        case 'correct':
          return answer?.selectedOption === q.correctOption;
        case 'incorrect':
          return answer?.selectedOption && answer.selectedOption !== q.correctOption;
        case 'unattempted':
          return !answer?.selectedOption;
        case 'marked':
          return (
            answer?.status === 'marked-for-review' ||
            answer?.status === 'answered-marked'
          );
        default:
          return true;
      }
    });
  }, [questions, attempt, reviewFilter]);

  if (!attempt || !result) {
    return (
      <div className="min-h-screen bg-dp-bg flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-6xl">📋</div>
        <h1 className="text-2xl font-bold text-dp-primary">Result Not Found</h1>
        <p className="text-dp-secondary text-center max-w-sm">
          We couldn't find this test result. It may have been cleared or the link is incorrect.
        </p>
        <button onClick={() => navigate('/papers')} className="btn-primary">
          Browse Papers
        </button>
      </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  const scorePercent = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0;

  const toggleQuestion = (qId: string) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const pieData = [
    { name: 'Correct', value: result.correct, color: '#10b981' },
    { name: 'Incorrect', value: result.incorrect, color: '#ef4444' },
    { name: 'Unattempted', value: result.unattempted, color: 'var(--color-border)' },
  ];

  const scoreGrade = scorePercent >= 80 ? 'Excellent' : scorePercent >= 60 ? 'Good' : scorePercent >= 40 ? 'Average' : 'Needs Work';
  const gradeColor = scorePercent >= 80 ? '#10b981' : scorePercent >= 60 ? '#3b82f6' : scorePercent >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="min-h-screen bg-dp-bg pb-16">
      <SEOHead 
        title={`Results: ${attempt.paper.paperName}`}
        description="Your test result and analysis."
        noindex={true}
      />
      {/* Header */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <button
          onClick={() => navigate('/papers')}
          className="flex items-center gap-2 text-sm text-dp-secondary hover:text-dp-primary transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Papers
        </button>
        <div className="text-sm font-semibold text-dp-primary">
          {attempt.paper.paperName} — {attempt.paper.subject}
        </div>
        <Link to={`/test/${attempt.paperId}`} className="btn-primary text-xs px-4 py-2">
          Reattempt
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-8 space-y-8">
        {/* Hero Result Card */}
        <div
          className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Background accent */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, var(--color-accent-from), transparent)',
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                {result.answerKeyAvailable === false ? (
                  <>
                    <div className="text-xs font-semibold tracking-widest text-dp-muted uppercase mb-1">
                      Official Mock Completed (PYQ)
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-dp-primary">
                      {result.attempted}
                      <span className="text-lg text-dp-muted font-normal"> / {result.totalQuestions} Attempted</span>
                    </h1>
                    <div
                      className="mt-2 inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}
                    >
                      Official UPSC Answer Key Pending · Practice Mode
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-semibold tracking-widest text-dp-muted uppercase mb-1">
                      Your Result
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-dp-primary">
                      {result.score}
                      <span className="text-lg text-dp-muted font-normal"> / {result.maxScore}</span>
                    </h1>
                    <div
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${gradeColor}20`, color: gradeColor }}
                    >
                      {scoreGrade} — {scorePercent}%
                    </div>
                  </>
                )}
              </div>
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={42}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <MetricBox label="Score" value={result.score} suffix={`/${result.maxScore}`} color="var(--color-accent-from)" />
              <MetricBox label="Accuracy" value={result.accuracy} suffix="%" color="#3b82f6" />
              <MetricBox label="Attempted" value={result.attempted} suffix={`/${result.totalQuestions}`} color="var(--color-text-primary)" />
              <MetricBox label="Correct" value={result.correct} color="#10b981" />
              <MetricBox label="Incorrect" value={result.incorrect} color="#ef4444" />
              <MetricBox label="Time" value={formatTime(result.timeTakenSeconds)} color="#8b5cf6" isText />
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        {result.subjectPerformance.length > 0 && (
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 className="text-lg font-bold text-dp-primary mb-6">Subject Performance</h2>
            <div className="space-y-4">
              {result.subjectPerformance.map((sp) => (
                <div key={sp.subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dp-primary">{sp.subject}</span>
                    <div className="flex items-center gap-4 text-xs text-dp-muted">
                      <span>
                        {sp.correct}/{sp.attempted} correct
                      </span>
                      <span
                        className="font-bold text-sm"
                        style={{
                          color:
                            sp.accuracy >= 60
                              ? '#10b981'
                              : sp.accuracy >= 40
                              ? '#f59e0b'
                              : '#ef4444',
                        }}
                      >
                        {sp.accuracy}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-surface-2)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${sp.accuracy}%`,
                        background:
                          sp.accuracy >= 60
                            ? 'linear-gradient(90deg, #10b981, #059669)'
                            : sp.accuracy >= 40
                            ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                            : 'linear-gradient(90deg, #ef4444, #dc2626)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strong / Weak Topics */}
        {result.topicPerformance.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Strong */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} style={{ color: '#10b981' }} />
                <h2 className="text-base font-bold text-dp-primary">Strong Topics</h2>
              </div>
              <div className="space-y-2">
                {result.topicPerformance
                  .filter((t) => t.accuracy >= 60 && t.total > 1)
                  .sort((a, b) => b.accuracy - a.accuracy)
                  .slice(0, 5)
                  .map((t) => (
                    <TopicRow key={`${t.subject}-${t.topic}`} topic={t.topic} accuracy={t.accuracy} positive />
                  ))}
                {result.topicPerformance.filter((t) => t.accuracy >= 60).length === 0 && (
                  <p className="text-sm text-dp-muted">Keep practicing to identify strong areas.</p>
                )}
              </div>
            </div>

            {/* Weak */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown size={18} style={{ color: '#ef4444' }} />
                <h2 className="text-base font-bold text-dp-primary">Needs Improvement</h2>
              </div>
              <div className="space-y-2">
                {result.topicPerformance
                  .filter((t) => t.accuracy < 60 && t.total > 1)
                  .sort((a, b) => a.accuracy - b.accuracy)
                  .slice(0, 5)
                  .map((t) => (
                    <TopicRow key={`${t.subject}-${t.topic}`} topic={t.topic} accuracy={t.accuracy} positive={false} />
                  ))}
                {result.topicPerformance.filter((t) => t.accuracy < 60).length === 0 && (
                  <p className="text-sm text-dp-muted">No weak topics identified yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Question Review */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between p-6 pb-0">
            <h2 className="text-lg font-bold text-dp-primary">Question Review</h2>
            <button
              onClick={() => setShowReview(!showReview)}
              className="btn-secondary text-sm px-4 py-2"
            >
              {showReview ? 'Hide Review' : 'Show Review'}
            </button>
          </div>

          {showReview && (
            <div className="p-6 pt-4">
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(
                  [
                    { key: 'all', label: 'All', count: questions.length },
                    { key: 'correct', label: 'Correct', count: result.correct },
                    { key: 'incorrect', label: 'Incorrect', count: result.incorrect },
                    { key: 'unattempted', label: 'Unattempted', count: result.unattempted },
                    { key: 'marked', label: 'Marked', count: result.markedForReview },
                  ] as { key: ReviewFilter; label: string; count: number }[]
                ).map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setReviewFilter(key)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor:
                        reviewFilter === key
                          ? 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))'
                          : 'var(--color-surface-2)',
                      background:
                        reviewFilter === key
                          ? 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))'
                          : undefined,
                      color:
                        reviewFilter === key ? '#0a0e1a' : 'var(--color-text-secondary)',
                      border: `1px solid ${reviewFilter === key ? 'transparent' : 'var(--color-border)'}`,
                    }}
                  >
                    {label}
                    <span
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: reviewFilter === key ? 'rgba(0,0,0,0.15)' : 'var(--color-surface)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const answer = attempt.answers[q.id];
                  const hasKey = q.correctOption !== null && q.correctOption !== undefined;
                  const isCorrect = hasKey ? answer?.selectedOption === q.correctOption : false;
                  const isIncorrect = hasKey ? !!answer?.selectedOption && !isCorrect : false;
                  const isAttempted = !!answer?.selectedOption;
                  const isExpanded = expandedQuestions.has(q.id);

                  return (
                    <div
                      key={q.id}
                      className="rounded-xl overflow-hidden"
                      style={{
                        border: `1px solid ${
                          isCorrect
                            ? 'rgba(16,185,129,0.3)'
                            : isIncorrect
                            ? 'rgba(239,68,68,0.3)'
                            : isAttempted && !hasKey
                            ? 'rgba(0,212,170,0.3)'
                            : 'var(--color-border)'
                        }`,
                        backgroundColor: 'var(--color-surface-2)',
                      }}
                    >
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        {/* Status icon */}
                        <div className="flex-shrink-0">
                          {isCorrect ? (
                            <CheckCircle size={18} style={{ color: '#10b981' }} />
                          ) : isIncorrect ? (
                            <XCircle size={18} style={{ color: '#ef4444' }} />
                          ) : isAttempted && !hasKey ? (
                            <CheckCircle size={18} style={{ color: 'var(--color-accent-from)' }} />
                          ) : (
                            <Minus size={18} style={{ color: 'var(--color-text-muted)' }} />
                          )}
                        </div>
                        <span className="text-xs text-dp-muted font-medium mr-1">
                          Q{q.questionNumber}
                        </span>
                        <span className="text-sm text-dp-primary line-clamp-1 flex-1 text-left">
                          {q.text}
                        </span>
                        {!hasKey && isAttempted && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-dp-surface text-dp-secondary border border-dp">
                            Recorded: {answer?.selectedOption}
                          </span>
                        )}
                        <span className="text-xs text-dp-muted flex-shrink-0">
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-dp">
                          {q.sourceImage && (
                            <div className="my-3 p-2 bg-white rounded-lg border border-gray-200 overflow-hidden flex justify-center">
                              <img
                                src={q.sourceImage}
                                alt={`Question ${q.questionNumber} crop`}
                                className="max-h-60 w-auto object-contain rounded select-none"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="pt-2 space-y-2">
                            {q.options.map((opt) => (
                              <OptionButton
                                key={opt.key}
                                option={opt}
                                isSelected={answer?.selectedOption === opt.key}
                                isCorrect={hasKey ? opt.key === q.correctOption : false}
                                isWrong={
                                  hasKey &&
                                  !!answer?.selectedOption &&
                                  answer.selectedOption !== q.correctOption &&
                                  answer.selectedOption === opt.key
                                }
                                isReviewMode={hasKey}
                              />
                            ))}

                            {q.explanation && (
                              <div
                                className="mt-4 p-4 rounded-lg text-sm"
                                style={{
                                  backgroundColor: 'rgba(59,130,246,0.08)',
                                  border: '1px solid rgba(59,130,246,0.2)',
                                  color: 'var(--color-text-secondary)',
                                }}
                              >
                                <div className="text-xs font-semibold mb-1" style={{ color: '#3b82f6' }}>
                                  Explanation
                                </div>
                                {q.explanation}
                              </div>
                            )}

                            <div className="flex items-center gap-4 mt-3 text-xs text-dp-muted">
                              <span>
                                Your answer:{' '}
                                <span
                                  className="font-bold"
                                  style={{ color: isCorrect ? '#10b981' : '#ef4444' }}
                                >
                                  {answer?.selectedOption ?? 'Not attempted'}
                                </span>
                              </span>
                              <span>
                                Correct answer:{' '}
                                <span className="font-bold" style={{ color: '#10b981' }}>
                                  {q.correctOption}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricBox: React.FC<{
  label: string;
  value: number | string;
  suffix?: string;
  color: string;
  isText?: boolean;
}> = ({ label, value, suffix, color, isText }) => (
  <div
    className="flex flex-col items-center p-3 rounded-xl"
    style={{ backgroundColor: 'var(--color-surface-2)' }}
  >
    <span className="text-2xl font-black" style={{ color }}>
      {isText ? value : value}
      {suffix && <span className="text-sm font-normal text-dp-muted">{suffix}</span>}
    </span>
    <span className="text-xs text-dp-muted mt-1">{label}</span>
  </div>
);

const TopicRow: React.FC<{ topic: string; accuracy: number; positive: boolean }> = ({
  topic,
  accuracy,
  positive,
}) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-dp-secondary truncate">{topic}</span>
    <span
      className="text-sm font-bold ml-2 flex-shrink-0"
      style={{ color: positive ? '#10b981' : '#ef4444' }}
    >
      {accuracy}%
    </span>
  </div>
);

export default ResultsPage;
