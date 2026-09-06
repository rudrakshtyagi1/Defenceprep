import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stats: {
    total: number;
    answered: number;
    notAnswered: number;
    markedForReview: number;
    notVisited: number;
  };
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  stats,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-2xl p-6 relative"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-dp-muted hover:text-dp-secondary transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)' }}
                >
                  <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-dp-primary">Submit Test?</h2>
                  <p className="text-sm text-dp-muted">Review your progress before submitting.</p>
                </div>
              </div>

              {/* Stats grid */}
              <div
                className="rounded-xl p-4 mb-6 grid grid-cols-2 gap-3"
                style={{ backgroundColor: 'var(--color-surface-2)' }}
              >
                <StatRow label="Total Questions" value={stats.total} color="var(--color-text-primary)" />
                <StatRow label="Answered" value={stats.answered} color="#10b981" />
                <StatRow label="Not Answered" value={stats.notAnswered} color="#f59e0b" />
                <StatRow label="Marked for Review" value={stats.markedForReview} color="#8b5cf6" />
                <StatRow label="Not Visited" value={stats.notVisited} color="var(--color-text-muted)" />
                <StatRow
                  label="Unattempted"
                  value={stats.notAnswered + stats.notVisited}
                  color="#ef4444"
                />
              </div>

              {stats.notAnswered + stats.notVisited > 0 && (
                <div
                  className="flex items-start gap-2 p-3 rounded-lg mb-5 text-sm"
                  style={{
                    backgroundColor: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    color: '#f59e0b',
                  }}
                >
                  <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>
                    You have <strong>{stats.notAnswered + stats.notVisited}</strong> unattempted questions. Unattempted questions do not incur negative marking.
                  </span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1 justify-center"
                >
                  Continue Test
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#ef4444' }}
                >
                  Submit Test
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const StatRow: React.FC<{ label: string; value: number; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-dp-muted">{label}</span>
    <span className="text-sm font-bold" style={{ color }}>
      {value}
    </span>
  </div>
);

export default SubmitModal;
