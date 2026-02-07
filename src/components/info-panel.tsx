'use client';

import { motion } from 'framer-motion';
import { Info, Activity, Database, CheckCircle2 } from 'lucide-react';
import { Step } from '@/types';

interface InfoPanelProps {
  currentStep: number;
  totalSteps: number;
  step?: Step;
  algorithmDescription: string;
}

const getStepTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    compare: 'Comparing Values',
    swap: 'Swapping Indices',
    done: 'Execution Complete',
    visit: 'Visiting Node',
    enqueue: 'Queue Push',
    dequeue: 'Queue Pop',
    push: 'Stack Push',
    pop: 'Stack Pop',
    heapify: 'Heap Restructuring',
  };
  return labels[type] || type;
};

const getStepTypeColor = (type: string): string => {
  const styles: Record<string, string> = {
    compare: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    swap: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    done: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    visit: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    heapify: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  };
  return styles[type] || 'text-slate-500 bg-slate-500/10 border-slate-500/20';
};

export default function InfoPanel({
  currentStep,
  totalSteps,
  step,
  algorithmDescription,
}: InfoPanelProps) {
  const progress = totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;

  return (
    <div className="sticky top-28 space-y-12">
      {/* ================= EXECUTION STATUS ================= */}
      <section className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              Execution Core
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Real-time telemetry of the active process.
          </p>
        </header>

        <div className="glass-card rounded-3xl p-6 border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -z-10 rounded-full" />

          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                Progress
              </div>
              <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {progress}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                Instruction
              </div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {currentStep + 1} <span className="text-slate-400 font-medium">/ {totalSteps}</span>
              </div>
            </div>
          </div>

          <div className="relative h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mb-8 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute h-full inset-y-0 left-0 premium-gradient shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            />
          </div>

          <div className="space-y-4">
            {step ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getStepTypeColor(step.type)}`}>
                  {step.type === 'done' && <CheckCircle2 size={12} />}
                  {getStepTypeLabel(step.type)}
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{step.description || 'Executing internal logic transformation...'}"
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Waiting for Seed...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= ALGORITHM INFO ================= */}
      <section className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Info className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              Theoretical Model
            </span>
          </div>
        </header>

        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {algorithmDescription}
          </p>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-normal">
              Internal state mutations are tracked across {totalSteps} deterministic steps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
