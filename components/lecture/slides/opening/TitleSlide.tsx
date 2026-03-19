"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import GlowPulse from "../../visuals/animations/GlowPulse";

export default function TitleSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={0} slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        {/* Main title with glow */}
        <GlowPulse color="purple">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent">
              AI 에이전트로
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent">
              에이전시 업무 자동화하기
            </span>
          </h1>
        </GlowPulse>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl transition-all duration-700 delay-300"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(12px)",
          }}
        >
          코드를 짜는 시대에서, AI에게 일을 시키는 시대로
        </p>

        {/* Speakers */}
        <div
          className="flex items-center gap-3 text-base sm:text-lg text-white/80 transition-all duration-700 delay-500"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <span className="text-[#a855f7] font-semibold">코드몬</span>
          <span className="text-gray-600">+</span>
          <span className="text-[#38BDF8] font-semibold">진연화</span>
        </div>

        {/* Bottom info */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-600 transition-all duration-700 delay-700"
          style={{
            opacity: isActive ? 1 : 0,
          }}
        >
          codemon.ai | 2026
        </div>
      </div>
    </SlideFrame>
  );
}
