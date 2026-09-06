import React from 'react';
import SEOHead from '../components/seo/SEOHead';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dp-bg pt-24 pb-16 px-4">
      <SEOHead 
        title="Privacy Policy | DefencePrep" 
        description="Privacy policy for DefencePrep platform."
        canonicalPath="/privacy" 
      />
      <div className="max-w-3xl mx-auto card-dp p-8 bg-dp-surface border border-dp">
        <h1 className="text-3xl font-bold text-dp-primary mb-6">Privacy Policy</h1>
        <p className="text-dp-secondary">We respect your privacy. All your mock test attempt data is stored locally in your browser to maintain the best privacy possible.</p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dp-bg pt-24 pb-16 px-4">
      <SEOHead 
        title="Terms of Use | DefencePrep" 
        description="Terms of use for DefencePrep platform."
        canonicalPath="/terms" 
      />
      <div className="max-w-3xl mx-auto card-dp p-8 bg-dp-surface border border-dp">
        <h1 className="text-3xl font-bold text-dp-primary mb-6">Terms of Use</h1>
        <p className="text-dp-secondary">By using DefencePrep, you agree to our terms. This is a free educational platform built to help aspirants.</p>
      </div>
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dp-bg pt-24 pb-16 px-4">
      <SEOHead 
        title="Disclaimer | DefencePrep" 
        description="Disclaimer for DefencePrep platform."
        canonicalPath="/disclaimer" 
      />
      <div className="max-w-3xl mx-auto card-dp p-8 bg-dp-surface border border-dp">
        <h1 className="text-3xl font-bold text-dp-primary mb-6">Disclaimer</h1>
        <p className="text-dp-secondary font-bold mb-4 text-amber-500">
          DefencePrep is an independent educational practice platform and is not affiliated with UPSC, the Ministry of Defence, or the Indian Armed Forces.
        </p>
        <p className="text-dp-secondary">All previous year questions (PYQs) belong to the Union Public Service Commission (UPSC). They are provided here strictly for educational practice under fair use.</p>
      </div>
    </div>
  );
};
