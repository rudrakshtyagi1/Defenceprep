import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PapersPage from './pages/PapersPage';
import NDAPage from './pages/NDAPage';
import CDSPage from './pages/CDSPage';
import PaperLandingPage from './pages/PaperLandingPage';
import AboutPage from './pages/AboutPage';
import { Routes, Route } from 'react-router-dom';

export function render(url: string, helmetContext: any) {
  return renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <StaticRouter location={url}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/papers" element={<PapersPage />} />
              <Route path="/papers/:paperId" element={<PaperLandingPage />} />
              <Route path="/nda" element={<NDAPage />} />
              <Route path="/cds" element={<CDSPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
