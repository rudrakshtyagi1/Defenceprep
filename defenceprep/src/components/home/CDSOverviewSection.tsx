import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Layers } from 'lucide-react';

export const CDSOverviewSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-dp-bg border-t border-dp">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
              <Award size={14} />
              Combined Defence Services
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dp-primary tracking-tight">
              Preparing for <span className="gradient-accent">CDS?</span>
            </h2>
            <p className="mt-2 text-dp-secondary text-sm md:text-base max-w-xl leading-relaxed">
              Gateway for graduates into IMA (Army), INA (Navy), AFA (Air Force), and OTA (Officers Training Academy). Test patterns differ based on your academy preference.
            </p>
          </div>
          <Link
            to="/cds"
            className="btn-secondary text-sm self-start md:self-auto inline-flex items-center gap-2"
          >
            Explore Complete CDS Guide
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 3 Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="card-dp p-6 bg-dp-surface">
            <div className="flex items-center justify-between text-xs font-mono text-dp-muted mb-2">
              <span>PAPER 1</span>
              <span className="text-blue-400 font-bold">120 MINS</span>
            </div>
            <h3 className="text-lg font-bold text-dp-primary mb-1">English</h3>
            <p className="text-xs text-dp-secondary mb-4 leading-relaxed">
              120 Questions • 100 Marks. Grammar, vocabulary, error detection, ordering of words, and reading comprehension.
            </p>
            <div className="text-[11px] px-2.5 py-1 rounded bg-dp-surface-2 text-dp-muted inline-block">
              Mandatory for IMA, INA, AFA & OTA
            </div>
          </div>

          <div className="card-dp p-6 bg-dp-surface">
            <div className="flex items-center justify-between text-xs font-mono text-dp-muted mb-2">
              <span>PAPER 2</span>
              <span className="text-blue-400 font-bold">120 MINS</span>
            </div>
            <h3 className="text-lg font-bold text-dp-primary mb-1">General Knowledge</h3>
            <p className="text-xs text-dp-secondary mb-4 leading-relaxed">
              120 Questions • 100 Marks. Current events, Indian polity, modern history, geography, and general science.
            </p>
            <div className="text-[11px] px-2.5 py-1 rounded bg-dp-surface-2 text-dp-muted inline-block">
              Mandatory for IMA, INA, AFA & OTA
            </div>
          </div>

          <div className="card-dp p-6 bg-dp-surface">
            <div className="flex items-center justify-between text-xs font-mono text-dp-muted mb-2">
              <span>PAPER 3</span>
              <span className="text-amber-400 font-bold">120 MINS</span>
            </div>
            <h3 className="text-lg font-bold text-dp-primary mb-1">Elementary Mathematics</h3>
            <p className="text-xs text-dp-secondary mb-4 leading-relaxed">
              100 Questions • 100 Marks. Arithmetic, algebra, trigonometry, geometry, mensuration, and statistics.
            </p>
            <div className="text-[11px] px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block font-semibold">
              Exempted for OTA Candidates
            </div>
          </div>
        </div>

        {/* Dynamic Architecture Callout Banner */}
        <div className="rounded-xl border border-dp bg-dp-surface-2 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-dp-primary">Configurable Academy Profiles</h4>
              <p className="text-xs text-dp-secondary mt-0.5">
                Targeting OTA Chennai? Attempt English & GK independently without penalty for skipped Math papers.
              </p>
            </div>
          </div>
          <Link to="/papers?exam=CDS" className="btn-primary text-xs shrink-0 py-2.5">
            Practice CDS Papers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CDSOverviewSection;
