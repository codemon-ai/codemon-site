"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const stages = [
  {
    icon: "💬",
    name: "Claude (Chat)",
    role: "AI 비서",
    features: ["질문 답변", "문서 요약", "브레인스토밍"],
    glowIntensity: "rgba(123,97,255,0.1)",
    borderOpacity: "border-[#7B61FF]/20",
  },
  {
    icon: "💻",
    name: "Claude Code",
    role: "AI 팀원",
    features: ["코드 작성", "파일 수정", "테스트", "배포"],
    glowIntensity: "rgba(123,97,255,0.2)",
    borderOpacity: "border-[#7B61FF]/40",
  },
  {
    icon: "👥",
    name: "Claude Cowork",
    role: "AI 팀",
    features: ["여러 AI가 프로젝트 협업"],
    glowIntensity: "rgba(123,97,255,0.4)",
    borderOpacity: "border-[#7B61FF]/60",
  },
];

export default function ThreeStageSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        AI의 3단계 진화
      </h2>

      <FadeInGroup
        isActive={isActive}
        delay={300}
        className="flex items-center justify-center gap-2 sm:gap-4"
      >
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2 sm:gap-4">
            {/* Stage card */}
            <div
              className={`relative flex flex-col items-center bg-gray-800/60 border ${stage.borderOpacity} rounded-2xl px-5 py-6 sm:px-7 sm:py-8 text-center transition-all duration-700 ${
                i === 2 ? "scale-105" : ""
              }`}
              style={{
                boxShadow: `0 0 ${i === 2 ? 40 : 20}px ${stage.glowIntensity}`,
                minWidth: i === 2 ? 220 : 190,
              }}
            >
              {/* Glow ring for stage 3 */}
              {i === 2 && (
                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#7B61FF]/40 via-[#A78BFA]/20 to-[#38BDF8]/30 -z-10 blur-sm" />
              )}

              <span className="text-4xl mb-3">{stage.icon}</span>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {stage.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold text-[#A78BFA] mb-3">
                {stage.role}
              </span>
              <ul className="space-y-1">
                {stage.features.map((f) => (
                  <li key={f} className="text-xs text-gray-400">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow between stages */}
            {i < stages.length - 1 && (
              <svg
                width="40"
                height="24"
                viewBox="0 0 40 24"
                fill="none"
                className="flex-shrink-0"
              >
                <defs>
                  <linearGradient
                    id={`arrow-grad-${i}`}
                    x1="0"
                    y1="12"
                    x2="40"
                    y2="12"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#7B61FF" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#A78BFA" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 12H30"
                  stroke={`url(#arrow-grad-${i})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 6L36 12L28 18"
                  stroke="#A78BFA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            )}
          </div>
        ))}
      </FadeInGroup>
    </SlideFrame>
  );
}
