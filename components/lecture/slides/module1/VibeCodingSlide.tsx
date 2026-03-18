"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import StatCard from "../../visuals/charts/StatCard";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function VibeCodingSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        바이브 코딩 혁명
      </h2>

      {/* Stat cards row */}
      <FadeInGroup
        isActive={isActive}
        delay={250}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8"
      >
        <StatCard
          value="63%"
          label="비개발자가 직접 앱 개발"
          sublabel="Vibe Coding 확산"
          color="purple"
        />
        <StatCard
          value="ARR $1억"
          label="Lovable — 8개월 만에 달성"
          sublabel="ARR(Annual Recurring Revenue, 연간 반복 매출) 역대 최고 SaaS 성장 속도"
          color="blue"
        />
        <StatCard
          value="$47억→$123억"
          label="시장 전망 (2026→2027)"
          sublabel="Vibe Coding 시장 규모"
          color="amber"
        />
      </FadeInGroup>

      {/* Disruption emphasis */}
      <div
        className="text-center transition-all duration-700 delay-[900ms]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div className="inline-block bg-gray-800/60 border border-[#a855f7]/20 rounded-lg px-6 py-3">
          <span className="text-sm text-gray-400">
            코딩을 모르는 사람이 앱을 만드는 시대 —{" "}
          </span>
          <span className="text-sm text-[#a855f7] font-semibold">
            진입 장벽이 사라지고 있다
          </span>
        </div>
      </div>
    </SlideFrame>
  );
}
