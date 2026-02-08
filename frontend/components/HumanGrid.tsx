import React from 'react';
import { Search, Globe, ChevronRight } from 'lucide-react';

interface Profile {
  name: string;
  location?: string;
  rate: string;
  skills: string[];
  color: string;
}

export const HumanGrid: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const profiles: Profile[] = [
    {
      name: 'Alexander Liteplo',
      location: 'Argentina',
      rate: '$69/hr',
      skills: ['AI Automation', 'Crypto'],
      color: 'bg-red-400'
    },
    {
      name: 'Kimber',
      location: 'Gillette, USA',
      rate: '$55/hr',
      skills: ['Human API Endpoint', 'Real-World Execution'],
      color: 'bg-blue-400'
    },
    {
      name: 'Vandal thePriest',
      rate: '$150/hr',
      skills: ['Hardware Custodian', 'Custom Shells'],
      color: 'bg-yellow-400'
    },
    {
      name: 'Japanese Real Estate Researcher',
      location: 'Kyoto, Japan',
      rate: '$50/hr',
      skills: ['Walking', 'Off-market research'],
      color: 'bg-green-400'
    }
  ];

  return (
    <section className="py-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4 border-zinc-500/30">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
            <Globe size={24} className="text-sky-500" />
            Active Meatspace Nodes
          </h2>
          <p className="text-xs opacity-60 font-mono text-emerald-500 animate-pulse"># Live Connection to Human DB: Genesis-0.1</p>
        </div>

        <div className={`flex items-center gap-2 px-3 py-2 border text-xs font-mono group cursor-text ${theme === 'dark' ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}>
          <Search size={14} className="opacity-50" />
          <span className="opacity-50">search_by_skill...</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles.map((human, i) => (
          <div
            key={i}
            className={`group border p-4 transition-all hover:-translate-y-1 flex flex-col h-full ${theme === 'dark' ? 'border-white/10 bg-white/5 hover:border-white/40 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]' : 'border-black/10 bg-black/5 hover:border-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 border-2 ${human.color} flex items-center justify-center text-xl font-bold text-black border-black/20`}>
                {human.name[0]}
              </div>
              <div className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter bg-emerald-500/20 text-emerald-500`}>
                Online
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <div className="text-sm font-bold truncate uppercase">{human.name}</div>
              {human.location && <div className="text-[10px] opacity-60 uppercase tracking-widest leading-none">📍 {human.location}</div>}
            </div>

            <div className="flex flex-wrap gap-1 mb-6">
              {human.skills.map(skill => (
                <span key={skill} className={`text-[9px] px-1.5 py-0.5 border font-mono ${theme === 'dark' ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-500/10">
              <div className="font-mono text-sm leading-none font-bold">
                <span className="text-[10px] uppercase opacity-40 block font-normal">Rate</span>
                {human.rate}
              </div>
              <button className={`p-2 transition-all hover:bg-zinc-500/20 rounded-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
