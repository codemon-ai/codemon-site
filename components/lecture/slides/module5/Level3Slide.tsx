"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const automations = [
  {
    icon: "🤖",
    title: "서브에이전트 활용",
    desc: "코드 리뷰 자동화",
    color: "border-[#a855f7]/40",
  },
  {
    icon: "🪝",
    title: "훅 설정",
    desc: "코드 변경 시 자동 테스트+알림",
    color: "border-[#38BDF8]/40",
  },
  {
    icon: "🔌",
    title: "MCP 서버 연결",
    desc: "Slack/GitHub 자동화",
    color: "border-emerald-500/40",
  },
  {
    icon: "🔗",
    title: "첫 파이프라인 구축",
    desc: "리서치 → 보고서",
    color: "border-amber-500/40",
  },
  {
    icon: "👥",
    title: "Agent Teams 시도",
    desc: "역할 분담 멀티 에이전트",
    color: "border-[#a855f7]/40",
  },
];

export default function Level3Slide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Lv.3 &mdash; 이번 달{" "}
        <span className="text-gray-400 font-normal text-xl sm:text-2xl">
          ($100~200/월)
        </span>
      </h2>

      <FadeInGroup
        isActive={isActive}
        delay={150}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
      >
        {automations.map((item) => (
          <div
            key={item.title}
            className={`bg-gray-800/50 border ${item.color} rounded-xl p-5 hover:bg-gray-800/80 transition-colors`}
          >
            <div className="text-2xl mb-3">{item.icon}</div>
            <div className="text-white text-sm font-semibold mb-1">
              {item.title}
            </div>
            <div className="text-gray-400 text-xs">{item.desc}</div>
          </div>
        ))}

        {/* Weekend project badge */}
        <div className="bg-gradient-to-br from-[#a855f7]/10 to-[#38BDF8]/10 border border-[#a855f7]/30 rounded-xl p-5 flex flex-col items-center justify-center text-center">
          <div className="text-2xl mb-2">📅</div>
          <div className="text-white text-sm font-semibold">주말 프로젝트</div>
          <div className="text-[#38BDF8] text-xs mt-1">
            주말 하루면 충분
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
