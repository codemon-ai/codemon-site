"use client";

import { SlideProps } from "../../core/types";
import SlideFrame from "../../core/SlideFrame";
import FadeInGroup from "../../visuals/animations/FadeInGroup";

export default function AgentTeamsSlide({ isActive, slideIndex, totalSlides }: SlideProps) {
  return (
    <SlideFrame section={2} slideIndex={slideIndex} totalSlides={totalSlides}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Agent Teams &mdash; AI끼리 팀을 짠다
      </h2>

      <FadeInGroup isActive={isActive} delay={250} className="flex flex-col gap-6">
        {/* Two-column comparison */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Subagents */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              서브에이전트
            </h3>

            {/* Vertical diagram */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="bg-gray-700/60 border border-gray-600/40 rounded-lg px-4 py-2 text-sm text-white font-medium">
                메인
              </div>
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <line x1="10" y1="0" x2="10" y2="18" stroke="#6B7280" strokeWidth="1.5" />
                <path d="M6 14L10 22L14 14" fill="#6B7280" />
              </svg>
              <div className="bg-gray-700/60 border border-gray-600/40 rounded-lg px-4 py-2 text-sm text-gray-300">
                서브
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-400">
              <p>&bull; <span className="text-gray-300">수직 구조</span></p>
              <p>&bull; 메인 &rarr; 서브 one-way</p>
            </div>
          </div>

          {/* Right: Agent Teams */}
          <div
            className="bg-gray-800/50 border border-[#7B61FF]/40 rounded-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(123,97,255,0.1)" }}
          >
            <h3 className="text-sm font-bold text-[#A78BFA] uppercase tracking-wider mb-4">
              Agent Teams
            </h3>

            {/* Peer diagram */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {["A", "B", "C"].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="bg-[#7B61FF]/10 border border-[#7B61FF]/30 rounded-lg w-10 h-10 flex items-center justify-center text-sm font-bold text-[#A78BFA]">
                    {label}
                  </div>
                  {i < 2 && (
                    <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                      <line x1="0" y1="6" x2="28" y2="6" stroke="#7B61FF" strokeOpacity="0.4" strokeWidth="1.5" />
                      <line x1="0" y1="10" x2="28" y2="10" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1.5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-gray-400">
              <p>&bull; <span className="text-[#7DD3FC]">수평 구조</span></p>
              <p>&bull; 피어 투 피어 직접 소통</p>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="bg-gray-800/40 border border-[#38BDF8]/20 rounded-xl px-6 py-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">예시</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-white font-medium">&ldquo;디자인 페이지 수정&rdquo;</span>
            <span className="text-gray-600">&rarr;</span>
            {["Frontend Agent", "Backend Agent", "Test Agent"].map((agent) => (
              <span
                key={agent}
                className="bg-[#7B61FF]/10 border border-[#7B61FF]/25 rounded-md px-3 py-1 text-xs text-[#A78BFA] font-medium"
              >
                {agent}
              </span>
            ))}
            <span className="text-xs text-gray-500">병렬 실행</span>
          </div>
        </div>

        {/* Deep dive notice */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            ↓ 이어서 딥다이브: CLAUDE.md · Hooks · Agent SDK
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-800/60 rounded-full px-3 py-1 border border-gray-700/40">
            Released: 2026년 2월
          </span>
        </div>
      </FadeInGroup>
    </SlideFrame>
  );
}
