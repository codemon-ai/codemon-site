"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const steps = [
  {
    agent: "Rody",
    role: "PM",
    task: "주제 선정, 키워드 기획",
    time: "1분",
    emoji: "🎯",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/40",
  },
  {
    agent: "Narae",
    role: "리서치",
    task: "자료 수집, 보고서",
    time: "5분",
    emoji: "✍️",
    color: "from-pink-500/20 to-pink-600/10 border-pink-500/40",
  },
  {
    agent: "Rody",
    role: "블로깅",
    task: "블로그 작성",
    time: "2분",
    emoji: "🎯",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/40",
  },
  {
    agent: "Nubi",
    role: "QA",
    task: "팩트체크, 검수, 발행",
    time: "5분",
    emoji: "🔍",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/40",
  },
];

export default function BlogPipelineSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        블로그 파이프라인 흐름
      </h2>

      <FadeInGroup
        isActive={isActive}
        delay={200}
        className="flex items-center justify-center gap-2"
      >
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Step card */}
            <div
              className={`bg-gradient-to-br ${step.color} border rounded-xl px-4 py-4 text-center min-w-[140px]`}
            >
              <span className="text-2xl block mb-1">{step.emoji}</span>
              <h3 className="text-white font-bold text-sm">
                {step.agent}{" "}
                <span className="text-gray-400 font-normal">
                  ({step.role})
                </span>
              </h3>
              <p className="text-gray-300 text-xs mt-1">{step.task}</p>
              <span className="inline-block mt-2 bg-[#a855f7]/20 text-[#a855f7] text-xs font-bold px-2 py-0.5 rounded-full">
                {step.time}
              </span>
            </div>

            {/* Arrow (except last) */}
            {i < steps.length - 1 && (
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M2 12H22"
                  stroke="url(#pipe-arrow)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 6L28 12L20 18"
                  stroke="#7B61FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="pipe-arrow" x1="2" y1="12" x2="22" y2="12">
                    <stop stopColor="#7B61FF" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#7B61FF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
        ))}
      </FadeInGroup>

      {/* Total time */}
      <div className="mt-6 text-center">
        <span className="inline-block bg-[#a855f7]/15 border border-[#a855f7]/30 rounded-full px-6 py-2">
          <span className="text-gray-400 text-sm">Total: </span>
          <span className="text-[#a855f7] font-bold text-lg">13분</span>
        </span>
      </div>
    </SlideFrame>
  );
}
