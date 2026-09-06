import { type ReactNode } from 'react';

type BadgeVariant = 'nda' | 'cds' | 'success' | 'warning' | 'default';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

const VARIANT_STYLES: Record<
  BadgeVariant,
  { bg: string; text: string; border: string }
> = {
  nda: {
    bg: 'rgba(59, 130, 246, 0.12)',
    text: '#3b82f6',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  cds: {
    bg: 'rgba(168, 85, 247, 0.12)',
    text: '#a855f7',
    border: 'rgba(168, 85, 247, 0.3)',
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.12)',
    text: '#22c55e',
    border: 'rgba(34, 197, 94, 0.3)',
  },
  warning: {
    bg: 'rgba(234, 179, 8, 0.12)',
    text: '#eab308',
    border: 'rgba(234, 179, 8, 0.3)',
  },
  default: {
    bg: 'rgba(148, 163, 184, 0.12)',
    text: 'var(--dp-text-secondary)',
    border: 'rgba(148, 163, 184, 0.25)',
  },
};

export function Badge({ variant, children }: BadgeProps) {
  const s = VARIANT_STYLES[variant];

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border"
      style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
    >
      {children}
    </span>
  );
}

export default Badge;
