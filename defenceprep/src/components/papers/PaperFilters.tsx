import { Search } from 'lucide-react';

interface FilterState {
  examCode: string;
  year: string;
  subject: string;
  search: string;
  sortOrder: string;
}

interface PaperFiltersProps {
  filters: FilterState;
  onFilterChange: (key: string, value: string) => void;
  years: number[];
  subjects: string[];
}

const EXAM_CHIPS = [
  { value: 'ALL', label: 'All Exams' },
  { value: 'NDA', label: 'NDA' },
  { value: 'CDS', label: 'CDS' },
];

const SORT_CHIPS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

export default function PaperFilters({
  filters,
  onFilterChange,
  years,
  subjects,
}: PaperFiltersProps) {
  return (
    <div className="bg-dp-surface border border-dp rounded-xl p-4 flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          strokeWidth={2}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-dp-muted pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search papers…"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="
            w-full bg-dp-bg border border-dp rounded-lg
            pl-9 pr-4 py-2.5 text-sm text-dp-primary
            placeholder:text-dp-muted
            focus:outline-none focus:border-[var(--color-accent-from)]
            transition-colors
          "
        />
      </div>

      {/* Row: chips + dropdowns */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Exam chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-dp-muted uppercase tracking-wider mr-1">
            Exam
          </span>
          {EXAM_CHIPS.map((chip) => (
            <button
              key={chip.value}
              onClick={() => onFilterChange('examCode', chip.value)}
              className={`
                text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
                ${
                  filters.examCode === chip.value
                    ? 'gradient-accent-bg border-transparent text-[#0a0e1a]'
                    : 'bg-dp-bg border-dp text-dp-secondary hover:border-[var(--color-accent-from)] hover:text-dp-primary'
                }
              `}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Dropdowns + sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Year select */}
          <select
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="
              bg-dp-bg border border-dp rounded-lg
              px-3 py-2 text-sm text-dp-secondary
              focus:outline-none focus:border-[var(--color-accent-from)]
              cursor-pointer transition-colors
            "
          >
            <option value="ALL">All Years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>

          {/* Subject select */}
          <select
            value={filters.subject}
            onChange={(e) => onFilterChange('subject', e.target.value)}
            className="
              bg-dp-bg border border-dp rounded-lg
              px-3 py-2 text-sm text-dp-secondary
              focus:outline-none focus:border-[var(--color-accent-from)]
              cursor-pointer transition-colors
            "
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Sort chips */}
          <div className="flex items-center gap-1 bg-dp-bg border border-dp rounded-lg p-0.5">
            {SORT_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => onFilterChange('sortOrder', chip.value)}
                className={`
                  text-xs font-semibold px-3 py-1.5 rounded-md transition-all
                  ${
                    filters.sortOrder === chip.value
                      ? 'bg-dp-surface text-dp-primary shadow-sm'
                      : 'text-dp-muted hover:text-dp-secondary'
                  }
                `}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
