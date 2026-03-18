"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function ParadigmShiftSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={1} slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        자동완성 → 자율 에이전트
      </h2>

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-stretch">
        {/* Left: 2024 Before */}
        <FadeInGroup isActive={isActive} delay={200} className="flex flex-col">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6 flex-1">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              2024 Before
            </div>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
                <span>Tab 자동완성</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">↓</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
                <span>개발자 검토</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">↓</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
                <span>적용</span>
              </div>
            </div>
          </div>
        </FadeInGroup>

        {/* Arrow separator */}
        <div className="hidden sm:flex items-center justify-center">
          <div
            className="text-3xl font-bold bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent transition-all duration-700 delay-500"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(0.5)",
            }}
          >
            →
          </div>
        </div>

        {/* Right: 2026 Now */}
        <FadeInGroup isActive={isActive} delay={300} className="flex flex-col">
          <div className="bg-gray-800/60 border border-[#a855f7]/20 rounded-xl p-6 flex-1 shadow-[0_0_30px_rgba(123,97,255,0.08)]">
            <div className="text-sm font-semibold text-[#a855f7] uppercase tracking-wider mb-4">
              2026 Now
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 shrink-0" />
                <span className="text-[#38BDF8] font-medium">
                  &quot;이 API에 페이지네이션 추가해줘&quot;
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#a855f7]/60">↓</span>
              </div>
              <div className="space-y-2 text-neon-purple text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-purple shrink-0" />
                  에이전트가 파일 탐색
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-purple shrink-0" />
                  스키마 분석
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-purple shrink-0" />
                  코드 수정
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-blue shrink-0" />
                  테스트 작성
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-blue shrink-0" />
                  CI 실행
                </div>
              </div>
            </div>
          </div>
        </FadeInGroup>
      </div>

      {/* Key message */}
      <div
        className="mt-6 text-center transition-all duration-700 delay-700"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-base font-semibold text-[#38BDF8]">
            코딩에서 글쓰기로
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-[#a855f7] to-[#38BDF8] bg-clip-text text-transparent">
            검토자에서 지휘자로
          </span>
        </div>
      </div>
    </SlideFrame>
  );
}
