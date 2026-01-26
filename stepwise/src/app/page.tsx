'use client';

import { useState, useEffect } from 'react';
import { bubbleSort, selectionSort } from '../algorithms/sorting';
import { bfs, dfs } from '../algorithms/graph';
import { buildMaxHeap, insertHeap, extractMax } from '../algorithms/heap';
import { SortStep, GraphStep, HeapStep } from '../types';

type AlgorithmType = 'bubble' | 'selection' | 'bfs' | 'dfs' | 'buildHeap' | 'insertHeap' | 'extractMax';

export default function Home() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [input, setInput] = useState('64,34,25,12,22,11,90');
  const [steps, setSteps] = useState<(SortStep | GraphStep | HeapStep)[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    generateSteps();
  }, [algorithm, input]);

  const generateSteps = () => {
    const data = input.split(',').map(Number);
    let newSteps: (SortStep | GraphStep | HeapStep)[] = [];
    switch (algorithm) {
      case 'bubble':
        newSteps = bubbleSort(data);
        break;
      case 'selection':
        newSteps = selectionSort(data);
        break;
      case 'bfs':
        // For graph, assume adjacency list from input
        const adj = parseGraphInput(input);
        newSteps = bfs(adj, 0);
        break;
      case 'dfs':
        const adj2 = parseGraphInput(input);
        newSteps = dfs(adj2, 0);
        break;
      case 'buildHeap':
        newSteps = buildMaxHeap(data);
        break;
      case 'insertHeap':
        // For insert, assume inserting the first number
        newSteps = insertHeap(data.slice(1), data[0]);
        break;
      case 'extractMax':
        newSteps = extractMax(data);
        break;
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const parseGraphInput = (input: string): number[][] => {
    // Simple parser for adjacency list like 0:1,2;1:0,2;2:0,1
    const lines = input.split(';');
    const adj: number[][] = [];
    lines.forEach(line => {
      const [node, neighbors] = line.split(':');
      const n = parseInt(node);
      const neigh = neighbors.split(',').map(Number);
      adj[n] = neigh;
    });
    return adj;
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const step = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps, speed]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">StepWise</h1>
        <div className="flex space-x-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
            <option value="buildHeap">Build Max Heap</option>
            <option value="insertHeap">Insert Heap</option>
            <option value="extractMax">Extract Max</option>
          </select>
          <button className="bg-blue-600 p-2 rounded">Toggle Theme</button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Left Control Panel */}
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-xl mb-4">Controls</h2>
          <div className="mb-4">
            <label className="block mb-2">Input:</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>
          <div className="flex space-x-2 mb-4">
            <button onClick={play} className="bg-green-600 p-2 rounded">Play</button>
            <button onClick={pause} className="bg-yellow-600 p-2 rounded">Pause</button>
            <button onClick={step} className="bg-blue-600 p-2 rounded">Step</button>
            <button onClick={reset} className="bg-red-600 p-2 rounded">Reset</button>
          </div>
          <div>
            <label className="block mb-2">Speed: {speed}ms</label>
            <input
              type="range"
              min="100"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Central Visualization Canvas */}
        <div className="flex-1 bg-gray-700 p-4 flex items-center justify-center">
          <VisualizationCanvas steps={steps} currentStep={currentStep} algorithm={algorithm} />
        </div>

        {/* Right Information Panel */}
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-xl mb-4">Information</h2>
          <div className="mb-4">
            <h3 className="text-lg">Current Step: {currentStep + 1} / {steps.length}</h3>
            {steps[currentStep] && <p>Type: {steps[currentStep].type}</p>}
          </div>
          <div className="mb-4">
            <h3 className="text-lg">Complexity</h3>
            <p>Time: O(n^2)</p>
            <p>Space: O(1)</p>
          </div>
          <div>
            <h3 className="text-lg">Pseudocode</h3>
            <pre className="bg-gray-900 p-2 rounded text-sm">
{`for i in 0 to n-1:
  for j in 0 to n-i-1:
    if arr[j] > arr[j+1]:
      swap arr[j] and arr[j+1]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualizationCanvas({ steps, currentStep, algorithm }: { steps: (SortStep | GraphStep | HeapStep)[], currentStep: number, algorithm: AlgorithmType }) {
  const step = steps[currentStep];

  if (!step) return <div>No steps</div>;

  if ('snapshot' in step) {
    // Sorting or Heap
    return (
      <div className="flex items-end justify-center space-x-1">
        {step.snapshot.map((val, idx) => {
          let color = 'bg-blue-500';
          if (step.type === 'compare' && step.indices.includes(idx)) color = 'bg-yellow-500';
          if (step.type === 'swap' && step.indices.includes(idx)) color = 'bg-red-500';
          if (step.type === 'sorted' && step.indices.includes(idx)) color = 'bg-green-500';
          return (
            <div
              key={idx}
              className={`w-8 ${color} transition-all duration-300 flex items-end justify-center`}
              style={{ height: `${val * 3}px` }}
            >
              <span className="text-xs text-white">{val}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Graph
  if ('visited' in step) {
    const graphStep = step as GraphStep;
    return (
      <div className="text-center">
        <h3 className="text-lg mb-4">Graph Traversal</h3>
        <div className="mb-4">
          <p>Current Node: {graphStep.current}</p>
          <p>Visited: {graphStep.visited.map((v, i) => v ? i : '').filter(Boolean).join(', ')}</p>
          {graphStep.queue && <p>Queue: {graphStep.queue.join(', ')}</p>}
          {graphStep.stack && <p>Stack: {graphStep.stack.join(', ')}</p>}
        </div>
        {/* Simple node representation */}
        <div className="flex justify-center space-x-4">
          {graphStep.visited.map((visited, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                i === graphStep.current ? 'bg-red-500' : visited ? 'bg-green-500' : 'bg-blue-500'
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div>Visualization not implemented for this algorithm</div>;
}
