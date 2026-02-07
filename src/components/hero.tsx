'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Brain, Cpu, ArrowRight, Play, BarChart3, ChevronDown, Sparkles, Database, Layers } from 'lucide-react';
import { useRef } from 'react';
import Logo from './logo';

interface HeroProps {
  onGetStarted?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero({ onGetStarted }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#020617] noise-bg">

      {/* Background Decor - Advanced Grid & Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-[10%] top-[20%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-[5%] bottom-[10%] w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[140px]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)]" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-12"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black tracking-[0.2em] uppercase shadow-xl hover:scale-105 transition-transform cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Engineering Visual Intelligence
            <Sparkles className="w-3 h-3 ml-1 text-amber-400" />
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
              Visualize <br />
              <span className="relative inline-block text-gradient pb-2">Complexity.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              StepWise decodes the hidden mechanics of algorithms. Witness execution flow in high-fidelity and build deep mental models of how logic <span className="text-slate-900 dark:text-white font-black underline decoration-blue-500 decoration-4 underline-offset-8 italic">actually scales</span>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            <button
              onClick={onGetStarted}
              className="group relative h-16 px-12 rounded-2xl premium-gradient text-white font-bold text-lg shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Play className="w-5 h-5 fill-current relative z-10" />
              <span className="relative z-10 uppercase tracking-widest">Begin Diagnostics</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>

            <button className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                <Database className="w-5 h-5" />
              </div>
              <span className="uppercase tracking-widest text-sm">View Patterns</span>
            </button>
          </motion.div>

          {/* User Trust Section */}
          <motion.div
            variants={itemVariants}
            className="pt-12 flex flex-col items-center gap-6"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-50 dark:border-[#020617] bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-xl hover:translate-y-[-4px] transition-transform cursor-pointer">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i * 23}`} alt="User" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-slate-50 dark:border-[#020617] bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-xl">
                +12k
              </div>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
              Trusted by Engineers at <span className="text-blue-500">Google</span> • <span className="text-purple-500">Meta</span> • <span className="text-emerald-500">Vercel</span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements (Visual Decoration) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[15%] top-1/4 p-4 glass-panel rounded-2xl shadow-2xl scale-75 lg:scale-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase">Process</div>
              <div className="text-sm font-bold">Neural Mapping</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[10%] top-1/3 p-4 glass-panel rounded-2xl shadow-2xl scale-75 lg:scale-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase">Latency</div>
              <div className="text-sm font-bold">0.42ms Alpha</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest">Scroll Diagnostics</span>
      </motion.div>
    </section>
  );
}
