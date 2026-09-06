import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface ExamTimerProps {
  secondsLeft: number;
  totalSeconds: number;
  isWarning?: boolean;
  isCritical?: boolean;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const ExamTimer: React.FC<ExamTimerProps> = ({
  secondsLeft,
  totalSeconds,
  isWarning,
  isCritical,
}) => {
  const percent = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0;

  const barColor = isCritical
    ? '#ef4444'
    : isWarning
    ? '#f59e0b'
    : 'var(--color-accent-from)';

  const textColor = isCritical
    ? '#ef4444'
    : isWarning
    ? '#f59e0b'
    : 'var(--color-text-primary)';

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="flex items-center gap-2 text-lg font-mono font-bold tabular-nums"
        style={{ color: textColor }}
      >
        {isCritical ? (
          <AlertTriangle size={18} className="animate-pulse" style={{ color: '#ef4444' }} />
        ) : (
          <Clock size={18} style={{ color: 'var(--color-text-secondary)' }} />
        )}
        {formatTime(secondsLeft)}
      </div>
      {/* Progress bar */}
      <div
        className="w-32 h-1 rounded-full overflow-hidden"
        style={{ background: 'var(--color-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${percent}%`, background: barColor }}
        />
      </div>
    </div>
  );
};

export default ExamTimer;
