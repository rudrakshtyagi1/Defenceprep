import React from 'react';
import { Link } from 'react-router-dom';
import ExamTimer from './ExamTimer';

interface TestTopBarProps {
  examName: string;
  paperName: string;
  secondsLeft: number;
  totalSeconds: number;
  isWarning: boolean;
  isCritical: boolean;
  onSubmitClick: () => void;
}

const TestTopBar: React.FC<TestTopBarProps> = ({
  examName,
  paperName,
  secondsLeft,
  totalSeconds,
  isWarning,
  isCritical,
  onSubmitClick,
}) => {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 gap-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* Left: Logo + paper info */}
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-black"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
              color: '#0a0e1a',
            }}
          >
            DP
          </div>
        </Link>
        <div
          className="hidden sm:block w-px h-5 flex-shrink-0"
          style={{ background: 'var(--color-border)' }}
        />
        <div className="min-w-0 hidden sm:block">
          <div className="text-xs text-dp-muted">{examName}</div>
          <div className="text-sm font-semibold text-dp-primary truncate">{paperName}</div>
        </div>
      </div>

      {/* Center: Timer */}
      <ExamTimer
        secondsLeft={secondsLeft}
        totalSeconds={totalSeconds}
        isWarning={isWarning}
        isCritical={isCritical}
      />

      {/* Right: Submit */}
      <button
        onClick={onSubmitClick}
        className="flex-shrink-0 text-sm font-semibold px-4 py-2 rounded transition-all duration-150 hover:opacity-90"
        style={{
          backgroundColor: isCritical ? '#ef4444' : 'var(--color-accent-solid)',
          color: '#fff',
        }}
      >
        Submit Test
      </button>
    </header>
  );
};

export default TestTopBar;
