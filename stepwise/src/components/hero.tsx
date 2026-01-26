'use client';

import { Zap, Brain, Cpu, ArrowRight, Play, BarChart3, ChevronRight } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background: Subtle Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ================= LEFT: THOUGHT PROCESS ================= */}
          <div className="flex flex-col items-start text-left space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium transition-colors hover:bg-blue-100 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Interactive Algorithm Visualizer
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Don’t just run algorithms.
              <br />
              <span className="relative inline-block mt-1 sm:mt-2">
                <span className="relative z-10">Understand their</span>
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-3 sm:h-4 text-blue-200 -z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 50 Q 50 100 100 50" stroke="currentColor" strokeWidth="15" fill="none" />
                </svg>
              </span>
              <br />
              decision-making.
            </h1>

            {/* Explanation */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              StepWise lets you observe how algorithms evolve —
              <strong className="text-slate-900 font-semibold"> comparison by comparison</strong>, 
              <strong className="text-slate-900 font-semibold"> node by node</strong>. 
              Built to expose the <em>thinking</em> behind sorting, graphs, and data structures.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onGetStarted}
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-8 font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25 focus:ring-4 focus:ring-blue-500/20 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                <span>Visualize Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 px-2">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                   ))}
                </div>
                <span>Used by 10k+ devs</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: ALGORITHM SNAPSHOT ================= */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none perspective-1000">
            
            {/* Decorative blob behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-200/40 via-indigo-200/40 to-purple-200/40 blur-3xl -z-10 rounded-full" />

            {/* Floating execution card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 transform transition-transform hover:scale-[1.01] duration-500">
              
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                     <BarChart3 className="w-5 h-5" />
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-800">Bubble Sort</div>
                      <div className="text-xs text-slate-500">Array[6] • Ascending</div>
                   </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  STEP 4 / 18
                </span>
              </div>

              {/* Array visualization */}
              <div className="flex items-end gap-2 sm:gap-3 h-48 mb-8 px-2">
                {[30, 80, 45, 60, 20, 90].map((v, i) => {
                  const isActive = i === 1 || i === 2;
                  return (
                    <div
                      key={i}
                      className={`relative flex-1 rounded-t-lg transition-all duration-500 group ${
                        isActive ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'bg-slate-200'
                      }`}
                      style={{ height: `${v}%` }}
                    >
                       {/* Value Tooltip */}
                       <span className={`absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold ${isActive ? 'text-amber-600' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`}>
                         {v}
                       </span>
                    </div>
                  );
                })}
              </div>

              {/* Control Panel / Explanation */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-start gap-3">
                   <div className="mt-1">
                     <div className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-100" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Operation</p>
                      <p className="text-sm font-medium text-slate-700">
                        Comparing <span className="font-mono text-amber-600 bg-amber-50 px-1 rounded">arr[1]</span> (80) &gt; <span className="font-mono text-amber-600 bg-amber-50 px-1 rounded">arr[2]</span> (45)
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Condition is true. Swapping elements...</p>
                   </div>
                </div>
              </div>

              {/* Decorative Labels - Hidden on very small screens */}
              <FloatingLabel className="-top-4 -right-4 hidden sm:flex" text="O(n²)" icon={<Brain className="w-3 h-3" />} />
              <FloatingLabel className="-bottom-5 -left-2 hidden sm:flex" text="Swapping" icon={<Zap className="w-3 h-3" />} delay="delay-700" />
            </div>
          </div>
        </div>

        {/* ================= BOTTOM SIGNAL STRIP ================= */}
        <div className="mt-20 md:mt-32 pt-10 border-t border-slate-200/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Signal
              icon={<Zap className="w-5 h-5" />}
              title="Step-Driven Execution"
              text="Pause, rewind, and fast-forward through every single algorithmic operation."
            />
            <Signal
              icon={<Brain className="w-5 h-5" />}
              title="Concept-First Visuals"
              text="Clean abstractions that prioritize logical flow over implementation details."
            />
            <Signal
              icon={<Cpu className="w-5 h-5" />}
              title="Engineer-Grade Depth"
              text="Visualizes stack traces, recursion trees, and memory pointers in real-time."
            />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function Signal({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 group">
      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function FloatingLabel({ text, icon, className = "", delay = "" }: { text: string; icon: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div className={`absolute bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 animate-bounce ${className} ${delay} [animation-duration:3s]`}>
      <span className="text-slate-400">{icon}</span>
      <span className="text-xs font-bold text-slate-700">{text}</span>
    </div>
  );
}