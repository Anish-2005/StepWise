import { SortStep } from '../types';

export function bubbleSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1], arrayState: [...array] });
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({ type: 'swap', indices: [j, j + 1], arrayState: [...array] });
      }
    }
  }
  steps.push({ type: 'done', indices: Array.from({ length: n }, (_, i) => i), arrayState: [...array] });
  return steps;
}

export function selectionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j], arrayState: [...array] });
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({ type: 'swap', indices: [i, minIdx], arrayState: [...array] });
    }
  }
  steps.push({ type: 'done', indices: Array.from({ length: n }, (_, i) => i), arrayState: [...array] });
  return steps;
}