'use client';

import { Sparkles } from 'lucide-react';
import { Step } from '@/types';

interface VisualizerProps {
  steps: Step[];
  currentStep: number;
}

export default function Visualizer({ steps, currentStep }: VisualizerProps) {
  const step = steps[currentStep];

  /* ================= EMPTY STATE ================= */
  if (!step) {
    return (
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center space-y-4">
          <Sparkles className="w-16 h-16 mx-auto text-indigo-400" />
          <p className="text-slate-300 text-sm tracking-wide">
            Generate an algorithm to begin execution
          </p>
        </div>
      </div>
    );
  }

  /* ================= ARRAY VISUALIZATION ================= */
  if (step.arrayState) {
    const maxValue = Math.max(...step.arrayState, 100);

    return (
      <div className="relative h-full overflow-hidden">
        {/* Grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

        <div className="relative z-10 flex items-end justify-center gap-2 h-full">
          {step.arrayState.map((value, idx) => {
            const active = step.indices?.includes(idx);

            let barColor =
              'bg-gradient-to-t from-blue-500/40 to-blue-400';
            let glow = '';

            if (active) {
              if (step.type === 'compare') {
                barColor =
                  'bg-gradient-to-t from-yellow-500 to-yellow-400';
                glow = 'shadow-[0_0_25px_rgba(234,179,8,0.8)]';
              } else if (step.type === 'swap') {
                barColor =
                  'bg-gradient-to-t from-rose-500 to-pink-500';
                glow = 'shadow-[0_0_25px_rgba(244,63,94,0.8)]';
              } else if (step.type === 'done' || step.type === 'heapify') {
                barColor =
                  'bg-gradient-to-t from-emerald-500 to-teal-400';
                glow = 'shadow-[0_0_25px_rgba(16,185,129,0.8)]';
              }
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end flex-1 gap-2"
              >
                <div
                  className={`w-12 rounded-t-xl transition-all duration-300 ease-out ${barColor} ${glow} ${
                    active ? 'scale-105' : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 350}px`,
                  }}
                />
                <span className="text-xs font-mono text-slate-400">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ================= GRAPH VISUALIZATION ================= */
  if (step.extra?.adj && (step.extra?.visited || step.extra?.distances || step.extra?.gScore)) {
    const adj = step.extra.adj || [];
    const weights = step.extra.weights || [];
    const nodeCount = step.extra.visited.length;
    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    // Calculate node positions in a circle
    const getNodePosition = (index: number) => {
      const angle = (index * 2 * Math.PI) / nodeCount - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    };

    return (
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <svg width="400" height="400" className="overflow-visible">
            {/* Draw edges */}
            {adj.map((neighbors: number[], fromIdx: number) =>
              neighbors.map((toIdx: number) => {
                const fromPos = getNodePosition(fromIdx);
                const toPos = getNodePosition(toIdx);
                const weight = weights[fromIdx]?.[toIdx] || 1;
                const isActive = step.nodes?.includes(String(fromIdx)) || step.nodes?.includes(String(toIdx));

                return (
                  <g key={`${fromIdx}-${toIdx}`}>
                    {/* Edge line */}
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={isActive ? "#f472b6" : "#64748b"}
                      strokeWidth={isActive ? "3" : "2"}
                      className="transition-all duration-300"
                      markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                    />

                    {/* Edge weight */}
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2 - 5}
                      textAnchor="middle"
                      className={`text-xs font-semibold ${isActive ? 'fill-pink-400' : 'fill-slate-400'} transition-all duration-300`}
                    >
                      {weight}
                    </text>
                  </g>
                );
              })
            )}

            {/* Arrow markers */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#64748b"
                />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#f472b6"
                />
              </marker>
            </defs>

            {/* Draw nodes */}
            {step.extra.visited.map((visited: boolean, idx: number) => {
              const pos = getNodePosition(idx);
              const isCurrent = step.nodes?.[0] === String(idx) ||
                               (step.extra?.path && step.extra.path.includes(idx));
              const isInQueue = step.extra?.queue?.includes(idx);
              const isInStack = step.extra?.stack?.includes(idx);
              const isInOpenSet = step.extra?.openSet?.includes(idx);
              const distance = step.extra?.distances?.[idx];
              const gScore = step.extra?.gScore?.[idx];
              const fScore = step.extra?.fScore?.[idx];

              let nodeStyle = 'fill-blue-500/20 stroke-blue-400';
              let glow = '';
              let scale = 1;

              if (isCurrent) {
                nodeStyle = 'fill-rose-500/30 stroke-rose-400';
                glow = 'drop-shadow(0 0 20px rgba(244, 63, 94, 0.8))';
                scale = 1.2;
              } else if (visited) {
                nodeStyle = 'fill-emerald-500/30 stroke-emerald-400';
                glow = 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.6))';
              } else if (isInQueue || isInStack || isInOpenSet) {
                nodeStyle = 'fill-amber-500/20 stroke-amber-400';
                glow = 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))';
              }

              return (
                <g key={idx} transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}>
                  {/* Node circle */}
                  <circle
                    r="24"
                    className={`${nodeStyle} transition-all duration-500 cursor-pointer`}
                    style={{ filter: glow }}
                  />

                  {/* Node label */}
                  <text
                    textAnchor="middle"
                    dy="6"
                    className="text-lg font-bold fill-slate-200 transition-all duration-300"
                  >
                    {idx}
                  </text>

                  {/* Distance/Path info */}
                  {(distance !== undefined || gScore !== undefined) && (
                    <text
                      textAnchor="middle"
                      dy="-32"
                      className="text-xs font-semibold fill-slate-300"
                    >
                      {distance !== undefined ? `d:${distance === Infinity ? '∞' : distance}` :
                       gScore !== undefined ? `g:${gScore === Infinity ? '∞' : gScore}` : ''}
                    </text>
                  )}

                  {fScore !== undefined && (
                    <text
                      textAnchor="middle"
                      dy="-18"
                      className="text-xs font-semibold fill-slate-400"
                    >
                      f:{fScore === Infinity ? '∞' : fScore}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Algorithm info overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                  <span className="text-slate-300">Unvisited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <span className="text-slate-300">In Queue/Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  <span className="text-slate-300">Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                  <span className="text-slate-300">Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= HEAP VISUALIZATION ================= */
  if (step.arrayState && step.type && ['compare', 'swap', 'heapify'].includes(step.type) && !step.extra?.adj) {
    const array = step.arrayState;
    const maxValue = Math.max(...array, 100);

    // Calculate tree positions
    const getNodePosition = (index: number, level: number, position: number) => {
      const levelHeight = 80;
      const nodeSpacing = Math.max(60, 400 / Math.pow(2, level + 1));
      return {
        x: 200 + (position - Math.pow(2, level) / 2 + 0.5) * nodeSpacing,
        y: 50 + level * levelHeight
      };
    };

    const getTreeInfo = (arr: number[]) => {
      const nodes = [];
      for (let i = 0; i < arr.length; i++) {
        const level = Math.floor(Math.log2(i + 1));
        const position = i - Math.pow(2, level) + 1;
        nodes.push({
          index: i,
          value: arr[i],
          level,
          position,
          ...getNodePosition(i, level, position)
        });
      }
      return nodes;
    };

    const treeNodes = getTreeInfo(array);

    return (
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <svg width="400" height="350" className="overflow-visible">
            {/* Draw tree edges */}
            {treeNodes.map((node, idx) => {
              const leftChild = idx * 2 + 1;
              const rightChild = idx * 2 + 2;
              const edges = [];

              if (leftChild < array.length) {
                const childNode = treeNodes[leftChild];
                const isActive = step.indices?.includes(idx) || step.indices?.includes(leftChild);
                edges.push(
                  <line
                    key={`edge-${idx}-${leftChild}`}
                    x1={node.x}
                    y1={node.y}
                    x2={childNode.x}
                    y2={childNode.y}
                    stroke={isActive ? "#f472b6" : "#64748b"}
                    strokeWidth={isActive ? "3" : "2"}
                    className="transition-all duration-300"
                  />
                );
              }

              if (rightChild < array.length) {
                const childNode = treeNodes[rightChild];
                const isActive = step.indices?.includes(idx) || step.indices?.includes(rightChild);
                edges.push(
                  <line
                    key={`edge-${idx}-${rightChild}`}
                    x1={node.x}
                    y1={node.y}
                    x2={childNode.x}
                    y2={childNode.y}
                    stroke={isActive ? "#f472b6" : "#64748b"}
                    strokeWidth={isActive ? "3" : "2"}
                    className="transition-all duration-300"
                  />
                );
              }

              return edges;
            })}

            {/* Draw tree nodes */}
            {treeNodes.map((node, idx) => {
              const isActive = step.indices?.includes(idx);
              const isCompared = step.indices?.includes(idx) && step.type === 'compare';
              const isSwapped = step.indices?.includes(idx) && step.type === 'swap';

              let nodeStyle = 'fill-blue-500/20 stroke-blue-400';
              let glow = '';
              let scale = 1;

              if (isSwapped) {
                nodeStyle = 'fill-rose-500/30 stroke-rose-400';
                glow = 'drop-shadow(0 0 20px rgba(244, 63, 94, 0.8))';
                scale = 1.1;
              } else if (isCompared) {
                nodeStyle = 'fill-yellow-500/30 stroke-yellow-400';
                glow = 'drop-shadow(0 0 15px rgba(234, 179, 8, 0.8))';
                scale = 1.05;
              } else if (isActive) {
                nodeStyle = 'fill-emerald-500/30 stroke-emerald-400';
                glow = 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.6))';
              }

              return (
                <g key={idx} transform={`translate(${node.x}, ${node.y}) scale(${scale})`}>
                  {/* Node circle */}
                  <circle
                    r="20"
                    className={`${nodeStyle} transition-all duration-500 cursor-pointer`}
                    style={{ filter: glow }}
                  />

                  {/* Node value */}
                  <text
                    textAnchor="middle"
                    dy="6"
                    className="text-sm font-bold fill-slate-200 transition-all duration-300"
                  >
                    {node.value}
                  </text>

                  {/* Node index */}
                  <text
                    textAnchor="middle"
                    dy="-28"
                    className="text-xs font-semibold fill-slate-400"
                  >
                    {idx}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Array representation */}
          <div className="mt-6 flex justify-center gap-2">
            {array.map((value, idx) => {
              const isActive = step.indices?.includes(idx);
              const isCompared = step.indices?.includes(idx) && step.type === 'compare';
              const isSwapped = step.indices?.includes(idx) && step.type === 'swap';

              let barColor = 'bg-gradient-to-t from-blue-500/40 to-blue-400';
              let glow = '';

              if (isSwapped) {
                barColor = 'bg-gradient-to-t from-rose-500 to-pink-500';
                glow = 'shadow-[0_0_25px_rgba(244,63,94,0.8)]';
              } else if (isCompared) {
                barColor = 'bg-gradient-to-t from-yellow-500 to-yellow-400';
                glow = 'shadow-[0_0_25px_rgba(234,179,8,0.8)]';
              } else if (isActive) {
                barColor = 'bg-gradient-to-t from-emerald-500 to-teal-400';
                glow = 'shadow-[0_0_25px_rgba(16,185,129,0.8)]';
              }

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end gap-1"
                >
                  <div
                    className={`w-8 rounded-t transition-all duration-300 ${barColor} ${glow} ${
                      isActive ? 'scale-110' : ''
                    }`}
                    style={{
                      height: `${(value / maxValue) * 60}px`,
                    }}
                  />
                  <span className="text-xs font-mono text-slate-400">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                <span className="text-slate-300">Default</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <span className="text-slate-300">Comparing</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-rose-500/50"></div>
                <span className="text-slate-300">Swapping</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                <span className="text-slate-300">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= FALLBACK ================= */
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-slate-400 text-sm">
        Visualization not available for this step
      </p>
    </div>
  );
}

