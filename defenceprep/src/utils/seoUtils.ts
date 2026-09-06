import type { Paper } from '../types';

export const getSiteUrl = (): string => {
  // Try to use environment variables
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL) {
    // @ts-ignore
    return process.env.VITE_SITE_URL.replace(/\/$/, '');
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/$/, '');
  }
  
  // Default fallback for development
  return 'http://localhost:5173';
};

export const getPaperSeoPath = (paper: Paper): string => {
  const exam = paper.examCode.toLowerCase();
  const year = paper.year;
  const session = paper.session === 'I' ? '1' : paper.session === 'II' ? '2' : '1+2';
  
  // Create a clean subject slug
  const subjectSlug = paper.subject.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  return `/${exam}/${year}/${session}/${subjectSlug}/`;
};

export const getPaperCanonical = (paper: Paper): string => {
  return `${getSiteUrl()}${getPaperSeoPath(paper)}`;
};

export const getPaperTitle = (paper: Paper): string => {
  const sessionNum = paper.session === 'I' ? '1' : paper.session === 'II' ? '2' : '1+2';
  return `${paper.examCode} ${sessionNum} ${paper.year} ${paper.subject} Question Paper Online | DefencePrep`;
};

export const getPaperH1 = (paper: Paper): string => {
  const sessionNum = paper.session === 'I' ? '1' : paper.session === 'II' ? '2' : '1+2';
  return `${paper.examCode} ${sessionNum} ${paper.year} ${paper.subject} Question Paper`;
};

export const getPaperDescription = (paper: Paper): string => {
  const sessionNum = paper.session === 'I' ? '1' : paper.session === 'II' ? '2' : '1+2';
  return `Attempt the ${paper.examCode} ${sessionNum} ${paper.year} ${paper.subject} previous year question paper online with a real exam timer, question palette and exam-style practice on DefencePrep.`;
};

export const getPaperBreadcrumbs = (paper: Paper) => {
  const sessionStr = paper.session ? `${paper.examCode} ${paper.session}` : paper.examCode;
  return [
    { name: "Home", item: "/" },
    { name: paper.examCode, item: `/${paper.examCode.toLowerCase()}` },
    { name: "Previous Year Papers", item: `/${paper.examCode.toLowerCase()}/previous-year-papers` },
    { name: paper.year.toString(), item: `/${paper.examCode.toLowerCase()}/${paper.year}` },
    { name: `${sessionStr} ${paper.subject}`, item: getPaperSeoPath(paper) }
  ];
};
