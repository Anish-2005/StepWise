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
  <div className="sticky top-24 space-y-6">

    {/* ================= CATEGORY ================= */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
          <h3 className="font-semibold tracking-wide text-slate-100">
            Category
          </h3>
        </div>
        <span className="text-xs text-slate-400 uppercase tracking-widest">
          Mode
        </span>
      </div>

      <div className="space-y-2">
        {getCategoryOptions().map((opt) => {
          const active = category === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value as any)}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  active
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* ================= ALGORITHM ================= */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          <h3 className="font-semibold tracking-wide text-slate-100">
            Algorithm
          </h3>
        </div>
        <span className="text-xs text-slate-400 uppercase tracking-widest">
          Logic
        </span>
      </div>

      <div className="space-y-2">
        {getAlgorithmOptions().map((opt) => {
          const active = algorithm === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setAlgorithm(opt.value)}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  active
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* ================= INPUT ================= */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
          <h3 className="font-semibold tracking-wide text-slate-100 text-sm">
            Input Data
          </h3>
        </div>
        <span className="text-xs text-slate-400 uppercase tracking-widest">
          Params
        </span>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        placeholder="Enter comma-separated values..."
        className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-sm text-slate-200
        placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 resize-none"
      />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500
          text-white font-semibold shadow-lg
          hover:shadow-xl
          transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating…' : 'Generate'}
        </button>

        <button
          onClick={onRandom}
          disabled={isLoading}
          className="h-10 rounded-xl bg-white/5 border border-white/10 text-slate-200
          hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-4 h-4 inline mr-1" />
          Random
        </button>
      </div>
    </div>

    {/* ================= LEGEND ================= */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
        <h3 className="font-semibold tracking-wide text-slate-100 text-sm">
          Legend
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        {[
          ['bg-blue-500', 'Default'],
          ['bg-yellow-500', 'Comparing'],
          ['bg-red-500', 'Swapping'],
          ['bg-green-500', 'Sorted'],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-md ${color}`} />
            <span className="text-slate-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
