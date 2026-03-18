"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const components = [
  {
    label: "MCP",
    desc: "외부 도구 연결",
    icon: "🔌",
    color: "border-[#38BDF8]/30",
    textColor: "text-[#7DD3FC]",
  },
  {
    label: "Skills",
    desc: "AI 업무 매뉴얼",
    icon: "📖",
    color: "border-[#7B61FF]/30",
    textColor: "text-[#A78BFA]",
  },
  {
    label: "Subagents",
    desc: "일을 나눠주는 AI",
    icon: "🤖",
    color: "border-emerald-500/30",
    textColor: "text-emerald-400",
  },
];

export default function WhatIsAgentSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        이것이 <span className="text-[#a855f7]">Agent</span>다
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="flex flex-col items-center gap-6">
        {/* Three components converging */}
        <div className="flex items-end gap-4 sm:gap-6">
          {components.map((comp) => (
            <div
              key={comp.label}
              className={`bg-gray-800/50 border ${comp.color} rounded-xl p-4 text-center w-40`}
            >
              <span className="text-2xl block mb-2">{comp.icon}</span>
              <div className={`text-sm font-bold ${comp.textColor} mb-1`}>
                {comp.label}
              </div>
              <div className="text-xs text-gray-500">{comp.desc}</div>
            </div>
          ))}
        </div>

        {/* Convergence arrow */}
        <svg width="200" height="32" viewBox="0 0 200 32" fill="none">
          <path d="M30 0 L100 24" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M100 0 L100 24" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M170 0 L100 24" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="100" cy="28" r="4" fill="#a855f7" />
        </svg>

        {/* Agent result */}
        <div
          className="bg-gray-800/60 border border-[#a855f7]/40 rounded-xl px-8 py-5 text-center"
          style={{ boxShadow: "0 0 30px rgba(168,85,247,0.15)" }}
        >
          <div className="text-lg font-bold text-[#a855f7] mb-2">
            Agent = MCP + Skills + Subagents
          </div>
          <div className="text-sm text-gray-400">
            이 세 가지를 결합한 것이 에이전트
          </div>
        </div>

        {/* AGENT.md mention */}
        <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg px-5 py-3">
          <p className="text-sm text-gray-400">
            <span className="font-mono text-[#38BDF8]">AGENT.md</span>{" "}
            — Claude Code에서 에이전트에게 지시를 내리는 파일
          </p>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
