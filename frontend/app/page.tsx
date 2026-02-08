"use client";

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { HumanGrid } from '@/components/HumanGrid';
import { Features } from '@/components/Features';
import { Milestones } from '@/components/Milestones';
import { DevLog } from '@/components/DevLog';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsBooted(true), 1200);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!isBooted) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
        <div className={`w-full max-w-lg border-2 p-8 space-y-6 ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span>Kernel_Boot_Sequence</span>
              <span>{Math.min(100, Math.floor(bootProgress))}%</span>
            </div>
            <div className={`w-full h-6 border-2 p-1 ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
              <div
                className={`h-full transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                style={{ width: `${Math.min(100, bootProgress)}%` }}
              />
            </div>
          </div>

          <div className="font-mono text-[10px] space-y-1.5 opacity-80 h-32 overflow-hidden flex flex-col justify-end uppercase">
            <div className="text-emerald-500">&gt; Initializing MCP Protocols... OK</div>
            {bootProgress > 25 && <div>&gt; Syncing Meatspace Asset Database... OK</div>}
            {bootProgress > 45 && <div className="text-sky-500">&gt; Establishing Carbon-Silicon Bridge... ACTIVE</div>}
            {bootProgress > 65 && <div>&gt; Checking bags.fm Token Liquidity... VERIFIED</div>}
            {bootProgress > 85 && <div className="text-amber-500 animate-pulse">&gt; Loading Neural Interface... STANDBY</div>}
            {bootProgress === 100 && <div className="text-emerald-500 font-bold">&gt; System Ready. Welcome, Agent.</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-300 font-mono ${theme === 'dark' ? 'bg-[#0a0a0a] text-[#f0f0f0]' : 'bg-white text-black'}`}>
      <div className="scanline" />

      {/* Global Borders */}
      <div className={`fixed top-0 left-0 w-full h-1.5 z-40 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
      <div className={`fixed bottom-0 left-0 w-full h-1.5 z-40 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
      <div className={`fixed top-0 left-0 h-full w-1.5 z-40 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
      <div className={`fixed top-0 right-0 h-full w-1.5 z-40 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />

      <main className="flex-grow pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
        <Hero theme={theme} onToggleTheme={toggleTheme} />
        <StatsBar theme={theme} />
        <HumanGrid theme={theme} />
        <Features theme={theme} />
        <Milestones theme={theme} />
        <DevLog theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}
