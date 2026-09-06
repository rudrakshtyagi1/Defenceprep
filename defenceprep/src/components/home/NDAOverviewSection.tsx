import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Award, CheckCircle2, FileCheck, Stethoscope } from 'lucide-react';

export const NDAOverviewSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-dp-surface-2 border-t border-dp">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              <Shield size={14} />
              National Defence Academy
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dp-primary tracking-tight">
              Preparing for <span className="gradient-accent">NDA?</span>
            </h2>
            <p className="mt-2 text-dp-secondary text-sm md:text-base max-w-xl leading-relaxed">
              The premier tri-service academy training cadets for the Indian Army, Navy, and Air Force. Conducted twice a year by UPSC for 10+2 aspirants.
            </p>
          </div>
          <Link
            to="/nda"
            className="btn-secondary text-sm self-start md:self-auto inline-flex items-center gap-2"
          >
            Explore Complete NDA Guide
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 4 Stages Journey */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-dp p-5 bg-dp-surface">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
              <FileCheck size={18} />
            </div>
            <div className="text-xs font-mono text-dp-muted">STAGE 01</div>
            <h4 className="text-sm font-bold text-dp-primary mt-1">Written Exam</h4>
            <p className="text-xs text-dp-secondary mt-1">900 Marks total across Mathematics and General Ability Test (GAT).</p>
          </div>

          <div className="card-dp p-5 bg-dp-surface">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Award size={18} />
            </div>
            <div className="text-xs font-mono text-dp-muted">STAGE 02</div>
            <h4 className="text-sm font-bold text-dp-primary mt-1">SSB Interview</h4>
            <p className="text-xs text-dp-secondary mt-1">5-day psychological, ground tasks (GTO), and personal interview evaluation.</p>
          </div>

          <div className="card-dp p-5 bg-dp-surface">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Stethoscope size={18} />
            </div>
            <div className="text-xs font-mono text-dp-muted">STAGE 03</div>
            <h4 className="text-sm font-bold text-dp-primary mt-1">Medical Board</h4>
            <p className="text-xs text-dp-secondary mt-1">Rigorous medical fitness verification at designated military hospitals.</p>
          </div>

          <div className="card-dp p-5 bg-dp-surface">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <CheckCircle2 size={18} />
            </div>
            <div className="text-xs font-mono text-dp-muted">STAGE 04</div>
            <h4 className="text-sm font-bold text-dp-primary mt-1">Final Merit List</h4>
            <p className="text-xs text-dp-secondary mt-1">All-India combined ranking based on Written (900) + SSB (900) scores.</p>
          </div>
        </div>

        {/* Written Exam Quick Matrix */}
        <div className="card-dp p-6 bg-dp-surface border border-dp flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="text-xs font-bold uppercase tracking-wider text-dp-muted mb-2">Written Examination Structure</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-dp-surface-2 border border-dp">
                <div className="flex justify-between items-center text-xs text-teal-400 font-bold mb-1">
                  <span>PAPER 1</span>
                  <span>150 MINS</span>
                </div>
                <div className="text-sm font-bold text-dp-primary">Mathematics</div>
                <div className="text-xs text-dp-muted mt-1">120 Questions • 300 Marks (+2.5, -0.83)</div>
              </div>
              <div className="p-3.5 rounded-lg bg-dp-surface-2 border border-dp">
                <div className="flex justify-between items-center text-xs text-blue-400 font-bold mb-1">
                  <span>PAPER 2</span>
                  <span>150 MINS</span>
                </div>
                <div className="text-sm font-bold text-dp-primary">General Ability Test (GAT)</div>
                <div className="text-xs text-dp-muted mt-1">150 Questions • 600 Marks (+4.0, -1.33)</div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col gap-3 w-full md:w-auto shrink-0">
            <Link to="/papers?exam=NDA" className="btn-primary text-xs justify-center py-2.5">
              Practice NDA Papers
            </Link>
            <Link to="/nda" className="btn-secondary text-xs justify-center py-2.5">
              View Detailed Syllabus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NDAOverviewSection;
