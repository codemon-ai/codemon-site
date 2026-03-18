"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function QASlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <FadeInGroup
        isActive={isActive}
        delay={300}
        className="flex flex-col items-center justify-center text-center h-full"
      >
        {/* Animated glow ring */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-[#a855f7]/20 blur-2xl animate-pulse" />
          <div className="relative w-28 h-28 rounded-full bg-gray-800/80 border-2 border-[#a855f7]/40 flex items-center justify-center shadow-[0_0_40px_rgba(123,97,255,0.2)]">
            <span className="text-5xl" role="img" aria-label="질문">
              🙋‍♂️
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Q&amp;A 시간
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg sm:text-xl">
          궁금한 점을 물어보세요
        </p>

        {/* Subtle animated border line */}
        <div className="mt-10 w-64 h-px relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a855f7]/60 to-transparent animate-pulse"
          />
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
