export interface Step {
  type: "compare" | "swap" | "visit" | "push" | "pop" | "done";
  indices?: number[];
  nodes?: string[];
  arrayState?: number[];
  extra?: any;
}

export interface SortStep extends Step {
  type: "compare" | "swap" | "done";
  indices: number[];
  arrayState: number[];
}

export interface GraphStep extends Step {
  type: "visit" | "enqueue" | "dequeue" | "push" | "pop";
  nodes: string[];
  extra: {
    visited: boolean[];
    queue?: number[];
    stack?: number[];
  };
}

export interface HeapStep extends Step {
  type: "compare" | "swap" | "heapify";
  indices: number[];
  arrayState: number[];
}