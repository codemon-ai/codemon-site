"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const codeContent = `# CLAUDE.md
## Project Overview
AI 에이전시 마케팅 자동화 프로젝트

## Tech Stack
- Next.js 15, TypeScript, Tailwind CSS 4

## Coding Rules
- 컴포넌트는 함수형으로 작성
- API 호출은 server action 사용

## Forbidden
- 프로덕션 DB 직접 수정 금지
- main 브랜치 직접 푸시 금지`;

export default function ClaudeMDSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] text-[#A78BFA] bg-[#7B61FF]/10 border border-[#7B61FF]/30 rounded-full px-3 py-1 font-medium">
          에이전트 딥다이브 ①
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        CLAUDE.md = AI 온보딩 문서
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-4">
        {/* Code block */}
        <div className="bg-gray-950 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 border-b border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-gray-400 ml-2">CLAUDE.md</span>
          </div>
          <pre className="p-4 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
            {codeContent.split("\n").map((line, i) => (
              <div key={i}>
                {line.startsWith("# ") ? (
                  <span className="text-[#a855f7] font-bold">{line}</span>
                ) : line.startsWith("## ") ? (
                  <span className="text-[#38BDF8] font-semibold">
                    {line}
                  </span>
                ) : line.startsWith("- ") ? (
                  <span className="text-gray-300">
                    <span className="text-emerald-400">-</span>
                    {line.slice(1)}
                  </span>
                ) : (
                  <span className="text-gray-400">{line}</span>
                )}
              </div>
            ))}
          </pre>
        </div>

        {/* Explanation */}
        <div className="bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-xl px-5 py-3">
          <p className="text-gray-300 text-sm">
            <span className="text-[#a855f7] font-semibold">
              AI가 프로젝트에 들어올 때 가장 먼저 읽는 파일
            </span>{" "}
            = 사람의 온보딩 문서와 같은 역할
          </p>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
