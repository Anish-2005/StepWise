'use client';

import { Zap, Cpu, Sparkles, Menu, X, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <>
      <header
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-[#0B0F1A]/85 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'}
        `}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">

            {/* ================= LOGO ================= */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 cursor-pointer select-none"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.45)]">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-indigo-500/30 blur-md opacity-40" />
              </div>

              <div>
                <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    StepWise
                  </span>
                </h1>
                <p className="text-xs text-slate-400 tracking-wide">
                  Algorithm Execution Engine
                </p>
              </div>
            </motion.div>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden lg:flex items-center gap-6">
             

              {/* STATUS */}
              <div className="ml-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Engine Online
                </span>
              </div>
            </nav>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-[#0B0F1A]/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-6 py-6 space-y-4">
               

                {/* Mobile status */}
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        System Active
                      </p>
                      <p className="text-xs text-slate-400">
                        Visualizer ready
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    v2.0
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
