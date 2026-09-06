import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { attemptService } from '../services/attemptService';
import SEOHead from '../components/seo/SEOHead';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';

const PerformancePage: React.FC = () => {
  const navigate = useNavigate();
  const stats = useMemo(() => attemptService.getUserStats(), []);
  const history = useMemo(() => attemptService.getHistory(), []);

  const chartData = useMemo(() => {
    return history
      .slice()
      .reverse()
      .slice(-15)
      .map((h, i) => ({
        name: `#${i + 1}`,
        scorePercent: Math.round((h.score / h.maxScore) * 100),
        accuracy: h.accuracy,
        paper: h.paperName,
      }));
  }, [history]);

  const strongSubjects = stats.subjectStrengths
    .filter((s) => s.accuracy >= 60)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 5);

  const weakSubjects = stats.subjectStrengths
    .filter((s) => s.accuracy < 60 && s.questionsAttempted > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  const chartTheme = {
    grid: 'var(--color-border)',
    text: 'var(--color-text-muted)',
    tooltip: {
      bg: 'var(--color-surface)',
      border: 'var(--color-border)',
      text: 'var(--color-text-primary)',
    },
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-dp-bg pb-16">
      <SEOHead title="Performance Analytics | DefencePrep" noindex={true} />
      {/* Header */}
      <div
        className="py-12 px-4 md:px-8 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dp-muted mb-3">
            <BarChart2 size={13} />
            Your Analytics
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-dp-primary mb-2">
            Performance <span className="gradient-accent">Dashboard</span>
          </h1>
          <p className="text-dp-secondary text-sm">
            Know exactly where you stand. Track progress across every paper.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        {stats.testsAttempted === 0 ? (
          <EmptyState navigate={navigate} />
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard
                icon={<BookOpen size={18} />}
                label="Tests Attempted"
                value={stats.testsAttempted}
                color="#3b82f6"
              />
              <StatCard
                icon={<Target size={18} />}
                label="Avg Accuracy"
                value={`${stats.averageAccuracy}%`}
                color="#10b981"
                isText
              />
              <StatCard
                icon={<BarChart2 size={18} />}
                label="Avg Score"
                value={`${stats.averageScore}%`}
                color="var(--color-accent-from)"
                isText
              />
              <StatCard
                icon={<Award size={18} />}
                label="Best Score"
                value={`${stats.bestScore}%`}
                color="#f59e0b"
                isText
              />
              <StatCard
                icon={<Clock size={18} />}
                label="Qs Attempted"
                value={stats.totalQuestionsAttempted}
                color="#8b5cf6"
              />
            </div>

            {/* Charts */}
            {chartData.length >= 2 && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Score Trend */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h2 className="text-base font-bold text-dp-primary mb-5">Score Trend</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-accent-from)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--color-accent-from)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                      <XAxis dataKey="name" tick={{ fill: chartTheme.text, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fill: chartTheme.text, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: chartTheme.tooltip.bg,
                          border: `1px solid ${chartTheme.tooltip.border}`,
                          borderRadius: '8px',
                          color: chartTheme.tooltip.text,
                          fontSize: '12px',
                        }}
                        formatter={(v: any) => [`${v}%`, 'Score']}
                        labelFormatter={(_, payload) => payload?.[0]?.payload?.paper ?? ''}
                      />
                      <Area
                        type="monotone"
                        dataKey="scorePercent"
                        stroke="var(--color-accent-from)"
                        strokeWidth={2}
                        fill="url(#scoreGradient)"
                        dot={{ fill: 'var(--color-accent-from)', r: 4 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Accuracy Trend */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h2 className="text-base font-bold text-dp-primary mb-5">Accuracy Trend</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                      <XAxis dataKey="name" tick={{ fill: chartTheme.text, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fill: chartTheme.text, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: chartTheme.tooltip.bg,
                          border: `1px solid ${chartTheme.tooltip.border}`,
                          borderRadius: '8px',
                          color: chartTheme.tooltip.text,
                          fontSize: '12px',
                        }}
                        formatter={(v: any) => [`${v}%`, 'Accuracy']}
                      />
                      <Area
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#accGradient)"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Strong + Weak */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strong */}
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp size={18} style={{ color: '#10b981' }} />
                  <h2 className="text-base font-bold text-dp-primary">Strong Areas</h2>
                </div>
                {strongSubjects.length > 0 ? (
                  <div className="space-y-3">
                    {strongSubjects.map((s) => (
                      <div key={s.subject}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-dp-secondary">{s.subject}</span>
                          <span className="text-sm font-bold" style={{ color: '#10b981' }}>
                            {s.accuracy}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${s.accuracy}%`, backgroundColor: '#10b981' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-dp-muted">Attempt more papers to identify strong areas.</p>
                )}
              </div>

              {/* Weak */}
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <TrendingDown size={18} style={{ color: '#ef4444' }} />
                  <h2 className="text-base font-bold text-dp-primary">Needs Improvement</h2>
                </div>
                {weakSubjects.length > 0 ? (
                  <div className="space-y-3">
                    {weakSubjects.map((s) => (
                      <div key={s.subject}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-dp-secondary">{s.subject}</span>
                          <span className="text-sm font-bold" style={{ color: '#ef4444' }}>
                            {s.accuracy}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${s.accuracy}%`, backgroundColor: '#ef4444' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-dp-muted">No weak areas detected — keep practicing.</p>
                )}
              </div>
            </div>

            {/* Recent Tests */}
            {history.length > 0 && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="p-6 pb-4">
                  <h2 className="text-base font-bold text-dp-primary">Recent Tests</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        {['Paper', 'Exam', 'Score', 'Accuracy', 'Date', ''].map((h) => (
                          <th
                            key={h}
                            className="text-left px-6 py-3 text-xs font-semibold text-dp-muted uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(0, 10).map((h) => (
                        <tr
                          key={h.attemptId}
                          style={{ borderBottom: '1px solid var(--color-border)' }}
                          className="hover:bg-dp-surface-2 transition-colors"
                        >
                          <td className="px-6 py-4 text-dp-primary font-medium max-w-48 truncate">
                            {h.paperName}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="px-2 py-0.5 rounded text-xs font-semibold"
                              style={{
                                backgroundColor:
                                  h.examCode === 'NDA'
                                    ? 'rgba(0,212,170,0.1)'
                                    : 'rgba(59,130,246,0.1)',
                                color:
                                  h.examCode === 'NDA' ? '#00d4aa' : '#3b82f6',
                              }}
                            >
                              {h.examCode}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="font-bold"
                              style={{
                                color:
                                  h.score / h.maxScore >= 0.6
                                    ? '#10b981'
                                    : '#f59e0b',
                              }}
                            >
                              {h.score}/{h.maxScore}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-dp-secondary">{h.accuracy}%</td>
                          <td className="px-6 py-4 text-dp-muted">{formatDate(h.date)}</td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/results/${h.attemptId}`}
                              className="text-xs text-dp-muted hover:text-dp-primary flex items-center gap-1"
                            >
                              Review <ChevronRight size={12} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  isText?: boolean;
}> = ({ icon, label, value, color }) => (
  <div
    className="rounded-2xl p-5 flex flex-col gap-3"
    style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
    }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {icon}
    </div>
    <div>
      <div className="text-2xl font-black" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-dp-muted mt-0.5">{label}</div>
    </div>
  </div>
);

const EmptyState: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(59,130,246,0.1))',
        border: '1px solid var(--color-border)',
      }}
    >
      <BarChart2 size={36} style={{ color: 'var(--color-accent-from)' }} />
    </div>
    <h2 className="text-2xl font-bold text-dp-primary mb-3">No Data Yet</h2>
    <p className="text-dp-secondary max-w-sm mb-6">
      Attempt your first test to start tracking your performance. Your scores,
      accuracy, and subject-wise analysis will appear here.
    </p>
    <button onClick={() => navigate('/papers')} className="btn-primary">
      Start Your First Test
    </button>
  </div>
);

export default PerformancePage;
