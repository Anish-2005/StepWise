# StepWise

<div align="center">
  <img src="./public/logo.svg" alt="StepWise Logo" width="96" height="96" />
  <h3>Interactive Algorithm Visualizer</h3>
  <p>
    Learn how algorithms actually work through step-by-step execution,
    real-time telemetry, and high-fidelity visual traces.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.1.5-000000?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=111" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=fff" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=fff" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/License-MIT-16A34A?style=for-the-badge" alt="MIT License" />
  </p>
</div>

## Overview

StepWise is a modern visualization workspace for algorithm learning and teaching.
Instead of reading static pseudocode, you can inspect each operation as it executes:

- Comparisons and swaps for sorting
- Queue, stack, and path-state transitions for graph traversal
- Heap restructuring and key operations for max-heaps

## Highlights

| Area | What You Get |
| --- | --- |
| Sorting | Bubble, Selection, Insertion, Merge, Quick Sort |
| Graph | BFS, DFS, Dijkstra, A* |
| Heap | Build, Insert, Extract Max, Heap Sort, Decrease Key, Delete |
| Playback | Play, pause, step, reset, speed control |
| UX | Responsive layout, keyboard-friendly controls, inline error states |
| Engineering | TypeScript + lint + production build checks |

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3. Validate quality checks

```bash
npm run lint
npm run build
```

## Input Formats

StepWise supports flexible input formats depending on selected category/algorithm:

### Sorting

```text
64,34,25,12,22,11,90
```

### Graph

Unweighted:

```text
0:1,2;1:0,2;2:0,1
```

Weighted (Dijkstra / A*):

```text
0:1-4,2-2;1:0-4,2-1;2:0-2,1-1
```

### Heap

Build / Extract / Heap Sort:

```text
64,34,25,12,22,11,90
```

Insert (value first):

```text
40,50,30,20,10
```

Decrease Key:

```text
2,10,90,70,60,40
```

Delete:

```text
1,90,70,60,40
```

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide Icons

## Project Structure

```text
src/
  algorithms/       # Algorithm step generators
  app/              # App Router pages/layout/styles
  components/       # UI and visualization components
  types/            # Shared TypeScript types
public/
  favicon.svg
  logo.svg
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).

