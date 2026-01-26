import { HeapStep } from '../types';

function heapify(arr: number[], n: number, i: number, steps: HeapStep[]) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    steps.push({ type: 'compare', indices: [largest, left], arrayState: [...arr] });
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    steps.push({ type: 'compare', indices: [largest, right], arrayState: [...arr] });
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    steps.push({ type: 'swap', indices: [i, largest], arrayState: [...arr] });
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
  steps.push({ type: 'heapify', indices: [], arrayState: [...array] });
  return steps;
}

export function insertHeap(arr: number[], val: number): HeapStep[] {
  const steps: HeapStep[] = [];
  const array = [...arr];
  array.push(val);
  let i = array.length - 1;

  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    steps.push({ type: 'compare', indices: [i, parent], arrayState: [...array] });
    if (array[i] > array[parent]) {
      [array[i], array[parent]] = [array[parent], array[i]];
      steps.push({ type: 'swap', indices: [i, parent], arrayState: [...array] });
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
  steps.push({ type: 'swap', indices: [0], arrayState: [...array] });
  heapify(array, array.length, 0, steps);
  return steps;
}