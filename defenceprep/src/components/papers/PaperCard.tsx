import { motion } from 'framer-motion';
import { Clock, FileText, Target, ChevronRight } from 'lucide-react';
import type { Paper } from '../../types';

interface PaperCardProps {
  paper: Paper;
  onAttempt: (paperId: string) => void;
}

const examBadgeConfig: Record<string, { label: string; className: string }> = {
  NDA: {
    label: 'NDA',
    className: 'bg-teal-500/15 text-teal-500 border border-teal-500/30',
  },
  CDS: {
    label: 'CDS',
    className: 'bg-blue-500/15 text-blue-500 border border-blue-500/30',
  },
  AFCAT: {
    label: 'AFCAT',
    className: 'bg-amber-500/15 text-amber-500 border border-amber-500/30',
  },
  CAPF: {
    label: 'CAPF',
    className: 'bg-purple-500/15 text-purple-500 border border-purple-500/30',
  },
  INET: {
    label: 'INET',
    className: 'bg-rose-500/15 text-rose-500 border border-rose-500/30',
  },
};

export default function PaperCard({ paper, onAttempt }: PaperCardProps) {
  const badge = examBadgeConfig[paper.examCode] ?? examBadgeConfig['NDA'];
  const sessionLabel = paper.session ? ` (${paper.session})` : '';

  return (
    <motion.div
      className="card-dp flex flex-col p-5 gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Top row: exam badge + year */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${badge.className}`}
          >
            {badge.label}
          </span>
          {paper.tags?.includes('Official PYQ') && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Official PYQ
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-dp-muted tabular-nums">
          {paper.year}{sessionLabel}
        </span>
      </div>

      {/* Paper name + subject */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-medium text-dp-muted uppercase tracking-wider">
          {paper.paperName}
        </p>
        <h3 className="text-base font-bold text-dp-primary leading-snug">
          {paper.subject}
        </h3>
      </div>

      {/* Detail chips */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 text-dp-secondary">
          <FileText size={13} strokeWidth={2} className="shrink-0" />
          <span className="text-xs font-medium tabular-nums">
            {paper.totalQuestions} Qs
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-dp-secondary">
          <Clock size={13} strokeWidth={2} className="shrink-0" />
          <span className="text-xs font-medium tabular-nums">
            {paper.durationMinutes} min
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-dp-secondary">
          <Target size={13} strokeWidth={2} className="shrink-0" />
          <span className="text-xs font-medium tabular-nums">
            {paper.maximumMarks} marks
          </span>
        </div>
      </div>

      {/* Negative marking note */}
      <p className="text-xs text-dp-muted">
        −{paper.negativeMarking} per wrong &nbsp;·&nbsp; +{paper.correctMarkingPerQuestion} per correct
      </p>

      {/* Divider */}
      <div className="border-t border-dp" />

      {/* CTA */}
      <button
        onClick={() => onAttempt(paper.id)}
        disabled={!paper.available}
        className={`btn-primary w-full justify-center text-sm ${
          !paper.available ? 'opacity-40 cursor-not-allowed' : ''
        }`}
      >
        {paper.available ? 'Attempt Test' : 'Coming Soon'}
        {paper.available && <ChevronRight size={15} strokeWidth={2.5} />}
      </button>
    </motion.div>
  );
}
