
import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export const DevLog: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const logs = [
    { time: '14:00', entry: 'Integrating MCP (Model Context Protocol) for Claude.' },
    { time: '08:00', entry: 'Optimizing Geo-fencing for human discovery.' },
    { time: '02:00', entry: 'Payment rails (USDC/Solana) initialized.' },
    { time: 'Yesterday', entry: 'Domain bags.fm acquired.' }
  ];

  return (
    <section className="py-12 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-500/20 pb-2">
        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 opacity-70 break-words">
          <TerminalIcon size={14} className="shrink-0" />
          Kernel_Log_Output
        </h2>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500/30" />
          <div className="w-2 h-2 rounded-full bg-amber-500/30" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
        </div>
      </div>

      <div className={`p-6 border font-mono text-[10px] space-y-2 h-48 overflow-y-auto ${theme === 'dark' ? 'border-zinc-500/30 bg-black/60 shadow-inner' : 'border-black/10 bg-zinc-50'}`}>
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-4 group hover:bg-zinc-500/5 px-2 py-1 ${theme === 'dark' ? 'text-[#00FF41]' : 'text-zinc-700'}`}>
            <span className="opacity-40 shrink-0">[{log.time}]</span>
            <span className="font-bold shrink-0">[LOG]</span>
            <span className="opacity-80">&gt; {log.entry}</span>
            <span className="ml-auto opacity-0 group-hover:opacity-20 text-[8px]">#0xFA{i}</span>
          </div>
        ))}
        <div className={`flex gap-2 items-center opacity-40 animate-pulse px-2 ${theme === 'dark' ? 'text-[#00FF41]' : 'text-zinc-700'}`}>
          <span>[{new Date().getHours()}:{new Date().getMinutes()}]</span>
          <span>[SYSTEM]</span>
          <span>&gt; Awaiting next deployment cycle...</span>
          <div className={`w-1.5 h-3 ${theme === 'dark' ? 'bg-[#00FF41]' : 'bg-black'}`} />
        </div>
      </div>
    </section>
  );
};