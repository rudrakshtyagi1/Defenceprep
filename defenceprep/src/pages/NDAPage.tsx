import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown, ChevronUp, FileText, Users, Award, Stethoscope, ArrowRight, CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';
import { PAPERS } from '../data/papers';
import PaperCard from '../components/papers/PaperCard';
import SEOHead from '../components/seo/SEOHead';
import { generateWebPageSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: 'Is PCM mandatory in Class 12 for all branches of NDA?',
    a: 'No. Physics and Mathematics are strictly mandatory only for Air Force and Naval wings, as well as the 10+2 Cadet Entry Scheme of INA. For the Army wing, candidates with any stream (Arts, Commerce, or Science) from a recognized state or central board are eligible.',
  },
  {
    q: 'What is the exact marking scheme and negative penalty?',
    a: 'In Mathematics (120 questions, 300 marks), each correct response awards +2.5 marks and an incorrect attempt deducts 0.83 marks (-1/3). In the General Ability Test (150 questions, 600 marks), each correct response awards +4.0 marks while an incorrect attempt deducts 1.33 marks (-1/3). Unattempted questions carry zero penalty.',
  },
  {
    q: 'What is the qualifying sectional cutoff for NDA papers?',
    a: 'UPSC traditionally mandates a minimum sectional qualifying cutoff of 20% to 25% marks in each individual paper (both Mathematics and GAT separately) before evaluating total aggregate merit.',
  },
  {
    q: 'Can female candidates apply for the National Defence Academy?',
    a: 'Yes. Following Supreme Court directives, female candidates are fully eligible to apply and join the National Defence Academy for Army, Navy, and Air Force branches with identical educational standards.',
  },
  {
    q: 'How many times per year is the NDA exam conducted?',
    a: 'The exam is conducted twice annually by UPSC: NDA (I) typically in April, and NDA (II) typically in September. Both examination notifications are published on the official UPSC portal.',
  },
];

export const NDAPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ndaPapers = PAPERS.filter((p) => p.examCode === 'NDA').slice(0, 6);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const schema = [
    generateWebPageSchema(
      "NDA Previous Year Papers & Mock Tests",
      "Practice NDA previous year papers. Explore examination patterns, eligibility criteria, comprehensive syllabus, and attempt real previous year papers under timed conditions.",
      "/nda"
    ),
    generateBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "NDA Papers", item: "/nda" }
    ])
  ];

  return (
    <div className="min-h-screen bg-dp-bg pb-20">
      <SEOHead 
        title="NDA Previous Year Papers & Mock Tests"
        description="Practice NDA previous year papers. Explore examination patterns, eligibility criteria, comprehensive syllabus, and attempt real previous year papers under timed conditions."
        canonicalPath="/nda"
        schema={schema}
      />
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 border-b border-dp bg-dp-surface overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full mb-4">
            <Shield size={14} />
            UPSC Defence Entrance
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-dp-primary tracking-tight leading-[1.1]">
            NDA — National Defence <span className="gradient-accent">Academy</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-dp-secondary max-w-2xl leading-relaxed">
            The cradle of military leadership. Explore examination patterns, eligibility criteria, comprehensive syllabus, and attempt real previous year papers under timed conditions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#papers-section" className="btn-primary text-sm font-semibold">
              Practice NDA Papers
              <ArrowRight size={16} />
            </a>
            <a href="#pattern-section" className="btn-secondary text-sm font-semibold">
              View Exam Pattern
            </a>
          </div>

          {/* Quick Stat Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-dp">
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Total Written Marks</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">900 Marks</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Exam Papers</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">Maths + GAT</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Exam Frequency</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">Twice Yearly</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Age Bracket</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">16.5 – 19.5 Yrs</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-14 space-y-16">
        {/* Section: Overview & Eligibility */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 card-dp p-7 bg-dp-surface">
            <h2 className="text-xl font-bold text-dp-primary mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-teal-400" />
              About the Examination
            </h2>
            <p className="text-sm text-dp-secondary leading-relaxed mb-4">
              The National Defence Academy (NDA) examination is conducted biannually by the Union Public Service Commission (UPSC). Cadets of the Army, Navy, and Air Force train together at Khadakwasla (Pune) before proceeding to their respective service academies for pre-commission training.
            </p>
            <div className="p-4 rounded-xl bg-dp-surface-2 border border-dp text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-dp-muted font-medium">Conducted by:</span>
                <span className="text-dp-primary font-semibold">Union Public Service Commission (UPSC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dp-muted font-medium">Training Location:</span>
                <span className="text-dp-primary font-semibold">Khadakwasla, Pune, Maharashtra</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dp-muted font-medium">Degree Conferred:</span>
                <span className="text-dp-primary font-semibold">B.Sc / B.A / B.Tech (Jawaharlal Nehru University)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 card-dp p-7 bg-dp-surface">
            <h2 className="text-xl font-bold text-dp-primary mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-teal-400" />
              Eligibility Criteria
            </h2>
            <ul className="text-xs text-dp-secondary space-y-3">
              <li className="flex items-start gap-2.5 pb-2.5 border-b border-dp">
                <span className="text-teal-400 font-bold shrink-0 mt-0.5">•</span>
                <div>
                  <strong className="text-dp-primary">Nationality:</strong> Citizen of India, subject of Nepal, or Tibetan refugee settled before Jan 1, 1962.
                </div>
              </li>
              <li className="flex items-start gap-2.5 pb-2.5 border-b border-dp">
                <span className="text-teal-400 font-bold shrink-0 mt-0.5">•</span>
                <div>
                  <strong className="text-dp-primary">Army Wing Education:</strong> Class 12th pass of the 10+2 pattern or equivalent examination.
                </div>
              </li>
              <li className="flex items-start gap-2.5 pb-2.5 border-b border-dp">
                <span className="text-teal-400 font-bold shrink-0 mt-0.5">•</span>
                <div>
                  <strong className="text-dp-primary">Navy & Air Force:</strong> Class 12th pass with Physics, Chemistry, and Mathematics (PCM).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-teal-400 font-bold shrink-0 mt-0.5">•</span>
                <div>
                  <strong className="text-dp-primary">Marital Status:</strong> Unmarried male and female candidates only.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Exam Journey Timeline */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-dp-muted mb-1">Selection Cycle</div>
            <h2 className="text-2xl md:text-3xl font-black text-dp-primary">
              The 4-Stage <span className="gradient-accent">Cadet Journey</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-dp p-6 bg-dp-surface relative border-t-2 border-t-teal-400">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4">
                <FileText size={20} />
              </div>
              <div className="text-xs font-mono font-bold text-teal-400 mb-1">STEP 01</div>
              <h3 className="text-base font-bold text-dp-primary mb-2">Written Exam</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                Objective OMR test consisting of Paper 1 (Mathematics) and Paper 2 (GAT) totaling 900 marks.
              </p>
            </div>

            <div className="card-dp p-6 bg-dp-surface relative border-t-2 border-t-blue-400">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Users size={20} />
              </div>
              <div className="text-xs font-mono font-bold text-blue-400 mb-1">STEP 02</div>
              <h3 className="text-base font-bold text-dp-primary mb-2">SSB Interview</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                5-day assessment including Screening (OIR/PPDT), Psychology tests (TAT/WAT/SRT), GTO tasks, and Interview.
              </p>
            </div>

            <div className="card-dp p-6 bg-dp-surface relative border-t-2 border-t-purple-400">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <Stethoscope size={20} />
              </div>
              <div className="text-xs font-mono font-bold text-purple-400 mb-1">STEP 03</div>
              <h3 className="text-base font-bold text-dp-primary mb-2">Medical Board</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                Comprehensive physical and clinical evaluation by Armed Forces Special Medical Board (SMB).
              </p>
            </div>

            <div className="card-dp p-6 bg-dp-surface relative border-t-2 border-t-emerald-400">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Award size={20} />
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1">STEP 04</div>
              <h3 className="text-base font-bold text-dp-primary mb-2">Final Merit List</h3>
              <p className="text-xs text-dp-secondary leading-relaxed">
                Final ranking based on cumulative score (1800 marks: 900 Written + 900 SSB) leading to joining instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Written Examination Pattern Table */}
        <div id="pattern-section" className="card-dp p-7 bg-dp-surface border border-dp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-400">UPSC Blue-Print</div>
              <h2 className="text-2xl font-black text-dp-primary">Written Exam Pattern & Marking</h2>
            </div>
            <span className="text-xs font-mono text-dp-muted bg-dp-surface-2 px-3 py-1.5 rounded-lg border border-dp self-start">
              Offline OMR • Bilingual (Hindi/Eng)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-dp bg-dp-surface-2 text-dp-muted uppercase font-bold tracking-wider">
                  <th className="p-3">Paper</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Questions</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3">Positive</th>
                  <th className="p-3">Negative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dp">
                <tr className="hover:bg-dp-surface-2 transition-colors">
                  <td className="p-3 font-bold text-dp-primary">Paper 1: Mathematics</td>
                  <td className="p-3 text-dp-secondary">2.5 Hours (150m)</td>
                  <td className="p-3 text-dp-secondary">120 MCQs</td>
                  <td className="p-3 font-bold text-teal-400">300 Marks</td>
                  <td className="p-3 text-emerald-400 font-semibold">+2.5</td>
                  <td className="p-3 text-rose-400 font-semibold">-0.83 (-33%)</td>
                </tr>
                <tr className="hover:bg-dp-surface-2 transition-colors">
                  <td className="p-3 font-bold text-dp-primary">
                    Paper 2: General Ability Test (GAT)
                    <div className="text-[11px] font-normal text-dp-muted">Part A: English (50Q) • Part B: GK (100Q)</div>
                  </td>
                  <td className="p-3 text-dp-secondary">2.5 Hours (150m)</td>
                  <td className="p-3 text-dp-secondary">150 MCQs</td>
                  <td className="p-3 font-bold text-teal-400">600 Marks</td>
                  <td className="p-3 text-emerald-400 font-semibold">+4.0</td>
                  <td className="p-3 text-rose-400 font-semibold">-1.33 (-33%)</td>
                </tr>
                <tr className="bg-dp-surface-2/70 font-bold">
                  <td className="p-3 text-dp-primary">Total Written Aggregate</td>
                  <td className="p-3 text-dp-primary">5 Hours</td>
                  <td className="p-3 text-dp-primary">270 MCQs</td>
                  <td className="p-3 text-[var(--color-accent-from)] font-black text-sm">900 Marks</td>
                  <td className="p-3 text-dp-muted" colSpan={2}>Sectional Cutoff: ~25% each</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Subjects & Topics Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-dp p-6 bg-dp-surface">
            <h3 className="text-lg font-bold text-dp-primary mb-3 flex items-center justify-between">
              <span>Mathematics Syllabus</span>
              <span className="text-xs text-teal-400 font-mono">120 Qs</span>
            </h3>
            <p className="text-xs text-dp-secondary mb-4 leading-relaxed">
              Covers 10+2 standard higher secondary mathematics with emphasis on analytical speed.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Algebra & Sets', 'Matrices & Determinants', 'Trigonometry', 'Analytical Geometry (2D/3D)', 'Differential Calculus', 'Integral Calculus', 'Vector Algebra', 'Statistics & Probability'].map((topic, i) => (
                <div key={i} className="p-2 rounded bg-dp-surface-2 border border-dp text-dp-secondary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <div className="card-dp p-6 bg-dp-surface">
            <h3 className="text-lg font-bold text-dp-primary mb-3 flex items-center justify-between">
              <span>General Ability Test (GAT)</span>
              <span className="text-xs text-blue-400 font-mono">150 Qs</span>
            </h3>
            <p className="text-xs text-dp-secondary mb-4 leading-relaxed">
              Divided into Part A (English - 200 Marks) and Part B (General Knowledge - 400 Marks).
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['English Grammar & Vocab', 'Physics (Class 10-12)', 'Chemistry Fundamentals', 'General Science & Bio', 'Indian Freedom Struggle', 'World & Indian Geography', 'Indian Polity & Civics', 'Defence & Current Affairs'].map((topic, i) => (
                <div key={i} className="p-2 rounded bg-dp-surface-2 border border-dp text-dp-secondary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Previous Year Papers Section */}
        <div id="papers-section" className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-1">Authentic Mock Tests</div>
              <h2 className="text-2xl md:text-3xl font-black text-dp-primary">
                Practice NDA <span className="gradient-accent">Previous Papers</span>
              </h2>
            </div>
            <Link to="/papers?exam=NDA" className="btn-secondary text-xs inline-flex items-center gap-1.5">
              View All NDA Papers ({PAPERS.filter(p => p.examCode === 'NDA').length})
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ndaPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onAttempt={(id) => navigate(`/test/${id}`)}
              />
            ))}
          </div>
        </div>

        {/* Preparation Strategy */}
        <div className="card-dp p-8 bg-dp-surface-2 border border-dp">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-black text-dp-primary">Strategic 4-Pillar Preparation Plan</h2>
            <p className="text-xs text-dp-secondary mt-2">
              Avoid generic coaching traps. High-scoring NDA qualifiers focus strictly on speed accuracy and negative minimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="p-4 rounded-xl bg-dp-surface border border-dp">
              <div className="text-xs font-mono font-bold text-teal-400 mb-2">PILLAR 01</div>
              <h4 className="text-sm font-bold text-dp-primary mb-1">NCERT Foundation</h4>
              <p className="text-xs text-dp-secondary">Master Class 11-12 NCERT Mathematics and Class 9-10 Science concepts first.</p>
            </div>
            <div className="p-4 rounded-xl bg-dp-surface border border-dp">
              <div className="text-xs font-mono font-bold text-teal-400 mb-2">PILLAR 02</div>
              <h4 className="text-sm font-bold text-dp-primary mb-1">PYQ Test Repetition</h4>
              <p className="text-xs text-dp-secondary">Attempt every paper from 2020-2025 in a single timed seating to condition mental endurance.</p>
            </div>
            <div className="p-4 rounded-xl bg-dp-surface border border-dp">
              <div className="text-xs font-mono font-bold text-teal-400 mb-2">PILLAR 03</div>
              <h4 className="text-sm font-bold text-dp-primary mb-1">Calculated Attempts</h4>
              <p className="text-xs text-dp-secondary">Never blind guess. With -0.83 and -1.33 negative markers, 70% accuracy is required.</p>
            </div>
            <div className="p-4 rounded-xl bg-dp-surface border border-dp">
              <div className="text-xs font-mono font-bold text-teal-400 mb-2">PILLAR 04</div>
              <h4 className="text-sm font-bold text-dp-primary mb-1">Error Diagnostics</h4>
              <p className="text-xs text-dp-secondary">Review test performance dashboards to isolate weak topics and revise systematically.</p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="card-dp p-7 bg-dp-surface">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dp-muted mb-2">
            <HelpCircle size={14} />
            Common Inquiries
          </div>
          <h2 className="text-2xl font-black text-dp-primary mb-6">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-dp overflow-hidden bg-dp-surface-2 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-dp-primary hover:text-[var(--color-accent-from)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} className="shrink-0 ml-2" /> : <ChevronDown size={16} className="shrink-0 ml-2" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-dp-secondary leading-relaxed border-t border-dp pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-transparent border border-dp flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-dp-primary">Ready to benchmark your score?</h3>
            <p className="text-xs text-dp-secondary mt-1">Attempt real NDA 2025 Mathematics or GAT paper right now.</p>
          </div>
          <Link to="/papers?exam=NDA" className="btn-primary text-xs shrink-0 py-3 px-6 font-bold">
            Start Practicing Free &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NDAPage;
