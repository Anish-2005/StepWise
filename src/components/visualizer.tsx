'use client';

import { Sparkles } from 'lucide-react';
import { Step } from '@/types';

interface VisualizerProps {
  steps: Step[];
  currentStep: number;
  algorithm?: string;
}

export default function Visualizer({ steps, currentStep, algorithm }: VisualizerProps) {
  const step = steps[currentStep];

  /* ================= EMPTY STATE ================= */
  if (!step) {
    return (
      <div className="relative h-full flex items-center justify-center overflow-hidden bg-slate-50">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-slate-600 text-sm font-medium">
            Generate an algorithm to begin visualization
          </p>
        </div>
      </div>
    );
  }

  /* ================= ARRAY VISUALIZATION ================= */
  if (step.arrayState) {
    const maxValue = Math.max(...step.arrayState, 100);

    // Custom visualizations for sorting algorithms
    if (algorithm === 'bubble') {
      return renderBubbleSortVisualization(step, maxValue);
    } else if (algorithm === 'selection') {
      return renderSelectionSortVisualization(step, maxValue);
    } else if (algorithm === 'insertion') {
      return renderInsertionSortVisualization(step, maxValue);
    } else if (algorithm === 'merge') {
      return renderMergeSortVisualization(step, maxValue);
    } else if (algorithm === 'quick') {
      return renderQuickSortVisualization(step, maxValue);
    }

    // Default array visualization for heap operations and other cases
    return renderDefaultArrayVisualization(step, maxValue);
  }

  /* ================= CUSTOM VISUALIZATION FUNCTIONS ================= */

  function renderBubbleSortVisualization(step: Step, maxValue: number) {
    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative w-full max-w-4xl">
          <div className="flex items-end justify-center gap-2 h-80">
            {step.arrayState!.map((value, idx) => {
              const active = step.indices?.includes(idx);
              const isComparing = active && step.type === 'compare';
              const isSwapping = active && step.type === 'swap';

              let barColor = 'bg-slate-300';
              let borderColor = 'border-slate-400';
              let scale = 1;

              if (isSwapping) {
                barColor = 'bg-red-500';
                borderColor = 'border-red-400';
                scale = 1.05;
              } else if (isComparing) {
                barColor = 'bg-yellow-500';
                borderColor = 'border-yellow-400';
              }

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end flex-1 gap-1"
                >
                  <div
                    className={`w-8 border-2 rounded-t transition-all duration-300 ${barColor} ${borderColor} ${
                      scale !== 1 ? 'transform scale-105' : ''
                    }`}
                    style={{
                      height: `${(value / maxValue) * 240}px`,
                    }}
                  />
                  <span className="text-xs font-medium text-slate-600">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 border border-slate-400 rounded"></div>
                <span className="text-slate-700 font-medium">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 border border-yellow-400 rounded"></div>
                <span className="text-slate-700 font-medium">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 border border-red-400 rounded"></div>
                <span className="text-slate-700 font-medium">Swapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSelectionSortVisualization(step: Step, maxValue: number) {
    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative w-full max-w-4xl">
          <div className="flex items-end justify-center gap-2 h-80">
            {step.arrayState!.map((value, idx) => {
              const active = step.indices?.includes(idx);
              const isMin = step.indices && step.indices.length >= 2 && idx === step.indices[1];
              const isCurrent = step.indices && step.indices.length >= 1 && idx === step.indices[0];

              let barColor = 'bg-slate-300';
              let borderColor = 'border-slate-400';
              let scale = 1;

              if (isMin) {
                barColor = 'bg-green-500';
                borderColor = 'border-green-400';
                scale = 1.05;
              } else if (isCurrent) {
                barColor = 'bg-purple-500';
                borderColor = 'border-purple-400';
                scale = 1.05;
              } else if (active) {
                barColor = 'bg-blue-500';
                borderColor = 'border-blue-400';
              }

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end flex-1 gap-1"
                >
                  <div
                    className={`w-8 border-2 rounded-t transition-all duration-300 ${barColor} ${borderColor} ${
                      scale !== 1 ? 'transform scale-105' : ''
                    }`}
                    style={{
                      height: `${(value / maxValue) * 240}px`,
                    }}
                  />
                  <span className="text-xs font-medium text-slate-600">
                    {value}
                  </span>
                  {isMin && (
                    <div className="text-xs text-green-600 font-semibold">MIN</div>
                  )}
                  {isCurrent && (
                    <div className="text-xs text-purple-600 font-semibold">CURRENT</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 border border-slate-400 rounded"></div>
                <span className="text-slate-700 font-medium">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 border border-purple-400 rounded"></div>
                <span className="text-slate-700 font-medium">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 border border-green-400 rounded"></div>
                <span className="text-slate-700 font-medium">Minimum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderInsertionSortVisualization(step: Step, maxValue: number) {
    return (
      <div className="relative h-full overflow-hidden bg-slate-50">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5zm5 0c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex items-end justify-center gap-3 h-full pt-16">
          {step.arrayState!.map((value, idx) => {
            const active = step.indices?.includes(idx);
            const isInserting = active && step.type === 'compare';
            const isShifting = active && step.type === 'swap';

            let barColor = 'bg-gradient-to-t from-slate-300 to-slate-200';
            let glow = '';
            let effect = '';
            let arrow = null;

            if (isInserting) {
              barColor = 'bg-gradient-to-t from-cyan-400 to-cyan-300';
              glow = 'shadow-lg shadow-cyan-500/30';
              effect = 'animate-pulse';
              arrow = '↓';
            } else if (isShifting) {
              barColor = 'bg-gradient-to-t from-green-400 to-green-300';
              glow = 'shadow-lg shadow-green-500/30';
              effect = 'animate-bounce';
              arrow = '→';
            } else if (active) {
              barColor = 'bg-gradient-to-t from-blue-400 to-blue-300';
              glow = 'shadow-lg shadow-blue-500/30';
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end flex-1 gap-2"
              >
                {arrow && (
                  <div className={`text-2xl font-bold transition-all duration-300 ${
                    isInserting ? 'text-cyan-600 animate-bounce' : 'text-green-600 animate-pulse'
                  }`}>
                    {arrow}
                  </div>
                )}
                <div
                  className={`w-14 rounded-t-2xl transition-all duration-500 ease-out ${barColor} ${glow} ${effect} border border-white/50 ${
                    active ? 'scale-105' : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 280}px`,
                  }}
                />
                <span className="text-sm font-bold text-slate-700">
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <span className="text-slate-700 font-medium">Sorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-slate-700 font-medium">Inserting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce"></div>
              <span className="text-slate-700 font-medium">Shifting</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderMergeSortVisualization(step: Step, maxValue: number) {
    const array = step.arrayState!;
    const mid = Math.floor(array.length / 2);

    return (
      <div className="relative h-full overflow-hidden">
        {/* Merge background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.1),transparent_50%)]" />

        {/* Split line */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-16 bottom-20 w-1 bg-gradient-to-b from-orange-500/60 to-red-500/60 transition-all duration-500"
            style={{
              left: `${15 + (mid * 70) + 35}px`,
              boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
            }}
          />
        </div>

        <div className="relative z-10 flex items-end justify-center gap-3 h-full pt-16">
          {array.map((value, idx) => {
            const active = step.indices?.includes(idx);
            const isLeftHalf = idx < mid;
            const isMerging = step.type === 'compare' || step.type === 'swap';

            let barColor = isLeftHalf
              ? 'bg-gradient-to-t from-blue-500/50 to-blue-400/70'
              : 'bg-gradient-to-t from-purple-500/50 to-purple-400/70';
            let glow = '';
            let effect = '';

            if (active && isMerging) {
              barColor = 'bg-gradient-to-t from-orange-500/70 to-red-500/90';
              glow = 'shadow-[0_0_25px_rgba(249,115,22,0.8)]';
              effect = 'animate-pulse';
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end flex-1 gap-2"
              >
                <div
                  className={`w-14 rounded-t-2xl transition-all duration-500 ease-out ${barColor} ${glow} ${effect} ${
                    active ? 'scale-105' : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 280}px`,
                  }}
                />
                <span className="text-sm font-bold text-slate-300">
                  {value}
                </span>
                <div className={`text-xs font-bold ${isLeftHalf ? 'text-blue-400' : 'text-purple-400'}`}>
                  {isLeftHalf ? 'LEFT' : 'RIGHT'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500/60"></div>
              <span className="text-slate-300">Left Half</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500/60"></div>
              <span className="text-slate-300">Right Half</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500/60 animate-pulse"></div>
              <span className="text-slate-300">Merging</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderQuickSortVisualization(step: Step, maxValue: number) {
    const array = step.arrayState!;
    const pivot = step.indices && step.indices.length > 0 ? step.indices[0] : -1;
    const left = step.indices && step.indices.length > 1 ? step.indices[1] : -1;
    const right = step.indices && step.indices.length > 2 ? step.indices[2] : -1;

    return (
      <div className="relative h-full overflow-hidden">
        {/* Quick sort background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-rose-950/40" />
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(244,63,94,0.1),transparent,rgba(236,72,153,0.1))]" />

        {/* Pivot highlight */}
        {pivot >= 0 && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-16 w-16 h-16 border-4 border-pink-500/60 rounded-full transition-all duration-500 animate-spin"
              style={{
                left: `${15 + (pivot * 70) + 7}px`,
                boxShadow: '0 0 30px rgba(244, 63, 94, 0.4)',
              }}
            />
          </div>
        )}

        <div className="relative z-10 flex items-end justify-center gap-3 h-full pt-16">
          {array.map((value, idx) => {
            const isPivot = idx === pivot;
            const isLeftPointer = idx === left;
            const isRightPointer = idx === right;
            const isActive = step.indices?.includes(idx);

            let barColor = 'bg-gradient-to-t from-slate-500/40 to-slate-400/60';
            let glow = '';
            let effect = '';
            let label = '';

            if (isPivot) {
              barColor = 'bg-gradient-to-t from-pink-500/70 to-rose-500/90';
              glow = 'shadow-[0_0_30px_rgba(244,63,94,0.9)]';
              effect = 'animate-pulse';
              label = 'PIVOT';
            } else if (isLeftPointer) {
              barColor = 'bg-gradient-to-t from-blue-500/70 to-cyan-500/90';
              glow = 'shadow-[0_0_25px_rgba(6,182,212,0.8)]';
              effect = 'animate-bounce';
              label = 'LEFT';
            } else if (isRightPointer) {
              barColor = 'bg-gradient-to-t from-purple-500/70 to-indigo-500/90';
              glow = 'shadow-[0_0_25px_rgba(139,92,246,0.8)]';
              effect = 'animate-bounce';
              label = 'RIGHT';
            } else if (isActive) {
              barColor = 'bg-gradient-to-t from-emerald-500/50 to-teal-400/70';
              glow = 'shadow-[0_0_20px_rgba(16,185,129,0.7)]';
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end flex-1 gap-2"
              >
                <div
                  className={`w-14 rounded-t-2xl transition-all duration-500 ease-out ${barColor} ${glow} ${effect} ${
                    isActive ? 'scale-105' : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 280}px`,
                  }}
                />
                <span className="text-sm font-bold text-slate-300">
                  {value}
                </span>
                {label && (
                  <div className={`text-xs font-bold animate-pulse ${
                    isPivot ? 'text-pink-400' :
                    isLeftPointer ? 'text-blue-400' : 'text-purple-400'
                  }`}>
                    {label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500/60"></div>
              <span className="text-slate-300">Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500/60 animate-pulse"></div>
              <span className="text-slate-300">Pivot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500/60 animate-bounce"></div>
              <span className="text-slate-300">Left Pointer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500/60 animate-bounce"></div>
              <span className="text-slate-300">Right Pointer</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDefaultArrayVisualization(step: Step, maxValue: number) {
    return (
      <div className="relative h-full overflow-hidden bg-slate-50">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex items-end justify-center gap-2 h-full">
          {step.arrayState!.map((value, idx) => {
            const active = step.indices?.includes(idx);

            let barColor =
              'bg-gradient-to-t from-blue-200 to-blue-300';
            let glow = '';

            if (active) {
              if (step.type === 'compare') {
                barColor =
                  'bg-gradient-to-t from-yellow-300 to-yellow-400';
                glow = 'shadow-lg shadow-yellow-500/30';
              } else if (step.type === 'swap') {
                barColor =
                  'bg-gradient-to-t from-red-300 to-red-400';
                glow = 'shadow-lg shadow-red-500/30';
              } else if (step.type === 'done' || step.type === 'heapify') {
                barColor =
                  'bg-gradient-to-t from-green-300 to-green-400';
                glow = 'shadow-lg shadow-green-500/30';
              }
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end flex-1 gap-2"
              >
                <div
                  className={`w-12 rounded-t-xl transition-all duration-300 ease-out ${barColor} ${glow} border border-white/50 ${
                    active ? 'scale-105' : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 350}px`,
                  }}
                />
                <span className="text-xs font-mono text-slate-600">
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
    // Custom visualizations for graph algorithms
    if (algorithm === 'bfs') {
      return renderBFSVisualization(step);
    } else if (algorithm === 'dfs') {
      return renderDFSVisualization(step);
    } else if (algorithm === 'dijkstra') {
      return renderDijkstraVisualization(step);
    } else if (algorithm === 'astar') {
      return renderAStarVisualization(step);
    }

    // Default graph visualization
    return renderDefaultGraphVisualization(step);
  }

  /* ================= HEAP VISUALIZATION ================= */
  if (step.arrayState && step.type && ['compare', 'swap', 'heapify'].includes(step.type) && !step.extra?.adj) {
    const array: number[] = Array.isArray(step.arrayState) ? step.arrayState : [];
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

  /* ================= GRAPH VISUALIZATION ================= */
  if (step.extra?.adj && (step.extra?.visited || step.extra?.distances || step.extra?.gScore)) {
    // Custom visualizations for graph algorithms
    if (algorithm === 'bfs') {
      return renderBFSVisualization(step);
    } else if (algorithm === 'dfs') {
      return renderDFSVisualization(step);
    } else if (algorithm === 'dijkstra') {
      return renderDijkstraVisualization(step);
    } else if (algorithm === 'astar') {
      return renderAStarVisualization(step);
    }

    // Default graph visualization
    return renderDefaultGraphVisualization(step);
  }

  /* ================= CUSTOM GRAPH VISUALIZATION FUNCTIONS ================= */

  function renderBFSVisualization(step: Step) {
    const extra = step.extra as { adj?: number[][], visited: boolean[], queue?: number[] };
    const adj = extra.adj || [];
    const nodeCount = extra.visited.length;
    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    // BFS uses levels - arrange nodes by level
    const getBFSNodePosition = (index: number) => {
      const visited = extra.visited;

      // Calculate level based on visitation order (simplified)
      let level = 0;
      if (visited[index]) {
        level = Math.floor(index / 3) + 1; // Rough approximation
      }

      const nodesInLevel = Math.min(4, nodeCount - level * 3);
      const positionInLevel = index % nodesInLevel;
      const levelRadius = radius - level * 30;

      const angle = (positionInLevel * 2 * Math.PI) / nodesInLevel - Math.PI / 2;
      return {
        x: centerX + levelRadius * Math.cos(angle),
        y: centerY + levelRadius * Math.sin(angle)
      };
    };

    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative">
          <svg width="400" height="400" className="overflow-visible">
            {/* Draw edges */}
            {adj.map((neighbors: number[], fromIdx: number) =>
              neighbors.map((toIdx: number) => {
                const fromPos = getBFSNodePosition(fromIdx);
                const toPos = getBFSNodePosition(toIdx);
                const isActive = step.nodes?.includes(String(fromIdx)) || step.nodes?.includes(String(toIdx));

                return (
                  <line
                    key={`${fromIdx}-${toIdx}`}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={isActive ? "#06b6d4" : "#cbd5e1"}
                    strokeWidth={isActive ? "2" : "1"}
                    className="transition-all duration-300"
                  />
                );
              })
            )}

            {/* Draw nodes */}
            {step.extra!.visited.map((visited: boolean, idx: number) => {
              const pos = getBFSNodePosition(idx);
              const isCurrent = step.nodes?.[0] === String(idx);
              const isInQueue = step.extra!.queue?.includes(idx);

              let nodeStyle = 'fill-slate-300 stroke-slate-400';
              let scale = 1;

              if (isCurrent) {
                nodeStyle = 'fill-cyan-500 stroke-cyan-400';
                scale = 1.1;
              } else if (visited) {
                nodeStyle = 'fill-green-500 stroke-green-400';
              } else if (isInQueue) {
                nodeStyle = 'fill-yellow-500 stroke-yellow-400';
              }

              return (
                <g key={idx} transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}>
                  <circle
                    r="20"
                    className={`${nodeStyle} transition-all duration-300`}
                  />
                  <text
                    textAnchor="middle"
                    dy="5"
                    className="text-sm font-semibold fill-white"
                  >
                    {idx}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* BFS Queue visualization */}
          {step.extra!.queue && step.extra!.queue.length > 0 && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-700 mb-1">QUEUE</div>
              <div className="flex gap-1">
                {step.extra!.queue.map((nodeIdx: number, queueIdx: number) => (
                  <div
                    key={nodeIdx}
                    className={`w-6 h-6 rounded border flex items-center justify-center text-xs font-medium ${
                      queueIdx === 0
                        ? 'bg-cyan-500 text-white border-cyan-400'
                        : 'bg-slate-200 text-slate-700 border-slate-300'
                    }`}
                  >
                    {nodeIdx}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400"></div>
                <span className="text-slate-700 font-medium">Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-400"></div>
                <span className="text-slate-700 font-medium">In Queue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-400"></div>
                <span className="text-slate-700 font-medium">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500 border border-cyan-400"></div>
                <span className="text-slate-700 font-medium">Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDFSVisualization(step: Step) {
    const extra = step.extra as { adj?: number[][], visited: boolean[], stack?: number[] };
    const adj = extra.adj || [];
    const nodeCount = extra.visited.length;
    const centerX = 200;
    const centerY = 200;

    // DFS uses a stack - show as a vertical stack
    const getDFSNodePosition = (index: number) => {
      const stack = extra.stack || [];
      const stackIndex = stack.indexOf(index);

      if (stackIndex >= 0) {
        // Node is in stack - position vertically
        return {
          x: centerX - 120,
          y: centerY - 60 + stackIndex * 40
        };
      } else {
        // Node not in stack - position in exploration area
        const angle = (index * 2 * Math.PI) / nodeCount - Math.PI / 2;
        return {
          x: centerX + 100 * Math.cos(angle),
          y: centerY + 100 * Math.sin(angle)
        };
      }
    };

    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative">
          <svg width="400" height="400" className="overflow-visible">
            {/* Draw edges */}
            {adj.map((neighbors: number[], fromIdx: number) =>
              neighbors.map((toIdx: number) => {
                const fromPos = getDFSNodePosition(fromIdx);
                const toPos = getDFSNodePosition(toIdx);
                const isActive = step.nodes?.includes(String(fromIdx)) || step.nodes?.includes(String(toIdx));

                return (
                  <line
                    key={`${fromIdx}-${toIdx}`}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={isActive ? "#a855f7" : "#cbd5e1"}
                    strokeWidth={isActive ? "2" : "1"}
                    className="transition-all duration-300"
                  />
                );
              })
            )}

            {/* Draw nodes */}
            {extra.visited.map((visited: boolean, idx: number) => {
              const pos = getDFSNodePosition(idx);
              const isCurrent = step.nodes?.[0] === String(idx);
              const isInStack = extra.stack?.includes(idx);

              let nodeStyle = 'fill-slate-300 stroke-slate-400';
              let scale = 1;

              if (isCurrent) {
                nodeStyle = 'fill-purple-300 stroke-purple-400';
                scale = 1.1;
              } else if (visited) {
                nodeStyle = 'fill-emerald-300 stroke-emerald-400';
              } else if (isInStack) {
                nodeStyle = 'fill-amber-300 stroke-amber-400';
              }

              return (
                <g key={idx} transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}>
                  <circle
                    r="20"
                    className={`${nodeStyle} transition-all duration-300`}
                  />
                  <text
                    textAnchor="middle"
                    dy="5"
                    className="text-sm font-semibold fill-slate-700"
                  >
                    {idx}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* DFS Stack visualization */}
          {extra.stack && extra.stack.length > 0 && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-300">
              <div className="text-xs font-semibold text-slate-700 mb-1">STACK</div>
              <div className="flex flex-col gap-1">
                {[...extra.stack].reverse().map((nodeIdx: number, stackIdx: number) => (
                  <div
                    key={nodeIdx}
                    className={`w-6 h-6 rounded border flex items-center justify-center text-xs font-medium ${
                      stackIdx === 0
                        ? 'bg-purple-300/80 text-slate-700 border-purple-400'
                        : 'bg-slate-300/50 text-slate-700 border-slate-400'
                    }`}
                  >
                    {nodeIdx}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-md px-4 py-2 border border-slate-300">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400"></div>
                <span className="text-slate-700">Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-300 border border-amber-400"></div>
                <span className="text-slate-700">In Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-300 border border-emerald-400"></div>
                <span className="text-slate-700">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-300 border border-purple-400"></div>
                <span className="text-slate-700">Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDijkstraVisualization(step: Step) {
    const extra = step.extra as { adj?: number[][], weights?: number[][], visited: boolean[], distances?: number[] };
    const adj = extra.adj || [];
    const weights = extra.weights || [];
    const nodeCount = extra.visited.length;
    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    const getNodePosition = (index: number) => {
      const angle = (index * 2 * Math.PI) / nodeCount - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    };

    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative">
          <svg width="400" height="400" className="overflow-visible">
            {/* Draw edges with weights */}
            {adj.map((neighbors: number[], fromIdx: number) =>
              neighbors.map((toIdx: number) => {
                const fromPos = getNodePosition(fromIdx);
                const toPos = getNodePosition(toIdx);
                const weight = weights[fromIdx]?.[toIdx] || 1;
                const isActive = step.nodes?.includes(String(fromIdx)) || step.nodes?.includes(String(toIdx));

                return (
                  <g key={`${fromIdx}-${toIdx}`}>
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={isActive ? "#10b981" : "#cbd5e1"}
                      strokeWidth={isActive ? "2" : "1"}
                      className="transition-all duration-300"
                    />
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2 - 5}
                      textAnchor="middle"
                      className={`text-xs font-medium ${isActive ? 'fill-emerald-500' : 'fill-slate-500'} transition-all duration-300`}
                    >
                      {weight}
                    </text>
                  </g>
                );
              })
            )}

            {/* Draw nodes */}
            {extra.visited.map((visited: boolean, idx: number) => {
              const pos = getNodePosition(idx);
              const isCurrent = step.nodes?.[0] === String(idx);
              const distance = extra.distances?.[idx];

              let nodeStyle = 'fill-slate-300 stroke-slate-400';
              let scale = 1;

              if (isCurrent) {
                nodeStyle = 'fill-emerald-300 stroke-emerald-400';
                scale = 1.1;
              } else if (visited) {
                nodeStyle = 'fill-emerald-300 stroke-emerald-400';
              }

              return (
                <g key={idx} transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}>
                  <circle
                    r="20"
                    className={`${nodeStyle} transition-all duration-300`}
                  />
                  <text
                    textAnchor="middle"
                    dy="5"
                    className="text-sm font-semibold fill-slate-700"
                  >
                    {idx}
                  </text>
                  {distance !== undefined && (
                    <text
                      textAnchor="middle"
                      dy="-28"
                      className="text-xs font-medium fill-cyan-500"
                    >
                      d:{distance === Infinity ? '∞' : distance}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-md px-4 py-2 border border-slate-300">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400"></div>
                <span className="text-slate-700">Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-300 border border-emerald-400"></div>
                <span className="text-slate-700">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-300 border border-emerald-400"></div>
                <span className="text-slate-700">Current</span>
              </div>
              <div className="text-cyan-500 font-medium">d: Distance</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderAStarVisualization(step: Step) {
    const extra = step.extra as { adj?: number[][], weights?: number[][], visited: boolean[], openSet?: number[], gScore?: number[], fScore?: number[] };
    const adj = extra.adj || [];
    const weights = extra.weights || [];
    const nodeCount = extra.visited.length;
    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    const getNodePosition = (index: number) => {
      const angle = (index * 2 * Math.PI) / nodeCount - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    };

    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative">
          <svg width="400" height="400" className="overflow-visible">
            {/* Draw edges with weights */}
            {adj.map((neighbors: number[], fromIdx: number) =>
              neighbors.map((toIdx: number) => {
                const fromPos = getNodePosition(fromIdx);
                const toPos = getNodePosition(toIdx);
                const weight = weights[fromIdx]?.[toIdx] || 1;
                const isActive = step.nodes?.includes(String(fromIdx)) || step.nodes?.includes(String(toIdx));

                return (
                  <g key={`${fromIdx}-${toIdx}`}>
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={isActive ? "#f59e0b" : "#cbd5e1"}
                      strokeWidth={isActive ? "2" : "1"}
                      className="transition-all duration-300"
                    />
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2 - 5}
                      textAnchor="middle"
                      className={`text-xs font-medium ${isActive ? 'fill-yellow-500' : 'fill-slate-500'} transition-all duration-300`}
                    >
                      {weight}
                    </text>
                  </g>
                );
              })
            )}

            {/* Draw nodes */}
            {extra.visited.map((visited: boolean, idx: number) => {
              const pos = getNodePosition(idx);
              const isCurrent = step.nodes?.[0] === String(idx);
              const isInOpenSet = extra.openSet?.includes(idx);
              const gScore = extra.gScore?.[idx];
              const fScore = extra.fScore?.[idx];

              let nodeStyle = 'fill-slate-300 stroke-slate-400';
              let scale = 1;

              if (isCurrent) {
                nodeStyle = 'fill-yellow-300 stroke-yellow-400';
                scale = 1.1;
              } else if (visited) {
                nodeStyle = 'fill-emerald-300 stroke-emerald-400';
              } else if (isInOpenSet) {
                nodeStyle = 'fill-pink-300 stroke-pink-400';
              }

              return (
                <g key={idx} transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}>
                  <circle
                    r="20"
                    className={`${nodeStyle} transition-all duration-300`}
                  />
                  <text
                    textAnchor="middle"
                    dy="5"
                    className="text-sm font-semibold fill-slate-700"
                  >
                    {idx}
                  </text>
                  {gScore !== undefined && (
                    <text
                      textAnchor="middle"
                      dy="-28"
                      className="text-xs font-medium fill-pink-500"
                    >
                      g:{gScore === Infinity ? '∞' : gScore}
                    </text>
                  )}
                  {fScore !== undefined && (
                    <text
                      textAnchor="middle"
                      dy="-16"
                      className="text-xs font-medium fill-yellow-500"
                    >
                      f:{fScore === Infinity ? '∞' : fScore}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-md px-4 py-2 border border-slate-300">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400"></div>
                <span className="text-slate-700">Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-300 border border-pink-400"></div>
                <span className="text-slate-700">Open Set</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-300 border border-emerald-400"></div>
                <span className="text-slate-700">Closed Set</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-300 border border-yellow-400"></div>
                <span className="text-slate-700">Current</span>
              </div>
              <div className="text-pink-500 font-medium">g: Cost</div>
              <div className="text-yellow-500 font-medium">f: Heuristic</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDefaultGraphVisualization(step: Step) {
    const extra = step.extra as { adj?: number[][], weights?: number[][], visited: boolean[], queue?: number[], stack?: number[], openSet?: number[], distances?: number[], gScore?: number[], fScore?: number[], path?: number[] };
    const adj = extra.adj || [];
    const weights = extra.weights || [];
    const nodeCount = extra.visited.length;
    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    const getNodePosition = (index: number) => {
      const angle = (index * 2 * Math.PI) / nodeCount - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    };

    return (
      <div className="relative h-full flex items-center justify-center bg-slate-50">
        <div className="relative">
          <svg width="400" height="400" className="overflow-visible">
            {adj.map((neighbors: number[], fromIdx: number) =>
              neighbors.map((toIdx: number) => {
                const fromPos = getNodePosition(fromIdx);
                const toPos = getNodePosition(toIdx);
                const weight = weights[fromIdx]?.[toIdx] || 1;
                const isActive = step.nodes?.includes(String(fromIdx)) || step.nodes?.includes(String(toIdx));

                return (
                  <g key={`${fromIdx}-${toIdx}`}>
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={isActive ? "#f472b6" : "#cbd5e1"}
                      strokeWidth={isActive ? "2" : "1"}
                      className="transition-all duration-300"
                    />
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2 - 5}
                      textAnchor="middle"
                      className={`text-xs font-medium ${isActive ? 'fill-pink-500' : 'fill-slate-500'} transition-all duration-300`}
                    >
                      {weight}
                    </text>
                  </g>
                );
              })
            )}

            {extra.visited.map((visited: boolean, idx: number) => {
              const pos = getNodePosition(idx);
              const isCurrent = step.nodes?.[0] === String(idx) ||
                               (extra.path && extra.path.includes(idx));
              const isInQueue = extra.queue?.includes(idx);
              const isInStack = extra.stack?.includes(idx);
              const isInOpenSet = extra.openSet?.includes(idx);
              const distance = extra.distances?.[idx];
              const gScore = extra.gScore?.[idx];
              const fScore = step.extra?.fScore?.[idx];

              let nodeStyle = 'fill-blue-300 stroke-blue-400';
              let scale = 1;

              if (isCurrent) {
                nodeStyle = 'fill-rose-300 stroke-rose-400';
                scale = 1.1;
              } else if (visited) {
                nodeStyle = 'fill-emerald-300 stroke-emerald-400';
              } else if (isInQueue || isInStack || isInOpenSet) {
                nodeStyle = 'fill-amber-300 stroke-amber-400';
              }

              return (
                <g key={idx} transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}>
                  <circle
                    r="20"
                    className={`${nodeStyle} transition-all duration-300`}
                  />
                  <text
                    textAnchor="middle"
                    dy="5"
                    className="text-sm font-semibold fill-slate-700"
                  >
                    {idx}
                  </text>
                  {(distance !== undefined || gScore !== undefined) && (
                    <text
                      textAnchor="middle"
                      dy="-28"
                      className="text-xs font-medium fill-slate-600"
                    >
                      {distance !== undefined ? `d:${distance === Infinity ? '∞' : distance}` :
                       gScore !== undefined ? `g:${gScore === Infinity ? '∞' : gScore}` : ''}
                    </text>
                  )}
                  {fScore !== undefined && (
                    <text
                      textAnchor="middle"
                      dy="-16"
                      className="text-xs font-medium fill-slate-500"
                    >
                      f:{fScore === Infinity ? '∞' : fScore}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-md px-4 py-2 border border-slate-300">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-300 border border-blue-400"></div>
                <span className="text-slate-700">Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-300 border border-amber-400"></div>
                <span className="text-slate-700">In Queue/Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-300 border border-emerald-400"></div>
                <span className="text-slate-700">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-300 border border-rose-400"></div>
                <span className="text-slate-700">Current</span>
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

