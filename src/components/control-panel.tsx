'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Zap, Terminal, Settings2 } from 'lucide-react';
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
    <div className="sticky top-28 space-y-12">
      {/* ================= CATEGORY ================= */}
      <section className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Settings2 className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              Context
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Define the problem scope you want to visualize.
          </p>
        </header>

        <div className="flex flex-col gap-2">
          {getCategoryOptions().map((opt) => {
            const active = category === opt.value;
            return (
              <motion.button
                key={opt.value}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCategory(opt.value as 'sorting' | 'graph' | 'heap')}
                className={`
                  relative w-full px-5 py-3 rounded-2xl text-sm font-bold text-left
                  transition-all duration-300 overflow-hidden
                  ${active
                    ? 'text-white shadow-lg'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400/50'
                  }
                `}
              >
                {active && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 premium-gradient -z-10"
                  />
                )}
                {opt.label}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ================= ALGORITHM ================= */}
      <section className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              Execution Logic
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Select a specific algorithm strategy.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-2">
          <AnimatePresence mode="popLayout">
            {getAlgorithmOptions().map((opt) => {
              const active = algorithm === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAlgorithm(opt.value as AlgorithmType)}
                  className={`
                    relative px-5 py-2.5 rounded-xl text-xs font-bold text-left
                    transition-all duration-300
                    ${active
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white'
                    }
                  `}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= INPUT ================= */}
      <section className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              Seed Data
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Input values manualy or generate random seed.
          </p>
        </header>

        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="
              w-full p-4 rounded-2xl text-xs font-mono
              bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 
              text-slate-800 dark:text-slate-200
              placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 
              focus:border-blue-500/50 transition-all resize-none shadow-inner
            "
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerate}
              disabled={isLoading}
              className="
                h-11 rounded-xl premium-gradient text-white text-xs font-bold
                shadow-lg hover:shadow-blue-500/30 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoading ? 'Processing' : 'Build Trace'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#f1f5f9' }}
              whileTap={{ scale: 0.98 }}
              onClick={onRandom}
              disabled={isLoading}
              className="
                h-11 rounded-xl bg-white dark:bg-slate-900 border 
                border-slate-200 dark:border-slate-800
                text-slate-700 dark:text-slate-300 text-xs font-bold
                hover:shadow-sm transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              <Shuffle className="w-3 h-3" />
              Random
            </motion.button>
          </div>
        </div>
      </section>

      {/* ================= LEGEND ================= */}
      <section className="bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4">
          Color Indicators
        </span>
        <div className="space-y-3">
          {[
            ['bg-blue-500', 'Idle State'],
            ['bg-amber-400', 'Comparing Nodes'],
            ['bg-rose-500', 'Mutation / Swap'],
            ['bg-emerald-500', 'Deterministic Final'],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-sm`} />
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
