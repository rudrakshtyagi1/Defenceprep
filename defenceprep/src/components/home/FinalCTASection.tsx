import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-dp-bg border-t border-dp relative overflow-hidden">
      {/* Background glow accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-from) 0%, var(--color-accent-to) 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent-from)] mb-4">
          <ShieldCheck size={16} />
          High-Yield Exam Preparation
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-dp-primary tracking-tight leading-[1.1]">
          Your next attempt should be{' '}
          <span className="gradient-accent">better than your last.</span>
        </h2>

        <p className="mt-6 text-base md:text-lg text-dp-secondary max-w-2xl mx-auto leading-relaxed">
          Stop passively reading answer keys. Build battle-tested exam composure with full-length timed tests and exact negative marking.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/papers"
            className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto justify-center font-bold"
          >
            Start Practicing Free
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/performance"
            className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto justify-center font-medium"
          >
            View Sample Analysis
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-dp-muted">
          <span>✓ Instant Access</span>
          <span>•</span>
          <span>✓ No Credit Card Required</span>
          <span>•</span>
          <span>✓ Real 2023–2025 Papers</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
