import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PAPERS } from '../data/papers';
import SEOHead from '../components/seo/SEOHead';
import { getPaperSeoPath } from '../utils/seoUtils';
import { generateBreadcrumbSchema } from '../utils/seoSchemas';

const YearHubPage: React.FC = () => {
  const { exam, year } = useParams<{ exam: string, year: string }>();
  const validExam = exam?.toUpperCase() === 'NDA' ? 'NDA' : exam?.toUpperCase() === 'CDS' ? 'CDS' : null;
  const numYear = parseInt(year || '0');

  if (!validExam || !numYear) {
    return <div>Page not found</div>;
  }

  const papers = PAPERS.filter(p => p.examCode === validExam && p.year === numYear && p.available);

  if (papers.length === 0) {
    return <div>No papers available for this year.</div>;
  }

  const title = `${validExam} ${numYear} Question Papers | DefencePrep`;
  const description = `Practice all official ${validExam} ${numYear} question papers online.`;
  const canonical = `/${validExam.toLowerCase()}/${numYear}`;

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: validExam, item: `/${validExam.toLowerCase()}` },
    { name: "Previous Year Papers", item: `/${validExam.toLowerCase()}/previous-year-papers` },
    { name: numYear.toString(), item: canonical }
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
        <h1 className="text-4xl font-black text-dp-primary mb-6">{validExam} {numYear} Question Papers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {papers.map(paper => (
            <Link 
              key={paper.id} 
              to={getPaperSeoPath(paper)}
              className="p-6 rounded-xl bg-dp-surface-2 border border-dp hover:border-[var(--color-accent-from)] transition-colors flex flex-col gap-2"
            >
              <span className="text-sm font-semibold text-dp-muted uppercase tracking-wider">{paper.examCode} {paper.session} {paper.year}</span>
              <span className="text-xl font-bold text-dp-primary">{paper.subject}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearHubPage;
