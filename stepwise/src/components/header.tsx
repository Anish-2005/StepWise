'use client';

import { Zap, Menu, X, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  /** Optional className for additional styling */
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled
          ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700'
          : 'bg-slate-900/80 backdrop-blur-sm'}
        ${className}
      `}
      role="banner"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a
                href="/"
                className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md"
                aria-label="StepWise - Algorithm Visualizer Home"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                    <Zap className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white leading-tight group-hover:text-blue-100 transition-colors duration-200">
                    StepWise
                  </h1>
                  <p className="text-sm text-slate-400 leading-tight group-hover:text-slate-300 transition-colors duration-200">
                    Algorithm Visualizer
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <a
              href="#algorithms"
              className="relative text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md hover:bg-slate-800/50 group"
            >
              Algorithms
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a
              href="#about"
              className="relative text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md hover:bg-slate-800/50 group"
            >
              About
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md hover:bg-slate-800/50 hover:scale-105"
              aria-label="View source code on GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
          </nav>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-slate-800 to-slate-800/80 rounded-md border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-200">
              <div className="relative">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40"></div>
              </div>
              <span className="text-xs font-medium text-slate-300">
                System Ready
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 hover:scale-105"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-gradient-to-b from-slate-800 to-slate-800/95 backdrop-blur-sm border-t border-slate-700/50">
          <a
            href="#algorithms"
            onClick={handleNavClick}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 hover:translate-x-1"
          >
            Algorithms
          </a>
          <a
            href="#about"
            onClick={handleNavClick}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 hover:translate-x-1"
          >
            About
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="flex items-center px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 hover:translate-x-1"
          >
            <Github className="w-5 h-5 mr-2" aria-hidden="true" />
            GitHub
          </a>

          {/* Mobile Status */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-slate-700/50 to-slate-700/30 rounded-md border border-slate-600/30">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40"></div>
                </div>
                <span className="text-sm font-medium text-slate-300">
                  System Ready
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
