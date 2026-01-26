'use client';

import { useState, useEffect } from 'react';
import { bubbleSort, selectionSort } from '@/algorithms/sorting';
import { bfs, dfs } from '@/algorithms/graph';
import { buildMaxHeap, insertHeap, extractMax } from '@/algorithms/heap';
import { Step } from '@/types';
import Header from '@/components/header';
import ControlPanel from '@/components/control-panel';
import Visualizer from '@/components/visualizer';
import InfoPanel from '@/components/info-panel';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

type CategoryType = 'sorting' | 'graph' | 'heap';
type AlgorithmType = 'bubble' | 'selection' | 'bfs' | 'dfs' | 'buildHeap' | 'insertHeap' | 'extractMax';

export default function Home() {
  const [category, setCategory] = useState<CategoryType>('sorting');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [input, setInput] = useState('64,34,25,12,22,11,90');

  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  /* Reset on category change */
  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);

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
    if (!isPlaying || currentStep >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps]);

  /* Generate steps */
  const generateSteps = () => {
    try {
      let newSteps: Step[] = [];

      if (category === 'sorting' || category === 'heap') {
        const data = input.split(',').map(Number);
        if (data.some(isNaN)) throw new Error('Invalid numbers');

        switch (algorithm) {
          case 'bubble':
            newSteps = bubbleSort(data);
            break;
          case 'selection':
            newSteps = selectionSort(data);
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
        }
      }

      if (category === 'graph') {
        const adj = parseGraphInput(input);
        newSteps = algorithm === 'bfs' ? bfs(adj, 0) : dfs(adj, 0);
      }

      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* Utils */
  const parseGraphInput = (input: string): number[][] => {
    const adj: number[][] = [];
    input.split(';').forEach((line) => {
      const [node, neighbors] = line.split(':');
      adj[+node] = neighbors ? neighbors.split(',').map(Number) : [];
    });
    return adj;
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

  const getAlgorithmDescription = () => {
    const descriptions: Record<AlgorithmType, string> = {
      bubble: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      selection: 'Selection Sort divides the list into a sorted and unsorted portion, finding the minimum element each iteration.',
      bfs: 'Breadth-First Search explores vertices in layers, visiting all neighbors before moving to the next level.',
      dfs: 'Depth-First Search explores as far as possible along each branch before backtracking.',
      buildHeap: 'Build Max Heap transforms an array into a max heap structure where each parent is larger than children.',
      insertHeap: 'Insert into Heap adds a new element while maintaining the max heap property.',
      extractMax: 'Extract Max removes the maximum element from the heap while maintaining its structure.',
    };
    return descriptions[algorithm];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-8 space-y-8">
        {/* Title & Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <h2 className="text-4xl font-bold text-foreground">Algorithm Visualizer</h2>
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl">
            Watch algorithms come to life. Understand complex computational concepts through interactive visualization.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <ControlPanel
              category={category}
              setCategory={setCategory}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              input={input}
              setInput={setInput}
              onGenerate={generateSteps}
              onRandom={generateRandomInput}
            />
          </div>

          {/* Center - Visualizer */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Visualizer */}
              <Visualizer steps={steps} currentStep={currentStep} />

              {/* Playback Controls */}
              <div className="algo-panel">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  <h3 className="font-semibold text-foreground">Playback</h3>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={isPlaying ? 'algo-button-danger' : 'algo-button-success'}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 inline mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 inline mr-2" />
                        Play
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}
                    className="algo-button-primary"
                  >
                    <SkipForward className="w-4 h-4 inline mr-2" />
                    Step
                  </button>

                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      setIsPlaying(false);
                    }}
                    className="algo-button-warning"
                  >
                    <RotateCcw className="w-4 h-4 inline mr-2" />
                    Reset
                  </button>
                </div>

                {/* Speed Control */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground/80">Speed</label>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {speed}ms
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-secondary/50 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Progress */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-foreground/70">Progress</span>
                    <span className="text-xs font-semibold text-primary">
                      {currentStep + 1} / {steps.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-full smooth-transition"
                      style={{ width: steps.length > 0 ? `${((currentStep + 1) / steps.length) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Info */}
          <div className="lg:col-span-1">
            <InfoPanel
              currentStep={currentStep}
              totalSteps={steps.length}
              step={steps[currentStep]}
              algorithmDescription={getAlgorithmDescription()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
