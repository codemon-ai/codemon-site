"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";
import CountUpNumber from "../../visuals/animations/CountUpNumber";

const tips = [
  {
    label: "모델 분리",
    desc: "복잡=Opus, 일상=Sonnet, 단순=Haiku",
    icon: "🔀",
  },
  {
    label: "프롬프트 캐싱",
    desc: "90% 절감",
    icon: "💾",
  },
];

export default function CostInsightSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        비용 인사이트
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-6">
        {/* Large animated number */}
        <div className="text-center">
          <div className="mb-2">
            <CountUpNumber
              end={6}
              prefix="$"
              isActive={isActive}
              className="text-5xl sm:text-7xl font-bold text-[#a855f7]"
            />
          </div>
          <p className="text-gray-400 text-lg">하루 평균 비용</p>
        </div>

        {/* Comparison */}
        <div className="flex justify-center">
          <div className="bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-xl px-6 py-3 text-center">
            <p className="text-[#38BDF8] font-semibold text-base">
              ☕ 커피 두 잔 값으로 AI 팀원 하나
            </p>
          </div>
        </div>

        {/* Cost optimization tips */}
        <div className="grid grid-cols-2 gap-4">
          {tips.map((tip) => (
            <div
              key={tip.label}
              className="bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{tip.icon}</span>
                <h3 className="text-white font-bold text-sm">{tip.label}</h3>
              </div>
              <p className="text-gray-400 text-xs">{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="flex justify-center">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-amber-400 text-sm font-medium">
              Agent Teams 주의 — 7x 토큰 비용 발생 가능
            </p>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
