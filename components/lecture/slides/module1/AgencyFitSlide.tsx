"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const factors = [
  { text: "프로젝트마다 비슷한 워크플로우 반복", stars: 5 },
  { text: "리서치→기획→디자인→개발→QA→납품 파이프라인", stars: 5 },
  { text: "여러 프로젝트 동시 진행", stars: 4 },
  { text: "잦은 클라이언트 요구사항 변경", stars: 4 },
];

function StarRating({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span className="text-sm tracking-wider">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={i < filled ? "text-[#a855f7]" : "text-gray-700"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function AgencyFitSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        에이전시가 특히 주목해야 하는 이유
      </h2>

      {/* Factor grid */}
      <FadeInGroup isActive={isActive} delay={200} className="space-y-3">
        {factors.map((factor, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-800/50 border border-gray-700/40 rounded-lg px-5 py-4"
          >
            <span className="text-white text-sm sm:text-base">
              {factor.text}
            </span>
            <StarRating filled={factor.stars} />
          </div>
        ))}
      </FadeInGroup>

      {/* Bottom message */}
      <div
        className="mt-8 text-center transition-all duration-700 delay-[1000ms]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          <span className="text-[#a855f7] font-medium">반복적</span>이고,{" "}
          <span className="text-[#38BDF8] font-medium">구조화 가능</span>하고,{" "}
          <span className="text-[#a855f7] font-medium">병렬 실행</span>이 필요한
          ={" "}
          <span className="text-white font-semibold">
            AI 에이전트의 최적 적용 대상
          </span>
        </p>
      </div>
    </SlideFrame>
  );
}
