"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const loopSteps = [
  { text: "PR 업로드", icon: "📤", color: "border-blue-500/40 bg-blue-500/10" },
  {
    text: "QA 에이전트 자동 리뷰",
    icon: "🔍",
    color: "border-purple-500/40 bg-purple-500/10",
  },
  {
    text: "보안/성능/스타일 체크",
    icon: "🛡️",
    color: "border-emerald-500/40 bg-emerald-500/10",
  },
  {
    text: "Slack 알림",
    icon: "💬",
    color: "border-amber-500/40 bg-amber-500/10",
  },
  {
    text: "개발자 최종 확인",
    icon: "✅",
    color: "border-cyan-500/40 bg-cyan-500/10",
  },
];

export default function ScenarioCodeReviewSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        시나리오 2: 코드 리뷰 자동화
      </h2>

      <FadeInGroup isActive={isActive} delay={150} className="space-y-5">
        {/* Automation loop */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {loopSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`${step.color} border rounded-xl px-4 py-3 text-center min-w-[120px]`}
              >
                <span className="text-xl block mb-1">{step.icon}</span>
                <span className="text-gray-200 text-xs">{step.text}</span>
              </div>

              {i < loopSteps.length - 1 && (
                <svg
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M2 12H18"
                    stroke="#7B61FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M16 6L24 12L16 18"
                    stroke="#7B61FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.6"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Before/After comparison */}
        <div className="flex items-center justify-center gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 py-4 text-center">
            <p className="text-gray-500 text-xs mb-1">Before</p>
            <p className="text-red-400 font-bold text-xl">리뷰 대기 4시간+</p>
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
          <div className="bg-[#a855f7]/15 border border-[#a855f7]/30 rounded-xl px-6 py-4 text-center">
            <p className="text-[#a855f7] text-xs mb-1">After</p>
            <p className="text-[#a855f7] font-bold text-xl">
              10분 이내 자동 피드백
            </p>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
