"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function ThankYouSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <FadeInGroup
        isActive={isActive}
        delay={300}
        className="flex flex-col items-center justify-center text-center h-full"
      >
        {/* Large Thank You with neon glow */}
        <div className="relative mb-2">
          <h2
            className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#a855f7] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 60px rgba(123,97,255,0.3), 0 0 120px rgba(56,189,248,0.15)",
            }}
          >
            감사합니다
          </h2>
          {/* Glow layer behind text */}
          <div
            className="absolute inset-0 blur-2xl opacity-30 -z-10 bg-gradient-to-r from-[#a855f7] to-[#38BDF8]"
            aria-hidden="true"
          />
        </div>

        {/* English subtitle */}
        <p className="text-gray-500 text-lg mb-8 tracking-widest">
          Thank You
        </p>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base mb-10">
          AI 에이전트로 에이전시 업무 자동화하기
        </p>

        {/* Logo branding */}
        <div className="mb-8">
          <span className="text-xl sm:text-2xl font-mono">
            <span className="text-gray-500">&lt;</span>
            <span className="bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent font-bold">
              codemon.ai
            </span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-[#a855f7] animate-pulse">~</span>
          </span>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>🌐</span>
            <span>codemon.ai</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>hello@codemon.ai</span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
