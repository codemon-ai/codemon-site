"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const codeLines = [
  { text: "npm install -g @anthropic-ai/claude-code", color: "text-emerald-400" },
  { text: "cd ~/my-project", color: "text-gray-300" },
  { text: "claude", color: "text-[#38BDF8]" },
  { text: '> 프로젝트 구조 분석 후 CLAUDE.md 작성', color: "text-amber-300" },
];

const tasks = [
  "Claude Pro 구독",
  "Cowork에서 첫 스킬 만들기",
  "CLAUDE.md 작성하기",
];

export default function Level2Slide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Lv.2 &mdash; 이번 주{" "}
        <span className="text-gray-400 font-normal text-xl sm:text-2xl">
          ($20/월, 2시간)
        </span>
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-6">
        {/* Task list */}
        <div className="flex flex-wrap gap-3">
          {tasks.map((task) => (
            <span
              key={task}
              className="bg-gray-800/60 border border-[#a855f7]/30 text-white text-sm px-4 py-2 rounded-lg"
            >
              {task}
            </span>
          ))}
        </div>

        {/* Terminal code block */}
        <div className="relative rounded-xl overflow-hidden border border-[#a855f7]/40 shadow-[0_0_30px_rgba(123,97,255,0.12)]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5 border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 text-xs text-gray-500 font-mono">
              terminal
            </span>
          </div>

          {/* Code content */}
          <div className="bg-gray-900/80 px-6 py-5 font-mono text-sm sm:text-base leading-relaxed">
            {codeLines.map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-gray-600 select-none">
                  {line.text.startsWith(">") ? "" : "$"}
                </span>
                <span className={line.color}>{line.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-gray-500 text-xs text-center">
          Claude Code 설치 &rarr; 프로젝트 분석 &rarr; CLAUDE.md 자동 생성
        </p>
      </FadeInGroup>
    </SlideFrame>
  );
}
