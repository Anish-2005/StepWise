'use client';

import { Step } from '@/types';

interface VisualizerProps {
  steps: Step[];
  currentStep: number;
}

export default function Visualizer({ steps, currentStep }: VisualizerProps) {
  const step = steps[currentStep];

  /* ================= EMPTY STATE ================= */
  if (!step) {
    return (
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center space-y-4">
          <div className="text-5xl">✨</div>
          <p className="text-slate-300 text-sm tracking-wide">
            Generate an algorithm to begin execution
          </p>
        </div>
      </div>
    );
  }

  /* ================= ARRAY VISUALIZATION ================= */
  if (step.arrayState) {
    const maxValue = Math.max(...step.arrayState, 100);

    return (
      <div className="relative h-full overflow-hidden">
        {/* Grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

        <div className="relative z-10 flex items-end justify-center gap-2 h-full">
          {step.arrayState.map((value, idx) => {
            const active = step.indices?.includes(idx);

            let barColor =
              'bg-gradient-to-t from-blue-500/40 to-blue-400';
            let glow = '';

            if (active) {
              if (step.type === 'compare') {
                barColor =
                  'bg-gradient-to-t from-yellow-500 to-yellow-400';
                glow = 'shadow-[0_0_25px_rgba(234,179,8,0.8)]';
              } else if (step.type === 'swap') {
                barColor =
                  'bg-gradient-to-t from-rose-500 to-pink-500';
                glow = 'shadow-[0_0_25px_rgba(244,63,94,0.8)]';
              } else if (step.type === 'done') {
                barColor =
                  'bg-gradient-to-t from-emerald-500 to-teal-400';
                glow = 'shadow-[0_0_25px_rgba(16,185,129,0.8)]';
              }
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end flex-1 gap-2"
              >
                <div
                  className={`w-12 rounded-t-xl transition-all duration-300 ease-out ${barColor} ${glow} ${
                    active ? 'scale-105' : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 350}px`,
                  }}
                />
                <span className="text-xs font-mono text-slate-400">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ================= GRAPH VISUALIZATION ================= */
  if (step.extra?.visited) {
    return (
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex gap-6 flex-wrap justify-center">
          {step.extra.visited.map((visited: boolean, idx: number) => {
            const isCurrent =
              step.nodes?.[0] === String(idx);

            let nodeStyle =
              'bg-blue-500/10 border-blue-400 text-blue-300';

            if (isCurrent) {
              nodeStyle =
                'bg-rose-500/20 border-rose-400 text-rose-300 scale-110 shadow-[0_0_25px_rgba(244,63,94,0.8)]';
            } else if (visited) {
              nodeStyle =
                'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.6)]';
            }

            return (
              <div
                key={idx}
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 ${nodeStyle}`}
              >
                {idx}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ================= FALLBACK ================= */
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-slate-400 text-sm">
        Visualization not available for this step
      </p>
    </div>
  );
}

