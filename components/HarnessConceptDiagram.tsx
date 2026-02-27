'use client';

import React from 'react';

export default function HarnessConceptDiagram() {
  return (
    <div className="w-full my-12 p-6 md:p-8 bg-[#0a0f1a]/80 rounded-2xl border border-white/5 shadow-2xl font-sans">
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Anti-Pattern: Complex Pipeline */}
        <div className="flex-1 bg-red-950/20 border border-red-500/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
          <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">❌</span> Anti-Pattern: 복잡한 도구 체인
          </h3>
          
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 opacity-60">LLM Engine</div>
            <div className="flex justify-center text-red-500/50">↓</div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 opacity-60">Custom Parser Plugin</div>
            <div className="flex justify-center text-red-500/50">↓</div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 opacity-60">Strict JSON Validator</div>
            <div className="flex justify-center text-red-500/50">↓</div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 opacity-60">Complex Workflow UI</div>
          </div>
          
          <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-500/20 text-xs text-red-300/80">
            <p>과도한 래핑과 엄격한 제약이 오히려 프론티어 모델의 추론 능력을 억압합니다.</p>
          </div>
        </div>

        {/* Best Practice: Strip it down & Progress File */}
        <div className="flex-[1.5] bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/70"></div>
          <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">✅</span> Best Practice: 심플 하네스
          </h3>

          <div className="flex items-center gap-4 h-48 relative">
            
            {/* LLM */}
            <div className="w-1/3 h-full bg-slate-800 p-4 rounded-xl border-2 border-emerald-500/40 flex flex-col items-center justify-center relative z-10 shadow-lg">
              <span className="text-3xl mb-2">🤖</span>
              <span className="font-bold text-white text-center leading-tight">Frontier<br/>LLM</span>
            </div>

            {/* Loop Arrow */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1/2 h-8 border-t-2 border-b-2 border-emerald-500/50 flex items-center justify-center">
               <span className="bg-[#0a0f1a] px-2 text-[10px] text-emerald-400 font-mono">Read / Write</span>
            </div>

            <div className="w-2/3 h-full flex flex-col gap-3 relative z-10 pl-6">
              
              {/* 1. Strip it down (Terminal) */}
              <div className="flex-1 bg-[#1e1e1e] rounded-xl border border-slate-600 p-3 flex flex-col relative overflow-hidden group hover:border-emerald-400/50 transition-colors">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-[10px] font-mono text-slate-400 ml-2">Bash Terminal</span>
                </div>
                <div className="font-mono text-[11px] text-emerald-400">
                  <p>$ ls -la src/</p>
                  <p className="text-slate-300">app/ components/ lib/</p>
                </div>
                <div className="absolute -right-2 -bottom-2 text-4xl opacity-10">💻</div>
              </div>

              {/* 2. Progress File */}
              <div className="flex-1 bg-slate-800 rounded-xl border border-sky-500/30 p-3 flex flex-col relative overflow-hidden group hover:border-sky-400/80 transition-colors">
                 <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">📄</span>
                  <span className="text-xs font-bold text-sky-300 font-mono">progress.md</span>
                </div>
                <div className="text-[10px] text-slate-300 pl-4 border-l-2 border-sky-500/30 ml-1">
                  <p className="line-through opacity-50">- [x] Setup API routes</p>
                  <p className="text-sky-200">- [ ] Refactor harness UI</p>
                  <p className="opacity-50">- [ ] Write tests</p>
                </div>
                <div className="absolute -right-2 -bottom-2 text-4xl opacity-10">🗂️</div>
              </div>

            </div>
          </div>
          
          <div className="mt-5 text-xs text-emerald-100/70 leading-relaxed">
            <span className="text-emerald-400 font-bold">1. 도구 다이어트:</span> LLM에게 불필요한 제약을 없애고 Raw Terminal을 줍니다.<br/>
            <span className="text-sky-400 font-bold">2. 상태 영속화:</span> 휘발성 메모리 대신 <code className="bg-black/30 px-1 py-0.5 rounded text-sky-300">MD 파일</code>에 진행 상황을 기록해 길을 잃지 않게 묶어둡니다.
          </div>
        </div>

      </div>
    </div>
  );
}
