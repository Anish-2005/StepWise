'use client';

import { Step } from '@/types';
import { Info } from 'lucide-react';

interface InfoPanelProps {
  currentStep: number;
  totalSteps: number;
  step?: Step;
  algorithmDescription: string;
}

const getStepTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    compare: 'Comparing',
    swap: 'Swapping',
    sorted: 'Sorted',
    visiting: 'Visiting',
    visited: 'Visited',
  };
  return labels[type] || type;
};

const getStepTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    compare: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    swap: 'bg-red-500/20 text-red-300 border-red-500/50',
    sorted: 'bg-green-500/20 text-green-300 border-green-500/50',
    visiting: 'bg-violet-500/20 text-violet-300 border-violet-500/50',
    visited: 'bg-green-500/20 text-green-300 border-green-500/50',
  };
  return colors[type] || '';
};

export default function InfoPanel({
  currentStep,
  totalSteps,
  step,
  algorithmDescription,
}: InfoPanelProps) {
  return (
    <div className="sticky top-24 space-y-4">
      {/* Step Info */}
      <div className="algo-panel space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-8 bg-primary rounded-full" />
          <h3 className="font-semibold text-foreground">Step Information</h3>
        </div>

        <div className="space-y-3">
          <div className="algo-card">
            <div className="text-xs text-foreground/60 mb-1">Current Step</div>
            <div className="text-2xl font-bold text-primary">
              {totalSteps > 0 ? currentStep + 1 : 0}
              <span className="text-sm text-foreground/50 ml-1">/ {totalSteps}</span>
            </div>
          </div>

          {step && (
            <>
              <div className="algo-card">
                <div className="text-xs text-foreground/60 mb-2">Operation Type</div>
                <div
                  className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border ${getStepTypeColor(step.type)}`}
                >
                  {getStepTypeLabel(step.type)}
                </div>
              </div>

              {step.description && (
                <div className="algo-card">
                  <div className="text-xs text-foreground/60 mb-2">Description</div>
                  <p className="text-sm text-foreground leading-relaxed">{step.description}</p>
                </div>
              )}
            </>
          )}

          {totalSteps === 0 && (
            <div className="algo-card bg-violet-500/10 border-violet-500/50">
              <p className="text-xs text-foreground/70">
                Generate an algorithm visualization to see step information.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="algo-panel space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-8 bg-accent rounded-full" />
          <h3 className="font-semibold text-foreground text-sm">About</h3>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">{algorithmDescription}</p>

        <div className="pt-3 border-t border-border/50">
          <div className="flex items-start gap-2 text-xs text-foreground/60">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
            <span>Watch how the algorithm processes your input step by step.</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {totalSteps > 0 && (
        <div className="algo-panel space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 bg-green-500 rounded-full" />
            <h3 className="font-semibold text-foreground text-sm">Statistics</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-foreground/70">Total Steps</span>
              <span className="font-semibold text-primary">{totalSteps}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground/70">Progress</span>
              <span className="font-semibold text-accent">
                {totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
