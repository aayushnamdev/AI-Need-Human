import React from 'react';
import { Cpu, Lock, Zap, ShieldCheck } from 'lucide-react';
import { SplineScene } from './SplineScene';

export const Features: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const tasks = [
    { label: 'Hardware Deliveries', desc: 'Secure transport of GPU units to Tier-3 data centers.' },
    { label: 'Carbon-based Proxy', desc: 'Human attendance for real-world legal and physical handshakes.' },
    { label: 'Physical Verification', desc: 'On-site proof of physical asset existence for AI audits.' },
    { label: 'Hardware Reboots', desc: 'Emergency physical intervention for remote server clusters.' },
  ];

  return (
    <section className="py-12 space-y-8">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="space-y-6 flex-1">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] italic">
            Robots Need <br /><span className="not-italic text-rose-500">Your Body.</span>
          </h2>
          <p className="text-lg leading-relaxed opacity-90 font-mono">
            AI can't touch grass. <span className="underline decoration-wavy underline-offset-4 decoration-rose-500/50">You can.</span> <br />
            Get paid when agents need a physical proxy in the real world.
          </p>
          <button className={`w-full md:w-auto px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:-translate-y-1 break-words ${theme === 'dark' ? 'bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]' : 'bg-black text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'}`}>
            Register_Human_Spec
          </button>
        </div>

        {/* 3D Scene Integration */}
        <div className="flex-1 w-full h-[400px] relative border-2 border-zinc-500/20 overflow-hidden">
          <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-rose-500 text-[8px] font-bold text-white uppercase tracking-tighter">
            LIVE_RENDER_ACTIVE
          </div>
          <SplineScene
            scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        <div className={`flex-1 grid grid-cols-1 gap-4 p-6 border-2 transition-colors ${theme === 'dark' ? 'bg-white/5 border-white' : 'bg-zinc-50 border-black'}`}>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-60 break-words">Meatspace_Tasks [PRIORITY_QUEUE]</h3>
          {tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-4 group p-2 border border-transparent hover:border-zinc-500/20 transition-all">
              <div className="p-2 border border-zinc-500/30 shrink-0">
                {i === 0 ? <Zap size={16} className="text-amber-500" /> :
                  i === 1 ? <ShieldCheck size={16} className="text-sky-500" /> :
                    i === 2 ? <Lock size={16} className="text-emerald-500" /> :
                      <Cpu size={16} className="text-purple-500" />}
              </div>
              <div>
                <div className="font-bold text-xs uppercase tracking-wider">{task.label}</div>
                <div className="text-[10px] opacity-70 font-mono">{task.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
