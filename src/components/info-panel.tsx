'use client';

import { Step } from '@/types';
import { Info, Activity } from 'lucide-react';

interface InfoPanelProps {
  currentStep: number;
  totalSteps: number;
  step?: Step;
  algorithmDescription: string;
}

/* -------------------------------
   Helpers
-------------------------------- */
const getStepTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    compare: 'Comparing',
    swap: 'Swapping',
    done: 'Completed',
    visit: 'Visiting Node',
    enqueue: 'Enqueue',
    dequeue: 'Dequeue',
    push: 'Push',
    pop: 'Pop',
    heapify: 'Heapify',
  };
  return labels[type] || type;
};

const getStepTypeStyle = (type: string): string => {
  const styles: Record<string, string> = {
    compare:
      'bg-yellow-500/15 text-yellow-300 border-yellow-400/40 shadow-[0_0_20px_rgba(234,179,8,0.35)]',
    swap:
      'bg-rose-500/15 text-rose-300 border-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    done:
      'bg-emerald-500/15 text-emerald-300 border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    visit:
      'bg-violet-500/15 text-violet-300 border-violet-400/40 shadow-[0_0_20px_rgba(139,92,246,0.35)]',
    heapify:
      'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.35)]',
  };
  return styles[type] || 'bg-white/5 border-white/10 text-slate-300';
};

export default function InfoPanel({
  currentStep,
  totalSteps,
  step,
  algorithmDescription,
}: InfoPanelProps) {
  const progress =
    totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;

 return (
  <div className="sticky top-24 space-y-10">

    {/* ================= STEP STATUS ================= */}
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Execution Step
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs text-slate-500 mb-1">
              Current Step
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {totalSteps > 0 ? currentStep + 1 : 0}
              <span className="text-sm text-slate-500 ml-1">
                / {totalSteps}
              </span>
            </div>
          </div>

          <div className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            {progress}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Operation */}
        {step && (
          <div className="mt-5 space-y-2">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Current Operation
            </div>
            <span
              className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStepTypeStyle(
                step.type
              )}`}
            >
              {getStepTypeLabel(step.type)}
            </span>
          </div>
        )}

        {/* Description */}
        {step?.description && (
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            {step.description}
          </p>
        )}

        {totalSteps === 0 && (
          <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            Generate an algorithm to begin execution.
          </div>
        )}
      </div>
    </section>

    {/* ================= ALGORITHM INFO ================= */}
    <section className="space-y-4">
      <header className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Algorithm Context
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <p className="text-sm text-slate-700 leading-relaxed">
          {algorithmDescription}
        </p>

        <div className="pt-4 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 mt-0.5 text-blue-600" />
          <span>
            Follow how the algorithm modifies its internal state at each step.
          </span>
        </div>
      </div>
    </section>

    {/* ================= METRICS ================= */}
    {totalSteps > 0 && (
      <section className="space-y-4">
        <header className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Execution Metrics
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </header>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Total Steps</span>
            <span className="font-semibold text-slate-900">
              {totalSteps}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Progress</span>
            <span className="font-semibold text-blue-700">
              {progress}%
            </span>
          </div>
        </div>
      </section>
    )}
  </div>
);

}
