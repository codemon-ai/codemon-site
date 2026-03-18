"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function Demo2OpenclawSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={4} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Demo 2 — <span className="text-[#a855f7]">오픈클로 - 로디</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6">자료 조사 · 유튜브 요약</p>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 border border-[#7B61FF]/20 rounded-xl p-5">
            <span className="text-2xl block mb-3">🔍</span>
            <h3 className="text-white font-semibold text-sm mb-2">자료 조사</h3>
            <p className="text-gray-400 text-xs">
              주제 키워드 → 관련 자료 수집 → 요약 보고서
            </p>
          </div>
          <div className="bg-gray-800/50 border border-[#7B61FF]/20 rounded-xl p-5">
            <span className="text-2xl block mb-3">📺</span>
            <h3 className="text-white font-semibold text-sm mb-2">유튜브 요약</h3>
            <p className="text-gray-400 text-xs">
              영상 URL → 핵심 내용 추출 → 구조화된 노트
            </p>
          </div>
        </div>

        {/* Live demo indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-[#7B61FF]/10 border border-[#7B61FF]/30 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
            <span className="text-sm text-[#A78BFA] font-medium">라이브 데모</span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
