"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function Demo1NanobanaSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={4} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Demo 1 — <span className="text-amber-400">나노바나나</span> 웹디자인
      </h2>
      <p className="text-sm text-gray-500 mb-6">dami-studio.vercel.app</p>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        {/* What to show */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 border border-amber-500/20 rounded-xl p-5">
            <span className="text-2xl block mb-3">🖼️</span>
            <h3 className="text-white font-semibold text-sm mb-2">이미지 생성</h3>
            <p className="text-gray-400 text-xs">
              프롬프트 하나로 브랜드 맞춤 이미지 생성
            </p>
          </div>
          <div className="bg-gray-800/50 border border-amber-500/20 rounded-xl p-5">
            <span className="text-2xl block mb-3">✨</span>
            <h3 className="text-white font-semibold text-sm mb-2">스티커 디자인</h3>
            <p className="text-gray-400 text-xs">
              캐릭터 스티커 · 아이콘 빠르게 제작
            </p>
          </div>
        </div>

        {/* Live demo indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm text-amber-400 font-medium">라이브 데모</span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
