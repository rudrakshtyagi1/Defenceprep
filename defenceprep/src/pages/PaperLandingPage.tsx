import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PAPERS } from '../data/papers';
import SEOHead from '../components/seo/SEOHead';
import { generateWebPageSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';
import { getPaperSeoPath, getPaperTitle, getPaperH1, getPaperDescription, getPaperBreadcrumbs } from '../utils/seoUtils';
import { Clock, FileText, Award, Shield } from 'lucide-react';

const PaperLandingPage: React.FC = () => {
  const { exam, year, session, subject } = useParams<{ exam: string, year: string, session: string, subject: string }>();
  const navigate = useNavigate();

  // Find the paper by matching the generated SEO path to the requested parameters
  const requestedPath = `/${exam?.toLowerCase()}/${year}/${session}/${subject}/`;
  const paper = PAPERS.find((p) => getPaperSeoPath(p) === requestedPath);

  if (!paper) {
    return (
      <div className="min-h-screen bg-dp-bg flex items-center justify-center">
        <SEOHead noindex={true} />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dp-primary mb-2">Paper Not Found</h2>
          <p className="text-dp-secondary mb-4">The paper you are looking for does not exist.</p>
          <Link to="/papers" className="btn-primary">Browse All Papers</Link>
        </div>
      </div>
    );
  }

  const examPath = paper.examCode === 'NDA' ? '/nda' : '/cds';
  const paperTitle = getPaperTitle(paper);
  const paperH1 = getPaperH1(paper);
  const description = getPaperDescription(paper);
  const canonical = getPaperSeoPath(paper);

  const breadcrumbsList = getPaperBreadcrumbs(paper);

  const schema = [
    generateWebPageSchema(paperTitle, description, canonical),
    generateBreadcrumbSchema(breadcrumbsList)
  ];

  return (
    <div className="min-h-screen bg-dp-bg">
      <SEOHead 
        title={paperTitle}
        description={description}
        canonicalPath={canonical}
        schema={schema}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Breadcrumb visually (optional but good for UX) */}
        <div className="text-xs font-semibold tracking-wider text-dp-muted mb-6 uppercase flex flex-wrap items-center gap-2">
          {breadcrumbsList.map((crumb, i) => (
            <React.Fragment key={crumb.item}>
              <Link to={crumb.item!} className={`${i === breadcrumbsList.length - 1 ? 'text-teal-400' : 'hover:text-dp-primary transition-colors'}`}>
                {crumb.name}
              </Link>
              {i < breadcrumbsList.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="card-dp bg-dp-surface border border-dp p-8 md:p-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent-from)] bg-dp-surface-2 border border-dp px-3.5 py-1.5 rounded-full mb-6">
            <Award size={14} />
            Official Previous Year Paper
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-dp-primary mb-4 leading-tight">
            {paperH1}
          </h1>
          
          <p className="text-base text-dp-secondary mb-10 max-w-2xl leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pt-8 border-t border-dp">
            <div className="p-4 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="flex items-center gap-2 text-dp-muted mb-1">
                <FileText size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Questions</span>
              </div>
              <div className="text-2xl font-bold text-dp-primary">{paper.totalQuestions}</div>
            </div>
            
            <div className="p-4 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="flex items-center gap-2 text-dp-muted mb-1">
                <Clock size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Duration</span>
              </div>
              <div className="text-2xl font-bold text-dp-primary">{paper.durationMinutes}m</div>
            </div>
            
            <div className="p-4 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="flex items-center gap-2 text-dp-muted mb-1">
                <Award size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Marks</span>
              </div>
              <div className="text-2xl font-bold text-dp-primary">{paper.maximumMarks}</div>
            </div>
            
            <div className="p-4 bg-dp-surface-2 border border-dp rounded-xl">
              <div className="flex items-center gap-2 text-dp-muted mb-1">
                <Shield size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Exam</span>
              </div>
              <div className="text-2xl font-bold text-dp-primary">{paper.examCode} {paper.year}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate(`/test/${paper.id}`)}
              className="btn-primary py-4 px-8 text-base font-bold shadow-lg shadow-[var(--color-accent-from)]/20"
            >
              Start Mock Test Now
            </button>
            <Link to={examPath} className="btn-secondary py-4 px-8 text-base font-bold text-center">
              View {paper.examCode} Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperLandingPage;
