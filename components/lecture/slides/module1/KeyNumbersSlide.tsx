"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import StatCard from "../../visuals/charts/StatCard";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function KeyNumbersSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        세 가지 숫자가 말해주는 지금
      </h2>

      {/* Three stat cards */}
      <FadeInGroup
        isActive={isActive}
        delay={250}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <StatCard
          value="$85억"
          label="AI 코딩 도구 시장 (2026)"
          sublabel="한화 약 11.7조원 → $473억(약 65조원, 2034) · CAGR(연평균 복합 성장률) 24%"
          color="purple"
        />
        <StatCard
          value="1,445%"
          label="멀티 에이전트 기업 문의 증가"
          sublabel="Gartner 2025"
          color="blue"
        />
        <StatCard
          value="62~85%"
          label="AI 코딩 도구 사용 개발자"
          sublabel="전문 개발자 비율"
          color="green"
        />
      </FadeInGroup>
    </SlideFrame>
  );
}
