'use client';

import React from 'react';

export default function PerplexityVsOpenClawTable() {
  return (
    <div className="w-full my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a] shadow-2xl font-sans text-slate-200">
      
      <div className="bg-slate-800/80 px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 m-0">
          <span>⚔️</span> Architecture & Feature Comparison
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-900/50 border-b border-white/10 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-semibold w-1/4">비교 항목</th>
              <th className="px-6 py-4 font-bold text-sky-400 w-3/8">Perplexity Computer</th>
              <th className="px-6 py-4 font-bold text-emerald-400 w-3/8">OpenClaw (Local Harness)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-slate-300">구동 환경</td>
              <td className="px-6 py-4 text-slate-400">클라우드 (Cloud SaaS)</td>
              <td className="px-6 py-4 text-emerald-300/90 font-mono text-xs bg-emerald-900/20 rounded-md inline-block mt-2 mb-2 ml-6">Local Machine (Mac Mini)</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-slate-300">멀티 에이전트 생성</td>
              <td className="px-6 py-4 text-slate-400">자체 오케스트레이터가 자동 생성</td>
              <td className="px-6 py-4 text-emerald-300/90"><code className="px-1.5 py-0.5 bg-black/30 rounded text-xs">sessions_spawn</code> (Subagents)</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-slate-300">비동기 백그라운드</td>
              <td className="px-6 py-4 text-slate-400">지원 (Condition-based triggers)</td>
              <td className="px-6 py-4 text-emerald-300/90"><code className="px-1.5 py-0.5 bg-black/30 rounded text-xs">cron</code> &amp; <code className="px-1.5 py-0.5 bg-black/30 rounded text-xs">heartbeat</code></td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-slate-300">사용 언어 모델</td>
              <td className="px-6 py-4 text-slate-400">자체 앙상블 (최대 19개 조합)</td>
              <td className="px-6 py-4 text-emerald-300/90">사용자 선택 (Gemini, Opus 등 무제한)</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-slate-300">확장성 (Tools)</td>
              <td className="px-6 py-4 text-slate-400">플랫폼이 제공하는 연동 서비스 한정</td>
              <td className="px-6 py-4 text-emerald-300/90">로컬 스크립트, Bash, MCP 완전 개방</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-slate-300">데이터 프라이버시</td>
              <td className="px-6 py-4 text-slate-400">클라우드 전송 및 서버 저장</td>
              <td className="px-6 py-4 text-emerald-300/90 font-bold">로컬 샌드박스 (Obsidian/JSONL) 보관</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors bg-slate-900/30">
              <td className="px-6 py-4 font-bold text-slate-200">유지 비용</td>
              <td className="px-6 py-4 font-bold text-rose-400">$200 / 월 (Max 플랜 고정)</td>
              <td className="px-6 py-4 font-bold text-emerald-400">API 종량제 (월 $5~$15 수준)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
