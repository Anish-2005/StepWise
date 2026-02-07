'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '@/algorithms/sorting';
import { bfs, dfs, dijkstra, aStar } from '@/algorithms/graph';
import { buildMaxHeap, insertHeap, extractMax, heapSort, decreaseKey, deleteHeap } from '@/algorithms/heap';
import { Step, AlgorithmType } from '@/types';
import Header from '@/components/header';
import ControlPanel from '@/components/control-panel';
import Visualizer from '@/components/visualizer';
import InfoPanel from '@/components/info-panel';
import Hero from '@/components/hero';
import { Play, Pause, SkipForward, RotateCcw, Zap, Github, Twitter, Linkedin } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'emerald' | 'rose';
  showLabel?: boolean;
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  disabled,
  active,
  variant = 'secondary',
  showLabel = true,
}: ActionButtonProps) {
  const variants = {
    primary: 'premium-gradient text-white shadow-lg shadow-blue-500/25',
    secondary: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50',
    accent: 'bg-purple-600 text-white shadow-lg shadow-purple-500/25',
    emerald: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25',
    rose: 'bg-rose-500 text-white shadow-lg shadow-rose-500/25',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`
        h-11 px-6 rounded-xl font-bold transition-all duration-300
        flex items-center justify-center gap-3
        ${variants[variant]}
        ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : ''}
        ${active ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950' : ''}
        ${!showLabel ? 'w-11 px-0' : ''}
      `}
    >
      <Icon className={`${showLabel ? 'w-4 h-4' : 'w-5 h-5'}`} />
      {showLabel && <span className="text-xs uppercase tracking-widest">{label}</span>}
    </motion.button>
  );
}

type CategoryType = 'sorting' | 'graph' | 'heap';

export default function Home() {
  const [category, setCategory] = useState<CategoryType>('sorting');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [input, setInput] = useState('64,34,25,12,22,11,90');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);

  /* Reset on category change */
  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsGenerating(false);

    if (category === 'sorting') {
      setAlgorithm('bubble');
      setInput('64,34,25,12,22,11,90');
    }
    if (category === 'graph') {
      setAlgorithm('bfs');
      setInput('0:1,2;1:0,2;2:0,1');
    }
    if (category === 'heap') {
      setAlgorithm('buildHeap');
      setInput('64,34,25,12,22,11,90');
    }
  }, [category]);

  /* Auto play engine */
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (isPlaying && currentStep >= steps.length - 1) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps]);

  /* Generate steps */
  const generateSteps = async () => {
    try {
      setIsGenerating(true);
      let newSteps: Step[] = [];

      if (category === 'sorting' || category === 'heap') {
        const data = input.split(',').map(Number);
        if (data.some(isNaN)) throw new Error('Invalid numbers');

        await new Promise(resolve => setTimeout(resolve, 300));

        switch (algorithm) {
          case 'bubble': newSteps = bubbleSort(data); break;
          case 'selection': newSteps = selectionSort(data); break;
          case 'insertion': newSteps = insertionSort(data); break;
          case 'merge': newSteps = mergeSort(data); break;
          case 'quick': newSteps = quickSort(data); break;
          case 'buildHeap': newSteps = buildMaxHeap(data); break;
          case 'insertHeap': newSteps = insertHeap(data.slice(1), data[0]); break;
          case 'extractMax': newSteps = extractMax(data); break;
          case 'heapSort': newSteps = heapSort(data); break;
          case 'decreaseKey': newSteps = decreaseKey(data.slice(1), data[0], data[1]); break;
          case 'deleteHeap': newSteps = deleteHeap(data, data[0]); break;
        }
      }

      if (category === 'graph') {
        const graphData = parseGraphInput(input);
        const adj = graphData.adj;
        const weights = graphData.weights;

        switch (algorithm) {
          case 'bfs': newSteps = bfs(adj, 0); break;
          case 'dfs': newSteps = dfs(adj, 0); break;
          case 'dijkstra': newSteps = dijkstra(adj, weights, 0); break;
          case 'astar':
            const heuristic = Array(adj.length).fill(0).map((_, i) => Math.abs(i - (adj.length - 1)));
            newSteps = aStar(adj, weights, 0, adj.length - 1, heuristic);
            break;
        }
      }

      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  /* Utils */
  const parseGraphInput = (input: string): { adj: number[][], weights: number[][] } => {
    const adj: number[][] = [];
    const weights: number[][] = [];
    const lines = input.split(';');
    lines.forEach((line) => {
      const parts = line.split(':');
      if (parts.length < 2) return;
      const node = +parts[0];
      const neighborsStr = parts[1];
      if (!adj[node]) adj[node] = [];
      if (!weights[node]) weights[node] = [];
      if (neighborsStr) {
        neighborsStr.split(',').forEach((neighborStr) => {
          const [neighbor, weight = 1] = neighborStr.split('-').map(Number);
          adj[node].push(neighbor);
          weights[node][neighbor] = weight;
        });
      }
    });
    return { adj, weights };
  };

  const generateRandomInput = () => {
    if (category === 'graph') {
      const n = 5;
      const adj = Array.from({ length: n }, () => [] as number[]);
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (Math.random() > 0.5) {
            adj[i].push(j);
            adj[j].push(i);
          }
        }
      }
      setInput(adj.map((v, i) => `${i}:${v.join(',')}`).join(';'));
    } else {
      setInput(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).join(','));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
      <Header />

      <Hero onGetStarted={() => {
        document.getElementById('algorithm-workspace')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {/* ================= CONTEXT HEADER ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <Zap size={12} className="fill-current" />
            Active Workspace
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Observe the <span className="text-gradient">Logic Flow</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Witness the intricate dance of data structures. Every swap, comparison,
            and allocation is revealed in high-fidelity, allowing you to build
            a mental model of how algorithms actually solve problems.
          </p>
        </motion.section>

        {/* ================= EXECUTION WORKSPACE ================= */}
        <section
          id="algorithm-workspace"
          className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-x-12 gap-y-16 items-start"
        >
          {/* ========== LEFT: CONFIGURATION ========== */}
          <aside className="space-y-8 sticky top-28">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                01 • Configuration
              </h3>
              <p className="text-xs font-medium text-slate-500">Define the execution constraints.</p>
            </div>

            <div className="glass-card rounded-[2rem] p-6 border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-500/5">
              <ControlPanel
                {...{
                  category, setCategory,
                  algorithm, setAlgorithm,
                  input, setInput,
                  onGenerate: generateSteps,
                  onRandom: generateRandomInput,
                  isLoading: isGenerating,
                }}
              />
            </div>
          </aside>

          {/* ========== CENTER: STAGE ========== */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  02 • Execution Stage
                </h3>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  {algorithm.split(/(?=[A-Z])/).join(' ').replace(/^\w/, (c) => c.toUpperCase())}
                </h4>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
                STEP {currentStep + 1} <span className="text-slate-400">/ {steps.length || 0}</span>
              </div>
            </div>

            {/* Stage */}
            <div className="relative glass-card rounded-[2.5rem] p-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl min-h-[500px] flex flex-col overflow-hidden">
              <div className="flex-1 rounded-[2rem] bg-slate-50/50 dark:bg-[#020617]/50 relative overflow-hidden flex items-center justify-center">
                <Visualizer
                  steps={steps}
                  currentStep={currentStep}
                  algorithm={algorithm}
                />
              </div>

              {/* Playback Controls Overlay */}
              <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ActionButton
                    active={isPlaying}
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={!steps.length}
                    label={isPlaying ? 'Freeze' : 'Execute'}
                    icon={isPlaying ? Pause : Play}
                    variant={isPlaying ? 'rose' : 'primary'}
                  />
                  <ActionButton
                    onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}
                    disabled={!steps.length || isPlaying}
                    label="Pulse"
                    icon={SkipForward}
                    variant="secondary"
                  />
                  <ActionButton
                    onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
                    disabled={!steps.length}
                    label="Rewind"
                    icon={RotateCcw}
                    variant="secondary"
                  />
                  <ActionButton
                    onClick={generateSteps}
                    disabled={isGenerating}
                    label={isGenerating ? 'Compiling' : 'Compile'}
                    icon={Zap}
                    variant="emerald"
                  />
                </div>

                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      animate={{
                        width: steps.length ? `${((currentStep + 1) / steps.length) * 100}%` : '0%'
                      }}
                      className="h-full premium-gradient shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== RIGHT: TELEMETRY ========== */}
          <aside className="space-y-8 sticky top-28">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                03 • Telemetry
              </h3>
              <p className="text-xs font-medium text-slate-500">Real-time state analysis.</p>
            </div>
            <InfoPanel
              currentStep={currentStep}
              totalSteps={steps.length}
              step={steps[currentStep]}
              algorithmDescription={`${category.toUpperCase()} • ${algorithm}`}
            />
          </aside>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-black text-xl">S</div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">StepWise</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                Accelerating technical intuition through high-fidelity algorithm visualization. Built for engineers who want to see beneath the abstraction.
              </p>
              <div className="flex items-center gap-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                {['Algorithms', 'Data Structures', 'Performance', 'Telemetry'].map(item => (
                  <li key={item} className="hover:text-blue-500 cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Connect</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                {['Documentation', 'Community', 'Github Source', 'Contribute'].map(item => (
                  <li key={item} className="hover:text-blue-500 cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium">
              © 2024 StepWise Visualization Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-xs text-slate-400 font-medium">
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}