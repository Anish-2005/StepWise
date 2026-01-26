import { GraphStep } from '../types';

export function bfs(adj: number[][], start: number): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Array(adj.length).fill(false);
  const queue: number[] = [];

  visited[start] = true;
  queue.push(start);
  steps.push({ type: 'visit', node: start, queue: [...queue], visited: [...visited], current: start });

  while (queue.length > 0) {
    const node = queue.shift()!;
    steps.push({ type: 'dequeue', node, queue: [...queue], visited: [...visited], current: node });

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        steps.push({ type: 'enqueue', node: neighbor, queue: [...queue], visited: [...visited], current: node });
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
  steps.push({ type: 'visit', node: start, stack: [...stack], visited: [...visited], current: start });

  while (stack.length > 0) {
    const node = stack.pop()!;
    steps.push({ type: 'pop', node, stack: [...stack], visited: [...visited], current: node });

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
        steps.push({ type: 'push', node: neighbor, stack: [...stack], visited: [...visited], current: node });
      }
    }
  }

  return steps;
}