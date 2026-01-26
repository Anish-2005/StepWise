import { HeapStep } from '../types';

function heapify(arr: number[], n: number, i: number, steps: HeapStep[]) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    steps.push({ type: 'compare', indices: [largest, left], snapshot: [...arr], heapArray: [...arr] });
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    steps.push({ type: 'compare', indices: [largest, right], snapshot: [...arr], heapArray: [...arr] });
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    steps.push({ type: 'swap', indices: [i, largest], snapshot: [...arr], heapArray: [...arr] });
    heapify(arr, n, largest, steps);
  }
}

export function buildMaxHeap(arr: number[]): HeapStep[] {
  const steps: HeapStep[] = [];
  const array = [...arr];
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, steps);
  }
  steps.push({ type: 'heapify', indices: [], snapshot: [...array], heapArray: [...array] });
  return steps;
}

export function insertHeap(arr: number[], val: number): HeapStep[] {
  const steps: HeapStep[] = [];
  const array = [...arr];
  array.push(val);
  let i = array.length - 1;

  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    steps.push({ type: 'compare', indices: [i, parent], snapshot: [...array], heapArray: [...array] });
    if (array[i] > array[parent]) {
      [array[i], array[parent]] = [array[parent], array[i]];
      steps.push({ type: 'swap', indices: [i, parent], snapshot: [...array], heapArray: [...array] });
      i = parent;
    } else {
      break;
    }
  }
  return steps;
}

export function extractMax(arr: number[]): HeapStep[] {
  const steps: HeapStep[] = [];
  const array = [...arr];
  if (array.length === 0) return steps;

  const max = array[0];
  array[0] = array[array.length - 1];
  array.pop();
  steps.push({ type: 'extract', indices: [0], snapshot: [...array], heapArray: [...array] });
  heapify(array, array.length, 0, steps);
  return steps;
}