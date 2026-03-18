"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const children = [
  { name: "general-purpose", desc: "범용 작업 처리" },
  { name: "Explore", desc: "코드베이스 탐색" },
  { name: "Plan", desc: "계획 수립 및 분석" },
  { name: "code-reviewer", desc: "코드 리뷰 전문" },
];

export default function SubagentsSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        서브에이전트 &mdash; 일을 나눠주는 AI
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="flex flex-col items-center gap-8">
        {/* Tree structure */}
        <div className="flex flex-col items-center gap-3">
          {/* Root node */}
          <div
            className="bg-gray-800/80 border border-[#7B61FF]/50 rounded-xl px-8 py-4 text-center"
            style={{ boxShadow: "0 0 24px rgba(123,97,255,0.2)" }}
          >
            <span className="text-lg font-bold text-white">메인 에이전트</span>
          </div>

          {/* Connector lines (SVG) */}
          <svg width="500" height="40" viewBox="0 0 500 40" fill="none" className="flex-shrink-0">
            {/* Vertical from root */}
            <line x1="250" y1="0" x2="250" y2="16" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="2" />
            {/* Horizontal bar */}
            <line x1="62" y1="16" x2="438" y2="16" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="2" />
            {/* Verticals down to children */}
            {[62, 187, 313, 438].map((x) => (
              <line key={x} x1={x} y1="16" x2={x} y2="40" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="2" />
            ))}
          </svg>

          {/* Child nodes */}
          <div className="grid grid-cols-4 gap-4 w-full max-w-[540px]">
            {children.map((child) => (
              <div
                key={child.name}
                className="bg-gray-800/50 border border-[#38BDF8]/25 rounded-lg px-3 py-3 text-center"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#7DD3FC] block mb-1">
                  {child.name}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400">{child.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key point: agents use skills */}
        <div className="bg-gray-800/40 border border-[#a855f7]/20 rounded-xl px-5 py-3 text-center">
          <span className="text-sm text-gray-300">
            에이전트와 서브에이전트는{" "}
            <span className="text-[#a855f7] font-semibold">스킬(Skills)</span>을
            이용하여 업무를 수행한다
          </span>
        </div>

        {/* Key points */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {[
            "독립 컨텍스트 윈도우",
            "전문화된 도구 권한",
            "메인에게 보고",
          ].map((point) => (
            <div
              key={point}
              className="flex items-center gap-2 bg-gray-800/40 rounded-lg px-4 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              <span className="text-xs sm:text-sm text-gray-300">{point}</span>
            </div>
          ))}
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
