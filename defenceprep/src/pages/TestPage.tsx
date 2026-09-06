import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import { getPaperById } from '../data/papers';
import { getQuestionsForPaper } from '../data/questions';
import { useTestEngine } from '../hooks/useTestEngine';
import TestTopBar from '../components/test/TestTopBar';
import QuestionCard from '../components/test/QuestionCard';
import QuestionPalette from '../components/test/QuestionPalette';
import SubmitModal from '../components/test/SubmitModal';
import { Grid, X } from 'lucide-react';

const TestPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPaletteDrawer, setShowPaletteDrawer] = useState(false);

  const paper = paperId ? getPaperById(paperId) : null;
  const questions = paperId ? getQuestionsForPaper(paperId) : [];

  useEffect(() => {
    if (!paper) navigate('/papers', { replace: true });
  }, [paper, navigate]);

  // Warn before navigating away from active test
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Your test is in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const engine = useTestEngine({
    paper: paper!,
    questions,
  });

  if (!paper) return null;

  const {
    attempt,
    currentQuestionIndex,
    isSubmitted,
    timeRemainingSeconds,
    selectAnswer,
    clearResponse,
    markForReview,
    saveAndNext,
    goToQuestion,
    goPrev,
    submitTest,
    getStatusCounts,
  } = engine;

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? attempt.answers[currentQuestion.id]
    : null;

  const counts = getStatusCounts();
  const statusCounts = {
    total: questions.length,
    answered: counts.answered + counts['answered-marked'],
    notAnswered: counts['not-answered'],
    markedForReview: counts['marked-for-review'] + counts['answered-marked'],
    notVisited: counts['not-visited'],
  };

  const isMarked =
    currentAnswer?.status === 'marked-for-review' ||
    currentAnswer?.status === 'answered-marked';

  const isWarning = timeRemainingSeconds <= 300 && timeRemainingSeconds > 60;
  const isCritical = timeRemainingSeconds <= 60;
  const totalSeconds = paper.durationMinutes * 60;

  const handleSubmit = () => {
    submitTest();
    setShowSubmitModal(false);
    navigate(`/results/${attempt.id}`);
  };

  if (isSubmitted) {
    navigate(`/results/${attempt.id}`, { replace: true });
    return null;
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen text-dp-muted">
        No questions found for this paper.
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-dp-bg">
      <SEOHead 
        title={`${paper.paperName} | Test Mode`}
        description="Active test session."
        noindex={true}
      />
      {/* Top Bar */}
      <TestTopBar
        examName={paper.examCode}
        paperName={`${paper.paperName} — ${paper.subject}`}
        secondsLeft={timeRemainingSeconds}
        totalSeconds={totalSeconds}
        isWarning={isWarning}
        isCritical={isCritical}
        onSubmitClick={() => setShowSubmitModal(true)}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Question Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-dp-muted">
                Question{' '}
                <span className="font-bold text-dp-primary">
                  {currentQuestionIndex + 1}
                </span>{' '}
                of{' '}
                <span className="font-medium">{questions.length}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-dp-muted">
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: '#10b981' }}
                  />
                  {statusCounts.answered} Answered
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: '#8b5cf6' }}
                  />
                  {statusCounts.markedForReview} Marked
                </span>
              </div>
              {/* Mobile palette toggle */}
              <button
                className="lg:hidden flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
                onClick={() => setShowPaletteDrawer(true)}
              >
                <Grid size={14} />
                Palette
              </button>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-1 rounded-full mb-8 overflow-hidden"
              style={{ backgroundColor: 'var(--color-border)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  background: 'linear-gradient(90deg, var(--color-accent-from), var(--color-accent-to))',
                }}
              />
            </div>

            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedOption={currentAnswer?.selectedOption ?? null}
              isMarked={isMarked}
              onSelectOption={(key) => selectAnswer(currentQuestion.id, key)}
              onMarkForReview={() => markForReview(currentQuestion.id)}
              onClearResponse={() => clearResponse(currentQuestion.id)}
              onSaveAndNext={() => saveAndNext(currentQuestion.id)}
              onPrevious={goPrev}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === questions.length - 1}
            />
          </div>
        </main>

        {/* Right Sidebar — Question Palette (desktop) */}
        <aside
          className="hidden lg:flex flex-col w-72 flex-shrink-0 overflow-y-auto p-4"
          style={{
            borderLeft: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <h3 className="text-sm font-semibold text-dp-primary mb-4">Question Palette</h3>
          <QuestionPalette
            answers={attempt.answers}
            questionIds={questions.map((q) => q.id)}
            currentIndex={currentQuestionIndex}
            onSelect={goToQuestion}
            counts={counts}
          />
        </aside>
      </div>

      {/* Mobile Palette Drawer */}
      {showPaletteDrawer && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowPaletteDrawer(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-5 overflow-y-auto"
            style={{
              backgroundColor: 'var(--color-surface)',
              maxHeight: '70vh',
              border: '1px solid var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-dp-primary">Question Palette</h3>
              <button
                onClick={() => setShowPaletteDrawer(false)}
                className="text-dp-muted hover:text-dp-secondary"
              >
                <X size={18} />
              </button>
            </div>
            <QuestionPalette
              answers={attempt.answers}
              questionIds={questions.map((q) => q.id)}
              currentIndex={currentQuestionIndex}
              onSelect={(idx) => {
                goToQuestion(idx);
                setShowPaletteDrawer(false);
              }}
              counts={counts}
            />
          </div>
        </div>
      )}

      {/* Submit Modal */}
      <SubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmit}
        stats={statusCounts}
      />
    </div>
  );
};

export default TestPage;
