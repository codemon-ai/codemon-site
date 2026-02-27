'use client';

import React from 'react';

export default function ClaudeUpdateImpactDiagram() {
  return (
    <div className="w-full my-12 p-6 md:p-8 bg-[#0a0f1a]/90 rounded-2xl border border-white/5 shadow-2xl font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-amber-500/10 blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-8 relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent">
          Claude Code 2.1.59 Impact Architecture
        </h3>
        <p className="text-xs text-slate-400 mt-2 font-mono">Evolution from Stateless Chat to Stateful Swarm</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
        
        {/* Before (Stateless) */}
        <div className="flex-1 w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-5 flex flex-col items-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Before (v2.1.50)</div>
          
          <div className="flex flex-col gap-3 w-full">
            <div className="bg-slate-800/80 border border-red-900/30 p-3 rounded-lg text-center opacity-70">
              <span className="text-xl block mb-1">🤖</span>
              <span className="text-xs text-slate-300">Single Instance</span>
            </div>
            
            <div className="flex justify-center text-slate-600">↓</div>
            
            <div className="bg-slate-800/80 border border-red-900/30 p-3 rounded-lg text-center opacity-70 border-dashed">
              <span className="text-sm block mb-1 text-slate-500">❌ Context Lost on Exit</span>
            </div>
            
            <div className="flex justify-center text-slate-600">↓</div>
            
            <div className="bg-slate-800/80 border border-red-900/30 p-3 rounded-lg text-center opacity-70">
              <span className="text-xs text-slate-400 block mb-1">Manual Repo Prompting</span>
              <span className="text-[10px] text-slate-500">"We use Next.js..."</span>
            </div>
          </div>
        </div>

        {/* Arrow Right */}
        <div className="hidden lg:flex text-3xl text-amber-500/50">➔</div>
        <div className="lg:hidden text-3xl text-amber-500/50">⬇</div>

        {/* After (Stateful Swarm) */}
        <div className="flex-[1.5] w-full bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 relative shadow-[0_0_30px_rgba(245,158,11,0.05)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-6 text-center">After (v2.1.59)</div>

          {/* Core Auto-Memory */}
          <div className="mb-6 flex justify-center">
             <div className="bg-[#0f172a] border-2 border-amber-500/40 rounded-full px-6 py-3 flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <span className="text-2xl">🧠</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-amber-100">Auto-Memory Layer</div>
                  <div className="text-[10px] text-amber-400/70 font-mono">Persistent State & Preferences</div>
                </div>
             </div>
          </div>

          {/* Multiple Agents reading from memory */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="w-0.5 h-6 bg-amber-500/30"></div>
            <div className="w-0.5 h-6 bg-amber-500/30"></div>
            <div className="w-0.5 h-6 bg-amber-500/30"></div>
          </div>

          <div className="flex gap-3 justify-between">
            <div className="flex-1 bg-slate-800 border border-emerald-500/30 rounded-lg p-3 text-center hover:border-emerald-400 transition-colors">
              <span className="text-xl block mb-1">🤖</span>
              <span className="text-[11px] font-bold text-slate-200">Coder Agent</span>
            </div>
            <div className="flex-1 bg-slate-800 border border-sky-500/30 rounded-lg p-3 text-center hover:border-sky-400 transition-colors">
              <span className="text-xl block mb-1">🤖</span>
              <span className="text-[11px] font-bold text-slate-200">Review Agent</span>
            </div>
            <div className="flex-1 bg-slate-800 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-400 transition-colors">
              <span className="text-xl block mb-1">🤖</span>
              <span className="text-[11px] font-bold text-slate-200">Test Agent</span>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-[#0a0f1a] rounded-lg border border-white/5 text-[11px] text-slate-400 text-center flex flex-col gap-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-emerald-400">✓</span> <span>OAuth 충돌 없음</span>
            </div>
            <div className="flex items-center justify-center gap-2">
               <span className="text-emerald-400">✓</span> <span>메모리 누수 해제</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
