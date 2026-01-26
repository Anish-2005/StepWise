'use client';

import { Zap, Brain, Cpu, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      
      {/* Subtle algorithm grid */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT: THOUGHT PROCESS ================= */}
          <div className="space-y-10">

            {/* Identity line */}
            <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Interactive Algorithm Visualizer
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Don’t just run algorithms.
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Understand their</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-blue-200/60 -z-0" />
              </span>
              <br />
              decision-making.
            </h1>

            {/* Explanation */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              StepWise lets you observe how algorithms evolve —
              <span className="font-semibold text-slate-900"> comparison by comparison</span>,
              <span className="font-semibold text-slate-900"> node by node</span>,
              and
              <span className="font-semibold text-slate-900"> state by state</span>.
              <br /><br />
              Built to expose the *thinking* behind sorting, graphs, and data structures —
              not just the final output.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-5">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-3 px-7 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                <Play className="w-5 h-5" />
                Visualize Algorithms
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-sm text-slate-500">
                No setup • Runs in browser
              </span>
            </div>
          </div>

          {/* ================= RIGHT: ALGORITHM SNAPSHOT ================= */}
          <div className="relative">

            {/* Floating execution card */}
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-6">

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-slate-700">
                  Bubble Sort — Execution Snapshot
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  Step 4 / 18
                </span>
              </div>

              {/* Array visualization mock */}
              <div className="flex items-end gap-2 h-40 mb-6">
                {[30, 80, 45, 60, 20, 90].map((v, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md ${
                      i === 1 || i === 2
                        ? 'bg-yellow-400'
                        : 'bg-blue-500'
                    }`}
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>

              {/* Step explanation */}
              <div className="space-y-2">
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  Current Operation
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 text-sm font-medium">
                    Comparing
                  </div>
                  <span className="text-sm text-slate-600">
                    Comparing elements at index 1 and 2
                  </span>
                </div>
              </div>
            </div>

            {/* Floating concept labels */}
            <div className="absolute -top-6 -left-6 bg-white px-3 py-2 rounded-lg shadow-md border text-sm font-medium text-slate-700">
              State Transition
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white px-3 py-2 rounded-lg shadow-md border text-sm font-medium text-slate-700">
              Deterministic Step
            </div>
          </div>
        </div>

        {/* ================= BOTTOM SIGNAL STRIP ================= */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Signal
            icon={<Zap className="w-5 h-5" />}
            title="Step-Driven"
            text="Every algorithm is decomposed into explicit execution steps."
          />
          <Signal
            icon={<Brain className="w-5 h-5" />}
            title="Concept-First"
            text="Visual clarity before code complexity."
          />
          <Signal
            icon={<Cpu className="w-5 h-5" />}
            title="Engineer-Built"
            text="Designed for interviews, classrooms, and deep understanding."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- SIGNAL BLOCK ---------------- */

function Signal({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-600 max-w-xs">{text}</p>
    </div>
  );
}
