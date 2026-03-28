'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} from '@/algorithms/sorting';
import { bfs, dfs, dijkstra, aStar } from '@/algorithms/graph';
import {
  buildMaxHeap,
  insertHeap,
  extractMax,
  heapSort,
  decreaseKey,
  deleteHeap,
} from '@/algorithms/heap';
import { Step, AlgorithmType } from '@/types';
import Header from '@/components/header';
import ControlPanel from '@/components/control-panel';
import Visualizer from '@/components/visualizer';
import InfoPanel from '@/components/info-panel';
import Hero from '@/components/hero';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Zap,
  Github,
  Twitter,
  Linkedin,
  AlertCircle,
} from 'lucide-react';
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

type CategoryType = 'sorting' | 'graph' | 'heap';

const DEFAULT_INPUT_BY_CATEGORY: Record<CategoryType, string> = {
  sorting: '64,34,25,12,22,11,90',
  graph: '0:1,2;1:0,2;2:0,1',
  heap: '64,34,25,12,22,11,90',
};

const DEFAULT_ALGORITHM_BY_CATEGORY: Record<CategoryType, AlgorithmType> = {
  sorting: 'bubble',
  graph: 'bfs',
  heap: 'buildHeap',
};

const READABLE_ALGORITHM_NAMES: Record<AlgorithmType, string> = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
  quick: 'Quick Sort',
  bfs: 'Breadth-First Search (BFS)',
  dfs: 'Depth-First Search (DFS)',
  dijkstra: "Dijkstra's Algorithm",
  astar: 'A* Search',
  buildHeap: 'Build Max Heap',
  insertHeap: 'Heap Insert',
  extractMax: 'Extract Max',
  heapSort: 'Heap Sort',
  decreaseKey: 'Decrease Key',
  deleteHeap: 'Delete Heap Node',
};

const PLAYBACK_SPEED = {
  min: 150,
  max: 1500,
  step: 50,
  default: 500,
} as const;

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'X', href: 'https://x.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
] as const;

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
    secondary:
      'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50',
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
      aria-pressed={active}
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

function parseNumberList(rawInput: string, fieldName: string): number[] {
  const tokens = rawInput
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) {
    throw new Error(`Provide at least one value for ${fieldName}.`);
  }

  const values = tokens.map((token) => Number(token));
  if (values.some((value) => Number.isNaN(value) || !Number.isFinite(value))) {
    throw new Error(`Invalid ${fieldName}. Use comma-separated numeric values only.`);
  }

  return values;
}

function parseNonNegativeInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer.`);
  }
  return value;
}

function parseGraphInput(rawInput: string): { adj: number[][]; weights: number[][] } {
  const lines = rawInput
    .split(';')
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    throw new Error('Graph input is empty. Use format like 0:1,2;1:0,2;2:0,1');
  }

  const adjacencyMap = new Map<number, Set<number>>();
  const weightsMap = new Map<string, number>();

  for (const line of lines) {
    const [nodeToken, neighborsToken = ''] = line.split(':').map((part) => part.trim());

    if (!nodeToken) {
      throw new Error(`Invalid graph segment: "${line}".`);
    }

    const node = parseNonNegativeInteger(Number(nodeToken), 'Node id');

    if (!adjacencyMap.has(node)) {
      adjacencyMap.set(node, new Set<number>());
    }

    if (!neighborsToken) {
      continue;
    }

    const neighbors = neighborsToken
      .split(',')
      .map((neighbor) => neighbor.trim())
      .filter(Boolean);

    for (const neighborToken of neighbors) {
      const [targetToken, weightToken] = neighborToken.split('-').map((part) => part.trim());
      const target = parseNonNegativeInteger(Number(targetToken), 'Neighbor id');

      let weight = 1;
      if (weightToken) {
        weight = Number(weightToken);
        if (!Number.isFinite(weight) || weight <= 0) {
          throw new Error('Edge weight must be a positive number.');
        }
      }

      adjacencyMap.get(node)?.add(target);
      weightsMap.set(`${node}:${target}`, weight);

      if (!adjacencyMap.has(target)) {
        adjacencyMap.set(target, new Set<number>());
      }
    }
  }

  if (!adjacencyMap.has(0)) {
    throw new Error('Graph must include node 0 because visual traversal starts from node 0.');
  }

  const maxNode = Math.max(...adjacencyMap.keys());
  const nodeCount = maxNode + 1;

  const adj = Array.from({ length: nodeCount }, () => [] as number[]);
  const weights = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(1));

  adjacencyMap.forEach((neighbors, node) => {
    const sortedNeighbors = [...neighbors].sort((a, b) => a - b);
    adj[node] = sortedNeighbors;

    for (const neighbor of sortedNeighbors) {
      weights[node][neighbor] = weightsMap.get(`${node}:${neighbor}`) ?? 1;
    }
  });

  return { adj, weights };
}

function buildSteps(category: CategoryType, algorithm: AlgorithmType, rawInput: string): Step[] {
  if (category === 'sorting') {
    const data = parseNumberList(rawInput, 'sorting input');

    switch (algorithm) {
      case 'bubble':
        return bubbleSort(data);
      case 'selection':
        return selectionSort(data);
      case 'insertion':
        return insertionSort(data);
      case 'merge':
        return mergeSort(data);
      case 'quick':
        return quickSort(data);
      default:
        throw new Error(`Algorithm "${algorithm}" is not supported in sorting mode.`);
    }
  }

  if (category === 'heap') {
    const values = parseNumberList(rawInput, 'heap input');

    switch (algorithm) {
      case 'buildHeap':
        return buildMaxHeap(values);
      case 'insertHeap': {
        if (values.length < 2) {
          throw new Error('For heap insert, use format: value,heapNode1,heapNode2,...');
        }
        const [valueToInsert, ...heapValues] = values;
        return insertHeap(heapValues, valueToInsert);
      }
      case 'extractMax':
        return extractMax(values);
      case 'heapSort':
        return heapSort(values);
      case 'decreaseKey': {
        if (values.length < 3) {
          throw new Error(
            'For decrease key, use format: index,newValue,heapNode1,heapNode2,...',
          );
        }
        const [index, newValue, ...heapValues] = values;
        return decreaseKey(heapValues, parseNonNegativeInteger(index, 'Index'), newValue);
      }
      case 'deleteHeap': {
        if (values.length < 2) {
          throw new Error('For delete, use format: index,heapNode1,heapNode2,...');
        }
        const [index, ...heapValues] = values;
        return deleteHeap(heapValues, parseNonNegativeInteger(index, 'Index'));
      }
      default:
        throw new Error(`Algorithm "${algorithm}" is not supported in heap mode.`);
    }
  }

  const { adj, weights } = parseGraphInput(rawInput);

  switch (algorithm) {
    case 'bfs':
      return bfs(adj, 0);
    case 'dfs':
      return dfs(adj, 0);
    case 'dijkstra':
      return dijkstra(adj, weights, 0);
    case 'astar': {
      if (adj.length < 2) {
        throw new Error('A* needs at least two nodes to compute a path to the goal node.');
      }
      const heuristic = Array.from({ length: adj.length }, (_, index) =>
        Math.abs(index - (adj.length - 1)),
      );
      return aStar(adj, weights, 0, adj.length - 1, heuristic);
    }
    default:
      throw new Error(`Algorithm "${algorithm}" is not supported in graph mode.`);
  }
}

export default function Home() {
  const [category, setCategory] = useState<CategoryType>('sorting');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [input, setInput] = useState(DEFAULT_INPUT_BY_CATEGORY.sorting);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(PLAYBACK_SPEED.default);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasSteps = steps.length > 0;
  const currentStepNumber = hasSteps ? currentStep + 1 : 0;
  const progressPercentage = hasSteps ? ((currentStep + 1) / steps.length) * 100 : 0;

  const algorithmLabel = useMemo(
    () => READABLE_ALGORITHM_NAMES[algorithm] ?? algorithm,
    [algorithm],
  );

  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsGenerating(false);
    setError(null);

    setAlgorithm(DEFAULT_ALGORITHM_BY_CATEGORY[category]);
    setInput(DEFAULT_INPUT_BY_CATEGORY[category]);
  }, [category]);

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (isPlaying && currentStep >= steps.length - 1) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((previous) => previous + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps.length]);

  const generateSteps = useCallback(async () => {
    setError(null);
    setIsGenerating(true);

    // Yield once so loading states can render before any computation begins.
    await Promise.resolve();

    try {
      const nextSteps = buildSteps(category, algorithm, input);

      if (!nextSteps.length) {
        throw new Error('No execution steps were generated for this input.');
      }

      setSteps(nextSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (unknownError) {
      const message =
        unknownError instanceof Error
          ? unknownError.message
          : 'Unable to generate execution trace.';
      setError(message);
      setSteps([]);
      setCurrentStep(0);
      setIsPlaying(false);
    } finally {
      setIsGenerating(false);
    }
  }, [algorithm, category, input]);

  const generateRandomInput = useCallback(() => {
    setError(null);

    if (category === 'graph') {
      const nodeCount = 6;
      const edgeMap = new Map<number, Set<number>>();

      for (let node = 0; node < nodeCount; node += 1) {
        edgeMap.set(node, new Set<number>());
      }

      const addUndirectedEdge = (a: number, b: number) => {
        edgeMap.get(a)?.add(b);
        edgeMap.get(b)?.add(a);
      };

      // Keep graph connected by default.
      for (let node = 0; node < nodeCount - 1; node += 1) {
        addUndirectedEdge(node, node + 1);
      }

      for (let i = 0; i < nodeCount; i += 1) {
        for (let j = i + 2; j < nodeCount; j += 1) {
          if (Math.random() > 0.65) {
            addUndirectedEdge(i, j);
          }
        }
      }

      const needsWeights = algorithm === 'dijkstra' || algorithm === 'astar';
      const graphInput = Array.from({ length: nodeCount }, (_, node) => {
        const neighbors = [...(edgeMap.get(node) ?? [])].sort((a, b) => a - b);
        const formattedNeighbors = neighbors.map((neighbor) => {
          if (!needsWeights) {
            return String(neighbor);
          }

          const weight = Math.floor(Math.random() * 9) + 1;
          return `${neighbor}-${weight}`;
        });

        return `${node}:${formattedNeighbors.join(',')}`;
      }).join(';');

      setInput(graphInput);
      return;
    }

    const randomData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setInput(randomData.join(','));
  }, [algorithm, category]);

  const togglePlayback = useCallback(() => {
    if (!hasSteps) {
      return;
    }

    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((previous) => !previous);
  }, [currentStep, hasSteps, steps.length]);

  const goToNextStep = useCallback(() => {
    if (!hasSteps || isPlaying) {
      return;
    }

    setCurrentStep((previous) => Math.min(previous + 1, steps.length - 1));
  }, [hasSteps, isPlaying, steps.length]);

  const resetPlayback = useCallback(() => {
    if (!hasSteps) {
      return;
    }

    setCurrentStep(0);
    setIsPlaying(false);
  }, [hasSteps]);

  const scrollToWorkspace = useCallback(() => {
    document.getElementById('algorithm-workspace')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
      <Header />

      <Hero onGetStarted={scrollToWorkspace} />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        <motion.section
          id="about"
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
            Witness each transition in algorithm execution. Every comparison, swap, and
            traversal step is rendered as a deterministic visual trace to help you build
            robust intuition.
          </p>
        </motion.section>

        <section
          id="algorithm-workspace"
          className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-x-12 gap-y-16 items-start"
        >
          <aside className="space-y-8 sticky top-28">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                01 | Configuration
              </h3>
              <p className="text-xs font-medium text-slate-500">Define the execution constraints.</p>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-2xl border border-rose-300/70 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-800/80 p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-rose-600 dark:text-rose-400" />
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div className="glass-card rounded-[2rem] p-6 border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-500/5">
              <ControlPanel
                category={category}
                setCategory={setCategory}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                input={input}
                setInput={setInput}
                onGenerate={generateSteps}
                onRandom={generateRandomInput}
                isLoading={isGenerating}
              />
            </div>
          </aside>

          <section className="space-y-8">
            <div className="flex items-center justify-between px-2 gap-4">
              <div className="space-y-1">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  02 | Execution Stage
                </h3>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{algorithmLabel}</h4>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold shrink-0">
                STEP {currentStepNumber}{' '}
                <span className="text-slate-400">/ {steps.length}</span>
              </div>
            </div>

            <div className="relative glass-card rounded-[2.5rem] p-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl min-h-[500px] flex flex-col overflow-hidden">
              <div className="flex-1 rounded-[2rem] bg-slate-50/50 dark:bg-[#020617]/50 relative overflow-hidden flex items-center justify-center">
                <Visualizer steps={steps} currentStep={currentStep} algorithm={algorithm} />
              </div>

              <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ActionButton
                    active={isPlaying}
                    onClick={togglePlayback}
                    disabled={!hasSteps}
                    label={isPlaying ? 'Pause' : 'Play'}
                    icon={isPlaying ? Pause : Play}
                    variant={isPlaying ? 'rose' : 'primary'}
                  />
                  <ActionButton
                    onClick={goToNextStep}
                    disabled={!hasSteps || isPlaying}
                    label="Step"
                    icon={SkipForward}
                    variant="secondary"
                  />
                  <ActionButton
                    onClick={resetPlayback}
                    disabled={!hasSteps}
                    label="Reset"
                    icon={RotateCcw}
                    variant="secondary"
                  />
                  <ActionButton
                    onClick={generateSteps}
                    disabled={isGenerating}
                    label={isGenerating ? 'Building' : 'Rebuild'}
                    icon={Zap}
                    variant="emerald"
                  />
                </div>

                <div className="space-y-3">
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      animate={{
                        width: `${progressPercentage}%`,
                      }}
                      className="h-full premium-gradient shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="playback-speed"
                      className="text-[11px] uppercase tracking-wider font-bold text-slate-500"
                    >
                      Speed
                    </label>
                    <div className="flex items-center gap-3 w-full max-w-[220px]">
                      <input
                        id="playback-speed"
                        type="range"
                        min={PLAYBACK_SPEED.min}
                        max={PLAYBACK_SPEED.max}
                        step={PLAYBACK_SPEED.step}
                        value={speed}
                        onChange={(event) => setSpeed(Number(event.target.value))}
                        className="w-full accent-blue-600"
                      />
                      <span className="text-[11px] font-mono text-slate-500 min-w-[60px] text-right">
                        {speed}ms
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside id="telemetry" className="space-y-8 sticky top-28">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                03 | Telemetry
              </h3>
              <p className="text-xs font-medium text-slate-500">Real-time state analysis.</p>
            </div>
            <InfoPanel
              currentStep={currentStep}
              totalSteps={steps.length}
              step={steps[currentStep]}
              algorithmDescription={`${category.toUpperCase()} | ${algorithmLabel}`}
            />
          </aside>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-black text-xl">
                  S
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                  StepWise
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                Accelerating technical intuition through high-fidelity algorithm
                visualization for engineers and students.
              </p>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                Platform
              </h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li>
                  <a href="#algorithm-workspace" className="hover:text-blue-500 transition-colors">
                    Algorithms Workspace
                  </a>
                </li>
                <li>
                  <a href="#telemetry" className="hover:text-blue-500 transition-colors">
                    Telemetry
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-blue-500 transition-colors">
                    Overview
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                Connect
              </h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    GitHub Source
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Community Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium">
              © {new Date().getFullYear()} StepWise Visualization Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-xs text-slate-400 font-medium">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

