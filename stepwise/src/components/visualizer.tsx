'use client';

import { Step } from '@/types';

interface VisualizerProps {
  steps: Step[];
  currentStep: number;
}

export default function Visualizer({ steps, currentStep }: VisualizerProps) {
  const step = steps[currentStep];

  if (!step) {
    return (
      <div className="algo-panel min-h-96 flex flex-col items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl text-primary/30">✨</div>
          <p className="text-foreground/60">Generate or load an algorithm to visualize</p>
        </div>
      </div>
    );
  }

  /* Array Visualization */
  if (step.arrayState) {
    const maxValue = Math.max(...(step.arrayState || []), 100);

    return (
      <div className="algo-panel min-h-96 flex flex-col justify-center">
        <div className="flex items-end gap-2 justify-center h-80">
          {step.arrayState.map((value, idx) => {
            let colorClass = 'bg-blue-500';
            let isHighlighted = false;

            if (step.indices?.includes(idx)) {
              isHighlighted = true;
              if (step.type === 'compare') {
                colorClass = 'bg-yellow-500';
              } else if (step.type === 'swap') {
                colorClass = 'bg-red-500';
              } else if (step.type === 'done') {
                colorClass = 'bg-green-500';
              } else {
                colorClass = 'bg-violet-500';
              }
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`${colorClass} rounded-t-lg smooth-transition ${isHighlighted ? 'glow-effect scale-105' : ''} w-full`}
                  style={{
                    height: `${(value / maxValue) * 320}px`,
                  }}
                />
                <span className="text-xs font-mono text-foreground/60 h-4">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* Graph Visualization */
  if (step.extra?.visited) {
    return (
      <div className="algo-panel min-h-96 flex items-center justify-center">
        <div className="flex gap-6 flex-wrap justify-center">
          {step.extra.visited.map((visited: boolean, idx: number) => {
            const isCurrentNode = step.nodes?.[0] === String(idx);
            let bgColor = 'bg-blue-500/20 border-blue-500';
            let textColor = 'text-blue-300';

            if (isCurrentNode) {
              bgColor = 'bg-red-500/30 border-red-500 scale-110 glow-effect';
              textColor = 'text-red-300';
            } else if (visited) {
              bgColor = 'bg-green-500/30 border-green-500';
              textColor = 'text-green-300';
            }

            return (
              <div
                key={idx}
                className={`w-16 h-16 rounded-full flex items-center justify-center font-bold border-2 smooth-transition ${bgColor} ${textColor}`}
              >
                {idx}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="algo-panel min-h-96 flex items-center justify-center">
      <p className="text-foreground/60">Unsupported visualization</p>
    </div>
  );
}
