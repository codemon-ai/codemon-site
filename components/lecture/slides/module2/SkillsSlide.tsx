"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";
import ComparisonTable from "../../visuals/charts/ComparisonTable";

const columns = [
  { header: "", key: "aspect" },
  { header: "Cowork Skills", key: "cowork", highlight: true },
  { header: "Claude Code Skills (SKILL.md)", key: "code", highlight: true },
];

const rows = [
  {
    aspect: <span className="text-gray-400 font-medium">대상</span>,
    cowork: "비개발자용",
    code: "개발자용",
  },
  {
    aspect: <span className="text-gray-400 font-medium">형식</span>,
    cowork: "자연어",
    code: "마크다운",
  },
  {
    aspect: <span className="text-gray-400 font-medium">환경</span>,
    cowork: "Claude Desktop",
    code: ".claude/skills/",
  },
];

const features = [
  "자동 호출",
  "인수 전달",
  "도구 제한",
  "포크 컨텍스트",
];

export default function SkillsSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        스킬(Skills) &mdash; AI 업무 매뉴얼
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="flex flex-col gap-6">
        {/* Comparison table */}
        <ComparisonTable columns={columns} rows={rows} />

        {/* Evolution note */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-gray-500 bg-gray-800/50 rounded-lg px-3 py-1.5 border border-gray-700/40">
            Commands 1.0
          </span>
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path d="M2 8H24" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 4L30 8L22 12" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span
            className="text-sm text-[#A78BFA] font-semibold bg-[#7B61FF]/10 rounded-lg px-3 py-1.5 border border-[#7B61FF]/30"
            style={{ boxShadow: "0 0 12px rgba(123,97,255,0.15)" }}
          >
            Skills 2.0
          </span>
        </div>

        {/* Key features */}
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          {features.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 bg-gray-800/40 border border-[#38BDF8]/15 rounded-lg px-4 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-xs sm:text-sm text-gray-300">{f}</span>
            </div>
          ))}
        </div>

        {/* Agency skill examples */}
        <div className="bg-gray-800/30 border border-gray-700/40 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-medium mb-2">에이전시 스킬 예시</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { skill: "🔍 경쟁사 분석", agent: "Newbi" },
              { skill: "🛠️ 기술 스택 추천", agent: "Octo" },
              { skill: "📝 코드 리뷰", agent: "Nubi" },
              { skill: "📊 주간 보고", agent: "Owl" },
              { skill: "✅ 클라이언트 QA", agent: "Nubi" },
            ].map((item) => (
              <div key={item.skill} className="flex items-center justify-between bg-gray-700/30 rounded-lg px-3 py-1.5">
                <span className="text-gray-300">{item.skill}</span>
                <span className="text-[#A78BFA] font-medium">{item.agent}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
