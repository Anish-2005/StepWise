'use client';

import { useState, useEffect } from 'react';
import { bubbleSort, selectionSort } from '../algorithms/sorting';
import { bfs, dfs } from '../algorithms/graph';
import { buildMaxHeap, insertHeap, extractMax } from '../algorithms/heap';
import { Step } from '../types';

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
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Reset algorithm when category changes
    switch (category) {
      case 'sorting':
        setAlgorithm('bubble');
        setInput('64,34,25,12,22,11,90');
        break;
      case 'graph':
        setAlgorithm('bfs');
        setInput('0:1,2;1:0,2;2:0,1');
        break;
      case 'heap':
        setAlgorithm('buildHeap');
        setInput('64,34,25,12,22,11,90');
        break;
    }
  }, [category]);

  const generateSteps = () => {
    try {
      const data = input.split(',').map(Number);
      if (data.some(isNaN)) throw new Error('Invalid numbers');
      let newSteps: Step[] = [];
      switch (algorithm) {
        case 'bubble':
          newSteps = bubbleSort(data);
          break;
        case 'selection':
          newSteps = selectionSort(data);
          break;
        case 'bfs':
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
          newSteps = insertHeap(data.slice(1), data[0]);
          break;
        case 'extractMax':
          newSteps = extractMax(data);
          break;
      }
      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (error) {
      alert('Invalid input: ' + (error as Error).message);
    }
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

  const generateRandomInput = () => {
    if (category === 'sorting' || category === 'heap') {
      const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      setInput(arr.join(','));
    } else if (category === 'graph') {
      // Simple random graph with 5 nodes
      const adj: number[][] = Array.from({ length: 5 }, () => []);
      for (let i = 0; i < 5; i++) {
        for (let j = i + 1; j < 5; j++) {
          if (Math.random() > 0.5) {
            adj[i].push(j);
            adj[j].push(i);
          }
        }
      }
      const inputStr = adj.map((neighbors, i) => `${i}:${neighbors.join(',')}`).join(';');
      setInput(inputStr);
    }
  };

  const getPseudocode = () => {
    switch (algorithm) {
      case 'bubble':
        return [
          'for i in 0 to n-1:',
          '  for j in 0 to n-i-1:',
          '    if arr[j] > arr[j+1]:',
          '      swap arr[j] and arr[j+1]'
        ];
      case 'selection':
        return [
          'for i in 0 to n-1:',
          '  minIdx = i',
          '  for j in i+1 to n:',
          '    if arr[j] < arr[minIdx]:',
          '      minIdx = j',
          '  if minIdx != i:',
          '    swap arr[i] and arr[minIdx]'
        ];
      case 'bfs':
        return [
          'queue = [start]',
          'visited[start] = true',
          'while queue is not empty:',
          '  node = dequeue()',
          '  for neighbor in adj[node]:',
          '    if not visited[neighbor]:',
          '      visited[neighbor] = true',
          '      enqueue(neighbor)'
        ];
      case 'dfs':
        return [
          'stack = [start]',
          'visited[start] = true',
          'while stack is not empty:',
          '  node = pop()',
          '  for neighbor in adj[node]:',
          '    if not visited[neighbor]:',
          '      visited[neighbor] = true',
          '      push(neighbor)'
        ];
      case 'buildHeap':
        return [
          'for i in floor(n/2)-1 downto 0:',
          '  heapify(arr, n, i)'
        ];
      case 'insertHeap':
        return [
          'arr.append(val)',
          'i = len(arr) - 1',
          'while i > 0:',
          '  parent = (i-1)//2',
          '  if arr[i] > arr[parent]:',
          '    swap arr[i] and arr[parent]',
          '    i = parent',
          '  else:',
          '    break'
        ];
      case 'extractMax':
        return [
          'max = arr[0]',
          'arr[0] = arr.pop()',
          'heapify(arr, len(arr), 0)',
          'return max'
        ];
      default:
        return [];
    }
  };

  const getComplexity = () => {
    switch (algorithm) {
      case 'bubble':
      case 'selection':
        return { time: 'O(n²)', space: 'O(1)' };
      case 'bfs':
      case 'dfs':
        return { time: 'O(V + E)', space: 'O(V)' };
      case 'buildHeap':
        return { time: 'O(n)', space: 'O(1)' };
      case 'insertHeap':
      case 'extractMax':
        return { time: 'O(log n)', space: 'O(1)' };
      default:
        return { time: 'N/A', space: 'N/A' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">StepWise</h1>
        <div className="flex space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryType)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="sorting">Sorting</option>
            <option value="graph">Graphs</option>
            <option value="heap">Heaps</option>
          </select>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            {category === 'sorting' && (
              <>
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
              </>
            )}
            {category === 'graph' && (
              <>
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
              </>
            )}
            {category === 'heap' && (
              <>
                <option value="buildHeap">Build Max Heap</option>
                <option value="insertHeap">Insert Heap</option>
                <option value="extractMax">Extract Max</option>
              </>
            )}
          </select>
          <button onClick={() => setDarkMode(!darkMode)} className="bg-blue-600 p-2 rounded">
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Left Control Panel */}
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-xl mb-4">Controls</h2>
          <div className="mb-4">
            <label className="block mb-2">Input:</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-gray-700 text-white p-2 rounded"
              />
              <button onClick={generateRandomInput} className="bg-purple-600 p-2 rounded">Random</button>
            </div>
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
            <p>Time: {getComplexity().time}</p>
            <p>Space: {getComplexity().space}</p>
          </div>
          <div>
            <h3 className="text-lg">Pseudocode</h3>
            <pre className="bg-gray-900 p-2 rounded text-sm">
              {getPseudocode().map((line, idx) => (
                <div key={idx} className={idx === 0 ? 'bg-yellow-600' : ''}>
                  {line}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualizationCanvas({ steps, currentStep, algorithm }: { steps: Step[], currentStep: number, algorithm: AlgorithmType }) {
  const step = steps[currentStep];

  if (!step) return <div>No steps</div>;

  if (step.arrayState) {
    // Sorting or Heap
    return (
      <div className="flex items-end justify-center space-x-1">
        {step.arrayState.map((val, idx) => {
          let color = 'bg-blue-500';
          if (step.type === 'compare' && step.indices?.includes(idx)) color = 'bg-yellow-500';
          if (step.type === 'swap' && step.indices?.includes(idx)) color = 'bg-red-500';
          if (step.type === 'done' && step.indices?.includes(idx)) color = 'bg-green-500';
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
  if (step.extra && step.extra.visited) {
    return (
      <div className="text-center">
        <h3 className="text-lg mb-4">Graph Traversal</h3>
        <div className="mb-4">
          <p>Current Node: {step.nodes?.[0]}</p>
          <p>Visited: {step.extra.visited.map((v: boolean, i: number) => v ? i : '').filter(Boolean).join(', ')}</p>
          {step.extra.queue && <p>Queue: {step.extra.queue.join(', ')}</p>}
          {step.extra.stack && <p>Stack: {step.extra.stack.join(', ')}</p>}
        </div>
        {/* Simple node representation */}
        <div className="flex justify-center space-x-4">
          {step.extra.visited.map((visited: boolean, i: number) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                step.nodes?.[0] === i.toString() ? 'bg-red-500' : visited ? 'bg-green-500' : 'bg-blue-500'
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
