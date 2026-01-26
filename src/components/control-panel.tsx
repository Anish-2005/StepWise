'use client';

import { Shuffle } from 'lucide-react';
import { AlgorithmType } from '@/types';

interface ControlPanelProps {
  category: 'sorting' | 'graph' | 'heap';
  setCategory: (cat: 'sorting' | 'graph' | 'heap') => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
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
        { value: 'insertion', label: 'Insertion Sort' },
        { value: 'merge', label: 'Merge Sort' },
        { value: 'quick', label: 'Quick Sort' },
      ],
      graph: [
        { value: 'bfs', label: 'BFS' },
        { value: 'dfs', label: 'DFS' },
        { value: 'dijkstra', label: 'Dijkstra' },
        { value: 'astar', label: 'A* Search' },
      ],
      heap: [
        { value: 'buildHeap', label: 'Build Heap' },
        { value: 'insertHeap', label: 'Insert' },
        { value: 'extractMax', label: 'Extract Max' },
        { value: 'heapSort', label: 'Heap Sort' },
        { value: 'decreaseKey', label: 'Decrease Key' },
        { value: 'deleteHeap', label: 'Delete' },
      ],
    };
    return options[category] || [];
  };
return (
  <div className="sticky top-24 space-y-10">

    {/* ================= CATEGORY ================= */}
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            1 · Category
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-sm text-slate-600">
          Choose the type of problem you want to explore.
        </p>
      </header>

      <div className="space-y-2">
        {getCategoryOptions().map((opt) => {
          const active = category === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value as 'sorting' | 'graph' | 'heap')}
              className={`
                w-full px-4 py-2.5 rounded-xl text-sm font-medium text-left
                transition-all duration-200
                ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>

    {/* ================= ALGORITHM ================= */}
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            2 · Algorithm
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-sm text-slate-600">
          Select the specific algorithm to execute.
        </p>
      </header>

      <div className="space-y-2">
        {getAlgorithmOptions().map((opt) => {
          const active = algorithm === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setAlgorithm(opt.value as AlgorithmType)}
              className={`
                w-full px-4 py-2.5 rounded-xl text-sm font-medium text-left
                transition-all duration-200
                ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>

    {/* ================= INPUT ================= */}
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            3 · Input
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-sm text-slate-600">
          Provide the data the algorithm will operate on.
        </p>
      </header>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        placeholder="Example: 64, 34, 25, 12, 22"
        className="
          w-full p-3 rounded-xl text-sm
          bg-white border border-slate-200 text-slate-800
          placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
          resize-none
        "
      />

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="
            h-10 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? 'Generating…' : 'Generate'}
        </button>

        <button
          onClick={onRandom}
          disabled={isLoading}
          className="
            h-10 rounded-xl bg-white border border-slate-200
            text-slate-700 font-medium
            hover:bg-slate-50 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <Shuffle className="w-4 h-4 inline mr-1" />
          Random
        </button>
      </div>
    </section>

    {/* ================= LEGEND ================= */}
    <section className="space-y-4 pt-2">
      <header className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Legend
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </header>

      <div className="space-y-2 text-sm">
        {[
          ['bg-blue-500', 'Default state'],
          ['bg-yellow-500', 'Comparing'],
          ['bg-red-500', 'Swapping'],
          ['bg-green-500', 'Final position'],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-slate-600">{label}</span>
          </div>
        ))}
      </div>
    </section>

  </div>
);


}
