import fs from 'fs';
import path from 'path';

// Define static routes
const staticRoutes = [
  '/',
  '/papers',
  '/nda',
  '/cds',
  '/about'
];

// In a real scenario, this would import from src/data/papers.ts
// For the build script, we might just parse the papers list or use a JSON
// Since this script runs in Node before/after Vite build, we can't easily import a .ts file 
// if it relies on Vite plugins. Let's create a minimal script that can read the papers.
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml');
  const siteUrl = 'https://defenceprep.in';

  // Read papers from data file (using regex to extract paper IDs for simplicity in this script)
  const papersFileContent = fs.readFileSync(path.resolve(__dirname, '../src/data/papers.ts'), 'utf-8');
  const paperIdRegex = /id:\s*['"]([^'"]+)['"]/g;
  
  const paperIds: string[] = [];
  let match;
  while ((match = paperIdRegex.exec(papersFileContent)) !== null) {
    if (!paperIds.includes(match[1])) {
        paperIds.push(match[1]);
    }
  }

  const allRoutes = [
    ...staticRoutes,
    ...paperIds.map(id => `/papers/${id}`)
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/papers/') ? '0.8' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Sitemap generated successfully at dist/sitemap.xml');
}

generateSitemap().catch(console.error);
