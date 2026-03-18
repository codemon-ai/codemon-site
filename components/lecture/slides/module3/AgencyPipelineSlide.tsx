"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const stages = [
  {
    num: 1,
    agent: "Newbi",
    role: "리서치",
    task: "클라이언트 산업/경쟁사 분석",
    time: "10분",
    emoji: "🔭",
    color: "border-emerald-500/40 bg-emerald-500/10",
  },
  {
    num: 2,
    agent: "Rody",
    role: "기획",
    task: "프로젝트 기획서 초안",
    time: "5분",
    emoji: "🎯",
    color: "border-purple-500/40 bg-purple-500/10",
  },
  {
    num: 3,
    agent: "Bear",
    role: "디자인",
    task: "와이어프레임 생성",
    time: "15분",
    emoji: "🎨",
    color: "border-amber-500/40 bg-amber-500/10",
  },
  {
    num: 4,
    agent: "Octo",
    role: "개발",
    task: "프론트엔드 스캐폴딩",
    time: "20분",
    emoji: "⚙️",
    color: "border-cyan-500/40 bg-cyan-500/10",
  },
  {
    num: 5,
    agent: "Nubi",
    role: "QA",
    task: "코드 리뷰+기본 테스트",
    time: "10분",
    emoji: "🔍",
    color: "border-blue-500/40 bg-blue-500/10",
  },
];

export default function AgencyPipelineSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
        에이전시 프로젝트 파이프라인
      </h2>

      <FadeInGroup isActive={isActive} delay={150} className="space-y-2">
        {stages.map((stage, i) => (
          <div key={stage.num} className="flex items-center gap-3">
            {/* Number badge */}
            <div className="w-8 h-8 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-[#a855f7] font-bold text-sm">
                {stage.num}
              </span>
            </div>

            {/* Stage card */}
            <div
              className={`flex-1 flex items-center gap-3 ${stage.color} border rounded-lg px-4 py-3`}
            >
              <span className="text-xl">{stage.emoji}</span>
              <div className="flex-1">
                <span className="text-white font-semibold text-sm">
                  {stage.agent}
                </span>
                <span className="text-gray-400 text-xs ml-1.5">
                  ({stage.role})
                </span>
                <span className="text-gray-300 text-xs ml-3">{stage.task}</span>
              </div>
              <span className="bg-gray-800/80 text-[#38BDF8] text-xs font-bold px-2.5 py-1 rounded-full">
                {stage.time}
              </span>
            </div>

            {/* Arrow (except last) */}
            {i < stages.length - 1 && (
              <div className="w-8 flex justify-center">
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path
                    d="M8 2V14"
                    stroke="#7B61FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M3 11L8 18L13 11"
                    stroke="#7B61FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Total */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="inline-block bg-[#a855f7]/15 border border-[#a855f7]/30 rounded-full px-6 py-2">
            <span className="text-gray-400 text-sm">Total: </span>
            <span className="text-[#a855f7] font-bold text-lg">
              ~1시간
            </span>
          </span>
          <span className="text-gray-500">→</span>
          <span className="text-[#38BDF8] font-semibold text-sm">
            클라이언트 프레젠테이션 프로토타입 완성
          </span>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
