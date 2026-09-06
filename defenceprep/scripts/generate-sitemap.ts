import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PAPERS } from '../src/data/papers';
import { getSiteUrl, getPaperSeoPath } from '../src/utils/seoUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml');
  const siteUrl = getSiteUrl();

  const staticRoutes = [
    '/',
    '/nda',
    '/cds',
    '/nda/previous-year-papers',
    '/cds/previous-year-papers',
    '/about',
    '/privacy',
    '/terms',
    '/disclaimer'
  ];

  // Extract year hubs dynamically from papers
  const ndaYears = Array.from(new Set(PAPERS.filter(p => p.examCode === 'NDA' && p.available).map(p => p.year)));
  const cdsYears = Array.from(new Set(PAPERS.filter(p => p.examCode === 'CDS' && p.available).map(p => p.year)));

  const yearRoutes = [
    ...ndaYears.map(year => `/nda/${year}`),
    ...cdsYears.map(year => `/cds/${year}`)
  ];

  // Extract canonical paper URLs
  const publishedPapers = PAPERS.filter(p => p.available);
  const paperRoutes = publishedPapers.map(p => getPaperSeoPath(p));

  const allRoutes = [
    ...staticRoutes,
    ...yearRoutes,
    ...paperRoutes
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/previous-year-papers') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Sitemap generated successfully at dist/sitemap.xml');

  // Generate robots.txt
  const robotsPath = path.resolve(__dirname, '../dist/robots.txt');
  const robotsContent = `User-agent: *
Allow: /
Disallow: /test/
Disallow: /results/
Disallow: /performance/
Disallow: /dev/

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('✅ robots.txt generated successfully at dist/robots.txt');
}

generateSitemap().catch(console.error);
