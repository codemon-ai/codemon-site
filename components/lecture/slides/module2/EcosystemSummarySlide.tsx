"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const tiers = [
  {
    when: "지금 당장",
    who: "비개발자",
    tools: "Claude.ai + Cowork Skills",
    borderColor: "border-emerald-500/40",
    bgColor: "bg-emerald-500/5",
    dotColor: "bg-emerald-400",
    textColor: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.1)",
  },
  {
    when: "이번 주",
    who: "개발자",
    tools: "Claude Code + CLAUDE.md + MCP",
    borderColor: "border-[#7B61FF]/40",
    bgColor: "bg-[#7B61FF]/5",
    dotColor: "bg-[#A78BFA]",
    textColor: "text-[#A78BFA]",
    glowColor: "rgba(123,97,255,0.1)",
  },
  {
    when: "이번 달",
    who: "팀",
    tools: "서브에이전트 + Agent Teams + SDK",
    borderColor: "border-[#38BDF8]/40",
    bgColor: "bg-[#38BDF8]/5",
    dotColor: "bg-[#7DD3FC]",
    textColor: "text-[#7DD3FC]",
    glowColor: "rgba(56,189,248,0.1)",
  },
];

export default function EcosystemSummarySlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        어디서부터 시작할까?
      </h2>

      <FadeInGroup isActive={isActive} delay={300} className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        {tiers.map((tier) => (
          <div
            key={tier.when}
            className={`flex items-center gap-4 sm:gap-6 ${tier.bgColor} ${tier.borderColor} border rounded-xl px-5 sm:px-6 py-4 transition-all duration-300`}
            style={{ boxShadow: `0 0 16px ${tier.glowColor}` }}
          >
            {/* Tier indicator */}
            <div className="flex flex-col items-center flex-shrink-0 w-20">
              <span className={`w-2.5 h-2.5 rounded-full ${tier.dotColor} mb-1.5`} />
              <span className={`text-sm font-bold ${tier.textColor}`}>{tier.when}</span>
              <span className="text-[10px] text-gray-500">({tier.who})</span>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-gray-700/50 flex-shrink-0" />

            {/* Tools */}
            <div className="flex-1">
              <span className="text-sm sm:text-base text-white font-medium">{tier.tools}</span>
            </div>
          </div>
        ))}

        {/* Bottom message */}
        <p className="text-center text-sm text-gray-400 mt-4">
          당신의 팀에 맞는{" "}
          <span className="text-[#A78BFA] font-semibold">시작점</span>을 찾으세요
        </p>
      </FadeInGroup>
    </SlideFrame>
  );
}
