"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import GlowPulse from "../../visuals/animations/GlowPulse";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function CoworkLaunchSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Claude Cowork 출시 임팩트
      </h2>

      {/* Date badge */}
      <div
        className="inline-flex items-center gap-2 bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-full px-4 py-1.5 mb-8 transition-all duration-500"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateX(0)" : "translateX(-12px)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
        <span className="text-sm text-[#a855f7] font-medium">
          2026년 2월 5일
        </span>
      </div>

      {/* Key stat */}
      <FadeInGroup isActive={isActive} delay={300} className="mb-8">
        <GlowPulse color="purple">
          <div className="text-center py-6">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent mb-2">
              $2,850억
            </div>
            <div className="text-lg sm:text-xl text-gray-400">
              약 413조원 시총 증발
            </div>
          </div>
        </GlowPulse>
      </FadeInGroup>

      {/* Timeline visual */}
      <FadeInGroup isActive={isActive} delay={400} className="mb-6">
        <div className="flex items-center gap-3 max-w-xl mx-auto">
          {/* Before */}
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500 mb-2">발표 전</div>
            <div className="h-2 bg-gray-700 rounded-full" />
          </div>
          {/* Impact point */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-4 h-4 rounded-full bg-[#a855f7] shadow-[0_0_12px_rgba(123,97,255,0.6)]" />
            <div className="text-[10px] text-[#a855f7] mt-1">출시</div>
          </div>
          {/* After */}
          <div className="flex-1 text-center">
            <div className="text-xs text-red-400/70 mb-2">경쟁사 시총 급락</div>
            <div className="h-2 bg-gradient-to-r from-[#a855f7]/50 to-red-500/50 rounded-full" />
          </div>
        </div>
      </FadeInGroup>

      {/* Message */}
      <div
        className="text-center transition-all duration-700 delay-[900ms]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <p className="text-sm sm:text-base text-gray-400">
          단순한 제품 발표가 아닌,{" "}
          <span className="text-white font-semibold">진짜 패러다임 전환의 시그널</span>
        </p>
      </div>
    </SlideFrame>
  );
}
