import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, ChevronDown, ChevronUp, ArrowRight, HelpCircle } from 'lucide-react';
import { PAPERS } from '../data/papers';
import PaperCard from '../components/papers/PaperCard';

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: 'Is Elementary Mathematics compulsory for all CDS aspirants?',
    a: 'No. Elementary Mathematics is compulsory only for candidates choosing Indian Military Academy (IMA), Indian Naval Academy (INA), and Air Force Academy (AFA). Candidates applying strictly for Officers Training Academy (OTA) Chennai are tested only in English (100 marks) and General Knowledge (100 marks).',
  },
  {
    q: 'Can women candidates apply for the CDS Examination?',
    a: 'Yes. Women candidates are eligible to apply for Officers Training Academy (OTA) Chennai for Non-Technical Short Service Commission (SSC). They appear for English and General Knowledge papers only.',
  },
  {
    q: 'What is the educational qualification for IMA vs INA vs AFA?',
    a: 'For IMA and OTA: Degree of a recognized University or equivalent. For INA: Degree in Engineering from a recognized University/Institution. For AFA: Degree of a recognized University (with Physics and Mathematics at 10+2 level) or Bachelor of Engineering.',
  },
  {
    q: 'What is the marking penalty for wrong attempts in CDS?',
    a: 'In all three papers (English, GK, and Elementary Mathematics), each question carries 1/3 negative marking. In English & GK (120 questions for 100 marks), each correct answer yields ~0.83 marks and incorrect attempt deducts ~0.27 marks. In Mathematics (100 questions for 100 marks), each correct yields 1.0 mark and incorrect attempt deducts 0.33 marks.',
  },
  {
    q: 'What is the sectional cutoff requirement for CDS?',
    a: 'UPSC requires a qualifying cutoff of 20% in each individual paper (English, GK, and Math where applicable), along with clearing the cumulative academy-specific aggregate cutoff.',
  },
];

export const CDSPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'CDS Previous Year Papers & Mock Tests | DefencePrep';
  }, []);

  const cdsPapers = PAPERS.filter((p) => p.examCode === 'CDS').slice(0, 6);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-dp-bg pb-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 border-b border-dp bg-dp-surface overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-4">
            <Award size={14} />
            Graduate Officer Entry
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-dp-primary tracking-tight leading-[1.1]">
            CDS — Combined Defence <span className="gradient-accent">Services</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-dp-secondary max-w-2xl leading-relaxed">
            The officer commission gateway for graduates. Discover academy options, customizable paper combinations, qualifying criteria, and attempt authentic UPSC past papers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#papers-section" className="btn-primary text-sm font-semibold">
              Practice CDS Papers
              <ArrowRight size={16} />
            </a>
            <a href="#academies-section" className="btn-secondary text-sm font-semibold">
              Explore Academies
            </a>
          </div>

          {/* Quick Stat Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-dp">
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Recruitment Academies</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">IMA, INA, AFA, OTA</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Testing Options</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">2 or 3 Papers</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Total Marks</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">200 / 300 Marks</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="text-xs text-dp-muted">Eligibility</div>
              <div className="text-xl font-bold text-dp-primary mt-0.5">Graduates (19–25 Yrs)</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-14 space-y-16">
        {/* The 4 Training Academies */}
        <div id="academies-section">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Commissioning Wings</div>
            <h2 className="text-2xl md:text-3xl font-black text-dp-primary">
              Four Specialized <span className="gradient-accent">Service Academies</span>
            </h2>
            <p className="text-xs text-dp-secondary mt-2">Paper requirements and age qualifications vary by academy choice.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="card-dp p-6 bg-dp-surface border-t-2 border-t-blue-400">
              <div className="text-xs font-mono font-bold text-blue-400 mb-1">ARMY (PC)</div>
              <h3 className="text-base font-bold text-dp-primary mb-1">IMA Dehradun</h3>
              <div className="text-xs text-dp-muted mb-3">Indian Military Academy</div>
              <p className="text-xs text-dp-secondary leading-relaxed mb-4">
                Permanent commission for male graduates. Requires all 3 papers: English, GK, and Elementary Math.
              </p>
              <div className="text-[11px] px-2 py-1 rounded bg-dp-surface-2 border border-dp text-dp-muted">
                Age: 19–24 Years • 300 Marks
              </div>
            </div>

            <div className="card-dp p-6 bg-dp-surface border-t-2 border-t-cyan-400">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">NAVY (PC)</div>
              <h3 className="text-base font-bold text-dp-primary mb-1">INA Ezhimala</h3>
              <div className="text-xs text-dp-muted mb-3">Indian Naval Academy</div>
              <p className="text-xs text-dp-secondary leading-relaxed mb-4">
                Permanent commission for male engineering graduates. Requires English, GK, and Elementary Math.
              </p>
              <div className="text-[11px] px-2 py-1 rounded bg-dp-surface-2 border border-dp text-dp-muted">
                Age: 19–24 Years • B.Tech Req.
              </div>
            </div>

            <div className="card-dp p-6 bg-dp-surface border-t-2 border-t-indigo-400">
              <div className="text-xs font-mono font-bold text-indigo-400 mb-1">AIR FORCE (PC)</div>
              <h3 className="text-base font-bold text-dp-primary mb-1">AFA Dundigal</h3>
              <div className="text-xs text-dp-muted mb-3">Air Force Academy, Hyderabad</div>
              <p className="text-xs text-dp-secondary leading-relaxed mb-4">
                Flying and ground duties. Degree with 10+2 Math/Physics or B.E/B.Tech required. All 3 papers.
              </p>
              <div className="text-[11px] px-2 py-1 rounded bg-dp-surface-2 border border-dp text-dp-muted">
                Age: 20–24 Years • 300 Marks
              </div>
            </div>

            <div className="card-dp p-6 bg-dp-surface border-t-2 border-t-amber-400">
              <div className="text-xs font-mono font-bold text-amber-400 mb-1">ARMY (SSC)</div>
              <h3 className="text-base font-bold text-dp-primary mb-1">OTA Chennai</h3>
              <div className="text-xs text-dp-muted mb-3">Officers Training Academy</div>
              <p className="text-xs text-dp-secondary leading-relaxed mb-4">
                Short Service Commission for Men and Women. Math paper is completely exempted.
              </p>
              <div className="text-[11px] px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                Age: 19–25 Years • 200 Marks
              </div>
            </div>
          </div>
        </div>

        {/* Written Examination Pattern Table */}
        <div className="card-dp p-7 bg-dp-surface border border-dp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Examination Blueprint</div>
              <h2 className="text-2xl font-black text-dp-primary">Written Exam Pattern & Dual Tracks</h2>
            </div>
            <span className="text-xs font-mono text-dp-muted bg-dp-surface-2 px-3 py-1.5 rounded-lg border border-dp self-start">
              UPSC Standard • Negative Marking 1/3rd
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
                  <th className="p-3">Applicability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dp">
                <tr className="hover:bg-dp-surface-2 transition-colors">
                  <td className="p-3 font-bold text-dp-primary">Paper 1: English</td>
                  <td className="p-3 text-dp-secondary">2 Hours (120m)</td>
                  <td className="p-3 text-dp-secondary">120 MCQs</td>
                  <td className="p-3 font-bold text-blue-400">100 Marks</td>
                  <td className="p-3 text-emerald-400 font-medium">All Candidates (IMA, INA, AFA, OTA)</td>
                </tr>
                <tr className="hover:bg-dp-surface-2 transition-colors">
                  <td className="p-3 font-bold text-dp-primary">Paper 2: General Knowledge</td>
                  <td className="p-3 text-dp-secondary">2 Hours (120m)</td>
                  <td className="p-3 text-dp-secondary">120 MCQs</td>
                  <td className="p-3 font-bold text-blue-400">100 Marks</td>
                  <td className="p-3 text-emerald-400 font-medium">All Candidates (IMA, INA, AFA, OTA)</td>
                </tr>
                <tr className="hover:bg-dp-surface-2 transition-colors">
                  <td className="p-3 font-bold text-dp-primary">Paper 3: Elementary Mathematics</td>
                  <td className="p-3 text-dp-secondary">2 Hours (120m)</td>
                  <td className="p-3 text-dp-secondary">100 MCQs</td>
                  <td className="p-3 font-bold text-amber-400">100 Marks</td>
                  <td className="p-3 text-amber-400 font-medium">IMA, INA, AFA Only (OTA Exempt)</td>
                </tr>
                <tr className="bg-dp-surface-2/70 font-bold">
                  <td className="p-3 text-dp-primary">Total for IMA / INA / AFA</td>
                  <td className="p-3 text-dp-primary">6 Hours Total</td>
                  <td className="p-3 text-dp-primary">340 MCQs</td>
                  <td className="p-3 text-[var(--color-accent-from)] font-black text-sm">300 Marks</td>
                  <td className="p-3 text-dp-muted">Min 20% in each paper</td>
                </tr>
                <tr className="bg-dp-surface-2/70 font-bold">
                  <td className="p-3 text-dp-primary">Total for OTA (Officers Training Academy)</td>
                  <td className="p-3 text-dp-primary">4 Hours Total</td>
                  <td className="p-3 text-dp-primary">240 MCQs</td>
                  <td className="p-3 text-cyan-400 font-black text-sm">200 Marks</td>
                  <td className="p-3 text-dp-muted">Min 20% in each paper</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Subjects Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-dp p-6 bg-dp-surface">
            <h3 className="text-base font-bold text-dp-primary mb-2 flex items-center justify-between">
              <span>English Syllabus</span>
              <span className="text-xs text-blue-400 font-mono">120 Qs</span>
            </h3>
            <p className="text-xs text-dp-secondary mb-3">Tests practical command of English and nuances of word usage.</p>
            <div className="space-y-1.5 text-xs text-dp-secondary">
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Spotting Errors & Grammar</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Sentence Arrangement (S1–S6)</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Synonyms & Antonyms</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Idioms & Phrasal Verbs</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Reading Comprehension Passages</div>
            </div>
          </div>

          <div className="card-dp p-6 bg-dp-surface">
            <h3 className="text-base font-bold text-dp-primary mb-2 flex items-center justify-between">
              <span>General Knowledge</span>
              <span className="text-xs text-teal-400 font-mono">120 Qs</span>
            </h3>
            <p className="text-xs text-dp-secondary mb-3">Broad evaluation of everyday science, Indian history, and current affairs.</p>
            <div className="space-y-1.5 text-xs text-dp-secondary">
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Indian Constitution & Polity</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Modern Indian History & Movements</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Physical & Economic Geography</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Physics, Chemistry & Biology</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Defence Exercises & Bilateral Summits</div>
            </div>
          </div>

          <div className="card-dp p-6 bg-dp-surface">
            <h3 className="text-base font-bold text-dp-primary mb-2 flex items-center justify-between">
              <span>Elementary Mathematics</span>
              <span className="text-xs text-amber-400 font-mono">100 Qs</span>
            </h3>
            <p className="text-xs text-dp-secondary mb-3">Metric secondary school mathematics testing arithmetic and geometry.</p>
            <div className="space-y-1.5 text-xs text-dp-secondary">
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Number System & Divisibility</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Basic Algebra & Quadratic Equations</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Plane Trigonometry & Identities</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• 2D/3D Mensuration & Solids</div>
              <div className="p-1.5 rounded bg-dp-surface-2 border border-dp">• Statistics, Mean & Frequency</div>
            </div>
          </div>
        </div>

        {/* Previous Year Papers Section */}
        <div id="papers-section" className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Authentic Mock Tests</div>
              <h2 className="text-2xl md:text-3xl font-black text-dp-primary">
                Practice CDS <span className="gradient-accent">Previous Papers</span>
              </h2>
            </div>
            <Link to="/papers?exam=CDS" className="btn-secondary text-xs inline-flex items-center gap-1.5">
              View All CDS Papers ({PAPERS.filter(p => p.examCode === 'CDS').length})
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cdsPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onAttempt={(id) => navigate(`/test/${id}`)}
              />
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="card-dp p-7 bg-dp-surface">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dp-muted mb-2">
            <HelpCircle size={14} />
            Clarifications
          </div>
          <h2 className="text-2xl font-black text-dp-primary mb-6">CDS Frequently Asked Questions</h2>

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
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent border border-dp flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-dp-primary">Ready to practice for CDS?</h3>
            <p className="text-xs text-dp-secondary mt-1">Attempt English, General Knowledge, or Elementary Math papers now.</p>
          </div>
          <Link to="/papers?exam=CDS" className="btn-primary text-xs shrink-0 py-3 px-6 font-bold">
            Start Practicing Free &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CDSPage;
