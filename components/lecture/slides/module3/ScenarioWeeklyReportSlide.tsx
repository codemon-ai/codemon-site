"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const dataSources = [
  { icon: "🔗", label: "GitHub 커밋/PR 분석" },
  { icon: "💬", label: "Slack 주요 논의 요약" },
  { icon: "📋", label: "프로젝트 보드 진행률" },
];

export default function ScenarioWeeklyReportSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        시나리오 3: 주간 보고 자동화
      </h2>

      <FadeInGroup isActive={isActive} delay={150} className="space-y-5">
        {/* Trigger */}
        <div className="flex justify-center">
          <div className="bg-[#a855f7]/15 border border-[#a855f7]/30 rounded-full px-5 py-2">
            <span className="text-[#a855f7] font-semibold text-sm">
              ⏰ 매주 금요일 자동 실행
            </span>
          </div>
        </div>

        {/* Data collection → Report flow */}
        <div className="flex items-center justify-center gap-4">
          {/* Data sources */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3 min-w-[220px]">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              데이터 수집
            </h3>
            {dataSources.map((src) => (
              <div key={src.label} className="flex items-center gap-2">
                <span className="text-lg">{src.icon}</span>
                <span className="text-gray-300 text-sm">{src.label}</span>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <svg
            width="48"
            height="24"
            viewBox="0 0 48 24"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M4 12H36"
              stroke="#7B61FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M34 6L44 12L34 18"
              stroke="#7B61FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Report generation */}
          <div className="bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-xl p-4 min-w-[200px] text-center">
            <span className="text-3xl block mb-2">📊</span>
            <h3 className="text-white font-bold text-sm">
              주간 보고서 자동 생성
            </h3>
          </div>

          {/* Arrow */}
          <svg
            width="48"
            height="24"
            viewBox="0 0 48 24"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M4 12H36"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M34 6L44 12L34 18"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Slack publish */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 min-w-[180px] text-center">
            <span className="text-3xl block mb-2">💬</span>
            <h3 className="text-white font-bold text-sm">
              Slack 채널 발행
            </h3>
          </div>
        </div>

        {/* Before/After comparison */}
        <div className="flex items-center justify-center gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 py-3 text-center">
            <p className="text-gray-500 text-xs mb-1">Before</p>
            <p className="text-red-400 font-bold text-xl">매주 2시간</p>
          </div>
          <div className="flex flex-col items-center">
            <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
              <path
                d="M4 12H36"
                stroke="#7B61FF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M34 6L44 12L34 18"
                stroke="#7B61FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="bg-[#a855f7]/15 border border-[#a855f7]/30 rounded-xl px-6 py-3 text-center">
            <p className="text-[#a855f7] text-xs mb-1">After</p>
            <p className="text-[#a855f7] font-bold text-xl">
              자동 (0분)
            </p>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
