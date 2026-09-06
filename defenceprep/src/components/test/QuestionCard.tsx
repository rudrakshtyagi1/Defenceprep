import React, { useState } from 'react';
import type { Question } from '../../types';
import OptionButton from './OptionButton';
import { Bookmark, Info, Image as ImageIcon, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  isMarked: boolean;
  onSelectOption: (key: 'A' | 'B' | 'C' | 'D') => void;
  onMarkForReview: () => void;
  onClearResponse: () => void;
  onSaveAndNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  isMarked,
  onSelectOption,
  onMarkForReview,
  onClearResponse,
  onSaveAndNext,
  onPrevious,
  isFirst,
  isLast,
}) => {
  // If contentMode is 'image', auto-display the official crop
  const [showOriginalCrop, setShowOriginalCrop] = useState<boolean>(
    question.contentMode === 'image'
  );

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Question header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded"
            style={{
              backgroundColor: 'var(--color-surface-2)',
              color: 'var(--color-text-muted)',
            }}
          >
            Q{questionNumber} / {totalQuestions}
          </span>
          {question.topic && (
            <span
              className="text-xs px-2.5 py-0.5 rounded font-medium"
              style={{
                backgroundColor: 'rgba(0,212,170,0.1)',
                color: 'var(--color-accent-from)',
                border: '1px solid rgba(0,212,170,0.2)',
              }}
            >
              {question.topic}
            </span>
          )}
          {question.contentMode === 'image' && (
            <span
              className="text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(245,158,11,0.1)',
                color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.25)',
              }}
            >
              <AlertCircle size={12} /> Math Print View
            </span>
          )}
          {question.pageNumber && (
            <span className="text-[11px] text-dp-muted">
              Page {question.pageNumber}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {question.sourceImage && (
            <button
              onClick={() => setShowOriginalCrop((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
              style={{
                backgroundColor: showOriginalCrop
                  ? 'rgba(0,212,170,0.12)'
                  : 'var(--color-surface-2)',
                border: `1px solid ${
                  showOriginalCrop ? 'rgba(0,212,170,0.3)' : 'var(--color-border)'
                }`,
                color: showOriginalCrop
                  ? 'var(--color-accent-from)'
                  : 'var(--color-text-secondary)',
              }}
              title="Toggle UPSC Official Paper Crop"
            >
              {showOriginalCrop ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{showOriginalCrop ? 'Hide Paper Crop' : 'View Paper Crop'}</span>
            </button>
          )}

          <button
            onClick={onMarkForReview}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
              isMarked ? 'text-purple-400' : 'text-dp-muted hover:text-dp-secondary'
            }`}
            style={{
              backgroundColor: isMarked
                ? 'rgba(139,92,246,0.1)'
                : 'var(--color-surface-2)',
              border: `1px solid ${
                isMarked ? 'rgba(139,92,246,0.3)' : 'var(--color-border)'
              }`,
            }}
            aria-pressed={isMarked}
            aria-label="Mark for review"
          >
            <Bookmark size={13} fill={isMarked ? '#8b5cf6' : 'none'} />
            {isMarked ? 'Marked' : 'Mark for Review'}
          </button>
        </div>
      </div>

      {/* Shared Context / Directions (if multi-question group) */}
      {question.sharedContext && (
        <div
          className="p-4 rounded-xl border flex flex-col gap-1.5"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderColor: 'rgba(59, 130, 246, 0.25)',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Info size={14} /> Shared Context / Directions
          </div>
          <p className="text-dp-primary text-sm leading-relaxed whitespace-pre-line font-medium">
            {question.sharedContext}
          </p>
        </div>
      )}

      {/* Official 300 DPI Question Crop (when toggled or in image mode) */}
      {question.sourceImage && showOriginalCrop && (
        <div
          className="p-3 rounded-xl border flex flex-col gap-2 bg-white"
          style={{ borderColor: 'rgba(0,212,170,0.3)' }}
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-sans border-b border-gray-100 pb-1.5">
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              <ImageIcon size={13} className="text-teal-600" />
              Official UPSC Question Crop (Original Print)
            </span>
            <span className="text-[11px] text-gray-400 font-mono">
              300 DPI · Question {question.questionNumber}
            </span>
          </div>
          <div className="overflow-x-auto flex justify-center py-2 bg-white rounded">
            <img
              src={question.sourceImage}
              alt={`Question ${question.questionNumber} official print`}
              className="max-h-72 w-auto object-contain rounded select-none shadow-xs"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Question text */}
      <div
        className="p-5 rounded-xl"
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        <p className="text-dp-primary text-base leading-relaxed font-medium">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((option) => (
          <OptionButton
            key={option.key}
            option={option}
            isSelected={selectedOption === option.key}
            onSelect={onSelectOption}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2 mt-auto">
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            disabled={isFirst}
            className="btn-secondary text-sm px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={onClearResponse}
            disabled={!selectedOption}
            className="text-sm px-4 py-2 rounded font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'transparent',
            }}
          >
            Clear Response
          </button>
        </div>

        <button
          onClick={onSaveAndNext}
          className="btn-primary text-sm px-5 py-2"
        >
          {isLast ? 'Save' : 'Save & Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
