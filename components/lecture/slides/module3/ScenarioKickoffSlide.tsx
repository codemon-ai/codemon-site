"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const steps = [
  { num: 1, text: "새 클라이언트 수주", icon: "📋" },
  { num: 2, text: "리서치 에이전트가 경쟁사 분석", icon: "🔭" },
  { num: 3, text: "기획 에이전트가 RFP 초안 작성", icon: "📝" },
  { num: 4, text: "PM이 검토+수정", icon: "👤" },
  { num: 5, text: "클라이언트 제안서 완성", icon: "🎯" },
];

export default function ScenarioKickoffSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        시나리오 1: 프로젝트 킥오프 자동화
      </h2>

      <FadeInGroup isActive={isActive} delay={150} className="space-y-4">
        {/* Steps flow */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-3">
              {/* Number badge */}
              <div className="w-8 h-8 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/40 flex items-center justify-center flex-shrink-0">
                <span className="text-[#a855f7] font-bold text-sm">
                  {step.num}
                </span>
              </div>

              {/* Step card */}
              <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 flex items-center gap-3">
                <span className="text-xl">{step.icon}</span>
                <span className="text-gray-200 text-sm">{step.text}</span>
              </div>

              {/* Arrow (except last) */}
              {i < steps.length - 1 && (
                <div className="w-6 flex justify-center">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path
                      d="M8 2V14"
                      stroke="#7B61FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                    <path
                      d="M3 11L8 18L13 11"
                      stroke="#7B61FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Before/After comparison */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 py-3 text-center">
            <p className="text-gray-500 text-xs mb-1">Before</p>
            <p className="text-red-400 font-bold text-2xl">3일</p>
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
            <p className="text-[#a855f7] font-bold text-2xl">3시간</p>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
