import React from 'react';
import { Flag } from 'lucide-react';

export const Milestones: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const roadmap = [
    { week: "D00", title: "Idea Initialized", status: "completed", desc: "Protocol vision document and identity genesis." },
    { week: "D01", title: "Project Bootstrapped", status: "in-progress", desc: "Launch on bags.fm and live sync of early node data." },
    { week: "D03", title: "Human handshake proto", status: "pending", desc: "First autonomous agent-to-human booking bridge." },
    { week: "D07", title: "FULL MARKETPLACE LAUNCH", status: "pending", desc: "Public mainnet and decentralized reputation rollout." },
  ];

  return (
    <section className="py-12 space-y-8">
      <div className="space-y-1 border-l-4 pl-4 border-rose-500">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest flex items-center gap-2 text-rose-500 break-words">
          <Flag size={20} className="shrink-0" />
          Strategic Roadmap Genesis
        </h2>
        <p className="text-[10px] opacity-60 font-mono uppercase">1-Week Sprint distribution and development cycles.</p>
      </div>

      <div className="relative space-y-4">
        <div className={`absolute left-[31px] top-4 bottom-4 w-px border-l border-dashed ${theme === 'dark' ? 'border-white/20' : 'border-black/20'}`} />

        {roadmap.map((item, index) => (
          <div key={index} className="flex gap-6 group">
            <div className={`relative z-10 w-16 h-16 shrink-0 flex items-center justify-center border font-mono text-xs font-bold transition-all ${item.status === 'completed' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' :
              item.status === 'in-progress' ? 'border-amber-500 text-amber-500 bg-amber-500/5 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.2)]' :
                'border-zinc-500/30 text-zinc-500'
              }`}>
              {item.week}
            </div>

            <div className={`p-4 border grow flex flex-col justify-center transition-all ${theme === 'dark' ? 'border-white/5 bg-white/5 group-hover:bg-white/10' : 'border-black/5 bg-black/5 group-hover:bg-black/10'}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-sm font-bold uppercase ${item.status === 'completed' ? 'line-through opacity-50' : ''}`}>
                  {item.title}
                </h3>
                <span className={`text-[8px] font-bold uppercase border px-1 ${item.status === 'completed' ? 'border-emerald-500/30 text-emerald-500' :
                  item.status === 'in-progress' ? 'border-amber-500/30 text-amber-500' :
                    'border-zinc-500/30 text-zinc-500'
                  }`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-[10px] opacity-60 font-mono leading-relaxed max-w-2xl uppercase">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 p-4 border text-[9px] uppercase font-mono text-center ${theme === 'dark' ? 'bg-white/5 border-white/20 opacity-40' : 'bg-black/5 border-black/20 opacity-40'}`}>
        System kernel synchronizes with live updates on <span className="underline">bags.fm</span> every 6 hours.
      </div>
    </section>
  );
};
