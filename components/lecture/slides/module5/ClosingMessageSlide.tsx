"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function ClosingMessageSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <FadeInGroup
        isActive={isActive}
        delay={400}
        className="flex flex-col items-center justify-center text-center h-full"
      >
        {/* Main quote */}
        <blockquote className="max-w-2xl mb-10">
          <p className="text-xl sm:text-2xl font-light italic text-gray-200 leading-relaxed">
            <span className="bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent font-medium">
              &ldquo;
            </span>
            완벽한 AI 시스템을 한 번에 만들려 하지 마세요.
            <br />
            오늘 Claude 가입하고, 내일 업무 하나 시켜보고,
            <br />
            다음 주에 CLAUDE.md를 써보세요.
            <span className="bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent font-medium">
              &rdquo;
            </span>
          </p>
        </blockquote>

        {/* Sub message */}
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
          기술 선택에서 중요한 건 &lsquo;최적&rsquo;이 아니라
          <br />
          <span className="text-white font-bold">
            &lsquo;지금 되고, 내일 개선 가능한 것&rsquo;
          </span>
          입니다.
        </p>
      </FadeInGroup>
    </SlideFrame>
  );
}
