import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
}: ConfirmationModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const confirmBtnClass =
    variant === 'danger'
      ? 'px-5 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors duration-150 cursor-pointer'
      : 'btn-primary px-5 py-2 text-sm';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirmation-modal-title"
              className="pointer-events-auto w-full max-w-md card-dp p-6 flex flex-col gap-5 shadow-2xl"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <h3
                  id="confirmation-modal-title"
                  className="text-dp-primary font-bold text-lg leading-snug"
                >
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-dp-muted hover:text-dp-primary hover:bg-dp-surface transition-all duration-150"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Body */}
              <div className="text-dp-secondary text-sm leading-relaxed">
                {children}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button onClick={onClose} className="btn-secondary px-5 py-2 text-sm">
                  {cancelLabel}
                </button>
                <button
                  onClick={() => { onConfirm(); onClose(); }}
                  className={confirmBtnClass}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ConfirmationModal;
