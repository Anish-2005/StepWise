'use client';

import { motion } from 'framer-motion';
import { Zap, Brain, Cpu, ArrowRight, Play, BarChart3, ChevronDown } from 'lucide-react';
import Logo from './logo';

interface HeroProps {
  onGetStarted?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#020617] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute right-0 top-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >

          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start text-left space-y-8">
            <motion.div variants={itemVariants}>
              <Logo size="lg" className="mb-2" />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-blue-100/50 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-semibold shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Next-Gen Algorithm Visualizer
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight"
            >
              Master Complexity <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-gradient">Through Clarity</span>
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  className="absolute -bottom-2 left-0 w-full h-4 text-blue-300/50 -z-0" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="10" fill="none" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
            >
              Visualize the hidden logic of data structures and algorithms. 
              Observe execution flow in high-fidelity and build deep mental models 
              of how code <span className="font-bold text-slate-900 dark:text-white underline decoration-blue-500 decoration-2 underline-offset-4">actually thinks</span>.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <button
                onClick={onGetStarted}
                className="group relative h-14 items-center justify-center gap-3 overflow-hidden rounded-2xl premium-gradient px-10 font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto flex"
              >
                <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
                <span>Start Visualizing</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-md">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                     </div>
                   ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white font-bold leading-tight">10k+ Engineers</span>
                  <span className="text-xs">Learning with StepWise</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT: INTERACTIVE PREVIEW ================= */}
          <motion.div 
             variants={itemVariants}
             className="relative"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10 rounded-full" />

            <div className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl text-blue-600 dark:text-blue-400 shadow-sm">
                     <BarChart3 className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">Merge Sort</div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Execution Core • v2.0</div>
                   </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold tracking-tight shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  LIVE STEP
                </motion.div>
              </div>

              {/* Visualization Mock */}
              <div className="flex items-end gap-3 h-56 mb-10 px-4">
                {[40, 75, 45, 90, 30, 60, 25, 80].map((v, i) => {
                  const isActive = i === 3 || i === 4;
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${v}%` }}
                      transition={{ duration: 1, delay: 1.5 + (i * 0.1), ease: "easeOut" }}
                      className={`relative flex-1 rounded-t-xl transition-all duration-500 ${
                        isActive 
                          ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                          : 'bg-slate-200 dark:bg-slate-700/50'
                      }`}
                    >
                       {isActive && (
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                           SWAP
                         </div>
                       )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Details Overlay */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-inner">
                <div className="flex items-start gap-4">
                   <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                     <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Recursion Depth</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Splitting subarray <span className="text-blue-500">[0...3]</span> into atomic nodes...
                      </p>
                   </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">O(n log n)</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard 
            icon={<Zap />} 
            title="Instant Feedback" 
            desc="Control execution speed and step through logic with millimeter precision."
            color="blue"
          />
          <FeatureCard 
            icon={<Brain />} 
            title="Mental Models" 
            desc="Rich visual abstractions designed by engineers, for engineers."
            color="purple"
          />
          <FeatureCard 
            icon={<Cpu />} 
            title="Core Algorithms" 
            desc="From basic sorting to complex graph traversals and forest structures."
            color="indigo"
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Explore Workspace</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    purple: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
    indigo: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
  };

  return (
    <div className="glass-card p-8 rounded-3xl hover:scale-[1.03] transition-all duration-300 group cursor-default">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-black/5 dark:border-white/5 transition-transform group-hover:rotate-12 ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
