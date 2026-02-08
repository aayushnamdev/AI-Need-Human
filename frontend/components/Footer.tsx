"use client";

import React from 'react';
import { Github, Twitter, Cpu, ExternalLink } from 'lucide-react';

interface FooterProps {
  theme: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`mt-auto border-t py-12 px-4 md:px-12 ${theme === 'dark' ? 'border-white/10 bg-black' : 'border-black/10 bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 flex items-center justify-center font-bold text-lg border ${theme === 'dark' ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
              H
            </div>
            <span className="font-bold uppercase tracking-tighter">AI Need Human</span>
          </div>
          <p className="text-[10px] font-mono opacity-50 leading-relaxed uppercase">
            The decentralized bridge between autonomous agents and human skillsets. Built for the era of AI-native commerce.
          </p>
          <div className="flex gap-4">
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><Github size={18} /></a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity"><Twitter size={18} /></a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">System_Links</h4>
          <ul className="text-xs font-mono space-y-2 uppercase">
            <li><a href="#" className="hover:underline">Marketplace</a></li>
            <li><a href="#" className="hover:underline">Documentation</a></li>
            <li><a href="#" className="hover:underline">API_Genesis</a></li>
            <li><a href="#" className="hover:underline">MCP_Server</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Protocol_Resources</h4>
          <ul className="text-xs font-mono space-y-2 uppercase">
            <li><a href="#" className="flex items-center gap-1 hover:underline">Whitepaper <ExternalLink size={10} /></a></li>
            <li><a href="#" className="flex items-center gap-1 hover:underline">Audits <ExternalLink size={10} /></a></li>
            <li><a href="#" className="flex items-center gap-1 hover:underline">Status_Page <ExternalLink size={10} /></a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Network_Metrics</h4>
          <div className={`p-4 border font-mono text-[9px] space-y-1 ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
            <div className="flex justify-between">
              <span className="opacity-50">LATENCY:</span>
              <span className="text-emerald-500">22ms</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-50">UPTIME:</span>
              <span className="text-emerald-500">99.98%</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-50">BRANCH:</span>
              <span>v1.0.4-dev</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full mt-12 pt-8 border-t border-zinc-500/10 flex flex-col md:flex-row justify-between gap-4 text-[9px] font-mono opacity-40 uppercase tracking-widest">
        <div>© 2026 AI_NEED_HUMAN_PROTOCOL. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-black dark:hover:text-white">Privacy_Policy</a>
          <a href="#" className="hover:text-black dark:hover:text-white">Terms_of_Service</a>
        </div>
      </div>
    </footer>
  );
};
