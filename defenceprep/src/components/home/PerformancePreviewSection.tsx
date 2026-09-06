import React from 'react';
import { Target, CheckCircle2, XCircle, Clock, Zap, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PerformancePreviewSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-dp-surface-2 border-t border-dp">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dp-muted mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Real-Time Telemetry
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dp-primary tracking-tight">
              Know Where You <span className="gradient-accent">Actually Stand</span>
            </h2>
            <p className="mt-2 text-dp-secondary text-base max-w-xl">
              Don't guess your exam readiness. Receive precise topic-wise heatmaps, accuracy ratios, and negative marking impact immediately upon submission.
            </p>
          </div>
          <Link
            to="/performance"
            className="btn-secondary text-sm self-start md:self-auto inline-flex items-center gap-2"
          >
            Explore Dashboard
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mock Analytics Dashboard Preview */}
        <div
          className="rounded-2xl border border-dp p-6 md:p-8 bg-dp-surface shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow in corner */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--color-accent-from), var(--color-accent-to))',
            }}
          />

          {/* Top Bar of Analytics Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-dp mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-bold text-teal-400">
                NDA
              </div>
              <div>
                <h4 className="text-base font-bold text-dp-primary">
                  NDA 2025 (I) — General Ability Test (GAT)
                </h4>
                <p className="text-xs text-dp-muted">Attempted under 150 min timer • Negative marking applied</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-dp-surface-2 border border-dp px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Analysis Engine Ready
            </div>
          </div>

          {/* Metric KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="flex items-center justify-between text-xs text-dp-muted mb-1">
                <span>Total Score</span>
                <Zap size={14} className="text-[var(--color-accent-from)]" />
              </div>
              <div className="text-2xl font-black text-dp-primary">
                348<span className="text-xs text-dp-muted font-normal"> / 600</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-1">Above Cutoff (~320)</div>
            </div>

            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="flex items-center justify-between text-xs text-dp-muted mb-1">
                <span>Accuracy</span>
                <Target size={14} className="text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-400">
                74.2%
              </div>
              <div className="text-[11px] text-dp-muted font-medium mt-1">Strong accuracy</div>
            </div>

            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="flex items-center justify-between text-xs text-dp-muted mb-1">
                <span>Attempted</span>
                <span className="text-xs font-mono text-dp-muted">98/150</span>
              </div>
              <div className="text-2xl font-black text-dp-primary">
                98
              </div>
              <div className="text-[11px] text-dp-muted font-medium mt-1">52 unattempted</div>
            </div>

            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="flex items-center justify-between text-xs text-dp-muted mb-1">
                <span>Correct</span>
                <CheckCircle2 size={14} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">
                72
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-1">+288.0 marks</div>
            </div>

            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="flex items-center justify-between text-xs text-dp-muted mb-1">
                <span>Incorrect</span>
                <XCircle size={14} className="text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400">
                26
              </div>
              <div className="text-[11px] text-rose-400 font-medium mt-1">-34.5 penalty</div>
            </div>

            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp">
              <div className="flex items-center justify-between text-xs text-dp-muted mb-1">
                <span>Time Used</span>
                <Clock size={14} className="text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-400">
                128<span className="text-xs font-normal">m</span>
              </div>
              <div className="text-[11px] text-dp-muted font-medium mt-1">22m remaining</div>
            </div>
          </div>

          {/* Subject Breakdown Bars & Strong/Weak Focus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Subject Breakdown (7 cols) */}
            <div className="lg:col-span-7 bg-dp-surface-2 border border-dp rounded-xl p-5">
              <h4 className="text-sm font-bold text-dp-primary mb-4 flex items-center justify-between">
                <span>Subject-Wise Calibration</span>
                <span className="text-xs text-dp-muted font-normal">Sectional cutoff target: 25%</span>
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                    <span className="text-dp-primary">English (Grammar & Vocabulary)</span>
                    <span className="text-emerald-400 font-bold">81.4% Accuracy (42/50 Qs)</span>
                  </div>
                  <div className="w-full h-2.5 bg-dp-surface rounded-full overflow-hidden border border-dp">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: '81.4%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                    <span className="text-dp-primary">General Science (Physics & Chemistry)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-400 font-bold">72.0% Accuracy (26/38 Qs)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-dp-surface rounded-full overflow-hidden border border-dp">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
                      style={{ width: '72%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                    <span className="text-dp-primary">General Knowledge & Modern Indian History</span>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">58.3% Accuracy (18/32 Qs)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-dp-surface rounded-full overflow-hidden border border-dp">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                      style={{ width: '58.3%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Strong & Weak Areas (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-dp-surface-2 border border-dp rounded-xl p-4 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2.5">
                  <TrendingUp size={15} />
                  Strong Topics (High Yield)
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-dp">
                    <span className="text-dp-primary">Error Spotting & Idioms</span>
                    <span className="text-emerald-400 font-bold">92%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-dp">
                    <span className="text-dp-primary">Newtonian Mechanics (Physics)</span>
                    <span className="text-emerald-400 font-bold">85%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-dp-primary">Indian Geography & Rivers</span>
                    <span className="text-emerald-400 font-bold">78%</span>
                  </div>
                </div>
              </div>

              <div className="bg-dp-surface-2 border border-dp rounded-xl p-4 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-2.5">
                  <TrendingDown size={15} />
                  Weak Topics (Negative Leakage)
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-dp">
                    <span className="text-dp-primary">Constitutional Amendments</span>
                    <span className="text-rose-400 font-bold">42% (5 wrong)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-dp">
                    <span className="text-dp-primary">International Defence Summits</span>
                    <span className="text-rose-400 font-bold">38% (4 wrong)</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-dp-primary">Electrochemistry & Acids</span>
                    <span className="text-rose-400 font-bold">45% (3 wrong)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dp flex flex-col sm:flex-row items-center justify-between text-xs text-dp-muted gap-2">
            <span>* Interactive simulation preview. Your live tests save and populate real data locally.</span>
            <Link to="/papers" className="text-[var(--color-accent-from)] hover:underline font-medium">
              Start a real timed attempt &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformancePreviewSection;
