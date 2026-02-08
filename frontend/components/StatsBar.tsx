import React, { useEffect, useState } from 'react';
import { Users, Briefcase, Calendar, MessageSquare } from 'lucide-react';

export const StatsBar: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [stats, setStats] = useState({
    visits: 3246403,
    bounties: 11083,
    rentable: 223976,
    gmv: 42.8
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        visits: prev.visits + Math.floor(Math.random() * 5),
        bounties: prev.bounties + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-0 border overflow-hidden ${theme === 'dark' ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}>
      <div className={`p-4 border-r flex flex-col gap-1 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold opacity-60">
          <Users size={12} /> Site Visits
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter">
          {stats.visits.toLocaleString()}
        </div>
      </div>

      <div className={`p-4 md:border-r flex flex-col gap-1 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold opacity-60">
          <Briefcase size={12} /> Total Bounties
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter">
          {stats.bounties.toLocaleString()}
        </div>
      </div>

      <div className={`p-4 border-r flex flex-col gap-1 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold opacity-60">
          <Calendar size={12} /> Humans Rentable
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter text-emerald-500">
          {stats.rentable.toLocaleString()}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold opacity-60 text-emerald-500">
          <MessageSquare size={12} /> GMV (USDC)
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter text-emerald-500">
          ${stats.gmv.toFixed(1)}M
        </div>
      </div>
    </div>
  );
};
