import { GraphStep } from '../types';

export function bfs(adj: number[][], start: number): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Array(adj.length).fill(false);
  const queue: number[] = [];

  visited[start] = true;
  queue.push(start);
  steps.push({ type: 'visit', nodes: [start.toString()], extra: { visited: [...visited], queue: [...queue], adj: [...adj.map(row => [...row])] } });

  while (queue.length > 0) {
    const node = queue.shift()!;
    steps.push({ type: 'dequeue', nodes: [node.toString()], extra: { visited: [...visited], queue: [...queue], adj: [...adj.map(row => [...row])] } });

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        steps.push({ type: 'enqueue', nodes: [neighbor.toString()], extra: { visited: [...visited], queue: [...queue], adj: [...adj.map(row => [...row])] } });
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
  steps.push({ type: 'visit', nodes: [start.toString()], extra: { visited: [...visited], stack: [...stack], adj: [...adj.map(row => [...row])] } });

  while (stack.length > 0) {
    const node = stack.pop()!;
    steps.push({ type: 'pop', nodes: [node.toString()], extra: { visited: [...visited], stack: [...stack], adj: [...adj.map(row => [...row])] } });

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
        steps.push({ type: 'push', nodes: [neighbor.toString()], extra: { visited: [...visited], stack: [...stack], adj: [...adj.map(row => [...row])] } });
      }
    }
  }

  return steps;
}

export function dijkstra(adj: number[][], weights: number[][], start: number): GraphStep[] {
  const steps: GraphStep[] = [];
  const n = adj.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  const prev = new Array(n).fill(-1);

  dist[start] = 0;

  for (let i = 0; i < n - 1; i++) {
    // Find minimum distance vertex
    let minDist = Infinity;
    let minIdx = -1;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && dist[j] < minDist) {
        minDist = dist[j];
        minIdx = j;
      }
    }

    if (minIdx === -1) break;

    visited[minIdx] = true;
    steps.push({
      type: 'visit',
      nodes: [minIdx.toString()],
      extra: {
        visited: [...visited],
        distances: [...dist],
        previous: [...prev],
        adj: [...adj.map(row => [...row])],
        weights: [...weights.map(row => [...row])]
      }
    });

    // Update distances
    for (const neighbor of adj[minIdx]) {
      if (!visited[neighbor]) {
        const newDist = dist[minIdx] + weights[minIdx][neighbor];
        steps.push({
          type: 'enqueue',
          nodes: [neighbor.toString()],
          extra: {
            visited: [...visited],
            distances: [...dist],
            previous: [...prev],
            adj: [...adj.map(row => [...row])],
            weights: [...weights.map(row => [...row])]
          }
        });

        if (newDist < dist[neighbor]) {
          dist[neighbor] = newDist;
          prev[neighbor] = minIdx;
        }
      }
    }
  }

  return steps;
}

export function aStar(adj: number[][], weights: number[][], start: number, goal: number, heuristic: number[]): GraphStep[] {
  const steps: GraphStep[] = [];
  const n = adj.length;
  const openSet = new Set([start]);
  const cameFrom = new Array(n).fill(-1);
  const gScore = new Array(n).fill(Infinity);
  const fScore = new Array(n).fill(Infinity);

  gScore[start] = 0;
  fScore[start] = heuristic[start];

  while (openSet.size > 0) {
    // Find node with lowest fScore
    let current = -1;
    let lowestF = Infinity;

    for (const node of openSet) {
      if (fScore[node] < lowestF) {
        lowestF = fScore[node];
        current = node;
      }
    }

    if (current === goal) {
      // Reconstruct path
      const path = [];
      let temp = current;
      while (temp !== -1) {
        path.unshift(temp);
        temp = cameFrom[temp];
      }
      steps.push({
        type: 'visit',
        nodes: path.map(String),
        extra: {
          visited: Array.from({length: n}, (_, i) => !openSet.has(i)),
          path: path,
          adj: [...adj.map(row => [...row])],
          weights: [...weights.map(row => [...row])]
        }
      });
      break;
    }

    openSet.delete(current);
    steps.push({
      type: 'dequeue',
      nodes: [current.toString()],
      extra: {
        visited: Array.from({length: n}, (_, i) => !openSet.has(i)),
        openSet: Array.from(openSet),
        gScore: [...gScore],
        fScore: [...fScore],
        adj: [...adj.map(row => [...row])],
        weights: [...weights.map(row => [...row])]
      }
    });

    for (const neighbor of adj[current]) {
      const tentativeG = gScore[current] + weights[current][neighbor];

      if (tentativeG < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = gScore[neighbor] + heuristic[neighbor];

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
          steps.push({
            type: 'enqueue',
            nodes: [neighbor.toString()],
            extra: {
              visited: Array.from({length: n}, (_, i) => !openSet.has(i)),
              openSet: Array.from(openSet),
              gScore: [...gScore],
              fScore: [...fScore],
              adj: [...adj.map(row => [...row])],
              weights: [...weights.map(row => [...row])]
            }
          });
        }
      }
    }
  }

  return steps;
}