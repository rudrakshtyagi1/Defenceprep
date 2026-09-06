import type { Exam } from '../types';

export const EXAMS: Exam[] = [
  {
    id: 'nda',
    code: 'NDA',
    name: 'NDA',
    fullName: 'National Defence Academy',
    description:
      'The National Defence Academy (NDA) is the joint defence service training institute of the Indian Armed Forces. The NDA exam is conducted twice a year by UPSC for admission to Army, Navy and Air Force wings.',
    conductedBy: 'UPSC (Union Public Service Commission)',
    frequency: 'Twice a year (NDA I & NDA II)',
    officialSite: 'https://upsc.gov.in',
    eligibility: {
      age: '16.5 to 19.5 years',
      education: 'Class 12th pass or appearing (PCM for Navy/Air Force)',
      nationality: 'Indian citizen or subject of Bhutan/Nepal',
      gender: 'Male (Female candidates not eligible for NDA)',
    },
    selectionProcess: [
      'Written Examination (UPSC)',
      'SSB Interview (5-day process)',
      'Medical Examination',
      'Final Merit List',
    ],
    color: '#00d4aa',
  },
  {
    id: 'cds',
    code: 'CDS',
    name: 'CDS',
    fullName: 'Combined Defence Services',
    description:
      'The Combined Defence Services (CDS) examination is conducted by UPSC twice annually for recruitment into the Indian Military Academy, Indian Naval Academy, Air Force Academy, and Officers Training Academy.',
    conductedBy: 'UPSC (Union Public Service Commission)',
    frequency: 'Twice a year (CDS I & CDS II)',
    officialSite: 'https://upsc.gov.in',
    eligibility: {
      age: '19 to 25 years (varies by academy)',
      education: 'Graduation degree from a recognized university',
      nationality: 'Indian citizen',
      gender:
        'Male and Female (Women eligible for OTA)',
    },
    selectionProcess: [
      'Written Examination (UPSC)',
      'SSB Interview',
      'Medical Examination',
      'Training at respective Academy',
    ],
    color: '#3b82f6',
  },
];

export const getExamById = (id: string): Exam | undefined =>
  EXAMS.find((e) => e.id === id);

export const getExamByCode = (code: string): Exam | undefined =>
  EXAMS.find((e) => e.code === code);
