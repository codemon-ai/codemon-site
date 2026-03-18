"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const cases = [
  {
    company: "Rakuten",
    highlight: "코딩 속도 200% 향상",
    detail: "코드 리뷰 시간 50% 단축",
    color: "purple" as const,
  },
  {
    company: "TELUS",
    highlight: "에이전틱 워크플로우 도입",
    detail: "운영 비용 30% 절감",
    color: "blue" as const,
  },
  {
    company: "Claude Code",
    highlight: "6개월 만에 ARR $10억 달성",
    detail: "",
    color: "purple" as const,
  },
  {
    company: "META",
    highlight: "2026년까지 코드 50% AI 작성 목표",
    detail: "엔지니어 생산성 30%↑, 파워유저 80%↑",
    color: "blue" as const,
  },
];

const colorMap = {
  purple: {
    border: "border-[#a855f7]/30",
    glow: "shadow-[0_0_20px_rgba(123,97,255,0.1)]",
    badge: "bg-[#a855f7]/10 text-[#a855f7]",
    accent: "text-[#a855f7]",
  },
  blue: {
    border: "border-[#38BDF8]/30",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.1)]",
    badge: "bg-[#38BDF8]/10 text-[#38BDF8]",
    accent: "text-[#38BDF8]",
  },
};

export default function RealCasesSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        실제 기업 사례
      </h2>

      {/* Three cards */}
      <FadeInGroup
        isActive={isActive}
        delay={250}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        {cases.map((c, i) => {
          const cm = colorMap[c.color];
          return (
            <div
              key={i}
              className={`bg-gray-800/50 border ${cm.border} ${cm.glow} rounded-xl p-5`}
            >
              <div
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${cm.badge}`}
              >
                {c.company}
              </div>
              <div className={`text-lg font-bold ${cm.accent} mb-1`}>
                {c.highlight}
              </div>
              {c.detail && (
                <div className="text-sm text-gray-400">{c.detail}</div>
              )}
            </div>
          );
        })}
      </FadeInGroup>

      {/* Zapier mention */}
      <div
        className="transition-all duration-700 delay-[800ms]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg px-5 py-3 flex items-start gap-3">
          <span className="text-[#38BDF8] font-semibold text-sm shrink-0">
            Zapier
          </span>
          <span className="text-sm text-gray-400">
            5,000개 앱 연동 → AI 에이전트가 크로스앱 워크플로우 자동 실행
          </span>
        </div>
      </div>
    </SlideFrame>
  );
}
