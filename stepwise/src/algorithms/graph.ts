import { GraphStep } from '../types';

export function bfs(adj: number[][], start: number): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Array(adj.length).fill(false);
  const queue: number[] = [];

  visited[start] = true;
  queue.push(start);
  steps.push({ type: 'visit', nodes: [start.toString()], extra: { visited: [...visited], queue: [...queue] } });

  while (queue.length > 0) {
    const node = queue.shift()!;
    steps.push({ type: 'dequeue', nodes: [node.toString()], extra: { visited: [...visited], queue: [...queue] } });

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        steps.push({ type: 'enqueue', nodes: [neighbor.toString()], extra: { visited: [...visited], queue: [...queue] } });
      }
    }
  }

  return steps;
}

export function dfs(adj: number[][], start: number): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Array(adj.length).fill(false);
  const stack: number[] = [];

  visited[start] = true;
  stack.push(start);
  steps.push({ type: 'visit', nodes: [start.toString()], extra: { visited: [...visited], stack: [...stack] } });

  while (stack.length > 0) {
    const node = stack.pop()!;
    steps.push({ type: 'pop', nodes: [node.toString()], extra: { visited: [...visited], stack: [...stack] } });

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
        steps.push({ type: 'push', nodes: [neighbor.toString()], extra: { visited: [...visited], stack: [...stack] } });
      }
    }
  }

  return steps;
}