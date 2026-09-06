import React from 'react';
import { Clock, Grid, BookmarkCheck, AlertCircle } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

const features: Feature[] = [
  {
    icon: <Clock size={22} className="text-emerald-400" />,
    title: 'Real Exam Timer',
    description: 'Timed countdown simulation strictly matching UPSC standards (150m for NDA, 120m for CDS).',
    accentColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    icon: <Grid size={22} className="text-blue-400" />,
    title: 'Question Palette',
    description: 'Instant question jumping with 5 distinct status indicators matching actual computer-based test formats.',
    accentColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    icon: <BookmarkCheck size={22} className="text-purple-400" />,
    title: 'Mark for Review',
    description: 'Flag doubtful responses to revisit later before finalizing and submitting your attempt.',
    accentColor: 'rgba(168, 85, 247, 0.1)',
  },
  {
    icon: <AlertCircle size={22} className="text-amber-400" />,
    title: 'Negative Marking Rules',
    description: 'Exact scoring formulas (-0.83 for NDA Math, -1.33 for GAT, -0.33 for CDS) calibrated per question.',
    accentColor: 'rgba(245, 158, 11, 0.1)',
  },
];

export const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 border-t border-dp bg-dp-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dp-muted mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-from)]" />
            Exam Simulation
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-dp-primary tracking-tight">
            Practice Like It's <span className="gradient-accent">Exam Day</span>
          </h2>
          <p className="mt-4 text-dp-secondary text-base leading-relaxed">
            Eliminate exam hall anxiety by training under exact UPSC examination mechanics, negative marking, and strict time constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="card-dp p-6 flex flex-col justify-between group hover:border-[var(--color-accent-from)] transition-all duration-200"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-dp transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: item.accentColor }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-dp-primary mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-dp-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-dp flex items-center justify-between text-xs font-medium text-dp-muted">
                <span>0{idx + 1}</span>
                <span className="text-[var(--color-accent-from)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Active in Mock
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
