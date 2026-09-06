import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const, delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative w-full dot-grid bg-dp-bg overflow-hidden">
      {/* Gradient blobs for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--color-accent-from) 0%, var(--color-accent-to) 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 bg-dp-surface border border-dp rounded-full px-4 py-1.5"
        >
          <Shield size={13} strokeWidth={2.5} className="text-[var(--color-accent-from)]" />
          <span className="text-xs font-semibold text-dp-secondary tracking-wide uppercase">
            Built for NDA &amp; CDS Aspirants
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-1"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-dp-primary leading-[1.05] tracking-tight">
            MASTER PREVIOUS YEAR
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight gradient-accent">
            NDA &amp; CDS PAPERS
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-base sm:text-lg text-dp-secondary leading-relaxed font-medium"
        >
          Attempt real previous-year NDA and CDS papers in a timed exam environment.
          Analyse your mistakes, discover weak areas, and improve with every test.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/papers"
            className="btn-primary text-base px-7 py-3.5 rounded-lg font-bold"
          >
            Start Practicing
            <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
          <Link
            to="/papers"
            className="btn-secondary text-base px-7 py-3.5 rounded-lg font-semibold"
          >
            Browse Papers
            <ArrowRight size={17} strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Exam stat chips */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 bg-dp-surface border border-dp rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
            <span className="text-xs font-semibold text-dp-secondary tracking-wide">
              NDA — Mathematics + GAT
            </span>
          </div>
          <div className="flex items-center gap-2 bg-dp-surface border border-dp rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span className="text-xs font-semibold text-dp-secondary tracking-wide">
              CDS — English + GK + Math
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
