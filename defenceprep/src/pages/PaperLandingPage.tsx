import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PAPERS } from '../data/papers';
import SEOHead from '../components/seo/SEOHead';
import { generateWebPageSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';
import { Clock, FileText, Award, Shield } from 'lucide-react';

const PaperLandingPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();

  const paper = PAPERS.find((p) => p.id === paperId);

  if (!paper) {
    return (
      <div className="min-h-screen bg-dp-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dp-primary mb-2">Paper Not Found</h2>
          <p className="text-dp-secondary mb-4">The paper you are looking for does not exist.</p>
          <Link to="/papers" className="btn-primary">Browse All Papers</Link>
        </div>
      </div>
    );
  }

  const examPath = paper.examCode === 'NDA' ? '/nda' : '/cds';
  const examName = paper.examCode === 'NDA' ? 'NDA' : 'CDS';
  const paperTitle = `${examName} ${paper.year} ${paper.subject} Previous Year Paper`;
  const description = `Practice the official ${paperTitle}. This paper has ${paper.totalQuestions} questions and is for ${paper.maximumMarks} marks. Start your mock test now.`;

  const schema = [
    generateWebPageSchema(paperTitle, description, `/papers/${paper.id}`),
    generateBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Papers", item: "/papers" },
      { name: paperTitle, item: `/papers/${paper.id}` }
    ])
  ];

  return (
    <div className="min-h-screen bg-dp-bg">
      <SEOHead 
        title={paperTitle}
        description={description}
        canonicalPath={`/papers/${paper.id}`}
        schema={schema}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Breadcrumb visually (optional but good for UX) */}
        <div className="text-xs font-semibold tracking-wider text-dp-muted mb-6 uppercase flex items-center gap-2">
          <Link to="/" className="hover:text-dp-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/papers" className="hover:text-dp-primary transition-colors">Papers</Link>
          <span>/</span>
          <span className="text-teal-400">{paper.id}</span>
        </div>

        <div className="card-dp bg-dp-surface border border-dp p-8 md:p-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent-from)] bg-dp-surface-2 border border-dp px-3.5 py-1.5 rounded-full mb-6">
            <Award size={14} />
            Official Previous Year Paper
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-dp-primary mb-4 leading-tight">
            {paper.paperName}
          </h1>
          
          <p className="text-base text-dp-secondary mb-10 max-w-2xl leading-relaxed">
            Attempt the official {examName} {paper.year} {paper.subject} paper in a timed, real-exam environment. 
            Analyze your performance, accuracy, and speed to improve your score.
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
              View {examName} Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperLandingPage;
