import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAPERS, getUniqueYears, getUniqueSubjects } from '../data/papers';
import PaperCard from '../components/papers/PaperCard';
import PaperFilters from '../components/papers/PaperFilters';
import { BookOpen } from 'lucide-react';

const PapersPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    examCode: 'ALL',
    year: 'ALL',
    subject: 'ALL',
    search: '',
    sortOrder: 'newest',
  });

  const years = getUniqueYears();
  const subjects = getUniqueSubjects();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredPapers = useMemo(() => {
    let result = [...PAPERS];

    if (filters.examCode !== 'ALL') {
      result = result.filter((p) => p.examCode === filters.examCode);
    }
    if (filters.year !== 'ALL') {
      result = result.filter((p) => p.year === Number(filters.year));
    }
    if (filters.subject !== 'ALL') {
      result = result.filter((p) => p.subject === filters.subject);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.paperName.toLowerCase().includes(q) ||
          p.subject.toLowerCase().includes(q) ||
          p.examCode.toLowerCase().includes(q) ||
          p.year.toString().includes(q)
      );
    }

    result.sort((a, b) =>
      filters.sortOrder === 'newest' ? b.year - a.year : a.year - b.year
    );

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen bg-dp-bg">
      {/* Page header */}
      <div
        className="py-14 px-4 md:px-8 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Subtle dot texture */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-6xl mx-auto">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
            style={{
              backgroundColor: 'rgba(0,212,170,0.1)',
              border: '1px solid rgba(0,212,170,0.2)',
              color: 'var(--color-accent-from)',
            }}
          >
            <BookOpen size={12} />
            Question Papers
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-dp-primary mb-3">
            Previous Year{' '}
            <span className="gradient-accent">Question Papers</span>
          </h1>
          <p className="text-base text-dp-secondary max-w-xl">
            Turn previous year papers into real exam practice. Select a paper
            and attempt it in timed exam conditions.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="sticky top-16 z-20 px-4 md:px-8 py-4"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-bg) 90%, transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <PaperFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            years={years}
            subjects={subjects}
          />
        </div>
      </div>

      {/* Papers grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-dp-muted">
            Showing{' '}
            <span className="font-semibold text-dp-primary">
              {filteredPapers.length}
            </span>{' '}
            paper{filteredPapers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredPapers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onAttempt={(id) => navigate(`/test/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <BookOpen size={28} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <h3 className="text-lg font-semibold text-dp-primary mb-2">No papers found</h3>
            <p className="text-sm text-dp-muted">
              Try adjusting the filters or search query.
            </p>
            <button
              onClick={() =>
                setFilters({
                  examCode: 'ALL',
                  year: 'ALL',
                  subject: 'ALL',
                  search: '',
                  sortOrder: 'newest',
                })
              }
              className="btn-secondary mt-4 text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PapersPage;
