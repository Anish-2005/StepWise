'use client';

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
import { Play, Pause, SkipForward, RotateCcw, Zap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  color?: 'blue' | 'green' | 'slate';
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  disabled,
  active,
  color = 'slate',
}: ActionButtonProps) {
  const colorStyles = {
    blue: active
      ? 'bg-blue-600 text-white'
      : 'bg-blue-600 hover:bg-blue-700 text-white',
    green:
      'bg-green-600 hover:bg-green-700 text-white',
    slate:
      'bg-slate-600 hover:bg-slate-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        h-12 rounded-xl font-medium transition-all duration-200
        flex items-center justify-center gap-2
        ${colorStyles[color]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${active ? 'ring-2 ring-blue-300 ring-offset-2 ring-offset-white' : ''}
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
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

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 300));

        switch (algorithm) {
          case 'bubble':
            newSteps = bubbleSort(data);
            break;
          case 'selection':
            newSteps = selectionSort(data);
            break;
          case 'insertion':
            newSteps = insertionSort(data);
            break;
          case 'merge':
            newSteps = mergeSort(data);
            break;
          case 'quick':
            newSteps = quickSort(data);
            break;
          case 'buildHeap':
            newSteps = buildMaxHeap(data);
            break;
          case 'insertHeap':
            newSteps = insertHeap(data.slice(1), data[0]);
            break;
          case 'extractMax':
            newSteps = extractMax(data);
            break;
          case 'heapSort':
            newSteps = heapSort(data);
            break;
          case 'decreaseKey':
            newSteps = decreaseKey(data.slice(1), data[0], data[1]);
            break;
          case 'deleteHeap':
            newSteps = deleteHeap(data, data[0]);
            break;
        }
      }

      if (category === 'graph') {
        const graphData = parseGraphInput(input);
        const adj = graphData.adj;
        const weights = graphData.weights;

        switch (algorithm) {
          case 'bfs':
            newSteps = bfs(adj, 0);
            break;
          case 'dfs':
            newSteps = dfs(adj, 0);
            break;
          case 'dijkstra':
            newSteps = dijkstra(adj, weights, 0);
            break;
          case 'astar':
            // Simple heuristic for demo (straight-line distance approximation)
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
      const [nodeStr, neighborsStr] = line.split(':');
      const node = +nodeStr;

      if (!adj[node]) adj[node] = [];
      if (!weights[node]) weights[node] = [];

      if (neighborsStr) {
        const neighbors = neighborsStr.split(',');
        neighbors.forEach((neighborStr) => {
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
      setInput(
        Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).join(',')
      );
    }
  };

 return (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Header />

    <Hero onGetStarted={() => {
      // Scroll to the algorithm controls section
      document.getElementById('algorithm-controls')?.scrollIntoView({ behavior: 'smooth' });
    }} />

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

  {/* ================= CONTEXT HEADER ================= */}
  <section className="space-y-4">
    <div className="flex items-center gap-4">
      <div className="h-1 w-16 bg-blue-600 rounded-full" />
      <span className="text-sm font-medium text-slate-600">
        Interactive Execution Workspace
      </span>
    </div>
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
      Algorithm Execution Flow
    </h2>
    <p className="max-w-2xl text-slate-600 leading-relaxed">
      Configure an algorithm, observe how it evolves internally, and understand
      every decision it makes — one deterministic step at a time.
    </p>
  </section>

  {/* ================= EXECUTION WORKSPACE ================= */}
  <section
    id="algorithm-controls"
    className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-x-10 gap-y-16 items-start"
  >

    {/* ========== LEFT: CONFIGURATION (INPUT ZONE) ========== */}
    <aside className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          1 · Configure
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Choose the algorithm and input data to define the execution context.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
        <ControlPanel
          {...{
            category,
            setCategory,
            algorithm,
            setAlgorithm,
            input,
            setInput,
            onGenerate: generateSteps,
            onRandom: generateRandomInput,
            isLoading: isGenerating,
          }}
        />
      </div>
    </aside>

    {/* ========== CENTER: EXECUTION STAGE ========== */}
    <section className="space-y-8">

      {/* Stage Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            2 · Execute
          </h3>
          <h4 className="text-xl font-semibold text-slate-900">
            {category.charAt(0).toUpperCase() + category.slice(1)} Algorithm
          </h4>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
          Step {currentStep + 1}
        </div>
      </div>

      {/* Visualization Stage */}
      <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-8 min-h-[440px] flex items-center justify-center">
        <Visualizer
          steps={steps}
          currentStep={currentStep}
          algorithm={algorithm}
        />

        {/* subtle caption */}
        <div className="absolute bottom-4 right-6 text-xs text-slate-500">
          Live execution state
        </div>
      </div>

      {/* Playback Controls */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Controls
          </h3>
          <span className="text-sm text-slate-600">
            {speed} ms / step
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton
            active={isPlaying}
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={!steps.length}
            label={isPlaying ? 'Pause' : 'Play'}
            icon={isPlaying ? Pause : Play}
            color="blue"
          />

          <ActionButton
            onClick={() =>
              setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
            }
            disabled={!steps.length}
            label="Step"
            icon={SkipForward}
            color="slate"
          />

          <ActionButton
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            disabled={!steps.length}
            label="Reset"
            icon={RotateCcw}
            color="slate"
          />

          <ActionButton
            onClick={generateSteps}
            disabled={isGenerating}
            label={isGenerating ? 'Generating' : 'Generate'}
            icon={Zap}
            color="green"
          />
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span>
              {currentStep + 1} / {steps.length || 1}
            </span>
          </div>
          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: steps.length
                  ? `${((currentStep + 1) / steps.length) * 100}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      </div>
    </section>

    {/* ========== RIGHT: INTERPRETATION ========== */}
    <aside className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          3 · Understand
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Interpret what the algorithm is doing at each step.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
        <InfoPanel
          currentStep={currentStep}
          totalSteps={steps.length}
          step={steps[currentStep]}
          algorithmDescription={`${category.toUpperCase()} · ${algorithm}`}
        />
      </div>
    </aside>
  </section>
</main>

  </div>
);

}