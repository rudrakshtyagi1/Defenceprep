import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Timer, BarChart3, ArrowRight, AlertTriangle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About DefencePrep | Mission & Values';
  }, []);

  return (
    <div className="min-h-screen bg-dp-bg pb-24">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 border-b border-dp bg-dp-surface overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent-from)] bg-[var(--color-accent-from)]/10 border border-[var(--color-accent-from)]/20 px-3.5 py-1.5 rounded-full mb-4">
            <Shield size={14} />
            Our Mission & Purpose
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-dp-primary tracking-tight leading-[1.1]">
            About <span className="gradient-accent">DefencePrep</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-dp-secondary max-w-2xl mx-auto leading-relaxed">
            Engineered specifically for Indian Armed Forces aspirants. We believe passing competitive defence exams requires authentic pressure, rigorous timing, and honest telemetry.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-14 space-y-14">
        {/* The Core Mission Statement */}
        <div className="card-dp p-8 bg-dp-surface">
          <h2 className="text-xl font-bold text-dp-primary mb-3">Why DefencePrep Exists</h2>
          <p className="text-sm text-dp-secondary leading-relaxed mb-4">
            Most aspirants study previous year questions passively — casually reading solutions with a highlighter. But on exam day, when a 150-minute timer is running down and negative marking looms over every doubtful circle on the OMR sheet, mental panic strikes.
          </p>
          <p className="text-sm text-dp-secondary leading-relaxed">
            <strong className="text-dp-primary font-semibold">DefencePrep replaces passive reading with active exam simulation.</strong> By attempting original previous year question papers in a replica computer-based environment with exact negative scoring and real-time navigation palettes, students develop the speed, accuracy, and psychological poise needed to conquer the written stage.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div>
          <h2 className="text-2xl font-black text-dp-primary mb-6 text-center">What Sets DefencePrep Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-dp p-6 bg-dp-surface">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4">
                <Target size={20} />
              </div>
              <h3 className="text-base font-bold text-dp-primary mb-2">Original PYQs First</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                Rather than random synthetic mock questions, we prioritize authentic UPSC papers from recent examination cycles (2023–2025).
              </p>
            </div>

            <div className="card-dp p-6 bg-dp-surface">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Timer size={20} />
              </div>
              <h3 className="text-base font-bold text-dp-primary mb-2">High-Fidelity Engine</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                Persistent state countdown timers, question status tracking (answered, marked, unvisited), and automatic submission upon time expiry.
              </p>
            </div>

            <div className="card-dp p-6 bg-dp-surface">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-base font-bold text-dp-primary mb-2">Detailed Telemetry</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                Instant score calculation with exact fractional negative marking, topic strength diagnostics, and question-by-question review with explanations.
              </p>
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="card-dp p-8 bg-dp-surface">
          <h2 className="text-xl font-bold text-dp-primary mb-4">Our Design Philosophy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-dp-secondary">
            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="font-bold text-dp-primary text-sm mb-1">Precision & Structure</div>
              <p>Inspired by military discipline and modern SaaS tools. Zero visual clutter, no distracting ads, and crisp typography.</p>
            </div>
            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="font-bold text-dp-primary text-sm mb-1">Dual-Mode Polish</div>
              <p>First-class support for both high-contrast Charcoal Dark mode and clean Day Light mode, saved automatically in your browser.</p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 flex items-start gap-4">
          <AlertTriangle size={22} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-dp-secondary">
            <h4 className="text-sm font-bold text-amber-400">Official Disclaimer</h4>
            <p className="leading-relaxed">
              DefencePrep is an independent educational practice platform and is <strong className="text-dp-primary font-semibold">not affiliated with, endorsed by, or associated with the Union Public Service Commission (UPSC), the Ministry of Defence, the Indian Armed Forces (Army, Navy, Air Force)</strong>, or any government department.
            </p>
            <p className="leading-relaxed text-dp-muted">
              All question papers, marks schemes, and examination patterns referenced are for academic preparation and practice simulation purposes only.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/papers"
            className="btn-primary inline-flex items-center gap-2 text-sm font-bold py-3.5 px-8"
          >
            Start Practicing Previous Papers Free
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
