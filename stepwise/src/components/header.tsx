'use client';

import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              StepWise
            </h1>
            <p className="text-xs text-foreground/60">Algorithm Visualizer</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Interactive Learning</span>
        </div>
      </div>
    </header>
  );
}
