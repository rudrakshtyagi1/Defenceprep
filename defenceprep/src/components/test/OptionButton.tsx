import React from 'react';
import type { Option } from '../../types';
import { Check } from 'lucide-react';

interface OptionButtonProps {
  option: Option;
  isSelected: boolean;
  isCorrect?: boolean; // for review mode
  isWrong?: boolean; // for review mode
  isReviewMode?: boolean;
  onSelect?: (key: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  isCorrect,
  isWrong,
  isReviewMode,
  onSelect,
  disabled,
}) => {
  const getBgStyle = (): React.CSSProperties => {
    if (isReviewMode) {
      if (isCorrect) {
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid #10b981',
          color: '#10b981',
        };
      }
      if (isWrong) {
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '2px solid #ef4444',
          color: '#ef4444',
        };
      }
    }
    if (isSelected) {
      return {
        background: 'linear-gradient(135deg, rgba(0,212,170,0.15), rgba(59,130,246,0.15))',
        border: '2px solid var(--color-accent-from)',
        color: 'var(--color-text-primary)',
      };
    }
    return {
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      color: 'var(--color-text-primary)',
    };
  };

  const getKeyStyle = (): React.CSSProperties => {
    if (isReviewMode && isCorrect) {
      return { backgroundColor: '#10b981', color: '#fff' };
    }
    if (isReviewMode && isWrong) {
      return { backgroundColor: '#ef4444', color: '#fff' };
    }
    if (isSelected) {
      return {
        background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
        color: '#0a0e1a',
      };
    }
    return {
      backgroundColor: 'var(--color-surface-2)',
      color: 'var(--color-text-secondary)',
    };
  };

  return (
    <button
      onClick={() => !disabled && !isReviewMode && onSelect?.(option.key)}
      disabled={disabled || isReviewMode}
      className={`
        w-full flex items-start gap-3 p-4 rounded-lg text-left
        transition-all duration-150
        ${!isReviewMode && !disabled ? 'hover:border-opacity-80 cursor-pointer' : 'cursor-default'}
        ${isSelected && !isReviewMode ? 'hover:scale-[1.01]' : ''}
      `}
      style={getBgStyle()}
      aria-pressed={isSelected}
      aria-label={`Option ${option.key}: ${option.text}`}
    >
      {/* Key badge */}
      <span
        className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
        style={getKeyStyle()}
      >
        {isReviewMode && isCorrect ? <Check size={14} /> : option.key}
      </span>
      {/* Text */}
      <span className="text-sm leading-relaxed pt-0.5">{option.text}</span>
    </button>
  );
};

export default OptionButton;
