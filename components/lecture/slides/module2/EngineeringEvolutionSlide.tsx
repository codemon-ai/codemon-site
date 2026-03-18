"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const stages = [
  {
    label: "프롬프트 엔지니어링",
    desc: "잘 물어보기",
    icon: "💬",
    color: "border-gray-600/50",
    textColor: "text-gray-400",
    bgColor: "bg-gray-800/40",
  },
  {
    label: "컨텍스트 엔지니어링",
    desc: "잘 알려주기",
    icon: "📋",
    color: "border-[#7B61FF]/40",
    textColor: "text-[#A78BFA]",
    bgColor: "bg-[#7B61FF]/5",
  },
  {
    label: "하네스 엔지니어링",
    desc: "잘 부리기",
    icon: "🎛️",
    color: "border-[#38BDF8]/40",
    textColor: "text-[#7DD3FC]",
    bgColor: "bg-[#38BDF8]/5",
  },
];

export default function EngineeringEvolutionSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        엔지니어링의 진화
      </h2>

      <FadeInGroup isActive={isActive} delay={300} className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-4 sm:gap-6">
              <div
                className={`${stage.bgColor} border ${stage.color} rounded-xl p-5 text-center w-48`}
                style={
                  i === stages.length - 1
                    ? { boxShadow: "0 0 24px rgba(56,189,248,0.12)" }
                    : undefined
                }
              >
                <span className="text-3xl block mb-3">{stage.icon}</span>
                <div className={`text-sm font-bold ${stage.textColor} mb-1`}>
                  {stage.label}
                </div>
                <div className="text-xs text-gray-500">{stage.desc}</div>
              </div>
              {i < stages.length - 1 && (
                <svg
                  width="32"
                  height="16"
                  viewBox="0 0 32 16"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M2 8H24"
                    stroke="#7B61FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 4L30 8L22 12"
                    stroke="#7B61FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Key message */}
        <div
          className="transition-all duration-700 delay-[1000ms]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="bg-gray-800/40 border border-[#a855f7]/20 rounded-xl px-6 py-3 text-center">
            <span className="text-sm text-gray-300">
              AI를{" "}
              <span className="text-gray-500 line-through">잘 물어보는</span>{" "}
              것에서{" "}
              <span className="text-[#a855f7] font-semibold">
                잘 부리는
              </span>{" "}
              것으로
            </span>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
