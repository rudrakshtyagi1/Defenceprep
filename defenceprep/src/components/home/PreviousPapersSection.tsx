import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PAPERS } from '../../data/papers';
import PaperCard from '../papers/PaperCard';

const TABS = [
  { value: 'ALL', label: 'All Papers' },
  { value: 'NDA', label: 'NDA' },
  { value: 'CDS', label: 'CDS' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

export default function PreviousPapersSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabValue>('ALL');

  const filtered = PAPERS.filter((p) =>
    activeTab === 'ALL' ? true : p.examCode === activeTab
  ).slice(0, 6);

  const handleAttempt = (paperId: string) => {
    navigate(`/test/${paperId}`);
  };

  return (
    <section className="w-full bg-dp-surface-2 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <p className="text-xs font-bold text-[var(--color-accent-from)] uppercase tracking-widest">
              Real Exam Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-dp-primary tracking-tight">
              Practice Previous Year Papers
            </h2>
            <p className="text-dp-secondary text-base leading-relaxed max-w-xl">
              Don&apos;t just read PYQs. Attempt them like the real exam.
            </p>
          </motion.div>

          {/* View all link – desktop */}
          <Link
            to="/papers"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-from)] hover:opacity-80 transition-opacity whitespace-nowrap mb-1"
          >
            View all papers
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-1.5 bg-dp-surface border border-dp rounded-xl p-1 w-fit"
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`
                relative text-xs font-bold px-4 py-2 rounded-lg transition-all
                ${
                  activeTab === tab.value
                    ? 'text-dp-primary'
                    : 'text-dp-muted hover:text-dp-secondary'
                }
              `}
            >
              {activeTab === tab.value && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 gradient-accent-bg rounded-lg"
                  style={{ zIndex: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab.value ? 'text-[#0a0e1a]' : ''}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Paper grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((paper, i) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <PaperCard paper={paper} onAttempt={handleAttempt} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all link – mobile */}
        <div className="flex justify-center sm:hidden">
          <Link
            to="/papers"
            className="btn-secondary text-sm px-6 py-2.5"
          >
            View all papers
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
