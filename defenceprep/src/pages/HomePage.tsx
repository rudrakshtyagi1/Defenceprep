import React from 'react';
import SEOHead from '../components/seo/SEOHead';
import { generateWebSiteSchema, generateOrganizationSchema } from '../utils/seoSchemas';
import HeroSection from '../components/home/HeroSection';
import ChooseExamSection from '../components/home/ChooseExamSection';
import PreviousPapersSection from '../components/home/PreviousPapersSection';
import FeatureSection from '../components/home/FeatureSection';
import PerformancePreviewSection from '../components/home/PerformancePreviewSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import NDAOverviewSection from '../components/home/NDAOverviewSection';
import CDSOverviewSection from '../components/home/CDSOverviewSection';
import FinalCTASection from '../components/home/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dp-bg">
      <SEOHead 
        title="NDA & CDS Previous Year Papers | Online Practice Tests"
        description="Attempt real NDA and CDS previous year papers in timed exam conditions. Analyse your mistakes, track performance, and improve with every test."
        canonicalPath="/"
        schema={[generateWebSiteSchema(), generateOrganizationSchema()]}
      />
      {/* SECTION 1 — HERO */}
      <HeroSection />

      {/* SECTION 2 — CHOOSE YOUR EXAM */}
      <ChooseExamSection />

      {/* SECTION 3 — PREVIOUS YEAR PAPERS */}
      <PreviousPapersSection />

      {/* SECTION 4 — REAL EXAM EXPERIENCE */}
      <FeatureSection />

      {/* SECTION 5 — PERFORMANCE */}
      <PerformancePreviewSection />

      {/* SECTION 6 — HOW IT WORKS */}
      <HowItWorksSection />

      {/* SECTION 7 — NDA OVERVIEW */}
      <NDAOverviewSection />

      {/* SECTION 8 — CDS OVERVIEW */}
      <CDSOverviewSection />

      {/* SECTION 9 — FINAL CTA */}
      <FinalCTASection />
    </div>
  );
};

export default HomePage;
