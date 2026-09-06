import { motion } from 'framer-motion';

interface ProgressBarProps {
  /** Value from 0 to 100 */
  value: number;
  /** Optional CSS color string (hex, rgb, or CSS var). Defaults to accent gradient. */
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({
  value,
  color,
  showLabel = false,
  size = 'md',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const trackHeight = size === 'sm' ? 'h-1.5' : 'h-2.5';
  const labelSize = size === 'sm' ? 'text-xs' : 'text-sm';

  const fillStyle: React.CSSProperties = color
    ? { backgroundColor: color, borderRadius: 'inherit' }
    : {
        background: 'linear-gradient(90deg, var(--dp-accent) 0%, var(--dp-accent-2, #7c3aed) 100%)',
        borderRadius: 'inherit',
      };

  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className={`flex-1 ${trackHeight} bg-dp-surface-2 rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full"
          style={fillStyle}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span
          className={`${labelSize} font-semibold text-dp-secondary tabular-nums w-10 text-right flex-shrink-0`}
        >
          {clamped}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
