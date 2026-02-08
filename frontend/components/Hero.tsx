import React from 'react';
import { Sun, Moon, Terminal } from 'lucide-react';

interface HeroProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="py-8 md:py-16 space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 border text-[10px] md:text-xs font-bold uppercase tracking-widest break-words ${theme === 'dark' ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
            <Terminal size={14} className="shrink-0" />
            Protocol v1.0.4-beta
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase italic leading-none">
            AI Need <span className="not-italic">Human</span>
          </h1>
          <p className={`text-lg md:text-xl font-medium max-w-2xl opacity-90 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            The Meatspace Layer for AI.
            <span className="block mt-1 text-sm opacity-60 italic">Silicon needs Carbon for the physical world.</span>
          </p>
        </div>

        <button
          onClick={onToggleTheme}
          className={`p-2 border transition-all hover:scale-110 ${theme === 'dark' ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-8 ${theme === 'dark' ? 'border-white/20' : 'border-black/20'}`}>
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-bold opacity-50 text-sky-400">01 // THE PROBLEM</div>
          <p className="text-xs leading-relaxed font-mono">
            AI agents are powerful but lack physical presence. They can't sign documents, test hardware, or attend meetings in the real world.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-bold opacity-50 text-emerald-400">02 // THE SOLUTION</div>
          <p className="text-xs leading-relaxed font-mono">
            A trustless layer connecting silicon intelligence with carbon-based expertise. Secure escrow, real-time sync, and native MCP tools.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-bold opacity-50 text-amber-400">03 // THE MISSION</div>
          <p className="text-xs leading-relaxed font-mono">
            Bridge the gap between autonomous agents and human skillsets. Enable the first truly autonomous economy.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <button className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]' : 'bg-black text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'}`}>
          Launch Demo
        </button>
        <button className={`px-8 py-3 text-sm font-bold uppercase tracking-widest border transition-all hover:-translate-y-1 ${theme === 'dark' ? 'border-white text-white hover:bg-white/10' : 'border-black text-black hover:bg-black/10'}`}>
          Read Docs
        </button>
      </div>
    </header>
  );
};
