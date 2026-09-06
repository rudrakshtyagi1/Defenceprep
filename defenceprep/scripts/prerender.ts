import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PAPERS } from '../src/data/papers';
import { getPaperSeoPath } from '../src/utils/seoUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  const distPath = path.resolve(__dirname, '../dist');
  const serverDistPath = path.resolve(__dirname, '../dist/server');
  
  // Static shell built by vite build
  const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
  
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

  const routesToPrerender = [
    ...staticRoutes,
    ...yearRoutes,
    ...paperRoutes
  ];

  // Dynamically import the server entry
  // Because it's an ES module, we need to add the file protocol on windows, but it's safe on unix too.
  const { render } = await import(path.resolve(serverDistPath, 'entry-server.js'));

  for (const url of routesToPrerender) {
    // Render the app for this url
    let appHtml = render(url, {});
    
    // In React 19, metadata is hoisted to the top of the renderToString output
    // Extract title, meta, link, script tags from appHtml to move them to the head
    const headTagsRegex = /<(title|meta|link|script[^>]*type="application\/ld\+json"[^>]*)(?:>[\s\S]*?<\/\1>|\s[^>]*>)/gi;
    const extractedTags = [];
    appHtml = appHtml.replace(headTagsRegex, (match) => {
      extractedTags.push(match);
      return '';
    });
    const helmetTags = extractedTags.join('\n');

    // Inject tags and app html into the template
    let html = template.replace('<!-- SEO_HEAD_PLACEHOLDER -->', helmetTags);
    if (!html.includes(helmetTags)) {
      html = html.replace('</head>', `\n${helmetTags}\n</head>`); // Fallback if placeholder missing
    }
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Determine the output path
    const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const filePath = normalizedUrl === '' 
      ? path.resolve(distPath, 'index.html')
      : path.resolve(distPath, `${normalizedUrl.substring(1)}/index.html`);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
    console.log(`Prerendered: ${url}`);
  }
}

prerender().catch(console.error);
