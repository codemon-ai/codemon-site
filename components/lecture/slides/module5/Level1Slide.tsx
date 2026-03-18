"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const checklist = [
  "Claude.ai 무료 가입",
  "업무 프롬프트 만들어보기",
  "회의록 요약 시켜보기",
  "코드 리뷰 요청해보기",
];

export default function Level1Slide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        Lv.1 &mdash; 오늘{" "}
        <span className="text-gray-400 font-normal text-xl sm:text-2xl">
          (0원, 30분)
        </span>
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-4 mb-8">
        {checklist.map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 bg-gray-800/60 border border-gray-700/50 rounded-xl px-6 py-4 hover:border-[#a855f7]/40 transition-colors"
          >
            <span className="text-emerald-400 text-xl flex-shrink-0">
              &#9745;
            </span>
            <span className="text-white text-base sm:text-lg">{item}</span>
          </div>
        ))}
      </FadeInGroup>

      <div className="flex items-center gap-4 mb-6">
        <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30 tracking-wider">
          FREE
        </span>
        <span className="inline-block bg-[#38BDF8]/20 text-[#38BDF8] text-xs font-bold px-3 py-1.5 rounded-full border border-[#38BDF8]/30 tracking-wider">
          30분
        </span>
      </div>

      <p className="text-gray-400 text-sm sm:text-base">
        지금 바로 시작할 수 있습니다
      </p>
    </SlideFrame>
  );
}
