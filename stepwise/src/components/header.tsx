'use client';

import { Zap, Cpu, Sparkles, Menu, X, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Algorithms', icon: Cpu },
    { label: 'Visualizer', icon: Sparkles },
    { label: 'Tutorials', icon: Zap },
    { label: 'GitHub', icon: Github, href: 'https://github.com' }
  ];

  return (
    <>
      <header className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'border-b border-primary/20 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5' 
          : 'border-b border-border/40 bg-background/90 backdrop-blur-md'
        }
      `}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300">
                  <Zap className="w-7 h-7 text-white animate-pulse-slow" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    StepWise
                  </h1>
                  <Sparkles className="w-4 h-4 text-accent animate-bounce" />
                </div>
                <p className="text-xs text-foreground/70 flex items-center gap-1">
                  <span className="text-gray-400 font-medium">
                    Interactive Algorithm Visualizer
                  </span>
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  target={item.href ? '_blank' : undefined}
                  rel={item.href ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
                </motion.a>
              ))}
              
              {/* Status Indicator */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              >
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" />
                  <div className="absolute -inset-1 bg-green-500 rounded-full opacity-20 animate-ping" />
                </div>
                <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Live Visualizer
                </span>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-6 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href || '#'}
                    target={item.href ? '_blank' : undefined}
                    rel={item.href ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <div className="text-xs text-foreground/60 mt-0.5">
                        {item.href ? 'External Link' : 'Explore features'}
                      </div>
                    </div>
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                        <div className="absolute -inset-1 bg-green-500 rounded-full opacity-20 animate-ping" />
                      </div>
                      <div>
                        <div className="font-medium">System Active</div>
                        <div className="text-xs text-foreground/60">Visualizer is ready</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      v2.0.1
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}