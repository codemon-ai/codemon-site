"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const codeLines = [
  { text: 'import { Agent } from "@anthropic-ai/agent-sdk";', color: "text-[#7DD3FC]" },
  { text: "", color: "" },
  { text: 'const agent = new Agent({ model: "claude-sonnet-4-6" });', color: "text-gray-300" },
  { text: 'await agent.run("프로젝트 구조 분석 후 보고서 작성");', color: "text-gray-300" },
];

const features = [
  "Python / TypeScript",
  "프로그래밍 방식 에이전트 파이프라인 구성",
];

export default function AgentSDKSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] text-[#7DD3FC] bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-full px-3 py-1 font-medium">
          개발자 한정 딥다이브
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Agent SDK <span className="text-base font-normal text-gray-400">(개발자 대상)</span>
      </h2>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        {/* Terminal-style code box */}
        <div className="rounded-xl overflow-hidden border border-gray-700/60 max-w-2xl mx-auto w-full">
          {/* Terminal header */}
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5 border-b border-gray-700/50">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-xs text-gray-500 ml-2 font-mono">agent.ts</span>
          </div>

          {/* Code content */}
          <div className="bg-gray-900/80 px-5 py-5 font-mono text-xs sm:text-sm leading-relaxed">
            {codeLines.map((line, i) => (
              <div key={i} className={`${line.color} ${line.text === "" ? "h-4" : ""}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4">
          {features.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 bg-gray-800/40 border border-[#7B61FF]/20 rounded-lg px-4 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]" />
              <span className="text-xs sm:text-sm text-gray-300">{f}</span>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-400 bg-gray-800/30 rounded-lg px-5 py-3 inline-block border border-[#38BDF8]/15">
            클라이언트별 맞춤 워크플로우 자동화의{" "}
            <span className="text-[#A78BFA] font-semibold">핵심</span>
          </p>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
