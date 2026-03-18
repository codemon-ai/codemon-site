"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const steps = [
  {
    icon: "🍌",
    name: "나노바나나",
    desc: "이미지 · 스티커 생성",
    color: "border-amber-500/30",
    textColor: "text-amber-400",
    glow: "rgba(245,158,11,0.12)",
  },
  {
    icon: "🎨",
    name: "Stizzi",
    desc: "디자인 시스템 · 디자인",
    color: "border-[#7B61FF]/30",
    textColor: "text-[#A78BFA]",
    glow: "rgba(123,97,255,0.12)",
  },
  {
    icon: "💻",
    name: "Claude Code",
    desc: "코딩 · 구현",
    color: "border-[#38BDF8]/30",
    textColor: "text-[#7DD3FC]",
    glow: "rgba(56,189,248,0.12)",
  },
];

export default function DesignFeedbackSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        빠른 디자인 피드백
      </h2>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col items-center gap-6">
        {/* 3-step pipeline */}
        <div className="flex items-center gap-4 sm:gap-6">
          {steps.map((step, i) => (
            <div key={step.name} className="flex items-center gap-4 sm:gap-6">
              <div
                className={`bg-gray-800/50 border ${step.color} rounded-xl p-5 text-center w-44`}
                style={{ boxShadow: `0 0 20px ${step.glow}` }}
              >
                <span className="text-3xl block mb-3">{step.icon}</span>
                <div className={`text-sm font-bold ${step.textColor} mb-1`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-500">{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="flex-shrink-0">
                  <path d="M2 8H30" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M28 4L36 8L28 12" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div
          className="transition-all duration-700 delay-[900ms]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="bg-gray-800/40 border border-[#a855f7]/20 rounded-xl px-6 py-3 text-center">
            <span className="text-sm text-gray-300">
              디자이너 없이도{" "}
              <span className="text-[#a855f7] font-semibold">
                빠른 프로토타입 → 피드백 → 반영
              </span>{" "}
              사이클 가능
            </span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
