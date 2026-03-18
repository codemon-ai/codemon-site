"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const months = [
  {
    month: "Month 1",
    label: "탐색",
    color: "border-[#a855f7]",
    dotColor: "bg-[#a855f7]",
    lineGradient: "from-[#a855f7] to-[#a855f7]/50",
    items: [
      "Claude.ai 업무 프롬프트 실험",
      "팀 내 AI 챔피언 선정",
      '"자동화할 수 있는 것" 리스트 작성',
    ],
  },
  {
    month: "Month 2",
    label: "기반 구축",
    color: "border-[#5A7FFF]",
    dotColor: "bg-[#5A7FFF]",
    lineGradient: "from-[#5A7FFF] to-[#38BDF8]/50",
    items: [
      "Claude Code 도입 (개발팀)",
      "프로젝트별 CLAUDE.md 작성",
      "첫 자동화 성과 공유",
      "MCP 서버 1~2개 연결",
    ],
  },
  {
    month: "Month 3",
    label: "확장",
    color: "border-[#38BDF8]",
    dotColor: "bg-[#38BDF8]",
    lineGradient: "from-[#38BDF8] to-[#38BDF8]/50",
    items: [
      "서브에이전트 역할 정의",
      "반복 업무 스킬로 표준화",
      "파이프라인 구축 시작",
      "비용 vs 임팩트 측정 → 확대/축소 결정",
    ],
  },
];

export default function RoadmapSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        에이전시 도입 로드맵{" "}
        <span className="text-gray-400 font-normal text-lg">(3개월)</span>
      </h2>

      <FadeInGroup isActive={isActive} delay={300} className="flex gap-6">
        {months.map((m, idx) => (
          <div key={m.month} className="flex-1 relative">
            {/* Connector line */}
            {idx < months.length - 1 && (
              <div className="hidden sm:block absolute top-5 left-[calc(50%+16px)] right-[-24px] h-0.5">
                <div
                  className={`w-full h-full bg-gradient-to-r ${m.lineGradient}`}
                />
              </div>
            )}

            {/* Month header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full ${m.dotColor} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
              >
                {idx + 1}
              </div>
              <div>
                <div className="text-white text-sm font-bold">{m.month}</div>
                <div className="text-gray-400 text-xs">{m.label}</div>
              </div>
            </div>

            {/* Items */}
            <div
              className={`border-l-2 ${m.color}/40 pl-4 ml-5 space-y-2`}
            >
              {m.items.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1.5 text-[8px]">
                    ├──
                  </span>
                  <span className="text-gray-300 text-xs leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </FadeInGroup>
    </SlideFrame>
  );
}
