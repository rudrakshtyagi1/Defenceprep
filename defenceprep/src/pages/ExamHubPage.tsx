import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PAPERS } from '../data/papers';
import SEOHead from '../components/seo/SEOHead';
import { getPaperSeoPath } from '../utils/seoUtils';
import { generateBreadcrumbSchema } from '../utils/seoSchemas';

const ExamHubPage: React.FC = () => {
  const { exam } = useParams<{ exam: string }>();
  const validExam = exam?.toUpperCase() === 'NDA' ? 'NDA' : exam?.toUpperCase() === 'CDS' ? 'CDS' : null;

  if (!validExam) {
    return <div>Exam not found</div>;
  }

  const papers = PAPERS.filter(p => p.examCode === validExam && p.available);
  const years = Array.from(new Set(papers.map(p => p.year))).sort((a, b) => b - a);

  const title = `${validExam} Previous Year Question Papers | DefencePrep`;
  const description = `Practice official ${validExam} previous year question papers. Browse by year and subject for authentic exam preparation.`;
  const canonical = `/${validExam.toLowerCase()}/previous-year-papers`;

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: validExam, item: `/${validExam.toLowerCase()}` },
    { name: "Previous Year Papers", item: canonical }
  ];

  return (
    <div className="min-h-screen bg-dp-bg pt-24 pb-16 px-4">
      <SEOHead 
        title={title} 
        description={description} 
        canonicalPath={canonical}
        schema={generateBreadcrumbSchema(breadcrumbs)}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-dp-primary mb-6">{validExam} Previous Year Question Papers</h1>
        <p className="text-dp-secondary mb-12 max-w-2xl text-lg">{description}</p>

        <div className="flex flex-col gap-10">
          {years.map(year => (
            <div key={year} className="card-dp p-8 border border-dp bg-dp-surface">
              <h2 className="text-2xl font-bold text-dp-primary mb-4 flex items-center gap-3">
                <Link to={`/${validExam.toLowerCase()}/${year}`} className="hover:text-[var(--color-accent-from)] transition-colors">
                  {validExam} {year} Papers
                </Link>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {papers.filter(p => p.year === year).map(paper => (
                  <Link 
                    key={paper.id} 
                    to={getPaperSeoPath(paper)}
                    className="p-4 rounded-xl bg-dp-surface-2 border border-dp hover:border-[var(--color-accent-from)] transition-colors flex flex-col gap-1"
                  >
                    <span className="text-sm font-semibold text-dp-muted uppercase tracking-wider">{paper.examCode} {paper.session}</span>
                    <span className="text-lg font-bold text-dp-primary">{paper.subject}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamHubPage;
