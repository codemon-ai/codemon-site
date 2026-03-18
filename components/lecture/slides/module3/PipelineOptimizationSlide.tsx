"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";
import BarChart from "../../visuals/charts/BarChart";
import CountUpNumber from "../../visuals/animations/CountUpNumber";

const chartData = [
  { label: "v1 (초기)", value: 36, color: "#6B7280" },
  { label: "v2 (최적화)", value: 13, color: "#7B61FF" },
  { label: "v3 (현재)", value: 9, color: "#38BDF8" },
];

export default function PipelineOptimizationSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        파이프라인 최적화: 36분 → 13분 → 9분
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-6">
        {/* Animated numbers */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div className="text-center">
            <CountUpNumber
              end={36}
              suffix="분"
              isActive={isActive}
              className="text-3xl sm:text-4xl font-bold text-gray-500"
            />
            <p className="text-gray-500 text-xs mt-1">v1 초기</p>
          </div>
          <span className="text-2xl text-gray-600">→</span>
          <div className="text-center">
            <CountUpNumber
              end={13}
              suffix="분"
              isActive={isActive}
              className="text-3xl sm:text-4xl font-bold text-[#a855f7]"
            />
            <p className="text-[#a855f7] text-xs mt-1">v2 최적화</p>
          </div>
          <span className="text-2xl text-gray-600">→</span>
          <div className="text-center">
            <CountUpNumber
              end={9}
              suffix="분"
              isActive={isActive}
              className="text-3xl sm:text-4xl font-bold text-[#38BDF8]"
            />
            <p className="text-[#38BDF8] text-xs mt-1">v3 현재</p>
          </div>
        </div>

        {/* Bar chart */}
        <BarChart data={chartData} maxValue={40} unit="분" isActive={isActive} />

        {/* Reduction stat */}
        <div className="text-center">
          <span className="inline-block bg-emerald-500/15 border border-emerald-500/30 rounded-full px-6 py-2">
            <span className="text-emerald-400 font-bold text-lg">75% 단축</span>
            <span className="text-gray-400 text-sm ml-2">
              36분 → 9분
            </span>
          </span>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
