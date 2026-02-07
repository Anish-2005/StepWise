'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Cpu, Box, Command } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './logo';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-500
        ${scrolled
          ? 'py-3 bg-white/70 dark:bg-slate-950/70 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)]'
          : 'py-6 bg-transparent'}
        backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">

          {/* ================= IDENTITY ================= */}
          <Link
            href="/"
            className="flex items-center gap-4 group transition-transform hover:scale-[1.02]"
          >
            <div className="relative">
              <Logo size="sm" showText={false} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-blue-500/20 rounded-lg scale-150"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                StepWise
              </span>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mt-0.5">
                v2.0 Stable
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <ModeLink label="Algorithms" href="#algorithm-controls" />
            <ModeLink label="Execution" href="#algorithm-controls" />
            <ModeLink label="Documentation" href="#about" />
          </nav>

          {/* ================= ACTIONS ================= */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100/50 dark:border-blue-800/50">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                Runtime Ready
              </span>
              <div className="w-px h-3 bg-slate-300 dark:bg-slate-700 mx-1" />
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 shadow-2xl"
          >
            <div className="p-6 space-y-4">
              <MobileLink label="Algorithms Explorer" href="#algorithm-controls" icon={<Box size={18} />} />
              <MobileLink label="System Settings" href="#algorithm-controls" icon={<Command size={18} />} />
              <MobileLink label="Technical Docs" href="#about" icon={<Cpu size={18} />} />

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-900">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl"
                >
                  <Github size={20} />
                  Star on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ModeLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="px-5 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
    >
      {label}
    </a>
  );
}

function MobileLink({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 font-bold transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
    >
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
        {icon}
      </div>
      {label}
    </a>
  );
}
