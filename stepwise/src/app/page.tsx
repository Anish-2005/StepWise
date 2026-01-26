'use client';

import { useState, useEffect } from 'react';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '@/algorithms/sorting';
import { bfs, dfs, dijkstra, aStar } from '@/algorithms/graph';
import { buildMaxHeap, insertHeap, extractMax, heapSort, decreaseKey, deleteHeap } from '@/algorithms/heap';
import { Step } from '@/types';
import Header from '@/components/header';
import ControlPanel from '@/components/control-panel';
import Visualizer from '@/components/visualizer';
import InfoPanel from '@/components/info-panel';
import { Play, Pause, SkipForward, RotateCcw, Zap, Brain, Cpu, Sparkles } from 'lucide-react';

type CategoryType = 'sorting' | 'graph' | 'heap';
type AlgorithmType = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'bfs' | 'dfs' | 'dijkstra' | 'astar' | 'buildHeap' | 'insertHeap' | 'extractMax' | 'heapSort' | 'decreaseKey' | 'deleteHeap';

export default function Home() {
  const [category, setCategory] = useState<CategoryType>('sorting');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [input, setInput] = useState('64,34,25,12,22,11,90');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
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
    } catch (err: any) {
      alert(err.message);
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

  const getCategoryIcon = (cat: CategoryType) => {
    switch (cat) {
      case 'sorting': return Sparkles;
      case 'graph': return Brain;
      case 'heap': return Cpu;
      default: return Zap;
    }
  };

 return (
  <div className="relative min-h-screen overflow-hidden bg-[#0B0F1A] text-slate-100">
    {/* Ambient Background Glows */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
    </div>

    <Header />

    <main className="relative max-w-[1920px] mx-auto px-4 md:px-6 lg:px-10 py-8 space-y-10">
      
      {/* ================= HERO ================= */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400" />
            <span className="text-xs uppercase tracking-widest text-slate-400">
              Execution Engine Online
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              StepWise
            </span>
          </h1>

          <p className="max-w-xl text-lg text-slate-300 leading-relaxed">
            A live execution engine for algorithms.
            <br />
            <span className="text-slate-400">
              See data structures think — one step at a time.
            </span>
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Zap className="w-4 h-4" />, label: 'Real-Time' },
              { icon: <Brain className="w-4 h-4" />, label: 'Interactive' },
              { icon: <Cpu className="w-4 h-4" />, label: 'Execution-Driven' }
            ].map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-sm font-medium"
              >
                {b.icon}
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Current Execution</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {category.toUpperCase()} · {algorithm}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            {steps.length > 0
              ? `${steps.length} steps generated · ${currentStep + 1} executed`
              : 'Awaiting input to generate execution steps'}
          </p>
        </div>
      </section>

      {/* ================= MAIN GRID ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: CONTROL PANEL */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
            <ControlPanel {...{
              category,
              setCategory,
              algorithm,
              setAlgorithm,
              input,
              setInput,
              onGenerate: generateSteps,
              onRandom: generateRandomInput,
              isLoading: isGenerating
            }} />
          </div>
        </div>

        {/* CENTER: VISUALIZER */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(56,189,248,0.15)] overflow-hidden">
            
            {/* VIS HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  {(() => {
                    const Icon = getCategoryIcon(category);
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-semibold tracking-wide">
                    {category.toUpperCase()} VISUALIZER
                  </h3>
                  <p className="text-xs text-slate-400">
                    Step-driven execution pipeline
                  </p>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300">
                STEP {currentStep + 1}
              </span>
            </div>

            {/* VIS BODY */}
            <div className="p-6 min-h-[420px] flex items-center justify-center">
              <Visualizer steps={steps} currentStep={currentStep} />
            </div>
          </div>

          {/* PLAYBACK */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg space-y-6">
            
            {/* BUTTONS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={!steps.length}
                className={`h-12 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
                ${
                  isPlaying
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-[0_0_30px_rgba(244,63,94,0.5)]'
                    : 'bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_30px_rgba(99,102,241,0.5)]'
                }`}
              >
                {isPlaying ? <Pause /> : <Play />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={() => setCurrentStep(s => Math.min(s + 1, steps.length - 1))}
                className="h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center gap-2"
              >
                <SkipForward /> Step
              </button>

              <button
                onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
                className="h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg flex items-center justify-center gap-2"
              >
                <RotateCcw /> Reset
              </button>

              <button
                onClick={generateSteps}
                className="h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center gap-2"
              >
                <Zap /> Generate
              </button>
            </div>

            {/* SPEED */}
            <div>
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Execution Speed</span>
                <span>{speed} ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                className="w-full h-2 rounded-lg bg-slate-700 accent-indigo-500"
              />
            </div>

            {/* PROGRESS */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{currentStep + 1}/{steps.length || 1}</span>
              </div>
              <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 transition-all duration-500"
                  style={{ width: steps.length ? `${((currentStep + 1) / steps.length) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg h-full">
            <InfoPanel
              currentStep={currentStep}
              totalSteps={steps.length}
              step={steps[currentStep]}
              algorithmDescription={`${category.toUpperCase()} · ${algorithm}`}
            />
          </div>
        </div>
      </section>
    </main>
  </div>
);

}