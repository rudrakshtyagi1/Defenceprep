import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PAPERS } from '../data/papers';
import { getPaperSeoPath } from '../utils/seoUtils';
import SEOHead from '../components/seo/SEOHead';

const LegacyPaperRedirect: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const paper = PAPERS.find(p => p.id === paperId);
    if (paper) {
      // Use replace to prevent back button loops
      navigate(getPaperSeoPath(paper), { replace: true });
    } else {
      navigate('/papers', { replace: true });
    }
  }, [paperId, navigate]);

  return (
    <div className="min-h-screen bg-dp-bg flex items-center justify-center">
      <SEOHead noindex={true} />
      <p className="text-dp-muted">Redirecting...</p>
    </div>
  );
};

export default LegacyPaperRedirect;
