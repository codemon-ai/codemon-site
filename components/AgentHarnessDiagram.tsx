'use client';

import React from 'react';

export default function AgentHarnessDiagram() {
  return (
    <div className="w-full my-10 p-6 md:p-8 bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans text-slate-200">
      
      {/* Title & User Trigger */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-slate-800/80 border border-slate-600 px-5 py-2 rounded-full flex items-center gap-2 mb-4 z-10 shadow-lg">
          <span className="text-xl">👤</span>
          <span className="font-bold tracking-wide text-sm">User / Trigger</span>
        </div>
        
        {/* Arrow Down */}
        <div className="flex flex-col items-center">
          <div className="h-8 w-0.5 bg-blue-500/50"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500/50"></div>
          <span className="text-xs text-blue-400 mt-1 mb-2 font-mono bg-[#0a0f1a] px-2 relative -top-6">Task Request</span>
        </div>
      </div>

      {/* Main Harness Box */}
      <div className="relative border-2 border-sky-500/30 rounded-xl p-4 md:p-6 bg-slate-900/30 backdrop-blur-sm">
        <div className="absolute -top-3 left-6 bg-[#0a0f1a] px-3 flex items-center gap-2">
          <span>🛡️</span>
          <span className="font-bold text-sky-400 text-sm tracking-wider">Agent Harness (에이전트 구동 환경)</span>
        </div>

        {/* Orchestrator */}
        <div className="flex justify-center mb-10 mt-4">
          <div className="bg-indigo-900/40 border border-indigo-500/50 rounded-xl p-4 w-full md:w-2/3 shadow-lg shadow-indigo-900/20 text-center relative z-10">
            <h3 className="font-bold text-indigo-300 text-lg mb-1 flex items-center justify-center gap-2">
              <span>🧠</span> Orchestrator (오케스트레이터)
            </h3>
            <p className="text-xs text-indigo-200/70 font-mono">ReAct Loop, Routing, Self-Correction</p>
          </div>
        </div>

        {/* Arrows connecting Orchestrator to components */}
        <div className="absolute top-[160px] left-1/4 w-0.5 h-12 bg-indigo-500/40 hidden md:block"></div>
        <div className="absolute top-[160px] left-1/2 w-0.5 h-12 bg-indigo-500/40 hidden md:block"></div>
        <div className="absolute top-[160px] left-3/4 w-0.5 h-12 bg-indigo-500/40 hidden md:block"></div>

        <div className="flex flex-col md:flex-row gap-6 justify-between relative">
          
          {/* Core LLM */}
          <div className="flex-1 flex flex-col items-center">
            <div className="text-xs text-indigo-400 font-mono mb-2 md:mt-0 mt-4 text-center">Prompt & Routing ↕</div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-4 border-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.4)] flex flex-col items-center justify-center text-center p-2 relative z-10">
              <span className="text-2xl mb-1">🤖</span>
              <span className="font-bold text-white text-sm leading-tight">Core LLM</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center bg-slate-800/50 px-3 py-1 rounded-full">(Claude 3.5, Gemini 3.1)</p>
            
            {/* Self Reflection loop arrow (SVG) */}
            <svg className="absolute -left-4 bottom-10 w-24 h-32 hidden lg:block" fill="none" viewBox="0 0 100 100">
              <path d="M 50,20 C 10,20 10,80 50,80" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)"/>
              <text x="5" y="95" fill="rgba(167, 139, 250, 0.6)" fontSize="10" fontFamily="monospace">Reasoning Loop</text>
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="rgba(167, 139, 250, 0.4)" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* State & Memory */}
          <div className="flex-1 flex flex-col items-center relative">
            <div className="text-xs text-indigo-400 font-mono mb-2 md:mt-0 mt-6 text-center">Read/Write State ↕</div>
            <div className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl p-4 relative z-10">
              <div className="absolute -top-3 left-4 bg-[#0a0f1a] px-2 flex items-center gap-1">
                <span className="text-xs">🗂️</span>
                <span className="font-bold text-slate-300 text-xs">State & Memory</span>
              </div>
              
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 mb-3 mt-2 hover:border-sky-500/50 transition-colors">
                <div className="font-bold text-sm text-slate-200 flex items-center gap-2"><span>📄</span> Progress File</div>
                <div className="text-[11px] text-slate-400 mt-1 pl-6">todo.md, 작업일지 (영속성)</div>
              </div>
              
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 hover:border-emerald-500/50 transition-colors">
                <div className="font-bold text-sm text-slate-200 flex items-center gap-2"><span>📚</span> Context Augmentation</div>
                <div className="text-[11px] text-slate-400 mt-1 pl-6">과거 세션 기록, RAG</div>
              </div>
            </div>
          </div>

          {/* Execution Environment */}
          <div className="flex-1 flex flex-col items-center relative">
            <div className="text-xs text-indigo-400 font-mono mb-2 md:mt-0 mt-6 text-center">Tool Call & Result ↕</div>
            <div className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl p-4 relative z-10">
              <div className="absolute -top-3 left-4 bg-[#0a0f1a] px-2 flex items-center gap-1">
                <span className="text-xs">⚡</span>
                <span className="font-bold text-slate-300 text-xs">Execution Env.</span>
              </div>
              
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 mb-3 mt-2 hover:border-amber-500/50 transition-colors">
                <div className="font-bold text-sm text-slate-200 flex items-center gap-2"><span>🔨</span> Tool/Skill Registry</div>
                <div className="text-[11px] text-slate-400 mt-1 pl-6">MCP, API, Script (무기고)</div>
              </div>
              
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 hover:border-rose-500/50 transition-colors">
                <div className="font-bold text-sm text-slate-200 flex items-center gap-2"><span>💻</span> Bash / File System</div>
                <div className="text-[11px] text-slate-400 mt-1 pl-6">격리된 샌드박스</div>
              </div>
            </div>
            
            {/* Output Arrow pointing right (desktop) or down (mobile) */}
            <div className="hidden lg:flex absolute top-1/2 -right-8 items-center z-0">
              <div className="w-16 h-0.5 bg-emerald-500/60"></div>
              <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-emerald-500/60"></div>
            </div>
            <div className="lg:hidden flex flex-col items-center mt-2 z-0">
              <div className="h-6 w-0.5 bg-emerald-500/60"></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-emerald-500/60"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Final Output */}
      <div className="flex justify-end lg:-mt-32 mt-2">
        <div className="bg-emerald-900/30 border-2 border-emerald-500/50 px-6 py-4 rounded-xl flex flex-col items-center gap-1 shadow-[0_0_20px_rgba(16,185,129,0.15)] relative z-20">
          <span className="text-xs text-emerald-400 font-mono mb-1">Action (Code)</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-emerald-100">Final Result</span>
          </div>
        </div>
      </div>

    </div>
  );
}
