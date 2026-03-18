"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const rows = [
  {
    stage: "리서치",
    old: "수동 구글링+정리",
    ai: "리서치 에이전트가 수집+구조화",
    level: 5,
  },
  {
    stage: "기획",
    old: "PM이 문서 작성",
    ai: "AI가 리서치 기반 초안 생성",
    level: 4,
  },
  {
    stage: "디자인",
    old: "디자이너 목업",
    ai: "AI 와이어프레임+UI 초안",
    level: 3,
  },
  {
    stage: "개발",
    old: "개발자 코딩",
    ai: "코딩 에이전트 구현+개발자 리뷰",
    level: 4,
  },
  {
    stage: "QA",
    old: "수동 테스트",
    ai: "QA 에이전트가 테스트 작성+실행",
    level: 5,
  },
  {
    stage: "납품/운영",
    old: "수동 배포+문서",
    ai: "자동 파이프라인+문서 생성",
    level: 4,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="tracking-wider">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < count ? "text-amber-400" : "text-gray-600"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function WorkflowMappingSlide({
  isActive,
  slideIndex,
  totalSlides,
}: SlideProps) {
  return (
    <SlideFrame section={3} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        에이전시 업무 흐름 × AI 매핑
      </h2>

      <FadeInGroup isActive={isActive} delay={100}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left font-semibold text-[#a855f7] w-20">
                  단계
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-400">
                  기존 방식
                </th>
                <th className="px-4 py-3 text-left font-semibold text-[#38BDF8]">
                  AI 에이전트
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-400 w-32">
                  자동화 수준
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.stage}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {row.stage}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{row.old}</td>
                  <td className="px-4 py-3 text-[#38BDF8]">{row.ai}</td>
                  <td className="px-4 py-3 text-center">
                    <Stars count={row.level} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
