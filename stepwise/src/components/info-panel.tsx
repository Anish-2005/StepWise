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
    <div className="sticky top-24 space-y-6">

      {/* ================= STEP STATUS ================= */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
            <h3 className="font-semibold tracking-wide text-slate-100">
              Step Status
            </h3>
          </div>
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>

        {/* STEP COUNT */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Current Step</div>
            <div className="text-3xl font-bold text-indigo-300">
              {totalSteps > 0 ? currentStep + 1 : 0}
              <span className="text-sm text-slate-400 ml-1">
                / {totalSteps}
              </span>
            </div>
          </div>

          <div className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300">
            {progress}%
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* OPERATION TYPE */}
        {step && (
          <div className="mt-5">
            <div className="text-xs text-slate-400 mb-2">
              Current Operation
            </div>
            <span
              className={`inline-block px-3 py-1.5 rounded-xl text-sm font-semibold border ${getStepTypeStyle(
                step.type
              )}`}
            >
              {getStepTypeLabel(step.type)}
            </span>
          </div>
        )}

        {/* DESCRIPTION */}
        {step?.description && (
          <div className="mt-4 text-sm text-slate-300 leading-relaxed">
            {step.description}
          </div>
        )}

        {totalSteps === 0 && (
          <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-400/30 text-xs text-slate-300">
            Generate steps to activate the execution engine.
          </div>
        )}
      </div>

      {/* ================= ALGORITHM INFO ================= */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          <h3 className="font-semibold tracking-wide text-slate-100 text-sm">
            Algorithm Info
          </h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {algorithmDescription}
        </p>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 mt-0.5 text-cyan-400" />
          <span>
            Observe how each operation transforms the data structure in real time.
          </span>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
      {totalSteps > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
            <h3 className="font-semibold tracking-wide text-slate-100 text-sm">
              Execution Metrics
            </h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Steps</span>
              <span className="font-semibold text-indigo-300">
                {totalSteps}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Progress</span>
              <span className="font-semibold text-emerald-300">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
