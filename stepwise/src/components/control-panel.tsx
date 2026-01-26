'use client';

import { Shuffle } from 'lucide-react';

interface ControlPanelProps {
  category: 'sorting' | 'graph' | 'heap';
  setCategory: (cat: 'sorting' | 'graph' | 'heap') => void;
  algorithm: string;
  setAlgorithm: (algo: any) => void;
  input: string;
  setInput: (input: string) => void;
  onGenerate: () => void;
  onRandom: () => void;
  isLoading?: boolean;
}

export default function ControlPanel({
  category,
  setCategory,
  algorithm,
  setAlgorithm,
  input,
  setInput,
  onGenerate,
  onRandom,
  isLoading = false,
}: ControlPanelProps) {
  const getCategoryOptions = () => {
    return [
      { value: 'sorting', label: 'Sorting Algorithms' },
      { value: 'graph', label: 'Graph Traversal' },
      { value: 'heap', label: 'Heap Operations' },
    ];
  };

  const getAlgorithmOptions = () => {
    const options: Record<string, Array<{ value: string; label: string }>> = {
      sorting: [
        { value: 'bubble', label: 'Bubble Sort' },
        { value: 'selection', label: 'Selection Sort' },
      ],
      graph: [
        { value: 'bfs', label: 'BFS' },
        { value: 'dfs', label: 'DFS' },
      ],
      heap: [
        { value: 'buildHeap', label: 'Build Heap' },
        { value: 'insertHeap', label: 'Insert' },
        { value: 'extractMax', label: 'Extract Max' },
      ],
    };
    return options[category] || [];
  };

  return (
    <div className="sticky top-24 space-y-4">
      {/* Category Selector */}
      <div className="algo-panel space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-8 bg-primary rounded-full" />
          <h3 className="font-semibold text-foreground">Category</h3>
        </div>

        <div className="space-y-2">
          {getCategoryOptions().map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value as any)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                category === opt.value
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-secondary/50 text-foreground hover:bg-secondary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Selector */}
      <div className="algo-panel space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-8 bg-primary rounded-full" />
          <h3 className="font-semibold text-foreground">Algorithm</h3>
        </div>

        <div className="space-y-2">
          {getAlgorithmOptions().map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAlgorithm(opt.value)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                algorithm === opt.value
                  ? 'bg-accent text-foreground shadow-lg shadow-accent/30'
                  : 'bg-secondary/50 text-foreground/70 hover:bg-secondary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="algo-panel space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1 w-8 bg-primary rounded-full" />
          <h3 className="font-semibold text-foreground text-sm">Input Data</h3>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 bg-secondary/50 border border-border/50 rounded-lg text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none"
          rows={3}
          placeholder="Enter comma-separated values..."
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="algo-button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
          <button
            onClick={onRandom}
            disabled={isLoading}
            className="algo-button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-4 h-4 inline mr-1" />
            Random
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="algo-panel space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1 w-8 bg-primary rounded-full" />
          <h3 className="font-semibold text-foreground text-sm">Legend</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-foreground/70">Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span className="text-foreground/70">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span className="text-foreground/70">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-foreground/70">Sorted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
