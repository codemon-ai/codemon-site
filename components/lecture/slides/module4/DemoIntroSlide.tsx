"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const demos = [
  {
    num: 1,
    title: "나노바나나 웹디자인",
    desc: "이미지 · 스티커 디자인 생성",
    color: "border-amber-500/30",
    textColor: "text-amber-400",
    dotColor: "bg-amber-400",
  },
  {
    num: 2,
    title: "오픈클로 - 로디",
    desc: "자료 조사 · 유튜브 요약",
    color: "border-[#7B61FF]/30",
    textColor: "text-[#A78BFA]",
    dotColor: "bg-[#A78BFA]",
  },
  {
    num: 3,
    title: "MCP + NotebookLM",
    desc: "MCP 연동 활용 예시",
    color: "border-[#38BDF8]/30",
    textColor: "text-[#7DD3FC]",
    dotColor: "bg-[#7DD3FC]",
  },
  {
    num: 4,
    title: "에이전트 팀 실제 사례",
    desc: "부업 조사 이슈 생성 · 자동 처리",
    color: "border-emerald-500/30",
    textColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
  },
  {
    num: 5,
    title: "블루망고 예시",
    desc: "다른 프로젝트에서의 에이전트 팀 활용",
    color: "border-pink-500/30",
    textColor: "text-pink-400",
    dotColor: "bg-pink-400",
  },
];

export default function DemoIntroSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={4} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        라이브 데모 — 5가지
      </h2>

      <FadeInGroup
        isActive={isActive}
        delay={150}
        className="flex flex-col gap-3 max-w-2xl mx-auto w-full"
      >
        {demos.map((d) => (
          <div
            key={d.num}
            className={`flex items-center gap-4 bg-gray-800/40 border ${d.color} rounded-xl px-5 py-3`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${d.dotColor} flex-shrink-0`} />
            <span className={`text-sm font-bold ${d.textColor} w-6`}>
              {d.num}
            </span>
            <div className="flex-1">
              <span className="text-white font-medium text-sm">{d.title}</span>
              <span className="text-gray-500 text-xs ml-2">{d.desc}</span>
            </div>
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
        <span className="text-sm text-gray-400">
          순서대로 라이브 데모합니다
        </span>
      </div>
    </SlideFrame>
  );
}
