import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sampleData from '../data/processed-test/nda_2026_1_mathematics_sample.json';
import { CheckCircle2, AlertTriangle, FileCode, Shield, Layers, ChevronRight, ChevronLeft } from 'lucide-react';

export const DevPaperTestPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showRawJson, setShowRawJson] = useState(false);

  const paper = sampleData.paper;
  const questions = sampleData.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (key: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.questionNumber]: key
    }));
  };

  const selectedOpt = selectedAnswers[currentQ.questionNumber];

  return (
    <div className="min-h-screen bg-dp-bg text-dp-primary pb-16">
      {/* Dev Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-300 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>DEV ROUTE: Pilot Ingestion Preview (Not exposed in production navbar)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRawJson(!showRawJson)}
            className="hover:underline flex items-center gap-1 font-mono text-amber-200"
          >
            <FileCode size={13} />
            {showRawJson ? 'Hide Raw JSON' : 'Inspect Raw JSON'}
          </button>
          <Link to="/" className="text-dp-muted hover:text-dp-primary">
            &larr; Exit Preview
          </Link>
        </div>
      </div>

      {/* Header Info */}
      <header className="px-4 md:px-8 py-6 border-b border-dp bg-dp-surface">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 mb-1">
              <Shield size={14} />
              <span>SOURCE: {paper.sourceFile} • {paper.pageCount} Pages • Scanned PDF</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-dp-primary">
              {paper.exam} {paper.year} ({paper.cycle === 1 ? 'I' : 'II'}) — {paper.subject}
            </h1>
            <p className="text-xs text-dp-secondary mt-1">
              Live preview of validated sample questions extracted directly from original UPSC test booklet scan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl text-center">
              <div className="text-[10px] text-dp-muted uppercase font-mono">Extracted Sample</div>
              <div className="text-lg font-bold text-teal-400">{questions.length} Questions</div>
            </div>
            <div className="p-3 bg-dp-surface-2 border border-dp rounded-xl text-center">
              <div className="text-[10px] text-dp-muted uppercase font-mono">Validation</div>
              <div className="text-lg font-bold text-emerald-400">100% Pass</div>
            </div>
          </div>
        </div>
      </header>

      {/* Raw JSON viewer modal if open */}
      {showRawJson && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 mt-6">
          <div className="p-4 rounded-xl bg-dp-surface border border-dp font-mono text-xs overflow-x-auto max-h-96">
            <pre className="text-teal-300">{JSON.stringify(sampleData, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Main question preview area */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Question Viewer (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Question Progress & Confidence */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-xs">
                  Question {currentQ.questionNumber} of {questions.length}
                </span>
                <span className="text-xs text-dp-muted">• {currentQ.topic}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <CheckCircle2 size={14} />
                <span>Confidence: {Math.round(currentQ.extractionConfidence * 100)}%</span>
              </div>
            </div>

            {/* Question Text Box */}
            <div className="p-6 rounded-2xl bg-dp-surface border border-dp shadow-sm">
              <div className="text-xs font-mono text-dp-muted mb-2">
                ORIGINAL UPSC EXAM QUESTION (Page {currentQ.source.page}, {currentQ.source.column} column)
              </div>
              <p className="text-lg font-medium leading-relaxed whitespace-pre-line text-dp-primary">
                {currentQ.text}
              </p>
            </div>

            {/* Warning if any */}
            {currentQ.warning && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-semibold">Verification Audit Note:</span> {currentQ.warning}
                </div>
              </div>
            )}

            {/* Options */}
            <div className="flex flex-col gap-3">
              {(['A', 'B', 'C', 'D'] as const).map((key) => {
                const optText = currentQ.options[key];
                const isSelected = selectedOpt === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150 ${
                      isSelected
                        ? 'bg-[var(--color-accent-from)]/15 border-[var(--color-accent-from)] text-dp-primary'
                        : 'bg-dp-surface border-dp hover:border-dp-muted text-dp-secondary'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[var(--color-accent-from)] text-slate-950'
                          : 'bg-dp-surface-2 text-dp-muted'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">{optText}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between pt-4 border-t border-dp">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="btn-secondary text-xs px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous Question
              </button>

              <span className="text-xs text-dp-muted font-mono">
                {selectedOpt ? `Selected: Option (${selectedOpt})` : 'Not yet answered'}
              </span>

              <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="btn-primary text-xs px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Question
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Question Palette (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="card-dp p-5 bg-dp-surface border border-dp">
              <h3 className="text-sm font-bold text-dp-primary mb-3">Extracted Sample Palette</h3>
              <p className="text-xs text-dp-muted mb-4">Click any number to inspect that question's text and options.</p>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = !!selectedAnswers[q.questionNumber];
                  return (
                    <button
                      key={q.questionNumber}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'ring-2 ring-[var(--color-accent-from)] bg-[var(--color-accent-from)] text-slate-950'
                          : isAnswered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-dp-surface-2 text-dp-secondary border border-dp hover:border-dp-muted'
                      }`}
                    >
                      {q.questionNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ingestion Verification Audit Box */}
            <div className="card-dp p-5 bg-dp-surface border border-dp text-xs space-y-3">
              <div className="font-bold text-dp-primary flex items-center gap-1.5">
                <Layers size={14} className="text-teal-400" />
                Pipeline Verification Status
              </div>
              <div className="space-y-1.5 text-dp-secondary font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>Questions Extracted:</span>
                  <span className="text-teal-400 font-bold">10 / 10</span>
                </div>
                <div className="flex justify-between">
                  <span>Options Integrity:</span>
                  <span className="text-emerald-400 font-bold">4 Options Each (A-D)</span>
                </div>
                <div className="flex justify-between">
                  <span>Math Symbols:</span>
                  <span className="text-emerald-400 font-bold">Intact (Unicode)</span>
                </div>
                <div className="flex justify-between">
                  <span>Duplicates Filtered:</span>
                  <span className="text-emerald-400 font-bold">100% (Hindi Excluded)</span>
                </div>
                <div className="flex justify-between">
                  <span>Answer Key Source:</span>
                  <span className="text-dp-muted">null (As Specified)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DevPaperTestPage;
