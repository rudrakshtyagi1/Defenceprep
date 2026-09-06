import React from 'react';
import { BookOpen, Timer, BarChart3, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Choose Exam & Paper',
    description: 'Select between NDA or CDS, filter by year (2023–2025), and pick your desired subject paper.',
    icon: <BookOpen size={24} className="text-teal-400" />,
  },
  {
    number: '02',
    title: 'Attempt Timed Test',
    description: 'Solve questions under real exam countdown timers, mark tricky questions for review, and experience authentic exam pressure.',
    icon: <Timer size={24} className="text-blue-400" />,
  },
  {
    number: '03',
    title: 'Analyse Performance',
    description: 'Instantly view your net score with exact negative marking, review detailed explanations, and pinpoint weak topics.',
    icon: <BarChart3 size={24} className="text-purple-400" />,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-dp-bg border-t border-dp">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dp-muted mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-from)]" />
            Execution Workflow
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-dp-primary tracking-tight">
            How It <span className="gradient-accent">Works</span>
          </h2>
          <p className="mt-3 text-dp-secondary text-sm md:text-base">
            No endless registration forms, paywalls, or useless fluff. Pure exam-grade practice in three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="card-dp p-8 relative flex flex-col justify-between overflow-hidden group hover:border-[var(--color-accent-from)]"
            >
              {/* Giant Watermark Step Number */}
              <div className="absolute -top-4 -right-2 text-7xl font-black text-dp-muted/10 select-none group-hover:text-[var(--color-accent-from)]/15 transition-colors">
                {step.number}
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-dp-surface-2 border border-dp flex items-center justify-center mb-6 shadow-sm">
                  {step.icon}
                </div>

                <div className="text-xs font-mono font-bold text-[var(--color-accent-from)] tracking-wider mb-2">
                  STEP {step.number}
                </div>

                <h3 className="text-xl font-bold text-dp-primary mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-dp-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-dp flex items-center justify-between">
                <span className="text-xs text-dp-muted font-medium">Standardized Protocol</span>
                <span className="w-6 h-6 rounded-full bg-dp-surface-2 border border-dp flex items-center justify-center text-xs text-dp-muted group-hover:border-[var(--color-accent-from)] group-hover:text-[var(--color-accent-from)] transition-colors">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/papers"
            className="btn-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            Launch Your First Test
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
