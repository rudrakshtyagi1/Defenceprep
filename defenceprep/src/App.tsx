import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import TestLayout from './layouts/TestLayout';

// Lazy-loaded pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PapersPage = lazy(() => import('./pages/PapersPage'));
const NDAPage = lazy(() => import('./pages/NDAPage'));
const CDSPage = lazy(() => import('./pages/CDSPage'));
const PaperLandingPage = lazy(() => import('./pages/PaperLandingPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ExamHubPage = lazy(() => import('./pages/ExamHubPage'));
const YearHubPage = lazy(() => import('./pages/YearHubPage'));
const LegacyPaperRedirect = lazy(() => import('./pages/LegacyPaperRedirect'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const PerformancePage = lazy(() => import('./pages/PerformancePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.DisclaimerPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DevPaperTestPage = lazy(() => import('./pages/DevPaperTestPage'));

const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-dp-bg flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
          color: '#0a0e1a',
        }}
      >
        DP
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              backgroundColor: 'var(--color-accent-from)',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main layout: nav + footer */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/papers" element={<PapersPage />} />
                
                {/* Legacy Backward Compatibility */}
                <Route path="/papers/:paperId" element={<LegacyPaperRedirect />} />
                
                {/* Canonical Paper Landing Pages */}
                <Route path="/:exam/:year/:session/:subject" element={<PaperLandingPage />} />
                
                {/* Hub Pages */}
                <Route path="/:exam/previous-year-papers" element={<ExamHubPage />} />
                <Route path="/:exam/:year" element={<YearHubPage />} />

                {/* Exam Info Pages */}
                <Route path="/nda" element={<NDAPage />} />
                <Route path="/cds" element={<CDSPage />} />
                
                {/* General Pages */}
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/results/:attemptId" element={<ResultsPage />} />
              </Route>

              {/* Test layout: no nav, focused exam mode */}
              <Route element={<TestLayout />}>
                <Route path="/test/:paperId" element={<TestPage />} />
              </Route>

              {/* Development-only preview route */}
              <Route path="/dev/paper-test" element={<DevPaperTestPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
