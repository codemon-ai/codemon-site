"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function Demo4AgentTeamSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={4} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Demo 4 — <span className="text-emerald-400">에이전트 팀</span> 실제 사례
      </h2>
      <p className="text-sm text-gray-500 mb-6">codemon-make.ngrok.app/admin</p>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        <div className="bg-gray-800/50 border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">부업 조사 이슈 생성</h3>

          <div className="space-y-3">
            {[
              { step: "1", text: "이슈 생성 → 에이전트 자동 할당", icon: "📋" },
              { step: "2", text: "리서치 에이전트가 자료 수집", icon: "🔍" },
              { step: "3", text: "분석 에이전트가 보고서 작성", icon: "📊" },
              { step: "4", text: "결과 리뷰 후 공유", icon: "✅" },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-3 bg-gray-700/30 rounded-lg px-4 py-2.5"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs text-emerald-400 font-bold w-6">
                  {item.step}
                </span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live demo indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">라이브 데모</span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
