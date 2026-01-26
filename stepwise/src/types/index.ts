export interface SortStep {
  type: 'compare' | 'swap' | 'sorted';
  indices: number[];
  snapshot: number[];
}

export interface GraphStep {
  type: 'visit' | 'enqueue' | 'dequeue' | 'push' | 'pop';
  node: number;
  queue?: number[];
  stack?: number[];
  visited: boolean[];
  current: number;
}

export interface HeapStep {
  type: 'compare' | 'swap' | 'heapify' | 'insert' | 'extract';
  indices: number[];
  snapshot: number[];
  heapArray: number[];
}