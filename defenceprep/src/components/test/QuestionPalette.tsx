import React from 'react';
import type { QuestionStatus } from '../../types';

interface QuestionPaletteProps {
  answers: Record<string, { status: QuestionStatus }>;
  questionIds: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  counts: Record<QuestionStatus, number>;
}

const getButtonStyle = (status: QuestionStatus, isCurrent: boolean): React.CSSProperties => {
  if (isCurrent) {
    return {
      background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
      color: '#0a0e1a',
      border: 'none',
      fontWeight: 700,
    };
  }
  switch (status) {
    case 'answered':
      return { backgroundColor: '#10b981', color: '#fff', border: 'none' };
    case 'marked-for-review':
      return { backgroundColor: '#8b5cf6', color: '#fff', border: 'none' };
    case 'answered-marked':
      return { backgroundColor: '#3b82f6', color: '#fff', border: 'none' };
    case 'not-answered':
      return {
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        border: '2px solid #f59e0b',
      };
    default:
      return {
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border)',
      };
  }
};

const LEGEND = [
  { status: 'not-visited' as QuestionStatus, label: 'Not Visited', color: 'var(--color-surface)', border: '1px solid var(--color-border)' },
  { status: 'not-answered' as QuestionStatus, label: 'Not Answered', color: 'transparent', border: '2px solid #f59e0b' },
  { status: 'answered' as QuestionStatus, label: 'Answered', color: '#10b981', border: 'none' },
  { status: 'marked-for-review' as QuestionStatus, label: 'Marked for Review', color: '#8b5cf6', border: 'none' },
  { status: 'answered-marked' as QuestionStatus, label: 'Answered + Marked', color: '#3b82f6', border: 'none' },
];

const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  answers,
  questionIds,
  currentIndex,
  onSelect,
  counts,
}) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Legend */}
      <div className="flex flex-col gap-1.5">
        {LEGEND.map(({ status, label, color, border }) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded text-xs flex items-center justify-center flex-shrink-0"
              style={{ background: color, border }}
            />
            <span className="text-xs text-dp-muted">{label}</span>
            <span className="ml-auto text-xs font-medium text-dp-secondary">
              {counts[status]}
            </span>
          </div>
        ))}
      </div>

      <div
        className="h-px w-full"
        style={{ background: 'var(--color-border)' }}
      />

      {/* Grid */}
      <div className="grid grid-cols-5 gap-1.5 overflow-y-auto scrollbar-thin flex-1">
        {questionIds.map((qId, idx) => {
          const status = answers[qId]?.status ?? 'not-visited';
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={qId}
              onClick={() => onSelect(idx)}
              className="w-9 h-9 rounded text-xs font-semibold transition-transform duration-100 hover:scale-110 focus-visible:outline-offset-1"
              style={getButtonStyle(status, isCurrent)}
              aria-label={`Question ${idx + 1}, status: ${status}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPalette;
