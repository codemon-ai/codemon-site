"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const timeline = [
  {
    period: "2006–2016",
    label: "삼성전자 · SK텔레콤",
    desc: "대기업 10년",
    icon: "🏢",
    color: "border-blue-500/30",
    textColor: "text-blue-400",
  },
  {
    period: "2016–2026",
    label: "창업씬 10년",
    desc: "3번 망함 💀",
    icon: "🚀",
    color: "border-[#a855f7]/30",
    textColor: "text-[#a855f7]",
  },
  {
    period: "2024–현재",
    label: "외주로 돈 벌기",
    desc: "AI 에이전시 운영",
    icon: "💰",
    color: "border-emerald-500/30",
    textColor: "text-emerald-400",
  },
];

export default function SpeakerIntroSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={0} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        강사 소개 — <span className="text-[#a855f7]">코드몬</span>
      </h2>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        {/* Timeline */}
        <div className="grid grid-cols-3 gap-4">
          {timeline.map((item) => (
            <div
              key={item.period}
              className={`bg-gray-800/50 border ${item.color} rounded-xl p-5 text-center`}
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <div className={`text-sm font-bold ${item.textColor} mb-1`}>
                {item.period}
              </div>
              <div className="text-white font-semibold text-base mb-1">
                {item.label}
              </div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Connection to today's talk */}
        <div
          className="text-center transition-all duration-700 delay-[900ms]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="inline-block bg-gradient-to-r from-[#7B61FF]/10 to-[#38BDF8]/10 border border-[#7B61FF]/20 rounded-xl px-6 py-3">
            <p className="text-sm text-gray-300">
              그 경험들이 오늘 발표에{" "}
              <span className="text-[#a855f7] font-semibold">
                도움이 됩니다
              </span>
            </p>
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
