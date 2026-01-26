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

export function insertionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // Compare with previous elements
    while (j >= 0) {
      steps.push({ type: 'compare', indices: [j, j + 1], arrayState: [...array] });
      if (array[j] <= key) break;

      // Shift element
      array[j + 1] = array[j];
      steps.push({ type: 'swap', indices: [j, j + 1], arrayState: [...array] });
      j--;
    }
    array[j + 1] = key;
  }

  steps.push({ type: 'done', indices: Array.from({ length: n }, (_, i) => i), arrayState: [...array] });
  return steps;
}

export function mergeSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...arr];

  function merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      steps.push({ type: 'compare', indices: [left + i, mid + 1 + j], arrayState: [...array] });
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      steps.push({ type: 'swap', indices: [k], arrayState: [...array] });
      k++;
    }

    while (i < n1) {
      array[k] = L[i];
      steps.push({ type: 'swap', indices: [k], arrayState: [...array] });
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = R[j];
      steps.push({ type: 'swap', indices: [k], arrayState: [...array] });
      j++;
      k++;
    }
  }

  function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }

  mergeSortHelper(0, array.length - 1);
  steps.push({ type: 'done', indices: Array.from({ length: array.length }, (_, i) => i), arrayState: [...array] });
  return steps;
}

export function quickSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...arr];

  function partition(low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high], arrayState: [...array] });
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({ type: 'swap', indices: [i, j], arrayState: [...array] });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({ type: 'swap', indices: [i + 1, high], arrayState: [...array] });
    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, array.length - 1);
  steps.push({ type: 'done', indices: Array.from({ length: array.length }, (_, i) => i), arrayState: [...array] });
  return steps;
}