"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

const resources = [
  {
    category: "공식 문서",
    items: [
      {
        icon: "📘",
        title: "Claude Code 문서",
        desc: "설치, 설정, 활용 가이드",
      },
      {
        icon: "📗",
        title: "Claude API 문서",
        desc: "API 레퍼런스 및 예제",
      },
      {
        icon: "📙",
        title: "MCP 스펙",
        desc: "Model Context Protocol 명세",
      },
    ],
  },
  {
    category: "커뮤니티",
    items: [
      {
        icon: "⭐",
        title: "awesome-claude-code",
        desc: "GitHub 커뮤니티 리소스 모음",
      },
      {
        icon: "💬",
        title: "GeekNews",
        desc: "한국 개발자 뉴스 커뮤니티",
      },
      {
        icon: "🤖",
        title: "GPTers",
        desc: "AI 활용 한국 커뮤니티",
      },
    ],
  },
  {
    category: "블로그",
    items: [
      {
        icon: "🚀",
        title: "codemon.ai 블로그",
        desc: "AI 에이전트 실무 활용 사례",
      },
    ],
  },
];

export default function ResourcesSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={5} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        추천 리소스
      </h2>

      <FadeInGroup isActive={isActive} delay={200} className="space-y-5">
        {resources.map((group) => (
          <div key={group.category}>
            <div className="text-xs font-semibold text-[#a855f7] uppercase tracking-wider mb-3">
              {group.category}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 hover:border-[#a855f7]/40 hover:shadow-[0_0_16px_rgba(123,97,255,0.1)] transition-all"
                >
                  <div className="text-xl mb-2">{item.icon}</div>
                  <div className="text-white text-sm font-semibold mb-1">
                    {item.title}
                  </div>
                  <div className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </FadeInGroup>
    </SlideFrame>
  );
}
