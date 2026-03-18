"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const sections = [
  {
    num: 1,
    title: "왜 지금 AI 에이전트인가",
    slides: "7장",
    color: "border-emerald-500/30",
    dotColor: "bg-emerald-400",
    textColor: "text-emerald-400",
  },
  {
    num: 2,
    title: "Claude 생태계 한눈에",
    slides: "10장",
    color: "border-[#7B61FF]/30",
    dotColor: "bg-[#A78BFA]",
    textColor: "text-[#A78BFA]",
  },
  {
    num: 3,
    title: "에이전시에 에이전틱 팀 도입하기",
    slides: "13장",
    color: "border-[#38BDF8]/30",
    dotColor: "bg-[#7DD3FC]",
    textColor: "text-[#7DD3FC]",
  },
  {
    num: 4,
    title: "라이브 데모",
    slides: "6장",
    color: "border-amber-500/30",
    dotColor: "bg-amber-400",
    textColor: "text-amber-400",
  },
  {
    num: 5,
    title: "내일부터 할 수 있는 것",
    slides: "9장",
    color: "border-pink-500/30",
    dotColor: "bg-pink-400",
    textColor: "text-pink-400",
  },
];

export default function SummarySlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={0} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        오늘 이야기할 것
      </h2>

      <FadeInGroup
        isActive={isActive}
        delay={150}
        className="flex flex-col gap-3 max-w-2xl mx-auto w-full"
      >
        {sections.map((s) => (
          <div
            key={s.num}
            className={`flex items-center gap-4 bg-gray-800/40 border ${s.color} rounded-xl px-5 py-3`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${s.dotColor} flex-shrink-0`} />
            <span className={`text-sm font-bold ${s.textColor} w-6`}>
              {s.num}
            </span>
            <span className="text-white font-medium text-sm flex-1">
              {s.title}
            </span>
            <span className="text-xs text-gray-500">{s.slides}</span>
          </div>
        ))}
      </FadeInGroup>

      <div
        className="mt-6 text-center transition-all duration-700 delay-[900ms]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <span className="text-sm text-gray-500">
          총 48장 · 약 60분
        </span>
      </div>
    </SlideFrame>
  );
}
