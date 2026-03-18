"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function Demo5BluemangoSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={4} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Demo 5 — <span className="text-[#38BDF8]">블루망고</span> 예시
      </h2>
      <p className="text-sm text-gray-500 mb-6">codemon-make.ngrok.app/admin</p>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        <div className="bg-gray-800/50 border border-[#38BDF8]/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">다른 프로젝트에서의 활용</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <span className="text-2xl block mb-2">🏗️</span>
              <h4 className="text-sm font-semibold text-[#7DD3FC] mb-1">프로젝트 관리</h4>
              <p className="text-xs text-gray-400">
                에이전트 팀이 프로젝트 상태 추적 · 보고
              </p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <span className="text-2xl block mb-2">🔄</span>
              <h4 className="text-sm font-semibold text-[#7DD3FC] mb-1">워크플로우 자동화</h4>
              <p className="text-xs text-gray-400">
                반복 업무 자동화 · 알림 · 리포팅
              </p>
            </div>
          </div>
        </div>

        {/* Live demo indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-[#7DD3FC] animate-pulse" />
            <span className="text-sm text-[#7DD3FC] font-medium">라이브 데모</span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
