'use client';

import { Zap, Menu, X, Github, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './logo';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700'
          : 'bg-slate-900/85 backdrop-blur-sm'}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">

          {/* ================= ENGINE IDENTITY ================= */}
          <a
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md"
            aria-label="StepWise Home"
          >
            <Logo size="sm" showText={false} />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white tracking-tight">
                  StepWise
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ENGINE
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Algorithm Execution System
              </span>
            </div>
          </a>

          {/* ================= MODE SWITCHER ================= */}
          <nav
            className="hidden md:flex items-center gap-2"
            aria-label="Execution modes"
          >
            <ModeLink label="Algorithms" href="#algorithms" />
            <ModeLink label="Workspace" href="#algorithm-controls" />
            <ModeLink label="Docs" href="#about" />

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="GitHub repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>

          {/* ================= RUNTIME STATUS ================= */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-md bg-slate-800/60 border border-slate-700">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 opacity-40 animate-ping" />
            </div>
            <span className="text-xs font-medium text-slate-300">
              Runtime Ready
            </span>
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE COMMAND PANEL ================= */}
      <div
        className={`md:hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-slate-900 border-t border-slate-700 px-4 py-4 space-y-2">
          <MobileLink label="Algorithms" href="#algorithms" />
          <MobileLink label="Workspace" href="#algorithm-controls" />
          <MobileLink label="Documentation" href="#about" />
          <MobileLink
            label="GitHub"
            href="https://github.com"
            external
          />

          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-slate-300">
                  Runtime Ready
                </span>
              </div>
              <span className="text-xs text-slate-400">
                v2.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================= SUBCOMPONENTS ================= */

function ModeLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
    >
      {label}
    </a>
  );
}

function MobileLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="block px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition"
    >
      {label}
    </a>
  );
}
